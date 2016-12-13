/*//=============================================================================
// All rights reserved to Thrill Innovative Labs.
// THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
// OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
// LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
// FITNESS FOR A PARTICULAR PURPOSE.
//=============================================================================
//*****************************************************************************
//* Name		    	: Group.Logic.js 
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

var app = angular.module('ThrillAcademic.groupLogic', ['ThrillFrameworkLibrary.DataService'
			 , 'ThrillAcademic.groupQueries'
			 , 'ThrillAcademic.config'
			 , 'ThrillCnnWebClient.appConfig'
			 , 'ThrillFrameworkLibrary.appLogger'
])
	.factory('groupLogic', function ($http,
		dataService,
		groupQueries,
		config,
		appConfig,
		appLogger) {

		return {

			addGroup: function (entityGroup) {
				console.log(entityGroup + "");
				return dataService.insert(entityGroup, '`Academic.groups`', config.OFFLINE_DBNAME, config.API_URL + 'Academic/groups').then(function (response) {
					return response;
				});
			},

			updateGroup: function (entityGroup, entityKey) {
				console.log(entityGroup);
				return dataService.update(entityGroup, 'groupKey="' + entityKey + '"', '`Academic.groups`', config.OFFLINE_DBNAME, config.API_URL + 'Academic/groups/' + entityKey).then(function (response) {
					return response;
				});
			},


			deleteGroup: function (entityKey) {
				return dataService.delete('groupKey="' + entityKey + '"', '`Academic.groups`', config.OFFLINE_DBNAME, config.API_URL + 'Academic/groups/' + entityKey).then(function (response) {
					return response;
				});
			},


			getGroupByGroupKey: function (entityKey) {
				var query = groupQueries.getGroupByGroupKey + "'" + entityKey + "'";
				if (appConfig.APP_MODE == 'offline') {
					return dataService.executeQuery(query, config.OFFLINE_DBNAME).then(function (response) {
						var groupList = [];
						for (var i = 0; i < response.rows.length; i++) {
							var tempEntityGroup = {
								groupkey: response.rows.item(i).groupKey,
								grouptitle: response.rows.item(i).groupTitle,
								boardkey: response.rows.item(i).boardKey,
								instanceorganizationkey: response.rows.item(i).instanceOrganizationKey,
							};
							groupList.push(tempEntityGroup);
						} // end of for loop
						return groupList;
					});
				} else {
					return dataService.callAPI(config.API_URL + 'Academic/groups/' + entityKey, [], 'GET').then(function (response) {
						return response.data;
					});
				}
			}, // end of get method


			getAllGroups: function (organizationKey) {
				var query = groupQueries.getAllGroups;
				if (appConfig.APP_MODE == 'offline') {
					return dataService.executeQuery(query, config.OFFLINE_DBNAME).then(function (response) {
						var groupList = [];
						for (var i = 0; i < response.rows.length; i++) {
							var tempEntityGroup = {
								groupkey: response.rows.item(i).groupKey,
								grouptitle: response.rows.item(i).groupTitle,
								boardkey: response.rows.item(i).boardKey,
								instanceorganizationkey: response.rows.item(i).instanceOrganizationKey,
							};
							groupList.push(tempEntityGroup);
						} // end of for loop
						return groupList;
					});
				} else {
					return dataService.callAPI(config.API_URL + 'Academic/Organizations/'+organizationKey+'/Groups', [], 'GET').then(function (response) {
						return response.data;
					});
				}
			}, // end of get method

			getBoardGroups: function (boardKey) {
				var query = groupQueries.getAllGroups;
				if (appConfig.APP_MODE == 'offline') {
					return dataService.executeQuery(query, config.OFFLINE_DBNAME).then(function (response) {
						var groupList = [];
						for (var i = 0; i < response.rows.length; i++) {
							var tempEntityGroup = {
								groupkey: response.rows.item(i).groupKey,
								grouptitle: response.rows.item(i).groupTitle,
								boardkey: response.rows.item(i).boardKey,
								instanceorganizationkey: response.rows.item(i).instanceOrganizationKey,
							};
							groupList.push(tempEntityGroup);
						} // end of for loop
						return groupList;
					});
				} else {
					return dataService.callAPI(config.API_URL + 'Academic/Boards/'+boardKey+'/Groups', [], 'GET').then(function (response) {
				
						return response.data;
					});
				}
			},

			getGroupsByInstituteBoardKey: function(instituteKey)
			{
return dataService.callAPI(config.API_URL + 'Academic/Groupss/'+instituteKey , [], 'GET').then(function (response) {
				
						return response.data;
					});


			}


		} // end of factory
	}); // end of module

