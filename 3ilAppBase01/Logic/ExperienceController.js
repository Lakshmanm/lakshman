/*=======================================================================
 All rights reserved to Thrill Innovative Labs.
 THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
 OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
 LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
 FITNESS FOR A PARTICULAR PURPOSE.
===========================================================================
****************************************************************************
 Name		    	 : personWorkExperience.Controller.js
 Type		    	 : Angular js 
 Description		 : This file contains controller methods
 References		     :
 Author	    		 : Sreelakshmi ch
 Created Date        : 13-Apr-2016
****************************************************************************
MODIFICATION LOG
**************************************************************************** 
S.No.   Ver	       Date	         Modified By			Description
1       1.0        29-04-2016    Satya Kalyani Lanka    referenceKey concept implemented
****************************************************************************  
Code Review LOG
**************************************************************************** 
Sno# Ver        Date                Code Review By            Observations
****************************************************************************
*/

var app = angular.module('Aarush.experience', ['ThrillPerson.personWorkExperienceLogic'
                                                            
        , 'ngCordova'
         ,'ThrillAcademic.subjectLogic'                                                   
        , 'ThrillFrameworkLibrary.geo'
                                                            
        , 'ThrillFrameworkLibrary.Network'
                                                            
        , 'ThrillCnnWebClient.appConfig'
                                                            
        , 'ThrillFrameworkLibrary.appLogger',
           'ThrillPerson.personBankLogic',
        'ThrillLocation.locationLogic'
])
    //Setup personWorkExperience Controller 
