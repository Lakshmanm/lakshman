/*=======================================================================
 All rights reserved to Thrill Innovative Labs.
 THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
 OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
 LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
 FITNESS FOR A PARTICULAR PURPOSE.
===========================================================================
****************************************************************************
 Name		    	 : DepartmentController.js
 Type		    	 : Javascript and JQuery 
 Description		 : This file contains controller methods
 References		     :
 Author	    		 : Kiranmai L
 Created Date        : 13-April-2016
****************************************************************************
MODIFICATION LOG
**************************************************************************** 
S.No Ver	Date:	     Modified By:		Description:
1          13-04-2016    Kiranmai                dependency structure changed
2          14-04-2016      Kiranmai       currentFileName variable name is removed 

****************************************************************************  
Code Review LOG
**************************************************************************** 
S.No      Ver        Date                Code Review By            Observations
1         1.0       13-April-2016         Sri Venkatesh.T           Remove "var currentFileName = "Department";" code which is not requried.
2         1.0       13-April-2016         Sri Venkatesh.T           function parameters must be in camel casing ex:   $scope.deleteDepartment = function(DepartmentID) in this parameter should be function(departmentID)

****************************************************************************
*/

var app = angular.module('ThrillOrganization.Department', ['ThrillOrganization.departmentLogic'
    , 'ngCordova'
    , 'ThrillFrameworkLibrary.geo'
    , 'ThrillFrameworkLibrary.Network'
    , 'ThrillCnnWebClient.appConfig'
    , 'ThrillFrameworkLibrary.appLogger'
]);
/*Setup Department Controller */
app.controller('DepartmentController'
    , function ($scope
        , $http
        , departmentLogic
        , $state
        , $stateParams
        , appConfig
        , appLogger
        , $localStorage) {

        $localStorage.userKey = "3il_User_Key";
        $localStorage.appKey = "3il_App_Key";

        var organizationReferencekey = $stateParams.organizationReferencekey;
        var referenceKey = generateUUID();
        getLabels(appConfig.CULTURE_NAME);
        getMessages(appConfig.CULTURE_NAME);
        departmentDetails();
        ParentDeptList();
        function getMessages(cultureName) {
            var alertMessageName = "AlertMessages";
            $http.get("Organization/Languages/" + alertMessageName + "." + cultureName + ".json").then(function (response) {
                $scope.alertMessageLabels = response.data.messages;
            });
        }

        /*get labels with selected language*/
        function getLabels(cultureName) {
            $scope.deptInfo = {};
            var currentFileName = "Department";
            $http.get("Organization/Languages/" + currentFileName + "." + cultureName + ".json").then(function (response) {
                bindLabels(response.data);

            });
        }
        /*bind labels with selected language */
        function bindLabels(data) {
            var lables = {
                DepartmentName: data.labels.DepartmentName,
                ParentDepartment: data.labels.ParentDepartment,
                ParentDepartmentName: data.labels.ParentDepartmentName,
                Submit: data.labels.Submit,
                Update: data.labels.Update,
                DepartmentBasicInfo: data.labels.DepartmentBasicInfo1,
                Edit: data.labels.Edit,
                Delete: data.labels.Delete,
                DepartmentList: data.labels.DepartmentList,
            };

            $scope.DepartmentLabels = lables;
        };
        /*Perform the CRUD (Create, Read, Update & Delete) operations of Registration*/
        /*Method for calling Bl get list of Registration types method*/
        /*Method for get all department details*/
        function departmentDetails() {
            departmentLogic.getAllDepartmentDetails(organizationReferencekey).then(function (response) {
                $scope.deptDetails = response;
                generateUUID();
            }, function (err) {
                console.error('ERR', err);
            });
        }

        /*Method for calling Bl adding and update method*/
        $scope.addDepartment = function () {
            if ($scope.deptInfo.ReferenceKey != undefined && $scope.deptInfo.ReferenceKey != null) {
                updateDepartment($scope.deptInfo.ReferenceKey);
            } else {
                addDepartment();
            }
        };
        function addDepartment() {
            if (appConfig.APP_MODE == 'offline') {
                $scope.deptInfo.ReferenceKey = referenceKey;
            }

            $scope.deptInfo.organizationReferenceKey = organizationReferencekey;
            $scope.deptInfo.isDeleted = 0;
            $scope.deptInfo.isActive = 1;
            $scope.deptInfo.createdUserKey = $localStorage.userKey;
            $scope.deptInfo.createdAppKey = $localStorage.appKey;
            $scope.deptInfo.createdDateTime = new Date();

            departmentLogic.addDepartment($scope.deptInfo, organizationReferencekey).then(function (response) {
                appLogger.alert($scope.alertMessageLabels.departmentSaved);
                $scope.deptInfo = "";
                $scope.deptInfo = {};
                $scope.deptform.$setPristine();
                $scope.deptform.$setUntouched();
                departmentDetails();
            }, function (err) {
                console.error('ERR', err);
            });
        }
        function updateDepartment(departmentReferenceKey) {
            $scope.deptInfo.organizationReferenceKey = organizationReferencekey;
            $scope.deptInfo.lastUpdatedUserKey = $localStorage.userKey;
            $scope.deptInfo.lastUpdatedAppKey = $localStorage.appKey;
            $scope.deptInfo.lastUpdatedDateTime = new Date();
            departmentLogic.updateDepartment($scope.deptInfo, organizationReferencekey, departmentReferenceKey).then(function (response) {
                appLogger.alert($scope.alertMessageLabels.departmentUpdated);
                $scope.deptInfo = "";
                $scope.deptInfo = {};
                $scope.deptform.$setPristine();
                $scope.deptform.$setUntouched();
                departmentDetails();
            }, function (err) {
            });

        }
        /*Method for binding parent department list*/
        function ParentDeptList() {
            departmentLogic.getAllDepartmentDetails(organizationReferencekey).then(function (response) {

                $scope.parentDeptList = response;
            }, function (err) {

                console.error('ERR', err);
            });
        }

        /*Method for calling Bl retrieving method of Department details*/
        $scope.editDepartment = function (departmentReferenceKey) {
            departmentLogic.getDepartmentById(organizationReferencekey, departmentReferenceKey).then(function (response) {

                $scope.deptInfo = response;
                $scope.deptInfo.ReferenceKey = response.referenceKey;
                $scope.deptInfo.departmentName = response.departmentName;
                $scope.deptInfo.parentDepartmentID = response.parentDepartmentID;


            }, function (err) {
                console.error('ERR', err);
            });

        };
        /* Delete Department details By DepartmentID*/
        $scope.deleteDepartment = function (departmentReferenceKey) {
            departmentLogic.deleteDepartment(organizationReferencekey, departmentReferenceKey).then(function (response) {
                appLogger.alert($scope.alertMessageLabels.departmentDeleted);
                departmentDetails();
            }, function (err) {
                console.error('ERR', err);

            });
        };

    });