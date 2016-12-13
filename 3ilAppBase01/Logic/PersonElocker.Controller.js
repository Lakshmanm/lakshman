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

var app = angular.module('ThrillMcampuz.personElocker', ['ThrillMcampuz.personElockerLogic', 'ngCordova','ThrillAppBase.thrillAppBasePersonLogic', 'ThrillFrameworkLibrary.geo', 'ThrillFrameworkLibrary.Network', 'ThrillCnnWebClient.appConfig', 'ThrillFrameworkLibrary.appLogger',
        'ThrillLocation.locationLogic'
    ])
    //Setup PersonAwardController Controller 
app.controller('ThrillMcampuz.personElocker', function($rootScope,personElockerLogic, $scope, $http,  $state, $stateParams, $localStorage,thrillAppBasePersonLogic,$location, locationLogic, appConfig, SweetAlert, appLogger) {

    //var referenceKey = generateUUID();

    getLabels(appConfig.CULTURE_NAME);


personElockerLogic
    
    var personReferenceKey;
    if ($stateParams.PersonKey) {
        // alert($stateParams.PersonKey);
        personReferenceKey = $stateParams.PersonKey;
    }
   

    //get labels with selected language for personAward
    function getLabels(cultureName) {

        $http.get("3ilAppBase01/Languages/PersonElocker." + cultureName + ".json").then(function(response) {
            bindLabels(response.data);

        });
    }
    //bind labels with selected language 
    function bindLabels(data) {

        $scope.elockerLabels = data.labels;


    };
    
function getPermissions() {
    var pageKey="42b32794792b48313cd1be9ca11b690d3e614683";
     thrillAppBasePersonLogic.getPagePermissions($localStorage.RoleID,pageKey).then(function (response) {
      console.log(JSON.stringify(response));
      // alert(JSON.stringify(response));
       if($location.path() == '/app/student/StudentKey/'+$stateParams.StudentKey +'/PersonKey/'+$stateParams.PersonKey) 
     {  
          
         if($localStorage.RoleID==2)
             {
          $scope.elocker=true;
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
    
     $scope.getFileDetails = function(fileKey) {

        personElockerLogic.getFileDetails(fileKey).then(function(response) {

            //  console.log(response);


            var a = document.createElement("a");
            a.download = response[0].FileName;
            a.href = response[0].FileBin;
            a.click();



        }, function(err) {
            appLogger.error('ERR', err);
        });


    };

    function getMessages(cultureName) {
        var alertMessageName = "AlertMessages";

        $http.get("3ilAppBase01/Languages/" + alertMessageName + "." + cultureName + ".json").then(function(response) {
            $scope.alertMessageLabels = response.data.messages;
        });
    }

  getDocumentTypes();
    function getDocumentTypes()
    {
            personElockerLogic.getDocumentTypes().then(function(response) {
           
            $scope.documentTypes = response;
        }, function(err) {
            appLogger.log(err);
            appLogger.error('ERR' + err);

        });
    }
    
    
    $scope.saveElocker=function()
    {
        if($scope.elocker.referenceKey==null || $scope.elocker.referenceKey==undefined )
            {
        
     personElockerLogic.addElocker($scope.elocker,personReferenceKey).then(function(response) {

       SweetAlert.swal({
                title: "ELocker",
                text: "Saved successfully",
                type: "success",
                confirmButtonColor: "#007AFF"
            });
           $scope.elocker={};
           
            $scope.elockerForm.$setPristine();
            $scope.elockerForm.$setUntouched();
 getAllDocument();
        }, function(err) {
            appLogger.log(err);
            appLogger.error('ERR' + err);

        });
            }
        
        else
            {
                alert(JSON.stringify($scope.elocker));
          personElockerLogic.updateElocker($scope.elocker,$scope.elocker.referenceKey,personReferenceKey).then(function(response) {

              
       SweetAlert.swal({
                title: "ELocker",
                text: "Updated successfully",
                type: "success",
                confirmButtonColor: "#007AFF"
            });
           $scope.elocker={};
           
            $scope.elockerForm.$setPristine();
            $scope.elockerForm.$setUntouched();
 getAllDocument();
        }, function(err) {
            appLogger.log(err);
            appLogger.error('ERR' + err);

        });      
                
            }
                
        
    }
    
     getAllDocument();
    function getAllDocument()
    {
            personElockerLogic.getAllDocument(personReferenceKey).then(function(response) {
           
            $scope.documentList= response;
        }, function(err) {
            appLogger.log(err);
            appLogger.error('ERR' + err);

        });
    }
    
    
    $scope.getDocument=function(referenceKey)
    {
       personElockerLogic.getDocument(referenceKey,personReferenceKey).then(function(response) {
           
           $scope.elocker={};
            $scope.elocker.identityTypeID= response[0].identityTypeId;
           $scope.elocker.fileKey=response[0].n3DMSFileKey;
           $scope.elocker.referenceKey=response[0].referenceKey;
           $scope.getName(response);
           
        }, function(err) {
            appLogger.log(err);
            appLogger.error('ERR' + err);

        });   
        
    }
    
     $scope.getName = function(dms) {
      

        $scope.filename = dms[0].filename;

    }
     
     $scope.deleteDocument=function(referenceKey)
     {

          personElockerLogic.deleteReferences(referenceKey,personReferenceKey).then(function(response) {
           SweetAlert.swal({
                title: "ELocker",
                text: "Deleted successfully",
                type: "success",
                confirmButtonColor: "#007AFF"
            });  
           getAllDocument(); 
           
        }, function(err) {
            appLogger.log(err);
            appLogger.error('ERR' + err);

        }); 
     
     }



});