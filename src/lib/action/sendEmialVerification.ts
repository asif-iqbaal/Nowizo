"use server"

import nodemailer from "nodemailer";

export default async function sendVerificationEmail(email: string, link: string) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_ADDRESS,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

 try {
    await transporter.sendMail({
  from: `"Nowizo" <${process.env.EMAIL_ADDRESS}>`,
  to: email,
  subject: "Verify your email",
  html: `
  <div style="font-family: sans-serif; background: #fff; padding: 20px;">
    <h2 style="color: #333;">Welcome to Nowizo 👋</h2>
    <p>Hi there!</p>
    <p>Thanks for signing up. Please click the button below to verify your email address:</p>
    <a href="${link}" style="
      background-color: #4f46e5;
      color: white;
      padding: 10px 20px;
      text-decoration: none;
      border-radius: 5px;
      display: inline-block;
    ">Verify Email</a>
    <p>If you didn’t request this, you can safely ignore it.</p>
    <p>— The Nowizo Team</p>
  </div>
`
,
  })
 } catch (error:any) {
    console.log(error);
 }
}
