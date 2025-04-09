// nodemailer transporter
import transporter from "../configs/mailer/nodeMailer.config.js";

/**
 * Sends an email using the predefined transporter
 * @param {Object} options - Mail config object
 * @param {string} options.to - Recipient email
 * @param {string} options.subject - Subject of the email
 * @param {string} options.text - Plain text version
 * @param {string} [options.html] - HTML version (optional)
 */
const sendEmail = async ({ to, subject, text, html }) => {
  // Validation
  if (!to || !subject || !text) {
    const missing = [];
    if (!to) missing.push("to");
    if (!subject) missing.push("subject");
    if (!text) missing.push("text");

    return {
      success: false,
      error: `Missing required fields: ${missing.join(", ")}`,
    };
  }

  const mailOptions = {
    from: process.env.NODEMAILER_EMAIL_USER,
    to,
    subject,
    text,
  };

  // Include HTML version only if provided
  if (html) {
    mailOptions.html = html;
  }

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
    return { success: true, info };
  } catch (error) {
    console.error("Email send failed:", error.message);
    return { success: false, error: error.message };
  }
};

export default sendEmail;
