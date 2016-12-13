/*//=============================================================================
// All rights reserved to Thrill Innovative Labs.
// THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
// OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
// LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
// FITNESS FOR A PARTICULAR PURPOSE.
//=============================================================================
//*****************************************************************************
//* Name		    	: Board.Controller.js 
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

var app = angular.module('ThrillAcademic.board', ['ThrillAcademic.boardLogic'
			 , 'ngCordova'
			 , 'ngStorage'
			 , 'ThrillFrameworkLibrary.geo'
			 , 'ThrillFrameworkLibrary.Network'
			 , 'ThrillCnnWebClient.appConfig'
			 , 'ThrillFrameworkLibrary.appLogger'
])
/*Setup board Controller */
app.controller('BoardController', function ($scope, $http, boardLogic, $state, $localStorage, $stateParams, appConfig, appLogger, SweetAlert) {
	
	getLabels(appConfig.CULTURE_NAME);
	getMessages(appConfig.CULTURE_NAME);
	/*get labels with selected language*/
    function getLabels(cultureName) {


        var currentFileName = "Board";
        //console.log("Academic/Languages/" + currentFileName + "." + cultureName + ".json");
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


		$scope.labelsBoard = data.labels;

	};
	$scope.save = true;
	$scope.update = false;

	var entitykey = DrawCaptcha();
	var boardEntityKey;

    /*Perform the CRUD (Create, Read, Update & Delete) operations of Board*/
	/*Method for calling  add Board */
	$scope.addBoard = function () {
		if (appConfig.APP_MODE == 'offline') {
			$scope.entityBoard.boardKey = entitykey;
		}
		$scope.entityBoard.instanceOrganizationKey = $localStorage.organizationKey;
		boardLogic.addBoard($scope.entityBoard).then(function (response) {
			//console.log($scope.entityBoard);

            $scope.entityBoard = {};
			refresh();
			$scope.save = true;
			$scope.update = false;
			
          $scope.boardForm.$setPristine();
          $scope.boardForm.$setUntouched();

			SweetAlert.swal({
                title: "Board",
                text: "Saved successfully",
                type: "success",
                confirmButtonColor: "#007AFF"
            });//appLogger.alert($scope.alertMessageLabels.boardSaved);
		}, function (err) {
			appLogger.error('ERR', err);
		});
	};

	

	/*Method for calling  update Board*/
	$scope.updateBoard = function () {
		boardLogic.updateBoard($scope.entityBoard, $scope.entityBoard.boardKey).then(function (response) {
			$scope.entityBoard = {};
			refresh();
			$scope.save = true;
			$scope.update = false;
			$scope.boardForm.$setPristine();
          $scope.boardForm.$setUntouched();

			SweetAlert.swal({
                title: "Board",
                text: "Updated successfully",
                type: "success",
                confirmButtonColor: "#007AFF"
            });

			//appLogger.alert($scope.alertMessageLabels.boardUpdated);

		}, function (err) {
			appLogger.error('ERR', err);
		});
	};

	// $scope.organizationList = [{ "instanceorganizationtitle": "org 1", "instanceorganizationkey": "0829a334-5e27-11e6-9186-41e6368e6666" }, { "instanceorganizationtitle": "org 2", "instanceorganizationkey": "0829a334-5e27-33e6-4444-41e6368e2437" }, { "instanceorganizationtitle": "org 3", "instanceorganizationkey": "0829a334-5e27-33e6-9186-41e6368e9999" }];

	// $scope.boardCollections = [{ "boardtitle": "org 1", "boardorganizationkey": "0829a334-5e27-11e6-9186-41e6368e6666" }, { "boardtitle": "org 2", "boardorganizationkey": "0829a334-5e27-33e6-4444-41e6368e2437" }, { "boardtitle": "org 3", "boardorganizationkey": "0829a334-5e27-33e6-9186-41e6368e9999" }];




	/*Method for  retrieving  Board details*/
	$scope.editBoard = function (boardKey) {
		$scope.save = false;
		$scope.update = true;
		boardLogic.getBoardByBoardKey(boardKey).then(function (response) {

			$scope.entityBoard = {};
			$scope.entityBoard.boardKey = response[0].boardKey;
			$scope.entityBoard.boardTitle = response[0].boardTitle;
			$scope.entityBoard.boardOrganizationKey = response[0].boardOrganizationKey;
			$scope.entityBoard.instanceOrganizationKey = response[0].instanceOrganizationKey;
		}, function (err) {
			appLogger.error('ERR', err);
		});
	}


	var refresh = function () {

		boardLogic.getAllBoards($localStorage.organizationKey).then(function (response) {
			$scope.boardCollection = response;
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


	/*Method for calling  deleting   Board*/
	$scope.deleteBoard = function (boardEntityKey) {
SweetAlert.swal({
            title: "Are you sure?"
            , text: "Your want to delete this board"
            , type: "warning"
            , showCancelButton: true
            , confirmButtonColor: "#DD6B55"
            , confirmButtonText: "Yes, delete it!"
            , cancelButtonText: "No, cancel!"
            , closeOnConfirm: false
            , closeOnCancel: false
        }, function (isConfirm) {
            if (isConfirm) {
                boardLogic.deleteBoard(boardEntityKey).then(function (response) {
                    $scope.entityBoard = {};
				$scope.save = true;
				$scope.update = false;
				$scope.boardForm.$setPristine();
				$scope.boardForm.$setUntouched();
				
                    SweetAlert.swal({
                        title: "Board"
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
                    , text: "Your board is safe :)"
                    , type: "error"
                    , confirmButtonColor: "#007AFF"
                });
            }
        });




		
	};

	

}); // End of App Controller

