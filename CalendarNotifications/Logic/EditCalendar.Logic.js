/*===========================================================================
 All rights reserved to Nunet Cube Software Solutions.
 THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
 OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
 LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
 FITNESS FOR A PARTICULAR PURPOSE.
============================================================================
****************************************************************************
 Name		    	 : EditCalendar.Logic
 Type                : Angular Js  
 Description         : Define EditCalendar bussiness logic.
 References          : https://angularjs.org/
 Author              : Thriveni Ylavarthi.
 Created Date        : 10-Apr-2016
****************************************************************************                          
MODIFICATION LOG
**************************************************************************** 
Ver	Date	     Modified By			Description
1.  10-04-2016   Thriveni Yalavarthi    Define edit calendar bussiness logic
2.  12-04-2016   Jagadeesh Adigarlla    Changed API calls 
****************************************************************************                            
Code Review LOG
**************************************************************************** 
S.No      Ver        Date                Code Review By            Observations
1         1.0       17-April-2016         Sri Venkatesh.T          No Issues
****************************************************************************
*/



angular.module('ThrillCNN.EditCalendarLogic', ['ThrillFrameworkLibrary.DataService',
    'ThrillCNN.config',
    'ThrillCnnWebClient.appConfig',
    'ThrillFrameworkLibrary.appLogger'
])


/*Create Business Logic Factory Method */
.factory('editCalendarLogic',
    function($http,
        dataService,
        cnnconfig,
        appConfig,
        appLogger) {

        return {
            /* retrieving calendar info */
            getCalendarInfoByCalId: function(calendarId) {

                return dataService.callAPI(cnnconfig.API_URL + '/calendarEdit/' + calendarId, [], 'GET').then(function(response) {

                    return response.data;

                }, function(err) {

                    console.error('ERR', err);

                });
            },
            /* Method for update user calendar */
            updateCalendar: function(updateCalendarObj) {

              //  console.log( "mmm");

                //console.log( cnnconfig.API_URL + '/calendar/person');

                return dataService.insert(updateCalendarObj, '', cnnconfig.OFFLINE_DBNAME, cnnconfig.API_URL + '/calendar/person').then(function(response) {
                    appLogger.log("User Update Response" + JSON.stringify(response))
                    return response;
                });

            }

        };
    });