const nodemailer = require('nodemailer');

const OWNER_EMAIL_ADDRESS = `${process.env.OWNER_EMAIL_ADDRESS}`;
const GOOGLE_EMAIL_ACCOUNT_PASSWORD = `${process.env.GOOGLE_EMAIL_ACCOUNT_PASSWORD}`;

interface SendEmailProps {
  to: string;
  title?: string;
  description: string;
  url: string;
  username?: string;
  btnText?: string;
}

// send mail
const sendEmail = async ({
  to,
  description,
  url,
  title = 'Note App',
  username = 'Guy',
  btnText = 'Click here',
}: SendEmailProps) => {
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
    // Welcome to the Note App.
    // Congratulations! You're almost set to start using Note App.
    // Just click the button below to validate your email address.

    const mailOptions = {
      from: OWNER_EMAIL_ADDRESS,
      to: to,
      subject: 'Note App',
      html: `
            <div style="max-width: 750px; margin:auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%;">
              <h2 style="text-align: center; text-transform: uppercase;color: teal;">${title}</h2>
              <p>
                Hey ${username}!
              </p>
              <p>
              ${description}
              </p>
              
              <div style="display:flex; justify-content: center;">
                <a href=${url} style="background: #00a8ff; font-weight: bold; border-radius: 5px; text-decoration: none; color: white; padding: 10px 20px; margin: 10px auto;max-width: 424px;display: inline-block;">
                  ${btnText}
                </a>
              </div>
          
              <p>If the button doesn't work for any reason, you can also click on the link below:</p>
          
              <div>${url}</div>

              <p>Thanks, pthangdev</p>
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
