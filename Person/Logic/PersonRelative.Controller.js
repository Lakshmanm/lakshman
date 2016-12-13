/*=======================================================================
 All rights reserved to Thrill Innovative Labs.
 THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
 OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
 LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
 FITNESS FOR A PARTICULAR PURPOSE.
===========================================================================
****************************************************************************
 Name		    	 : PersonRelative.Controller.js
 Type		    	 : Angular js 
 Description		 : This file contains controller methods
 References		     :
 Author	    		 : Sreelakshmi ch
 Created Date        : 07-Apr-2016
****************************************************************************
MODIFICATION LOG
**************************************************************************** 
Ver	Date	     Modified By			Description
****************************************************************************  
Code Review LOG
**************************************************************************** 
Ver        Date                Code Review By            Observations
****************************************************************************
*/

var app = angular.module('ThrillPerson.personRelative', ['ThrillPerson.personRelativeLogic'

        , 'ngCordova'

        , 'ThrillFrameworkLibrary.geo'

        , 'ThrillFrameworkLibrary.Network'

        , 'ThrillCnnWebClient.appConfig'

        , 'ThrillFrameworkLibrary.appLogger'
    ])
    //Setup Person Controller 
app.controller('PersonRelativeController', function($scope, $http, personRelativeLogic, $state, $stateParams, appConfig, appLogger) {

    // var referenceKey = generateUUID();

    getLabels(appConfig.CULTURE_NAME);
    getMessages(appConfig.CULTURE_NAME);
    var personReferenceKey;
    if ($stateParams.personReferenceKey != undefined || $stateParams.personReferenceKey != null) {
        personReferenceKey = $stateParams.personReferenceKey;
        getRelativesList(personReferenceKey);
    }

    //get labels with selected language
    function getLabels(cultureName) {

        $http.get("Person/Languages/PersonRelative." + cultureName + ".json").then(function(response) {

            bindLabels(response.data);

        });
    }
    //bind labels with selected language 
    function bindLabels(data) {

        $scope.relativeLabels = data.labels;


    };


    function getMessages(cultureName) {
        var alertMessageName = "AlertMessages";

        $http.get("Person/Languages/" + alertMessageName + "." + cultureName + ".json").then(function(response) {
            $scope.alertMessageLabels = response.data.messages;
        });
    }

    //method to get relationTypes 
    function getRelationTypes() {
        personRelativeLogic.getRelationTypes().then(function(response) {

            $scope.relationTypes = response;


        }, function(err) {
            appLogger.log(err);
            appLogger.error('ERR', err);

        });
    }

    //Perform the CRUD (Create, Read, Update & Delete) operations of PersonRelative

    //load refresh  function for relationtypes
    var refresh = function() {
        $scope.relativePerson = {};
        $scope.relative = {};
        getRelationTypes();
        getRelativesList(personReferenceKey);

    };

    refresh();

    //Method for retrieving relative details by  personReferenceKey
    function getRelativesList(personReferenceKey) {

        personRelativeLogic.getRelatives(personReferenceKey).then(function(response) {
            $scope.relatives = response;
            // generateUUID();


        }, function(err) {
            appLogger.log(err);
            appLogger.error('ERR' + err);

        });
    };
    getRelativesList(personReferenceKey);



    //Method for adding relativePerson  
    function addRelativePerson() {
        $scope.relativePerson.referenceKey = referenceKey;
        if (appConfig.APP_MODE == 'online') {
            $scope.relativePerson.lastName = "-- ";
        }
        if (appConfig.APP_MODE == 'offline') {
            $scope.relativePerson.referenceKey = referenceKey;
        }
        //console.log($scope.relativePerson);
        personRelativeLogic.addRelativePerson($scope.relativePerson).then(function(response) {

            //  console.log(response);

            var relativePersonId = null;

            if (appConfig.APP_MODE == 'offline') {
                relativePersonId = response.insertId;
            } else {
                relativePersonId = response.insertId;
            }
            // generateUUID();
            addRelative(relativePersonId);

        }, function(err) {
            appLogger.error('ERR' + err);
        });
    }

    //Method for add personRelative 
    function addRelative(relativePersonId) {
        if (appConfig.APP_MODE == 'offline') {

            $scope.relative.referenceKey = referenceKey;
        }

        // alert(relativePersonId);
        $scope.relative.relativePersonId = relativePersonId;
        $scope.relative.personReferenceKey = personReferenceKey;

        //appLogger.log(JSON.stringify($scope.relative));

        personRelativeLogic.addRelative($scope.relative, personReferenceKey).then(function(response) {
            //appLogger.alert($scope.alertMessageLabels.relativeSaved);

            getRelativesList(personReferenceKey);

            $scope.relativePerson = {};
            $scope.relative = {};

            $scope.relativeForm.$setPristine();
            $scope.relativeForm.$setUntouched();

        }, function(err) {

            appLogger.error('ERR', err);

        });

    };

    //Method for update personRelative by relativeReferenceKey
    function updateRelative(relativeReferenceKey) {
        delete $scope.relative.relativePersonReferenceKey;

        personRelativeLogic.updateRelative($scope.relative, relativeReferenceKey, personReferenceKey).then(function(response) {

            //appLogger.alert($scope.alertMessageLabels.relativeUpdated);

            getRelativesList(personReferenceKey);

            $scope.relativePerson = {};
            $scope.relative = {};

            $scope.relativeForm.$setPristine();
            $scope.relativeForm.$setUntouched();

        }, function(err) {
            appLogger.error('ERR' + err);
        });
    }

    //Method for update personRelative by relativePersonId
    function updateRelativePerson(relativePersonReferenceKey) {
        // appLogger.log($scope.relativePerson)
        delete $scope.relativePerson.personReferenceKey;
        $scope.relativePerson.lastName = "-- ";
        personRelativeLogic.updateRelativePerson($scope.relativePerson, relativePersonReferenceKey).then(function(response) {
            // appLogger.log(response);
        }, function(err) {
            appLogger.error('ERR' + err);
        });
    }

    //Method for save or Update personRelative click 
    $scope.saveRelative = function() {
        console.log($scope.relative.referenceKey);
        if ($scope.relative.referenceKey == undefined || $scope.relative.referenceKey == null) {
            //first add Person then Relative
            addRelativePerson()
        } else {

            var relativeReferenceKey = $scope.relative.referenceKey;
            var relativePersonReferenceKey = $scope.relative.relativePersonReferenceKey;
            updateRelativePerson(relativePersonReferenceKey);
            updateRelative(relativeReferenceKey);

        }
    }

    //mrthod for delete PersonRelative  
    $scope.deleteRelative = function(relativeReferenceKey, personReferenceKey) {

        personRelativeLogic.deleteRelative(relativeReferenceKey, personReferenceKey).then(function(response) {
            appLogger.alert($scope.alertMessageLabels.relativeDeleted);

            getRelativesList(personReferenceKey);

        }, function(err) {
            appLogger.log(err);
            appLogger.error('ERR' + err);

        });
    }







    //Method for retrieving personRelative details by  relativeReferenceKey
    $scope.getRelative = function(relativeReferenceKey) {

        personRelativeLogic.getRelativeById(relativeReferenceKey, personReferenceKey).then(function(response) {
            console.log(response);
            $scope.relativePerson = {};
            $scope.relativePerson.personReferenceKey = response.relativePersonId;
            $scope.relativePerson.firstName = response.relativeName;

            $scope.relative = {};
            console.log(response.referenceKey);
            $scope.relative.referenceKey = response.referenceKey;
            $scope.relative.relativePersonReferenceKey = response.relativePersonReferenceKey;

            $scope.relative.relationTypeId = response.relationTypeId;
            $scope.relative.relativePersonId = response.relativePersonId;
            $scope.relative.personReferenceKey = response.personReferenceKey;
            if (response.isGaurdian == 1 || response.isGaurdian == 'true') {
                $scope.relative.isGaurdian = true;
            } else {
                $scope.relative.isGaurdian = false;

            }

        }, function(err) {
            appLogger.log(err);
            appLogger.error('ERR' + err);

        });
    }

});