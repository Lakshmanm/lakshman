/*===========================================================================
 All rights reserved to Nunet Cube Software Solutions.
 THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
 OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
 LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
 FITNESS FOR A PARTICULAR PURPOSE.
============================================================================
****************************************************************************
 Name		    	 : NotificationSettings.Logic
 Type                : Angular Js  
 Description         : Define NotificationSettings bussiness logic.
 References          : https://angularjs.org/
 Author              : Thriveni Yalavarthi.
 Created Date        : 10-Apr-2016
****************************************************************************                          
MODIFICATION LOG
**************************************************************************** 
Ver	Date	     Modified By			Description
1.  10-04-2016   Thriveni Yalavarthi    Define user notification settings bussiness logic
2.  12-04-2016   Jagadeesh Adigarlla    Changed API calls 
****************************************************************************                            
Code Review LOG
**************************************************************************** 
S.No      Ver        Date                Code Review By            Observations
1         1.0       17-April-2016         Sri Venkatesh.T          "appConfig" & "appLogger" module were note used in this whole file ,if nt required remove it.  
****************************************************************************
*/




angular.module('ThrillCNN.NotificationSettingsLogic', ['ThrillFrameworkLibrary.DataService', 'ThrillCNN.config',
    'ThrillCnnWebClient.appConfig',
    'ThrillFrameworkLibrary.appLogger'
])


/*Create Business Logic Factory Method */
.factory('notificationLogic',
    function($http,
        dataService,
        cnnconfig,
        appConfig,
        appLogger) {


        return {
            /*Method for getting  notification settings masterdata*/
            getMasterData: function() {

                return dataService.callAPI(cnnconfig.API_URL + '/notificationSettings', [], 'GET').then(function(response) {
                    return response;
                });

            },
            /*Method for getting user notification settings information*/
            getUserNotificationSettingsById: function(userId) {

                return dataService.callAPI(cnnconfig.API_URL + '/notificationSettingsDetails/' + userId, [], 'GET').then(function(response) {


                    return response;
                });
            },
            /* Method for insert notification settings for the first time by userId */
            checkNotificationSettings: function(userId) {

                return dataService.callAPI(cnnconfig.API_URL + '/notificationSettingsAdd/' + userId, [], 'GET').then(function(response) {


                    return response;
                });
            },


            /*Method for updating user notification settings details*/
            updateUserNotificationSettings: function(userNotificationSettingsObj) {

                return dataService.insert(userNotificationSettingsObj, '', cnnconfig.OFFLINE_DBNAME, cnnconfig.API_URL + '/notificationSettingsEdit').then(function(response) {
                    //appLogger.log("User Update Response" + JSON.stringify(response))
                    return response;
                });



            },
            /*Method for getting  notification templates settings masterdata*/
            notificationTemplates: function() {

                return dataService.callAPI(cnnconfig.API_URL + '/notificationTemplates', [], 'GET').then(function(response) {
                    return response;
                });

            },
             /*Method for getting  notification template users settings masterdata*/
            notificationTemplateUsers: function() {

                return dataService.callAPI(cnnconfig.API_URL + '/notificationUserTypes', [], 'GET').then(function(response) {
                    return response;
                });

            },
            /*Method for getting  notificationTypes settings masterdata*/
            
            notificationTypes: function() {

                return dataService.callAPI(cnnconfig.API_URL + '/notificationTypes', [], 'GET').then(function(response) {
                    return response;
                });

            },

            /*Method for getting  notificationTemplateDetails settings masterdata*/
            
            notificationTemplateDetails: function() {

                return dataService.callAPI(cnnconfig.API_URL + '/notificationTemplateDetails', [], 'GET').then(function(response) {
                    return response;
                });

            },

         /*Method for updating user notification template details*/
            updateNotificationTemplate: function(templateObject) {


           
                return dataService.insert(templateObject, '', cnnconfig.OFFLINE_DBNAME, cnnconfig.API_URL + '/notificationTemplateUpdateDetails').then(function(response) {
                    
                    return response;
                });



            },
            




            
        };
    });