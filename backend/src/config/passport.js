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

        const res = await pool.query(
          "SELECT * FROM admins WHERE google_id = $1",
          [googleId]
        );

        if (res.rows.length) return done(null, res.rows[0]);

        const newId = uuidv4();
        const insertRes = await pool.query(
          "INSERT INTO admins (id, name, email, google_id) VALUES ($1, $2, $3, $4)",
          [newId, name, email, googleId]
        );
        return done(null, insertRes.rows[0]);
      } catch (err) {
        done(err, null);
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
