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

var app = angular.module('Aarush.StudentEnrollmentPersonRelative', ['ThrillPerson.personRelativeLogic'

        , 'ngCordova'

        , 'ThrillFrameworkLibrary.geo'

        , 'ThrillFrameworkLibrary.Network'

        , 'ThrillCnnWebClient.appConfig'

        , 'ThrillFrameworkLibrary.appLogger'
    ])
    //Setup Person Controller 
app.controller('Aarush.StudentEnrollmentPersonRelative', function($scope, $http, personRelativeLogic, $state, $stateParams, $localStorage, appConfig, appLogger, SweetAlert) {


    getLabels(appConfig.CULTURE_NAME);
    getMessages(appConfig.CULTURE_NAME);
    var personReferenceKey;


    personReferenceKey = $localStorage.EnrpersonKey;


    getRelativesList(personReferenceKey);

    //alert(123)

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

    var relativePersonId = "";
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
        //$scope.relativePerson.referenceKey = referenceKey;
        if (appConfig.APP_MODE == 'online') {
            $scope.relativePerson.lastName = "-- ";
        }
        if (appConfig.APP_MODE == 'offline') {
            $scope.relativePerson.referenceKey = referenceKey;
        }
        //alert($stateParams.PersonKey);

        //$scope.relativePerson.PersonReferenceKey = $stateParams.PersonKey;
        //alert(JSON.stringify($scope.relativePerson));
        personRelativeLogic.addRelativePerson($scope.relativePerson).then(function(response) {

            //console.log(response);
            // alert(JSON.stringify(response));



            if (appConfig.APP_MODE == 'offline') {
                relativePersonId = response.insertId;
            } else {
                console.log(response.data.insertId);
                relativePersonId = response.data.insertId;

            }
            //generateUUID();
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


        $scope.relative.relativePersonId = relativePersonId;
        $scope.relative.personReferenceKey = $localStorage.EnrpersonKey;

        personRelativeLogic.addRelative($scope.relative, $scope.relative.personReferenceKey).then(function(response) {

            SweetAlert.swal({
                title: "Family",
                text: "Saved successfully",
                type: "success",
                confirmButtonColor: "#007AFF"
            });
            //appLogger.alert($scope.alertMessageLabels.relativeSaved);

            getRelativesList($localStorage.EnrpersonKey);

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
            SweetAlert.swal({
                title: "Family",
                text: "Updated successfully",
                type: "success",
                confirmButtonColor: "#007AFF"
            });
            getRelativesList($localStorage.EnrpersonKey);

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
        SweetAlert.swal({
            title: "Are you sure?",
            text: "You want to Delete?",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, cancel!",
            closeOnConfirm: false,
            closeOnCancel: false
        }, function(isConfirm) {
            if (isConfirm) {
                personRelativeLogic.deleteRelative(relativeReferenceKey, personReferenceKey).then(function(response) {
                    getRelativesList(personReferenceKey);
                    SweetAlert.swal({
                        title: "Family",
                        text: "Deleted successfully",
                        type: "success",
                        confirmButtonColor: "#007AFF"
                    });

                });
            } else {
                SweetAlert.swal({
                    title: "Cancelled",
                    text: "Family is safe :)",
                    type: "error",
                    confirmButtonColor: "#007AFF"
                });
            }
        });

    };




    //Method for retrieving personRelative details by  relativeReferenceKey
    $scope.getRelative = function(relativeReferenceKey) {

        personRelativeLogic.getRelativeById(relativeReferenceKey, personReferenceKey).then(function(response) {
            console.log(response);
            $scope.relativePerson = {};
            $scope.relativePerson.personReferenceKey = response.relativePersonId;
            $scope.relativePerson.FirstName = response.relativeName;

            $scope.relative = {};
            console.log(response.referenceKey);
            $scope.relative.referenceKey = response.referenceKey;
            $scope.relative.relativePersonReferenceKey = response.relativePersonReferenceKey;

            $scope.relative.relationTypeId = response.relationTypeId;
            $scope.relative.relativePersonId = response.relativePersonId;
            $scope.relative.personReferenceKey = response.personReferenceKey;
            if (response.isGaurdian.data[0] == 1 || response.isGaurdian.data[0] == 'true') {
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