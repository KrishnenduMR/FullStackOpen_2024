require('express-async-errors')
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
  const id = req.params.id
  const deletedBlog = await Blog.findByIdAndDelete(id)
  if (!deletedBlog) {
    return res.status(404).json({ error: 'Blog not found' })
  }
  res.status(204).json({ message: 'Blog deleted', deletedBlog })
})

BlogsRouter.post('/', async (req, res) => {
  console.log('Received body:', req.body)

  const { title, author, url, likes, userId } = req.body
  if (!title || !author || !url) {
    return res.status(400).json({ error: 'Content missing' })
  }

  const user = await User.findById(userId)
  if (!user) {
    return res.status(400).json({ error: 'User not found' })
  }

  if(!likes) {
    req.body.likes = 0
  }

  const existingBlog = await Blog.findOne({ title })
  if (existingBlog) {
    return res.status(400).json({ error: 'Title must be unique' })
  }

  const blog = new Blog({ title, author, url, likes, user: user.id })
  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  res.status(201).json(savedBlog)
  console.log('Blog saved!', savedBlog)
})

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
