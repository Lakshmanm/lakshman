/*=======================================================================
 All rights reserved to  Thrill Innovative Labs.
 THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
 OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
 LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
 FITNESS FOR A PARTICULAR PURPOSE.
===========================================================================
****************************************************************************
 Name		    	 : Location.Controller.js
 Type		    	 : Javascript and JQuery 
 Description		 : This file contains controller methods
 References		     :
 Author	    		 : Satya Kalyani Lanka
 Created Date        : 07-Apr-2016
****************************************************************************
MODIFICATION LOG
**************************************************************************** 
Ver	Date	     Modified By			Description
1   14-04-2016  Satya Kalyani Lanka                 Extra variable name removed
****************************************************************************  
Code Review LOG
**************************************************************************** 
**************************************************************************** 
S.No      Ver        Date                Code Review By            Observations
1         1.0       13-April-2016         Sri Venkatesh.T           Remove "var currentFileName = "Contact";" code which is not requried.
****************************************************************************
*/

var app = angular.module('ThrillLocation.location', ['ThrillLocation.locationLogic'                                        
        , 'ngCordova'                                       
        , 'ThrillFrameworkLibrary.geo'                                      
        , 'ThrillFrameworkLibrary.Network'                                     
        , 'ThrillCnnWebClient.appConfig'                                       
        , 'ThrillFrameworkLibrary.appLogger'
                                            ])
    /*Setup location Controller */
    .controller('LocationController', function ($scope
        , $http
        , locationLogic
        , $state
        , $stateParams
        , appConfig
        , appLogger) {

        var locationReferenceKey = $stateParams.locationReferenceKey;
        var referenceKey = generateUUID();
        getLabels(appConfig.CULTURE_NAME);
        getMessages(appConfig.CULTURE_NAME);

       $scope.locationInfo={};

        /*get labels with selected language*/
        function getLabels(cultureName) {

            var currentFileName = "Location";
            $http.get("Location/Languages/" + currentFileName + "." + cultureName + ".json").then(function (response) {
                bindLabels(response.data);

            });
        }

        function getMessages(cultureName) {
            var alertMessageName = "AlertMessages";

            $http.get("Location/Languages/" + alertMessageName + "." + cultureName + ".json").then(function (response) {
                $scope.alertMessageLabels = response.data.messages;
            });
        }
        /*bind labels with selected language */
        function bindLabels(data) {
            var lables = {

                Country: data.labels.Country
                , District: data.labels.District
                , State: data.labels.State
                , Mandal: data.labels.Mandal
                , Village: data.labels.Village
                , LocationName: data.labels.Location
                , Submit: data.labels.Submit
                , LocationTitle: data.labels.LocationInfo
            };

            $scope.locationInfoLables = lables;


        }

        /*Perform the CRUD (Create, Read, Update & Delete) operations of location*/
        /*Method for calling location  adding method*/
        $scope.addLocation = function () {
            // $scope.locationInfo.entityReferenceKey="47a58f10-313c-11e6-8b2c-194bbecf75c7";
            if ($scope.locationInfo.locationKey != undefined && $scope.locationInfo.locationKey != null) {
                delete $scope.locationInfo.locationKey;
                locationLogic.updateLocation($scope.locationInfo, locationReferenceKey).then(function (response) {
                    appLogger.alert($scope.alertMessageLabels.locationUpdated);
                    $state.go('locList');
                }, function (err) {

                    console.error('ERR', err);
                });
            } else {
                if (appConfig.APP_MODE == 'offline') {
                    $scope.locationInfo.locationKey = referenceKey;

                }
                locationLogic.addLocation($scope.locationInfo).then(function (response) {
                    appLogger.alert($scope.alertMessageLabels.locationSaved);
                    $state.go('locList');
                    $scope.locationInfo = "";
                }, function (err) {

                    console.error('ERR', err);

                });


            }

        };


        /*Method for calling Countries*/
        var countries = function () {
            locationLogic.getMasterData().then(function (response) {
                $scope.countryList = response;
            }, function (err) {

                console.error('ERR', err);

            });

        };
        /*Method for calling States*/
        var states = function (countryID) {

            locationLogic.getStates(countryID).then(function (response) {

                $scope.stateList = response;
            }, function (err) {

                console.error('ERR', err);

            });

        };
        /*Method for calling Districts*/
        var districts = function (stateID) {
            locationLogic.getDistricts(stateID).then(function (response) {
                $scope.districtList = response;
            }, function (err) {

                console.error('ERR', err);

            });

        };
        /*Method for calling Mandals*/
        var mandals = function (districtID) {
            locationLogic.getMandals(districtID).then(function (response) {
                $scope.mandalList = response;
            }, function (err) {

                console.error('ERR', err);

            });

        };
        /*Method for calling Villages*/
        var villages = function (mandalID) {

            locationLogic.getVillages(mandalID).then(function (response) {

                $scope.villageList = response;
            }, function (err) {

                console.error('ERR', err);

            });
        };
        $scope.getStates = function (countryID) {
            states(countryID);

        };
        $scope.getDistricts = function (stateID) {
            districts(stateID);

        };
        $scope.getMandals = function (districtID) {
            mandals(districtID);

        };
        $scope.getVillages = function (mandalID) {

            villages(mandalID);

        };
        countries();


        /*Method for calling Bl retrieving method of location deatails*/

        if (locationReferenceKey) {

            locationLogic.getLocationInfoById(locationReferenceKey).then(function (response) {

                states(response[0].countryId);
                districts(response[0].stateId);
                mandals(response[0].districtId);
                villages(response[0].mandalId);
                $scope.locationInfo = response[0];
                $scope.locationInfo.locationKey = response[0].locationKey;
                $scope.locationInfo.countryId = response[0].countryId;
                $scope.locationInfo.stateId = response[0].stateId;
                $scope.locationInfo.districtId = response[0].districtId;
                $scope.locationInfo.mandalId = response[0].mandalId;
                $scope.locationInfo.villageId = response[0].villageId;
                $scope.locationInfo.geoLocation = response[0].geoLocation;
                $scope.locationInfo.latitude = response[0].latitude;
                $scope.locationInfo.longitude = response[0].longitude;

            }, function (err) {
                console.error('ERR', err);


            });
        }

        initialize();
        google.maps.event.addDomListener(window, 'load', initialize);

        function initialize() {
            var autocomplete = new google.maps.places.Autocomplete(document.getElementById('txtAutocomplete'));
            google.maps.event.addListener(autocomplete, 'place_changed', function () {
                // Get the place details from the autocomplete object.
                var place = autocomplete.getPlace();
                appLogger.log(place.formatted_address);
                appLogger.log(place.geometry.location.lat());
                appLogger.log(place.geometry.location.lng());
                $scope.locationInfo.geoLocation = place.formatted_address;
                $scope.locationInfo.latitude = place.geometry.location.lat();
                $scope.locationInfo.longitude = place.geometry.location.lng();



            });
        }

    });