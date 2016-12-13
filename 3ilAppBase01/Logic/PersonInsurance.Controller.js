/*=======================================================================
 All rights reserved to Thrill Innovative Labs.
 THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
 OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
 LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
 FITNESS FOR A PARTICULAR PURPOSE.
===========================================================================
****************************************************************************
 Name		    	 : personInsurance.Controller.js
 Type		    	 : Angular js 
 Description	 : This file contains controller methods
 References		 :
 Author	    	 : Durga Prasad B
 Created Date  : 19-Apr-2016
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

var app = angular.module('mCampuz.personInsurance', ['ThrillPerson.personInsuranceLogic'

        , 'ngCordova'

        , 'ThrillFrameworkLibrary.geo'

,'ThrillAppBase.thrillAppBasePersonLogic'
        , 'ThrillFrameworkLibrary.Network'

        , 'ThrillCnnWebClient.appConfig'

        , 'ThrillFrameworkLibrary.appLogger'
    ])
    //Setup personWorkExperience Controller 
app.controller('PersonInsuranceController', function($scope, $http, personInsuranceLogic,thrillAppBasePersonLogic,$localStorage,$location, $state, $stateParams, appConfig, appLogger, SweetAlert) {



    // var referenceKey = generateUUID();
    // intial load method calling
    refresh();
$scope.file=false;
    var personReferenceKey;
    if ($stateParams.PersonKey) {
        personReferenceKey = $stateParams.PersonKey;
    }


    //initial load method 
    function refresh() {
        getLabels(appConfig.CULTURE_NAME);
        getMessages(appConfig.CULTURE_NAME);
        $scope.insurance = {};
        $scope.insuranceNominee = {};
        $scope.nominee = {};
        getInsuranceList(personReferenceKey);
    }


    //get labels with selected language for PersonWorkExperience
    function getLabels(cultureName) {

        $http.get("Person/Languages/PersonInsurance." + cultureName + ".json").then(function(response) {
            bindLabels(response.data);

        });
    }
    //bind labels with selected language 
    function bindLabels(data) {

        $scope.insuranceLabels = data.labels;


    };


    //get alert messages
    function getMessages(cultureName) {
        var alertMessageName = "AlertMessages";

        $http.get("Person/Languages/" + alertMessageName + "." + cultureName + ".json").then(function(response) {
            $scope.alertMessageLabels = response.data.messages;
        });
    }
    //method to get insurancelist 

function getPermissions() {
    var pageKey="42b32794792b48313cd1be9ca11b690d3e614683";
     thrillAppBasePersonLogic.getPagePermissions($localStorage.RoleID,pageKey).then(function (response) {
      console.log(JSON.stringify(response));
      // alert(JSON.stringify(response));
           if($location.path() == '/app/student/StudentKey/'+$stateParams.StudentKey +'/PersonKey/'+$stateParams.PersonKey) 
     {  
          if($localStorage.RoleID==2)
             {
        $scope.insurance="true";
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
    function getInsuranceList(id) {

        personInsuranceLogic.getInsuranceList(id).then(function(response) {
            $scope.insuranceList = response;
            // generateUUID();

        }, function(err) {

            appLogger.log('Err' + err);
        });
    }
getInsuranceList(personReferenceKey);
    //method to get insurance types

    function getInsuranceTypes() {

        personInsuranceLogic.getInsuranceTypes().then(function(response) {

            $scope.insuranceTypeList = response;
        }, function(err) {

            appLogger.log('Err' + err);
        })


    }
    getInsuranceTypes();

    //method to add insurance

    function addInsurance(nomineePersonId) {

        if (appConfig.APP_MODE == 'offline') {

            $scope.insurance.referenceKey = referenceKey;
        }

        $scope.insurance.personReferenceKey = personReferenceKey;
        $scope.insurance.nomineePersonId = nomineePersonId;
        $scope.insurance.isDeleted = 0;

        personInsuranceLogic.addInsurance($scope.insurance, personReferenceKey).then(function(response) {
            SweetAlert.swal({
                title: "Insurance",
                text: "Saved successfully",
                type: "success",
                confirmButtonColor: "#007AFF"
            });
            $scope.insurance = {};
            $scope.nominee = {};
            $scope.insuranceForm.$setPristine();
            $scope.insuranceForm.$setUntouched();

            getInsuranceList(personReferenceKey);

        }, function(err) {
            appLogger.error('ERR' + err);
        });

    }

    //method to get nominee id 

    function getNomineeId() {
        $scope.insuranceNominee.FirstName = $scope.nominee.firstName;
        $scope.insuranceNominee.LastName = "--";
        // $scope.insuranceNominee.referenceKey = referenceKey;
        personInsuranceLogic.getNomineeId($scope.insuranceNominee).then(function(response) {
            console.log(response);
            var nomineePersonId = null;
            if (appConfig.APP_MODE == 'offline') {
                nomineePersonId = response.insertId;
            } else {

                nomineePersonId = response.data.insertId;
            }
            // generateUUID();
            addInsurance(nomineePersonId);

        }, function(err) {
            appLogger.error('ERR' + err);

        });
    }

        //delete demographic firing
$scope.getName = function() {
      

        $scope.filename = $scope.insurance.documents.filename;

    }

    ///method to fire save
    $scope.saveInsurance = function() {

        if ($scope.insurance.referenceKey == undefined || $scope.insurance.referenceKey == null) {
            getNomineeId();
        } else {

            appLogger.log("nomineeReferenceKey::" + $scope.insurance.nomineeReferenceKey);
            updateInsuranceNomineePerson($scope.insurance.nomineeReferenceKey);
            updateInsuranceDetails($scope.insurance.referenceKey)


        }



    }

    //method to fire edit function

    $scope.getInsurance = function(insuranceReferenceKey) {

        getInsuranceDetailsById(insuranceReferenceKey);



    };


    //method to get insurancedetailsById

    function getInsuranceDetailsById(insuranceReferenceKey) {

        personInsuranceLogic.getInsuranceListByID(personReferenceKey, insuranceReferenceKey).then(function(response) {
$scope.file=true;
            console.log(response);
            $scope.insurance.insuranceName = response[0].InsuranceName
            $scope.insurance.insuranceNumber = response[0].InsuranceNumber
            $scope.insurance.insuranceTypeID = response[0].InsuranceTypeId
            $scope.insurance.startDate = new Date(response[0].StartDate)
            $scope.insurance.endDate = new Date(response[0].EndDate)
            $scope.insurance.coverageDetails = response[0].CoverageDetails
            $scope.nominee.firstName = response[0].FirstName
            $scope.insurance.insuranceCompany = response[0].InsuranceCompany
                //$scope.insurance.insuranceId = response[0].InsuranceId
                //$scope.insurance.insuranceReferenceKey = response[0].referenceKey
                //$scope.insurance.personId = response[0].PersonId
            $scope.insurance.nomineePersonId = response[0].nomineePersonId
            $scope.insurance.nomineeReferenceKey = response[0].nomineeReferenceKey
            $scope.insurance.referenceKey = response[0].referenceKey
              $scope.filename = response[0].filename;
        }, function(err) {

            appLogger.error('ERR' + err);


        })


    }



    // method to update insurance nomineePerson

    function updateInsuranceNomineePerson(nomineeReferenceKey) {
        appLogger.log("nomineeReferenceKey::" + nomineeReferenceKey);
        $scope.nominee.lastName = "--";
        personInsuranceLogic.updateNominee($scope.nominee, nomineeReferenceKey).then(function(response) {

        }, function(err) {
            appLogger.error('ERR' + err);
        });
    }


    function updateInsuranceDetails(insuranceReferenceKey) {

        appLogger.log(JSON.stringify($scope.insurance));
        delete $scope.insurance.nomineeReferenceKey;
        console.log($scope.insurance);
        personInsuranceLogic.updateInsurance($scope.insurance, personReferenceKey, insuranceReferenceKey).then(function(response) {
            SweetAlert.swal({
                title: "Insurance",
                text: "Updated successfully",
                type: "success",
                confirmButtonColor: "#007AFF"
            });
            getInsuranceList(personReferenceKey);
            $scope.filename=" ";
            $scope.insurance = {};
            $scope.nominee = {};
            $scope.insuranceForm.$setPristine();
            $scope.insuranceForm.$setUntouched();

        }, function(err) {
            appLogger.error('ERR' + err);
        });
    }
    $scope.deleteInsurance = function(insuranceReferenceKey) {
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
                personInsuranceLogic.deleteInsurance(personReferenceKey, insuranceReferenceKey).then(function(response) {
                    getInsuranceList(personReferenceKey);
                    SweetAlert.swal({
                        title: "Insurance",
                        text: "Deleted successfully",
                        type: "success",
                        confirmButtonColor: "#007AFF"
                    });

                });
            } else {
                SweetAlert.swal({
                    title: "Cancelled",
                    text: "Insurance is safe :)",
                    type: "error",
                    confirmButtonColor: "#007AFF"
                });
            }
        });

    };



});