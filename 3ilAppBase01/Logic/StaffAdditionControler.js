'use strict';
var app = angular.module('Aarush.StaffAddition', ['ThrillAppBase.StaffAdditionLogic'
    , 'ThrillPerson.personReligionLogic'
    ,'Mcampuz.RolesLogic'
    , 'ThrillContact.contactLogic'
    , 'ThrillOrganization.organizationLogic'
    , 'ThrillAppBase.thrillAppBasePersonLogic'
    , 'ThrillInstitute.instituteLogic'
    , 'ThrillContact.contactContactItemLogic'
    , 'ThrillPerson.personMaritalStatusLogic'
    , 'security.registrationLogic'
     , 'security.forgotPasswordLogic'
    , 'ThrillPerson.personBasicInfoLogic'
    ,'Mcampuz.RolesLogic'
]);
app.controller('Aarush.StaffAddition', function ($scope, $filter, $rootScope,roleLogic, TempDataService, RolesLogic,$state, personReligionLogic, organizationLogic, $stateParams, $localStorage, ThrillAppBaseStaffLogic, personBasicInfoLogic, contactLogic, instituteLogic, thrillAppBasePersonLogic, contactContactItemLogic, registrationLogic, forgotPasswordLogic, SweetAlert, PersonMaritalStatusLogic) {
    $scope.org = {};
    getContactTypes();
    $scope.maxDate = new Date();
    $scope.minDate = new Date('01-01-1916');
    var OrganizationKey = "";
    var PersonKey = "";
    var PersonID;
    var folderKey = "";
    var fileKey = "";
    $scope.save = true;
    $scope.update = false;
    $scope.check=true;
    //var OrganizationKey = "d0a4cb70-58b3-11e6-92e8-2bb75054daa9";
    var OrganizationKey = $localStorage.organizationKey;
    var getSubOrgs = function () {
        organizationLogic.getOrganizationsByRootOrganization(OrganizationKey).then(function (response) {
            //  console.log(response);
            $scope.subOrganizationList = response;
        }, function (err) {
            console.error('ERR', err);
        });
    }
    getSubOrgs();
    $scope.getInstitutes = function () {
            var personOrganizationKey = $scope.Staff.SuborganizationKey;
            instituteLogic.getAllInstitutesByBranch(personOrganizationKey).then(function (response) {
                
                console.log(JSON.stringify(response));
                $scope.instituteList = response;
            });
        }

  var getRoles = function () {
        roleLogic.getAllRoles().then(function (response) {
            $scope.roles = response;

        });

    };

    getRoles();



        // $scope.buttonText = "Save";
        //    $scope.profilePic = "3ilAppBase01/Web/assets/images/organization3.png";
    $scope.orgs = TempDataService.getOrgs();
    // $scope.edit = function(object) {
    //     $scope.org = object;
    //     $rootScope.org = object;
    // };

    $scope.checkmail = function(email) {
   
   registrationLogic.getEmail(email).then(function(response) {
    /*console.log(JSON.stringify(response));
   console.log(JSON.stringify(response.length));*/
            if(response.length==undefined)
            {

             $scope.msg=false;
            }
            else{
                 $scope.msg=true;
            }
   });
               
}
$scope.duplicaterole=function(){
if($scope.AssignRole.RoleID==3)
{
  RolesLogic.roleduplicate($scope.Staff.RoleID,$scope.Staff.InstituteKey).then(function(response) {
    /*console.log(response)
    alert(JSON.stringify(response));*/
   
    if(response.length==undefined)
{
    $scope.roledup=false;

RolesLogic.duplicateCheck($scope.Staff.RoleID,$scope.Staff.PersonKey,$scope.Staff.InstituteKey,$localStorage.organizationKey).then(function (response) {
  console.log(response);
 
if(response.length==undefined)
{
  $scope.duplicate=false;
}
 else{
    $scope.duplicate=true;
}
});

    }
    else{
       $scope.roledup=true;
    }
});

}
};


     $scope.showBranch=false;
      $scope.institute=false;
       $scope.org=false;
         $scope.Parentradio =function(){
        $scope.org=true;
        $scope.showBranch=false;
         $scope.institute=false;
    }
    $scope.branchradio =function(){
        $scope.org=false;
        $scope.showBranch=true;
         $scope.institute=false;
    }

 $scope.instituteradio =function(){
        $scope.org=false;
        $scope.institute=true;
        $scope.showBranch=false;
    }


      $scope.checkmobile = function(mobile) {
   //alert(mobile);
   registrationLogic.getMobile(mobile).then(function(response) {
    //alert(response.length);
    /*console.log(JSON.stringify(response));
   console.log(JSON.stringify(response.length));*/
            if(response.length==undefined)
            {

             $scope.mtext=false;
            }
            else{
                 $scope.mtext=true;
            }
   });
               
}
    
  

    

    $scope.Staff = $rootScope.Staff;
    if ($stateParams.StaffKey) {
        ThrillAppBaseStaffLogic.getStaffByStaffKey($stateParams.StaffKey).then(function (response) {
            console.log(JSON.stringify(response));
            $scope.save = false;
            $scope.update = true;
            if( response[0].InstituteKey==null)
            {
               $scope.showBranch=true;
               $scope.institute=false;
            }
            else{

               $scope.showBranch=false;
               $scope.institute=true;

            }
            console.log(response);
            $scope.Staff = {};
            $scope.Staffs = {};
            // $scope.contact={};
            $scope.Staff.StaffKey = response[0].StaffKey;
            $scope.Staff.designationId = response[0].DesignationId;
            $scope.Staff.PersonKey = response[0].PersonKey;
            //  $scope.Staff.contact.ContactKey = response[0].ContactKey;
            //  $scope.Staff.contact.contactTypeKey=response[0].contactTypeKey;
            // $Staff.contact.contactItemInfo= response[0].contactItemInfo;
            $scope.Staff.InstanceOrganizationKey = response[0].InstanceOrganizationKey;
            $scope.Staff.EmployeeNumber = response[0].EmployeeNumber;
            $scope.Staff.EmployeeCategoryKey = response[0].EmployeeCategoryKey;
            $scope.Staff.DateOfJoining = new Date(response[0].DateOfJoining);
            $scope.Staff.EmploymentTypeKey = response[0].EmploymentTypeKey;
            // $scope.Staff.DepartmentReferenceKey=response[0].DepartmentReferenceKey;
            $scope.Staff.TreasuryId = response[0].TreasuryId;
            $scope.Staff.FinalInterviewedDate = new Date(response[0].FinalInterviewedDate);
            $scope.Staff.appointmentkey = response[0].NatureOfAppointment;
            $scope.Staff.appointmentkey = response[0].NatureOfAppointment;
            $scope.Staff.referenceKey = response[0].DepartmentReferenceKey;
            $scope.Staff.FirstName = response[0].FirstName;
            $scope.Staff.MiddleName = response[0].MiddleName;
            $scope.Staff.LastName = response[0].LastName;
            $scope.Staff.DateOfBirth = new Date(response[0].DateOfBirth);
            $scope.Staff.Id = response[0].GenderID;
            $scope.Staff.maritalStatusTypeId = response[0].MaritalStatusId;
            $scope.Staff.languageId = response[0].PrimaryLanguageId;
            $scope.Staff.employeeId = response[0].EmployeeNumber;
            $scope.Staff.religionTypeId = response[0].ReligionId;
            $scope.Staff.nationalityId = response[0].NationalityId;
            $scope.Staff.aadharCardNumber = response[0].AadharNumber;
            $scope.Staff.socialGroupId = response[0].SocialGroupId;
            $scope.Staff.bloodGroupId = response[0].bloodgroupId;
            $scope.Staff.gender = response[0].GenderID;
            $scope.Staffs.referenceKey = response[0].SecondaryDepartmentKey;
            $scope.Staff.InstituteKey = response[0].InstituteKey;
            
            $scope.Staff.SuborganizationKey = response[0].WorkingLocationKey;
             $scope.getInstitutes();
             $scope.Staff.RoleID=parseInt(response[0].RoleID);
            $scope.Staff.interviewByKey=response[0].InterviewedBy,
            $scope.Staff.WorkingLocationKey = $scope.Staff.SuborganizationKey
            $scope.Staff.PrimaryMobileNumber = response[0].PrimaryMobileNumber;
            $scope.Staff.EmailId = response[0].EmailId;
            if (response[0].N3DMSFileKey != null && response[0].N3DMSFileKey != undefined) {
                $scope.profilePic = "3ilAppBase01/Web/assets/images/loading.gif";
                var folderKey = response[0].FolderKey;
                var fileKey = response[0].N3DMSFileKey;
                ThrillAppBaseStaffLogic.getStaffProfilePicture(folderKey, fileKey).then(function (pictureResponse) {
                    console.log(pictureResponse);
                    $scope.image_source = pictureResponse.FileBin
                })
            }
            //  $scope.Staffs.IsActive=response[0].IsActive;
            if (response[0].IsSMc.data[0] == 1) {
                $scope.Staff.IsSMC = true;
            }
            else {
                $scope.Staff.IsSMC = false;
            }
            if (response[0].IsActive.data[0] == 1) {
                $scope.Staff.IsActive = true;
                $scope.check=true;
            }
            else {
                $scope.Staff.IsActive = false;
                $scope.check=false;
            }
            console.log(JSON.stringify(response[0]))
        });
    }

    $scope.updateGroup = function () {
        groupLogic.updateGroup($scope.entityGroup, $scope.entityGroup.groupKey).then(function (response) {
            // appLogger.alert($scope.alertMessageLabels.groupUpdated);
            $scope.entityGroup = {};
            refresh();
            $scope.save = true;
            $scope.update = false;
        }, function (err) {
            appLogger.error('ERR', err);
        });
    };
    $scope.Savestafforganization = function (object) {
        console.log(object);
        TempDataService.Stafflist(object);
        $state.go('app.stafflist');
    };
    $scope.addContactItem = function () {
        var contactKey = $scope.Staff.contactKey;
        if (contactKey == undefined || contactKey == null) {
            contactLogic.addContact({}).then(function (response) {
                console.log(response);
                contactKey = response.data.contactKey;
                $scope.Staff.contactKey = contactKey;
                var contactObj = {
                    "contactKey": $scope.Staff.contactKey
                    , "contactTypeKey": $scope.Staff.contact.contactTypeKey
                    , "contactItemInfo": $scope.Staff.contact.contactItemInfo
                }
                contactContactItemLogic.addContactContactItem(contactObj, contactKey).then(function (response) {
                    console.log(response);
                    getContactItems(contactKey);
                    /*      SweetAlert.swal({
                          title: "Contacts",
                          text: "Added successfully",
                          type: "success",
                          confirmButtonColor: "#007AFF"
                      }, function() {
                          //$state.go('app.stafflist');
                      });*/
                    // getContactItems(contactKey);
                    console.log('contact item Save reponse ' + JSON.stringify(response));
                })
            })
        }
        else {
            $scope.Staff.contactKey = contactKey;
            var contactObj = {
                "contactKey": $scope.Staff.contactKey
                , "contactTypeKey": $scope.Staff.contact.contactTypeKey
                , "contactItemInfo": $scope.Staff.contact.contactItemInfo
            }
            contactContactItemLogic.addContactContactItem(contactObj, contactKey).then(function (response) {
                console.log('contact item Saved without logo reponse ' + JSON.stringify(response));
                SweetAlert.swal({
                    title: "Contacts"
                    , text: "Added successfully"
                    , type: "success"
                    , confirmButtonColor: "#007AFF"
                }, function () {
                    //$state.go('app.stafflist');
                });
                getContactItems(contactKey)
            })
        }
    }
    $scope.deleteContact = function (contactKey, contactItemKey) {
            SweetAlert.swal({
                title: "Are you sure?"
                , text: "Your want to delete this contact"
                , type: "warning"
                , showCancelButton: true
                , confirmButtonColor: "#DD6B55"
                , confirmButtonText: "Yes, delete it!"
                , cancelButtonText: "No, cancel!"
                , closeOnConfirm: false
                , closeOnCancel: false
            }, function (isConfirm) {
                if (isConfirm) {
                    SweetAlert.swal({
                        title: "Deleted!"
                        , text: "Your contact has been deleted."
                        , type: "success"
                        , confirmButtonColor: "#007AFF"
                    }, function () {
                        contactContactItemLogic.deleteContactContactItem(contactKey, contactItemKey).then(function () {
                            getContactItems(contactKey);
                        })
                    });
                }
                else {
                    SweetAlert.swal({
                        title: "Cancelled"
                        , text: "Your contact is safe :)"
                        , type: "error"
                        , confirmButtonColor: "#007AFF"
                    });
                }
            });
            /*if (confirm('Are you sure you want to delete this contact record')) {
                     
                 }*/
        }
        // if ($localStorage.Role == 'Admin') {
        //     if ($rootScope.Staff == "" || $rootScope.Staff == null || $rootScope.Staff == undefined || $rootScope.Staff == 'undefined') {
        //         $scope.Staffupdate = true;
        //     } else
        //         $scope.StaffAdd = true;
        //     $scope.adminMenu = true;
        // } else if
        // ($localStorage.Role == 'Doctor') {
        //     $scope.doctorMenu = true;
        //     $scope.StaffAdd = true;
        //     $scope.Staffupdate = true;
        // } else if ($localStorage.Role == 'Clerk') {
        //     // alert('here');
        //     $scope.clerkMenu = true;
        //     $scope.StaffAdd = true;
        //     $scope.Staffupdate = true;
        // } else if ($localStorage.Role == 'Pharmacist') {
        //     $scope.pharmacistMenu = true;
        //     $scope.StaffAdd = true;
        //     $scope.Staffupdate = true;
        // } else if ($localStorage.Role == 'LabTechnician') {
        //     $scope.labTechnicianMenu = true;
        //     $scope.StaffAdd = true;
        //     $scope.Staffupdate = true;
        // }
    $scope.Alldesignation = {};
    $scope.allRoles = {};
    /*Method for  Designation -- Drop Down*/
    var designation = function (organizationKey) {
        thrillAppBasePersonLogic.getAllDesignationByOrganization(organizationKey).then(function (response) {
            $scope.allDesignation = response;
        }, function (err) {
            console.error('ERR', err);
        });
    };
    var branches = function (organizationKey) {
        thrillAppBasePersonLogic.getBranchesByRootOrganization(organizationKey).then(function (response) {
            $scope.allBranches = response;
            // alert(JSON.stringify($scope.allBranches)); 
        }, function (err) {
            console.error('ERR', err);
        });
    };
    var roles = function () {
        /*  thrillAppBasePersonLogic.getAllRoles().then(function (response) {
            
          $scope.allRoles = response;
             // alert(JSON.stringify($scope.allRoles)); 

          }, function (err) {
              
              console.error('ERR', err);

          });*/
    };
    branches($localStorage.organizationKey);
    designation($localStorage.organizationKey);
    roles();
    $scope.allSpecialization = {};
    /*Method for  Specialization -- Drop Down*/
    var Specialization = function (organizationKey) {
        thrillAppBasePersonLogic.getAllSpecializationByOrganization(organizationKey).then(function (response) {
            $scope.allSpecialization = response;
            /* alert(JSON.stringify($scope.allSpecialization));*/
        }, function (err) {
            console.error('ERR', err);
        });
    };
    // FOR Drop Down Validation
    $scope.branchSelection = function () {
        if ($scope.Staff.branch != "" && $scope.Staff.branch != undefined) {
            $scope.msg = '';
        }
        else {
            $scope.msg = 'Please Select Branch';
        }
    }
    $scope.DesignationSelection = function () {
        if ($scope.Staff.Designation != "" && $scope.Staff.Designation != undefined) {
            $scope.Designationmsg = '';
        }
        else {
            $scope.Designationmsg = 'Please Select Designation';
        }
    }
    $scope.SpecializationSelection = function () {
        if ($scope.Staff.Specialization != "" && $scope.Staff.Specialization != undefined) {
            $scope.Specializationmsg = '';
        }
        else {
            $scope.Specializationmsg = 'Please Select Specialization';
        }
    }
    $scope.RoleSelection = function () {
        if ($scope.Staff.Role != "" && $scope.Staff.Role != undefined) {
            $scope.Rolemsg = '';
        }
        else {
            $scope.Rolemsg = 'Please Select Specialization';
        }
    }
    $scope.compare = function (repass) {
        $scope.isconfirm = $scope.Staff.Password == repass ? true : false;
    }
    Specialization($localStorage.organizationKey);
    $scope.image_source = "3ilAppBase01/Web/assets/images/default-user.png";
    $scope.setFile = function (element) {
        $scope.currentFile = element.files[0];
        var reader = new FileReader();
        reader.onload = function (event) {
                $scope.image_source = event.target.result
                $scope.$apply()
            }
            // when the file is read it triggers the onload event above.
        reader.readAsDataURL(element.files[0]);
    }
    $scope.StaffAdd = false;
    $scope.Staffupdate = false;
    if ($stateParams.staffId == undefined) {
        $scope.Staffupdate = true;
        // $scope.profilePic = false;
    }
    else {
        $scope.StaffAdd = true;
        personBasicInfoLogic.getPersonBasicInfoById($stateParams.staffId).then(function (responsepersondetails) {
            /* alert($stateParams.staffId);
           // alert(JSON.stringify(responsepersondetails));*/
            $scope.Staff = {};
            $scope.Staff.referenceKey = responsepersondetails.referenceKey;
            $scope.Staff.FirstName = responsepersondetails.firstName;
            if (responsepersondetails.middleName == 'undefined') {
                $scope.Staff.MiddleName = '';
            }
            else {
                $scope.Staff.MiddleName = responsepersondetails.middleName;
            }
            $scope.Staff.LastName = responsepersondetails.lastName;
            $scope.Staff.DateOfBirth = new Date(responsepersondetails.dateOfBirth);
            $scope.Staff.gender = responsepersondetails.genderId;
            var roleId;
            if (responsepersondetails.DMSFileKey != undefined && responsepersondetails.DMSFileKey != '') {
                $scope.image_source = "3ilAppBase01/Web/assets/images/loadingGif.gif"
                var foderKey = responsepersondetails.folderKey;
                var fileKey = responsepersondetails.DMSFileKey;
                //  alert(foderKey);
                ThrillAppBaseStaffLogic.getStaffProfilePicture(foderKey, fileKey).then(function (pictureResponse) {
                    var base64Image = pictureResponse.FileBin;
                    $scope.image_source = base64Image;
                })
            }
            thrillAppBasePersonLogic.getRolebyReferencekey(responsepersondetails.referenceKey).then(function (response) {
                if (response[0].contactKey != undefined && response[0].contactKey != "") $scope.Staff.contactKey = response[0].contactKey;
                getContactItems(response[0].contactKey);
                console.log(JSON.stringify(response));
                roleId = '' + response[0].RoleId + '';
                $scope.Staff.Designation = response[0].designationKey;
                $scope.Staff.Specialization = response[0].specializationKey;
                $scope.Staff.branch = response[0].branchkey;
                $scope.Staff.Role = roleId;
            });
            $scope.Staff.GenderID = responsepersondetails.genderId;
            //$scope.person.bloodGroupId = response.bloodGroupId;
            // $scope.person.identificationMarks = response.identificationMarks;
            // $scope.location = {};
            // $scope.location.locationId = response.locationId;
            // $scope.location.geoLocation = response.geoLocation;
            //$scope.child.=responsepersondetails;
            /*  contactLogic.getContactsByEntityKeys($stateParams.staffId).then(function (response) {
                  //alert(JSON.stringify(response));
                         angular.forEach(response, function (contact) {

                  if (contact.contactSubTypeId == 2) //mobile   
                  {
                      $scope.Staff.MobileNumber = contact.contactInfo;
                      $scope.Staff.MobileNumberreferenceKey = contact.referenceKey
                  } else if (contact.contactSubTypeId == 3) //email
                  {
                      $scope.Staff.Email = contact.contactInfo;
                      $scope.Staff.EmailreferenceKey = contact.referenceKey
                  }
               
              })
                      });*/
        });
        $scope.profilePic = true;
    }
    $scope.Staffcancel = function () {
        $state.go('app.stafflist');
    }
    if ($rootScope.Staff == "" || $rootScope.Staff == null || $rootScope.Staff == undefined || $rootScope.Staff == 'undefined') {
        // angular.copy($localStorage.tempBranch, $scope.Branches);
        // alert('here1');
        //$scope.Updatebtn="false";
    }
    else {
        //  alert('here1');
        //  $scope.Branches=$localStorage.tempBranch;
        // alert(234);
        // alert(JSON.stringify($scope.Branches));
        $scope.savebtn = true;
        //$scope.savebtn="false";
    }
    $scope.StaffExperience = [];
    $scope.StaffExperience.push({
        'Experience': ""
    , });
    $scope.addNew = function (personalDetail) {
        $scope.StaffExperience.push({
            'Experience': ""
        , });
        // alert(JSON.stringify($scope.personalDetails));
    };
    $scope.remove = function (obj) {
        // alert(obj);
        if (obj != -1) {
            $scope.StaffExperience.splice(obj, 1);
        }
    };
    $scope.StaffQualification = [];
    $scope.StaffQualification.push({
        'Qualification': ""
    , });
    $scope.QualificationaddNew = function () {
        $scope.StaffQualification.push({
            'Experience': ""
        , });
        // alert(JSON.stringify($scope.personalDetails));
    };
    $scope.remove = function (obj) {
        // alert(obj);
        if (obj != -1) {
            $scope.StaffQualification.splice(obj, 1);
        }
    };
    // Contacts
    //alert(JSON.stringify(TempDataService.getStaffOrgs()[0].contacts));
    // alert(JSON.stringify($scope.Staff));
    if ($scope.Staff == '' || $scope.Staff == undefined) {
        $scope.Staffcontacts = [];
        // alert($scope.Staffcontacts.length);
    }
    else {
        $scope.Staffcontacts = TempDataService.getStaffOrgs()[0].contacts;
    }
    if ($scope.Staffcontacts.length == 0) {
        var contact = {
            contactType: ""
            , contact: ""
            , id: 1
        }
        $scope.Staffcontacts.push(contact);
    }
    $scope.Staff = {};
    $scope.Savebasicinfo = function (staff) {
        
        if(!$scope.msg && !$scope.text) 
      {
        //        alert($scope.Staff.WorkingLocationKey);
        if ($scope.Staff.MiddleName == '' || $scope.Staff.MiddleName == null) {
            $scope.Staff.MiddleName = null;
        }
        var personObj = {
            "PersonID": $scope.Staff.PersonID
            , "FirstName": $scope.Staff.FirstName
            , "MiddleName": $scope.Staff.MiddleName
            , "LastName": $scope.Staff.LastName
            , "PrimaryMobileNumber": $scope.Staff.PrimaryMobileNumber
            , "EmailId": $scope.Staff.EmailId
            , "DateOfBirth": $scope.Staff.DateOfBirth
            , "GenderID": $scope.Staff.Id
            , "Contactkey": $scope.Staff.contactKey
            , "MaritalStatusId": $scope.Staff.maritalStatusTypeId
            , "BloodGroupID": $scope.Staff.bloodGroupId
            , "PrimaryLanguageId": $scope.Staff.languageId
            , "AadharNumber": $scope.Staff.aadharCardNumber
            , "NationalityId": $scope.Staff.nationalityId
            , "ReligionId": $scope.Staff.religionTypeId
            , "SocialGroupId": $scope.Staff.socialGroupId
                // "FolderKey":"1e081fb0-4730-11e6-a695-79fcf2c27f33",
                // "DMSFileKey":"1e167790-4730-11e6-a695-79fcf2c27f33"
        }
        personBasicInfoLogic.addStaffPerson(personObj).then(function (response) {
            console.log
            PersonKey = response.data.referenceKey;
            PersonID=response.data.insertId;
            $scope.Staff.PersonKey = PersonKey;
            $localStorage.StaffPersonKey = $scope.Staff.PersonKey;

if($scope.org==true)
{
    $scope.Staff.WorkingLocationKey = OrganizationKey; 
    $scope.Staff.InstituteKey=null;
}
else if($scope.showBranch==true)
{
  $scope.Staff.WorkingLocationKey = $scope.Staff.SuborganizationKey;
  $scope.Staff.InstituteKey=null;
}

else if($scope.institute==true)
{
    
    $scope.Staff.WorkingLocationKey=$scope.Staff.SuborganizationKey;
}
         /*   if ($scope.Staff.SuborganizationKey == undefined || $scope.Staff.SuborganizationKey == '') {
                $scope.Staff.WorkingLocationKey = OrganizationKey;
            }

            if ($scope.Staff.WorkingLocationKey == undefined || $scope.Staff.WorkingLocationKey == '') {
                $scope.Staff.WorkingLocationKey = $scope.Staff.SuborganizationKey;
            }
            */
    // alert(JSON.stringify($scope.Staff));



             var digit = Math.floor((Math.random() * 1000) + 1);
            
            var password = "3il@"+digit;



var securityobj={
                 "Password":password
                , "FirstName": $scope.Staff.FirstName
                , "LastName": $scope.Staff.LastName, // "PersonKey":PersonKey,
                "MobileNumber": $scope.Staff.PrimaryMobileNumber
                , "PrimaryEmailAddress": $scope.Staff.EmailId
                , "PersonID": PersonID
                , "ReferenceKey": PersonKey
                
};



           registrationLogic.poststaffsecurityuser(securityobj).then(function (response) {
           


            var staffObj = {
                "EmployeeNumber": $scope.Staff.employeeId
                , "EmployeeCategoryKey": $scope.Staff.EmployeeCategoryKey
                , "InstanceOrganizationKey": OrganizationKey, // "PersonKey":PersonKey,
                "ProfilePic": $scope.Staff.file
                , "PersonKey": $scope.Staff.PersonKey
                , "DepartmentReferenceKey": $scope.Staff.referenceKey
                , "EmploymentTypeKey": $scope.Staff.EmploymentTypeKey
                , "DateOfJoining": $scope.Staff.DateOfJoining
                , "DesignationId": $scope.Staff.designationId
                , "SecondaryDepartmentKey": $scope.Staff.referenceKey
                , "TreasuryId": $scope.Staff.TreasuryId
                , "NatureOfAppointment": $scope.Staff.appointmentkey
                , "FinalInterviewedDate": $scope.Staff.FinalInterviewedDate
                , "WorkingLocationKey": $scope.Staff.WorkingLocationKey
                , "InterviewedBy":$scope.Staff.interviewByKey
                , "IsSMC": $scope.Staff.IsSMC
                ,"InstituteKey":$scope.Staff.InstituteKey
                , "IsActive": $scope.Staff.IsActive
                , "CreatedUserKey": "new-User-staff"
                , "CreatedAppKey": "new-App-mCampuZ"
            };
            ThrillAppBaseStaffLogic.addNewStaff(staffObj).then(function (response) {
                console.log(JSON.stringify(response));
                // console.log(response);
                $localStorage.WorkingLocationKey = staffObj.WorkingLocationKey;
                var StaffresponseKey = response.data.StaffKey;
                //Email
                var StaffObject = {
                    "Password": password
                    , "EmailId": $scope.Staff.EmailId
                };
                registrationLogic.staffMail(StaffObject).then(function (response) {
                    //Sms
                    var StudentsmsObject = {
                        "EmailId": $scope.Staff.EmailId
                        , "Password": password
                        , "PrimaryMobileNumber": $scope.Staff.PrimaryMobileNumber
                    };
                    forgotPasswordLogic.staffSms(StudentsmsObject).then(function (response) {

                          RolesLogic.verification($scope.Staff.PersonKey).then(function (response) {
                            if($scope.Staff.InstituteKey==null)
                            {
                                $scope.Staff.InstituteKey=$scope.Staff.WorkingLocationKey;
                            }
             var loginObject = {
                      "RoleID":$scope.Staff.RoleID,
                        "PersonReferencekey":$scope.Staff.PersonKey
                        ,"InstituteKey": $scope.Staff.InstituteKey
                        , "InstanceOrganizationKey":OrganizationKey
                        ,"IsPrimaryRole":1
                    };

              RolesLogic.addlogindetails(loginObject).then(function (response) {
                       
                        SweetAlert.swal({
                            title: "Staff"
                            , text: "Saved successfully"
                            , type: "success"
                            , confirmButtonColor: "#007AFF"
                        });
                   $state.go('app.staff/StaffKey/:StaffKey/PersonKey/:PersonKey', {
                            StaffKey: StaffresponseKey
                            , PersonKey: staffObj.PersonKey
                        });
                    });
                });
            });
                });
            });

        });
        });
    }
    };
    $scope.updateStaffOrganization = function () {

        if ($scope.Staff.MiddleName == '' || $scope.Staff.MiddleName == null) {
            $scope.Staff.MiddleName = null;
        }
if($scope.org==true)
{
    $scope.Staff.WorkingLocationKey = OrganizationKey; 
    $scope.Staff.InstituteKey=null;
}
else if($scope.showBranch==true)
{
  $scope.Staff.WorkingLocationKey = $scope.Staff.SuborganizationKey;
  $scope.Staff.InstituteKey=null;
}

else if($scope.institute==true)
{
    
    $scope.Staff.WorkingLocationKey=$scope.Staff.SuborganizationKey;
}

        if(!$scope.roledup && !$scope.duplicate)
{
      var personsObj = {
            "PersonID": $scope.Staff.PersonID
            , "FirstName": $scope.Staff.FirstName
            , "MiddleName": $scope.Staff.MiddleName
            , "LastName": $scope.Staff.LastName
            , "DateOfBirth": $scope.Staff.DateOfBirth
            , "GenderID": $scope.Staff.GenderID
            , "MaritalStatusId": $scope.Staff.maritalStatusTypeId
            , "BloodGroupID": $scope.Staff.bloodGroupId
            , "PrimaryLanguageId": $scope.Staff.languageId
            , "AadharNumber": $scope.Staff.aadharCardNumber
            , "NationalityId": $scope.Staff.nationalityId
            , "ReligionId": $scope.Staff.religionTypeId
            , "SocialGroupId": $scope.Staff.socialGroupId
        }
        personBasicInfoLogic.updateStaffPerson(personsObj, $scope.Staff.PersonKey).then(function (response) {
            var staffObj = {
                "EmployeeNumber": $scope.Staff.employeeId
                , "EmployeeCategoryKey": $scope.Staff.EmployeeCategoryKey
                , "InstanceOrganizationKey": OrganizationKey
                , "PersonKey": PersonKey
                , "ProfilePic": $scope.Staff.file
                , "DepartmentReferenceKey": $scope.Staff.referenceKey
                , "EmploymentTypeKey": $scope.Staff.EmploymentTypeKey
                , "DateOfJoining": $scope.Staff.DateOfJoining
                , "PersonKey": $scope.Staff.PersonKey
                , "DesignationId": $scope.Staff.designationId
                , "SecondaryDepartmentKey": $scope.Staffs.referenceKey
                , "TreasuryId": $scope.Staff.TreasuryId
                , "NatureOfAppointment": $scope.Staff.appointmentkey
                , "FinalInterviewedDate": $scope.Staff.FinalInterviewedDate
                , "InterviewedBy":$scope.Staff.interviewByKey
                 ,"InstituteKey":$scope.Staff.InstituteKey
                 , "WorkingLocationKey": $scope.Staff.WorkingLocationKey
                , "IsSMC": $scope.Staff.IsSMC
                , "PersonKey": $scope.Staff.PersonKey
                , "IsActive": $scope.Staff.IsActive
                , "LastUpdatedUserkey": "update-User-student"
                , "LastUpdatedAppKey": "update-App-mCampuZ"
            };
            ThrillAppBaseStaffLogic.UpdateStaff(staffObj, $stateParams.StaffKey).then(function (response) {
if($scope.Staff.InstituteKey==null)
                            {
                                $scope.Staff.InstituteKey=$scope.Staff.WorkingLocationKey;
                            }
                
  var loginObject = {
                      "RoleID":$scope.Staff.RoleID,
                        "PersonReferencekey":$scope.Staff.PersonKey
                        ,"InstituteKey": $scope.Staff.InstituteKey
                        , "InstanceOrganizationKey":OrganizationKey
                        ,"IsPrimaryRole":1
                    };
            RolesLogic.updatelogindetails($scope.Staff.PersonKey,loginObject).then(function (response) {   
                SweetAlert.swal({
                    title: "Staff"
                    , text: "Updated successfully"
                    , type: "success"
                    , confirmButtonColor: "#007AFF"
                });
                $state.go('app.stafflist');
            });
            });
        });

    }
   

    };

    function getMaritalStatusTypes() {
        PersonMaritalStatusLogic.getMaritalStatusTypes().then(function (response) {
            $scope.maritalStatusTypes = response;
        })
    }
    getMaritalStatusTypes();

    function getContactTypes() {
        contactContactItemLogic.getContactTypes().then(function (response) {
            console.log(JSON.stringify(response));
            $scope.contactTypes = response;

        })
    }

    function getReligionTypes() {
        personReligionLogic.getReligionTypes().then(function (response) {
            $scope.religitionTypes = response;
             $scope.Staff.religionTypeId= 1;
        })
    }
    getReligionTypes();

    function getNationalityTypes() {
        ThrillAppBaseStaffLogic.getNationalityTypes().then(function (response) {
            $scope.nationalityTypes = response;

     $scope.Staff.nationalityId= 5;
        }, function (err) {
            appLogger.log(err);
            appLogger.error('ERR', err);
        });
    };
    getNationalityTypes();

    function getBloodTypes() {
        ThrillAppBaseStaffLogic.getBloodTypes().then(function (response) {
            $scope.bloodGroupTypes = response;
        }, function (err) {
            appLogger.log(err);
            appLogger.error('ERR', err);
        });
    };
    getBloodTypes();

    function getcasteTypes() {
        ThrillAppBaseStaffLogic.getCasteTypes().then(function (response) {
            $scope.casteTypes = response;
             $scope.Staff.socialGroupId= 1;
        }, function (err) {
            appLogger.log(err);
            appLogger.error('ERR', err);
        });
    };
    getcasteTypes();

    function getDepartmentTypes() {
        ThrillAppBaseStaffLogic.getAllDepartments($localStorage.organizationKey).then(function (response) {
            $scope.assignedDepartmentTypes = response;
        }, function (err) {
            appLogger.log(err);
            appLogger.error('ERR', err);
        });
    };
    getDepartmentTypes();

    function getLanguagesTypes() {
        ThrillAppBaseStaffLogic.getLanguagesTypes().then(function (response) {
            $scope.languageTypes = response;
             $scope.Staff.languageId= 17;
        }, function (err) {
            appLogger.log(err);
            appLogger.error('ERR', err);
        });
    };
    getLanguagesTypes();

    function getEmployeeCategoryTypes() {
        ThrillAppBaseStaffLogic.getEmployeeCategoryTypes().then(function (response) {
            $scope.employeeCategoryTypes = response;
        }, function (err) {
            appLogger.log(err);
            appLogger.error('ERR', err);
        });
    };
    getEmployeeCategoryTypes();
    // function getAssignedDepartmentTypes() {
    //             ThrillAppBaseStaffLogic.getAssignedDepartmentTypes().then(function (response) {
    //             $scope.employeeCategoryTypes = response;
    //             }, function (err) {
    //                 appLogger.log(err);
    //                 appLogger.error('ERR', err);
    //             });
    //         };
    // getAssignedDepartmentTypes();
    function getEmployementTypes() {
        ThrillAppBaseStaffLogic.getEmployementTypes().then(function (response) {
            $scope.typeOfEmploymentTypes = response;
        }, function (err) {
            appLogger.log(err);
            appLogger.error('ERR', err);
        });
    };
    getEmployementTypes();
    
    
    

    function getDesignationTypes() {
        ThrillAppBaseStaffLogic.getDesignationTypes().then(function (response) {
            $scope.designationTypes = response;
        }, function (err) {
            appLogger.log(err);
            appLogger.error('ERR', err);
        });
    };
    getDesignationTypes();

    function getSeconadryDepartmentTypes() {
        ThrillAppBaseStaffLogic.getSeconadryDepartmentTypes($localStorage.organizationKey).then(function (response) {
            $scope.secondaryDepartmentTypes = response;
        }, function (err) {
            appLogger.log(err);
            appLogger.error('ERR', err);
        });
    };
    getSeconadryDepartmentTypes();

    
    
    function getInterviewdByTypes() {
     if($stateParams.StaffKey!=undefined || $stateParams.StaffKey!=null)

{
     ThrillAppBaseStaffLogic.getInterviewdByTypesStaff($localStorage.organizationKey,$stateParams.StaffKey).then(function (response) {
            console.log(response);
            $scope.interviedByTypes = response;
        }, function (err) {
            appLogger.log(err);
            appLogger.error('ERR', err);
        });    
        
        }
        else
        {
         ThrillAppBaseStaffLogic.getInterviewdByTypes($localStorage.organizationKey).then(function (response) {
            console.log(response);
            $scope.interviedByTypes = response;
        }, function (err) {
            appLogger.log(err);
            appLogger.error('ERR', err);
        });
        
        }
        
    };
    getInterviewdByTypes();
    
    
    
    
    
    $scope.appointmentList = [{
        "appointmenttitle": "Direct Recruitment"
        , "appointmentkey": "0829a334-5e27-11e6-9186-41e6368e6666"
    }, {
        "appointmenttitle": "Promotions"
        , "appointmentkey": "0829a334-5e27-33e6-4444-41e6368e2437"
    }, {
        "appointmenttitle": "Transfer"
        , "appointmentkey": "0829a334-5e27-33e6-9186-41e6368e9999"
    }];
    $scope.gender = [{
        "Title": "Female"
        , "Id": 1
    }, {
        "Title": "Male"
        , "Id": 2
    }, {
        "Title": "Others"
        , "Id": 3
    }]

    function getContactItems(contactKey) {
        contactLogic.getAllContacts(contactKey).then(function (response) {
            console.log(JSON.stringify(response))
            $scope.contactList = response;
        }, function (err) {
            console.log(err);
        })
    }
});