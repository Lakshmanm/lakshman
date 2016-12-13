/*=======================================================================
 All rights reserved to Thrill Innovative Labs.
 THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
 OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
 LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
 FITNESS FOR A PARTICULAR PURPOSE.
===========================================================================
****************************************************************************
 Name		    	 : PersonBank.Controller.js
 Type		    	 : Angular js 
 Description		 : This file contains controller methods
 References		     :
 Author	    		 : Satyanarayana Tippani
 Created Date        : 07-Apr-2016
****************************************************************************
MODIFICATION LOG
**************************************************************************** 
S.No.   Ver	       Date	         Modified By			Description
1       1.0        29-04-2016    Satya Kalyani Lanka    referenceKey concept implemented
****************************************************************************  
Code Review LOG
**************************************************************************** 
S.No    Ver    Date           Code Review By   Observations
1.      1.0    14-Apr-2016    Ch.Rajaji        Remove "currentFileName" variable and use its value directly in the "getLabels" method.
2.      1.0    14-Apr-2016    Ch.Rajaji        Use appLogger inplace of console
3.      1.0    14-Apr-2016    Ch.Rajaji        Arrange dependency modules line by line in the module  and factory declaration.
****************************************************************************
*/

var app = angular.module('Aarush.personBank', ['ThrillPerson.personBankLogic', 'ngCordova', 'ThrillFrameworkLibrary.geo',
        'ThrillFrameworkLibrary.Network',
        'ThrillCnnWebClient.appConfig',
        'ThrillAppBase.thrillAppBasePersonLogic',
        'ThrillFrameworkLibrary.appLogger', 'ThrillLocation.locationLogic'
    ])
    /*Setup Person Controller */
