//new comments data
// Each comment shows who wrote it (userId) and which post it's on (postId)
const comments = [
  {
    id: 1,
    userId: 1,     // Carey wrote this comment
    postId: 2,     // On the second post
    body: "Great post! Thanks for sharing."
  },
  {
    id: 2,
    userId: 2,     // Mikoto wrote this comment
    postId: 1,     // On the first post
    body: "Interesting perspective!"
  }
];

//lets other files use the comments data
module.exports = comments;