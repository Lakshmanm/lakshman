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
var app = angular.module('ThrillInstitute.instituteBoard', ['ThrillAcademic.boardLogic'
			 , 'ngCordova'
			 , 'ngStorage'
              , 'ThrillInstitute.instituteBoardLogic'
			 , 'ThrillFrameworkLibrary.geo'
			 , 'ThrillFrameworkLibrary.Network'
			 , 'ThrillCnnWebClient.appConfig'
			 , 'ThrillFrameworkLibrary.appLogger'
])
    /*Setup board Controller */
app.controller('instituteBoardController', function ($scope, $http, instituteBoardLogic, boardLogic, $state, $localStorage, $stateParams, appConfig, appLogger, SweetAlert) {
    getLabels(appConfig.CULTURE_NAME);
    getMessages(appConfig.CULTURE_NAME);
    /*get labels with selected language*/
    function getLabels(cultureName) {
        var currentFileName = "Board";
        $http.get("Institute/Languages/" + currentFileName + "." + cultureName + ".json").then(function (response) {
            bindLabels(response.data);
        });
    }

    function getMessages(cultureName) {
        var alertMessageName = "AlertMessages";
        $http.get("Institute/Languages/" + alertMessageName + "." + cultureName + ".json").then(function (response) {
            $scope.alertMessageLabels = response.data.messages;
        });
    }
    /*bind labels with selected language */
    function bindLabels(data) {
        $scope.labelsBoard = data.labels;
        console.log($scope.labelsBoard);
    };
    $scope.save = true;
    $scope.update = false;
    var entitykey = DrawCaptcha();
    var boardEntityKey;
    $scope.savebtn=true;
    /*Perform the CRUD (Create, Read, Update & Delete) operations of Board*/
    /*Method for calling  add Board */
    /*$scope.addBoard = function () {
		if (appConfig.APP_MODE == 'offline') {
			$scope.entityBoard.boardKey = entitykey;
		}
		$scope.entityBoard.instanceOrganizationKey = $localStorage.organizationKey;
		boardLogic.addBoard($scope.entityBoard).then(function (response) {
			console.log($scope.entityBoard);

            $scope.entityBoard = {};
			refresh();
			$scope.save = true;
			$scope.update = false;
			$scope.boardForm.$setPristine();

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
*/
    var mainresp = {};
    var secondresp = {};
    // method for boardLogic



    if($localStorage.RoleID==2)
    {
        $scope.details=true;
        $scope.savebtn=false;
    }
    else{
         $scope.savebtn=true;
           $scope.details=false;
    }
    function getBoard() {
        boardLogic.getAllBoards($localStorage.organizationKey).then(function (response) {
            var array = [];
            for (var i = 0; i < response.length; i++) {
                var object = {
                    boardKey: response[i].boardKey
                    , boardTitle: response[i].boardTitle
                    , boardCheck: false
                }
                array.push(object);
                if (i == (response.length) - 1) {
                    mainresp = {
                        data: array
                    }
                }
            }
            if ($stateParams.instituteKey != undefined) {
                instituteBoardLogic.getBoardByInstituteKey($stateParams.instituteKey).then(function (resp) {
                    var sarray = [];
                    for (var i = 0; i < resp.length; i++) {
                        var object = {
                            boardKey: resp[i].BoardKey
                            , boardTitle: resp[i].BoardTitle
                            , boardCheck: true
                        }
                        sarray.push(object);
                        if (i == (resp.length) - 1) {
                            secondresp = {
                                data: sarray
                            }
                        }
                    }

                    function merge(secondresp, mainresp) {
                        if (!secondresp.data) return {
                            data: mainresp.data
                        };
                        if (!mainresp.data) return {
                            data: secondresp.data
                        };
                        var final = {
                            data: secondresp.data
                        };
                        // merge
                        for (var i = 0; i < mainresp.data.length; i++) {
                            var item = mainresp.data[i];
                            insert(item, final);
                        }
                        return final;
                    }

                    function insert(item, obj) {
                        var data = obj.data;
                        var insertIndex = data.length;
                        for (var i = 0; i < data.length; i++) {
                            if (item.boardKey == data[i].boardKey) {
                                // ignore duplicates
                                insertIndex = -1;
                                break;
                            }
                        }
                        if (insertIndex == data.length) {
                            data.push(item);
                        }
                        else if (insertIndex != -1) {
                            data.splice(insertIndex, 0, item);
                        }
                    }
                    var final = merge(secondresp, mainresp);
                    $scope.boardCollection = final.data;
                })
            }
            else {
                $scope.boardCollection = response;
            }
        }, function (err) {
            appLogger.error('ERR', err);
        });
    }
    getBoard();
    $scope.saveBoard = function (entityBoard) {
            var object = {};
            var boardKey = [];
            for (var i = 0; i < entityBoard.length; i++) {
                if (entityBoard[i].boardCheck == true) {
                    boardKey.push(entityBoard[i].boardKey);
                    console.log(boardKey);
                    object = {
                        boardKey: boardKey
                        , instituteKey: $localStorage.instituteKey
                    }
                }
                if (i == (entityBoard.length) - 1) {
                    instituteBoardLogic.addInstituteBoard(object).then(function (response) {
                        SweetAlert.swal({
                            title: "Board"
                            , text: "Assigned successfully"
                            , type: "success"
                            , confirmButtonColor: "#007AFF"
                        });
                    }, function (err) {
                        appLogger.error('ERR', err);
                    });
                }
            }
        }
        /*Method for calling  update Board*/
        /*$scope.updateBoard = function () {
		boardLogic.updateBoard($scope.entityBoard, $scope.entityBoard.boardKey).then(function (response) {
			$scope.entityBoard = {};
			refresh();
			$scope.save = true;
			$scope.update = false;
			$scope.boardForm.$setPristine();
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

	$scope.organizationList = [{ "instanceorganizationtitle": "org 1", "instanceorganizationkey": "0829a334-5e27-11e6-9186-41e6368e6666" }, { "instanceorganizationtitle": "org 2", "instanceorganizationkey": "0829a334-5e27-33e6-4444-41e6368e2437" }, { "instanceorganizationtitle": "org 3", "instanceorganizationkey": "0829a334-5e27-33e6-9186-41e6368e9999" }];

	$scope.boardCollections = [{ "boardtitle": "org 1", "boardorganizationkey": "0829a334-5e27-11e6-9186-41e6368e6666" }, { "boardtitle": "org 2", "boardorganizationkey": "0829a334-5e27-33e6-4444-41e6368e2437" }, { "boardtitle": "org 3", "boardorganizationkey": "0829a334-5e27-33e6-9186-41e6368e9999" }];


*/
        /*Method for  retrieving  Board details
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
        /*$scope.deleteBoard = function (boardEntityKey) {
		var del = confirm("Are you sure you want to Delete ?");
		if (del == true) {
			boardLogic.deleteBoard(boardEntityKey).then(function (response) {
				appLogger.alert($scope.alertMessageLabels.boardDeleted);
				$scope.entityBoard = {};
				$scope.save = true;
				$scope.update = false;
				$scope.boardForm.$setPristine();
				refresh();
			}, function (err) {
				appLogger.error('ERR', err);
			});
		}
	};
*/
        // var acc = document.getElementsByClassName("accordion");
        // var i;
        // for (i = 0; i < acc.length; i++) {
        //     acc[i].onclick = function(){
        //         this.classList.toggle("active");
        //         this.nextElementSibling.classList.toggle("show");
        //     }
        // }
}); // End of App Controller