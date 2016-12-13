/*=======================================================================
 All rights reserved to Thrill Innovative Labs.
 THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
 OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
 LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
 FITNESS FOR A PARTICULAR PURPOSE.
===========================================================================
****************************************************************************
 Name		    	 : personLanguageProficiency.Controller.js
 Type		    	 : Angular js 
 Description		 : This file contains controller methods
 References		     :
 Author	    		 : Kiranmai L
 Created Date        : 19-Apr-2016
****************************************************************************
MODIFICATION LOG
**************************************************************************** 
S.No  Ver	Date	     Modified By			Description
1     1.0   28-04-2016   Kiranmai L             Define PersonReferenceKey & LanguageProficiencyReferenceKey
****************************************************************************  
Code Review LOG
**************************************************************************** 
S.No    Ver    Date           Code Review By   Observations
****************************************************************************
*/

var app = angular.module('ThrillPerson.personLanguageProficiency', ['ThrillPerson.personLanguageProficiencyLogic'

    
    , 'ngCordova'

    
    , 'ThrillFrameworkLibrary.geo'

    
    , 'ThrillFrameworkLibrary.Network'

    
    , 'ThrillCnnWebClient.appConfig'

    
    , 'ThrillFrameworkLibrary.appLogger'
]);
/*Setup Person Controller */
app.controller('PersonLanguageProficiencyController', function ($scope
    , $http
    , personLanguageProficiencyLogic
    , $state
    , $stateParams
    , appConfig
    , appLogger) {

    //initial load method calling

    var referenceKey = generateUUID();

    var personReferenceKey = $stateParams.personReferenceKey;

    refresh();


    //initial load method
    function refresh() {
        getLabels(appConfig.CULTURE_NAME);
        getMessages(appConfig.CULTURE_NAME);
        $scope.lang = {};
        getLanguageTypes();
        getLangProfList(personReferenceKey);
    };



    /*get labels with selected language*/
    function getLabels(cultureName) {

        //var currentFileName = "PersonLanguageProficiency";
        $http.get('Person/Languages/PersonLanguageProficiency.' + cultureName + '.json').then(function (response) {
            bindLabels(response.data);

        });
    }


    //bind labels with selected language
    function bindLabels(data) {
        $scope.langproLables = data.labels;
    }


function getMessages(cultureName) {
        var alertMessageName = "AlertMessages";

        $http.get("Person/Languages/" + alertMessageName + "." + cultureName + ".json").then(function (response) {
            $scope.alertMessageLabels = response.data.messages;
        });
    }



    //Perform the CRUD (Create, Read, Update & Delete) operations of Person(Language proficinecy)//
    //Method for calling Bl adding method//
    //get all language proficiency list by personReferenceKey method
    function getLangProfList(personReferenceKey) {

        personLanguageProficiencyLogic.getLangProfList(personReferenceKey).then(function (response) {

            $scope.languageProficiencyList = response;
            generateUUID();

        }, function (err) {
            appLogger.log(err);
            appLogger.error('ERR', err);

        });

    }
    getLangProfList(personReferenceKey);


    //For Getting LanguageTypesList--drop down//

    function getLanguageTypes() {
        personLanguageProficiencyLogic.getLanguageTypes().then(function (response) {
            $scope.languageList = response;
        }, function (err) {
            appLogger.log(err);
            appLogger.error('ERR', err);

        });

    };
    getLanguageTypes();


    //add language proficiency method
    function addLanguage() {

        if (appConfig.APP_MODE == 'offline') {

            $scope.lang.referenceKey = referenceKey;
        }


        $scope.lang.personReferenceKey = personReferenceKey;
        $scope.lang.IsDeleted = 0;
        $scope.lang.CanRead = ($scope.lang.CanRead == true ? 1 : 0);
        $scope.lang.CanWrite = ($scope.lang.CanWrite == true ? 1 : 0);
        $scope.lang.CanSpeak = ($scope.lang.CanSpeak == true ? 1 : 0);
        personLanguageProficiencyLogic.addLanguage($scope.lang, personReferenceKey).then(function (response) {

         appLogger.alert($scope.alertMessageLabels.languageSaved);

            getLangProfList(personReferenceKey);
            $scope.lang = {};
            $scope.languageForm.$setPristine();
            $scope.languageForm.$setUntouched();

        }, function (err) {
            appLogger.error('ERR', err);
        });

    };

    //update language proficiency by languageProficiencyReferenceKey method*/
    function updateLanguage(personReferenceKey, languageProficiencyReferenceKey) {
        $scope.lang.CanRead = ($scope.lang.CanRead == true ? 1 : 0);
        $scope.lang.CanWrite = ($scope.lang.CanWrite == true ? 1 : 0);
        $scope.lang.CanSpeak = ($scope.lang.CanSpeak == true ? 1 : 0);
        $scope.lang.personReferenceKey = personReferenceKey;
        personLanguageProficiencyLogic.updateLanguage($scope.lang, personReferenceKey, languageProficiencyReferenceKey).then(function (response) {

         appLogger.alert($scope.alertMessageLabels.languageUpdated);
            getLangProfList(personReferenceKey);
            $scope.lang = {};
            $scope.languageForm.$setPristine();
            $scope.languageForm.$setUntouched();

        }, function (err) {
            appLogger.error('ERR', err);
        });
    }


    //save click firing

    $scope.saveLanguage = function () {

        if ($scope.lang.referenceKey == undefined || $scope.lang.referenceKey == null) {

            addLanguage()
        } else {

            var languageProficiencyReferenceKey = $scope.lang.referenceKey;
            updateLanguage(personReferenceKey, languageProficiencyReferenceKey);
        }
    }

    //get lang prof by Id
    $scope.getLangProf = function (languageProficiencyReferenceKey) {

        personLanguageProficiencyLogic.getLangProfById(personReferenceKey, languageProficiencyReferenceKey).then(function (response) {
             console.log(response);
            $scope.lang = {};
           
            $scope.lang.referenceKey = response.referencekey;
            $scope.lang.personReferenceKey = response.personReferenceKey;
            $scope.lang.LanguageId = response.languageId;
            if (response.canRead == 1 || response.canRead == 'true') {

                $scope.lang.CanRead = true;
            } else {
                $scope.lang.CanRead = false;

            }
            if (response.canWrite == 1 || response.canWrite == 'true') {
                $scope.lang.CanWrite = true;
            } else {
                $scope.lang.CanWrite = false;

            }
            if (response.canSpeak == 1 || response.canSpeak == 'true') {
                $scope.lang.CanSpeak = true;
            } else {
                $scope.lang.CanSpeak = false;

            }
            /* $scope.lang.CanWrite = (response[0].CanWrite == 1 ? true : false);
             $scope.lang.CanRead = (response[0].CanRead == 1 ? true : false);*/
        }, function (err) {
            appLogger.log(err);
            appLogger.error('ERR', err);

        });
    }

    //delete language proficiency Id firing
    $scope.deleteLanguage = function (languageProficiencyReferenceKey) {

        personLanguageProficiencyLogic.deleteLangProf(personReferenceKey, languageProficiencyReferenceKey).then(function (response) {
         appLogger.alert($scope.alertMessageLabels.languageDeleted);
            getLangProfList(personReferenceKey);
        }, function (err) {
            appLogger.log(err);
            appLogger.error('ERR', err);

        });
    }




});