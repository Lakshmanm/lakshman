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

	 var ThrillContact = angular.module('ThrillContact', ['ionic', 'ngCordova', 
		 /*'ThrillContact.contactMenu',*/
		 'ThrillContact.contact',
		 'ThrillContact.contactList',
		 'ThrillContact.contactContactItem',
		 'ThrillContact.contactContactItemList',
		/* 'ThrillContact.contactTypeMenu',*/
		 'ThrillContact.contactType',
		 'ThrillContact.contactTypeList',
		 'ThrillFrameworkLibrary.appLogger', 
		 'ThrillContact.mobileSetup'
		 /*'ThrillContact.dirPagination'*/
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
ThrillContact.run(function ($ionicPlatform) {
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


	ThrillContact.config(['$stateProvider', '$urlRouterProvider'
   , function ($stateProvider, $urlRouterProvider) {
		     	console.log("stateProvider")
		         $stateProvider
				 .state('ContactList', { 
					 url: '/ContactList'
					 , templateUrl: 'Contact/Mobile/Views/ContactList.html'
					 , controller: 'ContactListController'
				 })
				 .state('newContact', { 
					 url: '/newContact'
					 , templateUrl: 'Contact/Mobile/Views/NewContact.html'
					 , controller: 'ContactController'
				 })
				 .state('editContact/:contactKey', { 
					 url: '/editContact/:contactKey'
					 , templateUrl: 'Contact/Mobile/Views/EditContact.html'
					 , controller: 'ContactController'
				 })
				 .state('contactContactItemList', { 
					 url: '/contactContactItemList'
					 , templateUrl: 'Contact/Mobile/Views/ContactItemList.html'
					 , controller: 'ContactContactItemListController'
				 })
				 .state('newContactContactItem', { 
					 url: '/newContactContactItem'
					 , templateUrl: 'Contact/Mobile/Views/NewContactItem.html'
					 , controller: 'ContactContactItemController'
				 })
				 .state('editContactItem', { 
					 url: '/editContactItem/:contactItemKey'
					 , templateUrl: 'Contact/Mobile/Views/EditContactItem.html'
					 , controller: 'ContactContactItemController'
				 })
				 .state('ContactTypeList', { 
					 url: '/ContactTypeList'
					 , templateUrl: 'Contact/Mobile/Views/ContactTypeList.html'
					 , controller: 'ContactTypeListController'
				 })
				 .state('newContactType', { 
					 url: '/newContactType'
					 , templateUrl: 'Contact/Mobile/Views/NewContactType.html'
					 , controller: 'ContactTypeController'
				 })
				 .state('editContactType/:contactTypeKey', { 
					 url: '/editContactType/:contactTypeKey'
					 , templateUrl: 'Contact/Mobile/Views/EditContactType.html'
					 , controller: 'ContactTypeController'
				 })
				 .state('appSetup', { 
					 url: '/appSetup'
					 , templateUrl: 'Contact/FirstTimeSetup/FirstTimeSetup.html'
					 , controller: 'AppSetupMobCtrl'
				 })
				 	 $urlRouterProvider.otherwise('/appSetup');
	 }]);

/*
	ThrillContact.config(['$stateProvider', '$urlRouterProvider'
		     , function ($stateProvider, $urlRouterProvider) {

		         $stateProvider
				 .state('app', { 
					 url: '/app'
					 , templateUrl: 'Contact/Mobile/Views/Menu.html'
					 , controller: 'ContactMenuController'
				 })
				 .state('app.contactList', { 
					 url: '/contactList'
					 views : {
						 'menuContent': {
								 templateUrl: 'Contact/Mobile/Views/ContactList.html',
								 controller: 'ContactListController'
						 }
					 }
				 })
				 .state('app.newContact', { 
					 url: '/newContact'
					 views : {
						 'menuContent': {
								 templateUrl: 'Contact/Mobile/Views/NewContact.html',
								 controller: 'ContactController'
						 }
					 }
				 })
				 .state('app.editContact', { 
					 url: '/editContact/:contactKey'
					 views : {
						 'menuContent': {
								 templateUrl: 'Contact/Mobile/Views/EditContact.html',
								 controller: 'ContactController'
						 }
					 }
				 })
				 .state('app.contactContactItemList', { 
					 url: '/contactContactItemList'
					 views : {
						 'menuContent': {
								 templateUrl: 'Contact/Mobile/Views/ContactContactItemList.html',
								 controller: 'ContactContactItemListController'
						 }
					 }
				 })
				 .state('app.newContactContactItem', { 
					 url: '/newContactContactItem'
					 views : {
						 'menuContent': {
								 templateUrl: 'Contact/Mobile/Views/NewContactContactItem.html',
								 controller: 'ContactContactItemController'
						 }
					 }
				 })
				 .state('app.editContactContactItem', { 
					 url: '/editContactContactItem/:contactItemKey'
					 views : {
						 'menuContent': {
								 templateUrl: 'Contact/Mobile/Views/EditContactContactItem.html',
								 controller: 'ContactContactItemController'
						 }
					 }
				 })
				 .state('app', { 
					 url: '/app',
					 , templateUrl: 'Contact/Mobile/Views/Menu.html'
					 , controller: 'ContactTypeMenuController'
				 })
				 .state('app.contactTypeList', { 
					 url: '/contactTypeList'
					 views : {
						 'menuContent': {
								 templateUrl: 'Contact/Mobile/Views/ContactTypeList.html',
								 controller: 'ContactTypeListController'
						 }
					 }
				 })
				 .state('app.newContactType', { 
					 url: '/newContactType'
					 views : {
						 'menuContent': {
								 templateUrl: 'Contact/Mobile/Views/NewContactType.html',
								 controller: 'ContactTypeController'
						 }
					 }
				 })
				 .state('app.editContactType', { 
					 url: '/editContactType/:contactTypeKey'
					 views : {
						 'menuContent': {
								 templateUrl: 'Contact/Mobile/Views/EditContactType.html',
								 controller: 'ContactTypeController'
						 }
					 }
				 })
				 .state('appSetup', { 
					 url: '/appSetup'
					 , templateUrl: 'Contact/FirstTimeSetup/FirstTimeSetup.html'
					 , controller: 'AppSetupMobCtrl'
				 })
		 $urlRouterProvider.otherwise('/appSetup');
	 }]);
*/