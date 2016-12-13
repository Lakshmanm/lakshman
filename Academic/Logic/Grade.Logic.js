/*//=============================================================================
// All rights reserved to Thrill Innovative Labs.
// THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
// OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
// LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
// FITNESS FOR A PARTICULAR PURPOSE.
//=============================================================================
//*****************************************************************************
//* Name		    	: Grade.Logic.js 
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

	 var app  = angular.module('ThrillAcademic.gradeLogic', ['ThrillFrameworkLibrary.DataService'
			 , 'ThrillAcademic.gradeQueries'
			 , 'ThrillAcademic.config'
			 , 'ThrillCnnWebClient.appConfig'
			 , 'ThrillFrameworkLibrary.appLogger'
	])
	 .factory('gradeLogic', function ($http,
		 dataService,
		 gradeQueries,
		 config,
		 appConfig,
		 appLogger) {

		 return {

			 addGrade: function (entityGrade) {
			 
				 return dataService.insert(entityGrade, '`Academic.grades`', config.OFFLINE_DBNAME, config.API_URL + 'Academic/Grade').then(function (response) {
					 return response;
			 });
	 },

			 updateGrade: function (entityGrade,entityKey) {
				 return dataService.update(entityGrade, 'gradeKey="' + entityKey + '"', '`Academic.grades`', config.OFFLINE_DBNAME, config.API_URL + 'Academic/Grade/' + entityKey).then(function (response) {
				 return response;
			 });
	 },


			 deleteGrade: function (entityKey) {
				 return dataService.delete('gradeKey="' + entityKey + '"', '`Academic.grades`', config.OFFLINE_DBNAME, config.API_URL + 'Academic/Grade/' + entityKey).then(function (response) {
				 return response;
			 });
	 },


		 getGradeaaByGradeKey: function (entityKey) {

			 var query = gradeQueries.getGradeByGradeKey + "'" + entityKey + "'";
			 if (appConfig.APP_MODE == 'offline') {
				 return dataService.executeQuery(query, config.OFFLINE_DBNAME).then(function (response) {
				 var gradeList = [];
				 for (var i = 0; i < response.rows.length; i++) {
					 var tempEntityGrade = {
						 gradekey: response.rows.item(i).gradeKey,
						 percentageFrom: response.rows.item(i).percentageFrom,
						  percentageTo: response.rows.item(i).percentageTo,
						   gradePoints: response.rows.item(i).gradePoints,
						 instanceorganizationkey: response.rows.item(i).instanceOrganizationKey,
					 };
						 gradeList.push(tempEntityGrade);
				 } // end of for loop
				 return gradeList;
				});
			} else {
				 return dataService.callAPI(config.API_URL + 'Academic/Grade/' + entityKey, [], 'GET').then(function (response) {
									 return response.data;
						});
				}
		}, // end of get method





		 getAllGrade: function (organizationKey) {
			 var query = gradeQueries.getAllGrade;
			 if (appConfig.APP_MODE == 'offline') {
				 return dataService.executeQuery(query, config.OFFLINE_DBNAME).then(function (response) {
				 var gradeList = [];
				 for (var i = 0; i < response.rows.length; i++) {
					 var tempEntityGrade = {
						 gradekey: response.rows.item(i).gradeKey,
						 percentageFrom: response.rows.item(i).percentageFrom,
						  percentageTo: response.rows.item(i).percentageTo,
						   gradePoints: response.rows.item(i).gradePoints,
						 instanceorganizationkey: response.rows.item(i).instanceOrganizationKey,
					 };
						 gradeList.push(tempEntityGrade);
				 } // end of for loop
				 return gradeList;

				});
			} else {
				 return dataService.callAPI(config.API_URL + 'Academic/Organizations/'+organizationKey+'/Grade', [], 'GET').then(function (response) {
					console.log(response);
					 return response.data;

						});
				}
		} // end of get method


	} // end of factory
}); // end of module

