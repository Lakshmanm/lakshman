/*//=============================================================================
// All rights reserved to Thrill Innovative Labs.
// THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
// OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
// LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
// FITNESS FOR A PARTICULAR PURPOSE.
//=============================================================================
//*****************************************************************************
//* Name		    	: ExamSchedule.Logic.js 
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

	 var app  = angular.module('ThrillAcademic.examScheduleLogic', ['ThrillFrameworkLibrary.DataService'
			 , 'ThrillAcademic.examScheduleQueries'
			 , 'ThrillAcademic.config'
			 , 'ThrillCnnWebClient.appConfig'
			 , 'ThrillFrameworkLibrary.appLogger'
	])
	 .factory('examScheduleLogic', function ($http,
		 dataService,
		 examScheduleQueries,
		 config,
		 appConfig,
		 appLogger) {

		 return {

			 addExamSchedule: function (entityExamSchedule) {
				 return dataService.insert(entityExamSchedule, '`Academic.examSchedules`', config.OFFLINE_DBNAME, config.API_URL + 'Academic/ExamSchedules').then(function (response) {
					 return response;
			 });
	 },

			 updateExamSchedule: function (entityExamSchedule, entityKey) {
				 return dataService.update(entityExamSchedule, 'ExamScheduleKey="' + entityKey + '"', '`Academic.examSchedules`', config.OFFLINE_DBNAME, config.API_URL + 'Academic/ExamSchedules/' + entityKey).then(function (response) {
				 return response;
			 });
	 },


			 deleteExamSchedule: function (entityKey) {
				 return dataService.delete('ExamScheduleKey="' + entityKey + '"', '`Academic.examSchedules`', config.OFFLINE_DBNAME, config.API_URL + 'Academic/ExamSchedules/' + entityKey).then(function (response) {
				 return response;
			 });
	 },


		 getExamScheduleByExamScheduleKey: function (examScheduleKey) {
			 var query = examScheduleQueries.getExamScheduleByExamScheduleKey + "'" + examScheduleKey + "'";
			 if (appConfig.APP_MODE == 'offline') {
				 return dataService.executeQuery(query, config.OFFLINE_DBNAME).then(function (response) {
				 var examScheduleList = [];
				 for (var i = 0; i < response.rows.length; i++) {
					 var tempEntityExamSchedule = {
						 examschedulekey: response.rows.item(i).examScheduleKey,
						 subjectkey: response.rows.item(i).subjectKey,
						 examinationkey: response.rows.item(i).examinationKey,
						 examinationdate: response.rows.item(i).examinationDate,
						 startdate: response.rows.item(i).startDate,
						 enddate: response.rows.item(i).endDate,
						 termkey: response.rows.item(i).termKey,
						 instanceorganizationkey: response.rows.item(i).instanceOrganizationKey,
					 };
						 examScheduleList.push(tempEntityExamSchedule);
				 } // end of for loop
				 return examScheduleList;
				});
			} else {
				 return dataService.callAPI(config.API_URL + 'Academic/ExamSchedules/' + examScheduleKey, [], 'GET').then(function (response) {
					 return response.data;
						});
				}
		}, // end of get method


		 getAllExamSchedules: function (organizationKey) {
			 var query = examScheduleQueries.getAllExamSchedules;
			 if (appConfig.APP_MODE == 'offline') {
				 return dataService.executeQuery(query, config.OFFLINE_DBNAME).then(function (response) {
				 var examScheduleList = [];
				 for (var i = 0; i < response.rows.length; i++) {
					 var tempEntityExamSchedule = {
						 examschedulekey: response.rows.item(i).examScheduleKey,
						 subjectKey: response.rows.item(i).subjectKey,
						 examinationKey: response.rows.item(i).examinationKey,
						 examinationdate:new Date(response.rows.item(i).examinationDate),
						 startdate: new Date(response.rows.item(i).startDate),
						 enddate: new Date(response.rows.item(i).endDate),
						 termKey: response.rows.item(i).termKey,
						 instanceOrganizationKey: response.rows.item(i).instanceOrganizationKey,
					 };
						 examScheduleList.push(tempEntityExamSchedule);
				 } // end of for loop
				 return examScheduleList;
				});
			} else {
				 return dataService.callAPI(config.API_URL + 'Academic/Organizations/'+organizationKey+'/examSchedules', [], 'GET').then(function (response) {
					 return response.data;
						});
				}
		} // end of get method


		



	} // end of factory
}); // end of module

