import { getAll, remove } from './Blogservercalls'
import { useEffect, useState } from 'react'

const Blog = ({ blog }) => {
    return (
        <div className='block'>
            <h2>{blog.title}</h2>
            <p>{blog.author}</p>
            <p>{blog.url}</p>
            <p>{blog.likes}</p>
        </div>
    );
}

const Blogs = ({setupdateBlog, seterror, setsuccess}) => {
    const [blogs, setBlogs] = useState([]);
    useEffect(() => {
        getAll().then(data => setBlogs(data));
    }, []);

    const handleDelete = (id) => {
        try {
            remove(id).then(() => {
                setsuccess('Blog deleted successfully.');
                getAll().then(data => setBlogs(data));
            }).catch(error => {
                seterror(`Error deleting blog: ${error.response?.data?.error || error.message ||'An error occurred while deleting the blog.'}`);
                setTimeout(() => seterror(''), 5000);
            });
        } catch (error) {
            seterror(`Error deleting blog: ${error.message}`);
            setTimeout(() => seterror(''), 5000);
        }
    };

    const handleUpdate = (blog) => {
        setupdateBlog(blog);
    }

    return (
        <div className='block'>
            {blogs.map(blog => <div className='flex'> <Blog key={blog.id} blog={blog} />
            <Button type="button" key={blog.id} class="btn btn-primary" onClick={handleUpdate(blog)}>update</Button>
            <button type="button" key={blog.id} class="btn btn-danger" onClick={handleDelete(blog.id)}>Delete</button> </div>)}
        </div>
    );
}

export default Blogs