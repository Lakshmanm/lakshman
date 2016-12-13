/*//=============================================================================
// All rights reserved to Thrill Innovative Labs.
// THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
// OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
// LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
// FITNESS FOR A PARTICULAR PURPOSE.
//=============================================================================
//*****************************************************************************
//* Name		    	: Institute.Logic.js 
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

var app = angular.module('ThrillLeave.leaveSettingsLogic', ['ngCordova', 'ngStorage', 'ThrillFrameworkLibrary.geo', 'ThrillFrameworkLibrary.Network', 'ThrillCnnWebClient.appConfig', 'ThrillFrameworkLibrary.appLogger'

    ])
    .factory('leaveSettingsLogic', function($http,
        dataService,

        config,
        appConfig,
        appLogger) {

        return {
            
    getStaffList: function(departmentKey,instituteKey) {


                return dataService.callAPI(config.API_URL + 'Leaves/LeaveApprover/Department/' + departmentKey+ '/institute/' + instituteKey, [], 'GET').then(function(response) {
                    return response.data;
                });
            },

          addReportingManager: function(entityLeave) {
              console.log(JSON.stringify(entityLeave))

                return dataService.insert(entityLeave, '`leaves.leaveapprovers`', config.OFFLINE_DBNAME, config.API_URL + 'Leaves/LeaveApprovers').then(function(response) {
                    
                    

                    return response;
                });

            },  
            getStaffRequesters: function(departmentKey,personKey,instituteKey) {


                return dataService.callAPI(config.API_URL + 'Leaves/LeaveApprover/Person/' + personKey+ '/institute/' + instituteKey + '/' + departmentKey, [], 'GET').then(function(response) {
                    return response.data;
                });
            },
            
            getAprrovers:function(organizationKey)
            {
               return dataService.callAPI(config.API_URL + 'Leaves/LeaveApprovers/' + organizationKey , [], 'GET').then(function(response) {
                    return response.data;
                });  
            },
            editAprrovers:function(leaveApproverKey)
            {
               return dataService.callAPI(config.API_URL + 'Leaves/LeaveApprover/' + leaveApproverKey , [], 'GET').then(function(response) {
                    return response.data;
                });  
            },
            
            updateReportingManager:function(object,leaveApproverKey)
            {
              return dataService.update(object, 'leaveApproverKey="' + leaveApproverKey + '"', '`leaves.leaveapprovers`', config.OFFLINE_DBNAME, config.API_URL + 'Leaves/LeaveApprovers/' + leaveApproverKey).then(function(response) {
                    return response;
                });    
                
            },
            deleteLeave:function(leaveApproverKey)
            {
               return dataService.delete('leaveApproverKey="' + leaveApproverKey + '"', '`leave.leaveapprovers`', config.OFFLINE_DBNAME, config.API_URL + 'Leaves/LeaveApprovers/'+leaveApproverKey).then(function (response) {
				 return response;
			 }); 
                
                
            }

        } // end of factory
    }); // end of module