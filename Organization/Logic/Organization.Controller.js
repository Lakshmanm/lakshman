/*=======================================================================
 All rights reserved to Thrill Innovative Labs.
 THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
 OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
 LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
 FITNESS FOR A PARTICULAR PURPOSE.
===========================================================================
****************************************************************************
 Name		    	 : Organization.Controller.js
 Type		    	 : Javascript and JQuery 
 Description		 : This file contains controller methods
 References		     :
 Author	    		 : Satya kalyani Lanka
 Created Date        : 11-Apr-2016
****************************************************************************
MODIFICATION LOG
**************************************************************************** 
S.No Ver	Date:	     Modified By:		         Description:
1          12-04-2016     Satya kalyani Lanka        dependency structure changed
2          14-04-2016     Naveena Lingam            currentFileName variable name is removed 

****************************************************************************  
Code Review LOG
**************************************************************************** 
S.No      Ver        Date                Code Review By            Observations
1         1.0       13-April-2016         Sri Venkatesh.T           Remove "var currentFileName = "Organization";" code which is not requried.
2         1.0       13-April-2016         Sri Venkatesh.T           "orgBasicInfo" must be in pascal casing in bindLabels function key.
2         1.0       13-April-2016         Sri Venkatesh.T           ParentOrgList function must bein camel casing 
****************************************************************************
*/
var app = angular.module('ThrillOrganization.organization', ['ThrillOrganization.organizationLogic'
    , 'ngCordova', 'ThrillFrameworkLibrary.geo'
    , 'ThrillFrameworkLibrary.Network'
    , 'ThrillCnnWebClient.appConfig'
    , 'ThrillFrameworkLibrary.appLogger'


]);
/*Setup organization Controller */
app.controller('OrganizationController', function ($scope, $http, organizationLogic, $state, $stateParams, appConfig, appLogger, $localStorage) {
    if (appConfig.APP_MODE == 'offline') {
        var referenceKey = generateUUID();
    }
    var organizationReferencekey = $stateParams.organizationReferencekey;
    $localStorage.userKey = "3il_User_Key";
    $localStorage.appKey = "3il_App_Key";
    $scope.orgBasicInfo = {};
    getLabels(appConfig.CULTURE_NAME);
    getMessages(appConfig.CULTURE_NAME);
    getOrgLevels();
    getOrgTypes();
    getSubOrgTypes();
    ParentOrgList();
    /*get labels with selected language*/
    function getLabels(cultureName) {
        $scope.orgBasicInfo = {};
        var currentFileName = "Organization";
        $http.get("Organization/Languages/" + currentFileName + "." + cultureName + ".json").then(function (response) {
            bindLabels(response.data);
        });
    }

    function getMessages(cultureName) {
        var alertMessageName = "AlertMessages";
        $http.get("Organization/Languages/" + alertMessageName + "." + cultureName + ".json").then(function (response) {
            $scope.alertMessageLabels = response.data.messages;
        });
    }
    /*bind labels with selected language */
    function bindLabels(data) {
        var lables = {
            OrgBasicInfo: data.labels.OrgnizationBasicInfo
            , Title: data.labels.Title
            , OrganizationCode: data.labels.OrganizationCode
            , EstablishedOn: data.labels.EstablishedOn
            , OrganizationType: data.labels.OrganizationType
            , SubOrganizationType: data.labels.SubOrganizationType
            , SubOrganization: data.labels.ParentOrganization
            , OrganizationLevel: data.labels.OrganizationLevel
            , OrgDetails: data.labels.OrganizationDetails
            , Submit: data.labels.Save
        };
        $scope.orgLables = lables;
    }

    function getOrgLevels() {
        organizationLogic.getOrgLevelList().then(function (response) {
            $scope.orgLevelLists = response;
        }, function (err) {
            console.error('ERR', err);
        });
    }

    function getOrgTypes() {
        organizationLogic.getOrganizationTypes().then(function (response) {
            $scope.orgTypes = response;
        }, function (err) {
            console.error('ERR', err);
        });
    }

    function getSubOrgTypes() {
        organizationLogic.getSubOrganizationTypes().then(function (response) {
            $scope.subOrgTypes = response;
        }, function (err) {
            console.error('ERR', err);
        });
    }
    /*Perform the CRUD (Create, Read, Update & Delete) operations of organization*/
    /*Method for calling organization  adding method*/
    $scope.addOrganization = function () {
        if (appConfig.APP_MODE == 'offline') {
            $scope.orgBasicInfo.ReferenceKey = referenceKey;
        }
        // $scope.orgBasicInfo.organizationReferenceKey = organizationReferenceKey;
        $scope.orgBasicInfo.isDeleted = 0;
        $scope.orgBasicInfo.isActive = 1;
        $scope.orgBasicInfo.createdUserKey = $localStorage.userKey;
        $scope.orgBasicInfo.createdAppKey = $localStorage.appKey;
        $scope.orgBasicInfo.createdDateTime = new Date();
        organizationLogic.addOrganization($scope.orgBasicInfo).then(function (response) {
            appLogger.alert($scope.alertMessageLabels.organizationSaved);
            $state.go('orglist');
        }, function (err) {
            console.error('ERR', err);
        });
    };
    /*Method for calling organization updating method*/
    $scope.updateOrganization = function () {
        // $scope.orgBasicInfo.OrganizationId = 2;
        console.log(JSON.stringify($scope.orgBasicInfo));
        $scope.orgBasicInfo.lastUpdatedUserKey = $localStorage.userKey;
        $scope.orgBasicInfo.lastUpdatedAppKey = $localStorage.appKey;
        $scope.orgBasicInfo.lastUpdatedDateTime = new Date();
        organizationLogic.updateOrganization($scope.orgBasicInfo, organizationReferencekey).then(function (response) {
            appLogger.alert($scope.alertMessageLabels.organizationUpdated);
        }, function (err) {
            console.error('ERR', err);
        });
    };
    /*Method for binding parent organization list*/
    function ParentOrgList() {
        organizationLogic.getOrganizations().then(function (response) {
            $scope.orgList = response;
        }, function (err) {
            console.error('ERR', err);
        });
    }
    /*Method for calling Bl retrieving method of organization details*/
    if ($stateParams.organizationReferencekey) {
        organizationLogic.getOrganizationInfoById(organizationReferencekey).then(function (response) {
            $scope.orgBasicInfo = {};
            $scope.orgBasicInfo = response;
            $scope.orgBasicInfo.establishedOn = new Date(response.establishedOn);
            // $scope.orgBasicInfo.organizationName = response.organizationName;
            //$scope.orgBasicInfo.parentOrganizationID = response.parentOrganizationID;
            //$scope.orgBasicInfo.organizationLevelID = response.organizationLevelID;
            //$scope.orgBasicInfo.organizationDetails = response.organizationDetails;
            // $scope.orgBasicInfo.Referencekey = response.Referencekey;
        }, function (err) {
            console.error('ERR', err);
        });
    }
});