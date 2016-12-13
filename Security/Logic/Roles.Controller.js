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
07-Apr-2016      Mythreyee              Added Logic For The CRUD Operations(completeController)
11-Apr-2016      Rahul                  Server to Client calls interaction and communication establishmen
13-Apr-2016      Tulasi Ballada         Added Code Comments
****************************************************************************  
Code Review LOG
**************************************************************************** 
S.No      Ver        Date                Code Review By            Observations
1         1.0       14-April-2016         Sri Venkatesh.T           Remove "var currentFileName = "SecurityRole";" code which is not requried.
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

var app = angular.module('security.rolesController', ['security.roleLogic'
                                                        , 'ngCordova'
                                                        , 'ThrillFrameworkLibrary.geo'
                                                        , 'ThrillFrameworkLibrary.Network'
                                                        , 'ThrillCnnWebClient.appConfig'
                                                        , 'ThrillFrameworkLibrary.appLogger'
]);

/* RolesController Start */
app.controller('RolesController', function ($scope,
    $http,
    $state,
    $stateParams,
    appConfig,
    appLogger,
    roleLogic) {

    getLabels(appConfig.CULTURE_NAME);
     getMessages(appConfig.CULTURE_NAME);
 function getMessages(cultureName) {
        var alertMessageName = "AlertMessages";

        $http.get("Security/Languages/" + alertMessageName + "." + cultureName + ".json").then(function (response) {
            $scope.alertMessageLabels = response.data.messages;
        });
    }




    function getLabels(cultureName) {
        var currentFileName = "SecurityRole";
        $http.get("Security/Languages/" + currentFileName + "." + cultureName + ".json").then(function (response) {
            bindLabels(response.data);

        });
    }
    /*bind labels with selected language */
    function bindLabels(data) {

        var labels = {
            Roles: data.labels.Role,
            RoleName: data.labels.RoleName,
            RoleDescription: data.labels.RoleDescription,
            IsActive: data.labels.IsActive,
            Save: data.labels.Save,
            Update: data.labels.Update,
            Edit: data.labels.Edit
        };
        $scope.securityRolesLables = labels;
    }

    //Save and Update Button default display values
    $scope.save = true;
    $scope.update = false;

    // Save Roles function Start
    $scope.saveRoles = function () {
        roleSave();
        getRoles();

    };

    //posting roles
    var roleSave = function () {
        roleLogic.addRole($scope.Roles).then(function (response) {

            appLogger.alert($scope.alertMessageLabels.Saved);
            //alert("Saved Successfully");
            $scope.Roles = {};
            getRoles();

        });
    };

    //getting all roles
    var getRoles = function () {
        roleLogic.getAllRoles().then(function (response) {
            $scope.roles = response;

        });

    };

    getRoles(); //Intial Call of getRoles

    //putting rolesbyID
    $scope.putRolesByID = function (id) {
        roleLogic.updateRole($scope.Roles, id).then(function (response) {
                //On Success 
                 appLogger.alert($scope.alertMessageLabels.Updated);
                //alert("Updated Successfully");
                $scope.Roles = {};
                getRoles();
            })
            .error(function (response) {
                // error responese

            });
    };

    // Edit Roles function Call
    $scope.editRoles = function (role) {
        var checked;
        $scope.save = false;
        $scope.update = true;
        $scope.Roles = {};
        $scope.Roles.RoleID = role.RoleID;
        $scope.Roles.RoleName = role.RoleName;
        $scope.Roles.Description = role.Description;
        if (role.isActive == 1) {
            checked = true;
        } else {
            checked = false;
        }
        $scope.Roles.isActive = checked;
    };

    //Update Roles Function Call
    $scope.updateRoles = function () {

        $scope.putRolesByID($scope.Roles.RoleID);
        getRoles();

    };

});
/*RolesController End */