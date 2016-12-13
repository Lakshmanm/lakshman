/*=======================================================================
 All rights reserved to Thrill Innovative Labs.
 THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
 OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
 LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
 FITNESS FOR A PARTICULAR PURPOSE.
===========================================================================
****************************************************************************
 Name		    	 : personWorkExperience.Controller.js
 Type		    	 : Angular js 
 Description		 : This file contains controller methods
 References		     :
 Author	    		 : Sreelakshmi ch
 Created Date        : 13-Apr-2016
****************************************************************************
MODIFICATION LOG
**************************************************************************** 
S.No.   Ver	       Date	         Modified By			Description
1       1.0        29-04-2016    Satya Kalyani Lanka    referenceKey concept implemented
****************************************************************************  
Code Review LOG
**************************************************************************** 
Sno# Ver        Date                Code Review By            Observations
****************************************************************************
*/

var app = angular.module('ThrillPerson.personWorkExperience', ['ThrillPerson.personWorkExperienceLogic'
                                                            
        , 'ngCordova'
                                                            
        , 'ThrillFrameworkLibrary.geo'
                                                            
        , 'ThrillFrameworkLibrary.Network'
                                                            
        , 'ThrillCnnWebClient.appConfig'
                                                            
        , 'ThrillFrameworkLibrary.appLogger'
])
    //Setup personWorkExperience Controller 
