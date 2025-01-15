import { Form as BootstrapForm, Button, Container } from "react-bootstrap";
import PropTypes from 'prop-types';

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
                        data-testid='title'
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
                        data-testid='author'
                    />
                </BootstrapForm.Group>

                <BootstrapForm.Group>
                    <BootstrapForm.Label>URL</BootstrapForm.Label>
                    <BootstrapForm.Control
                        type="text"
                        value={url || ""}
                        onChange={handleChange}
                        name="url"
                        data-testid='url'
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
Form.propTypes = {
    formContent: PropTypes.shape({
        id: PropTypes.string,
        title: PropTypes.string,
        author: PropTypes.string,
        url: PropTypes.string,
        likes: PropTypes.number,
    }),
    handleChange: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    handleUpdate: PropTypes.func.isRequired,
};

export default Form;

