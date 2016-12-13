/*=======================================================================
 All rights reserved to Thrill Innovative Labs.
 THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
 OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
 LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
 FITNESS FOR A PARTICULAR PURPOSE.
===========================================================================
****************************************************************************
 Name		    	 : personAward.Controller.js
 Type		    	 : Angular js 
 Description		 : This file contains controller methods
 References		     :
 Author	    		 : Sreelakshmi ch
 Created Date        : 18-Apr-2016
****************************************************************************
MODIFICATION LOG
**************************************************************************** 
Ver	Date	     Modified By			Description
****************************************************************************  
Code Review LOG
**************************************************************************** 
Sno# Ver        Date                Code Review By            Observations
****************************************************************************
*/

var app = angular.module('ThrillPerson.personAward', ['ThrillPerson.personAwardLogic'




        
        , 'ngCordova'




        
        , 'ThrillFrameworkLibrary.geo'




        
        , 'ThrillFrameworkLibrary.Network'




        
        , 'ThrillCnnWebClient.appConfig'




        
        , 'ThrillFrameworkLibrary.appLogger'
])
    //Setup PersonAwardController Controller 
app.controller('PersonAwardController', function ($rootScope, $scope
    , $http
    , personAwardLogic
    , $state
    , $stateParams
    , appConfig
    , appLogger) {

    var referenceKey = generateUUID();

    getLabels(appConfig.CULTURE_NAME);



    //initial load method

    var personReferenceKey = $stateParams.personReferenceKey
    refresh();

    function refresh() {
        getLabels(appConfig.CULTURE_NAME);
        $scope.award = {};
        $scope.awardLocation = {};


    };


    //get labels with selected language for personAward
    function getLabels(cultureName) {

        $http.get("Person/Languages/PersonAward." + cultureName + ".json").then(function (response) {
            bindLabels(response.data);

        });
    }
    //bind labels with selected language 
    function bindLabels(data) {

        $scope.awardLabels = data.labels;


    };

    function getMessages(cultureName) {
        var alertMessageName = "AlertMessages";

        $http.get("Person/Languages/" + alertMessageName + "." + cultureName + ".json").then(function (response) {
            $scope.alertMessageLabels = response.data.messages;
        });
    }


    // Method to load refresh for personAward
    function refresh() {
        $scope.award = {};
        $scope.awardLocation = {};

        getAwardList(personReferenceKey);




    }


    refresh();




    // Method to addLocation for personAward
    function addLocation() {

        personAwardLogic.addLocation($scope.awardLocation, personReferenceKey).then(function (response) {

            var locationId = null;
            if (appConfig.APP_MODE == 'offline') {
                locationId = response.insertId;
            } else {

                locationId = response.data.InsertId;
            }

            addPersonAward(locationId);

        }, function (err) {
            appLogger.error('ERR' + err);
        });
    }

    // Method to addpersonAward using locationId

    function addPersonAward(locationId) {
        if (appConfig.APP_MODE == 'offline') {

            $scope.award.referenceKey = referenceKey;
        }
        $scope.award.locationId = locationId;
        $scope.award.personReferenceKey = personReferenceKey;


        personAwardLogic.addPersonAward($scope.award, personReferenceKey).then(function (response) {

            appLogger.alert($scope.alertMessageLabels.awardSaved);
            $rootScope.$broadcast('eventNewAward', {
                message: 'newAward'
            });
            $scope.award.IsDeleted = 0;
            getAwardList(personReferenceKey);



            $scope.award = {};
            $scope.awardLocation = {};

            $scope.awardForm.$setPristine();
            $scope.awardForm.$setUntouched();

        }, function (err) {

            appLogger.error('ERR' + err);

        });

    };


    //Method for save/Update Personaward
    $scope.savePersonaward = function () {

            if ($scope.award.referenceKey == undefined || $scope.award.referenceKey == null) {
                //first add Location then workexperience
                addLocation();
            } else {

                var referenceKey = $scope.award.referenceKey;
                var locationId = $scope.awardLocation.locationId;

                updateLocation(locationId);
                updatePersonAward(referenceKey);



            }
        }
        //Method for retrieving Personaward details by  personReferenceKey 

    function getAwardList(personReferenceKey) {

        personAwardLogic.getAwardList(personReferenceKey).then(function (response) {

            $scope.awardList = response;
            generateUUID();

        }, function (err) {
            appLogger.log(err);
            appLogger.error('ERR' + err);

        });
    }

    if (personReferenceKey != undefined || personReferenceKey != null) {
        var personReferenceKey = personReferenceKey;
        getAwardList(personReferenceKey);

    }


    //Method for retrieving personAward details by  awardReferenceKey

    $scope.getAwardListById = function (awardReferenceKey) {

        personAwardLogic.getAwardListById(personReferenceKey, awardReferenceKey).then(function (response) {

            $scope.awardLocation = {};
            $scope.awardLocation.locationId = response.locationId;

            $scope.awardLocation.geoLocation = response.geoLocation;

            $scope.award = {};
            //$scope.award=response[0];
            $scope.award.referenceKey = response.referenceKey;
            $scope.award.awardName = response.awardName;
            $scope.award.awardedDate = new Date(response.awardedDate);
            $scope.award.description = response.description;
            $scope.award.awardedOrganization = response.awardedOrganization;
            $scope.award.locationId = response.locationId;
            $scope.award.personReferenceKey = response.personReferenceKey;

        }, function (err) {
            appLogger.log(err);
            appLogger.error('ERR' + err);

        });
    }

    //Method for  updateLocation by  locationId

    function updateLocation(locationId) {

        personAwardLogic.updateLocation($scope.awardLocation, personReferenceKey, locationId).then(function (response) {

        }, function (err) {
            appLogger.error('ERR' + err);
        });
    }


    //Method for update personAward by awardReferenceKey
    function updatePersonAward(awardReferenceKey) {

        personAwardLogic.updatePersonAward($scope.award, personReferenceKey, awardReferenceKey).then(function (response) {

            appLogger.alert($scope.alertMessageLabels.awardUpdated);
            $rootScope.$broadcast('eventNewAward', {
                message: 'newAward'
            });

            getAwardList(personReferenceKey);



            $scope.award = {};
            $scope.awardLocation = {};

            $scope.awardForm.$setPristine();
            $scope.awardForm.$setUntouched();

        }, function (err) {
            appLogger.error('ERR' + err);
        });
    }

    //Method for delete personAward by awardReferenceKey
    $scope.deletePersonAward = function (awardReferenceKey) {

        personAwardLogic.deletePersonAward(personReferenceKey, awardReferenceKey).then(function (response) {

            appLogger.alert($scope.alertMessageLabels.awardDeleted);


            getAwardList(personReferenceKey);



        }, function (err) {
            appLogger.log(err);
            appLogger.error('ERR' + err);

        });
    }




});