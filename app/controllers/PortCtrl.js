"use strict";


angular.module("Throfolio").controller("PortCtrl", function ($scope, FbFactory, $routeParams, $location, $route, $window) {


    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            // New board object
            $scope.newBoard = {
                name: ""
            };

            // This promise gets all the logged in user's boards from the factory then assigns the boards to "boards".
            FbFactory.getBoards()
                .then((boards) => {
                    $scope.boards = boards;
                })
                .catch((error) => {
                    console.log("getBoards didn't work", error);
                });



            // This function saves the new board object when the user clicks "Create"
            $scope.saveBoard = () => {
                $scope.newBoard.uid = firebase.auth().currentUser.uid;
                FbFactory.addBoard($scope.newBoard)
                    .then((board) => {
                        // $location.url("/boards");
                        $route.reload("/portfolio");

                    });
            };

            
            

            FbFactory.getPins($routeParams.id)
                .then((pins) => {
                    $scope.pins = pins.data;
                })
                .catch((error) => {
                    console.log("getPins didn't work", error);
                });
        } else {
            console.log("not logged in");
        }
    });
});