//Developer : Aditya Gadhvi (B00809664)
// Modified by Marlee Donnelly (B00710138) in July 2019

const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    firstName:String,
    lastName:String,
    phoneNumber:Number,
    email:{type:String, unique:true},
    password:String,
    address:String,
    pinCode:String,
    dateOfBirth:String,
    user_type:String,
    isAdmin:{
        type: Boolean,
        default: false
    },
    isSuperAdmin:{
        type: Boolean,
        default: false
    },
    user_creation_date:String,
    isActive:{
        type: Boolean,
        default: false
    },
    secretToken: String
});

module.exports = mongoose.model("User", userSchema);
