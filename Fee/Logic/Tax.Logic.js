/*//=============================================================================
// All rights reserved to Thrill Innovative Labs.
// THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
// OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
// LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
// FITNESS FOR A PARTICULAR PURPOSE.
//=============================================================================
//*****************************************************************************
//* Name		    	: Examination.Logic.js 
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

	 var app  = angular.module('mcampuz.TaxLogic', ['ThrillFrameworkLibrary.DataService'
			 , 'ThrillAcademic.examinationQueries'
			 , 'ThrillAcademic.config'
			 , 'ThrillCnnWebClient.appConfig'
			 , 'ThrillFrameworkLibrary.appLogger'
	])
	 .factory('TaxLogic', function ($http,
		 dataService,
		 examinationQueries,
		 config,
		 appConfig,
		 appLogger) {

		 return {

			 addTax: function (entityTax) {
				 return dataService.insert(entityTax, '`feemanagement.taxes`', config.OFFLINE_DBNAME, config.API_URL + 'Fee/tax').then(function (response) {
					 return response;
			 });
	 },

			 updateTax: function (entityTax, entityKey) {
				 return dataService.update(entityTax, 'TaxKey="' + entityKey + '"', '`feemanagement.taxes`', config.OFFLINE_DBNAME, config.API_URL + 'Fee/tax/' + entityKey).then(function (response) {
				 return response;
			 });
	 },


			 deleteTax: function (entityKey) {
				 return dataService.delete('TaxKey="' + entityKey + '"', '`feemanagement.taxes`', config.OFFLINE_DBNAME, config.API_URL + 'Fee/tax/' + entityKey).then(function (response) {
				 return response;
			 });
	 },


		 gettaxBytaxkey: function (entityKey) {
			 
			 if (appConfig.APP_MODE == 'offline') {
			 	var query = examinationQueries.getExaminationByExaminationKey + "'" + entityKey + "'";
				 return dataService.executeQuery(query, config.OFFLINE_DBNAME).then(function (response) {
				 var examinationList = [];
				 for (var i = 0; i < response.rows.length; i++) {
					 var tempEntityExamination = {
						 examinationkey: response.rows.item(i).examinationKey,
						 examinationtitle: response.rows.item(i).examinationTitle,
						 instanceorganizationkey: response.rows.item(i).instanceOrganizationKey,
						 examinationtypekey: response.rows.item(i).examinationTypeKey,
					 };
						 examinationList.push(tempEntityExamination);
				 } // end of for loop
				 return examinationList;
				});
			} else {
				 return dataService.callAPI(config.API_URL + 'Fee/tax/' + entityKey, [], 'GET').then(function (response) {
				//	alert(JSON.stringify(response))
					 return response.data;


						});
				}
		}, // end of get method


		 gettaxList: function (instituteKey) {
			
			 if (appConfig.APP_MODE == 'offline') {
			 	 var query = examinationQueries.getAllExaminations;
				 return dataService.executeQuery(query, config.OFFLINE_DBNAME).then(function (response) {
				 var examinationList = [];
				 for (var i = 0; i < response.rows.length; i++) {
					 var tempEntityExamination = {
						 examinationkey: response.rows.item(i).examinationKey,
						 examinationtitle: response.rows.item(i).examinationTitle,
						 instanceOrganizationKey: response.rows.item(i).instanceOrganizationKey,
						 examinationTypeKey: response.rows.item(i).examinationTypeKey,
					 };
						 examinationList.push(tempEntityExamination);
				 } // end of for loop
				 return examinationList;
				});
			} else {
				 return dataService.callAPI(config.API_URL + 'Fee/institute/'+instituteKey+'/tax', [], 'GET').then(function (response) {
					 return response.data;
						});
				}
		} ,// end of get method
    	 gettaxListActive: function (instituteKey) {
			
			 if (appConfig.APP_MODE == 'offline') {
			 	 var query = examinationQueries.getAllExaminations;
				 return dataService.executeQuery(query, config.OFFLINE_DBNAME).then(function (response) {
				 var examinationList = [];
				 for (var i = 0; i < response.rows.length; i++) {
					 var tempEntityExamination = {
						 examinationkey: response.rows.item(i).examinationKey,
						 examinationtitle: response.rows.item(i).examinationTitle,
						 instanceOrganizationKey: response.rows.item(i).instanceOrganizationKey,
						 examinationTypeKey: response.rows.item(i).examinationTypeKey,
					 };
						 examinationList.push(tempEntityExamination);
				 } // end of for loop
				 return examinationList;
				});
			} else {
				 return dataService.callAPI(config.API_URL + 'Fee/institute/active/'+instituteKey+'/tax', [], 'GET').then(function (response) {
					 return response.data;
						});
				}
		} ,

getExaminationByExaminationTypeKey:function(examinationTypeKey)
             {
                  var query = examinationQueries.getExaminationByExaminationTypeKey + "'" + examinationTypeKey + "'";
			 if (appConfig.APP_MODE == 'offline') {
				 return dataService.executeQuery(query, config.OFFLINE_DBNAME).then(function (response) {
				 var examinationList = [];
				 for (var i = 0; i < response.rows.length; i++) {
					 var tempEntityExamination = {
						 examinationkey: response.rows.item(i).examinationKey,
						 examinationtitle: response.rows.item(i).examinationTitle,
						 instanceorganizationkey: response.rows.item(i).instanceOrganizationKey,
						 examinationtypekey: response.rows.item(i).examinationTypeKey,
					 };
						 examinationList.push(tempEntityExamination);
				 } // end of for loop
				 return examinationList;
				});
			} else {
				 return dataService.callAPI(config.API_URL + 'Academic/ExaminationType/' + examinationTypeKey+'/Examinations', [], 'GET').then(function (response) {
					 return response.data;
						});
				}
           
         }

	} // end of factory
}); // end of module

