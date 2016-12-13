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
var app = angular.module('ThrillInstitute.instituteGroup', ['ThrillAcademic.groupLogic'
              , 'ThrillInstitute.instituteGroupLogic'
			 , 'ngCordova'
			 , 'ngStorage'
			 , 'ThrillFrameworkLibrary.geo'
			 , 'ThrillFrameworkLibrary.Network'
			 , 'ThrillCnnWebClient.appConfig'
			 , 'ThrillFrameworkLibrary.appLogger'
			 , 'ThrillAcademic.boardLogic'
])
    /*Setup group Controller */
app.controller('instituteGroupController', function ($scope, instituteGroupLogic, $http, groupLogic, $state, $stateParams, $localStorage, boardLogic, SweetAlert, appConfig, appLogger) {
    getLabels(appConfig.CULTURE_NAME);
    getMessages(appConfig.CULTURE_NAME);
    getAllBoards();
    /*get labels with selected language*/
    function getLabels(cultureName) {
        var currentFileName = "Group";
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
        $scope.labelsGroup = data.labels;
    };
    $scope.save = true;
    $scope.update = false;
    var entitykey = DrawCaptcha();
    var groupEntityKey;
 $scope.savebtn=true;



if($localStorage.RoleID==2)
    {
        
        $scope.savebtn=false;
    }
    else{
         $scope.savebtn=true;
           
    }
    

    function getAllBoards() {
        boardLogic.getAllBoards($localStorage.organizationKey).then(function (response) {
            $scope.boardList = response;
        })
    }
    /*Perform the CRUD (Create, Read, Update & Delete) operations of Group*/
    /*Method for calling  add Group */
    /*$scope.addGroup = function () {
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
*/
    $scope.organizationList = [{
        "instanceorganizationtitle": "org 1"
        , "instanceorganizationkey": "0829a334-5e27-11e6-9186-41e6368e6666"
    }, {
        "instanceorganizationtitle": "org 2"
        , "instanceorganizationkey": "0829a334-5e27-33e6-4444-41e6368e2437"
    }, {
        "instanceorganizationtitle": "org 3"
        , "instanceorganizationkey": "0829a334-5e27-33e6-9186-41e6368e9999"
    }];
    //$scope.boardList = [{ "boardtitle": "org 1", "boardkey": "0829a334-5e27-11e6-9186-41e6368e6666" }, { "boardtitle": "org 2", "boardkey": "0829a334-5e27-33e6-4444-41e6368e2437" }, { "boardtitle": "org 3", "boardkey": "0829a334-5e27-33e6-9186-41e6368e9999" }];
    /*

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
    	refresh();*/
    $scope.saveGroup = function (entityGroup) {
        var group = [];
        var board = [];
        var object = {};
        for (var i = 0; i < entityGroup.length; i++) {
            if (entityGroup[i].groupCheck == true) {
                board.push(entityGroup[i].instituteBoardKey)
                group.push(entityGroup[i].groupKey);
                object = {
                    boardKey: board
                    , groupKey: group
                    , instituteKey: $localStorage.instituteKey
                }
            }
            if (i == (entityGroup.length) - 1) {
                instituteGroupLogic.addInstituteGroup(object).then(function (response) {
                    SweetAlert.swal({
                        title: "Group"
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
    var mainresp = {};
    var secondresp = {};
    // method for boardLogic
    function getGroup() {
        groupLogic.getGroupsByInstituteBoardKey($localStorage.instituteKey).then(function (response) {
            console.log(response);
            var array = [];
            for (var i = 0; i < response.length; i++) {
                var object = {
                    instituteBoardKey: response[i].instituteboardkey
                    , boardTitle: response[i].boardTitle
                    , groupKey: response[i].groupKey
                    , groupTitle: response[i].groupTitle
                    , groupCheck: false
                }
                array.push(object);
                if (i == (response.length) - 1) {
                    mainresp = {
                        data: array
                    }
                }
            }
            if ($stateParams.instituteKey != undefined) {
                instituteGroupLogic.getGroupByInstituteKey($stateParams.instituteKey).then(function (resp) {
                    console.log(resp);
                    var sarray = [];
                    for (var i = 0; i < resp.length; i++) {
                        var object = {
                            instituteBoardKey: resp[i].InstituteBoardKey
                            , boardTitle: resp[i].boardTitle
                            , groupKey: resp[i].GroupKey
                            , groupTitle: resp[i].GroupTitle
                            , groupCheck: true
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
                            if (item.groupKey == data[i].groupKey) {
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
                    $scope.groupCollection = final.data;
                })
            }
            else {
                $scope.groupCollection = response;
            }
        }, function (err) {
            appLogger.error('ERR', err);
        });
    }
    getGroup();
}); // End of App Controller