/*//=============================================================================
// All rights reserved to Thrill Innovative Labs.
// THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
// OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
// LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
// FITNESS FOR A PARTICULAR PURPOSE.
//=============================================================================
//*****************************************************************************
//* Name		    	: Institute.Logic.js 
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

	 var app  = angular.module('ThrillDailyRoutine.assignLogic', ['ThrillFrameworkLibrary.DataService'
			 
			 , 'ThrillDailyRoutine.config'
			 , 'ThrillCnnWebClient.appConfig'
			 , 'ThrillFrameworkLibrary.appLogger'
	])
	 .factory('assignLogic', function ($http,
		 dataService,
		 boardQueries,
		 config,
		 appConfig,
		 appLogger) {

		 return {

		 addClassTeacher: function (classTeacher) {
	 
 
  return dataService.insert(classTeacher, '`dailyroutine.classteachers`', config.OFFLINE_DBNAME, config.API_URL + 'DailyRoutine/ClassTeachers').then(function (response) {
console.log(classTeacher);
					 return response;
			 });
	 },
             
		 getClassTeacherByInstituteKey: function (instituteKey) {
             
               return dataService.callAPI( config.API_URL + 'DailyRoutine/ClassTeacherKey/'+instituteKey,[],'GET').then(function (response) {

					 return response.data;
			 });
	 }, 
	 
 
  
            
                 
             
	} // end of factory
}); // end of module

