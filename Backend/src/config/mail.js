const dns = require("dns");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config();

dns.setDefaultResultOrder("ipv4first");

const transporter = nodemailer.createTransport({
  service: process.env.MAIL_SERVICE || "gmail",
  auth: {
    user: process.env.MAIL_USER || process.env.EMAIL_USER,
    pass: process.env.MAIL_PASS || process.env.EMAIL_PASS,
  },
  pool: true,
  maxConnections: Number(process.env.MAIL_MAX_CONNECTIONS) || 5,
  maxMessages: Number(process.env.MAIL_MAX_MESSAGES) || 100,
  connectionTimeout: Number(process.env.MAIL_CONNECTION_TIMEOUT) || 10000,
  greetingTimeout: Number(process.env.MAIL_GREETING_TIMEOUT) || 5000,
  socketTimeout: Number(process.env.MAIL_SOCKET_TIMEOUT) || 10000,
  tls: { rejectUnauthorized: false },
});

// Verify SMTP connection when the app starts
transporter.verify((err, success) => {
  if (err) {
    console.error("❌ SMTP Connection Failed", err && err.message);
  } else {
    console.log("✅ Mail Server Connected Successfully");
  }
});

async function sendMail({ to, subject, text = "", html = "", from }) {
  try {
    const info = await transporter.sendMail({
      from: from || `"Sri Ganesh Portfolio" <${process.env.MAIL_USER || process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
      html,
    });

    return { success: true, messageId: info.messageId, info };
  } catch (error) {
    console.error("❌ Email Error:", error && error.message);
    return { success: false, error: error && error.message };
  }
}

module.exports = { sendMail };