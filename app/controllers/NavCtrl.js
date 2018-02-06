"use strict";

angular.module("Throfolio").controller("NavCtrl", function($scope, AuthFactory, $location, $window ) {
  

    
    //placeholder
    $scope.logo = "images/pizza-ghost.png";

    $scope.navBar = [
        {
            name: "Login",
            bang: "!"

        },
        {
            name: "Logout"
            //placeholder function// 
        }
    ];    

        $scope.navAuth = (item) => {
            if (item === "Login") {
                AuthFactory.login()
                .then(user => {
                    console.log('User: ', user);
                    $window.location = "/#!/boards";
                });
            } else {
                AuthFactory.logout();
            }
        }; 

        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                $scope.$apply($scope.loggedIn = true);
            } else {
                $scope.loggedIn = false;
                $scope.$apply();
            }
        });
});