app.controller('Aarush.personBank', function($scope, $http, personBankLogic, $state, $stateParams, thrillAppBasePersonLogic,appConfig, locationLogic,$location, $localStorage, SweetAlert, appLogger) {

    //var referenceKey = generateUUID();

    // intial load method calling
    refresh();
    var personReferenceKey;
    if ($stateParams.PersonKey) {
        personReferenceKey = $stateParams.PersonKey;
    }

    function refresh() {
        getLabels(appConfig.CULTURE_NAME);
        getBankNames();
        $scope.bank = {};
        getBankList(personReferenceKey);
        //if ($stateParams.personReferenceKey != undefined || $stateParams.personReferenceKey != null) {





        //  }

    }

    //get labels with selected language method
    function getLabels(cultureName) {
        $http.get('Person/Languages/PersonBank.' + cultureName + '.json').then(function(response) {
            bindLabels(response.data);

        });
    }

    //bind labels with selected language
    function bindLabels(data) {
        $scope.bankLabels = data.labels;
    }

    function getMessages(cultureName) {
        var alertMessageName = "AlertMessages";

        $http.get("Person/Languages/" + alertMessageName + "." + cultureName + ".json").then(function(response) {
            $scope.alertMessageLabels = response.data.messages;
        });
    }

    var bankLocation = {};
    var locationId = "";


    function getBankNames() {
        personBankLogic.getBankNames().then(function(response) {
            console.log(response);
            $scope.bankNames = response;
        }, function(err) {
            appLogger.log(err);
            appLogger.error('ERR' + err);

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
        $scope.bank="true";
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

getBankList($stateParams.PersonKey)
    //Method for retrieving person details by  personReferenceKey
    function getBankList(personReferenceKey) {
        personBankLogic.getPersonBanks(personReferenceKey).then(function(response) {
            // alert(JSON.stringify(response));
            $scope.bankList = response;
            //generateUUID();
        }, function(err) {
            appLogger.log(err);
            appLogger.error('ERR' + err);

        });
    }

    //saving location
    function addLocation() {
        // appLogger.log($scope.bankLocation);
        //appLogger.log(personReferenceKey);

        $scope.bankLocation.villageId = 4972;
        $scope.bankLocation.countryId = 4;
        $scope.bankLocation.stateId = 1;
        $scope.bankLocation.DistrictID = 3;
        $scope.bankLocation.MandalID = 82;
        $scope.bankLocation.EntityType = "Student";
        locationLogic.addLocation($scope.bankLocation).then(function(response) {
            //personBankLogic.addLocation($scope.bankLocation, personReferenceKey).then(function (response) {
            console.log(response);

            if (appConfig.APP_MODE == 'offline') {
                locationId = response.insertId;
            } else {

                locationId = response.data.insertId;
            }

            addBank(locationId);
        }, function(err) {
            appLogger.error('ERR' + err);
        });
    }

    //save Relative info after saving of addRelativeperson
    function addBank(locationId) {

        if (appConfig.APP_MODE == 'offline') {

            $scope.bank.referenceKey = referenceKey;
        }


        $scope.bank.locationId = locationId;
        //alert(personReferenceKey);
        $scope.bank.personReferenceKey = personReferenceKey;
        // alert(JSON.stringify($scope.bank));
        personBankLogic.addPersonBank($scope.bank, $scope.bank.personReferenceKey).then(function(response) {
            SweetAlert.swal({
                title: " Bank",
                text: "Saved successfully",
                type: "success",
                confirmButtonColor: "#007AFF"
            });

            getBankList(personReferenceKey);
            $scope.bank = {};
            $scope.bankLocation = {};
            $scope.bankForm.$setPristine();
            $scope.bankForm.$setUntouched();

        }, function(err) {

            appLogger.error('ERR' + err);

        });

    };

    //update location by locationId
    function updateLocation(locationId) {

        personBankLogic.updateLocation($scope.bankLocation, locationId).then(function(response) {

        }, function(err) {
            appLogger.error('ERR' + err);
        });
    }

    //Method for update personBank by bankId
    function updateBank(bankReferenceKey) {

        personBankLogic.updatePersonBank($scope.bank, personReferenceKey, bankReferenceKey).then(function(response) {
            SweetAlert.swal({
                title: " Bank",
                text: "Updated successfully",
                type: "success",
                confirmButtonColor: "#007AFF"
            });
            getBankList(personReferenceKey);
            $scope.bank = {};
            $scope.bankLocation = {};
            $scope.bankForm.$setPristine();
            $scope.bankForm.$setUntouched();

        }, function(err) {
            appLogger.error('ERR' + err);
        });
    }

    //save/Update personBank click firing
    $scope.saveBank = function() {
        if ($scope.bank.referenceKey == undefined || $scope.bank.referenceKey == null) {
            //first add Location then Bank
            addLocation();
        } else {

            var bankReferenceKey = $scope.bank.referenceKey;
            var locationId = $scope.bankLocation.locationId;
            updateLocation(locationId);
            updateBank(bankReferenceKey);

        }
    }

    //delete personBank  

    $scope.deleteBank = function(bankReferenceKey) {
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
                personBankLogic.deletePersonBank(personReferenceKey, bankReferenceKey).then(function(response) {
                    getBankList(personReferenceKey);

                    SweetAlert.swal({
                        title: "Bank",
                        text: "Deleted successfully",
                        type: "success",
                        confirmButtonColor: "#007AFF"
                    });

                });
            } else {
                SweetAlert.swal({
                    title: "Cancelled",
                    text: "Bank is safe :)",
                    type: "error",
                    confirmButtonColor: "#007AFF"
                });
            }
        });

    };

    //retrieving person bank details by bankId when edit event firing
    $scope.getBank = function(bankReferenceKey) {
        appLogger.log("bankReferenceKey:::" + bankReferenceKey);

        personBankLogic.getPersonBankById(personReferenceKey, bankReferenceKey).then(function(response) {

           
            $scope.bank = {};
            //$scope.bank.bankId = response.bankId;
            $scope.bank.referenceKey = response.referenceKey;
            $scope.bank.personReferenceKey = response.personReferenceKey;
            $scope.bank.bankTitle = response.bankTitle;
            $scope.bank.bankNameId = response.bankNameId;
            $scope.bank.branchName = response.branchName;
            $scope.bank.accountNumber =parseInt(response.accountNumber);
            $scope.bank.iFSCCode = response.iFSCCode;
             $scope.bank.benificiaryName = response.benificiaryName;


            $scope.bankLocation = {};
            $scope.bankLocation.locationId = response.locationId;

            locationLogic.getLocationByLocationID($scope.bankLocation.locationId).then(function(response) {
                $scope.bankLocation.geoLocation = response[0].geoLocation;
                //console.log(JSON.stringify(response));
            });
        }, function(err) {
            appLogger.log(err);
            appLogger.error('ERR' + err);

        });
    }

});