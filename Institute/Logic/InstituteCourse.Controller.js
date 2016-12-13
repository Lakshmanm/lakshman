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
var app = angular.module('ThrillInstitute.instituteCours', ['ThrillAcademic.coursLogic'
	, 'ngCordova'
	          , 'ThrillInstitute.instituteCoursLogic'
			 , 'ThrillFrameworkLibrary.geo'
			 , 'ThrillFrameworkLibrary.Network'
			 , 'ThrillCnnWebClient.appConfig'
			 , 'ThrillFrameworkLibrary.appLogger'
			 , 'ThrillAcademic.boardLogic'
			 , 'ThrillAcademic.groupLogic'
])
    /*Setup cours Controller */
app.controller('instituteCoursController', function ($scope, instituteCoursLogic, $http, coursLogic, groupLogic, $state, $stateParams, $localStorage, boardLogic, SweetAlert, appConfig, appLogger) {
    getLabels(appConfig.CULTURE_NAME);
    getMessages(appConfig.CULTURE_NAME);
    getAllBoards();
    /*get labels with selected language*/
    function getLabels(cultureName) {
        var currentFileName = "Cours";
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
                title: "Course"
                , text: "Assigned successfully"
                , type: "success"
                , confirmButtonColor: "#007AFF"
            });
        }, function (err) {
            appLogger.error('ERR', err);
        });
    };

if($localStorage.RoleID==2)
    {
        
        $scope.savebtn=false;
    }
    else{
         $scope.savebtn=true;
           
    }
    


    $scope.saveCourse = function (entityCourse) {
            var groupKey = [];
            var courseKey = [];
            for (var i = 0; i < entityCourse.length; i++) {
                if (entityCourse[i].courseCheck == true) {
                    groupKey.push(entityCourse[i].instituteGroupKey)
                    courseKey.push(entityCourse[i].courseKey);
                    var object = {
                        groupKey: groupKey
                        , courseKey: courseKey
                        , instituteKey: $localStorage.instituteKey
                    }
                }
                if (i == (entityCourse.length) - 1) {
                    //  alert(JSON.stringify(object)) ;
                    instituteCoursLogic.addInstituteCourse(object).then(function (response) {
                        SweetAlert.swal({
                            title: "Course"
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
        /*
	 function getGroup() {
		groupLogic.getAllGroups().then(function (response) {
		$scope.groupList=response;    
	   	
	}, function (err) {
		appLogger.error('ERR', err);
		});
}
	getGroup();*/
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
    //$scope.groupList=[{"grouptitle":"org 1","groupkey":"0829a334-5e27-11e6-9186-41e6368e6666"},{ "grouptitle":"org 2","groupkey":"0829a334-5e27-33e6-4444-41e6368e2437"},{ "grouptitle":"org 3","groupkey":"0829a334-5e27-33e6-9186-41e6368e9999"}];
    /*	var refresh = function () {
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
    	refresh();*/
    var mainresp = {};
    var secondresp = {};
    // method for boardLogic
    function getCourse() {
        coursLogic.getCoursesByInstituteKey($localStorage.instituteKey).then(function (response) {
            console.log(response);
            var array = [];
            for (var i = 0; i < response.length; i++) {
                var object = {
                    groupTitle: response[i].GroupTitle
                    , instituteGroupKey: response[i].InstituteGroupKey
                    , courseKey: response[i].CourseKey
                    , courseTitle: response[i].CourseTitle
                    , courseCheck: false
                }
                array.push(object);
                if (i == (response.length) - 1) {
                    mainresp = {
                        data: array
                    }
                }
            }
            if ($stateParams.instituteKey != undefined) {
                instituteCoursLogic.getCourseByInstituteKey($stateParams.instituteKey).then(function (resp) {
                    //  
                    var sarray = [];
                    for (var i = 0; i < resp.length; i++) {
                        var object = {
                            groupTitle: resp[i].GroupTitle
                            , instituteGroupKey: resp[i].InstituteGroupKey
                            , courseKey: resp[i].CourseKey
                            , courseTitle: resp[i].CourseTitle
                            , courseCheck: true
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
                            if (item.courseKey == data[i].courseKey) {
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
                    $scope.coursCollection = final.data;
                })
            }
            else {
                $scope.coursCollection = response;
            }
        }, function (err) {
            appLogger.error('ERR', err);
        });
    }
    getCourse();
}); // End of App Controller