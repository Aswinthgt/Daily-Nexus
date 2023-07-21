import nodemailer from "nodemailer";


export const sendMail = async (verifylink:string, toEmail:string) => {
   
    try{
        const transporter = nodemailer.createTransport({
            service:'Gmail',
            auth: {
              user: process.env.ADMIN_GMAIL,
              pass: process.env.ADMIN_PASS_KEY
            }
          });
        
        
         const mail = {
            from: process.env.ADMIN_GMAIL, // sender address
            to: toEmail, // list of receivers
            subject: "Email Verification", 
            html: template(verifylink), // html body
          }
    
          const mailresponse = await transporter.sendMail(mail);
    
          return mailresponse;

    }catch(er){
        throw new Error(`${er}`)
    }

}


function template (verificationLink:any){
    return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Email Verification</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          margin: 0;
          padding: 0;
        }
    
        .container {
          max-width: 500px;
          margin: 0 auto;
          padding: 20px;
          background-color: #f5f5f5;
          border-radius: 8px;
        }
    
        h1 {
          text-align: center;
          margin-bottom: 30px;
        }
    
        p {
          margin: 0 0 20px;
        }
    
        .verify-btn {
          display: inline-block;
          padding: 12px 24px;
          background-color: #007bff;
          color: #fff;
          text-decoration: none;
          border-radius: 4px;
        }
    
        .footer {
          text-align: center;
          margin-top: 20px;
        }
    
        .footer p {
          margin: 0;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Email Verification</h1>
        <p>Thank you for registering. Please click the button below to verify your email:</p>
        <a href="${verificationLink}" class="verify-btn">Verify Email</a>
      </div>
      <div class="footer">
        <p>&copy; 2023 Information && Intelligence. All rights reserved.</p>
      </div>
    </body>
    </html>    
    `
}



