/*===========================================================================
 All rights reserved to Nunet Cube Software Solutions.
 THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
 OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
 LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
 FITNESS FOR A PARTICULAR PURPOSE.
============================================================================
****************************************************************************
 Name		    	 : CreateCalendar.Logic
  Type               : Angular Js  
 Description         : Define CreateCalendar bussiness logic.
 References          : https://angularjs.org/
 Author              : Thriveni Yalavarthi.
 Created Date        : 06-Apr-2016
****************************************************************************                          
MODIFICATION LOG
**************************************************************************** 
Ver	Date	     Modified By			Description
1.  07-04-2016   Thriveni Yalavarthi    Define create calendar bussiness logic
2.  12-04-2016   Jagadeesh Adigarlla    Changed API calls 
****************************************************************************                            
Code Review LOG
**************************************************************************** 
S.No      Ver        Date                Code Review By            Observations
1         1.0       17-April-2016         Sri Venkatesh.T          Write comments for userForgotPassword: function (userForgotPasswordEmail)  
****************************************************************************
*/


angular.module('ThrillCNN.CreateCalendarLogic',
    ['ThrillFrameworkLibrary.DataService',
        'ThrillCNN.config',
        'ThrillCnnWebClient.appConfig',
        'ThrillFrameworkLibrary.appLogger']
)

    /*Create Business Logic Factory Method */
    .factory('createCalendarLogic',
    function ($http,
        dataService,
        cnnconfig,
        appConfig,
        appLogger) {

        return {
            /* Method for create new calendar */
            createCalendar: function (newCalendarInfo) {
                return dataService.insert(newCalendarInfo, '', cnnconfig.OFFLINE_DBNAME, cnnconfig.API_URL + '/calendar').then(function (response) {
                    appLogger.log("ttt" + JSON.stringify(response))
                    return response;
                });
            },

             personinsertion: function (personkeyInfo) {

               
                return dataService.insert(personkeyInfo, '', cnnconfig.OFFLINE_DBNAME, cnnconfig.API_URL + '/person').then(function (response) {
                    appLogger.log("personkeyInfo" + JSON.stringify(response))
                    return response;
                });
            }
        };
    });