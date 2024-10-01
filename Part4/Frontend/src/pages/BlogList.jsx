import React, { useState, useEffect } from "react";
import BlogListCalls from "../api/BlogListCalls";
import List from "../components/List";
import Form from "../components/Form";

function BlogList() {
    const [blogs, setBlogs] = useState([]); // Initialize with an empty array
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [formContent, setFormContent] = useState({});

    useEffect(() => {
        BlogListCalls.getAll().then(initial=> {
            setBlogs(initial);
            setLoading(false);
        });
    }, []);

    // Handle blog deletion
    const handleDelete = async (blog) => {
        setLoading(true);
        try {
            if (window.confirm(`Are you sure you want to delete ${blog.title}?`)) {
                await BlogListCalls.remove(blog.id);
                setSuccess("Blog deleted successfully");
                setBlogs(blogs.filter((b) => b.id !== blog.id)); // Update blog list
            }
        } catch (error) {
            setError(
                error.response?.data?.error ||
                error.message ||
                "An unknown error occurred"
            );
        } finally {
            setLoading(false);
            resetMessages(); // Reset success/error messages
        }
    };

    // Handle blog update
    const handleUpdate = async (id, blog) => {
        setFormContent(blog); // Set current blog content in form
        try {
            await BlogListCalls.update(id, blog);
            setSuccess("Blog updated successfully");
            setBlogs(blogs.map((b) => (b.id === blog.id ? blog : b))); // Update blog in the list
        } catch (error) {
            setError(
                error.response?.data?.error ||
                error.message ||
                "An unknown error occurred"
            );
        } finally {
            resetMessages(); // Reset success/error messages
        }
        setFormContent({}); // Reset form after update
    };

    // Handle form input change
    const handleChange = (event) => {
        setFormContent({ ...formContent, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (formContent) => {
        if (!formContent.title || !formContent.url) {
            setError("Title and URL are required"); // Validate form input
            return;
        }
        try {
            const response = await BlogListCalls.create(formContent);
            console.log("Response from server:", response); // Log the response
            setSuccess("Blog created successfully");
            setBlogs(blogs.concat(response)); // Use response directly if it contains the blog
            setFormContent({}); // Reset form after creation
        } catch (error) {
            console.error("Error during blog creation:", error); // Log the error for debugging
            setError(
                error.response?.data?.error ||
                error.message ||
                "An unknown error occurred"
            );
        } finally {
            resetMessages(); // Reset success/error messages
        }
    };
    
    // Function to reset messages
    const resetMessages = () => {
        setTimeout(() => {
            setSuccess(null);
            setError(null);
        }, 5000);
    };

    return (
        <div>
            {loading && <p>Loading...</p>} {/* Display loading message */}
            {error && <div className="alert danger">{error}</div>} {/* Display error message */}
            {success && <div className="alert success">{success}</div>} {/* Display success message */}

            {/* Render List component */}
            <List
                blogs={blogs}
                handleDelete={handleDelete}
                setFormContent={setFormContent}
            />

            {/* Render Form component */}
            <Form
                formContent={formContent}
                handleChange={handleChange}
                handleSubmit={handleSubmit} // Pass handleSubmit directly
                handleUpdate={handleUpdate}
            />
        </div>
    );
}

export default BlogList;
