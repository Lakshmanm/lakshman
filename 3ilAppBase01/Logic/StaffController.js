'use strict';
var app = angular.module('mcampuz.Staff', [
     ]);
app.controller('StaffController', function($scope,$stateParams){
     
     $scope.module={};
     $scope.module.basic ={flag :true,isFirstOpen:true}
 $scope.openothers=false;                  
if($stateParams.StaffKey)
{
$scope.openothers=true;
}

})
   