angular.module("Throfolio", ["ngRoute"])
    // .constant('_') //may want lodash maybe not

    //These routes ( .when x 3 are for user interface)
    .config($routeProvider => {
        $routeProvider
        .when("/login", {
            // templateUrl: "partials/nav-view.html",
            // controller: "AuthCtrl"
        })
        .when("/boards", {
            // templateUrl: "partials/board-view.html",
            // controller: "BoardCtrl"
        })
        .when("/pins/:boardId", {
            // templateUrl: "partials/pin-view.html",
            // controller: "PinCtrl"
        })
        // .otherwise("/");
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
