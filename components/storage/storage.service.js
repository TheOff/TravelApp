'use strict';

angular.module('app')

  .service('StorageService', function() {
    this.get = function(key) {
      var data = localStorage.getItem(key);

      try {
        return JSON.parse(data);
      } catch (e) {}
    };

    this.set = function(key, value) {
      var data;

      try {
        data = JSON.stringify(value);
        localStorage.setItem(key, data);
      } catch (e) {}
    };
  });
