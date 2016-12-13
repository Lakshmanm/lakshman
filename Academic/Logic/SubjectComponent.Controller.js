/*//=============================================================================
// All rights reserved to Thrill Innovative Labs.
// THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
// OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
// LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
// FITNESS FOR A PARTICULAR PURPOSE.
//=============================================================================
//*****************************************************************************
//* Name		    	: SubjectComponent.Controller.js 
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

var app = angular.module('ThrillAcademic.subjectComponent', ['ThrillAcademic.subjectComponentLogic'
			 , 'ThrillAcademic.boardLogic'
	, 'ThrillAcademic.groupLogic'
	, 'ThrillAcademic.coursLogic'
	, 'ThrillAcademic.subjectLogic'
			 , 'ngCordova'
			 , 'ThrillAcademic.boardLogic'
			 , 'ThrillAcademic.examinationTypeLogic'
			 , 'ThrillFrameworkLibrary.geo'
			 , 'ThrillFrameworkLibrary.Network'
			 , 'ThrillCnnWebClient.appConfig'
			 , 'ThrillFrameworkLibrary.appLogger'
])
/*Setup subjectComponent Controller */
app.controller('SubjectComponentController', function ($scope, SweetAlert, $http, subjectComponentLogic, examinationTypeLogic, boardLogic, groupLogic, termLogic, coursLogic, subjectLogic, $state, $localStorage, $stateParams, appConfig, appLogger) {
	getLabels(appConfig.CULTURE_NAME);
	getMessages(appConfig.CULTURE_NAME);

	/*get labels with selected language*/
    function getLabels(cultureName) {
        var currentFileName = "SubjectComponent";
        $http.get("Academic/Languages/" + currentFileName + "." + cultureName + ".json").then(function (response) {
            bindLabels(response.data);

        });
    }

    function getMessages(cultureName) {
        var alertMessageName = "AlertMessages";

        $http.get("Academic/Languages/" + alertMessageName + "." + cultureName + ".json").then(function (response) {
            $scope.alertMessageLabels = response.data.messages;
        });
    }

    /*bind labels with selected language */
	function bindLabels(data) {


		$scope.labelsSubjectComponent = data.labels;

	};

	$scope.save = true;
		 	$scope.update = false;
	var entitykey = DrawCaptcha();
	var subjectComponentEntityKey;

	//$scope.subjectCollection=[{"subjecttitle":"Subject 1","subjectkey":"1"},{ "subjecttitle":"Subject 2","subjectkey":"2"},{ "subjecttitle":"Subject 3","subjectkey":"3"}]

    function getAllBoards() {
        boardLogic.getAllBoards($localStorage.organizationKey).then(function (response) {
            $scope.boardList = response;
        })
    }

    getAllBoards();

    $scope.getBoardGroups = function (boardKey) {
        groupLogic.getBoardGroups(boardKey).then(function (response) {
            $scope.groupList = response;

        })
    }

    $scope.getGroupCourse = function (groupKey) {
        coursLogic.getCoursByGroupKey(groupKey).then(function (response) {
            $scope.courseList = response;

        })
    }
    $scope.getCourseTerm = function (courseKey) {
        termLogic.getTermByCourseKey(courseKey).then(function (response) {
            $scope.termList = response;
        })
    }
    $scope.getTermSubject = function (termKey) {
        subjectLogic.getSubjectByTermKey(termKey).then(function (response) {
            $scope.subjectList = response;
        })
    }

    function getExaminationTypes() {
        examinationTypeLogic.getAllExaminationTypes($localStorage.organizationKey).then(function (response) {
            $scope.examinationTypeList = response;
        });
    }
    getExaminationTypes();


    /*Perform the CRUD (Create, Read, Update & Delete) operations of SubjectComponent*/
	/*Method for calling  add SubjectComponent */
	$scope.addSubjectComponent = function () {
		if (appConfig.APP_MODE == 'offline') {
			$scope.entitySubjectComponent.subjectComponentKey = entitykey;
		}

		delete $scope.entitySubjectComponent.boardKey;
        delete $scope.entitySubjectComponent.groupKey;
        delete $scope.entitySubjectComponent.courseKey;
		delete $scope.entitySubjectComponent.termKey;

		$scope.entitySubjectComponent.CreatedUserKey = "new-User-My3";
		$scope.entitySubjectComponent.CreatedAppKey = "new-App-mCampuZ";
		$scope.entitySubjectComponent.instanceOrganizationKey = $localStorage.organizationKey;
		//alert(JSON.stringify($scope.entitySubjectComponent));
		subjectComponentLogic.addSubjectComponent($scope.entitySubjectComponent).then(function (response) {

			$scope.entitySubjectComponent = {};
			$scope.save = true;
			$scope.update = false;
			$scope.subjectComponentForm.$setPristine();
			$scope.subjectComponentForm.$setUntouched();
			SweetAlert.swal({
                title: "Subject Component",
                text: "Saved successfully",
                type: "success",
                confirmButtonColor: "#007AFF"
            });
			refresh();

		}, function (err) {
			appLogger.error('ERR', err);
		});
	};

	/*Method for calling  updatee SubjectComponent*/
	$scope.updateSubjectComponent = function () {

		delete $scope.entitySubjectComponent.boardKey;
        delete $scope.entitySubjectComponent.groupKey;
        delete $scope.entitySubjectComponent.courseKey;
		delete $scope.entitySubjectComponent.termKey;

		$scope.entitySubjectComponent.LastUpdatedByUserKey = "new-User-My3";
		$scope.entitySubjectComponent.LastUpdatedAppKey = "new-App-mCampuZ";
		subjectComponentLogic.updateSubjectComponent($scope.entitySubjectComponent, $scope.entitySubjectComponent.subjectComponentKey).then(function (response) {
			$scope.entitySubjectComponent = {};
			$scope.save = true;
			$scope.update = false;
			$scope.subjectComponentForm.$setPristine();
			$scope.subjectComponentForm.$setUntouched();
			SweetAlert.swal({
                title: "Subject Component",
                text: "Updated successfully",
                type: "success",
                confirmButtonColor: "#007AFF"
            });
			refresh();
		}, function (err) {
			appLogger.error('ERR', err);
		});
	};

	/*Method for  retrieving  SubjectComponent details*/
	$scope.editSubjectComponent = function (subjectComponentKey) {
		subjectComponentLogic.getSubjectComponentBySubjectComponentKey(subjectComponentKey).then(function (response) {
			$scope.save = false;
			$scope.update = true;
			//$scope.entitySubjectComponent = response[0];
			$scope.getBoardGroups(response[0].boardKey);
            $scope.getGroupCourse(response[0].groupKey);
            $scope.getCourseTerm(response[0].courseKey);
            $scope.getTermSubject(response[0].termKey);

			$scope.entitySubjectComponent = {};
			$scope.entitySubjectComponent.boardKey = response[0].boardKey;
            $scope.entitySubjectComponent.groupKey = response[0].groupKey;
            $scope.entitySubjectComponent.courseKey = response[0].courseKey;
			$scope.entitySubjectComponent.termKey = response[0].termKey;
			$scope.entitySubjectComponent.subjectComponentKey = response[0].subjectComponentKey;
			$scope.entitySubjectComponent.subjectComponentTitle = response[0].subjectComponentTitle;
			$scope.entitySubjectComponent.subjectKey = response[0].subjectKey;
			$scope.entitySubjectComponent.examinationTypeKey = response[0].examinationTypeKey;
//			$scope.entitySubjectComponent.minimumSubjects = response[0].minimumSubjects;
			$scope.entitySubjectComponent.maximumMarks = response[0].maximumMarks;
		}, function (err) {
			appLogger.error('ERR', err);
		});
	}

	var refresh = function () {
		subjectComponentLogic.getAllSubjectComponents($localStorage.organizationKey).then(function (response) {
			//console.log(JSON.stringify(response));
			$scope.subjectComponentCollection = response;
			$scope.sortColumn = "";
			$scope.reverseSort = false;
			$scope.sortData = function (column) {
				$scope.reverseSort = ($scope.sortColumn == column) ?
					!$scope.reverseSort : false;
				$scope.sortColumn = column;
			}
			$scope.getSortClass = function (column) {
				if ($scope.sortColumn == column) {
					return $scope.reverseSort ? 'arrow-down' : 'arrow-up';
				}
				return '';
			}, function (err) {
				appLogger.error('ERR', err);
			};
		});
	}
	refresh();


	/*Method for calling  deleting   SubjectComponent*/
	$scope.deleteSubjectComponent = function (subjectComponentEntityKey) {
        
         SweetAlert.swal({
            title: "Are you sure?"
            , text: "Your want to delete this subject component"
            , type: "warning"
            , showCancelButton: true
            , confirmButtonColor: "#DD6B55"
            , confirmButtonText: "Yes, delete it!"
            , cancelButtonText: "No, cancel!"
            , closeOnConfirm: false
            , closeOnCancel: false
        }, function (isConfirm) {
            if (isConfirm) {
                subjectComponentLogic.deleteSubjectComponent(subjectComponentEntityKey).then(function (response) {
				$scope.entitySubjectComponent = {};
				$scope.save = true;
				$scope.update = false;
				$scope.subjectComponentForm.$setPristine();
				$scope.subjectComponentForm.$setUntouched();
				
                    SweetAlert.swal({
                        title: "Subject Component"
                        , text: "Deleted successfully"
                        , type: "success"
                        , confirmButtonColor: "#007AFF"
                    });
                    refresh();
                }, function (err) {
                    appLogger.error('ERR', err);
                });
            }
            else {
                SweetAlert.swal({
                    title: "Cancelled"
                    , text: "Your subject component is safe :)"
                    , type: "error"
                    , confirmButtonColor: "#007AFF"
                });
            }
        });
        
        
        
		
	};

}); // End of App Controller

