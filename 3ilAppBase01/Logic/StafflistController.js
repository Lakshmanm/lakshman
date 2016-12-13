'use strict';
var app = angular.module('Aarush.Stafflist', ['ThrillAppBase.childListLogic','ThrillPerson.personList', 'ThrillOrganization.organizationLogic',  'ThrillAppBase.StaffListLogic', 'ThrillAppBase.thrillAppBasePersonLogic',   'ThrillPerson.personMaritalStatusLogic' ,   'ThrillPerson.personBasicInfoLogic', 'ThrillPerson.personListLogic','ThrillAppBase.StaffAdditionLogic']);
app.controller('Aarush.Stafflist', function ($scope, $filter, $log,ThrillAppBaseStaffListLogic, TempDataService,ThrillAppBaseStaffLogic,PersonMaritalStatusLogic, $rootScope, $state, $localStorage, thrillAppBasePersonLogic, personBasicInfoLogic, personListLogic, $window, $location, $q,organizationLogic, SweetAlert) {
    //$state.go($state.current, {}, {reload: true});
    //$state.reload();
// $scope.addStaff= function () {

// $state.go('app.staffadd');
// };

 var OrganizationKey="";

//var OrganizationKey = "d0a4cb70-58b3-11e6-92e8-2bb75054daa9";

 var OrganizationKey = $localStorage.organizationKey;


var getSubOrgs = function() {
       
        organizationLogic.getOrganizationsByRootOrganization(OrganizationKey).then(function(response) {
          //  console.log(response);
            $scope.subOrganizationList = response;
        }, function(err) {
            console.error('ERR', err);
        });
    }

    getSubOrgs();
    
  /*  
     function getMaritalStatusTypes() {
        PersonMaritalStatusLogic.getMaritalStatusTypes().then(function (response) {
            $scope.maritalStatusTypes = [response];
        })
    }
    getMaritalStatusTypes();*/
     $scope.statusTypes=[{"StatusId":1,"StatusName":"Active"},{"StatusId":2,"StatusName":"InActive"}]

 $scope.getAllStaff = function () {
     
     if($scope.Staff.referenceKey=="" || $scope.Staff.referenceKey==undefined)$scope.Staff.referenceKey="-"
       if($scope.Staff.designationId=="" || $scope.Staff.designationId==undefined)$scope.Staff.designationId="-"
      if($scope.Staff.EmploymentTypeKey=="" || $scope.Staff.EmploymentTypeKey==undefined)$scope.Staff.EmploymentTypeKey="-"
      if($scope.Staff.maritalStatusTypeId=="" || $scope.Staff.maritalStatusTypeId==undefined)$scope.Staff.maritalStatusTypeId="-"
       if($scope.Staff.EmployeeCategoryKey=="" || $scope.Staff.EmployeeCategoryKey==undefined)$scope.Staff.EmployeeCategoryKey="-"
     $scope.Staff.OrganizationKey=$localStorage.organizationKey;
     
     

             ThrillAppBaseStaffListLogic.getAllStaff($scope.Staff).then(function (response) {

       
                 $scope.staffCollection = response;

});
         }
    


function getEmployeeCategoryTypes() {

            ThrillAppBaseStaffLogic.getEmployeeCategoryTypes().then(function (response) {
                             $scope.employeeCategoryTypes = response;
            }, function (err) {
                appLogger.log(err);
                appLogger.error('ERR', err);

            });

        };

getEmployeeCategoryTypes();


function getDepartmentTypes() {
   
            ThrillAppBaseStaffLogic.getAllDepartments($localStorage.organizationKey).then(function (response) {
                 $scope.assignedDepartmentTypes = response;
            }, function (err) {
                appLogger.log(err);
                appLogger.error('ERR', err);

            });
        };
getDepartmentTypes();


 function getDesignationTypes() {

           ThrillAppBaseStaffLogic.getDesignationTypes().then(function (response) {
               $scope.designationTypes = response;
            }, function (err) {
                appLogger.log(err);
                appLogger.error('ERR', err);

            });

        };

getDesignationTypes();

function getEmployementTypes() {

            ThrillAppBaseStaffLogic.getEmployementTypes().then(function (response) {
               $scope.typeOfEmploymentTypes = response;
            }, function (err) {
                appLogger.log(err);
                appLogger.error('ERR', err);

            });

        };

getEmployementTypes();

    $scope.sortColumn = "firstname";
    $scope.sortColumn = "RoleName";
    $scope.sortColumn = "DateOfBirth";
 
    $scope.sortColumn = "";
    $scope.reverseSort = false;


    $scope.sortData = function (column) {
        $scope.reverseSort = ($scope.sortColumn == column) ?
            !$scope.reverseSort : false;
        $scope.sortColumn = column;

        $scope.getSortClass = function (column) {

            if ($scope.sortColumn == column) {
                return $scope.reverseSort ? 'arrow-down' : 'arrow-up';
            }

            return '';
        }
    }


    getStaffList($localStorage.organizationKey);

    $scope.deletehide = false;
    /*if($scope.Stafflist.RoleName == "Admin")
        {
            alert('here');
        }
    else
        {
            
        }*/

    $location.path('app/stafflist');

    var i;
    var persondetails = [];

    function getStaffList(organizationKey) {
        //$window.location.reload();
        var persondetails = [];
        var staffRole = null;
        thrillAppBasePersonLogic.getStaff(organizationKey).then(function (response) {

            console.log(response);
            $scope.appBaselist = response;


            var appBaseChildArray = []
            var branchArray = [];
            var personsArray = [];
            var Stafffinalarray = [];
            appBaseChildArray = response;

            var personKeys = '';
            for (i = 0; i < response.length; i++) {
                personKeys = personKeys + response[i].personKey + ','
            }
            if (personKeys.length > 0)
                personKeys = personKeys.substring(0, personKeys.length - 1);
            $q.all([getOrgBranches(organizationKey), getPersonsByPersonKeys(personKeys)]).then(function (res) {

                $scope.branchArr = res[0];
                $scope.personsArray = res[1];

                branchArray = res[0];
                personsArray = res[1];
                // alert(JSON.stringify(branchArray));
                //alert(JSON.stringify(personsArray));
                Stafffinalarray = new jinqJs()
                    .from(appBaseChildArray)
                    .leftJoin(branchArray)
                    .on(function (left, right) {
                        return (left.branchKey === right.referenceKey);
                    })
                    .join(personsArray)
                    .on(function (left, right) {
                        return (left.personKey === right.referenceKey);
                    })
                    .select('firstName', 'middleName', 'lastName', 'designationTitle', 'organizationName', 'RoleName', 'personKey', 'referenceKey');

                for (var i = 0; i <= Stafffinalarray.length; i++) {

                    if (Stafffinalarray[i].RoleName == "Admin") {

                        Stafffinalarray[i].deletehide = true;
                        //  alert(JSON.stringify(  $scope.Stafflist[0].RoleName));
                    } else {
                        Stafffinalarray[i].deletehide = false;
                        //  alert(JSON.stringify(  $scope.deletehide));
                    }

                    if (i == Stafffinalarray.length - 1) {

                        $scope.Stafflist = Stafffinalarray;

                    }

                }


            }, function (err) {
                console.log('err ' + err)
            });




            //alert(JSON.stringify($scope.childerenlist));

        });


    }




    function getOrgBranches(organizationKey) {
        var deferred = $q.defer();
        thrillAppBasePersonLogic.getBranchesByRootOrganization(organizationKey).then(function (response) {
            console.log('branch promise called ');
            deferred.resolve(response);
        }, function (err) {
            deferred.reject(err);
            console.error('ERR', err);
        });
        return deferred.promise;
    }

    function getPersonsByPersonKeys(personKeys) {
        var deferred = $q.defer();
        personBasicInfoLogic.getPersonsByIds(personKeys).then(function (response) {
            console.log('persons promise called ');
            deferred.resolve(response);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    }

$scope.deleteStaff = function (EntityKey) {
        var del = confirm("Are you sure you want to Delete ?");
        if (del == true) {
            ThrillAppBaseStaffListLogic.deletestaff(EntityKey).then(function (response) {
                //appLogger.alert($scope.alertMessageLabels.boardDeleted);
               
                /*$scope.save = true;
                $scope.update = false;
                $scope.boardForm.$setPristine();
                $scope.boardForm.$setUntouched();*/
              $scope.getAllStaff();
                SweetAlert.swal({
                title: "Staff",
                text: "Deleted successfully",
                type: "success",
                confirmButtonColor: "#007AFF"
            });
            });
        }
    };

    $scope.addStaff = function (object) {

        $rootScope.Staff = "";


        //  alert(JSON.stringify( $rootScope.Stafflistorgs));
        $state.go("app.staffadd");
    };


    if ($localStorage.Role == 'Admin') {
        $scope.adminMenu = true;
    } else if

    ($localStorage.Role == 'Doctor') {
        $scope.doctorMenu = true;
        $scope.stafflistRemove = true;
    } else if ($localStorage.Role == 'Clerk') {
        $scope.clerkMenu = true;
        $scope.stafflistRemove = true;

    } else if ($localStorage.Role == 'Pharmacist') {
        $scope.pharmacistMenu = true;
        $scope.stafflistRemove = true;
    } else if ($localStorage.Role == 'LabTechnician') {
        $scope.labTechnicianMenu = true;
        $scope.stafflistRemove = true;
    }


});