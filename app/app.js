"use strict";

angular.module("Throfolio", ["ngRoute","pw.canvas-painter", 'ng-slide-down']) // include pw canvas painter
    // .constant('_') //may want lodash maybe not

    //These routes ( .when x 3 are for user interface)
    .config($routeProvider => {
        $routeProvider
        .when("/", {
            templateUrl: "partials/landing-view.html",
            controller: "PortMainCtrl"
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
        .otherwise("/");
        //more routes for unauthenticated viewers to view specific profiles

    })


.run(FBcreds => {
        // let creds = FBcreds;
        // let authConfig = {  //try dh way
        //     apiKey: creds.apiKey,
        //     authDomain: creds.authDomain
        // };
        firebase.initializeApp(FBcreds);
    });
