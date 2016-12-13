/*//=============================================================================
// All rights reserved to Thrill Innovative Labs.
// THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
// OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
// LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
// FITNESS FOR A PARTICULAR PURPOSE.
//=============================================================================
//*****************************************************************************
//* Name		    	: Group.Logic.js 
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

var app = angular.module('ThrillInstitute.instituteGroupLogic', ['ThrillFrameworkLibrary.DataService'
			 , 'ThrillAcademic.groupQueries'
			 , 'ThrillAcademic.config'
			 , 'ThrillCnnWebClient.appConfig'
			 , 'ThrillFrameworkLibrary.appLogger'
])
	.factory('instituteGroupLogic', function ($http,
		dataService,
		groupQueries,
		config,
		appConfig,
		appLogger) {

		return {

			addInstituteGroup: function (entityGroup) {
				//alert(JSON.stringify(entityGroup));
				return dataService.insert(entityGroup, '`institute.institutegroups`', config.OFFLINE_DBNAME, config.API_URL + 'Mcampuz/InstituteGroups').then(function (response) {
					return response;
				});
			},
 
             getGroupByInstituteKey:function(instituteKey)
             {
          return dataService.callAPI(config.API_URL + 'Mcampuz/InstituteGroups/' + instituteKey, [], 'GET').then(function (response) {
					 return response.data;
						});   
             
             
         },
         
		  getGroupByInstituteBoardKey:function(instituteKey,InstituteBoardKey)
             {
          return dataService.callAPI(config.API_URL + 'Mcampuz/InstituteGroupByBoard/' + InstituteBoardKey+'/' + instituteKey, [], 'GET').then(function (response) {
					 return response.data;
						});   
             
             
         },
		} // end of factory
	}); // end of module

