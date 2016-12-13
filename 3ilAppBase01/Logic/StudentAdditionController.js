'use strict';
var app = angular.module('Aarush.StudentAddition', ['ThrillAppBase.StudentAdditionLogic', 'ThrillContact.contactLogic', 'ThrillAppBase.thrillAppBasePersonLogic', 'ThrillContact.contactContactItemLogic', 'ThrillInstitute.instituteBoardLogic', 'ThrillInstitute.instituteGroupLogic', 'ThrillInstitute.instituteCoursLogic', 'ThrillAcademic.subjectLogic', 'ThrillInstitute.instituteBatchLogic', 'ThrillPerson.personReligionLogic', 'ThrillInstitute.instituteElectiveGroupLogic', 'ThrillInstitute.instituteLogic', 'security.registrationLogic', 'security.forgotPasswordLogic', 'ThrillPerson.personBasicInfoLogic']);
app.controller('Aarush.StudentAddition', function($scope, $rootScope, registrationLogic, forgotPasswordLogic, $filter, instituteBoardLogic, personReligionLogic, instituteCoursLogic, instituteBatchLogic, TempDataService, $state,instituteGroupLogic, subjectLogic,instituteElectiveGroupLogic, instituteLogic, $stateParams, $localStorage, ThrillAppBaseStudentLogic, personBasicInfoLogic, contactLogic, thrillAppBasePersonLogic, contactContactItemLogic, SweetAlert) {
    var OrganizationKey = "";
    var PersonKey = "";
    var folderKey = "";
    var fileKey = "";
    var EnrollmentPersonKey = "";
    $scope.saveshow = true;
    $scope.updateshow = false;
    $scope.check=true;
    //    $scope.StudentAdd.EmailId = 'test@example.com';
    //    $scope.emailFormat = /^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/;
    $scope.studentProfilePic = "3ilAppBase01/Web/assets/images/default-user.png";

$scope.inst=false;
function getPermissions() {
    var pageKey="42b32794792b48313cd1be9ca11b690d3e614683";
     thrillAppBasePersonLogic.getPagePermissions($localStorage.RoleID,pageKey).then(function (response) {
      console.log(JSON.stringify(response));
      // alert(JSON.stringify(response));
       
        if(response[0].AccessKey=="27ad330619a7bfbee351115b167c5a6593f2530a")
        {
            $scope.details=false; 
        }
        else{
            $scope.details=true; 
        }

    });
}
getPermissions();
    
    if($localStorage.RoleID==2)
        {
         $scope.updateshow=false;
            $scope.staffcancel=true;
            
        }
    // $scope.image_source = "3ilAppBase01/Web/assets/images/default-user.png";
    $scope.fileChange = function() {
            // alert('file change event');
            $scope.studentProfilePic = URL.createObjectURL(event.target.files[0]);
            $scope.$apply();
        }
        //var OrganizationKey = "d0a4cb70-58b3-11e6-92e8-2bb75054daa9";
    var OrganizationKey = $localStorage.organizationKey;
    $scope.StudentAdd = {};


$scope.getElectiveGroup=function()
{
    var Institutekey = $scope.StudentAdd.InstituteKey;  
    instituteElectiveGroupLogic.getElectiveGroupByInstituteKey(Institutekey).then(function (response) {
      $scope.electiveGroupList=response;
        
    });
}

    $scope.getBoards = function() {
        var Institutekey = $scope.StudentAdd.InstituteKey;
        instituteBoardLogic.getBoardByInstituteKey(Institutekey).then(function(response) {
            //console.log(JSON.stringify(response));
            $scope.boardCollection = response;
        });
    }
    
    $scope.maxDate = new Date();
    $scope.minDate = new Date('01-01-1916');

    $scope.getGroup = function() {
        var Institutekey = $scope.StudentAdd.InstituteKey;
        var boardKey = $scope.StudentAdd.BoardKey;
        instituteGroupLogic.getGroupByInstituteBoardKey(Institutekey, boardKey).then(function(response) {
            console.log(JSON.stringify(response));
            $scope.groupCollection = response;
        });
    }
    $scope.getGroup();
    $scope.getCourses = function() {
        var Institutekey = $scope.StudentAdd.InstituteKey;
        var groupKey = $scope.StudentAdd.GroupKey;
        instituteCoursLogic.getCourseByInstituteGroupKey(groupKey, Institutekey).then(function(response) {
            console.log(JSON.stringify(response));
            $scope.coursCollection = response;
        });
    }
    $scope.getCourses();
    $scope.getBatches = function() {
        var Institutekey = $scope.StudentAdd.InstituteKey;
        var courseKey = $scope.StudentAdd.CourseKey;
        instituteBatchLogic.getBatchByInstituteCourseKey(courseKey, Institutekey).then(function(response) {
            console.log(JSON.stringify(response));
            $scope.Sections = response;
        });
    }
    $scope.getBatches();
    $scope.studentTypes = function() {
        ThrillAppBaseStudentLogic.getstudentType().then(function(response) {
            //console.log(JSON.stringify(response));
            $scope.studentTypeCollection = response;
        });
    }
    $scope.studentTypes();
    $scope.eductionModes = function() {
        ThrillAppBaseStudentLogic.ModesofEducation().then(function(response) {
            //console.log(JSON.stringify(response));
            $scope.educationCollection = response;
        });
    }
    $scope.eductionModes();
    $scope.institutes = function() {
        instituteLogic.getAllInstitutes($localStorage.organizationKey).then(function(response) {
            //console.log(JSON.stringify(response));
            $scope.instituteList = response;
            if($localStorage.RoleID==3)
            {
$scope.inst=true;
$scope.StudentAdd.InstituteKey=$localStorage.LoginInstituteKey;
$scope.getBoards();
            }
        });
    }
    $scope.institutes();
    
    $scope.electiveSubject = function(electiveGroup) {
        var electiveGroupKey=electiveGroup;
        var instituteKey =$scope.StudentAdd.InstituteKey;
       ThrillAppBaseStudentLogic.getElectiveSubjectByInstituteKey(electiveGroupKey,instituteKey).then(function(response) {
            //console.log(JSON.stringify(response));
            $scope.SubjectList = response;
        });
    }

    //$scope.Sections = [{ "Title": "A Section", "Id": "1" }, { "Title": "B Section", "Id": "2" }, { "Title": "C Section", "Id": "3" }]
    $scope.gender = [{
        "Title": "Female",
        "Id": 1
    }, {
        "Title": "Male",
        "Id": 2
    }, {
        "Title": "Others",
        "Id": 3
    }]
    $scope.getLanguagesTypes = function() {
        ThrillAppBaseStudentLogic.getLanguagesTypes().then(function(response) {
            //console.log(JSON.stringify(response));
            $scope.languageTypes = response;
            $scope.StudentAdd.PrimaryLanguageId = 17;
        });
    };
    $scope.getLanguagesTypes();
    $scope.getBloodTypes = function() {
        ThrillAppBaseStudentLogic.getBloodTypes().then(function(response) {
            //console.log(JSON.stringify(response));
            $scope.bloodGroupTypes = response;
        });
    };
    $scope.getBloodTypes();
    $scope.getcasteTypes = function() {
        ThrillAppBaseStudentLogic.getCasteTypes().then(function(response) {
            // console.log(JSON.stringify(response));
            $scope.casteTypes = response;

            $scope.StudentAdd.SocialGroupId = 1;

        });
    };
    $scope.getcasteTypes();
    $scope.getNationalityTypes = function() {
        ThrillAppBaseStudentLogic.getNationalityTypes().then(function(response) {
            //console.log(JSON.stringify(response));
            $scope.nationalityTypes = response;
            $scope.StudentAdd.NationalityId = 5;
        });
    };
    $scope.getNationalityTypes();
    $scope.getReligionTypes = function() {
        personReligionLogic.getReligionTypes().then(function(response) {
            //console.log(JSON.stringify(response));
            $scope.religitionTypes = response;
            $scope.StudentAdd.ReligionId = 1;
        });
    }
    $scope.getReligionTypes();
    $scope.StudentAdd = {};
    $scope.getDetails = function() {
        var Institutekey = $scope.StudentAdd.InstituteKey;
        var EnrolmentNumber = $scope.StudentAdd.EnrolmentNumber;
        ThrillAppBaseStudentLogic.getdetailsByEnrollmentNumber(EnrolmentNumber, Institutekey).then(function(response) {
            $scope.StudentAdd.FirstName = response[0].FirstName;
            $scope.StudentAdd.MiddleName = response[0].MiddleName;
            $scope.StudentAdd.LastName = response[0].LastName;
            $scope.StudentAdd.DateOfBirth = new Date(response[0].DateOfBirth);
            $scope.StudentAdd.EmailId = response[0].EmailId;
            $scope.StudentAdd.GenderID = response[0].GenderID;
            $scope.StudentAdd.PrimaryMobileNumber = response[0].PrimaryMobileNumber;
            $scope.StudentAdd.BloodGroupID = response[0].BloodGroupID;
            $scope.StudentAdd.AadharNumber = response[0].AadharNumber;
            $scope.StudentAdd.PrimaryLanguageId = response[0].PrimaryLanguageId;
            $scope.StudentAdd.NationalityId = response[0].NationalityId;
            $scope.StudentAdd.ReligionId = response[0].ReligionId;
            $scope.StudentAdd.SocialGroupId = response[0].SocialGroupId;
            EnrollmentPersonKey = response[0].PersonKey;
            $scope.StudentAdd.IdentificationMarks = response[0].IdentificationMarks;
            if (response[0].n3DMSFileKey != null && response[0].n3DMSFileKey != undefined && response[0].n3DMSFileKey != "") {
                $scope.studentProfilePic = "3ilAppBase01/Web/assets/images/loading.gif";
                $scope.StudentAdd.FolderKey = response[0].FolderKey;
                $scope.StudentAdd.n3DMSFileKey = response[0].n3DMSFileKey;
                ThrillAppBaseStudentLogic.getProfilePicture($scope.StudentAdd.FolderKey, $scope.StudentAdd.n3DMSFileKey).then(function(pictureResponse) {
                    console.log(pictureResponse);
                    $scope.studentProfilePic = pictureResponse.FileBin
                })
            }

            console.log(JSON.stringify(response));
        });
    }

  
        
            $scope.deleteElective = function (StudentElectiveKey, StudentElectiveInfoKey) {
        SweetAlert.swal({
            title: "Are you sure?"
            , text: "Your want to delete this elective"
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
                    , text: "Your Elective has been deleted."
                    , type: "success"
                    , confirmButtonColor: "#007AFF"
                }, function () {
                   ThrillAppBaseStudentLogic.deleteElective(StudentElectiveKey,StudentElectiveInfoKey).then(function(response) {
                        getElectiveByKey(StudentElectiveKey);
                    })
                });
            }
            else {
                SweetAlert.swal({
                    title: "Cancelled"
                    , text: "Your Elective is safe :)"
                    , type: "error"
                    , confirmButtonColor: "#007AFF"
                });
            }
        });
        
    }
          
        

    
    function getElectiveByKey(StudentElectiveKey)
    {
         ThrillAppBaseStudentLogic.getElectiveByKey(StudentElectiveKey).then(function(response) {
                $scope.electivesList=response;
        });
    }
    
       getElectiveByKey($scope.StudentAdd.StudentElectiveKey);
    $scope.addElectives=function(electiveGroup)
    {
  if( $scope.StudentAdd.StudentElectiveKey != null ||  $scope.StudentAdd.StudentElectiveKey != undefined)
      {
          
             electiveGroup.StudentElectiveKey=$scope.StudentAdd.StudentElectiveKey;
            
         
             ThrillAppBaseStudentLogic.addElectiveInfo(electiveGroup).then(function(response) {   
        
                SweetAlert.swal({
                    title: "Electives",
                    text: "Saved successfully",
                    type: "success",
                    confirmButtonColor: "#007AFF"
                });
         
              //  $scope.elective.$setPristine();
              //  $scope.elective.$setUntouched();
                //  $state.go('addressList');
                 
                      $scope.electiveGroup = " ";
                 getElectiveByKey($scope.StudentAdd.StudentElectiveKey);
           
             
            }, function(err) {
                console.error('ERR', err);

            }); 
          
      }
        else
            {
     ThrillAppBaseStudentLogic.addElectives().then(function(response) {
         
         $scope.StudentAdd.StudentElectiveKey=response.StudentElectiveKey;
        
      electiveGroup.StudentElectiveKey=$scope.StudentAdd.StudentElectiveKey;
            
         
             ThrillAppBaseStudentLogic.addElectiveInfo(electiveGroup).then(function(response) {   
        
                SweetAlert.swal({
                    title: "Electives",
                    text: "Saved successfully",
                    type: "success",
                    confirmButtonColor: "#007AFF"
                });
          $scope.electiveGroup = "";
               
             //   $scope.elective.$setPristine();
             //   $scope.elective.$setUntouched();
                //  $state.go('addressList');
                 getElectiveByKey($scope.StudentAdd.StudentElectiveKey);
               
             })
            }, function(err) {
                console.error('ERR', err);

            }); 
        
    }
        
        
    }
    
    
    

    $scope.studentAddBasicInfo = function() {
        console.log($scope.StudentAdd.InstituteKey);
        if ($scope.StudentAdd.InstituteKey == "" || $scope.StudentAdd.InstituteKey == null || $scope.StudentAdd.InstituteKey == undefined) {
            $scope.StudentAdd.InstituteKey = OrganizationKey;
        }
        //   alert(EnrollmentPersonKey);
        if (EnrollmentPersonKey == "" || EnrollmentPersonKey == null || $scope.StudentAdd.InstituteKey == undefined) {
            console.log($scope.StudentAdd.InstituteKey);
            //alert(JSON.stringify( $scope.StudentAdd));
            var personDetails = {
                "FirstName": $scope.StudentAdd.FirstName,
                "MiddleName": $scope.StudentAdd.MiddleName,
                "LastName": $scope.StudentAdd.LastName,
                "DateOfBirth": $scope.StudentAdd.DateOfBirth,
                "GenderID": $scope.StudentAdd.GenderID,
                "BloodGroupID": $scope.StudentAdd.BloodGroupID,
                "IdentificationMarks": $scope.StudentAdd.IdentificationMarks,
                "AadharNumber": $scope.StudentAdd.AadharNumber,
                "PrimaryMobileNumber": $scope.StudentAdd.PrimaryMobileNumber,
                "EmailId": $scope.StudentAdd.EmailId,
                "ReligionId": $scope.StudentAdd.ReligionId,
                "NationalityId": $scope.StudentAdd.NationalityId,
                "SocialGroupId": $scope.StudentAdd.SocialGroupId,
                "PrimaryLanguageId": $scope.StudentAdd.PrimaryLanguageId
            };
            personBasicInfoLogic.addStudentPerson(personDetails).then(function(response) {
                console.log(response.data.ReferenceKey);
                $scope.StudentAdd.PersonKey = response.data.ReferenceKey;
                //$localStorage.StudentPersonKey= $scope.StudentAdd.PersonKey;
                var studentDetails = {
                    "PMSNo": $scope.StudentAdd.PMSNo,
                    "AdmissionNumber": $scope.StudentAdd.AdmissionNumber,
                    "AdmissionDate": $scope.StudentAdd.AdmissionDate,
                    "BoardKey": $scope.StudentAdd.BoardKey,
                    "GroupKey": $scope.StudentAdd.GroupKey,
                    "CourseKey": $scope.StudentAdd.CourseKey,
                    "BatchKey": $scope.StudentAdd.BatchKey,
                    "StudentTypeKey": $scope.StudentAdd.StudentTypeKey,
                    "EducationModeKey": $scope.StudentAdd.EducationModeKey,
                    "EnrolmentNumber": $scope.StudentAdd.EnrolmentNumber,
                    "PersonKey": $scope.StudentAdd.PersonKey,
                    "StudentNumber": $scope.StudentAdd.StudentNumber,
                    "ElectiveOne": $scope.StudentAdd.ElectiveOne,
                    "ElectiveTwo": $scope.StudentAdd.ElectiveTwo,
                    "StudentElectiveKey":$scope.StudentAdd.StudentElectiveKey,
                    "IsAvailableSpecialTraining": $scope.StudentAdd.IsAvailableSpecialTraining,
                    "InstanceOrganizationKey": OrganizationKey,
                    "IsActive": $scope.StudentAdd.IsActive,
                    "InstituteKey": $scope.StudentAdd.InstituteKey,
                    "profilePic": $scope.StudentAdd.profilePic,
                    "CreatedUserkey": "new-User-student",
                    "CreatedAppKey": "new-App-mCampuZ",
                    "IsAdmitted": 1
                };

                ThrillAppBaseStudentLogic.addStudent(studentDetails).then(function(response) {
                    var studentrefKey = response.data.StudentKey;
                    var StudentObject = {
                        "AdmissionNumber": $scope.StudentAdd.AdmissionNumber,
                        "EmailId": $scope.StudentAdd.EmailId
                    };
                    //Email
                    registrationLogic.studentMail(StudentObject).then(function(response) {
                        //Sms
                        var StudentsmsObject = {
                            "AdmissionNumber": $scope.StudentAdd.AdmissionNumber,
                            "PrimaryMobileNumber": $scope.StudentAdd.PrimaryMobileNumber
                        };
                        forgotPasswordLogic.studentSms(StudentsmsObject).then(function(response) {
                            SweetAlert.swal({
                                title: "Student",
                                text: "Saved successfully",
                                type: "success",
                                confirmButtonColor: "#007AFF"
                            }, function() {
                                ////$localStorage.newStudentPersonKey = studentDetails.PersonKey;
                                // alert(studentDetails.PersonKey);
                                /* $rootScope.$broadcast('Student', {
                                    'message'   : 'newStudent',
                                    'personKey' : studentDetails.PersonKey

                                  }); */
                                $state.go('app.studentlist');
                            });
                        });
                    });
                });
            });
        } else {

            $scope.StudentAdd.PersonKey = EnrollmentPersonKey;
            var personDetails = {
                "FirstName": $scope.StudentAdd.FirstName,
                "MiddleName": $scope.StudentAdd.MiddleName,
                "LastName": $scope.StudentAdd.LastName,
                "DateOfBirth": $scope.StudentAdd.DateOfBirth,
                "GenderID": $scope.StudentAdd.GenderID,
                "BloodGroupID": $scope.StudentAdd.BloodGroupID,
                "IdentificationMarks": $scope.StudentAdd.IdentificationMarks,
                "AadharNumber": $scope.StudentAdd.AadharNumber,
                "PrimaryMobileNumber": $scope.StudentAdd.PrimaryMobileNumber,
                "EmailId": $scope.StudentAdd.EmailId,
                
                "ReligionId": $scope.StudentAdd.ReligionId,
                "NationalityId": $scope.StudentAdd.NationalityId,
                "SocialGroupId": $scope.StudentAdd.SocialGroupId,
                "PrimaryLanguageId": $scope.StudentAdd.PrimaryLanguageId
            };
          
            personBasicInfoLogic.updateStudentPerson(personDetails, $scope.StudentAdd.PersonKey).then(function(response) {

                //$localStorage.StudentPersonKey= $scope.StudentAdd.PersonKey;
                var studentDetails = {
                    "PMSNo": $scope.StudentAdd.PMSNo,
                    "AdmissionNumber": $scope.StudentAdd.AdmissionNumber,
                    "AdmissionDate": $scope.StudentAdd.AdmissionDate,
                    "BoardKey": $scope.StudentAdd.BoardKey,
                    "GroupKey": $scope.StudentAdd.GroupKey,
                    "CourseKey": $scope.StudentAdd.CourseKey,
                    "BatchKey": $scope.StudentAdd.BatchKey,
                    "StudentTypeKey": $scope.StudentAdd.StudentTypeKey,
                    "EducationModeKey": $scope.StudentAdd.EducationModeKey,
                    "EnrolmentNumber": $scope.StudentAdd.EnrolmentNumber,
                    "PersonKey": $scope.StudentAdd.PersonKey,
                    "StudentNumber": $scope.StudentAdd.StudentNumber,
                    "ElectiveOne": $scope.StudentAdd.ElectiveOne,
                    "ElectiveTwo": $scope.StudentAdd.ElectiveTwo,
                    "StudentElectiveKey":$scope.StudentAdd.StudentElectiveKey,
                    "IsAvailableSpecialTraining": $scope.StudentAdd.IsAvailableSpecialTraining,
                    "InstanceOrganizationKey": OrganizationKey,
                    "IsActive": $scope.StudentAdd.IsActive,
                    "InstituteKey": $scope.StudentAdd.InstituteKey,
                    "profilePic": $scope.StudentAdd.profilePic,
                   "FolderKey": $scope.StudentAdd.FolderKey,
                    "n3DMSFileKey": $scope.StudentAdd.n3DMSFileKey,
                    "CreatedUserkey": "new-User-student",
                    "CreatedAppKey": "new-App-mCampuZ",
                    "IsAdmitted": 1
                };

                ThrillAppBaseStudentLogic.addStudent(studentDetails).then(function(response) {
                    var studentrefKey = response.data.StudentKey;
                    var StudentObject = {
                        "AdmissionNumber": $scope.StudentAdd.AdmissionNumber,
                        "EmailId": $scope.StudentAdd.EmailId
                    };
                    //Email
                    registrationLogic.studentMail(StudentObject).then(function(response) {
                        //Sms
                        var StudentsmsObject = {
                            "AdmissionNumber": $scope.StudentAdd.AdmissionNumber,
                            "PrimaryMobileNumber": $scope.StudentAdd.PrimaryMobileNumber
                        };
                        forgotPasswordLogic.studentSms(StudentsmsObject).then(function(response) {
                            SweetAlert.swal({
                                title: "Student",
                                text: "Saved successfully",
                                type: "success",
                                confirmButtonColor: "#007AFF"
                            }, function() {
                                ////$localStorage.newStudentPersonKey = studentDetails.PersonKey;
                                // alert(studentDetails.PersonKey);
                                /* $rootScope.$broadcast('Student', {
                                    'message'   : 'newStudent',
                                    'personKey' : studentDetails.PersonKey

                                  }); */
                                $state.go('app.studentlist');
                            });
                        });
                    });
                });
            });
        }
    };
    if ($stateParams.StudentKey) {
        ThrillAppBaseStudentLogic.getStudentByStudentKey($stateParams.StudentKey).then(function(response) {
            $scope.saveshow = false;
            if($localStorage.RoleID==2)
                {
               $scope.updateshow = false;      
                }
            $scope.updateshow = true;
            console.log(response);
            $scope.StudentAdd = {};
            $scope.StudentAdd.FirstName = response[0].FirstName;
            $scope.StudentAdd.MiddleName = response[0].MiddleName;
            $scope.StudentAdd.LastName = response[0].LastName;
            $scope.StudentAdd.DateOfBirth = new Date(response[0].DateOfBirth);
            $scope.StudentAdd.GenderID = response[0].GenderID;
            $scope.StudentAdd.BloodGroupID = response[0].BloodGroupID;
            $scope.StudentAdd.IdentificationMarks = response[0].IdentificationMarks;
            $scope.StudentAdd.AadharNumber = response[0].AadharNumber;
            $scope.StudentAdd.PrimaryMobileNumber = response[0].PrimaryMobileNumber;
            $scope.StudentAdd.EmailId = response[0].EmailId;
            $scope.StudentAdd.ReligionId = response[0].ReligionId;
            $scope.StudentAdd.NationalityId = response[0].NationalityId;
            $scope.StudentAdd.SocialGroupId = response[0].SocialGroupId;
            $scope.StudentAdd.PrimaryLanguageId = response[0].PrimaryLanguageId;
            $scope.StudentAdd.PMSNo = response[0].PMSNo;
            $scope.StudentAdd.AdmissionNumber = response[0].AdmissionNumber;
            $scope.StudentAdd.AdmissionDate = new Date(response[0].AdmissionDate);
            $scope.StudentAdd.InstituteKey = response[0].InstituteKey;
            $scope.getBoards($scope.StudentAdd.InstituteKey);
            $scope.StudentAdd.BoardKey = response[0].BoardKey;
            $scope.getGroup($scope.StudentAdd.BoardKey);
            $scope.StudentAdd.GroupKey = response[0].GroupKey;
            $scope.getCourses($scope.StudentAdd.GroupKey);
            $scope.StudentAdd.CourseKey = response[0].CourseKey;
            $scope.getBatches($scope.StudentAdd.CourseKey);
            $scope.StudentAdd.BatchKey = response[0].BatchKey;
            $scope.getElectiveGroup();
            $scope.StudentAdd.StudentTypeKey = response[0].StudentTypeKey;
            $scope.StudentAdd.StudentKey = response[0].StudentKey;
            $scope.StudentAdd.EducationModeKey = response[0].EducationModeKey;
            $scope.StudentAdd.EnrolmentNumber = response[0].EnrolmentNumber;
            $scope.StudentAdd.StudentNumber = response[0].StudentNumber;
            $scope.StudentAdd.PersonKey = response[0].PersonKey;
            $scope.StudentAdd.ElectiveOne = response[0].ElectiveOne;
            $scope.StudentAdd.ElectiveTwo = response[0].ElectiveTwo;
            $scope.StudentAdd.InstituteKey = response[0].InstituteKey;
            $scope.StudentAdd.StudentElectiveKey=response[0].studentElectiveKey;
            getElectiveByKey($scope.StudentAdd.StudentElectiveKey);
            OrganizationKey = response[0].InstanceOrganizationKey;
            //$scope.StudentAdd.IsAvailableSpecialTraining=response[0].IsAvailableSpecialTraining.data[0];
            $scope.StudentAdd.IsAvailableSpecialTraining = response[0].IsAvailableSpecialTraining.data[0] = 1 ? true : false;
            $scope.StudentAdd.IsActive = response[0].IsActive.data[0] = 1 ? true : false;
            $scope.check = response[0].IsActive.data[0] = 1 ? true : false;
            if (response[0].n3DMSFileKey != null && response[0].n3DMSFileKey != undefined && response[0].n3DMSFileKey != "") {
                $scope.studentProfilePic = "3ilAppBase01/Web/assets/images/loading.gif";
                $scope.StudentAdd.FolderKey = response[0].FolderKey;
                $scope.StudentAdd.n3DMSFileKey = response[0].n3DMSFileKey;
                ThrillAppBaseStudentLogic.getProfilePicture($scope.StudentAdd.FolderKey, $scope.StudentAdd.n3DMSFileKey).then(function(pictureResponse) {
                    $scope.studentProfilePic = pictureResponse.FileBin
                })
            }
        });
    }
    $scope.studentUpdateBasicInfo = function() {
        var personDetails = {
            "FirstName": $scope.StudentAdd.FirstName,
            "MiddleName": $scope.StudentAdd.MiddleName,
            "LastName": $scope.StudentAdd.LastName,
            "DateOfBirth": $scope.StudentAdd.DateOfBirth,
            "GenderID": $scope.StudentAdd.GenderID,
            "BloodGroupID": $scope.StudentAdd.BloodGroupID,
            "IdentificationMarks": $scope.StudentAdd.IdentificationMarks,
            "AadharNumber": $scope.StudentAdd.AadharNumber,
            "PrimaryMobileNumber": $scope.StudentAdd.PrimaryMobileNumber,
            "EmailId": $scope.StudentAdd.EmailId,
             
            "ReligionId": $scope.StudentAdd.ReligionId,
            "NationalityId": $scope.StudentAdd.NationalityId,
            "SocialGroupId": $scope.StudentAdd.SocialGroupId,
            "PrimaryLanguageId": $scope.StudentAdd.PrimaryLanguageId
        };
        personBasicInfoLogic.updateStudentPerson(personDetails, $scope.StudentAdd.PersonKey).then(function(response) {
            var studentDetails = {
                "PMSNo": $scope.StudentAdd.PMSNo,
                "AdmissionNumber": $scope.StudentAdd.AdmissionNumber,
                "AdmissionDate": $scope.StudentAdd.AdmissionDate,
                "BoardKey": $scope.StudentAdd.BoardKey,
                "GroupKey": $scope.StudentAdd.GroupKey,
                "CourseKey": $scope.StudentAdd.CourseKey,
                "BatchKey": $scope.StudentAdd.BatchKey,
                "StudentTypeKey": $scope.StudentAdd.StudentTypeKey,
                "EducationModeKey": $scope.StudentAdd.EducationModeKey,
                "EnrolmentNumber": $scope.StudentAdd.EnrolmentNumber,
                "PersonKey": $scope.StudentAdd.PersonKey,
                "StudentNumber": $scope.StudentAdd.StudentNumber,
                "StudentElectiveKey":$scope.StudentAdd.StudentElectiveKey,
                "IsAvailableSpecialTraining": $scope.StudentAdd.IsAvailableSpecialTraining,
                "InstanceOrganizationKey": OrganizationKey,
                "IsActive": $scope.StudentAdd.IsActive,
                "profilePic": $scope.StudentAdd.profilePic,
                "InstituteKey": $scope.StudentAdd.InstituteKey,
                "FolderKey": $scope.StudentAdd.FolderKey,
                "n3DMSFileKey": $scope.StudentAdd.n3DMSFileKey,
                "LastUpdatedUserkey": "update-User-student",
                "LastUpdatedAppKey": "update-App-mCampuZ"

            };
            ThrillAppBaseStudentLogic.updateStudent(studentDetails, $stateParams.StudentKey).then(function(response) {
                SweetAlert.swal({
                    title: "Student",
                    text: "Updated successfully",
                    type: "success",
                    confirmButtonColor: "#007AFF"
                }, function() {
                    $state.go('app.studentlist');
                });
            });
        });
    };
});

