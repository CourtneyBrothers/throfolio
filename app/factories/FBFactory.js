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

    //add portfolio to page
    function getBoards() {
        return $q((resolve, reject) => {
            $http
                .get(`https://throfolio.firebaseio.com/pieces.json?orderBy="uid"&equalTo="${firebase.auth().currentUser.uid}"`)
                .then((boards) => {
                    let keys = Object.keys(boards.data);
                    keys.forEach(key => {
                        boards.data[key].boardId = key;
                    });
                    let boardsDataArr = Object.values(boards.data);
                    resolve(boardsDataArr);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }









    return {addBoard, getBoards};

});