const express = require("express");
const router = express.Router();
const passport = require("../config/passport");
const jwt = require("jsonwebtoken");

// Trigger Google OAuth login
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Google OAuth callback
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login-failed" }),
  (req, res) => {
    const user = req.user;

    // Create JWT token payload
    const payload = {
      id: user.id,
      email: user.email,
    };

    // Sign JWT token (set expiry as you want)
    const token = jwt.sign(payload, "MY_SECRET_TOKEN", {
      expiresIn: "1d",
    });

    // Send response with token + user info
    res.status(200).json({
      message: "Login Successful",
      jwtToken: token,
      admin: {
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: user.created_at,
      },
    });
  }
);

// Failure route
router.get("/login-failed", (req, res) => {
  res.status(401).json({ message: "Google login failed" });
});

module.exports = router;
