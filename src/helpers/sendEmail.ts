const nodemailer = require('nodemailer');

const OWNER_EMAIL_ADDRESS = `${process.env.OWNER_EMAIL_ADDRESS}`;
const GOOGLE_EMAIL_ACCOUNT_PASSWORD = `${process.env.GOOGLE_EMAIL_ACCOUNT_PASSWORD}`;
// send mail
const sendEmail = async (to: string, url: string, txt: string) => {
  try {
    const transport = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: OWNER_EMAIL_ADDRESS,
        pass: GOOGLE_EMAIL_ACCOUNT_PASSWORD,
      },
    });

    const mailOptions = {
      from: OWNER_EMAIL_ADDRESS,
      to: to,
      subject: 'Note App',
      html: `
            <div style="max-width: 700px; margin:auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%;">
              <h2 style="text-align: center; text-transform: uppercase;color: teal;">Welcome to the Note App.</h2>
              <p>Congratulations! You're almost set to start using Note App.
                  Just click the button below to validate your email address.
              </p>
              
              <div style="display:flex; justify-content: center;">
                <a href=${url} style="background: #00a8ff; font-weight: bold; border-radius: 5px; text-decoration: none; color: white; padding: 10px 20px; margin: 10px auto;max-width: 424px;display: inline-block;">
                  ${txt}
                </a>
              </div>
          
              <p>If the button doesn't work for any reason, you can also click on the link below:</p>
          
              <div>${url}</div>
            </div>
            `,
    };

    const result = await transport.sendMail(mailOptions);
    return result;
  } catch (err) {
    throw err;
  }
};

export default sendEmail;
