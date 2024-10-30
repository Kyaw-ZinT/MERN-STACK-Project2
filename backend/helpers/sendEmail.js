const nodemailer = require("nodemailer");
const ejs = require("ejs");
const sendEmail = async ({ view, from, to, subject }) => {
  try {
    var transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "2981f81537c19b",
        pass: "3143a36e1c1020",
      },
    });

    let dataString = await ejs.renderFile("./views/" + view + ".ejs");

    const info = await transport.sendMail({
      from, // sender address
      to, // list of receivers
      subject, // Subject line
      html: dataString, // html body
    });

    console.log("Message sent: %s", info.messageId);
  } catch (e) {
    throw new Error(e);
  }
};

module.exports = sendEmail;
