const Blog = require('../models/blog');
const User = require('../models/user');
const bcrypt = require('bcrypt');

const initializeDatabase = async () => {
  // Clear existing collections
  await Blog.deleteMany({});
  await User.deleteMany({});

  // Create the root user with a hashed password
  const passwordHash = await bcrypt.hash('secret', 10);
  const rootUser = new User({
    username: 'root',
    name: 'Superuser',
    passwordHash, // Store the hashed password
  });

  const savedUser = await rootUser.save();
  const userId = savedUser._id;

  // Define the initial blogs
  const initialBlogs = [
    {
      title: 'React patterns',
      author: 'Michael Chan',
      url: 'https://reactpatterns.com/',
      likes: 7,
      userId, // Associate blogs with the root user
    },
    {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      userId,
    },
    {
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      likes: 12,
      userId,
    },
    {
      title: 'First class tests',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
      likes: 10,
      userId,
    },
    {
      title: 'TDD harms architecture',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
      likes: 0,
      userId,
    },
    {
      title: 'Type wars',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
      likes: 2,
      userId,
    },
  ];

  // Insert the blogs into the database
  await Blog.insertMany(initialBlogs);
};

const allBlogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0
  }
];

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((acc, blog) => acc + blog.likes, 0);
};

const maxLikes = (blogs) => {
  return blogs.reduce((max, blog) => blog.likes > max.likes ? blog : max, blogs[0]).title;
};

const mostBlogs = (blogs) => {
  const authorCounts = blogs.reduce((acc, blog) => {
    acc[blog.author] = (acc[blog.author] || 0) + 1;
    return acc;
  }, {});

  const topAuthor = Object.keys(authorCounts).reduce((top, author) => {
    return authorCounts[author] > top.count
      ? { author, count: authorCounts[author] }
      : top;
  }, { author: null, count: 0 });

  return { author: topAuthor.author, blogs: topAuthor.count };
};

const mostLikes = (blogs) => {
  const authorLikes = blogs.reduce((acc, blog) => {
    acc[blog.author] = (acc[blog.author] || 0) + blog.likes;
    return acc;
  }, {});

  const topAuthor = Object.keys(authorLikes).reduce((top, author) => {
    return authorLikes[author] > top.likes
      ? { author, likes: authorLikes[author] }
      : top;
  }, { author: null, likes: 0 });

  return { author: topAuthor.author, likes: topAuthor.likes };
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((u) => u.toJSON());
};

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  console.log(blogs);
  return blogs.map((blog) => blog.toJSON());
};

module.exports = {
  dummy,
  totalLikes,
  maxLikes,
  mostBlogs,
  mostLikes,
  initializeDatabase,
  allBlogs,
  blogsInDb,
  usersInDb
};
