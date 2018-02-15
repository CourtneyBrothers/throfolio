"use strict";
angular.module("Throfolio").controller("RefCtrl", function ($scope, FbFactory, $routeParams, $location, $route, $window,StorageFactory,html2CanvasAngular ) {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          $scope.newPin = {
            uid: "",
            name: "",
            url: "",
            username: ""
          };

          $scope.save  = function(){
            html2CanvasAngular.renderBody().then(function(canvas){
              document.body.appendChild(canvas);
            });
          };
  
      $scope.boardId = $routeParams.boardId; // CB SCOPE BOARDID
  
          FbFactory.getPins($routeParams.boardId).then(data => {
            console.log("pins data", data);
            $scope.pins = data;

          });


  
          $scope.savePin = () => {
            console.log("New Pin", $scope.newPin);
            // I think "$routeParams.id" will be the boards id?
            $scope.newPin.boardId = $routeParams.boardId;
            $scope.newPin.username = firebase.auth().currentUser.displayName;
            console.log("route id", $routeParams.id, "route", $routeParams);
            $scope.newPin.uid = firebase.auth().currentUser.uid;
  
    
            FbFactory.addPin($scope.newPin)
              .then(data => {
                console.log("data in pin add pin", data);
                $route.reload(`portfolio/${$scope.newPin.boardId}`); // this was pins but that route doesnt exist -CB
              })
              .catch(error => {
                console.log(error);
              });
  
          };

          $scope.getNameOfBoard = () => {
            console.log("get");
            FbFactory.getBoard($routeParams.boardId).then(data => {
                console.log("data in getBoard", data);
              $scope.boardName = data.data.name;
              console.log("scope.boardName", $scope.boardName);
            });
          };
  
          $scope.getNameOfBoard();

          $scope.getBoardCover = () =>{
            FbFactory.getBoard($routeParams.boardId).then(data => {
              console.log("data in getBoardCover", data);
            $scope.boardCover = data.data.url;
           
            });
          };
          
          //call getBoardCover
        $scope.getBoardCover();
      
          $scope.addPinToCloud = (e) => {
            let pin = e;
    
                
            var storage = firebase.storage();
            
            let storageRef = firebase.storage().ref(pin.name);
           
            storageRef.put(pin);

            storageRef.getDownloadURL().then(function(url){

                $scope.newPin.boardId = $routeParams.boardId;
                $scope.newPin.uid = firebase.auth().currentUser.uid;
                $scope.newPin.username = firebase.auth().currentUser.displayName;
                $scope.newPin.url = url;

                console.log($scope.newPin, "new PIn");

                FbFactory.addPin($scope.newPin)
        
              .then(data => {
                console.log("data in pin add pin", data);
                $route.reload(`portfolio/${$scope.newPin.boardId}`); // this was pins but that route doesnt exist -CB
              })
              .catch(error => {
                console.log(error);
              });
            });
                
          };

          
    
  
        } else {


          
          $scope.save  = function(){
            html2CanvasAngular.renderBody().then(function(canvas){
              document.body.appendChild(canvas);
            });
          };


          $scope.boardId = $routeParams.boardId;

            //get pins
          console.log("not logged in to see pins");
          console.log($routeParams.boardId, "route parms board id");
          FbFactory.getPins($routeParams.boardId).then(data => {
            console.log("pins data", data);
            $scope.pins = data;
          });


        }
      });
      //cb

      $scope.getBoardCover = () =>{
        FbFactory.getBoard($routeParams.boardId).then(data => {
          // console.log("data in getBoardCover", data);
        $scope.boardCover = data.data.url;
        // console.log("scope.boardCover", $scope.boardCover);
        });
      };
      
      //call getBoardCover
    $scope.getBoardCover();
  
      $scope.backToBoards = () => {
        console.log("clicked");
        $location.url("/boards");
      };
  
      $scope.pinRemove = (pinId) => {
        FbFactory.deletePins(pinId)
        .then(() => {
          $route.reload("/pins/:boardId");
        });
      };
});
