/*//=============================================================================
// All rights reserved to Thrill Innovative Labs.
// THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
// OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
// LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
// FITNESS FOR A PARTICULAR PURPOSE.
//=============================================================================
//*****************************************************************************
//* Name		    	: Examination.Controller.js 
//* Type		    	: Angular JS File
//* Description		    :
//* References		    :
//* Author	    		:
//* Created Date        : 
//*****************************************************************************
//*                             MODIFICATION LOG
//*****************************************************************************
//*  S.No  Ver	     Date	         Modified By			Description

//*****************************************************************************
//*                             Code Review LOG
//*****************************************************************************

//*****************************************************************************
*/
var app = angular.module('ThrillAcademic.examination', ['ThrillAcademic.examinationLogic'

			 , 'ngCordova'
			 , 'ThrillAcademic.examinationTypeLogic'
			 , 'ThrillFrameworkLibrary.geo'
			 , 'ThrillFrameworkLibrary.Network'
			 , 'ThrillCnnWebClient.appConfig'
			 , 'ThrillFrameworkLibrary.appLogger'
])
    /*Setup examination Controller */
app.controller('ExaminationController', function ($scope, $http, SweetAlert, examinationLogic, examinationTypeLogic, $state, $stateParams, appConfig, $localStorage, appLogger) {
    getLabels(appConfig.CULTURE_NAME);
    getMessages(appConfig.CULTURE_NAME);
    /*get labels with selected language*/
    function getLabels(cultureName) {
        var currentFileName = "Examination";
        $http.get("Academic/Languages/" + currentFileName + "." + cultureName + ".json").then(function (response) {
            bindLabels(response.data);
        });
    }

    function getMessages(cultureName) {
        var alertMessageName = "AlertMessages";
        $http.get("Academic/Languages/" + alertMessageName + "." + cultureName + ".json").then(function (response) {
            $scope.alertMessageLabels = response.data.messages;
        });
    }
    /*bind labels with selected language */
    function bindLabels(data) {
        $scope.labelsExamination = data.labels;
    };
    $scope.save = true;
    $scope.update = false;
    var entitykey = DrawCaptcha();
    var examinationEntityKey;
    $scope.getExaminationTypes = function () {
        examinationTypeLogic.getAllExaminationTypes($localStorage.organizationKey).then(function (response) {
            //$scope.examinationTypeCollection = response;
            var examinationTypeCollection = [];
            for (var i = 0; i < response.length; i++) {
                var obj = {}
                obj.examinationTypeKey = response[i].examinationTypeKey;
                var examLevel = '';
                if (response[i].examinationLevelKey == 1) examLevel = 'Organization Level';
                else if (response[i].examinationLevelKey == 2) examLevel = 'Institute Level';
                obj.examinationTypeTitle = response[i].examinationTypeTitle + ' - ' + examLevel;
                obj.instanceOrganizationKey = response[i].instanceOrganizationKey;
                examinationTypeCollection.push(obj);
            }
            $scope.examinationTypeCollection = examinationTypeCollection;
        });
    }
    $scope.getExaminationTypes();
    /*Perform the CRUD (Create, Read, Update & Delete) operations of Examination*/
    /*Method for calling  add Examination */
    $scope.addExamination = function () {
        if (appConfig.APP_MODE == 'offline') {
            $scope.entityExamination.examinationKey = entitykey;
        }
        $scope.entityExamination.CreatedUserKey = "new-User-My3";
        $scope.entityExamination.CreatedAppKey = "new-App-mCampuZ";
        $scope.entityExamination.instanceOrganizationKey = $localStorage.organizationKey;
        //alert(JSON.stringify($scope.entityExamination));
        examinationLogic.addExamination($scope.entityExamination).then(function (response) {
            //alert("Saved Successfully");
            $scope.entityExamination = {};
            $scope.save = true;
            $scope.update = false;
            $scope.examinationForm.$setPristine();
            $scope.examinationForm.$setUntouched();
            SweetAlert.swal({
                title: "Examination"
                , text: "Saved successfully"
                , type: "success"
                , confirmButtonColor: "#007AFF"
            });
            refresh();
        }, function (err) {
            appLogger.error('ERR', err);
        });
    };
    /*Method for calling  update Examination*/
    $scope.updateExamination = function () {
        $scope.entityExamination.LastUpdatedUserKey = "new-User-My3";
        $scope.entityExamination.LastUpdatedAppKey = "new-App-mCampuZ";
        delete $scope.entityExamination.examinationTypetitle;
        //alert(JSON.stringify($scope.entityExamination));
        examinationLogic.updateExamination($scope.entityExamination, $scope.entityExamination.examinationKey).then(function (response) {
            $scope.entityExamination = {};
            $scope.save = true;
            $scope.update = false;
            $scope.examinationForm.$setPristine();
            $scope.examinationForm.$setUntouched();
            SweetAlert.swal({
                title: "Examination"
                , text: "Updated successfully"
                , type: "success"
                , confirmButtonColor: "#007AFF"
            });
            refresh();
        }, function (err) {
            appLogger.error('ERR', err);
        });
    };
    /*Method for  retrieving  Examination details*/
    $scope.editExamination = function (examinationKey) {
        examinationLogic.getExaminationByExaminationKey(examinationKey).then(function (response) {
            $scope.save = false;
            $scope.update = true;
            $scope.entityExamination = response[0];
            $scope.entityExamination.examinationKey = response[0].examinationKey;
            $scope.entityExamination.examinationTitle = response[0].examinationTitle;
            $scope.entityExamination.instanceOrganizationKey = response[0].instanceOrganizationKey;
            $scope.entityExamination.examinationTypeKey = response[0].examinationTypeKey;
            $scope.entityExamination.examinationTypeTitle = response[0].examinationTypeTitle;
        }, function (err) {
            appLogger.error('ERR', err);
        });
    }
    var refresh = function () {
        examinationLogic.getAllExaminations($localStorage.organizationKey).then(function (response) {
            $scope.examinationCollection = response;
            $scope.sortColumn = "";
            $scope.reverseSort = false;
            $scope.sortData = function (column) {
                $scope.reverseSort = ($scope.sortColumn == column) ? !$scope.reverseSort : false;
                $scope.sortColumn = column;
            }
            $scope.getSortClass = function (column) {
                    if ($scope.sortColumn == column) {
                        return $scope.reverseSort ? 'arrow-down' : 'arrow-up';
                    }
                    return '';
                }
                , function (err) {
                    appLogger.error('ERR', err);
                };
        });
    }
    refresh();
    /*Method for calling  deleting   Examination*/
    $scope.deleteExamination = function (examinationEntityKey) {
        SweetAlert.swal({
            title: "Are you sure?"
            , text: "Your want to delete this examination"
            , type: "warning"
            , showCancelButton: true
            , confirmButtonColor: "#DD6B55"
            , confirmButtonText: "Yes, delete it!"
            , cancelButtonText: "No, cancel!"
            , closeOnConfirm: false
            , closeOnCancel: false
        }, function (isConfirm) {
            if (isConfirm) {
                examinationLogic.deleteExamination(examinationEntityKey).then(function (response) {
                    $scope.entityExamination = {};
                    $scope.save = true;
                    $scope.update = false;
                    $scope.examinationForm.$setPristine();
                    $scope.examinationForm.$setUntouched();
                    SweetAlert.swal({
                        title: "Examination"
                        , text: "Deleted successfully"
                        , type: "success"
                        , confirmButtonColor: "#007AFF"
                    });
                    refresh();
                }, function (err) {
                    appLogger.error('ERR', err);
                });
            }
            else {
                SweetAlert.swal({
                    title: "Cancelled"
                    , text: "Your examination is safe :)"
                    , type: "error"
                    , confirmButtonColor: "#007AFF"
                });
            }
        });
    };
}); // End of App Controller