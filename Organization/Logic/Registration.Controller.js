/*=======================================================================
 All rights reserved to Thrill Innovative Labs.
 THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
 OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
 LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
 FITNESS FOR A PARTICULAR PURPOSE.
===========================================================================
****************************************************************************
 Name		    	 : RegistrationController.js
 Type		    	 : Javascript and JQuery 
 Description		 : This file contains controller methods
 References		     :
 Author	    		 : Kiranmai Labhala
 Created Date        : 11-April-2016
****************************************************************************
MODIFICATION LOG
**************************************************************************** 
S.No  Ver	Date	        Modified By		Description
1.    1.0   14-April-2016   Kiranmai Labhala    Define datepicker validations     
****************************************************************************  
Code Review LOG
**************************************************************************** 
S.No      Ver        Date                Code Review By            Observations
1         1.0       14-April-2016         Sri Venkatesh.T           Remove "var currentFileName = "Registration";" code which is not requried.
2         1.0       14-April-2016         Sri Venkatesh.T           Rename "editRegistration" function params must be in camel casing 
****************************************************************************
*/

var app = angular.module('ThrillOrganization.Registration', ['ThrillOrganization.registrationLogic'
    , 'ngCordova'
    , 'ThrillFrameworkLibrary.geo'
    , 'ThrillFrameworkLibrary.Network'
    , 'ThrillCnnWebClient.appConfig'
    , 'ThrillFrameworkLibrary.appLogger']);
/*Setup Registration Controller */
app.controller('RegistrationController'
    , function ($scope
        , $http
        , registrationLogic
        , $state
        , $stateParams
        , appConfig
        , appLogger
        , $localStorage) {


        $localStorage.userKey = "3il_User_Key";
        $localStorage.appKey = "3il_App_Key";
        var organizationReferenceKey = $stateParams.organizationReferencekey;
        var referenceKey = generateUUID();
        getLabels(appConfig.CULTURE_NAME);
        getMessages(appConfig.CULTURE_NAME);
        registrationTypes();
        getRegistrationDetails(organizationReferenceKey);
        function getMessages(cultureName) {
            var alertMessageName = "AlertMessages";
            $http.get("Organization/Languages/" + alertMessageName + "." + cultureName + ".json").then(function (response) {
                $scope.alertMessageLabels = response.data.messages;
            });
        }
        /*get labels with selected language*/
        function getLabels(cultureName) {
            $scope.regBasicInfo = {};
            var currentFileName = "Registration";
            $http.get("Organization/Languages/" + currentFileName + "." + cultureName + ".json").then(function (response) {
                bindLabels(response.data);

            });
        }
        /*bind labels with selected language */
        function bindLabels(data) {
            var lables = {
                RegistrationType: data.labels.RegistrationType,
                ValidFrom: data.labels.ValidFrom,
                ValidTo: data.labels.ValidTo,
                EntityId: data.labels.EntityId,
                RegistrationDetails: data.labels.RegistrationDetails,
                Submit: data.labels.Submit,
                Update: data.labels.Update,
                RegistrationBasicInfo: data.labels.RegistrationBasicInfo1,
                Edit: data.labels.Edit,
                Delete: data.labels.Delete,
                RegistrationList: data.labels.RegistrationList,
            };
            $scope.RegistrationInfoLabels = lables;
        }
        /*Perform the CRUD (Create, Read, Update & Delete) operations of Registration*/
        /*Method for calling Bl get list of Registration types method*/
        /*Method to refresh Registration type --Drop Down*/
        function registrationTypes() {
            registrationLogic.getRegistrationTypes().then(function (response) {

                $scope.RegistrationTypeList = response;
            }, function (err) {
                console.error('ERR', err);
            });
        }

        /*Method for calling registration details BL*/
        function getRegistrationDetails(organizationReferenceKey) {
            registrationLogic.getRegistrationBasicInfoDetails(organizationReferenceKey).then(function (response) {
                $scope.regDetails = response;
                generateUUID();
            }, function (err) {
                console.error('ERR', err);
            });
        }

        /*Method for calling Bl adding method*/
        $scope.addRegistration = function () {
            if ($scope.regBasicInfo.ReferenceKey != undefined && $scope.regBasicInfo.ReferenceKey != null) {
                updateRegistration($scope.regBasicInfo.ReferenceKey)

            } else {
                addRegistration();

            }
        };

        function addRegistration() {
            if (appConfig.APP_MODE == 'offline') {
                $scope.regBasicInfo.ReferenceKey = referenceKey;
            }
            $scope.regBasicInfo.organizationReferenceKey = organizationReferenceKey;
            $scope.regBasicInfo.isDeleted = 0;
            $scope.regBasicInfo.isActive = 1;
            $scope.regBasicInfo.createdUserKey = $localStorage.userKey;
            $scope.regBasicInfo.createdAppKey = $localStorage.appKey;
            $scope.regBasicInfo.createdDateTime = new Date();


            registrationLogic.addRegistration($scope.regBasicInfo, organizationReferenceKey).then(function (response) {
                appLogger.alert($scope.alertMessageLabels.registrationSaved);
                $scope.regBasicInfo = "";
                $scope.regBasicInfo = {};
                $scope.regform.$setPristine();
                $scope.regform.$setUntouched();
                getRegistrationDetails(organizationReferenceKey);

            }, function (err) {

                console.error('ERR', err);

            });
        }
        function updateRegistration(registrationReferenceKey) {
            delete $scope.regBasicInfo.RegistrationTypeName;
            delete $scope.regBasicInfo.RegistrationNumber;
            $scope.regBasicInfo.organizationReferenceKey = organizationReferenceKey;
            $scope.regBasicInfo.lastUpdatedUserKey = $localStorage.userKey;
            $scope.regBasicInfo.lastUpdatedAppKey = $localStorage.appKey;
            $scope.regBasicInfo.lastUpdatedDateTime = new Date();
            registrationLogic.updateRegistration($scope.regBasicInfo, organizationReferenceKey, registrationReferenceKey).then(function (response) {
                appLogger.alert($scope.alertMessageLabels.registrationUpdated);
                $scope.regBasicInfo = "";
                $scope.regBasicInfo = {};
                $scope.regform.$setPristine();
                $scope.regform.$setUntouched();
                getRegistrationDetails(organizationReferenceKey);

            }, function (err) {

                console.error('ERR', err);
            });

        }
        /*Method for calling Bl retrieving method of Registration deatails*/
        $scope.editRegistration = function (registrationReferenceKey) {
            registrationLogic.getRegistrationBasicInfoById(organizationReferenceKey, registrationReferenceKey).then(function (response) {
                $scope.regBasicInfo = response;
                $scope.regBasicInfo.ReferenceKey = response.referenceKey;
                $scope.regBasicInfo.OrganizationID = response.OrganizationID;
                $scope.regBasicInfo.registrationTypeID = response.registrationTypeID;
                $scope.regBasicInfo.validFrom = new Date(response.validFrom);
                $scope.regBasicInfo.validTo = new Date(response.validTo);
                $scope.regBasicInfo.registrationDetails = response.registrationDetails;

            }, function (err) {
                console.error('ERR', err);


            });

        };


        /* Delete Registration details By RegistrationID*/
        $scope.deleteRegistration = function (registrationReferenceKey) {
            registrationLogic.deleteRegistration(organizationReferenceKey, registrationReferenceKey).then(function (response) {
                appLogger.alert(JSON.stringify(response));
                getRegistrationDetails(organizationReferenceKey);
            }, function (err) {
                console.error('ERR', err);

            });
        };

    });