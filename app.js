const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const app = express();
const https = require("https");
const nodemailer = require("nodemailer");
const ejs = require("ejs");
const multer = require("multer");
const fs = require("fs");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

var storeFileName = [];
var emailLoggedIn = "";

function Storing(name, expiryNumber, included, email2) {
  this.name = name;
  this.expiryNumber = expiryNumber;
  this.included = included;
  this.email2 = email2;
}

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function (req, res) {
  emailLoggedIn = req.body.email;

  const mailTransporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "siddu7117@gmail.com", //Enter your email here
      pass: "******" // Enter your password here for functioning
    }
  });

  const mailDetails = {
    from: "siddu7117@gmail.com",
    to: emailLoggedIn,
    subject: "Test mail",
    text: "Node.js testing mail for Siddu just"
  };

  mailTransporter.sendMail(mailDetails, function (err, data) {
    if (err) {
      console.log("Error Occured");
      res.send("<h1>Error! Try Again<h1>");
    } else {
      console.log("Email sent successfully!");
      // res.send("<h1>Success!<h1>");
      res.redirect("/fileuploads");
    }
  });
});

app.get("/fileuploads", function (req, res) {
  res.render("index");
});

var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    var dir = "./uploads";
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    callback(null, dir);
  },
  filename: function (req, file, callback) {
    callback(null, file.originalname);

    function between(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    }
    const randomNumber = between(1, 24);

    const newObject = new Storing(
      file.originalname,
      randomNumber,
      "no",
      emailLoggedIn
    );
    storeFileName.push(newObject);
    // console.log(email);
  }
});

function every2hrs() {
  const date_ob = new Date();
  const hours = date_ob.getHours();

  console.log("Total files are " + storeFileName);
  for (var i = 0; i < storeFileName.length; i++) {
    if (
      hours > storeFileName[i].expiryNumber &&
      storeFileName[i].included == "no"
    ) {
      storeFileName[i].included = "yes";
      console.log("Expired files names are " + storeFileName[i].name);

      const mailTransporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "abc@gmail.com", //Enter your email here
          pass: "****" // Enter your password here for functioning
        }
      });

      const mailDetails2 = {
        from: "siddu7117@gmail.com",
        to: storeFileName[i].email2,
        subject: "Expired Images mail",
        text: "Your Expired images Node.js mail",
        attachments: [
          {
            filename: storeFileName[i].name,
            path: __dirname + "/uploads/" + storeFileName[i].name
          }
        ]
      };

      mailTransporter.sendMail(mailDetails2, function (err, data) {
        if (err) {
          console.log("Error Occured");
        } else {
          console.log("Email sent successfully!");
          // res.send("<h1>Success!<h1>");
        }
      });
    }
  }
}
setInterval(every2hrs, 2000 * 60 * 60);

var upload = multer({ storage: storage }).array("files", 12);

app.post("/upload", (req, res, next) => {
  upload(req, res, function (err) {
    if (err) {
      return res.send("<h1>Error!<h1>");
    }
    res.send("<h1>Success Uploaded!<h1>");
    console.log(storeFileName);
  });
});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
