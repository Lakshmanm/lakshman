/*//=============================================================================
// All rights reserved to Thrill Innovative Labs.
// THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
// OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
// LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
// FITNESS FOR A PARTICULAR PURPOSE.
//=============================================================================
//*****************************************************************************
//* Name		    	: Team.Query.js 
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

	 var app = angular.module('ThrillAppBase.teamQueries', [])

.constant('teamQueries', {
		 getAllTeams : " SELECT teamKey,teamTitle,teamLogoKey,teamDocFolderKey,teamDescription,AssociatedOrganizationKey,RootOrganizationKey FROM `Team.teams` ",
		 getTeamByTeamKey : " SELECT teamKey,teamTitle,teamLogoKey,teamDocFolderKey,teamDescription,AssociatedOrganizationKey,RootOrganizationKey FROM `Team.teams`  WHERE teamKey = ",
});

