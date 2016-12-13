'use strict';
var app = angular.module('mcampuz.Student', [
     ]);
app.controller('StudentController', function($scope,$stateParams,$localStorage){
     //alert('in')
     $scope.module={};
     $scope.module.basicInfo ={flag :true,isFirstOpen:true}
     $scope.module.studentInfo ={flag :true,isFirstOpen:true}
 $scope.openothers=false;                  
if($stateParams.StudentKey)
{
$scope.openothers=true;
}
//alert($localStorage.RoleID)

if($localStorage.RoleID==2)
{
$scope.staffaccord=false;
}
else{

$scope.staffaccord=true;
}

//alert($scope.staffaccord)
})
   