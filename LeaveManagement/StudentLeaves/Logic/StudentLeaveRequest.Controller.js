/*//=============================================================================
// All rights reserved to Thrill Innovative Labs.
// THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
// OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
// LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
// FITNESS FOR A PARTICULAR PURPOSE.
//=============================================================================
//*****************************************************************************
//* Name		    	: StudentLeaveRequest.Controller.js 
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

var app = angular.module('ThrillStudentLeaves.studentLeaveRequest', ['ThrillStudentLeaves.studentLeaveRequestLogic', 'ThrillFrameworkLibrary.geo', 'ThrillFrameworkLibrary.Network', 'mcampuz.FlexibleStructureLogic', 'ThrillFrameworkLibrary.appLogger', 'ThrillStudentLeaves.studentLeaveRequestReceivedByLogic', 'ThrillStudentLeaves.studentLeaveReasonLogic', 'ThrillStudentLeaves.studentLeaveRequestModeLogic', 'ThrillInstitute.instituteBoardLogic', 'ThrillInstitute.instituteLogic', 'ThrillAcademic.academicYearLogic', 'ThrillInstitute.instituteGroupLogic', 'ThrillInstitute.instituteCoursLogic', 'ThrillInstitute.instituteBatchLogic'])
    /*Setup studentLeaveRequest Controller */
