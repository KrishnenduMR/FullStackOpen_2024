import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

function Home({ logout, isAuthenticated }) { 
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
Home.propTypes = {
    logout: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
};

export default Home;

    