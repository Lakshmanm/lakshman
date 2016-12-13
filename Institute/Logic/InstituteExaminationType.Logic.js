/*//=============================================================================
// All rights reserved to Thrill Innovative Labs.
// THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
// OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
// LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
// FITNESS FOR A PARTICULAR PURPOSE.
//=============================================================================
//*****************************************************************************
//* Name		    	: ExaminationType.Logic.js 
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

	 var app  = angular.module('ThrillInstitute.instituteExaminationTypeLogic', ['ThrillFrameworkLibrary.DataService'
			 , 'ThrillAcademic.examinationTypeQueries'
			 , 'ThrillAcademic.config'
			 , 'ThrillCnnWebClient.appConfig'
			 , 'ThrillFrameworkLibrary.appLogger'
	])
	 .factory('instituteExaminationTypeLogic', function ($http,
		 dataService,
		 examinationTypeQueries,
		 config,
		 appConfig,
		 appLogger) {

		 return {

			 addInstituteExaminationType: function (entityExaminationType) {
                 console.log(entityExaminationType);
				 return dataService.insert(entityExaminationType,  '`institute.instituteExaminationTypes`', config.OFFLINE_DBNAME, config.API_URL + 'Mcampuz/InstituteExaminationTypes').then(function (response) {
					 return response;
			 });
	 },
getExaminationTypeByInstituteKey:function(instituteKey)
             {
                return dataService.callAPI(config.API_URL + 'Mcampuz/InstituteExaminationTypes/' + instituteKey, [], 'GET').then(function (response) {
					 return response.data;
						});   
             
                
                 
             }
			
	} // end of factory
}); // end of module

