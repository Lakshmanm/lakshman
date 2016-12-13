/*=======================================================================
  All rights reserved to Thrill Innovations Lab.
 THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
 OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
 LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
 FITNESS FOR A PARTICULAR PURPOSE.
===========================================================================
****************************************************************************
 Name                : Admin 
 Type                : Javascript and JQuery 
 Description         : This file contains controller methods
 References          :
 Author              :  Mythreyee
 Created Date        :  12-Apl-2016
****************************************************************************
MODIFICATION LOG
**************************************************************************** 
Ver Date         Modified By            Description

****************************************************************************  
Code Review LOG
**************************************************************************** 
Ver        Date                Code Review By            Observations
****************************************************************************
*/
var currentFileName = "SecurityAdmin";
var app = angular.module('security.adminController', ['ngCordova'
    , 'ThrillFrameworkLibrary.geo'
    , 'ThrillFrameworkLibrary.Network'
    , 'ThrillCnnWebClient.appConfig'
    , 'ThrillFrameworkLibrary.appLogger'])
app.controller('AdminController', function ($scope, $http, $state, $stateParams, appConfig, appLogger, $location) {
    getLabels(appConfig.CULTURE_NAME);

    function getLabels(cultureName) {
        var currentFileName = "SecurityAdmin";
        $http.get("Security/Languages/" + currentFileName + "." + cultureName + ".json").then(function (response) {
            bindLabels(response.data);
        });
    }
    /*bind labels with selected language */
    function bindLabels(data) {
        var labels = {
            admin: data.labels.Admin,
            user: data.labels.User,
            role: data.labels.Role,
            userRole: data.labels.UserRole

        };
        $scope.securityAdmin = labels;
    };
//This routes to the userpage
    $scope.users = function () {
        $location.url('/User');

    }
    //This routes to the rolespage
    $scope.roles = function () {
        $location.url('/Roles');

    }
    //This routes to the userrolesPage
    $scope.userroles = function () {
        $location.url('/UserRole');

    }
})