import { useState, useEffect, useRef } from "react";
import PropTypes from 'prop-types';
import BlogListCalls from "../api/BlogListCalls";
import Loading from "../components/Loading";
import List from "../components/List";
import Form from "../components/Form";
import Filter from "../components/Filter";
import ToggleComp from "../components/ToggleComp";
import { Button } from "react-bootstrap";

function Blogs({token}) {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [formContent, setFormContent] = useState({});
    const [form, setForm] = useState(false);
    const [filter, setFilter] = useState("");
    const BlogListRef = useRef()
    const FilterRef = useRef()
        
    const buttonStyle = {
        margin: "20px",
        display: "block",
        width: "120px",
    };

    useEffect(() => {
            BlogListCalls.getAll(token).then(initial=> {
            setBlogs(initial);
            setLoading(false);
        });
    }, [token]);

    //handle like button
    const handleLike = async (blog) => {
        try {
            const updatedBlog = await BlogListCalls.update(blog.id, {
                ...blog,
                likes: blog.likes + 1,
                user: blog.user.id,
            });
            setBlogs(blogs.map((b) => (b.id === updatedBlog.id ? updatedBlog : b)));
        } catch (error) {
            setError(
                error.response?.data?.error ||
                error.message ||
                "An unknown error occurred"
            );
        } finally {
            resetMessages();
        }
    };

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
            resetMessages(); 
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
        setForm(false); // Close form after update
    };

    // Handle form input change
    const handleChange = (event) => {
        setFormContent({ ...formContent, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (formContent) => {
        setForm(false); // Close form after submission
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
            {loading && <Loading/>} {/* Display loading message */}
            {error && <div className="alert danger">{error}</div>} {/* Display error message */}
            {success && <div className="alert success">{success}</div>} {/* Display success message */}
            {/* Render List component */}
            <ToggleComp style={buttonStyle} buttonLabel='show Blogs' ref={BlogListRef} >
            <Filter setFilter={setFilter} filter={filter} ref={FilterRef} />
            <List
                blogs={blogs}
                handleDelete={handleDelete}
                setFormContent={setFormContent}
                handleLike={handleLike}
                token={token}
                Nfilter={filter}
                setForm={setForm}
            />
            </ToggleComp> 

            {/* Render Form component */}
            <Button style={buttonStyle} onClick={() => setForm(!form)}>add blogs</Button>
            {form && <Form
                formContent={formContent}
                handleChange={handleChange}
                handleSubmit={handleSubmit} 
                handleUpdate={handleUpdate}
            />}
        </div>
    );
}
Blogs.propTypes = {
    token: PropTypes.string.isRequired,
};

export default Blogs;
