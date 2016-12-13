/*//=============================================================================
// All rights reserved to Thrill Innovative Labs.
// THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
// OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
// LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
// FITNESS FOR A PARTICULAR PURPOSE.
//=============================================================================
//*****************************************************************************
//* Name		    	: Examination.Controller.js 
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
var app = angular.module('ThrillInstitute.instituteExamination', ['ThrillAcademic.examinationLogic'

			 , 'ngCordova'
             , 'ThrillInstitute.instituteExaminationLogic'
			 , 'ThrillAcademic.examinationTypeLogic'
			 , 'ThrillFrameworkLibrary.geo'
			 , 'ThrillFrameworkLibrary.Network'
			 , 'ThrillCnnWebClient.appConfig'
			 , 'ThrillFrameworkLibrary.appLogger'
])
    /*Setup examination Controller */
app.controller('instituteExaminationController', function ($scope, $http, instituteExaminationLogic, SweetAlert, examinationLogic, examinationTypeLogic, $state, $stateParams, appConfig, $localStorage, appLogger) {
    getLabels(appConfig.CULTURE_NAME);
    getMessages(appConfig.CULTURE_NAME);
    /*get labels with selected language*/
    function getLabels(cultureName) {
        var currentFileName = "Examination";
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
        $scope.labelsExamination = data.labels;
    };
    $scope.save = true;
    $scope.update = false;
    var entitykey = DrawCaptcha();
    var examinationEntityKey;
    $scope.getExaminationTypes = function () {
        examinationTypeLogic.getAllExaminationTypes($localStorage.organizationKey).then(function (response) {
            $scope.examinationTypeCollection = response;
        });
    }
    $scope.getExaminationTypes();
    /*Perform the CRUD (Create, Read, Update & Delete) operations of Examination*/
    /*Method for calling  add Examination */
    $scope.addExamination = function () {
        if (appConfig.APP_MODE == 'offline') {
            $scope.entityExamination.examinationKey = entitykey;
        }
        $scope.entityExamination.CreatedUserKey = "new-User-My3";
        $scope.entityExamination.CreatedAppKey = "new-App-mCampuZ";
        $scope.entityExamination.instanceOrganizationKey = $localStorage.organizationKey;
        //alert(JSON.stringify($scope.entityExamination));
        examinationLogic.addExamination($scope.entityExamination).then(function (response) {
            //alert("Saved Successfully");
            $scope.entityExamination = {};
            $scope.save = true;
            $scope.update = false;
            $scope.examinationForm.$setPristine();
            $scope.examinationForm.$setUntouched();
            SweetAlert.swal({
                title: "Examination"
                , text: "Assigned successfully"
                , type: "success"
                , confirmButtonColor: "#007AFF"
            });
            refresh();
        }, function (err) {
            appLogger.error('ERR', err);
        });
    };
    $scope.saveExamination = function (entityExamination) {
        var object = {};
        var examinationKey = [];
        for (var i = 0; i < entityExamination.length; i++) {
            if (entityExamination[i].examinationCheck == true) {
                examinationKey.push(entityExamination[i].examinationKey);
                object = {
                    examinationKey: examinationKey
                    , instituteKey: $localStorage.instituteKey
                }
            }
            if (i == (entityExamination.length) - 1) {
                instituteExaminationLogic.addInstituteExamination(object).then(function (response) {
                    SweetAlert.swal({
                        title: "Examination"
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


    if($localStorage.RoleID==2)
    {
        
        $scope.savebtn=false;
    }
    else{
         $scope.savebtn=true;
           
    }
    
    function getExamination() {
        examinationLogic.getAllExaminations($localStorage.organizationKey).then(function (response) {
            var array = [];
            for (var i = 0; i < response.length; i++) {
                var object = {
                    examinationKey: response[i].examinationKey
                    , examinationTitle: response[i].examinationTitle
                    , examinationCheck: false
                }
                array.push(object);
                if (i == (response.length) - 1) {
                    mainresp = {
                        data: array
                    }
                }
            }
            if ($stateParams.instituteKey != undefined) {
                instituteExaminationLogic.getExaminationByInstituteKey($stateParams.instituteKey).then(function (resp) {
                    var sarray = [];
                    for (var i = 0; i < resp.length; i++) {
                        var object = {
                            examinationKey: resp[i].ExaminationKey
                            , examinationTitle: resp[i].ExaminationTitle
                            , examinationCheck: true
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
                            if (item.examinationKey == data[i].examinationKey) {
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
                    $scope.examinationCollection = final.data;
                })
            }
            else {
                $scope.examinationCollection = response;
            }
        }, function (err) {
            appLogger.error('ERR', err);
        });
    }
    getExamination();
    /*var refresh = function () {
    	examinationLogic.getAllExaminations($localStorage.organizationKey).then(function (response) {

    		$scope.examinationCollection = response;
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
    /*Method for calling  deleting   Examination*/
    $scope.deleteExamination = function (examinationEntityKey) {
        var del = confirm("Are you sure you want to Delete ?");
        if (del == true) {
            examinationLogic.deleteExamination(examinationEntityKey).then(function (response) {
                //alert("Deleted Successfully");
                $scope.entityExamination = {};
                $scope.save = true;
                $scope.update = false;
                $scope.examinationForm.$setPristine();
                $scope.examinationForm.$setUntouched();
                SweetAlert.swal({
                    title: "Examination"
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