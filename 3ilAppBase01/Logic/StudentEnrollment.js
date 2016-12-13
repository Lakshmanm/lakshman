'use strict';
var app = angular.module('Aarush.StudentEnrollment', ['ThrillAppBase.StudentAdditionLogic',
    'ThrillContact.contactLogic',

    'ThrillAppBase.thrillAppBasePersonLogic',
    'ThrillContact.contactContactItemLogic',
    'ThrillInstitute.instituteBoardLogic',
    'ThrillInstitute.instituteGroupLogic',
    'ThrillInstitute.instituteCoursLogic',
    'ThrillAcademic.subjectLogic',
    'ThrillInstitute.instituteBatchLogic',
    'ThrillPerson.personReligionLogic',
    'ThrillInstitute.instituteLogic',
    'security.registrationLogic',
    'ThrillPerson.personBasicInfoLogic'
]);
app.controller('Aarush.StudentEnrollment', function($scope, $rootScope, registrationLogic, $filter, instituteBoardLogic, instituteGroupLogic, personReligionLogic, instituteCoursLogic, instituteBatchLogic, TempDataService, $state, subjectLogic, instituteLogic, $stateParams, $localStorage, ThrillAppBaseStudentLogic, personBasicInfoLogic, contactLogic, thrillAppBasePersonLogic, contactContactItemLogic, SweetAlert) {

              $scope.module={};
     $scope.module.basicInfo ={flag :true,isFirstOpen:true}
     $scope.module.studentInfo ={flag :true,isFirstOpen:true}
if($stateParams.EnrollmentKey)
{
$scope.openothers=true;

}
 /*$scope.basicdetails=false;
  $scope.startdetails=true;*/
     //alert(1222);
    var OrganizationKey = "";
    var PersonKey = "";
    var folderKey = "";
    var fileKey = "";

    $scope.StudentAdd = {};

    $scope.saveshow = true;
    $scope.updateshow = false;
$scope.basicdetails=false;

    $scope.give = true;
    $scope.hide = false;

    $scope.EnrollmentDigit = {};
    var digit = Math.floor((Math.random() * 10000000) + 1);

    //alert(digit);
    $scope.StudentAdd.EnrolmentNumber = digit;
   //alert($scope.StudentAdd.EnrolmentNumber);



    $scope.complete = function() {
        $scope.give = false;
        $scope.hide = true;
    };



    $scope.next = function() {
           
     $scope.basicdetails=true;
    };

    $scope.StudentAdd.NationalityId = 5;
    $scope.StudentAdd.ReligionId = 1;
    $scope.StudentAdd.SocialGroupId = 1;
    $scope.StudentAdd.PrimaryLanguageId = 17;


    $scope.studentProfilePic = "3ilAppBase01/Web/assets/images/default-user.png";
    // $scope.image_source = "3ilAppBase01/Web/assets/images/default-user.png";
    $scope.fileChange = function() {
        // alert('file change event');
        $scope.studentProfilePic = URL.createObjectURL(event.target.files[0]);
        $scope.$apply();
    }

    //var OrganizationKey = "d0a4cb70-58b3-11e6-92e8-2bb75054daa9";

    var OrganizationKey = $localStorage.organizationKey;

    $scope.maxdate = new Date();


    $scope.institutes = function() {

        instituteLogic.getAllInstitutes($localStorage.organizationKey).then(function(response) {
            //console.log(JSON.stringify(response));
            $scope.instituteList = response;
        });
    }

    $scope.institutes();


    $scope.gender = [{ "Title": "Female", "Id": 1 }, { "Title": "Male", "Id": 2 }, { "Title": "Others", "Id": 3 }]


    $scope.getLanguagesTypes = function() {

        ThrillAppBaseStudentLogic.getLanguagesTypes().then(function(response) {
            //console.log(JSON.stringify(response));
            $scope.languageTypes = response;

        });

    };

    $scope.getLanguagesTypes();



    $scope.getcasteTypes = function() {

        ThrillAppBaseStudentLogic.getCasteTypes().then(function(response) {
            // console.log(JSON.stringify(response));
            $scope.casteTypes = response;

        });

    };

    $scope.getcasteTypes();

    $scope.getNationalityTypes = function() {


        ThrillAppBaseStudentLogic.getNationalityTypes().then(function(response) {
            //console.log(JSON.stringify(response));
            $scope.nationalityTypes = response;


        });

    };

    $scope.getNationalityTypes();

    $scope.getBloodTypes = function() {
        ThrillAppBaseStudentLogic.getBloodTypes().then(function(response) {
            //console.log(JSON.stringify(response));
            $scope.bloodGroupTypes = response;
        });
    };

    $scope.getBloodTypes();

    $scope.getReligionTypes = function() {
        personReligionLogic.getReligionTypes().then(function(response) {
            //console.log(JSON.stringify(response));
            $scope.religitionTypes = response;
        });
    }
    $scope.getReligionTypes();


    $scope.studentAddBasicInfo = function() {
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
        //alert(JSON.stringify(personDetails));
        personBasicInfoLogic.addStudentPerson(personDetails).then(function(response) {
            $scope.StudentAdd.PersonKey = response.data.ReferenceKey;
            $localStorage.EnrpersonKey = $scope.StudentAdd.PersonKey;


            var studentDetails = {
                    "InstanceOrganizationKey": OrganizationKey,
                    "EnrolmentNumber": $scope.StudentAdd.EnrolmentNumber,
                    "PersonKey": $scope.StudentAdd.PersonKey,
                    "InstituteKey": $scope.StudentAdd.InstituteKey,
                    "profilePic": $scope.StudentAdd.profilePic,
                    "CreatedUserkey": "new-User-student",
                    "CreatedAppKey": "new-App-mCampuZ",
                    "IsAdmitted": 0



                }
                //alert(studentDetails.EnrolmentNumber);
            ThrillAppBaseStudentLogic.addStudent(studentDetails).then(function(response) {

                var EnrollmentKey = response.data.StudentKey;
                SweetAlert.swal({
                    title: "Enrollment Basic Information",
                    text: "Saved successfully",
                    type: "success",
                    confirmButtonColor: "#007AFF"
                });
           $scope.module.basicInfo ={flag :true,isFirstOpen:false}
     $scope.module.ebasic ={flag :true,ebasic:true}
                // $state.go('app.enrollmentNumber');
                $state.go('app.editenrolmentBasicInfo/EnrollmentKey/:EnrollmentKey/PersonKey/:PersonKey', { "EnrollmentKey": EnrollmentKey, "PersonKey": studentDetails.PersonKey });

            });
        });
    };

    if ($stateParams.EnrollmentKey) {

        ThrillAppBaseStudentLogic.getStudentEnrollmentByStudentKey($stateParams.EnrollmentKey).then(function(response) {
            // alert(JSON.stringify(response));
            $scope.saveshow = false;
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
            $scope.StudentAdd.PrimaryMobileNumber = parseInt(response[0].PrimaryMobileNumber);
            $scope.StudentAdd.EmailId = response[0].EmailId;
            $scope.StudentAdd.ReligionId = response[0].ReligionId;
            $scope.StudentAdd.NationalityId = response[0].NationalityId;
            $scope.StudentAdd.SocialGroupId = response[0].SocialGroupId;
            $scope.StudentAdd.PrimaryLanguageId = response[0].PrimaryLanguageId;
            //$scope.StudentAdd.PMSNo=response[0].PMSNo;
            //$scope.StudentAdd.AdmissionNumber=response[0].AdmissionNumber;
            //$scope.StudentAdd.AdmissionDate=new Date(response[0].AdmissionDate);
            $scope.StudentAdd.InstituteKey = response[0].InstituteKey;
            //$scope.getBoards($scope.StudentAdd.InstituteKey);
            //$scope.StudentAdd.BoardKey=response[0].BoardKey;
            //$scope.getGroup($scope.StudentAdd.BoardKey);


            //$scope.StudentAdd.GroupKey=response[0].GroupKey;
            //$scope.getCourses($scope.StudentAdd.GroupKey);
            //$scope.StudentAdd.CourseKey=response[0].CourseKey;
            //$scope.getBatches($scope.StudentAdd.CourseKey);
            //$scope.StudentAdd.BatchKey=response[0].BatchKey;
            //$scope.StudentAdd.StudentTypeKey=response[0].StudentTypeKey;
            $scope.StudentAdd.StudentKey = response[0].StudentKey;
            //$scope.StudentAdd.EducationModeKey=response[0].EducationModeKey;
            //$scope.StudentAdd.EnrolmentNumber=response[0].EnrolmentNumber;
            //$scope.StudentAdd.StudentNumber=response[0].StudentNumber;
            $scope.StudentAdd.PersonKey = response[0].PersonKey;
            //$scope.StudentAdd.ElectiveOne=response[0].ElectiveOne;
            //$scope.StudentAdd.ElectiveTwo=response[0].ElectiveTwo;
            //$scope.StudentAdd.InstituteKey=response[0].InstituteKey;
            OrganizationKey = response[0].InstanceOrganizationKey;
            //$scope.StudentAdd.IsAvailableSpecialTraining=response[0].IsAvailableSpecialTraining.data[0];

            //$scope.StudentAdd.IsAvailableSpecialTraining=response[0].IsAvailableSpecialTraining.data[0]=1?true:false;
            //$scope.StudentAdd.IsActive=response[0].IsActive.data[0]=1?true:false;

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

            var studentDetails = { //"PMSNo":$scope.StudentAdd.PMSNo,
                //"AdmissionNumber":$scope.StudentAdd.AdmissionNumber,
                //"AdmissionDate":$scope.StudentAdd.AdmissionDate,
                // "BoardKey":$scope.StudentAdd.BoardKey,
                //"GroupKey":$scope.StudentAdd.GroupKey,
                //"CourseKey":$scope.StudentAdd.CourseKey,
                // "BatchKey":$scope.StudentAdd.BatchKey,
                // "StudentTypeKey":$scope.StudentAdd.StudentTypeKey,
                // "EducationModeKey":$scope.StudentAdd.EducationModeKey,
                // "EnrolmentNumber":$scope.StudentAdd.EnrolmentNumber,
                "PersonKey": $scope.StudentAdd.PersonKey,
                // "StudentNumber":$scope.StudentAdd.StudentNumber,
                //  "ElectiveOne":$scope.StudentAdd.ElectiveOne,
                //  "ElectiveTwo":$scope.StudentAdd.ElectiveTwo,
                //"IsAvailableSpecialTraining":$scope.StudentAdd.IsAvailableSpecialTraining,
                "InstanceOrganizationKey": OrganizationKey,
                // "IsActive":$scope.StudentAdd.IsActive,
                "profilePic": $scope.StudentAdd.profilePic,
                "InstituteKey": $scope.StudentAdd.InstituteKey,
                "FolderKey": $scope.StudentAdd.FolderKey,
                "n3DMSFileKey": $scope.StudentAdd.n3DMSFileKey,
                "LastUpdatedUserkey": "update-User-student",
                "LastUpdatedAppKey": "update-App-mCampuZ"

            };

            ThrillAppBaseStudentLogic.updateStudent(studentDetails, $stateParams.EnrollmentKey).then(function(response) {
                
                $localStorage.EnrpersonKey = $scope.StudentAdd.PersonKey;
                SweetAlert.swal({
                    title: "Enrollment BasicInfo",
                    text: "Updated successfully",
                    type: "success",
                    confirmButtonColor: "#007AFF"
                }, function() {
                    $state.go('app.editenrolmentBasicInfo/EnrollmentKey/:EnrollmentKey/PersonKey/:PersonKey', { "EnrollmentKey": $stateParams.EnrollmentKey, "PersonKey": $stateParams.PersonKey });
             
                });

            });

        });

    };






































    // $scope.studentAddBasicInfo = function() {
    //     //alert(JSON.stringify( $scope.StudentAdd));
    //     var personDetails = {
    //         "FirstName": $scope.StudentAdd.FirstName,
    //         "MiddleName": $scope.StudentAdd.MiddleName,
    //         "LastName": $scope.StudentAdd.LastName,
    //         "DateOfBirth": $scope.StudentAdd.DateOfBirth,
    //         "GenderID": $scope.StudentAdd.GenderID,
    //         "BloodGroupID": $scope.StudentAdd.BloodGroupID,
    //         "IdentificationMarks": $scope.StudentAdd.IdentificationMarks,
    //         "AadharNumber": $scope.StudentAdd.AadharNumber,
    //         "PrimaryMobileNumber": $scope.StudentAdd.PrimaryMobileNumber,
    //         "EmailId": $scope.StudentAdd.EmailId,
    //         "ReligionId": $scope.StudentAdd.ReligionId,
    //         "NationalityId": $scope.StudentAdd.NationalityId,
    //         "SocialGroupId": $scope.StudentAdd.SocialGroupId,
    //         "PrimaryLanguageId": $scope.StudentAdd.PrimaryLanguageId

    //     };
    //     personBasicInfoLogic.addStudentPerson(personDetails).then(function(response) {






    //         console.log(response.data.ReferenceKey);
    //         $scope.StudentAdd.PersonKey = response.data.ReferenceKey;
    //         //$localStorage.StudentPersonKey= $scope.StudentAdd.PersonKey;
    //         var studentDetails = {
    //             "PMSNo": $scope.StudentAdd.PMSNo,
    //             "AdmissionNumber": $scope.StudentAdd.AdmissionNumber,
    //             "AdmissionDate": $scope.StudentAdd.AdmissionDate,
    //             "BoardKey": $scope.StudentAdd.BoardKey,
    //             "GroupKey": $scope.StudentAdd.GroupKey,
    //             "CourseKey": $scope.StudentAdd.CourseKey,
    //             "BatchKey": $scope.StudentAdd.BatchKey,
    //             "StudentTypeKey": $scope.StudentAdd.StudentTypeKey,
    //             "EducationModeKey": $scope.StudentAdd.EducationModeKey,
    //             "EnrolmentNumber": $scope.StudentAdd.EnrolmentNumber,
    //             "PersonKey": $scope.StudentAdd.PersonKey,
    //             "StudentNumber": $scope.StudentAdd.StudentNumber,
    //             "ElectiveOne": $scope.StudentAdd.ElectiveOne,
    //             "ElectiveTwo": $scope.StudentAdd.ElectiveTwo,
    //             "IsAvailableSpecialTraining": $scope.StudentAdd.IsAvailableSpecialTraining,
    //             "InstanceOrganizationKey": OrganizationKey,
    //             "IsActive": $scope.StudentAdd.IsActive,
    //             "InstituteKey": $scope.StudentAdd.InstituteKey,
    //             "profilePic": $scope.StudentAdd.profilePic,
    //             "CreatedUserkey": "new-User-student",
    //             "CreatedAppKey": "new-App-mCampuZ"

    //         };
    //         ThrillAppBaseStudentLogic.addStudent(studentDetails).then(function(response) {
    //             var studentrefKey = response.data.StudentKey;

    //             var StudentObject = {
    //                 "AdmissionNumber": $scope.StudentAdd.AdmissionNumber,
    //                 "EmailId": $scope.StudentAdd.EmailId

    //             };

    //             console.log(StudentObject);
    //             //registrationLogic.studentMail(StudentObject).then(function (response) {
    //             console.log(JSON.stringify(response));

    //             SweetAlert.swal({
    //                 title: "Student",
    //                 text: "Saved successfully",
    //                 type: "success",
    //                 confirmButtonColor: "#007AFF"
    //             }, function() {

    //                 ////$localStorage.newStudentPersonKey = studentDetails.PersonKey;

    //                 // alert(studentDetails.PersonKey);

    //                 /* $rootScope.$broadcast('Student', {
    //                     'message'   : 'newStudent',
    //                     'personKey' : studentDetails.PersonKey

    //                   }); */

    //                 // $state.go('app.student/StudentKey/:StudentKey/PersonKey/:PersonKey',{StudentKey:studentrefKey,PersonKey:studentDetails.PersonKey});
    //                 $state.go('app.enrollmentNumber');
    //             });

    //             // });

    //         });

    //     });

    // };









});