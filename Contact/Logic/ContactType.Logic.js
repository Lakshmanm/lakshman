/*//=============================================================================
// All rights reserved to Thrill Innovative Labs.
// THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
// OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
// LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
// FITNESS FOR A PARTICULAR PURPOSE.
//=============================================================================
//*****************************************************************************
//* Name		    	: ContactType.Logic.js 
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

	 var app  = angular.module('ThrillContact.contactTypeLogic', ['ThrillFrameworkLibrary.DataService'
			 , 'ThrillContact.contactTypeQueries'
			 , 'ThrillContact.config'
			 , 'ThrillCnnWebClient.appConfig'
			 , 'ThrillFrameworkLibrary.appLogger'
	])
	 .factory('contactTypeLogic', function ($http,
		 dataService,
		 contactTypeQueries,
		 contactconfig,
		 appConfig,
		 appLogger) {

		 return {

			 addContactType: function (entityContactType) {
				 return dataService.insert(entityContactType, '`Contact.contactTypes`', contactconfig.OFFLINE_DBNAME, contactconfig.API_URL + 'ContactTypes').then(function (response) {
					 return response;
			 });
	 },

			 updateContactType: function (entityContactType, entityKey) {
				 return dataService.update(entityContactType, 'contactTypeKey="' + entityKey + '"', '`Contact.contactTypes`', contactconfig.OFFLINE_DBNAME, contactconfig.API_URL + 'ContactTypes/' + entityKey).then(function (response) {
				 console.log(response);
				 return response;
			 });
	 },


			 deleteContactType: function (entityKey) {
			 	
				 return dataService.delete('contactTypeKey="' + entityKey + '"', '`Contact.contactTypes`', contactconfig.OFFLINE_DBNAME, contactconfig.API_URL + 'Contact/contactTypes/' + entityKey).then(function (response) {
				 console.log(config.API_URL + 'Contact/contactTypes/' + entityKey)
				 return response;
			 });
			
	 },


		 getContactTypeByContactTypeKey: function (entityKey) {
			 var query = contactTypeQueries.getContactTypeByContactTypeKey + "'" + entityKey + "'";
			
			 if (appConfig.APP_MODE == 'offline') {
				 return dataService.executeQuery(query, contactconfig.OFFLINE_DBNAME).then(function (response) {
				 var contactTypeList = [];
				 for (var i = 0; i < response.rows.length; i++) {
				 	
					 var tempEntityContactType = {
						 contactTypeKey: response.rows.item(i).contactTypeKey,
						 contactTypeTitle: response.rows.item(i).contactTypeTitle,
					 };
						 contactTypeList.push(tempEntityContactType);
				 } // end of for loop
				 return contactTypeList;
				});
			} else {
				 return dataService.callAPI(config.API_URL + 'Contact/contactTypes/' + entityKey, [], 'GET').then(function (response) {
					 return response.data;
						});
				}
		}, // end of get method


		 getAllContactTypes: function () {
			 var query = contactTypeQueries.getAllContactTypes;
			 if (appConfig.APP_MODE == 'offline') {
				 return dataService.executeQuery(query, contactconfig.OFFLINE_DBNAME).then(function (response) {
				 var contactTypeList = [];
				 for (var i = 0; i < response.rows.length; i++) {
				 
					 var tempEntityContactType = {
						 contactTypeKey: response.rows.item(i).contactTypeKey,
						 contactTypeTitle: response.rows.item(i).contactTypeTitle,
					 };
						 contactTypeList.push(tempEntityContactType);
				 } // end of for loop
				 return contactTypeList;
				});
			} else {
				 return dataService.callAPI(config.API_URL + 'ContactTypes', [], 'GET').then(function (response) {
					 return response.data;
						});
				}
		} // end of get method


	} // end of factory
}); // end of module

