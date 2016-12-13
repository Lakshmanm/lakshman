'use strict';
/*
Child registration page controller
*/
var app = angular.module('Aarush.Childrenlistget',['ThrillAppBase.childListLogic', 'ThrillAppBase.thrillAppBasePersonLogic',, 'ThrillPerson.personBasicInfoLogic']);
app.controller('ChildController',  function ($scope, $log, $localStorage,ChildrenService,$stateParams,personBasicInfoLogic) {
    
     var childrens = ChildrenService.getChildrens();
     
    if($stateParams.childId==undefined){ 
          $scope.profilePic = false;
          $scope.familyDetailsDirective = false;
    }
    else{
          $scope.familyDetailsDirective = true;
   
        personBasicInfoLogic.getPersonsByIds($stateParams.childId).then(function (responsepersondetails) {
            $scope.child = {};
            $scope.child.referenceKey = responsepersondetails.referenceKey;
            $scope.child.firstName = responsepersondetails.firstName;
            $scope.child.middleName = responsepersondetails.middleName;
            $scope.child.lastName = responsepersondetails.lastName;
            $scope.child.dateOfBirth = responsepersondetails.dateOfBirth;
            //$scope.person.placeOfBirth = response.placeOfBirth;
           // $scope.child.genderId = response.genderId;
            //$scope.person.bloodGroupId = response.bloodGroupId;
           // $scope.person.identificationMarks = response.identificationMarks;
           // $scope.location = {};
           // $scope.location.locationId = response.locationId;
           // $scope.location.geoLocation = response.geoLocation;
           //$scope.child.=responsepersondetails;
            // alert(JSON.stringify($scope.child));
                  });
                  
        $scope.profilePic = true;
            }
    
    if($localStorage.Role=="Admin"){
        $scope.profilePic = true;
    }
    
    $scope.childProfile={
        image:'3ilAppBase01/Web/assets/images/profile.jpg'
    };
    angular.forEach(childrens,function(child,index){
        if(child.childId==$stateParams.childId){
            $scope.childProfile = child;
        }
        
    });
    
    
    
    //alert($localStorage.Role)
    $scope.basicInfo = false;
    $scope.familyDetails = false;
    $scope.immunizationHistory = false;
    $scope.chart = false;
    $scope.familyHistory = false;
    $scope.surgery = false;
    $scope.allergy = false;
    $scope.screening = false;
    $scope.screeningHistory = true;
    if ($localStorage.Role == 'Admin') {
        $scope.basicInfo = true;
        $scope.familyDetails = true;
        $scope.immunizationHistory = true;
        $scope.chart = true;
        $scope.familyHistory = true;
        $scope.surgery = true;
        $scope.allergy = true;
        $scope.screening = true;
        $scope.screeningHistory = true;

    } else if ($localStorage.Role == 'Doctor') {
        $scope.basicInfo = true;
        $scope.familyDetails = true;
        $scope.immunizationHistory = true;
        $scope.chart = true;
        $scope.familyHistory = true;
        $scope.surgery = true;
        $scope.allergy = true;
        $scope.screening = true;
        $scope.screeningHistory = true;

    } else if ($localStorage.Role == 'Clerk') {
        $scope.basicInfo = true;
        $scope.familyDetails = true;
        
        if($stateParams.childId!=undefined){
            $scope.screeningHistory = true;
        }else{
            $scope.screeningHistory = false;
        }
        
        
    } else if ($localStorage.Role == 'LabTechnician') {
        $scope.basicInfo = true;
    } else if ($localStorage.Role == 'Pharmacist') {
        $scope.basicInfo = true;
    }



    $scope.removeImage = function () {
        $scope.noImage = true;
    };
    // $scope.obj = new Flow();

    $scope.child = {
        image: '3ilAppBase01/Web/assets/images/avatar-1-xl.jpg'
    , };

    if ($scope.child.image == '') {
        $scope.noImage = true;
    }


    $scope.panes = [{
        header: 'Pane 1'
        , content: 'Curabitur et ligula. Ut molestie a, ultricies porta urna. Vestibulum commodo volutpat a, convallis ac, laoreet enim. Phasellus fermentum in, dolor. Pellentesque facilisis. Nulla imperdiet sit amet magna. Vestibulum dapibus, mauris nec malesuada fames ac turpis velit, rhoncus eu, luctus et interdum adipiscing wisi.'
        }, {
        header: 'Pane 2'
        , content: 'Lorem ipsum dolor sit amet enim. Etiam ullamcorper. Suspendisse a pellentesque dui, non felis. Maecenas malesuada elit lectus felis, malesuada ultricies.'
        }, {
        header: 'Pane 3'
        , content: 'Aliquam erat ac ipsum. Integer aliquam purus. Quisque lorem tortor fringilla sed, vestibulum id, eleifend justo vel bibendum sapien massa ac turpis faucibus orci luctus non.',

        subpanes: [{
            header: 'Subpane 1'
            , content: 'Lorem ipsum dolor sit amet enim.'
            }, {
            header: 'Subpane 2'
            , content: 'Curabitur et ligula. Ut molestie a, ultricies porta urna. Quisque lorem tortor fringilla sed, vestibulum id.'
            }]
        }];



    $scope.itemArr = [{
            contactId: 1
            , contactName: "Email"
        }



















        
        , {
            contactId: 2
            , contactName: "Landline"
        }



















        
        , {
            contactId: 3
            , contactName: "Fax"
        }, ]

    $scope.contactArr = [];
    $scope.contactArr.push({
        id: 1
        , contactId: ""
        , comments: ""
    });

    $scope.addContact = function () {
        var object = {
            contactId: ""
            , comments: ""
            , id: $scope.contactArr[$scope.contactArr.length - 1].id + 1
        }
        $scope.contactArr.push(object);
    }




    $scope.removeContacts = function (obj) {
        // alert(obj);
        if (obj != -1) {
            $scope.contactArr.splice(obj, 1);
        }
    };


});