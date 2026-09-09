const express = require("express");

const app = express();

app.use(express.json());

// Search routes
const searchRoutes = require("./searchRoutes");
app.use("/", searchRoutes);

module.exports = app;
