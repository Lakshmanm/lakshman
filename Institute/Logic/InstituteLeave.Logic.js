/*//=============================================================================
// All rights reserved to Thrill Innovative Labs.
// THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
// OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
// LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
// FITNESS FOR A PARTICULAR PURPOSE.
//=============================================================================
//*****************************************************************************
//* Name		    	: Cours.Logic.js 
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

var app = angular.module('ThrillInstitute.leaveTypeLogic', ['ThrillFrameworkLibrary.DataService', 'ThrillAcademic.coursQueries', 'ThrillAcademic.config', 'ThrillCnnWebClient.appConfig', 'ThrillFrameworkLibrary.appLogger'])
    .factory('leaveTypeLogic', function($http,
        dataService,
        coursQueries,
        config,
        appConfig,
        appLogger) {

        return {


            getLeavesByInstituteOrganizationKey: function(instituteOrganizationKey) {
                return dataService.callAPI(config.API_URL + 'Leaves/LeaveType/' + instituteOrganizationKey, [], 'GET').then(function(response) {
                    return response.data;
                });


            },
            addInstituteLeaves: function(entityLeaves) {
                return dataService.insert(entityLeaves, '`leaves.leavesTypeOrgAssociation`', config.OFFLINE_DBNAME, config.API_URL + 'Leaves/LeaveTypeOrgAssocations').then(function(response) {
                    return response;
                });
            },
            getLeavesByInstituteKey: function(instituteKey) {

                return dataService.callAPI(config.API_URL + 'Leaves/LeaveTypeOrgAssocation/' + instituteKey, [], 'GET').then(function(response) {
                    return response.data;
                });

            },
            addLeavebalance: function(leaveBalance) {
                return dataService.insert(leaveBalance, '`leaves.leavesBalances`', config.OFFLINE_DBNAME, config.API_URL + 'Organization/leaveBalance').then(function(response) {
                    return response;
                });

            },
            addLeaveApprover: function(leaveApprover) {
                return dataService.insert(leaveApprover, '`leaves.leaveApprover`', config.OFFLINE_DBNAME, config.API_URL + 'Organization/leaveApprovers').then(function(response) {
                    return response;
                });

            },

            /*    
             */



        } // end of factory
    }); // end of module