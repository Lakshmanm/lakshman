/*=======================================================================
 All rights reserved to Thrill Innovative Labs.
 THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
 OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
 LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
 FITNESS FOR A PARTICULAR PURPOSE.
===========================================================================
****************************************************************************
 Name                : personSportAward.Controller.js
 Type                : Angular js 
 Description         : This file contains controller methods
 References          :
 Author              : Sreelakshmi ch
 Created Date        : 20-Apr-2016
****************************************************************************
MODIFICATION LOG
**************************************************************************** 
Ver Date         Modified By            Description
****************************************************************************  
Code Review LOG
**************************************************************************** 
Sno# Ver        Date                Code Review By            Observations
****************************************************************************
*/

var app = angular.module('ThrillPerson.personSportAward', ['ThrillPerson.personSportAwardLogic'
                                                            
        , 'ngCordova'
                                                            
        , 'ThrillFrameworkLibrary.geo'
                                                            
        , 'ThrillFrameworkLibrary.Network'
                                                            
        , 'ThrillCnnWebClient.appConfig'
                                                            
        , 'ThrillFrameworkLibrary.appLogger'
])
    //Setup personSportAward Controller 
app.controller('PersonSportAwardController', function ($rootScope, $scope
    , $http
    , personSportAwardLogic
    , $state
    , $stateParams
    , appConfig
    , appLogger) {

    var referenceKey = generateUUID();

    getLabels(appConfig.CULTURE_NAME);


    //initial load method

    var personReferenceKey = $stateParams.personReferenceKey;
    refresh();

    function refresh() {
        getLabels(appConfig.CULTURE_NAME);
        $scope.sportaward = {};
        getSportAward(personReferenceKey);
        getSportAwardTypes(personReferenceKey);
    };

 function getMessages(cultureName) {
        var alertMessageName = "AlertMessages";

        $http.get("Person/Languages/" + alertMessageName + "." + cultureName + ".json").then(function (response) {
            $scope.alertMessageLabels = response.data.messages;
        });
    }

    //get labels with selected language for personSportAward
    function getLabels(cultureName) {

        $http.get("Person/Languages/PersonSportAward." + cultureName + ".json").then(function (response) {

            bindLabels(response.data);

        });
    }
    //bind labels with selected language 
    function bindLabels(data) {

        $scope.sportawardlabels = data.labels;


    };

    $rootScope.$on('eventNewAward', function (event, args) {

        if (args.message == 'newAward') {
            getSportAwardTypes(personReferenceKey);
            $scope.sportsAwardsForm.$setPristine();
            $scope.sportsAwardsForm.$setUntouched();
        }
    });

    //method to get awardTypes --drop down
    function getSportAwardTypes(personReferenceKey) {

        personSportAwardLogic.getSportAwardTypes(personReferenceKey).then(function (response) {

            $scope.sportawardList = response;


        }, function (err) {
            appLogger.log(err);
            appLogger.error('ERR', err);

        });
    }



    //Perform the CRUD (Create, Read, Update & Delete) operations of personSportAward

    //Method  for to  getall personSportAward by personReferenceKey 

    function getSportAward(personReferenceKey) {

        personSportAwardLogic.getSportAward(personReferenceKey).then(function (response) {
            $scope.sportAwardLists = response;
            generateUUID();

        }, function (err) {
            appLogger.log(err);
            appLogger.error('ERR', err);

        });

    };
    getSportAward(personReferenceKey);
    // Method to   add personSportAward by personReferenceKey
    function addSportAward(personReferenceKey) {

        if (appConfig.APP_MODE == 'offline') {

            $scope.sportaward.referenceKey = referenceKey;
        }

        $scope.sportaward.personReferenceKey = personReferenceKey;

        personSportAwardLogic.addSportAward($scope.sportaward, personReferenceKey).then(function (response) {


           appLogger.alert($scope.alertMessageLabels.sportsAwardSaved);

            getSportAward(personReferenceKey);
            //$scope.sportaward.IsDeleted=0;

            $scope.sportaward = {};

            $scope.sportsAwardsForm.$setPristine();
            $scope.sportsAwardsForm.$setUntouched();

        }, function (err) {

            appLogger.error('ERR' + err);

        });

    };


    //Method to update personSportAward by sportReferenceKey

    function updateSportAward(sportReferenceKey) {
        //$scope.sportaward.personReferenceKey = personReferenceKey;

        personSportAwardLogic.updateSportAward($scope.sportaward, personReferenceKey, sportReferenceKey).then(function (response) {

           appLogger.alert($scope.alertMessageLabels.sportsAwardUpdated);

            getSportAward(personReferenceKey);


            $scope.sportaward = {};
            $scope.sportsAwardsForm.$setPristine();
            $scope.sportsAwardsForm.$setUntouched();

        }, function (err) {
            appLogger.error('ERR' + err);
        });
    }

    //Method for save and update for personSportAward

    $scope.saveSportAward = function () {

            if ($scope.sportaward.referenceKey == undefined || $scope.sportaward.referenceKey == null) {
                addSportAward(personReferenceKey)
            } else {

                var referenceKey = $scope.sportaward.referenceKey;
                updateSportAward(referenceKey);


            }
        }
        //Method for  retrieving sportAwardbyId details by sportReferenceKey
    $scope.getSportAwardById = function (sportReferenceKey) {

            personSportAwardLogic.getSportAwardById(personReferenceKey, sportReferenceKey).then(function (response) {


                    $scope.sportaward = {};
                    $scope.sportaward.referenceKey = response.referenceKey;
                    $scope.sportaward.awardId = response.awardId;
                    $scope.sportaward.cirricularActivityName = response.cirricularActivityName;
                    $scope.sportaward.gameDetails = response.gameDetails;
                    $scope.sportaward.personReferenceKey = response.personReferenceKey;

                }
                , function (err) {
                    appLogger.log(err);
                    appLogger.error('ERR' + err);

                });
        }
        //Method for delete personSportAward  by sportReferenceKey
    $scope.deleteSportAward = function (sportReferenceKey) {

        personSportAwardLogic.deleteSportAward(sportReferenceKey).then(function (response) {
           appLogger.alert($scope.alertMessageLabels.sportsAwardDeleted);

                getSportAward(personReferenceKey);

            }
            , function (err) {
                appLogger.log(err);
                appLogger.error('ERR' + err);

            });
    }


});