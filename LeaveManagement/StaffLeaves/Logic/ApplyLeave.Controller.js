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

var app = angular.module('ThrillLeave.applyLeave', ['ngCordova', 'ngStorage', 'ThrillFrameworkLibrary.geo', 'ThrillInstitute.instituteLogic', 'ThrillFrameworkLibrary.Network', 'ThrillCnnWebClient.appConfig', 'ThrillFrameworkLibrary.appLogger', 'ThrillLeave.applyLeaveLogic', 'ThrillInstitute.leaveTypeLogic'])
    /*Setup group Controller */
app.controller('applyLeaveController', function($scope, $http, $state, $q, $stateParams, $localStorage, applyLeaveLogic, instituteLogic, leaveTypeLogic, SweetAlert, appConfig, appLogger) {


    getLabels(appConfig.CULTURE_NAME);
    getMessages(appConfig.CULTURE_NAME);


    /*get labels with selected language*/
    function getLabels(cultureName) {
        var currentFileName = "ApplyLeave";
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
    
    function getLeavesType(instituteKey) {
        applyLeaveLogic.getLeavesByInstituteKey(instituteKey).then(function(response) {
            $scope.leaveTypeList = response;
        }, function(err) {

            console.error('ERR', err);

        });


    };
    
$scope.getKey = function(instituteKey) {
        getLeavesType(instituteKey);

    }
    
    if($localStorage.RoleID==2 || $localStorage.RoleID==3  )
{

    $scope.entityBatch={};
$scope.entityBatch.InstituteKey=$localStorage.LoginInstituteKey;
  getLeavesType($scope.entityBatch.InstituteKey);
    $scope.leaveInstitute="true";
    
}
else
{
 $scope.leaveInstitute="false";

}

    $scope.half = false;
    var approverPersonKey;
    var emailId;
    var mobileNumber;
    var reportingManager;
    var entitykey = DrawCaptcha();

    $scope.getFileList=function(dms)
    {
        
        
        $scope.fileList = dms;
            
    }
    

    $scope.requestedMinDate = new Date(new Date().setDate(new Date().getDate() - 30));


    $scope.getDate = function(start, end) {

        var iWeeks, iDateDiff, iAdjust = 0;
        if (end < start) return -1; // error code if dates transposed
        var iWeekday1 = start.getDay(); // day of week
        var iWeekday2 = end.getDay();
        iWeekday1 = (iWeekday1 == 0) ? 7 : iWeekday1; // change Sunday from 0 to 7
        iWeekday2 = (iWeekday2 == 0) ? 7 : iWeekday2;
        if ((iWeekday1 > 6) && (iWeekday2 > 6)) iAdjust = 1; // adjustment if both days on weekend
        iWeekday1 = (iWeekday1 > 6) ? 6 : iWeekday1; // only count weekdays
        iWeekday2 = (iWeekday2 > 6) ? 6 : iWeekday2;

        // calculate differnece in weeks (1000mS * 60sec * 60min * 24hrs * 7 days = 604800000)
        iWeeks = Math.floor((end.getTime() - start.getTime()) / 604800000)

        if (iWeekday1 <= iWeekday2) {
            iDateDiff = (iWeeks * 6) + (iWeekday2 - iWeekday1)
        } else {
            iDateDiff = ((iWeeks + 1) * 6) - (iWeekday1 - iWeekday2)
        }

        iDateDiff -= iAdjust // take into account both days on weekend

        //  return (iDateDiff + 1); // add 1 because dates are inclusive
        $scope.entityLeaveRequest.noOfDays = iDateDiff + 1;



    }


    $scope.getApprover = function(startDate) {
        var date = new Date(startDate),
            mnth = ("0" + (date.getMonth() + 1)).slice(-2),
            day = ("0" + date.getDate()).slice(-2);
        var dateTime = [date.getFullYear(), mnth, day].join("-");


        applyLeaveLogic.getApproverKey($localStorage.ReferenceKey, dateTime).then(function(response) {
            //   alert(JSON.stringify(response));
            if (response[0] == undefined) {

                $scope.approver = "There are no approvers configured for this leave request as per the leave requested date. So you will not be able to submit this leave request. ";


            } else {
                approverPersonKey = response[0].approverpersonkey;
                $scope.getPersonDetailsByPersonKey(approverPersonKey);
            }
        }, function(err) {

            console.error('ERR', err);

        });

    }



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






    $scope.addLeave = function(entityLeave, leaveList, leaveBalanceList) {
        //   alert(JSON.stringify(entityLeave));
        var d1 = new Date(entityLeave.startDateTime.getTime() + 1 * 86400000);;
        var d2 = new Date(entityLeave.endDateTime.getTime() + 1 * 86400000);
        entityLeave.startDateTime = d1;
        entityLeave.endDateTime = d2;

        entityLeave.leaveList = leaveList;
        entityLeave.approverPersonKey = approverPersonKey;
        entityLeave.requesterPersonKey = $localStorage.ReferenceKey;
        entityLeave.createdAppKey = "3il_App_Key";
        entityLeave.createdUserKey = "3il_User_Key";
        entityLeave.instanceOrganizationKey = $localStorage.organizationKey;
        // alert(JSON.stringify(entityLeave));

        var folderDetails = {
            "FolderName": entitykey,
            "EntityKey": approverPersonKey,
            "EntityType": 'Organization'


        };
        applyLeaveLogic.postDocumentsFolder(folderDetails).then(function(response) {
            // console.log(JSON.stringify(response));
            var FolderKey = response[0].FolderKey;
            //console.log($scope.dms.documents);
            var redefinedObject = redefineObject(entityLeave.documents);
            $q.all(promiseGeneration(redefinedObject, FolderKey)).then(function(response) {

                // alert("saved")
                entityLeave.FolderKey = FolderKey;
                entityLeave.status = 1;
                // 
                applyLeaveLogic.addLeave(entityLeave).then(function(response) {
                    var LeaveFromDate = new Date(entityLeave.startDateTime);
                    var LeaveToDate = new Date(entityLeave.endDateTime);
                    var emailObject = {
                        "PersonKey": approverPersonKey,
                        "PersonName": $localStorage.Name,
                        "EmailId": emailId,
                        "LeaveFromDate": LeaveFromDate.getDate() + '/' + (LeaveFromDate.getMonth() + 1) + '/' + LeaveFromDate.getFullYear(),
                        "LeaveToDate": LeaveToDate.getDate() + '/' + (LeaveToDate.getMonth() + 1) + '/' + LeaveToDate.getFullYear(),
                        "ReportingManager": reportingManager,
                        "ReasonForLeave": entityLeave.reasonForLeave

                    };

                    //     alert(JSON.stringify(emailObject));
                    applyLeaveLogic.leaveRequestMail(emailObject).then(function(response) {




                        $scope.leaveList = "";
                        $scope.entityLeaveRequest = "";
                        $scope.leaveForm.$setPristine();
                        $scope.leaveForm.$setUntouched();

                        SweetAlert.swal({
                            title: "Leave Request",
                            text: "Saved successfully",
                            type: "success",
                            confirmButtonColor: "#007AFF"
                        });
                    });

                });
            }, function(err) {
                appLogger.error('ERR', err);
            });
        }, function(error) {
            console.log(error);
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
            console.log(response);
            deferred.resolve(response);


        }, function(error) {
            deferred.resolve(error);

        })



        return deferred.promise


    }



    $scope.getLeaveDays = function(leaveTypeKey, leavesNumber, days, noOfDays) {
        $scope.avaliableLeave = {};
        //  alert(JSON.stringify(leaveTypeKey));
        //    alert(JSON.stringify($scope.leaveBalanceList));
        //   alert(JSON.stringify(days));
        var availableLeave = {};
        for (var i = 0; i < $scope.leaveBalanceList.length; i++) {

            //     alert(leaveTypeKey==$scope.leaveBalanceList[i].leavetypekey);
            if (leaveTypeKey == $scope.leaveBalanceList[i].leavetypekey) {
                availableLeave = $scope.leaveBalanceList[i].availableLeave;



            }

        }

        //       alert(leavesNumber>availableLeave);   
        if (leavesNumber > availableLeave) {

            $scope.avaliableLeave = "Available Leaves are:" + availableLeave

        } else {
            $scope.avaliableLeave = ""
        }




        /* */
        var totalLeaves = 0;

        for (var i = 0; i < days.length; i++) {

            totalLeaves = totalLeaves + Number(days[i].leavesNumber);

        }

        if (noOfDays != totalLeaves) {
            $scope.message = "The Requested leaves sum should be equal to: " + noOfDays

        } else {
            $scope.message = "";
        }

    }


    $scope.removeg = function(entityLeave, index) {

        SweetAlert.swal({
            title: "Are you sure?",
            text: "Do you want to Delete Leave ",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, Delete it!",
            cancelButtonText: "No, cancel!",
            closeOnConfirm: false,
            closeOnCancel: false
        }, function(isConfirm) {
            if (isConfirm) {


                entityLeave.splice(index, 1);
                $scope.leaveList = entityLeave;
                SweetAlert.swal({
                    title: "Leave ",
                    text: "Removed successfully",
                    type: "success",
                    confirmButtonColor: "#007AFF"
                });

            } else {
                SweetAlert.swal({
                    title: "Cancelled",
                    text: "Your leave  is safe :)",
                    type: "error",
                    confirmButtonColor: "#007AFF"
                });
            }
        });

    };




    //   $scope.leaveList=[];
    var leaveID = 1;


    $scope.leaveList = [{
        'leaveID': 1,

        'leaveTypeTitle': "",

        'leavesNumber': "",


    }];
    $scope.addNewPeriod = function() {
        /* $scope.test=false;*/
        leaveID = leaveID + 1;
        /* if(leaveID>=1)
                {
                   $scope.test=true;    
                }
         */

        $scope.leaveList.push({
            'leaveID': leaveID,

            'leaveTypeTitle': "",

            'leavesNumber': "",


        });
    };

    

    $scope.getInstitute = function() {
        instituteLogic.getAllInstitutes($localStorage.organizationKey).then(function(response) {
            $scope.instituteList = response;
        })
    }
    $scope.getInstitute();

    




    function getLeavebalance() {

        applyLeaveLogic.getLeaveBalanceByPersonKey($localStorage.ReferenceKey).then(function(response) {


            var leaveBalance = {};
            var array = [];
            for (var i = 0; i < response.length; i++) {
                leaveBalance = {
                    personkey: response[i].personkey,
                    leavetypekey: response[i].leavetypekey,
                    usedleaves: response[i].usedleaves,
                    availableLeave: response[i].allocatedleaves - response[i].usedleaves,
                    allocatedLeave: response[i].allocatedleaves,
                    leavebalancekey: response[i].leavebalancekey,
                    organizationkey: response[i].organizationkey,
                    startdatetime: response[i].startdatetime,
                    enddatetime: response[i].enddatetime,
                    instanceorganizationkey: response[i].instanceorganizationkey,
                    leavetypetitle: response[i].leavetypetitle

                }
                array.push(leaveBalance);
            }


            $scope.leaveBalanceList = array;




        }, function(err) {

            console.error('ERR', err);

        });


    };

    $scope.sortColumn = "leaveType";
    $scope.sortColumn = "available";
    $scope.sortColumn = "used";
    $scope.sortColumn = "balance";
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

    getLeavebalance();


}); // End of App Controller