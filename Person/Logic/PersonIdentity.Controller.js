/*=======================================================================
 All rights reserved to Thrill Innovative Labs.
 THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
 OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
 LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
 FITNESS FOR A PARTICULAR PURPOSE.
===========================================================================
****************************************************************************
 Name		    	 : PersonIdentity.Controller.js
 Type		    	 : Angular js 
 Description		 : This file contains controller methods
 References		     :
 Author	    		 : Sreelakshmi ch
 Created Date        : 12-Apr-2016
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

var app = angular.module('ThrillPerson.personIdentity', [
   'ThrillPerson.personIdentityLogic'

        
     ,
    'ngCordova'

        
        , 'ThrillFrameworkLibrary.geo'

        
        , 'ThrillFrameworkLibrary.Network'

        
        , 'ThrillCnnWebClient.appConfig'

        
        , 'ThrillFrameworkLibrary.appLogger'
                                                    ])
    //Setup Identity Controller 
app.controller('PersonIdentityController', function ($scope
    , $http
    , $state
    , personIdentityLogic
    , $stateParams
    , appConfig
    , appLogger) {

    var referenceKey = generateUUID();

    getLabels(appConfig.CULTURE_NAME);
    //Method for  to load refresh for personIdentitytypes
    var personReferenceKey = $stateParams.personReferenceKey;
    var refresh = function () {
        $scope.identity = {};
        getIdentityTypes();
        $scope.identity = {};
        getPersonIdentity($stateParams.personReferenceKey);
    };
    refresh();

    //get labels with selected language
    function getLabels(cultureName) {
        $http.get("Person/Languages/PersonIdentity." + cultureName + ".json").then(function (response) {
            bindLabels(response.data);

        });
    }
    //bind labels with selected language 
    function bindLabels(data) {
        $scope.identityLabels = data.labels;
    };
    //Method to get identityTypes
    function getIdentityTypes() {
        personIdentityLogic.getIdentityTypes().then(function (response) {

            $scope.identityTypes = response;
        }, function (err) {});
    }


    function getMessages(cultureName) {
        var alertMessageName = "AlertMessages";

        $http.get("Person/Languages/" + alertMessageName + "." + cultureName + ".json").then(function (response) {
            $scope.alertMessageLabels = response.data.messages;
        });
    }


    

    //Perform the CRUD (Create, Read, Update & Delete) operations of PersonRelative
    //Method  for to  getall personIdentitylist by personId 
    function getPersonIdentity(personReferenceKey) {
        personIdentityLogic.getPersonIdentity(personReferenceKey).then(function (response) {
            $scope.identities = response;
            generateUUID();
            generateUUID();
        }, function (err) {

        });

    }
    // Method to   add PersonIdentity by personId
    function addPersonIdentity() {
        if (appConfig.APP_MODE == 'offline') {

            $scope.identity.referenceKey = referenceKey;
        }


        $scope.identity.personReferenceKey = personReferenceKey;
        console.log($scope.identity);
        personIdentityLogic.addPersonIdentity($scope.identity, personReferenceKey).then(function (response) {
           appLogger.alert($scope.alertMessageLabels.identitySaved);
            getPersonIdentity(personReferenceKey);
            $scope.identity = {};
            $scope.identityForm.$setPristine();
            $scope.identityForm.$setUntouched();

        }, function (err) {

            appLogger.error('ERR' + err);

        });

    };
    //Method to update PersonIdentity by identityId

    function updatePersonidentity(identityReferenceKey) {
        personIdentityLogic.updatePersonidentity($scope.identity, personReferenceKey, identityReferenceKey).then(function (response) {
              appLogger.alert($scope.alertMessageLabels.identityUpdated);
            getPersonIdentity(personReferenceKey);
            $scope.identity = {};
            $scope.identityForm.$setPristine();
            $scope.identityForm.$setUntouched();

        }, function (err) {
            appLogger.error('ERR' + err);
        });
    }
    //Method for save and update for personIdentity

    $scope.savePersonIdentity = function () {

        if ($scope.identity.referenceKey == undefined || $scope.identity.referenceKey == null) {
            addPersonIdentity()
        } else {

            var identityReferenceKey = $scope.identity.referenceKey;
            updatePersonidentity(identityReferenceKey);
        }
    }

    //Method for  retrieving PersonIdentity details by Identity ID
    $scope.getPersonidentityById = function (identityReferenceKey) {

            personIdentityLogic.getPersonidentityById(personReferenceKey, identityReferenceKey).then(function (response) {
                    $scope.identity = {};
                    //$scope.identity.identityId = response.identityId;
                    $scope.identity.referenceKey = response.referenceKey;
                    $scope.identity.identityTypeId = response.identityTypeId;
                    $scope.identity.identityNumber = response.identityNumber;

                    $scope.identity.personReferenceKey = response.personReferenceKey;

                }
                , function (err) {
                    appLogger.log(err);
                    appLogger.error('ERR' + err);

                });
        }
        //Method for delete PersonIdentity  by identityId
    $scope.deletePersonIdentity = function (identityReferenceKey) {
        personIdentityLogic.deletePersonIdentity(personReferenceKey, identityReferenceKey).then(function (response) {
             appLogger.alert($scope.alertMessageLabels.insuranceDeleted);

                getPersonIdentity($stateParams.personId);

            }
            , function (err) {
                appLogger.log(err);
                appLogger.error('ERR' + err);

            });
    }
});