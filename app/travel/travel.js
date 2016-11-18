'use strict';

angular.module('app')

  .controller('TravelController', function($scope, ConfigFactory, StorageService) {
    var vm = this;

    vm.tabs = ConfigFactory.getTravelTabs();
    vm.currentTab = vm.tabs[0];
    vm.history = StorageService.get('searchHistory') || [];

    vm.setTab = function(tab, evt) {
      evt && evt.preventDefault();
      vm.currentTab = tab;
    };

    vm.onSearch = function(tab, data) {
      data.type = tab;
      vm.history.push(data);
      StorageService.set('searchHistory', vm.history);
    };

    vm.setData = function(data) {
      var tab = data.type;

      vm.setTab(tab);
      $scope.$broadcast(tab + 'SetData', data);
    };

    vm.removeHistoryItem = function(index) {
      vm.history.splice(index, 1);
      StorageService.set('searchHistory', vm.history);
    };
  });
