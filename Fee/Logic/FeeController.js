'use strict';
var app = angular.module('mcampuz.Fee', ['ThrillInstitute.instituteLogic'
     ]);
app.controller('feeController', function($scope,instituteLogic,$localStorage){
     
     $scope.module={};
     $scope.module.basicInfo ={flag :true,isFirstOpen:true}

$scope.institutes = function() {

        instituteLogic.getAllInstitutes($localStorage.organizationKey).then(function(response) {
            console.log(JSON.stringify(response));
            $scope.instituteList = response;
        });
    }

    $scope.institutes();

$scope.addInstitute=function(value){

$localStorage.instituteKey=value;
};


                   
//alert(123);
})
   