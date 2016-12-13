/*//=============================================================================
// All rights reserved to Thrill Innovative Labs.
// THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
// OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
// LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
// FITNESS FOR A PARTICULAR PURPOSE.
//=============================================================================
//*****************************************************************************
//* Name		    	: ExaminationType.Controller.js 
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

var app = angular.module('ThrillAcademic.examinationType', ['ThrillAcademic.examinationTypeLogic'

			 , 'ngCordova'
			 , 'ThrillFrameworkLibrary.geo'
			 , 'ThrillFrameworkLibrary.Network'
			 , 'ThrillCnnWebClient.appConfig'
			 , 'ThrillFrameworkLibrary.appLogger'
])
/*Setup examinationType Controller */
app.controller('ExaminationTypeController', function ($scope, $http, SweetAlert, $localStorage, examinationTypeLogic, $state, $stateParams, appConfig, appLogger) {
	getLabels(appConfig.CULTURE_NAME);
	getMessages(appConfig.CULTURE_NAME);

	/*get labels with selected language*/
	function getLabels(cultureName) {
		var currentFileName = "ExaminationType";
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

		$scope.labelsExaminationType = data.labels;

	};

	$scope.save = true;
	$scope.update = false;

	var entitykey = DrawCaptcha();
	var examinationTypeEntityKey;
	$scope.ExaminationLevel = [{ "Title": "Organization Level", "Id": "1" }, { "Title": "Institute Level", "Id": "2" }]
	$scope.Organizations = [{ "Title": "Organization 1", "Id": "1" }, { "Title": "Organization 2", "Id": "2" }, { "Title": "Organization 3", "Id": "3" }]
	/*Perform the CRUD (Create, Read, Update & Delete) operations of ExaminationType*/
	/*Method for calling  add ExaminationType */
	$scope.addExaminationType = function () {
		$scope.entityExaminationType.CreatedUserKey = "new-User-My3";
		$scope.entityExaminationType.CreatedAppKey = "new-App-mCampuZ";
		$scope.entityExaminationType.instanceOrganizationKey = $localStorage.organizationKey;


		if (appConfig.APP_MODE == 'offline') {
			$scope.entityExaminationType.examinationTypeKey = entitykey;
		}
		examinationTypeLogic.addExaminationType($scope.entityExaminationType).then(function (response) {
			$scope.entityExaminationType = {};
			$scope.save = true;
			$scope.update = false;
			$scope.examinationTypeForm.$setPristine();
			$scope.examinationTypeForm.$setUntouched();
			SweetAlert.swal({
				title: "Examination Type",
				text: "Saved successfully",
				type: "success",
				confirmButtonColor: "#007AFF"
			});
			refresh();
		}, function (err) {
			appLogger.error('ERR', err);
		});
	};

	/*Method for calling  update ExaminationType*/
	$scope.updateExaminationType = function () {
		$scope.entityExaminationType.LastUpdatedUserKey = "new-User-My3";
		$scope.entityExaminationType.LastUpdatedAppKey = "new-App-mCampuZ";

		examinationTypeLogic.updateExaminationType($scope.entityExaminationType, $scope.entityExaminationType.examinationTypeKey).then(function (response) {
			//alert("Updated Successfully")
			$scope.entityExaminationType = {};
			$scope.save = true;
			$scope.update = false;
			$scope.examinationTypeForm.$setPristine();
			$scope.examinationTypeForm.$setUntouched();
			SweetAlert.swal({
				title: "Examination Type",
				text: "Updated successfully",
				type: "success",
				confirmButtonColor: "#007AFF"
			});
			refresh();


		}, function (err) {
			appLogger.error('ERR', err);
		});
	};

	/*Method for  retrieving  ExaminationType details*/
	$scope.editExaminationType = function (examinationTypeKey) {
		examinationTypeLogic.getExaminationTypeByExaminationTypeKey(examinationTypeKey).then(function (response) {

			$scope.save = false;
			$scope.update = true;
			$scope.entityExaminationType = response[0];
			$scope.entityExaminationType.examinationTypeKey = response[0].examinationTypeKey;
			$scope.entityExaminationType.examinationTypeTitle = response[0].examinationTypeTitle;
			$scope.entityExaminationType.instanceOrganizationKey = response[0].instanceOrganizationKey;
			$scope.entityExaminationType.examinationLevelKey = response[0].examinationLevelKey;
           // $scope.entityExaminationType.examinationLevelKey = response[0].examinationLevelKey;
		}, function (err) {
			appLogger.error('ERR', err);
		});
	}

	var refresh = function () {

		examinationTypeLogic.getAllExaminationTypes($localStorage.organizationKey).then(function (response) {
			$scope.examinationTypeCollection = response;
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


	/*Method for calling  deleting   ExaminationType*/
	$scope.deleteExaminationType = function (examinationTypeEntityKey) {
		SweetAlert.swal({
			title: "Are you sure?"
			, text: "Your want to delete this examination type"
			, type: "warning"
			, showCancelButton: true
			, confirmButtonColor: "#DD6B55"
			, confirmButtonText: "Yes, delete it!"
			, cancelButtonText: "No, cancel!"
			, closeOnConfirm: false
			, closeOnCancel: false
		}, function (isConfirm) {
			if (isConfirm) {
				examinationTypeLogic.deleteExaminationType(examinationTypeEntityKey).then(function (response) {
					$scope.entityExaminationType = {};
					$scope.save = true;
					$scope.update = false;
					$scope.examinationTypeForm.$setPristine();
					$scope.examinationTypeForm.$setUntouched();

					SweetAlert.swal({
						title: "Examination Type"
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
					, text: "Your examination type is safe :)"
					, type: "error"
					, confirmButtonColor: "#007AFF"
				});
			}
		});









	};


}); // End of App Controller

