/*//=============================================================================
// All rights reserved to Thrill Innovative Labs.
// THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
// OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
// LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
// FITNESS FOR A PARTICULAR PURPOSE.
//=============================================================================
//*****************************************************************************
//* Name		    	: ExaminationType.Controller.js 
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

var app = angular.module('ThrillAcademic.academicYear', ['ThrillAcademic.academicYearLogic'

        , 'ngCordova', 'ThrillFrameworkLibrary.geo', 'ThrillFrameworkLibrary.Network', 'ThrillCnnWebClient.appConfig', 'ThrillFrameworkLibrary.appLogger'
    ])
    /*Setup examinationType Controller */
app.controller('AcademicYearController', function($scope, $http, SweetAlert, $localStorage, academicYearLogic, $state, $stateParams, appConfig, appLogger) {



    getLabels(appConfig.CULTURE_NAME);
    getMessages(appConfig.CULTURE_NAME);

    /*get labels with selected language*/
    function getLabels(cultureName) {
        var currentFileName = "AcademicYear";
        $http.get("Academic/Languages/" + currentFileName + "." + cultureName + ".json").then(function(response) {
            bindLabels(response.data);

        });
    }

    function getMessages(cultureName) {
        var alertMessageName = "AlertMessages";

        $http.get("Academic/Languages/" + alertMessageName + "." + cultureName + ".json").then(function(response) {
            $scope.alertMessageLabels = response.data.messages;
        });
    }

    /*bind labels with selected language */
    function bindLabels(data) {

        $scope.labelsAcademicYear = data.labels;

    };

    $scope.save = true;
    $scope.update = false;
 $scope.active=false;

    var entitykey = DrawCaptcha();
    var yearEntityKey;

    /*Perform the CRUD (Create, Read, Update & Delete) operations of Board*/
    /*Method for calling  add Board */
    $scope.addAcademicYear = function() {
        if (appConfig.APP_MODE == 'offline') {
            $scope.entityAcademic.yearKey = entitykey;
        }
        $scope.entityAcademic.instituteKey = $localStorage.instituteKey;
        $scope.entityAcademic.instanceOrganizationKey = $localStorage.organizationKey;
        academicYearLogic.addAcademicYear($scope.entityAcademic).then(function(response) {


            $scope.entityAcademic = {};
            $scope.active=true;
            $scope.save = true;
            $scope.update = false;
            refresh();
            //$scope.boardForm.$setPristine();
            $scope.yearForm.$setPristine();
            $scope.yearForm.$setUntouched();

            SweetAlert.swal({
                title: "Academic Year",
                text: "Saved successfully",
                type: "success",
                confirmButtonColor: "#007AFF"
            }); //appLogger.alert($scope.alertMessageLabels.boardSaved);
        }, function(err) {
            appLogger.error('ERR', err);
        });
    };

    var refresh = function() {

        academicYearLogic.getAllAcademicYears($localStorage.organizationKey).then(function(response) {
            $scope.yearCollection = response;
            $scope.sortColumn = "";
            $scope.reverseSort = false;
            $scope.sortData = function(column) {
                $scope.reverseSort = ($scope.sortColumn == column) ?
                    !$scope.reverseSort : false;
                $scope.sortColumn = column;
            }
            $scope.getSortClass = function(column) {
                    if ($scope.sortColumn == column) {
                        return $scope.reverseSort ? 'arrow-down' : 'arrow-up';
                    }
                    return '';
                },
                function(err) {
                    appLogger.error('ERR', err);
                };
        });
    }
    refresh();

    /*Method for  retrieving  Board details*/
    $scope.editYear = function(yearKey) {
        $scope.save = false;
        $scope.update = true;
          $scope.active=false;
        academicYearLogic.getYearByYearKey(yearKey).then(function(response) {

            $scope.entityAcademic = {};
            $scope.entityAcademic.academicYearName = response[0].AcademicYearName;
            $scope.entityAcademic.academicYearKey = response[0].AcademicYearKey;
            $scope.entityAcademic.startDate = new Date(response[0].StartDate);
            $scope.entityAcademic.endDate = new Date(response[0].EndDate);
            if (response[0].isActive.data[0] == 0 || response[0].isActive.data[0] == null) {
                $scope.entityAcademic.isActive = false;
            } else {
                $scope.entityAcademic.isActive = true;
            }
        }, function(err) {
            appLogger.error('ERR', err);
        });
    }



    $scope.updateAcademicYear = function() {
        $scope.entityAcademic.instanceOrganizationKey = $localStorage.organizationKey;
        academicYearLogic.updateYear($scope.entityAcademic, $scope.entityAcademic.academicYearKey).then(function(response) {
            $scope.entityAcademic = {};
            refresh();
             $scope.active=false;
            $scope.save = true;
            $scope.update = false;
            $scope.yearForm.$setPristine();
            $scope.yearForm.$setUntouched();

            SweetAlert.swal({
                title: "Academic Year",
                text: "Updated successfully",
                type: "success",
                confirmButtonColor: "#007AFF"
            });



        }, function(err) {
            appLogger.error('ERR', err);
        });
    };







    /*Method for calling  deleting   Board   */
    $scope.deleteYear = function(yearKey) {
        var del = confirm("Are you sure you want to Delete ?");
        if (del == true) {
            academicYearLogic.deleteYear(yearKey).then(function(response) {
                //appLogger.alert($scope.alertMessageLabels.boardDeleted);
                $scope.entityAcademic = {};
                $scope.save = true;
                $scope.update = false;
                $scope.yearForm.$setPristine();
                $scope.yearForm.$setUntouched();

                refresh();

                SweetAlert.swal({
                    title: "Academic",
                    text: "Deleted successfully",
                    type: "success",
                    confirmButtonColor: "#007AFF"
                });
            }, function(err) {
                appLogger.error('ERR', err);
            });
        }
    };





}); // End of App Controller