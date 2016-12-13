/*===========================================================================
 All rights reserved to Nunet Cube Software Solutions.
 THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
 OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
 LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
 FITNESS FOR A PARTICULAR PURPOSE.
============================================================================
****************************************************************************
 Name		    	: EditEvent.Logic
 Type		    	: Angular Js  
 Description		: Define State provider and configure all controllers and templates with routers
 References		    :
 Author	    		: Thriveni Yalavarthi.
 Created Date       : 11-04-2016.
****************************************************************************                          
MODIFICATION LOG
**************************************************************************** 
Ver	Date	     Modified By			Description
1.  11-04-2016   Thriveni Yalavarthi    Define the controller logic of edit event
2.  12-04-2016   Jagadeesh Adigarlla    Changed API calls 
****************************************************************************                            
Code Review LOG
**************************************************************************** 
S.No      Ver        Date                Code Review By            Observations
1         1.0       17-April-2016         Sri Venkatesh.T          "getEventInfoByEventIdCalId" function param name has spelling mistake check it once.
****************************************************************************
*/



angular.module('ThrillCNN.EditEventLogic', ['ThrillFrameworkLibrary.DataService',
                          'ThrillCNN.config',
                          'ThrillCnnWebClient.appConfig',
                          'ThrillFrameworkLibrary.appLogger'])
    /*Create Business Logic Factory Method */
    .factory('editEventLogic',
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

                        return response.data;

                    }, function (err) {

                        console.error('ERR', err);

                    });
                },
                /* retrieving event reminders types */
                getEventReminderTypes: function () {

                    return dataService.callAPI(cnnconfig.API_URL + '/reminderTypes', [], 'GET').then(function (response) {

                        return response.data;

                    }, function (err) {

                        console.error('ERR', err);

                    });
                },
                /* retrieving persons emails */
//                getPersonsEmails: function () {
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
                /* retrieving user event info by eventId and calendarId */
                getEventInfoByEventIdCalId: function (eventId, caledarId) {
                    return dataService.callAPI(cnnconfig.API_URL + '/event/' + eventId + '/' + caledarId, [], 'GET').then(function (response) {
                        
                       // console.log("EditEventData"+JSON.stringify(response.data))
                        return response.data;
                    });

                },
                /* Method for update user event */
                updateEvent: function (updateEventObj) {
                    
                   // console.log("updateEventObj "+JSON.stringify(updateEventObj));

                    return dataService.insert(updateEventObj, '', cnnconfig.OFFLINE_DBNAME, cnnconfig.API_URL + '/evenUpdate').then(function (response) {
                        appLogger.log(" Update Event Response" + JSON.stringify(response))
                        return response;
                    });

                }
            };
        });