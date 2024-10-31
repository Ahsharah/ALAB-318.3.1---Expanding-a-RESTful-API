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
// When someone wants to make a NEW comment
router.post("/", (req, res, next) => {
    // Check if they sent everything needed
    if (req.body.userId && req.body.postId && req.body.body) {
      const comment = {
        id: comments[comments.length - 1].id + 1,  
        // Give it the next ID number
        userId: req.body.userId,
        postId: req.body.postId,
        body: req.body.body
      };
      
      comments.push(comment);
      res.json(comment);
    } else {
      next(error(400, "Please provide userId, postId, and body"));
    }
  });