import nodemailer from "nodemailer";

const mail = {
  user: "timecheckenterprise@gmail.com",
  pass: "ngkacpoowyotegfx",
};

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: mail.user, // generated ethereal user
    pass: mail.pass, // generated ethereal password
  },
  tls: {
    rejectUnauthorized: false,
  },
});

const sendEmail = async (email: string, subject: string, html: string) => {
  try {
      // send mail with defined transport object
      await transporter.sendMail({
        from: `"MHcode 👻" <${mail.user}>`, // sender address
        to: email, // list of receivers
        subject, // Subject line
        text: "Hello world?", // plain text body
        html, // html body
      });
  } catch (error) {
    console.log("Algo no va bien con el email ", error);
  }

};

const getTemplate = (name: string, email: string) => {
  return `
    <h1>User Information</h1>
    <ul>
        <li>Username: ${name} </li>
        <li>User Email: ${email} </li>
    </ul>
`;
};

export { sendEmail, getTemplate };
