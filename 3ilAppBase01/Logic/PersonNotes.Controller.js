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

var app = angular.module('ThrillMcampuz.personNotes', ['ThrillMcampuz.personNotesLogic', 'ngCordova',,'ThrillAppBase.thrillAppBasePersonLogic', 'ThrillFrameworkLibrary.geo', 'ThrillFrameworkLibrary.Network', 'ThrillCnnWebClient.appConfig', 'ThrillFrameworkLibrary.appLogger',
        'ThrillLocation.locationLogic'
    ])
    //Setup PersonAwardController Controller 
app.controller('ThrillMcampuz.personNotes', function($rootScope,personNotesLogic, $scope, $http,  $state, $stateParams, $localStorage,thrillAppBasePersonLogic,$location, locationLogic, appConfig, SweetAlert, appLogger) {

    //var referenceKey = generateUUID();

    getLabels(appConfig.CULTURE_NAME);



    
    var personReferenceKey;
    if ($stateParams.PersonKey) {
        // alert($stateParams.PersonKey);
        personReferenceKey = $stateParams.PersonKey;
    }
   

    //get labels with selected language for personAward
    function getLabels(cultureName) {

        $http.get("3ilAppBase01/Languages/PersonNotes." + cultureName + ".json").then(function(response) {
            bindLabels(response.data);

        });
    }
    //bind labels with selected language 
    function bindLabels(data) {

        $scope.noteLabels = data.labels;


    };

    function getMessages(cultureName) {
        var alertMessageName = "AlertMessages";

        $http.get("3ilAppBase01/Languages/" + alertMessageName + "." + cultureName + ".json").then(function(response) {
            $scope.alertMessageLabels = response.data.messages;
        });
    }

function getPermissions() {
    var pageKey="42b32794792b48313cd1be9ca11b690d3e614683";
     thrillAppBasePersonLogic.getPagePermissions($localStorage.RoleID,pageKey).then(function (response) {
      console.log(JSON.stringify(response));
      // alert(JSON.stringify(response));
        if($location.path() == '/app/student/StudentKey/'+$stateParams.StudentKey +'/PersonKey/'+$stateParams.PersonKey) 
     {   
         if($localStorage.RoleID==2)
             {
         $scope.notes=true;
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



  $scope.saveNotes=function()
    {
       if($scope.notes.referenceKey== null || $scope.notes.referenceKey== undefined)
           
           {
        $scope.notes.personReferenceKey=personReferenceKey;
       personNotesLogic.addNotes($scope.notes).then(function(response) {
            
            SweetAlert.swal({
                title: "Notes",
                text: "Saved successfully",
                type: "success",
                confirmButtonColor: "#007AFF"
            });
           $scope.notes={};
           
            $scope.notesForm.$setPristine();
            $scope.notesForm.$setUntouched();
    getAllNotes();

        }, function(err) {
            appLogger.log(err);
            appLogger.error('ERR' + err);

        });
           }
      else
          {
        personNotesLogic.updateNotes($scope.notes,$scope.notes.referenceKey).then(function(response) {
            
            SweetAlert.swal({
                title: "Notes",
                text: "Updated successfully",
                type: "success",
                confirmButtonColor: "#007AFF"
            });
           $scope.notes={};
           
            $scope.notesForm.$setPristine();
            $scope.notesForm.$setUntouched();
    getAllNotes();


        }, function(err) {
            appLogger.log(err);
            appLogger.error('ERR' + err);

        });        
              
          }
      
      
      
  }
  
  getAllNotes();
  function getAllNotes()
    {
    personNotesLogic.getAllNotes(personReferenceKey).then(function(response) {
           
            $scope.notesList = response;
        }, function(err) {
            appLogger.log(err);
            appLogger.error('ERR' + err);

        });     
        
    }
    
    $scope.getNotes=function(referenceKey)
    {
     
         personNotesLogic.getNotesByReferenceKey(referenceKey).then(function(response) {
            
           
        $scope.notes={};
        $scope.notes.title=response[0].Title;
         $scope.notes.description=response[0].Description;    
       
        $scope.notes.referenceKey=response[0].ReferenceKey;
      
        $scope.notes.personReferenceKey=response[0].personReferenceKey;

        }, function(err) {
            appLogger.log(err);
            appLogger.error('ERR' + err);

        });   
        
    }
    
    $scope.deleteNotes=function(referenceKey)
    {
     personNotesLogic.deleteNotes(referenceKey).then(function(response) {
           SweetAlert.swal({
                title: "Notes",
                text: "Deleted successfully",
                type: "success",
                confirmButtonColor: "#007AFF"
            });  
           getAllNotes();
           
        }, function(err) {
            appLogger.log(err);
            appLogger.error('ERR' + err);

        });     
        
    }
    
    

});