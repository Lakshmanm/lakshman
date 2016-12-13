/*=======================================================================
  All rights reserved to Thrill Innovations Lab.
 THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
 OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
 LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
 FITNESS FOR A PARTICULAR PURPOSE.
===========================================================================
****************************************************************************
 Name                : ForgotPassord
 Type                : Javascript and JQuery 
 Description         : This file contains logic methods
 References          :
 Author              :  Mythreyee.Pingala
 Created Date        :  12-April-2016
****************************************************************************
MODIFICATION LOG
**************************************************************************** 
Ver Date         Modified By            Description
12-Apl-2016      Mythreyee              Added Logic For The CRUD Operations(completeLogic)
****************************************************************************  
Code Review LOG
**************************************************************************** 
S.No      Ver        Date                Code Review By            Observations
1         1.0       14-April-2016         Sri Venkatesh.T           Complete code is commented ,if it is under development please mention on top of it //TODO: (Comments)           
****************************************************************************
*/

var app = angular.module('security.forgotPasswordLogic', ['ThrillFrameworkLibrary.DataService',
                                                          'security.config',
                                                          
                                                          'ThrillCnnWebClient.appConfig',
                                                          'ThrillFrameworkLibrary.appLogger'])
    .factory('forgotPasswordLogic', function ($http,
        dataService,
        
        securityconfig,
        appConfig,
        appLogger) {

        return {
            //CRUD Operations for forgot Password Details

            
//This Logic is to Send email for the user during the process of recovering password
            sendEmail: function (mailObj) {
console.log(mailObj);
                return dataService.insert(mailObj, 'Security', securityconfig.OFFLINE_DBNAME, securityconfig.API_URL + 'Security/emailVerification').then(function (response) {
                    return response;
                });

            },

// This function is verify email basing on token            
            sendEmailToken: function (val) {

                return dataService.callAPI(securityconfig.API_URL + 'Security/Token/' + val, [], 'GET').then(function (response) {

                    return response.data;
                });

            },
//This function is for avoiding suplicates of Primary Email

            getUserEmail: function (val) {

                return dataService.callAPI(securityconfig.API_URL + 'Security/email/' + val, [], 'GET').then(function (response) {

                    return response.data;
                });
            },

            
//this function is for saving Otp basing on UserID         
            postOtp: function (otp) {

                return dataService.insert(otp, 'Security', securityconfig.OFFLINE_DBNAME, securityconfig.API_URL + 'Security/otp').then(function (response) {
                    return response;
                });

            },
// This function is for sending sms to user
            sendSms: function (sms) {

                return dataService.insert(sms, 'Security', securityconfig.OFFLINE_DBNAME, securityconfig.API_URL + 'Security/Sms/').then(function (response) {
                    return response;
                });

            },

            studentSms: function (sms) {

                return dataService.insert(sms, 'Security', securityconfig.OFFLINE_DBNAME, securityconfig.API_URL + 'Security/studentSms').then(function (response) {
                    return response;
                });

            },
                staffSms: function (sms) {

                return dataService.insert(sms, 'Security', securityconfig.OFFLINE_DBNAME, securityconfig.API_URL + 'Security/staffSms').then(function (response) {
                    return response;
                });

            },
//This function is to restrict duplicates for mobile Number          
            getMobileNumber: function (val) {

                return dataService.callAPI(securityconfig.API_URL + 'Security/mobileNumber/' + val, [], 'GET').then(function (response) {

                    return response.data;
                });


            },
//tHis function is for validating otp
            getOTP: function (id, otp) {

                return dataService.callAPI(securityconfig.API_URL + 'Security/otp/' + id + '/' + otp, [], 'GET').then(function (response) {

                    return response.data;
                });

            },
//This function is to get all security question during password recovery
            getAllquestions: function () {

                return dataService.callAPI(securityconfig.API_URL + 'Security/Questionaires', [], 'GET').then(function (response) {

                    return response.data;
                });

            },
//this is for validating answer during password recovery
            getAnswer: function (val) {

                return dataService.callAPI(securityconfig.API_URL + 'Security/answer/' + val, [], 'GET').then(function (response) {

                    return response.data;
                });

            },
//this is for validating EmailId
            getUserMail: function (val) {
                return dataService.callAPI(securityconfig.API_URL + 'Security/email/' + val, [], 'GET').then(function (response) {

                    return response.data;
                });

            },
    //This is to update password after change        
            changePassword: function (userId, obj) {

                return dataService.update(obj, 'UserID=' + userId, 'Security', 'trainee6', securityconfig.API_URL + 'Security/Password/' + userId).then(function (response) {
                    return response;
                });

            }

        }
    });