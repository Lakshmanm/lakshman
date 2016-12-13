/*=======================================================================
 All rights reserved to Thrill Innovative Labs.
 THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
 OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
 LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
 FITNESS FOR A PARTICULAR PURPOSE.
===========================================================================
****************************************************************************
 Name		    	 : personLivingPlace.Controller.js
 Type		    	 : Angular js 
 Description		 : This file contains controller methods
 References		     :
 Author	    		 : Kiranmai L
 Created Date        : 18-Apr-2016
****************************************************************************
MODIFICATION LOG
**************************************************************************** 
S.NO  Ver	  Date	     Modified By			Description
1.    1.0     19-04-2016   Kiranmai L             Define getLivingPlacesById edit method
2     1.0     29-04-2016   Satya Kalyani Lanka    referenceKey concept implemented
****************************************************************************  
Code Review LOG
**************************************************************************** 
S.No    Ver    Date           Code Review By   Observations
****************************************************************************
*/

var app = angular.module('ThrillPerson.personLivingPlace', ['ThrillPerson.personLivingPlaceLogic'

        
        , 'ngCordova', 'ThrillFrameworkLibrary.geo'

        
        , 'ThrillFrameworkLibrary.Network'

        
        , 'ThrillCnnWebClient.appConfig'

        
        , 'ThrillFrameworkLibrary.appLogger'
])
    /*Setup Person Controller */

