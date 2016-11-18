'use strict';

angular.module('app')

  .factory('ConfigFactory', function() {
    var amenityMaxStars = 5;

    function getCarClasses() {
      return {
        1: 'Economy',
        2: 'Business',
        3: 'Luxury'
      };
    }

    function getTravelTabs() {
      return ['flights', 'hotels', 'cars'];
    }

    return {
      amenityMaxStars: amenityMaxStars,
      getCarClasses: getCarClasses,
      getTravelTabs: getTravelTabs
    };
  });
