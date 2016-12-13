/*=======================================================================
 All rights reserved to Thrill Innovative Labs.
 THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
 OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
 LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
 FITNESS FOR A PARTICULAR PURPOSE.
===========================================================================
****************************************************************************
 Name		    	 : SubOrganizationTypeController.js
 Type		    	 : Javascript and JQuery 
 Description		 : This file contains controller methods
 References		     :
 Author	    		 : 
 Created Date        : 
****************************************************************************
MODIFICATION LOG
**************************************************************************** 
S.No  Ver	Date	        Modified By		Description
     
****************************************************************************  
Code Review LOG
**************************************************************************** 
S.No      Ver        Date                Code Review By            Observations
 
****************************************************************************
*/

var app = angular.module('ThrillOrganization.SubOrganizationType', ['ThrillOrganization.SubOrganizationTypeLogic', 'ngCordova', 'ThrillFrameworkLibrary.geo', 'ThrillFrameworkLibrary.Network', 'ThrillCnnWebClient.appConfig', 'ThrillFrameworkLibrary.appLogger']);
/*Setup Registration Controller */
app.controller('SubOrganizationTypeController', function($scope, $http, subOrganizationTypeLogic, $state, $stateParams, appConfig, $localStorage, appLogger) {


    $localStorage.userKey = "3il_User_Key";
    $localStorage.appKey = "3il_App_Key";
    var organizationKey = "organizationKey";

    var referenceKey = generateUUID();

    function getMessages(cultureName) {
        var alertMessageName = "AlertMessages";
        $http.get("Organization/Languages/" + alertMessageName + "." + cultureName + ".json").then(function(response) {
            $scope.alertMessageLabels = response.data.messages;
        });
    }
    $scope.subOrganizationType = {};

    $scope.save = true;
    $scope.update = false;




    $scope.addSubOrganization = function() {
        if (appConfig.APP_MODE == 'offline') {
            $scope.subOrganizationType.ReferenceKey = referenceKey;
        }
        $scope.subOrganizationType.organizationKey = organizationKey;
        $scope.subOrganizationType.organizationReferenceKey = organizationReferenceKey
        $scope.subOrganizationType.isDeleted = 0;
        $scope.subOrganizationType.isActive = 1;
        $scope.subOrganizationType.createdUserKey = $localStorage.userKey;
        $scope.subOrganizationType.createdAppKey = $localStorage.appKey;
        $scope.subOrganizationType.createdDateTime = new Date();


        subOrganizationTypeLogic.addtype(organizationKey, $scope.subOrganizationType).then(function(response) {
            alert("Saved Successfully");
            $state.go('subOrganizationTypeList');
        }, function(err) {
            console.error('ERR', err);
        });
    };


    if ($stateParams.subOrganizationTypeKey) {
        subOrganizationTypeLogic.getSubOrganizationType(organizationKey, $stateParams.subOrganizationTypeKey).then(function(response) {
            $scope.save = false;
            $scope.update = true;

            $scope.subOrganizationType = {};
            $scope.subOrganizationType.subOrganizationTypeTitle = response.subOrganizationTypeTitle;
            $scope.subOrganizationType.organizationKey = response.organizationKey;

        }, function(err) {
            console.error('ERR', err);

        });
    }

    $scope.UpdateBranch = function() {
        $scope.subOrganizationType.lastUpdatedUserKey = $localStorage.userKey;
        $scope.subOrganizationType.lastUpdatedAppKey = $localStorage.appKey;
        $scope.subOrganizationType.lastUpdatedDateTime = new Date();
        subOrganizationTypeLogic.updateBranch(organizationKey, $scope.subOrganizationType, $stateParams.subOrganizationTypeKey).then(function(response) {
            alert("Updated Successfully");
            $state.go('subOrganizationTypeList');
        }, function(err) {
            console.error('ERR', err);
        });

    };


});