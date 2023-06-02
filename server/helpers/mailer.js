const nodemailer = require("nodemailer");

async function emailGenerator(email) {
  let mailTransporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "plebkicks.official@gmail.com",
      pass: "yvykuuilnnktwuvh",
    },
  });

  let detail = {
    from: "plebkicks.official@gmail.com", // sender address
    to: email, // list of receivers
    subject: "Welcome to Pleb Kicks!", // Subject line
    text: "Your account registration has been  successful", // plain text body
    html: "<b>Please spend your hard earned cash on some fabrics on your feet!</b>", // html body
  };

  mailTransporter.sendMail(detail, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Email has been sent");
    }
  });
}

module.exports = emailGenerator;
