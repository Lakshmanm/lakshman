/*===========================================================================
 All rights reserved to Nunet Cube Software Solutions.
 THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
 OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
 LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
 FITNESS FOR A PARTICULAR PURPOSE.
============================================================================
****************************************************************************
 Name		    	: CreateEvent.Logic
 Type		    	: Angular Js  
 Description		: Define State provider and configure all controllers and templates with routers
 References		    :
 Author	    		: Thriveni Yalavarthi.
 Created Date       : 09-04-2016.
****************************************************************************                          
MODIFICATION LOG
**************************************************************************** 
Ver	Date	     Modified By			Description
1.  06-04-2016   Thriveni Yalavarthi    Define create task bussiness logic
2.  12-04-2016   Jagadeesh Adigarlla    Changed API calls 
****************************************************************************                            
Code Review LOG
**************************************************************************** 
S.No      Ver        Date                Code Review By            Observations
1         1.0       17-April-2016         Sri Venkatesh.T          "appConfig" & "appLogger" module were note used in this whole file ,if nt required remove it.  
****************************************************************************
*/



angular.module('ThrillCNN.CreateEventLogic', ['ThrillFrameworkLibrary.DataService',
    'ThrillCNN.config',
    'ThrillCnnWebClient.appConfig',
    'ThrillFrameworkLibrary.appLogger'])
    /*Create Business Logic Factory Method */
    .factory('createEventLogic',
    function ($http,
        dataService,
        cnnconfig,
        appConfig,
        appLogger) {

        return {
            /* retrieving user all calendars */
            getUserCalendars: function (userId) {

                return dataService.callAPI(cnnconfig.API_URL + '/calendar/person/' + userId, [], 'GET').then(function (response) {

                    return response.data;

                }, function (err) {

                    console.error('ERR', err);

                });
            },
            /* retrieving event recurrence pattern types */
            getEventRecurencePatternTypes: function () {

                return dataService.callAPI(cnnconfig.API_URL + '/recurrenceTypes', [], 'GET').then(function (response) {

                    return response.data;

                }, function (err) {

                    console.error('ERR', err);

                });
            },
            /* retrieving event reminders */
            getEventReminder: function () {

                return dataService.callAPI(cnnconfig.API_URL + '/reminders', [], 'GET').then(function (response) {
                    // console.log(response.data);
                    return response.data;

                }, function (err) {

                    console.error('ERR', err);

                });
            },
            /* retrieving event reminders types */
            getEventReminderTypes: function () {

                return dataService.callAPI(cnnconfig.API_URL + '/reminderTypes', [], 'GET').then(function (response) {
                     console.log(response.data.data);
                    return response.data.data;

                }, function (err) {

                    console.error('ERR', err);

                });
            },
//            /* retrieving persons emails */
//            getPersonsEmails: function () {
//
//                return dataService.callAPI(cnnconfig.SECURITY_API_URL + '/personEmails', [], 'GET').then(function (response) {
//                    //console.log(response.data)
//
//                    return response.data;
//
//                }, function (err) {
//
//                    console.error('ERR', err);
//
//                });
//            },
            /* retrieving persons emails */
            getPersonsEmails: function () {
                
                var data={};
                return dataService.callAPI(cnnconfig.API_URL + '/referencekeys', [], 'GET').then(function (response) {
                    
                    
                  
                  
                    var RefKey = '';
                    for (var att = 0; att < response.data.length; att++)
                    {
                        RefKey = RefKey +"'"+response.data[att].ReferenceKey + "',";
                    }
                    if(RefKey!='')
                        {
                            RefKey = RefKey.slice(0, -1);        
                        }


                      
                    
                    data.ReferenceKeylist=RefKey;

                   
                    
                    return dataService.callAPI(cnnconfig.CONTACT_API_URL + '/contactsinfo', JSON.stringify(data), 'POST').then(function (resp) {

                                                        
                        return resp.data;

                    }, function (err) {

                        console.error('ERR', err);

                    });

                }, function (err) {

                    console.error('ERR', err);

                });
               
            },
            /* retrieving persons emails */
            getLoggedInUserInfo: function (userdId) {

                return dataService.callAPI(cnnconfig.API_URL + '/loggedinUserDetails/' + userdId, [], 'GET').then(function (response) {

                    return response.data;

                }, function (err) {

                    console.error('ERR', err);

                });
            },
            /* Method for create new event */
            createNewEvent: function (newEventInfoObj) {
               // console.log("createEvent Object"+JSON.stringify(newEventInfoObj));
                
                return dataService.insert(newEventInfoObj, '', cnnconfig.OFFLINE_DBNAME, cnnconfig.API_URL + '/event').then(function (response) {
                    //appLogger.log("ttt" + JSON.stringify(response))
                    return response;
                });
            }
        };
    });