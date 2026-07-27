const path = require("path");

exports.downloadResume = (req, res) => {
  const filePath = path.join(__dirname, "../uploads/Sri_Ganesh_B_Resume.pdf");

  res.download(filePath, "SriGanesh_B_Resume.pdf", (err) => {
    if (err) {
      res.status(500).json({
        success: false,
        message: "Resume download failed",
      });
    }
  });
};