// Authored by Sravan Sajeev [B00825856]
// FEEDBACK ROUTE
const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const FAQ = require('../models/faq')

router.post('/submitFeedback', (req, res, next) => {

    console.log("reached here");

    
    // Configuring Node mailer to send mails to support email upon user feedback submission
    let transporter = nodemailer.createTransport({

        service: 'gmail',
        auth: {
          user: 'strayspirittest@gmail.com', // Test mail id 
          pass: 'Qazwsx!2' 
        },
        tls: {
            rejectUnauthorized: false
        }
      });
    
    
      let mailOptions = {
        from: '"Stray Spirit" <strayspirittest@gmail.com>', 
        to: 'sravans578@gmail.com', // Replace with Support mail of stray spirit (for now this is my personal mail ID )
        subject: "Feedback", // Subject line
        text: " ", // plain text body
        html: "<h3> You have a new feedback  <br> </h3>" +req.body.Message // Message body filled with content from user feedback
      };
    
      // Send mail 
     transporter.sendMail(mailOptions, (error, info) => {
         if(error) {
             return console.log(error);
         }
        
     });
    
});

// Retieve all faqs
router.get('/getfaq', (req, res, next) => {
    // console.log(" here")
    FAQ.find()
    .exec()
    .then(docs =>{
        res.status(200).json(docs); //Send all FAQs as JSON 
    })
    .catch(err =>{
        res.status(500).json({
            error: err
        });
    });
    
});

module.exports = router
