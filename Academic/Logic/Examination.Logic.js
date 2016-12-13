/*//=============================================================================
// All rights reserved to Thrill Innovative Labs.
// THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
// OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
// LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
// FITNESS FOR A PARTICULAR PURPOSE.
//=============================================================================
//*****************************************************************************
//* Name		    	: Examination.Logic.js 
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

	 var app  = angular.module('ThrillAcademic.examinationLogic', ['ThrillFrameworkLibrary.DataService'
			 , 'ThrillAcademic.examinationQueries'
			 , 'ThrillAcademic.config'
			 , 'ThrillCnnWebClient.appConfig'
			 , 'ThrillFrameworkLibrary.appLogger'
	])
	 .factory('examinationLogic', function ($http,
		 dataService,
		 examinationQueries,
		 config,
		 appConfig,
		 appLogger) {

		 return {

			 addExamination: function (entityExamination) {
				 return dataService.insert(entityExamination, '`Academic.examinations`', config.OFFLINE_DBNAME, config.API_URL + 'Academic/Examinations').then(function (response) {
					 return response;
			 });
	 },

			 updateExamination: function (entityExamination, entityKey) {
				 return dataService.update(entityExamination, 'examinationKey="' + entityKey + '"', '`Academic.examinations`', config.OFFLINE_DBNAME, config.API_URL + 'Academic/Examinations/' + entityKey).then(function (response) {
				 return response;
			 });
	 },


			 deleteExamination: function (entityKey) {
				 return dataService.delete('examinationKey="' + entityKey + '"', '`Academic.examinations`', config.OFFLINE_DBNAME, config.API_URL + 'Academic/Examinations/' + entityKey).then(function (response) {
				 return response;
			 });
	 },


		 getExaminationByExaminationKey: function (entityKey) {
			 var query = examinationQueries.getExaminationByExaminationKey + "'" + entityKey + "'";
			 if (appConfig.APP_MODE == 'offline') {
				 return dataService.executeQuery(query, config.OFFLINE_DBNAME).then(function (response) {
				 var examinationList = [];
				 for (var i = 0; i < response.rows.length; i++) {
					 var tempEntityExamination = {
						 examinationkey: response.rows.item(i).examinationKey,
						 examinationtitle: response.rows.item(i).examinationTitle,
						 instanceorganizationkey: response.rows.item(i).instanceOrganizationKey,
						 examinationtypekey: response.rows.item(i).examinationTypeKey,
					 };
						 examinationList.push(tempEntityExamination);
				 } // end of for loop
				 return examinationList;
				});
			} else {
				 return dataService.callAPI(config.API_URL + 'Academic/Examinations/' + entityKey, [], 'GET').then(function (response) {
					 return response.data;
						});
				}
		}, // end of get method


		 getAllExaminations: function (organizationKey) {
			 var query = examinationQueries.getAllExaminations;
			 if (appConfig.APP_MODE == 'offline') {
				 return dataService.executeQuery(query, config.OFFLINE_DBNAME).then(function (response) {
				 var examinationList = [];
				 for (var i = 0; i < response.rows.length; i++) {
					 var tempEntityExamination = {
						 examinationkey: response.rows.item(i).examinationKey,
						 examinationtitle: response.rows.item(i).examinationTitle,
						 instanceOrganizationKey: response.rows.item(i).instanceOrganizationKey,
						 examinationTypeKey: response.rows.item(i).examinationTypeKey,
					 };
						 examinationList.push(tempEntityExamination);
				 } // end of for loop
				 return examinationList;
				});
			} else {
				 return dataService.callAPI(config.API_URL + 'Academic/Organization/'+organizationKey+'/Examinations', [], 'GET').then(function (response) {
					 return response.data;
						});
				}
		} ,// end of get method
             
getExaminationByExaminationTypeKey:function(examinationTypeKey)
             {
                  var query = examinationQueries.getExaminationByExaminationTypeKey + "'" + examinationTypeKey + "'";
			 if (appConfig.APP_MODE == 'offline') {
				 return dataService.executeQuery(query, config.OFFLINE_DBNAME).then(function (response) {
				 var examinationList = [];
				 for (var i = 0; i < response.rows.length; i++) {
					 var tempEntityExamination = {
						 examinationkey: response.rows.item(i).examinationKey,
						 examinationtitle: response.rows.item(i).examinationTitle,
						 instanceorganizationkey: response.rows.item(i).instanceOrganizationKey,
						 examinationtypekey: response.rows.item(i).examinationTypeKey,
					 };
						 examinationList.push(tempEntityExamination);
				 } // end of for loop
				 return examinationList;
				});
			} else {
				 return dataService.callAPI(config.API_URL + 'Academic/ExaminationType/' + examinationTypeKey+'/Examinations', [], 'GET').then(function (response) {
					 return response.data;
						});
				}
           
         }

	} // end of factory
}); // end of module

