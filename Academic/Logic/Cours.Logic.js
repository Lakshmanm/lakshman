/*//=============================================================================
// All rights reserved to Thrill Innovative Labs.
// THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
// OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
// LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
// FITNESS FOR A PARTICULAR PURPOSE.
//=============================================================================
//*****************************************************************************
//* Name		    	: Cours.Logic.js 
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

var app = angular.module('ThrillAcademic.coursLogic', ['ThrillFrameworkLibrary.DataService'
			 , 'ThrillAcademic.coursQueries'
			 , 'ThrillAcademic.config'
			 , 'ThrillCnnWebClient.appConfig'
			 , 'ThrillFrameworkLibrary.appLogger'
])
	.factory('coursLogic', function ($http,
		dataService,
		coursQueries,
		config,
		appConfig,
		appLogger) {

		return {

			addCours: function (entityCours) {
				return dataService.insert(entityCours, '`Academic.courses`', config.OFFLINE_DBNAME, config.API_URL + 'Academic/courses').then(function (response) {
					return response;
				});
			},

			updateCours: function (entityCours, entityKey) {
				return dataService.update(entityCours, 'coursKey="' + entityKey + '"', '`Academic.courses`', config.OFFLINE_DBNAME, config.API_URL + 'Academic/courses/' + entityKey).then(function (response) {
					return response;
				});
			},


			deleteCours: function (entityKey) {
				return dataService.delete('coursKey="' + entityKey + '"', '`Academic.courses`', config.OFFLINE_DBNAME, config.API_URL + 'Academic/courses/' + entityKey).then(function (response) {
					return response;
				});
			},


			getCoursByCourseKey: function (entityKey) {
				var query = coursQueries.getCoursByCoursKey + "'" + entityKey + "'";
				if (appConfig.APP_MODE == 'offline') {
					return dataService.executeQuery(query, config.OFFLINE_DBNAME).then(function (response) {
						var coursList = [];
						for (var i = 0; i < response.rows.length; i++) {
							var tempEntityCours = {
								coursekey: response.rows.item(i).coursKey,
								coursetitle: response.rows.item(i).courseTitle,
								groupkey: response.rows.item(i).groupKey,
								instanceorganizationkey: response.rows.item(i).instanceOrganizationKey,
							};
							coursList.push(tempEntityCours);
						} // end of for loop
						return coursList;
					});
				} else {
					return dataService.callAPI(config.API_URL + 'Academic/courses/' + entityKey, [], 'GET').then(function (response) {
						return response.data;
					});
				}
			}, // end of get method


			getAllCourses: function (organizationKey) {
				var query = coursQueries.getAllCourses;
				if (appConfig.APP_MODE == 'offline') {
					return dataService.executeQuery(query, config.OFFLINE_DBNAME).then(function (response) {
						var coursList = [];
						for (var i = 0; i < response.rows.length; i++) {
							var tempEntityCours = {
								coursekey: response.rows.item(i).coursKey,
								coursetitle: response.rows.item(i).courseTitle,
								groupkey: response.rows.item(i).groupKey,
								instanceorganizationkey: response.rows.item(i).instanceOrganizationKey,
							};
							coursList.push(tempEntityCours);
						} // end of for loop
						return coursList;
					});
				} else {
					return dataService.callAPI(config.API_URL + 'Academic/Organizations/' + organizationKey + '/courses', [], 'GET').then(function (response) {
						return response.data;
					});
				}
			}, // end of get method


getCoursByGroupKey: function (entityKey) {
				var query = coursQueries.getCoursByGroupKey + "'" + entityKey + "'";
				if (appConfig.APP_MODE == 'offline') {
					return dataService.executeQuery(query, config.OFFLINE_DBNAME).then(function (response) {
						var coursList = [];
						for (var i = 0; i < response.rows.length; i++) {
							var tempEntityCours = {
								coursekey: response.rows.item(i).coursKey,
								coursetitle: response.rows.item(i).courseTitle,
								groupkey: response.rows.item(i).groupKey,
								instanceorganizationkey: response.rows.item(i).instanceOrganizationKey,
							};
							coursList.push(tempEntityCours);
						} // end of for loop
						return coursList;
					});
				} else {
					return dataService.callAPI(config.API_URL + 'Academic/Groups/' + entityKey + '/Courses', [], 'GET').then(function (response) {
						return response.data;
					});
				}
			}, // end of get method
getCoursesByInstituteKey:function(instituteKey)
{

return dataService.callAPI(config.API_URL + 'Academic/CoursesByGroup/' + instituteKey + '/Courses', [], 'GET').then(function (response) {
						return response.data;
					});

}

		} // end of factory
	}); // end of module

