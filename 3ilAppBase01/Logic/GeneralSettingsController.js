'use strict';
/*
Child registration page controller
*/


var app = angular.module('ThrillAppBase.generalSettingsController', ['ThrillFrameworkLibrary.DataService'
    //, 'ThrillAppBase.AppBaseQueries'
    , 'ThrillAppBase.config'
    , 'ThrillCnnWebClient.appConfig'
    , 'ThrillFrameworkLibrary.appLogger'
    , 'ThrillOrganization.departmentLogic'
    , 'ThrillAppBase.generalSettingsLogic'                                                                
    ]);
app.controller('generalSettingsController', function($scope,
                                                     $http,
                                                     subOrganizationTypeLogic,
                                                     $state,
                                                     $stateParams, 
                                                     appConfig,
                                                     $localStorage,
                                                     appLogger,
                                                     generalSettingsLogic,
                                                     SweetAlert){
    
    

  
var OrganizationName;
    var folderKey;
       var fileKey;
     $scope.savee = true;
        $scope.updatee = false;
    
      $scope.sideBar={
            name:$localStorage.Name,
            role:$localStorage.Role,
            image:$localStorage.Image
        }
        
            $scope.staffName = $localStorage.staffName;
            $scope.staffRole = $localStorage.staffRole;
            $scope.staffImage = $localStorage.staffImage;

        
        $scope.logout=function(){
             $localStorage.organizationKey=null;
           $localStorage.$reset();
            $localStorage.ReferenceKey=null;
            $state.go('signin');
            $localStorage.id=null;
        }
        
        $scope.attendaneTyp = [{ "Title": "Period", "Id": 1 ,"AttendanceTypeKey":"sadfg62-ggfh3-jhk2ds32-sdff33s"}, { "Title": "Session", "Id": 2,"AttendanceTypeKey":"dfshq3g2-d1fd23-3dfgd2-sd43fh23-sdsdfss" }]
        
      $scope.getAttendanceType=function(){
      $scope.showPeriod = false;
        if ($scope.entityattendance.AttendanceTypeKey == "sadfg62-ggfh3-jhk2ds32-sdff33s")
          {
              $scope.showPeriod = true;
           $scope.showSession = false;
           $localStorage.sessionKey="";
        }
        else{
        $scope.showSession = true;
             $scope.showPeriod = false;  
        }
}
       
       
    
/*    function getPersonDetails()
    {

   generalSettingsLogic.getPersonDetails($localStorage.ReferenceKey).then(function(response) {
      $scope.entityattendance={};
          });    
              
    }
getPersonDetails();*/


$scope.addGeneralSettings = function () {
  $scope.entityattendance.PersonReferenceKey=$localStorage.ReferenceKey;

    generalSettingsLogic.addSettings($scope.entityattendance).then(function (response) {
      //console.log($scope.entityBoard);
         $scope.entityattendance = {};
      // refresh();
      // $scope.save = true;
      // $scope.update = false;
          $scope.generalSettings.$setPristine();
          $scope.generalSettings.$setUntouched();
      SweetAlert.swal({
                title: "General Settings",
                text: "Saved successfully",
                type: "success",
                confirmButtonColor: "#007AFF"
             
            });
            pageLoad();//appLogger.alert($scope.alertMessageLabels.boardSaved);
    }, function (err) {
      appLogger.error('ERR', err);
    });
  };

        $scope.updateGeneralSettings = function() {

        generalSettingsLogic.updateGeneralSetting($scope.entityattendance,$scope.entityattendance.GeneralSettingsKey).then(function(response) {
            SweetAlert.swal({
                title: "Profile Settings",
                text: "Updated Successfully",
                type: "success",
                confirmButtonColor: "#007AFF"
            });
            pageLoad();
        });
    }
    if ($localStorage.loggedInUserID != null || $localStorage.loggedInUserID != undefined) {
        pageLoad();
    }


    function pageLoad() {
        generalSettingsLogic.getAllGeneralSettings($localStorage.loggedInUserID).then(function(response) {
          console.log(JSON.stringify(response))
            if (response.length != undefined) {
               $scope.entityattendance={};
                $scope.savee = false;
                $scope.updatee = true;
                
                $scope.entityattendance.AttendanceTypeKey = response[0].AttendanceTypeKey;
                  $scope.entityattendance.PersonReferenceKey= response[0].PersonReferenceKey;
                  $scope.entityattendance.GeneralSettingsKey= response[0].GeneralSettingsKey;
              $localStorage.AttendanceTypeKey =response[0].AttendanceTypeKey;
                
                console.log(response.AttendanceTypeKey);
            } else {
                $scope.savee = true;
                $scope.updatee = false;
            }
        });
    }












});