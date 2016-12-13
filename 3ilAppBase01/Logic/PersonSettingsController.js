'use strict';
/*
Child registration page controller
*/


var app = angular.module('ThrillAppBase.personSettingsController', ['ThrillFrameworkLibrary.DataService'
    //, 'ThrillAppBase.AppBaseQueries'
    , 'ThrillAppBase.config'
    , 'ThrillCnnWebClient.appConfig'
    , 'ThrillFrameworkLibrary.appLogger'
    , 'ThrillOrganization.departmentLogic'
    , 'ThrillAppBase.personSettingsLogic'                                                                
    ]);
app.controller('personSettingsController', function($scope,
                                                     $http,
                                                     subOrganizationTypeLogic,
                                                     $state,
                                                     $stateParams, 
                                                     appConfig,
                                                     $localStorage,
                                                     appLogger,
                                                     personSettingsLogic,
                                                     SweetAlert){
    
    

  
var OrganizationName;
    var folderKey;
       var fileKey;
    

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
        
       
        
        $scope.settings=function()
        {
     
   $state.go('app.personSettings');    
                
            
        }
       
       
      $scope.fileChange = function() {
            // alert('file change event');
            $scope.studentProfilePic = URL.createObjectURL(event.target.files[0]);
            $scope.$apply();
        };


 $scope.personUpdateBasicInfo = function () {
       
       var personObject = {
                 
                 "FolderKey":folderKey,
                 "ProfilePic": $scope.person.profilePic
                ,"MobileNumber":$scope.person.PrimaryMobileNumber
               
            };
   
        personSettingsLogic.updatePerson(personObject,$localStorage.ReferenceKey).then(function (response) {
        
                SweetAlert.swal({
                    title: "Account"
                    , text: "Updated successfully"
                    , type: "success"
                    , confirmButtonColor: "#007AFF"
                },function()
                    {
                    
                    
                   if($localStorage.RoleID==1)
        {
       getPersonDetails();     
            
        }
    else
        {
        getStaffDetails();     
        }
                });
            
          
 //$localStorage.Image=personObject.
            
        });
    };


function getOrganization()
    {
      
   personSettingsLogic.getOrganizationDetails($localStorage.organizationKey).then(function(response) {
       $scope.person={};
        
       OrganizationName=response[0].organizationName;
     
        });    
              
    }
getOrganization();
    
    if($localStorage.RoleID==1)
        {
       getPersonDetails();     
            
        }
    else if($localStorage.RoleID==3 || $localStorage.RoleID==2 )
        {
            
        getStaffDetails();     
        }
    
    function getPersonDetails()
    {
  
   personSettingsLogic.getPersonDetails($localStorage.ReferenceKey).then(function(response) {
      
       
       $scope.studentProfilePic={};
          
      folderKey=response[0].FolderKey;
       
      
       if(response[0].DMS[0][0]==undefined)
           {
               
         $scope.studentProfilePic="3ilAppBase01/Web/assets/images/default-user.png";   
         $scope.sideBar.image="3ilAppBase01/Web/assets/images/default-user.png";   
        
           }else{
    
       $scope.studentProfilePic=response[0].DMS[0][0].FileBin;
        $scope.sideBar.image=response[0].DMS[0][0].FileBin;
     $scope.$apply();
           }
   });    
              
    }

      function getStaffDetails()
    {
  
   personSettingsLogic.getStaffDetails($localStorage.LoginStaffKey).then(function(response) {
      
       
       $scope.studentProfilePic={};
          
      folderKey=response[0].FolderKey;
        if (response[0].N3DMSFileKey != null && response[0].N3DMSFileKey != undefined) {
                $scope.profilePic = "3ilAppBase01/Web/assets/images/loading.gif";
                var filefolderKey = response[0].FolderKey;
                var fileKey = response[0].N3DMSFileKey;
                personSettingsLogic.getStaffProfilePicture(filefolderKey, fileKey).then(function (pictureResponse) {
                  //  console.log(pictureResponse);
                 
                      $scope.studentProfilePic=pictureResponse.FileBin;
        $scope.sideBar.image=pictureResponse.FileBin;
     $scope.$apply();
                })
            }
       else
           {
           $scope.studentProfilePic="3ilAppBase01/Web/assets/images/default-user.png";   
         $scope.sideBar.image="3ilAppBase01/Web/assets/images/default-user.png";         
           }
     
        });    
              
    }

    
   
    
function getDetails()
    {
          
     personSettingsLogic.getUserDetails($localStorage.ReferenceKey).then(function(response) {
         $scope.person={};
       
         $scope.person.OrganizationName= OrganizationName;
         $scope.person.FirstName=response[0].FirstName;
         if(response[0].LastName=="undefined")response[0].LastName="";
          $scope.person.LastName=response[0].LastName;
         $scope.person.PrimaryMobileNumber=response[0].MobileNumber;
        });    
        
    }
    getDetails();

});