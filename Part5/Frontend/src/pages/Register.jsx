import React from "react";
import { Form, Button, Container } from "react-bootstrap";
import AuthCalls from "../api/AuthCalls";

const Register = () => {
    const [error, setError] = React.useState("");
    const [success, setSuccess] = React.useState("");
    const timeoutRef = React.useRef(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }

        const data = {
            username: e.target.username.value,
            name: e.target.name.value,
            password: e.target.password.value,
        };

        try {
            const response = await AuthCalls.register(data);
            if (response.error) {
                setError(response.error);
                setSuccess("");
                timeoutRef.current = setTimeout(() => setError(""), 5000);
            } else {
                setError("");
                setSuccess("User registered successfully!");
                setTimeout(() => (window.location.href = "/login"), 3000);
            }
        } catch (error) {
            console.error(error); // Debugging API error response
            setError(
                error.response?.data?.error ||
                error.message ||
                "An unknown error occurred"
            );
            setSuccess("");
            timeoutRef.current = setTimeout(() => setError(""), 5000);
        }
    };

    React.useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
                timeoutRef.current = null;
            }
        };
    }, []);

    return (
        <div>
            {error && <div className="alert alert-danger">{error}</div>}
            {success && <div className="alert alert-success">{success}</div>}
            <Container>
                <Form onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" name="username" required />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" name="name" required />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" name="password" required />
                    </Form.Group>
                    <Button type="submit">Register</Button>
                </Form>
            </Container>
        </div>
    );
};

export default Register;
