/*=======================================================================
  All rights reserved to Thrill Innovations Lab.
 THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
 OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
 LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
 FITNESS FOR A PARTICULAR PURPOSE.
===========================================================================
****************************************************************************
 Name		    	 : User
 Type		    	 : Javascript and JQuery 
 Description		 : This file contains controller methods
 References		     :
 Author	    		 : Tulasi
 Created Date        : 07-Apr-2016
****************************************************************************
MODIFICATION LOG
**************************************************************************** 
Ver	Date	     Modified By			Description
07-Apr-2016      Mythreyee              Added Logic For The CRUD Operations(completeLogic)
12-Apr-2016      Rahul                  Server to Client calls and communication establishment and issues
13-Apr-2016      Tulasi Ballada         Added Code Comments
****************************************************************************  
Code Review LOG
**************************************************************************** 
S.No      Ver        Date                Code Review By            Observations
1         1.0       14-April-2016         Sri Venkatesh.T          securityQueries,appConfig and appLogger are never used remove if not required
2         1.0       14-April-2016         Sri Venkatesh.T          function params must be camel cased and having a meaningful name.declaring a function param as "obj" doen't have a readability.
3         1.0       14-April-2016         Sri Venkatesh.T          function comments are not so clear     
4         1.0       14-April-2016         Sri Venkatesh.T          In getMobile function params "var query = employeeQueries.UserDetailsFromMobile + val;" remove if this line is not required.       
****************************************************************************
*/

var app = angular.module('security.userLogic', ['ThrillFrameworkLibrary.DataService'
                                                , 'security.config'
                                                , 'ThrillCnnWebClient.appConfig'
                                                , 'ThrillFrameworkLibrary.appLogger'
                                               ])

//UserLogic Start
.factory('userLogic', function ($http,
    dataService,
    securityconfig,
    appConfig,
    appLogger) {

    return {

// logic for user CRUD operation
//This function is for adding user
        addUser: function (userObj) { //Add user logic function call

            return dataService.insert(userObj, 'User', 'trainee6', securityconfig.API_URL + 'Security/user').then(function (response) {
                return response;
            });

        },
//this function is for getting list of users
        getUser: function () { // get User logic function call

            return dataService.callAPI(securityconfig.API_URL + 'Security/users', [], 'GET').then(function (response) {
                return response.data;
            });

        },
//this function is for restricting email duplicates
        getEmail: function (emailObj) { // get email logic function call

            return dataService.callAPI(securityconfig.API_URL + 'Security/email' + emailObj, [], 'GET').then(function (response) {
                return response.data;
            });
        },
//this function is for restricting Mobilnumber duplicates
        getMobile: function (mobileObj) { // get mobile logic function call

            return dataService.callAPI(securityconfig.API_URL + 'Security/mobileNumber' + mobileObj, [], 'GET').then(function (response) {
                return response.data;
            });

        },
//this function is used for updating user details
        updateuser: function (userInfoObj, userId) { //  Update user logic function call
            return dataService.update(userInfoObj, 'UserID=' + userId, 'User', 'trainee6', securityconfig.API_URL + 'Security/userss/' + userId).then(function (response) {
                return response;
            });

        }
    };

});
//UserLogic End