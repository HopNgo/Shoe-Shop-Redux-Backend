import nodemailer from "nodemailer";
import { OAuth2Client } from "google-auth-library";

const sendMail = async (emailCustomer, subject, htmlContent) => {
  const GOOGLE_MAILER_CLIENT_ID = process.env.GOOGLE_MAILER_CLIENT_ID;
  const GOOGLE_MAILER_CLIENT_SECRET = process.env.GOOGLE_MAILER_CLIENT_SECRET;
  const GOOGLE_MAILER_REFRESH_TOKEN = process.env.GOOGLE_MAILER_REFRESH_TOKEN;
  const ADMIN_EMAIL_ADDRESS = process.env.ADMIN_EMAIL_ADDRESS;

  const myOAuth2Client = new OAuth2Client(
    GOOGLE_MAILER_CLIENT_ID,
    GOOGLE_MAILER_CLIENT_SECRET
  );

  myOAuth2Client.setCredentials({
    refresh_token: GOOGLE_MAILER_REFRESH_TOKEN,
  });

  if (!emailCustomer || !subject || !htmlContent)
    throw new Error("Please provide email, subject and content!");

  const myAccessTokenObject = await myOAuth2Client.getAccessToken();

  const myAccessToken = myAccessTokenObject?.token;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: ADMIN_EMAIL_ADDRESS,
      clientId: GOOGLE_MAILER_CLIENT_ID,
      clientSecret: GOOGLE_MAILER_CLIENT_SECRET,
      refresh_token: GOOGLE_MAILER_REFRESH_TOKEN,
      accessToken: myAccessToken,
    },
  });
  const mailOptions = {
    from: {
      name: "Shoe Store",
      address: ADMIN_EMAIL_ADDRESS,
    },
    to: [ADMIN_EMAIL_ADDRESS, emailCustomer].toString(),
    subject: subject,
    html: htmlContent,
  };
  return await transporter.sendMail(mailOptions);
};

export default sendMail;
