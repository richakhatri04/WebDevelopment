// modified by Ajith Jayanthi B00825322 aj788769@DataTransferItemList.ca
const mongoose = require('mongoose');

var orderUploaderSchema = {
    firstName: { type:String , required:true },
    lastName: { type:String , required:true },
    uId:{type: String, required:false},
    email:{type: String, required:true},
    addressLine1:{type: String, required:true},
    addressLine2:{type: String, required:false},
    pincode:{type: String, required:true},
    phoneNumber:{ type:String , required:false }
};

//Schema created for orders https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/mongoose
const orderSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    orderName: { type:String , required:false },
    totalPrice: { type:Number , required:true },
    orderPlacedDate : { type:String , required:true },
    estimatedDeliveryDate : { type:String , required:true },
    orderStatus : { type:String , required:true },
    orderUploader: orderUploaderSchema,
    products: []
});

module.exports = mongoose.model('Order', orderSchema);
