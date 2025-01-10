import React,{ Form as BootstrapForm, Button, Container } from "react-bootstrap";
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
                <BootstrapForm onSubmit={handleSubmit}>
                    <BootstrapForm.Group>
                        <BootstrapForm.Label>Username</BootstrapForm.Label>
                        <BootstrapForm.Control type="text" name="username" required />
                    </BootstrapForm.Group>
                    <BootstrapForm.Group>
                        <BootstrapForm.Label>Name</BootstrapForm.Label>
                        <BootstrapForm.Control type="text" name="name" required />
                    </BootstrapForm.Group>
                    <BootstrapForm.Group>
                        <BootstrapForm.Label>Password</BootstrapForm.Label>
                        <BootstrapForm.Control type="password" name="password" required />
                    </BootstrapForm.Group>
                    <Button type="submit">Register</Button>
                </BootstrapForm>
            </Container>
        </div>
    );
};

export default Register;
