/*===========================================================================
 All rights reserved to Nunet Cube Software Solutions.
 THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
 OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
 LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
 FITNESS FOR A PARTICULAR PURPOSE.
============================================================================
****************************************************************************
 Name		    	 : CreateTask.Logic
Type                 : Angular Js  
 Description         : Define CreateTask bussiness logic.
 References          : https://angularjs.org/
 Author              : Thriveni Yalavarthi
 Created Date        : 09-Apr-2016
****************************************************************************                          
MODIFICATION LOG
**************************************************************************** 
Ver	Date	     Modified By			Description
1.  07-04-2016   Thriveni Yalavarthi    Define create task bussiness logic
2.  12-04-2016   Jagadeesh Adigarlla    Changed API calls 
****************************************************************************                            
Code Review LOG
**************************************************************************** 
S.No      Ver        Date                Code Review By            Observations
1         1.0       17-April-2016         Sri Venkatesh.T          "appConfig" , "appLogger" and "$q" module were note used in this whole file ,if nt required remove it.  
****************************************************************************
*/



angular.module('ThrillCNN.CreateTaskLogic',
    ['ThrillFrameworkLibrary.DataService',
        'ThrillCNN.config', 'ThrillCnnWebClient.appConfig',
        'ThrillFrameworkLibrary.appLogger']
)

    /*Create Business Logic Factory Method */
    .factory('createTaskLogic', function ($http, dataService, cnnconfig, appConfig, appLogger, $q) {

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
            /* Method for create new task */
            createTask: function (newTaskInfoObj) {
                return dataService.insert(newTaskInfoObj, '', cnnconfig.OFFLINE_DBNAME, cnnconfig.API_URL + '/task').then(function (response) {
                    //appLogger.log("ttt" + JSON.stringify(response))
                    return response;
                });
            }
        }

    });