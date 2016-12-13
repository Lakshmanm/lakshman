/*//=============================================================================
// All rights reserved to Thrill Innovative Labs.
// THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
// OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
// LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
// FITNESS FOR A PARTICULAR PURPOSE.
//=============================================================================
//*****************************************************************************
//* Name		    	: FirstTimeSetup.Queries.js 
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

	 var app  = angular.module('ThrillAssignment.setupQueries', [])

	 app.constant('queries', {

			 //TO-DO , Complete the Create Query
			 Boards: "CREATE TABLE IF NOT EXISTS  `Academic.boards` (boardKey,boardOrganizationKey,instanceOrganizationKey,IsActive,IsDeleted,CreatedUserKey,CreatedDateTime,CreatedAppKey,LastUpdatedUserKey,LastUpdatedDateTime,LastUpdatedAppKey)",
			 DeleteBoards: "DROP TABLE  `Academic.boards`",

         
         
			 //TO-DO , Complete the Create Query
			 Groups: "CREATE TABLE IF NOT EXISTS  `Academic.groups` (groupKey,groupTitle,boardKey,instanceOrganizationKey,IsActive,IsDeleted,CreatedUserKey,CreatedDateTime,CreatedAppKey,LastUpdatedUserKey,LastUpdatedDateTime,LastUpdatedAppKey)",
			 DeleteGroups: "DROP TABLE  `Academic.groups`",

			 //TO-DO , Complete the Create Query
			 Courses: "CREATE TABLE IF NOT EXISTS  `Academic.courses` (coursKey,courseTitle,groupKey,instanceOrganizationKey,IsActive,IsDeleted,CreatedUserKey,CreatedDateTime,CreatedAppKey,LastUpdatedUserKey,LastUpdatedDateTime,LastUpdatedAppKey)",
			 DeleteCourses: "DROP TABLE  `Academic.courses`",

			 //TO-DO , Complete the Create Query
			 Terms: "CREATE TABLE IF NOT EXISTS  `Academic.terms` (termKey,termTitle,courseKey,instanceOrganizationKey,startDate,endDate,folderKey,IsActive,IsDeleted,CreatedUserKey,CreatedDateTime,CreatedAppKey,LastUpdatedUserKey,LastUpdatedDateTime,LastUpdatedAppKey)",
			 DeleteTerms: "DROP TABLE  `Academic.terms`",

			 //TO-DO , Complete the Create Query
			 ElectiveGroups: "CREATE TABLE IF NOT EXISTS  `Academic.electiveGroups` (electiveGroupKey,electiveGroupTitle,termKey,instanceOrganizationKey,minimumSubjects,maximumSubjects,IsActive,IsDeleted,CreatedUserKey,CreatedDateTime,CreatedAppKey,LastUpdatedUserKey,LastUpdatedDateTime,LastUpdatedAppKey)",
			 DeleteElectiveGroups: "DROP TABLE  `Academic.electiveGroups`",

			 //TO-DO , Complete the Create Query
			 Subjects: "CREATE TABLE IF NOT EXISTS  `Academic.subjects` (subjectKey,subjectTitle,termKey,instanceOrganizationKey,isElective,electiveGroupKey,minimumTeachingHours,IsActive,IsDeleted,CreatedUserKey,CreatedDateTime,CreatedAppKey,LastUpdatedUserKey,LastUpdatedDateTime,LastUpdatedAppKey)",
			 DeleteSubjects: "DROP TABLE  `Academic.subjects`",

			 //TO-DO , Complete the Create Query
			 ExaminationTypes: "CREATE TABLE IF NOT EXISTS  `Academic.examinationTypes` (examinationTypeKey,examinationTypeTitle,instanceOrganizationKey,examinationLevelKey,IsActive,IsDeleted,CreatedUserKey,CreatedDateTime,CreatedAppKey,LastUpdatedUserKey,LastUpdatedDateTime,LastUpdatedAppKey)",
			 DeleteExaminationTypes: "DROP TABLE  `Academic.examinationTypes`",

			 //TO-DO , Complete the Create Query
			 Examinations: "CREATE TABLE IF NOT EXISTS  `Academic.examinations` (examinationKey,examinationTitle,instanceOrganizationKey,examinationTypeKey,IsActive,IsDeleted,CreatedUserKey,CreatedDateTime,CreatedAppKey,LastUpdatedUserKey,LastUpdatedDateTime,LastUpdatedAppKey)",
			 DeleteExaminations: "DROP TABLE  `Academic.examinations`",

			 //TO-DO , Complete the Create Query
			 SubjectMarksRanges: "CREATE TABLE IF NOT EXISTS  `Academic.subjectMarksRanges` (subjectMarksRangeKey,subjectKey,examinationTypeKey,minimumSubjects,maximumSubjects,instanceOrganizationKey,IsActive,IsDeleted,CreatedUserKey,CreatedDateTime,CreatedAppKey,LastUpdatedUserKey,LastUpdatedDateTime,LastUpdatedAppKey)",
			 DeleteSubjectMarksRanges: "DROP TABLE  `Academic.subjectMarksRanges`",

			 //TO-DO , Complete the Create Query
			 SubjectComponents: "CREATE TABLE IF NOT EXISTS  `Academic.subjectComponents` (subjectComponentKey,subjectComponentTitle,subjectKey,examinationTypeKey,minimumSubjects,maximumSubjects,IsActive,IsDeleted,CreatedUserKey,CreatedDateTime,CreatedAppKey,LastUpdatedUserKey,LastUpdatedDateTime,LastUpdatedAppKey)",
			 DeleteSubjectComponents: "DROP TABLE  `Academic.subjectComponents`",

			 //TO-DO , Complete the Create Query
			 ExamSchedules: "CREATE TABLE IF NOT EXISTS  `Academic.examSchedules` (examScheduleKey,subjectKey,examinationKey,examinationDate,startDate,endDate,termKey,instanceOrganizationKey,IsActive,IsDeleted,CreatedUserKey,CreatedDateTime,CreatedAppKey,LastUpdatedUserKey,LastUpdatedDateTime,LastUpdatedAppKey)",
			 DeleteExamSchedules: "DROP TABLE  `Academic.examSchedules`"
	 });
