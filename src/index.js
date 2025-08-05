const express = require("express");
const app = express();
const cors = require("cors");
const sequelize = require("./config/db.config");
const path = require("path");
require("dotenv").config();

const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use((req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  next();
});

// Serve static frontend files
const distPath = path.join(__dirname, "../dist");
app.use(express.static(distPath));

// API routes
app.use("/api", require("./routes"));

// Fallback for client-side routing (SPA)
// app.get("/*", (req, res) => {
//   res.sendFile(path.join(distPath, "index.html"));
// });

// DB connection
sequelize
  .authenticate()
  .then(async () => {
    await sequelize.sync({ force: false, alter: true });
    console.log("Database connection has been established successfully.");
  })
  .catch((err) => {
    console.log("Unable to connect to the database:", err);
  });

app.listen(port, () => {
  console.log("Your Server running at port " + port);
});

module.exports = app;
