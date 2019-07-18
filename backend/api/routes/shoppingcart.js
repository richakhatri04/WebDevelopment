// Developed By Ajith Jayanthi B00825322 aj788769@dal.ca
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const order1 = require('../models/order');
router.post('/', (req, res, next) => {
    const order = new order1({
        _id: new mongoose.Types.ObjectId(),
        totalPrice: req.body.totalPrice,
       orderPlacedDate: req.body.orderPlacedDate,
       estimatedDeliveryDate: req.body.estimatedDeliveryDate,
       orderStatus: req.body.orderStatus,
       orderUploader:{
           firstName: req.body.firstName,
           lastName:req.body.lastName,
           uId: req.body.uID,
           email:req.body.email,
           addressLine1:req.body.addressLine1,
           addressLine2:req.body.addressLine2,
           pincode:req.body.pincode,
           phoneNumber:req.body.phoneNumber
       },
       products: req.body.products    
    });
    order.save().then(result =>{
        
    })
    .catch(err => console.log(err));
    res.status(201).json({
        message: 'Inserting shopping cart object successfully',
    });


});

module.exports = router;
