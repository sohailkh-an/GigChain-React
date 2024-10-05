     // backend/utils/testAccessToken.js
     const { google } = require('googleapis');

     const OAuth2 = google.auth.OAuth2;

     const oauth2Client = new OAuth2(
       process.env.GMAIL_CLIENT_ID,
       process.env.GMAIL_CLIENT_SECRET,
       "https://developers.google.com/oauthplayground"
     );

     oauth2Client.setCredentials({
       refresh_token: process.env.GMAIL_REFRESH_TOKEN
     });

     oauth2Client.getAccessToken((err, token) => {
       if (err) {
         console.error('Failed to create access token :(', err);
       } else {
         console.log('Access Token:', token);
       }
     });