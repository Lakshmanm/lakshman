/*//=============================================================================
// All rights reserved to Thrill Innovative Labs.
// THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
// OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
// LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
// FITNESS FOR A PARTICULAR PURPOSE.
//=============================================================================
//*****************************************************************************
//* Name		    	: StudentLeaveRequestList.Controller.js 
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

var app = angular.module('ThrillStudentLeaves.studentLeaveRequestList', ['ThrillStudentLeaves.studentLeaveRequestLogic'
        // , 'ThrillStudentLeaves.masterDataLogic'
        , 'ngCordova', 'ThrillFrameworkLibrary.geo', 'ThrillFrameworkLibrary.Network'

        , 'ThrillFrameworkLibrary.appLogger'

        , 'ThrillInstitute.instituteBoardLogic', , 'ThrillStudentLeaves.studentLeaveRequestReceivedByLogic', 'ThrillStudentLeaves.studentLeaveReasonLogic', 'ThrillStudentLeaves.studentLeaveRequestModeLogic', 'ThrillInstitute.instituteLogic', 'ThrillAcademic.academicYearLogic', 'ThrillInstitute.instituteGroupLogic', 'ThrillInstitute.instituteCoursLogic', 'ThrillInstitute.instituteBatchLogic'
    ])
    /*Setup studentLeaveRequest Controller */
