'use strict';
var app = angular.module('ThrillInstitute.instituteList', ['ThrillAppBase.appBaseSubOrganizationLogic', 
    'ThrillOrganization.OrganizationListLogic',
     'ThrillOrganization.organizationLogic',
    'ThrillInstitute.instituteLogic' ]);

app.controller('instituteListController', function($scope, $localStorage, $filter, $state, TempDataService, $rootScope, appBaseSubOrganizationLogic, OrganizationListLogic, organizationLogic,instituteLogic, SweetAlert) {

    // $localStorage.organizationKey = '99070670-3f8a-11e6-a8bf-d3284448083d'
 $scope.addNew = function() {
        $state.go('app.institute');
    }
 
 
  var getSubOrgs = function() {
       
        instituteLogic.getAllInstitutes($localStorage.organizationKey).then(function(response) {
            $scope.instituteList = response;
        }, function(err) {
            console.error('ERR', err);
        });
    }

    getSubOrgs();

 

    $scope.sortColumn = "OrganizationName";
    $scope.sortColumn = "InstituteDiseCode";
    //$scope.sortColumn = "parentOrganizationName";

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




    /*$scope.addNew = function() {
        $state.go('app.subOrganization');
    }
*/

    $scope.deleteSubOrg = function(instituteKey) {

            SweetAlert.swal({
                title: "Are you sure?",
                text: "Your want to delete this branch",
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
                        text: "Your Institute has been deleted.",
                        type: "success",
                        confirmButtonColor: "#007AFF"
                    }, function() {
                        instituteLogic.removeInstitute(instituteKey).then(function(response) {
                          //  $scope.subOrganizationList = [];
                            //alert('Branch is deleted successfully');
                            getSubOrgs();
                        })
                    });
                } else {
                    SweetAlert.swal({
                        title: "Cancelled",
                        text: "Your Institute is safe :)",
                        type: "error",
                        confirmButtonColor: "#007AFF"
                    });
                }
            });
            


        }
       
});