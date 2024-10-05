const nodemailer = require("nodemailer");
const { google } = require("googleapis");
require("dotenv").config();

const OAuth2 = google.auth.OAuth2;

const oauth2Client = new OAuth2(
  process.env.GMAIL_CLIENT_ID,
  process.env.GMAIL_CLIENT_SECRET,
  "https://developers.google.com/oauthplayground"
);

oauth2Client.setCredentials({
  refresh_token: process.env.GMAIL_REFRESH_TOKEN,
});

const createTransporter = async () => {
  console.log("GMAIL_CLIENT_ID:", process.env.GMAIL_CLIENT_ID);
  console.log("GMAIL_CLIENT_SECRET:", process.env.GMAIL_CLIENT_SECRET);
  console.log("GMAIL_REFRESH_TOKEN:", process.env.GMAIL_REFRESH_TOKEN);
  console.log("GMAIL_USER:", process.env.GMAIL_USER);

  try {
    const accessTokenResponse = await oauth2Client.getAccessToken();
    const accessToken = accessTokenResponse.token;

    if (!accessToken) {
      throw new Error("Failed to retrieve access token :(");
    }

    // const accessToken = await new Promise((resolve, reject) => {
    //   oauth2Client.getAccessToken((err, token) => {
    //     if (err) {
    //       reject("Failed to create access token :(");
    //     }
    //     resolve(token);
    //   });
    // });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.GMAIL_USER,
        accessToken: accessToken,
        clientId: process.env.GMAIL_CLIENT_ID,
        clientSecret: process.env.GMAIL_CLIENT_SECRET,
        refreshToken: process.env.GMAIL_REFRESH_TOKEN,
      },
    });

    return transporter;
  } catch (error) {
    console.error("Error creating transporter:", error);
    throw error;
  }
};

exports.sendVerificationEmail = async (email, code) => {
  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: email,
    subject: "Verify Your Email",
    html: `
      <h1>Email Verification</h1>
      <p>Your verification code is: <strong>${code}</strong></p>
      <p>Please enter this code to complete your registration.</p>
    `,
  };

  let transporter = await createTransporter();
  await transporter.sendMail(mailOptions);
};
