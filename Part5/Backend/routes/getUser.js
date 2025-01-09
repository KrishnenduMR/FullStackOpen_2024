const getUserRouter = require('express').Router()
const userExtractor = require('../utils/middleware').userExtractor


getUserRouter.get('/', userExtractor, async (request, response) => {
    const user = request.user
    response.send(user.username)
    });

module.exports = getUserRouter