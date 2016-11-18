'use strict';

angular.module('app')

  .controller('GpaController', function($scope, grades) {
    $scope.currentGrade = 0;
    $scope.grades = grades.data;
    $scope.student = {};

    $scope.setTab = function(index, evt) {
      if ($scope.currentGrade !== index) {
        $scope.currentGrade = index;
      }

      evt.preventDefault();
    };

    $scope.addGrade = function() {
      var grade = {
        students: [],
        title: ''
      };

      $scope.grades.push(grade);
      $scope.currentGrade = $scope.grades.length - 1;
    };

    $scope.removeGrade = function(index, evt) {
      $scope.grades.splice(index, 1);

      if (index <= $scope.currentGrade) {
        $scope.currentGrade--;
      }

      calcAverageGpa();

      evt.preventDefault();
      evt.stopPropagation();
    };

    $scope.addStudent = function(index, form, evt) {
      if (!form.$valid) {
        return;
      }

      var student = angular.copy($scope.student);

      $scope.grades[index].students.push(student);
      $scope.student = {};

      form.$setPristine();
      form.$setUntouched();

      evt.preventDefault();

      calcAverageGpa();
    };

    $scope.removeStudent = function(index, studentIndex) {
      $scope.grades[index].students.splice(studentIndex, 1);
      calcAverageGpa();
    };

    function calcAverageGpa() {
      var N = 0;
      var sum = 0;
      var students;

      for (var i = 0; i < $scope.grades.length; i++) {
        students = $scope.grades[i].students;

        for (var j = 0; j < students.length; j++) {
          sum += students[j].gpa;
          N++;
        }
      }

      $scope.avgGpa = (N > 0) ? sum / N : 0;
    }

    calcAverageGpa();
  });
