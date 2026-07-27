const express = require("express");
const router = express.Router();

const { downloadResume } = require("../controllers/resumeController");

router.get("/download", downloadResume);

module.exports = router;