/*//=============================================================================
// All rights reserved to Thrill Innovative Labs.
// THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
// OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
// LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
// FITNESS FOR A PARTICULAR PURPOSE.
//=============================================================================
//*****************************************************************************
//* Name		    	: TeamRole.Query.js 
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

	 var app = angular.module('ThrillAppBase.teamRoleQueries', [])

.constant('teamRoleQueries', {
		 getAllTeamRoles : " SELECT teamRoleKey,teamRoleTitle,organizationKey FROM `Team.teamRoles` ",
		 getTeamRoleByTeamRoleKey : " SELECT teamRoleKey,teamRoleTitle,organizationKey FROM `Team.teamRoles`  WHERE teamRoleKey = ",
});

