var nodemailer = require('nodemailer');
var fs = require('fs');

// read username and password from config.json
fs.readFile('./Files/config.json', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  data = JSON.parse(data);
  username = data["username"];
  password = data["password"];

  // create transporter with authorization
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: username,
    pass: password
  }
});

// Get today's date
const date = new Date();

let day = date.getDate();
let month = date.getMonth() + 1;
let year = date.getFullYear();

let currentDate = `${day}-${month}-${year}`;

fs.readFile('./Files/winrate.json','utf-8', (err, data) => {
  if(err){
    console.error(err);
    return;
  }
  var mailOptions = {
    from: username,
    to: 'testm4674@gmail.com',
    subject: 'Dota 2 Winners - ' + currentDate,
    text: data
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
});

});