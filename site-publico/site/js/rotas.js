angular.module('site', ['ngRoute', 'ngSanitize']).config(
    function($routeProvider){
        $routeProvider.when('/inicio', {
            templateUrl: "partials/inicio.html",
            controller: 'inicioCtrl'
        });
        $routeProvider.when('/assistir/:id', {
            templateUrl: "partials/assistir.html",
            controller: 'assistirCtrl'
        });
        $routeProvider.when('/pesquisa/:id', {
            templateUrl: 'partials/pesquisa.html',
            controller: 'pesquisaCtrl'
        });
        $routeProvider.otherwise('/inicio');
    }
);