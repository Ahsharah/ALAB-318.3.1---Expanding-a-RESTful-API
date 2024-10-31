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
// When someone wants to see a SPECIFIC post
router.get("/:id", (req, res, next) => {
  const post = posts.find((p) => p.id == req.params.id);
  const links = [
    {
      href: `/${req.params.id}`,
      rel: "",
      type: "PATCH",
    },
    {
      href: `/${req.params.id}`,
      rel: "",
      type: "DELETE",
    },
  ];
  if (post) res.json({ post, links });
  else next();
});
// When someone wants to UPDATE a post
router.patch("/:id", (req, res, next) => {
  const post = posts.find((p, i) => {
    if (p.id == req.params.id) {
      // Update any info they send
      for (const key in req.body) {
        posts[i][key] = req.body[key];
      }
      return true;
    }
  });
  if (post) res.json(post);
  else next();
});
// When someone wants to DELETE a post
router.delete("/:id", (req, res, next) => {
  const post = posts.find((p, i) => {
    if (p.id == req.params.id) {
      posts.splice(i, 1);  
      // Remove it from the list
      return true;
    }
  });
  if (post) res.json(post);
  else next();
});

module.exports = router;