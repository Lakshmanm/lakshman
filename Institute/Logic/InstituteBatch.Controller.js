/*//=============================================================================
// All rights reserved to Thrill Innovative Labs.
// THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
// OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
// LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
// FITNESS FOR A PARTICULAR PURPOSE.
//=============================================================================
//*****************************************************************************
//* Name		    	: Subject.Controller.js 
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
var app = angular.module('ThrillInstitute.instituteBatch', ['ThrillAcademic.subjectLogic'

        , 'ThrillAcademic.termLogic'
        , 'ThrillInstitute.instituteSubjectLogic'
        , 'ThrillAcademic.electiveGroupLogic'
       , 'ThrillInstitute.instituteBatchLogic'
        , 'ngCordova'
         , 'ngStorage'
         , 'ThrillAcademic.academicYearLogic'
        , 'ThrillFrameworkLibrary.geo'

        , 'ThrillFrameworkLibrary.Network'

        , 'ThrillCnnWebClient.appConfig'

        , 'ThrillFrameworkLibrary.appLogger'

        , 'ThrillInstitute.instituteBoardLogic'

        , 'ThrillInstitute.instituteGroupLogic'

        , 'ThrillInstitute.instituteCoursLogic'

        , 'ThrillAcademic.termLogic'
    ])
    /*Setup subject Controller */
