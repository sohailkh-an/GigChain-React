require('dotenv').config();
const nodemailer = require('nodemailer');
const { google } = require('googleapis');

const {
  GMAIL_CLIENT_ID,
  GMAIL_CLIENT_SECRET,
  GMAIL_REFRESH_TOKEN,
  GMAIL_USER,
} = process.env;

console.log('Environment variables:');
console.log('GMAIL_CLIENT_ID:', GMAIL_CLIENT_ID);
console.log('GMAIL_CLIENT_SECRET:', GMAIL_CLIENT_SECRET);
console.log('GMAIL_REFRESH_TOKEN:', GMAIL_REFRESH_TOKEN);
console.log('GMAIL_USER:', GMAIL_USER);

const oauth2Client = new google.auth.OAuth2(
  GMAIL_CLIENT_ID,
  GMAIL_CLIENT_SECRET,
  'https://developers.google.com/oauthplayground'
);

oauth2Client.setCredentials({ refresh_token: GMAIL_REFRESH_TOKEN });

async function sendTestEmail() {
  try {
    const accessToken = await oauth2Client.getAccessToken();
    console.log('Access Token:', accessToken);

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: GMAIL_USER,
        clientId: GMAIL_CLIENT_ID,
        clientSecret: GMAIL_CLIENT_SECRET,
        refreshToken: GMAIL_REFRESH_TOKEN,
        accessToken: accessToken.token,
      },
    });

    const mailOptions = {
      from: GMAIL_USER,
      to: 'numl-s21-16909@numls.edu.pk', // Replace with a valid email address
      subject: 'Test Email',
      text: 'If you received this, the setup works!',
    };

    const result = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', result);
  } catch (error) {
    console.error('Error sending test email:', error);
    if (error.response) {
      console.error('Error response:', error.response.data);
    }
  }
}

sendTestEmail();
