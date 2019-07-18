const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');


const Story = require('../models/stories');

// Add Story
router.post('/', (req, res, next) => {
    const stories = new Story({
        _id: new mongoose.Types.ObjectId(),
        storyTitle: req.body.storyTitle,
        storycontentModel: req.body.storycontentModel,
        storyPicModel: req.body.storyPicModel,
        storyPublisher: {
            userId: req.body.storyPublisher.userId,
            firstName: req.body.storyPublisher.firstName,
            lastName: req.body.storyPublisher.lastName
        },
        storyCategory:req.body.storyCategory,
        storyPostDate: new Date(),
        isApproved:false,
        isDeleted:false
    });
    stories.save().then(result =>{
        console.log('sucess'+result);
    })
    .catch(err => console.log(err));
    res.status(201).json({
        message: 'Handling POST requests to /stories',
        createdStories: stories
    });
});

// Fetch Story By Id
router.get('/singlestory/:storyId', (req, res, next) => {
    const id = req.params.storyId;
    Story.findById(id)
    .exec()
    .then(doc =>{
        console.log(doc);
        res.status(200).json(doc);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error:err});
    });
});

//Update Stories
router.put('/updateStory/:id', (req, res, next) =>{
    const id=req.params.id;
    console.log(id);
    Story.findByIdAndUpdate(id, {
        _id: id,
        // storyTitle: req.body.storyTitle,
        // storycontentModel: req.body.storycontentModel,
        // storyPicModel: req.body.storyPicModel,
        // storyPublisher: {
        //     userId: req.body.storyPublisher.userId,
        //     firstName: req.body.storyPublisher.firstName,
        //     lastName: req.body.storyPublisher.lastName
        // },
        // storyCategory:{
        //     categoryId:"1",
        //     categoryName:"Pet Healthcare"
        // },
        // storyPostDate: req.body.storyPostDate,
        isApproved: req.body.isApproved,
        isDeleted: req.body.isDeleted
    }).then( result=>{
        console.log(result);
        res.status(200).json({
            message: "Story Updated!"
        });
    });
});

//List of Stories
router.get('/', (req, res, next) => {
    Story.find( { $and: [ { isApproved: "false" }, { isDeleted: "false" } ] })
    .exec()
    .then(docs =>{
        console.log(docs);
        res.status(200).json(docs);
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

//List of Approved Stories
router.get('/getApprovedStory', (req, res, next) => {
    Story.find( { $and: [ { isApproved: "true" }, { isDeleted: "false" } ] })
    .exec()
    .then(docs =>{
        console.log(docs);
        res.status(200).json(docs);
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

module.exports = router;