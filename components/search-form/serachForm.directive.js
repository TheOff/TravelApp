'use strict';

angular.module('app')

  .directive('searchForm', function($filter, $templateCache) {
    return {
      templateUrl: '/components/search-form/search-form.html',
      scope: {
        tab: '@searchForm',
        onSearch: '&?'
      },
      controllerAs: 'data',
      link: function(scope, elem, attrs, ctrl) {
        scope.form.startDate.$validators.date = validateDate;
        scope.form.endDate.$validators.date = validateDate;

        attrs.$observe('tab', setFeature);
        setFeature(scope.tab);

        scope.form.startDate.$validators.lessThanEnd = function(val) {
          if (ctrl.endDate && val) {
            return new Date(val) <= new Date(ctrl.endDate);
          }

          return true;
        };

        scope.form.endDate.$validators.moreThanStart = function(val) {
          if (ctrl.startDate && val) {
            return new Date(ctrl.startDate) <= new Date(val);
          }

          return true;
        };

        function setFeature(tab) {
          scope.feature = '/components/search-form/' + tab + '.html';
          $templateCache.put(scope.feature, '<div ' + tab + '></div>');
        }

        function validateDate(str) {
          var date;

          try {
            date = new Date(str);
          } catch (e) {}

          return date.toString() !== 'Invalid Date';
        }
      },
      controller: function ($scope) {
        var vm = this;

        vm.clearChildren = [];
        vm.childrenSetData = [];

        vm.onSearch = $scope.onSearch || angular.noop;
        vm.now = new Date().toDateString();

        $scope.$on($scope.tab + 'SetData', function(evt, data) {
          vm.setData(data);
        });

        vm.search = function(evt) {
          var data;

          if ($scope.form.$invalid) {
            return;
          }

          data = angular.copy(vm);
          data.startDate = new Date(data.startDate);
          data.endDate = new Date(data.endDate);

          evt.preventDefault();

          vm.onSearch({ $data: data });
          vm.clear();
        };

        vm.clear = function() {
          vm.startDate = null;
          vm.endDate = null;

          angular.forEach(vm.clearChildren, function(func) {
            typeof func === 'function' && func();
          });

          $scope.form.$setPristine();
          $scope.form.$setUntouched();
        };

        vm.setData = function(data) {
          vm.startDate = $filter('date')(data.startDate, 'MMM dd, yyyy');
          vm.endDate = $filter('date')(data.endDate, 'MMM dd, yyyy');

          angular.forEach(vm.childrenSetData, function(func) {
            typeof func === 'function' && func(data);
          });
        };
      }
    }
  });
