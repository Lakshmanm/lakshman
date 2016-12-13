/*=======================================================================
  All rights reserved to Thrill Innovations Lab.
 THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
 OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
 LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
 FITNESS FOR A PARTICULAR PURPOSE.
===========================================================================
****************************************************************************
 Name		    	 : UserRole
 Type		    	 : Javascript and JQuery 
 Description		 : This file contains logic methods
 References		     :
 Author	    		 : Rahul.Buddha
 Created Date        : 07-April-2016
****************************************************************************
MODIFICATION LOG
**************************************************************************** 
Ver	Date	     Modified By			Description

****************************************************************************  
Code Review LOG
**************************************************************************** 
S.No      Ver        Date                Code Review By            Observations
1         1.0       14-April-2016         Sri Venkatesh.T          appConfig and appLogger are never used remove if not required
2         1.0       14-April-2016         Sri Venkatesh.T          function params must be camel cased and having a meaningful name.declaring a function param as "obj" doen't have a readability.
3         1.0       14-April-2016         Sri Venkatesh.T          function comments are not so clear     
4         1.0       14-April-2016         Sri Venkatesh.T          In getMobile function params "var query = employeeQueries.UserDetailsFromMobile + val;" remove if this line is not required.       
****************************************************************************
*/

var app = angular.module('security.userRoleLogic', ['ThrillFrameworkLibrary.DataService'
        , 'security.config'
       , 'ThrillCnnWebClient.appConfig'
        , 'ThrillFrameworkLibrary.appLogger'
    ])
    //User Role Logic Start
    .factory('userRoleLogic', function ($http,
        dataService,
        securityconfig,
        appConfig,
        appLogger) {
        return {
    //This  function is  to add userrole
            addUserRole: function (userObj) { // Add User Role Logic Function call
                return dataService.insert(userObj, 'User', 'Security', securityconfig.API_URL + 'Security/userRole').then(function (response) {
                    return response;
                });
            },
    //this function is to get roles
            getRoles: function () { // Get User Role Logic Function call
                return dataService.callAPI(securityconfig.API_URL + 'Security/roles', [], 'GET').then(function (response) {
                    return response.data;
                });
            },
    //This function is to get user full name 
            getUserFullName: function (getFullname) { // Get User Full Name Logic Function call
                return dataService.callAPI(securityconfig.API_URL + 'Security/fullname', [], 'GET').then(function (response) {

                    return response.data;
                });
            },
    //this function is to get userroles
            getUserRoles: function (userRoles) { // get User roles Logic Function call
                return dataService.callAPI(securityconfig.API_URL + 'Security/userRoles', [], 'GET').then(function (response) {
                    return response.data;
                });
            },
    //this function is to Update Userroles
            updateUserRole: function (userInfoObj, userRoleID) { // Update User roles Logic Function call
                return dataService.update(userInfoObj, 'UserRoleID=' + userRoleID, 'User', 'Security', securityconfig.API_URL + 'Security/role/' + userRoleID).then(function (response) {
                    return response;
                });
            }
        };

    });