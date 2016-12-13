/*===========================================================================
 All rights reserved to Nunet Cube Software Solutions.
 THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
 OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
 LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
 FITNESS FOR A PARTICULAR PURPOSE.
============================================================================
****************************************************************************
 Name		    	: EventResponse.Controller
 Type               : Angular Js  
 Description        : containing attributes/properties and functions of event response
 References         : https://angularjs.org/
 Author             : Jagadeesh Adigarlla.
 Created Date       : 14-04-2016.
****************************************************************************                          
MODIFICATION LOG
**************************************************************************** 
Ver	Date	     Modified By			Description
1.	14-04-2016	 Jagadeesh Adigarlla	Define controller logic for event response 
****************************************************************************                            
Code Review LOG
**************************************************************************** 
S.No      Ver        Date                Code Review By            Observations
1         1.0       17-April-2016         Sri Venkatesh.T           Remove "var currentFileName = "EventResponse";" code which is not requried.
****************************************************************************
*/


var currentFileName = "EventResponse";

var app = angular.module('ThrillCNN.EventResponse', ['ThrillCNN.EventResponseLogic',
    'ThrillCnnWebClient.appConfig',
    'ThrillFrameworkLibrary.appLogger',
    'ThrillFrameworkLibrary.Network'
]);

/*Setup employee Controller */
app.controller('EventResponseController',
    function($location,
        $scope,
        $state,
        $http,
        appConfig,
        appLogger,
        $localStorage,
        eventResponseLogic) {

        $("#header-login").hide();
        var urlpathedit = $location.path().split('/');
        appLogger.log("" + urlpathedit);
        $scope.goToLogin = function() {
            $state.go('app.authentication');
        };


        var refresh = function() {
            eventResponseLogic.getResponseCount(urlpathedit[2], urlpathedit[3]).then(function(response) {
                $scope.eventresponsescount = response[0].responsecount;
                if ($scope.eventresponsescount == 0) {
                    eventResponseLogic.attendeeResponseInsert(urlpathedit[2], urlpathedit[3], urlpathedit[4]).then(function(insertResponse) {
                        if (insertResponse.message == "success") {
                            $scope.Message = "Event Response Submitted Successfully";
                        } else {
                            $scope.Message = "Event Response Submission Failed, Event Not Available";
                        }
                    });
                } else {
                    eventResponseLogic.attendeeResponseUpdate(urlpathedit[2], urlpathedit[3], urlpathedit[4]).then(function(updateResponse) {
                        if (updateResponse.message == "success") {
                            $scope.Message = "Event Response Submitted Successfully";
                        } else {
                            $scope.Message = "Event Response Submission Failed, Event Not Available";
                        }

                    });
                }
                if (response.message == "success") {
                    $scope.Message = "Event Response Submitted Successfully";
                } else {
                    $scope.Message = "Event Response Submission Failed, Event Not Available";
                }

            }, function(err) {

                $scope.Message = "Event Response Submission Failed, Event Not Available";

                console.error('ERR', err);
            });
        };


        refresh();
    });