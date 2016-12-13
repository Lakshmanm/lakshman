/*//=============================================================================
// All rights reserved to Thrill Innovative Labs.
// THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
// OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
// LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
// FITNESS FOR A PARTICULAR PURPOSE.
//=============================================================================
//*****************************************************************************
//* Name		    	: Cours.Controller.js 
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

var app = angular.module('ThrillAcademic.cours', ['ThrillAcademic.coursLogic'
	, 'ngCordova'
	, 'ThrillAcademic.groupLogic'
			 , 'ThrillFrameworkLibrary.geo'
			 , 'ThrillFrameworkLibrary.Network'
			 , 'ThrillCnnWebClient.appConfig'
			 , 'ThrillFrameworkLibrary.appLogger'
			 , 'ThrillAcademic.boardLogic'
			 , 'ThrillAcademic.groupLogic'
])
/*Setup cours Controller */
app.controller('CoursController', function ($scope, $http, coursLogic, groupLogic, $state, $stateParams, $localStorage, boardLogic, SweetAlert, appConfig, appLogger) {


	getLabels(appConfig.CULTURE_NAME);
	getMessages(appConfig.CULTURE_NAME);
	getAllBoards();

	/*get labels with selected language*/
	function getLabels(cultureName) {
		var currentFileName = "Cours";
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

		$scope.labelsCours = data.labels;

	};
	$scope.save = true;
	$scope.update = false;

	var entitykey = DrawCaptcha();
	var coursEntityKey;

	   function getAllBoards() {
		boardLogic.getAllBoards($localStorage.organizationKey).then(function (response) {
			$scope.boardList = response;
		})
	}

	$scope.getBoardGroups = function (boardKey) {
		groupLogic.getBoardGroups(boardKey).then(function (response) {
			$scope.groupList = response;
		})
	}

	/*Perform the CRUD (Create, Read, Update & Delete) operations of Cours*/
	/*Method for calling  add Cours */
	$scope.addCours = function () {
		if (appConfig.APP_MODE == 'offline') {
			$scope.entityCours.courseKey = entitykey;
		}
		$scope.entityCours.createdAppKey = "3il_App_Key";
		$scope.entityCours.createdUserKey = "3il_User_Key";
		$scope.entityCours.instanceOrganizationKey = $localStorage.organizationKey;
		delete $scope.entityCours.boardKey;


		coursLogic.addCours($scope.entityCours).then(function (response) {
			//appLogger.alert($scope.alertMessageLabels.coursSaved);
			$scope.entityCours = {};
			refresh();
			$scope.courseForm.$setPristine();
			$scope.courseForm.$setUntouched();
			$scope.save = true;
			$scope.update = false;
			SweetAlert.swal({
				title: "Course",
				text: "Saved successfully",
				type: "success",
				confirmButtonColor: "#007AFF"
			});
		}, function (err) {
			appLogger.error('ERR', err);
		});
	};

	/*
	 function getGroup() {
		groupLogic.getAllGroups().then(function (response) {
		$scope.groupList=response;    
	   	
	}, function (err) {
		appLogger.error('ERR', err);
		});
}
	getGroup();*/

	/*Method for calling  update Cours*/
	$scope.updateCours = function () {
		delete $scope.entityCours.boardKey;
		coursLogic.updateCours($scope.entityCours, $scope.entityCours.courseKey).then(function (response) {
			//appLogger.alert($scope.alertMessageLabels.coursUpdated);
			$scope.entityCours = {};
			refresh();
			$scope.save = true;
			$scope.update = false;
			$scope.courseForm.$setPristine();
			$scope.courseForm.$setUntouched();
			SweetAlert.swal({
				title: "Course",
				text: "Updated successfully",
				type: "success",
				confirmButtonColor: "#007AFF"
			});

		}, function (err) {
			appLogger.error('ERR', err);
		});
	};


	$scope.organizationList = [{ "instanceorganizationtitle": "org 1", "instanceorganizationkey": "0829a334-5e27-11e6-9186-41e6368e6666" }, { "instanceorganizationtitle": "org 2", "instanceorganizationkey": "0829a334-5e27-33e6-4444-41e6368e2437" }, { "instanceorganizationtitle": "org 3", "instanceorganizationkey": "0829a334-5e27-33e6-9186-41e6368e9999" }];

	//$scope.groupList=[{"grouptitle":"org 1","groupkey":"0829a334-5e27-11e6-9186-41e6368e6666"},{ "grouptitle":"org 2","groupkey":"0829a334-5e27-33e6-4444-41e6368e2437"},{ "grouptitle":"org 3","groupkey":"0829a334-5e27-33e6-9186-41e6368e9999"}];


	/*Method for  retrieving  Cours details*/
	$scope.editCours = function (courseKey) {
		$scope.save = false;
		$scope.update = true;
		coursLogic.getCoursByCourseKey(courseKey).then(function (response) {
			console.log(response);
			$scope.getBoardGroups(response[0].boardKey);

			$scope.entityCours = {};
			$scope.entityCours.courseKey = response[0].courseKey;
			$scope.entityCours.courseTitle = response[0].courseTitle;
			$scope.entityCours.groupKey = response[0].groupKey;
			$scope.entityCours.boardKey = response[0].boardKey;
			$scope.entityCours.instanceOrganizationKey = response[0].instanceOrganizationKey;




		}, function (err) {
			appLogger.error('ERR', err);
		});
	}

	var refresh = function () {
		coursLogic.getAllCourses($localStorage.organizationKey).then(function (response) {
			$scope.coursCollection = response;
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


	/*Method for calling  deleting   Cours*/
	$scope.deleteCours = function (coursEntityKey) {

		SweetAlert.swal({
			title: "Are you sure?"
			, text: "Your want to delete this course"
			, type: "warning"
			, showCancelButton: true
			, confirmButtonColor: "#DD6B55"
			, confirmButtonText: "Yes, delete it!"
			, cancelButtonText: "No, cancel!"
			, closeOnConfirm: false
			, closeOnCancel: false
		}, function (isConfirm) {
			if (isConfirm) {
				coursLogic.deleteCours(coursEntityKey).then(function (response) {
					$scope.entityCours = {};
					$scope.save = true;
					$scope.update = false;
					$scope.courseForm.$setPristine();
					$scope.courseForm.$setUntouched();

					SweetAlert.swal({
						title: "Course"
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
					, text: "Your course is safe :)"
					, type: "error"
					, confirmButtonColor: "#007AFF"
				});
			}
		});






	};

}); // End of App Controller

