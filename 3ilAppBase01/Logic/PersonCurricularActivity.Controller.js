/*=======================================================================
 All rights reserved to Thrill Innovative Labs.
 THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
 OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
 LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
 FITNESS FOR A PARTICULAR PURPOSE.
===========================================================================
****************************************************************************
 Name		    	 : personAward.Controller.js
 Type		    	 : Angular js 
 Description		 : This file contains controller methods
 References		     :
 Author	    		 : Sreelakshmi ch
 Created Date        : 18-Apr-2016
****************************************************************************
MODIFICATION LOG
**************************************************************************** 
Ver	Date	     Modified By			Description
****************************************************************************  
Code Review LOG
**************************************************************************** 
Sno# Ver        Date                Code Review By            Observations
****************************************************************************
*/

var app = angular.module('ThrillMcampuz.personCurricularActivity', ['ThrillPerson.personCurricularActivityLogic','ThrillPerson.personSportLogic','ThrillAppBase.thrillAppBasePersonLogic', 'ngCordova', 'ThrillFrameworkLibrary.geo', 'ThrillFrameworkLibrary.Network', 'ThrillCnnWebClient.appConfig', 'ThrillFrameworkLibrary.appLogger',
        'ThrillLocation.locationLogic'
    ])
    //Setup PersonAwardController Controller 
