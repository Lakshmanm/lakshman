var app = angular.module('ThrillAppBase.OrganizationRegister', ['ThrillAppBase.OrganizationListLogic'
  , 'ThrillOrganization.OrganizationListLogic'
   /* , 'ngCordova'
    , 'ThrillFrameworkLibrary.geo'
    , 'ThrillFrameworkLibrary.Network'
    , 'ThrillCnnWebClient.appConfig'
    , 'ThrillFrameworkLibrary.appLogger'*/
]);



app.controller('ThrillAppBase.OrganizationRegister', function ($scope, $http, appOrganizationListLogic, OrganizationListLogic, $state, $stateParams, appConfig, Password, appLogger) {

    //  $scope.org={name:"abcd",description:"description"}


    $scope.org = {}
    $scope.regrister = function () {
        //$scope.greeting = 'Hello ' + $scope.username + '!';
        TempDataService.registerOrgBasic($scope.org);
        $state.go('login.signin');

    };

    //Sorting

    $scope.sortColumn = "organizationName";

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

    $scope.addOrg1 = function () {
        $state.go('NewOrg');
    };

$scope.customerLogin=function(){

    $state.go('signin');
}

    var organizationDetails = function () {
        OrganizationListLogic.getOrganizationDetails().then(function (response) {
            $scope.organizationDetails = response;
        }, function (err) {
            console.error('ERR', err);
        });
    };
    organizationDetails();

});