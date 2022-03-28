import nodemailer from "nodemailer";

const adminEmail = "nhom7shopgiay@gmail.com";
const adminPassword = "nhom7AaA";
const mailPort = 587;

const sendMail = (emailCustomer, subject, htmlContent) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    port: mailPort,
    secure: false,
    auth: {
      user: adminEmail,
      pass: adminPassword,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
  const mailOptions = {
    from: `"Thông báo đặt hàng " <${adminEmail}>`,
    to: [adminEmail, emailCustomer],
    subject: subject,
    html: htmlContent,
  };
  return transporter.sendMail(mailOptions);
};

export default sendMail;
