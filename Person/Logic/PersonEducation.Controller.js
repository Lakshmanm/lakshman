/*=======================================================================
 All rights reserved to Thrill Innovative Labs.
 THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
 OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
 LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
 FITNESS FOR A PARTICULAR PURPOSE.
===========================================================================
****************************************************************************
 Name		    	 : PersonEducation.Controller.js
 Type		    	 : Angular js 
 Description		 : This file contains person education controller methods
 References		     :
 Author	    		 : Phaneendra Vaddiparthy
 Created Date        : 11-Apr-2016
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

var app = angular.module('ThrillPerson.personEducation', [
    'ThrillPerson.personEducationLogic'






    
    , 'ngCordova'





    
    , 'ThrillFrameworkLibrary.geo'





    
    , 'ThrillFrameworkLibrary.Network'





    
    , 'ThrillCnnWebClient.appConfig'





    
    , 'ThrillFrameworkLibrary.appLogger'
])

app.controller('PersonEducationController', function ($scope, $http, personEducationLogic, $state, $stateParams, appConfig, appLogger) {

    var referenceKey = generateUUID();

    getLabels(appConfig.CULTURE_NAME);

    var locationId = null;

    var personReferenceKey = $stateParams.personReferenceKey;
   

    refresh();

    //initial load method 
    function refresh() {
        getLabels(appConfig.CULTURE_NAME);
        languageList();
        qualificationList();
        educationList(personReferenceKey);
        $scope.education = {};
        $scope.educationLocation = {};


    };
    //get labels with selected language
    function getLabels(cultureName) {


        $http.get('Person/Languages/PersonEducation.' + cultureName + '.json').then(function (response) {
            bindLabels(response.data);

        });
    }
    //bind labels with selected language
    function bindLabels(data) {

        $scope.educationLabels = data.labels;


    };

    function getMessages(cultureName) {
        var alertMessageName = "AlertMessages";

        $http.get("Person/Languages/" + alertMessageName + "." + cultureName + ".json").then(function (response) {
            $scope.alertMessageLabels = response.data.messages;
        });
    }




    //Perform the CRUD (Create, Read, Update & Delete) operations of Person(Education)
    //Method for calling Bl adding method


    /*method For Getting EducationList*/
    function educationList(personReferenceKey) {
        personEducationLogic.getEducationList(personReferenceKey).then(function (response) {
            $scope.educationList = response;

            generateUUID();
        }, function (err) {
            appLogger.log(err);
            appLogger.error('ERR', err);

        });

    };

    /*method For Qualification Drop Down*/

    function qualificationList() {

        personEducationLogic.getQualification().then(function (response) {
            $scope.qualificationList = response;

        }, function (err) {
            appLogger.log(err);
            appLogger.error('ERR', err);

        });
    }
    qualificationList();

    /*method For Language list Drop Down*/

    function languageList() {
        personEducationLogic.getLanguage().then(function (response) {
            $scope.languageList = response;

        }, function (err) {
            appLogger.log(err);
            appLogger.error('ERR', err);

        });
    }
    languageList();


    /*method For getting LocationId */
    function addEducationLocation() {
        
        personEducationLogic.addEducationLocation($scope.educationLocation, personReferenceKey).then(function (response) {

            var locationId = null;
            if (appConfig.APP_MODE == 'offline') {
                locationId = response.insertId;
            } else {

                locationId = response.data.InsertId;
                
            }


            addEducation(locationId);


        }, function (err) {
            appLogger.error('ERR', err);
        });
    }

    //method For Adding education

    function addEducation(locationId) {
        if (appConfig.APP_MODE == 'offline') {

            $scope.education.referenceKey = referenceKey;
        }

        $scope.education.personReferenceKey = personReferenceKey;
        $scope.education.locationId = locationId;
       
        personEducationLogic.addEducation($scope.education, personReferenceKey).then(function (response) {

            appLogger.alert($scope.alertMessageLabels.educationSaved);

            $scope.education = {};
            $scope.educationLocation = {};
            $scope.educationForm.$setPristine();
            $scope.educationForm.$setUntouched();
            educationList(personReferenceKey);
        }, function (err) {

            appLogger.error('ERR', err);

        });
    }


    $scope.saveEducation = function () {

        if ($scope.education.referenceKey == undefined || $scope.education.referenceKey == null) {
            //First saves location and then saves education
            addEducationLocation();

        } else

        {
            //appLogger.log("update");
            var locationId = $scope.educationLocation.locationId;
            var educationReferenceKey = $scope.education.referenceKey;
            updateEducationLocation(locationId);
            updateEducation(educationReferenceKey);

        };
    }


    function updateEducationLocation(locationId) {
        //appLogger.log("PRK::"+personReferenceKey);
        personEducationLogic.updateEducationLocation($scope.educationLocation, personReferenceKey, locationId).then(function (response) {

        }, function (err) {
            appLogger.error('ERR', err);
        });
    }
    // Method for calling Bl updating method
    function updateEducation(educationReferenceKey) {
        $scope.education.personReferenceKey = personReferenceKey;
        personEducationLogic.updateEducation($scope.education, personReferenceKey, educationReferenceKey).then(function (response) {
            appLogger.alert($scope.alertMessageLabels.educationUpdated);
            educationList(personReferenceKey);
            $scope.education = {};
            $scope.educationLocation = {};

            $scope.educationForm.$setPristine();
            $scope.educationForm.$setUntouched();
        }, function (err) {

            appLogger.error('ERR', err);
        });
    };

    //Method for calling Bl retrieving method of Education deatails
    $scope.editEducation = function (educationReferenceKey) {
        personEducationLogic.getEducationById(personReferenceKey, educationReferenceKey).then(function (response) {
            // appLogger.log(JSON.stringify(response));
            $scope.education = {};

            $scope.education.educationName = response[0].educationName;
            $scope.education.personReferenceKey = response.personReferenceKey;
            $scope.education.referenceKey = response[0].referenceKey;

            $scope.education.startDate = response[0].startDate;
            $scope.education.endDate = response[0].endDate;

            $scope.education.instituteName = response[0].instituteName;
            $scope.education.instituteCode = response[0].instituteCode;
            $scope.education.instituteMedium = response[0].instituteMedium;

            $scope.education.marksObtained = response[0].marksObtained;
            $scope.education.gradeObtained = response[0].gradeObtained;


            $scope.education.yearOfPassing = response[0].yearOfPassing;
            $scope.education.qualificationId = response[0].qualificationId;

            $scope.educationLocation = {};
            $scope.educationLocation.locationId = response[0].locationId;
            $scope.educationLocation.geoLocation = response[0].geoLocation;

        }, function (err) {

            appLogger.error('ERR', err);
        });

    }

    $scope.deleteEducation = function (educationReferenceKey) {

        personEducationLogic.deleteEducation(personReferenceKey, educationReferenceKey).then(function (response) {
            appLogger.alert($scope.alertMessageLabels.educationDeleted);

            educationList(personReferenceKey);

        }, function (err) {
            appLogger.log(err);
            appLogger.error('ERR', err);

        });
    }

});