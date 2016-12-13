var app = angular.module('mcampuz.staffattendance', ['ThrillAppBase.staffattendanceLogic', 'ThrillAcademic.boardLogic', 'ThrillAcademic.groupLogic', 'ThrillAcademic.coursLogic', 'ThrillAcademic.termLogic', 'ThrillAppBase.thrillAppBasePersonLogic', 'ThrillPerson.personBasicInfoLogic', 'ThrillPerson.personListLogic', 'ThrillAcademic.academicYearLogic', 'ThrillInstitute.instituteBatchLogic', 'ThrillInstitute.instituteLogic', 'ThrillAppBase.attendanceLogic']);
app.controller('mcampuz.staffattendance', function($scope, staffattendanceLogic, $filter, $log, TempDataService, $rootScope, $state, $localStorage, thrillAppBasePersonLogic, personBasicInfoLogic, personListLogic, attendanceLogic, academicYearLogic, instituteBatchLogic, instituteLogic, $window, $location, $q, boardLogic, groupLogic, coursLogic, termLogic, SweetAlert, attendanceLogic) {
    function getLabels(cultureName) {
        var currentFileName = "Attendance";
        $http.get("3ilAppBase01/Languages/" + currentFileName + "." + cultureName + ".json").then(function(response) {
            bindLabels(response.data);
        });
    }
    var InstituteKey = '';
    var periodSlotKey = '';
    var sessionKey = '';
    var AttendanceShiftKey = '';
    var WorkingLocationKey;
    // periodSlotKey = $localStorage.periodSlotKey;
    // sessionKey = $localStorage.sessionKey;
    InstituteKey = $localStorage.instituteKey;
    $scope.entityattendance = {};
    $scope.entityattendance.item = {};
    $scope.tablehide = false;
    $scope.hideSearch = false;
    $scope.save = false;
    $scope.absent = false;
    $scope.present = false;
    $scope.showSession = false;
    $scope.showPeriod = false;
    /*bind labels with selected language */
    var OrganizationKey = "";
    var OrganizationKey = $localStorage.organizationKey;
    var departmentReferenceKey = "";
    // periodSlotKey=$localStorage.periodSlotKey;
    //   sessionKey=$localStorage.sessionKey;
    // var departmentReferenceKey = $localStorage.referenceKey;
    $scope.session = [{
        "Title": "Forenoon",
        "Id": 1,
        "attendanceShiftKey": "asfgdh-ggfh3-jhkds32-sdffs"
    }, {
        "Title": "AfterNoon",
        "Id": 2,
        "attendanceShiftKey": "dfshg2-d123-32-sdfh23-sdss"
    }]
    $scope.attendaneTyp = [{
        "Title": "Period",
        "Id": 1,
        "AttendanceTypeKey": "sadfg62-ggfh3-jhk2ds32-sdff33s"
    }, {
        "Title": "Session",
        "Id": 2,
        "AttendanceTypeKey": "dfshq3g2-d1fd23-3dfgd2-sd43fh23-sdsdfss"
    }]
if($localStorage.AttendanceTypeKey!=undefined){

$scope.entityattendance.AttendanceTypeKey=$localStorage.AttendanceTypeKey;
}


   /* 
    $scope.institutes = function() {
        instituteLogic.getAllInstitutes($localStorage.organizationKey).then(function(response) {
            $scope.instituteList = response;
        });
    }
    $scope.institutes();*/

//get Institute
    $scope.getInstitute = function() {
        instituteLogic.getAllInstitutes($localStorage.organizationKey).then(function(response) {
            //alert(JSON.stringify(response))
            $scope.instituteList = response;
            $scope.entityattendance={};


            if($localStorage.RoleID==2 || $localStorage.RoleID==3)

{
            angular.forEach(response,function(resp)
            {
                if(resp.InstituteKey==$localStorage.LoginInstituteKey)
                {

                    $scope.entityattendance.item=resp;

                }
            })
            $scope.staffAttendance=true;
}
            else
                {
                    
                 $scope.staffAttendance=false;   
                }

        })
    }
    $scope.getInstitute();

    
     if($localStorage.RoleID==2 || $localStorage.RoleID==3 )
{
$scope.entityattendance={};
$scope.entityattendance.InstituteKey=$localStorage.LoginInstituteKey;
    $scope.attandance=true;
}
else{
    $scope.attandance=false;

}
    
    $scope.getInstitute = function(data) {
        InstituteKey = data.InstituteKey;
        $scope.getperiodList(InstituteKey);
        // alert(InstituteKey);
        //$localStorage.instituteKey=InstituteKey;
    }
    $scope.getperiodList = function() {

        staffattendanceLogic.getAllPeriods($localStorage.LoginInstituteKey).then(function(response) {
            $scope.periodList = response;
        });
    }
$scope.getperiodList();
    $scope.getDepartments = function() {
        staffattendanceLogic.getAllDepartments($localStorage.organizationKey).then(function(response) {
            $localStorage.departmentReferenceKey = response[0].referenceKey;
            $scope.assignedDepartmentTypes = response;
        });
    }
    $scope.getDepartments();

    function getAllAttendanceType() {
        attendanceLogic.getsessionByInstituteKey($localStorage.instituteKey).then(function(response) {
            $scope.attendanceTypeList = response;
        })
    }
    getAllAttendanceType();
    $scope.getperiod = function(PeriodslotKey) {

        periodSlotKey = PeriodslotKey; //
    }

    $scope.getSesssion = function(SessionKey) {

        sessionKey = SessionKey;
    }

    $scope.getAttendanceGenearlSettings = function() {
 
$localStorage.AttendanceTypeKey;
 if ($localStorage.AttendanceTypeKey == "sadfg62-ggfh3-jhk2ds32-sdff33s")
 {
              $scope.showPeriod = true;
           $scope.showSession = false;
           $localStorage.sessionKey="";
        }
 else
        {
        $scope.showSession = true;
             $scope.showPeriod = false;  
        }
   
    }
 $scope.getAttendanceGenearlSettings();
        // $scope.getListOfStaffs = function () {
        //     $scope.tablehide = true;
        //     $scope.hideSearch = true;
        //     $scope.save = true;
        //     // $scope.update=false;
        //     InstituteKey = $scope.entityattendance.item.InstituteKey;
        //     WorkingLocationKey = $scope.entityattendance.item.ParentOrganizationKey;
        //       staffattendanceLogic.getStaffListByInstituteKey($localStorage.instituteKey,periodSlotKey, sessionKey, $scope.entityattendance.startDateTime, WorkingLocationKey).then(function (response) {
        //                   var newArray = [];
        //         for (var i = 0; i < response.length; i++) {
        //             if (response[i].attendanceKey == null) {
        //                 response[i].attendanceStatuKey = '3970a130-4e58-11e6-bb5e-4d978092b727';
        //             }
        //             if (response[i].attendanceStatusTitle == 'Leave') {
        //                 response[i].showLeave = true;
        //                 response[i].hideRadios = false;
        //             }
        //             else {
        //                 response[i].showLeave = false;
        //                 response[i].hideRadios = true;
        //             }
        //             newArray.push(response[i])
        //             if (i == response.length - 1) {
        //                 $scope.staffList = response;
        //             }
        //         }
        //         // $scope.staffList = response;
        //     })
        // }

  $scope.getListOfStaffs = function() {
        $scope.tablehide = true;
        $scope.hideSearch = true;
        $scope.present = true;
        $scope.absent = true;
        $scope.save = true;
        $scope.formInvalid = true;
        $scope.staffList={};
        // $scope.update=false;
        InstituteKey = $scope.entityattendance.item.InstituteKey;
        WorkingLocationKey = $scope.entityattendance.item.ParentOrganizationKey;
        staffattendanceLogic.getStaffListByInstituteKey(InstituteKey,$scope.entityattendance.PeriodslotKey,$scope.entityattendance.attendanceShiftKey, $scope.entityattendance.startDateTime, WorkingLocationKey).then(function(response) {

            var newArray = [];
                 $scope.staffList ={};
            for (var i = 0; i < response.length; i++) {
                if (response[i].attendanceKey == null) {
                    response[i].attendanceStatuKey = '3970a130-4e58-11e6-bb5e-4d978092b727';
                }

 if(response[i].attendanceStatuKey=='24324a130-4e58-11e6-bb5e-4d978092b727') 
                  {

                    response[i].showLeave = true;
                    response[i].hideRadios=false;
                  }
                  else
                  {
                  
                     response[i].showLeave = false;
                    response[i].hideRadios=true;

                  }


                if (response[i].LeaveType == 'Fullday') {
                      response[i].attendanceStatuKey='24324a130-4e58-11e6-bb5e-4d978092b727';
                    response[i].showLeave = true;
                    response[i].hideRadios = false;
                }if(response[i].attendanceStatuKey!='24324a130-4e58-11e6-bb5e-4d978092b727')
                    {
                    
                     response[i].showLeave = false;
                    response[i].hideRadios=true;


                    }
                newArray.push(response[i])
                if (i == response.length - 1) {
                 var staffArray=[];   
         
 angular.forEach(response,function(resp)
            {
                if(resp.InstituteKey==InstituteKey)
                {
staffArray.push(resp);
         
                }
            })
     
 if (staffArray.length!="")
 {
     $scope.staffList = staffArray;
 }else{
     $scope.staffList = response;
 }
                   
                  //  console.log(JSON.stringify($scope.staffList));
                }
            }
            periodSlotKey = '';
            sessionKey = '';
            AttendanceShiftKey = '';
        })
    }




    $scope.changeAllAttendance = function(isAllPresent) {
            if (isAllPresent == "allPresent") {
                var length = $scope.staffList.length;
                for (var i = 0; i < length; i++) {
                    $scope.staffList[i].attendanceStatuKey = "1234567898a8ede0-5012-11e6-ada8-sdfsdf35ff";
                };
            } else {
                var length = $scope.staffList.length;
                for (var i = 0; i < length; i++) {
                    $scope.staffList[i].attendanceStatuKey = "fe366dc0-4e57-11e6-bb5e-4d978092b727";
                };
            }
        }
        //Date Start
    $scope.requestedMinDate = new Date(new Date().setDate(new Date().getDate() - 7));
    $scope.requestedMaxDate = new Date();
    //Date end
    $scope.SaveStaffAttendanceinfo = function() {
        var StaffArray = [];
        var day = 60 * 60 * 24 * 1000;
        for (var i = 0; i < $scope.staffList.length; i++) {
            var newDate = new Date($scope.entityattendance.startDateTime)
            var obj = {};
            obj = {
                "StaffKey": $scope.staffList[i].StaffKey,
                "AttendanceStatusKey": $scope.staffList[i].attendanceStatuKey,
                "PeriodSlotKey": $scope.entityattendance.PeriodslotKey,
                "AttendanceShiftKey": $scope.entityattendance.attendanceShiftKey,
                "AttendanceDate": new Date(newDate.getTime() + day),
                "InstituteKey": $scope.entityattendance.item.InstituteKey, //"AttendanceDate": $scope.entityattendance.startDateTime.getDate() + '/' + (startDateTime.getMonth() + 1) + '/' + startDateTime.getFullYear(),
                "InstanceOrganizationKey": $localStorage.organizationKey,
                "AttendanceKey": $scope.staffList[i].attendanceKey,
                "CreatedUserKey": "new-User-attendance",
                "CreatedAppKey": "new-App-mCampuZ"
            }

            StaffArray.push(obj)
            if (i == $scope.staffList.length - 1) {
                staffattendanceLogic.addStaffattendance(StaffArray).then(function(response) {

                    $scope.entityattendance = {};
                   

                    console.log(JSON.stringify($scope.instituteList));

                    angular.forEach($scope.instituteList,function(resp)
                    {
                        if(resp.InstituteKey==$localStorage.LoginInstituteKey)
                        $scope.entityattendance.item=resp;


                    })
                    $scope.staffList = {};
                       $scope.allPresent={};
   $scope.allAbsent={};
                    periodSlotKey = '';
                    sessionKey = '';
                    AttendanceShiftKey = '';
                    $localStorage.periodSlotKey = "";
                    $localStorage.sessionKey = "";
                    $scope.tablehide = false;
                    $scope.hideSearch = false;
                    $scope.save = false;
                    $scope.present = false;
                    $scope.absent = false;
                    $scope.formInvalid = false;

                    $scope.attendanceForm.$setPristine();
                    $scope.attendanceForm.$setUntouched();
                    SweetAlert.swal({
                        title: "Staff Attendance",
                        text: "Saved successfully",
                        type: "success",
                        confirmButtonColor: "#007AFF"
                    });
                }, function(err) {
                    console.log('ERR', err);
                });
            }
        }

    };
    // $scope.rowClass=function (dataOject) {
    //     if(dataOject.attendance=='absent')
    //     {
    //      var myClass ="redRow";
    //     }
    //      else {
    //       var myClass="";
    //      }
    //    return myClass;
    //  }
    // $scope.getAllStaff = function () {
    //   staffattendanceLogic.getAllStaffByDepartment($localStorage.departmentReferenceKey,$localStorage.organizationKey).then(function (response) {
    //     $scope.staffDepatment = response;
    //     console.log(JSON.stringify(response));
    //   });
    // }
    // $scope.getStaffListDetails = function () {
    //    $scope.tablehide=true;
    //   staffattendanceLogic.getAllStaffByDepartment($localStorage.departmentReferenceKey,$localStorage.organizationKey).then(function (response) {
    //     $scope.staffDepatment = response;
    //   var length = response.length;
    //    for (var i = 0 ; i < length; i++) {
    //       response[i].attendance ="none";
    //    };
    // $scope.staffList = response;
    // $scope.uncheckPresent=function  () {
    // $scope.allPresent=false;
    // }
    // // mark all present
    // $scope.changeAllAttendance=function  (isAllPresent) {
    //   if(isAllPresent=="allPresent"){
    //    var length = $scope.staffList.length;
    //    for (var i = 0 ; i < length; i++) {
    //       $scope.staffList[i].attendance ="present" ;
    //    };
    //  }
    //  else{
    //   var length = $scope.staffList.length;
    //    for (var i = 0 ; i < length; i++) {
    //       $scope.staffList[i].attendance = "absent";
    //    };
    //  }
    //   // body...
    // }
    // $scope.entityStudent={};
    // $scope.testing=true;
    // $scope.test=true;
    // $scope.testNone=true;
    // $scope.save = true;
    // $scope.present=true;
    // $scope.absent = true;
    //   });
    //   $localStorage.departmentReferenceKey="";
    // }
    // // $scope.getAllStaff = function (referenceKey) {
    // //     alert(JSON.stringify(referenceKey));
    // //   staffattendanceLogic.getAllStaffByDepartment(ReferenceKey,$localStorage.organizationKey).then(function (response) {
    // //     $scope.staffDepatment = response;
    // //   })
    // // }
});