/*//=============================================================================
// All rights reserved to Thrill Innovative Labs.
// THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
// OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
// LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
// FITNESS FOR A PARTICULAR PURPOSE.
//=============================================================================
//*****************************************************************************
//* Name		    	: Term.Logic.js 
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

	 var app  = angular.module('ThrillInstitute.instituteTermLogic', ['ThrillFrameworkLibrary.DataService'
			 , 'ThrillAcademic.termQueries'
			 , 'ThrillAcademic.config'
			 , 'ThrillCnnWebClient.appConfig'
			 , 'ThrillFrameworkLibrary.appLogger'
	])
	 .factory('instituteTermLogic', function ($http,
		 dataService,
		 termQueries,
		 config,
		 appConfig,
		 appLogger) {

		 return {


			 addInstituteTerm: function (entityTerm) {
			    		console.log(entityTerm);
               
				 return dataService.insert(entityTerm, '`institute.instituteterms`', config.OFFLINE_DBNAME, config.API_URL + 'Mcampuz/InstituteTerms').then(function (response) {
	
					 return response;
			 });
	 },

           getTermByInstituteKey  :function(instituteKey)
             {
          return dataService.callAPI(config.API_URL + 'Mcampuz/InstituteTerms/' + instituteKey, [], 'GET').then(function (response) {
					 return response.data;
						});   
             
             
         }

			    
             
		

	} // end of factory
}); // end of module

