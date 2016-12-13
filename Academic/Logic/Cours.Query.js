/*//=============================================================================
// All rights reserved to Thrill Innovative Labs.
// THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
// OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
// LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
// FITNESS FOR A PARTICULAR PURPOSE.
//=============================================================================
//*****************************************************************************
//* Name		    	: Cours.Query.js 
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

	 var app = angular.module('ThrillAcademic.coursQueries', [])

.constant('coursQueries', {
		 getAllCourses : " SELECT coursKey,courseTitle,groupKey,instanceOrganizationKey FROM `Academic.courses` ",
		 getCoursByCoursKey : " SELECT coursKey,courseTitle,groupKey,instanceOrganizationKey FROM `Academic.courses`  WHERE coursKey = ",
});

