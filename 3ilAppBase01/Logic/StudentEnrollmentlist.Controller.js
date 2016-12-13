'use strict';
var app = angular.module('Aarush.StudentEnrollmentlist', ['ThrillAppBase.StudentListLogic', , 'ThrillAppBase.thrillAppBasePersonLogic',
 'ThrillInstitute.instituteBoardLogic',
    'ThrillInstitute.instituteGroupLogic',
    'ThrillInstitute.instituteCoursLogic',
     'ThrillAcademic.academicYearLogic',
      'ThrillInstitute.instituteBatchLogic',
      'ThrillInstitute.instituteLogic',
      'ThrillPerson.personBasicInfoLogic',
      'ThrillPerson.personListLogic']);
app.controller('Aarush.StudentEnrollmentlist', function ($scope, $filter, $log, TempDataService,instituteLogic, $rootScope, $state, $localStorage, thrillAppBasePersonLogic, personBasicInfoLogic, personListLogic,ThrillAppBaseStudentListLogic,instituteBoardLogic,instituteGroupLogic,instituteCoursLogic,instituteBatchLogic,academicYearLogic, $window, $location, $q, SweetAlert) {

    //$state.go($state.current, {}, {reload: true});
    //$state.reload();
$scope.addStudent= function () {

$state.go('app.studentadd');
};

 var OrganizationKey="";

//var OrganizationKey = "d0a4cb70-58b3-11e6-92e8-2bb75054daa9";
var OrganizationKey = $localStorage.organizationKey;
$scope.StudentAdd={};
 $scope.getAcademicYears = function () {
            academicYearLogic.getAllYears($localStorage.organizationKey).then(function (response) {
            $scope.yearCollection = response;

});
         }
    
$scope.getAcademicYears();
$scope.getBoards = function () {
 var Institutekey = $scope.StudentAdd.InstituteKey;
  instituteBoardLogic.getBoardByInstituteKey(Institutekey).then(function (response) {
                //console.log(JSON.stringify(response));
                 $scope.boardCollection = response;

});
         }
    
$scope.getBoards();


 $scope.getGroup = function () {
  var Institutekey = $scope.StudentAdd.InstituteKey;
     var boardKey = $scope.StudentAdd.BoardKey;
             instituteGroupLogic.getGroupByInstituteBoardKey(Institutekey,boardKey).then(function (response) {
               //console.log(JSON.stringify(response));
                 $scope.groupCollection = response;

});
         }
    
$scope.getGroup();


 $scope.getCourses = function () {
  var Institutekey = $scope.StudentAdd.InstituteKey;
     var groupKey = $scope.StudentAdd.GroupKey;
             instituteCoursLogic.getCourseByInstituteGroupKey(groupKey,Institutekey).then(function (response) {
                // console.log(JSON.stringify(response));
                $scope.coursCollection = response;
});
         }
    
$scope.getCourses();
 $scope.getBatches = function () {
  var Institutekey = $scope.StudentAdd.InstituteKey;
     var courseKey = $scope.StudentAdd.CourseKey;
             instituteBatchLogic.getBatchByInstituteCourseKey(courseKey,Institutekey).then(function (response) {
                 console.log(JSON.stringify(response));
                $scope.Sections = response;
});
         }
    
$scope.getBatches();


 
  $scope.gender = [{ "Title": "Female", "Id": 1 }, { "Title": "Male", "Id": 2 }, { "Title": "Others", "Id": 3 }]

 $scope.getAllStudents = function () {
   
             ThrillAppBaseStudentListLogic.getAllStudents($scope.StudentAdd.InstituteKey,$scope.StudentAdd.AcademicYearKey,$scope.StudentAdd.BoardKey,$scope.StudentAdd.GroupKey,$scope.StudentAdd.CourseKey,$scope.StudentAdd.GenderID).then(function (response) {
                //console.log(JSON.stringify(response));
                 $scope.studentCollection = response;

});
         }
    


 $scope.institutes = function () {
  
             instituteLogic.getAllInstitutes($localStorage.organizationKey).then(function(response) {
                 //console.log(JSON.stringify(response));
               $scope.instituteList = response;
});
         }
    
$scope.institutes();

$scope.deleteStudent = function (EntityKey) {
        var del = confirm("Are you sure you want to Delete ?");
        if (del == true) {
            ThrillAppBaseStudentListLogic.deletestudent(EntityKey).then(function (response) {
                //appLogger.alert($scope.alertMessageLabels.boardDeleted);
               
                /*$scope.save = true;
                $scope.update = false;
                $scope.boardForm.$setPristine();
                $scope.boardForm.$setUntouched();*/
              $scope.getAllStudents();


                SweetAlert.swal({
                title: "Student",
                text: "Deleted successfully",
                type: "success",
                confirmButtonColor: "#007AFF"
            });
            });
        }
    };

});