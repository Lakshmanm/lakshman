/*=======================================================================
 All rights reserved to Thrill Innovative Labs.
 THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
 OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
 LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
 FITNESS FOR A PARTICULAR PURPOSE.
===========================================================================
****************************************************************************
 Name		    	 : PersonDemographics.Controller.js
 Type		    	 : Angular js 
 Description		 : This file contains controller methods
 References		     :
 Author	    		 : Satyanarayana T
 Created Date        : 12-Apr-2016
****************************************************************************
MODIFICATION LOG
**************************************************************************** 
Ver	Date	     Modified By			Description
****************************************************************************  
Code Review LOG
**************************************************************************** 
S.No    Ver    Date           Code Review By   Observations
1.      1.0    14-Apr-2016    Ch.Rajaji        Remove "currentFileName" variable and use its value directly in the "getLabels" method.
2.      1.0    14-Apr-2016    Ch.Rajaji        Use appLogger inplace of console
****************************************************************************
*/

var app = angular.module('mCampuz.personDemographics', ['ThrillPerson.personDemographicsLogic'





        , 'ngCordova', 'ThrillFrameworkLibrary.geo', 'ThrillFrameworkLibrary.Network'


 ,'ThrillAppBase.thrillAppBasePersonLogic'


        , 'ThrillCnnWebClient.appConfig'





        , 'ThrillFrameworkLibrary.appLogger'
    ])
    /*Setup Person Controller */
