/*=======================================================================
 All rights reserved to  Thrill Innovative Labs.
 THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
 OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
 LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
 FITNESS FOR A PARTICULAR PURPOSE.
===========================================================================
****************************************************************************
 Name                : LocationList.Controller.js
 Type                : Javascript and JQuery 
 Description         : This file contains controller methods
 References          :
 Author              : Satya kalyani Lanka
 Created Date        : 07-Apr-2016
****************************************************************************
MODIFICATION LOG
**************************************************************************** 
Ver Date          Modified By           Description
1   14-04-2016    satya kalyani Lanka   dependency injections are arranged
****************************************************************************  
Code Review LOG
**************************************************************************** 
S.No      Ver        Date                Code Review By            Observations
1        1.0       13-April-2016         Sri Venkatesh.T            Write full name in the author section in the header.
****************************************************************************
*/

var app = angular.module('ThrillLocation.locationList', ['ThrillLocation.locationListLogic', 'ngCordova', 'ThrillFrameworkLibrary.geo', 'ThrillFrameworkLibrary.Network','ThrillCnnWebClient.appConfig', 'ThrillFrameworkLibrary.appLogger'])
    /*Setup location Controller */
    .controller('locationListController', function($scope, $http, locationListLogic, $state, $stateParams, appConfig, appLogger) {

        var locationReferenceKey = $stateParams.locationReferenceKey;
        getLabels(appConfig.CULTURE_NAME);
        getMessages(appConfig.CULTURE_NAME);

        /*get labels with selected language*/
        function getLabels(cultureName) {

            var currentFileName = "LocationList";
            $http.get("Location/Languages/" + currentFileName + "." + cultureName + ".json").then(function(response) {

                bindLabels(response.data);

            }, function(err) {

                console.error(err);
            });
        }

        function getMessages(cultureName) {
            var alertMessageName = "AlertMessages";

            $http.get("Location/Languages/" + alertMessageName + "." + cultureName + ".json").then(function(response) {
                $scope.alertMessageLabels = response.data.messages;
            });
        }

        /*bind labels with selected language */
        function bindLabels(data) {
            var lables = {

                LocationList: data.labels.LocationList,
                District: data.labels.District,
                Country: data.labels.Country,
                Location: data.labels.Location,
                Delete: data.labels.Delete,
                Edit: data.labels.Edit

            };

            $scope.lables = lables;


        }

        /*retriving all the location details*/
        var locationList = function() {
            locationListLogic.getLocationInfoDetails().then(function(response) {
                $scope.locationDetails = response;
            }, function(err) {

                console.error('ERR', err);

            });
        };

        /*removing location details based on locationID*/

        $scope.removeLocation = function(locationReferenceKey) {
            locationListLogic.removeLocation(locationReferenceKey).then(function(response) {
                appLogger.alert($scope.alertMessageLabels.locationDeleted);
                locationList();
            }, function(err) {

                console.error('ERR', err);
            });

        };
        locationList();



    });