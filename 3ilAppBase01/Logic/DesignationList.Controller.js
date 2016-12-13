/*//=============================================================================
// All rights reserved to Thrill Innovative Labs.
// THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
// OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
// LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
// FITNESS FOR A PARTICULAR PURPOSE.
//=============================================================================
//*****************************************************************************
//* Name		    	: DesignationList.Controller.js 
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

var app = angular.module('ThrillAppBase.designationList', ['ThrillAppBase.designationLogic'

        , 'ngCordova'

        , 'ThrillFrameworkLibrary.geo'

        , 'ThrillFrameworkLibrary.Network'

        , 'ThrillCnnWebClient.appConfig'

        , 'ThrillFrameworkLibrary.appLogger'
    ])
    /*Setup designation Controller */
app.controller('DesignationListController', function($scope, $http, designationLogic, appConfig, appLogger, $localStorage, SweetAlert) {

    getLabels(appConfig.CULTURE_NAME);
    getMessages(appConfig.CULTURE_NAME);

    /*get labels with selected language*/
    function getLabels(cultureName) {
        var currentFileName = "DesignationList";
        $http.get("3ilAppBase01/Languages/" + currentFileName + "." + cultureName + ".json").then(function(response) {
            bindLabels(response.data);

        });
    }

    function getMessages(cultureName) {
        var alertMessageName = "AlertMessages";

        $http.get("3ilAppBase01/Languages/" + alertMessageName + "." + cultureName + ".json").then(function(response) {
            $scope.alertMessageLabels = response.data.messages;
        });
    }

    /*bind labels with selected language */
    function bindLabels(data) {
        var labels = {
            designationTitle: data.labels.designationTitle,
            designationDetails: data.labels.designationDetails,
            edit: data.labels.edit,
            delete: data.labels.delete,
            designationList: data.labels.designationList,
            designationHeading: data.labels.designationHeading
        };

        $scope.labelsDesignationList = labels;

    };

    $scope.sortColumn = "designationTitle";
    $scope.sortColumn = "designationDetails";

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



    function getAllDesignations() {

        $scope.designationCollection = [];
        designationLogic.getOrganizationDesignations($localStorage.organizationKey).then(function(response) {
            $scope.designationCollection = response;
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
    getAllDesignations();


    /*Method for calling  deleting   Designation*/
    $scope.deleteDesignation = function(designationEntityKey) {

        SweetAlert.swal({
            title: "Are you sure?",
            text: "You want to delete this designation",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, cancel!",
            closeOnConfirm: false,
            closeOnCancel: false
        }, function(isConfirm) {
            if (isConfirm) {

                designationLogic.deleteDesignation(designationEntityKey).then(function(response) {
                    // appLogger.alert($scope.alertMessageLabels.designationDeleted);
                    SweetAlert.swal({
                        title: "Deleted!",
                        text: "Your designation has been deleted.",
                        type: "success",
                        confirmButtonColor: "#007AFF"
                    }, function() {
                        getAllDesignations();
                    })


                }, function(err) {
                    appLogger.error('ERR', err);
                });

            } else {
                SweetAlert.swal({
                    title: "Cancelled",
                    text: "Your designation is safe :)",
                    type: "error",
                    confirmButtonColor: "#007AFF"
                });
            }
        });

        /*
        var del = confirm("Are you sure you want to Delete ?");
        if (del == true) {
            designationLogic.deleteDesignation(designationEntityKey).then(function(response) {
                appLogger.alert($scope.alertMessageLabels.designationDeleted);
                getAllDesignations();
            }, function(err) {
                appLogger.error('ERR', err);
            });
        }*/
    };

}); // End of App Controller