app.controller('PersonLivingPlaceController'
    , function (
        $scope
        , $http
        , PersonLivingPlaceLogic
        , $state
        , $stateParams
        , appConfig
        , appLogger) {

        var referenceKey = generateUUID();
        //initial load method calling
        refresh();
        var personReferenceKey = $stateParams.personReferenceKey;
        //initial load method
        function refresh() {
            getLabels(appConfig.CULTURE_NAME);
            $scope.living = {};
            $scope.livingLocation = {};
            getLivingPlaceTypes();
            getAllLivingPlaces($stateParams.personReferenceKey);
        };
        if ($stateParams.personReferenceKey != undefined || $stateParams.personReferenceKey != null) {
            personReferenceKey = $stateParams.personReferenceKey;
            getAllLivingPlaces(personReferenceKey);
        }
        /*get labels with selected language*/
        function getLabels(cultureName) {
            $http.get('Person/Languages/PersonLivingPlaces.' + cultureName + '.json').then(function (response) {
                bindLabels(response.data);

            });
        }
        //bind labels with selected language
        function bindLabels(data) {
            $scope.livingLables = data.labels;
        }


        function getMessages(cultureName) {
        var alertMessageName = "AlertMessages";

        $http.get("Person/Languages/" + alertMessageName + "." + cultureName + ".json").then(function (response) {
            $scope.alertMessageLabels = response.data.messages;
        });
    }

        //For Getting livingPlaceTypes--drop down//

        function getLivingPlaceTypes() {
            PersonLivingPlaceLogic.getLivingPlaceTypes().then(function (response) {
                $scope.livingPlaceTypeList = response;
            }, function (err) {
                appLogger.log(err);
                appLogger.error('ERR', err);

            });

        };
        getLivingPlaceTypes();

        //get all Living Places by personReferenceKey method
        function getAllLivingPlaces(personReferenceKey) {

            PersonLivingPlaceLogic.getAllLivingPlaces(personReferenceKey).then(function (response) {
                $scope.livingPlaceList = response;
                generateUUID();

            }, function (err) {
                appLogger.log(err);
                appLogger.error('ERR', err);

            });

        }



        // Method to addLocation for Person Living Place
        function addLocation() {

            PersonLivingPlaceLogic.addLocation($scope.livingLocation, personReferenceKey).then(function (response) {

                var locationId = null;
                if (appConfig.APP_MODE == 'offline') {
                    locationId = response.insertId;
                } else {
                    locationId = response.data.InsertId;
                }

                addLivingPlaces(locationId);

            }, function (err) {
                appLogger.error('ERR' + err);
            });
        }

        //calling add Living Place BL  method
        function addLivingPlaces(locationId) {

            if (appConfig.APP_MODE == 'offline') {

                $scope.living.referenceKey = referenceKey;
            }

            $scope.living.locationId = locationId;
            // $scope.living.personId = $stateParams.personId;
            $scope.living.personReferenceKey = $stateParams.personReferenceKey;
            $scope.living.IsDeleted = 0;

            PersonLivingPlaceLogic.addLivingPlaces($scope.living, personReferenceKey).then(function (response) {
           appLogger.alert($scope.alertMessageLabels.livingSaved);
                getAllLivingPlaces(personReferenceKey);
                $scope.living = {};
                $scope.livingLocation = {};
                $scope.livingPlaceForm.$setPristine();
                $scope.livingPlaceForm.$setUntouched();

            }, function (err) {
                appLogger.error('ERR', err);
            });

        };

        //calling update Living Place BL method*/
        function updateLivingPlaces(livingReferenceKey) {

            $scope.living.personReferenceKey = personReferenceKey;
            PersonLivingPlaceLogic.updateLivingPlaces($scope.living, personReferenceKey, livingReferenceKey).then(function (response) {
           appLogger.alert($scope.alertMessageLabels.livingUpdated);
                $scope.living = {};
                $scope.livingLocation = {};
                getAllLivingPlaces(personReferenceKey);
                $scope.livingPlaceForm.$setPristine();
                $scope.livingPlaceForm.$setUntouched();

            }, function (err) {
                appLogger.error('ERR', err);
            });
        };


        //calling save and update methods

        $scope.saveLiving = function () {


            if ($scope.living.referenceKey == undefined || $scope.living.referenceKey == null) {
                addLocation()
            } else {
                var LivingReferenceKey = $scope.living.referenceKey;
                var locationId = $scope.livingLocation.locationId;
                updateLocation(locationId);
                updateLivingPlaces(LivingReferenceKey);
            }
        };

        //Method for  updateLocation by  locationId

        function updateLocation(locationId) {

            PersonLivingPlaceLogic.updateLocation($scope.livingLocation, personReferenceKey, locationId).then(function (response) {

            }, function (err) {
                appLogger.error('ERR' + err);
            });
        };

        //Method for retrieving person Living Place  details by  livingplaceId

        $scope.getLivingPlacesById = function (livingReferenceKey) {

            PersonLivingPlaceLogic.getLivingPlacesById(personReferenceKey, livingReferenceKey).then(function (response) {
                $scope.livingLocation = {};
                $scope.livingLocation.locationId = response.locationId;
                $scope.livingLocation.geoLocation = response.geoLocation;

                $scope.living = {};
                //$scope.living.LivingPlaceId = response.LivingPlaceId;
                $scope.living.referenceKey = response.referenceKey;
                $scope.living.LivingPlaceName = response.LivingPlaceName;
                $scope.living.LivingPlaceTypeId = response.LivingPlaceTypeId;
                $scope.living.StartDate = new Date(response.StartDate);
                $scope.living.EndDate = new Date(response.EndDate);
                $scope.living.locationId = response.locationId;
                $scope.living.personReferenceKey = response.personReferenceKey;


            }, function (err) {
                appLogger.log(err);
                appLogger.error('ERR' + err);

            });
        };

        //Method for delete LivingPlacesById by LivingPlaceId
        $scope.deleteLivingPlacesById = function (livingReferenceKey) {

            PersonLivingPlaceLogic.deleteLivingPlaces(personReferenceKey, livingReferenceKey).then(function (response) {
           appLogger.alert($scope.alertMessageLabels.livingDeleted);

                getAllLivingPlaces(personReferenceKey);


            }, function (err) {
                appLogger.log(err);
                appLogger.error('ERR' + err);

            });
        }
    });