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

var app = angular.module('mcampuz.Services', ['mcampuz.ServicesLogic', 'ngCordova', 'mcampuz.TaxLogic', 'mcampuz.ServiceCategoryLogic', 'ThrillAcademic.groupLogic', 'ThrillFrameworkLibrary.geo', 'ThrillFrameworkLibrary.Network', 'ThrillCnnWebClient.appConfig', 'ThrillFrameworkLibrary.appLogger', 'ThrillAcademic.boardLogic', 'ThrillAcademic.groupLogic'])
    /*Setup cours Controller */
app.controller('ServicesController', function($scope, $http, TaxLogic, ServicesLogic, ServiceCategoryLogic, groupLogic, $state, $stateParams, $localStorage, boardLogic, SweetAlert, $window, appConfig, appLogger) {


    getLabels(appConfig.CULTURE_NAME);
    getMessages(appConfig.CULTURE_NAME);
    //getAllBoards();

    /*get labels with selected language*/
    function getLabels(cultureName) {
        var currentFileName = "Cours";
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

        $scope.labelsCours = data.labels;

    };

    $scope.save = true;
    $scope.update = false;

    var InstituteKey;
    InstituteKey =$localStorage.LoginInstituteKey;

    $scope.getCategoryList = function() {
        ServiceCategoryLogic.getcategoryList(InstituteKey).then(function(response) {
            //console.log(JSON.stringify(response));
            $scope.CategoryCollection = response;
        });
    }
    $scope.getCategoryList();

    $scope.MeasurementsList = function() {
        ServicesLogic.unitList().then(function(response) {

            $scope.MeasurementCollection = response;
        });
    }
    $scope.MeasurementsList();


    $scope.getservicesList = function() {
        ServicesLogic.getserviceList(InstituteKey).then(function(response) {
            //console.log(JSON.stringify(response));
            $scope.serviceCollection = response;
        });
    }
    $scope.getservicesList();
    $scope.taxs = {};

    $scope.gettaxtypeList = function() {
        TaxLogic.gettaxListActive(InstituteKey).then(function(response) {
       // alert(JSON.stringify(response));
            $scope.TaxCollection = response;
        });
    }
    $scope.gettaxtypeList();



    $scope.saveService = function(taxs) {
        // alert(JSON.stringify(taxs))
        // alert(taxs.length);
        if (taxs.length == undefined) {
            $scope.service.Tax = [];
        } else {
            var object = {};
            var TaxID = [];
            for (var i = 0; i < taxs.length; i++) {
                if (taxs[i].TaxValue == true) {

                    TaxID.push(taxs[i].TaxID);
                    console.log(TaxID);
                    /*   object={
                          TaxID:TaxID
                            
                      }*/
                }

                //  else if (taxs[i].taxvalue == false) {
                //     TaxID.push(null);
                // }
                if (i == (taxs.length) - 1) {
                    $scope.service.Tax = TaxID;
                }
            }
        }
        $scope.service.CreatedUserKey = "new-User-Service";
        $scope.service.CreatedAppKey = "new-App-mCampuZ";
        $scope.service.InstituteKey = InstituteKey;
        console.log(JSON.stringify($scope.service));
        ServicesLogic.addService($scope.service).then(function(response) {

            $scope.service = {};
            $scope.getservicesList();

            $scope.courseForm.$setPristine();
            $scope.courseForm.$setUntouched();

            SweetAlert.swal({
                title: "Service",
                text: "Saved successfully",
                type: "success",
                confirmButtonColor: "#007AFF"
            });
            $scope.gettaxtypeList();

        });

    }




    $scope.editService = function(servicekey) {
        var mainResponse, checkedResponse;
        ServicesLogic.serviceByServiceKey(servicekey).then(function(response) {

            $scope.save = false;
            $scope.update = true;
            console.log(response);
            $scope.service = {};
            $scope.service.ServiceName = response[0].ServiceName;
            $scope.service.ServiceTypeID = response[0].ServiceTypeId;
            $scope.service.Price = response[0].Price;
            $scope.service.UnitMeasurementId = response[0].UnitMeasurementId;
            $scope.service.ServiceType = response[0].ServiceType;
            $scope.service.ServiceKey = response[0].ServiceKey;
            $scope.service.InstituteKey = response[0].InstituteKey;
            $scope.service.ServiceId = response[0].ServiceId;

            TaxLogic.gettaxList(InstituteKey).then(function(response) {
                mainResponse = response;
                console.log(JSON.stringify(mainResponse))
                    // alert(mainResponse.length)
                ServicesLogic.taxByServiceId($scope.service.ServiceId).then(function(response2) {

                    checkedResponse = response2
                    console.log(JSON.stringify(response2))


                    for (var i = 0; i < mainResponse.length; i++) {

                        for (var j = 0; j < checkedResponse.length; j++) {
                            //alert(mainResponse[i].TaxID + ' ' + checkedResponse[j].TaxId)
                            if (mainResponse[i].TaxID === checkedResponse[j].TaxId) {
                                mainResponse[i].TaxValue = true
                            }
                        }
                        // alert(mainResponse[i].TaxValue)

                    }


                    $scope.TaxCollection = mainResponse;
                    // alert(JSON.stringify($scope.TaxCollection));
                });




            });




        });


    }

    $scope.updateService = function(taxs) {
        if (taxs.length == undefined) {
            $scope.service.Tax = [];
        } else {
            var object = {};
            var TaxID = [];
            for (var i = 0; i < taxs.length; i++) {
                if (taxs[i].TaxValue == true) {

                    TaxID.push(taxs[i].TaxID);
                    console.log(TaxID);
                    /*   object={
                          TaxID:TaxID
                            
                      }*/
                }

                //  else if (taxs[i].taxvalue == false) {
                //     TaxID.push(null);
                // }
                if (i == (taxs.length) - 1) {
                    $scope.service.Tax = TaxID;
                }
            }
        }

        $scope.service.LastUpdatedUserKey = "new-User-Service";
        $scope.service.LastUpdatedAppKey = "new-App-mCampuZ";
        console.log($scope.service);
        ServicesLogic.updateService($scope.service, $scope.service.ServiceKey).then(function(response) {
            $scope.service = {};
            $scope.getservicesList();
            $scope.courseForm.$setPristine();
            $scope.courseForm.$setUntouched();

            SweetAlert.swal({
                title: "Service",
                text: "Updated successfully",
                type: "success",
                confirmButtonColor: "#007AFF"
            }); // $scope.getCategoryList();
            $scope.gettaxtypeList();
        });
    }

    $scope.deleteService = function(key) {
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
                ServicesLogic.deleteService(key).then(function(response) {
                    $scope.getservicesList();
                    SweetAlert.swal({
                        title: "Service",
                        text: "Deleted successfully",
                        type: "success",
                        confirmButtonColor: "#007AFF"
                    });

                });
            } else {
                SweetAlert.swal({
                    title: "Cancelled",
                    text: "Service is safe :)",
                    type: "error",
                    confirmButtonColor: "#007AFF"
                });
            }
        });

    }


}); // End of App Controller