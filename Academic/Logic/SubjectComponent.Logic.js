/*//=============================================================================
// All rights reserved to Thrill Innovative Labs.
// THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
// OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
// LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
// FITNESS FOR A PARTICULAR PURPOSE.
//=============================================================================
//*****************************************************************************
//* Name		    	: SubjectComponent.Logic.js 
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

	 var app  = angular.module('ThrillAcademic.subjectComponentLogic', ['ThrillFrameworkLibrary.DataService'
			 , 'ThrillAcademic.subjectComponentQueries'
			 , 'ThrillAcademic.config'
			 , 'ThrillCnnWebClient.appConfig'
			 , 'ThrillFrameworkLibrary.appLogger'
	])
	 .factory('subjectComponentLogic', function ($http,
		 dataService,
		 subjectComponentQueries,
		 config,
		 appConfig,
		 appLogger) {

		 return {

			 addSubjectComponent: function (entitySubjectComponent) {
				 return dataService.insert(entitySubjectComponent, '`Academic.subjectComponents`', config.OFFLINE_DBNAME, config.API_URL + 'Academic/SubjectComponents').then(function (response) {
					 return response;
			 });
	 },

			 updateSubjectComponent: function (entitySubjectComponent, entityKey) {
				 return dataService.update(entitySubjectComponent, 'subjectComponentKey="' + entityKey + '"', '`Academic.subjectComponents`', config.OFFLINE_DBNAME, config.API_URL + 'Academic/SubjectComponents/' + entityKey).then(function (response) {
				 return response;
			 });
	 },


			 deleteSubjectComponent: function (entityKey) {
				 return dataService.delete('subjectComponentKey="' + entityKey + '"', '`Academic.subjectComponents`', config.OFFLINE_DBNAME, config.API_URL + 'Academic/SubjectComponents/' + entityKey).then(function (response) {
				 return response;
			 });
	 },


		 getSubjectComponentBySubjectComponentKey: function (entityKey) {
			 var query = subjectComponentQueries.getSubjectComponentBySubjectComponentKey + "'" + entityKey + "'";
			 if (appConfig.APP_MODE == 'offline') {
				 return dataService.executeQuery(query, config.OFFLINE_DBNAME).then(function (response) {
				 var subjectComponentList = [];
				 for (var i = 0; i < response.rows.length; i++) {
					 var tempEntitySubjectComponent = {
						 subjectcomponentkey: response.rows.item(i).subjectComponentKey,
						 subjectcomponenttitle: response.rows.item(i).subjectComponentTitle,
						 subjectkey: response.rows.item(i).subjectKey,
						 examinationtypekey: response.rows.item(i).examinationTypeKey,
						 minimumsubjects: response.rows.item(i).minimumSubjects,
						 maximumsubjects: response.rows.item(i).maximumSubjects,
					 };
						 subjectComponentList.push(tempEntitySubjectComponent);
				 } // end of for loop
				 return subjectComponentList;
				});
			} else {
				 return dataService.callAPI(config.API_URL + 'Academic/SubjectComponents/' + entityKey, [], 'GET').then(function (response) {
					 return response.data;
						});
				}
		}, // end of get method


		 getAllSubjectComponents: function (instanceOrganizationKey) {
			 var query = subjectComponentQueries.getAllSubjectComponents;
			 if (appConfig.APP_MODE == 'offline') {
				 return dataService.executeQuery(query, config.OFFLINE_DBNAME).then(function (response) {
				 var subjectComponentList = [];
				 for (var i = 0; i < response.rows.length; i++) {
					 var tempEntitySubjectComponent = {
						 subjectcomponentkey: response.rows.item(i).subjectComponentKey,
						 subjectcomponenttitle: response.rows.item(i).subjectComponentTitle,
						 subjectKey: response.rows.item(i).subjectKey,
						 examinationTypeKey: response.rows.item(i).examinationTypeKey,
						 minimumsubjects: response.rows.item(i).minimumSubjects,
						 maximumsubjects: response.rows.item(i).maximumSubjects,
					 };
						 subjectComponentList.push(tempEntitySubjectComponent);
				 } // end of for loop
				 return subjectComponentList;
				});
			} else {
				 return dataService.callAPI(config.API_URL + 'Academic/Organizations/'+instanceOrganizationKey+'/SubjectComponents', [], 'GET').then(function (response) {
					 return response.data;
						});
				}
		} // end of get method


	} // end of factory
}); // end of module

