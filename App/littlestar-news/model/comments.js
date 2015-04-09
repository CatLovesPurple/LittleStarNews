var mongoose = require("mongoose");

var commentSchema = new mongoose.Schema({
    author : String,
    body : String,
    upvotes : {type : Number, default: 0},
    post : {type : mongoose.Schema.Types.ObjectId, ref: 'Post'}
});


var model = mongoose.model("Comment", commentSchema);