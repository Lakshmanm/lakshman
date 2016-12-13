/*//=============================================================================
// All rights reserved to Thrill Innovative Labs.
// THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
// OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
// LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
// FITNESS FOR A PARTICULAR PURPOSE.
//=============================================================================
//*****************************************************************************
//* Name		    	: ExaminationType.Logic.js 
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

	 var app  = angular.module('ThrillAcademic.examinationTypeLogic', ['ThrillFrameworkLibrary.DataService'
			 , 'ThrillAcademic.examinationTypeQueries'
			 , 'ThrillAcademic.config'
			 , 'ThrillCnnWebClient.appConfig'
			 , 'ThrillFrameworkLibrary.appLogger'
	])
	 .factory('examinationTypeLogic', function ($http,
		 dataService,
		 examinationTypeQueries,
		 config,
		 appConfig,
		 appLogger) {

		 return {

			 addExaminationType: function (entityExaminationType) {
				 return dataService.insert(entityExaminationType, '`Academic.examinationTypes`', config.OFFLINE_DBNAME, config.API_URL + 'Academic/ExaminationTypes').then(function (response) {
					 return response;
			 });
	 },

			 updateExaminationType: function (entityExaminationType, entityKey) {
				 return dataService.update(entityExaminationType, 'examinationTypeKey="' + entityKey + '"', '`Academic.examinationTypes`', config.OFFLINE_DBNAME, config.API_URL + 'Academic/ExaminationTypes/' + entityKey).then(function (response) {
				 return response;
			 });
	 },


			 deleteExaminationType: function (entityKey) {
				 return dataService.delete('examinationTypeKey="' + entityKey + '"', '`Academic.examinationTypes`', config.OFFLINE_DBNAME, config.API_URL + 'Academic/ExaminationTypes/' + entityKey).then(function (response) {
				 return response;
			 });
	 },


		 getExaminationTypeByExaminationTypeKey: function (entityKey) {
			 var query = examinationTypeQueries.getExaminationTypeByExaminationTypeKey + "'" + entityKey + "'";
			 if (appConfig.APP_MODE == 'offline') {
				 return dataService.executeQuery(query, config.OFFLINE_DBNAME).then(function (response) {
				 var examinationTypeList = [];
				 for (var i = 0; i < response.rows.length; i++) {
					 var tempEntityExaminationType = {
						 examinationtypekey: response.rows.item(i).examinationTypeKey,
						 examinationtypetitle: response.rows.item(i).examinationTypeTitle,
						 instanceorganizationkey: response.rows.item(i).instanceOrganizationKey,
						 examinationlevelkey: response.rows.item(i).examinationLevelKey,
					 };
						 examinationTypeList.push(tempEntityExaminationType);
				 } // end of for loop
				 return examinationTypeList;
				});
			} else {
				 return dataService.callAPI(config.API_URL + 'Academic/ExaminationTypes/' + entityKey, [], 'GET').then(function (response) {
					 return response.data;
						});
				}
		}, // end of get method


		 getAllExaminationTypes: function (organizationKey) {
           
			 var query = examinationTypeQueries.getAllExaminationTypes;
			 if (appConfig.APP_MODE == 'offline') {
				 return dataService.executeQuery(query, config.OFFLINE_DBNAME).then(function (response) {
				 
				 var examinationTypeList = [];

				 for (var i = 0; i < response.rows.length; i++) {
					 var tempEntityExaminationType = {
						 examinationtypekey: response.rows.item(i).examinationTypeKey,
						 examinationtypetitle: response.rows.item(i).examinationTypeTitle,
						 instanceOrganizationKey: response.rows.item(i).instanceOrganizationKey,
						 examinationLevelKey: response.rows.item(i).examinationLevelKey,
					 };
						 examinationTypeList.push(tempEntityExaminationType);
				 } // end of for loop
				 return examinationTypeList;
				});
			} else {
				 return dataService.callAPI(config.API_URL + 'Academic/Organization/' + organizationKey+ '/ExaminationTypes', [], 'GET').then(function (response) {
					 return response.data;
						});
				}
		} // end of get method


	} // end of factory
}); // end of module

