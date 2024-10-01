import React from "react";
import { Form as BootstrapForm, Button, Container } from "react-bootstrap";

const Form = ({ formContent, handleChange, handleSubmit, handleUpdate }) => {
    const { id, title, author, url, likes } = formContent || {};

    const onSubmit = (event) => {
        event.preventDefault();
        if (id) {
            handleUpdate(id, formContent);
        } else {
            handleSubmit(formContent);
        }
    };

    return (
        <Container>
            <BootstrapForm onSubmit={onSubmit}>
                <BootstrapForm.Group>
                    <BootstrapForm.Label>Title</BootstrapForm.Label>
                    <BootstrapForm.Control
                        type="text"
                        value={title || ""}
                        onChange={handleChange}
                        name="title"
                    />
                </BootstrapForm.Group>

                <BootstrapForm.Group>
                    <BootstrapForm.Label>Author</BootstrapForm.Label>
                    <BootstrapForm.Control
                        type="text"
                        value={author || ""}
                        onChange={handleChange}
                        name="author"
                    />
                </BootstrapForm.Group>

                <BootstrapForm.Group>
                    <BootstrapForm.Label>URL</BootstrapForm.Label>
                    <BootstrapForm.Control
                        type="text"
                        value={url || ""}
                        onChange={handleChange}
                        name="url"
                    />
                </BootstrapForm.Group>

                <BootstrapForm.Group>
                    <BootstrapForm.Label>Likes</BootstrapForm.Label>
                    <BootstrapForm.Control
                        type="number"
                        value={likes || 0}
                        onChange={handleChange}
                        name="likes"
                    />
                </BootstrapForm.Group>

                <Button variant="primary" type="submit">
                    {id ? "Update" : "Submit"}
                </Button>
            </BootstrapForm>
        </Container>
    );
};

export default Form;
