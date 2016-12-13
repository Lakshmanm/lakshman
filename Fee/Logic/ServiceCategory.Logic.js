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

	 var app  = angular.module('mcampuz.ServiceCategoryLogic', ['ThrillFrameworkLibrary.DataService'
			 , 'ThrillAcademic.boardQueries'
			 , 'ThrillAcademic.config'
			 , 'ThrillCnnWebClient.appConfig'
			 , 'ThrillFrameworkLibrary.appLogger'
	])
	 .factory('ServiceCategoryLogic', function ($http,
		 dataService,
		 boardQueries,
		 config,
		 appConfig,
		 appLogger) {

		 return {

			 addCategory: function (entityCategory) {
			 
				 return dataService.insert(entityCategory, '`feemanagement.servicetypes`', config.OFFLINE_DBNAME, config.API_URL + 'Fee/servicetype').then(function (response) {
					 return response;
			 });
	 },

			 updateCategory: function (entityCategory, entityKey) {
				 return dataService.update(entityCategory, 'ServiceTypeKey="' + entityKey + '"', '`feemanagement.servicetypes`', config.OFFLINE_DBNAME, config.API_URL + 'Fee/servicetype/' + entityKey).then(function (response) {
				 return response;
			 });
	 },


			 deleteCategory: function (entityKey) {
				 return dataService.delete('ServiceTypeKey="' + entityKey + '"', '`feemanagement.servicetypes`', config.OFFLINE_DBNAME, config.API_URL + 'Fee/servicetype/' + entityKey).then(function (response) {
				 return response;
			 });
	 },


		 CategoryByCategoryKey: function (entityKey) {
			 
			 if (appConfig.APP_MODE == 'offline') {
			 	var query = boardQueries.getBoardByBoardKey + "'" + entityKey + "'";
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
				 return dataService.callAPI(config.API_URL + 'Fee/servicetype/' + entityKey, [], 'GET').then(function (response) {
					 return response.data;
						});
				}
		}, // end of get method





		 getcategoryList: function (InstituteKey) {
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
								 
				 return dataService.callAPI(config.API_URL + 'Fee/Institute/'+InstituteKey+'/servicetype', [], 'GET').then(function (response) {


					console.log(response);
					 return response.data;

						});
				}
		} // end of get method


	} // end of factory
}); // end of module

