/*//=============================================================================
// All rights reserved to Thrill Innovative Labs.
// THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
// OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
// LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
// FITNESS FOR A PARTICULAR PURPOSE.
//=============================================================================
//*****************************************************************************
//* Name		    	: TeamTeamMember.Query.js 
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
 " SELECT teamMemberKey,teamRoleKey,personKey,StartDate,EndDate FROM `Team.teamMembers` WHERE teamKey = "
//*****************************************************************************
*/

	 var app = angular.module('ThrillAppBase.teamTeamMemberQueries', [])

.constant('teamTeamMemberQueries', {
   getTeamTeamMemberByTeamKey :"SELECT m.teamMemberKey,m.teamRoleKey,m.personKey,m.startDate,m.endDate,m.teamKey,t.teamTitle,r.teamRoleTitle FROM `team.teammembers` as m join `team.teamroles` as r on r.teamRoleKey=m.teamRoleKey join `team.teams` as t on t.teamKey=m.teamKey ",
		 getTeamTeamMemberByTeamMemberKey : " SELECT teamMemberKey,teamRoleKey,personKey,StartDate,EndDate,teamKey FROM `Team.teamMembers`  WHERE teamMemberKey = ",
});

