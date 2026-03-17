const nodemailer = require ("nodemailer")



exports.sendEmail =async () =>{
    console.log("📧 sendEmail function called");
    try{
    const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.AUTH_EMAIL,
    pass: process.env.AUTH_PASS,
  },
});


  const info = await transporter.sendMail({
    from: process.env.AUTH_EMAIL,
    to: "saimonpriya57@gmail.com",
    subject: "Hello ✔",
    text: "Hello world?", // Plain-text version of the message
    html: "<b>Hello world?</b>", // HTML version of the message
  });

   console.log("✅ Email sent:", info.response);

  } catch (error) {
    console.log("Email error:", error.message);
  }
}; 