app.controller('PersonWorkExperienceController', function ($scope
    , $http
    , personWorkExperienceLogic
    , $state
    , $stateParams
    , appConfig
    , appLogger) {
    var referenceKey = generateUUID();

    getLabels(appConfig.CULTURE_NAME);
    var personReferenceKey = $stateParams.personReferenceKey;

    //get labels with selected language for PersonWorkExperience
    function getLabels(cultureName) {

        $http.get("Person/Languages/PersonWorkExperience." + cultureName + ".json").then(function (response) {
            bindLabels(response.data);

        });
    }
    //bind labels with selected language 
    function bindLabels(data) {
        $scope.workExperience = data.labels;
    };


      function getMessages(cultureName) {
        var alertMessageName = "AlertMessages";

        $http.get("Person/Languages/" + alertMessageName + "." + cultureName + ".json").then(function (response) {
            $scope.alertMessageLabels = response.data.messages;
        });
    }


    // Method to load refresh for PersonWorkExperience
    function refresh() {
        $scope.workexperience = {};
        $scope.workExperienceLocation = {};
        getDesignationTypes();
        getOccupationTypes();
    }


    refresh();
    if ($stateParams.personReferenceKey != undefined || $stateParams.personReferenceKey != null) {
        personReferenceKey = $stateParams.personReferenceKey;
        getExperienceList(personReferenceKey);
    }

    // Method to getDesignationTypes for PersonWorkExperience

    function getDesignationTypes() {
        personWorkExperienceLogic.getDesignationTypes().then(function (response) {
            $scope.designationList = response;
        }, function (err) {
            appLogger.log(err);
            appLogger.error('ERR' + err);

        });
    }


    // Method to getOccupationTypes for PersonWorkExperience

    function getOccupationTypes() {
        personWorkExperienceLogic.getOccupationTypes().then(function (response) {
            $scope.occupationList = response;


        }, function (err) {
            appLogger.log(err);
            appLogger.error('ERR' + err);

        });
    }

    // Method to addLocation for PersonWorkExperience
    function addLocation() {

        personWorkExperienceLogic.addLocation($scope.workExperienceLocation, personReferenceKey).then(function (response) {
            var locationId = null;
            if (appConfig.APP_MODE == 'offline') {
                locationId = response.insertId;
            } else {
                locationId = response.data.InsertId;
            }

            addPersonExperience(locationId);

        }, function (err) {
            appLogger.error('ERR' + err);
        });
    }

    // Method to addPersonExperience using locationId

    function addPersonExperience(locationId) {
        if (appConfig.APP_MODE == 'offline') {

            $scope.workexperience.referenceKey = referenceKey;
        }

        $scope.workexperience.locationId = locationId;
        $scope.workexperience.personReferenceKey = personReferenceKey;
        personWorkExperienceLogic.addPersonExperience($scope.workexperience, personReferenceKey).then(function (response) {
           appLogger.alert($scope.alertMessageLabels.experienceSaved);
            getExperienceList(personReferenceKey);
            $scope.workexperience = {};
            $scope.workExperienceLocation = {};
            $scope.workExperienceForm.$setPristine();
            $scope.workExperienceForm.$setUntouched();

        }, function (err) {

            appLogger.error('ERR' + err);

        });

    };
    //Method for save/Update PersonWorkExperience 
    $scope.saveWorkExperience = function () {

        if ($scope.workexperience.referenceKey == undefined || $scope.workexperience.referenceKey == null) {
            //first add Location then workexperience
            addLocation();
        } else {
            var workExperienceReferenceKey = $scope.workexperience.referenceKey;
            var locationId = $scope.workExperienceLocation.locationId;
            updateLocation(locationId);
            updateWorkExperience(workExperienceReferenceKey);

        }
    }


    //Method for retrieving personWorkExperience details by  personReferenceKey 

    function getExperienceList(personReferenceKey) {
        personWorkExperienceLogic.getWorkExperienceList(personReferenceKey).then(function (response) {
            $scope.workexperienceList = response;
            generateUUID();
        }, function (err) {
            appLogger.log(err);
            appLogger.error('ERR' + err);

        });
    }



    //Method for retrieving personWorkExperience details by  workExperienceId

    $scope.getWorkExperienceById = function (workExperiencereferenceKey) {
        personWorkExperienceLogic.getWorkExperienceById(personReferenceKey, workExperiencereferenceKey).then(function (response) {
            appLogger.log(response);
            $scope.workExperienceLocation = {};
            $scope.workExperienceLocation.locationId = response.locationId;
            $scope.workExperienceLocation.geoLocation = response.geoLocation;

            $scope.workexperience = {};

            //$scope.workexperience.workExperienceId = response.workExperienceId;
            $scope.workexperience.referenceKey = response.referenceKey;
            $scope.workexperience.workExperienceName = response.workExperienceName;
            $scope.workexperience.startDate = new Date(response.startDate);
            $scope.workexperience.endDate = new Date(response.endDate);
            $scope.workexperience.organizationName = response.organizationName;
            $scope.workexperience.occupationId = response.occupationId;
            $scope.workexperience.designationId = response.designationId;
            $scope.workexperience.locationId = response.locationId;
            $scope.workexperience.personReferenceKey = response.personReferenceKey;
            $scope.workexperience.totalYears = response.totalYears;
            $scope.workexperience.teachingExperience = response.teachingExperience;
            $scope.workexperience.otherExperience = response.otherExperience;

        }, function (err) {
            appLogger.log(err);
            appLogger.error('ERR' + err);

        });
    }

    //Method for  updateLocation by  locationId

    function updateLocation(locationId) {

        personWorkExperienceLogic.updateLocation($scope.workExperienceLocation, personReferenceKey, locationId).then(function (response) {

        }, function (err) {
            appLogger.error('ERR' + err);
        });
    }


    //Method for update personWorkExperience by workExperienceId
    function updateWorkExperience(workExperiencereferenceKey) {

        personWorkExperienceLogic.updateWorkExperience($scope.workexperience, personReferenceKey, workExperiencereferenceKey).then(function (response) {
           appLogger.alert($scope.alertMessageLabels.experienceUpdated);
            getExperienceList(personReferenceKey);
            $scope.workexperience = {};
            $scope.workExperienceLocation = {};
            $scope.workExperienceForm.$setPristine();
            $scope.workExperienceForm.$setUntouched();

        }, function (err) {
            appLogger.error('ERR' + err);
        });
    }

    //Method for deleteWorkExperience by workExperienceId
    $scope.deleteWorkExperience = function (workExperiencereferenceKey) {

        personWorkExperienceLogic.deleteWorkExperience(personReferenceKey, workExperiencereferenceKey).then(function (response) {
           appLogger.alert($scope.alertMessageLabels.experienceDeleted);
            getExperienceList(personReferenceKey);
        }, function (err) {
            appLogger.log(err);
            appLogger.error('ERR' + err);

        });
    }
});