'use strict';
(function(){
  var app = angular.module('pickemApp', []);
  app.config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
    }
  );
}.call(this));
