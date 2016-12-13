/*//=============================================================================
// All rights reserved to Thrill Innovative Labs.
// THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
// OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
// LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
// FITNESS FOR A PARTICULAR PURPOSE.
//=============================================================================
//*****************************************************************************
//* Name		    	: Cours.Logic.js 
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

var app = angular.module('ThrillInstitute.instituteCoursLogic', ['ThrillFrameworkLibrary.DataService'
			 , 'ThrillAcademic.coursQueries'
			 , 'ThrillAcademic.config'
			 , 'ThrillCnnWebClient.appConfig'
			 , 'ThrillFrameworkLibrary.appLogger'
])
	.factory('instituteCoursLogic', function ($http,
		dataService,
		coursQueries,
		config,
		appConfig,
		appLogger) {

		return {

			addInstituteCourse: function (entityCours) {
				return dataService.insert(entityCours, '`Academic.courses`', config.OFFLINE_DBNAME, config.API_URL + 'Mcampuz/InstituteCourses').then(function (response) {
					return response;
				});
			},
            
              getCourseByInstituteKey  :function(instituteKey)
             {
          return dataService.callAPI(config.API_URL + 'Mcampuz/InstituteCourses/' + instituteKey, [], 'GET').then(function (response) {
					 return response.data;
						});   
             
             
         },
        getCourseByInstituteGroupKey:function (InstituteGroupKey,instituteKey)
        {

  return dataService.callAPI(config.API_URL + 'Mcampuz/InstituteCourseByGroup/' + InstituteGroupKey+'/'+instituteKey, [], 'GET').then(function (response) {
					 return response.data;
						});   

        }

			

		} // end of factory
	}); // end of module

