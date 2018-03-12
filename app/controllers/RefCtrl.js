"use strict";
angular.module("Throfolio").controller("RefCtrl", function ($scope, FbFactory, $routeParams, $location, $route, $window,StorageFactory) {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          $scope.newPin = {
            uid: "",
            name: "",
            url: "",
            username: ""
          };

          //canvas object
          $scope.newCanvas = {
            uid: "",
            name: "",
            url: "",
            username: "",
            boardId:""
          };


          $scope.save  = function(){
            // html2CanvasAngular.renderBody().then(function(canvas){
              let canvas = document.getElementById("pwCanvasMain");
              // document.body.appendChild(canvas); stop appenings
              let canvasURL = canvas.toDataURL();
             
//CB add this
              $scope.newCanvas.uid = firebase.auth().currentUser.uid;
              $scope.newCanvas.username = firebase.auth().currentUser.displayName;
              $scope.newCanvas.url = canvasURL;
              $scope.newCanvas.boardId = $routeParams.boardId;

              FbFactory.addCanvas($scope.newCanvas).then(data =>{
           
                $route.reload(`canvas/${$scope.newCanvas.boardId}`);
              });
          };
  
      $scope.boardId = $routeParams.boardId; // CB SCOPE BOARDID
  
          FbFactory.getPins($routeParams.boardId).then(data => {
          
            $scope.pins = data;

          });


  
          $scope.savePin = () => {

            // I think "$routeParams.id" will be the boards id?
            $scope.newPin.boardId = $routeParams.boardId;
            $scope.newPin.username = firebase.auth().currentUser.displayName;
          
            $scope.newPin.uid = firebase.auth().currentUser.uid;
  
    
            FbFactory.addPin($scope.newPin)
              .then(data => {
           
                $route.reload(`portfolio/${$scope.newPin.boardId}`); // this was pins but that route doesnt exist -CB
              })
              .catch(error => {
                console.log(error);
              });
  
          };

          $scope.getNameOfBoard = () => {
            FbFactory.getBoard($routeParams.boardId).then(data => {
         
              $scope.boardName = data.data.name;
         
            });
          };
  
          $scope.getNameOfBoard();

          $scope.getBoardCover = () =>{
            FbFactory.getBoard($routeParams.boardId).then(data => {
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
                // TODO $scope.newPin.name = 


                FbFactory.addPin($scope.newPin)
        
              .then(data => {
          
                $route.reload(`portfolio/${$scope.newPin.boardId}`); // this was pins but that route doesnt exist -CB
              })
              .catch(error => {
                console.log(error);
              });
            });
                
          };

          $scope.getBoardSketches = () => {
            FbFactory.getCanvas($routeParams.boardId).then(data => {
                $scope.boardSketches = data.data;
              }
            );
          };
        
          $scope.getBoardSketches();


          //HERE
          $scope.deleteSketch = (fbKey) => {
            FbFactory.removeSketch(fbKey);
          };


          $scope.getCanvasNames = () =>{
            FbFactory.getCanvas($routeParams.boardId).then(data => {
              $scope.canvases = data.data;
            }
          );
        };
          
          $scope.getCanvasNames(); //call names
          
//took out getting single canvas 
          // $scope.getCanvasTheOne = (canvasName) => {
          //   console.log(canvasName, "canvas name");
          //   FbFactory.getCoverCanvas(canvasName).then(data => {
          //     console.log(" conver canvas data", data.data);
          //     $scope.savedCanvas = data.data;
          //     console.log($scope.savedCanvas, "savedCanvas");
          //   });
          // };


          $scope.deletePin = (pinId) => {
            
            FbFactory.deletePins(pinId) .then(() => {
              
            $route.reload(`portfolio/${$scope.newPin.boardId}`);
             });
          };


          $scope.toggleFilter = function() {
            this.toggle = !this.toggle;
          };
         
          // console.log("$scope.canvasShow", $scope.canvasShow);
          

        } else {
            $scope.save  = function(){
            // html2CanvasAngular.renderBody().then(function(canvas){
              let canvas = document.getElementById("pwCanvasMain");
              // document.body.appendChild(canvas); stop appenings
              let canvasURL = canvas.toDataURL();
//CB add this
              $scope.newCanvas.uid = firebase.auth().currentUser.uid;
              $scope.newCanvas.username = firebase.auth().currentUser.displayName;
              $scope.newCanvas.url = canvasURL;
              $scope.newCanvas.boardId = $routeParams.boardId;

              FbFactory.addCanvas($scope.newCanvas).then(data =>{
                $route.reload(`canvas/${$scope.newCanvas.boardId}`);
              });
          };


          // $scope.save  = function(){
          //   // html2CanvasAngular.renderBody().then(function(canvas){
          //     // document.body.appendChild(canvas); stop appending
          //     let canvas = document.getElementById("pwCanvasMain");
          //     console.log("canvas from save", canvas);
          //     console.log("url",canvas.toDataURL());
          //   });
          // };


          $scope.boardId = $routeParams.boardId;

            //get pins
          FbFactory.getPins($routeParams.boardId).then(data => {
            $scope.pins = data;
          });


        }
      });
      //cb

      $scope.getBoardCover = () =>{
        FbFactory.getBoard($routeParams.boardId).then(data => {
        $scope.boardCover = data.data.url;
        });
      };
      
      //call getBoardCover
    $scope.getBoardCover();
  
      $scope.backToBoards = () => {
        $location.url("/boards");
      };
  
      $scope.pinRemove = (pinId) => {
        FbFactory.deletePins(pinId)
        .then(() => {
          $route.reload("/pins/:boardId");
        });
      };
});
