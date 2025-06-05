const pool = require("./db");
const fs = require("fs");
const path = require("path");

const schemaPath = path.join(__dirname, "../models/schema.sql");
const schema = fs.readFileSync(schemaPath, "utf-8");

const createTables = async () => {
  try {
    await pool.query(schema);
    console.log("Tables Initiated");
  } catch (error) {
    console.error("Error in creating tables:", error);
  }
};

module.exports = createTables;
