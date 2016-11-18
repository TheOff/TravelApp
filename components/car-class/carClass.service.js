'use strict';

angular.module('app')

  .service('CarClassService', function(ConfigFactory) {
    var options = ConfigFactory.getCarClasses();

    this.getTitle = function(val) {
      val = +val || 1;

      if (+val in options) {
        return options[val];
      } else {
        return options[this.getDefault()];
      }
    };

    this.getOptions = function() {
      return angular.copy(options);
    };

    this.getDefault = function() {
      for (var key in options) {
        if (options.hasOwnProperty(key)) {
          return key;
        }
      }
    };
  });
