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


app.controller("mainCtrl", ["$scope", "$http", "postFactory", function ($scope, $http, postFactory) {
    postFactory.get().success(function(data){
        $scope.posts = data;
    });

    $scope.addPost = function() {
        var title = $scope.title;
        var link = $scope.link;
        if (!title || title === "" || !link || link === "") {
            return;
        }
        var newPost = {
            "title": title,
            "link": link
        }
        postFactory.create(newPost)
            .success(function (data) {
                postFactory.get().success(function(allPosts){
                    $scope.posts = allPosts;
                });

            });
        $scope.title = "";
        $scope.link = "";

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