import React from "react";
import { Table, Button } from "react-bootstrap";

const List = ({ blogs = [], handleDelete, setFormContent }) => {
    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Author</th>
                    <th>URL</th>
                    <th>Likes</th>
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
                        <td>
                            <Button
                                variant="danger"
                                onClick={() => handleDelete(item)}
                            >
                                Delete
                            </Button>
                            <Button
                                variant="warning"
                                onClick={() => setFormContent(item)}
                                className="ms-2"
                            >
                                Update
                            </Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
};

export default List;
