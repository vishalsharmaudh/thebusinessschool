import nodemailer from "nodemailer";

// Define the HTML content generator function
const htmlContent = (code) => `
  <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
    <h2 style="color: #009cde; font-size: 22px;">
      Welcome to The Business School, University of Jammu
    </h2>

    <p>Dear Student,</p>

    <p>
      You requested a password reset on our official app —
      <strong>The Business School Jammu</strong>.
    </p>

    <p>
      Your verification code is:
    </p>

    <div style="margin: 20px 0;">
      <span style="font-size: 28px; font-weight: bold; background: #f0f0f0; padding: 10px 20px; border-radius: 6px; display: inline-block; letter-spacing: 3px; color: #222;">
        ${code}
      </span>
    </div>

    <p>This code will expire in <strong>10 minutes</strong>.</p>

    <p>If you did not request this, you can safely ignore this email.</p>

    <p style="margin-top: 40px;">
      Warm regards,<br />
      <strong>Admissions Team</strong><br />
      The Business School<br />
      University of Jammu
    </p>
  </div>
`;
// Main sendEmail function
const sendEmail = async ({ to, subject, text, code, html }) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: `"The Business School" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    text,
    html: html || htmlContent(code), // use the styled template
  });
};
export default sendEmail;
