/*//=============================================================================
// All rights reserved to Thrill Innovative Labs.
// THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
// OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
// LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
// FITNESS FOR A PARTICULAR PURPOSE.
//=============================================================================
//*****************************************************************************
//* Name		    	: Group.Controller.js 
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

var app = angular.module('ThrillLeave.leaveSettings', ['ngCordova', 'ngStorage', 'ThrillFrameworkLibrary.geo', 'ThrillInstitute.instituteLogic','ThrillAppBase.StaffAdditionLogic', 'ThrillFrameworkLibrary.Network', 'ThrillCnnWebClient.appConfig', 'ThrillFrameworkLibrary.appLogger', 'ThrillLeave.leaveSettingsLogic', 'ThrillInstitute.leaveTypeLogic'])
    /*Setup group Controller */
app.controller('leaveSettingsController', function($scope, $http, $state, $q, $stateParams, $localStorage, leaveSettingsLogic, instituteLogic,ThrillAppBaseStaffLogic, leaveTypeLogic, SweetAlert, appConfig, appLogger) {


    getLabels(appConfig.CULTURE_NAME);
    getMessages(appConfig.CULTURE_NAME);


    /*get labels with selected language*/
    function getLabels(cultureName) {
        var currentFileName = "ApplyLeave";
        $http.get("LeaveManagement/StaffLeaves/Languages/" + currentFileName + "." + cultureName + ".json").then(function(response) {
            bindLabels(response.data);

        });
    }

    function getMessages(cultureName) {
        var alertMessageName = "AlertMessages";

        $http.get("LeaveManagement/StaffLeaves/Languages/" + alertMessageName + "." + cultureName + ".json").then(function(response) {
            $scope.alertMessageLabels = response.data.messages;
        });
    }

    /*bind labels with selected language */
    function bindLabels(data) {


        $scope.labelsLeave = data.labels;

    };


  
    
     function getDepartmentTypes() {
        ThrillAppBaseStaffLogic.getAllDepartments($localStorage.organizationKey).then(function (response) {
            $localStorage.headMasterInstituteKey=$localStorage.LoginInstituteKey;
            $scope.departmentList = response;
        }, function (err) {
            appLogger.log(err);
            appLogger.error('ERR', err);
        });
    };
    getDepartmentTypes();
    
    $scope.getStaff=function(departmentKey)
    {
    leaveSettingsLogic.getStaffList(departmentKey,$localStorage.headMasterInstituteKey).then(function(response) {
        var staffArray=[];
          angular.forEach(response,function(resp)
            {
                //
                if(resp.personKey!=$localStorage.ReferenceKey)
                {
                    
             staffArray.push(resp);
            
         
                }
             })
          //   
             $scope.staffList=staffArray;
        
        }, function(err) {

            console.error('ERR', err);

        }); 
        
    }
    
     $scope.getStaffList=function(departmentKey)
    {
    leaveSettingsLogic.getStaffList(departmentKey,$localStorage.headMasterInstituteKey).then(function(response) {
          
             $scope.staffDepartmentList=response;
        
        }, function(err) {

            console.error('ERR', err);

        }); 
        
    }
    
    function getAprrovers()
    {
         leaveSettingsLogic.getAprrovers($localStorage.organizationKey).then(function(response){
             $scope.approverList = response;
		 })
    };
       
    
    $scope.addReportingManager=function()
    {
     if($scope.entityLeaveRequest.leaveApproverKey=="" || $scope.entityLeaveRequest.leaveApproverKey== undefined) 
            {
   /*
       var array=[];   leaveSettingsLogic.getStaffRequesters($scope.entityLeaveRequest.departmentKey,$scope.entityLeaveRequest.personKey,$localStorage.headMasterInstituteKey).then(function(response) {
        
     for(var i=0;i<response.length;i++)
          {
              var object = {
                    approverPersonKey: $scope.entityLeaveRequest.personKey,
                    requesterPersonKey:response[i].personKey,
                    startDateTime: $scope.entityLeaveRequest.startDateTime,
                    endDateTime: $scope.entityLeaveRequest.endDateTime,
                  instanceOrganizationKey:$localStorage.organizationKey
                };
                array.push(object);  
              
          } */
                 var d1 = new Date($scope.entityLeaveRequest.startDateTime.getTime() + 1 * 86400000);;
        var d2 = new Date($scope.entityLeaveRequest.endDateTime.getTime() + 1 * 86400000);
                
                var object = {
                    approverPersonKey: $scope.entityLeaveRequest.approverPersonKey,
                    requesterPersonKey:$scope.entityLeaveRequest.requesterPersonKey,
                    startDateTime: d1,
                    endDateTime: d2,
                  instanceOrganizationKey:$localStorage.organizationKey
                };
     
    leaveSettingsLogic.addReportingManager(object).then(function(response) {
        

                        SweetAlert.swal({
                            title: "Reporting Manager",
                            text: "Saved successfully",
                            type: "success",
                            confirmButtonColor: "#007AFF"
                        });
            $scope.entityLeaveRequest = "";
                        $scope.leaveSettingsForm.$setPristine();
                        $scope.leaveSettingsForm.$setUntouched();
getAprrovers();
                 
            }, function(err) {
                appLogger.error('ERR', err);  
        
    });
     
          /*  }); */
            }
        else
            {
            /* var d1= new Date($scope.entityLeaveRequest.startDateTime.getTime() + 1 * 86400000); 
                var d2=new Date($scope.entityLeaveRequest.endDateTime.getTime() + 1 * 86400000);
     $scope.entityLeaveRequest.startDateTime =d1;
     $scope.entityLeaveRequest.endDateTime = d2;
                */ leaveSettingsLogic.updateReportingManager($scope.entityLeaveRequest,$scope.entityLeaveRequest.leaveApproverKey).then(function(response) {
        
        
        
        

                        SweetAlert.swal({
                            title: "Reporting Manager",
                            text: "Updated successfully",
                            type: "success",
                            confirmButtonColor: "#007AFF"
                        });
            $scope.entityLeaveRequest = "";
                        $scope.leaveSettingsForm.$setPristine();
                        $scope.leaveSettingsForm.$setUntouched();
getAprrovers();
                 
            }, function(err) {
                appLogger.error('ERR', err);  
        
    });      
                
                
            }
        
        
    }
       
   getAprrovers();
   
     $scope.editLeave=function(leaveApproverKey)
     {
      leaveSettingsLogic.editAprrovers(leaveApproverKey).then(function(response){
             $scope.entityLeaveRequest = {};
          
          $scope.entityLeaveRequest.departmentKey=response[0].requesterDepartmentKey;
           $scope.getStaffList(response[0].requesterDepartmentKey);
        
          $scope.entityLeaveRequest.requesterPersonKey=response[0].requesterpersonkey;
       
          
          $scope.entityLeaveRequest.reportingDepartmentKey=response[0].approverDepartmentKey;
             $scope.getStaff(response[0].approverDepartmentKey); 
          $scope.entityLeaveRequest.approverPersonKey=response[0].approverpersonkey;
           $scope.entityLeaveRequest.startDateTime=new Date(response[0].startdatetime);
          $scope.entityLeaveRequest.endDateTime=new Date(response[0].enddatetime);
          $scope.entityLeaveRequest.leaveApproverKey=response[0].leaveapproverkey;
          
		 });
         
     
     };
    
    $scope.deleteLeave=function(leaveApproverKey)
    {
       leaveSettingsLogic.deleteLeave(leaveApproverKey).then(function(response) {
           SweetAlert.swal({
                title: "Leave Approver",
                text: "Deleted successfully",
                type: "success",
                confirmButtonColor: "#007AFF"
            });  
           getAprrovers(); 
           
        }, function(err) {
            appLogger.log(err);
            appLogger.error('ERR' + err);

        }); 
         
          
        
    }
    
    
    
    


}); // End of App Controller