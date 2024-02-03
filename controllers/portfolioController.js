const nodemailer = require('nodemailer');
const { google } = require('googleapis');

// These id's and secrets should come from .env file.
 const CLIENT_ID =  process.env.CLIENT_ID ;
  const CLEINT_SECRET = process.env.CLEINT_SECRET;
 const REDIRECT_URI = process.env.REDIRECT_URI ;
  const REFRESH_TOKEN = process.env.REDIRECT_URI ;


const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLEINT_SECRET,
  REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

  
    

    const transport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: 'varmaaman229@gmail.com',
        clientId: process.env.CLIENT_ID,
        clientSecret:process.env.CLEINT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
        
      },
    });

    const sendEmailController = (req, res) => {
      try {
        const { name, email, msg } = req.body;
    
        //validation
        if (!name || !email || !msg) {
          return res.status(500).send({
            success: false,
            message: "Please Provide All Fields",
          });
        }
        //email matter
        transport.sendMail({
          to: "typeyouremailadresshere@gmail.com",
          from: "typeyouremailadresshere@gmail.com",
          subject: "Regarding Mern Portfolio App",
          html: `
            <h5>Detail Information</h5>
            <ul>
              <li><p>Name : ${name}</p></li>
              <li><p>Email : ${email}</p></li>
              <li><p>Message : ${msg}</p></li>
            </ul>
          `,
        });
    
        return res.status(200).send({
          success: true,
          message: "Your Message Send Successfully",
        });
      } catch (error) {
        console.log(error);
        return res.status(500).send({
          success: false,
          message: "Send Email API Error",
          error,
        });
      }
    };
    
    module.exports = { sendEmailController };
    
    

    