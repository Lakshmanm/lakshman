/*//=============================================================================
// All rights reserved to Thrill Innovative Labs.
// THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
// OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
// LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
// FITNESS FOR A PARTICULAR PURPOSE.
//=============================================================================
//*****************************************************************************
//* Name		    	: StudentLeaveRequestMode.Logic.js 
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

	 var app  = angular.module('ThrillStudentLeaves.studentLeaveRequestModeLogic', ['ThrillFrameworkLibrary.DataService'
			 , 'ThrillStudentLeaves.studentLeaveRequestModeQueries'
			 , 'ThrillStudentLeaves.config'
			 , 'ThrillCnnWebClient.appConfig'
			 , 'ThrillFrameworkLibrary.appLogger'
	])
	 .factory('studentLeaveRequestModeLogic', function ($http,
		 dataService,
		 studentLeaveRequestModeQueries,
		 config,
		 appConfig,
		 appLogger) {

		 return {

			 addStudentLeaveRequestMode: function (entityStudentLeaveRequestMode) {
				 return dataService.insert(entityStudentLeaveRequestMode, '`StudentLeaves.studentLeaveRequestModes`', config.OFFLINE_DBNAME, config.API_URL + 'StudentLeaves/studentLeaveRequestModes').then(function (response) {
					 return response;
			 });
	 },

			 updateStudentLeaveRequestMode: function (entityStudentLeaveRequestMode, entityKey) {
				 return dataService.update(entityStudentLeaveRequestMode, 'studentLeaveRequestModeKey="' + entityKey + '"', '`StudentLeaves.studentLeaveRequestModes`', config.OFFLINE_DBNAME, config.API_URL + 'StudentLeaves/studentLeaveRequestModes/' + entityKey).then(function (response) {
				 return response;
			 });
	 },


			 deleteStudentLeaveRequestMode: function (entityKey) {
				 return dataService.delete('studentLeaveRequestModeKey="' + entityKey + '"', '`StudentLeaves.studentLeaveRequestModes`', config.OFFLINE_DBNAME, config.API_URL + 'StudentLeaves/studentLeaveRequestModes/' + entityKey).then(function (response) {
				 return response;
			 });
	 },


		 getStudentLeaveRequestModeByStudentLeaveRequestModeKey: function (entityKey) {
			 var query = studentLeaveRequestModeQueries.getStudentLeaveRequestModeByStudentLeaveRequestModeKey + "'" + entityKey + "'";
			 if (appConfig.APP_MODE == 'offline') {
				 return dataService.executeQuery(query, config.OFFLINE_DBNAME).then(function (response) {
				 var studentLeaveRequestModeList = [];
				 for (var i = 0; i < response.rows.length; i++) {
					 var tempEntityStudentLeaveRequestMode = {
						 studentLeaveRequestModeKey: response.rows.item(i).studentLeaveRequestModeKey,
						 studentLeaveRequestModeTitle: response.rows.item(i).studentLeaveRequestModeTitle,
						 instanceOrganizationKey: response.rows.item(i).instanceOrganizationKey,
					 };
						 studentLeaveRequestModeList.push(tempEntityStudentLeaveRequestMode);
				 } // end of for loop
				 return studentLeaveRequestModeList;
				});
			} else {
				 return dataService.callAPI(config.API_URL + 'StudentLeaves/studentLeaveRequestModes/' + entityKey, [], 'GET').then(function (response) {
					 return response.data;
						});
				}
		}, // end of get method


		 getAllStudentLeaveRequestModes: function (organizationKey) {
			
			 if (appConfig.APP_MODE == 'offline') {
			 	 var query = studentLeaveRequestModeQueries.getAllStudentLeaveRequestModes;
				 return dataService.executeQuery(query, config.OFFLINE_DBNAME).then(function (response) {
				 var studentLeaveRequestModeList = [];
				 for (var i = 0; i < response.rows.length; i++) {
					 var tempEntityStudentLeaveRequestMode = {
						 studentLeaveRequestModeKey: response.rows.item(i).studentLeaveRequestModeKey,
						 studentLeaveRequestModeTitle: response.rows.item(i).studentLeaveRequestModeTitle,
						 instanceOrganizationKey: response.rows.item(i).instanceOrganizationKey,
					 };
						 studentLeaveRequestModeList.push(tempEntityStudentLeaveRequestMode);
				 } // end of for loop
				 return studentLeaveRequestModeList;
				});
			} else {
				 return dataService.callAPI(config.API_URL + 'StudentLeaves/studentLeaveRequestModes/'+organizationKey, [], 'GET').then(function (response) {
					 return response.data;
						});
				}
		} // end of get method


	} // end of factory
}); // end of module

