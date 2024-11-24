const supertest = require('supertest')
const mongoose = require('mongoose')
const { test, describe, after, beforeEach } = require('node:test')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')
const assert = require('assert')

const User = require('../models/user')

describe('users', () => {
  
  test('a valid user can be added', async () => {
    const newUser = {
      username: "new8user",
      name: "New User",
      password: "password"
    }

    const usersAtStart = await helper.usersInDb()

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(201)

    assert.strictEqual(response.body.username, newUser.username)
    assert.strictEqual(response.body.name, newUser.name)

    const usersAtEnd = await helper.usersInDb()

  })

  test('user without username is not added', async () => {
    const newUser = {
      name: "New User",
      password: "password"
    }

    const usersAtStart = await helper.usersInDb()

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    const usersAtEnd = await helper.usersInDb()
  })

  test('user without password is not added', async () => {
    const newUser = {
      username: "newuser",
      name: "New User"
    }

    const usersAtStart = await helper.usersInDb()

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    const usersAtEnd = await helper.usersInDb()
  })

  test.only('same username can not be added twice' , async () => {
    const newUser = {
      username: "new8user",
      name: "New User",
      password: "password"
    }
  
    await api
      .post('/api/users')
      .send(newUser)
  
    const usersAtStart = await helper.usersInDb()

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
  
    const usersAtEnd = await helper.usersInDb()
  })

  after(() => {
    mongoose.connection.close()
  })
})