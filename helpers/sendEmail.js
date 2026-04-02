const { verify } = require("jsonwebtoken");
const nodemailer = require("nodemailer");

exports.sendEmail = async (email, otp, emailtype) => {
  console.log("📧 sendEmail function called");
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.AUTH_EMAIL,
        pass: process.env.AUTH_PASS,
      },
    });

    const info = await transporter.sendMail({
      from: process.env.AUTH_EMAIL,
      to: email,
      subject:
        emailtype == verify
          ? "OTP Varification"
          : "Forgot Password - OTP Verification", // Plain-text version of the message
      html:
        emailtype == verify
          ? `<html><head><meta charset="UTF-8"><title>OTP Verification</title></head><body style="margin:0;padding:0;font-family:Arial,sans-serif;background-color:#f4f4f4"><table width="100%" cellpadding="0" cellspacing="0"><tr><td align="center"><table width="500" cellpadding="0" cellspacing="0" style="background:#fff;margin-top:40px;border-radius:10px;overflow:hidden"><tr><td style="background:#4caf50;color:#fff;text-align:center;padding:20px"><h2 style="margin:0">Ecommerce Shop BD</h2></td></tr><tr><td style="padding:30px;text-align:center;color:#333"><h3>Hello 👋</h3><p style="font-size:16px">Use the OTP below to verify your email address. This OTP is valid for 5 minutes.</p><div style="margin:30px 0"><span style="display:inline-block;padding:15px 25px;font-size:28px;letter-spacing:5px;background:#f1f1f1;border-radius:8px;font-weight:700;color:#333">${otp}</span></div><p style="font-size:14px;color:#777">If you did not request this, please ignore this email.</p></td></tr><tr><td style="background:#f4f4f4;text-align:center;padding:15px;font-size:12px;color:#999">© 2026 Your Company. All rights reserved.</td></tr></table></td></tr></table></body></html>`
          : `<html>
    <head>
        <meta charset="UTF-8">
        <title>Forgot Password OTP</title>
    </head>
    <body style="margin:0;padding:0;font-family:Arial,sans-serif;background-color:#f4f4f4">
        <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
                <td align="center">
                    <table width="500" cellpadding="0" cellspacing="0" style="background:#fff;margin-top:40px;border-radius:10px;overflow:hidden;box-shadow: 0 4px 10px rgba(0,0,0,0.05);">
                        <tr>
                            <td style="background:#4caf50;color:#fff;text-align:center;padding:20px">
                                <h2 style="margin:0">Ecommerce Shop BD</h2>
                            </td>
                        </tr>
                        <tr>
                            <td style="padding:30px;text-align:center;color:#333">
                                <h3 style="color:#4caf50">Forgot Password? 🔑</h3>
                                <p style="font-size:16px;line-height:1.5;">Here’s the English translation:**“Forgot your account password? No worries! Use the OTP code below to reset your password.”**</p>
                                
                                <div style="margin:30px 0">
                                    <p style="font-size:14px;color:#777;margin-bottom:10px">Your varification code:</p>
                                    <span style="display:inline-block;padding:15px 25px;font-size:32px;letter-spacing:8px;background:#f8f9fa;border:1px dashed #4caf50;border-radius:8px;font-weight:700;color:#333">${otp}</span>
                                </div>
                                
                                <p style="font-size:14px;color:#d9534f">**“This code will be valid for the next 5 minutes.”**</p>
                            </td>
                        </tr>
                        <tr>
                            <td style="background:#f4f4f4;text-align:center;padding:15px;font-size:12px;color:#999">
                                © 2026 Ecommerce Shop BD. All rights reserved.
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </body>
    </html>`,
    });

    console.log("✅ Email sent:", info.response);
  } catch (error) {
    console.log("Email error:", error.message);
  }
};
