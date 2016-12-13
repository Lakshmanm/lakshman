/*//=============================================================================
// All rights reserved to Thrill Innovative Labs.
// THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
// OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
// LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
// FITNESS FOR A PARTICULAR PURPOSE.
//=============================================================================
//*****************************************************************************
//* Name		    	: Group.Controller.js 
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

var app = angular.module('ThrillDailyRoutine.newDailyRoutine', ['ThrillAcademic.groupLogic', 'ngCordova', 'ngStorage', 'ThrillFrameworkLibrary.geo', 'ThrillFrameworkLibrary.Network', 'ThrillCnnWebClient.appConfig', 'ThrillFrameworkLibrary.appLogger', 'ThrillInstitute.instituteBoardLogic', 'ThrillInstitute.instituteGroupLogic', 'ThrillAcademic.coursLogic', 'ThrillInstitute.instituteCoursLogic', 'ThrillInstitute.instituteLogic', 'ThrillAcademic.academicYearLogic', 'ThrillDailyRoutine.daily'])
    /*Setup group Controller */
app.controller('newDailyRoutineController', function($scope, dailyRoutineLogic, instituteLogic, instituteCoursLogic, academicYearLogic, $http, instituteGroupLogic, $state, $stateParams, $localStorage, instituteBoardLogic, SweetAlert, appConfig, appLogger) {

    $scope.test = false;
    getLabels(appConfig.CULTURE_NAME);
    getMessages(appConfig.CULTURE_NAME);


    /*get labels with selected language*/
    function getLabels(cultureName) {
        var currentFileName = "NewDaily";
        $http.get("DailyRoutine/Languages/" + currentFileName + "." + cultureName + ".json").then(function(response) {
            bindLabels(response.data);

        });
    }

    function getMessages(cultureName) {
        var alertMessageName = "AlertMessages";

        $http.get("DailyRoutine/Languages/" + alertMessageName + "." + cultureName + ".json").then(function(response) {
            $scope.alertMessageLabels = response.data.messages;
        });
    }

    /*bind labels with selected language */
    function bindLabels(data) {


        $scope.labelsDaily = data.labels;

    };
    $scope.save = true;
    $scope.update = false;



    var arrayTable = [];
    var key;
    var selectedInstituteKey;


    $scope.getTableData = function(courseKey) {

        dailyRoutineLogic.getPeriodSlot(courseKey).then(function(response) {


            $scope.test = true;
            for (var i = 0; i < response.length; i++) {
                if (response[i].periodBreakKey.data[0] == 1) {
                    key = true
                } else {
                    key = false
                }
                var object = {

                    PeriodSlotName: response[i].PeriodSlotName,
                    periodslotKey: response[i].periodslotKey,
                    courseKey: response[i].courseKey,
                    IsBreak: key,
                    startTimeHours: response[i].startTimeHours.toString(),
                    startTimeMins: response[i].startTimeMins.toString(),
                    endTimeHours: response[i].endTimeHours.toString(),
                    endTimeMins: response[i].endTimeMins.toString(),

                }
                arrayTable.push(object);



            }

            // alert(JSON.stringify(arrayTable));
            $scope.dailyList = arrayTable;


            arrayTable = [];

            if (response.length == undefined) {
                $scope.test = false;
                $scope.dailyList = [];

                $scope.message = "No Data Availabale";
            }



        }, function(err) {
            appLogger.error('ERR', err);
        });

    }


    $scope.removeg = function(entityDaily, index) {

        /*        var del = confirm("Do you want to Delete Period Slot ?");
                if (del == true) {


                    if (entityDaily[index].periodslotKey == undefined) {

                        entityDaily.splice(index, 1);
                        $scope.dailyList = entityDaily;
                        SweetAlert.swal({
                            title: "Period Slot",
                            text: "Removed successfully",
                            type: "success",
                            confirmButtonColor: "#007AFF"
                        });
                    } else {

                        dailyRoutineLogic.deletePeriodSlot(entityDaily[index].periodslotKey).then(function(response) {
                            SweetAlert.swal({
                                title: "Period Slot",
                                text: "Removed successfully",
                                type: "success",
                                confirmButtonColor: "#007AFF"
                            });
                            $scope.getTableData(entityDaily[index].courseKey);

                        }, function(err) {
                            appLogger.error('ERR', err);
                        });

                    }

                }*/


        SweetAlert.swal({
            title: "Are you sure?",
            text: "Do you want to Delete Period Slot ",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, Delete it!",
            cancelButtonText: "No, cancel!",
            closeOnConfirm: false,
            closeOnCancel: false
        }, function(isConfirm) {
            if (isConfirm) {

                if (entityDaily[index].periodslotKey == undefined) {

                    entityDaily.splice(index, 1);
                    $scope.dailyList = entityDaily;
                    SweetAlert.swal({
                        title: "Period Slot",
                        text: "Removed successfully",
                        type: "success",
                        confirmButtonColor: "#007AFF"
                    });
                } else {

                    dailyRoutineLogic.deletePeriodSlot(entityDaily[index].periodslotKey).then(function(response) {
                        SweetAlert.swal({
                            title: "Period Slot",
                            text: "Removed successfully",
                            type: "success",
                            confirmButtonColor: "#007AFF"
                        });
                        $scope.getTableData(entityDaily[index].courseKey);

                    }, function(err) {
                        appLogger.error('ERR', err);
                    });

                }
            } else {
                SweetAlert.swal({
                    title: "Cancelled",
                    text: "Your period slot  is safe :)",
                    type: "error",
                    confirmButtonColor: "#007AFF"
                });
            }
        });


    }


    $scope.getBoard = function(instituteKey) {
        selectedInstituteKey = instituteKey;
        instituteBoardLogic.getBoardByInstituteKey(instituteKey).then(function(response) {
            $scope.boardList = response;
        })
    }




    $scope.getBoardGroups = function(instituteBoardKey) {
        instituteGroupLogic.getGroupByInstituteBoardKey(selectedInstituteKey, instituteBoardKey).then(function(response) {
            $scope.groupList = response;
        })
    }

    $scope.getCoursByGroupKey = function(groupKey) {
        instituteCoursLogic.getCourseByInstituteGroupKey(groupKey, selectedInstituteKey).then(function(response) {
            $scope.courseList = response;
        })
    }

    $scope.getInstitute = function() {
        instituteLogic.getAllInstitutes($localStorage.organizationKey).then(function(response) {
            $scope.instituteList = response;
        })
    }
    $scope.getInstitute();
    var getYear = function() {

        academicYearLogic.getAllYears($localStorage.organizationKey).then(function(response) {
            $scope.yearList = response;


        }, function(err) {
            appLogger.error('ERR', err);
        });
    }
    getYear();

    var removeList = [];
    $scope.dailyList = [];
    var DailyID = 0;
    $scope.addNewPeriod = function() {
        $scope.test = false;
        DailyID = DailyID + 1;
        if (DailyID >= 1) {
            $scope.test = true;
        }


        $scope.dailyList.push({
            'DailyID': DailyID,

            'PeriodSlotName': "",
            'startTimeHours': "",
            'startTimeMins': "",
            'endTimeHours': "",
            'endTimeMins': "",
            'remove': ""

        });
    };


    if($localStorage.TimeFormatTitle=="12 Hours")
        
        {
         $scope.startHourList = [{
        "startTimeHours": "00",
        "startTimeHoursKey": "00"
    }, {
        "startTimeHours": "1",
        "startTimeHoursKey": "1"
    }, {
        "startTimeHours": "2",
        "startTimeHoursKey": "2"
    }, {
        "startTimeHours": "3",
        "startTimeHoursKey": "3"
    }, {
        "startTimeHours": "4",
        "startTimeHoursKey": "4"
    }, {
        "startTimeHours": "5",
        "startTimeHoursKey": "5"
    }, {
        "startTimeHours": "6",
        "startTimeHoursKey": "6"
    }, {
        "startTimeHours": "7",
        "startTimeHoursKey": "7"
    }, {
        "startTimeHours": "8",
        "startTimeHoursKey": "8"
    }, {
        "startTimeHours": "9",
        "startTimeHoursKey": "9"
    }, {
        "startTimeHours": "10",
        "startTimeHoursKey": "10"
    }, {
        "startTimeHours": "11",
        "startTimeHoursKey": "11"
    }, {
        "startTimeHours": "12",
        "startTimeHoursKey": "12"
    }];
            
     $scope.endHourList = [{
        "endTimeHours": "00",
        "endTimeHoursKey": "00"
    }, {
        "endTimeHours": "1",
        "endTimeHoursKey": "1"
    }, {
        "endTimeHours": "2",
        "endTimeHoursKey": "2"
    }, {
        "endTimeHoursHours": "3",
        "endTimeHoursKey": "3"
    }, {
        "endTimeHours": "4",
        "endTimeHoursKey": "4"
    }, {
        "endTimeHours": "5",
        "endTimeHoursKey": "5"
    }, {
        "endTimeHours": "6",
        "endTimeHoursKey": "6"
    }, {
        "endTimeHours": "7",
        "endTimeHoursKey": "7"
    }, {
        "endTimeHours": "8",
        "endTimeHoursKey": "8"
    }, {
        "endTimeHours": "9",
        "endTimeHoursKey": "9"
    }, {
        "endTimeHours": "10",
        "endTimeHoursKey": "10"
    }, {
        "endTimeHours": "11",
        "endTimeHoursKey": "11"
    }, {
        "endTimeHours": "12",
        "endTimeHoursKey": "12"
    }];
            
            
        }
    else
            {


    $scope.startHourList = [{
        "startTimeHours": "00",
        "startTimeHoursKey": "00"
    }, {
        "startTimeHours": "1",
        "startTimeHoursKey": "1"
    }, {
        "startTimeHours": "2",
        "startTimeHoursKey": "2"
    }, {
        "startTimeHours": "3",
        "startTimeHoursKey": "3"
    }, {
        "startTimeHours": "4",
        "startTimeHoursKey": "4"
    }, {
        "startTimeHours": "5",
        "startTimeHoursKey": "5"
    }, {
        "startTimeHours": "6",
        "startTimeHoursKey": "6"
    }, {
        "startTimeHours": "7",
        "startTimeHoursKey": "7"
    }, {
        "startTimeHours": "8",
        "startTimeHoursKey": "8"
    }, {
        "startTimeHours": "9",
        "startTimeHoursKey": "9"
    }, {
        "startTimeHours": "10",
        "startTimeHoursKey": "10"
    }, {
        "startTimeHours": "11",
        "startTimeHoursKey": "11"
    }, {
        "startTimeHours": "12",
        "startTimeHoursKey": "12"
    }, {
        "startTimeHours": "13",
        "startTimeHoursKey": "13"
    }, {
        "startTimeHours": "14",
        "startTimeHoursKey": "14"
    }, {
        "startTimeHours": "15",
        "startTimeHoursKey": "15"
    }, {
        "startTimeHours": "16",
        "startTimeHoursKey": "16"
    }, {
        "startTimeHours": "17",
        "startTimeHoursKey": "17"
    }, {
        "startTimeHours": "18",
        "startTimeHoursKey": "18"
    }, {
        "startTimeHours": "19",
        "startTimeHoursKey": "19"
    }, {
        "startTimeHours": "20",
        "startTimeHoursKey": "20"
    }, {
        "startTimeHours": "21",
        "startTimeHoursKey": "21"
    }, {
        "startTimeHours": "22",
        "startTimeHoursKey": "22"
    }, {
        "startTimeHours": "23",
        "startTimeHoursKey": "23"
    }];
                
                 $scope.endHourList = [{
        "endTimeHours": "00",
        "endTimeHoursKey": "00"
    }, {
        "endTimeHours": "1",
        "endTimeHoursKey": "1"
    }, {
        "endTimeHours": "2",
        "endTimeHoursKey": "2"
    }, {
        "endTimeHoursHours": "3",
        "endTimeHoursKey": "3"
    }, {
        "endTimeHours": "4",
        "endTimeHoursKey": "4"
    }, {
        "endTimeHours": "5",
        "endTimeHoursKey": "5"
    }, {
        "endTimeHours": "6",
        "endTimeHoursKey": "6"
    }, {
        "endTimeHours": "7",
        "endTimeHoursKey": "7"
    }, {
        "endTimeHours": "8",
        "endTimeHoursKey": "8"
    }, {
        "endTimeHours": "9",
        "endTimeHoursKey": "9"
    }, {
        "endTimeHours": "10",
        "endTimeHoursKey": "10"
    }, {
        "endTimeHours": "11",
        "endTimeHoursKey": "11"
    }, {
        "endTimeHours": "12",
        "endTimeHoursKey": "12"
    }, {
        "endTimeHours": "13",
        "endTimeHoursKey": "13"
    }, {
        "endTimeHours": "14",
        "endTimeHoursKey": "14"
    }, {
        "endTimeHours": "15",
        "endTimeHoursKey": "15"
    }, {
        "endTimeHours": "16",
        "endTimeHoursKey": "16"
    }, {
        "endTimeHours": "17",
        "endTimeHoursKey": "17"
    }, {
        "endTimeHours": "18",
        "endTimeHoursKey": "18"
    }, {
        "endTimeHours": "19",
        "endTimeHoursKey": "19"
    }, {
        "endTimeHours": "20",
        "endTimeHoursKey": "20"
    }, {
        "endTimeHours": "21",
        "endTimeHoursKey": "21"
    }, {
        "endTimeHours": "22",
        "endTimeHoursKey": "22"
    }, {
        "endTimeHours": "23",
        "endTimeHoursKey": "23"
    }];

            }
    
    
    $scope.startMinList = [{
        "startTimeMins": "00",
        "startTimeMinsKey": "00"
    }, {
        "startTimeMins": "1",
        "startTimeMinsKey": "1"
    }, {
        "startTimeMins": "2",
        "startTimeMinsKey": "2"
    }, {
        "startTimeMins": "3",
        "startTimeMinsKey": "3"
    }, {
        "startTimeMins": "4",
        "startTimeMinsKey": "4"
    }, {
        "startTimeMins": "5",
        "startTimeMinsKey": "5"
    }, {
        "startTimeMins": "6",
        "startTimeMinsKey": "6"
    }, {
        "startTimeMins": "7",
        "startTimeMinsKey": "7"
    }, {
        "startTimeMins": "8",
        "startTimeMinsKey": "8"
    }, {
        "startTimeMins": "9",
        "startTimeMinsKey": "9"
    }, {
        "startTimeMins": "10",
        "startTimeMinsKey": "10"
    }, {
        "startTimeMins": "11",
        "startTimeMinsKey": "11"
    }, {
        "startTimeMins": "12",
        "startTimeMinsKey": "12"
    }, {
        "startTimeMins": "13",
        "startTimeMinsKey": "13"
    }, {
        "startTimeMins": "14",
        "startTimeMinsKey": "14"
    }, {
        "startTimeMins": "15",
        "startTimeMinsKey": "15"
    }, {
        "startTimeMins": "16",
        "startTimeMinsKey": "16"
    }, {
        "startTimeMins": "17",
        "startTimeMinsKey": "17"
    }, {
        "startTimeMins": "18",
        "startTimeMinsKey": "18"
    }, {
        "startTimeMins": "19",
        "startTimeMinsKey": "19"
    }, {
        "startTimeMins": "20",
        "startTimeMinsKey": "20"
    }, {
        "startTimeMins": "21",
        "startTimeMinsKey": "21"
    }, {
        "startTimeMins": "22",
        "startTimeMinsKey": "22"
    }, {
        "startTimeMins": "23",
        "startTimeMinsKey": "23"
    }, {
        "startTimeMins": "24",
        "startTimeMinsKey": "24"
    }, {
        "startTimeMins": "25",
        "startTimeMinsKey": "25"
    }, {
        "startTimeMins": "26",
        "startTimeMinsKey": "26"
    }, {
        "startTimeMins": "27",
        "startTimeMinsKey": "27"
    }, {
        "startTimeMins": "28",
        "startTimeMinsKey": "28"
    }, {
        "startTimeMins": "29",
        "startTimeMinsKey": "29"
    }, {
        "startTimeMins": "30",
        "startTimeMinsKey": "30"
    }, {
        "startTimeMins": "31",
        "startTimeMinsKey": "31"
    }, {
        "startTimeMins": "32",
        "startTimeMinsKey": "33"
    }, {
        "startTimeMins": "34",
        "startTimeMinsKey": "34"
    }, {
        "startTimeMins": "35",
        "startTimeMinsKey": "35"
    }, {
        "startTimeMins": "36",
        "startTimeMinsKey": "36"
    }, {
        "startTimeMins": "37",
        "startTimeMinsKey": "37"
    }, {
        "startTimeMins": "38",
        "startTimeMinsKey": "38"
    }, {
        "startTimeMins": "39",
        "startTimeMinsKey": "39"
    }, {
        "startTimeMins": "40",
        "startTimeMinsKey": "40"
    }, {
        "startTimeMins": "41",
        "startTimeMinsKey": "41"
    }, {
        "startTimeMins": "42",
        "startTimeMinsKey": "42"
    }, {
        "startTimeMins": "43",
        "startTimeMinsKey": "43"
    }, {
        "startTimeMins": "44",
        "startTimeMinsKey": "44"
    }, {
        "startTimeMins": "45",
        "startTimeMinsKey": "45"
    }, {
        "startTimeMins": "46",
        "startTimeMinsKey": "46"
    }, {
        "startTimeMins": "47",
        "startTimeMinsKey": "47"
    }, {
        "startTimeMins": "3",
        "startTimeMinsKey": "48"
    }, {
        "startTimeMins": "49",
        "startTimeMinsKey": "49"
    }, {
        "startTimeMins": "50",
        "startTimeMinsKey": "50"
    }, {
        "startTimeMins": "51",
        "startTimeMinsKey": "51"
    }, {
        "startTimeMins": "52",
        "startTimeMinsKey": "52"
    }, {
        "startTimeMins": "53",
        "startTimeMinsKey": "53"
    }, {
        "startTimeMins": "54",
        "startTimeMinsKey": "54"
    }, {
        "startTimeMins": "55",
        "startTimeMinsKey": "55"
    }, {
        "startTimeMins": "56",
        "startTimeMinsKey": "56"
    }, {
        "startTimeMins": "57",
        "startTimeMinsKey": "57"
    }, {
        "startTimeMins": "58",
        "startTimeMinsKey": "58"
    }, {
        "startTimeMins": "59",
        "startTimeMinsKey": "59"
    }];


   

    $scope.endMinList = [{
        "endTimeMins": "00",
        "endTimeMinsKey": "00"
    }, {
        "endTimeMins": "1",
        "endTimeMinsKey": "1"
    }, {
        "endTimeMins": "2",
        "endTimeMinsKey": "2"
    }, {
        "endTimeMins": "3",
        "endTimeMinsKey": "3"
    }, {
        "endTimeMins": "4",
        "endTimeMinsKey": "4"
    }, {
        "endTimeMins": "5",
        "endTimeMinsKey": "5"
    }, {
        "endTimeMins": "6",
        "endTimeMinsKey": "6"
    }, {
        "endTimeMins": "7",
        "endTimeMinsKey": "7"
    }, {
        "endTimeMins": "8",
        "endTimeMinsKey": "8"
    }, {
        "endTimeMins": "9",
        "endTimeMinsKey": "9"
    }, {
        "endTimeMins": "10",
        "endTimeMinsKey": "10"
    }, {
        "endTimeMins": "11",
        "endTimeMinsKey": "11"
    }, {
        "endTimeMins": "12",
        "endTimeMinsKey": "12"
    }, {
        "endTimeMins": "13",
        "endTimeMinsKey": "13"
    }, {
        "endTimeMins": "14",
        "endTimeMinsKey": "14"
    }, {
        "endTimeMins": "15",
        "endTimeMinsKey": "15"
    }, {
        "endTimeMins": "16",
        "endTimeMinsKey": "16"
    }, {
        "endTimeMins": "17",
        "endTimeMinsKey": "17"
    }, {
        "endTimeMins": "18",
        "endTimeMinsKey": "18"
    }, {
        "endTimeMins": "19",
        "endTimeMinsKey": "19"
    }, {
        "endTimeMins": "20",
        "endTimeMinsKey": "20"
    }, {
        "endTimeMins": "21",
        "endTimeMinsKey": "21"
    }, {
        "endTimeMins": "22",
        "endTimeMinsKey": "22"
    }, {
        "endTimeMins": "23",
        "endTimeMinsKey": "23"
    }, {
        "endTimeMins": "24",
        "endTimeMinsKey": "24"
    }, {
        "endTimeMins": "25",
        "endTimeMinsKey": "25"
    }, {
        "endTimeMins": "26",
        "endTimeMinsKey": "26"
    }, {
        "endTimeMins": "27",
        "endTimeMinsKey": "27"
    }, {
        "endTimeMins": "28",
        "endTimeMinsKey": "28"
    }, {
        "endTimeMins": "29",
        "endTimeMinsKey": "29"
    }, {
        "endTimeMins": "30",
        "endTimeMinsKey": "30"
    }, {
        "endTimeMins": "31",
        "endTimeMinsKey": "31"
    }, {
        "endTimeMins": "32",
        "endTimeMinsKey": "33"
    }, {
        "endTimeMins": "34",
        "endTimeMinsKey": "34"
    }, {
        "endTimeMins": "35",
        "endTimeMinsKey": "35"
    }, {
        "endTimeMins": "36",
        "endTimeMinsKey": "36"
    }, {
        "endTimeMins": "37",
        "endTimeMinsKey": "37"
    }, {
        "endTimeMins": "38",
        "endTimeMinsKey": "38"
    }, {
        "endTimeMins": "39",
        "endTimeMinsKey": "39"
    }, {
        "endTimeMins": "40",
        "endTimeMinsKey": "40"
    }, {
        "endTimeMins": "41",
        "endTimeMinsKey": "41"
    }, {
        "endTimeMins": "42",
        "endTimeMinsKey": "42"
    }, {
        "endTimeMins": "43",
        "endTimeMinsKey": "43"
    }, {
        "endTimeMins": "44",
        "endTimeMinsKey": "44"
    }, {
        "endTimeMins": "45",
        "endTimeMinsKey": "45"
    }, {
        "endTimeMins": "46",
        "endTimeMinsKey": "46"
    }, {
        "endTimeMins": "47",
        "endTimeMinsKey": "47"
    }, {
        "endTimeMins": "3",
        "endTimeMinsKey": "48"
    }, {
        "endTimeMins": "49",
        "endTimeMinsKey": "49"
    }, {
        "endTimeMins": "50",
        "endTimeMinsKey": "50"
    }, {
        "endTimeMins": "51",
        "endTimeMinsKey": "51"
    }, {
        "endTimeMins": "52",
        "endTimeMinsKey": "52"
    }, {
        "endTimeMins": "53",
        "endTimeMinsKey": "53"
    }, {
        "endTimeMins": "54",
        "endTimeMinsKey": "54"
    }, {
        "endTimeMins": "55",
        "endTimeMinsKey": "55"
    }, {
        "endTimeMins": "56",
        "endTimeMinsKey": "56"
    }, {
        "endTimeMins": "57",
        "endTimeMinsKey": "57"
    }, {
        "endTimeMins": "58",
        "endTimeMinsKey": "58"
    }, {
        "endTimeMins": "59",
        "endTimeMinsKey": "59"
    }];

    
    
    var periodSlot = {};
    var PeriodSlot = {};
    var array = [];


    var isBreak;
    $scope.addPeriod = function(entityDaily, periodList) {
        //  alert(JSON.stringify(periodList));

        for (var i = 0; i < periodList.length; i++) {
            //  alert(JSON.stringify(periodList[i].IsBreak));
            if (periodList[i].IsBreak == undefined || periodList[i].IsBreak == false) {

                isBreak = 0
            } else if (periodList[i].IsBreak == true) {
                isBreak = 1
            }
            PeriodSlot = {


                periodSlotKey: periodList[i].periodslotKey,
                periodSlotName: periodList[i].PeriodSlotName,
                endTimeHours: periodList[i].endTimeHours,
                endTimeMins: periodList[i].endTimeMins,
                startTimeHours: periodList[i].startTimeHours,
                startTimeMins: periodList[i].startTimeMins,
                periodBreak: isBreak,
                courseKey: entityDaily.InstituteCourseKey,
                instituteKey: selectedInstituteKey,
                createdAppKey: "3il_App_Key",
                createdUserKey: "3il_User_Key",
            }
            array.push(PeriodSlot);

            if (i == (periodList.length) - 1) {



                var final = {
                    periodSlot: array
                };

                // alert(JSON.stringify(final));

                dailyRoutineLogic.addPeriodSlot(final).then(function(response) {
                    $scope.dailyForm.$setPristine();
                    $scope.dailyForm.$setUntouched();

                    SweetAlert.swal({
                        title: "Period Slot",
                        text: "Saved successfully",
                        type: "success",
                        confirmButtonColor: "#007AFF"
                    });

                    array = [];
                    $scope.dailyList = "";
                    $scope.periodList = "";
                    $scope.entityDaily = "";
                 //   $state.go('app.daily');

                }, function(err) {
                    appLogger.error('ERR', err);
                });


            }

        }



    }



}); // End of App Controller