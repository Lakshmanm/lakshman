/*//=======================================================================
 All rights reserved to Thrill Innovative Labs.
 THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
 OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
 LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
 FITNESS FOR A PARTICULAR PURPOSE.
===========================================================================
****************************************************************************
 Name		    	 : PersonReligion.Controller.js
 Type		    	 : Angular js 
 Description		 : This file contains controller methods
 References		     :
 Author	    		 : Phaneendra Vaddiparthy
 Created Date        : 13-Apr-2016
****************************************************************************
MODIFICATION LOG
**************************************************************************** 
Ver	Date	     Modified By			Description
****************************************************************************  
Code Review LOG
**************************************************************************** 
Sno# Ver        Date                Code Review By            Observations
*****************************************************************************/


var app = angular.module('ThrillPerson.personReligion', ['ThrillPerson.personReligionLogic'
                                                     
        , 'ngCordova'
                                                     
        , 'ThrillFrameworkLibrary.geo'
                                                     
        , 'ThrillFrameworkLibrary.Network'
                                                     
        , 'ThrillCnnWebClient.appConfig'
                                                     
        , 'ThrillFrameworkLibrary.appLogger'
                                                    ])
    //Setup Person Controller 
app.controller('PersonReligionController', function ($scope
    , $http
    , personReligionLogic
    , $state
    , $stateParams
    , appConfig
    , appLogger) {

    var referenceKey = generateUUID();


    getLabels(appConfig.CULTURE_NAME);
    refresh();

    //initial load method 
    function refresh() {
        getLabels(appConfig.CULTURE_NAME);
        nationalityList();
        socialGroupList();
        religionTypeList();
        religionList($stateParams.personReferenceKey);
        $scope.religion = {};

        if ($stateParams.personReferenceKey != undefined || $stateParams.personReferenceKey != null) {
            var personReferenceKey = $stateParams.personReferenceKey;

            // getPerson(personReferenceKey);
        }

    };

 function getMessages(cultureName) {
        var alertMessageName = "AlertMessages";

        $http.get("Person/Languages/" + alertMessageName + "." + cultureName + ".json").then(function (response) {
            $scope.alertMessageLabels = response.data.messages;
        });
    }

    //get labels with selected language
    function getLabels(cultureName) {
        $http.get('Person/Languages/PersonReligion.' + cultureName + '.json').then(function (response) {
            bindLabels(response.data);

        });
    }
    //bind labels with selected language 
    function bindLabels(data) {
        $scope.religionLabels = data.religionLabels;


    };

    //Perform the CRUD (Create, Read, Update & Delete) operations of Person(Education)
    //Method for calling Bl adding method
    //For Getting ReligionList
    var personReferenceKey = $stateParams.personReferenceKey;


    function religionList() {
        personReligionLogic.getReligionList($stateParams.personReferenceKey).then(function (response) {

            $scope.religionList = response;
            generateUUID();
        }, function (err) {
            appLogger.log(err);
            appLogger.error('ERR', err);

        });

    };
    religionList();

    //for nationality list drop down
    function nationalityList() {
        personReligionLogic.getNationalityList().then(function (response) {
            $scope.nationalityList = response;
        }, function (err) {
            appLogger.log(err);
            appLogger.error('ERR', err);

        });

    };

    nationalityList();

    //For social group Drop Down

    function socialGroupList() {

        personReligionLogic.getSocialGroup().then(function (response) {
            $scope.socialGroupList = response;

        }, function (err) {
            appLogger.log(err);
            appLogger.error('ERR', err);

        });
    }
    socialGroupList();

    //For religion Type list Drop Down

    function religionTypeList() {
        personReligionLogic.getReligionTypes().then(function (response) {
            $scope.religionTypeList = response;

        }, function (err) {
            appLogger.log(err);
            appLogger.error('ERR', err);

        });
    }
    religionTypeList();





    //For Adding Religion

    function addReligion() {

        if (appConfig.APP_MODE == 'offline') {

            $scope.religion.referenceKey = referenceKey;
        }


        $scope.religion.personReferenceKey = $stateParams.personReferenceKey;
        appLogger.log($scope.religion);

        personReligionLogic.addReligion($scope.religion, $stateParams.personReferenceKey).then(function (response) {
           appLogger.alert($scope.alertMessageLabels.religionSaved);
            $scope.religion = {};
            $scope.religionform.$setPristine();
            $scope.religionform.$setUntouched();
            religionList();
        }, function (err) {

            appLogger.error('ERR', err);

        });
    }

    //Appending save function to scope

    $scope.saveReligion = function () {
        if ($scope.religion.referenceKey == undefined || $scope.religion.referenceKey == null) {

            addReligion();

        } else

        {

            var religionReferenceKey = $scope.religion.referenceKey;

            updateReligion(personReferenceKey, religionReferenceKey);

        };
    }

    //Method for calling Bl updating method
    function updateReligion(personReferenceKey, religionReferenceKey) {
        $scope.religion.personReferenceKey = $stateParams.personReferenceKey;
        personReligionLogic.updateReligion($scope.religion, personReferenceKey, religionReferenceKey).then(function (response) {
            // appLogger.log(religionReferenceKey);
            //                     appLogger.log($scope.religion);


           appLogger.alert($scope.alertMessageLabels.religionUpdated);
            $scope.religion = {};
            $scope.religionform.$setPristine();
            $scope.religionform.$setUntouched();
            religionList();

        }, function (err) {
            appLogger.error('ERR', err);
        });
    };

    //Method for calling Bl retrieving method of Religion deatails
    $scope.editReligion = function (religionReferenceKey) {

            personReligionLogic.getReligionById($stateParams.personReferenceKey, religionReferenceKey).then(function (response) {

                $scope.religion = {};
                $scope.religion.personReferenceKey = response[0].personReferenceKey;

                $scope.religion.nationalityId = response[0].nationalityId;
                $scope.religion.socialGroupId = response[0].socialGroupId;

                $scope.religion.religionTypeId = response[0].religionTypeId;
                $scope.religion.referenceKey = response[0].referenceKey;





            }, function (err) {
                appLogger.error('ERR', err);
            });

        }
        //method for deleting religion

    $scope.deleteReligion = function (religionReferenceKey) {

        personReligionLogic.deleteReligion(personReferenceKey, religionReferenceKey).then(function (response) {

           appLogger.alert($scope.alertMessageLabels.religionDeleted);
                religionList($stateParams.personReferenceKey);
            }
            , function (err) {
                appLogger.log(err);
                appLogger.error('ERR', err);

            });
    }

});