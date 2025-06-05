const express = require("express");
const router = express.Router();

const {
  signupNewAdminController,
  loginAdminController,
} = require("../controllers/adminsController");

const checkRequest = require("../middlewares/checkInput");

router.post("/signup", checkRequest, signupNewAdminController);
router.post("/login", checkRequest, loginAdminController);

module.exports = router;
