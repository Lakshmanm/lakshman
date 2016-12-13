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

	 var app  = angular.module('ThrillStudentLeaves.setupQueries', [])

	 app.constant('queries', {

			 //TO-DO , Complete the Create Query
			 StudentLeaveRequests: "CREATE TABLE IF NOT EXISTS  `StudentLeaves.studentLeaveRequests` (studentLeaveRequestKey,personKey,studentKey,startDateTime,endDateTime,noOfDays,reasonForLeaveKey,requestModeKey,requestReceviedByKey,remarks,Status,instanceOrganizationKey)",
			 DeleteStudentLeaveRequests: "DROP TABLE  `StudentLeaves.studentLeaveRequests`",

			 //TO-DO , Complete the Create Query
			 StudentLeaveReasons: "CREATE TABLE IF NOT EXISTS  `StudentLeaves.studentLeaveReasons` (studentLeaveReasonKey,studentLeaveReasonTitle,instanceOrganizationKey)",
			 DeleteStudentLeaveReasons: "DROP TABLE  `StudentLeaves.studentLeaveReasons`",

			 //TO-DO , Complete the Create Query
			 StudentLeaveRequestModes: "CREATE TABLE IF NOT EXISTS  `StudentLeaves.studentLeaveRequestModes` (studentLeaveRequestModeKey,studentLeaveRequestModeTitle,instanceOrganizationKey)",
			 DeleteStudentLeaveRequestModes: "DROP TABLE  `StudentLeaves.studentLeaveRequestModes`",

			 //TO-DO , Complete the Create Query
			 StudentLeaveRequestReceivedBies: "CREATE TABLE IF NOT EXISTS  `StudentLeaves.studentLeaveRequestReceivedBies` (studentLeaveRequestReceivedByKey,studentLeaveRequestReceivedByTitle,instanceOrganizationKey)",
			 DeleteStudentLeaveRequestReceivedBies: "DROP TABLE  `StudentLeaves.studentLeaveRequestReceivedBies`",
	 };
