'use strict';
var app = angular.module('ThrillAppBase.subOrganizationList', ['ThrillAppBase.appBaseSubOrganizationLogic', 'ThrillOrganization.OrganizationListLogic', 'ThrillOrganization.organizationLogic']);

app.controller('SubOrganizationListController', function($scope, $localStorage, $filter, $state, TempDataService, $rootScope, appBaseSubOrganizationLogic, OrganizationListLogic, organizationLogic, SweetAlert) {

    // $localStorage.organizationKey = '99070670-3f8a-11e6-a8bf-d3284448083d'


    $scope.sortColumn = "organizationName";
    $scope.sortColumn = "organizationLevelName";
    $scope.sortColumn = "parentOrganizationName";

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




    var getSubOrgs = function() {
        /*
        appBaseSubOrganizationLogic.getSubOrganizationsList($localStorage.organizationKey).then(function (response) {
            console.log(JSON.stringify(response));
            $scope.subOrganizationList = response;
        })
        */

        organizationLogic.getOrganizationsByRootOrganization($localStorage.organizationKey).then(function(response) {
            $scope.subOrganizationList = response;
        }, function(err) {
            console.error('ERR', err);
        });
    }

    getSubOrgs();

    $scope.addNew = function() {
        $state.go('app.subOrganization');
    }


    $scope.deleteSubOrg = function(subOrganizationKey) {

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
                        text: "Your branch has been deleted.",
                        type: "success",
                        confirmButtonColor: "#007AFF"
                    }, function() {
                        OrganizationListLogic.removeOrganization(subOrganizationKey).then(function(response) {
                            $scope.subOrganizationList = [];
                            //alert('Branch is deleted successfully');
                            getSubOrgs();
                        })
                    });
                } else {
                    SweetAlert.swal({
                        title: "Cancelled",
                        text: "Your branch is safe :)",
                        type: "error",
                        confirmButtonColor: "#007AFF"
                    });
                }
            });
            /*
                        var del = confirm("Are you sure you want to Delete ?");
                        if (del == true) {
                            OrganizationListLogic.removeOrganization(subOrganizationKey).then(function (response) {
                                $scope.subOrganizationList = [];
                                alert('Branch is deleted successfully');
                                getSubOrgs();
                            })
                        }
                        */


        }
        /*
        //  alert();
        $scope.Branch = TempDataService.getSubOrgs();
        $scope.edit = function (object) {
            //localStorage
            //  $scope.Branches = object;
            //$rootScope.tempBranch = object;
            $localStorage.tempBranch = object;
            //alert(JSON.stringify($localStorage.tempBranch));
            $rootScope.Branches = object;
            // angular.copy(object,$rootScope.tempBranch);
            // alert(JSON.stringify(object));
            // alert(JSON.stringify($rootScope.tempBranch));
            $state.go("app.subOrganization");

            // alert(JSON.stringify( $rootScope.org))
        };
        $scope.Clear = function () {

            $rootScope.PacketLtr2tempBranch = "";
            $localStorage.tempBranch = "";
            $scope.Branches = "";
            $rootScope.Branches = "";
            $localStorage.PacketLtr2tempBranch = "";
            $state.go("app.subOrganization");

            // alert(JSON.stringify( $rootScope.org))
        };
        $scope.Redirectstaff = function (object) {
            //alert(object);
            $localStorage.tempBranch = object;
            //alert(JSON.stringify($localStorage.tempBranch));
            $rootScope.Branches = object;
            $state.go("app.stafflist");

            // alert(JSON.stringify( $rootScope.org))
        };


        if ($localStorage.Role == 'Admin') {
            $scope.adminMenu = true;
        } else if

        ($localStorage.Role == 'Doctor') {
            $scope.doctorMenu = true;
            $scope.OrganizationRemove = true;
        } else if ($localStorage.Role == 'Clerk') {
            $scope.clerkMenu = true;
            $scope.OrganizationRemove = true;

        } else if ($localStorage.Role == 'Pharmacist') {
            $scope.pharmacistMenu = true;
            $scope.OrganizationRemove = true;
        } else if ($localStorage.Role == 'LabTechnician') {
            $scope.labTechnicianMenu = true;
            $scope.OrganizationRemove = true;
        }
        */

    /* var data = [{
         "id": 1,
         "lm": 138661285100,
         "ln": "Smith",
         "fn": "John",
         "dc": "CEO",
         "em": "j.smith@company.com",
         "ph": "617-321-4567",
         "ac": true,
         "dl": false
     }, {
         "id": 2,
         "lm": 138661285200,
         "ln": "Taylor",
         "fn": "Lisa",
         "dc": "VP of Marketing",
         "em": "l.taylor@company.com",
         "ph": "617-522-5588",
         "ac": true,
         "dl": false
     }, {
         "id": 3,
         "lm": 138661285300,
         "ln": "Jones",
         "fn": "James",
         "dc": "VP of Sales",
         "em": "j.jones@company.com",
         "ph": "617-589-9977",
         "ac": true,
         "dl": false
     }, {
         "id": 4,
         "lm": 138661285400,
         "ln": "Wong",
         "fn": "Paul",
         "dc": "VP of Engineering",
         "em": "p.wong@company.com",
         "ph": "617-245-9785",
         "ac": true,
         "dl": false
     }, {
         "id": 5,
         "lm": 138661285500,
         "ln": "King",
         "fn": "Alice",
         "dc": "Architect",
         "em": "a.king@company.com",
         "ph": "617-244-1177",
         "ac": true,
         "dl": false
     }, {
         "id": 6,
         "lm": 138661285600,
         "ln": "Brown",
         "fn": "Jan",
         "dc": "Software Engineer",
         "em": "j.brown@company.com",
         "ph": "617-568-9863",
         "ac": true,
         "dl": false
     }, {
         "id": 7,
         "lm": 138661285700,
         "ln": "Garcia",
         "fn": "Ami",
         "dc": "Software Engineer",
         "em": "a.garcia@company.com",
         "ph": "617-327-9966",
         "ac": true,
         "dl": false
     }, {
         "id": 8,
         "lm": 138661285800,
         "ln": "Green",
         "fn": "Jack",
         "dc": "Software Engineer",
         "em": "j.green@company.com",
         "ph": "617-565-9966",
         "ac": true,
         "dl": false
     }, {
         "id": 9,
         "lm": 138661285900,
         "ln": "Liesen",
         "fn": "Abraham",
         "dc": "Plumber",
         "em": "a.liesen@company.com",
         "ph": "617-523-4468",
         "ac": true,
         "dl": false
     }, {
         "id": 10,
         "lm": 138661286000,
         "ln": "Bower",
         "fn": "Angela",
         "dc": "Product Manager",
         "em": "a.bower@company.com",
         "ph": "617-877-3434",
         "ac": true,
         "dl": false
     }, {
         "id": 11,
         "lm": 138661286100,
         "ln": "Davidoff",
         "fn": "Fjodor",
         "dc": "Database Admin",
         "em": "f.davidoff@company.com",
         "ph": "617-446-9999",
         "ac": true,
         "dl": false
     }, {
         "id": 12,
         "lm": 138661286200,
         "ln": "Vitrovic",
         "fn": "Biljana",
         "dc": "Director of Communications",
         "em": "b.vitrovic@company.com",
         "ph": "617-111-1111",
         "ac": true,
         "dl": false
     }, {
         "id": 13,
         "lm": 138661286300,
         "ln": "Valet",
         "fn": "Guillaume",
         "dc": "Software Engineer",
         "em": "g.valet@company.com",
         "ph": "617-565-4412",
         "ac": true,
         "dl": false
     }, {
         "id": 14,
         "lm": 138661286400,
         "ln": "Tran",
         "fn": "Min",
         "dc": "Gui Designer",
         "em": "m.tran@company.com",
         "ph": "617-866-2554",
         "ac": true,
         "dl": false
     }];
     $scope.tableParams = new ngTableParams({
         page: 1,
         count: 10
     }, {
         total: data.length,
         getData: function ($defer, params) {
             var orderedData = params.sorting() ? $filter('orderBy')(data, params.orderBy()) : data;
             $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
         }
     });

     $scope.editId = -1;

     $scope.setEditId = function (pid) {
         $scope.editId = pid;
     };*/
});