app.controller('StudentLeaveRequestListController', function($scope,
    $http,
    studentLeaveRequestLogic,
    //masterDataLogic,
    studentLeaveReasonLogic,
    studentLeaveRequestModeLogic,
    studentLeaveRequestReceivedByLogic,
    appLogger,
    instituteLogic,
    instituteBoardLogic,
    academicYearLogic,
    $localStorage,
    instituteGroupLogic,
    instituteCoursLogic,
    instituteBatchLogic,
    SweetAlert
) {


    /*get labels with selected language*/


    /*bind labels with selected language */
    // function bindLabels(data) {
    //     var labels = {
    //         startDateTime: data.labels.startDateTime,
    //         endDateTime: data.labels.endDateTime,
    //         noOfDays: data.labels.noOfDays,
    //         remarks: data.labels.remarks,
    //         Status: data.labels.Status,
    //         edit: data.labels.edit,
    //         delete: data.labels.delete,
    //         studentLeaveRequestList: data.labels.studentLeaveRequestList,
    //         studentLeaveRequestHeading: data.labels.studentLeaveRequestHeading
    //     };

    //     $scope.labelsStudentLeaveRequest = labels;

    // };
       

    $scope.leave = {};

    $scope.grid = false;
    $scope.institutes = function() {

        instituteLogic.getAllInstitutes($localStorage.organizationKey).then(function(response) {
            // console.log(JSON.stringify(response));
            $scope.instituteList = response;
        });
    }

    $scope.institutes();
     if($localStorage.RoleID==2 || $localStorage.RoleID==3  )
{

  $scope.leave={}; 
$scope.leave.InstituteKey=$localStorage.LoginInstituteKey;
   
    $scope.studentLeaveInstitute=true;
        

}
else
{
 $scope.studentLeaveInstitute=false;

}

    $scope.getAcademicYears = function() {
        academicYearLogic.getAllYears($localStorage.organizationKey).then(function(response) {
            //console.log(JSON.stringify(response));
            $scope.yearCollection = response;

        });
    }

    $scope.getAcademicYears();

    $scope.getBoards = function() {
        Institutekey = $scope.leave.InstituteKey;
        instituteBoardLogic.getBoardByInstituteKey(Institutekey).then(function(response) {
            //console.log(JSON.stringify(response));
            $scope.boardCollection = response;

        });
    };

     $scope.getBoards();

    $scope.getGroup = function() {
        var Institutekey = $scope.leave.InstituteKey;
        var boardKey = $scope.leave.BoardKey;
        //alert(Institutekey)
        instituteGroupLogic.getGroupByInstituteBoardKey(Institutekey, boardKey).then(function(response) {
            //console.log(JSON.stringify(response));
            $scope.groupCollection = response;

        });
    }

    $scope.getGroup();


    $scope.getCourses = function() {
        var Institutekey = $scope.leave.InstituteKey;
        var groupKey = $scope.leave.GroupKey;
        instituteCoursLogic.getCourseByInstituteGroupKey(groupKey, Institutekey).then(function(response) {
            // console.log(JSON.stringify(response));
            $scope.coursCollection = response;
        });
    }

    $scope.getCourses();
    $scope.getBatches = function() {
        var Institutekey = $scope.leave.InstituteKey;
        var courseKey = $scope.leave.CourseKey;
        instituteBatchLogic.getBatchByInstituteCourseKey(courseKey, Institutekey).then(function(response) {
            //console.log(JSON.stringify(response));
            $scope.Sections = response;
        });
    }

    $scope.getBatches();

    $scope.getLeaveReceivedBy = function() {

        studentLeaveRequestReceivedByLogic.getAllStudentLeaveRequestReceivedByOrgKey($localStorage.organizationKey).then(function(response) {
            console.log(JSON.stringify(response));
            $scope.receivedByCollection = response;

        });
    }

    $scope.getLeaveReceivedBy();

    $scope.getLeaveReasons = function() {
        studentLeaveReasonLogic.getAllStudentLeaveReasons($localStorage.organizationKey).then(function(response) {
            console.log(JSON.stringify(response));
            $scope.resonsCollection = response;

        });
    }

    $scope.getLeaveReasons();

    $scope.getLeaveRequestModes = function() {
        studentLeaveRequestModeLogic.getAllStudentLeaveRequestModes($localStorage.organizationKey).then(function(response) {
            console.log(JSON.stringify(response));
            $scope.requestModeCollection = response;

        });
    }

    $scope.getLeaveRequestModes();

    /*
        $scope.getAllStudents = function() {


                console.log(JSON.stringify(response));
                $scope.studentCollection = response;

            });
        */ //}

    $scope.getAllLeaveRequests = function() {

        studentLeaveRequestLogic.getAllStudents($scope.leave.InstituteKey, $scope.leave.AcademicYearKey, $scope.leave.BoardKey, $scope.leave.GroupKey, $scope.leave.CourseKey, $scope.leave.BatchKey).then(function(response) {
            $scope.studentCollection = response;
            studentLeaveRequestLogic.getAllleaveRequests($scope.leave.BoardKey, $scope.leave.GroupKey, $scope.leave.CourseKey, $scope.leave.BatchKey, $scope.leave.StudentNumber).then(function(response) {
                $scope.grid = true;

                // $scope.personalDetails = []
                //     //alert(installmentsNumber);
                // var id = 0;

                // for (var i = 0; i < response.length; i++) {

                //     $scope.personalDetails.push({
                //         'id': id + 1,
                //         'studentKey': response[i].studentKey,
                //         'requesteddate': new Date(response[i].requesteddate),
                //         'startDateTime': new Date(response[i].startDateTime),
                //         'endDateTime': new Date(response[i].endDateTime),
                //         'reasonForLeaveKey': response[i].reasonForLeaveKey,
                //         'requestModeKey': response[i].requestModeKey,
                //         'requestReceviedByKey': response[i].requestReceviedByKey





                //     })


                // }
                console.log(JSON.stringify(response));
                if (Array.isArray(response)) {
                    $scope.leaveCollection = response;
                } else {
                    $scope.leaveCollection = []
                }
            });
        });
    }
    $scope.sortColumn = "StudentName";
    $scope.sortColumn = "RequestedDate";
    $scope.sortColumn = "From";
    $scope.sortColumn = "To";
    $scope.sortColumn = "Reason";
    $scope.sortColumn = "RequestMode";
    $scope.sortColumn = "ReceivedBy";
    $scope.sortColumn = "Actions";
    $scope.sortColumn = "";
    $scope.reverseSort = false;


    $scope.sortData = function(column) {
        $scope.reverseSort = ($scope.sortColumn == column) ?
            !$scope.reverseSort : false;
        $scope.sortColumn = column;

        $scope.getSortClass = function(column) {


            if ($scope.sortColumn == column) {
                return $scope.reverseSort ? 'arrow-down' : 'arrow-up';
            }

            return '';
        }
    }


    /*Method for calling  deleting   StudentLeaveRequest*/
    //         $scope.deleteStudentLeaveRequest = function(studentLeaveRequestEntityKey) {
    //                 appLogger.alert($scope.alertMessageLabels.studentLeaveRequestDeleted);
    //                 refresh();
    //             },
    //             function(err) {
    //                 appLogger.error('ERR', err);
    //             });
    // };

    $scope.deleteStudentLeaveRequest = function(studentLeaveRequestEntityKey, startdate) {
        var startdate = new Date(startdate);
        var currentdate = new Date();

        SweetAlert.swal({
            title: "Are you sure?",
            text: "You want to cancel?",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, cancel!",
            closeOnConfirm: false,
            closeOnCancel: false
        }, function(isConfirm) {
            if (isConfirm) {


                if (currentdate > startdate) {
                    SweetAlert.swal({
                        title: "Error",
                        text: "Leave Request with Past dates Cannot be Deleted :)",
                        type: "error",
                        confirmButtonColor: "#007AFF"
                    });
                } else {




                    studentLeaveRequestLogic.deleteStudentLeaveRequest(studentLeaveRequestEntityKey).then(function(response) {

                        console.log(JSON.stringify(response));

                        SweetAlert.swal({
                            title: "Deleted!",
                            text: "Leave Request is Deleted.",
                            type: "success",
                            confirmButtonColor: "#007AFF"
                        });
                        $scope.getAllLeaveRequests();



                    }, function(err) {
                        console.error('ERR', err);
                    });
                }

            } else {
                SweetAlert.swal({
                    title: "Cancelled",
                    text: "Leave Request is safe :)",
                    type: "error",
                    confirmButtonColor: "#007AFF"
                });
            }
        });

        /*
        var del = confirm("Are you sure you want to Delete ?");
        if (del == true) {
            SubOrganizationTypeListLogic.removeSubOrganizationType(subOrganizationTypeKey).then(function(response) {
                alert("Deleted Successfully");
                getBranchTypes();
            }, function(err) {
                console.error('ERR', err);
            });
        }*/
    };




}); // End of App Controller