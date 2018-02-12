"use strict";


angular.module("Throfolio").controller("PortCtrl", function ($scope, FbFactory, $routeParams, $location, $route, $window, StorageFactory, FBcreds) {


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


            //from FB Docs
        
        

            // Get a reference to the storage service, which is used to create references in your storage bucket
        

            // 
            $scope.addImageToCloud = (e) => {
                
                console.log("e",e);
                    console.log(e.target, "e.target");
                    $scope.image = e;
                    console.log($scope.image);
                    console.log("e.currentTarget", e, "files");
                    console.log("image",$scope.image);
                    var storage = firebase.storage();
                    let storageRef = firebase.storage().ref($scope.image.name);
                    storageRef.put($scope.image)
                    
                    // return {addImageToCloud}                    
                    
                    .then((data)=>{
                        console.log("data", data);
                    }
                    
                    

                );
                
            };
            
          
            

            // FbFactory.getPins($routeParams.id)
            //     .then((pins) => {
            //         $scope.pins = pins.data;
            //     })
            //     .catch((error) => {
            //         console.log("getPins didn't work", error);
            //     });
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