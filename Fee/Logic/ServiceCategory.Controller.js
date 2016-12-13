/*//=============================================================================
// All rights reserved to Thrill Innovative Labs.
// THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
// OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
// LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
// FITNESS FOR A PARTICULAR PURPOSE.
//=============================================================================
//*****************************************************************************
//* Name		    	: Board.Controller.js 
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

var app = angular.module('mcampuz.ServiceCategory', ['mcampuz.ServiceCategoryLogic', 'ngCordova', 'ngStorage', 'ThrillFrameworkLibrary.geo', 'ThrillFrameworkLibrary.Network', 'ThrillCnnWebClient.appConfig', 'ThrillFrameworkLibrary.appLogger'])
    /*Setup board Controller */
app.controller('ServiceCategory', function($scope, $http, ServiceCategoryLogic, $state, $localStorage, $stateParams, appConfig, appLogger, SweetAlert) {

    getLabels(appConfig.CULTURE_NAME);
    getMessages(appConfig.CULTURE_NAME);
    /*get labels with selected language*/
    function getLabels(cultureName) {


        var currentFileName = "Board";
        console.log("Fee/Languages/" + currentFileName + "." + cultureName + ".json");
        $http.get("Fee/Languages/" + currentFileName + "." + cultureName + ".json").then(function(response) {

            bindLabels(response.data);

        });
    }

    function getMessages(cultureName) {
        var alertMessageName = "AlertMessages";

        $http.get("Fee/Languages/" + alertMessageName + "." + cultureName + ".json").then(function(response) {
            $scope.alertMessageLabels = response.data.messages;
        });
    }

    /*bind labels with selected language */
    function bindLabels(data) {


        $scope.labelsFee = data.labels;

    };
    $scope.save = true;
    $scope.update = false;
    var InstituteKey;
    InstituteKey = $localStorage.LoginInstituteKey;

    $scope.getCategoryList = function() {
       // alert(InstituteKey);
        ServiceCategoryLogic.getcategoryList(InstituteKey).then(function(response) {
            //console.log(JSON.stringify(response));
            $scope.CategoryCollection = response;
        });
    }
    $scope.getCategoryList();



    $scope.saveCategory = function() {

        $scope.category.CreatedUserKey = "new-User-tax";
        $scope.category.CreatedAppKey = "new-App-mCampuZ";
        $scope.category.InstituteKey = InstituteKey;
      // alert(JSON.stringify($scope.category));

        ServiceCategoryLogic.addCategory($scope.category).then(function(response) {
            $scope.category = {};
            $scope.getCategoryList();
            $scope.boardForm.$setPristine();
            $scope.boardForm.$setUntouched();

            SweetAlert.swal({
                title: "Service Category",
                text: "Saved successfully",
                type: "success",
                confirmButtonColor: "#007AFF"
            });
            //$scope.getCategoryList();
        });

    }



    $scope.editCategory = function(categorykey) {
        ServiceCategoryLogic.CategoryByCategoryKey(categorykey).then(function(response) {
            $scope.save = false;
            $scope.update = true;
            //console.log(response);
            $scope.category = {};
            $scope.category.ServiceTypeName = response[0].ServiceTypeName;
            $scope.category.Description = response[0].Description;
            $scope.category.ServiceTypeKey = response[0].ServiceTypeKey;
            $scope.category.InstituteKey = response[0].InstituteKey;



        });


    }


    $scope.updateServiceCategory = function() {


        $scope.category.LastUpdatedUserKey = "new-User-InstallmentPlan";
        $scope.category.LastUpdatedAppKey = "new-App-mCampuZ";
        ServiceCategoryLogic.updateCategory($scope.category, $scope.category.ServiceTypeKey).then(function(response) {
            $scope.category = {};
            $scope.getCategoryList();
            $scope.boardForm.$setPristine();
            $scope.boardForm.$setUntouched();

            SweetAlert.swal({
                title: "Service Category",
                text: "Updated successfully",
                type: "success",
                confirmButtonColor: "#007AFF"
            });
            $scope.getCategoryList();
        });
    }


    $scope.deleteCategory = function(key) {
        SweetAlert.swal({
            title: "Are you sure?",
            text: "You want to Delete?",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, cancel!",
            closeOnConfirm: false,
            closeOnCancel: false
        }, function(isConfirm) {
            if (isConfirm) {
                ServiceCategoryLogic.deleteCategory(key).then(function(response) {
                    $scope.getCategoryList();
                    SweetAlert.swal({
                        title: "Service Category",
                        text: "Deleted successfully",
                        type: "success",
                        confirmButtonColor: "#007AFF"
                    });

                });
            } else {
                SweetAlert.swal({
                    title: "Cancelled",
                    text: "Service Category is safe :)",
                    type: "error",
                    confirmButtonColor: "#007AFF"
                });
            }
        });
    }

}); // End of App Controller