app.controller('PersonDemographicsController', function(
    $scope, $http, personDemographicsLogic,$localStorage, $state, $stateParams, $filter, appConfig,thrillAppBasePersonLogic,$location, appLogger, SweetAlert) {


    //var referenceKey = generateUUID();

    var personReferenceKey;
    if ($stateParams.PersonKey) {
        personReferenceKey = $stateParams.PersonKey;
    }


    //initial load method calling
    refresh();
    
function getPermissions() {
    var pageKey="42b32794792b48313cd1be9ca11b690d3e614683";
     thrillAppBasePersonLogic.getPagePermissions($localStorage.RoleID,pageKey).then(function (response) {
      console.log(JSON.stringify(response));
      // alert(JSON.stringify(response));
        if($location.path() == '/app/student/StudentKey/'+$stateParams.StudentKey +'/PersonKey/'+$stateParams.PersonKey) 
     {   if($localStorage.RoleID==2)
             {
          $scope.demo="true"; 
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


    $scope.fileName=false;
    $scope.height=$localStorage.HeightTitle;
    $scope.weight=$localStorage.WeightTitle;
    $scope.temperature=$localStorage.TemperatureTitle;

    //initial load method
    function refresh() {
        getLabels(appConfig.CULTURE_NAME);
        $scope.demographic = {};

        getDemographicList(personReferenceKey);
    };



    //get labels with selected language method
    function getLabels(cultureName) {
        $http.get('Person/Languages/PersonDemographics.' + cultureName + '.json').then(function(response) {
            bindLabels(response.data);

        });
    }

    //bind labels with selected language
    function bindLabels(data) {
        $scope.demographicLabels = data.labels;
    };

    //get demographic by personReferenceKey method
    function getDemographicList(personReferenceKey) {

        personDemographicsLogic.getDemographics(personReferenceKey).then(function(response) {
            $scope.demographicList = response;
            // generateUUID();
        }, function(err) {
            appLogger.log(err);
            appLogger.error('ERR', err);

        });

    }

    //add demographic method
    function addDemographic() {

        if (appConfig.APP_MODE == 'offline') {

            $scope.demographic.referenceKey = referenceKey;
        }

        var d2 = $scope.demographic.inspectionDate
        var dt1 = new Date(d2.getTime() + 1*86400000)
         $scope.demographic.inspectionDate= dt1;
    //     alert($scope.demographic.inspectionDate)


         

 
        $scope.demographic.personReferenceKey = personReferenceKey;
        personDemographicsLogic.addDemographic($scope.demographic, personReferenceKey).then(function(response) {

            SweetAlert.swal({
                title: " Vitals",
                text: "Saved successfully",
                type: "success",
                confirmButtonColor: "#007AFF"
            });


            getDemographicList(personReferenceKey);
            $scope.demographic = {};
            $scope.demographicsForm.$setPristine();
            $scope.demographicsForm.$setUntouched();

        }, function(err) {
            appLogger.error('ERR', err);
        });

    };

    //update demographic by referenceKey method*/
    function updateDemographic(demographicReferenceKey) {

        $scope.demographic.PersonReferenceKey = personReferenceKey;
        personDemographicsLogic.updateDemographic($scope.demographic, personReferenceKey, demographicReferenceKey).then(function(response) {
            SweetAlert.swal({
                title: " Vitals",
                text: "Updated successfully",
                type: "success",
                confirmButtonColor: "#007AFF"
            });

            getDemographicList(personReferenceKey);
            $scope.demographic = {};
            $scope.demographicsForm.$setPristine();
            $scope.demographicsForm.$setUntouched();
           $scope.filename =" ";
        }, function(err) {
            appLogger.error('ERR', err);
        });
    }


    //save click firing
    $scope.saveDemographic = function() {

        if ($scope.demographic.referenceKey == undefined || $scope.demographic.referenceKey == null) {
            addDemographic()
        } else {

            var referenceKey = $scope.demographic.referenceKey;
            updateDemographic(referenceKey);
        }
    }

    //get demographic click firing

    $scope.bmi = function() {
        if($localStorage.HeightTitle=="Feet")
            {
           $scope.demographic.height=$scope.demographic.height * 0.3048;     
            }
        else if($localStorage.HeightTitle=="Centimeters")
            {
            $scope.demographic.height=$scope.demographic.height * 0.01;      
            }
       else if($localStorage.HeightTitle=="Inches")
            {
            $scope.demographic.height=$scope.demographic.height * 0.0254;      
            }
       else if($localStorage.HeightTitle=="Millimeters")
            {
            $scope.demographic.height=$scope.demographic.height * 0.001;      
            }
        if($localStorage.WeightTitle=="Ounces(OZ)")
            {
           $scope.demographic.weight=$scope.demographic.weight * 0.0283495;
            }
        else if($localStorage.WeightTitle=="Pounds(LBZ)")
            {
           $scope.demographic.weight=$scope.demographic.weight * 0.453592;
            }
        
            
            
        var height = $scope.demographic.height * $scope.demographic.height;
        var weight = $scope.demographic.weight;
        var bmi = $filter('number')(weight / height, 2)
            //var bmi=weight/height;
        console.log(height);
        console.log(bmi);
        $scope.demographic.bmi = bmi;
        console.log($scope.demographic.bmi);

    }
    $scope.getDemographic = function(demographicReferenceKey) {

        personDemographicsLogic.getDemographicById(personReferenceKey, demographicReferenceKey).then(function(response) {
            $scope.fileName=true;
            $scope.demographicsFormaphic = {};
            $scope.demographic.referenceKey = response[0].referenceKey;
            $scope.demographic.height = response[0].height;
            $scope.demographic.weight = response[0].weight;
            $scope.demographic.bmi = response[0].bmi;
            $scope.demographic.hemoglobin = response[0].hemoglobin;
            $scope.demographic.temperature = response[0].temperature;
            $scope.demographic.inspectionDate = response[0].inspectionDate;
            $scope.demographic.PersonReferenceKey = response[0].personReferenceKey;
          $scope.filename = response[0].filename;
        }, function(err) {
            appLogger.log(err);
            appLogger.error('ERR', err);

        });
    }

    //delete demographic firing
$scope.getFile = function() {
 
   
      $scope.filename = $scope.demographic.documents.filename;
  
    }


    $scope.deleteDemographic = function(demographicReferenceKey) {
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
                personDemographicsLogic.deleteDemographic(personReferenceKey, demographicReferenceKey).then(function(response) {
                    getDemographicList(personReferenceKey);
                    SweetAlert.swal({
                        title: "Vitals",
                        text: "Deleted successfully",
                        type: "success",
                        confirmButtonColor: "#007AFF"
                    });

                });
            } else {
                SweetAlert.swal({
                    title: "Cancelled",
                    text: "Vitals is safe :)",
                    type: "error",
                    confirmButtonColor: "#007AFF"
                });
            }
        });

    };




});