/*//=============================================================================
// All rights reserved to Thrill Innovative Labs.
// THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
// OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
// LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
// FITNESS FOR A PARTICULAR PURPOSE.
//=============================================================================
//*****************************************************************************
//* Name		    	: SpecializationList.Controller.js 
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

var app = angular.module('ThrillAppBase.specializationList', ['ThrillAppBase.specializationLogic'
        // , 'ThrillAppBase.masterDataLogic'
        , 'ngCordova', 'ThrillFrameworkLibrary.geo', 'ThrillFrameworkLibrary.Network', 'ThrillCnnWebClient.appConfig', 'ThrillFrameworkLibrary.appLogger'
    ])
    /*Setup specialization Controller */
app.controller('SpecializationListController', function($scope, $http, specializationLogic, appConfig, appLogger, $localStorage, SweetAlert) {
    getLabels(appConfig.CULTURE_NAME);
    getMessages(appConfig.CULTURE_NAME);

    /*get labels with selected language*/
    function getLabels(cultureName) {
        var currentFileName = "SpecializationList";
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
            specializationTitle: data.labels.specializationTitle,
            specializationDetails: data.labels.specializationDetails,
            edit: data.labels.edit,
            delete: data.labels.delete,
            specializationList: data.labels.specializationList,
            specializationHeading: data.labels.specializationHeading
        };

        $scope.labelsSpecializationList = labels;

    };

    $scope.sortColumn = "specializationTitle";
    $scope.sortColumn = "specializationDetails";

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

    var refresh = function() {
        specializationLogic.getOrganizationSpecializations($localStorage.organizationKey).then(function(response) {
            $scope.specializationCollection = response;
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


    /*Method for calling  deleting   Specialization*/
    $scope.deleteSpecialization = function(specializationEntityKey) {

        SweetAlert.swal({
            title: "Are you sure?",
            text: "You want to delete this specialization",
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
                    text: "Your specialization has been deleted.",
                    type: "success",
                    confirmButtonColor: "#007AFF"
                }, function() {
                    specializationLogic.deleteSpecialization(specializationEntityKey).then(function(response) {
                        //appLogger.alert($scope.alertMessageLabels.specializationDeleted);
                        refresh();
                    }, function(err) {
                        appLogger.error('ERR', err);
                    });
                });
            } else {
                SweetAlert.swal({
                    title: "Cancelled",
                    text: "Your specialization is safe :)",
                    type: "error",
                    confirmButtonColor: "#007AFF"
                });
            }
        });

        /*
        		var del = confirm("Are you sure you want to Delete ?");
        		if (del == true) {
		
        			specializationLogic.deleteSpecialization(specializationEntityKey).then(function(response) {
        				appLogger.alert($scope.alertMessageLabels.specializationDeleted);
        				refresh();
        			}, function(err) {
        				appLogger.error('ERR', err);
        			});
        		}*/
    };

}); // End of App Controller