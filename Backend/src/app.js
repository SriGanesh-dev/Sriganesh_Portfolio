const express = require("express");
const cors = require("cors");

const contactRoutes = require("../routes/contactRoutes");
const resumeRoutes = require("../routes/resumeRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/contact", contactRoutes);
app.use("/api/resume", resumeRoutes);

app.get("/", (req, res) => {
  res.send("Portfolio backend running");
});

module.exports = app;