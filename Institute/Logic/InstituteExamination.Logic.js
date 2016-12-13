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

	 var app  = angular.module('ThrillInstitute.instituteExaminationLogic', ['ThrillFrameworkLibrary.DataService'
			 , 'ThrillAcademic.examinationQueries'
			 , 'ThrillAcademic.config'
			 , 'ThrillCnnWebClient.appConfig'
			 , 'ThrillFrameworkLibrary.appLogger'
	])
	 .factory('instituteExaminationLogic', function ($http,
		 dataService,
		 examinationQueries,
		 config,
		 appConfig,
		 appLogger) {

		 return {

			 addInstituteExamination: function (entityExamination) {
				 return dataService.insert(entityExamination, '`institute.instituteExaminations`', config.OFFLINE_DBNAME, config.API_URL + 'Mcampuz/InstituteExaminations').then(function (response) {
					 return response;
			 });
	 },
getExaminationByInstituteKey:function(instituteKey)
             {
              return dataService.callAPI(config.API_URL + 'Mcampuz/InstituteExaminations/' + instituteKey, [], 'GET').then(function (response) {
					 return response.data;
						});   
             
                  
                 
             }
			
	} // end of factory
}); // end of module

