/*=======================================================================
 All rights reserved to Thrill Innovative Labs.
 THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
 OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
 LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
 FITNESS FOR A PARTICULAR PURPOSE.
===========================================================================
****************************************************************************
 Name		    	 : personSport.Controller.js
 Type		    	 : Angular js 
 Description		 : This file contains controller methods
 References		     :
 Author	    		 : Sreelakshmi ch
 Created Date        : 21-Apr-2016
****************************************************************************
MODIFICATION LOG
**************************************************************************** 
SNo Ver	Date	     Modified By	Description
1   1.0 29-04-2016   Kiranmai       Define referenceKeys
****************************************************************************  
Code Review LOG
**************************************************************************** 
Sno# Ver        Date                Code Review By            Observations
****************************************************************************
*/

var app = angular.module('ThrillPerson.personSport', ['ThrillPerson.personSportLogic'
                                                            
        , 'ngCordova'
                                                            
        , 'ThrillFrameworkLibrary.geo'
                                                            
        , 'ThrillFrameworkLibrary.Network'
                                                            
        , 'ThrillCnnWebClient.appConfig'
                                                            
        , 'ThrillFrameworkLibrary.appLogger'
])
    //Setup personSport Controller 
app.controller('PersonSportController', function ($scope
    , $http
    , personSportLogic
    , $state
    , $stateParams
    , appConfig
    , appLogger) {

    var referenceKey = generateUUID();

    getLabels(appConfig.CULTURE_NAME);
    getMessages(appConfig.CULTURE_NAME)

    //initial load method
    var personReferenceKey = $stateParams.personReferenceKey;
    refresh();

    function refresh() {
        getLabels(appConfig.CULTURE_NAME);
        getSports(personReferenceKey);
        getCurricularActivityTypes();
        getSportTypes();
        getProficiencyTypes();
        getHighestLevelPlayTypes();
        $scope.sport = {};




    };


     function getMessages(cultureName) {
        var alertMessageName = "AlertMessages";

        $http.get("Person/Languages/" + alertMessageName + "." + cultureName + ".json").then(function (response) {
            $scope.alertMessageLabels = response.data.messages;
        });
    }


    //get labels with selected language for personSport
    function getLabels(cultureName) {

        $http.get("Person/Languages/PersonSport." + cultureName + ".json").then(function (response) {


            bindLabels(response.data);

        });
    }
    //bind labels with selected language 
    function bindLabels(data) {

        $scope.sportLabels = data.labels;


    };

    //method to get CurricularActivityType --drop down
    function getCurricularActivityTypes() {

        personSportLogic.getCurricularActivityTypes().then(function (response) {

            $scope.CurricularActivityTypeList = response;



        }, function (err) {
            appLogger.log(err);
            appLogger.error('ERR', err);

        });
    }

    //method to  getSportTypes --drop down
    function getSportTypes() {

        personSportLogic.getSportTypes().then(function (response) {

            $scope.sportTypeList = response;



        }, function (err) {
            appLogger.log(err);
            appLogger.error('ERR', err);

        });
    }

    //method to get HighestLevelPlay --drop down
    function getHighestLevelPlayTypes() {

        personSportLogic.getHighestLevelPlayTypes().then(function (response) {

            $scope.highestLevelPlayList = response;

        }, function (err) {
            appLogger.log(err);
            appLogger.error('ERR', err);

        });
    }
    //method to get ProficiencyTypes --drop down
    function getProficiencyTypes() {

        personSportLogic.getProficiencyTypes().then(function (response) {

            $scope.proficiencyList = response;

        }, function (err) {
            appLogger.log(err);
            appLogger.error('ERR', err);

        });
    }




    //Perform the CRUD (Create, Read, Update & Delete) operations of personSport

    //Method  for to  getall personSport by personReferenceKey 

    function getSports(personReferenceKey) {

        personSportLogic.getSports(personReferenceKey).then(function (response) {

            $scope.sportsList = response;
            generateUUID();

        }, function (err) {
            appLogger.log(err);
            appLogger.error('ERR', err);

        });

    };
    getSports(personReferenceKey);


    // Method to   add personSport by personReferenceKey
    function addSports() {


        if (appConfig.APP_MODE == 'offline') {

            $scope.sport.referenceKey = referenceKey;
        }


        $scope.sport.personReferenceKey = personReferenceKey;

        personSportLogic.addSports($scope.sport, personReferenceKey).then(function (response) {
           appLogger.alert($scope.alertMessageLabels.sportsSaved);

            getSports(personReferenceKey);
            //$scope.sportaward.IsDeleted=0;

            $scope.sport = {};

            $scope.sportsForm.$setPristine();
            $scope.sportsForm.$setUntouched();

        }, function (err) {

            appLogger.error('ERR' + err);

        });

    };

    //Method to update personSport by sportReferenceKey

    function updateSport(sportReferenceKey) {
        personSportLogic.updateSport($scope.sport, personReferenceKey, sportReferenceKey).then(function (response) {

           appLogger.alert($scope.alertMessageLabels.sportsUpdated);

            getSports(personReferenceKey);


            $scope.sport = {};
            $scope.sportsForm.$setPristine();
            $scope.sportsForm.$setUntouched();

        }, function (err) {
            appLogger.error('ERR' + err);
        });
    }
    //Method for save and update for personSport

    $scope.saveSport = function () {
            if ($scope.sport.referenceKey == undefined || $scope.sport.referenceKey == null) {
                addSports()
            } else {

                var sportReferenceKey = $scope.sport.referenceKey;
                updateSport(sportReferenceKey);


            }
        }
        //Method for  retrieving personSportById details by sportReferenceKey
    $scope.getSportById = function (sportReferenceKey) {

        personSportLogic.getSportById(personReferenceKey, sportReferenceKey).then(function (response) {

                $scope.sport = {};
                $scope.sport.referenceKey = response.referenceKey;
                $scope.sport.sportName = response.sportName;
                $scope.sport.sportTypeID = response.sportTypeID;
                $scope.sport.highestLevelPlayId = response.highestLevelPlayId;
                $scope.sport.proficiencyId = response.proficiencyId;
                $scope.sport.cirricularActivityTypeId = response.cirricularActivityTypeId;
                $scope.sport.personReferenceKey = response.personReferenceKey;

            }
            , function (err) {
                appLogger.log(err);
                appLogger.error('ERR' + err);

            });
    }

    //Method for delete personSport  by sportReferenceKey
    $scope.deleteSport = function (sportReferenceKey) {

        personSportLogic.deleteSport(personReferenceKey, sportReferenceKey).then(function (response) {
           appLogger.alert($scope.alertMessageLabels.sportsDeleted);

                getSports(personReferenceKey);

            }
            , function (err) {
                appLogger.log(err);
                appLogger.error('ERR' + err);

            });
    }


});