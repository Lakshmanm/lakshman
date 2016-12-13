'use strict';
var app = angular.module('Aarush.CalenderSetting', []);
app.controller('Aarush.CalenderSetting', function ($scope, $filter,TempDataService,$rootScope) {
    $scope.hstep = 1;
    $scope.mstep = 15;
     $scope.clinic2ndvalue = true;
    $scope.clinic3rdvalue = true;
     

    // Time Picker
    $scope.options = {
        hstep: [1, 2, 3],
        mstep: [1, 5, 10, 15, 25, 30]
    };

    $scope.ismeridian = true;
    $scope.toggleMode = function () {
        $scope.ismeridian = !$scope.ismeridian;
    };

    $scope.update = function () {
        var d = new Date();
        d.setHours(14);
        d.setMinutes(0);
        $scope.dt = d;
    };

    $scope.changed = function () {
        $log.log('Time changed to: ' + $scope.dt);
    };

    $scope.clear = function () {
        $scope.dt = null;
    };
     $scope.mainClinic2ndSssionChange = function () {
        
     $scope.clinic2ndvalue = false;
     $scope.clinic3rdvalue = true;
       
    };
      $scope.mainClinic3rdSssionchange = function () {
         
     $scope.clinic2ndvalue = false;
     $scope.clinic3rdvalue = false;
       
    };
    
    $scope.mainClinic1stSssionChange = function () {
         
     $scope.clinic2ndvalue = true;
     $scope.clinic3rdvalue = true;
       
    };
    
    
    
    
    
   
 
});