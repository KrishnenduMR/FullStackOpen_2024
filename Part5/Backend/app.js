const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const BlogsRouter = require('./routes/blogs')
const usersRouter = require('./routes/users')
const loginRouter = require('./routes/login')
const getUserRouter = require('./routes/getUser')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')
require('express-async-errors')

mongoose.set('strictQuery', false)

logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message)
  })

app.use(cors())

app.use(express.static('dist'))
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/auth/register', usersRouter)
app.use('/api/auth/user', getUserRouter)
app.use('/api/auth/login', loginRouter)
app.use('/api/blogs', BlogsRouter)

app.use(middleware.errorHandler)
app.use(middleware.unknownEndpoint)

module.exports = app