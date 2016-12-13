/*=======================================================================
 All rights reserved to Thrill Innovative Labs.
 THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
 OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
 LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
 FITNESS FOR A PARTICULAR PURPOSE.
===========================================================================
****************************************************************************
 Name		    	 : Person Martital Status.Controller.js
 Type		    	 : Angular js 
 Description		 : This file contains controller methods
 References		     :
 Author	    		 : Kiranmai L
 Created Date        : 19-Apr-2016
****************************************************************************
MODIFICATION LOG
**************************************************************************** 
S.No.  Ver	  Date	     Modified By   Description
1.     1.0   20-04-2016   Kiranmai    Define get marital status by maritalStatusReferenceKey
2.     1.0   29-04-2019   Kiranmai    Define ReferenceKey         
****************************************************************************  
Code Review LOG
**************************************************************************** 
S.No    Ver    Date           Code Review By   Observations
****************************************************************************
*/

var app = angular.module('ThrillPerson.personMaritalStatus', ['ThrillPerson.personMaritalStatusLogic'

        
        , 'ngCordova'

        
        , 'ThrillFrameworkLibrary.geo'

        
        , 'ThrillFrameworkLibrary.Network'

        
        , 'ThrillCnnWebClient.appConfig'

        
        , 'ThrillFrameworkLibrary.appLogger'
])
    /*Setup Person Controller */
app.controller('PersonMaritalStatusController'
    , function (
        $scope
        , $http
        , PersonMaritalStatusLogic
        , $state
        , $stateParams
        , appConfig
        , appLogger) {

        var referenceKey = generateUUID();
        //initial load method calling
        var personReferenceKey = $stateParams.personReferenceKey;

        refresh();

        //initial load method
        function refresh() {
            getLabels(appConfig.CULTURE_NAME);
            getMessages(appConfig.CULTURE_NAME);
            $scope.marital = {};
            getMaritalStatusList(personReferenceKey);
            getMaritalStatusTypes();


        };

        //getMaritalStatusList($stateParams.personReferenceKey)
        /*get labels with selected language*/
        function getLabels(cultureName) {

            $http.get("Person/Languages/PersonMaritalStatus." + cultureName + ".json").then(function (response) {
                bindLabels(response.data);

            });
        }


        //bind labels with selected language
        function bindLabels(data) {
            $scope.maritalLables = data.labels;
        }
    

    function getMessages(cultureName) {
        var alertMessageName = "AlertMessages";

        $http.get("Person/Languages/" + alertMessageName + "." + cultureName + ".json").then(function (response) {
            $scope.alertMessageLabels = response.data.messages;
        });
    }


        //For Getting Marital Status Type--drop down//

        function getMaritalStatusTypes() {
            PersonMaritalStatusLogic.getMaritalStatusTypes().then(function (response) {

                $scope.maritalStatusTypeList = response;
            }, function (err) {
                appLogger.log(err);
                appLogger.error('ERR', err);

            });

        };
        getMaritalStatusTypes();

        //get all marital status list by personReferenceKey method
        function getMaritalStatusList(personReferenceKey) {

            PersonMaritalStatusLogic.getMaritalStatusList(personReferenceKey).then(function (response) {
                $scope.maritalStatusList = response;
                generateUUID();
            }, function (err) {
                appLogger.log(err);
                appLogger.error('ERR', err);

            });

        };
        getMaritalStatusList(personReferenceKey);

        //calling add Marital status BL method
        function addMaritalStatus() {

            if (appConfig.APP_MODE == 'offline') {

                $scope.marital.referenceKey = referenceKey;
            }


            $scope.marital.personReferenceKey = personReferenceKey;
            $scope.marital.IsDeleted = 0;

            PersonMaritalStatusLogic.addMaritalStatus($scope.marital, personReferenceKey).then(function (response) {


           appLogger.alert($scope.alertMessageLabels.maritialSaved);
                getMaritalStatusList(personReferenceKey);
                $scope.marital = {};
                $scope.maritalStatusForm.$setPristine();
                $scope.maritalStatusForm.$setUntouched();

            }, function (err) {
                appLogger.error('ERR', err);
            });

        };

        //calling update Marital status BL method*/
        function updateMaritalStatus(personReferenceKey, maritalStatusReferenceKey) {
            $scope.marital.personReferenceKey = personReferenceKey;

            PersonMaritalStatusLogic.updateMaritalStatus($scope.marital, personReferenceKey, maritalStatusReferenceKey).then(function (response) {
           appLogger.alert($scope.alertMessageLabels.maritialUpdated);
                getMaritalStatusList(personReferenceKey);
                $scope.marital = {};
                $scope.maritalStatusForm.$setPristine();
                $scope.maritalStatusForm.$setUntouched();
            }, function (err) {
                appLogger.error('ERR', err);
            });
        }


        //calling save and update methods 

        $scope.saveMaritalStatus = function () {



            if ($scope.marital.referenceKey == undefined || $scope.marital.referenceKey == null) {
                addMaritalStatus();
            } else {
                var maritalStatusReferenceKey = $scope.marital.referenceKey;
                updateMaritalStatus(personReferenceKey, maritalStatusReferenceKey);
            }
        }


        //get marital status by maritalStatusReferenceKey
        $scope.getMaritalStatusById = function (maritalStatusReferenceKey) {
            PersonMaritalStatusLogic.getMaritalStatusById(personReferenceKey, maritalStatusReferenceKey).then(function (response) {
                $scope.marital = {};
                $scope.marital.referenceKey = response.referenceKey;
                $scope.marital.maritalStatusName = response.maritalStatusName;
                $scope.marital.startDate = new Date(response.startDate);
                $scope.marital.endDate = new Date(response.endDate);
                $scope.marital.maritalStatusTypeId = response.maritalStatusTypeId;
                $scope.marital.personReferenceKey = response.personReferenceKey;

            }, function (err) {
                appLogger.log(err);
                appLogger.error('ERR', err);

            });
        }

        //delete marital status by maritalStatusReferenceKey
        $scope.deleteMaritalStatusById = function (maritalStatusReferenceKey) {

            PersonMaritalStatusLogic.deleteMaritalStatusById(personReferenceKey, maritalStatusReferenceKey).then(function (response) {
           appLogger.alert($scope.alertMessageLabels.maritialDeleted);
                getMaritalStatusList(personReferenceKey);
            }, function (err) {
                appLogger.log(err);
                appLogger.error('ERR', err);

            });
        }



    });