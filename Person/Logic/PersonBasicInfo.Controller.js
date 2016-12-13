/*=======================================================================
 All rights reserved to Thrill Innovative Labs.
 THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
 OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
 LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
 FITNESS FOR A PARTICULAR PURPOSE.
===========================================================================
****************************************************************************
 Name		    	 : PersonBasicInfo.Controller
 Type		    	 : Angular js 
 Description		 : This file contains controller methods
 References		     :
 Author	    		 : Satyanarayana
 Created Date        : 07-Apr-2016
****************************************************************************
MODIFICATION LOG
**************************************************************************** 
Ver	Date	     Modified By			Description
****************************************************************************  
Code Review LOG
**************************************************************************** 
S.No    Ver    Date           Code Review By   Observations
1.      1.0    14-Apr-2016    Ch.Rajaji        Remove "currentFileName" variable and use its value directly in the "getLabels" method.
2.      1.0    14-Apr-2016    Ch.Rajaji        Use appLogger inplace of console
****************************************************************************
*/

var app = angular.module('ThrillPerson.personBasicInfo', 
                        ['ThrillPerson.personBasicInfoLogic'
                        , 'ngCordova'
                        , 'ThrillFrameworkLibrary.geo'
                        , 'ThrillFrameworkLibrary.Network'
                        , 'ThrillCnnWebClient.appConfig'
                        , 'ThrillFrameworkLibrary.appLogger'
                    ])
    //Setup Person Controller 
app.controller('PersonBasicInfoController', function (
    $scope, 
     $http, 
     personBasicInfoLogic, 
     $state, 
     $stateParams, 
     appConfig, 
     appLogger) {
    $scope.profilePic = "Person/Web/assets/images/person-icon.png";

    $scope.fileChange = function () {
        // alert('file change event');
        var tempPath = URL.createObjectURL(event.target.files[0]);
        $scope.profilePic = tempPath;
        $scope.$apply();
    }

    var referenceKey = generateUUID();
    var personReferenceKey = $stateParams.personReferenceKey;

    // intial load method calling
    refresh();

    //initial load method 
    function refresh() {
        $scope.basicInfo = {};
        getLabels(appConfig.CULTURE_NAME);
        getBloodGroups();
        getGenders();
        $scope.person = {};
        $scope.location = {};
        $scope.basicInfo = {};
        $scope.bascicInfoDms = {};

        if (personReferenceKey != undefined || personReferenceKey != null) {
            getPerson(personReferenceKey);
        }

    };



    //get labels with selected language method
    function getLabels(cultureName) {
        currentFileName = 'PersonBasicInfo';
        $http.get('Person/Languages/PersonBasicInfo.' + cultureName + '.json').then(function (response) {
            bindLabels(response.data);
        });
    }



    //bind labels with selected language
    function bindLabels(data) {
        $scope.basicInfoLabels = data.labels;
    };

    function getMessages(cultureName) {
        var alertMessageName = "AlertMessages";

        $http.get("Person/Languages/" + alertMessageName + "." + cultureName + ".json").then(function (response) {
            $scope.alertMessageLabels = response.data.messages;
        });
    }




    //get blood groups 
    function getBloodGroups() {

        personBasicInfoLogic.getBloodGroups().then(function (response) {
            $scope.bloodGroups = response;
        }, function (err) {
            appLogger.log(err);
            appLogger.error('ERR', err);

        });
    }

    //get genders 
    function getGenders() {
        $scope.genders = personBasicInfoLogic.getGenders();
    }

    //get person  details by personReferenceKey
    function getPerson(personReferenceKey) {


        personBasicInfoLogic.getPersonBasicInfoById(personReferenceKey).then(function (response) {


            $scope.person = {};
            $scope.person.referenceKey = response.referenceKey;
            $scope.person.firstName = response.firstName;
            $scope.person.middleName = response.middleName;
            $scope.person.lastName = response.lastName;
            $scope.person.dateOfBirth = response.dateOfBirth;
            $scope.person.placeOfBirth = response.placeOfBirth;
            $scope.person.genderId = response.genderId;
            $scope.person.bloodGroupId = response.bloodGroupId;
            $scope.person.identificationMarks = response.identificationMarks;
            $scope.location = {};
            $scope.location.locationId = response.locationId;
            $scope.location.geoLocation = response.geoLocation;

        }, function (err) {
            appLogger.log(err);
            appLogger.error('ERR', err);

        });
    }



    //saving location
    function addLocation() {
        $scope.basicInfo = {};

        personBasicInfoLogic.addLocation($scope.location, 'empty').then(function (response) {
            var locationId = null;
            if (appConfig.APP_MODE == 'offline') {
                locationId = response.insertId;
            } else {
                appLogger.log(JSON.stringify(response));
                locationId = response.data.insertId;
            }
            addPerson(locationId);
        }, function (err) {
            appLogger.error('ERR', err);
        });

    }

    //saving basic info after saving of location

    function addPerson(locationId) {
        if (appConfig.APP_MODE == 'offline') {

            $scope.person.referenceKey = referenceKey;
        }
        $scope.person.dateOfBirth = new Date($scope.person.dateOfBirth);
        $scope.person.placeOfBirth = locationId;

        appLogger.log(JSON.stringify($scope.person))

        personBasicInfoLogic.addPerson($scope.person).then(function (response) {
            //appLogger.alert('Person details saved successfully');
            $scope.basicInfo = {};
            $scope.basicform.$setPristine();
            $scope.basicform.$setUntouched();
           $state.go('persons');
        }, function (err) {

            appLogger.error('ERR', err);

        });

    };

    function profilePictureSave(personReferenceKey) {
        personBasicInfoLogic.createFolder().then(function (response) {

            var folderKey = res.data[0].folderKey;
            var fileObj = $scope.bascicInfoDms;

            personBasicInfoLogic.uploadFile(fileObj, folderKey).then(function (response) {

            }, function (err) {});

        }, function (err) {

        })
    }

    //update location by locationId
    function updateLocation(locationId) {
        personBasicInfoLogic.updateLocation($scope.location, personReferenceKey, locationId).then(function (response) {}, function (err) {
            appLogger.error('ERR', err);
        });
    }

    //update Person by personReferenceKey
    function updatePerson(personReferenceKey) {
        personBasicInfoLogic.updatePerson($scope.person, personReferenceKey).then(function (response) {
            appLogger.alert($scope.alertMessageLabels.personUpdated);

            getPerson(personReferenceKey);
        }, function (err) {
            appLogger.error('ERR', err);
        });
    }

    //save/Update click firing
    $scope.saveBasicInfo = function () {


        if (personReferenceKey == undefined || personReferenceKey == null) {
            //first add location then person
            addLocation()

        } else {

            var locationId = $scope.location.locationId;

            updateLocation(locationId);
            updatePerson(personReferenceKey);
        }
    }



});