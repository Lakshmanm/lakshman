/*//=============================================================================
// All rights reserved to Thrill Innovative Labs.
// THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
// OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
// LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
// FITNESS FOR A PARTICULAR PURPOSE.
//=============================================================================
//*****************************************************************************
//* Name		    	: Subject.Controller.js 
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
var app = angular.module('ThrillInstitute.instituteSubject', ['ThrillAcademic.subjectLogic'

        , 'ThrillAcademic.termLogic'
        , 'ThrillInstitute.instituteSubjectLogic'
        , 'ThrillAcademic.electiveGroupLogic'

        , 'ngCordova'
         , 'ngStorage'

        , 'ThrillFrameworkLibrary.geo'

        , 'ThrillFrameworkLibrary.Network'

        , 'ThrillCnnWebClient.appConfig'

        , 'ThrillFrameworkLibrary.appLogger'

        , 'ThrillAcademic.boardLogic'

        , 'ThrillAcademic.groupLogic'

        , 'ThrillAcademic.coursLogic'

        , 'ThrillAcademic.termLogic'
    ])
    /*Setup subject Controller */
app.controller('instituteSubjectController', function ($scope, instituteSubjectLogic, $http, boardLogic, groupLogic, coursLogic, subjectLogic, termLogic, electiveGroupLogic, $localStorage, SweetAlert, $state, $stateParams, appConfig, appLogger) {
    getLabels(appConfig.CULTURE_NAME);
    getMessages(appConfig.CULTURE_NAME);
    /*get labels with selected language*/
    function getLabels(cultureName) {
        var currentFileName = "Subject";
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
        $scope.labelsSubject = data.labels;
    };
    $scope.save = true;
    $scope.update = false;
    var entitykey = DrawCaptcha();
    var subjectEntityKey;
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
    /*Perform the CRUD (Create, Read, Update & Delete) operations of Subject*/
    /*Method for calling  add Subject */
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
    $scope.getCoursByGroupKey = function (groupKey) {
        coursLogic.getCoursByGroupKey(groupKey).then(function (response) {
            $scope.courseList = response;
        })
    }
    $scope.getTermByCourseKey = function (courseKey) {
        termLogic.getTermByCourseKey(courseKey).then(function (response) {
            $scope.termList = response;
        })
    }
    $scope.getElectiveGroupByTermKey = function (termKey) {
        electiveGroupLogic.getElectiveGroupByTermKey(termKey).then(function (response) {
            $scope.electiveGroup = response;
        })
    }
    $scope.addSubject = function () {
        if (appConfig.APP_MODE == 'offline') {
            $scope.entitySubject.subjectKey = entitykey;
        }
        $scope.entitySubject.createdAppKey = "3il_App_Key";
        $scope.entitySubject.createdUserKey = "3il_User_Key";
        $scope.entitySubject.instanceOrganizationKey = $localStorage.organizationKey;
        $scope.entitySubject.isElective = ($scope.entitySubject.isElective == true ? 1 : 0);
        delete $scope.entitySubject.boardKey;
        delete $scope.entitySubject.groupKey;
        delete $scope.entitySubject.courseKey;
        subjectLogic.addSubject($scope.entitySubject).then(function (response) {
            //appLogger.alert($scope.alertMessageLabels.coursSaved);
            $scope.entitySubject = {};
            $scope.subjectForm.$setPristine();
            $scope.subjectForm.$setUntouched();
            $scope.save = true;
            $scope.update = false;
            SweetAlert.swal({
                title: "Subject"
                , text: "Assigned successfully"
                , type: "success"
                , confirmButtonColor: "#007AFF"
            });
            refresh();
        }, function (err) {
            appLogger.error('ERR', err);
        });
    };

    function getTerm() {
        termLogic.getAllTerms().then(function (response) {
            $scope.termList = response;
        }, function (err) {
            appLogger.error('ERR', err);
        });
    }
    getTerm();

    function getelectiveGroups() {
        electiveGroupLogic.getAllElectiveGroups().then(function (response) {
            $scope.electiveGroup = response;
        }, function (err) {
            appLogger.error('ERR', err);
        });
    }
    getelectiveGroups();


if($localStorage.RoleID==2)
    {
        
        $scope.savebtn=false;
    }
    else{
         $scope.savebtn=true;
           
    }
    
    
    /*Method for calling  update Subject*/
    /* var refresh = function() {
        subjectLogic.getAllSubjects($localStorage.organizationKey).then(function(response) {
            $scope.subjectCollection = response;
            $scope.sortColumn = "";
            $scope.reverseSort = false;
            $scope.sortData = function(column) {
                $scope.reverseSort = ($scope.sortColumn == column) ?
                    !$scope.reverseSort : false;
                $scope.sortColumn = column;
            }
            $scope.getSortClass = function(column) {
                    if ($scope.sortColumn == column) {
                        return $scope.reverseSort ? 'arrow-down' : 'arrow-up';
                    }
                    return '';
                },
                function(err) {
                    appLogger.error('ERR', err);
                };
        });
    }
    refresh();

*/
    $scope.saveSubject = function (entitySubject) {
        var object = {};
        var subjectKey = [];
        console.log(entitySubject);
        for (var i = 0; i < entitySubject.length; i++) {
            if (entitySubject[i].subjectCheck == true) {
                subjectKey.push(entitySubject[i].subjectKey);
                object = {
                    subjectKey: subjectKey
                    , instituteKey: $localStorage.instituteKey
                }
            }
            /* if(i==(entitySubject.length)-1)      
           {
    
	              
                   }  */
        }
        console.log(object);
        instituteSubjectLogic.addInstituteSubject(object).then(function (response) {
            SweetAlert.swal({
                title: "Subject"
                , text: "Saved successfully"
                , type: "success"
                , confirmButtonColor: "#007AFF"
            });
        }, function (err) {
            appLogger.error('ERR', err);
        });
    }
    var mainresp = {};
    var secondresp = {};
    // method for boardLogic
    function getSubject() {
        subjectLogic.getAllSubjects($localStorage.organizationKey).then(function (response) {
            console.log(response);
            var array = [];
            for (var i = 0; i < response.length; i++) {
                var object = {
                    subjectKey: response[i].subjectKey
                    , subjectTitle: response[i].subjectTitle
                    , minimumTeachingHours: response[i].minimumTeachingHours
                    , subjectCheck: false
                }
                array.push(object);
                if (i == (response.length) - 1) {
                    mainresp = {
                        data: array
                    }
                }
            }
            if ($stateParams.instituteKey != undefined) {
                instituteSubjectLogic.getSubjectByInstituteKey($stateParams.instituteKey).then(function (resp) {
                    console.log(resp);
                    var sarray = [];
                    for (var i = 0; i < resp.length; i++) {
                        var object = {
                            subjectKey: resp[i].SubjectKey
                            , subjectTitle: resp[i].SubjectTitle
                            , minimumTeachingHours: resp[i].MinimumTeachingHours
                            , subjectCheck: true
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
                            if (item.subjectKey == data[i].subjectKey) {
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
                    $scope.subjectCollection = final.data;
                })
            }
            else {
                $scope.subjectCollection = response;
            }
        }, function (err) {
            appLogger.error('ERR', err);
        });
    }
    getSubject();
    /*Method for calling  deleting   Subject*/
    $scope.deleteSubject = function (subjectEntityKey) {
        var del = confirm("Are you sure you want to Delete ?");
        if (del == true) {
            subjectLogic.deleteSubject(subjectEntityKey).then(function (response) {
                // appLogger.alert($scope.alertMessageLabels.subjectDeleted);
                $scope.entitySubject = {};
                $scope.subjectForm.$setPristine();
                $scope.subjectForm.$setUntouched();
                $scope.save = true;
                $scope.update = false;
                SweetAlert.swal({
                    title: "Subject"
                    , text: "Deleted successfully"
                    , type: "success"
                    , confirmButtonColor: "#007AFF"
                });
                refresh();
            }, function (err) {
                appLogger.error('ERR', err);
            });
        }
    };
}); // End of App Controller