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
// add portfolio to unauthpage
    function getBoardsPublic(username) {
        console.log("get boards public username", username);
        return $q((resolve, reject) => {
            $http
                .get(`https://throfolio.firebaseio.com/pieces.json?orderBy="username"&equalTo="${username}"`)
                .then((boards) => {
                    console.log("boards in get public boards", boards);
                    let keys = Object.keys(boards.data);
                    keys.forEach(key => {
                        boards.data[key].boardId = key;
                    });
                    let boardsDataArr = Object.values(boards.data);
                    resolve(boardsDataArr);
                })
                .catch((error) => {
                    reject(error);
                    console.log ("error", error);
                });
        });
    }

   
    function getPins(boardId) {
        return $q((resolve, reject) => {
            $http
                .get(`https://throfolio.firebaseio.com/pins.json?orderBy="boardId"&equalTo="${boardId}"`)
                .then((data) => {
                    let keys = Object.keys(data.data);
                    keys.forEach(key => {
                        data.data[key].pinId = key;
                    });
                    let pinArr = Object.values(data.data);
                    resolve(pinArr);
                })
                .catch((error) => {
                    reject(error);
                    console.log("eroor",error);
                });
        });
    }

    function addPin(newPin) {
        return $q((resolve, reject) => {
            $http
                .post(`https://throfolio.firebaseio.com/pins.json`, JSON.stringify(newPin))
                .then((data) => {
                    resolve(data);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }


    function getBoard(boardId) {
        return $q((resolve, reject) => {
            $http
                .get(`https://throfolio.firebaseio.com/pieces/${boardId}.json`)
                .then((data) => {
                    resolve(data);
                    console.log("data in get board", data);
                })
                .catch((error) => {
                    reject(error);
                    console.log("errror",error);
                });
        });
    }


    //CB ADD Get all boards

    function getAllBoards() {
        return $q((resolve, reject) => {
            $http
                .get(`https://throfolio.firebaseio.com/pieces.json`)
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


   

    return {addBoard, getBoards, getPins, addPin, getBoard, getAllBoards,getBoardsPublic};

});