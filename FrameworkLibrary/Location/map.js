/*===========================================================================
 All rights reserved to Nunet Cube Software Solutions.
 THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
 OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
 LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
 FITNESS FOR A PARTICULAR PURPOSE.
============================================================================
****************************************************************************
 Name                :  
 Type                : Javascript and JQuery 
 Description         :
 References          :
 Author              :  
 Created Date        :  
****************************************************************************                          
MODIFICATION LOG
**************************************************************************** 
Ver Date         Modified By            Description
****************************************************************************                            
Code Review LOG
**************************************************************************** 
Ver        Date                Code Review By            Observations
****************************************************************************
*/
/*  

*/

var app = angular.module("ThrillFrameworkLibrary.geo", ["ui.map", "ui.event"])
    .controller("mainController", function ($scope) {
        alert('#1');
        $scope.lat = "0";
        $scope.lng = "0";
        $scope.accuracy = "0";
        $scope.error = "";
        $scope.model = {
            myMap: undefined
        };
        $scope.myMarkers = [];

        $scope.showResult = function () {
            return $scope.error == "";
        }

        $scope.mapOptions = {
            center: new google.maps.LatLng($scope.lat, $scope.lng)
            , zoom: 15
            , mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        //        $scope.showPosition = function (position) {
        //             
        //            $scope.lat = position.coords.latitude;
        //            $scope.lng = position.coords.longitude;
        //            $scope.accuracy = position.coords.accuracy;
        //            $scope.$apply();
        // 
        //            var latlng = new google.maps.LatLng($scope.lat, $scope.lng);
        //            $scope.model.myMap.setCenter(latlng);
        //            $scope.myMarkers.push(new google.maps.Marker({ map: $scope.model.myMap, position: latlng }));
        //        }
        // 
        //        $scope.showError = function (error) {
        //            switch (error.code) {
        //                case error.PERMISSION_DENIED:
        //                    $scope.error = "User denied the request for Geolocation."
        //                    break;
        //                case error.POSITION_UNAVAILABLE:
        //                    $scope.error = "Location information is unavailable."
        //                    break;
        //                case error.TIMEOUT:
        //                    $scope.error = "The request to get user location timed out."
        //                    break;
        //                case error.UNKNOWN_ERROR:
        //                    $scope.error = "An unknown error occurred."
        //                    break;
        //            }
        //            $scope.$apply();
        //        }

        $scope.getLocation = function () {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition($scope.showPosition, $scope.showError);
            } else {
                $scope.error = "Geolocation is not supported by this browser.";
            }
        }

        $scope.getLocation();
    });