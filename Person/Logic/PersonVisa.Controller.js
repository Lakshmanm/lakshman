/*=======================================================================
 All rights reserved to Thrill Innovative Labs.
 THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
 OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
 LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
 FITNESS FOR A PARTICULAR PURPOSE.
===========================================================================
****************************************************************************
 Name		    	 : Person visa controller
 Type		    	 : Angular js 
 Description		 : This file contains controller methods
 References		     :
 Author	    		 : Harika
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

var app = angular.module('ThrillPerson.personVisa', ['ThrillPerson.personVisaLogic'

        
        , 'ngCordova'

        
        , 'ThrillFrameworkLibrary.geo'

        
        , 'ThrillFrameworkLibrary.Network'

        
        , 'ThrillCnnWebClient.appConfig'

        
        , 'ThrillFrameworkLibrary.appLogger'
                                                      ])
    //Setup Person Controller 
app.controller('PersonVisaController', function ($scope
    , $http
    , personVisaLogic
    , $state
    , $stateParams
    , appConfig
    , appLogger) {


    var referenceKey = generateUUID();

    // intial load method calling
    refresh();

    var personReferenceKey = personReferenceKey;

    //initial load method 
    function refresh() {
        getLabels(appConfig.CULTURE_NAME);
        getCountries();
        getVisaTypes();
        $scope.visa = {};

        getVisaList(personReferenceKey);
        $scope.visa = {};


        if (personReferenceKey != undefined || personReferenceKey != null) {
            var personReferenceKey = personReferenceKey;

            // getPerson(personReferenceKey);
        }

    };

    //get labels with selected language method
    function getLabels(cultureName) {
        $http.get("Person/Languages/PersonVisa." + cultureName + ".json").then(function (response) {
            bindLabels(response.data);
        });
    }


    function getMessages(cultureName) {
        var alertMessageName = "AlertMessages";

        $http.get("Person/Languages/" + alertMessageName + "." + cultureName + ".json").then(function (response) {
            $scope.alertMessageLabels = response.data.messages;
        });
    }

    //bind labels with selected language
    function bindLabels(data) {
        var lables = {
            Person: data.labels.Person
            , Country: data.labels.Country
            , VisaType: data.labels.VisaType
            , StartDate: data.labels.StartDate
            , EndDate: data.labels.EndDate
            , Visa: data.labels.Visa
            , Edit: data.labels.Edit
            , Submit: data.labels.Submit
            , Delete: data.labels.Delete

        }
        $scope.visaLabels = data.labels;
    };

    //  get Countries  
    function getCountries() {

        personVisaLogic.getCountries().then(function (response) {

            $scope.countriesList = response;

        }, function (err) {
            appLogger.log(err);
            appLogger.error('ERR' + err);

        });
    }


    // get VisaTypes 
    function getVisaTypes() {
        personVisaLogic.getVisaTypes().then(function (response) {
            $scope.visaTypeList = response;

        }, function (err) {
            appLogger.log(err);
            appLogger.error('ERR' + err);

        });
    }


    //get visa list by personReferenceKey method
    function getVisaList(personReferenceKey) {

        personVisaLogic.getVisaList(personReferenceKey).then(function (response) {
            $scope.visaList = response;
            generateUUID();

        }, function (err) {
            appLogger.log(err);
            appLogger.error('ERR' + err);

        });

    }

    //save click firing
    $scope.saveVisa = function () {

        if ($scope.visa.referenceKey == undefined || $scope.visa.referenceKey == null) {
            addVisa()
        } else {
            var visaReferenceKey = $scope.visa.referenceKey;
            updateVisa(personReferenceKey, visaReferenceKey);
        }
    }


    //add visa method
    function addVisa(personReferenceKey) {

        if (appConfig.APP_MODE == 'offline') {

            $scope.visa.referenceKey = referenceKey;
        }


        $scope.visa.personReferenceKey = personReferenceKey;
        personVisaLogic.addVisa($scope.visa, personReferenceKey).then(function (response) {

           appLogger.alert($scope.alertMessageLabels.vissaSaved);
            getVisaList(personReferenceKey);
            $scope.visa = {};
            $scope.visaForm.$setPristine();
            $scope.visaForm.$setUntouched();

        }, function (err) {
            appLogger.error('ERR' + err);
        });

    }

    //update visa by visaReferenceKey method*/
    function updateVisa(personReferenceKey, visaReferenceKey) {

        personVisaLogic.updateVisa($scope.visa, personReferenceKey, visaReferenceKey).then(function (response) {
           appLogger.alert($scope.alertMessageLabels.vissaUpdated);
            getVisaList(personReferenceKey);
            $scope.visa = {};
            $scope.visaForm.$setPristine();
            $scope.visaForm.$setUntouched();

        }, function (err) {
            appLogger.error('ERR' + err);
        });
    }
    var visaReferenceKey = $scope.visa.referenceKey;

    //get visa click firing
    $scope.getVisa = function (visaReferenceKey) {
        //appLogger.log(visaReferenceKey)
        personVisaLogic.getVisaById(personReferenceKey, visaReferenceKey).then(function (response) {
            $scope.visa = {};
            $scope.visa.personReferenceKey = response.personReferenceKey;
            //appLogger.log(JSON.stringify(response));
            $scope.visa.referenceKey = response.referenceKey;
            $scope.visa.personReferenceKey = response.personReferenceKey;
            $scope.visa.countryId = response.countryId;
            $scope.visa.visaTypeId = response.visaTypeId;
            $scope.visa.endDate = new Date(response.endDate);
            $scope.visa.startDate = new Date(response.startDate);
        }, function (err) {
            appLogger.log(err);
            appLogger.error('ERR' + err);

        });
    }

    //delete visa firing
    $scope.deleteVisa = function (visaReferenceKey) {

        personVisaLogic.deleteVisa(personReferenceKey, visaReferenceKey).then(function (response) {
           appLogger.alert($scope.alertMessageLabels.vissaDeleted);
            getVisaList(personReferenceKey);
        }, function (err) {
            appLogger.log(err);
            appLogger.error('ERR' + err);

        });
    }









});