import { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import AuthCalls from "../api/AuthCalls";
import PropTypes from 'prop-types';

const List = ({ blogs = [], handleDelete, setFormContent, handleLike, token, Nfilter, setForm}) => {
    const [user, setUser] = useState("");
    useEffect(() => {
            AuthCalls.getUser(token).then((response) => {
            setUser(response);
        });
    }, [token]);

    const ButtonUpdate = (item) => {
        return () => {
            setFormContent(item);
            setForm(true);
        }
    }
    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Author</th>
                    <th>URL</th>
                    <th>Likes</th>
                    <th>uploaded by</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {blogs.filter(item => Nfilter !== '' ? item.title.toLowerCase().includes(Nfilter.toLowerCase()) ||
                item.author.toLowerCase().includes(Nfilter.toLowerCase()) : true).map((item) => ( 
                    <tr key={item.id}>
                        <td>{item.title}</td>
                        <td>{item.author}</td>
                        <td>{item.url}</td>
                        <td>{item.likes}</td>
                        <td>{item.user.username}</td>
                        <td>
                            {user === item.user.username  && <Button
                                variant="danger"
                                onClick={() => handleDelete(item)}
                            >
                                Delete
                            </Button>}
                            {user === item.user.username && <Button
                                variant="warning"
                                onClick={ButtonUpdate(item)}
                                className="ms-2"
                            >
                                Update
                            </Button>}
                            <Button
                                variant="info"
                                onClick={() => handleLike(item)}
                                className="ms-2"    
                            >Like
                            </Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
};

List.propTypes = {
    blogs: PropTypes.array.isRequired,
    handleDelete: PropTypes.func.isRequired,
    setFormContent: PropTypes.func.isRequired,
    handleLike: PropTypes.func.isRequired,
    token: PropTypes.string.isRequired,
    Nfilter: PropTypes.string.isRequired,
    setForm: PropTypes.func.isRequired,
};

export default List;
