var express = require('express');
var router = express.Router();

var mongoose = require("mongoose");
var Post = mongoose.model("Post");
var Comment = mongoose.model("Comment");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/posts', function(req, res, next){
    Post.find(function(err, allPosts){
        if(err){
            return next(err);
        }
        res.json(allPosts);
    });
});


router.post('/post', function(req, res, next){
    var newPost = new Post(req.body);
    Post.create({
        title:req.body.title,
        link:req.body.link
    }, function(err, newPost){
        if(err){
            next(err);
        }
        res.json(newPost);
    });
});

module.exports = router;
