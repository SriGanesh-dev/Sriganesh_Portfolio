const mailer = require("../src/config/mail");

// POST /api/contact/send
exports.sendMessage = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body || {};

    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    const to = process.env.MAIL_TO || process.env.MAIL_USER;
    const mailOptions = {
      from: `"${name}" <${email}>`,
      to,
      subject: subject || `New contact from ${name}`,
      text: message,
      html: `<p><strong>From:</strong> ${name} &lt;${email}&gt;</p><p>${message}</p>`,
    };

    const result = await mailer.sendMail({
      from: mailOptions.from,
      to: mailOptions.to,
      subject: mailOptions.subject,
      text: mailOptions.text,
      html: mailOptions.html,
    });

    if (!result || result.success === false) {
      console.error("Email send failed:", result && result.error);
      return res.status(500).json({ success: false, error: result && result.error });
    }

    const messageId = result.messageId || (result.info && result.info.messageId);
    console.log("Contact email sent:", messageId);

    return res.json({ success: true, messageId });
  } catch (err) {
    console.error("Contact send error:", err);
    return res.status(500).json({ success: false, error: err.message || String(err) });
  }
};