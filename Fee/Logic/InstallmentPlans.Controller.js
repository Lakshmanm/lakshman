/*//=============================================================================
// All rights reserved to Thrill Innovative Labs.
// THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
// OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
// LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
// FITNESS FOR A PARTICULAR PURPOSE.
//=============================================================================
//*****************************************************************************
//* Name		    	: ElectiveGroup.Controller.js 
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

var app = angular.module('mcampuz.InstallmentPlans', ['mcampuz.InstallmentPlansLogic', 'ThrillAcademic.termLogic', 'ngCordova', 'ThrillAcademic.boardLogic', 'ThrillAcademic.groupLogic', 'ThrillAcademic.coursLogic'

        , 'ThrillFrameworkLibrary.geo', 'ThrillFrameworkLibrary.Network', 'ThrillCnnWebClient.appConfig', 'ThrillFrameworkLibrary.appLogger'
    ])
    /*Setup electiveGroup Controller */
app.controller('InstallmentPlans', function($scope, $http, termLogic, boardLogic, groupLogic, coursLogic, InstallmentPlansLogic, $state, $stateParams, $localStorage, SweetAlert, appConfig, appLogger) {
    getLabels(appConfig.CULTURE_NAME);
    getMessages(appConfig.CULTURE_NAME);

    function getLabels(cultureName) {
        var currentFileName = "ElectiveGroup";
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
        /*var labels = {
		electiveGroupTitle: data.labels.electiveGroupTitle,
		minimumSubjects: data.labels.minimumSubjects,
		maximumSubjects: data.labels.maximumSubjects,
		submit: data.labels.submit,
		electiveGroupHeading: data.labels.electiveGroupHeading
	};*/

        $scope.labelsElectiveGroup = data.labels;
    };

    $scope.save = true;
    $scope.update = false;
    var InstituteKey;
    InstituteKey = $localStorage.LoginInstituteKey;

    $scope.getPlansList = function() {
        InstallmentPlansLogic.getplanList(InstituteKey).then(function(response) {
            //console.log(JSON.stringify(response));
            $scope.PlanCollection = response;
        });
    }
    $scope.getPlansList();
    $scope.chargeVal = function(value) {
        if (value > 100) {
            $scope.msg = "% Cannot be greater than 100"
        }else{
            $scope.msg ="";
        }

    }

    $scope.savePlan = function(value) {

        if ($scope.plan.AdditionalCharges <= 100) {

            $scope.plan.CreatedUserKey = "new-User-tax";
            $scope.plan.CreatedAppKey = "new-App-mCampuZ";
            $scope.plan.InstituteKey = InstituteKey;
            // alert(JSON.stringify($scope.plan));

            InstallmentPlansLogic.addPlan($scope.plan).then(function(response) {
                $scope.plan = {};
                $scope.getPlansList();
                $scope.electiveGroupForm.$setPristine();
                $scope.electiveGroupForm.$setUntouched();

                SweetAlert.swal({
                    title: "Installment Plan",
                    text: "Saved successfully",
                    type: "success",
                    confirmButtonColor: "#007AFF"
                });
                //$scope.getCategoryList();
            });
        }

    }



    $scope.editPlan = function(plankey) {
        InstallmentPlansLogic.planByplankey(plankey).then(function(response) {
            $scope.save = false;
            $scope.update = true;
            //console.log(response);
            $scope.plan = {};
            $scope.plan.InstallmentPlanName = response[0].InstallmentPlanName;
            $scope.plan.Tenure = response[0].Tenure;
            $scope.plan.AdditionalCharges = response[0].AdditionalCharges;
            $scope.plan.ProcessingFee = response[0].ProcessingFee;
            $scope.plan.InstallmentGap = response[0].InstallmentGap;
            $scope.plan.InstallmentPlankey = response[0].InstallmentPlankey;
            $scope.plan.InstituteKey = response[0].InstituteKey;




        });


    }


    $scope.updatePlan = function() {


        $scope.plan.LastUpdatedUserKey = "new-User-InstallmentPlan";
        $scope.plan.LastUpdatedAppKey = "new-App-mCampuZ";
        InstallmentPlansLogic.updatePlan($scope.plan, $scope.plan.InstallmentPlankey).then(function(response) {
            $scope.plan = {};
            $scope.getPlansList();
            $scope.electiveGroupForm.$setPristine();
            $scope.electiveGroupForm.$setUntouched();

            SweetAlert.swal({
                title: "Installment Plan",
                text: "Updated successfully",
                type: "success",
                confirmButtonColor: "#007AFF"
            }); // $scope.getCategoryList();
        });
    }

    $scope.deletePlan = function(key) {
        var del = confirm("Are you sure you want to Delete ?");
        if (del == true) {
            InstallmentPlansLogic.deletePlan(key).then(function(response) {
                $scope.getPlansList();
                SweetAlert.swal({
                    title: "Installment Plan",
                    text: "Deleted successfully",
                    type: "success",
                    confirmButtonColor: "#007AFF"
                });

            });
        }
    }


}); // End of App Controller