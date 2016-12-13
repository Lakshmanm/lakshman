/*=======================================================================
 All rights reserved to Thrill Innovations Lab.
 THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
 OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
 LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
 FITNESS FOR A PARTICULAR PURPOSE.
===========================================================================
****************************************************************************
 Name                : Roles
 Type                : Javascript and JQuery 
 Description         : This file contains controller methods
 References          :
 Author              :  Tulasi Ballada
 Created Date        :  07-Apl-2016
****************************************************************************
MODIFICATION LOG
**************************************************************************** 
Ver Date         Modified By            Description
07-Apl-2016      Mythreyee              Added Logic For The CRUD Operations(completeLogic)
13-Apr-2016      Tulasi Ballada         Added Code Comments
****************************************************************************  
Code Review LOG
**************************************************************************** 
S.No      Ver        Date                Code Review By            Observations
1         1.0       14-April-2016         Sri Venkatesh.T           Remove "var currentFileName = "SecurityUserRoles";" code which is not requried.
2         1.0       14-April-2016         Sri Venkatesh.T           Write all function names with camel casing
3         1.0       14-April-2016         Sri Venkatesh.T           function names should be camel casing ,for sendMail function param was argumented as UserID which is Pascal Casing
4         1.0       14-April-2016         Sri Venkatesh.T           None of the error chaning function is having logger for logging the error.
5         1.0       14-April-2016         Sri Venkatesh.T           Check this line of statement is wrong " 
                                                                    if (role.isActive == 1) {var checked = true;} 
                                                                    else {var checked = false;}
                                                                    $scope.Roles.isActive = checked;".
                                                                    Checked value initialization may be out of scope and checked was declared twice in single conditional statement which is wrong.
****************************************************************************
*/

var app = angular.module('security.userRoleController', ['security.userRoleLogic'
                                                            , 'ngCordova'
                                                            , 'ThrillFrameworkLibrary.geo'
                                                            , 'ThrillFrameworkLibrary.Network'
                                                            , 'ThrillSecurityWebClient.appConfig'
                                                            , 'ThrillFrameworkLibrary.appLogger'])
    // UserRoleController Start
app.controller('UserRoleController', function ($scope,
    $http,
    $state,
    $stateParams,
    appConfig,
    userRoleLogic,
    appLogger) {

    getLabels(appConfig.CULTURE_NAME);
     getMessages(appConfig.CULTURE_NAME);


function getMessages(cultureName) {
        var alertMessageName = "AlertMessages";

        $http.get("Security/Languages/" + alertMessageName + "." + cultureName + ".json").then(function (response) {
            $scope.alertMessageLabels = response.data.messages;
        });
    }
    function getLabels(cultureName) {
        var currentFileName = "SecurityUserRoles";
        $http.get("Security/Languages/" + currentFileName + "." + cultureName + ".json").then(function (response) {
            bindLabels(response.data);

        });
    }
    /*bind labels with selected language */
    function bindLabels(data) {
        var labels = {
            UserRole: data.labels.UserRole,
            UserID: data.labels.UserID,
            RoleID: data.labels.RoleID,
            IsActive: data.labels.IsActive,
            Save: data.labels.Save,
            Update: data.labels.Update,
            Edit: data.labels.Edit

        };
        $scope.securityUserRole = labels;
    }

    // Save and Update default values
    $scope.save = true;
    $scope.update = false;

    //This function is to save userrole
    $scope.UsersSave = function () {

        if ($scope.userrole.isActive == true) {
            $scope.userrole.isActive = 1;
        } else {
            $scope.userrole.isActive = 0;

        }

        userRoleLogic.addUserRole($scope.userrole).then(function (response) { // addUserRole service call 
            userdetails();
             appLogger.alert($scope.alertMessageLabels.Saved);
            //alert("Saved Successfully");
        });
    }


    //This function is for getting roles into roles dropdown
    function getRoles(){
        userRoleLogic.getRoles().then(function (response) {
            $scope.Roles = response;
        });
    }

   
    getRoles(); //Initial call of getRoles

    //This function is for getting full name of the user combining firstand lastname
    var getname = function () {
        userRoleLogic.getUserFullName().then(function (response) {
            $scope.Names = response;

        });

    }
    getname(); //Initial Getname function call

    //This is for getting userroles into list
    var userdetails = function () {
        userRoleLogic.getUserRoles().then(function (response) {
            $scope.userroles = response;

        });

    }
    userdetails(); //Initial userdetails function call

    //This is for updating userroles
    var putUsersrolesByID = function (userId) {
        userRoleLogic.updateUserRole($scope.userrole, userId).then(function (response) {
                $scope.userrole = {};
                userdetails();
                 appLogger.alert($scope.alertMessageLabels.Updated);
                //alert("Updated Successfully");


            })
            .error(function (response) {

            });
    };

    // This function is for edititng userrole
    $scope.edituser = function (list) {
        $scope.userrole = {};
        $scope.save = false;
        $scope.update = true;
        $scope.userrole.UserID = list.UserID;
        $scope.userrole.RoleID = list.RoleID;
        $scope.userrole.isActive = (list.isActive == 1 ? true : false);
        $scope.userrole.UserRoleID = list.UserRoleID;

    }

    //Update Userroles Function
    $scope.updateUsers = function () {
        putUsersrolesByID($scope.userrole.UserRoleID);

    };

});
// UserRoleController End