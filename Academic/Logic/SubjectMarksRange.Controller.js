/*//=============================================================================
// All rights reserved to Thrill Innovative Labs.
// THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
// OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
// LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
// FITNESS FOR A PARTICULAR PURPOSE.
//=============================================================================
//*****************************************************************************
//* Name		    	: SubjectMarksRange.Controller.js 
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

var app = angular.module('ThrillAcademic.subjectMarksRange', ['ThrillAcademic.subjectMarksRangeLogic', 'ThrillAcademic.boardLogic', 'ThrillAcademic.groupLogic', 'ThrillAcademic.coursLogic', 'ThrillAcademic.termLogic', 'ThrillAcademic.subjectLogic', 'ThrillAcademic.examinationTypeLogic', 'ngStorage', 'ngCordova', 'ThrillFrameworkLibrary.geo', 'ThrillFrameworkLibrary.Network', 'ThrillCnnWebClient.appConfig', 'ThrillFrameworkLibrary.appLogger'])
    /*Setup subjectMarksRange Controller */
app.controller('SubjectMarksRangeController', function($scope, SweetAlert, $http, $localStorage, subjectMarksRangeLogic, boardLogic, groupLogic, termLogic, coursLogic, subjectLogic, examinationTypeLogic, $state, $stateParams, appConfig, appLogger) {
    getLabels(appConfig.CULTURE_NAME);
    getMessages(appConfig.CULTURE_NAME);

    /*get labels with selected language*/
    function getLabels(cultureName) {
        var currentFileName = "SubjectMarksRange";
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

        $scope.labelsSubjectMarksRange = data.labels;

    };

    var entitykey = DrawCaptcha();
    var subjectMarksRangeEntityKey;

    $scope.save = true;
    $scope.update = false;

    //$scope.Organizations=[{"Title":"Organization 1","Id":"1"},{ "Title":"Organization 2","Id":"2"},{ "Title":"Organization 3","Id":"3"}]
    //$scope.subjectCollection=[{"subjecttitle":"Subject 1","subjectkey":"1"},{ "subjecttitle":"Subject 2","subjectkey":"2"},{ "subjecttitle":"Subject 3","subjectkey":"3"}]


    function getAllBoards() {
        boardLogic.getAllBoards($localStorage.organizationKey).then(function(response) {
            $scope.boardList = response;
        })
    }

    getAllBoards();

    $scope.getBoardGroups = function(boardKey) {
        groupLogic.getBoardGroups(boardKey).then(function(response) {
            $scope.groupList = response;

        })
    }

    $scope.getGroupCourse = function(groupKey) {
        
        coursLogic.getCoursByGroupKey(groupKey).then(function(response) {
            $scope.courseList = response;

        })
    }
    $scope.getCourseTerm = function(courseKey) {
        termLogic.getTermByCourseKey(courseKey).then(function(response) {
            $scope.termList = response;
        })
    }
    $scope.getTermSubject = function(termKey) {
        subjectLogic.getSubjectByTermKey(termKey).then(function(response) {
            $scope.subjectList = response;
        })
    }

    function getExaminationTypes() {
        examinationTypeLogic.getAllExaminationTypes($localStorage.organizationKey).then(function(response) {
            $scope.examinationTypeList = response;
        });
    }
    getExaminationTypes();

    /*Perform the CRUD (Create, Read, Update & Delete) operations of SubjectMarksRange*/
    /*Method for calling  add SubjectMarksRange */
    $scope.addSubjectMarksRange = function() {
        if (appConfig.APP_MODE == 'offline') {
            $scope.entitySubjectMarksRange.subjectMarksRangeKey = entitykey;
        }

        delete $scope.entitySubjectMarksRange.boardKey;
        delete $scope.entitySubjectMarksRange.groupKey;
        delete $scope.entitySubjectMarksRange.courseKey;
        delete $scope.entitySubjectMarksRange.termKey;

        $scope.entitySubjectMarksRange.CreatedUserKey = "new-User-My3";
        $scope.entitySubjectMarksRange.CreatedAppKey = "new-App-mCampuZ";
        $scope.entitySubjectMarksRange.instanceOrganizationKey = $localStorage.organizationKey;
        //alert(JSON.stringify($scope.entitySubjectMarksRange));
        subjectMarksRangeLogic.addSubjectMarksRange($scope.entitySubjectMarksRange).then(function(response) {
            //alert("Saved Successfully");
            $scope.entitySubjectMarksRange = {};
            $scope.save = true;
            $scope.update = false;
            $scope.subjectMarksRangeForm.$setPristine();
            $scope.subjectMarksRangeForm.$setUntouched();
            SweetAlert.swal({
                title: "Subject Marks Range",
                text: "Saved successfully",
                type: "success",
                confirmButtonColor: "#007AFF"
            });

            refresh();
        }, function(err) {
            appLogger.error('ERR', err);
        });
    };

    /*Method for calling  update SubjectMarksRange*/
    $scope.updateSubjectMarksRange = function() {

        delete $scope.entitySubjectMarksRange.boardKey;
        delete $scope.entitySubjectMarksRange.groupKey;
        delete $scope.entitySubjectMarksRange.courseKey;
        delete $scope.entitySubjectMarksRange.termKey;
        delete $scope.entitySubjectMarksRange.subjectTitle;
        delete $scope.entitySubjectMarksRange.examinationTypeTitle;
        $scope.entitySubjectMarksRange.LastUpdatedUserKey = "new-User-My3";
        $scope.entitySubjectMarksRange.LastUpdatedAppKey = "new-App-mCampuZ";
        //alert(JSON.stringify($scope.entitySubjectMarksRange));
        subjectMarksRangeLogic.updateSubjectMarksRange($scope.entitySubjectMarksRange, $scope.entitySubjectMarksRange.subjectMarksRangeKey).then(function(response) {
            $scope.entitySubjectMarksRange = {};
            $scope.save = true;
            $scope.update = false;
            $scope.subjectMarksRangeForm.$setPristine();
            $scope.subjectMarksRangeForm.$setUntouched();
            SweetAlert.swal({
                title: "Subject Marks Range",
                text: "Updated successfully",
                type: "success",
                confirmButtonColor: "#007AFF"
            });
            refresh();
        }, function(err) {
            appLogger.error('ERR', err);
        });
    };

    /*Method for  retrieving  SubjectMarksRange details*/
    $scope.editSubjectMarksRange = function(subjectMarksRangeKey) {
        subjectMarksRangeLogic.getSubjectMarksRangeBySubjectMarksRangeKey(subjectMarksRangeKey).then(function(response) {
            $scope.save = false;
            $scope.update = true;
            // $scope.entitySubjectMarksRange = response[0];

            $scope.getBoardGroups(response[0].boardKey);
            $scope.getGroupCourse(response[0].groupKey);
            $scope.getCourseTerm(response[0].courseKey);
            $scope.getTermSubject(response[0].termKey);

            $scope.entitySubjectMarksRange = {};
            $scope.entitySubjectMarksRange.boardKey = response[0].boardKey;
            $scope.entitySubjectMarksRange.groupKey = response[0].groupKey;
            $scope.entitySubjectMarksRange.courseKey = response[0].courseKey;
            $scope.entitySubjectMarksRange.termKey = response[0].termKey;
            $scope.entitySubjectMarksRange.subjectMarksRangeKey = response[0].subjectMarksRangeKey;
            $scope.entitySubjectMarksRange.subjectKey = response[0].subjectKey;
            $scope.entitySubjectMarksRange.subjectTitle = response[0].subjectTitle;
            $scope.entitySubjectMarksRange.examinationTypeKey = response[0].examinationTypeKey;
            $scope.entitySubjectMarksRange.examinationTypeTitle = response[0].examinationTypeTitle;
            $scope.entitySubjectMarksRange.passMarks = response[0].passMarks;
            $scope.entitySubjectMarksRange.maxMarks = response[0].maxMarks;
            $scope.entitySubjectMarksRange.instanceOrganizationKey = response[0].instanceOrganizationKey;
        }, function(err) {
            appLogger.error('ERR', err);
        });
    }

    var refresh = function() {
        subjectMarksRangeLogic.getAllSubjectMarksRanges($localStorage.organizationKey).then(function(response) {
            $scope.subjectMarksRangeCollection = response;
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


    /*Method for calling  deleting   SubjectMarksRange*/
    $scope.deleteSubjectMarksRange = function(subjectMarksRangeEntityKey) {

        SweetAlert.swal({
            title: "Are you sure?",
            text: "Your want to delete this subject marks range",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, cancel!",
            closeOnConfirm: false,
            closeOnCancel: false
        }, function(isConfirm) {
            if (isConfirm) {
                subjectMarksRangeLogic.deleteSubjectMarksRange(subjectMarksRangeEntityKey).then(function(response) {
                    $scope.entitySubjectMarksRange = {};
                    $scope.save = true;
                    $scope.update = false;
                    $scope.subjectMarksRangeForm.$setPristine();
                    $scope.subjectMarksRangeForm.$setUntouched();

                    SweetAlert.swal({
                        title: "Subject Marks Range",
                        text: "Deleted successfully",
                        type: "success",
                        confirmButtonColor: "#007AFF"
                    });
                    refresh();
                }, function(err) {
                    appLogger.error('ERR', err);
                });
            } else {
                SweetAlert.swal({
                    title: "Cancelled",
                    text: "Your subject marks range is safe :)",
                    type: "error",
                    confirmButtonColor: "#007AFF"
                });
            }
        });




    };

}); // End of App Controller