'use strict';
var app = angular.module('mcampuz.DetailController', [
    'ThrillAppBase.StudentListLogic',
    'ThrillInstitute.instituteBoardLogic',
    'ThrillAppBase.thrillAppBasePersonLogic',
    'ThrillPerson.personBasicInfoLogic',
    'ThrillInstitute.instituteLogic',
    'ThrillAcademic.academicYearLogic',
    'ThrillInstitute.instituteGroupLogic',
    'ThrillInstitute.instituteCoursLogic',
    'ThrillInstitute.instituteBatchLogic',
    'mcampuz.FlexibleStructureLogic',
    'ThrillPerson.personListLogic'
]);
app.controller('feeDetailController', function($scope, $filter,
    $log,
    TempDataService,
    $rootScope,
    $state,
    $localStorage,
    thrillAppBasePersonLogic,
    FlexibleStructureLogic,
    personBasicInfoLogic,
    personListLogic,
    ThrillAppBaseStudentListLogic,
    $window,
    $location,
    $q,
    instituteLogic,
    instituteBoardLogic,
    academicYearLogic,
    instituteGroupLogic,
    instituteCoursLogic,
    instituteBatchLogic,
    SweetAlert) {





    //$state.go($state.current, {}, {reload: true});
    //$state.reload();
    /*$scope.addStudent= function () {

    $state.go('app.studentadd');
    };*/

    var OrganizationKey = "";
    var Institutekey;

    var OrganizationKey = $localStorage.organizationKey;

    /* $scope.getAllStudents = function () {
                 ThrillAppBaseStudentListLogic.getAllFeeStudents(OrganizationKey).then(function (response) {
                  // console.log(JSON.stringify(response));
                     $scope.studentCollection = response;

    });
             }
        
    $scope.getAllStudents();*/
    $scope.addFee = function(id) {

        $state.go('app.addDetails/:StudentKey', { StudentKey: id });
    };

    $scope.goflexibleStructure = function(id) {

        $state.go('app.flexibleStructure/:StudentKey/:type', { StudentKey: id, type: 'default' });
    };

    $scope.payFee = function(id) {

        //$state.go('app.PayFee');
        $state.go('app.PayFee/:StudentKey/:type', { StudentKey: id, type: 'default' });

    };
    $scope.feedetail = {};
  $scope.institutes = function() {

        instituteLogic.getAllInstitutes($localStorage.organizationKey).then(function(response) {
            console.log(JSON.stringify(response));
            $scope.instituteList = response;

            $scope.feedetail.InstituteKey=$localStorage.LoginInstituteKey;
             $scope.getBoards();
        });
        
    }

    $scope.institutes();
    $scope.getAcademicYears = function() {
        academicYearLogic.getAllYears($localStorage.organizationKey).then(function(response) {
            $scope.yearCollection = response;

        });
    }

    $scope.getAcademicYears();

    $scope.getBoards = function() {
        var Institutekey = $scope.feedetail.InstituteKey;
        instituteBoardLogic.getBoardByInstituteKey(Institutekey).then(function(response) {
            //console.log(JSON.stringify(response));
            $scope.boardCollection = response;

        });
    }

    $scope.getBoards();

    $scope.getGroup = function() {
        var Institutekey = $scope.feedetail.InstituteKey;
        var boardKey = $scope.feedetail.BoardKey;
        //alert(Institutekey)
        instituteGroupLogic.getGroupByInstituteBoardKey(Institutekey, boardKey).then(function(response) {
            console.log(JSON.stringify(response));
            $scope.groupCollection = response;

        });
    }

    $scope.getGroup();


    $scope.getCourses = function() {
        var Institutekey = $scope.feedetail.InstituteKey;
        var groupKey = $scope.feedetail.GroupKey;
        instituteCoursLogic.getCourseByInstituteGroupKey(groupKey, Institutekey).then(function(response) {
            console.log(JSON.stringify(response));
            $scope.coursCollection = response;
        });
    }

    $scope.getCourses();
    $scope.getBatches = function() {
        var Institutekey = $scope.feedetail.InstituteKey;
        var courseKey = $scope.feedetail.CourseKey;
        instituteBatchLogic.getBatchByInstituteCourseKey(courseKey, Institutekey).then(function(response) {
            console.log(JSON.stringify(response));
            $scope.Sections = response;
        });
    }

    $scope.getBatches();


    $scope.getAllStudents = function() {

        FlexibleStructureLogic.getAllStudents($scope.feedetail.InstituteKey, $scope.feedetail.BatchKey).then(function(response) {
         //   alert(JSON.stringify(response));
            console.log(response.length);
            if (Array.isArray(response)) {
                $scope.studentCollection = response;
            } else {
                $scope.studentCollection = []
            }


        });
    }

});