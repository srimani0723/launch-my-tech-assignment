const express = require("express");
const PORT = require("./config/port");
const cors = require("cors");
const adminsRoute = require("./routes/adminsRoute");
const postsRoute = require("./routes/postsRoute");
const googleRoute = require("./routes/googleRoute");
const createTables = require("./config/tableInit");

const passport = require("./config/passport");
const session = require("express-session");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "*" }));

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", googleRoute);

app.use("/", postsRoute);
app.use("/admin", adminsRoute);

app.listen(PORT, async () => {
  console.log(`Server started at http://localhost:${PORT}`);
  await createTables();
});
