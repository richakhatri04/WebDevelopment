//Authored by Lakshmi Ponnuru [B00811623]

const express = require('express');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const router = express.Router();
const Donation = require('../models/donation');

// Post method for inserting the donation details in datamodel and sending email to the donor
router.post('/', (req, res, next) => {

    const donations = new Donation({
        _id: new mongoose.Types.ObjectId(),
        donorFirstName: req.body.donorFirstNameModel,
        donorLastName: req.body.donorLastNameModel,
        emailID: req.body.emailIDModel,
        amount: req.body.amountModel,
        frequency: req.body.frequencyModel
    });
    donations.save().then(result =>{
        console.log(result);
    })
    .catch(err => console.log(err));
    res.status(201).json({
        message: 'Handling POST requests to /donation',
        createddonations: donations
    });
    
     // To create a transport
    let transporter = nodemailer.createTransport({

        service: 'gmail',
        auth: {
          user: 'strayspirittest@gmail.com', // generated ethereal user
          pass: 'Qazwsx!2' // generated ethereal password
        },
        tls: {
            rejectUnauthorized: false
        }
      });
    
      // setup email data with unicode symbols
      let mailOptions = {
        from: '"Stray Spirit" <strayspirittest@gmail.com>', // sender address
        to: req.body.emailIDModel, // list of receivers - this the emailID provided by the donor
        subject: "Thank you for your Donation", // Subject line
        text: "", // plain text body
        html: "<div> We appreciate your kindness. On behalf of SraySpirit we thank you wholeheartedly for your Donation.</div>" // html body
      };
    
      // to send a mail with defined transport object
     transporter.sendMail(mailOptions, (error, info) => {
         if(error) {
             return console.log(error);
         }
         console.log("Message sent: %s", info.messageId);

     });
});

module.exports = router; 