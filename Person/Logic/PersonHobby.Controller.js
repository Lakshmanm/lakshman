/*//=======================================================================
 All rights reserved to Thrill Innovative Labs.
 THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
 OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
 LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
 FITNESS FOR A PARTICULAR PURPOSE.
===========================================================================
****************************************************************************
 Name		    	 : PersonHobby.Controller.js
 Type		    	 : Angular js 
 Description		 : This file contains controller methods
 References		     :
 Author	    		 : Phaneendra Vaddiparthy
 Created Date        : 14-Apr-2016
****************************************************************************
MODIFICATION LOG
**************************************************************************** 
Ver	Date	     Modified By			Description
****************************************************************************  
Code Review LOG
**************************************************************************** 
Sno# Ver        Date                Code Review By            Observations
*****************************************************************************/
//

var app = angular.module('ThrillPerson.personHobby', ['ThrillPerson.personHobbyLogic'




        
        , 'ngCordova'




        
        , 'ThrillFrameworkLibrary.geo'




        
        , 'ThrillFrameworkLibrary.Network'




        
        , 'ThrillCnnWebClient.appConfig'




        
        , 'ThrillFrameworkLibrary.appLogger'
                                                    ])
    //Setup Person Controller //
app.controller('PersonHobbyController', function ($scope
    , $http
    , personHobbyLogic
    , $state
    , $stateParams
    , appConfig
    , appLogger) {

    var referenceKey = generateUUID();

    getLabels(appConfig.CULTURE_NAME);
    getMessages(appConfig.CULTURE_NAME)
    refresh();
    var personReferenceKey = $stateParams.personReferenceKey;
    //initial load method 
    function refresh() {
        getLabels(appConfig.CULTURE_NAME);
        hobbyTypeList();
        getProficiency();
        hobbyList(personReferenceKey);
        $scope.hobby = {};

        if (personReferenceKey != undefined || personReferenceKey != null) {
            var personReferenceKey = $stateParams.personReferenceKey;

            // getPerson(personReferenceKey);
        }

    };


    //get labels with selected language//
    function getLabels(cultureName) {


        $http.get('Person/Languages/PersonHobby.' + cultureName + '.json').then(function (response) {

            bindLabels(response.data);

        });
    }
    //bind labels with selected language //
    function bindLabels(data) {

        $scope.hobbyLabels = data.hobbyLabels;


    };

    function getMessages(cultureName) {
        var alertMessageName = "AlertMessages";

        $http.get("Person/Languages/" + alertMessageName + "." + cultureName + ".json").then(function (response) {
            $scope.alertMessageLabels = response.data.messages;
        });
    }





    //Perform the CRUD (Create, Read, Update & Delete) operations of Person(Hobby)//
    //Method for calling Bl adding method//


    //For Getting HobbyList//

    function hobbyList(personReferenceKey) {
        personHobbyLogic.getHobbyList(personReferenceKey).then(function (response) {
            $scope.hobbyList = response;
            generateUUID();
        }, function (err) {
            appLogger.log(err);
            appLogger.error('ERR', err);

        });

    };
    hobbyList(personReferenceKey);
    //static proficiency dropdown//

    function getProficiency() {
        personHobbyLogic.getProficiencyList().then(function (response) {
            $scope.proficiencyList = response;
        }, function (err) {
            appLogger.log(err);
            appLogger.error('ERR', err);

        });

    };
    getProficiency();

    //for hobby Type List  drop down//
    function hobbyTypeList() {
        personHobbyLogic.getHobbyTypeList().then(function (response) {
            $scope.hobbyTypeList = response;
        }, function (err) {
            appLogger.log(err);
            appLogger.error('ERR', err);

        });

    };

    hobbyTypeList();


    //For Adding Hobby//

    function addHobby() {
        if (appConfig.APP_MODE == 'offline') {

            $scope.hobby.referenceKey = referenceKey;
        }
        $scope.hobby.personReferenceKey = personReferenceKey;

        personHobbyLogic.addHobby($scope.hobby, personReferenceKey).then(function (response) {

            appLogger.alert($scope.alertMessageLabels.hobbySaved);
            getProficiency();
            hobbyList(personReferenceKey);
            $scope.hobby = {};
            $scope.hobbyForm.$setPristine();
            $scope.hobbyForm.$setUntouched();

        }, function (err) {

            appLogger.error('ERR', err);

        });
    }

    //assigning add hobby variable to scope//

    $scope.saveHobby = function () {
        if ($scope.hobby.referenceKey == undefined || $scope.hobby.referenceKey == null) {

            addHobby();

        } else

        {
            var hobbyReferenceKey = $scope.hobby.referenceKey;

            updateHobby(personReferenceKey, hobbyReferenceKey);

        };
    }

    //Method for calling Bl updating method//
    function updateHobby(personReferenceKey, hobbyReferenceKey) {

        personHobbyLogic.updateHobby($scope.hobby, personReferenceKey, hobbyReferenceKey).then(function (response) {
            appLogger.alert($scope.alertMessageLabels.hobbyUpdated);
            hobbyList(personReferenceKey);
            $scope.hobby = {};
            $scope.hobbyForm.$setPristine();
            $scope.hobbyForm.$setUntouched();
        }, function (err) {

            appLogger.error('ERR', err);
        });
    };

    //Method for calling Bl retrieving method of Hobby deatails//
    $scope.editHobby = function (hobbyReferenceKey) {

            personHobbyLogic.getHobbyById(personReferenceKey, hobbyReferenceKey).then(function (response) {
                appLogger.log(response[0]);
                $scope.hobby = {};
                $scope.hobby.personReferenceKey = response[0].personReferenceKey;

                $scope.hobby.hobbyTypeId = response[0].hobbyTypeId;
                $scope.hobby.hobbyName = response[0].hobbyName;
                $scope.hobby.details = response[0].details;

                $scope.hobby.proficiencyId = response[0].proficiencyId;
                $scope.hobby.referenceKey = response[0].referenceKey;

            }, function (err) {

                appLogger.error('ERR', err);
            });

        }
        //method for deleting Hobby//

    $scope.deleteHobby = function (hobbyReferenceKey) {

        personHobbyLogic.deleteHobby(personReferenceKey, hobbyReferenceKey).then(function (response) {
                appLogger.alert($scope.alertMessageLabels.hobbyDeleted);

                hobbyList(personReferenceKey);
                $scope.hobby = {};
                $scope.hobbyform.$setPristine();
                $scope.hobbyform.$setUntouched();

            }
            , function (err) {
                appLogger.log(err);
                appLogger.error('ERR', err);

            });
    }

});