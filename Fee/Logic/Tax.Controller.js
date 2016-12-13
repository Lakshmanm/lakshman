/*//=============================================================================
// All rights reserved to Thrill Innovative Labs.
// THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
// OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
// LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
// FITNESS FOR A PARTICULAR PURPOSE.
//=============================================================================
//*****************************************************************************
//* Name		    	: Examination.Controller.js 
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

var app = angular.module('mcampuz.TaxController', ['mcampuz.TaxLogic'

        , 'ngCordova', 'ThrillAcademic.examinationTypeLogic', 'ThrillFrameworkLibrary.geo', 'ThrillFrameworkLibrary.Network', 'ThrillCnnWebClient.appConfig', 'ThrillFrameworkLibrary.appLogger'
    ])
    /*Setup examination Controller */
app.controller('TaxController', function($scope, $http, SweetAlert, TaxLogic, examinationTypeLogic, $state, $stateParams, appConfig, $localStorage, appLogger) {
    getLabels(appConfig.CULTURE_NAME);
    getMessages(appConfig.CULTURE_NAME);

    /*get labels with selected language*/
    function getLabels(cultureName) {
        var currentFileName = "Examination";
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

        $scope.labelsExamination = data.labels;

    };
    $scope.save = true;
    $scope.update = false;

    var entitykey = DrawCaptcha();
    var examinationEntityKey;
    var InstituteKey;
    InstituteKey = $localStorage.LoginInstituteKey;

    $scope.gettaxList = function() {
        TaxLogic.gettaxList(InstituteKey).then(function(response) {
            //console.log(JSON.stringify(response));
            $scope.TaxCollection = response;
        });
    }
    $scope.gettaxList();
    $scope.taxval = function(value) {
        if (value > 100) {
            $scope.msg = "% Cannot be greater than 100"
        }else{
             $scope.msg ="";
        }

    }

    $scope.saveTax = function() {

if($scope.tax.IsActive==true){
    $scope.tax.IsActive=1;

}
else{
    $scope.tax.IsActive=0;
}
       
        $scope.tax.CreatedUserKey = "new-User-tax";
        $scope.tax.CreatedAppKey = "new-App-mCampuZ";
        $scope.tax.InstituteKey = InstituteKey;
        if ($scope.tax.TaxValue <= 100) {
            alert($scope.tax.IsActive)
            alert(JSON.stringify($scope.tax));

            TaxLogic.addTax($scope.tax).then(function(response) {
                $scope.tax = {};
                $scope.gettaxList();
                $scope.examinationForm.$setPristine();
                $scope.examinationForm.$setUntouched();

                SweetAlert.swal({
                    title: "Tax",
                    text: "Saved successfully",
                    type: "success",
                    confirmButtonColor: "#007AFF"
                });
                //$scope.getCategoryList();
            });

        }

    }

    $scope.editTax = function(taxkey) {
        TaxLogic.gettaxBytaxkey(taxkey).then(function(response) {
          // alert(response[0].IsActive.data[0]);
            $scope.save = false;
            $scope.update = true;
            $scope.tax = {};
            $scope.tax.TaxName = response[0].TaxName;
            $scope.tax.TaxValue = response[0].TaxValue;
            $scope.tax.IsActive = response[0].IsActive.data[0] == 1 ? true : false;
            $scope.tax.InstituteKey = response[0].InstituteKey;
            $scope.tax.TaxKey = response[0].TaxKey;




        });


    }


    $scope.updateTax = function() {

       if($scope.tax.IsActive==true){
    $scope.tax.IsActive=01;

}
else{
    $scope.tax.IsActive=00;
}
    
        $scope.tax.LastUpdatedUserKey = "new-User-tax";
        $scope.tax.LastUpdatedAppKey = "new-App-mCampuZ";
        TaxLogic.updateTax($scope.tax, $scope.tax.TaxKey).then(function(response) {
            $scope.tax = {};
            $scope.gettaxList();
            $scope.examinationForm.$setPristine();
            $scope.examinationForm.$setUntouched();

            SweetAlert.swal({
                title: "Tax",
                text: "Updated successfully",
                type: "success",
                confirmButtonColor: "#007AFF"
            }); // $scope.getCategoryList();
        });
    }

    $scope.deleteTax = function(key) {
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
                TaxLogic.deleteTax(key).then(function(response) {
                    $scope.gettaxList();
                    SweetAlert.swal({
                        title: "Tax",
                        text: "Deleted successfully",
                        type: "success",
                        confirmButtonColor: "#007AFF"
                    });
                });
            } else {
                SweetAlert.swal({
                    title: "Cancelled",
                    text: "Tax is safe :)",
                    type: "error",
                    confirmButtonColor: "#007AFF"
                });
            }
        });
    }



}); // End of App Controller