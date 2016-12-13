/*=======================================================================
  All rights reserved to Thrill Innovations Lab.
 THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
 OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
 LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
 FITNESS FOR A PARTICULAR PURPOSE.
===========================================================================
****************************************************************************
 Name		    	 : Registration
 Type		    	 : Javascript and JQuery 
 Description		 : This file contains logic methods
 References		     :
 Author	    		 :Mythreyee.Pingala
 Created Date        : 11-April-2016
****************************************************************************
MODIFICATION LOG
**************************************************************************** 
Ver	Date	     Modified By			Description
11-Apr-2016      Mythreyee      Added Logic For The CRUD Operations(completeLogic)
12-Apr-2016      Rahul          Modified Server to Client Calls 
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

var app = angular.module('security.registrationLogic', ['ThrillFrameworkLibrary.DataService', 'security.config', 'ThrillCnnWebClient.appConfig', 'ThrillFrameworkLibrary.appLogger'])
    /* Registration logic  Start */
    .factory('registrationLogic', function($http,
        dataService,
        securityconfig,
        appConfig,
        appLogger) {
        return {

            // Logic for registration process 

            //This function is to restrict duplicates of username
            getUsername: function(userId) {

                return dataService.callAPI(securityconfig.API_URL + 'Security/userName/' + userId, [], 'GET').then(function(response) {

                    return response.data;
                });

            },


            // this function is to restrict duplicate of primary email address     
            getEmail: function(email) { //getEmail function call


                return dataService.callAPI(securityconfig.API_URL + 'Security/email/' + email, [], 'GET').then(function(response) {


                    return response.data;
                });

            },
            //This function is to restrict dupplicate of MobileNumber       
            getMobile: function(mobile) {
               // alert(mobile);
                return dataService.callAPI(securityconfig.API_URL + 'Security/mobileNumber/'+ mobile, [], 'GET').then(function(response) {

                    return response.data;
                });

            },
            // This function is used for posting security question and answer during Signup
            postQuestionnaire: function(userObj) { //postQuestionnaire function call

                return dataService.insert(userObj, 'User', 'trainee6', securityconfig.API_URL + 'Security/Questionaire').then(function(response) {
                    return response;
                });

            },

            //This function is to save address of the user during registration
            postAddress: function(UserObj) { //postAddress function call

                return dataService.insert(UserObj, 'User', 'admin', securityconfig.API_URL + 'Security/Address').then(function(response) {
                    return response;
                });

            },
            //  This function is to save the registered User 
            postUser: function(userObj) { //postUser function call
                //alert('calling');
               // appLogger.log('url ' + securityconfig.API_URL + 'Security/resgisteredUser' + ' obj ' + JSON.stringify(userObj))
                return dataService.insert(userObj, 'User', 'admin', securityconfig.API_URL + 'Security/resgisteredUser').then(function(response) {
                    return response;
                });

            },

                poststaffsecurityuser: function(userObj) { //postUser function call
                //alert('calling');
                //appLogger.log('url ' + securityconfig.API_URL + 'Security/poststaffsecurityuser' + ' obj ' + JSON.stringify(userObj))
                return dataService.insert(userObj, 'User', 'admin', securityconfig.API_URL + 'Security/poststaff/securityuser').then(function(response) {
                    return response;
                });

            }, 

            //This function is to save the registered user as person     
            postPerson: function(userObj) { //postPerson function call
                return dataService.insert(userObj, 'User', 'trainee6', securityconfig.API_URL + 'Security/Person').then(function(response) {
                    return response;
                });

            },
            // This is to get country   
            getCountry: function() { //getCountry function call
                return dataService.callAPI(securityconfig.API_URL + 'SecurityMasterdata/countries', [], 'GET').then(function(response) {

                    return response.data;
                });

            },
            // For getting state basing on country
            getState: function(countryId) { //getState function call

                return dataService.callAPI(securityconfig.API_URL + 'SecurityMasterdata/states/' + countryId, [], 'GET').then(function(response) {

                    return response.data;
                });

            },

            //This for getting districts basing on state
            getDistrict: function(stateId) { //getDistrict function call

                return dataService.callAPI(securityconfig.API_URL + 'SecurityMasterdata/districts/' + stateId, [], 'GET').then(function(response) {

                    return response.data;
                });

            },
            //This is for getting mandal basing on state      
            getMandal: function(districtId) { //getMandal function call

                return dataService.callAPI(securityconfig.API_URL + 'SecurityMasterdata/mandals/' + districtId, [], 'GET').then(function(response) {

                    return response.data;
                });

            },
            //This is for getting village basing on mandal
            getVillage: function(mandalId) { //getVillage function call

                return dataService.callAPI(securityconfig.API_URL + 'SecurityMasterdata/villages/' + mandalId, [], 'GET').then(function(response) {

                    return response.data;
                });

            },

            postContact: function(userObj) { //postPerson function call
                return dataService.callAPI(config.CONTACT_API_URL + '/contacts', JSON.stringify(userObj), 'POST').then(function(response) {
                    return response;
                });

            },
            //This is for getting getting questions during signup
            getQuestionnaire: function() { //getQuestionnaire function call

                return dataService.callAPI(securityconfig.API_URL + 'Security/Questionaires', [], 'GET').then(function(response) {

                    return response.data;
                });

            },
            // This is to postEmail to the registered User
            postEmail: function(userObj) { //postEmail function call
                console.log(userObj);
                return dataService.insert(userObj, 'User', 'trainee6', securityconfig.API_URL + 'Security/registeredEmail').then(function(response) {

                    return response;
                });

            },

            studentMail: function(studentObj) { //postEmail function call

                return dataService.insert(studentObj, 'User', 'trainee6', securityconfig.API_URL + 'Security/studentRegisteredMail').then(function(response) {

                    return response;
                });

            },
            staffMail: function(staffObj) { //postEmail function call

                return dataService.insert(staffObj, 'User', 'trainee6', securityconfig.API_URL + 'Security/staffRegisteredMail').then(function(response) {

                    return response;
                });

            },

            //This is to add token to the email being send
            sendToken: function(userId) { //sendToken function call

                return dataService.callAPI(securityconfig.API_URL + 'Security/Token/' + userId, [], "GET").then(function(response) {

                    return response;
                });

            },

            //This is for the verificatrion of captcha      
            postCaptcha: function(userObj) { //postCaptcha function call

                return dataService.insert(userObj, 'User', 'trainee6', securityconfig.API_URL + 'Security/verifyCaptcha').then(function(response) {
                    return response;
                });

            }

        };

    });
/* Registration logic  end */