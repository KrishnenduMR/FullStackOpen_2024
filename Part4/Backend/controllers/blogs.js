const BlogsRouter = require('express').Router();
const Blog = require('../models/blog');

BlogsRouter.get('/', (req, res, next) => {
    Blog.find({})
        .then(blogs => res.json(blogs))
        .catch(err => next(err));
});

BlogsRouter.get('/:id', (req, res, next) => {
    const id = req.params.id;

    Blog.findById(id)
        .then(blog => {
            if (blog) {
                res.json(blog);
            } else {
                res.status(404).send('Blog not found');
            }
        })
        .catch(err => next(err));
});

BlogsRouter.delete('/:id', (req, res, next) => {
    const id = req.params.id;

    Blog.findByIdAndDelete(id)
        .then(deletedBlog => {
            if (!deletedBlog) {
                return res.status(404).json({ error: 'Blog not found' });
            }
            res.json({ message: 'Blog deleted', deletedBlog });
        })
        .catch(err => next(err));
});

BlogsRouter.post('/', (req, res, next) => {
    console.log('Received body:', req.body);

    const { title, author, url, likes } = req.body;
    if (!title || !author || !url) {
        return res.status(400).json({ error: 'Content missing' });
    }

    Blog.findOne({ title })
        .then(existingBlog => {
            if (existingBlog) {
                return res.status(400).json({ error: 'Title must be unique' });
            }

            const blog = new Blog({ title, author, url, likes });
            return blog.save();
        })
        .then(savedBlog => {
            res.json(savedBlog);
            console.log('Blog saved!', savedBlog);
        })
        .catch(err => next(err));
});

BlogsRouter.put('/:id', (req, res, next) => {
    const id = req.params.id;
    const updatedData = req.body;

    if (!updatedData.title || !updatedData.author || !updatedData.url) {
        return res.status(400).json({ error: 'Content missing' });
    }

    Blog.findByIdAndUpdate(id, updatedData, { new: true, runValidators: true })
        .then(updatedBlog => {
            if (updatedBlog) {
                res.json(updatedBlog);
            } else {
                res.status(404).json({ error: 'Blog not found' });
            }
        })
        .catch(err => next(err));
});

module.exports = BlogsRouter;
