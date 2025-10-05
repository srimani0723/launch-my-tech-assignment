const pool = require("../config/db");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcryptjs");

const signupNewAdmin = async (name, email, password, google_id = null) => {
  try {
    const admin = `SELECT * FROM admins WHERE email = $1`;

    const exist = await pool.query(admin, [email]);

    if (exist.rows[0]) {
      return {
        message: "Admin Already Exists",
      };
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const query = `
        INSERT INTO
            admins(id,name,email,password,google_id)
        VALUES
            ($1,$2,$3,$4,$5);
    `;
    const data = await pool.query(query, [
      uuidv4(),
      name,
      email,
      hashedPassword,
      google_id,
    ]);

    return {
      message: `Admin Created Successfully`,
    };
  } catch (error) {
    console.log("Database error", error.message);
  }
};

const loginAdmin = async (email, password) => {
  try {
    const query = `
    SELECT *
    FROM admins
    WHERE email = $1;
    `;
    const data = await pool.query(query, [email]);

    return data.rows[0];
  } catch (error) {
    console.log("Database error", error.message);
  }
};

module.exports = { signupNewAdmin, loginAdmin };
