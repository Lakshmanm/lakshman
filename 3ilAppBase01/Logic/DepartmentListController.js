'use strict';
var app = angular.module('ThrillAppBase.departmentList', ['ThrillAppBase.appBaseDepartmentLogic']);

app.controller('DepartmentListController', function($scope, $localStorage, $filter, $state, TempDataService, $rootScope, appBaseDepartmentLogic, SweetAlert) {

    // $localStorage.organizationKey = '99070670-3f8a-11e6-a8bf-d3284448083d'

    $scope.sortColumn = "departmentName";
    $scope.sortColumn = "organizationName";
    $scope.sortColumn = "parentDepartmentName";

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



    var getDepartments = function() {


        appBaseDepartmentLogic.getDepartmentListByRootOrganization($localStorage.organizationKey).then(function(response) {
            console.log(JSON.stringify(response))
            $scope.departmentList = response;
        })
    }

    getDepartments();

    $scope.addNew = function() {
        $state.go('app.department');
    }

    $scope.deleteDepartment = function(department) {

        SweetAlert.swal({
            title: "Are you sure?",
            text: "Your want to delete this department",
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
                    text: "Your department has been deleted.",
                    type: "success",
                    confirmButtonColor: "#007AFF"
                }, function() {
                    appBaseDepartmentLogic.deleteDepartment(department.organizationReferenceKey, department.referenceKey).then(function() {
                        $scope.departmentList = [];
                        // alert('Department is deleted successfully');
                        getDepartments();
                    })
                });
            } else {
                SweetAlert.swal({
                    title: "Cancelled",
                    text: "Your department is safe :)",
                    type: "error",
                    confirmButtonColor: "#007AFF"
                });
            }
        });

        /*
        var del = confirm("Are you sure you want to Delete ?");
    if(del == true)
    {
        appBaseDepartmentLogic.deleteDepartment(department.organizationReferenceKey, department.referenceKey).then(function () {
            $scope.departmentList=[];
            alert('Department is deleted successfully');
             getDepartments();
        })
    }*/
    }

});