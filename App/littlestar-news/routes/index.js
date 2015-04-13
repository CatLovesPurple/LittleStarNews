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


router.param('post', function(req, res, next, id) {

    var query = Post.findById(id);

    query.exec(function (err, post){
        if (err) { return next(err); }
        if (!post) { return next(new Error('can\'t find post')); }
        console(id);
        req.post = post;
        return next();
    });
});

router.get('/posts/:post', function(req, res) {
    res.json(req.post);
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
//router.get('/posts/:id', function(req, res, next){
//    //Post.findOne({}, function(err, post){
//    //    if(err){
//    //        return next(err);
//    //    }
//    //    res.json(post);
//    //});
//    Post.findOne({"_id":req.params._id}, function(err, post){
//        if(err){
//            console.log(err);
//            return next(err);
//        }
//        res.json(post);
//    })
//});
module.exports = router;
