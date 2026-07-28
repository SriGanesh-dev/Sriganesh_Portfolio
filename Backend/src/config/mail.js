const dns = require("dns");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config();

dns.setDefaultResultOrder("ipv4first");

let sgMail = null;
if (process.env.SENDGRID_API_KEY) {
  try {
    sgMail = require("@sendgrid/mail");
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    console.log("✅ SendGrid configured as primary mail service");
  } catch (err) {
    console.warn("⚠️ Failed to load @sendgrid/mail; falling back to SMTP:", err && err.message);
    sgMail = null;
  }
}

const host = process.env.MAIL_HOST || "smtp.gmail.com";
const port = process.env.MAIL_PORT ? Number(process.env.MAIL_PORT) : 587;
const secure = process.env.MAIL_SECURE === "true" || false;

// Force IPv4 DNS lookup to avoid ENETUNREACH on hosts without IPv6
const lookup = (hostname, options, callback) => {
  const family = 4;
  dns.lookup(hostname, { family }, callback);
};

const smtpTransporter = nodemailer.createTransport({
  host,
  port,
  secure,
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
  lookup,
});

smtpTransporter.verify((err) => {
  if (err) console.warn("⚠️ SMTP transporter verification failed:", err && err.message);
  else console.log("✅ SMTP transporter is ready");
});

async function sendMail({ from, to, subject, text = "", html = "" }) {
  // Try SendGrid first when available
  if (sgMail) {
    const sendGridFrom = process.env.SENDGRID_FROM || process.env.MAIL_USER || process.env.EMAIL_USER;
    const msg = {
      to,
      from: sendGridFrom,
      subject,
      text,
      html,
      replyTo: from,
    };
    try {
      const res = await sgMail.send(msg);
      return { success: true, provider: "sendgrid", response: res };
    } catch (err) {
      console.error("❌ SendGrid send error:", err && err.message);
      if (err.response && err.response.body) {
        console.error("SendGrid response body:", JSON.stringify(err.response.body));
      }
      // fallthrough to SMTP fallback
    }
  }

  // Fallback to SMTP
  try {
    const info = await smtpTransporter.sendMail({ from, to, subject, text, html });
    return { success: true, provider: "smtp", messageId: info.messageId, info };
  } catch (err) {
    console.error("❌ SMTP send error:", err && err.message, err && err.code);
    return { success: false, error: err && err.message, code: err && err.code };
  }
}

module.exports = { sendMail };