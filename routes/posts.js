// File handles everything about posts

const express = require("express");
const router = express.Router();
const posts = require("../data/posts");
const error = require("../utilities/error");

// When someone wants to see ALL posts
router.get("/", (req, res) => {
  const links = [
    {
      href: "posts/:id",
      rel: ":id",
      type: "GET",
    },
  ];
  res.json({ posts, links });
});
// When someone wants to create a NEW post
router.post("/", (req, res, next) => { 
  // Make sure they send the info needed
  if (req.body.userId && req.body.title && req.body.content) {
    const post = {
      id: posts[posts.length - 1].id + 1,  // Give it the next available ID
      userId: req.body.userId,
      title: req.body.title,
      content: req.body.content,
    };
    posts.push(post);
    res.json(posts[posts.length - 1]);
  } else next(error(400, "Insufficient Data"));
});
