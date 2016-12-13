/*//=============================================================================
// All rights reserved to Thrill Innovative Labs.
// THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
// OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
// LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
// FITNESS FOR A PARTICULAR PURPOSE.
//=============================================================================
//*****************************************************************************
//* Name		    	: TeamTeamMember.Controller.js 
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

	 var app  = angular.module('ThrillAppBase.teamTeamMember', ['ThrillAppBase.teamTeamMemberLogic'
             , 'ThrillAppBase.teamLogic'
             , 'ThrillAppBase.teamRoleLogic'
			 , 'ngCordova'
                                                                
         , 'ThrillPerson.personBasicInfoLogic'
             
             , 'ThrillAppBase.thrillAppBasePersonLogic'
                                                                
			 , 'ThrillFrameworkLibrary.geo'
			 , 'ThrillFrameworkLibrary.Network'
			 , 'ThrillCnnWebClient.appConfig'
			 , 'ThrillFrameworkLibrary.appLogger'
	])
    /*Setup teamTeamMember Controller */
	 app.controller('TeamTeamMemberController', function ($scope, $http,thrillAppBasePersonLogic,personBasicInfoLogic, teamTeamMemberLogic,teamLogic,teamRoleLogic, $state, $stateParams, appConfig, appLogger,$localStorage,SweetAlert) {
		 getLabels(appConfig.CULTURE_NAME);
		 getMessages(appConfig.CULTURE_NAME);
        
         getTeamRole();
         getStaffList($localStorage.organizationKey);

/*get labels with selected language*/
    function getLabels(cultureName) {
        var currentFileName = "TeamTeamMember";
        $http.get("Team/Languages/" + currentFileName + "." + cultureName + ".json").then(function (response) {
            bindLabels(response.data);

        });
    }

    function getMessages(cultureName) {
        var alertMessageName = "AlertMessages";

        $http.get("Team/Languages/" + alertMessageName + "." + cultureName + ".json").then(function (response) {
            $scope.alertMessageLabels = response.data.messages;
        });
    }
         
          var arraylist =[];
 
    arraylist.push({ 
               'personKey': "", 
               'teamRoleKey': "", 
               'StartDate': "", 
               'EndDate': "" ,
         'mode':"insert", 
             'teamKey':$stateParams.teamKey
            });
 $scope.getAllTeamMembers=arraylist;
               
    //alert(JSON.stringify($scope.StaffRolespreference));
     $scope.teamMembersAddNew = function(entityTeamMember){
     // alert(JSON.stringify($scope.entityTeamMember));
          $scope.getAllTeamMembers.push({ 
               'personKey': "", 
               'teamRoleKey': "", 
               'StartDate': "", 
               'EndDate': "" ,
                 'mode':"insert",  
              'teamKey':$stateParams.teamKey
            });
               //alert(JSON.stringify($scope.StaffRoles));
        };
    
      $scope.teamMembersRemove = function(obj){
       //  alert(obj);
             if(obj != -1) {
	    $scope.getAllTeamMembers.splice(obj, 1);
             }
        };

    /*bind labels with selected language */
	 function bindLabels(data) {
		/* var labels = {
		 StartDate: data.labels.startDate,
		 EndDate: data.labels.endDate,
         teamRoleKey:data.labels.teamRoleKey,
         personKey:data.labels.personKey,
		 submit: data.labels.submit,
              update: data.labels.update,
		 delete: data.labels.delete,
		 teamMemberHeading: data.labels.teamMemberHeading
	 };*/

	 $scope.labelsTeamMember = data.labels;

};
        // alert($scope.entityTeamMember.EndDate);
          $scope.$watch('entityTeamMember.EndDate', function(newval, oldval){
             // alert('here');
       if($scope.entityTeamMember.StartDate >= $scope.entityTeamMember.EndDate) 
           {
           //$scope.allergyEndDate=true;
          // alert('entered wrong');
           }
           else
               {
             //$scope.allergyEndDate=false;
               //alert('entered rigth');
                   }

   });

         
                $scope.deleteTeamMembers = function (teamMemberKey) { 
             
                         SweetAlert.swal({
                title: "Are you sure?",
                text: "Your want to delete this contact",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Yes, delete it!",
                cancelButtonText: "No, cancel!",
                closeOnConfirm: false,
                closeOnCancel: false
            }, function(isConfirm) {
                if (isConfirm) {
                    SweetAlert.swal({
                        title: "Deleted!",
                        text: "Your Team has been deleted.",
                        type: "success",
                        confirmButtonColor: "#007AFF"
                    }, function() {
                teamTeamMemberLogic.deleteTeamTeamMemberbyteamkey(teamMemberKey).then(function (response) {
            
			 //refresh();
			   getAllteammembers();
			// $scope.teamMembers="";
            
			 }, function (err) {
				 appLogger.error('ERR', err);
			 });
                    });
                } else {
                    SweetAlert.swal({
                        title: "Cancelled",
                        text: "Your Team is safe :)",
                        type: "error",
                        confirmButtonColor: "#007AFF"
                    });
                }
            });
                    
                    
                    
                    
   
		 };
           //get blood groups 
    function getStaffList(organizationKey) {
        
        thrillAppBasePersonLogic.getStaff(organizationKey).then(function (response) {
       
          var i;
            var personArray=[];
            for(i=0;i<response.length;i++)
                {
                    var personKey=response[i].personKey;
                  
          personBasicInfoLogic.getPersonBasicInfoById(personKey).then(function(personresponse)
         {
           
              var personObject={
                  personname:personresponse.firstName +  personresponse.lastName ,
                  personkey:personresponse.referenceKey
              }
             
             
              personArray.push(personObject)
          if(i==response.length) {
                           
                            $scope.persons=personArray;
             
                      }
                         
            
          
             
               /* console.log(response.data[0].middleName);
                console.log(response.data[0].lastName);*/
              
          }) 
           
         
                   
                }
             
        
            
          
            //alert(JSON.stringify($scope.childerenlist));
             
                       });


    }
         
         
         
          function getTeamRole() {

        teamRoleLogic.getAllTeamRoles().then(function (response) {
            
                $scope.roles = response;
            console.log($scope.roles);

        }, function (err) {
            appLogger.log(err);
            appLogger.error('ERR', err);

        });
    }


	 if (appConfig.APP_MODE == 'offline')
		{
			 var entityKey = DrawCaptcha();
		}
	 var teamMemberEntityKey;

    /*Perform the CRUD (Create, Read, Update & Delete) operations of team TeamMember*/
      /*Method for calling  add team TeamMember */
         
         
	 $scope.addTeamMember = function () {
		
		
		 teamTeamMemberLogic.addTeamTeamMember($scope.teamMembers,$localStorage.teamKey ).then(function (response) {
           // alert('saved sucess');
			 //refresh();
		
			
			 }, function (err) {
				 appLogger.error('ERR', err);
			 });
		 };
         
         
         if ($stateParams.teamKey) {
              getAllteammembers();
         }
         
         
                 ///Team members add

           $scope.addTeamMembers = function () { 
               console.log(JSON.stringify($scope.getAllTeamMembers));
                 SweetAlert.swal({
                    title: "Team members",
                    text: "Added successfully",
                    type: "success",
                    confirmButtonColor: "#007AFF"
                }, function() {
                   // $state.go('app.teamList');
                });
           //	alert(JSON.stringify($scope.getAllTeamMembers));
               
        teamTeamMemberLogic.addTeamTeamMemberlist($scope.getAllTeamMembers).then(function (response) {
            
            
              SweetAlert.swal({
                    title: "Team members",
                    text: "Added successfully",
                    type: "success",
                    confirmButtonColor: "#007AFF"
                }, function() {
                   // $state.go('app.teamList');
                });
			 //refresh();
			 //appLogger.alert('saved');
			// $scope.teamMembers="";
            
			 }, function (err) {
				 appLogger.error('ERR', err);
			 });
		 };

	 /*Method for calling  update Team TeamMember*/
	 $scope.updateTeamMember = function () {
	 var teamMemberKey = $scope.entityTeamMember.teamMemberKey;
      //  $scope.entityTeamMember.teamKey='91f70450-48c9-11e6-89a2-b9cd94bfb885';
	 var teamKey =  $scope.entityTeamMember.teamKey;
		 teamTeamMemberLogic.updateTeamTeamMember($scope.entityTeamMember, teamKey, teamMemberKey).then(function (response) {
		// refresh();
			 appLogger.alert($scope.alertMessageLabels.teamMemberUpdated);
			 $scope.entityTeamMember = "";
               $state.go('teamTeamMemberList');
			 }, function (err) {
				 appLogger.error('ERR', err);
			 });
		 };

/*Method for  retrieving  team TeamMember details*/

/*$scope.getTeamTeamMember = function (entityKey)*/
         if($stateParams.teamMemberKey){
            
		 teamTeamMemberLogic.getTeamTeamMemberByTeamMemberKey(entityKey,$stateParams.teamMemberKey).then(function (response) {
            
			 $scope.entityTeamMember = response[0];
             $scope.entityTeamMember.teamKey = response[0].teamkey;
			 $scope.entityTeamMember.teamMemberKey = response[0].teammemberkey;
			 $scope.entityTeamMember.teamRoleKey = response[0].teamrolekey;
			 $scope.entityTeamMember.personKey = response[0].personkey;
			 $scope.entityTeamMember.StartDate =new Date(response[0].startdate);
			 $scope.entityTeamMember.EndDate =new Date(response[0].enddate);
		 }, function (err) {
			 appLogger.error('ERR', err);
		 });
	 }
         
         
                  var Teammember=[];
          function getAllteammembers()
         {
            // alert('clickhere');
              teamTeamMemberLogic.getAllTeamMemberByTeamKey($stateParams.teamKey).then(function (response) {
                 
                 for(var i=0;i<response.length;i++)
                     {
                 var teamMemberObject={
                 
                  teamRoleKey:response[i].teamRoleKey,
                  StartDate:new Date(response[i].StartDate),
                  personKey:response[i].personKey,
                  mode:"update", 
                     teamKey:response[i].teamKey,
                     teamMemberKey:response[i].teamMemberKey,
                  EndDate:new Date(response[i].EndDate)     
              }
             
             
              Teammember.push(teamMemberObject);
                         //alert(JSON.stringify(Teammember));
                          $scope.getAllTeamMembers=Teammember;
              }
                Teammember=[] /*
          if(i==response.length) {
                           
                            $scope.getAllTeamMembers=Teammember;
             
                      }*/
                 // $scope.getAllTeamMembers=response;
                // alert(JSON.stringify($scope.getAllTeamMembers));
            
			 }, function (err) {
				 appLogger.error('ERR', err);
			 });
		
         }
         
/*
		 var refresh = function () {
			 teamTeamMemberLogic.getTeamTeamMemberByTeamKey($stateParams.entityKey).then(function (response) {
				 $scope.teamTeamMember = response;
				 $scope.sortColumn = "";
				 $scope.reverseSort = false;
		 $scope.sortData = function (column) {
			 $scope.reverseSort = ($scope.sortColumn == column) ?
				 !$scope.reverseSort : false;
			 $scope.sortColumn = column;
}
			 $scope.getSortClass = function (column) {
				 if ($scope.sortColumn == column) {
					 return $scope.reverseSort ? 'arrow-down' : 'arrow-up';
				 }
			 return '';
		 }, function (err) {
			 appLogger.error('ERR', err);
			 };
		 });
	 }
		 refresh();


	 Method for calling  deleting  team TeamMember
	 $scope.deleteTeamTeamMember = function (teamMemberEntityKey) {
		 teamTeamMemberLogic.deleteTeamTeamMember($stateParams.entityKey , teamMemberEntityKey).then(function (response) {
			 appLogger.alert($scope.alertMessageLabels.teamMemberDeleted);
		 refresh();
			 }, function (err) {
				 appLogger.error('ERR', err);
			 });
		 };*/

}); // End of App Controller

