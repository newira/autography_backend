// nodemailer transporter
import transporter from "../configs/mailer/nodeMailer.config.js";

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
  } catch (error) {
    console.error("Email send failed:", error.message);
  }
};

export default sendEmail;
