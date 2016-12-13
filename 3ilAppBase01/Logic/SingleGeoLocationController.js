  var app = angular.module('singleGeoLocation', ['ngMap']);

  app.controller('geoController', ['$scope', function testCtrl($scope) {
 
    //  $scope.coordinates={};
      
      $scope.coordinates.long = 20;
      $scope.coordinates.lat = 20;

      $scope.latlng = [20, 20];
      $scope.getpos = function (event) {

          $scope.coordinates.long = event.latLng.lng();
          $scope.coordinates.lat = event.latLng.lat();
          $scope.location = [event.latLng.lat(), event.latLng.lng()];

      };
      $scope.update = function (long, lat) {

          $scope.location = [lat, long];
      };
        }]);