"use strict";

angular.module("Throfolio", ["ngRoute"])
    // .constant('_') //may want lodash maybe not

    //These routes ( .when x 3 are for user interface)
    .config($routeProvider => {
        $routeProvider
        .when("/", {
            templateUrl: "partials/landing-view.html",
            controller: "AuthCtrl"
        })
        .when("/portfolio", {
            templateUrl: "partials/portfolio-view.html",
            controller: "PortCtrl"
        })
        .when("/portfolio/:boardId", {
            templateUrl: "partials/ref-view.html",
            controller: "RefCtrl"
        })
        .when("/DISPLAYNAME",{
            templateUrl: "partials/portfolio-view.html",
            controller: "PortCtrl"
        }) //TODOOOOO LINK THIS
        .when("/DISPLAYNAME/REFS") ///TODO
            templateUrl: "partials/ref-view.html",
            controller: "RefCtrl"
        .otherwise("/");
        //more routes for unauthenticated viewers to view specific profiles

    })


.run(FBcreds => {
        let creds = FBcreds;
        let authConfig = {
            apiKey: creds.apiKey,
            authDomain: creds.authDomain
        };
        firebase.initializeApp(authConfig);
    });
