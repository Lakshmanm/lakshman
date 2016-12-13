/*//=============================================================================
// All rights reserved to Thrill Innovative Labs.
// THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
// OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
// LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
// FITNESS FOR A PARTICULAR PURPOSE.
//=============================================================================
//*****************************************************************************
//* Name		    	: SubjectMarksRange.Logic.js 
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

	 var app  = angular.module('ThrillAcademic.subjectMarksRangeLogic', ['ThrillFrameworkLibrary.DataService'
			 , 'ThrillAcademic.subjectMarksRangeQueries'
			 , 'ThrillAcademic.config'
			 , 'ThrillCnnWebClient.appConfig'
			 , 'ThrillFrameworkLibrary.appLogger'
	])
	 .factory('subjectMarksRangeLogic', function ($http,
		 dataService,
		 subjectMarksRangeQueries,
		 config,
		 appConfig,
		 appLogger) {

		 return {

			 addSubjectMarksRange: function (entitySubjectMarksRange) {
				 return dataService.insert(entitySubjectMarksRange, '`Academic.subjectMarksRanges`', config.OFFLINE_DBNAME, config.API_URL + 'Academic/SubjectMarksRanges').then(function (response) {
					 return response;
			 });
	 },

			 updateSubjectMarksRange: function (entitySubjectMarksRange, entityKey) {
                 console.log();
				 return dataService.update(entitySubjectMarksRange, 'subjectMarksRangeKey="' + entityKey + '"', '`Academic.subjectMarksRanges`', config.OFFLINE_DBNAME, config.API_URL + 'Academic/SubjectMarksRanges/' + entityKey).then(function (response) {
				 return response;
			 });
	 },


			 deleteSubjectMarksRange: function (entityKey) {
				 return dataService.delete('subjectMarksRangeKey="' + entityKey + '"', '`Academic.subjectMarksRanges`', config.OFFLINE_DBNAME, config.API_URL + 'Academic/SubjectMarksRanges/' + entityKey).then(function (response) {
				 return response;
			 });
	 },


		 getSubjectMarksRangeBySubjectMarksRangeKey: function (entityKey) {
			 var query = subjectMarksRangeQueries.getSubjectMarksRangeBySubjectMarksRangeKey + "'" + entityKey + "'";
			 if (appConfig.APP_MODE == 'offline') {
				 return dataService.executeQuery(query, config.OFFLINE_DBNAME).then(function (response) {
				 var subjectMarksRangeList = [];
				 for (var i = 0; i < response.rows.length; i++) {
					 var tempEntitySubjectMarksRange = {
						 subjectmarksrangekey: response.rows.item(i).subjectMarksRangeKey,
						 subjectkey: response.rows.item(i).subjectKey,
						 examinationtypekey: response.rows.item(i).examinationTypeKey,
						 minimumsubjects: response.rows.item(i).minimumSubjects,
						 maximumsubjects: response.rows.item(i).maximumSubjects,
						 instanceorganizationkey: response.rows.item(i).instanceOrganizationKey,
					 };
						 subjectMarksRangeList.push(tempEntitySubjectMarksRange);
				 } // end of for loop
				 return subjectMarksRangeList;
				});
			} else {
				 return dataService.callAPI(config.API_URL + 'Academic/SubjectMarksRanges/' + entityKey, [], 'GET').then(function (response) {
					 return response.data;
						});
				}
		}, // end of get method


		 getAllSubjectMarksRanges: function (organizationKey) {
			 var query = subjectMarksRangeQueries.getAllSubjectMarksRanges;
			 if (appConfig.APP_MODE == 'offline') {
				 return dataService.executeQuery(query, config.OFFLINE_DBNAME).then(function (response) {
				 var subjectMarksRangeList = [];
				 for (var i = 0; i < response.rows.length; i++) {
					 var tempEntitySubjectMarksRange = {
						 subjectmarksrangekey: response.rows.item(i).subjectMarksRangeKey,
						 subjectKey: response.rows.item(i).subjectKey,
						 examinationTypeKey: response.rows.item(i).examinationTypeKey,
						 minimumsubjects: response.rows.item(i).minimumSubjects,
						 maximumsubjects: response.rows.item(i).maximumSubjects,
						 instanceOrganizationKey: response.rows.item(i).instanceOrganizationKey,
					 };
						 subjectMarksRangeList.push(tempEntitySubjectMarksRange);
				 } // end of for loop
				 return subjectMarksRangeList;
				});
			} else {
				 return dataService.callAPI(config.API_URL + 'Academic/Organizations/'+organizationKey+'/SubjectMarksRanges', [], 'GET').then(function (response) {
					 return response.data;
						});
				}
		} // end of get method


	} // end of factory
}); // end of module

