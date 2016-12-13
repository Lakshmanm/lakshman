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

var app = angular.module('ThrillMcampuz.personReferences', ['ThrillMcampuz.personReferencesLogic', 'ngCordova', 'ThrillFrameworkLibrary.geo', 'ThrillFrameworkLibrary.Network', 'ThrillCnnWebClient.appConfig', 'ThrillFrameworkLibrary.appLogger',
        'ThrillLocation.locationLogic'
    ])
    //Setup PersonAwardController Controller 
app.controller('ThrillMcampuz.personReferences', function($rootScope,personReferencesLogic, $scope, $http,  $state, $stateParams, $localStorage, locationLogic, appConfig, SweetAlert, appLogger) {

    //var referenceKey = generateUUID();

    getLabels(appConfig.CULTURE_NAME);



    
    var personReferenceKey;
    if ($stateParams.PersonKey) {
        // alert($stateParams.PersonKey);
        personReferenceKey = $stateParams.PersonKey;
    }
   

    //get labels with selected language for personAward
    function getLabels(cultureName) {

        $http.get("Person/Languages/PersonReferences." + cultureName + ".json").then(function(response) {
            bindLabels(response.data);

        });
    }
    //bind labels with selected language 
    function bindLabels(data) {

        $scope.referenceLabels = data.labels;


    };

    function getMessages(cultureName) {
        var alertMessageName = "AlertMessages";

        $http.get("Person/Languages/" + alertMessageName + "." + cultureName + ".json").then(function(response) {
            $scope.alertMessageLabels = response.data.messages;
        });
    }

    getOccupation();
    function getOccupation() {
        personReferencesLogic.OccupationTypes().then(function(response) {
           
            $scope.occupationList = response;
        }, function(err) {
            appLogger.log(err);
            appLogger.error('ERR' + err);

        });
    }

    $scope.saveReference=function()
    {
       if($scope.reference.referenceKey==null || $scope.reference.referenceKey==undefined )
           {
        $scope.reference.staffKey=$stateParams.StaffKey;
       personReferencesLogic.addReferences($scope.reference,personReferenceKey).then(function(response) {
            
            SweetAlert.swal({
                title: "Reference",
                text: "Saved successfully",
                type: "success",
                confirmButtonColor: "#007AFF"
            });
           $scope.reference={};
           
            $scope.referenceForm.$setPristine();
            $scope.referenceForm.$setUntouched();
    getAllReference();

        }, function(err) {
            appLogger.log(err);
            appLogger.error('ERR' + err);

        });
               
           }
        else
            {
            personReferencesLogic.updateReference($scope.reference,$scope.reference.referenceKey).then(function(response) {
            
            SweetAlert.swal({
                title: "Reference",
                text: "Updated successfully",
                type: "success",
                confirmButtonColor: "#007AFF"
            });
           $scope.reference={};
           
            $scope.referenceForm.$setPristine();
            $scope.referenceForm.$setUntouched();
getAllReference();

        }, function(err) {
            appLogger.log(err);
            appLogger.error('ERR' + err);

        });    
                
            }
        
        
    }
    
  
    
  function getAllReference()
    {
              
       personReferencesLogic.getReferences($stateParams.StaffKey).then(function(response) {
            
           
           $scope.referenceCollection=response;
           
         

        }, function(err) {
            appLogger.log(err);
            appLogger.error('ERR' + err);

        }); 
        
    }
getAllReference();
    
    
    $scope.getRelative=function(referenceKey)
    {
        
    personReferencesLogic.getReferencesByReferenceKey(referenceKey).then(function(response) {
            
           
        $scope.reference={};
        $scope.reference.FirstName=response[0].FirstName;
         $scope.reference.primaryMobileNumber=response[0].PrimaryMobileNumber;    
         $scope.reference.emailId=response[0].EmailId;
        $scope.reference.occupationId=response[0].OccupationID;
        $scope.reference.how=response[0].HowDoYouKnow;
         $scope.reference.year=response[0].Years;
          $scope.reference.month=response[0].Months;
         $scope.reference.address=response[0].GeoLocation;
        $scope.reference.referenceKey=response[0].ReferenceKey;
        $scope.reference.addressKey=response[0].AddressKey;
        $scope.reference.personReferenceKey=response[0].personReferenceKey;

        }, function(err) {
            appLogger.log(err);
            appLogger.error('ERR' + err);

        });     
        
    }
    
    $scope.deleteRelative=function(referenceKey)
    {
     personReferencesLogic.deleteRelative(referenceKey,personReferenceKey).then(function(response) {
           SweetAlert.swal({
                title: "Reference",
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