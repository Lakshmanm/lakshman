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

	 var app  = angular.module('ThrillInstitute.instituteSubjectLogic', ['ThrillFrameworkLibrary.DataService'
			 , 'ThrillAcademic.subjectQueries'
			 , 'ThrillAcademic.config'
			 , 'ThrillCnnWebClient.appConfig'
			 , 'ThrillFrameworkLibrary.appLogger'
	])
	 .factory('instituteSubjectLogic', function ($http,
		 dataService,
		 subjectQueries,
		 config,
		 appConfig,
		 appLogger) {

		 return {
	
  addInstituteSubject: function (entitySubject) {
			 
				 return dataService.insert(entitySubject,'`institute.institutesubjects`', config.OFFLINE_DBNAME, config.API_URL + 'Mcampuz/InstituteSubjects').then(function (response) {
			
					 return response;
			 });
	 },
getSubjectByInstituteKey:function(instituteKey)
             {
             return dataService.callAPI(config.API_URL + 'Mcampuz/InstituteSubjects/' + instituteKey, [], 'GET').then(function (response) {
					 return response.data;
						});   
             
                   
                 
             }
             

	} // end of factory
}); // end of module

