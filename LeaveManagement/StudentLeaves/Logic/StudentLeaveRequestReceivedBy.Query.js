/*//=============================================================================
// All rights reserved to Thrill Innovative Labs.
// THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
// OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
// LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
// FITNESS FOR A PARTICULAR PURPOSE.
//=============================================================================
//*****************************************************************************
//* Name		    	: StudentLeaveRequestReceivedBy.Query.js 
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

	 var app = angular.module('ThrillStudentLeaves.studentLeaveRequestReceivedByQueries', [])

.constant('studentLeaveRequestReceivedByQueries', {
		 getAllStudentLeaveRequestReceivedBies : " SELECT studentLeaveRequestReceivedByKey,studentLeaveRequestReceivedByTitle,instanceOrganizationKey FROM `StudentLeaves.studentLeaveRequestReceivedBies` ",
		 getStudentLeaveRequestReceivedByByStudentLeaveRequestReceivedByKey : " SELECT studentLeaveRequestReceivedByKey,studentLeaveRequestReceivedByTitle,instanceOrganizationKey FROM `StudentLeaves.studentLeaveRequestReceivedBies`  WHERE studentLeaveRequestReceivedByKey = ",
});

