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