/*=======================================================================
  All rights reserved to Thrill Innovations Lab.
 THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
 OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
 LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
 FITNESS FOR A PARTICULAR PURPOSE.
===========================================================================
****************************************************************************
 Name                : RolesController
 Type                : Javascript and JQuery 
 Description         : This file contains controller methods
 References          :
 Author              : Tulasi Ballada
 Created Date        : 07-Apl-2016
****************************************************************************
MODIFICATION LOG
**************************************************************************** 
Ver Date         Modified By            Description

11-Apr-2016      Rahul                  Server to Client calls and communication establishment and issues
13-Apr-2016      Tulasi Ballada         Added Code Comments
****************************************************************************  
Code Review LOG
**************************************************************************** 
S.No      Ver        Date                Code Review By            Observations
1         1.0       14-April-2016         Sri Venkatesh.T          appConfig and appLogger are never used remove if not required
2         1.0       14-April-2016         Sri Venkatesh.T          function params must be camel cased and having a meaningful name.declaring a function param as "obj" doen't have a readability.
3         1.0       14-April-2016         Sri Venkatesh.T          function comments are not so clear           
****************************************************************************
*/

var app = angular.module('security.roleLogic', ['ThrillFrameworkLibrary.DataService'
                                                , 'security.config'
                                                , 'ThrillCnnWebClient.appConfig'
                                                , 'ThrillFrameworkLibrary.appLogger'
])

// Roles Logic Start
.factory('roleLogic', function ($http,
    dataService,
    securityconfig,
    appConfig,
    appLogger) {

    return {
// logic for roles CRUD
//Saving Roles
        addRole: function (userObj) { // Add Role Logic function Call

            return dataService.insert(userObj, 'User', 'securitynew', securityconfig.API_URL + 'Security/role').then(function (response) {
                return response;
            });

        },
//This for getting all the roles to display in list
        getAllRoles: function () { // Get All Roles funcion Call

            return dataService.callAPI(securityconfig.API_URL + 'Security/roles', [], 'GET').then(function (response) {
                return response.data;

            });

        },
//This is for updating Role
        updateRole: function (userInfoObj, val) { // Update Role function call

            return dataService.update(userInfoObj, 'RoleID=' + val, 'User', 'securitynew', securityconfig.API_URL + 'Security/role/' + val).then(function (response) {

                return response;
            });

        }

    };

});
// Roles Logic End