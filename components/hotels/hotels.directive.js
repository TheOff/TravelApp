'use strict';

angular.module('app')

  .directive('hotels', function(AmenityService) {
    return {
      require: '^searchForm',
      templateUrl: '/components/hotels/hotels.html',
      link: function(scope, elem, attrs, ctrl) {
        scope.options = AmenityService.getOptions();

        // ToDo: Check reset after click on history (amenities won't be cleared)
        ctrl.clearChildren.push(function() {
          setData(AmenityService.getDefault(), '');
        });
        ctrl.childrenSetData.push(function(data) {
          setData(data.amenities, data.location);
        });
        ctrl.amenities = AmenityService.getDefault();

        function setData(amenities, location) {
          ctrl.amenities = amenities;
          ctrl.location = location;
        }
      }
    };
  });
