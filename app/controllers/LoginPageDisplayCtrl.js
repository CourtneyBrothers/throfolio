"use strict";


angular.module("Throfolio").controller("LoginPageDisplayCtrl", function ($scope, FbFactory, $routeParams, $location, $route, $window, StorageFactory, FBcreds) {


//call canvases made for the maison st cyr board for the demo on the login page
	$scope.demoCanvas = () => {
		FbFactory.getDemoCanvases().then(data => {
			$scope.canvases = data.data;
		});
	};

	$scope.demoCanvas();

	$scope.demoBoard = () => {
		FbFactory.getDemoBackground().then(data => {
			$scope.boardCover = data.data.url;
		});
	};

	$scope.demoBoard();

	$scope.toggleFilter = function () {
		this.toggle = !this.toggle;
	};

});