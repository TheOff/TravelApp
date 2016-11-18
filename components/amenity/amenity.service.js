'use strict';

angular.module('app')

  .service('AmenityService', function() {
    var maxStars = 5;

    this.createStars = function(count) {
      var stars;

      count = +count || 1;
      stars = new Array(+count + 1).join('★');

      if (count === maxStars) {
        stars += ' and higher';
      }

      return stars;
    };

    this.getOptions = function(count) {
      var options = [];

      count = count || maxStars;

      for (var i = 1; i < count + 1; i++) {
        options.push({
          value: i,
          title: this.createStars(i)
        });
      }

      return options;
    };

    this.getDefault = function() {
      return 1;
    };
  });
