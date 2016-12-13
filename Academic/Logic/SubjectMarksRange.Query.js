/*//=============================================================================
// All rights reserved to Thrill Innovative Labs.
// THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
// OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
// LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
// FITNESS FOR A PARTICULAR PURPOSE.
//=============================================================================
//*****************************************************************************
//* Name		    	: SubjectMarksRange.Query.js 
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

	 var app = angular.module('ThrillAcademic.subjectMarksRangeQueries', [])

.constant('subjectMarksRangeQueries', {
		 getAllSubjectMarksRanges : " SELECT subjectMarksRangeKey,subjectKey,examinationTypeKey,minimumSubjects,maximumSubjects,instanceOrganizationKey FROM `Academic.subjectMarksRanges` ",
		 getSubjectMarksRangeBySubjectMarksRangeKey : " SELECT subjectMarksRangeKey,subjectKey,examinationTypeKey,minimumSubjects,maximumSubjects,instanceOrganizationKey FROM `Academic.subjectMarksRanges`  WHERE subjectMarksRangeKey = ",
});

