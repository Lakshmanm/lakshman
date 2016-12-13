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

var app = angular.module('Aarush.personAward', ['ThrillPerson.personAwardLogic', 'ngCordova','ThrillAppBase.thrillAppBasePersonLogic',  'ThrillFrameworkLibrary.geo', 'ThrillFrameworkLibrary.Network', 'ThrillCnnWebClient.appConfig', 'ThrillFrameworkLibrary.appLogger',
        'ThrillLocation.locationLogic'
    ])
    //Setup PersonAwardController Controller 
app.controller('Aarush.personAward', function($rootScope, $scope, $http, personAwardLogic, $state, $stateParams,thrillAppBasePersonLogic, $localStorage,$location, locationLogic, appConfig, SweetAlert, appLogger) {

    //var referenceKey = generateUUID();

    getLabels(appConfig.CULTURE_NAME);



    //initial load method
    var locationId = "";
    var personReferenceKey;
    if ($stateParams.PersonKey) {
        // alert($stateParams.PersonKey);
        personReferenceKey = $stateParams.PersonKey;
    }
    refresh();

    function refresh() {
        getLabels(appConfig.CULTURE_NAME);
        $scope.award = {};
        $scope.awardLocation = {};


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
       $scope.awards=true;
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

 $scope.maxDate = new Date();

    //get labels with selected language for personAward
    function getLabels(cultureName) {

        $http.get("Person/Languages/PersonAward." + cultureName + ".json").then(function(response) {
            bindLabels(response.data);

        });
    }
    //bind labels with selected language 
    function bindLabels(data) {

        $scope.awardLabels = data.labels;


    };

    function getMessages(cultureName) {
        var alertMessageName = "AlertMessages";

        $http.get("Person/Languages/" + alertMessageName + "." + cultureName + ".json").then(function(response) {
            $scope.alertMessageLabels = response.data.messages;
        });
    }


    // Method to load refresh for personAward
    function refresh() {
        $scope.award = {};
        $scope.awardLocation = {};

        getAwardList(personReferenceKey);




    }


    refresh();




    // Method to addLocation for personAward
    function addLocation() {

        $scope.awardLocation.villageId = 4972;
        $scope.awardLocation.countryId = 4;
        $scope.awardLocation.stateId = 1;
        $scope.awardLocation.DistrictID = 3;
        $scope.awardLocation.MandalID = 82;
        $scope.awardLocation.EntityType = "Student";
        locationLogic.addLocation($scope.awardLocation).then(function(response) {


            if (appConfig.APP_MODE == 'offline') {
                locationId = response.insertId;
            } else {

                locationId = response.data.insertId;
            }

            addPersonAward(locationId);

        }, function(err) {
            appLogger.error('ERR' + err);
        });
    }

    // Method to addpersonAward using locationId

    function addPersonAward(locationId) {
        if (appConfig.APP_MODE == 'offline') {

            $scope.award.referenceKey = referenceKey;
        }
        $scope.award.locationId = locationId;
        $scope.award.personReferenceKey = personReferenceKey;
        //alert(JSON.stringify($scope.award));

        personAwardLogic.addPersonAward($scope.award, personReferenceKey).then(function(response) {

            SweetAlert.swal({
                title: "Award",
                text: "Saved successfully",
                type: "success",
                confirmButtonColor: "#007AFF"
            });

            $rootScope.$broadcast('eventNewAward', {
                message: 'newAward'
            });
            $scope.award.IsDeleted = 0;
            getAwardList(personReferenceKey);



            $scope.award = {};
            $scope.awardLocation = {};

            $scope.awardForm.$setPristine();
            $scope.awardForm.$setUntouched();

        }, function(err) {

            appLogger.error('ERR' + err);

        });

    };


    //Method for save/Update Personaward
    $scope.savePersonaward = function() {
            // if($stateParams.PersonKey!=null||$stateParams.PersonKey!=undefined||$stateParams.PersonKey!="")
            // {
            if ($scope.award.referenceKey == undefined || $scope.award.referenceKey == null) {
                //first add Location then workexperience
                addLocation();
            } else {

                var referenceKey = $scope.award.referenceKey;
                var locationId = $scope.awardLocation.locationId;

                updateLocation(locationId);
                updatePersonAward(referenceKey);



            }
            // }
            // else{

            // }

        }
        //Method for retrieving Personaward details by  personReferenceKey 

    function getAwardList(personReferenceKey) {

        personAwardLogic.getAwardList(personReferenceKey).then(function(response) {

            $scope.awardList = response;
            //generateUUID();

        }, function(err) {
            appLogger.log(err);
            appLogger.error('ERR' + err);

        });
    }

    if (personReferenceKey != undefined || personReferenceKey != null) {
        var personReferenceKey = personReferenceKey;
        getAwardList(personReferenceKey);

    }


    //Method for retrieving personAward details by  awardReferenceKey

    $scope.getAwardListById = function(awardReferenceKey) {

        personAwardLogic.getAwardListById(personReferenceKey, awardReferenceKey).then(function(response) {
            console.log(response);
            $scope.awardLocation = {};

            $scope.award = {};
            //$scope.award=response[0];
            $scope.award.referenceKey = response.referenceKey;
            $scope.award.awardName = response.awardName;
            $scope.award.awardedDate = new Date(response.awardedDate);
            $scope.award.description = response.description;
            $scope.award.awardedOrganization = response.awardedOrganization;
            $scope.award.locationId = response.locationId;
            $scope.award.personReferenceKey = response.personReferenceKey;
            locationLogic.getLocationByLocationID($scope.award.locationId).then(function(response) {
                $scope.awardLocation.geoLocation = response[0].geoLocation;
                //console.log(JSON.stringify(response));
            });
        }, function(err) {
            appLogger.log(err);
            appLogger.error('ERR' + err);

        });
    }

    //Method for  updateLocation by  locationId

    function updateLocation(locationId) {

        personAwardLogic.updateLocation($scope.awardLocation, personReferenceKey, locationId).then(function(response) {

        }, function(err) {
            appLogger.error('ERR' + err);
        });
    }


    //Method for update personAward by awardReferenceKey
    function updatePersonAward(awardReferenceKey) {

        personAwardLogic.updatePersonAward($scope.award, personReferenceKey, awardReferenceKey).then(function(response) {

            SweetAlert.swal({
                title: " Award",
                text: "Updated successfully",
                type: "success",
                confirmButtonColor: "#007AFF"
            });

            $rootScope.$broadcast('eventNewAward', {
                message: 'newAward'
            });

            getAwardList(personReferenceKey);



            $scope.award = {};
            $scope.awardLocation = {};

            $scope.awardForm.$setPristine();
            $scope.awardForm.$setUntouched();

        }, function(err) {
            appLogger.error('ERR' + err);
        });
    }

    //Method for delete personAward by awardReferenceKey

    $scope.deletePersonAward = function(awardReferenceKey) {
        SweetAlert.swal({
            title: "Are you sure?",
            text: "You want to Delete?",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, cancel!",
            closeOnConfirm: false,
            closeOnCancel: false
        }, function(isConfirm) {
            if (isConfirm) {
                personAwardLogic.deletePersonAward(personReferenceKey, awardReferenceKey).then(function(response) {
                    getAwardList(personReferenceKey);

                    SweetAlert.swal({
                        title: "Award",
                        text: "Deleted successfully",
                        type: "success",
                        confirmButtonColor: "#007AFF"
                    });

                });
            } else {
                SweetAlert.swal({
                    title: "Cancelled",
                    text: "Award is safe :)",
                    type: "error",
                    confirmButtonColor: "#007AFF"
                });
            }
        });

    };


});