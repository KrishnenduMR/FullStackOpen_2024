import React from "react";
import { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import AuthCalls from "../api/AuthCalls"

const List = ({ blogs = [], handleDelete, setFormContent, handleLike, token}) => {
    const [user, setUser] = useState("");
    useEffect(() => {
            AuthCalls.getUser(token).then((response) => {
            setUser(response);
        });
    }, []);

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
                {blogs.map((item) => (
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
                                onClick={() => setFormContent(item)}
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

export default List;
