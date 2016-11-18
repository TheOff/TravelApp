'use strict';

angular.module('app')

  .controller('PlaneController', function($scope, $http) {
    var log = window.console.log;

    window.console.log = function() {
      $scope.messages.push({
        text: [].join.call(arguments, ', '),
        type: 'log'
      });
      log.apply(console, arguments);
      $scope.$applyAsync();
    };

    $scope.messages = [];

    $http.get('app/plane.js').then(function(res) {
      try {
        eval(res.data);
      } catch (e) {}
    });

    $scope.$on('$destroy', function() {
      var id = setTimeout(function() {}, 0);

      window.console.log = log;

      while (id--) {
        clearTimeout(id);
      }
    });
  });
