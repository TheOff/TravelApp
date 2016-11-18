'use strict';

angular.module('app')

  .directive('carClass', function(CarClassService) {
    return {
      restrict: 'A',
      scope: {
        carClass: '@'
      },
      link: function(scope, elem, attrs) {
        elem.html(CarClassService.getTitle(scope.carClass));

        attrs.$observe('amenities', function(val) {
          elem.html(CarClassService.getTitle(val));
        });
      }
    };
  });
