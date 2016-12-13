/*//=============================================================================
// All rights reserved to Thrill Innovative Labs.
// THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
// OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
// LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
// FITNESS FOR A PARTICULAR PURPOSE.
//=============================================================================
//*****************************************************************************
//* Name		    	: Subject.Query.js 
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

	 var app = angular.module('ThrillAcademic.subjectQueries', [])

.constant('subjectQueries', {
		 getAllSubjects : " SELECT subjectKey,subjectTitle,termKey,instanceOrganizationKey,isElective,electiveGroupKey,minimumTeachingHours FROM `Academic.subjects` ",
		 getSubjectBySubjectKey : " SELECT subjectKey,subjectTitle,termKey,instanceOrganizationKey,isElective,electiveGroupKey,minimumTeachingHours FROM `Academic.subjects`  WHERE subjectKey = ",
});

