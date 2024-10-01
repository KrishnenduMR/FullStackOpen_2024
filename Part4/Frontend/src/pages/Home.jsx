import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function Home() {
    return (
        <Container>
            <Row>
                <Col>
                    <h1>Welcome to the Home Page!</h1>
                    <Button as={Link} to="/bloglist">Go to Blog List</Button>
                </Col>
            </Row>
        </Container>
    );
}

export default Home;
    