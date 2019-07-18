//Authored by Lakshmi Ponnuru [B00811623]

const mongoose = require('mongoose');

// Schema to store the data model in the database
const donationSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    donorFirstName: { type:String , required:true },
    donorLastName: { type:String , required:true },
    emailID: { type:String , required:true },
    amount: {type:Number, required:true },
    frequency: {type:String, required:true }
    
});

module.exports = mongoose.model('Donation', donationSchema);