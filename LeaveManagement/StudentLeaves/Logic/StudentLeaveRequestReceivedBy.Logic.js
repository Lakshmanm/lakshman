/*//=============================================================================
// All rights reserved to Thrill Innovative Labs.
// THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
// OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
// LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
// FITNESS FOR A PARTICULAR PURPOSE.
//=============================================================================
//*****************************************************************************
//* Name		    	: StudentLeaveRequestReceivedBy.Logic.js 
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

	 var app  = angular.module('ThrillStudentLeaves.studentLeaveRequestReceivedByLogic', ['ThrillFrameworkLibrary.DataService'
			 , 'ThrillStudentLeaves.studentLeaveRequestReceivedByQueries'
			 , 'ThrillStudentLeaves.config'
			 , 'ThrillCnnWebClient.appConfig'
			 , 'ThrillFrameworkLibrary.appLogger'
	])
	 .factory('studentLeaveRequestReceivedByLogic', function ($http,
		 dataService,
		 studentLeaveRequestReceivedByQueries,
		 config,
		 appConfig,
		 appLogger) {

		 return {

			 addStudentLeaveRequestReceivedBy: function (entityStudentLeaveRequestReceivedBy) {
				 return dataService.insert(entityStudentLeaveRequestReceivedBy, '`StudentLeaves.studentLeaveRequestReceivedBies`', config.OFFLINE_DBNAME, config.API_URL + 'StudentLeaves/studentLeaveRequestReceivedBies').then(function (response) {
					 return response;
			 });
	 },

			 updateStudentLeaveRequestReceivedBy: function (entityStudentLeaveRequestReceivedBy, entityKey) {
				 return dataService.update(entityStudentLeaveRequestReceivedBy, 'studentLeaveRequestReceivedByKey="' + entityKey + '"', '`StudentLeaves.studentLeaveRequestReceivedBies`', config.OFFLINE_DBNAME, config.API_URL + 'StudentLeaves/studentLeaveRequestReceivedBies/' + entityKey).then(function (response) {
				 return response;
			 });
	 },


			 deleteStudentLeaveRequestReceivedBy: function (entityKey) {
				 return dataService.delete('studentLeaveRequestReceivedByKey="' + entityKey + '"', '`StudentLeaves.studentLeaveRequestReceivedBies`', config.OFFLINE_DBNAME, config.API_URL + 'StudentLeaves/studentLeaveRequestReceivedBies/' + entityKey).then(function (response) {
				 return response;
			 });
	 },


		 getStudentLeaveRequestReceivedByByStudentLeaveRequestReceivedByKey: function (entityKey) {
			 var query = studentLeaveRequestReceivedByQueries.getStudentLeaveRequestReceivedByByStudentLeaveRequestReceivedByKey + "'" + entityKey + "'";
			 if (appConfig.APP_MODE == 'offline') {
				 return dataService.executeQuery(query, config.OFFLINE_DBNAME).then(function (response) {
				 var studentLeaveRequestReceivedByList = [];
				 for (var i = 0; i < response.rows.length; i++) {
					 var tempEntityStudentLeaveRequestReceivedBy = {
						 studentLeaveRequestReceivedByKey: response.rows.item(i).studentLeaveRequestReceivedByKey,
						 studentLeaveRequestReceivedByTitle: response.rows.item(i).studentLeaveRequestReceivedByTitle,
						 instanceOrganizationKey: response.rows.item(i).instanceOrganizationKey,
					 };
						 studentLeaveRequestReceivedByList.push(tempEntityStudentLeaveRequestReceivedBy);
				 } // end of for loop
				 return studentLeaveRequestReceivedByList;
				});
			} else {
				 return dataService.callAPI(config.API_URL + 'StudentLeaves/studentLeaveRequestReceivedBies/' + entityKey, [], 'GET').then(function (response) {
					 return response.data;
						});
				}
		}, // end of get method


		 getAllStudentLeaveRequestReceivedBies: function () {
			 var query = studentLeaveRequestReceivedByQueries.getAllStudentLeaveRequestReceivedBies;
			 if (appConfig.APP_MODE == 'offline') {
				 return dataService.executeQuery(query, config.OFFLINE_DBNAME).then(function (response) {
				 var studentLeaveRequestReceivedByList = [];
				 for (var i = 0; i < response.rows.length; i++) {
					 var tempEntityStudentLeaveRequestReceivedBy = {
						 studentLeaveRequestReceivedByKey: response.rows.item(i).studentLeaveRequestReceivedByKey,
						 studentLeaveRequestReceivedByTitle: response.rows.item(i).studentLeaveRequestReceivedByTitle,
						 instanceOrganizationKey: response.rows.item(i).instanceOrganizationKey,
					 };
						 studentLeaveRequestReceivedByList.push(tempEntityStudentLeaveRequestReceivedBy);
				 } // end of for loop
				 return studentLeaveRequestReceivedByList;
				});
			} else {
				 return dataService.callAPI(config.API_URL + 'StudentLeaves/studentLeaveRequestReceivedBies', [], 'GET').then(function (response) {
					 return response.data;
						});
				}
		} ,// end of get method
		 getAllStudentLeaveRequestReceivedByOrgKey: function (organizationKey) {
			
			 if (appConfig.APP_MODE == 'offline') {
			 	 var query = studentLeaveRequestReceivedByQueries.getAllStudentLeaveRequestReceivedBies;
				 return dataService.executeQuery(query, config.OFFLINE_DBNAME).then(function (response) {
				 var studentLeaveRequestReceivedByList = [];
				 for (var i = 0; i < response.rows.length; i++) {
					 var tempEntityStudentLeaveRequestReceivedBy = {
						 studentLeaveRequestReceivedByKey: response.rows.item(i).studentLeaveRequestReceivedByKey,
						 studentLeaveRequestReceivedByTitle: response.rows.item(i).studentLeaveRequestReceivedByTitle,
						 instanceOrganizationKey: response.rows.item(i).instanceOrganizationKey,
					 };
						 studentLeaveRequestReceivedByList.push(tempEntityStudentLeaveRequestReceivedBy);
				 } // end of for loop
				 return studentLeaveRequestReceivedByList;
				});
			} else {
				 return dataService.callAPI(config.API_URL + 'StudentLeaves/studentLeaveRequestReceivedBies/' + organizationKey, [], 'GET').then(function (response) {
					 return response.data;
						});
				}
		} 

	} // end of factory
}); // end of module

