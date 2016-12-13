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

	 var app  = angular.module('ThrillAcademic.subjectLogic', ['ThrillFrameworkLibrary.DataService'
			 , 'ThrillAcademic.subjectQueries'
			 , 'ThrillAcademic.config'
			 , 'ThrillCnnWebClient.appConfig'
			 , 'ThrillFrameworkLibrary.appLogger'
	])
	 .factory('subjectLogic', function ($http,
		 dataService,
		 subjectQueries,
		 config,
		 appConfig,
		 appLogger) {

		 return {
	
  addSubject: function (entitySubject) {
			 
				 return dataService.insert(entitySubject, '`Academic.subjects`', config.OFFLINE_DBNAME, config.API_URL + 'Academic/Subjects').then(function (response) {
			
					 return response;
			 });
	 },
              updateSubject: function (entitySubject,subjectKey) {
			 
          return dataService.update(entitySubject, 'entitySubject="' + subjectKey + '"', '`Academic.subjects`', config.OFFLINE_DBNAME, config.API_URL + 'Academic/Subjects/' + subjectKey).then(function (response) {
				 return response;
			 });
	 },

	  addExamLevel: function (entityExam) {
		 return dataService.insert(entityExam, '`academic.subjectmarksranges`', config.OFFLINE_DBNAME, config.API_URL + 'Academic/SubjectMarksRanges').then(function (response) {
		
				 return response;
			 });
	 },

 getAttendanceGenearlSettings: function (entityID,examinationTypeKey) {

             return dataService.callAPI(config.API_URL + 'Academic/ExaminationTypes/' + entityID + '/' + examinationTypeKey, [], 'GET').then(function (response) {
                   return response.data;
                        });
               
        },


 getAllSAcademicYear: function (organizationKey) {
		    	 if (appConfig.APP_MODE == 'offline') {
			 	 var query = boardQueries.getAllBoards;
				 return dataService.executeQuery(query, config.OFFLINE_DBNAME).then(function (response) {
				 var boardList = [];
				 for (var i = 0; i < response.rows.length; i++) {
					 var tempEntityBoard = {
						 boardkey: response.rows.item(i).boardKey,
						 boardorganizationkey: response.rows.item(i).boardOrganizationKey,
						 instanceorganizationkey: response.rows.item(i).instanceOrganizationKey,
					 };
						 boardList.push(tempEntityBoard);
				 } // end of for loop
				 return boardList;

				});
			} else {
								 
				 return dataService.callAPI(config.API_URL + 'Academic/Organization/'+organizationKey+'/AcademicYear', [], 'GET').then(function (response) {


					//console.log(response);
					 return response.data;

						});
				}
		} ,






		 deleteSubject: function (entityKey) {
				 return dataService.delete('subjectKey="' + entityKey + '"', '`Academic.subjects`', config.OFFLINE_DBNAME, config.API_URL + 'Academic/subjects/' + entityKey).then(function (response) {
				 return response;
			 });
	 },


		 getSubjectBySubjectKey: function (entityKey) {
			 var query = subjectQueries.getSubjectBySubjectKey + "'" + entityKey + "'";
			 if (appConfig.APP_MODE == 'offline') {
				 return dataService.executeQuery(query, config.OFFLINE_DBNAME).then(function (response) {
				 var subjectList = [];
				 for (var i = 0; i < response.rows.length; i++) {
					 var tempEntitySubject = {
						 subjectkey: response.rows.item(i).subjectKey,
						 subjecttitle: response.rows.item(i).subjectTitle,
						 termkey: response.rows.item(i).termKey,
						 instanceorganizationkey: response.rows.item(i).instanceOrganizationKey,
						 iselective: response.rows.item(i).isElective,
						 electivegroupkey: response.rows.item(i).electiveGroupKey,
						 minimumteachinghours: response.rows.item(i).minimumTeachingHours,
					 };
						 subjectList.push(tempEntitySubject);
				 } // end of for loop
				 return subjectList;
				});
			} else {
				 return dataService.callAPI(config.API_URL + 'Academic/subjects/' + entityKey, [], 'GET').then(function (response) {
                     appLogger.log(JSON.stringify(response))
                     response.data[0].isElective=response.data[0].isElective.data[0];
                     console.log(response.data);
					 return response.data;
						});
				}
		}, // end of get method
             
              getSubjectByTermKey: function (termKey) {
			 
			 if (appConfig.APP_MODE == 'offline') {
				
			} else {
				 return dataService.callAPI(config.API_URL + 'Academic/Terms/'+termKey+'/subjects' , [], 'GET').then(function (response) {
                     appLogger.log(JSON.stringify(response))
                    // response.data[0].isElective=response.data[0].isElective.data[0];
                     console.log(response.data);
					 return response.data;
						});
				}
		}, // end of get method
getExamMarksBySubjectKey:function(subjectKey)
{
 return dataService.callAPI(config.API_URL + 'Academic/subjects/'+subjectKey+'/marks' , [], 'GET').then(function (response) {
                     appLogger.log(JSON.stringify(response))
                    // response.data[0].isElective=response.data[0].isElective.data[0];
                     console.log(response.data);
					 return response.data;
						});

},

		 getAllSubjects: function (organizationKey) {
			 var query = subjectQueries.getSubjectByOrganizationKey + "'" + organizationKey + "'";
			 if (appConfig.APP_MODE == 'offline') {
				 return dataService.executeQuery(query, config.OFFLINE_DBNAME).then(function (response) {
				 var subjectList = [];
				 for (var i = 0; i < response.rows.length; i++) {
					 var tempEntitySubject = {
						 subjectkey: response.rows.item(i).subjectKey,
						 subjecttitle: response.rows.item(i).subjectTitle,
						 termkey: response.rows.item(i).termKey,
						 instanceorganizationkey: response.rows.item(i).instanceOrganizationKey,
						 iselective: response.rows.item(i).isElective,
						 electivegroupkey: response.rows.item(i).electiveGroupKey,
						 minimumteachinghours: response.rows.item(i).minimumTeachingHours,
					 };
						 subjectList.push(tempEntitySubject);
				 } // end of for loop
				 return subjectList;
				});
			} else {
					return dataService.callAPI(config.API_URL + 'Academic/Organizations/' + organizationKey + '/Subjects', [], 'GET').then(function (response) {
					 return response.data;
                     
						});
				}
		} // end of get method


	} // end of factory
}); // end of module

