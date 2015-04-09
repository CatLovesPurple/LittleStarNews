var app = angular.module("littleStar" , ["service", "ui.router"]);
app.config([
    '$stateProvider',
    '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('home', {
                url: '/home',
                templateUrl: "/home.html",
                controller: 'mainCtrl'
            })
            .state('post', {
                url:'/post/{id}',
                templateUrl: '/post.html',
                controller:'postCtrl'
            });

        $urlRouterProvider.otherwise('home');
    }]);


app.controller("mainCtrl", ["$scope", "postFactory", function ($scope, postFactory) {
    $scope.posts = postFactory.post;
    $scope.addPost = function(){
        var title = $scope.title;
        if(!title || title === ""){
            return;
        }
        postFactory.post.push({
            title: title,
            upvotes:1,
            link : $scope.link,
            comments: [
                {author: 'Joe', body: 'Cool post!', upvotes: 0},
                {author: 'Bob', body: 'Great idea but everything is wrong!', upvotes: 0}
            ]
        });
        $scope.title = '';
        $scope.link = '';
    };

    $scope.incrementPost = function(post){
        post.upvotes += 1;
    };
}]);


app.controller("postCtrl", ["$scope", '$stateParams', "postFactory", function($scope, $stateParams, postFactory){
    $scope.post = postFactory.post[$stateParams.id];
    $scope.addComment = function(){
        if($scope.body === ""){
            return;
        }
        var currentComments = postFactory.post[$stateParams.id].comments;
        currentComments.push({
            author:$scope.author,
            body: $scope.body,
            upvotes: 0
        });

        $scope.body = "";
    }

    $scope.incrementComment = function(comment){
        comment.upvotes += 1;

    }
}]);