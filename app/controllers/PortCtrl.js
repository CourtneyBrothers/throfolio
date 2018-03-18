"use strict";


angular.module("Throfolio").controller("PortCtrl", function ($scope, FbFactory, $routeParams, $location, $route, $window, StorageFactory, FBcreds) {


	firebase.auth().onAuthStateChanged(function (user) {
		if (user) {
			// New board object
			$scope.newBoard = {
				name: "",
				url: "",
				username: ""
			};
            
			FbFactory.getBoards()
				.then((boards) => {
					$scope.boards = boards;

				})
				.catch((error) => {
					console.log("getBoards didn't work", error);
				});



			// This function saves the new board object when the user clicks "Create"
			$scope.savePortfolio = () => {
				$scope.newBoard.uid = firebase.auth().currentUser.uid;
				$scope.newBoard.username = firebase.auth().currentUser.displayName;
				FbFactory.addBoard($scope.newBoard)
					.then((board) => {
						$route.reload("/portfolio");
					});
			};

			$scope.addImageToCloud = (e) => {

				let file = e;
				var storage = firebase.storage();
				let storageRef = firebase.storage().ref(file.name);
				storageRef.put(file);

				storageRef.getDownloadURL().then(function (url) {
					$scope.newBoard.uid = firebase.auth().currentUser.uid;
					$scope.newBoard.username = firebase.auth().currentUser.displayName;
					$scope.newBoard.url = url;


					FbFactory.addBoard($scope.newBoard)
						.then((board) => {
							// $location.url("/boards");
							$route.reload("/portfolio");

						});

				});
			};



			$scope.deleteBoard = (boardId) => {

				FbFactory.removeBoards(boardId)
					.then((data) => {
						FbFactory.getPins(boardId)
							.then((data) => {
								data.forEach((board) => {
									FbFactory.deletePins(board.pinId)
										.then(() => {
											$route.reload("/portfolio");
										});
								});
							});
					});
			};



		} else {
			//TODO: unauthenticated routes 

			FbFactory.getBoardsPublic($routeParams.username)
				.then((boards) => {
					$scope.boards = boards;


				})
				.catch((error) => {
					console.log("getBoards didn't work", error);
				});

		}
	});
});