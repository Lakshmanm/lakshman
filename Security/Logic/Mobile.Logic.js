/*=======================================================================
  All rights reserved to Thrill Innovations Lab.
 THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
 OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
 LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
 FITNESS FOR A PARTICULAR PURPOSE.
===========================================================================
****************************************************************************
 Name                : ChangePassword
 Type                : Javascript and JQuery 
 Description         : This file contains logic methods
 References          :
 Author              : Mythreyee.Pingala
 Created Date        :  18-April-2016
****************************************************************************
MODIFICATION LOG
**************************************************************************** 
Ver Date         Modified By            Description

****************************************************************************  
Code Review LOG
**************************************************************************** 
S.No      Ver        Date                Code Review By            Observations
1         1.0       14-April-2016         Sri Venkatesh.T           appConfig, appLogger,securityQueries are not used but injected remove if not required.
2         1.0       14-April-2016         Sri Venkatesh.T           write comments for all the functions in this file
3         1.0       14-April-2016         Sri Venkatesh.T           Give meaningful name for the function parameters with camel casing.And remove all empty lines just accomidate ample of line space to look code with indentation.
4         1.0       14-April-2016         Sri Venkatesh.T           In page header please mention full name of the author. 
****************************************************************************
*/

var app = angular.module('security.mobileLogic', ['ThrillFrameworkLibrary.DataService',
                                                          'security.config',
                                                          'ThrillCnnWebClient.appConfig',
                                                          'ThrillFrameworkLibrary.appLogger'])
    .factory('mobileLogic', function ($http,
        dataService,
        securityconfig,
        appConfig,
        appLogger) {
        return {
           
//This is to get listr of users
        getUserByID: function (userId) {

                return dataService.callAPI(securityconfig.API_URL + 'Security/getUsers/' + userId, [], 'GET').then(function (response) {

                    return response.data;
                });

            },
// this is to save user mobile number during the time of registration
          postNumber: function (userObj) { //postQuestionnaire function call

                return dataService.insert(userObj, 'User', 'trainee6', securityconfig.API_URL + 'Security/postMobileNumber').then(function (response) {
                    return response;
                });

            },
//this is post otp for the created user 
               postOtp: function (userObj) { //postQuestionnaire function call

                return dataService.insert(userObj, 'User', 'trainee6', securityconfig.API_URL + 'Security/postOtp').then(function (response) {
                    return response;
                });

            }, 
//this is to restrict duplicate mobilenumber
            getUserMobile: function (mobilenumber) {

                return dataService.callAPI(securityconfig.API_URL + 'Security/getMobileNumber/' + mobilenumber, [], 'GET').then(function (response) {

                    return response.data;
                });

            },

//this is to check the status whether the mobile number of user is verified or not
            getUserMobileStatus: function (mobilenumber) {

                return dataService.callAPI(securityconfig.API_URL + 'Security/MobileStatus/' + mobilenumber, [], 'GET').then(function (response) {

                    return response.data;
                });

            },
//this is for validating otp
             getOtp: function (obj) {

                return dataService.callAPI(securityconfig.API_URL + 'Security/GetOtp/'+ obj, [], 'GET').then(function (response) {

                    return response.data;
                });
            },
//this is to restrict duplications of emailId
               getUserEmail: function (Email) {

                return dataService.callAPI(securityconfig.API_URL + 'Security/getUserEmail/' + Email, [], 'GET').then(function (response) {

                    return response.data;
                });

            },

//this is to send sms to the user
            sendSms: function (userObj) { //postQuestionnaire function call

                return dataService.insert(userObj, 'User', 'trainee6', securityconfig.API_URL + 'Security/sendSms').then(function (response) {
                    return response;
                });

            }, 
    //this is to save the basic info of the user
            updateUserByMobile: function (userObj,id) {
                return dataService.update(userObj, 'User', 'Security', securityconfig.API_URL + 'Security/UpdateUser/' + id).then(function (response) {
                    return response;
                });
            }
            
        };

    });