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

	var app = angular.module('ThrillLeave.subordinateLeaveLogic', [ 'ngCordova'
			 ,'ngStorage'
			 , 'ThrillFrameworkLibrary.geo'
			 , 'ThrillFrameworkLibrary.Network'
			 , 'ThrillCnnWebClient.appConfig'
			 , 'ThrillFrameworkLibrary.appLogger'
			                                                   
])
	 .factory('subordinateLeaveLogic', function ($http,
		 dataService,
		 
		 config,
		 appConfig,
		 appLogger) {

		 return {
             	getSubordinateLeaveRequest:function(personKey,status)
{
    
    
  return dataService.callAPI(config.API_URL + 'Leaves/LeaveRequest/'+ personKey+'/Approver/'+status, [], 'GET').then(function (response) {
					 return response.data;
						}); 
},
   updateLeaveRequest:function(entityLeave)
             {
                 var leaveRequestKey=entityLeave.leaveRequestKey;
 return dataService.update(entityLeave, 'LeaveRequestKey="' + leaveRequestKey + '"','` leaves.leaverequests`', config.OFFLINE_DBNAME,config.API_URL + 'Leaves/LeaveRequestsByApprover/'+leaveRequestKey).then(function (response) {
         return response;
       });              
                 
             }

	/*	getLeaveBalanceByPersonKey:function(personKey)
{
    
    
  return dataService.callAPI(config.API_URL + 'Leaves/LeaveBalance/'+ personKey, [], 'GET').then(function (response) {
					 return response.data;
						}); 
},
             
             getLeavesByInstituteKey:function(instituteKey)
             {
        return dataService.callAPI(config.API_URL + 'Leaves/LeaveTypeOrgAssocation/'+ instituteKey, [], 'GET').then(function (response) {
					 return response.data;
						});       
             
         },
             

         getApproverKey:function(requesterKey,startDateTime)
{
   
    
  return dataService.callAPI(config.API_URL + 'Leaves/LeaveApprover/'+requesterKey+'/'+startDateTime, [], 'GET').then(function (response) {
					 return response.data;
						}); 
},
          
postDocumentsFolder: function (fileObj) {
 	
            return dataService.insert(fileObj, 'Dms', config.OFFLINE_DBNAME, config.API_URL + 'Dms/folders').then(function (response) {
                return response.data[0];
            });

        },
 postDocuments: function (fileObj, folderkey) {
 	
//alert(JSON.stringify(fileObj));
 var postFileObj = {};
 	 postFileObj.fileBase64Data = 'data:' + fileObj.fileType + ';base64,' + fileObj.fileBase64Data;
 	  postFileObj.fileName = fileObj.fileName;
      postFileObj.fileSize = fileObj.fileSize;
      postFileObj.fileType = fileObj.fileType;
            return dataService.insert(postFileObj, 'Dms', config.OFFLINE_DBNAME, config.API_URL + 'Dms/folders/' + folderkey + '/files').then(function (response) {
                return response;
            });

        }, 
             
             addLeave:function(entityLeave)
             {
      return dataService.insert(entityLeave, '`leaves.leaverequests`', config.OFFLINE_DBNAME, config.API_URL + 'Leaves/LeaveRequests').then(function (response) {

					 return response;
			 });      
                 
             },
             
             getPersonDetailsByPersonKey:function(personReferenceKey)
             {
  return dataService.callAPI(config.API_URL + 'Person/persons/'+personReferenceKey, [], 'GET').then(function (response) {
					 return response.data;
						});                 
                 
             },
             
             
            leaveRequestMail: function (emailObj) { //postEmail function call

                return dataService.insert(emailObj, 'User', 'trainee6', config.API_URL + 'Security/leaveRequestMail').then(function (response) {

                    return response;
                });

            },
            */
	} // end of factory
}); // end of module

