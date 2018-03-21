"use strict";

angular.module("Throfolio", ["ngRoute","pw.canvas-painter"]) // include pw canvas painter
// .constant('_') //may want lodash maybe not

	.config($routeProvider => {
		$routeProvider
			.when("/", {
				templateUrl: "partials/landing-view.html",
				controller: "PortMainCtrl"
			})
			.when("/demo",{
				templateUrl:"partials/login.html",
				controller:"LoginPageDisplayCtrl"
			})
			.when("/portfolio", {
				templateUrl: "partials/portfolio-view.html",
				controller: "PortCtrl"
			})
			.when("/portfolio/:boardId", {
				templateUrl: "partials/ref-view.html",
				controller: "RefCtrl"
			})
			.when("/portfolios/:username",{  ///needs to go in IS NOT AUTH
				templateUrl: "partials/unauth-portfolio-view.html",
				controller: "PortCtrl"
			}) //TODOOOOO LINK THIS
			.when("/gettheref/:boardId",{ ///TODO
				templateUrl: "partials/unauth-ref-view.html",
				controller: "RefCtrl"
			})
			.when("/canvas/:boardId",{
				templateUrl:"partials/canvas-view.html",
				controller:"RefCtrl"

			})
			.when("/canvases/:boardId",{
				templateUrl:"partials/made-canvas-view.html",
				controller:"RefCtrl"

			})
			.when("/sketches/:boardId",{
				templateUrl:"partials/sketches-view.html",
				controller:"RefCtrl"
			})
			.otherwise("/");
	
	})


	.run(FBcreds => {
		firebase.initializeApp(FBcreds);
	});
