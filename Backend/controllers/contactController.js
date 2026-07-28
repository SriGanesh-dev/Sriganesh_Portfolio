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
      replyTo: `${name} <${email}>`,
    };

    // Respond early to avoid client timeouts; send mail in background
    res.status(202).json({ success: true, message: "Accepted for delivery" });

    // Send asynchronously and log results
    (async () => {
      try {
        const result = await mailer.sendMail({
          from: mailOptions.from,
          to: mailOptions.to,
          subject: mailOptions.subject,
          text: mailOptions.text,
          html: mailOptions.html,
        });

        if (!result || result.success === false) {
          console.error("Email send failed (background):", result && result.error);
        } else {
          const messageId = result.messageId || (result.info && result.info.messageId);
          console.log("✅ Contact email sent (background):", messageId);
        }
      } catch (bgErr) {
        console.error("❌ Background send error:", bgErr && bgErr.message);
      }
    })();

    return;
  } catch (err) {
    console.error("Contact send error:", err);
    return res.status(500).json({ success: false, error: err.message || String(err) });
  }
};