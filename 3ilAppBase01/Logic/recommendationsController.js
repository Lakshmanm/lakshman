'use strict';
/*
Child registration page controller
*/


app.controller('recommendationsController', ["$scope", "$filter", function ($scope,$state, $filter) {
    

  $scope.itemArr=[{itemId  :1,itemName:"Diet"},
                  {itemId  :2,itemName:"Oral Hygiene"}]  
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 
   $scope.recommandArr=[];
   $scope.recommandArr.push({
  	                           id:1,
  	                           itemId:"",
  	                           comments:""
                             });
   
    $scope.addRecommand = function(){
        var object={
        	itemId:"",
  	        comments:"",
  	        id :$scope.recommandArr[$scope.recommandArr.length-1].id+1 
        }
    	 $scope.recommandArr.push(object);  
    }

     $scope.addRecommandDetails = function(){
      
    }
    


     $scope.removeRecommendations = function(obj){
           // alert(obj);
             if(obj != -1) {
        $scope.recommandArr.splice(obj, 1);
             }
        };
    
  
}]);