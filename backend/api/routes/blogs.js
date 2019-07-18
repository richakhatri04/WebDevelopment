const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');


const Blog = require('../models/blogs');

// Add Blog
router.post('/', (req, res, next) => {
    const blogs = new Blog({
        _id: new mongoose.Types.ObjectId(),
        blogTitle: req.body.blogTitle,
        contentModel: req.body.contentModel,
        petCategory:req.body.petCategory,
        petTopic:req.body.petTopic,
        blogPostDate:req.body.blogPostDate,
        blogExpiryDate:req.body.blogExpiryDate,
        blogPicModel: req.body.blogPicModel,
        blogPublisher: {
            userId: req.body.blogPublisher.userId,
            firstName: req.body.blogPublisher.firstName,
            lastName: req.body.blogPublisher.lastName
        },
        isDeleted:false
    });
    blogs.save().then(result =>{
        console.log('sucess'+result);
    })
    .catch(err => console.log(err));
    res.status(201).json({
        message: 'Handling POST requests to /blogs',
        createdBlogs: blogs
    });
});

// Fetch Blog By Id
router.get('/singleblog/:blogId', (req, res, next) => {
    const id = req.params.blogId;
    Blog.findById(id)
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

//Update Blog
router.put('/updateBlog/:id', (req, res, next) =>{
    const id=req.params.id;
    console.log(id);
    Blog.findByIdAndUpdate( id, {
        _id: id,
        blogTitle: req.body.blogTitle,
        contentModel: req.body.contentModel,
        blogPicModel: req.body.blogPicModel,
        blogPublisher: {
            userId: "5c916a220119874600b43fd6",
            firstName: "aadi",
            lastName: "shah"
        },
        blogCategory:{
            categoryId:"1",
            categoryName:"Pet Healthcare"
        },
        blogExpiryDate: req.body.blogExpiryDate,
        blogPostDate: req.body.blogPostDate,
        isApproved:req.body.isApproved
    }).then( result=>{
        console.log(result);
        res.status(200).json({
            message: "Blog Updated!"
        });
    });
});

//List of Blogs
router.get('/', (req, res, next) => {
    Blog.find()//{$and: [ { isDeleted: "false" } ]}
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

// Test Link
router.use('/helloworld', (req, res, next) => {
  const blog=[ {blogTitle:"Pet Adoption Aftermath",
    contentModel:"This is the story of my pet adoption aftermath. Pet adption seems to be esay but there are a lot of things to be taken care of.",
    blogPicModel:"C://abc.png",
    blogPublisher:{
    userId:"1",
    firstName:"Admin",
    lastName:"Admin"},
    blogExpiryDate:"null",
    blogPostDate:"2018/07/10"
    }];
    res.status(200).json({
        message:"Blogs fetched successfully",
        blogs:blog
    });       
});

module.exports = router;