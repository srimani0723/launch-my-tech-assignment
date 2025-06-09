const express = require("express");
const PORT = require("./config/port");
const cors = require("cors");
const passport = require("./config/passport");
const adminsRoute = require("./routes/adminsRoute");
const postsRoute = require("./routes/postsRoute");
const googleRoute = require("./routes/googleRoute");
const createTables = require("./config/tableInit");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(passport.initialize());

app.use("/auth", googleRoute);

app.use("/", postsRoute);
app.use("/admin", adminsRoute);

app.listen(PORT, async () => {
  console.log(`Server started at http://localhost:${PORT}`);

  await createTables();
});
