/*//=============================================================================
// All rights reserved to Thrill Innovative Labs.
// THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
// OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
// LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
// FITNESS FOR A PARTICULAR PURPOSE.
//=============================================================================
//*****************************************************************************
//* Name		    	: TeamTeamMember.Logic.js 
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

	 var app  = angular.module('ThrillAppBase.teamTeamMemberLogic', ['ThrillFrameworkLibrary.DataService'
			 , 'ThrillAppBase.teamTeamMemberQueries'
			 , 'ThrillAppBase.config'
			 , 'ThrillCnnWebClient.appConfig'
			 , 'ThrillFrameworkLibrary.appLogger'
	])
	 .factory('teamTeamMemberLogic', function ($http,
		 dataService,
		 teamTeamMemberQueries,
		 config,
		 appConfig,
		 appLogger) {

		 return {

			 addTeamTeamMember: function (teamMember, teamKey ) {
              for(var i=0;i<teamMember.length;i++)
                  {
                         var teamMemberobject={
                    endDate:teamMember[i].EndDate,
                    startDate:teamMember[i].StartDate,
                    personKey:teamMember[i].personKey,
                   teamRoleKey:teamMember[i].teamRoleKey                        
                         }
                         console.log(teamMemberobject);
                          return dataService.insert(teamMemberobject, '`Team.teamMembers`', config.OFFLINE_DBNAME, config.API_URL + 'ThrillAppBase/teams/' +teamKey + '/teamMembers').then(function (response) {
					 return response;
			 });
                         
                         }
                    
               
				
	 },
             
             
              addTeamTeamMemberlist: function (entityTeamTeamMember) {
			                   return dataService.insert(entityTeamTeamMember, '`Team.teamMembers`', config.OFFLINE_DBNAME, config.API_URL + 'ThrillAppBase/teammemberDetails/').then(function (response) {
					 return response;
			 });
                   
	 },

			 updateTeamTeamMember: function (entityTeamTeamMember, teamKey, entityKey ) {
				 return dataService.update(entityTeamTeamMember, 'teamMemberKey="' + entityKey + '"', '`Team.teamMembers`', config.OFFLINE_DBNAME, config.API_URL + 'ThrillAppBase/teams/' + teamKey + '/teamMembers/'+ entityKey).then(function (response) {
				 return response;
			 });
	 },

		 getTeamTeamMemberByTeamMemberKey: function ( teamKey , entityKey) {

		 var query = teamTeamMemberQueries.getTeamTeamMemberByTeamMemberKey + "'" + entityKey + "'";
		 if (appConfig.APP_MODE == 'offline') {
			 return dataService.executeQuery(query, config.OFFLINE_DBNAME).then(function (response) {
			 var teamMemberList = [];
				 for (var i = 0; i < response.rows.length; i++) {
					 var tempEntityTeamMember = {
                         teamkey:response.rows.item(i).teamKey,
						 teammemberkey: response.rows.item(i).teamMemberKey,
						 teamrolekey: response.rows.item(i).teamRoleKey,
						 personkey: response.rows.item(i).personKey,
						startdate: response.rows.item(i).StartDate,
						enddate: response.rows.item(i).EndDate,
					 };

			 teamMemberList.push(tempEntityTeamMember);
}
			 return teamMemberList;
		});
	} else {
		 return dataService.callAPI(config.API_URL + 'ThrillAppBase/teams/' + teamKey + '/teamMembers/'+ entityKey, [], 'GET').then(function (response) {
			 return response.data;
});
}
},
             
                deleteTeamTeamMemberbyteamkey: function (teamMemberKey) {

				 return dataService.delete('teamMemberKey = "'+ teamMemberKey +'"' , '`Team.teamMembers`', config.OFFLINE_DBNAME, config.API_URL + 'ThrillAppBase/teammembers/' + teamMemberKey ).then(function (response) {
						 return response;
			 });
		},
		 getTeamTeamMemberByTeamKey: function ( teamKey) {

		 var query = teamTeamMemberQueries.getTeamTeamMemberByTeamKey ;
		 if (appConfig.APP_MODE == 'offline') {
			 return dataService.executeQuery(query, config.OFFLINE_DBNAME).then(function (response) {
			 var teamMemberList = [];
				 for (var i = 0; i < response.rows.length; i++) {
					 var tempEntityTeamMember = {
						 teammemberkey: response.rows.item(i).teamMemberKey,
						 teamrolekey: response.rows.item(i).teamRoleKey,
                         teamtitle: response.rows.item(i).teamTitle,
                         teamroletitle: response.rows.item(i).teamRoleTitle,
						 personkey: response.rows.item(i).personKey,
						 startdate: new Date(response.rows.item(i).StartDate),
						 enddate:new Date(response.rows.item(i).EndDate),
					 };

			 teamMemberList.push(tempEntityTeamMember);
}
			 return teamMemberList;
		});
	} else {
		 return dataService.callAPI(config.API_URL + 'ThrillAppBase/teams/' + teamKey + '/teamMembers', [], 'GET').then(function (response) {
			 return response.data;
});
}
},
             
              getAllTeamMemberByTeamKey: function ( teamMemberKey) {

		 var query = teamTeamMemberQueries.getTeamTeamMemberByTeamKey ;
		 if (appConfig.APP_MODE == 'offline') {
			 return dataService.executeQuery(query, config.OFFLINE_DBNAME).then(function (response) {
			 var teamMemberList = [];
				 for (var i = 0; i < response.rows.length; i++) {
					 var tempEntityTeamMember = {
						 teammemberkey: response.rows.item(i).teamMemberKey,
						 teamrolekey: response.rows.item(i).teamRoleKey,
                         teamtitle: response.rows.item(i).teamTitle,
                         teamroletitle: response.rows.item(i).teamRoleTitle,
						 personkey: response.rows.item(i).personKey,
						 startdate: new Date(response.rows.item(i).StartDate),
						 enddate:new Date(response.rows.item(i).EndDate),
					 };

			 teamMemberList.push(tempEntityTeamMember);
}
			 return teamMemberList;
		});
	} else {
		 return dataService.callAPI(config.API_URL + 'ThrillAppBase/teammember/' + teamMemberKey , [], 'GET').then(function (response) {
			 return response.data;
});
}
},
           
		 deleteTeamTeamMember: function ( teamMemberKey , entityKey) {

				 return dataService.delete('teamMemberKey = "'+ teamMemberKey +'"' , '`Team.teamMembers`', config.OFFLINE_DBNAME, config.API_URL + 'ThrillAppBase/teams/' +entityKey + '/teamMembers/'+ teamMemberKey ).then(function (response) {
						 return response;
			 });
		}
             
}
});

