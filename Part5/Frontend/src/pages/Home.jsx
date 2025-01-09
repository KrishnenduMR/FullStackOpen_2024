import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function Home({ logout, isAuthenticated, token }) { 
    return (
        <Container>
            <Row>
                <Col>
                    <h1>Welcome to the Home Page!</h1>
                    {isAuthenticated ? (
                        <Button onClick={logout}>Logout</Button>
                    ) : (
                        <Button as={Link} to="/login">Login</Button>
                    )}
                </Col>
            </Row>
        </Container>
    );
}

export default Home;
    