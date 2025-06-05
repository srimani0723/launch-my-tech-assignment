const postsData = require("../data/postsData");

const getPostsController = async (req, res) => {
  try {
    const result = await postsData.getPosts();

    if (result.length === 0) {
      res.status(200).json({
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

const createPostController = async (req, res) => {
  try {
    const { title, content, admin_id, image } = req.body;

    if (!title || !content || !admin_id) {
      res.status(400).json({
        message: "Provide title, content and admin_id missing!",
      });
    }

    const result = await postsData.createPost(
      title,
      content,
      image ? image : null,
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

    if (!id || !title || !content || !admin_id) {
      res.status(400).json({
        message: "Provide id, title, content and admin_id missing!",
      });
    }

    const result = await postsData.updatePost(
      id,
      title,
      content,
      image ? image : null,
      admin_id
    );

    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({
      error: `Failed to update post: ${error}`,
    });
  }
};

const deletePostController = async (req, res) => {
  try {
    const { id } = req.params;
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
};
