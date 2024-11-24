const { test, after, beforeEach, describe } = require('node:test');
const assert = require('node:assert');
const mongoose = require('mongoose');
const supertest = require('supertest');
const jwt = require('jsonwebtoken');
const app = require('../app');
const helper = require('../utils/list_helper');
const api = supertest(app);
const User = require('../models/user');

let token;

const generateToken = async (username) => {
  const user = await User.findOne({ username });
  if (!user) {
    console.log('User not found');
    throw new Error('User not found');
  }
  const userForToken = { username: user.username, id: user._id };
  const token = jwt.sign(userForToken, process.env.SECRET);
  return token;
};

beforeEach(async () => {
  await helper.initializeDatabase();
  token = await generateToken('root');
});

after(async () => {
  await mongoose.connection.close();
});

describe('User API tests', () => {
  test('creation fails with proper status code and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'secret',
    };

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    assert.strictEqual(usersAtEnd.length, usersAtStart.length);
  });

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    };

    try {
      await api
        .post('/api/users')
        .send(newUser)
        .expect(201)
        .expect('Content-Type', /application\/json/);
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }

    const usersAtEnd = await helper.usersInDb();
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1);

    const usernames = usersAtEnd.map((u) => u.username);
    assert(usernames.includes(newUser.username));
  });
});

describe('Blog API tests', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .set('authorization', `Bearer ${token}`)
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('all blogs are returned', async () => {
    const response = await api
      .get('/api/blogs')
      .set('authorization', `Bearer ${token}`);
    const blogsAtStart = await helper.blogsInDb();
    assert.strictEqual(response.body.length, blogsAtStart.length);
  });

  test('a valid blog can be added', async () => {
    const user = await User.findOne({ username: 'root' });
    const newBlog = {
      title: 'New Blog',
      author: 'Test Author',
      url: 'http://testblog.com',
      likes: 10,
      userId: user._id,
    };

    await api
      .post('/api/blogs')
      .set('authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    const titles = blogsAtEnd.map((b) => b.title);
    assert(titles.includes('New Blog'));
  });

  test('a blog can be updated', async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToUpdate = blogsAtStart[0];

    const updatedBlog = { ...blogToUpdate, likes: blogToUpdate.likes + 1 };

    const response = await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .set('authorization', `Bearer ${token}`)
      .send(updatedBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    assert.strictEqual(response.body.likes, blogToUpdate.likes + 1);
  });

  test('a blog can be deleted', async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToDelete = blogsAtStart[0];
    try {
      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .set('authorization', `Bearer ${token}`)
        .expect(204);
    } catch (error) {
      console.error('Error deleting blog:', error);
      throw error;
    }

    const blogsAtEnd = await helper.blogsInDb();
    assert.strictEqual(blogsAtEnd.length, blogsAtStart.length - 1);
  });
});

describe('Token validation tests', () => {
  test('unauthorized request fails with 401', async () => {
    const user = await User.findOne({ username: 'root' });
    const newBlog = {
      title: 'Unauthorized Blog',
      author: 'Test Author',
      url: 'http://testblog.com',
      likes: 5,
      userId: user._id,
    };

    const result = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401);

    console.log('Unauthorized Error:', result.body.error); // Debug the error
  });

  test('request with invalid token fails with 401', async () => {
    const invalidToken = 'invalid.token.here';
    const user = await User.findOne({ username: 'root' });
    const newBlog = {
      title: 'Invalid Token Blog',
      author: 'Test Author',
      url: 'http://testblog.com',
      likes: 5,
      userId: user._id,
    };

    const result = await api
      .post('/api/blogs')
      .set('authorization', `Bearer ${invalidToken}`)
      .send(newBlog)
      .expect(401);

    console.log('Invalid Token Error:', result.body.error); // Debug the error
  });
});
