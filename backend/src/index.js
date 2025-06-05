const express = require("express");
const PORT = require("./config/port");
const cors = require("cors");
const db = require("./config/db");
const adminsRoute = require("./routes/adminsRoute");
const postsRoute = require("./routes/postsRoute");
const createTables = require("./config/tableInit");

const app = express();

app.use(express.json());
app.use(cors());
app.use("/", postsRoute);
app.use("/admin", adminsRoute);

app.listen(PORT, async () => {
  console.log(`Server started at http://localhost:${PORT}`);

  createTables();
});
