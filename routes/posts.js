// File handles everything about posts

const express = require("express");
const router = express.Router();
const posts = require("../data/posts");
const error = require("../utilities/error");

