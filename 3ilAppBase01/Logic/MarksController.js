var app = angular.module('mcampuz.marks', ['ThrillAppBase.marksLogic' 
 ,'ThrillAcademic.boardLogic'
        , 'ThrillAcademic.groupLogic'
        , 'ThrillAcademic.coursLogic'
        , 'ThrillAcademic.termLogic' ,
        'ThrillAppBase.thrillAppBasePersonLogic', 
         'ThrillPerson.personBasicInfoLogic',
          'ThrillPerson.personListLogic',
          'ThrillAcademic.academicYearLogic',
          'ThrillInstitute.instituteBatchLogic']);
app.controller('mcampuz.marks', function ($scope,
 $filter,
  $log,
   TempDataService,
    $rootScope, 
    $state, 
    $localStorage,
     thrillAppBasePersonLogic,
      personBasicInfoLogic, 
      personListLogic,
      marksLogic,
      academicYearLogic,
      instituteBatchLogic,
       $window,
        $location,
         $q,
boardLogic, groupLogic, coursLogic,  termLogic,
          SweetAlert) {

   function getLabels(cultureName) {
        var currentFileName = "Marks";
        $http.get("3ilAppBase01/Languages/" + currentFileName + "." + cultureName + ".json").then(function(response) {
            bindLabels(response.data);

        });
    }

    /*bind labels with selected language */
    function bindLabels(data) {
	var labels = {
		board: data.labels.board
		// minimumSubjects: data.labels.minimumSubjects,
		// maximumSubjects: data.labels.maximumSubjects,
		// submit: data.labels.submit,
		// electiveGroupHeading: data.labels.electiveGroupHeading
	};

        $scope.labelsSubject = data.labels;

    };
    

     function getAllAcademicYear() {

      	academicYearLogic.getAllYears($localStorage.organizationKey).then(function (response) {

           $scope.yearCollection = response;
        })
    }
    getAllAcademicYear();


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

    $scope.getCoursByGroupKey = function(groupKey) {

        coursLogic.getCoursByGroupKey(groupKey).then(function(response) {
            $scope.courseList = response;
        })
    }

    $scope.getBatchByCourseKey = function(courseKey) {
         marksLogic.getBatch(courseKey).then(function(response) {
            $scope.batchList = response;
        })
    }

   


});