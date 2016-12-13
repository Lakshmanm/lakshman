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
var app = angular.module('ThrillInstitute.instituteExaminationType', ['ThrillAcademic.examinationTypeLogic'

			 , 'ngCordova'
              , 'ThrillInstitute.instituteExaminationTypeLogic'
			 , 'ThrillFrameworkLibrary.geo'
			 , 'ThrillFrameworkLibrary.Network'
			 , 'ThrillCnnWebClient.appConfig'
			 , 'ThrillFrameworkLibrary.appLogger'
])
    /*Setup examinationType Controller */
app.controller('instituteExaminationTypeController', function ($scope, instituteExaminationTypeLogic, $http, SweetAlert, $localStorage, examinationTypeLogic, $state, $stateParams, appConfig, appLogger) {
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
    $scope.ExaminationLevel = [{
        "Title": "Organization Level"
        , "Id": "1"
    }, {
        "Title": "Institute Level"
        , "Id": "2"
    }]
    $scope.Organizations = [{
            "Title": "Organization 1"
            , "Id": "1"
        }, {
            "Title": "Organization 2"
            , "Id": "2"
        }, {
            "Title": "Organization 3"
            , "Id": "3"
        }]
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
                title: "Examination Type"
                , text: "Saved successfully"
                , type: "success"
                , confirmButtonColor: "#007AFF"
            });
            refresh();
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
    
    $scope.saveExaminationType = function (entityExaminationType) {
            var object = {};
            var examinationTypeKey = [];
            for (var i = 0; i < entityExaminationType.length; i++) {
                if (entityExaminationType[i].examinationTypeCheck == true) {
                    examinationTypeKey.push(entityExaminationType[i].examinationTypeKey);
                    object = {
                        examinationTypeKey: examinationTypeKey
                        , instituteKey: $localStorage.instituteKey
                    }
                }
                if (i == (entityExaminationType.length) - 1) {
                    instituteExaminationTypeLogic.addInstituteExaminationType(object).then(function (response) {
                        SweetAlert.swal({
                            title: "Examination Type"
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
                title: "Examination Type"
                , text: "Assigned successfully"
                , type: "success"
                , confirmButtonColor: "#007AFF"
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
            }, function (err) {
                appLogger.error('ERR', err);
            });
        }
        /*var refresh = function () {

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
        refresh()*/
    ;
    var mainresp = {};
    var secondresp = {};
    // method for boardLogic
    function getExaminationType() {
        examinationTypeLogic.getAllExaminationTypes($localStorage.organizationKey).then(function (response) {
            var array = [];
            for (var i = 0; i < response.length; i++) {
                var object = {
                    examinationTypeKey: response[i].examinationTypeKey
                    , examinationTypeTitle: response[i].examinationTypeTitle
                    , examinationTypeCheck: false
                }
                array.push(object);
                if (i == (response.length) - 1) {
                    mainresp = {
                        data: array
                    }
                }
            }
            if ($stateParams.instituteKey != undefined) {
                instituteExaminationTypeLogic.getExaminationTypeByInstituteKey($stateParams.instituteKey).then(function (resp) {
                    var sarray = [];
                    for (var i = 0; i < resp.length; i++) {
                        var object = {
                            examinationTypeKey: resp[i].ExaminationTypeKey
                            , examinationTypeTitle: resp[i].ExaminationTypeTitle
                            , examinationTypeCheck: true
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
                            if (item.examinationTypeKey == data[i].examinationTypeKey) {
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
                    $scope.examinationTypeCollection = final.data;
                })
            }
            else {
                $scope.examinationTypeCollection = response;
            }
        }, function (err) {
            appLogger.error('ERR', err);
        });
    }
    getExaminationType();
    /*Method for calling  deleting   ExaminationType*/
    $scope.deleteExaminationType = function (examinationTypeEntityKey) {
        var del = confirm("Are you sure you want to Delete ?");
        if (del == true) {
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
    };
}); // End of App Controller