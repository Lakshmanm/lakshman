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

	 var ThrillContact = angular.module('ThrillContact', ['ui.router',  
		  'ThrillContact.contact',
		  'ThrillContact.contactList',
		  'ThrillContact.contactContactItem',
		  'ThrillContact.contactContactItemList',
		  'ThrillContact.contactType',
		  'ThrillContact.contactTypeList',
		 'ThrillFrameworkLibrary.appLogger', 
		 'ThrillContact.webSetup']);

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


	ThrillContact.config(['$stateProvider', '$urlRouterProvider'
		     , function ($stateProvider, $urlRouterProvider) {
		     	console.log("stateProvider")
		         $stateProvider
				 .state('ContactList', { 
					 url: '/ContactList'
					 , templateUrl: 'Contact/Web/Views/ContactList.html'
					 , controller: 'ContactListController'
				 })
				 .state('newContact', { 
					 url: '/newContact'
					 , templateUrl: 'Contact/Web/Views/NewContact.html'
					 , controller: 'ContactController'
				 })
				 .state('editContact/:contactKey', { 
					 url: '/editContact/:contactKey'
					 , templateUrl: 'Contact/Web/Views/EditContact.html'
					 , controller: 'ContactController'
				 })
				 .state('contactContactItemList', { 
					 url: '/contactContactItemList'
					 , templateUrl: 'Contact/Web/Views/ContactItemList.html'
					 , controller: 'ContactContactItemListController'
				 })
				 .state('newContactContactItem', { 
					 url: '/newContactContactItem'
					 , templateUrl: 'Contact/Web/Views/NewContactItem.html'
					 , controller: 'ContactContactItemController'
				 })
				 .state('editContactItem', { 
					 url: '/editContactItem/:contactItemKey'
					 , templateUrl: 'Contact/Web/Views/EditContactItem.html'
					 , controller: 'ContactContactItemController'
				 })
				 .state('ContactTypeList', { 
					 url: '/ContactTypeList'
					 , templateUrl: 'Contact/Web/Views/ContactTypeList.html'
					 , controller: 'ContactTypeListController'
				 })
				 .state('newContactType', { 
					 url: '/newContactType'
					 , templateUrl: 'Contact/Web/Views/NewContactType.html'
					 , controller: 'ContactTypeController'
				 })
				 .state('editContactType/:contactTypeKey', { 
					 url: '/editContactType/:contactTypeKey'
					 , templateUrl: 'Contact/Web/Views/EditContactType.html'
					 , controller: 'ContactTypeController'
				 })
				 .state('appSetup', { 
					 url: '/appSetup'
					 , templateUrl: 'Contact/FirstTimeSetup/FirstTimeSetup.html'
					 , controller: 'AppSetupWebCtrl'
				 })
		 $urlRouterProvider.otherwise('/appSetup');
	 }]);
