/*===========================================================================
 All rights reserved to Nunet Cube Software Solutions.
 THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
 OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
 LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
 FITNESS FOR A PARTICULAR PURPOSE.
============================================================================
****************************************************************************
 Name		    	 : EditTask.Logic
 Type                : Angular Js  
 Description         : Define EditTask bussiness logic
 References          : https://angularjs.org/
 Author              : Thriveni Yalavarthi
 Created Date        : 12-Apr-2016
****************************************************************************                          
MODIFICATION LOG
**************************************************************************** 
Ver	Date	     Modified By			Description
1.  12-04-2016   Thriveni Yalavarthi    Define edit task bussiness logic
2.  12-04-2016   Jagadeesh Adigarlla    Changed API calls 
****************************************************************************                            
Code Review LOG
**************************************************************************** 
S.No      Ver        Date                Code Review By            Observations
1         1.0       17-April-2016         Sri Venkatesh.T          "appConfig" & "appLogger" module were note used in this whole file ,if nt required remove it.  
****************************************************************************
*/


angular.module('ThrillCNN.EditTaskLogic',
                        ['ThrillFrameworkLibrary.DataService', 
                        'ThrillCNN.CNNQueries', 'ThrillCNN.config', 
                        'ThrillCnnWebClient.appConfig', 
                        'ThrillFrameworkLibrary.appLogger']
                        )

    /*Create Business Logic Factory Method */
    .factory('editTaskLogic', 
        function ($http, 
            dataService, 
            CNNQueries, 
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
            /* retrieving task status */
            getEventTaskStatus: function () {

                return dataService.callAPI(cnnconfig.API_URL + '/taskStatus', [], 'GET').then(function (response) {

                    return response.data;

                }, function (err) {

                    console.error('ERR', err);

                });
            },
            /* retrieving event priority levels */
            getEventPriority: function () {

                return dataService.callAPI(cnnconfig.API_URL + '/taskPriority', [], 'GET').then(function (response) {

                    return response.data;

                }, function (err) {

                    console.error('ERR', err);

                });
            },
            /* retrieving user task info by taskId and calendarId */
            getTaskInfoByTaskIdCalId: function (taskId, caledarId) {
                return dataService.callAPI(cnnconfig.API_URL + '/taskEdit/' + taskId + '/' + caledarId, [], 'GET').then(function (response) {
                    //console.log("dfrgdfg"+JSON.stringify(response.data.data))
                    return response.data.data;
                });

            },
            /* Method for update user task */
            updateTask: function (updateTaskObj) {

                return dataService.insert(updateTaskObj, '', cnnconfig.OFFLINE_DBNAME, cnnconfig.API_URL + '/taskUpdate').then(function (response) {
                    //appLogger.log("User Update Response" + JSON.stringify(response))
                    return response;
                });

            }
        }
    });