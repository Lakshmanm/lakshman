'use strict';
var app = angular.module('Mcampuz.RolesController', ['Mcampuz.RolesLogic',
    'security.roleLogic',
    'ThrillInstitute.instituteLogic',
    'ThrillAppBase.StudentAdditionLogic',
    'security.registrationLogic'
    , 'security.forgotPasswordLogic']);
app.controller('RolesController', function ($scope, $filter,$state,roleLogic,instituteLogic,ThrillAppBaseStudentLogic,$localStorage,registrationLogic, $window,forgotPasswordLogic,TempDataService,SweetAlert,RolesLogic,$rootScope) {
    $scope.form={};
     $scope.org={};
     $scope.AssignRole={};
       $scope.Role={};

       $scope.savee=true;
        $scope.emailbtn=true;
         $scope.emaildisable=false;
          $scope.updatee=false;
       
     var RoleName;
     var ReferenceKey;

            $scope.inst=false;
     var staffOrganizationKey;
       $scope.studentProfilePic = "3ilAppBase01/Web/assets/images/default-user.png";
   // alert();
    $scope.orgs = TempDataService.getOrgs();
    $scope.edit=function(object){
         $scope.org = object;
        $rootScope.org = object;
        
        //alert(JSON.stringify( $rootScope.org))
    };
    
   var getRoles = function () {
        roleLogic.getAllRoles().then(function (response) {
            $scope.roles = response;

        });

    };

    getRoles();

     $scope.getInstitutes = function() {
        $scope.inst=true;
        instituteLogic.getAllInstitutes($localStorage.organizationKey).then(function(response) {
            console.log(JSON.stringify(response));
            $scope.instituteList = response;
        });
    }
 
$scope.showRoles=true;
$scope.showPassword=false;
$scope.openRoleDetails= function(){

$scope.showRoles=true;
$scope.showPassword=false;
}


$scope.changePassword=function(){

$scope.showRoles=false;
$scope.showPassword=true;

}


$scope.duplicaterole=function(institutekey){
if($scope.AssignRole.RoleID==3)
{
  RolesLogic.roleduplicate($scope.AssignRole.RoleID,institutekey).then(function(response) {
    /*console.log(response)
    alert(JSON.stringify(response));*/
   
    if(response.length==undefined)
{
    $scope.roledup=false;
    }
    else{
       $scope.roledup=true;
    }
});

}
};

$scope.checkmail = function(email) {
   
   registrationLogic.getEmail(email).then(function(response) {
    console.log(JSON.stringify(response));
   console.log(JSON.stringify(response.length));
            if(response.length==undefined)
            {

             $scope.msg=true;
            }
            else{
                 $scope.msg=false;
                
                if(response[0].RoleID==1){
                   $scope.text=true; 
                }
              else if(response[0].RoleID==2){
                $scope.text=false;
               
              }
              else{
                $scope.mtext=true;
              }
            }
           
        });
}



$scope.getDetails = function() {
RolesLogic.getStaffDetails($scope.AssignRole.PrimaryEmailAddress).then(function(response) {
    if(response.length==undefined)
            {

             $scope.mtext=true;
            }
            else{
              
  $scope.Role.FirstName=response[0].FirstName;
   $scope.Role.LastName=response[0].LastName;
   $scope.Role.PrimaryMobileNumber=response[0].PrimaryMobileNumber;
     $scope.Role.InstanceOrganizationKey=response[0].InstanceOrganizationKey;
   $scope.Role.StaffKey=response[0].StaffKey;
   $scope.Role.Password=response[0].Password;
   $scope.Role.PersonKey=response[0].PersonKey;
   $scope.Role.InstanceOrganizationKey=response[0].InstanceOrganizationKey;
     if (response[0].N3DMSFileKey != null && response[0].N3DMSFileKey != undefined && response[0].N3DMSFileKey != "") {
                $scope.studentProfilePic = "3ilAppBase01/Web/assets/images/loading.gif";
                 $scope.Role.FolderKey = response[0].FolderKey;
                 $scope.Role.N3DMSFileKey = response[0].N3DMSFileKey;
                ThrillAppBaseStudentLogic.getProfilePicture($scope.Role.FolderKey, $scope.Role.N3DMSFileKey).then(function(pictureResponse) {
                    //alert(pictureResponse);
                    $scope.studentProfilePic = pictureResponse.FileBin
                })
            }


}
   
   
        });

};


$scope.SaveRole = function() {

    //alert(JSON.stringify($scope.AssignRole));

    if(!$scope.msg && !$scope.text )

{

if(!$scope.roledup )
{
    if($scope.Role.InstanceOrganizationKey==$localStorage.organizationKey)
      { 
       

   // alert(JSON.stringify($scope.AssignRole));
    //alert(typeof($scope.AssignRole.RoleID));
    //alert(JSON.stringify($scope.AssignRole));
        if($scope.AssignRole.RoleID==3){
            RoleName="Principal"
        }
        else{
             RoleName="Finance Manager"
        }
/*RolesLogic.multipleRoleCheck($scope.AssignRole.RoleID,$scope.Role.PersonKey,$scope.AssignRole.InstituteKey,$localStorage.organizationKey).then(function (response) {
  console.log(response);
 
if(response.length==undefined)
{
*/


RolesLogic.duplicateCheck($scope.AssignRole.RoleID,$scope.Role.PersonKey,$scope.AssignRole.InstituteKey,$localStorage.organizationKey).then(function (response) {
   // alert(JSON.stringify(response.length));
//console.log(response);
 
if(response.length==undefined)
{

   var userObject = {
                    "RoleName":RoleName,
                    "Password": $scope.Role.Password
                    , "EmailId": $scope.AssignRole.PrimaryEmailAddress
                };


     RolesLogic.assignmail(userObject).then(function (response) {

        // alert(JSON.stringify(response));
        
        return response;

     }).then(function(response){


         var UsersmsObject = {
                      "RoleName":RoleName,
                        "EmailId": $scope.AssignRole.PrimaryEmailAddress
                        , "Password": $scope.Role.Password
                        , "PrimaryMobileNumber": $scope.AssignRole.MobileNumber
                    };
                   return RolesLogic.assigsms(UsersmsObject).then(function (response) {

                        // alert(JSON.stringify(response));
                        return response;

                    })


     }).then(function(response){


        return RolesLogic.verification($scope.Role.PersonKey).then(function (response) {
              // alert(JSON.stringify(response));

            return response;
         });

     }).then(function(response){


           var loginObject = {
                      "RoleID":$scope.AssignRole.RoleID,
                        "PersonReferencekey":$scope.Role.PersonKey
                        ,"InstituteKey": $scope.AssignRole.InstituteKey
                        , "InstanceOrganizationKey":$localStorage.organizationKey
                        ,"IsPrimaryRole":0
                    };



 // RolesLogic.updatelogindetails($scope.Role.PersonKey,loginObject).then(function (response) {
                      RolesLogic.addlogindetails(loginObject).then(function (response) {

                      //  alert(JSON.stringify(response));
                      
                        $scope.AssignRole={};
                        $scope.Role={};
                        SweetAlert.swal({
                            title: "Role"
                            , text: "Assigned successfully"
                            , type: "success"
                            , confirmButtonColor: "#007AFF"
                        });
                        $scope.getRolesList();
                        

                    });



     });
               
}
else{
$scope.duplicate="This Role is assigned to this person already for this Institute.Try Another!";
}
});


   
}else
{
$scope.tmessage=true;
}
}
}
};

$scope.getRolesList = function() {

 RolesLogic.getroleslistbyorg($localStorage.organizationKey).then(function (response) {
     $scope.orgRoleList = response;
console.log(JSON.stringify(response));
 });

}

$scope.getRolesList();


$scope.editRole = function(roleId) {

 RolesLogic.getrolesbyRoleKEy(roleId).then(function (response) {
   $scope.emailbtn=false; 
   $scope.emaildisable=true;
    $scope.updatee=true;
       $scope.savee=false;
       $scope.Role={};
       $scope.AssignRole={};
      
console.log(JSON.stringify(response));

$scope.Role.FirstName=response[0].FirstName;
   $scope.Role.LastName=response[0].LastName;
   $scope.Role.PrimaryMobileNumber=response[0].PrimaryMobileNumber;
    
   //$scope.Role.StaffKey=response[0].StaffKey;
   //$scope.Role.Password=response[0].Password;
   $scope.Role.PersonKey=response[0].PersonReferencekey;
   $scope.Role.InstanceOrganizationKey=response[0].InstanceOrganizationKey;
$scope.AssignRole.RoleID=parseInt(response[0].RoleID);
 $scope.inst=true;
  $scope.getInstitutes();
$scope.AssignRole.PrimaryEmailAddress=response[0].EmailId;
 $scope.AssignRole.InstituteKey=response[0].InstituteKey;


   if (response[0].N3DMSFileKey != null && response[0].N3DMSFileKey != undefined && response[0].N3DMSFileKey != "") {
                $scope.studentProfilePic = "3ilAppBase01/Web/assets/images/loading.gif";
                 $scope.Role.FolderKey = response[0].FolderKey;
                 $scope.Role.N3DMSFileKey = response[0].N3DMSFileKey;
                ThrillAppBaseStudentLogic.getProfilePicture($scope.Role.FolderKey, $scope.Role.N3DMSFileKey).then(function(pictureResponse) {
                    //alert(pictureResponse);
                    $scope.studentProfilePic = pictureResponse.FileBin
                })
            }

 });

}

$scope.updateRole = function() {

RolesLogic.duplicateCheck($scope.AssignRole.RoleID,$scope.Role.PersonKey,$scope.AssignRole.InstituteKey,$localStorage.organizationKey).then(function (response) {
  console.log(response);
 
if(response.length==undefined)
{
  var loginObject = {
                      "RoleID":$scope.AssignRole.RoleID,
                        "PersonReferencekey":$scope.Role.PersonKey
                        ,"InstituteKey": $scope.AssignRole.InstituteKey
                        , "InstanceOrganizationKey":$localStorage.organizationKey
                        ,"IsPrimaryRole":0
                    };

  RolesLogic.updatelogindetails($scope.Role.PersonKey,loginObject).then(function (response) {
 $scope.AssignRole={};
                        $scope.Role={};
                        SweetAlert.swal({
                            title: "Role"
                            , text: "Updated successfully"
                            , type: "success"
                            , confirmButtonColor: "#007AFF"
                        });
                        $scope.getRolesList();
 });

}
else{
     $scope.duplicate="This Role is assigned to this person already for this Institute.Try Another!";
}

 
});
};


 $scope.passwordchange = function(id) {

        $state.go('app.RolePassword/:Referencekey', { Referencekey: id });
    };





   /* var data = [{
        "id": 1,
        "lm": 138661285100,
        "ln": "Smith",
        "fn": "John",
        "dc": "CEO",
        "em": "j.smith@company.com",
        "ph": "617-321-4567",
        "ac": true,
        "dl": false
    }, {
        "id": 2,
        "lm": 138661285200,
        "ln": "Taylor",
        "fn": "Lisa",
        "dc": "VP of Marketing",
        "em": "l.taylor@company.com",
        "ph": "617-522-5588",
        "ac": true,
        "dl": false
    }, {
        "id": 3,
        "lm": 138661285300,
        "ln": "Jones",
        "fn": "James",
        "dc": "VP of Sales",
        "em": "j.jones@company.com",
        "ph": "617-589-9977",
        "ac": true,
        "dl": false
    }, {
        "id": 4,
        "lm": 138661285400,
        "ln": "Wong",
        "fn": "Paul",
        "dc": "VP of Engineering",
        "em": "p.wong@company.com",
        "ph": "617-245-9785",
        "ac": true,
        "dl": false
    }, {
        "id": 5,
        "lm": 138661285500,
        "ln": "King",
        "fn": "Alice",
        "dc": "Architect",
        "em": "a.king@company.com",
        "ph": "617-244-1177",
        "ac": true,
        "dl": false
    }, {
        "id": 6,
        "lm": 138661285600,
        "ln": "Brown",
        "fn": "Jan",
        "dc": "Software Engineer",
        "em": "j.brown@company.com",
        "ph": "617-568-9863",
        "ac": true,
        "dl": false
    }, {
        "id": 7,
        "lm": 138661285700,
        "ln": "Garcia",
        "fn": "Ami",
        "dc": "Software Engineer",
        "em": "a.garcia@company.com",
        "ph": "617-327-9966",
        "ac": true,
        "dl": false
    }, {
        "id": 8,
        "lm": 138661285800,
        "ln": "Green",
        "fn": "Jack",
        "dc": "Software Engineer",
        "em": "j.green@company.com",
        "ph": "617-565-9966",
        "ac": true,
        "dl": false
    }, {
        "id": 9,
        "lm": 138661285900,
        "ln": "Liesen",
        "fn": "Abraham",
        "dc": "Plumber",
        "em": "a.liesen@company.com",
        "ph": "617-523-4468",
        "ac": true,
        "dl": false
    }, {
        "id": 10,
        "lm": 138661286000,
        "ln": "Bower",
        "fn": "Angela",
        "dc": "Product Manager",
        "em": "a.bower@company.com",
        "ph": "617-877-3434",
        "ac": true,
        "dl": false
    }, {
        "id": 11,
        "lm": 138661286100,
        "ln": "Davidoff",
        "fn": "Fjodor",
        "dc": "Database Admin",
        "em": "f.davidoff@company.com",
        "ph": "617-446-9999",
        "ac": true,
        "dl": false
    }, {
        "id": 12,
        "lm": 138661286200,
        "ln": "Vitrovic",
        "fn": "Biljana",
        "dc": "Director of Communications",
        "em": "b.vitrovic@company.com",
        "ph": "617-111-1111",
        "ac": true,
        "dl": false
    }, {
        "id": 13,
        "lm": 138661286300,
        "ln": "Valet",
        "fn": "Guillaume",
        "dc": "Software Engineer",
        "em": "g.valet@company.com",
        "ph": "617-565-4412",
        "ac": true,
        "dl": false
    }, {
        "id": 14,
        "lm": 138661286400,
        "ln": "Tran",
        "fn": "Min",
        "dc": "Gui Designer",
        "em": "m.tran@company.com",
        "ph": "617-866-2554",
        "ac": true,
        "dl": false
    }];
    $scope.tableParams = new ngTableParams({
        page: 1,
        count: 10
    }, {
        total: data.length,
        getData: function ($defer, params) {
            var orderedData = params.sorting() ? $filter('orderBy')(data, params.orderBy()) : data;
            $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
        }
    });

    $scope.editId = -1;

    $scope.setEditId = function (pid) {
        $scope.editId = pid;
    };*/
});