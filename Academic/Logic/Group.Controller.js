/*//=============================================================================
// All rights reserved to Thrill Innovative Labs.
// THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
// OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
// LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
// FITNESS FOR A PARTICULAR PURPOSE.
//=============================================================================
//*****************************************************************************
//* Name		    	: Group.Controller.js 
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

var app = angular.module('ThrillAcademic.group', ['ThrillAcademic.groupLogic'

			 , 'ngCordova'
			 ,'ngStorage'
			 , 'ThrillFrameworkLibrary.geo'
			 , 'ThrillFrameworkLibrary.Network'
			 , 'ThrillCnnWebClient.appConfig'
			 , 'ThrillFrameworkLibrary.appLogger'
			 , 'ThrillAcademic.boardLogic'
])
/*Setup group Controller */
app.controller('GroupController', function ($scope, $http, groupLogic, $state, $stateParams,$localStorage,boardLogic ,SweetAlert,appConfig, appLogger) {


	getLabels(appConfig.CULTURE_NAME);
	getMessages(appConfig.CULTURE_NAME);
	getAllBoards();

	/*get labels with selected language*/
    function getLabels(cultureName) {
        var currentFileName = "Group";
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


		$scope.labelsGroup = data.labels;

	};
	$scope.save = true;
	$scope.update = false;

	var entitykey = DrawCaptcha();
	var groupEntityKey;

     function getAllBoards(){
         boardLogic.getAllBoards($localStorage.organizationKey).then(function(response){
             $scope.boardList = response;
		 })
	 }

    /*Perform the CRUD (Create, Read, Update & Delete) operations of Group*/
	/*Method for calling  add Group */
	$scope.addGroup = function () {
		if (appConfig.APP_MODE == 'offline') {
			$scope.entityGroup.groupKey = entitykey;
		}
		$scope.entityGroup.createdAppKey = "3il_App_Key";
		$scope.entityGroup.createdUserKey = "3il_User_Key";
        $scope.entityGroup.instanceOrganizationKey = $localStorage.organizationKey;

		groupLogic.addGroup($scope.entityGroup).then(function (response) {
			//appLogger.alert($scope.alertMessageLabels.groupSaved);
			$scope.entityGroup = {};
			$scope.groupForm.$setPristine();
			$scope.groupForm.$setUntouched();
			$scope.save = true;
			$scope.update = false;
			SweetAlert.swal({
                title: "Group",
                text: "Saved successfully",
                type: "success",
                confirmButtonColor: "#007AFF"
            });
           refresh();

		}, function (err) {
			appLogger.error('ERR', err);
		});
	};

	/*Method for calling  update Group*/
	$scope.updateGroup = function () {
		groupLogic.updateGroup($scope.entityGroup, $scope.entityGroup.groupKey).then(function (response) {
			//appLogger.alert($scope.alertMessageLabels.groupUpdated);
			$scope.entityGroup = {};
			$scope.groupForm.$setPristine();
			$scope.groupForm.$setUntouched();
			$scope.save = true;
			$scope.update = false;
			SweetAlert.swal({
                title: "Group",
                text: "Updated successfully",
                type: "success",
                confirmButtonColor: "#007AFF"
            });
           refresh();
		}, function (err) {
			appLogger.error('ERR', err);
		});
	};

	$scope.organizationList = [{ "instanceorganizationtitle": "org 1", "instanceorganizationkey": "0829a334-5e27-11e6-9186-41e6368e6666" }, { "instanceorganizationtitle": "org 2", "instanceorganizationkey": "0829a334-5e27-33e6-4444-41e6368e2437" }, { "instanceorganizationtitle": "org 3", "instanceorganizationkey": "0829a334-5e27-33e6-9186-41e6368e9999" }];

	//$scope.boardList = [{ "boardtitle": "org 1", "boardkey": "0829a334-5e27-11e6-9186-41e6368e6666" }, { "boardtitle": "org 2", "boardkey": "0829a334-5e27-33e6-4444-41e6368e2437" }, { "boardtitle": "org 3", "boardkey": "0829a334-5e27-33e6-9186-41e6368e9999" }];
     



	/*Method for  retrieving  Group details*/
	$scope.editGroup = function (groupKey) {
		$scope.save = false;
		$scope.update = true;
		groupLogic.getGroupByGroupKey(groupKey).then(function (response) {
			$scope.entityGroup = {};
			$scope.entityGroup.groupKey = response[0].groupKey;
			$scope.entityGroup.groupTitle = response[0].groupTitle;
			$scope.entityGroup.boardKey = response[0].boardKey;
			$scope.entityGroup.instanceOrganizationKey = response[0].instanceOrganizationKey;
		}, function (err) {
			appLogger.error('ERR', err);
		});
	}


	var refresh = function () {
		groupLogic.getAllGroups($localStorage.organizationKey).then(function (response) {
		
			$scope.groupCollection = response;
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


	/*Method for calling  deleting   Group*/
	$scope.deleteGroup = function (groupEntityKey) {
SweetAlert.swal({
            title: "Are you sure?"
            , text: "Your want to delete this group"
            , type: "warning"
            , showCancelButton: true
            , confirmButtonColor: "#DD6B55"
            , confirmButtonText: "Yes, delete it!"
            , cancelButtonText: "No, cancel!"
            , closeOnConfirm: false
            , closeOnCancel: false
        }, function (isConfirm) {
            if (isConfirm) {
                groupLogic.deleteGroup(groupEntityKey).then(function (response) {
                    $scope.entityGroup = {};
			$scope.groupForm.$setPristine();
			$scope.groupForm.$setUntouched();
			$scope.save = true;
			$scope.update = false;
				
                    SweetAlert.swal({
                        title: "Group"
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
                    , text: "Your group is safe :)"
                    , type: "error"
                    , confirmButtonColor: "#007AFF"
                });
            }
        });





		
	};

}); // End of App Controller

