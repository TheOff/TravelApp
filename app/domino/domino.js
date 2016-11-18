'use strict';

angular.module('app')

  .controller('DominoController', function($scope) {
    $scope.blancArray = new Array(6);
    $scope.domino = {
      top: 3,
      bottom: 5
    };

    $scope.width = 150;
    $scope.speed = 1e3;
  })

  .directive('domino', function($timeout) {
    return {
      restrict: 'A',
      scope: {
        size: '@',
        speed: '@',
        domino: '='
      },
      template: '<div class="domino-face" weight="{{ domino.top }}"></div>' +
                '<div class="domino-face" weight="{{ domino.bottom }}"></div>',
      link: function(scope, elem, attrs) {
        var prefixes = ['-webkit-', '-moz-', '-ms-', '-o-', ''];
        var angle = 0;
        var timer;

        function getTransitionEvt() {
          var transitions = {
            'transition': 'transitionend',
            'OTransition': 'oTransitionEnd',
            'MozTransition': 'transitionend',
            'WebkitTransition': 'webkitTransitionEnd'
          };
          var elem = document.createElement('fakeelement');
          var t;

          for (t in transitions) {
            if (elem.style[t] !== undefined){
              return transitions[t];
            }
          }
        }

        function simplifyAngle() {
          if (Math.abs(angle) > 360) {
            angle = angle % 360;
          }

          if (Math.abs(angle) > 180) {
            angle += (angle < 0) ? 360 : -360
          }

          setDuration(0);
          rotate();

          $timeout(function() {
            setDuration(scope.speed);
          }, 0);
        }

        function rotate() {
          angular.forEach(prefixes, function(prefix) {
            elem.css(prefix + 'transform', 'rotate(' + angle + 'deg)');
          });
        }

        function setDuration(val) {
          var time = val ? 2e5 / val : 0;

          angular.forEach(prefixes, function (prefix) {
            elem.css(prefix + 'transition-duration', time + 'ms');
          });
        }

        scope.domino = scope.domino || {};

        scope.domino.rotateLeft = function() {
          angle -= 90;
          rotate();
        };

        scope.domino.rotateRight = function() {
          angle += 90;
          rotate();
        };

        scope.domino.reset = function() {
          angle = 0;
          scope.domino.top = null;
          scope.domino.bottom = null;

          simplifyAngle();
        };

        scope.domino.setSide = function(weight) {
          if (!scope.domino.top) {
            scope.domino.top = weight;
          } else if (!scope.domino.bottom) {
            scope.domino.bottom = weight;
          }
        };

        attrs.$observe('size', function(val) {
          elem.css('width', val + 'px');
        });

        attrs.$observe('speed', function (val) {
          if (timer) {
            $timeout.cancel(timer);
          }

          timer = $timeout(function() {
            setDuration(val);
          }, 100);
        });

        elem.on(getTransitionEvt(), simplifyAngle);
      }
    }
  })

  .directive('dominoFace', function() {
    return {
      restrict: 'C',
      scope: {
        weight: '@'
      },
      link: function(scope, elem) {
        function setInner(weight, oldWeight) {
          elem.children().remove();

          for (var i = 0; i < +weight; i++) {
            elem.append(document.createElement('i'));
          }

          if (oldWeight) {
            elem.removeClass('domino-' + oldWeight);
          }

          elem.addClass('domino-' + weight);
        }

        scope.$watch('weight', setInner);
        setInner(scope.weight);
      }
    }
  });
