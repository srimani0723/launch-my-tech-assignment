const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const pool = require("./db");
require("dotenv").config();
const { v4: uuidv4 } = require("uuid");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const googleId = profile.id;
        const name = profile.displayName;
        const email = profile.emails[0].value;

        const res = await pool.query("SELECT * FROM admins WHERE email = $1", [
          email,
        ]);

        if (res.rows.length) return done(null, res.rows[0]);

        const insertRes = await pool.query(
          "INSERT INTO admins (id, name, email, google_id) VALUES ($1, $2, $3, $4)",
          [uuidv4(), name, email, googleId]
        );

        const data = await pool.query("SELECT * FROM admins WHERE email = $1", [
          email,
        ]);

        return done(null, data.rows[0]);
      } catch (err) {
        done(`Passport Error:${err}`, null);
      }
    }
  )
);

passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser(async (id, done) => {
  try {
    const res = await pool.query("SELECT * FROM admins WHERE id = $1", [id]);
    if (!res.rows.length) return done(null, false);
    done(null, res.rows[0]);
  } catch (error) {
    console.error("Deserialization Error:", error);
    done(error, null);
  }
});

module.exports = passport;
