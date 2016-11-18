'use strict';

angular.module('app')

  .directive('cars', function(CarClassService) {
    return {
      require: '^searchForm',
      templateUrl: '/components/cars/cars.html',
      link: function(scope, elem, attrs, ctrl) {
        scope.options = CarClassService.getOptions();

        // ToDo: Check reset after click on history (car class won't be cleared)
        ctrl.clearChildren.push(function() {
          setData(CarClassService.getDefault(), '');
        });
        ctrl.childrenSetData.push(function(data) {
          setData(data.carClass, data.location);
        });

        ctrl.carClass = CarClassService.getDefault();

        function setData(carClass, location) {
          ctrl.carClass = carClass;
          ctrl.location = location;
        }
      }
    };
  });
