/*//=============================================================================
// All rights reserved to Thrill Innovative Labs.
// THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
// OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
// LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
// FITNESS FOR A PARTICULAR PURPOSE.
//=============================================================================
//*****************************************************************************
//* Name		    	: Designation.Controller.js 
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

var app = angular.module('ThrillAppBase.designation', ['ThrillAppBase.designationLogic'
        // , 'ThrillAppBase.masterDataLogic'
        , 'ngCordova', 'ThrillFrameworkLibrary.geo', 'ThrillFrameworkLibrary.Network', 'ThrillCnnWebClient.appConfig', 'ThrillFrameworkLibrary.appLogger'
    ])
    /*Setup designation Controller */
app.controller('DesignationController', function($scope, $http, designationLogic, $state, $stateParams, appConfig, appLogger, $localStorage, SweetAlert) {
    getLabels(appConfig.CULTURE_NAME);
    getMessages(appConfig.CULTURE_NAME);

    $scope.entityDesignation = {};
    $scope.entityDesignation.organizationKey = $localStorage.organizationKey

    /*get labels with selected language*/
    function getLabels(cultureName) {
        var currentFileName = "Designation";
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
            submit: data.labels.submit,
            organizationKey: data.labels.organizationKey,
            designationHeading: data.labels.designationHeading
        };

        $scope.labelsDesignation = labels;

    };

    var entitykey = DrawCaptcha();
    var designationEntityKey;

    /*Perform the CRUD (Create, Read, Update & Delete) operations of Designation*/
    /*Method for calling  add Designation */
    $scope.addDesignation = function() {

        if (appConfig.APP_MODE == 'offline') {
            $scope.entityDesignation.designationKey = entitykey;
        }
        designationLogic.addDesignation($scope.entityDesignation).then(function(response) {

            SweetAlert.swal({
                title: "Designation",
                text: "Saved successfully",
                type: "success",
                confirmButtonColor: "#007AFF"
            }, function() {
                $state.go('app.DesignationList');
            });


            // appLogger.alert($scope.alertMessageLabels.designationSaved);

        }, function(err) {
            appLogger.error('ERR', err);
        });
    };

    /*Method for calling  update Designation*/
    $scope.updateDesignation = function() {
        console.log(JSON.stringify($scope.entityDesignation));
        designationLogic.updateDesignation($scope.entityDesignation, $stateParams.designationKey).then(function(response) {
            // appLogger.alert($scope.alertMessageLabels.designationUpdated);
            SweetAlert.swal({
                title: "Designation",
                text: "Updated successfully",
                type: "success",
                confirmButtonColor: "#007AFF"
            }, function() {
                $state.go('app.DesignationList');
            });

        }, function(err) {
            appLogger.error('ERR', err);
        });
    };

    /*Method for  retrieving  Designation details*/
    if ($stateParams.designationKey) {
        designationLogic.getDesignationByDesignationKey($stateParams.designationKey).then(function(response) {
            $scope.entityDesignation = response[0];
            // $scope.entityDesignation.designationKey = response[0].designationKey;
            $scope.entityDesignation.organizationKey = response[0].organizationKey;
            $scope.entityDesignation.designationTitle = response[0].designationTitle;
            $scope.entityDesignation.designationDetails = response[0].designationDetails;
        }, function(err) {
            appLogger.error('ERR', err);
        });
    }

    $scope.cancel = function() {
        $state.go('app.DesignationList')
    }

}); // End of App Controller