// Authored by Sravan Sajeev [B00825856]
// Schema for FAQ 
const mongoose = require('mongoose');

const faqSchema = mongoose.Schema({
    Title: { type:String , required:false },
    Content: { type:String , required:false},
});

module.exports = mongoose.model('FAQ', faqSchema);
