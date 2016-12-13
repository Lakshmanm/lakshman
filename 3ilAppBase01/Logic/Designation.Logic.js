/*//=============================================================================
// All rights reserved to Thrill Innovative Labs.
// THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
// OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
// LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
// FITNESS FOR A PARTICULAR PURPOSE.
//=============================================================================
//*****************************************************************************
//* Name		    	: Designation.Logic.js 
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

	 var app  = angular.module('ThrillAppBase.designationLogic', ['ThrillFrameworkLibrary.DataService'
			 , 'ThrillAppBase.designationQueries'
			 , 'ThrillAppBase.config'
			 , 'ThrillCnnWebClient.appConfig'
			 , 'ThrillFrameworkLibrary.appLogger'
	])
	 .factory('designationLogic', function ($http,
		 dataService,
		 designationQueries,
		 config,
		 appConfig,
		 appLogger) {

		 return {

			 addDesignation: function (entityDesignation) {
                 console.log(JSON.stringify(entityDesignation)+' url '+config.API_URL + 'ThrillAppBase/designations');
                 
				 return dataService.insert(entityDesignation, '`OrgExt.designations`', config.OFFLINE_DBNAME, config.API_URL + 'ThrillAppBase/designations').then(function (response) {
					 return response;
			 });
	 },

			 updateDesignation: function (entityDesignation, entityKey) {
			 	if(entityDesignation.organizationKey=="")
			 	{
			 		entityDesignation.organizationKey=null;

			 	}

				 return dataService.update(entityDesignation, 'designationKey="' + entityKey + '"', '`OrgExt.designations`', config.OFFLINE_DBNAME, config.API_URL + 'ThrillAppBase/designations/' + entityKey).then(function (response) {
				 return response;
			 });
	 },


			 deleteDesignation: function (entityKey) {
				 return dataService.delete('designationKey="' + entityKey + '"', '`OrgExt.designations`', config.OFFLINE_DBNAME, config.API_URL + 'ThrillAppBase/designations/' + entityKey).then(function (response) {
				 return response;
			 });
	 },


		 getDesignationByDesignationKey: function (designationKey) {
			 var query = designationQueries.getDesignationByDesignationKey + "'" + designationKey + "'";
			 if (appConfig.APP_MODE == 'offline') {
				 return dataService.executeQuery(query, config.OFFLINE_DBNAME).then(function (response) {
				 var designationList = [];
				 for (var i = 0; i < response.rows.length; i++) {
					 var tempEntityDesignation = {
						 designationKey: response.rows.item(i).designationKey,
						 organizationKey: response.rows.item(i).organizationKey,
						 designationTitle: response.rows.item(i).designationTitle,
						 designationDetails: response.rows.item(i).designationDetails,
					 };
						 designationList.push(tempEntityDesignation);
				 } // end of for loop
				 return designationList;
				});
			} else {
				 return dataService.callAPI(config.API_URL + 'ThrillAppBase/designations/' + designationKey, [], 'GET').then(function (response) {
					
					 return response.data;
						});
				}
		}, // end of get method


		 getAllDesignations: function () {
			 var query = designationQueries.getAllDesignations;
			 if (appConfig.APP_MODE == 'offline') {
				 return dataService.executeQuery(query, config.OFFLINE_DBNAME).then(function (response) {
				 var designationList = [];
				 for (var i = 0; i < response.rows.length; i++) {
					 var tempEntityDesignation = {
						 designationKey: response.rows.item(i).designationKey,
						 organizationKey: response.rows.item(i).organizationKey,
						 designationTitle: response.rows.item(i).designationTitle,
						 designationDetails: response.rows.item(i).designationDetails,
					 };
						 designationList.push(tempEntityDesignation);
				 } // end of for loop
				 return designationList;
				});
			} else {
				 return dataService.callAPI(config.API_URL + 'ThrillAppBase/designations', [], 'GET').then(function (response) {
					 return response.data;
						});
				}
		}, // end of get method
             
             getOrganizationDesignations: function (organizationKey) {
			 var query = designationQueries.getAllDesignations;
			 if (appConfig.APP_MODE == 'offline') {
				 return dataService.executeQuery(query, config.OFFLINE_DBNAME).then(function (response) {
				 var designationList = [];
				 for (var i = 0; i < response.rows.length; i++) {
					 var tempEntityDesignation = {
						 designationKey: response.rows.item(i).designationKey,
						 organizationKey: response.rows.item(i).organizationKey,
						 designationTitle: response.rows.item(i).designationTitle,
						 designationDetails: response.rows.item(i).designationDetails,
					 };
						 designationList.push(tempEntityDesignation);
				 } // end of for loop
				 return designationList;
				});
			} else {
				 return dataService.callAPI(config.API_URL + 'ThrillAppBase/organizations/'+organizationKey+'/designations', [], 'GET').then(function (response) {
                     
					 return response.data;
						});
				}
		}


	} // end of factory
}); // end of module

