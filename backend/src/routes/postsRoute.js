const express = require("express");
const router = express.Router();

const {
  getPostsController,
  createPostController,
  updatePostController,
  deletePostController,
  getAdminPostsController,
} = require("../controllers/postsController");

const authenticateToken = require("../middlewares/authenticate");
const checkRequest = require("../middlewares/checkInput");
const cloudinaryUpload = require("../middlewares/cloudinaryUpload");

const upload = require("../config/multer");

router.get("/", getPostsController);

router.post(
  "/post",
  authenticateToken,
  upload.single("image"),
  cloudinaryUpload,
  createPostController
);

router.get("/post/:adminId", authenticateToken, getAdminPostsController);

router.put(
  "/post/:id",
  authenticateToken,
  upload.single("image"),
  cloudinaryUpload,
  updatePostController
);
router.delete("/post/:id", authenticateToken, deletePostController);

module.exports = router;
