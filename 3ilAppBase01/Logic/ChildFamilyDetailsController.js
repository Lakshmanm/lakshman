'use strict';
/*
Child registration page controller
*/

var app = angular.module('Aarush.StaffFamily', ['ThrillAppBase.childFamilyDetailslogic','ThrillContact.contactLogic', 'ThrillContact.contactLogic',, 'ThrillPerson.personRelativeLogic']);
app.controller('ChildFamilyDetailsController',function ($scope, $filter, $localStorage,$stateParams,ThrillAppBasechildFamilyDetails,personRelativeLogic,contactLogic) {
    
    
    if ($localStorage.Role == 'Doctor') {
        $scope.viewMode = true;
        $scope.saveMode = false;
    } else if ($localStorage.Role == 'Clerk') {
        $scope.viewMode = false;
        $scope.saveMode = true;
    }
    
    
   
    $scope.Childupdate = true;

    getRelativesList($stateParams.childId);
    
    
     function getRelativesList(personReferenceKey) {

        personRelativeLogic.getRelatives(personReferenceKey).then(function (response) {
           
            $scope.relatives = response;
          
           // generateUUID();


        }, function (err) {
            appLogger.log(err);
            appLogger.error('ERR' + err);

        });
    };
    
    
    $scope.familyDetailsArr = [];
    $scope.familyDetails = {};
    var mode = "save";

    $scope.saveFamilyDetails = function () {
        
        delete $scope.familyDetails.contact;
        $scope.familyDetails.personReferencekKey=$stateParams.childId;
        ThrillAppBasechildFamilyDetails.addFamily($scope.familyDetails).then(function(response){
            getRelativesList($stateParams.childId);
           $scope.familyDetails={};
             $scope.form.$setPristine();
            $scope.form.$setUntouched();
             
        })
    }
    
   
    var relativeReferenceKey=$scope.familyDetails.referenceKey;
    var personReferenceKey= $scope.familyDetails.referenceKey;
     $scope.deleteFamilyDetails = function (relativeReferenceKey, personReferenceKey) {
    

        ThrillAppBasechildFamilyDetails.deleteRelative(relativeReferenceKey, personReferenceKey).then(function (response) {
          
           getRelativesList($stateParams.childId);
           $scope.familyDetails={};
             $scope.form.$setPristine();
            $scope.form.$setUntouched();

        }, function (err) {
            appLogger.log(err);
            appLogger.error('ERR' + err);

        });
    }
    
    $scope.UpdateFamilyDetails = function () {
         $scope.familyDetails.lastName ="-" ;
        delete $scope.familyDetails.contact;
       
        $scope.familyDetails.childKey = $stateParams.childId;
        
        ThrillAppBasechildFamilyDetails.updateFamily($scope.familyDetails, $scope.familyDetails.referenceKey).then(function(response){
            getRelativesList($stateParams.childId);
              $scope.familyDetails={};
               $scope.form.$setPristine();
            $scope.form.$setUntouched();
            
        })
         $scope.Childupdate = true;
         $scope.ChildAdd = false; 
             
      
    }
     $scope.relatives={};
    
    $scope.editFamilyDetails = function (relativeReferenceKey) {
        
        
        
  
       
      
        ThrillAppBasechildFamilyDetails.GetRelativesById(relativeReferenceKey,$stateParams.childId).then(function(response){
        
           //  $scope.familyDetails ={};
         $scope.familyDetails.firstName= response.relativeName;
         $scope.familyDetails.contact= response.contact;
         $scope.familyDetails.relationTypeId=''+ response.relationTypeId +'';
          $scope.familyDetails.referenceKey=  response.referenceKey ; 
             $scope.familyDetails.relativePersonReferenceKey=  response.relativePersonReferenceKey ; 
            
             // alert(JSON.stringify(response.relativePersonReferenceKey));
            //  $scope.ChildAdd = false;
             
                      contactLogic.getContactsByEntityKeys(response.relativePersonReferenceKey).then(function (contactresponse) {
                          
                       angular.forEach(contactresponse, function (contact) {

                if (contact.contactSubTypeId == 2) //mobile   
                {
                   $scope.familyDetails.number = contact.contactInfo;
                    $scope.familyDetails.numberferenceKey = contact.referenceKey
                }   /* else if (contact.contactSubTypeId == 3) //email
                {
                    $scope.Staff.Email = contact.contactInfo;
                    $scope.Staff.EmailreferenceKey = contact.referenceKey
                }
              else if (contact.contactSubTypeId == 4) //FAx
                {
                    $scope.Staff.Fax = contact.contactInfo;
                    $scope.Staff.FaxreferenceKey = contact.referenceKey
                }*/
            })
                    });
            
            
             $scope.Childupdate = false;
         $scope.ChildAdd = true; 
        })
             
        
        
       // mode = "update";
        //angular.copy(object, $scope.familyDetails);
    }

   



});