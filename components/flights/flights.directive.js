'use strict';

angular.module('app')

  .directive('flights', function() {
    return {
      require: '^searchForm',
      templateUrl: '/components/flights/flights.html',
      link: function(scope, elem, attrs, ctrl) {
        ctrl.clearChildren.push(function() {
          setData('', '');
        });
        ctrl.childrenSetData.push(function(data) {
          setData(data.from, data.to);
        });

        function setData(from, to) {
          ctrl.from = from;
          ctrl.to = to;
        }
      }
    };
  });
