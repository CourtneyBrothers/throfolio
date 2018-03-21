"use strict";

angular.module("Throfolio").controller("PortMainCtrl", function ($scope, FbFactory, $routeParams, $location, $route, $window) {

   
            
	FbFactory.getAllBoards()
		.then((boards) => {
			$scope.boards = boards;
              
		})
		.catch((error) => {
			console.log("getBoards didn't work", error);
		});

	FbFactory.getAllSketches()
		.then((sketches)=>{
			$scope.sketches = sketches;

		})
		.catch((error) => {
			console.log("get sketches didnt work", error);
		});

});