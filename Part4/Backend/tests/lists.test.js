const { test, describe } = require('node:test');
const assert = require('node:assert');
const helper = require('../utils/list_helper');

test('dummy returns one', () => {
  const blogs = [];
  const result = helper.dummy(blogs);
  assert.strictEqual(result, 1);
});

test('mostBlogs returns the author with the most blogs', () => {
  const result = helper.mostBlogs(helper.allBlogs);
  assert.deepStrictEqual(result, { author: "Robert C. Martin", blogs: 3 });
});

test('mostLikes returns the author with the most likes', () => {
  const result = helper.mostLikes(helper.allBlogs);
  assert.deepStrictEqual(result, { author: "Edsger W. Dijkstra", likes: 17 });
});

test('blog with the most likes', () => {
  const result = helper.maxLikes(helper.allBlogs);
  assert.deepStrictEqual(result,"Canonical string reduction");
});

test('total likes', () => {
  const result = helper.totalLikes(helper.allBlogs);
  assert.strictEqual(result, 36);
});