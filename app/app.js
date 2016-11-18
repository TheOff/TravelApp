'use strict';

angular.module('app', ['ui.router', '720kb.datepicker'])

  .config(function($locationProvider, $stateProvider) {
    $locationProvider.html5Mode(true);

    $stateProvider

      .state({
        url: '/',
        name: 'domino',
        templateUrl: 'app/domino/domino.html',
        controller: 'DominoController',
        data: {
          className: 'domino-page'
        }
      })

      .state({
        url: '/gpa/?',
        name: 'gpa',
        templateUrl: 'app/gpa/gpa.html',
        controller: 'GpaController',
        data: {
          className: 'gpa-page'
        },
        resolve: {
          grades: function($http) {
            return $http.get('/grades.json');
          }
        }
      })

      .state({
        url: '/travel/',
        name: 'travel',
        templateUrl: 'app/travel/travel.html',
        controllerAs: 'travel',
        controller: 'TravelController',
        data: {
          className: 'travel-page'
        }
      })

      .state({
        url: '/plane/',
        name: 'plane',
        templateUrl: 'app/plane/plane.html',
        controller: 'PlaneController'
      });

    window.C = console.log.bind(console);
  })

  .run(function($rootScope, $state) {
    $rootScope.states = $state.get();

    $rootScope.$on('$stateChangeStart', function(evt, toState) {
      $rootScope.stateData = toState.data;
    });
  })

  .filter('capitalize', function() {
    return function(str) {
      var words = str.split(' ');

      return words.map(function(word) {
        return word.slice(0, 1).toUpperCase() + word.slice(1);
      }).join(' ');
    };
  });
