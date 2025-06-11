const express = require("express");
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Trigger Google OAuth login
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Google OAuth callback
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: `${process.env.FRONTEND_URL}/admin/login`,
  }),
  (req, res) => {
    const user = req.user;

    console.log(user);

    const payload = {
      id: user.id,
      email: user.email,
    };

    const token = jwt.sign(payload, "MY_SECRET_TOKEN");

    const redirectURL =
      `${process.env.FRONTEND_URL}/admin/google-login` +
      `?token=${token}` +
      `&id=${user.id}` +
      `&name=${encodeURIComponent(user.name)}` +
      `&email=${user.email}` +
      `&createdAt=${encodeURIComponent(user.created_at)}` +
      `&loginType=google`;

    res.redirect(redirectURL);
  }
);

router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      console.error("Logout Error:", err);
      return res.status(500).json({
        message: "Logout failed",
      });
    }

    req.session.destroy(() => {
      res.clearCookie("connect.sid");
      res.redirect(`${process.env.FRONTEND_URL}/admin/login`);
    });
  });
});

module.exports = router;
