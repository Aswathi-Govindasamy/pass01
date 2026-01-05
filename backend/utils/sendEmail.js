import nodemailer from "nodemailer";

export const sendResetEmail = async (email, resetLink) => {
  console.log("📨 Attempting to send email to:", email);

  const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    secure: false,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  const info = await transporter.sendMail({
    from: process.env.MAIL_FROM,
    to: email,
    subject: "Password Reset",
    html: `
      <h3>Password Reset</h3>
      <p>Click the link below:</p>
      <a href="${resetLink}">${resetLink}</a>
    `,
  });

  console.log("✅ Email sent. Message ID:", info.messageId);
};
