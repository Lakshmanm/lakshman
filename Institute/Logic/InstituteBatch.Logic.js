/*//=============================================================================
// All rights reserved to Thrill Innovative Labs.
// THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
// OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
// LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
// FITNESS FOR A PARTICULAR PURPOSE.
//=============================================================================
//*****************************************************************************
//* Name		    	: Subject.Logic.js 
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

	 var app  = angular.module('ThrillInstitute.instituteBatchLogic', ['ThrillFrameworkLibrary.DataService'
			 , 'ThrillAcademic.subjectQueries'
			 , 'ThrillAcademic.config'
			 , 'ThrillCnnWebClient.appConfig'
			 , 'ThrillFrameworkLibrary.appLogger'
	])
	 .factory('instituteBatchLogic', function ($http,
		 dataService,
		 subjectQueries,
		 config,
		 appConfig,
		 appLogger) {

		 return {
	
  addBatch: function (entityBatch) {
			 
				 return dataService.insert(entityBatch,'`institute.batches`', config.OFFLINE_DBNAME, config.API_URL + 'Mcampuz/InstituteBatches').then(function (response) {
			
					 return response;
			 });
	 },
getBatch:function(instituteKey){
         
             return dataService.callAPI(config.API_URL + 'Mcampuz/InstituteBatches/' + instituteKey, [], 'GET').then(function (response) {
          
					 return response.data;
						});   
             
                   
                 
             },
             getEducation:function()
             {
          return dataService.callAPI(config.API_URL + 'Mcampuz/educationTypes', [], 'GET').then(function (response) {
                 
					 return response.data;
						});            
                 
             },
             
             getBatchByBatchKey:function(batchKey)
             {
        return dataService.callAPI(config.API_URL + 'Mcampuz/InstituteBatch/' + batchKey, [], 'GET').then(function (response) {
                 
					 return response.data;
						});   
                      
                 
             },
              updateBatch: function (entityBatch, entityKey) {
				 return dataService.update(entityBatch, 'batchKey="' + entityKey + '"', '`institute.batches`', config.OFFLINE_DBNAME, config.API_URL + 'Mcampuz/InstituteBatch/' + entityKey).then(function (response) {
				 return response;
			 });
	 },
 getBatchByCourseKey:function(courseKey)
             {
        return dataService.callAPI(config.API_URL + 'Mcampuz/InstituteBatchs/' + courseKey, [], 'GET').then(function (response) {
                 
					 return response.data;
						});   
                      
                 
             },

             getBatchByInstituteCourseKey:function(InstituteCourseKey,instituteKey)
             {

  return dataService.callAPI(config.API_URL + 'Mcampuz/InstituteBatch/' + InstituteCourseKey+'/'+instituteKey, [], 'GET').then(function (response) {
                 
					 return response.data;
						});   

             }
             
             

	} // end of factory
}); // end of module

