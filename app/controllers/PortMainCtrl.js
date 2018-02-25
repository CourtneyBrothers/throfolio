"use strict";

angular.module("Throfolio").controller("PortMainCtrl", function ($scope, FbFactory, $routeParams, $location, $route, $window) {

    //set uid to display name here and pass that variable in 
   
            console.log("not logged in to see upload boards");
            FbFactory.getAllBoards()
            .then((boards) => {
                $scope.boards = boards;
                console.log("boars in get all unauth boards",boards);
                console.log($scope.boards, "scope.boards");
            })
            .catch((error) => {
                console.log("getBoards didn't work", error);
            });

            FbFactory.getAllSketches()
            .then((sketches)=>{
                $scope.sketches = sketches;

            })
            .catch((error) => {
                console.log("get sketches didnt work", error);
            });

});