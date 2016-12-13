/*//=============================================================================
// All rights reserved to Thrill Innovative Labs.
// THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
// OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
// LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
// FITNESS FOR A PARTICULAR PURPOSE.
//=============================================================================
//*****************************************************************************
//* Name		    	: Specialization.Controller.js 
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

var app = angular.module('ThrillAppBase.specialization', ['ThrillAppBase.specializationLogic'
        // , 'ThrillAppBase.masterDataLogic'
        , 'ngCordova', 'ThrillFrameworkLibrary.geo', 'ThrillFrameworkLibrary.Network', 'ThrillCnnWebClient.appConfig', 'ThrillFrameworkLibrary.appLogger'
    ])
    /*Setup specialization Controller */
app.controller('SpecializationController', function($scope, $http, specializationLogic, $state, $stateParams, appConfig, appLogger, $localStorage, SweetAlert) {
    getLabels(appConfig.CULTURE_NAME);
    getMessages(appConfig.CULTURE_NAME);

    $scope.entitySpecialization = {};
    $scope.entitySpecialization.organizationKey = $localStorage.organizationKey

    /*get labels with selected language*/
    function getLabels(cultureName) {
        var currentFileName = "Specialization";
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
            organizationKey: data.labels.organizationKey,
            submit: data.labels.submit,
            specializationHeading: data.labels.specializationHeading
        };

        $scope.labelsSpecialization = labels;

    };

    var entitykey = DrawCaptcha();
    var specializationEntityKey;

    /*Perform the CRUD (Create, Read, Update & Delete) operations of Specialization*/
    /*Method for calling  add Specialization */
    $scope.addSpecialization = function() {
        if (appConfig.APP_MODE == 'offline') {
            $scope.entitySpecialization.specializationKey = entitykey;
        }
        specializationLogic.addSpecialization($scope.entitySpecialization).then(function(response) {
            //appLogger.alert($scope.alertMessageLabels.specializationSaved);
            SweetAlert.swal({
                title: "Specialization",
                text: "Saved successfully",
                type: "success",
                confirmButtonColor: "#007AFF"
            }, function() {
                $state.go('app.SpecializationList');
            });


        }, function(err) {
            appLogger.error('ERR', err);
        });
    };

    /*Method for calling  update Specialization*/
    $scope.updateSpecialization = function() {
        specializationLogic.updateSpecialization($scope.entitySpecialization, $stateParams.specializationKey).then(function(response) {
            //appLogger.alert($scope.alertMessageLabels.specializationUpdated);
            SweetAlert.swal({
                title: "Specialization",
                text: "Updated successfully",
                type: "success",
                confirmButtonColor: "#007AFF"
            }, function() {
                $state.go('app.SpecializationList');
            });


        }, function(err) {
            appLogger.error('ERR', err);
        });
    };

    /*Method for  retrieving  Specialization details*/
    if ($stateParams.specializationKey) {
        specializationLogic.getSpecializationBySpecializationKey($stateParams.specializationKey).then(function(response) {
            $scope.entitySpecialization = response[0];
            $scope.entitySpecialization.specializationKey = response[0].specializationKey;
            $scope.entitySpecialization.organizationKey = response[0].organizationKey;
            $scope.entitySpecialization.specializationTitle = response[0].specializationTitle;
            $scope.entitySpecialization.specializationDetails = response[0].specializationDetails;
        }, function(err) {
            appLogger.error('ERR', err);
        });
    }

    $scope.cancel = function() {
        $state.go('app.SpecializationList')
    }

}); // End of App Controller