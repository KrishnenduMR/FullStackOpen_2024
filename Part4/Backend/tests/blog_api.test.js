const { test, after, beforeEach, describe } = require('node:test');
const assert = require('node:assert');
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Blog = require('../models/blog');
const helper = require('../utils/list_helper');
const api = supertest(app);

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);
});

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs');
  assert.strictEqual(response.body.length, helper.initialBlogs.length);
});

test('id is defined', async () => {
  const response = await api.get('/api/blogs');
  assert(response.body[0].id);
});

test('a valid blog can be added', async () => {
  const newBlog = {
    title: "Real Divine",
    author: "Michael Chanion",
    url: "https://realdivine.com",
    likes: 12
  };

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const blogsAtEnd = await helper.blogsInDb();
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1);

  const titles = blogsAtEnd.map(b => b.title);
  assert(titles.includes('Real Divine'));
});

test('a blog without likes has default 0 added', async () => {
  const newBlog = {
    title: "hero",
    author: "Michael Chan",
    url: "https://hero.com"
  };

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201);

  const blogsAtEnd = await helper.blogsInDb();
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1);

  const likes = blogsAtEnd.find(blog => blog.title === 'hero')?.likes;
  assert.strictEqual(likes, 0);
});

test('a blog without title or url doesn\'t get added', async () => {
  const newBlog = {
    author: "Michael Chan"
  };

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400);

  const blogsAtEnd = await helper.blogsInDb();
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length);
});

test('a blog can be updated', async () => {
  const blogsAtStart = await helper.blogsInDb();
  const blogToUpdate = blogsAtStart[0];

  const updatedBlog = {
    title: blogToUpdate.title,
    author: blogToUpdate.author,
    url: blogToUpdate.url,
    likes: blogToUpdate.likes + 10
  };

  const response = await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send(updatedBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/);

  assert.strictEqual(response.body.likes, blogToUpdate.likes + 10);

  const blogsAtEnd = await helper.blogsInDb();
  const updatedBlogFromDb = blogsAtEnd.find(blog => blog.id === blogToUpdate.id);
  assert.strictEqual(updatedBlogFromDb.likes, blogToUpdate.likes + 10);
});

describe('viewing a specific blog', () => {
  test('succeeds with a valid id', async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToView = blogsAtStart[0];

    const resultBlog = await api
      .get(`/api/blogs/${blogToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    assert.deepStrictEqual(resultBlog.body, blogToView);
  });

  test('fails with status code 400 if id is invalid', async () => {
    const invalidId = '12345';

    await api
      .get(`/api/blogs/${invalidId}`)
      .expect(400);
  });
});

describe('deletion of a blog', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToDelete = blogsAtStart[0];

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204);

    const blogsAtEnd = await helper.blogsInDb();
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1);

    const titles = blogsAtEnd.map(blog => blog.title);
    assert(!titles.includes(blogToDelete.title));
  });
});

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(helper.initialBlogs);
});

after(async () => {
  await mongoose.connection.close();
});
