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

var app = angular.module('ThrillAppBase.branchType', ['ThrillOrganization.SubOrganizationTypeLogic', 'ngCordova', 'ThrillFrameworkLibrary.geo', 'ThrillFrameworkLibrary.Network', 'ThrillCnnWebClient.appConfig', 'ThrillFrameworkLibrary.appLogger']);
/*Setup Registration Controller */
app.controller('BranchTypeController', function($scope, $http, subOrganizationTypeLogic, $state, $stateParams, appConfig, $localStorage, appLogger, SweetAlert) {

    function getMessages(cultureName) {
        var alertMessageName = "AlertMessages";
        $http.get("Organization/Languages/" + alertMessageName + "." + cultureName + ".json").then(function(response) {
            $scope.alertMessageLabels = response.data.messages;
        });
    }
    $scope.branchtype = {};

    $scope.save = true;
    $scope.update = false;


    $scope.branchtype.organizationKey = $localStorage.organizationKey;
    $scope.addBranch = function() {

        /* if(appConfig.APP_MODE == 'offline'){
             $scope.orgBasicInfo.ReferenceKey=referenceKey;
         }*/
        // alert(JSON.stringify($scope.branchtype));
        subOrganizationTypeLogic.addSubOrganizationType($localStorage.organizationKey, $scope.branchtype).then(function(response) {
            // alert(JSON.stringify(response));
            // alert("Saved Successfully")

            SweetAlert.swal({
                title: "Branch Type",
                text: "Saved successfully",
                type: "success",
                confirmButtonColor: "#007AFF"
            }, function() {
                $state.go('app.branchTypeList');
            });

        }, function(err) {
            console.error('ERR', err);
        });
    };


    if ($stateParams.branchTypeKey) {
        subOrganizationTypeLogic.getSubOrganizationType($localStorage.organizationKey, $stateParams.branchTypeKey).then(function(response) {

            $scope.save = false;
            $scope.update = true;

            $scope.branchtype = {};
            $scope.branchtype.subOrganizationTypeTitle = response.subOrganizationTypeTitle;
            $scope.branchtype.organizationKey = response.organizationKey;
            $scope.branchtype.subOrganizationTypeKey = response.subOrganizationTypeKey;

            // $scope.orgBasicInfo.Referencekey = response.Referencekey;
        }, function(err) {
            console.error('ERR', err);

        });
    }

    $scope.UpdateBranch = function() {
        // alert(JSON.stringify($scope.branchtype));
        subOrganizationTypeLogic.updateSubOrganizationType($localStorage.organizationKey, $scope.branchtype, $stateParams.branchTypeKey).then(function(response) {
            //alert("Updated Successfully");
            SweetAlert.swal({
                title: "Branch Type",
                text: "Updated successfully",
                type: "success",
                confirmButtonColor: "#007AFF"
            }, function() {
                $state.go('app.branchTypeList');
            });
            //$state.go('app.branchTypeList');
        }, function(err) {
            console.error('ERR', err);
        });

    };

    $scope.cancel = function() {
        $state.go('app.branchTypeList')
    }


});