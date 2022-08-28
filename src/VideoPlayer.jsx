import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import NavbarComponent from "./NavbarComponent";
import ReactPlayer from "react-player";
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { CSVLink, CSVDownload } from "react-csv";
import { LinkContainer } from "react-router-bootstrap";


import vid0 from "./videos/videoMP4s/0.mp4";
import vid1 from "./videos/videoMP4s/1.mp4";
import vid2 from "./videos/videoMP4s/2.mp4";
import vid3 from "./videos/videoMP4s/3.mp4";
import vid4 from "./videos/videoMP4s/4.mp4";
import vid5 from "./videos/videoMP4s/5.mp4";
import vid6 from "./videos/videoMP4s/6.mkv?url";
import vid7 from "./videos/videoMP4s/7.mp4";
import vid8 from "./videos/videoMP4s/8.mp4";
import bits from "./assets/bits.png";

export default function VideoPlayer() {
  const location = useLocation();
  const { name, id } = location.state;
  const [currVideo, setCurrVideo] = useState(vid0);
  const [playing, setPlaying] = useState(true);
  const [playingID, setPlayingID] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [everythingDone, setEverythingDone] = useState(false);
  
  const [form, setForm] = useState({
    valence: "",
    arousal: "",
    arousalValid: false,
    valenceValid: false,
  });

  const [annotations, setAnnotations] = useState([["time,valence,arousal"]]);

  const handleClose = () => {
    setShowModal(false);
    setPlaying(true);
  }

  const handleShow = () => {
    setShowModal(true);
    setPlaying(false);
  }

  const handleSeek = (e) => {
    setPlaying(true);
    setShowModal(false);
  }

  const orderedList = [vid1, vid0, vid2, vid0, vid3, vid0, vid4, vid0, vid5, vid0, vid6, vid0, vid7, vid0, vid8, vid0];

  const handleVideoEnded = () => {
    
    if(playingID === orderedList.length - 1) {
      finishUp();
    }
    //console.log("ENDED");
    setPlayingID((playingID + 1) % orderedList.length);

    console.log(orderedList[playingID])
    setCurrVideo(orderedList[playingID]);
  }

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const checkInRange = (val) => {
    if (val >= 0 && val <= 10) {
      return true;
    }
    return false;
  }

  const finishUp = () => {
    setShowModal(false);
    setPlaying(false);

    setEverythingDone(true);

  }
    

  const handleSubmit = (e) => {
    if (checkInRange(form.valence) && checkInRange(form.arousal)) {
      setForm({
        ...form,
        valenceValid: true,
        arousalValid: true,
      });
      
      //console.log(form);

      //newAnnotation = [Date.now(), form.valence, form.arousal];
      let newAnnotation = [Date.now(), form.valence, form.arousal];
      setAnnotations([...annotations, newAnnotation]);

      handleClose();
    }
    else {
      if(!checkInRange(form.valence) && checkInRange(form.arousal)) {
        setForm({
          ...form,
          valenceValid: false,
          arousalValid: true,
        });
      }
      else if(checkInRange(form.valence) && !checkInRange(form.arousal)) {
        setForm({
          ...form,
          valenceValid: true,
          arousalValid: false,
        });
      }
      else {
        setForm({
          ...form,
          valenceValid: false,
          arousalValid: false,
        });
      }
    }
  };

  const handleSubmitCSV = (e) => {
    console.log(annotations);
    // logic to download the csv file
    setPlaying(false);
  }

  return (
    <>
      <Container>
        <NavbarComponent page="video" />
        <Row className="d-flex justify-content-center align-items-center">
          <Col md={8} lg={6} xs={12}>
            VIDEO PLAYER - {name} - {playingID}
          </Col>
        </Row>
        <Row className="d-flex justify-content-center align-items-center">
          <Col md={10} lg={10} xs={12}>
            <ReactPlayer onSeek={handleSeek} onPause={handleShow} url={currVideo} playing={playing} controls light={bits} width={`100%`} height={`auto`} onEnded={handleVideoEnded} />
          </Col>
        </Row>
        <Row className="d-flex justify-content-center align-items-center">
          <CSVLink data={annotations} filename={`${id}_annotation.csv`}>
            <Button variant="primary" onClick={handleSubmitCSV}>
              Download CSV of Annotations
            </Button>
          </CSVLink>
        </Row>
      </Container>
      {!everythingDone && (<Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Annotate your Valence and Arousal</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <FloatingLabel className="mb-3" controlId="AnnotateForm.Valence" label="Valence (1 - 10)">
              <Form.Control type="text" name="valence" onChange={handleChange} value={form.valence} placeholder="1 - 10" isInvalid={!form.valenceValid} />
            </FloatingLabel>
            <FloatingLabel className="mb-3" controlId="AnnotateForm.Arousal" label="Arousal (1 - 10)">
              <Form.Control type="text" name="arousal" onChange={handleChange} value={form.arousal} placeholder="1 - 10" isInvalid={!form.arousalValid} />
            </FloatingLabel>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>)}
      {everythingDone && (<Modal show={true} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>All done!</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <LinkContainer to="/review" state={{ name: `${form.name}`, id: `${id}` }}>
            <Button variant="primary">
              Close
            </Button>
          </LinkContainer>
        </Modal.Footer>
      </Modal>)}
      {everythingDone && <CSVDownload data={annotations} filename={`${id}_annotation.csv`} target="_blank" />}
    </>
  );
}
