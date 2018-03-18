"use strict";


angular.module("Throfolio").factory("FbFactory", ($http, $q) => {


	//add portfolio image
	function addBoard(newBoard) {
		return $q((resolve, reject) => {
			$http
				.post("https://throfolio.firebaseio.com/pieces.json", JSON.stringify(newBoard))
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
		return $q((resolve, reject) => {
			$http
				.get(`https://throfolio.firebaseio.com/pieces.json?orderBy="username"&equalTo="${username}"`)
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
					console.log("error", error);
				});
		});
	}

	//"pin" functionality has been removed from the UI 
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
				});
		});
	}
	//have removed the add pins functionality from the UI
	function addPin(newPin) {
		return $q((resolve, reject) => {
			$http
				.post("https://throfolio.firebaseio.com/pins.json", JSON.stringify(newPin))
				.then((data) => {
					resolve(data);
				})
				.catch((error) => {
					reject(error);
				});
		});
	}

	//add drawing to firebase

	function addCanvas(newCanvas) {
		return $q((resolve, reject) => {
			$http
				.post("https://throfolio.firebaseio.com/canvas.json", JSON.stringify(newCanvas))
				.then((data) => {
					resolve(data);
				})
				.catch((error) => {
					reject(error);
				});
		});
	}


	//returns all sketches made for each sketchboard

	function getCanvas(boardId) {
		return $q((resolve, reject) => {
			$http
				.get(`https://throfolio.firebaseio.com/canvas.json?orderBy="boardId"&equalTo="${boardId}"`)
				.then((data) => {
					resolve(data);
				})
				.catch((error) => {
					reject(error);
				});
		});
	}
	//getCourtneyCanvas for demo

	function getDemoCanvases() {
		return $q((resolve, reject) => {
			$http
				.get("https://throfolio.firebaseio.com/canvas.json?orderBy=\"boardId\"&equalTo=\"-L6CLXi3-iImndOkutJs\"")
				.then((data) => {
					resolve(data);
				})
				.catch((error) => {
					reject(error);
				});
		});
	}
	//get demo background 

	function getDemoBackground() {
		return $q((resolve, reject) => {
			$http
				.get("https://throfolio.firebaseio.com/pieces/-L6CLXi3-iImndOkutJs.json")
				.then((data) => {
					resolve(data);
				})
				.catch((error) => {
					reject(error);
					console.log("errror", error);
				});
		});
	}


	//return all sketches for display page 

	function getAllSketches() {
		return $q((resolve, reject) => {
			$http
				.get("https://throfolio.firebaseio.com/canvas.json")
				.then((sketches) => {
					let keys = Object.keys(sketches.data);
					keys.forEach(key => {
						sketches.data[key].boardId = key;
					});
					let sketchesDataArr = Object.values(sketches.data);
					resolve(sketchesDataArr);
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
				})
				.catch((error) => {
					reject(error);
					console.log("errror", error);
				});
		});
	}


	//CB ADD Get all boards

	function getAllBoards() {
		return $q((resolve, reject) => {
			$http
				.get("https://throfolio.firebaseio.com/pieces.json")
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

	//delete sketch
	function removeSketch(FbId) {
		return $q((resolve, reject) => {
			$http
				.delete(`https://throfolio.firebaseio.com/canvas/${FbId}.json`)
				.then((data) => {
					resolve(data);
				})
				.catch((error) => {
					reject(error);
				});
		});
	}

	//delete board
	function removeBoards(FbId) {
		return $q((resolve, reject) => {
			$http
				.delete(`https://throfolio.firebaseio.com/pieces/${FbId}.json`)
				.then((data) => {
					resolve(data);
				})
				.catch((error) => {
					reject(error);
				});
		});

	}
	//have removed pins from the UI
	function deletePins(pinId) {
		return $q((resolve, reject) => {
			$http
				.delete(`https://throfolio.firebaseio.com/pins/${pinId}.json`)
				.then((data) => {
					resolve(data);
				})
				.catch((error) => {
					reject(error);
				});
		});
	}





	return {
		addBoard,
		getBoards,
		getPins,
		addPin,
		getBoard,
		getAllBoards,
		getBoardsPublic,
		addCanvas,
		getCanvas,
		removeBoards,
		getAllSketches,
		removeSketch,
		getDemoCanvases,
		getDemoBackground
	};

});