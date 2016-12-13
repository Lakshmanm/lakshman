/*=======================================================================
 All rights reserved to Thrill Innovative Labs.
 THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
 OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
 LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
 FITNESS FOR A PARTICULAR PURPOSE.
===========================================================================
****************************************************************************
 Name		    	 : Person vaccination.Controller.js
 Type		    	 : Angular js 
 Description		 : This file contains controller methods
 References		     :
 Author	    		 : Kiranmai L
 Created Date        : 21-Apr-2016
****************************************************************************
MODIFICATION LOG
**************************************************************************** 
Sno Ver	 Date	     Modified By   Description
1.   1.0 29-04-2016  Kiranmai      Define ReferenceKey
****************************************************************************  
Code Review LOG
**************************************************************************** 
S.No    Ver    Date           Code Review By   Observations
****************************************************************************
*/

var app = angular.module('ThrillPerson.personVaccination', ['ThrillPerson.personVaccinationLogic'

        
        , 'ngCordova', 'ThrillFrameworkLibrary.geo', 'ThrillFrameworkLibrary.Network'

        
        , 'ThrillCnnWebClient.appConfig'

        
        , 'ThrillFrameworkLibrary.appLogger'
])
    /*Setup Person Controller */
app.controller('PersonVaccinationController'
    , function (
        $scope
        , $http
        , PersonVaccinationLogic
        , $state
        , $stateParams
        , appConfig
        , appLogger) {

        var referenceKey = generateUUID();

        //initial load method calling
        var personReferenceKey = $stateParams.personReferenceKey;

        refresh();
        //initial load method
        function refresh() {
            getLabels(appConfig.CULTURE_NAME);
            $scope.vaccination = {};
            getMedicineTypes();
            getVaccinationTypes();
            getVaccinationList(personReferenceKey);

        };



        /*get labels with selected language*/
        function getLabels(cultureName) {

            $http.get("Person/Languages/PersonVaccination." + cultureName + ".json").then(function (response) {
                bindLabels(response.data);

            });
        }


        //bind labels with selected language
        function bindLabels(data) {
            $scope.vaccinationLables = data.labels;
        }

  function getMessages(cultureName) {
        var alertMessageName = "AlertMessages";

        $http.get("Person/Languages/" + alertMessageName + "." + cultureName + ".json").then(function (response) {
            $scope.alertMessageLabels = response.data.messages;
        });
    }

        //For Getting Medicine Types--drop down//

        function getMedicineTypes() {
            PersonVaccinationLogic.getMedicineTypes().then(function (response) {
                $scope.medicineTypeList = response;
            }, function (err) {
                appLogger.log(err);
                appLogger.error('ERR', err);

            });

        };
        getMedicineTypes();


        //For Getting Vaccination Types--drop down//

        function getVaccinationTypes() {
            PersonVaccinationLogic.getVaccinationTypes().then(function (response) {
                $scope.vaccinationTypeList = response;
            }, function (err) {
                appLogger.log(err);
                appLogger.error('ERR', err);

            });

        };
        getVaccinationTypes();


        //get all Vaccinations  list by personReferenceKey method
        function getVaccinationList(personReferenceKey) {

            PersonVaccinationLogic.getVaccinationList(personReferenceKey).then(function (response) {
                $scope.vaccinationList = response;
                generateUUID();

            }, function (err) {
                appLogger.log(err);
                appLogger.error('ERR', err);

            });

        }
        getVaccinationList(personReferenceKey);

        //calling add Vaccinations BL method
        function addVaccination() {
            if (appConfig.APP_MODE == 'offline') {

                $scope.vaccination.referenceKey = referenceKey;
            }


            $scope.vaccination.personReferenceKey = personReferenceKey;
            $scope.vaccination.IsDeleted = 0;
            PersonVaccinationLogic.addVaccination($scope.vaccination, personReferenceKey).then(function (response) {

           appLogger.alert($scope.alertMessageLabels.vaccinationSaved);
                getVaccinationList(personReferenceKey);
                $scope.vaccination = {};
                $scope.vaccinationForm.$setPristine();
                $scope.vaccinationForm.$setUntouched();

            }, function (err) {
                appLogger.error('ERR', err);
            });

        };

        //calling update Vaccinations BL method
        function updateVaccination(vaccinationReferenceKey) {
            $scope.vaccination.personReferenceKey = personReferenceKey;
            appLogger.log($scope.vaccination);
            PersonVaccinationLogic.updateVaccination($scope.vaccination, personReferenceKey, vaccinationReferenceKey).then(function (response) {
                appLogger.log($scope.vaccination);

           appLogger.alert($scope.alertMessageLabels.vaccinationUpdated);
                getVaccinationList(personReferenceKey);
                $scope.vaccination = {};
                $scope.vaccinationForm.$setPristine();
                $scope.vaccinationForm.$setUntouched();
            }, function (err) {
                appLogger.error('ERR', err);
            });
        }


        //calling save and update methods

        $scope.saveVaccination = function () {



            if ($scope.vaccination.referenceKey == undefined || $scope.vaccination.referenceKey == null) {
                addVaccination();
            } else {
                var vaccinationReferenceKey = $scope.vaccination.referenceKey;
                updateVaccination(vaccinationReferenceKey);
            }
        }


        //get Vaccination List By vaccinationReferenceKey
        $scope.getVaccinationById = function (vaccinationReferenceKey) {
            PersonVaccinationLogic.getVaccinationById(personReferenceKey, vaccinationReferenceKey).then(function (response) {
                $scope.vaccination = {};
                $scope.vaccination.referenceKey = response.referenceKey;
                $scope.vaccination.vaccinationName = response.vaccinationName;
                $scope.vaccination.inspectionDate = new Date(response.inspectionDate);
                $scope.vaccination.medicineTypeId = response.medicineTypeId;
                $scope.vaccination.vaccinationTypeId = response.vaccinationTypeId;
                $scope.vaccination.remarks = response.remarks;
                $scope.vaccination.personReferenceKey = response.personReferenceKey;

            }, function (err) {
                appLogger.log(err);
                appLogger.error('ERR', err);

            });
        }

        //delete language proficiency Id firing
        $scope.deleteVaccinationById = function (vaccinationReferenceKey) {

            PersonVaccinationLogic.deleteVaccinationById(personReferenceKey, vaccinationReferenceKey).then(function (response) {
           appLogger.alert($scope.alertMessageLabels.vaccinationDeleted);
                getVaccinationList(personReferenceKey);
            }, function (err) {
                appLogger.log(err);
                appLogger.error('ERR', err);

            });
        }

    });