/*=======================================================================
 All rights reserved to Thrill Innovative Labs.
 THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
 OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
 LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
 FITNESS FOR A PARTICULAR PURPOSE.
===========================================================================
****************************************************************************
 Name		    	 : RegistrationController.js
 Type		    	 : Javascript and JQuery 
 Description		 : This file contains controller methods
 References		     :
 Author	    		 : Kiranmai Labhala
 Created Date        : 11-April-2016
****************************************************************************
MODIFICATION LOG
**************************************************************************** 
S.No  Ver	Date	        Modified By		Description
1.    1.0   14-April-2016   Kiranmai Labhala    Define datepicker validations     
****************************************************************************  
Code Review LOG
**************************************************************************** 
S.No      Ver        Date                Code Review By            Observations
1         1.0       14-April-2016         Sri Venkatesh.T           Remove "var currentFileName = "Registration";" code which is not requried.
2         1.0       14-April-2016         Sri Venkatesh.T           Rename "editRegistration" function params must be in camel casing 
****************************************************************************
*/

var app = angular.module('ThrillAppBase.branchTypeList', ['ThrillOrganization.SubOrganizationTypeListLogic', 'ngCordova', 'ThrillFrameworkLibrary.geo', 'ThrillFrameworkLibrary.Network', 'ThrillCnnWebClient.appConfig', 'ThrillFrameworkLibrary.appLogger']);
/*Setup Registration Controller */
app.controller('BranchTypeListController', function($scope, $http, SubOrganizationTypeListLogic, $state, $stateParams, $localStorage, appConfig, appLogger, SweetAlert) {



    function getMessages(cultureName) {
        var alertMessageName = "AlertMessages";
        $http.get("Organization/Languages/" + alertMessageName + "." + cultureName + ".json").then(function(response) {
            $scope.alertMessageLabels = response.data.messages;
        });
    }

    $scope.addNew = function() {
        $state.go('app.branchType');
    }

    $scope.sortColumn = "SubOrganizationTypeTitle";
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

    var getBranchTypes = function() {
        SubOrganizationTypeListLogic.getSubOrganizationTypesByOrganizationId($localStorage.organizationKey).then(function(response) {
            //alert(JSON.stringify(response));
            $scope.BranchTypeList = response;
        }, function(err) {
            console.error('ERR', err);
        });
    };
    getBranchTypes();


    $scope.deleteBranch = function(subOrganizationTypeKeyid) {
        SweetAlert.swal({
            title: "Are you sure?",
            text: "Your want to delete this branch type",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, cancel!",
            closeOnConfirm: false,
            closeOnCancel: false
        }, function(isConfirm) {
            if (isConfirm) {
                SweetAlert.swal({
                    title: "Deleted!",
                    text: "Your branch type has been deleted.",
                    type: "success",
                    confirmButtonColor: "#007AFF"
                }, function() {
                    SubOrganizationTypeListLogic.removeSubOrganizationType(subOrganizationTypeKey).then(function(response) {
                        alert("Deleted Successfully");
                        getBranchTypes();
                    }, function(err) {
                        console.error('ERR', err);
                    });
                });
            } else {
                SweetAlert.swal({
                    title: "Cancelled",
                    text: "Your branch type is safe :)",
                    type: "error",
                    confirmButtonColor: "#007AFF"
                });
            }
        });

        /*
        var del = confirm("Are you sure you want to Delete ?");
        if (del == true) {
            SubOrganizationTypeListLogic.removeSubOrganizationType(subOrganizationTypeKey).then(function(response) {
                alert("Deleted Successfully");
                getBranchTypes();
            }, function(err) {
                console.error('ERR', err);
            });
        }*/
    };



});