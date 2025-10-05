const pool = require("../config/db");
const { v4: uuidv4 } = require("uuid");

const getPosts = async () => {
  try {
    const query = `
    SELECT posts.*,
    admins.name AS admin_name
    FROM posts
    JOIN admins ON posts.admin_id = admins.id
    ORDER BY created_at DESC; `;
    const result = await pool.query(query);
    return result.rows;
  } catch (error) {
    console.log("PostsData GET Error:", error);
  }
};

const getAdminPosts = async (adminId) => {
  try {
    const adminCheck = `select * from admins where id = $1`;

    const exist = await pool.query(adminCheck, [adminId]);

    if (!exist.rows[0]) {
      return {
        message: "adminId Invalid!",
      };
    }

    const query = `
    SELECT
    posts.id AS postId,
    posts.admin_id AS adminsId,
    posts.title,
    posts.content,
    posts.image,
    posts.created_at AS createdAt,
    admins.name,
    admins.email,
    admins.created_at AS adminCreatedAt
    FROM posts
    JOIN admins ON posts.admin_id = admins.id
    WHERE admin_id = $1
    ORDER BY posts.created_at DESC; `;
    const result = await pool.query(query, [adminId]);

    return result.rows;
  } catch (error) {
    console.log("PostsData Admin GET Error:", error);
  }
};

const createPost = async (title, content, image, admin_id) => {
  try {
    const adminCheck = `select * from admins where id = $1`;

    const exist = await pool.query(adminCheck, [admin_id]);

    if (!exist.rows[0]) {
      return {
        message: "admin_id Invalid!",
      };
    }

    const query = `
        INSERT INTO posts (id,title,content,image,admin_id)
        VALUES ($1,$2,$3,$4,$5);
        `;
    const result = await pool.query(query, [
      uuidv4(),
      title,
      content,
      image,
      admin_id,
    ]);

    return {
      message: "Successfully post created",
    };
  } catch (error) {
    console.log("PostsData POST Error:", error);
  }
};

const updatePost = async (id, title, content, image, admin_id) => {
  try {
    const admin = `select * from posts where id = $1`;
    const exist = await pool.query(admin, [id]);

    const pastImage = exist.rows[0].image;

    const updatedImage = image !== null ? image : pastImage;

    const query = `
        UPDATE posts
        SET title = $1, content = $2,image = $3, admin_id = $4
        WHERE id = $5
        `;
    const result = await pool.query(query, [
      title,
      content,
      updatedImage,
      admin_id,
      id,
    ]);

    return {
      message: "Successfully post updated",
    };
  } catch (error) {
    console.log("PostsData PUT Error:", error);
  }
};

const deletePost = async (id) => {
  try {
    const query = `
      DELETE FROM posts
      WHERE id=$1
        `;
    const result = await pool.query(query, [id]);

    return {
      message: "Successfully post deleted",
    };
  } catch (error) {
    console.log("PostsData DELETE Error:", error);
  }
};

module.exports = {
  getPosts,
  createPost,
  updatePost,
  deletePost,
  getAdminPosts,
};
