/*//=============================================================================
// All rights reserved to Thrill Innovative Labs.
// THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
// OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
// LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
// FITNESS FOR A PARTICULAR PURPOSE.
//=============================================================================
//*****************************************************************************
//* Name		    	: app.js 
//* Type		    	: Angular JS File
//* Description		    :
//* References		    :
//* Author	    		:
//* Created Date        : 
//*****************************************************************************
//*                             MODIFICATION LOG
//*****************************************************************************
//*  S.No  Ver	     Date	         Modified By			Description

//*****************************************************************************
//*                             Code Review LOG
//*****************************************************************************

//*****************************************************************************
*/

	 var ThrillStudentLeaves = angular.module('ThrillStudentLeaves', ['ui.router', 'ngAnimate', 'ui.bootstrap',
		 'ThrillStudentLeaves.studentLeaveRequest',
		 'ThrillStudentLeaves.studentLeaveRequestList',
		 'ThrillStudentLeaves.studentLeaveReason',
		 'ThrillStudentLeaves.studentLeaveReasonList',
		 'ThrillStudentLeaves.studentLeaveRequestMode',
		 'ThrillStudentLeaves.studentLeaveRequestModeList',
		 'ThrillStudentLeaves.studentLeaveRequestReceivedBy',
		 'ThrillStudentLeaves.studentLeaveRequestReceivedByList',
		 'ThrillFrameworkLibrary.appLogger', 
		 'ThrillStudentLeaves.webSetup',
]);


var   DrawCaptcha=function()
    {
          var d = new Date().getTime();
    if(window.performance && typeof window.performance.now === "function"){
        d += performance.now(); //use high-precision timer if available
    }
    var uuid = 'xxxxxxxx-xxxx-xxxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c=='x' ? r : (r&0x3|0x8)).toString(16);
    });
    referencekey=uuid;
    return uuid;
    } 

DrawCaptcha();


	ThrillStudentLeaves.config(['$stateProvider', '$urlRouterProvider'
		     , function ($stateProvider, $urlRouterProvider) {

		         $stateProvider
				 .state('StudentLeaveRequestList', { 
					 url: '/StudentLeaveRequestList'
					 , templateUrl: 'StudentLeaves/Web/Views/StudentLeaveRequestList.html'
					 , controller: 'StudentLeaveRequestListController'
				 })
				 .state('newStudentLeaveRequest', { 
					 url: '/newStudentLeaveRequest'
					 , templateUrl: 'StudentLeaves/Web/Views/NewStudentLeaveRequest.html'
					 , controller: 'StudentLeaveRequestController'
				 })
				 .state('editStudentLeaveRequest/:studentLeaveRequestKey', { 
					 url: '/editStudentLeaveRequest/:studentLeaveRequestKey'
					 , templateUrl: 'StudentLeaves/Web/Views/EditStudentLeaveRequest.html'
					 , controller: 'StudentLeaveRequestController'
				 })
				 .state('StudentLeaveReasonList', { 
					 url: '/StudentLeaveReasonList'
					 , templateUrl: 'StudentLeaves/Web/Views/StudentLeaveReasonList.html'
					 , controller: 'StudentLeaveReasonListController'
				 })
				 .state('newStudentLeaveReason', { 
					 url: '/newStudentLeaveReason'
					 , templateUrl: 'StudentLeaves/Web/Views/NewStudentLeaveReason.html'
					 , controller: 'StudentLeaveReasonController'
				 })
				 .state('editStudentLeaveReason/:studentLeaveReasonKey', { 
					 url: '/editStudentLeaveReason/:studentLeaveReasonKey'
					 , templateUrl: 'StudentLeaves/Web/Views/EditStudentLeaveReason.html'
					 , controller: 'StudentLeaveReasonController'
				 })
				 .state('StudentLeaveRequestModeList', { 
					 url: '/StudentLeaveRequestModeList'
					 , templateUrl: 'StudentLeaves/Web/Views/StudentLeaveRequestModeList.html'
					 , controller: 'StudentLeaveRequestModeListController'
				 })
				 .state('newStudentLeaveRequestMode', { 
					 url: '/newStudentLeaveRequestMode'
					 , templateUrl: 'StudentLeaves/Web/Views/NewStudentLeaveRequestMode.html'
					 , controller: 'StudentLeaveRequestModeController'
				 })
				 .state('editStudentLeaveRequestMode/:studentLeaveRequestModeKey', { 
					 url: '/editStudentLeaveRequestMode/:studentLeaveRequestModeKey'
					 , templateUrl: 'StudentLeaves/Web/Views/EditStudentLeaveRequestMode.html'
					 , controller: 'StudentLeaveRequestModeController'
				 })
				 .state('StudentLeaveRequestReceivedByList', { 
					 url: '/StudentLeaveRequestReceivedByList'
					 , templateUrl: 'StudentLeaves/Web/Views/StudentLeaveRequestReceivedByList.html'
					 , controller: 'StudentLeaveRequestReceivedByListController'
				 })
				 .state('newStudentLeaveRequestReceivedBy', { 
					 url: '/newStudentLeaveRequestReceivedBy'
					 , templateUrl: 'StudentLeaves/Web/Views/NewStudentLeaveRequestReceivedBy.html'
					 , controller: 'StudentLeaveRequestReceivedByController'
				 })
				 .state('editStudentLeaveRequestReceivedBy/:studentLeaveRequestReceivedByKey', { 
					 url: '/editStudentLeaveRequestReceivedBy/:studentLeaveRequestReceivedByKey'
					 , templateUrl: 'StudentLeaves/Web/Views/EditStudentLeaveRequestReceivedBy.html'
					 , controller: 'StudentLeaveRequestReceivedByController'
				 })
				 .state('appSetup', { 
					 url: '/appSetup'
					 , templateUrl: 'StudentLeaves/FirstTimeSetup/FirstTimeSetup.html'
					 , controller: 'AppSetupWebCtrl'
				 })
		 $urlRouterProvider.otherwise('/appSetup');
	 }]);
