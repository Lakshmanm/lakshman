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

	 var ThrillStudentLeaves = angular.module('ThrillStudentLeaves', ['ionic', 'ngCordova', 
		 'ThrillStudentLeaves.studentLeaveRequestMenu',
		 'ThrillStudentLeaves.studentLeaveRequest',
		 'ThrillStudentLeaves.studentLeaveRequestList',
		 'ThrillStudentLeaves.studentLeaveReasonMenu',
		 'ThrillStudentLeaves.studentLeaveReason',
		 'ThrillStudentLeaves.studentLeaveReasonList',
		 'ThrillStudentLeaves.studentLeaveRequestModeMenu',
		 'ThrillStudentLeaves.studentLeaveRequestMode',
		 'ThrillStudentLeaves.studentLeaveRequestModeList',
		 'ThrillStudentLeaves.studentLeaveRequestReceivedByMenu',
		 'ThrillStudentLeaves.studentLeaveRequestReceivedBy',
		 'ThrillStudentLeaves.studentLeaveRequestReceivedByList',
		 'ThrillFrameworkLibrary.appLogger', 
		 'ThrillStudentLeaves.mobileSetup',
		 'ThrillStudentLeaves.dirPagination'
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

/*Mobile*/
ThrillArchSample.run(function ($ionicPlatform) {
		 $ionicPlatform.ready(function () {
		 // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
		 // for form inputs)
		 if (window.cordova && window.cordova.plugins.Keyboard) {
			 cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
			 cordova.plugins.Keyboard.disableScroll(true);
		} 
		 if (window.StatusBar) {
			 StatusBar.styleDefault();
}
});
});
	ThrillStudentLeaves.config(['$stateProvider', '$urlRouterProvider'
		     , function ($stateProvider, $urlRouterProvider) {

		         $stateProvider
				 .state('app', { 
					 url: '/app',
					 , templateUrl: 'StudentLeaves/Mobile/Views/Menu.html'
					 , controller: 'StudentLeaveRequestMenuController'
				 })
				 .state('app.studentLeaveRequestList', { 
					 url: '/studentLeaveRequestList'
					 views : {
						 'menuContent': {
								 templateUrl: 'StudentLeaves/Mobile/Views/StudentLeaveRequestList.html',
								 controller: 'StudentLeaveRequestListController'
						 }
					 }
				 })
				 .state('app.newStudentLeaveRequest', { 
					 url: '/newStudentLeaveRequest'
					 views : {
						 'menuContent': {
								 templateUrl: 'StudentLeaves/Mobile/Views/NewStudentLeaveRequest.html',
								 controller: 'StudentLeaveRequestController'
						 }
					 }
				 })
				 .state('app.editStudentLeaveRequest', { 
					 url: '/editStudentLeaveRequest/:studentLeaveRequestKey'
					 views : {
						 'menuContent': {
								 templateUrl: 'StudentLeaves/Mobile/Views/EditStudentLeaveRequest.html',
								 controller: 'StudentLeaveRequestController'
						 }
					 }
				 })
				 .state('app', { 
					 url: '/app',
					 , templateUrl: 'StudentLeaves/Mobile/Views/Menu.html'
					 , controller: 'StudentLeaveReasonMenuController'
				 })
				 .state('app.studentLeaveReasonList', { 
					 url: '/studentLeaveReasonList'
					 views : {
						 'menuContent': {
								 templateUrl: 'StudentLeaves/Mobile/Views/StudentLeaveReasonList.html',
								 controller: 'StudentLeaveReasonListController'
						 }
					 }
				 })
				 .state('app.newStudentLeaveReason', { 
					 url: '/newStudentLeaveReason'
					 views : {
						 'menuContent': {
								 templateUrl: 'StudentLeaves/Mobile/Views/NewStudentLeaveReason.html',
								 controller: 'StudentLeaveReasonController'
						 }
					 }
				 })
				 .state('app.editStudentLeaveReason', { 
					 url: '/editStudentLeaveReason/:studentLeaveReasonKey'
					 views : {
						 'menuContent': {
								 templateUrl: 'StudentLeaves/Mobile/Views/EditStudentLeaveReason.html',
								 controller: 'StudentLeaveReasonController'
						 }
					 }
				 })
				 .state('app', { 
					 url: '/app',
					 , templateUrl: 'StudentLeaves/Mobile/Views/Menu.html'
					 , controller: 'StudentLeaveRequestModeMenuController'
				 })
				 .state('app.studentLeaveRequestModeList', { 
					 url: '/studentLeaveRequestModeList'
					 views : {
						 'menuContent': {
								 templateUrl: 'StudentLeaves/Mobile/Views/StudentLeaveRequestModeList.html',
								 controller: 'StudentLeaveRequestModeListController'
						 }
					 }
				 })
				 .state('app.newStudentLeaveRequestMode', { 
					 url: '/newStudentLeaveRequestMode'
					 views : {
						 'menuContent': {
								 templateUrl: 'StudentLeaves/Mobile/Views/NewStudentLeaveRequestMode.html',
								 controller: 'StudentLeaveRequestModeController'
						 }
					 }
				 })
				 .state('app.editStudentLeaveRequestMode', { 
					 url: '/editStudentLeaveRequestMode/:studentLeaveRequestModeKey'
					 views : {
						 'menuContent': {
								 templateUrl: 'StudentLeaves/Mobile/Views/EditStudentLeaveRequestMode.html',
								 controller: 'StudentLeaveRequestModeController'
						 }
					 }
				 })
				 .state('app', { 
					 url: '/app',
					 , templateUrl: 'StudentLeaves/Mobile/Views/Menu.html'
					 , controller: 'StudentLeaveRequestReceivedByMenuController'
				 })
				 .state('app.studentLeaveRequestReceivedByList', { 
					 url: '/studentLeaveRequestReceivedByList'
					 views : {
						 'menuContent': {
								 templateUrl: 'StudentLeaves/Mobile/Views/StudentLeaveRequestReceivedByList.html',
								 controller: 'StudentLeaveRequestReceivedByListController'
						 }
					 }
				 })
				 .state('app.newStudentLeaveRequestReceivedBy', { 
					 url: '/newStudentLeaveRequestReceivedBy'
					 views : {
						 'menuContent': {
								 templateUrl: 'StudentLeaves/Mobile/Views/NewStudentLeaveRequestReceivedBy.html',
								 controller: 'StudentLeaveRequestReceivedByController'
						 }
					 }
				 })
				 .state('app.editStudentLeaveRequestReceivedBy', { 
					 url: '/editStudentLeaveRequestReceivedBy/:studentLeaveRequestReceivedByKey'
					 views : {
						 'menuContent': {
								 templateUrl: 'StudentLeaves/Mobile/Views/EditStudentLeaveRequestReceivedBy.html',
								 controller: 'StudentLeaveRequestReceivedByController'
						 }
					 }
				 })
				 .state('appSetup', { 
					 url: '/appSetup'
					 , templateUrl: 'StudentLeaves/FirstTimeSetup/FirstTimeSetup.html'
					 , controller: 'AppSetupMobCtrl'
				 })
		 $urlRouterProvider.otherwise('/appSetup');
	 }]);
