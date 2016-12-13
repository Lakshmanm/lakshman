'use strict';
/*
Child registration page controller
*/
var app = angular.module('Aarush.Childrenlist',['ThrillAppBase.childListLogic', , 'ThrillAppBase.thrillAppBasePersonLogic',, 'ThrillPerson.personBasicInfoLogic']);
app.controller('ChildrenListController',  function ($scope, $log, $localStorage,ChildrenService,thrillAppBasePersonLogic,personBasicInfoLogic,$location) {
  ;
   $location.path('app/app/childrens'); 

     getChildList($localStorage.organizationKey,3);
    
     function getChildList(organizationKey,roleId) {
         
        var persondetails=[];
        thrillAppBasePersonLogic.getPersonReferencekeys(organizationKey, roleId).then(function (response) {
           
            console.log(response);
            var i;
           for(i=0;i<response.length;i++)
               {
                    personBasicInfoLogic.getPersonBasicInfoById(response[i].personKey).then(function (responsepersondetails) {
            persondetails.push(responsepersondetails);
                       
                        
                           console.log(responsepersondetails);
                  });
                  
               }
            $scope.childerenlist=persondetails;
            //alert(JSON.stringify($scope.childerenlist));
             
                       });


    }
    
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

     if ($localStorage.Role == 'Admin') {
        $scope.A = true;
         $scope.B = true;
         $scope.C = true;
         $scope.D = false;
         $scope.E = false;
        
    } else if ($localStorage.Role == 'Doctor') {
        $scope.A = true;
         $scope.B = true;
         $scope.C = true;
         $scope.D = false;
         $scope.E = false;
    } else if ($localStorage.Role == 'Clerk') {
        $scope.A = true;
         $scope.B = false;
         $scope.C = false;
         $scope.D = false;
         $scope.E = false;
    } else if ($localStorage.Role == 'LabTechnician') {
        $scope.A = true;
         $scope.B = false;
         $scope.C = false;
         $scope.D = true;
         $scope.E = true;
    } else if ($localStorage.Role == 'Pharmacist') {
        $scope.A = true;
         $scope.B = false;
         $scope.C = false;
         $scope.D = true;
         $scope.E = true;
    }
    
    
    
 $scope.childrens=[]
 
 $scope.childrens = ChildrenService.getChildrens();
    //alert(JSON.stringify($scope.childrens));
 
});