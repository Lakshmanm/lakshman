'use strict';
var app = angular.module('ThrillInstitute.instituteNew', ['ThrillAcademic.boardLogic','ThrillInstitute.instituteBoardLogic' 
     ]);
app.controller('InstituteNewController', function($scope,$stateParams,$localStorage,$rootScope,instituteBoardLogic, boardLogic){
    
     $scope.module={};
     $scope.module.basicInfo ={flag :true,isFirstOpen:true}
     $scope.board=true

    getBoard();
     
                           
     if($stateParams.instituteKey!=undefined)
         {
             $scope.show=true
         }else
             {
              $scope.show=false  
             }
     

     var mainresp={ };
     var secondresp={};
    // method for boardLogic
             function  getBoard() {
                 boardLogic.getAllBoards($localStorage.organizationKey).then(function (response) {
                   
                     var array=[];
                 for(var i=0 ;i<response.length;i++)
                     {
                         var object={
                             boardKey:response[i].boardKey,
                             boardTitle:response[i].boardTitle,
                             boardCheck:false
                         }
                           array.push(object);
                         if(i==(response.length)-1)
                             {
                          
                                 
                              mainresp={
                         data:array
                     }
                     
        
                             }
                         
                     }
                     
                     
                   
                     
                          if($stateParams.instituteKey!=undefined)
                              {
                                
               
            instituteBoardLogic.getBoardByInstituteKey($stateParams.instituteKey).then(function (resp) {
          
                
              
                
                  var sarray=[];
                 for(var i=0 ;i<resp.length;i++)
                     {
                         var object={
                             boardKey:resp[i].BoardKey,
                             boardTitle:resp[i].BoardTitle,
                             boardCheck:true
                         }
                            sarray.push(object);
                         if(i==(resp.length)-1)
                             {
                         
                           secondresp={
                        data:sarray
                    }   
                                 
                             }
                         
                     }
                
                
                   
              
                    
                           

function merge(secondresp, mainresp){

  if (!secondresp.data) return {data:mainresp.data};
  if (!mainresp.data) return {data:secondresp.data};
  var final = {data:secondresp.data};
  // merge
  for(var i = 0 ; i < mainresp.data.length;i++){
      var item = mainresp.data[i];
      insert(item, final);
  }
  return final;
}


function insert(item, obj){
    var data = obj.data;
    var insertIndex = data.length;
    for(var i = 0; i < data.length; i++){
        if(item.boardKey == data[i].boardKey){
           // ignore duplicates
           insertIndex = -1;
           break;
        } 
    }
    if(insertIndex == data.length){
        data.push(item);
    } else if(insertIndex != -1) {
        data.splice(insertIndex,0,item);
    }
}

         var final = merge(secondresp, mainresp);        
         $scope.boardCollection = final.data;    
         if($scope.boardCollection==undefined)
            $scope.boardCollection=[];

         if($scope.boardCollection.length==0 || $scope.boardCollection.length==undefined)
         {
            $scope.board=false  
         }
         else
         {
            $scope.board=true
         }
            
           

            
                                
                              })
                              }
                     else
                         {                                                
                       $scope.boardCollection = response;
                         }
                
    
                 }, function (err) {
                     appLogger.error('ERR', err);
                 });
    
                }  
     
})
   