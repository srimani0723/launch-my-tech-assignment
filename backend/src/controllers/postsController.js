const postsData = require("../data/postsData");

const getPostsController = async (req, res) => {
  try {
    const result = await postsData.getPosts();

    if (result.length === 0) {
      return res.status(200).json({
        message: "No posts available",
      });
    }

    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({
      error: `Failed to get posts: ${error}`,
    });
  }
};

const getAdminPostsController = async (req, res) => {
  try {
    const { adminId } = req.params;
    const result = await postsData.getAdminPosts(adminId);
    if (result.message) {
      return res.status(200).json(result);
    }

    if (result.length === 0) {
      return res.status(200).json([]);
    }

    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({
      error: `Failed to get posts: ${error}`,
    });
  }
};

const createPostController = async (req, res) => {
  try {
    const { title, content, image, admin_id } = req.body;

    const imageUrl = req.imageUrl;

    if (!title || !content || !admin_id || !imageUrl) {
      return res.status(400).json({
        message: "Provide title, content, image and admin_id missing!",
      });
    }

    const result = await postsData.createPost(
      title,
      content,
      imageUrl,
      admin_id
    );

    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({
      error: `Failed to create post: ${error}`,
    });
  }
};

const updatePostController = async (req, res) => {
  try {
    const { title, content, image, admin_id } = req.body;
    const { id } = req.params;
    const imageUrl = req.imageUrl ? req.imageUrl : image;

    if (!id || !title || !content || !admin_id) {
      return res.status(400).json({
        message: "Provide id, title, content, image and admin_id missing!",
      });
    }

    const result = await postsData.updatePost(
      id,
      title,
      content,
      imageUrl,
      admin_id
    );

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      error: `Failed to update post: ${error}`,
    });
  }
};

const deletePostController = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const result = await postsData.deletePost(id);
    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({
      error: `Failed to delete post: ${error}`,
    });
  }
};

module.exports = {
  getPostsController,
  createPostController,
  updatePostController,
  deletePostController,
  getAdminPostsController,
};
