const adminsData = require("../data/adminsData");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const signupNewAdminController = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!password || !name || !email) {
      return res.status(400).json({
        message: `Details Required`,
      });
    } else {
      const adminDb = await adminsData.signupNewAdmin(name, email, password);

      res.status(200).json(adminDb);
    }
  } catch (error) {
    res.status(404).json({
      error: "Something went wrong",
    });
  }
};

const loginAdminController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!password || !email) {
      return res.status(400).json({
        message: `Email and Password required`,
      });
    }

    const result = await adminsData.loginAdmin(email, password);

    if (!result) {
      return res.status(400).json({
        message: `Invalid User Email and Password`,
      });
    } else {
      const isPasswordMatched = await bcrypt.compare(password, result.password);

      if (isPasswordMatched) {
        const payload = {
          id: result.id,
          email: result.email,
        };

        const jwtToken = jwt.sign(payload, "MY_SECRET_TOKEN");

        return res.status(200).json({
          message: "Login Successful",
          jwtToken: jwtToken,
          admin: {
            id: result.id,
            name: result.name,
            email: result.email,
            createdAt: result.created_at,
          },
        });
      } else {
        res.status(401).json({
          message: "Invalid Password",
        });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({
      error: "Something went wrong",
    });
  }
};

module.exports = { signupNewAdminController, loginAdminController };
