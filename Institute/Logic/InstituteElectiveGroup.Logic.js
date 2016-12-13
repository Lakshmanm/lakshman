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

	 var app  = angular.module('ThrillInstitute.instituteElectiveGroupLogic', ['ThrillFrameworkLibrary.DataService'
			 , 'ThrillAcademic.electiveGroupQueries'
			 , 'ThrillAcademic.config'
			 , 'ThrillCnnWebClient.appConfig'
			 , 'ThrillFrameworkLibrary.appLogger'
	])
	 .factory('instituteElectiveGroupLogic', function ($http,
		 dataService,
		 electiveGroupQueries,
		 config,
		 appConfig,
		 appLogger) {

		 return {

			 addInstituteElectiveGroup: function (entityElectiveGroup) {
                 console.log(entityElectiveGroup);
				 return dataService.insert(entityElectiveGroup, '`institute.instituteelectivegroups`', config.OFFLINE_DBNAME, config.API_URL + 'Mcampuz/InstituteElectiveGroups').then(function (response) {
					 return response;
			 });
	 },
getElectiveGroupByInstituteKey:function(instituteKey)
             {
          return dataService.callAPI(config.API_URL + 'Mcampuz/InstituteElectiveGroups/' + instituteKey, [], 'GET').then(function (response) {
              console.log(response.data);
					 return response.data;
						});   
             
             
         }
			

	} // end of factory
}); // end of module

