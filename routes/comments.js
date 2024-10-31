// routes/comments.js
// This file handles everything about comments!

const express = require("express");
const router = express.Router();
const comments = require("../data/comments");
const error = require("../utilities/error");
// When someone wants to see ALL comments
router.get("/", (req, res) => {
    // Start with all comments
    let commentList = [...comments];
  
    // If they want comments from a specific user
    if (req.query.userId) {
      commentList = commentList.filter(
        comment => comment.userId == req.query.userId
      );
    }// If they want comments on a specific post
  if (req.query.postId) {
    commentList = commentList.filter(
      comment => comment.postId == req.query.postId
    );
  }

  // Send them back with some helpful links
  const links = [
    {
      href: "comments/:id",
      rel: ":id",
      type: "GET",
    }
  ];
  res.json({ comments: commentList, links });
});