app.controller('StudentLeaveRequestController', function($scope,
    $http,
    studentLeaveRequestLogic,
    studentLeaveRequestModeLogic,
    studentLeaveRequestReceivedByLogic,
    studentLeaveReasonLogic,
    $state,
    $stateParams,
    $q,
    instituteLogic,
    instituteBoardLogic,
    academicYearLogic,
    $localStorage,
    instituteGroupLogic,
    instituteCoursLogic,
    instituteBatchLogic,
    SweetAlert,
    appLogger) {
    var Institutekey;
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
            console.log(JSON.stringify(response));
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
    }

    $scope.getBoards();

    $scope.getGroup = function() {
        var Institutekey = $scope.leave.InstituteKey;
        var boardKey = $scope.leave.BoardKey;
        //alert(Institutekey)
        instituteGroupLogic.getGroupByInstituteBoardKey(Institutekey, boardKey).then(function(response) {
            console.log(JSON.stringify(response));
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
            console.log(JSON.stringify(response));
            $scope.Sections = response;
        });
    }

    $scope.getBatches();


    $scope.getAllStudents = function() {

        studentLeaveRequestLogic.getAllStudents($scope.leave.InstituteKey, $scope.leave.AcademicYearKey, $scope.leave.BoardKey, $scope.leave.GroupKey, $scope.leave.CourseKey, $scope.leave.BatchKey).then(function(response) {
            $scope.grid = true;
            console.log(JSON.stringify(response));
            $scope.studentCollection = response;

        });
    }




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

    $scope.personalDetails = []


    var id = 0;
    /* $scope.personalDetails = [
         {
              'id':id,
             'name':'Praveen',
             'dob':'30-04-1984',
             'gender':'M',
             'dept':'Depart',

         }];*/

    $scope.saveleaveRequests = function() {
        var newarray = [];
        for (var i = 0; i < $scope.personalDetails.length; i++)

        {
            newarray.push(newLeaveRequest($scope.personalDetails[i]))

            if (i == $scope.personalDetails.length - 1) {
                $q.all(newarray).then(function(response) {
                    SweetAlert.swal({
                        title: "Student Leave",
                        text: "Saved successfully",
                        type: "success",
                        confirmButtonColor: "#007AFF"
                    });

                }, function(error) {
                    console.log(error);
                });
            }

        }

    }




    //var d = new Date();
    //var newx = new Date(d.setDate(d.getDate() - 30));

    $scope.requestedMinDate = new Date(new Date().setDate(new Date().getDate() - 30));
    $scope.requestedMaxDate = new Date();

    $scope.fromTOMaxDate = new Date(new Date().setDate(new Date().getDate() + 60));






    function newLeaveRequest(leaveObject) {
        var deferred = $q.defer();

        //  calcBusinessDays(startDate,endDate)
        var ONE_DAY = 1000 * 60 * 60 * 24;


        var date1_ms = leaveObject.startDateTime.getTime();
        var date2_ms = leaveObject.endDateTime.getTime();

        // Calculate the difference in milliseconds
        var difference_ms = Math.abs(date1_ms - date2_ms);

        var day = Math.round(difference_ms / ONE_DAY);
        leaveObject.noOfDays = day;
        leaveObject.CreatedUserKey = "Mcampuz-leave-123";
        leaveObject.CreatedAppKey = "Mcampuz-web";
        leaveObject.LastUpdatedAppKey = "Mcampuz-web";
        leaveObject.LastUpdatedUserKey = "Mcampuz-leave-123";
        leaveObject.instanceOrganizationKey = $localStorage.organizationKey;
        delete leaveObject['$$hashKey'];
        delete leaveObject['id'];



        studentLeaveRequestLogic.addStudentLeaveRequest(leaveObject).then(function(response) {

            deferred.resolve(response);
        }, function(error) {
            deferred.reject(error);
            console.log(error)
        });

        return deferred.promise;
    }
    $scope.elements = true;

    $scope.addNew = function(personalDetail) {

        id = id + 1;
        $scope.personalDetails.push({
            'id': id,
            'studentKey': "",
            'requesteddate': "",
            'startDateTime': "",
            'endDateTime': "",
            'reasonForLeaveKey': "",
            'requestModeKey': "",
            'requestReceviedByKey': ""
        });
    };

    $scope.remove = function() {
        var newDataList = [];
        $scope.selectedAll = false;
        angular.forEach($scope.personalDetails, function(selected) {
            if (!selected.selected) {
                newDataList.push(selected);
            }
        });
        $scope.personalDetails = newDataList;
    };

    $scope.checkAll = function() {
        if (!$scope.selectedAll) {
            $scope.selectedAll = true;
        } else {
            $scope.selectedAll = false;
        }
        angular.forEach($scope.personalDetails, function(personalDetail) {
            personalDetail.selected = $scope.selectedAll;
        });
    };

    $scope.showElements = function(id) {
        var showid = 'more' + id;
        if ($('#' + showid).css('display') == "none") {

            $('#' + showid).show();
        } else {

            $('#' + showid).hide();
        }

    };







    /*getLabels(appConfig.CULTURE_NAME);
    getMessages(appConfig.CULTURE_NAME);*/

    /*get labels with selected language*/
    /*function getLabels(cultureName) {
        var currentFileName = "StudentLeaveRequest";
        $http.get("StudentLeaveRequest/Languages/" + currentFileName + "." + cultureName + ".json").then(function (response) {
            bindLabels(response.data);

        });
    }

    function getMessages(cultureName) {
        var alertMessageName = "AlertMessages";

        $http.get("StudentLeaveRequest/Languages/" + alertMessageName + "." + cultureName + ".json").then(function (response) {
            $scope.alertMessageLabels = response.data.messages;
        });
    }
*/
    /*bind labels with selected language */
    /* function bindLabels(data) {
		 var labels = {
		 startDateTime: data.labels.startDateTime,
		 endDateTime: data.labels.endDateTime,
		 noOfDays: data.labels.noOfDays,
		 remarks: data.labels.remarks,
		 Status: data.labels.Status,
		 submit: data.labels.submit,
		 studentLeaveRequestHeading: data.labels.studentLeaveRequestHeading
	 };

	 $scope.labelsStudentLeaveRequest = labels;

};

	 var entitykey = DrawCaptcha();
	 var studentLeaveRequestEntityKey;*/

    /*Perform the CRUD (Create, Read, Update & Delete) operations of StudentLeaveRequest*/
    /*Method for calling  add StudentLeaveRequest */
    /* $scope.addStudentLeaveRequest = function () {
    	 if (appConfig.APP_MODE == 'offline') {
    		 $scope.entityStudentLeaveRequest.studentLeaveRequestKey = entitykey;
    	 }
    	 studentLeaveRequestLogic.addStudentLeaveRequest($scope.entityStudentLeaveRequest).then(function (response) {
    		 appLogger.alert($scope.alertMessageLabels.studentLeaveRequestSaved);
    		 $state.go('StudentLeaveRequestList');
    		 }, function (err) {
    			 appLogger.error('ERR', err);
    		 });
    	 };

     /*Method for calling  update StudentLeaveRequest*/
    /* $scope.updateStudentLeaveRequest = function () {
    	 studentLeaveRequestLogic.updateStudentLeaveRequest($scope.entitystudentLeaveRequest, $stateParams.referenceKey).then(function (response) {
    		 appLogger.alert($scope.alertMessageLabels.studentLeaveRequestUpdated);
    		 }, function (err) {
    			 appLogger.error('ERR', err);
    		 });
    	 };*/

    /*Method for  retrieving  StudentLeaveRequest details*/
    /* if ($stateParams.entityKey) {
		 studentLeaveRequestLogic.getStudentLeaveRequestByStudentLeaveRequestKey($stateParams.entityKey).then(function (response) {
			 $scope.entityStudentLeaveRequest = response[0];
			 $scope.entityStudentLeaveRequest.studentLeaveRequestKey = response[0].studentLeaveRequestKey;
			 $scope.entityStudentLeaveRequest.personKey = response[0].personKey;
			 $scope.entityStudentLeaveRequest.studentKey = response[0].studentKey;
			 $scope.entityStudentLeaveRequest.startDateTime = response[0].startDateTime;
			 $scope.entityStudentLeaveRequest.endDateTime = response[0].endDateTime;
			 $scope.entityStudentLeaveRequest.noOfDays = response[0].noOfDays;
			 $scope.entityStudentLeaveRequest.reasonForLeaveKey = response[0].reasonForLeaveKey;
			 $scope.entityStudentLeaveRequest.requestModeKey = response[0].requestModeKey;
			 $scope.entityStudentLeaveRequest.requestReceviedByKey = response[0].requestReceviedByKey;
			 $scope.entityStudentLeaveRequest.remarks = response[0].remarks;
			 $scope.entityStudentLeaveRequest.Status = response[0].Status;
			 $scope.entityStudentLeaveRequest.instanceOrganizationKey = response[0].instanceOrganizationKey;
		 }, function (err) {
			 appLogger.error('ERR', err);
		 });
	 }
*/
}); // End of App Controller