require('express-async-errors')
const jwt = require('jsonwebtoken')
const BlogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

BlogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  res.json(blogs)
})

BlogsRouter.get('/:id', async (req, res) => {
  const id = req.params.id
  const blog = await Blog.findById(id)
  if (blog) {
    res.json(blog)
  } else {
    res.status(400).send('Blog not found')
  }
})

BlogsRouter.delete('/:id', async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (!blog) {
    return res.status(404).json({ error: 'Blog not found' });
  }
  if (blog.user.toString() !== req.user.id.toString()) {
    return res.status(403).json({ error: 'Unauthorized to delete this blog' });
  }

  await Blog.findByIdAndDelete(req.params.id);
  res.status(204).end();
});


BlogsRouter.post('/', async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ error: 'User not authenticated' });
  }

  const { title, author, url, likes } = req.body;
  if (!title || !author || !url) {
    return res.status(400).json({ error: 'Content missing' });
  }

  const existingBlog = await Blog.findOne({ title });
  if (existingBlog) {
    return res.status(400).json({ error: 'Title must be unique' });
  }

  const blog = new Blog({ title, author, url, likes, user: req.user._id });
  const savedBlog = await blog.save();
  req.user.blogs = req.user.blogs.concat(savedBlog._id);
  await req.user.save();
  res.status(201).json(savedBlog);
});


BlogsRouter.put('/:id', async (req, res) => {
  const id = req.params.id
  const updatedData = req.body

  if (!updatedData.title || !updatedData.author || !updatedData.url) {
    return res.status(400).json({ error: 'Content missing' })
  }

  const updatedBlog = await Blog.findByIdAndUpdate(id, updatedData, { new: true, runValidators: true })
  if (updatedBlog) {
    res.json(updatedBlog)
  } else {
    res.status(404).json({ error: 'Blog not found' })
  }
})

module.exports = BlogsRouter
