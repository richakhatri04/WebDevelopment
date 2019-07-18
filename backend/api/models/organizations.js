//Developer : Aditya Gadhvi (B00809664)
// Modified by Marlee Donnelly in July 2019

const mongoose = require("mongoose");


const organizationSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    organizationtName:String,
    email:{type:String, unique:true},
    phoneNumber:Number,
    registrationNumber:Number,
    password:String,
    address:String,
    pinCode:String,
    user_type:String,
    user_creation_date:String,
    isAdmin:{
        type: Boolean,
        default: false
    },
    isSuperAdmin:{
        type: Boolean,
        default: false
    },
});

module.exports = mongoose.model("Organization", organizationSchema);