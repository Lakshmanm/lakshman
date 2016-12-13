'use strict';
var app = angular.module('ThrillAppBase.department', ['ThrillAppBase.appBaseDepartmentLogic', 'ThrillOrganization.organizationLogic']);

app.controller('DepartmentController', function($scope, $localStorage, $filter, TempDataService, $rootScope, $state, $stateParams, appBaseDepartmentLogic, organizationLogic, SweetAlert) {

    // var subOrganizationKey = '195b6750-41dc-11e6-a3fa-41c5891757ca'

    // $localStorage.organizationId = 2;
    // $localStorage.organizationKey = '99070670-3f8a-11e6-a8bf-d3284448083d'


    $scope.buttonText = "Save";

    $scope.department = {
        departmentName: ''
            //, organizationId: $localStorage.organizationId

        ,
        rootOrganizationKey: $localStorage.organizationKey,
        parentDepartmentID: null
    };

    if ($stateParams.departmentKey != undefined) {
        $scope.buttonText = "Update";
        getDepartment($stateParams.branchKey, $stateParams.departmentKey);
    }

    //dropdown binding
    getDepartments($localStorage.organizationKey);

    $scope.addDepartment = function() {

        if (isNaN($scope.department.parentDepartmentID)) $scope.department.parentDepartmentID = null;

        if ($stateParams.departmentKey == undefined) {

            var departmentOrgKey = $scope.department.organizationReferenceKey;

            if (departmentOrgKey == undefined || departmentOrgKey == null || departmentOrgKey == "") {

                $scope.department.organizationReferenceKey = $localStorage.organizationKey;
                $scope.department.organizationId = $localStorage.organizationId;
                departmentOrgKey = $localStorage.organizationKey;
            } else {
                angular.forEach($scope.branches, function(branch, index) {

                    if (branch.referenceKey == departmentOrgKey)
                        $scope.department.organizationId = branch.organizationId;

                });
            }

            appBaseDepartmentLogic.addDepartment($scope.department, departmentOrgKey).then(function(response) {
                console.log(JSON.stringify(response));
                //toaster.pop('success', 'Department', 'Department saved successfully');
                //alert('Department saved successfully');
                SweetAlert.swal({
                    title: "Department",
                    text: "Saved successfully",
                    type: "success",
                    confirmButtonColor: "#007AFF"
                }, function() {
                    $state.go('app.departmentList');
                });


            }, function(err) {
                alert('falied to save');
                console.log(err);
            })
        } else {

            var departmentOrgKey = $scope.department.organizationReferenceKey;

            if (departmentOrgKey == undefined || departmentOrgKey == null || departmentOrgKey == "") {
                $scope.department.organizationReferenceKey = $localStorage.organizationKey
                $scope.department.organizationId = $localStorage.organizationId;
                departmentOrgKey = $localStorage.organizationKey;
            } else {
                angular.forEach($scope.branches, function(branch, index) {
                    if (branch.referenceKey == departmentOrgKey)
                        $scope.department.organizationId = branch.organizationId;

                });
            }

            console.log(JSON.stringify($scope.department));
            appBaseDepartmentLogic.updateDepartment($scope.department, departmentOrgKey, $scope.department.referenceKey).then(function(response) {

                SweetAlert.swal({
                    title: "Department",
                    text: "Updated successfully",
                    type: "success",
                    confirmButtonColor: "#007AFF"
                }, function() {
                    $state.go('app.departmentList');
                });
                /*alert('Department updated successfully');
                $state.go('app.departmentList');*/
            })
        }
    }

    $scope.cancel = function() {
        $state.go('app.departmentList');
    }



    function getDepartment(organizationKey, departmentKey) {
        appBaseDepartmentLogic.getDepartment(organizationKey, departmentKey).then(function(response) {
            console.log(JSON.stringify(response));
            $scope.department = response;
        })
    }

    function getDepartments(organizationKey) {

        appBaseDepartmentLogic.getDepartmentListByRootOrganization(organizationKey).then(function(response) {
            console.log(JSON.stringify(response))
            $scope.departments = response;
        })

        /* 
         appBaseDepartmentLogic.getDepartmentList(organizationKey).then(function (response) {
             console.log(JSON.stringify(response));
             $scope.departments = response;

             if ($stateParams.departmentKey != undefined) {
                 getDepartment($localStorage.organizationKey, $stateParams.departmentKey);
             }
         })*/
    }



    organizationLogic.getOrganizationsByRootOrganization($localStorage.organizationKey).then(function(response) {
        $scope.branches = response;
    }, function(err) {
        console.error('ERR', err);
    });



});