'use strict';
var app = angular.module('Aarush.StudentEnrollmentList', ['ThrillAppBase.StudentListLogic', , 'ThrillAppBase.thrillAppBasePersonLogic',
    'ThrillInstitute.instituteBoardLogic',
    'ThrillInstitute.instituteGroupLogic',
    'ThrillInstitute.instituteCoursLogic',
    'ThrillAcademic.academicYearLogic',
    'ThrillInstitute.instituteBatchLogic',


    'ThrillInstitute.instituteLogic',
    'ThrillPerson.personBasicInfoLogic',
    'ThrillPerson.personListLogic'
]);
app.controller('Aarush.StudentEnrollmentList', function($scope, $filter, $log, TempDataService, instituteLogic, $rootScope, $state, $localStorage, thrillAppBasePersonLogic, personBasicInfoLogic, personListLogic, ThrillAppBaseStudentListLogic, instituteBoardLogic, instituteGroupLogic, instituteCoursLogic, instituteBatchLogic, academicYearLogic, $window, $location, $q, SweetAlert) {


    //$state.go($state.current, {}, {reload: true});
    //$state.reload();
    $scope.addStudent = function() {

        $state.go('app.studentadd');
    };

    var OrganizationKey = "";
    $scope.StudentAdd = {};
    //var OrganizationKey = "d0a4cb70-58b3-11e6-92e8-2bb75054daa9";

    var OrganizationKey = $localStorage.organizationKey;

    $scope.institutes = function() {

        instituteLogic.getAllInstitutes($localStorage.organizationKey).then(function(response) {
            //console.log(JSON.stringify(response));
            $scope.instituteList = response;
        });
    }

    $scope.institutes();


    $scope.gender = [{ "Title": "Female", "Id": 1 }, { "Title": "Male", "Id": 2 }, { "Title": "Others", "Id": 3 }]

    $scope.getAllStudentsEnrollment = function() {
        var Institutekey = $scope.StudentAdd.InstituteKey;
        ThrillAppBaseStudentListLogic.getAllStudentsEnrollment(Institutekey).then(function(response) {
            console.log(JSON.stringify(response));
            $scope.studentCollection = response;

        });
    }





    $scope.deleteStudent = function(EntityKey) {
        var del = confirm("Are you sure you want to Delete ?");
        if (del == true) {
            ThrillAppBaseStudentListLogic.deletestudent(EntityKey).then(function(response) {
                //appLogger.alert($scope.alertMessageLabels.boardDeleted);

                /*$scope.save = true;
                $scope.update = false;
                $scope.boardForm.$setPristine();
                $scope.boardForm.$setUntouched();*/
                $scope.getAllStudentsEnrollment();
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