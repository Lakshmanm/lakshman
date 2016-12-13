var app = angular.module('mcampuz.attendance', ['ThrillAppBase.attendanceLogic' 
                                                ,'ThrillAcademic.boardLogic'
                                                , 'ThrillAcademic.groupLogic'
                                                , 'ThrillAcademic.coursLogic'
                                                , 'ThrillAcademic.termLogic' ,
                                                'ThrillAppBase.thrillAppBasePersonLogic', 
                                                'ThrillPerson.personBasicInfoLogic',
                                                'ThrillPerson.personListLogic',
                                                'ThrillAcademic.academicYearLogic',
                                                'ThrillInstitute.instituteBatchLogic',
                                                'ThrillAssignment.assignmentLogic',
                                                'ThrillAppBase.StudentAdditionLogic',
                                                'ThrillInstitute.instituteLogic',
                                                'ThrillInstitute.instituteBoardLogic']);
app.controller('mcampuz.attendance', function ($scope,
                                                $filter,
                                                $log,
                                                TempDataService,
                                                $rootScope, 
                                                $state, 
                                                assignmentLogic,
                                                instituteLogic,
                                                $localStorage,
                                                thrillAppBasePersonLogic,
                                                personBasicInfoLogic, 
                                                personListLogic,
                                                attendanceLogic,
                                                academicYearLogic,
                                                instituteBatchLogic,
                                                $window,
                                                $location,
                                                ThrillAppBaseStudentLogic,
                                                instituteBoardLogic,
                                                $q,
                                                $filter,
                                                boardLogic, 
                                                groupLogic,
                                                coursLogic, 
                                                termLogic,
                                                SweetAlert) {
   function getLabels(cultureName) {
        var currentFileName = "Attendance";
        $http.get("3ilAppBase01/Languages/" + currentFileName + "." + cultureName + ".json").then(function(response) {
            bindLabels(response.data);
        });
    }
    /*bind labels with selected language */
    function bindLabels(data) {
  var labels = {
        board: data.labels.board,
        group: data.labels.group,
          course: data.labels.course,
      batch: data.labels.batch,
         period: data.labels.period,
         date:data.labels.date
      };
        $scope.labelsSubject = data.labels;
    };
    $scope.tablehide=false;
    $scope.entityattendance={};


if($localStorage.AttendanceTypeKey!=undefined){

$scope.entityattendance.AttendanceTypeKey=$localStorage.AttendanceTypeKey;
}
$scope.absent=false;
$scope.present=false;
  $scope.save = false;
 $scope.hideSearch=false;
   $scope.showSession = false;
   $scope.showPeriod = false;
   
   $scope.entityattendance="";
   $scope.studentList="";
var InstituteKey='';
var periodSlotKey='';
var sessionKey='';
var AttendanceShiftKey='';
   
var InstBatchKey="";
var InstCourseKey="";

$scope.entityattendance={};
   $scope.studentList={};
 $scope.institutes = function () {
               instituteLogic.getAllInstitutes($localStorage.organizationKey).then(function(response) {
                console.log(JSON.stringify(response));
               $scope.instituteList = response;

});
         }
    
$scope.institutes();
    
    if($localStorage.RoleID==2 || $localStorage.RoleID==3 )
{
$scope.entityattendance={};
$scope.entityattendance.InstituteKey=$localStorage.LoginInstituteKey;
    $scope.attandance=true;
}
else{
    $scope.attandance=false;

}
    
    

 $scope.session = [{ "Title": "Forenoon", "Id": 1 ,"attendanceShiftKey":"asfgdh-ggfh3-jhkds32-sdffs"}, { "Title": "AfterNoon", "Id": 2,"attendanceShiftKey":"dfshg2-d123-32-sdfh23-sdss" }]

 $scope.attendaneTyp = [{ "Title": "Period", "Id": 1 ,"AttendanceTypeKey":"sadfg62-ggfh3-jhk2ds32-sdff33s"}, { "Title": "Session", "Id": 2,"AttendanceTypeKey":"dfshq3g2-d1fd23-3dfgd2-sd43fh23-sdsdfss" }]



//method for getting seesions and board with Institute key
$scope.getBoards = function () {
  $localStorage.instituteKey=$scope.entityattendance.InstituteKey;
 InstituteKey=$scope.entityattendance.InstituteKey;

  instituteBoardLogic.getBoardByInstituteKey(InstituteKey).then(function (response) {
      $scope.boardList = response;
     attendanceLogic.getsessionByInstituteKey(InstituteKey).then(function (response) {
        $scope.attendanceTypeList = response;
                  
});
});
         }
    //get boards
$scope.getBoards();

$scope.getBoardGroups = function (InstituteBoardKey) {

  attendanceLogic.getGroupByBoardKey(InstituteBoardKey,InstituteKey).then(function (response) {
    $scope.groupList = response;
  })
}

$scope.getGroupCourse = function (InstituteGroupKey) {
  attendanceLogic.getCoursByGroupKey(InstituteGroupKey,InstituteKey).then(function (response) {

    $scope.courseList = response;
  })
}

$scope.getCourseBatch = function (InstituteCourseKey) {
  $localStorage.InstCourseKey=InstituteCourseKey;
  attendanceLogic.getBtachByCourseKey(InstituteCourseKey,InstituteKey).then(function (response) {
  
     $scope.batchList = response;
  })
}

$scope.getBatchgetPeriod = function (InstituteBatchKey) {
 $localStorage.InstBatchKey=InstituteBatchKey;
  attendanceLogic.getBatchByPeriod(InstituteBatchKey,InstituteKey).then(function (response) {
     $scope.periodList = response;
  })
}

$scope.getperiod=function(PeriodslotKey){
  // $localStorage.periodSlotKey=PeriodslotKey;
  periodSlotKey=PeriodslotKey;//
}

$scope.getSesssion=function(SessionKey){
   //$localStorage.sessionKey=SessionKey;
   sessionKey=SessionKey;
}

// $scope.getAttendanceType=function(){
//   alert(3234)
// $scope.showPeriod = false;
// alert($scope.entityattendance.AttendanceTypeKey);
// alert($scope.entityattendance.AttendanceTypeKey == "sadfg62-ggfh3-jhk2ds32-sdff33s");

//         if ($scope.entityattendance.AttendanceTypeKey == "sadfg62-ggfh3-jhk2ds32-sdff33s")
//           {
//               $scope.showPeriod = true;
//            $scope.showSession = false;
//            $localStorage.sessionKey="";
//         }
//         else
//         {
//         $scope.showSession = true;
//              $scope.showPeriod = false;  
//         }
//         alert($scope.entityattendance.AttendanceTypeKey == "sadfg62-ggfh3-jhk2ds32-sdff33s");
// }
// getAttendanceType();
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
 $scope.getListOfStudents = function () {
   $scope.tablehide=true;
   $scope.hideSearch=true;
  $scope.save=true;
   $scope.present=true;
   $scope.absent=true;
   $scope.formInvalid=true;
// $scope.update=false;

 attendanceLogic.getStudentListByInstituteKey(InstituteKey,$scope.entityattendance.PeriodslotKey,$scope.entityattendance.attendanceShiftKey,$scope.entityattendance.startDateTime,$localStorage.InstCourseKey,$localStorage.InstBatchKey).then(function (response) {
               
                    var newArray=[];
                     $scope.studentList ={};
               for(var i=0;i<response.length;i++)
               {
                  if(response[i].attendanceKey==null)
                  {
                    response[i].attendanceStatuKey='3970a130-4e58-11e6-bb5e-4d978092b727';
                  }
                  // if(response[i].attendanceKey==null && response[i].LeaveType=='Fullday' )
                  // {
                  // response[i].attendanceStatuKey='24324a130-4e58-11e6-bb5e-4d978092b727';
                  // } 
               
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
                  if(response[i].LeaveType=='Fullday')
                  {
                    response[i].attendanceStatuKey='24324a130-4e58-11e6-bb5e-4d978092b727';
                    response[i].showLeave = true;
                    response[i].hideRadios=false;
                  }
                  else
                  {
                    if(response[i].attendanceStatuKey!='24324a130-4e58-11e6-bb5e-4d978092b727')
                    {
                    
                     response[i].showLeave = false;
                    response[i].hideRadios=true;


                    }
                  }
                  newArray.push(response[i])
                  if(i==response.length-1)
                  {
                    
                 $scope.studentList = response;
                  }
               }
periodSlotKey='';
sessionKey='';
AttendanceShiftKey='';
           })
 }

 $scope.requestedMinDate = new Date(new Date().setDate(new Date().getDate() - 7));
    $scope.requestedMaxDate = new Date();

$scope.changeAllAttendance=function  (isAllPresent) {
  if(isAllPresent=="allPresent"){
   var length = $scope.studentList.length;
   for (var i = 0 ; i < length; i++) {
      $scope.studentList[i].attendanceStatuKey ="1234567898a8ede0-5012-11e6-ada8-sdfsdf35ff";
   };
 }
 else{
  var length = $scope.studentList.length;
   for (var i = 0 ; i < length; i++) {
      $scope.studentList[i].attendanceStatuKey = "fe366dc0-4e57-11e6-bb5e-4d978092b727";
   };
 }
 }
   $scope.SaveStudentAttendanceinfo = function () {

   var StudentArray=[];
   var day = 60 * 60 * 24 * 1000;

   
    for(var i=0;i<$scope.studentList.length;i++)
    {

      var AttendanceStatusKey;
      var newDate = new Date($scope.entityattendance.startDateTime)
      var obj={};
      /*if($scope.studentList[i].LeaveType=='Fullday')
            {
               AttendanceStatusKey= "24324a130-4e58-11e6-bb5e-4d978092b727"
            }
            else
            {
               AttendanceStatusKey= $scope.studentList[i].attendanceStatuKey
            }*/

       obj={
            "StudentKey": $scope.studentList[i].StudentKey,
            
            "AttendanceStatusKey": $scope.studentList[i].attendanceStatuKey,
            "PeriodSlotKey":$scope.entityattendance.PeriodslotKey, 
            "AttendanceShiftKey": $scope.entityattendance.attendanceShiftKey,
            "AttendanceDate": new Date(newDate.getTime() + day),
       
            "InstituteKey": $scope.entityattendance.InstituteKey, 
            "InstanceOrganizationKey": $localStorage.organizationKey,
            "AttendanceKey": $scope.studentList[i].attendanceKey,
            "CreatedUserKey": "new-User-attendance",
            "CreatedAppKey": "new-App-mCampuZ"
          }
          //alert(JSON.stringify(obj))
         StudentArray.push(obj)
          if(i==$scope.studentList.length-1)
          {
          
            attendanceLogic.addStudentattendance(StudentArray).then(function (response) {

              console.log(JSON.stringify(response));
    $scope.tablehide=false;
   $scope.hideSearch=false;
  $scope.save=false;
   $scope.present=false;
   $scope.absent=false;
   $scope.entityattendance = {};
   $scope.allPresent={};
   $scope.allAbsent={};
  $scope.entityattendance.InstituteKey=$localStorage.LoginInstituteKey;
  // $scope.studentList={};
     periodSlotKey='';
           sessionKey='';
          AttendanceShiftKey='';
  $scope.formInvalid=false;

       $scope.attendanceForm.$setPristine();
          $scope.attendanceForm.$setUntouched();
  
       SweetAlert.swal({
                    title: "Student Attendance",
                    text: "Saved successfully",
                    type: "success",
                    confirmButtonColor: "#007AFF"
                });
            
                     }, function (err) {
         appLogger.error('ERR', err);
       });
          }
  






    }
  };




});