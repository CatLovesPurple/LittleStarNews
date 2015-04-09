var mongoose = require("mongoose");

var schema = new mongoose.Schema({
    title : String,
    link : String,
    upvotes : {type : Number, default : 0},
    comments : [{type : mongoose.Schema.Types.ObjectId, ref: 'Comment' }]

});


var model = mongoose.model("Post", schema);