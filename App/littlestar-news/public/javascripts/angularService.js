/**
 * Created by Yan on 4/7/2015.
 */
var service = angular.module("service", []);



service.factory("postFactory", [function(){
    var data =
        {
            post :   [
                {title: 'post 1', upvotes: 5, comments:[{author:"andy", body:"lol", upvotes:0}]},
                {title: 'post 2', upvotes: 2, comments:[{author:"andy", body:"lol", upvotes:0}]},
                {title: 'post 3', upvotes: 15, comments:[{author:"andy", body:"lol", upvotes:0}]},
                {title: 'post 4', upvotes: 9, comments:[{author:"andy", body:"lol", upvotes:0}]},
                {title: 'post 5', upvotes: 4, comments:[{author:"andy", body:"lol", upvotes:0}]}
            ]
        }

    return data;
}]);

