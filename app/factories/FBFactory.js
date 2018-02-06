"use strict";


angular.module("Throfolio").factory("FbFactory", ($http, $q) => {


    //add portfolio image
    function addBoard(newBoard) {
        return $q((resolve, reject) => {
            $http
                .post(`https://throfolio.firebaseio.com/pieces.json`, JSON.stringify(newBoard))
                .then((data) => {
                    resolve(data);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }











    return {};

});