/*//=============================================================================
// All rights reserved to Thrill Innovative Labs.
// THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
// OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
// LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
// FITNESS FOR A PARTICULAR PURPOSE.
//=============================================================================
//*****************************************************************************
//* Name		    	: Board.Logic.js 
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

	 var app  = angular.module('ThrillInstitute.instituteBoardLogic', ['ThrillFrameworkLibrary.DataService'
			 , 'ThrillAcademic.boardQueries'
			 , 'ThrillAcademic.config'
			 , 'ThrillCnnWebClient.appConfig'
			 , 'ThrillFrameworkLibrary.appLogger'
	])
	 .factory('instituteBoardLogic', function ($http,
		 dataService,
		 boardQueries,
		 config,
		 appConfig,
		 appLogger) {

		 return {
             
             
             
             addInstituteBoard:function(entityBoard){
                  return dataService.insert(entityBoard, '`institute.instituteboards`', config.OFFLINE_DBNAME, config.API_URL + 'Mcampuz/InstituteBoards').then(function (response) {
					 return response;
			 });
             },
             
             
             getBoardByInstituteKey:function(instituteKey)
             {
          return dataService.callAPI(config.API_URL + 'Mcampuz/InstituteBoards/' + instituteKey, [], 'GET').then(function (response) {
					 return response.data;
						});   
             
             
         },
        

			/* addBoard: function (entityBoard) {
			 
				 return dataService.insert(entityBoard, '`Academic.boards`', config.OFFLINE_DBNAME, config.API_URL + 'Academic/boards').then(function (response) {
					 return response;
			 });
	 },

			 updateBoard: function (entityBoard, entityKey) {
				 return dataService.update(entityBoard, 'boardKey="' + entityKey + '"', '`Academic.boards`', config.OFFLINE_DBNAME, config.API_URL + 'Academic/boards/' + entityKey).then(function (response) {
				 return response;
			 });
	 },


			 deleteBoard: function (entityKey) {
				 return dataService.delete('boardKey="' + entityKey + '"', '`Academic.boards`', config.OFFLINE_DBNAME, config.API_URL + 'Academic/boards/' + entityKey).then(function (response) {
				 return response;
			 });
	 },


		 getBoardByBoardKey: function (entityKey) {
			 var query = boardQueries.getBoardByBoardKey + "'" + entityKey + "'";
			 if (appConfig.APP_MODE == 'offline') {
				 return dataService.executeQuery(query, config.OFFLINE_DBNAME).then(function (response) {
				 var boardList = [];
				 for (var i = 0; i < response.rows.length; i++) {
					 var tempEntityBoard = {
						 boardkey: response.rows.item(i).boardKey,
						 boardorganizationkey: response.rows.item(i).boardOrganizationKey,
						 instanceorganizationkey: response.rows.item(i).instanceOrganizationKey,
					 };
						 boardList.push(tempEntityBoard);
				 } // end of for loop
				 return boardList;
				});
			} else {
				 return dataService.callAPI(config.API_URL + 'Academic/boards/' + entityKey, [], 'GET').then(function (response) {
					 return response.data;
						});
				}
		}, // end of get method





		 getAllBoards: function (organizationKey) {
			 var query = boardQueries.getAllBoards;
			 if (appConfig.APP_MODE == 'offline') {
				 return dataService.executeQuery(query, config.OFFLINE_DBNAME).then(function (response) {
				 var boardList = [];
				 for (var i = 0; i < response.rows.length; i++) {
					 var tempEntityBoard = {
						 boardkey: response.rows.item(i).boardKey,
						 boardorganizationkey: response.rows.item(i).boardOrganizationKey,
						 instanceorganizationkey: response.rows.item(i).instanceOrganizationKey,
					 };
						 boardList.push(tempEntityBoard);
				 } // end of for loop
				 return boardList;

				});
			} else {
								 
				 return dataService.callAPI(config.API_URL + 'Academic/Organizations/'+organizationKey+'/Boards', [], 'GET').then(function (response) {


					console.log(response);
					 return response.data;

						});
				}
		} // end of get method




*/

	} // end of factory
}); // end of module

