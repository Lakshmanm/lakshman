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

	var app = angular.module('ThrillLeave.leaveRequestLogic', [ 'ngCordova'
			 ,'ngStorage'
			 , 'ThrillFrameworkLibrary.geo'
			 , 'ThrillFrameworkLibrary.Network'
			 , 'ThrillCnnWebClient.appConfig'
			 , 'ThrillFrameworkLibrary.appLogger'
			                                                   
])
	 .factory('leaveRequestLogic', function ($http,
		 dataService,
		 
		 config,
		 appConfig,
		 appLogger) {

		 return {

		getLeaveRequestListByPersonKey:function(personKey)
{
    
    
  return dataService.callAPI(config.API_URL + 'Leaves/LeaveRequest/'+ personKey, [], 'GET').then(function (response) {
					 return response.data;
						}); 
},
             
             getLeaveRequestByLeaveRequestKey:function(leaveRequestKey)
             {
   return dataService.callAPI(config.API_URL + 'Leaves/LeaveRequests/'+ leaveRequestKey, [], 'GET').then(function (response) {
					 return response.data;
						});                
                 
             },
        
             
               getLeaveTypeList:function(leaveRequestKey)
             {
   return dataService.callAPI(config.API_URL + 'Leaves/LeaveRequestLeaveType/'+ leaveRequestKey, [], 'GET').then(function (response) {
					 return response.data;
						});                
                 
             },
             
              
               getLeaveHistoryList:function(leaveRequestKey)
             {
   return dataService.callAPI(config.API_URL + 'Leaves/LeaveRequestStatusTrack/'+ leaveRequestKey, [], 'GET').then(function (response) {
					 return response.data;
						});                
                 
             },
                getFilesList:function(folderKey)
             {
   return dataService.callAPI(config.API_URL + 'Dms/folders/'+folderKey+ '/files', [], 'GET').then(function (response) {
					 return response.data;
						});                
                 
             },
             
             updateLeaveRequest:function(entityLeave)
             {
    var leaveRequestKey=entityLeave.leaveRequestKey;
 return dataService.update(entityLeave, 'LeaveRequestKey="' + leaveRequestKey + '"','` leaves.leaverequests`', config.OFFLINE_DBNAME,config.API_URL + 'Leaves/LeaveRequests/'+leaveRequestKey).then(function (response) {
         return response;
       });                       
                 
             },
              getFileDetails : function(fileKey,folderKey) 
             {
           return dataService.callAPI(config.API_URL + 'dms/folders/' +folderKey+ '/files/'+fileKey, [], 'GET').then(function (resp) {
               
        console.log(resp);
               return resp.data[0];
          
                
            }); 
                      
            },
             
             updateLeaveRequestByPersonKey:function(entityLeave,leaveRequestKey)
             {
        
 return dataService.update(entityLeave, 'leaveRequestKey="' + leaveRequestKey + '"','` leaves.leaverequests`', config.OFFLINE_DBNAME,config.API_URL + 'Leaves/LeaveRequest/'+leaveRequestKey).then(function (response) {
         return response;
       });         
                 
             },
                leaveCancelMail: function (emailObj) { //postEmail function call

                return dataService.insert(emailObj, 'User', 'trainee6', config.API_URL + 'Security/leaveCancelMail').then(function (response) {

                    return response;
                });

            },
    
	} // end of factory
}); // end of module

