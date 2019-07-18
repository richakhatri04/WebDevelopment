const mongoose = require('mongoose');

var blogPublisherSchema = {
    userId: { type:String , required:true },
    firstName: { type:String , required:true },
    lastName: { type:String , required:true }
};
// var blogCategorySchema = {
//     categoryId: { type:String  },
//     categoryName: { type:String }
// };
const blogsSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    blogTitle: { type:String , required:true },
    contentModel: { type:String , required:true },
    blogPicModel: { type:String , required:false },
    blogPublisher: blogPublisherSchema,
    petCategory:{ type:String , required:true },
    petTopic:{ type:String , required:true },
    blogExpiryDate: { type:String , required:false },
    blogPostDate: { type:String , required:true },
    isDeleted:{type:Boolean,require:true}
});

module.exports = mongoose.model('blogs', blogsSchema);