/*=======================================================================
 All rights reserved to Thrill Innovative Labs.
 THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
 OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
 LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
 FITNESS FOR A PARTICULAR PURPOSE.
===========================================================================
****************************************************************************
 Name                : PersonDisease.Controller.js
 Type                : Angular js 
 Description         : This file contains controller methods
 References          :
 Author              : Durga Prasad B
 Created Date        : 22-Apr-2016
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

var app = angular.module('ThrillPerson.personDisease', ['ThrillPerson.personDiseaseLogic'





        
        , 'ngCordova'





        
        , 'ThrillFrameworkLibrary.geo'





        
        , 'ThrillFrameworkLibrary.Network'





        
        , 'ThrillCnnWebClient.appConfig'





        
        , 'ThrillFrameworkLibrary.appLogger'
])
    //Setup personWorkExperience Controller 
app.controller('PersonDiseaseController', function ($scope
    , $http
    , personDiseaseLogic
    , $state
    , $stateParams
    , appConfig
    , appLogger) {

    var referenceKey = generateUUID();

    getLabels(appConfig.CULTURE_NAME);
    getMessages(appConfig.CULTURE_NAME);
    //initial load method
    refresh();
    var personReferenceKey = $stateParams.personReferenceKey;

    function refresh() {
        getLabels(appConfig.CULTURE_NAME);
        getPersonDiseaseList($stateParams.personReferenceKey);
        $scope.disease = {};

        getAllDiseaseTypes();
    };
    //get labels with selected language for PersonWorkExperience
    function getLabels(cultureName) {
        $http.get("Person/Languages/PersonDisease." + cultureName + ".json").then(function (response) {
            bindLabels(response.data);
        });
    }
    //bind labels with selected language 
    function bindLabels(data) {
        $scope.diseaseLabels = data.labels;
    };


    function getMessages(cultureName) {
        var alertMessageName = "AlertMessages";

        $http.get("Person/Languages/" + alertMessageName + "." + cultureName + ".json").then(function (response) {
            $scope.alertMessageLabels = response.data.messages;
        });
    }




    //method to get all diseases
    function getAllDiseaseTypes() {
        personDiseaseLogic.getAllDiseaseTypes().then(function (response) {
                $scope.diseaseTypeList = response;

            }
            , function (err) {

            })
    }
    //method to get person disease list
    function getPersonDiseaseList(personReferenceKey) {
        personDiseaseLogic.getPersonDiseaseList(personReferenceKey).then(function (response) {
            if (appConfig.APP_MODE == 'online') {
                var isHospitalized
                var Obj = {};
                var responsenew = [];
                for (var i = 0; i < response.length; i++) {
                    if (response[i].isHospitalized.data == 1) {
                        isHospitalized = 'true';
                    } else
                        isHospitalized = 'false';
                    obj = {
                        diseaseTypeName: response[i].diseaseTypeName
                        , isHospitalized: isHospitalized
                        , hospitalName: response[i].hospitalName
                        , diseaseID: response[i].diseaseID
                        , curedDate: response[i].curedDate
                        , isLifeThreatDisease: response[i].isLifeThreatDisease
                        , referenceKey: response[i].referenceKey
                    }
                    responsenew.push(obj);
                }
                appLogger.log(responsenew);
                $scope.diseaseList = responsenew;
            } else {
                $scope.diseaseList = response;
                generateUUID();
            }
        })
    }
    ///method to fire save
    $scope.saveDisease = function () {

        if ($scope.disease.referenceKey == undefined || $scope.disease.referenceKey == null) {
            saveDisease();
        } else {
            updateDisease($scope.disease.referenceKey);
        }
    }

    function saveDisease() {

        if (appConfig.APP_MODE == 'offline') {

            $scope.disease.referenceKey = referenceKey;
        }
        $scope.disease.personReferenceKey = personReferenceKey;
        $scope.disease.isDeleted = 0;
        personDiseaseLogic.addDisease($scope.disease, personReferenceKey).then(function (response) {
                appLogger.alert($scope.alertMessageLabels.diseaseSaved);
                getPersonDiseaseList(personReferenceKey);
                $scope.disease = {};
                $scope.diseaseForm.$setPristine();
                $scope.diseaseForm.$setUntouched();
            }
            , function (err) {


            })
    }

    //method to update disease

    function updateDisease(diseaseReferenceKey) {
        appLogger.log(JSON.stringify($scope.disease));
        $scope.disease.personReferenceKey = personReferenceKey;
        personDiseaseLogic.updateDisease($scope.disease, personReferenceKey, diseaseReferenceKey).then(function (response) {
                appLogger.alert($scope.alertMessageLabels.diseaseUpdated);
                getPersonDiseaseList(personReferenceKey);
                $scope.disease = {};
                $scope.diseaseForm.$setPristine();
                $scope.diseaseForm.$setUntouched();

            }
            , function (err) {
                appLogger.log(err);
            })
    }

    //method to fire edit function

    $scope.getDisease = function (diseaseReferenceKey) {
        getDiseaseDetailsByID(diseaseReferenceKey);
    };

    function getDiseaseDetailsByID(diseaseReferenceKey) {

        personDiseaseLogic.getDiseaseDetailsByID(personReferenceKey, diseaseReferenceKey).then(function (response) {

            $scope.disease.diseaseTypeId = response[0].diseaseTypeId;
            $scope.disease.hospitalName = response[0].hospitalName;
            $scope.disease.details = response[0].details;
            $scope.disease.remarks = response[0].remarks;
            $scope.disease.identifiedDate = new Date(response[0].identifiedDate);
            $scope.disease.curedDate = new Date(response[0].curedDate);
            //$scope.disease.diseaseID = response[0].diseaseID;
            if (response[0].isHospitalized == 'true' || response[0].isHospitalized.data == 1)
                $scope.disease.isHospitalized = true;
            else
                $scope.disease.isHospitalized = false;
            if (response[0].isLifeThreatDisease == 'true' || response[0].isLifeThreatDisease.data == 1)
                $scope.disease.isLifeThreatDisease = true;
            else
                $scope.disease.isLifeThreatDisease = false;
            $scope.disease.referenceKey = response[0].referenceKey;

        });


    };
    //method to delete diseasebydiseaseid

    $scope.deleteDisease = function (diseaseReferenceKey) {
        personDiseaseLogic.deleteDisease(personReferenceKey, diseaseReferenceKey).then(function (response) {
            appLogger.alert($scope.alertMessageLabels.diseaseDeleted);
            getPersonDiseaseList(personReferenceKey);

        }, function (err) {
            appLogger.log(err);
            appLogger.error('ERR' + err);

        });
    }
});