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

var app = angular.module('ThrillLeave.SubordinateLeave', ['ngCordova', 'ngStorage', 'ThrillFrameworkLibrary.geo', 'ThrillFrameworkLibrary.Network', 'ThrillCnnWebClient.appConfig', 'ThrillFrameworkLibrary.appLogger', 'ThrillLeave.applyLeaveLogic', 'ThrillLeave.leaveRequestLogic', 'ThrillLeave.subordinateLeaveLogic'])
    /*Setup group Controller */
app.controller('subordinateLeaveController', function($scope, $http, $state, $q, $stateParams, $localStorage, applyLeaveLogic, leaveRequestLogic, subordinateLeaveLogic, SweetAlert, appConfig, appLogger, $location) {


    getLabels(appConfig.CULTURE_NAME);
    getMessages(appConfig.CULTURE_NAME);


    /*get labels with selected language*/
    function getLabels(cultureName) {
        var currentFileName = "SubordinateRequest";
        $http.get("LeaveManagement/StaffLeaves/Languages/" + currentFileName + "." + cultureName + ".json").then(function(response) {
            bindLabels(response.data);

        });
    }

    function getMessages(cultureName) {
        var alertMessageName = "AlertMessages";

        $http.get("LeaveManagement/StaffLeaves/Languages/" + alertMessageName + "." + cultureName + ".json").then(function(response) {
            $scope.alertMessageLabels = response.data.messages;
        });
    }

    /*bind labels with selected language */
    function bindLabels(data) {


        $scope.labelsLeave = data.labels;

    };

    function getSubordinateLeaveRequestList() {

        // var ReferenceKey = "60abd750-91ed-11e6-a366-cdc9edb202ff";
        // $localStorage.ReferenceKey
        var status = [1, 5];
        subordinateLeaveLogic.getSubordinateLeaveRequest($localStorage.ReferenceKey, status).then(function(response) {

            $scope.leaveRequestList = response;
        }, function(err) {

            console.error('ERR', err);

        });


    };



    $scope.sortColumn = "requestDate";
    $scope.sortColumn = "from";
    $scope.sortColumn = "to";
    $scope.sortColumn = "noOfDays";
    $scope.sortColumn = "requester";
    $scope.sortColumn = "status";
    $scope.sortColumn = "";
    $scope.reverseSort = false;


    $scope.sortData = function(column) {
        $scope.reverseSort = ($scope.sortColumn == column) ?
            !$scope.reverseSort : false;
        $scope.sortColumn = column;

        $scope.getSortClass = function(column) {


            if ($scope.sortColumn == column) {
                return $scope.reverseSort ? 'arrow-down' : 'arrow-up';
            }

            return '';
        }
    }

    getSubordinateLeaveRequestList();


    $scope.getRequest = function() {
        // var ReferenceKey = "60abd750-91ed-11e6-a366-cdc9edb202ff";
        // $localStorage.ReferenceKey
        var status = [1, 2, 3, 4, 5, 6, 7, 8];
        subordinateLeaveLogic.getSubordinateLeaveRequest($localStorage.ReferenceKey, status).then(function(response) {

            $scope.leaveRequestList = response;
        }, function(err) {

            console.error('ERR', err);

        });


    }

    if ($state.current.url == "/subordinateLeaveRequest/:personKey") {
        var status = [1, 5];
        subordinateLeaveLogic.getSubordinateLeaveRequest($stateParams.personKey, status).then(function(response) {

            $scope.leaveRequestList = response;
        }, function(err) {

            console.error('ERR', err);

        });

    }

    $scope.SwitchFuction = function(id, caseStr, leaverequestkey) {


        switch (id) {
            case "1":
                $state.go("app.subordinateLeaveRequestView/:leaverequestkey", {
                    "leaverequestkey": leaverequestkey
                });

                break;
            case "2":
                $state.go("app.subordinateLeaveRequestViewOnly/:leaverequestkey", {
                    "leaverequestkey": leaverequestkey
                });
                break;
            case "3":
                $state.go("app.subordinateLeaveRequestViewOnly/:leaverequestkey", {
                    "leaverequestkey": leaverequestkey
                });
                break;
            case "4":
                $state.go("app.subordinateLeaveRequestViewOnly/:leaverequestkey", {
                    "leaverequestkey": leaverequestkey
                });
                break;
            case "5":
                $state.go("app.subordinateLeaveRequestView/:leaverequestkey", {
                    "leaverequestkey": leaverequestkey
                });
                break;
            case "6":
                $state.go("app.subordinateLeaveRequestViewOnly/:leaverequestkey", {
                    "leaverequestkey": leaverequestkey
                });
                break;
            case "7":
                $state.go("app.subordinateLeaveRequestViewOnly/:leaverequestkey", {
                    "leaverequestkey": leaverequestkey
                });
                break;

            case "8":
                $state.go("app.subordinateLeaveRequestViewOnly/:leaverequestkey", {
                    "leaverequestkey": leaverequestkey
                });
                break;

            default:
                alert("Status is empty");
                break;

        }
    };


    if ($stateParams.leaverequestkey !== undefined) {
        getLeaveRequestDetails();
        getLeaveTypeList();
        getLeaveHistoryList();
    }


    function getLeaveRequestDetails() {

        leaveRequestLogic.getLeaveRequestByLeaveRequestKey($stateParams.leaverequestkey).then(function(response) {
            //  $scope.leaveRequestList=response;
            $scope.entityLeaveRequest = {};
            $scope.entityLeaveRequest.startDateTime = new Date(response[0].startdatetime);
            $scope.entityLeaveRequest.endDateTime = new Date(response[0].enddatetime);
            $scope.entityLeaveRequest.noOfDays = response[0].noofdays;
            $scope.entityLeaveRequest.reasonForLeave = response[0].reasonforleave;
            $scope.entityLeaveRequest.approverComments = response[0].approvercomments;
            $scope.entityLeaveRequest.requesterpersonKey = response[0].requesterpersonKey;
            if (response[0].status == 1 || response[0].status == 5) {
                $scope.entityLeaveRequest.status = "";
            } else {
                $scope.entityLeaveRequest.status = response[0].status;
            }
            getFiles(response[0].folderkey);
            folderKey = response[0].folderkey;

        }, function(err) {

            console.error('ERR', err);

        });


    };

    function getFiles(folderKey) {

        leaveRequestLogic.getFilesList(folderKey).then(function(response) {
            // $scope.getLeaveTypeList=response;
            $scope.fileList = response.data;


        }, function(err) {

            console.error('ERR', err);

        });


    }

    function getLeaveTypeList() {

        leaveRequestLogic.getLeaveTypeList($stateParams.leaverequestkey).then(function(response) {
            $scope.getLeaveTypeList = response;


        }, function(err) {

            console.error('ERR', err);

        });


    };


    function getLeaveHistoryList() {

        leaveRequestLogic.getLeaveHistoryList($stateParams.leaverequestkey).then(function(response) {
            $scope.leaveHistoryList = response;


        }, function(err) {

            console.error('ERR', err);

        });
    };

    $scope.getFileDetails = function(fileKey) {

        leaveRequestLogic.getFileDetails(fileKey, folderKey).then(function(response) {

            //  console.log(response);


            var a = document.createElement("a");
            a.download = response[0].FileName;
            a.href = response[0].FileBin;
            a.click();



        }, function(err) {
            appLogger.error('ERR', err);
        });


    };


    $scope.updateLeaveRequest = function(getLeaveTypeList) {
        // alert(JSON.stringify($scope.entityLeaveRequest.requesterpersonKey));

        var update = {
            approverComments: $scope.entityLeaveRequest.approverComments,
            status: $scope.entityLeaveRequest.status,
            leaveRequestKey: $stateParams.leaverequestkey,
            leaveType: getLeaveTypeList,
            personKey: $scope.entityLeaveRequest.requesterpersonKey,
            instanceOrganizationKey: $localStorage.organizationKey
        };
        //  alert(JSON.stringify(update));
        subordinateLeaveLogic.updateLeaveRequest(update).then(function(response) {



            SweetAlert.swal({
                title: "Leave Request",
                text: "Updated successfully",
                type: "success",
                confirmButtonColor: "#007AFF"
            });


            //appLogger.alert($scope.alertMessageLabels.boardUpdated);

        }, function(err) {
            appLogger.error('ERR', err);
        });




    }


}); // End of App Controller