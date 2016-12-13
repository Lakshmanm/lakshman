/*===========================================================================
 All rights reserved to Nunet Cube Software Solutions.
 THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
 OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
 LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
 FITNESS FOR A PARTICULAR PURPOSE.
============================================================================
****************************************************************************
 Name                : DashBoard.Logic
Type                 : Angular Js  
 Description         : Define DashBoard bussiness logic.
 References          : https://angularjs.org/
 Author              : Murali Dadi
 Created Date        : 11-Apr-2016
****************************************************************************                          
MODIFICATION LOG
**************************************************************************** 
Ver Date         Modified By            Description
1.  12-04-2016   Jagadeesh Adigarlla    Changed API calls 

****************************************************************************                            
Code Review LOG
**************************************************************************** 
S.No      Ver        Date                Code Review By            Observations
1         1.0       17-April-2016         Sri Venkatesh.T          "appConfig" , "appLogger" and "$q" module were note used in this whole file ,if nt required remove it.
2         1.0       17-April-2016         Sri Venkatesh.T          Remove commented code if not required.  
****************************************************************************
*/


/*Create Business Logic Factory Method */
angular.module('ThrillCNN.DashBoardLogic', ['ThrillFrameworkLibrary.DataService',
    'ThrillCNN.config', 'ThrillCnnWebClient.appConfig',
    'ThrillFrameworkLibrary.appLogger'
])

    /*Create Business Logic Factory Method */
    .factory('dashBoardLogic', function ($http, dataService, cnnconfig, appConfig, appLogger, $q) {

        return {
            /* retrieving user all calendars */
            getPersonCalendars: function (userId) {

                return dataService.callAPI(cnnconfig.API_URL + '/calendar/person/' + userId, [], 'GET').then(function (response) {

                    return response.data;

                }, function (err) {

                    console.error('ERR', err);

                });
            },
            /* retrieving events shared by person */
            getEventsSharedByPerson: function (userId) {

                return dataService.callAPI(cnnconfig.API_URL + '/events/person/' + userId, [], 'GET').then(function (response) {

                    //console.log("tttt"+JSON.stringify(response))
                    return response.data.data;

                }, function (err) {

                    console.error('ERR', err);

                });
            },
            /* retrieving event priority levels */
            getEventsSharedByPersonCalendar: function (calendarid) {

                return dataService.callAPI(cnnconfig.API_URL + '/events/calendar/' + calendarid, [], 'GET').then(function (response) {
                    //console.log("tttt"+JSON.stringify(response))
                    return response.data.data;

                }, function (err) {

                    console.error('ERR', err);

                });
            },
            /* retrieving event priority levels */
            getTasksByCalendarID: function (calendarid) {

                return dataService.callAPI(cnnconfig.API_URL + '/tasks/' + calendarid, [], 'GET').then(function (response) {

                    console.log(response)
                    return response.data;

                }, function (err) {

                    console.error('ERR', err);

                });
            },
            // /* retrieving event priority levels */
            // getTasksByCalendarID: function(calendarid) {

            //     return dataService.callAPI(cnnconfig.API_URL + '/getTasksbycalenderid/' + calendarid, [], 'GET').then(function(response) {

            //         return response.data;

            //     }, function(err) {

            //         console.error('ERR', err);

            //     });
            // },
            /* Method for create new task */
            deleteCalendar: function (delCalendarObj) {
                return dataService.insert(delCalendarObj, '', cnnconfig.OFFLINE_DBNAME, cnnconfig.API_URL + '/calendars').then(function (response) {
                 

                    return response;
                });
            },
            /* Method for create new task */
            deleteEventTask: function (delCalendarObj) {
                return dataService.insert(delCalendarObj, '', cnnconfig.OFFLINE_DBNAME, cnnconfig.API_URL + '/eventortask').then(function (response) {

                    return response;
                });
            }
            // ,
            // /* Method for create new task */
            // createTask: function (newTaskInfoObj) {
            //     return dataService.insert(newTaskInfoObj, '', cnnconfig.OFFLINE_DBNAME, cnnconfig.API_URL + '/create_event_tasktype').then(function (response) {
            //         //appLogger.log("ttt" + JSON.stringify(response))
            //         return response;
            //     });
            // }
        };

    });