var service = angular.module("service", []);

service.factory("postFactory",  ["$http", function($http){
        return {
            get : function(){
                return $http.get("/posts");
            },
            create: function(newPost){
                return $http.post("/post", newPost);
            },
            delete : function(id){
                return $http.delete("/post/" + id);
            },
            getById : function(id){
                return $http.get("posts/" + id);
            }
        }


}]);