app.controller('instituteBatchController', function ($scope, academicYearLogic, instituteBatchLogic, instituteSubjectLogic, $http, instituteBoardLogic, instituteGroupLogic, instituteCoursLogic, subjectLogic, termLogic, electiveGroupLogic, $localStorage, SweetAlert, $state, $stateParams, appConfig, appLogger) {
    getLabels(appConfig.CULTURE_NAME);
    getMessages(appConfig.CULTURE_NAME);
    /*get labels with selected language*/
    function getLabels(cultureName) {
        var currentFileName = "Batch";
        $http.get("Institute/Languages/" + currentFileName + "." + cultureName + ".json").then(function (response) {
            bindLabels(response.data);
        });
    }

    function getMessages(cultureName) {
        var alertMessageName = "AlertMessages";
        $http.get("Institute/Languages/" + alertMessageName + "." + cultureName + ".json").then(function (response) {
            $scope.alertMessageLabels = response.data.messages;
        });
    }
    /*bind labels with selected language */
    function bindLabels(data) {
        $scope.labelsBatch = data.labels;
    };
    $scope.save = true;
    $scope.update = false;
    var entitykey = DrawCaptcha();
    var subjectEntityKey;
    /*function getAllBoards() {
        boardLogic.getAllBoards($localStorage.organizationKey).then(function(response) {
            $scope.boardList = response;
        })
    }
    getAllBoards();*/
    function getAllBoards() {
        instituteBoardLogic.getBoardByInstituteKey($localStorage.instituteKey).then(function (response) {
            $scope.boardList = response;
        })
    }
    getAllBoards();

    function getEducation() {
        instituteBatchLogic.getEducation().then(function (response) {
            $scope.educationList = response;
        })
    }
    getEducation();
    $scope.getBoardGroups = function (boardKey) {
        instituteGroupLogic.getGroupByInstituteBoardKey($localStorage.instituteKey, boardKey).then(function (response) {
            $scope.groupList = response;
        })
    }
    $scope.getCoursByGroupKey = function (groupKey) {
        instituteCoursLogic.getCourseByInstituteGroupKey(groupKey, $localStorage.instituteKey).then(function (response) {
            $scope.courseList = response;
        })
    }
    var getYear = function () {
        academicYearLogic.getAllYears($localStorage.organizationKey).then(function (response) {
            $scope.yearList = response;
        }, function (err) {
            appLogger.error('ERR', err);
        });
    }
    getYear();
    $scope.startHourList = [
        {
            "teachingDayStartTimeHours": "1"
            , "teachingDayStartTimeHoursKey": "1"
        }, {
            "teachingDayStartTimeHours": "2"
            , "teachingDayStartTimeHoursKey": "2"
        }, {
            "teachingDayStartTimeHours": "3"
            , "teachingDayStartTimeHoursKey": "3"
        }, {
            "teachingDayStartTimeHours": "4"
            , "teachingDayStartTimeHoursKey": "4"
        }, {
            "teachingDayStartTimeHours": "5"
            , "teachingDayStartTimeHoursKey": "5"
        }, {
            "teachingDayStartTimeHours": "6"
            , "teachingDayStartTimeHoursKey": "6"
        }, {
            "teachingDayStartTimeHours": "7"
            , "teachingDayStartTimeHoursKey": "7"
        }, {
            "teachingDayStartTimeHours": "8"
            , "teachingDayStartTimeHoursKey": "8"
        }, {
            "teachingDayStartTimeHours": "9"
            , "teachingDayStartTimeHoursKey": "9"
        }, {
            "teachingDayStartTimeHours": "10"
            , "teachingDayStartTimeHoursKey": "10"
        }, {
            "teachingDayStartTimeHours": "11"
            , "teachingDayStartTimeHoursKey": "11"
        }, {
            "teachingDayStartTimeHours": "12"
            , "teachingDayStartTimeHoursKey": "12"
        }, {
            "teachingDayStartTimeHours": "13"
            , "teachingDayStartTimeHoursKey": "13"
        }, {
            "teachingDayStartTimeHours": "14"
            , "teachingDayStartTimeHoursKey": "14"
        }
        , {
            "teachingDayStartTimeHours": "15"
            , "teachingDayStartTimeHoursKey": "15"
        }, {
            "teachingDayStartTimeHours": "16"
            , "teachingDayStartTimeHoursKey": "16"
        }, {
            "teachingDayStartTimeHours": "17"
            , "teachingDayStartTimeHoursKey": "17"
        }, {
            "teachingDayStartTimeHours": "18"
            , "teachingDayStartTimeHoursKey": "18"
        }, {
            "teachingDayStartTimeHours": "19"
            , "teachingDayStartTimeHoursKey": "19"
        }, {
            "teachingDayStartTimeHours": "20"
            , "teachingDayStartTimeHoursKey": "20"
        }, {
            "teachingDayStartTimeHours": "21"
            , "teachingDayStartTimeHoursKey": "21"
        }, {
            "teachingDayStartTimeHours": "22"
            , "teachingDayStartTimeHoursKey": "22"
        }, {
            "teachingDayStartTimeHours": "23"
            , "teachingDayStartTimeHoursKey": "23"
        }, {
            "teachingDayStartTimeHours": "24"
            , "teachingDayStartTimeHoursKey": "24"
        }];
    $scope.startMinList = [
        {
            "teachingDayStartTimeMins": "00"
            , "teachingDayStartTimeMinsKey": "0"
        }
        , {
            "teachingDayStartTimeMins": "01"
            , "teachingDayStartTimeMinsKey": "1"
        }, {
            "teachingDayStartTimeMins": "02"
            , "teachingDayStartTimeMinsKey": "2"
        }, {
            "teachingDayStartTimeMins": "03"
            , "teachingDayStartTimeMinsKey": "3"
        }, {
            "teachingDayStartTimeMins": "04"
            , "teachingDayStartTimeMinsKey": "4"
        }, {
            "teachingDayStartTimeMins": "05"
            , "teachingDayStartTimeMinsKey": "5"
        }, {
            "teachingDayStartTimeMins": "06"
            , "teachingDayStartTimeMinsKey": "6"
        }, {
            "teachingDayStartTimeMins": "07"
            , "teachingDayStartTimeMinsKey": "7"
        }, {
            "teachingDayStartTimeMins": "08"
            , "teachingDayStartTimeMinsKey": "8"
        }, {
            "teachingDayStartTimeMins": "09"
            , "teachingDayStartTimeMinsKey": "9"
        }, {
            "teachingDayStartTimeMins": "10"
            , "teachingDayStartTimeMinsKey": "10"
        }, {
            "teachingDayStartTimeMins": "11"
            , "teachingDayStartTimeMinsKey": "11"
        }, {
            "teachingDayStartTimeMins": "12"
            , "teachingDayStartTimeMinsKey": "12"
        }, {
            "teachingDayStartTimeMins": "13"
            , "teachingDayStartTimeMinsKey": "13"
        }, {
            "teachingDayStartTimeMins": "14"
            , "teachingDayStartTimeMinsKey": "14"
        }
        , {
            "teachingDayStartTimeMins": "15"
            , "teachingDayStartTimeMinsKey": "15"
        }, {
            "teachingDayStartTimeMins": "16"
            , "teachingDayStartTimeMinsKey": "16"
        }, {
            "teachingDayStartTimeMins": "17"
            , "teachingDayStartTimeMinsKey": "17"
        }, {
            "teachingDayStartTimeMins": "18"
            , "teachingDayStartTimeMinsKey": "18"
        }, {
            "teachingDayStartTimeMins": "19"
            , "teachingDayStartTimeMinsKey": "19"
        }, {
            "teachingDayStartTimeMins": "20"
            , "teachingDayStartTimeMinsKey": "20"
        }, {
            "teachingDayStartTimeMins": "21"
            , "teachingDayStartTimeMinsKey": "21"
        }, {
            "teachingDayStartTimeMins": "22"
            , "teachingDayStartTimeMinsKey": "22"
        }, {
            "teachingDayStartTimeMins": "23"
            , "teachingDayStartTimeMinsKey": "23"
        }, {
            "teachingDayStartTimeMins": "24"
            , "teachingDayStartTimeMinsKey": "24"
        }, {
            "teachingDayStartTimeMins": "25"
            , "teachingDayStartTimeMinsKey": "25"
        }, {
            "teachingDayStartTimeMins": "26"
            , "teachingDayStartTimeMinsKey": "26"
        }, {
            "teachingDayStartTimeMins": "27"
            , "teachingDayStartTimeMinsKey": "27"
        }, {
            "teachingDayStartTimeMins": "28"
            , "teachingDayStartTimeMinsKey": "28"
        }, {
            "teachingDayStartTimeMins": "29"
            , "teachingDayStartTimeMinsKey": "29"
        }, {
            "teachingDayStartTimeMins": "30"
            , "teachingDayStartTimeMinsKey": "30"
        }, {
            "teachingDayStartTimeMins": "31"
            , "teachingDayStartTimeMinsKey": "31"
        }, {
            "teachingDayStartTimeMins": "32"
            , "teachingDayStartTimeMinsKey": "33"
        }, {
            "teachingDayStartTimeMins": "34"
            , "teachingDayStartTimeMinsKey": "34"
        }, {
            "teachingDayStartTimeMins": "35"
            , "teachingDayStartTimeMinsKey": "35"
        }, {
            "teachingDayStartTimeMins": "36"
            , "teachingDayStartTimeMinsKey": "36"
        }, {
            "teachingDayStartTimeMins": "37"
            , "teachingDayStartTimeMinsKey": "37"
        }, {
            "teachingDayStartTimeMins": "38"
            , "teachingDayStartTimeMinsKey": "38"
        }, {
            "teachingDayStartTimeMins": "39"
            , "teachingDayStartTimeMinsKey": "39"
        }, {
            "teachingDayStartTimeMins": "40"
            , "teachingDayStartTimeMinsKey": "40"
        }, {
            "teachingDayStartTimeMins": "41"
            , "teachingDayStartTimeMinsKey": "41"
        }, {
            "teachingDayStartTimeMins": "42"
            , "teachingDayStartTimeMinsKey": "42"
        }, {
            "teachingDayStartTimeMins": "43"
            , "teachingDayStartTimeMinsKey": "43"
        }, {
            "teachingDayStartTimeMins": "44"
            , "teachingDayStartTimeMinsKey": "44"
        }, {
            "teachingDayStartTimeMins": "45"
            , "teachingDayStartTimeMinsKey": "45"
        }, {
            "teachingDayStartTimeMins": "46"
            , "teachingDayStartTimeMinsKey": "46"
        }, {
            "teachingDayStartTimeMins": "47"
            , "teachingDayStartTimeMinsKey": "47"
        }, {
            "teachingDayStartTimeMins": "3"
            , "teachingDayStartTimeMinsKey": "48"
        }, {
            "teachingDayStartTimeMins": "49"
            , "teachingDayStartTimeMinsKey": "49"
        }, {
            "teachingDayStartTimeMins": "50"
            , "teachingDayStartTimeMinsKey": "50"
        }, {
            "teachingDayStartTimeMins": "51"
            , "teachingDayStartTimeMinsKey": "51"
        }, {
            "teachingDayStartTimeMins": "52"
            , "teachingDayStartTimeMinsKey": "52"
        }, {
            "teachingDayStartTimeMins": "53"
            , "teachingDayStartTimeMinsKey": "53"
        }, {
            "teachingDayStartTimeMins": "54"
            , "teachingDayStartTimeMinsKey": "54"
        }, {
            "teachingDayStartTimeMins": "55"
            , "teachingDayStartTimeMinsKey": "55"
        }, {
            "teachingDayStartTimeMins": "56"
            , "teachingDayStartTimeMinsKey": "56"
        }, {
            "teachingDayStartTimeMins": "57"
            , "teachingDayStartTimeMinsKey": "57"
        }, {
            "teachingDayStartTimeMins": "58"
            , "teachingDayStartTimeMinsKey": "58"
        }, {
            "teachingDayStartTimeMins": "59"
            , "teachingDayStartTimeMinsKey": "59"
        }, {
            "teachingDayStartTimeMins": "60"
            , "teachingDayStartTimeMinsKey": "60"
        }];
    $scope.endHourList = [{
            "teachingDayEndTimeHours": "1"
            , "teachingDayEndTimeHoursKey": "1"
        }, {
            "teachingDayEndTimeHours": "2"
            , "teachingDayEndTimeHoursKey": "2"
        }, {
            "teachingDayEndTimeHours": "3"
            , "teachingDayEndTimeHoursKey": "3"
        }, {
            "teachingDayEndTimeHours": "4"
            , "teachingDayEndTimeHoursKey": "4"
        }, {
            "teachingDayEndTimeHours": "5"
            , "teachingDayEndTimeHoursKey": "5"
        }, {
            "teachingDayEndTimeHours": "6"
            , "teachingDayEndTimeHoursKey": "6"
        }, {
            "teachingDayEndTimeHours": "7"
            , "teachingDayEndTimeHoursKey": "7"
        }, {
            "teachingDayEndTimeHours": "8"
            , "teachingDayEndTimeHoursKey": "8"
        }, {
            "teachingDayEndTimeHours": "9"
            , "teachingDayEndTimeHoursKey": "9"
        }, {
            "teachingDayEndTimeHours": "10"
            , "teachingDayEndTimeHoursKey": "10"
        }, {
            "teachingDayEndTimeHours": "11"
            , "teachingDayEndTimeHoursKey": "11"
        }, {
            "teachingDayEndTimeHours": "12"
            , "teachingDayEndTimeHoursKey": "12"
        }, {
            "teachingDayEndTimeHours": "13"
            , "teachingDayEndTimeHoursKey": "13"
        }, {
            "teachingDayEndTimeHours": "14"
            , "teachingDayEndTimeHoursKey": "14"
        }
        , {
            "teachingDayEndTimeHours": "15"
            , "teachingDayEndTimeHoursKey": "15"
        }, {
            "teachingDayEndTimeHours": "16"
            , "teachingDayEndTimeHoursKey": "16"
        }, {
            "teachingDayEndTimeHours": "17"
            , "teachingDayEndTimeHoursKey": "17"
        }, {
            "teachingDayEndTimeHours": "18"
            , "teachingDayEndTimeHoursKey": "18"
        }, {
            "teachingDayEndTimeHours": "19"
            , "teachingDayEndTimeHoursKey": "19"
        }, {
            "teachingDayEndTimeHours": "20"
            , "teachingDayEndTimeHoursKey": "20"
        }, {
            "teachingDayEndTimeHours": "21"
            , "teachingDayEndTimeHoursKey": "21"
        }, {
            "teachingDayEndTimeHours": "22"
            , "teachingDayEndTimeHoursKey": "22"
        }, {
            "teachingDayEndTimeHours": "23"
            , "teachingDayEndTimeHoursKey": "23"
        }, {
            "teachingDayEndTimeHours": "24"
            , "teachingDayEndTimeHoursKey": "24"
        }];
    $scope.endMinList = [
        {
            "teachingDayEndTimeMins": "00"
            , "teachingDayEndTimeMinsKey": "0"
        }
        , {
            "teachingDayEndTimeMins": "01"
            , "teachingDayEndTimeMinsKey": "1"
        }, {
            "teachingDayEndTimeMins": "02"
            , "teachingDayEndTimeMinsKey": "2"
        }, {
            "teachingDayEndTimeMins": "03"
            , "teachingDayEndTimeMinsKey": "3"
        }, {
            "teachingDayEndTimeMins": "04"
            , "teachingDayEndTimeMinsKey": "4"
        }, {
            "teachingDayEndTimeMins": "05"
            , "teachingDayEndTimeMinsKey": "5"
        }, {
            "teachingDayEndTimeMins": "06"
            , "teachingDayEndTimeMinsKey": "6"
        }, {
            "teachingDayEndTimeMins": "07"
            , "teachingDayEndTimeMinsKey": "7"
        }, {
            "teachingDayEndTimeMins": "08"
            , "teachingDayEndTimeMinsKey": "8"
        }, {
            "teachingDayEndTimeMins": "09"
            , "teachingDayEndTimeMinsKey": "9"
        }, {
            "teachingDayEndTimeMins": "10"
            , "teachingDayEndTimeMinsKey": "10"
        }, {
            "teachingDayEndTimeMins": "11"
            , "teachingDayEndTimeMinsKey": "11"
        }, {
            "teachingDayEndTimeMins": "12"
            , "teachingDayEndTimeMinsKey": "12"
        }, {
            "teachingDayEndTimeMins": "13"
            , "teachingDayEndTimeMinsKey": "13"
        }, {
            "teachingDayEndTimeMins": "14"
            , "teachingDayEndTimeMinsKey": "14"
        }
        , {
            "teachingDayEndTimeMins": "15"
            , "teachingDayEndTimeMinsKey": "15"
        }, {
            "teachingDayEndTimeMins": "16"
            , "teachingDayEndTimeMinsKey": "16"
        }, {
            "teachingDayEndTimeMins": "17"
            , "teachingDayEndTimeMinsKey": "17"
        }, {
            "teachingDayEndTimeMins": "18"
            , "teachingDayEndTimeMinsKey": "18"
        }, {
            "teachingDayEndTimeMins": "19"
            , "teachingDayEndTimeMinsKey": "19"
        }, {
            "teachingDayEndTimeMins": "20"
            , "teachingDayEndTimeMinsKey": "20"
        }, {
            "teachingDayEndTimeMins": "21"
            , "teachingDayEndTimeMinsKey": "21"
        }, {
            "teachingDayEndTimeMins": "22"
            , "teachingDayEndTimeMinsKey": "22"
        }, {
            "teachingDayEndTimeMins": "23"
            , "teachingDayEndTimeMinsKey": "23"
        }, {
            "teachingDayEndTimeMins": "24"
            , "teachingDayEndTimeMinsKey": "24"
        }, {
            "teachingDayEndTimeMins": "25"
            , "teachingDayEndTimeMinsKey": "25"
        }, {
            "teachingDayEndTimeMins": "26"
            , "teachingDayEndTimeMinsKey": "26"
        }, {
            "teachingDayEndTimeMins": "27"
            , "teachingDayEndTimeMinsKey": "27"
        }, {
            "teachingDayEndTimeMins": "28"
            , "teachingDayEndTimeMinsKey": "28"
        }, {
            "teachingDayEndTimeMins": "29"
            , "teachingDayEndTimeMinsKey": "29"
        }, {
            "teachingDayEndTimeMins": "30"
            , "teachingDayEndTimeMinsKey": "30"
        }, {
            "teachingDayEndTimeMins": "31"
            , "teachingDayEndTimeMinsKey": "31"
        }, {
            "teachingDayEndTimeMins": "32"
            , "teachingDayEndTimeMinsKey": "33"
        }, {
            "teachingDayEndTimeMins": "34"
            , "teachingDayEndTimeMinsKey": "34"
        }, {
            "teachingDayEndTimeMins": "35"
            , "teachingDayEndTimeMinsKey": "35"
        }, {
            "teachingDayEndTimeMins": "36"
            , "teachingDayEndTimeMinsKey": "36"
        }, {
            "teachingDayEndTimeMins": "37"
            , "teachingDayEndTimeMinsKey": "37"
        }, {
            "teachingDayEndTimeMins": "38"
            , "teachingDayEndTimeMinsKey": "38"
        }, {
            "teachingDayEndTimeMins": "39"
            , "teachingDayEndTimeMinsKey": "39"
        }, {
            "teachingDayEndTimeMins": "40"
            , "teachingDayEndTimeMinsKey": "40"
        }, {
            "teachingDayEndTimeMins": "41"
            , "teachingDayEndTimeMinsKey": "41"
        }, {
            "teachingDayEndTimeMins": "42"
            , "teachingDayEndTimeMinsKey": "42"
        }, {
            "teachingDayEndTimeMins": "43"
            , "teachingDayEndTimeMinsKey": "43"
        }, {
            "teachingDayEndTimeMins": "44"
            , "teachingDayEndTimeMinsKey": "44"
        }, {
            "teachingDayEndTimeMins": "45"
            , "teachingDayEndTimeMinsKey": "45"
        }, {
            "teachingDayEndTimeMins": "46"
            , "teachingDayEndTimeMinsKey": "46"
        }, {
            "teachingDayEndTimeMins": "47"
            , "teachingDayEndTimeMinsKey": "47"
        }, {
            "teachingDayEndTimeMins": "3"
            , "teachingDayEndTimeMinsKey": "48"
        }, {
            "teachingDayEndTimeMins": "49"
            , "teachingDayEndTimeMinsKey": "49"
        }, {
            "teachingDayEndTimeMins": "50"
            , "teachingDayEndTimeMinsKey": "50"
        }, {
            "teachingDayEndTimeMins": "51"
            , "teachingDayEndTimeMinsKey": "51"
        }, {
            "teachingDayEndTimeMins": "52"
            , "teachingDayEndTimeMinsKey": "52"
        }, {
            "teachingDayEndTimeMins": "53"
            , "teachingDayEndTimeMinsKey": "53"
        }, {
            "teachingDayEndTimeMins": "54"
            , "teachingDayEndTimeMinsKey": "54"
        }, {
            "teachingDayEndTimeMins": "55"
            , "teachingDayEndTimeMinsKey": "55"
        }, {
            "teachingDayEndTimeMins": "56"
            , "teachingDayEndTimeMinsKey": "56"
        }, {
            "teachingDayEndTimeMins": "57"
            , "teachingDayEndTimeMinsKey": "57"
        }, {
            "teachingDayEndTimeMins": "58"
            , "teachingDayEndTimeMinsKey": "58"
        }, {
            "teachingDayEndTimeMins": "59"
            , "teachingDayEndTimeMinsKey": "59"
        }, {
            "teachingDayEndTimeMins": "60"
            , "teachingDayEndTimeMinsKey": "60"
        }];
    $scope.addBatch = function () {
        if (appConfig.APP_MODE == 'offline') {
            $scope.entityBatch.subjectKey = entitykey;
        }
        $scope.entityBatch.createdAppKey = "3il_App_Key";
        $scope.entityBatch.createdUserKey = "3il_User_Key";
        $scope.entityBatch.instituteKey = $stateParams.instituteKey;
        $scope.entityBatch.workingOnSunday = ($scope.entityBatch.workingOnSunday == true ? 1 : 0);
        $scope.entityBatch.workingOnMonday = ($scope.entityBatch.workingOnMonday == true ? 1 : 0);
        $scope.entityBatch.workingOnTuesday = ($scope.entityBatch.workingOnTuesday == true ? 1 : 0);
        $scope.entityBatch.workingOnWednesday = ($scope.entityBatch.workingOnWednesday == true ? 1 : 0);
        $scope.entityBatch.workingOnThursday = ($scope.entityBatch.workingOnThursday == true ? 1 : 0);
        $scope.entityBatch.workingOnFriday = ($scope.entityBatch.workingOnFriday == true ? 1 : 0);
        $scope.entityBatch.workingOnSaturday = ($scope.entityBatch.workingOnSaturday == true ? 1 : 0);
        instituteBatchLogic.addBatch($scope.entityBatch).then(function (response) {
            $scope.entityBatch = {};
            $scope.batchForm.$setPristine();
            $scope.batchForm.$setUntouched();
            $scope.save = true;
            $scope.update = false;
            SweetAlert.swal({
                title: "Batch"
                , text: "Saved successfully"
                , type: "success"
                , confirmButtonColor: "#007AFF"
            });
            refresh();
        }, function (err) {
            appLogger.error('ERR', err);
        });
    };



    if($localStorage.RoleID==2)
    {
        $scope.details=true;
        $scope.savebtn=false;
    }
    else{
          $scope.details=false;
         $scope.savebtn=true;
           
    }
    var refresh = function () {
        instituteBatchLogic.getBatch($stateParams.instituteKey).then(function (response) {
            $scope.batchCollection = response;
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
    $scope.editBatch = function (batchKey) {
        $scope.save = false;
        $scope.update = true;
        instituteBatchLogic.getBatchByBatchKey(batchKey).then(function (response) {
            console.log(response);
            $scope.entityBatch = {};
            //   $scope.entityBatch.boardTitle = response[0].BoardTitle;
            $scope.entityBatch.InstituteBoardKey = response[0].InstituteBoardKey;
            $scope.getBoardGroups($scope.entityBatch.InstituteBoardKey);
            //  $scope.entityBatch.groupTitle = response[0].GroupTitle;
            $scope.entityBatch.InstituteGroupKey = response[0].InstituteGroupKey;
            $scope.getCoursByGroupKey($scope.entityBatch.InstituteGroupKey);
            //   $scope.entityBatch.courseTitle = response[0].CourseTitle;
            $scope.entityBatch.InstituteCourseKey = response[0].InstituteCourseKey;
            //	 $scope.entityBatch.academicYearName = response[0].AcademicYearName;
            $scope.entityBatch.academicYearKey = response[0].AcademicYearKey;
            $scope.entityBatch.startDate = new Date(response[0].StartDate);
            $scope.entityBatch.endDate = new Date(response[0].EndDate);
            $scope.entityBatch.noOfSeats = response[0].NoOfSeats;
            //   $scope.entityBatch.educationTypeName=response[0].EducationTypeName;
            $scope.entityBatch.educationTypeKey = response[0].EducationTypeKey;
            $scope.entityBatch.batchName = response[0].BatchName;
            $scope.entityBatch.instituteBatchKey = response[0].InstituteBatchKey;
            $scope.entityBatch.teachingDayStartTimeHours = response[0].TeachingDayStartTimeHours;
            //   $scope.entityBatch.teachingDayStartTimeHoursKey=response[0].TeachingDayStartTimeHours;
            $scope.entityBatch.teachingDayStartTimeMins = response[0].TeachingDayStartTimeMins;
            //    $scope.entityBatch.teachingDayStartTimeMinsKey=response[0].TeachingDayStartTimeMins;
            $scope.entityBatch.teachingDayEndTimeHours = response[0].TeachingDayEndTimeHours;
            //     $scope.entityBatch.teachingDayEndTimeHoursKey = response[0].TeachingDayEndTimeHours;
            $scope.entityBatch.teachingDayEndTimeMins = response[0].TeachingDayEndTimeMins;
            //   		 $scope.entityBatch.teachingDayEndTimeMinsKey = response[0].TeachingDayEndTimeMins;
            if (response[0].WorkingOnSunday.data[0] == 0 || response[0].WorkingOnSunday.data[0] == null) {
                $scope.entityBatch.workingOnSunday = false;
            }
            else {
                $scope.entityBatch.workingOnSunday = true;
            }
            if (response[0].WorkingOnMonday.data[0] == 0 || response[0].WorkingOnMonday.data[0] == null) {
                $scope.entityBatch.workingOnMonday = false;
            }
            else {
                $scope.entityBatch.workingOnMonday = true;
            }
            if (response[0].WorkingOnTuesday.data[0] == 0 || response[0].WorkingOnTuesday.data[0] == null) {
                $scope.entityBatch.workingOnTuesday = false;
            }
            else {
                $scope.entityBatch.workingOnTuesday = true;
            }
            if (response[0].WorkingOnThursday.data[0] == 0 || response[0].WorkingOnThursday.data[0] == null) {
                $scope.entityBatch.workingOnThursday = false;
            }
            else {
                $scope.entityBatch.workingOnThursday = true;
            }
            if (response[0].WorkingOnWednesday.data[0] == 0 || response[0].WorkingOnWednesday.data[0] == null) {
                $scope.entityBatch.workingOnWednesday = false;
            }
            else {
                $scope.entityBatch.workingOnWednesday = true;
            }
            if (response[0].WorkingOnFriday.data[0] == 0 || response[0].WorkingOnFriday.data[0] == null) {
                $scope.entityBatch.workingOnFriday = false;
            }
            else {
                $scope.entityBatch.workingOnFriday = true;
            }
            if (response[0].WorkingOnSaturday.data[0] == 0 || response[0].WorkingOnSaturday.data[0] == null) {
                $scope.entityBatch.workingOnSaturday = false;
            }
            else {
                $scope.entityBatch.workingOnSaturday = true;
            }
        }, function (err) {
            appLogger.error('ERR', err);
        });
    }
    $scope.updateBatch = function () {
        $scope.entityBatch.instituteKey = $stateParams.instituteKey;
        instituteBatchLogic.updateBatch($scope.entityBatch, $scope.entityBatch.instituteBatchKey).then(function (response) {
            $scope.entityBatch = {};
            refresh();
            $scope.save = true;
            $scope.update = false;
            $scope.batchForm.$setPristine();
            $scope.batchForm.$setUntouched();
            SweetAlert.swal({
                title: "Batch"
                , text: "Updated successfully"
                , type: "success"
                , confirmButtonColor: "#007AFF"
            });
            //appLogger.alert($scope.alertMessageLabels.boardUpdated);
        }, function (err) {
            appLogger.error('ERR', err);
        });
    };
}); // End of App Controller