app.controller('ThrillMcampuz.personCurricularActivity', function($rootScope,personSportLogic, $scope, $http, personCurricularActivityLogic,thrillAppBasePersonLogic,$location, $state, $stateParams, $localStorage, locationLogic, appConfig, SweetAlert, appLogger) {

    //var referenceKey = generateUUID();

    getLabels(appConfig.CULTURE_NAME);



  
    var personReferenceKey;
    if ($stateParams.PersonKey) {
        // alert($stateParams.PersonKey);
        personReferenceKey = $stateParams.PersonKey;
    }
  
 getAllActivities(personReferenceKey);
   
function getPermissions() {
    var pageKey="42b32794792b48313cd1be9ca11b690d3e614683";
     thrillAppBasePersonLogic.getPagePermissions($localStorage.RoleID,pageKey).then(function (response) {
      console.log(JSON.stringify(response));
      // alert(JSON.stringify(response));
             if($location.path() == '/app/student/StudentKey/'+$stateParams.StudentKey +'/PersonKey/'+$stateParams.PersonKey) 
     {  
         if($localStorage.RoleID==2)
             {
       $scope.curricular=true;
             }
         
         
        if(response[0].AccessKey=="27ad330619a7bfbee351115b167c5a6593f2530a")
        {
            $scope.details=false; 
        }
        else{
            $scope.details=true; 
        }
     }

    });
}
getPermissions();


    //get labels with selected language for personAward
    function getLabels(cultureName) {

        $http.get("Person/Languages/PersonCurricularActivities." + cultureName + ".json").then(function(response) {
            bindLabels(response.data);

        });
    }
    //bind labels with selected language 
    function bindLabels(data) {

        $scope.activityLabels = data.labels;


    };

    function getMessages(cultureName) {
        var alertMessageName = "AlertMessages";

        $http.get("Person/Languages/" + alertMessageName + "." + cultureName + ".json").then(function(response) {
            $scope.alertMessageLabels = response.data.messages;
        });
    }

    
   getActivityTypes();
   
     function getActivityTypes() {
        personCurricularActivityLogic.getActivityTypes().then(function(response) {
            // alert(JSON.stringify(response));
            $scope.activityTypeList = response;
            //generateUUID();
        }, function(err) {
            appLogger.log(err);
            appLogger.error('ERR' + err);

        });
    }
    
    getProficiency();
     function getProficiency() {
        personCurricularActivityLogic.getProficiency().then(function(response) {
            // alert(JSON.stringify(response));
            $scope.proficiencyList = response;
            //generateUUID();
        }, function(err) {
            appLogger.log(err);
            appLogger.error('ERR' + err);

        });
    }

     getHighestLevelPlays();
     function getHighestLevelPlays() {
        personCurricularActivityLogic.getHighestLevelPlays().then(function(response) {
            // alert(JSON.stringify(response));
            $scope.playList = response;
            //generateUUID();
        }, function(err) {
            appLogger.log(err);
            appLogger.error('ERR' + err);

        });
    }

     $scope.getActivity=function(activityId) {
        personCurricularActivityLogic.getActivities(activityId).then(function(response) {
            // alert(JSON.stringify(response));
            $scope.activityList = response;
            //generateUUID();
        }, function(err) {
            appLogger.log(err);
            appLogger.error('ERR' + err);

        });
    }
     
     
     $scope.saveActivity=function()
     {
         
         if( $scope.activity.referenceKey==null || $scope.activity.referenceKey==undefined )
             {
                 
            
       personSportLogic.addSports($scope.activity,personReferenceKey).then(function(response) {
            
            SweetAlert.swal({
                title: "Curricular Activity",
                text: "Saved successfully",
                type: "success",
                confirmButtonColor: "#007AFF"
            });
           $scope.activity={};
           
            $scope.activitiesForm.$setPristine();
            $scope.activitiesForm.$setUntouched();
getAllActivities(personReferenceKey);

        }, function(err) {
            appLogger.log(err);
            appLogger.error('ERR' + err);

        }); 
        
             }
         else
             { 
                
 personSportLogic.updateSport($scope.activity,personReferenceKey,$scope.activity.referenceKey).then(function(
                                                                                                    response) {
            
            SweetAlert.swal({
                title: "Curricular Activity",
                text: "Updated successfully",
                type: "success",
                confirmButtonColor: "#007AFF"
            });
           $scope.activity={};
           
            $scope.activitiesForm.$setPristine();
            $scope.activitiesForm.$setUntouched();
getAllActivities(personReferenceKey);

        }, function(err) {
            appLogger.log(err);
            appLogger.error('ERR' + err);

        }); 
        
                 
                 
             }
         
     }
     
    
     function getAllActivities(personReferenceKey) {
        personSportLogic.getSports(personReferenceKey).then(function(response) {
            // alert(JSON.stringify(response));
            $scope.activityCollection = response;
            //generateUUID();
        }, function(err) {
            appLogger.log(err);
            appLogger.error('ERR' + err);

        });
    }
     
     
      $scope.sortColumn = "cirricularActivityTypeName";
    $scope.sortColumn = "proficiencyName";
    $scope.sortColumn = "highestLevelPlayName";
  
    $scope.sortColumn = "";
    $scope.reverseSort = false;


    $scope.sortData = function(column) {
        $scope.reverseSort = ($scope.sortColumn == column) ?
            !$scope.reverseSort : false;
        $scope.sortColumn = column;

        $scope.getSortClass = function(column) {


            if ($scope.sortColumn == column) {
                return $scope.reverseSort ? 'arrow-down' : 'arrow-up';
            }

            return '';
        }
    }

  $scope.editActivity=function(referenceKey)
  {
     personSportLogic.getSportById(personReferenceKey,referenceKey).then(function(response) {
            // alert(JSON.stringify(response));
         $scope.activity={};
           $scope.activity.cirricularActivityTypeID=response.cirricularActivityTypeId;
         $scope.getActivity(response.cirricularActivityTypeId);
            $scope.activity.sportTypeId=response.sportTypeID;
               $scope.activity.proficiencyId=response.proficiencyId;
         $scope.activity.highestLevelPlayId=response.highestLevelPlayId;
          $scope.activity.additionalInformation=response.additionalInformation;
          $scope.activity.referenceKey=response.referenceKey;
            //generateUUID();
        }, function(err) {
            appLogger.log(err);
            appLogger.error('ERR' + err);

        });  
      
  }
  
  $scope.deleteActivity=function(referenceKey)
  {
      
      
      personSportLogic.deleteSport(personReferenceKey,referenceKey).then(function(response) {
            
            SweetAlert.swal({
                title: "Curricular Activity",
                text: "Deleted successfully",
                type: "success",
                confirmButtonColor: "#007AFF"
            });
             
getAllActivities(personReferenceKey);

        }, function(err) {
            appLogger.log(err);
            appLogger.error('ERR' + err);

        });   
      
  }

   
});