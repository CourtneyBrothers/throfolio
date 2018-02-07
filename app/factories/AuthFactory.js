"use strict";


angular.module("Throfolio").factory("AuthFactory", (FBcreds, $q, $route)=>{
    const provider = new firebase.auth.GoogleAuthProvider();
    
    let login = () => {
        // $scope.newUser where should i put the new user func 
    return firebase
        .auth()
        .signInWithPopup(provider)
        .then(function(result){
            var token = result.credential.accessToken;
            var user = result.user.G;
            var userName = result.user.displayName;
            console.log("RESULT",result);
            console.log(result.user.displayName, "display name");
            return {user, userName};
        }).catch(function(error){
            var errorCode = error.code;
            var errorMessage = error.message;
            var email = error.email;
            var credential = error.credential;
            console.log("error",error);
        });
    };

    let logout = () => {
        firebase.auth().signOut().then(function() {
            // Sign-out successful.
          }).catch(function(error) {
            // An error happened.
          });
        };

        return {login, logout};
});
