/*//=============================================================================
// All rights reserved to Thrill Innovative Labs.
// THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
// OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
// LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
// FITNESS FOR A PARTICULAR PURPOSE.
//=============================================================================
//*****************************************************************************
//* Name		    	: ExamScheduleList.Controller.js 
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
var app = angular.module('ThrillAcademic.examScheduleList', ['ThrillAcademic.examScheduleLogic'
			 //, 'ThrillAcademic.masterDataLogic'
			 , 'ngCordova'
			 , 'ThrillFrameworkLibrary.geo'
			 , 'ThrillFrameworkLibrary.Network'
			 , 'ThrillCnnWebClient.appConfig'
			 , 'ThrillFrameworkLibrary.appLogger'
	])
    /*Setup examSchedule Controller */
app.controller('ExamScheduleListController', function ($scope, $http, examScheduleLogic, appConfig, appLogger) {
    $scope.minDate = new Date(2016, 1, 1);
    $scope.maxDate = new Date();
    getLabels(appConfig.CULTURE_NAME);
    getMessages(appConfig.CULTURE_NAME);
    /*get labels with selected language*/
    function getLabels(cultureName) {
        var currentFileName = "ExamSchedule";
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
        var labels = {
            examinationDate: data.labels.examinationDate
            , startDate: data.labels.startDate
            , endDate: data.labels.endDate
            , edit: data.labels.edit
            , delete: data.labels.delete
            , examScheduleList: data.labels.examScheduleList
            , examScheduleHeading: data.labels.examScheduleHeading
        };
        $scope.labelsExamSchedule = labels;
    };
    var refresh = function () {
        examScheduleLogic.getAllExamSchedules().then(function (response) {
            console.log(JSON.stringify(response));
            $scope.examScheduleCollection = response;
            $scope.sortColumn = "";
            $scope.reverseSort = false;
            $scope.sortData = function (column) {
                $scope.reverseSort = ($scope.sortColumn == column) ? !$scope.reverseSort : false;
                $scope.sortColumn = column;
            }
            $scope.getSortClass = function (column) {
                    if ($scope.sortColumn == column) {
                        return $scope.reverseSort ? 'arrow-down' : 'arrow-up';
                    }
                    return '';
                }
                , function (err) {
                    appLogger.error('ERR', err);
                };
        });
    }
    refresh();
    /*Method for calling  deleting   ExamSchedule*/
    $scope.deleteExamSchedule = function (examScheduleEntityKey) {
        var del = confirm("Are you sure you want to Delete ?");
        if (del == true) {
            examScheduleLogic.deleteExamSchedule(examScheduleEntityKey).then(function (response) {
                alert("Deleted Successfully")
                refresh();
            }, function (err) {
                appLogger.error('ERR', err);
            });
        }
    };
}); // End of App Controller