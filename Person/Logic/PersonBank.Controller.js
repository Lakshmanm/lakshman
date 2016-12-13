/*=======================================================================
 All rights reserved to Thrill Innovative Labs.
 THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
 OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
 LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
 FITNESS FOR A PARTICULAR PURPOSE.
===========================================================================
****************************************************************************
 Name		    	 : PersonBank.Controller.js
 Type		    	 : Angular js 
 Description		 : This file contains controller methods
 References		     :
 Author	    		 : Satyanarayana Tippani
 Created Date        : 07-Apr-2016
****************************************************************************
MODIFICATION LOG
**************************************************************************** 
S.No.   Ver	       Date	         Modified By			Description
1       1.0        29-04-2016    Satya Kalyani Lanka    referenceKey concept implemented
****************************************************************************  
Code Review LOG
**************************************************************************** 
S.No    Ver    Date           Code Review By   Observations
1.      1.0    14-Apr-2016    Ch.Rajaji        Remove "currentFileName" variable and use its value directly in the "getLabels" method.
2.      1.0    14-Apr-2016    Ch.Rajaji        Use appLogger inplace of console
3.      1.0    14-Apr-2016    Ch.Rajaji        Arrange dependency modules line by line in the module  and factory declaration.
****************************************************************************
*/

var app = angular.module('ThrillPerson.personBank', ['ThrillPerson.personBankLogic'
                , 'ngCordova'
               , 'ThrillFrameworkLibrary.geo',
                'ThrillFrameworkLibrary.Network',
                 'ThrillCnnWebClient.appConfig',
                  'ThrillFrameworkLibrary.appLogger'
])
    /*Setup Person Controller */
app.controller('PersonBankController', function ($scope
    , $http
    , personBankLogic
    , $state
    , $stateParams
    , appConfig
    , appLogger) {

    var referenceKey = generateUUID();

    // intial load method calling
    refresh();
    var personReferenceKey;
    //initial load method 
    function refresh() {
        getLabels(appConfig.CULTURE_NAME);
        getBankNames();
        $scope.bank = {};
        getBankList($stateParams.personReferenceKey);
        if ($stateParams.personReferenceKey != undefined || $stateParams.personReferenceKey != null) {
            personReferenceKey = $stateParams.personReferenceKey;
            getBankList(personReferenceKey);
        }

    }

    //get labels with selected language method
    function getLabels(cultureName) {
        $http.get('Person/Languages/PersonBank.' + cultureName + '.json').then(function (response) {
            bindLabels(response.data);

        });
    }

    //bind labels with selected language
    function bindLabels(data) {
        $scope.bankLabels = data.labels;
    }

    function getMessages(cultureName) {
        var alertMessageName = "AlertMessages";

        $http.get("Person/Languages/" + alertMessageName + "." + cultureName + ".json").then(function (response) {
            $scope.alertMessageLabels = response.data.messages;
        });
    }





    function getBankNames() {
        personBankLogic.getBankNames().then(function (response) {
            $scope.bankNames = response;
        }, function (err) {
            appLogger.log(err);
            appLogger.error('ERR' + err);

        });
    }


    //Method for retrieving person details by  personReferenceKey
    function getBankList(personReferenceKey) {
        personBankLogic.getPersonBanks(personReferenceKey).then(function (response) {
            $scope.bankList = response;
            generateUUID();
        }, function (err) {
            appLogger.log(err);
            appLogger.error('ERR' + err);

        });
    }

    //saving location
    function addLocation() {
        appLogger.log($scope.bankLocation);
        appLogger.log(personReferenceKey);
        personBankLogic.addLocation($scope.bankLocation, personReferenceKey).then(function (response) {

            var locationId = null;
            if (appConfig.APP_MODE == 'offline') {
                locationId = response.insertId;
            } else {

                locationId = response.data.InsertId;
            }

            addBank(locationId);
        }, function (err) {
            appLogger.error('ERR' + err);
        });
    }

    //save Relative info after saving of addRelativeperson
    function addBank(locationId) {

        if (appConfig.APP_MODE == 'offline') {

            $scope.bank.referenceKey = referenceKey;
        }


        $scope.bank.locationId = locationId;
        $scope.bank.personReferenceKey = personReferenceKey;
        personBankLogic.addPersonBank($scope.bank, personReferenceKey).then(function (response) {
            appLogger.alert($scope.alertMessageLabels.bankSaved);
            getBankList(personReferenceKey);
            $scope.bank = {};
            $scope.bankLocation = {};
            $scope.bankForm.$setPristine();
            $scope.bankForm.$setUntouched();

        }, function (err) {

            appLogger.error('ERR' + err);

        });

    };

    //update location by locationId
    function updateLocation(locationId) {

        personBankLogic.updateLocation($scope.bankLocation, personReferenceKey, locationId).then(function (response) {

        }, function (err) {
            appLogger.error('ERR' + err);
        });
    }

    //Method for update personBank by bankId
    function updateBank(bankReferenceKey) {

        personBankLogic.updatePersonBank($scope.bank, personReferenceKey, bankReferenceKey).then(function (response) {
            appLogger.alert($scope.alertMessageLabels.bankUpdated);
            getBankList(personReferenceKey);
            $scope.bank = {};
            $scope.bankLocation = {};
            $scope.bankForm.$setPristine();
            $scope.bankForm.$setUntouched();

        }, function (err) {
            appLogger.error('ERR' + err);
        });
    }

    //save/Update personBank click firing
    $scope.saveBank = function () {
        if ($scope.bank.referenceKey == undefined || $scope.bank.referenceKey == null) {
            //first add Location then Bank
            addLocation();
        } else {

            var bankReferenceKey = $scope.bank.referenceKey;
            var locationId = $scope.bankLocation.locationId;
            updateLocation(locationId);
            updateBank(bankReferenceKey);

        }
    }

    //delete personBank  
    $scope.deleteBank = function (bankReferenceKey) {

        personBankLogic.deletePersonBank(personReferenceKey, bankReferenceKey).then(function (response) {
            appLogger.alert($scope.alertMessageLabels.bankDeleted);

            getBankList(personReferenceKey);

        }, function (err) {
            appLogger.log(err);
            appLogger.error('ERR' + err);

        });
    }


    //retrieving person bank details by bankId when edit event firing
    $scope.getBank = function (bankReferenceKey) {
        appLogger.log("bankReferenceKey:::" + bankReferenceKey);

        personBankLogic.getPersonBankById(personReferenceKey, bankReferenceKey).then(function (response) {

            $scope.bank = {};
            //$scope.bank.bankId = response.bankId;
            $scope.bank.referenceKey = response.referenceKey;
            $scope.bank.personReferenceKey = response.personReferenceKey;
            $scope.bank.bankTitle = response.bankTitle;
            $scope.bank.bankNameId = response.bankNameId;
            $scope.bank.branchName = response.branchName;
            $scope.bank.accountNumber = response.accountNumber;
            $scope.bank.iFSCCode = response.iFSCCode;


            $scope.bankLocation = {};
            $scope.bankLocation.locationId = response.locationId;
            $scope.bankLocation.geoLocation = response.geoLocation;

        }, function (err) {
            appLogger.log(err);
            appLogger.error('ERR' + err);

        });
    }

});