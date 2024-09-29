import { useState, useEffect } from 'react';
import { update, create } from './Blogservercalls';

const Add = ({ updateBlog, seterror, setsuccess }) => {
    const [blogData, setBlogData] = useState({ title: '', author: '', url: '', likes: 0 });

    useEffect(() => {
        if (updateBlog) {
            setBlogData({
                title: updateBlog.title,
                author: updateBlog.author,
                url: updateBlog.url,
                likes: updateBlog.likes
            });
        }
    }, [updateBlog]);

    const addBlog = async (e) => {
        e.preventDefault();
        const blog = {
            title: blogData.title,
            author: blogData.author,
            url: blogData.url,
            likes: blogData.likes
        };
        try {
            if (updateBlog) {
                await update(updateBlog.id, blogData);
                setsuccess('Blog updated successfully');
            } else {
                await create(blogData);
                setsuccess('Blog created successfully');
            }
            setBlogData({ title: '', author: '', url: '', likes: 0 });
            seterror(null);
        } catch (error) {
            const errorMessage = error.response?.data?.error || error.message|| 'An error occurred while adding the person.';
            seterror(`Error adding person: ${errorMessage}`);
            setTimeout(() => seterror(''), 5000);
        }
    };

    return (
        <div className='block'>
            <form onSubmit={addBlog}>
                <div className='form-group'>
                    <label>Title</label>
                    <input type='text' className='form-control' value={blogData.title} onChange={(e) => setBlogData({ ...blogData, title: e.target.value })} />
                </div>
                <div className='form-group'>
                    <label>Author</label>
                    <input type='text' className='form-control' value={blogData.author} onChange={(e) => setBlogData({ ...blogData, author: e.target.value })} />
                </div>
                <div className='form-group'>
                    <label>Url</label>
                    <input type='text' className='form-control' value={blogData.url} onChange={(e) => setBlogData({ ...blogData, url: e.target.value })} />
                </div>
                <div className='form-group'>
                    <label>Likes</label>
                    <input type='number' className='form-control' value={blogData.likes} onChange={(e) => setBlogData({ ...blogData, likes: Number(e.target.value) })} />
                </div>
                <button type='submit' className='btn btn-primary'>Add</button>
            </form>
        </div>
    );
}

export default Add;
