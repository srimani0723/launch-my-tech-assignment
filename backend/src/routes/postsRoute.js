const express = require("express");
const router = express.Router();

const {
  getPostsController,
  createPostController,
  updatePostController,
  deletePostController,
} = require("../controllers/postsController");

const authenticateToken = require("../middlewares/authenticate");
const checkRequest = require("../middlewares/checkInput");

router.get("/", getPostsController);
router.post("/post", authenticateToken, checkRequest, createPostController);
router.put("/post/:id", authenticateToken, updatePostController);
router.delete("/post/:id", authenticateToken, deletePostController);

module.exports = router;
