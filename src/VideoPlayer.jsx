import React from "react";
import { useLocation } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import NavbarComponent from "./NavbarComponent";

export default function VideoPlayer() {
  const location = useLocation();
  const { name, id } = location.state;
  return (
    <Container>
        <NavbarComponent page="video" />
        <Row className="d-flex justify-content-center align-items-center">
            <Col md={8} lg={6} xs={12}>
                VIDEO PLAYER - {name} - {id}
            </Col>
        </Row>
    </Container>
  );
}
