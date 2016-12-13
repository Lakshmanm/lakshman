/*//=============================================================================
// All rights reserved to Thrill Innovative Labs.
// THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
// OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
// LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
// FITNESS FOR A PARTICULAR PURPOSE.
//=============================================================================
//*****************************************************************************
//* Name		    	: StudentLeaveReason.Logic.js 
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

	 var app  = angular.module('ThrillStudentLeaves.studentLeaveReasonLogic', ['ThrillFrameworkLibrary.DataService'
			 , 'ThrillStudentLeaves.studentLeaveReasonQueries'
			 , 'ThrillStudentLeaves.config'
			 , 'ThrillCnnWebClient.appConfig'
			 , 'ThrillFrameworkLibrary.appLogger'
	])
	 .factory('studentLeaveReasonLogic', function ($http,
		 dataService,
		 studentLeaveReasonQueries,
		 config,
		 appConfig,
		 appLogger) {

		 return {

			 addStudentLeaveReason: function (entityStudentLeaveReason) {
				 return dataService.insert(entityStudentLeaveReason, '`StudentLeaves.studentLeaveReasons`', config.OFFLINE_DBNAME, config.API_URL + 'StudentLeaves/studentLeaveReasons').then(function (response) {
					 return response;
			 });
	 },

			 updateStudentLeaveReason: function (entityStudentLeaveReason, entityKey) {
				 return dataService.update(entityStudentLeaveReason, 'studentLeaveReasonKey="' + entityKey + '"', '`StudentLeaves.studentLeaveReasons`', config.OFFLINE_DBNAME, config.API_URL + 'StudentLeaves/studentLeaveReasons/' + entityKey).then(function (response) {
				 return response;
			 });
	 },


			 deleteStudentLeaveReason: function (entityKey) {
				 return dataService.delete('studentLeaveReasonKey="' + entityKey + '"', '`StudentLeaves.studentLeaveReasons`', config.OFFLINE_DBNAME, config.API_URL + 'StudentLeaves/studentLeaveReasons/' + entityKey).then(function (response) {
				 return response;
			 });
	 },


		 getStudentLeaveReasonByStudentLeaveReasonKey: function (entityKey) {
			 var query = studentLeaveReasonQueries.getStudentLeaveReasonByStudentLeaveReasonKey + "'" + entityKey + "'";
			 if (appConfig.APP_MODE == 'offline') {
				 return dataService.executeQuery(query, config.OFFLINE_DBNAME).then(function (response) {
				 var studentLeaveReasonList = [];
				 for (var i = 0; i < response.rows.length; i++) {
					 var tempEntityStudentLeaveReason = {
						 studentLeaveReasonKey: response.rows.item(i).studentLeaveReasonKey,
						 studentLeaveReasonTitle: response.rows.item(i).studentLeaveReasonTitle,
						 instanceOrganizationKey: response.rows.item(i).instanceOrganizationKey,
					 };
						 studentLeaveReasonList.push(tempEntityStudentLeaveReason);
				 } // end of for loop
				 return studentLeaveReasonList;
				});
			} else {
				 return dataService.callAPI(config.API_URL + 'StudentLeaves/studentLeaveReasons/' + entityKey, [], 'GET').then(function (response) {
					 return response.data;
						});
				}
		}, // end of get method


		 getAllStudentLeaveReasons: function (organizationKey) {
			 
			 if (appConfig.APP_MODE == 'offline') {
			 	var query = studentLeaveReasonQueries.getAllStudentLeaveReasons;
				 return dataService.executeQuery(query, config.OFFLINE_DBNAME).then(function (response) {
				 var studentLeaveReasonList = [];
				 for (var i = 0; i < response.rows.length; i++) {
					 var tempEntityStudentLeaveReason = {
						 studentLeaveReasonKey: response.rows.item(i).studentLeaveReasonKey,
						 studentLeaveReasonTitle: response.rows.item(i).studentLeaveReasonTitle,
						 instanceOrganizationKey: response.rows.item(i).instanceOrganizationKey,
					 };
						 studentLeaveReasonList.push(tempEntityStudentLeaveReason);
				 } // end of for loop
				 return studentLeaveReasonList;
				});
			} else {
				 return dataService.callAPI(config.API_URL + 'StudentLeaves/studentLeaveReasons/'+organizationKey, [], 'GET').then(function (response) {
					 return response.data;
						});
				}
		} // end of get method


	} // end of factory
}); // end of module

