const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Order = require('../models/order');

router.get('/', (req, res, next) => {
    Order.find()
    .exec()
    .then(docs =>{
        res.status(200).json(docs);
    })
    .catch(err =>{
        res.status(500).json({
            error: err
        });
    });
});

router.get('/normalUser/:firstName', (req, res, next) => {
    Order.find({ "orderUploader.firstName": req.params.firstName })
    .exec()
    .then(docs =>{
        res.status(200).json(docs);
    })
    .catch(err =>{
        res.status(500).json({
            error: err
        });
    });
});

router.post('/', (req, res, next) => {
    const order = new Order({
        _id: new mongoose.Types.ObjectId(),
        orderName: req.body.orderName,
        totalPrice:req.body.totalPrice,
        orderPlacedDate: req.body.orderPlacedDate,
        estimatedDeliveryDate:req.body.estimatedDeliveryDate,
        orderStatus: req.body.orderStatus,
        products: req.body.products,
        orderUploader: {
            firstName: req.body.orderUploader.firstName,
            lastName:req.body.orderUploader.lastName,
            uId: req.body.orderUploader.uId
            
        },
        
        
    });
    order.save().then(result =>{
       })
    .catch(err => console.log(err));
    res.status(201).json({
        message: 'Handling POST requests to /inventory',
        createdOrder: order
    });
});

router.get('/singleorder/:oId', (req, res, next) => {
    const id = req.params.oId;
    Order.findById(id)
    .exec()
    .then(doc =>{
        res.status(200).json(doc);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error:err});
    });
});

router.delete('/delete/:oId', (req, res, next) => {
    const id = req.params.oId;
    Order.remove({ _id: id} )
    .exec()
    .then(result =>{
        res.status(200).json(result);
    })
    .catch(err =>{
        res.status(500).json({
            error: err
        })
    })
});

router.put('/update/:id', (req, res, next) =>{
    const id=req.params.id;
    console.log(id);
    Order.findByIdAndUpdate( id, {
        _id: id,
        orderName: req.body.orderName,
        totalPrice:req.body.totalPrice,
        orderPlacedDate: req.body.orderPlacedDate,
        estimatedDeliveryDate:req.body.estimatedDeliveryDate,
        orderStatus: req.body.orderStatus,
        products: req.body.products,
        orderUploader: {
            firstName: req.body.orderUploader.firstName,
            lastName:req.body.orderUploader.lastName,
            uId: req.body.orderUploader.uId
            
        },

    }).then( result=>{
        console.log(result);
        res.status(200).json({
            message: "Update successfull!"
        });
    });
});



module.exports = router;