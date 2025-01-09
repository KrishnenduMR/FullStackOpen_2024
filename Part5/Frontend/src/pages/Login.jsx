import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Form as BootstrapForm, Button, Container } from "react-bootstrap";
import AuthCalls from "../api/AuthCalls";

const Login = () => {
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const onSubmit = async (event) => {
        event.preventDefault();

        setError(null); // Reset error state on each submit
        setSuccess(null); // Reset success state on each submit

    const handleChange = (event) => {
            setFormContent({ ...formContent, [event.target.name]: event.target.value });
        };

        try {
            console.log("Logging in");
            const response = await AuthCalls.login({
                username: event.target.username.value,
                password: event.target.password.value,
            });

            const token = response.data.token;
            console.log(token)
            localStorage.setItem("token", token);
            
            setSuccess("Login successful");
            setTimeout(() => setSuccess(null), 10000);

            // Redirect to the BlogList page
            window.location.href = "/blogs";
        } catch (error) {
            console.error("Login failed", error);

            setError(
                error.response?.data?.error ||
                error.message ||
                "An unknown error occurred"
            );

            setTimeout(() => setError(null), 5000);
        }
    };

    return (
        <div>
            <h1>Login to the blog page</h1>

            {error && <div className="alert alert-danger">{error}</div>}
            {success && <div className="alert alert-success">{success}</div>}

            <Container>
                <BootstrapForm onSubmit={onSubmit}>
                    <BootstrapForm.Group>
                        <BootstrapForm.Label>Username</BootstrapForm.Label>
                        <BootstrapForm.Control
                            type="text"
                            name="username"
                            required
                            placeholder="Enter your username"
                        />
                    </BootstrapForm.Group>
                    <BootstrapForm.Group>
                        <BootstrapForm.Label>Password</BootstrapForm.Label>
                        <BootstrapForm.Control
                            type="password"
                            name="password"
                            required
                            placeholder="Enter your password"
                        />
                    </BootstrapForm.Group>
                    <Button variant="primary" type="submit">
                        Login
                    </Button>
                </BootstrapForm>

                <div className="mt-3">
                    <Link to="/register">Register a new account</Link>
                </div>
            </Container>
        </div>
    );
};

export default Login;
