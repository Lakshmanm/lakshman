/*//=============================================================================
// All rights reserved to Thrill Innovative Labs.
// THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
// OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
// LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
// FITNESS FOR A PARTICULAR PURPOSE.
//=============================================================================
//*****************************************************************************
//* Name		    	: ElectiveGroup.Controller.js 
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
var app = angular.module('ThrillInstitute.instituteElectiveGroup', ['ThrillAcademic.electiveGroupLogic'
			 , 'ThrillAcademic.termLogic'
			 , 'ngCordova'
         , 'ThrillInstitute.instituteElectiveGroupLogic'
	, 'ThrillAcademic.boardLogic'
	, 'ThrillAcademic.groupLogic'
	, 'ThrillAcademic.coursLogic'

			 , 'ThrillFrameworkLibrary.geo'
			 , 'ThrillFrameworkLibrary.Network'
			 , 'ThrillCnnWebClient.appConfig'
			 , 'ThrillFrameworkLibrary.appLogger'
])
    /*Setup electiveGroup Controller */
app.controller('instituteElectiveGroupController', function ($scope, instituteElectiveGroupLogic, $http, termLogic, boardLogic, groupLogic, coursLogic, electiveGroupLogic, $state, $stateParams, $localStorage, SweetAlert, appConfig, appLogger) {
    getLabels(appConfig.CULTURE_NAME);
    getMessages(appConfig.CULTURE_NAME);
    /*get labels with selected language*/
    function getLabels(cultureName) {
        var currentFileName = "ElectiveGroup";
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
        /*var labels = {
		electiveGroupTitle: data.labels.electiveGroupTitle,
		minimumSubjects: data.labels.minimumSubjects,
		maximumSubjects: data.labels.maximumSubjects,
		submit: data.labels.submit,
		electiveGroupHeading: data.labels.electiveGroupHeading
	};*/
        $scope.labelsElectiveGroup = data.labels;
    };
    $scope.save = true;
    $scope.update = false;
    var entitykey = DrawCaptcha();
    var electiveGroupEntityKey;
    /*  function getTerm() {
    	   termLogic.getAllTerms().then(function (response) {
    	  $scope.termList=response;	
       }, function (err) {
    	   appLogger.error('ERR', err);
    	   
       });
    }
       getTerm();*/
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
        /*
        var refresh = function () {
        			 electiveGroupLogic.getAllElectiveGroups($localStorage.organizationKey).then(function (response) {
        		$scope.electiveGroupCollection = response;
        		console.log(response);

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
    var mainresp = {};
    var secondresp = {};
    // method for boardLogic

if($localStorage.RoleID==2)
    {
        
        $scope.savebtn=false;
    }
    else{
         $scope.savebtn=true;
           
    }
    


    
    function getBoard() {
        electiveGroupLogic.getAllElectiveGroups($localStorage.organizationKey).then(function (response) {
            var array = [];
            for (var i = 0; i < response.length; i++) {
                var object = {
                    minimumSubjects: response[i].minimumSubjects
                    , maximumSubjects: response[i].maximumSubjects
                    , electiveGroupKey: response[i].electiveGroupKey
                    , electiveGroupTitle: response[i].electiveGroupTitle
                    , electiveGroupCheck: false
                }
                array.push(object);
                if (i == (response.length) - 1) {
                    mainresp = {
                        data: array
                    }
                }
            }
            if ($stateParams.instituteKey != undefined) {
                instituteElectiveGroupLogic.getElectiveGroupByInstituteKey($stateParams.instituteKey).then(function (resp) {
                    var sarray = [];
                    for (var i = 0; i < resp.length; i++) {
                        var object = {
                            minimumSubjects: resp[i].MinimumSubjects
                            , maximumSubjects: resp[i].MaximumSubjects
                            , electiveGroupKey: resp[i].ElectiveGroupKey
                            , electiveGroupTitle: resp[i].ElectiveGroupTitle
                            , electiveGroupCheck: true
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
                            if (item.electiveGroupKey == data[i].electiveGroupKey) {
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
                    $scope.electiveGroupCollection = final.data;
                })
            }
            else {
                $scope.electiveGroupCollection = response;
            }
        }, function (err) {
            appLogger.error('ERR', err);
        });
    }
    getBoard();
    $scope.saveElectiveGroup = function (entityElectiveGroup) {
        var object = {};
        var electiveGroupKey = [];
        for (var i = 0; i < entityElectiveGroup.length; i++) {
            if (entityElectiveGroup[i].electiveGroupCheck == true) {
                electiveGroupKey.push(entityElectiveGroup[i].electiveGroupKey);
                object = {
                    electiveGroupKey: electiveGroupKey
                    , instituteKey: $localStorage.instituteKey
                }
            }
            if (i == (entityElectiveGroup.length) - 1) {
                instituteElectiveGroupLogic.addInstituteElectiveGroup(object).then(function (response) {
                    SweetAlert.swal({
                        title: "Elective Group"
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
}); // End of App Controller