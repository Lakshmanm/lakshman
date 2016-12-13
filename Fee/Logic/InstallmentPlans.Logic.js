/*//=============================================================================
// All rights reserved to Thrill Innovative Labs.
// THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
// OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
// LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
// FITNESS FOR A PARTICULAR PURPOSE.
//=============================================================================
//*****************************************************************************
//* Name		    	: ElectiveGroup.Logic.js 
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

	 var app  = angular.module('mcampuz.InstallmentPlansLogic', ['ThrillFrameworkLibrary.DataService'
			 , 'ThrillAcademic.electiveGroupQueries'
			 , 'ThrillAcademic.config'
			 , 'ThrillCnnWebClient.appConfig'
			 , 'ThrillFrameworkLibrary.appLogger'
	])
	 .factory('InstallmentPlansLogic', function ($http,
		 dataService,
		 electiveGroupQueries,
		 config,
		 appConfig,
		 appLogger) {

		 return {

			 addPlan: function (entityplan) {
				 return dataService.insert(entityplan, '`feemanagement.installmentplans`', config.OFFLINE_DBNAME, config.API_URL + 'Fee/installmentPlan').then(function (response) {
					 return response;
			 });
	 },

			 updatePlan: function (entityplan, entityKey) {
				 return dataService.update(entityplan, 'InstallmentPlankey="' + entityKey + '"', '`feemanagement.installmentplans`', config.OFFLINE_DBNAME, config.API_URL + 'Fee/installmentPlan/' + entityKey).then(function (response) {
				 return response;
			 });
	 },


			 deletePlan: function (entityKey) {
				 return dataService.delete('InstallmentPlankey="' + entityKey + '"', '`feemanagement.installmentplans`', config.OFFLINE_DBNAME, config.API_URL + 'Fee/installmentPlan/' + entityKey).then(function (response) {
				 return response;
			 });
	 },


		 planByplankey: function (entityKey) {
			 
			 if (appConfig.APP_MODE == 'offline') {
			 	var query = electiveGroupQueries.getElectiveGroupByElectiveGroupKey + "'" + entityKey + "'";
				 return dataService.executeQuery(query, config.OFFLINE_DBNAME).then(function (response) {
				 var electiveGroupList = [];
				 for (var i = 0; i < response.rows.length; i++) {
					 var tempEntityElectiveGroup = {
						 electivegroupkey: response.rows.item(i).electiveGroupKey,
						 electivegrouptitle: response.rows.item(i).electiveGroupTitle,
						 termkey: response.rows.item(i).termKey,
						 instanceorganizationkey: response.rows.item(i).instanceOrganizationKey,
						 minimumsubjects: response.rows.item(i).minimumSubjects,
						 maximumsubjects: response.rows.item(i).maximumSubjects,
					 };
						 electiveGroupList.push(tempEntityElectiveGroup);
				 } // end of for loop
				 return electiveGroupList;
				});
			} else {
				 return dataService.callAPI(config.API_URL + 'Fee/installmentPlan/' + entityKey, [], 'GET').then(function (response) {
					 return response.data;
						});
				}
		}, // end of get method


		 getplanList: function (organizationKey) {
			
			 if (appConfig.APP_MODE == 'offline') {
			 	 var query = electiveGroupQueries.getAllElectiveGroups;
				 return dataService.executeQuery(query, config.OFFLINE_DBNAME).then(function (response) {
				 var electiveGroupList = [];
				 for (var i = 0; i < response.rows.length; i++) {
					 var tempEntityElectiveGroup = {
						 electivegroupkey: response.rows.item(i).electiveGroupKey,
						 electivegrouptitle: response.rows.item(i).electiveGroupTitle,
						 termkey: response.rows.item(i).termKey,
						 instanceorganizationkey: response.rows.item(i).instanceOrganizationKey,
						 minimumsubjects: response.rows.item(i).minimumSubjects,
						 maximumsubjects: response.rows.item(i).maximumSubjects,
					 };
						 electiveGroupList.push(tempEntityElectiveGroup);
				 } // end of for loop
				 return electiveGroupList;
				});
			} else {
				 return dataService.callAPI(config.API_URL + 'Fee/institute/'+organizationKey+ '/installmentPlan', [], 'GET').then(function (response) {
					 return response.data;
						});
				}
		} ,// end of get method

             
             getElectiveGroupByTermKey:function(termKey){
              var query = electiveGroupQueries.getAllElectiveGroups;
			 if (appConfig.APP_MODE == 'offline') {
				 return dataService.executeQuery(query, config.OFFLINE_DBNAME).then(function (response) {
				 var electiveGroupList = [];
				 for (var i = 0; i < response.rows.length; i++) {
					 var tempEntityElectiveGroup = {
						 electivegroupkey: response.rows.item(i).electiveGroupKey,
						 electivegrouptitle: response.rows.item(i).electiveGroupTitle,
						 termkey: response.rows.item(i).termKey,
						 instanceorganizationkey: response.rows.item(i).instanceOrganizationKey,
						 minimumsubjects: response.rows.item(i).minimumSubjects,
						 maximumsubjects: response.rows.item(i).maximumSubjects,
					 };
						 electiveGroupList.push(tempEntityElectiveGroup);
				 } // end of for loop
				 return electiveGroupList;
				});
			} else {
				 return dataService.callAPI(config.API_URL + 'Academic/Term/'+termKey+ '/ElectiveGroups', [], 'GET').then(function (response) {
					 return response.data;
						});
				}
             
         }

	} // end of factory
}); // end of module

