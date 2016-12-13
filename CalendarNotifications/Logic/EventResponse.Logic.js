/*===========================================================================
 All rights reserved to Nunet Cube Software Solutions.
 THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
 OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
 LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
 FITNESS FOR A PARTICULAR PURPOSE.
============================================================================
****************************************************************************
 Name		    	 : EventResponse.Logic
 Type                : Angular Js  
 Description         : Define EventResponse bussiness logic.
 References          : https://angularjs.org/
 Author              : Jagadeesh Adigarlla
 Created Date        : 14-Apr-2016
****************************************************************************                          
MODIFICATION LOG
**************************************************************************** 
Ver	Date	     Modified By			Description
1	14-04-2016   Jagadeesh Adigarlla	Created Event response logic.
****************************************************************************                            
Code Review LOG
**************************************************************************** 
S.No      Ver        Date                Code Review By            Observations
1         1.0       17-April-2016         Sri Venkatesh.T          "appConfig" & "appLogger" module were note used in this whole file ,if nt required remove it.  
****************************************************************************
*/



var app = angular.module('ThrillCNN.EventResponseLogic', ['ThrillFrameworkLibrary.DataService',
    'ThrillCNN.config',
    'ThrillCnnWebClient.appConfig',
    'ThrillFrameworkLibrary.appLogger'
])

/*Create Business Logic Factory Method */
.factory('eventResponseLogic',
    function($http,
        dataService,
        cnnconfig,
        appConfig,
        appLogger) {


        return {
            /*Method for getting response count of an event*/
            getResponseCount: function(eventID, personID) {

                return dataService.callAPI(cnnconfig.API_URL + '/attendeesResponsesCount/' + eventID + '/' + personID, [], 'GET').then(function(response) {
                    return response.data;
                });

            },
            /*Method to insert attendee response*/
            attendeeResponseInsert: function(eventID, personID, responseID) {

                return dataService.callAPI(cnnconfig.API_URL + '/attendeesResponsesAdd/' + eventID + '/' + personID + '/' + responseID, [], 'GET').then(function(response) {
                    return response.data;
                });
            },
            /*Method to upadate attendee response*/
            attendeeResponseUpdate: function(eventID, personID, responseID) {

                return dataService.callAPI(cnnconfig.API_URL + '/attendeesResponsesesEdit/' + eventID + '/' + personID + '/' + responseID, [], 'GET').then(function(response) {
                    return response.data;
                });
            },


        };
    });