app.controller('Aarush.experience', function ($scope
    , $http
    , personWorkExperienceLogic
    , $state
    , subjectLogic
    , $stateParams
    , appConfig
    , appLogger,
    personBankLogic,
    locationLogic,
    $localStorage,
SweetAlert
    ) {
   // var referenceKey = generateUUID();

    getLabels(appConfig.CULTURE_NAME);
   
    var personReferenceKey; 
if($stateParams.PersonKey)
{
    personReferenceKey = $stateParams.PersonKey;
}

  $scope.save = true;
        $scope.update = false;

    //get labels with selected language for PersonWorkExperience
    function getLabels(cultureName) {

        $http.get("Person/Languages/PersonWorkExperience." + cultureName + ".json").then(function (response) {
            bindLabels(response.data);

        });
    }
    //bind labels with selected language 
    function bindLabels(data) {
        $scope.workExperience = data.labels;
    };


      function getMessages(cultureName) {
        var alertMessageName = "AlertMessages";

        $http.get("Person/Languages/" + alertMessageName + "." + cultureName + ".json").then(function (response) {
            $scope.alertMessageLabels = response.data.messages;
        });
    }
    
    function getSubject() {
        subjectLogic.getAllSubjects($localStorage.organizationKey).then(function(response) {
           
          $scope.subjectCollection = response;
          
           
        });
    }
    getSubject();

 $scope.maxDate = new Date();
    $scope.minDate = new Date('01-01-1916');
    // Method to load refresh for PersonWorkExperience
    function refresh() {
        $scope.workexperience = {};
        $scope.workExperienceLocation = {};
        getDesignationTypes();
        getOccupationTypes();
    }

    refresh();
     var personReferenceKey; 
if($stateParams.PersonKey)
{
    personReferenceKey = $stateParams.PersonKey;
}
           getExperienceList(personReferenceKey);
      //  }
    // if ($stateParams.personReferenceKey != undefined || $stateParams.personReferenceKey != null) {
    //     personReferenceKey = $stateParams.personReferenceKey;
    //     getExperienceList(personReferenceKey);
    // }

    // Method to getDesignationTypes for PersonWorkExperience

    function getDesignationTypes() {

        personWorkExperienceLogic.getDesignationTypes().then(function (response) {
               $scope.designationList = response;
        }, function (err) {
            appLogger.log(err);
            appLogger.error('ERR' + err);

        });
    }
    // Method to getOccupationTypes for PersonWorkExperience

    function getOccupationTypes() {
        personWorkExperienceLogic.getOccupationTypes().then(function (response) {
            $scope.occupationList = response;


        }, function (err) {
            appLogger.log(err);
            appLogger.error('ERR' + err);

        });
    }
    // Method to addLocation for PersonWorkExperience
    function addLocation() {
            $scope.workExperienceLocation.villageId=4972;
            $scope.workExperienceLocation.countryId= 4;
            $scope.workExperienceLocation.stateId=1;
             $scope.workExperienceLocation.DistrictID=3;
             $scope.workExperienceLocation.MandalID=82;
             $scope.workExperienceLocation.EntityType="Staff";
              locationLogic.addLocation($scope.workExperienceLocation).then(function (response) {

       // personWorkExperienceLogic.addLocation($scope.workExperienceLocation, personReferenceKey).then(function (response) {
        
            console.log(response);
            var locationId = null;
            if (appConfig.APP_MODE == 'offline') {
                locationId = response.insertId;
            } else {
                 locationId = response.data.insertId;
            }

            addPersonExperience(locationId);

        }, function (err) {
            appLogger.error('ERR' + err);
        });
    }

    // Method to addPersonExperience using locationId

    function addPersonExperience(locationId) {
        if (appConfig.APP_MODE == 'offline') {

            $scope.workexperience.referenceKey = referenceKey;
        }

        $scope.workexperience.locationId = locationId;
        $scope.workexperience.personReferenceKey = personReferenceKey;
        personWorkExperienceLogic.addPersonExperience($scope.workexperience, personReferenceKey).then(function (response) {
           SweetAlert.swal({
                title: "Staff Experience",
                text: "Saved successfully",
                type: "success",
                confirmButtonColor: "#007AFF"
            });

            getExperienceList(personReferenceKey);
            $scope.workexperience = {};
            $scope.workExperienceLocation = {};
            $scope.workExperienceForm.$setPristine();
            $scope.workExperienceForm.$setUntouched();

        }, function (err) {

            appLogger.error('ERR' + err);

        });

    };
    //Method for save/Update PersonWorkExperience 
    $scope.saveWorkExperience = function () {
        if ($scope.workexperience.referenceKey == undefined || $scope.workexperience.referenceKey == null) {
            //first add Location then workexperience
            addLocation();
        } else {
            var workExperienceReferenceKey = $scope.workexperience.referenceKey;
            var locationId = $scope.workexperience.locationId;
            updateLocation(locationId);
            updateWorkExperience(workExperienceReferenceKey);

        }
    }

    //Method for retrieving personWorkExperience details by  personReferenceKey 

    function getExperienceList(personReferenceKey) {
        personWorkExperienceLogic.getWorkExperienceList(personReferenceKey).then(function (response) {
            $scope.workexperienceList = response;
              }, function (err) {
            appLogger.log(err);
            appLogger.error('ERR' + err);

        });
    }

    //Method for retrieving personWorkExperience details by  workExperienceId

    $scope.getWorkExperienceById = function (workExperiencereferenceKey) {
                    $scope.save = false;
        $scope.update = true;
        personWorkExperienceLogic.getWorkExperienceById(personReferenceKey, workExperiencereferenceKey).then(function (response) {


            appLogger.log(response);
            $scope.workExperienceLocation = {};
            $scope.workExperienceLocation.locationId = response.locationId;
           

            $scope.workexperience = {};

            //$scope.workexperience.workExperienceId = response.workExperienceId;
            $scope.workexperience.referenceKey = response.referenceKey;
            $scope.workexperience.subjectKey = response.subjectKey;
            $scope.workexperience.workExperienceName = response.workExperienceName;
            $scope.workexperience.startDate = new Date(response.startDate);
            $scope.workexperience.endDate = new Date(response.endDate);
            $scope.workexperience.organizationName = response.organizationName;
            $scope.workexperience.occupationId = response.occupationId;
            $scope.workexperience.designationId = response.designationId;
            $scope.workexperience.locationId = response.locationId;
            $scope.workexperience.personReferenceKey = response.personReferenceKey;
            $scope.workexperience.totalYears = response.totalYears;
            $scope.workexperience.teachingExperience = response.teachingExperience;
            $scope.workexperience.otherExperience = response.otherExperience;
            
            locationLogic.getLocationByLocationID($scope.workexperience.locationId).then(function(response) {
                $scope.workExperienceLocation.geoLocation = response[0].geoLocation;
                //console.log(JSON.stringify(response));
            });

        }, function (err) {
            appLogger.log(err);
            appLogger.error('ERR' + err);

        });
    }

    //Method for  updateLocation by  locationId

     function updateLocation(locationId) {
alert(JSON.stringify($scope.workExperienceLocation));
        personBankLogic.updateLocation($scope.workExperienceLocation, locationId).then(function(response) {

        }, function(err) {
            appLogger.error('ERR' + err);
        });
    }


    //Method for update personWorkExperience by workExperienceId
    function updateWorkExperience(workExperiencereferenceKey) {
alert(JSON.stringify($scope.workexperience));
        personWorkExperienceLogic.updateWorkExperience($scope.workexperience, personReferenceKey, workExperiencereferenceKey).then(function (response) {
        //   appLogger.alert($scope.alertMessageLabels.experienceUpdated);
           SweetAlert.swal({
                title: "Staff Experience",
                text: "Updated successfully",
                type: "success",
                confirmButtonColor: "#007AFF"
            });
            getExperienceList(personReferenceKey);
            $scope.workexperience = {};
            $scope.workExperienceLocation = {};
            $scope.workExperienceForm.$setPristine();
            $scope.workExperienceForm.$setUntouched();

        }, function (err) {
            appLogger.error('ERR' + err);
        });
    }
    //Method for deleteWorkExperience by workExperienceId
    $scope.deleteWorkExperience = function (workExperiencereferenceKey) {
var del = confirm("Are you sure you want to Delete ?");
        if (del == true) {

        personWorkExperienceLogic.deleteWorkExperience(personReferenceKey, workExperiencereferenceKey).then(function (response) {
        // appLogger.alert($scope.alertMessageLabels.experienceDeleted);
           SweetAlert.swal({
                title: "Staff Experience",
                text: "Deleted successfully",
                type: "success",
                confirmButtonColor: "#007AFF"
            });


            getExperienceList(personReferenceKey);
        }, function (err) {
            appLogger.log(err);
            appLogger.error('ERR' + err);

        });
    }
}
});