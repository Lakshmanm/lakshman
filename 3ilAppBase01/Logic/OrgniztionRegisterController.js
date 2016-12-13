var app = angular.module('Aarush.OrganizationRegister', []);
app.controller('Aarush.OrganizationRegister', function($scope,$state,TempDataService) {
    
  //  $scope.org={name:"abcd",description:"description"}
    $scope.org={}
   $scope.regrister = function() {
    //$scope.greeting = 'Hello ' + $scope.username + '!';
       TempDataService.registerOrgBasic($scope.org);
       $state.go('login.signin');
       
  };
});