// server/sendEmail.js (example standalone script or controller)
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

// Create transporter using Gmail and an App Password
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_ADDRESS,            // your@gmail.com
    pass: process.env.GMAIL_APP_PASSWORD       // 16-char app password from Google
  }
});

// Function to send email
export async function sendContactEmail({ name, email, message }) {
  const mailOptions = {
    from: `"Portfolio Contact" <${process.env.GMAIL_ADDRESS}>`,
    to: process.env.RECEIVER_EMAIL || process.env.GMAIL_ADDRESS, // where to send (your Gmail)
    subject: `New message from ${name} — Portfolio contact form`,
    text: `
You have a new message from your portfolio contact form.

Name: ${name}
Email: ${email}

Message:
${message}
    `,
    html: `
      <h2>New message from your portfolio</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong></p>
      <p>${message.replace(/\n/g, "<br>")}</p>
    `
  };

  return transporter.sendMail(mailOptions); // returns promise
}
