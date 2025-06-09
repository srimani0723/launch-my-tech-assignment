const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const pool = require("./db");
require("dotenv").config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    async (issuer, profile, cb) => {
      console.log("Response at Passport Profile", issuer, profile, cb);

      const googleId = profile.id;
      const name = profile.displayName;
      const email = profile.emails[0].value;

      const res = await pool.query(
        "SELECT * FROM admins WHERE google_id = $1",
        [googleId]
      );

      console.log("Response at Passport", res);

      //   if (res.rows.length) return done(null, res.rows[0]);

      //   const newId = googleId; // or UUID generator
      //   const insertRes = await pool.query(
      //     "INSERT INTO admins (id, name, email, google_id) VALUES ($1, $2, $3, $4) RETURNING *",
      //     [newId, name, email, googleId]
      //   );
      //   return done(null, insertRes.rows[0]);
      // } catch (err) {
      //   done(err, null);
      // }
    }
  )
);

module.exports = passport;
