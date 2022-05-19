const nodemailer = require("nodemailer");
const { google } = require("googleapis");

const sendEmail = async (email, subject, text) => {

  // const CLIENT_ID = "120216055346-netfubpjcdel17hp6cdn129dblond97m.apps.googleusercontent.com"
  // const CLIENT_SECRET = "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"
  // const REDIRECT_URI = "https://developers.google.com/oauthplayground";
  // const REFRESH_TOKEN =
  //   "1//049GVPXMDNeLfCgYIARAAGAQSNwF-L9IrwwuIqnKtyAZ9ndxnnsOsmUgxO5m_fXjFML_G-iV_0pHcv3Y7mwNKshYvdPlQpQ_JoOE";
  const oAuth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URI
  );
  oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

  try {
    const accessToken = await oAuth2Client.getAccessToken();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      secure: false,
      auth: {
        type: "OAuth2",
        user: "noreply.stackblock@gmail.com",
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
        accessToken: accessToken,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const mailOptions = {
      from: "Stackblock  <noreply.stackblock@gmail.com>",
      to: email,
      subject: subject,
      text: text,
    };

    const result = await transporter.sendMail(mailOptions);
    return result;
  } catch (error) {
    console.log(error, "<- error. Email not sent");
    return error;
  }
};

module.exports = sendEmail;
