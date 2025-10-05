const cloudinary = require("../config/cloudinary");

const cloudinaryUpload = async (req, res, next) => {
  if (!req.file && req.method === "POST")
    return res.status(400).json({ message: "No image uploaded" });

  if (!req.file && req.method === "PUT") {
    req.imageUrl = undefined;
    return next();
  }

  try {
    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { resource_type: "image" },
        (err, result) => {
          if (err) reject(err);
          else resolve(result);
        }
      );
      stream.end(req.file.buffer);
    });

    req.imageUrl = result.secure_url;

    next();
  } catch (error) {
    console.error("Cloudinary Upload Error:", error.message);
    res.status(500).json({ message: "Image upload failed" });
  }
};

module.exports = cloudinaryUpload;
