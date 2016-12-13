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

var app = angular.module('ThrillInstitute.leaveType', [
        'ngCordova',
        'ThrillInstitute.leaveTypeLogic',

        , 'ThrillFrameworkLibrary.geo', 'ThrillFrameworkLibrary.Network', 'ThrillCnnWebClient.appConfig', 'ThrillFrameworkLibrary.appLogger'

    ])
    /*Setup cours Controller */
app.controller('leaveTypeController', function($scope, leaveTypeLogic, $http, $state, $stateParams, $localStorage, SweetAlert, appConfig, appLogger) {


    getLabels(appConfig.CULTURE_NAME);
    getMessages(appConfig.CULTURE_NAME);

    /*get labels with selected language*/
    function getLabels(cultureName) {
        var currentFileName = "Term";
        $http.get("Institute/Languages/" + currentFileName + "." + cultureName + ".json").then(function(response) {
            bindLabels(response.data);

        });
    }

    function getMessages(cultureName) {
        var alertMessageName = "AlertMessages";

        $http.get("Institute/Languages/" + alertMessageName + "." + cultureName + ".json").then(function(response) {
            $scope.alertMessageLabels = response.data.messages;
        });
    }

    /*bind labels with selected language */
    function bindLabels(data) {

        $scope.labelsLeave = data.labels;

    };




    /*Perform the CRUD (Create, Read, Update & Delete) operations of Cours*/
    /*Method for calling  add Cours */




    $scope.saveLeave = function(entityleave) {
        var leaveTypeKey = [];

        for (var i = 0; i < entityleave.length; i++) {
            if (entityleave[i].leaveCheck == true) {
                leaveTypeKey.push(entityleave[i].leaveTypeKey)
            }

        }
        var object = {
            leaveTypeKey: leaveTypeKey,
            instanceOrganizationKey: $localStorage.organizationKey,
            organizationKey: $stateParams.instituteKey
        }

        leaveTypeLogic.addInstituteLeaves(object).then(function(response) {
            SweetAlert.swal({
                title: "Leave Types",
                text: "Saved successfully",
                type: "success",
                confirmButtonColor: "#007AFF"
            });
            $scope.addLeavebalance(object);
            $scope.addLeaveApprover();

        }, function(err) {
            appLogger.error('ERR', err);
        });

    }


    if($localStorage.RoleID==2)
    {
        
        $scope.savebtn=false;
    }
    else{
         $scope.savebtn=true;
           
    }
    

    $scope.addLeavebalance = function(object) {

        var leaveBalance = [];
        var object = object.leaveTypeKey;
        for (var i = 0; i < object.length; i++) {
            var leaveObject = {
                personKey: $localStorage.ReferenceKey,
                leaveTypeKey: object[i],
                allocatedLeaves: 7,
                startDate: "2016-01-01",
                endDate: "2018-01-01",
                organizationKey: $stateParams.instituteKey,
                instanceOrganizationKey: $localStorage.organizationKey

            }
            leaveBalance.push(leaveObject);

        }
        console.log(leaveBalance);
        leaveTypeLogic.addLeavebalance(leaveBalance).then(function(response) {

        });
    };


 /*   $scope.addLeaveApprover = function() {
        var leaveApprover = [{
            requesterPersonKey: $localStorage.ReferenceKey,
            approverPersonKey: "60abd750-91ed-11e6-a366-cdc9edb202ff",
            startDateTime: "2016-01-01",
            endDateTime: "2018-01-01",
            instanceOrganizationKey: $localStorage.ossrganizationKey
        }]

        leaveTypeLogic.addLeaveApprover(leaveApprover).then(function(response) {



        });




    };*/






    var mainresp = {};
    var secondresp = {};
    // method for boardLogic
    function getLeaves() {
        leaveTypeLogic.getLeavesByInstituteOrganizationKey($localStorage.organizationKey).then(function(response) {
            console.log(response);
            var array = [];
            for (var i = 0; i < response.length; i++) {
                var object = {
                    leaveTypeTitle: response[i].leavetypetitle,
                    leaveTypeKey: response[i].leavetypekey,
                    instanceOrganizationKey: response[i].instanceorganizationkey,

                    leaveCheck: false
                }
                array.push(object);
                if (i == (response.length) - 1) {


                    mainresp = {
                        data: array
                    }


                }

            }
            //  $scope.leaveCollection = array;        
            if ($stateParams.instituteKey != undefined) {

                leaveTypeLogic.getLeavesByInstituteKey($stateParams.instituteKey).then(function(resp) {


                    var sarray = [];
                    for (var i = 0; i < resp.length; i++) {
                        var object = {
                            leaveTypeTitle: resp[i].leavetypetitle,
                            leaveTypeKey: resp[i].leavetypekey,
                            instanceOrganizationKey: resp[i].instanceorganizationkey,

                            leaveCheck: true
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
                            if (item.leaveTypeKey == data[i].leaveTypeKey) {
                                // ignore duplicates
                                insertIndex = -1;
                                break;
                            }
                        }
                        if (insertIndex == data.length) {
                            data.push(item);
                        } else if (insertIndex != -1) {
                            data.splice(insertIndex, 0, item);
                        }
                    }

                    var final = merge(secondresp, mainresp);




                    $scope.leaveCollection = final.data;


                })
            } else {
                $scope.leaveCollection = response;
            }


        }, function(err) {
            appLogger.error('ERR', err);
        });

    }

    getLeaves();



}); // End of App Controller