"use strict";


angular.module("Throfolio").controller("PortCtrl", function ($scope, FbFactory, $routeParams, $location, $route, $window, StorageFactory, FBcreds, $timeout) {


    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            // New board object
            $scope.newBoard = {
                name: "",
                url:"",
                username:""
            };

            // This promise gets all the logged in user's boards from the factory then assigns the boards to "boards".

            
            FbFactory.getBoards()
                .then((boards) => {
                    $scope.boards = boards;
                    console.log("boards in get boards", boards);
                })
                .catch((error) => {
                    console.log("getBoards didn't work", error);
                });



            // This function saves the new board object when the user clicks "Create"
            $scope.savePortfolio = () => {
                $scope.newBoard.uid = firebase.auth().currentUser.uid;

                console.log("firebase.auth().currentUser",firebase.auth().currentUser);
                $scope.newBoard.username = firebase.auth().currentUser.displayName;

                // $scope.newBoard.username = firebase.auth().currentUser. ///CB NOT DONE HERE TODO
                FbFactory.addBoard($scope.newBoard)
                    .then((board) => {
                        console.log("board in addBoard", board);
                        // $location.url("/boards");
                        $route.reload("/portfolio");
                        
                    });
            };

            $scope.addImageToCloud = (e) => {
            
                    let file = e;
                 
                
                    var storage = firebase.storage();
                    let storageRef = firebase.storage().ref(file.name);
                    storageRef.put(file);
                    
                    storageRef.getDownloadURL().then(function(url){
                        $scope.newBoard.uid = firebase.auth().currentUser.uid;
                        $scope.newBoard.username = firebase.auth().currentUser.displayName;
                        $scope.newBoard.url = url;


                        FbFactory.addBoard($scope.newBoard)
                        .then((board) => {
                            console.log("board in addBoard", board);
                            // $location.url("/boards");
                            $route.reload("/portfolio");
                            
                        });

                    });
            };
            

            
  
            

       
        } else {
            console.log("not logged in to see upload boards");
            console.log("routeParams", $routeParams.username);
            FbFactory.getBoardsPublic($routeParams.username)
            .then((boards) => {
                console.log("$scope.boards", $scope.boards);
                $scope.boards = boards;
                

            })
            .catch((error) => {
                console.log("getBoards didn't work", error);
            });

        }
    });
});