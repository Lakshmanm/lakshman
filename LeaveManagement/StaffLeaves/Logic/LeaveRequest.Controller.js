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

var app = angular.module('ThrillLeave.leaveRequest', ['ngCordova', 'ngStorage', 'ThrillFrameworkLibrary.geo', 'ThrillFrameworkLibrary.Network', 'ThrillCnnWebClient.appConfig', 'ThrillFrameworkLibrary.appLogger', 'ThrillLeave.applyLeaveLogic', 'ThrillLeave.leaveRequestLogic'])
    /*Setup group Controller */
app.controller('leaveRequestController', function($scope, $http, $state, $q, $stateParams, $localStorage, applyLeaveLogic, leaveRequestLogic, SweetAlert, appConfig, appLogger, $location) {


    getLabels(appConfig.CULTURE_NAME);
    getMessages(appConfig.CULTURE_NAME);


    /*get labels with selected language*/
    function getLabels(cultureName) {
        var currentFileName = "LeaveRequest";
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


    var emailId;
    var reportingManager;
    var mobileNumber;

    function twoDigits(d) {
        if (0 <= d && d < 10) return "0" + d.toString();
        if (-10 < d && d < 0) return "-0" + (-1 * d).toString();
        return d.toString();
    }
    /*
     * …and then create the method to output the date string as desired.
     * Some people hate using prototypes this way, but if you are going
     * to apply this to more than one Date object, having it as a prototype
     * makes sense.
     */
    Date.prototype.toMysqlFormat = function() {
        return this.getFullYear() + "-" + twoDigits(1 + this.getMonth()) + "-" + twoDigits(this.getDate()) + " " + twoDigits(this.getHours()) + ":" + twoDigits(this.getMinutes()) + ":" + twoDigits(this.getSeconds());
    };

    $scope.getPersonDetailsByPersonKey = function(approverPersonKey) {


        applyLeaveLogic.getPersonDetailsByPersonKey(approverPersonKey).then(function(response) {
            //
            emailId = response[0].emailId;
            mobileNumber = response[0].mobileNumber;
            reportingManager = response[0].firstName;


        }, function(err) {

            console.error('ERR', err);

        });

    }

    if ($state.current.url == "/leaveRequestAddDocuments/:leaverequestkey") {

        $scope.doc = true;

    } else if ($state.current.url == "/leaveViewRequest/:leaverequestkey") {


        $scope.doc = false;
    }

    var folderKey;
    var url;

    $scope.SwitchFuction = function(id, caseStr, leaverequestkey) {


        switch (id) {
            case "1":
                $state.go("app.leaveViewRequest/:leaverequestkey", {
                    "leaverequestkey": leaverequestkey
                });

                break;
            case "2":
                $state.go("app.leaveViewRequest/:leaverequestkey", {
                    "leaverequestkey": leaverequestkey
                });
                break;
            case "3":
                $state.go("app.leaveViewRequest/:leaverequestkey", {
                    "leaverequestkey": leaverequestkey
                });
                break;
            case "4":
                $state.go("app.leaveRequestAddDocuments/:leaverequestkey", {
                    "leaverequestkey": leaverequestkey
                });
                break;
            case "5":
                $state.go("app.leaveViewRequest/:leaverequestkey", {
                    "leaverequestkey": leaverequestkey
                });
                break;
            case "6":
                $state.go("app.leaveViewRequest/:leaverequestkey", {
                    "leaverequestkey": leaverequestkey
                });
                break;
            case "7":
                $state.go("app.leaveRequestAddDocuments/:leaverequestkey", {
                    "leaverequestkey": leaverequestkey
                });
                break;
                break;
            case "8":
                $state.go("app.leaveViewRequest/:leaverequestkey", {
                    "leaverequestkey": leaverequestkey
                });
                break;

            default:
                alert("Status is empty");
                break;

        }
    };

    //alert($location)

    function getLeaveRequestList() {

        leaveRequestLogic.getLeaveRequestListByPersonKey($localStorage.ReferenceKey).then(function(response) {

            $scope.leaveRequestList = response;
        }, function(err) {

            console.error('ERR', err);

        });


    };



    $scope.sortColumn = "requestDate";
    $scope.sortColumn = "from";
    $scope.sortColumn = "to";
    $scope.sortColumn = "noOfDays";
    $scope.sortColumn = "approver";
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

    getLeaveRequestList();


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
            $scope.entityLeaveRequest.status = response[0].status;
            $scope.entityLeaveRequest.requesterpersonKey = response[0].requesterpersonKey;
            $scope.entityLeaveRequest.approverpersonkey = response[0].approverpersonkey;
            getFiles(response[0].folderkey);
            folderKey = response[0].folderkey;
            $scope.getPersonDetailsByPersonKey(response[0].approverpersonkey);
            // alert(JSON.stringify($scope.entityLeaveRequest.startDateTime));
            //   alert(JSON.stringify(response[0].startdatetime<new Date().toMysqlFormat()));
            if (response[0].status == 3 || response[0].status == 8 || response[0].startdatetime < new Date().toMysqlFormat()) {
                $scope.add = false;

            } else {
                $scope.add = true;

            }


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
    $scope.getList=function()
    {
       $state.go('app.leaveRequest');
    }

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


    $scope.addDocuments = function() {
        //    alert(JSON.stringify($scope.entityLeaveRequest));
        var redefinedObject = redefineObject($scope.entityLeaveRequest.documents);

        $q.all(promiseGeneration(redefinedObject, folderKey)).then(function(response) {

            if ($scope.entityLeaveRequest.status != 7) {

                var updateLeave = {
                    leaveRequestKey: $stateParams.leaverequestkey,
                    status: 5,
                    instanceOrganizationKey: $localStorage.organizationKey
                }

                leaveRequestLogic.updateLeaveRequest(updateLeave).then(function(response) {

                    SweetAlert.swal({
                        title: "Leave Request",
                        text: "Updated successfully",
                        type: "success",
                        confirmButtonColor: "#007AFF"
                    });


                });

            } else {

                SweetAlert.swal({
                    title: "Leave Request",
                    text: "Updated successfully",
                    type: "success",
                    confirmButtonColor: "#007AFF"
                });

            }



        }, function(err) {
            appLogger.error('ERR', err);
        });


    };





    function redefineObject(file) {

        var imageArray = [];
        for (var i in file) {
            var obj;

            obj = {
                fileName: file[i].filename,
                fileType: file[i].filetype,
                fileType: file[i].filetype,
                fileSize: file[i].filesize,
                fileBase64Data: file[i].base64
            }

            imageArray.push(obj);
            if (i == (file.length - 1).toString()) {
                //console.log(JSON.stringify(imageArray));
                return imageArray
            }



        }

    }



    function promiseGeneration(imageObject, FolderKey) {
        var promises = [];
        for (var i in imageObject) {
            promises.push(postFiles(imageObject[i], FolderKey));
            if (i == (imageObject.length - 1).toString())
                return promises

        }


    }


    ///function to post file 



    function postFiles(fileObj, FolderKey) {

        var deferred = $q.defer();


        applyLeaveLogic.postDocuments(fileObj, FolderKey).then(function(response) {

            deferred.resolve(response);


        }, function(error) {
            deferred.resolve(error);

        })



        return deferred.promise


    }

    $scope.leaveRequestCancel = function() {

        var update = {
            status: $scope.entityLeaveRequest.status,
            requesterpersonKey: $scope.entityLeaveRequest.requesterpersonKey,
            approverpersonkey: $scope.entityLeaveRequest.approverpersonkey,
            instanceOrganizationKey: $localStorage.organizationKey,
            getLeaveTypeList: $scope.getLeaveTypeList
        };

        SweetAlert.swal({
            title: "Are you sure?",
            text: "Your want to cancel this leave request",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, cancel it!",
            cancelButtonText: "No, do not cancel!",
            closeOnConfirm: false,
            closeOnCancel: false
        }, function(isConfirm) {
            if (isConfirm) {
                SweetAlert.swal({
                    title: "Deleted!",
                    text: "Your leave request has been cancelled.",
                    type: "success",
                    confirmButtonColor: "#007AFF"

                }, function() {
                    leaveRequestLogic.updateLeaveRequestByPersonKey(update, $stateParams.leaverequestkey).then(function(response) {

                        if ($scope.entityLeaveRequest.status != 1) {
                            var LeaveFromDate = new Date($scope.entityLeaveRequest.startDateTime);
                            var LeaveToDate = new Date($scope.entityLeaveRequest.endDateTime);
                            var emailObject = {
                                "PersonKey": $scope.entityLeaveRequest.approverpersonkey,
                                "PersonName": $localStorage.Name,
                                "EmailId": emailId,
                                "LeaveFromDate": LeaveFromDate.getDate() + '/' + (LeaveFromDate.getMonth() + 1) + '/' + LeaveFromDate.getFullYear(),
                                "LeaveToDate": LeaveToDate.getDate() + '/' + (LeaveToDate.getMonth() + 1) + '/' + LeaveToDate.getFullYear(),
                                "ReportingManager": reportingManager,
                                "ReasonForLeave": $scope.entityLeaveRequest.reasonForLeave,
                                "CurrentStatus": "Cancelled"

                            };

                            leaveRequestLogic.leaveCancelMail(emailObject).then(function(response) {


                            });
                        }
                    }, function(err) {
                        console.error('ERR', err);
                    });
                });
            } else {
                SweetAlert.swal({
                    title: "Cancelled",
                    text: "Your leave request is safe :)",
                    type: "error",
                    confirmButtonColor: "#007AFF"
                });
            }
        });







    }



}); // End of App Controller