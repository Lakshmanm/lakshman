var app = angular.module('ThrillAppBase.EditOrg', ['ThrillAppBase.OrganizationListLogic'


    , 'ThrillOrganization.organizationLogic'
    /* , 'ngCordova'
     , 'ThrillFrameworkLibrary.geo'
     , 'ThrillFrameworkLibrary.Network'
     , 'ThrillCnnWebClient.appConfig'
     , 'ThrillFrameworkLibrary.appLogger'*/
]);



app.controller('ThrillAppBase.EditOrg', function($scope, $http, appOrganizationListLogic, organizationLogic, $state, $stateParams, appConfig, Password, appLogger, SweetAlert) {

    //  $scope.org={name:"abcd",description:"description"}
    var ReferenceKey = {};
    $scope.edit = {};
    if ($stateParams.ReferenceKey) {
        organizationLogic.getOrganizationInfoById($stateParams.ReferenceKey).then(function(response) {
            console.log(JSON.stringify(response));
            $scope.orgBasicInfo = response;
            /*
            $scope.orgBasicInfo.organizationName = response.organizationName;
            $scope.orgBasicInfo.parentOrganizationID = response.parentOrganizationID;
            $scope.orgBasicInfo.organizationLevelID = response.organizationLevelID;
            $scope.orgBasicInfo.organizationDetails = response.organizationDetails;*/
            // $scope.orgBasicInfo.Referencekey = response.Referencekey;
        }, function(err) {
            console.error('ERR', err);

        });
    }

    $scope.edit.value = true;
    $scope.deactivate = function() {
        /*
                if ($scope.orgBasicInfo.isActive.data[0] == "1") {
                    var del = confirm("Are you  sure you want to Activate?");
                    if (del == true) {
                        $scope.edit.value = false;
                    } else {
                        $scope.edit.value = true;

                    }
                } else if ($scope.orgBasicInfo.isActive.data[0] == "0") {

                    var del = confirm("Are you  sure you want to Deactivate?");
                    if (del == true) {
                        $scope.edit.value = false;
                    } else {
                        $scope.edit.value = true;

                    }
                }*/

    };

    $scope.Save = function() {
        updateOrg();
    }


    function updateOrg() {
        if ($scope.orgBasicInfo.isActive.data[0] == "0") {


            SweetAlert.swal({
                title: "Are you sure?",
                text: "You want to deactivate this organization",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Yes, deactivate it!",
                cancelButtonText: "No, cancel!",
                closeOnConfirm: false,
                closeOnCancel: false
            }, function(isConfirm) {
                if (isConfirm) {
                    $scope.orgBasicInfo.isActive = "0";
                    var orgObj = {
                        organizationName: $scope.orgBasicInfo.organizationName,
                        isActive: $scope.orgBasicInfo.isActive
                    }
                    organizationLogic.updateOrganization(orgObj, $scope.orgBasicInfo.referenceKey).then(function(response) {
                        // console.log(' response' + JSON.stringify(response));
                        SweetAlert.swal({
                            title: "Deactivate!",
                            text: "Your organization has been deactivated.",
                            type: "success",
                            confirmButtonColor: "#007AFF"
                        }, function() {
                            $state.go('organizationList');
                        })

                    });
                } else {
                    SweetAlert.swal({
                        title: "Cancelled",
                        text: "",
                        type: "error",
                        confirmButtonColor: "#007AFF"
                    }, function() {
                        $state.go('organizationList');
                    });
                }
            });


        } else {


            SweetAlert.swal({
                title: "Are you sure?",
                text: "You want to activate this organization",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Yes, activate it!",
                cancelButtonText: "No, cancel!",
                closeOnConfirm: false,
                closeOnCancel: false
            }, function(isConfirm) {
                $scope.orgBasicInfo.isActive = "1";
                if (isConfirm) {
                    var orgObj = {
                        organizationName: $scope.orgBasicInfo.organizationName,
                        isActive: $scope.orgBasicInfo.isActive
                    }
                    organizationLogic.updateOrganization(orgObj, $scope.orgBasicInfo.referenceKey).then(function(response) {
                        // console.log(' response' + JSON.stringify(response));
                        SweetAlert.swal({
                            title: "Activate!",
                            text: "Your organization has been activated.",
                            type: "success",
                            confirmButtonColor: "#007AFF"
                        }, function() {
                            $state.go('organizationList');
                        })

                    });
                } else {
                    SweetAlert.swal({
                        title: "Cancelled",
                        text: "",
                        type: "error",
                        confirmButtonColor: "#007AFF"
                    }, function() {
                        $state.go('organizationList');
                    });
                }
            });

        }



    }

    /*$scope.deactivatingOrganization = function ($stateParams.ReferenceKey) {

            
                appOrganizationListLogic.deactivateOrg(assetReferenceKey).then(function (response) {
                    appLogger.alert($scope.alertMessageLabels.assetDeleted);
                    getAssetsByFilters($scope.assetInfo.assetCategoryId, $scope.assetInfo.assetTypeId);
                }, function (error) {
                    //console.log(error);
                    appLogger.alert($scope.alertMessageLabels.DeleteFailed);
                })
           
        }*/



});