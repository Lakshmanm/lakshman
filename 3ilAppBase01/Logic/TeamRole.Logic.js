/*//=============================================================================
// All rights reserved to Thrill Innovative Labs.
// THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
// OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
// LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
// FITNESS FOR A PARTICULAR PURPOSE.
//=============================================================================
//*****************************************************************************
//* Name		    	: TeamRole.Logic.js 
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

	 var app  = angular.module('ThrillAppBase.teamRoleLogic', ['ThrillFrameworkLibrary.DataService'
			 , 'ThrillAppBase.teamRoleQueries'
			 , 'ThrillAppBase.config'
			 , 'ThrillCnnWebClient.appConfig'
			 , 'ThrillFrameworkLibrary.appLogger'
	])
	 .factory('teamRoleLogic', function ($http,
		 dataService,
		 teamRoleQueries,
		 config,
		 appConfig,
		 appLogger) {

		 return {

			 addTeamRole: function (entityTeamRole) {
                 console.log(config.API_URL + 'ThrillAppBase/teamRoles');
				 return dataService.insert(entityTeamRole, '`Team.teamRoles`', config.OFFLINE_DBNAME, config.API_URL + 'ThrillAppBase/teamRoles').then(function (response) {
					 return response;
			 });
	 },

			 updateTeamRole: function (entityTeamRole, entityKey) {
				 return dataService.update(entityTeamRole, 'teamRoleKey="' + entityKey + '"', '`Team.teamRoles`', config.OFFLINE_DBNAME, config.API_URL + 'ThrillAppBase/teamRoles/' + entityKey).then(function (response) {
				 return response;
			 });
	 },


			 deleteTeamRole: function (entityKey) {
				 return dataService.delete('teamRoleKey="' + entityKey + '"', '`Team.teamRoles`', config.OFFLINE_DBNAME, config.API_URL + 'ThrillAppBase/teamRoles/' + entityKey).then(function (response) {
				 return response;
			 });
	 },


		 getTeamRoleByTeamRoleKey: function (entityKey) {
			 var query = teamRoleQueries.getTeamRoleByTeamRoleKey + "'" + entityKey + "'";
			 if (appConfig.APP_MODE == 'offline') {
				 return dataService.executeQuery(query, config.OFFLINE_DBNAME).then(function (response) {
				 var teamRoleList = [];
				 for (var i = 0; i < response.rows.length; i++) {
					 var tempEntityTeamRole = {
						 teamrolekey: response.rows.item(i).teamRoleKey,
						 teamroletitle: response.rows.item(i).teamRoleTitle,
                         organizationkey:response.rows.item(i).organizationKey
					 };
						 teamRoleList.push(tempEntityTeamRole);
				 } // end of for loop
				 return teamRoleList;
				});
			} else {
				 return dataService.callAPI(config.API_URL + 'ThrillAppBase/teamRoles/' + entityKey, [], 'GET').then(function (response) {
					 return response.data;
						});
				}
		}, // end of get method
             
             
             		 getTeamRoleByorganizationkey: function (organizationKey) {
			
			 if (appConfig.APP_MODE == 'offline') {
                  var query = teamRoleQueries.getTeamRoleByTeamRoleKey + "'" + entityKey + "'";
				 return dataService.executeQuery(query, config.OFFLINE_DBNAME).then(function (response) {
				 var teamRoleList = [];
				 for (var i = 0; i < response.rows.length; i++) {
					 var tempEntityTeamRole = {
						 teamrolekey: response.rows.item(i).teamRoleKey,
						 teamroletitle: response.rows.item(i).teamRoleTitle,
                         organizationkey:response.rows.item(i).organizationKey
					 };
						 teamRoleList.push(tempEntityTeamRole);
				 } // end of for loop
				 return teamRoleList;
				});
			} else {
                console.log(config.API_URL + 'ThrillAppBase/teamRoles/' + organizationKey);
				 return dataService.callAPI(config.API_URL + 'ThrillAppBase/teamRolesorganization/' + organizationKey, [], 'GET').then(function (response) {
					 return response.data;
						});
				}
		},


		 getAllTeamRoles: function () {
			 var query = teamRoleQueries.getAllTeamRoles;
			 if (appConfig.APP_MODE == 'offline') {
				 return dataService.executeQuery(query, config.OFFLINE_DBNAME).then(function (response) {
				 var teamRoleList = [];
				 for (var i = 0; i < response.rows.length; i++) {
					 var tempEntityTeamRole = {
						 teamrolekey: response.rows.item(i).teamRoleKey,
						 teamroletitle: response.rows.item(i).teamRoleTitle,
                         organizationkey:response.rows.item(i).organizationKey
					 };
						 teamRoleList.push(tempEntityTeamRole);
				 } // end of for loop
				 return teamRoleList;
				});
			} else {
				 return dataService.callAPI(config.API_URL + 'ThrillAppBase/teamRoles', [], 'GET').then(function (response) {
					 return response.data;
						});
				}
		} // end of get method


	} // end of factory
}); // end of module

