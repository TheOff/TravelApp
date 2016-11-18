'use strict';

angular.module('app')

  .directive('amenities', function(AmenityService) {
    return {
      restrict: 'A',
      scope: {
        amenities: '@'
      },
      link: function(scope, elem, attrs) {
        elem.html(AmenityService.createStars(scope.amenities));

        attrs.$observe('amenities', function(val, oldVal) {
          if (val !== oldVal) {
            elem.html(AmenityService.createStars(val));
          }
        });
      }
    };
  });
