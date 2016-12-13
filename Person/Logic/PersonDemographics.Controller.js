/*=======================================================================
 All rights reserved to Thrill Innovative Labs.
 THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
 OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
 LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
 FITNESS FOR A PARTICULAR PURPOSE.
===========================================================================
****************************************************************************
 Name		    	 : PersonDemographics.Controller.js
 Type		    	 : Angular js 
 Description		 : This file contains controller methods
 References		     :
 Author	    		 : Satyanarayana T
 Created Date        : 12-Apr-2016
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

var app = angular.module('ThrillPerson.personDemographics', ['ThrillPerson.personDemographicsLogic'




        
        , 'ngCordova', 'ThrillFrameworkLibrary.geo', 'ThrillFrameworkLibrary.Network'




        
        , 'ThrillCnnWebClient.appConfig'




        
        , 'ThrillFrameworkLibrary.appLogger'
])
    /*Setup Person Controller */
app.controller('PersonDemographicsController', function (
    $scope, $http, personDemographicsLogic, $state, $stateParams, appConfig, appLogger) {

    var referenceKey = generateUUID();

    var personReferenceKey = $stateParams.personReferenceKey;

    //initial load method calling
    refresh();

    //initial load method
    function refresh() {
        getLabels(appConfig.CULTURE_NAME);
        $scope.demographic = {};

        getDemographicList(personReferenceKey);
    };



    //get labels with selected language method
    function getLabels(cultureName) {
        $http.get('Person/Languages/PersonDemographics.' + cultureName + '.json').then(function (response) {
            bindLabels(response.data);

        });
    }

    //bind labels with selected language
    function bindLabels(data) {
        $scope.demographicLabels = data.labels;
    };

    //get demographic by personReferenceKey method
    function getDemographicList(personReferenceKey) {

        personDemographicsLogic.getDemographics(personReferenceKey).then(function (response) {
            $scope.demographicList = response;
            generateUUID();
        }, function (err) {
            appLogger.log(err);
            appLogger.error('ERR', err);

        });

    }

    //add demographic method
    function addDemographic() {

        if (appConfig.APP_MODE == 'offline') {

            $scope.demographic.referenceKey = referenceKey;
        }


        $scope.demographic.personReferenceKey = personReferenceKey;
        personDemographicsLogic.addDemographic($scope.demographic, personReferenceKey).then(function (response) {

            appLogger.alert($scope.alertMessageLabels.demographicSaved);

            getDemographicList(personReferenceKey);
            $scope.demographic = {};
            $scope.demographicsForm.$setPristine();
            $scope.demographicsForm.$setUntouched();

        }, function (err) {
            appLogger.error('ERR', err);
        });

    };

    //update demographic by referenceKey method*/
    function updateDemographic(demographicReferenceKey) {

        $scope.demographic.PersonReferenceKey = personReferenceKey;
        personDemographicsLogic.updateDemographic($scope.demographic, personReferenceKey, demographicReferenceKey).then(function (response) {
            appLogger.alert($scope.alertMessageLabels.demographicUpdated);
            getDemographicList(personReferenceKey);
            $scope.demographic = {};
            $scope.demographicsForm.$setPristine();
            $scope.demographicsForm.$setUntouched();

        }, function (err) {
            appLogger.error('ERR', err);
        });
    }


    //save click firing
    $scope.saveDemographic = function () {

        if ($scope.demographic.referenceKey == undefined || $scope.demographic.referenceKey == null) {
            addDemographic()
        } else {

            var referenceKey = $scope.demographic.referenceKey;
            updateDemographic(referenceKey);
        }
    }

    //get demographic click firing
    $scope.getDemographic = function (demographicReferenceKey) {

        personDemographicsLogic.getDemographicById(personReferenceKey, demographicReferenceKey).then(function (response) {
            $scope.demographicsFormaphic = {};
            $scope.demographic.referenceKey = response.referenceKey;
            $scope.demographic.height = response.height;
            $scope.demographic.weight = response.weight;
            $scope.demographic.bmi = response.bmi;
            $scope.demographic.hemoglobin = response.hemoglobin;
            $scope.demographic.temperature = response.temperature;
            $scope.demographic.inspectionDate = response.inspectionDate;
            $scope.demographic.PersonReferenceKey = response.personReferenceKey;
        }, function (err) {
            appLogger.log(err);
            appLogger.error('ERR', err);

        });
    }

    //delete demographic firing
    $scope.deleteDemographic = function (demographicReferenceKey) {

        personDemographicsLogic.deleteDemographic(personReferenceKey, demographicReferenceKey).then(function (response) {
            appLogger.alert($scope.alertMessageLabels.demographicDeleted);
            getDemographicList(personReferenceKey);
        }, function (err) {
            appLogger.log(err);
            appLogger.error('ERR', err);

        });
    }



});