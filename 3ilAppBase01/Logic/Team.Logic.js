/*//=============================================================================
// All rights reserved to Thrill Innovative Labs.
// THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
// OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
// LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
// FITNESS FOR A PARTICULAR PURPOSE.
//=============================================================================
//*****************************************************************************
//* Name		    	: Team.Logic.js 
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

	 var app  = angular.module('ThrillAppBase.teamLogic', ['ThrillFrameworkLibrary.DataService'
			 , 'ThrillAppBase.teamQueries'
			 , 'ThrillAppBase.config'
			 , 'ThrillCnnWebClient.appConfig'
			 , 'ThrillFrameworkLibrary.appLogger'
	])
	 .factory('teamLogic', function ($http,
		 dataService,
		 teamQueries,
		 config,
		 appConfig,
		 appLogger) {

		 return {

			 addTeam: function (entityTeam) {
                 console.log(entityTeam);
                
				 return dataService.insert(entityTeam, '`Team.teams`', config.OFFLINE_DBNAME, config.API_URL + 'ThrillAppBase/teams').then(function (response) {
                   var teamKey=response.data.teamKey;
                    
                            if (entityTeam.teamLogoKey != null && entityTeam.teamLogoKey != '') {
                    // create folder
                    var folderObj = {
                        FolderName: teamKey,
                        EntityKey:teamKey,
                        EntityType: "Team"
                    };

                 //   var folderKey = entityTeam.basicInfo.folderKey;
                 //   var fileKey = entityTeam.basicInfo.n3DMSFileKey;

                    dataService.insert(folderObj, '`3ilAppBase01.dms`', config.OFFLINE_DBNAME, config.API_URL + 'dms/folders').then(function (response) {
                        console.log(response);
                        if (response.data[0][0].FolderKey != undefined) {
                            folderKey = response.data[0][0].FolderKey;
                        }

                        var postFileObj = {};

                        postFileObj.fileBase64Data = 'data:' + entityTeam.teamLogoKey.filetype + ';base64,' + entityTeam.teamLogoKey.base64;
                        postFileObj.fileName = entityTeam.teamLogoKey.filename;
                        postFileObj.fileSize = entityTeam.teamLogoKey.filesize;
                        postFileObj.fileType = entityTeam.teamLogoKey.filetype;


                        dataService.insert(postFileObj, '`3ilAppBase01.dms`', config.OFFLINE_DBNAME, config.API_URL + 'dms/folders/' + folderKey + '/files').then(function (response) {
                            console.log(response);
                            fileKey = response.data[0][0].Filekey;

                            entityTeam.teamLogoKey = fileKey
                            entityTeam.teamDocFolderKey = folderKey
                         entityKey=teamKey;
                            return dataService.update(entityTeam, 'teamKey="' + entityKey + '"', '`Team.teams`', config.OFFLINE_DBNAME, config.API_URL + 'ThrillAppBase/teams/' + entityKey).then(function (response) {

                            });

                           
                        });


                    });


                }
                     
                     
					 return response;
			 });
	 },

			 updateTeam: function (entityTeam, entityKey) {
				 return dataService.update(entityTeam, 'teamKey="' + entityKey + '"', '`Team.teams`', config.OFFLINE_DBNAME, config.API_URL + 'ThrillAppBase/teams/' + entityKey).then(function (response) {
                    console.log(response); 
                     var teamKey=entityKey;
                     
                           console.log(entityTeam.teamLogoKey);         
                            if (entityTeam.teamLogoKey != null && entityTeam.teamLogoKey != undefined) {
                    // create folder
                    var folderObj = {
                        FolderName: teamKey,
                        EntityKey:teamKey,
                        EntityType: "Team"
                    };

                  var folderKey = entityTeam.teamDocFolderKey;
                    var fileKey = entityTeam.teamLogoKey;

                    dataService.insert(folderObj, '`3ilAppBase01.dms`', config.OFFLINE_DBNAME, config.API_URL + 'dms/folders').then(function (response) {
                        console.log(response);
                        if (response.data[0][0].FolderKey != undefined) {
                            folderKey = response.data[0][0].FolderKey;
                        }

                        var postFileObj = {};

                        postFileObj.fileBase64Data = 'data:' + entityTeam.teamLogoKey.filetype + ';base64,' + entityTeam.teamLogoKey.base64;
                        postFileObj.fileName = entityTeam.teamLogoKey.filename;
                        postFileObj.fileSize = entityTeam.teamLogoKey.filesize;
                        postFileObj.fileType = entityTeam.teamLogoKey.filetype;


                        dataService.insert(postFileObj, '`3ilAppBase01.dms`', config.OFFLINE_DBNAME, config.API_URL + 'dms/folders/' + folderKey + '/files').then(function (response) {
                            console.log(response);
                            fileKey = response.data[0][0].Filekey;

                            entityTeam.teamLogoKey = fileKey
                            entityTeam.teamDocFolderKey = folderKey
                         entityKey=teamKey;
                            return dataService.update(entityTeam, 'teamKey="' + entityKey + '"', '`Team.teams`', config.OFFLINE_DBNAME, config.API_URL + 'ThrillAppBase/teams/' + entityKey).then(function (response) {

                            });

                           
                        });


                    });


                }
				 return response;
			 });
	 },


			 deleteTeam: function (entityKey) {
				 return dataService.delete('teamKey="' + entityKey + '"', '`Team.teams`', config.OFFLINE_DBNAME, config.API_URL + 'ThrillAppBase/teams/' + entityKey).then(function (response) {
				 return response;
			 });
	 },


		 getTeamByTeamKey: function (teamKey) {
			 var query = teamQueries.getTeamByTeamKey + "'" + teamKey + "'";
			 if (appConfig.APP_MODE == 'offline') {
				 return dataService.executeQuery(query, config.OFFLINE_DBNAME).then(function (response) {
				 var teamList = [];
                  
				 for (var i = 0; i < response.rows.length; i++) {
					 var tempEntityTeam = {
						 teamkey: response.rows.item(i).teamKey,
						 teamtitle: response.rows.item(i).teamTitle,
						 teamlogokey: response.rows.item(i).teamLogoKey,
						 teamdocfolderkey: response.rows.item(i).teamDocFolderKey,
						 teamdescription: response.rows.item(i).teamDescription,
						 associatedorganizationkey: response.rows.item(i).AssociatedOrganizationKey,
						 rootorganizationkey: response.rows.item(i).RootOrganizationKey,
					 };
						 teamList.push(tempEntityTeam);
				 } // end of for loop
				 return teamList;
				});
			} else {
				 return dataService.callAPI(config.API_URL + 'ThrillAppBase/teams/' + teamKey, [], 'GET').then(function (response) {
					 return response.data;
						});
				}
		}, // end of get method

             
        getTeamsByRootOrgKey: function (rootOrganizationKey) {
			
			 if (appConfig.APP_MODE == 'offline') {
                  var query = teamQueries.getTeamsByRootOrgKey(rootOrganizationKey);
				 return dataService.executeQuery(query, config.OFFLINE_DBNAME).then(function (response) {
				 var teamList = [];
				 for (var i = 0; i < response.rows.length; i++) {
					 var tempEntityTeam = {
						 teamkey: response.rows.item(i).teamKey,
						 teamtitle: response.rows.item(i).teamTitle,
						 teamlogokey: response.rows.item(i).teamLogoKey,
						 teamdocfolderkey: response.rows.item(i).teamDocFolderKey,
						 teamdescription: response.rows.item(i).teamDescription,
						 associatedorganizationkey: response.rows.item(i).AssociatedOrganizationKey,
						 rootorganizationkey: response.rows.item(i).RootOrganizationKey,
					 };
						 teamList.push(tempEntityTeam);
				 } // end of for loop
				 return teamList;
				});
			} else {
                console.log('url  :'+config.API_URL + 'ThrillAppBase/rootOrganizations/'+rootOrganizationKey+'/teams');
				 return dataService.callAPI(config.API_URL + 'ThrillAppBase/rootOrganizations/'+rootOrganizationKey+'/teams', [], 'GET').then(function (response) {
					 return response.data;
						});
				}
		},

		 getAllTeams: function () {
			 var query = teamQueries.getAllTeams;
			 if (appConfig.APP_MODE == 'offline') {
				 return dataService.executeQuery(query, config.OFFLINE_DBNAME).then(function (response) {
				 var teamList = [];
				 for (var i = 0; i < response.rows.length; i++) {
					 var tempEntityTeam = {
						 teamkey: response.rows.item(i).teamKey,
						 teamtitle: response.rows.item(i).teamTitle,
						 teamlogokey: response.rows.item(i).teamLogoKey,
						 teamdocfolderkey: response.rows.item(i).teamDocFolderKey,
						 teamdescription: response.rows.item(i).teamDescription,
						 associatedorganizationkey: response.rows.item(i).AssociatedOrganizationKey,
						 rootorganizationkey: response.rows.item(i).RootOrganizationKey,
					 };
						 teamList.push(tempEntityTeam);
				 } // end of for loop
				 return teamList;
				});
			} else {
				 return dataService.callAPI(config.API_URL + 'ThrillAppBase/teams', [], 'GET').then(function (response) {
					 return response.data;
						});
				}
		}, // end of get method

             // get profile pic
             
               getAllFilesDataByfileKey: function (folderKey, fileKey) {
            return dataService.callAPI(config.API_URL + 'dms/folders/' + folderKey + '/files/' + fileKey, [], 'GET').then(function (response) {

                return response.data[0][0];
            });
        }
             
             
             
             
             

	} // end of factory
}); // end of module

