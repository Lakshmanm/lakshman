var app = angular.module('ThrillAppBase.organization', ['ThrillAppBase.appBaseOrganizationLogic','Mcampuz.RolesLogic', 'ngCordova', 'ThrillFrameworkLibrary.geo', 'ThrillFrameworkLibrary.Network', 'ThrillCnnWebClient.appConfig', 'ThrillFrameworkLibrary.appLogger']);
/*Setup contact Controller */
app.controller('OrganizationController', function($scope, $localStorage, $http,RolesLogic, appBaseOrganizationLogic, $state, $stateParams, appConfig, Password, appLogger, toaster, SweetAlert) {


    /// Strength


    $scope.$watch('organization.security.password', function(pass) {

        $scope.passwordStrength = Password.getStrength(pass);

        if ($scope.isPasswordWeak()) {

            $scope.MYForm.password.$setValidity('strength', false);

        } else {

            $scope.MYForm.password.$setValidity('strength', true);
        }
    });
    $scope.showMessage=false;
    $scope.isPasswordWeak = function() {

        return $scope.passwordStrength < 40;
    }

    $scope.isPasswordOk = function() {

        return $scope.passwordStrength >= 40 && $scope.passwordStrength <= 70;
    }

    $scope.isPasswordStrong = function() {

        return $scope.passwordStrength > 70;
    }

    $scope.isInputValid = function(input) {

        return $scope.MYForm.password.$dirty && $scope.MYForm.password.$valid;
    }

    $scope.isInputInvalid = function(input) {
        return $scope.MYForm.password.$dirty && $scope.MYForm.password.$invalid;
    }

    appBaseOrganizationLogic.getOrganizationTypes().then(function(response) {

        appLogger.log(JSON.stringify(response));
        $scope.organizationTypes = response;
    })

 
    $scope.conformPassword=function(){
    if($scope.organization.security.password==$scope.organization.security.confirmPassword)
{

    $scope.showMessage=false;
}
else
{
     $scope.showMessage=true;
}

}
    
    $scope.Register = function() {
        $scope.showMessage=false;
        appBaseOrganizationLogic.addAppBaseOrganization($scope.organization).then(function(response) {
//alert($localStorage.orgAdminKey);
            var loginObject = {
                      "RoleID":"1",
                        "PersonReferencekey":$localStorage.orgAdminKey
                        ,"InstituteKey": null
                        , "InstanceOrganizationKey":$localStorage.registeredOrganizationKey
                        ,"IsPrimaryRole":1
                    };
                    //alert(JSON.stringify(loginObject));
RolesLogic.addlogindetails(loginObject).then(function (response) {
            //alert('thanks for registering check your email');
            // toaster.pop('success', 'organization', 'Thank you for registering check your email');


            $scope.addDepartment($localStorage.registeredOrganizationKey);
            $scope.addLeaveReason($localStorage.registeredOrganizationKey);
            $scope.addLeaveRequestMode($localStorage.registeredOrganizationKey);
            $scope.addLeaveRequestRecieveBy($localStorage.registeredOrganizationKey);
            $scope.leaveTypes($localStorage.registeredOrganizationKey);


                   /*var loginObject = {
                      "RoleID":$scope.organization.RoleID,
                        "PersonReferencekey":ReferenceKey
                        ,"InstituteKey": "orgAdminInstituteKey"
                        , "InstanceOrganizationKey":$localStorage.organizationKey
                    };
*/
          /*   RolesLogic.addlogindetails(loginObject).then(function (response) {*/
            //  $scope.addAttendanceStatus(organizationKey);
            SweetAlert.swal({
                title: "Organization",
                text: "Thank you for registering check your email",
                type: "success",
                confirmButtonColor: "#007AFF"
            }, function() {
                $scope.organization = {};
                $state.go('organizationList');
            });


/*});*/
});

        });

    }



    $scope.addAttendanceStatus = function(organizationKey) {

        var addAttendanceStatus = [{
            "attendancestatukey": "1234567898a8ede0-5012-11e6-ada8-sdfsdf35ff",
            "attendancestatustitle": "Present",
            "instanceorganizationkey": organizationKey
        }, {
            "attendancestatukey": "fe366dc0-4e57-11e6-bb5e-4d978092b727",
            "attendancestatustitle": "Absent",
            "instanceorganizationkey": organizationKey
        }, {
            "attendancestatukey": "3970a130-4e58-11e6-bb5e-4d978092b727",
            "attendancestatustitle": "None",
            "instanceorganizationkey": organizationKey
        }, {
            "attendancestatukey": "24324a130-4e58-11e6-bb5e-4d978092b727",
            "attendancestatustitle": "Leave",
            "instanceorganizationkey": organizationKey
        }]
        appBaseOrganizationLogic.addAttendanceStatus(addAttendanceStatus).then(function(response) {


        });
    };



    $scope.addDepartment = function(organizationKey) {
        var addDepartment = [{
            "departmentName": "Maths",
            "instanceorganizationkey": organizationKey
        }, {
            "departmentName": "Hindi",
            "instanceorganizationkey": organizationKey
        }, {
            "departmentName": "English",
            "instanceorganizationkey": organizationKey
        }, {
            "departmentName": "Admin",
            "instanceorganizationkey": organizationKey
        }, {
            "departmentName": "Finance",
            "instanceorganizationkey": organizationKey
        }, {
            "departmentName": "HR",
            "instanceorganizationkey": organizationKey
        }]
        appBaseOrganizationLogic.addDepartment(addDepartment).then(function(response) {


        });
    };





    $scope.addLeaveRequestMode = function(organizationKey) {
        var addleaveRequestModeObject = [{

            "studentleaverequestmodetitle": "Leave Letter",
            "instanceorganizationkey": organizationKey
        }, {

            "studentleaverequestmodetitle": "Leave Letter via Email",
            "instanceorganizationkey": organizationKey
        }, {

            "studentleaverequestmodetitle": "Leave Letter via SMS",
            "instanceorganizationkey": organizationKey
        }, {

            "studentleaverequestmodetitle": "Leave Letter via WhatsApp or another IM",
            "instanceorganizationkey": organizationKey
        }, {

            "studentleaverequestmodetitle": "Phone",
            "instanceorganizationkey": organizationKey
        }, {

            "studentleaverequestmodetitle": "Update from Student",
            "instanceorganizationkey": organizationKey
        }, {

            "studentleaverequestmodetitle": "Update from Staff",
            "instanceorganizationkey": organizationKey
        }]
        appBaseOrganizationLogic.addleaveRequestModess(addleaveRequestModeObject).then(function(response) {


        });
    };




    $scope.addLeaveReason = function(organizationKey) {
        var leaveReason = [{
            "studentleavereasontitle": "Sick",
            "instanceorganizationkey": organizationKey
        }, {
            "studentleavereasontitle": "Family Vacation",
            "instanceorganizationkey": organizationKey
        }, {
            "studentleavereasontitle": "Family Function",
            "instanceorganizationkey": organizationKey
        }, {
            "studentleavereasontitle": "Death in Family",
            "instanceorganizationkey": organizationKey
        }, {
            "studentleavereasontitle": "Medical Emergency in Family",
            "instanceorganizationkey": organizationKey
        }, {
            "studentleavereasontitle": "Other",
            "instanceorganizationkey": organizationKey
        }]

        appBaseOrganizationLogic.addLeaveReason(leaveReason).then(function(response) {


        });
    };




    $scope.addLeaveRequestRecieveBy = function(organizationKey) {
        var recieveBy = [{

            "studentleaverequestreceivedbytitle": "Class Teacher",
            "instanceorganizationkey": organizationKey
        }, {

            "studentleaverequestreceivedbytitle": "Subject Teacher",
            "instanceorganizationkey": organizationKey
        }, {

            "studentleaverequestreceivedbytitle": "Administrative Staff",
            "instanceorganizationkey": organizationKey
        }]

        appBaseOrganizationLogic.addLeaveRequestRecieveBy(recieveBy).then(function(response) {


        });
    };

    $scope.leaveTypes = function(organizationKey) {
        var leaveTypesObject = [{

            "leaveTypeTitle": "Sick Leave",
            "instanceOrganizationKey": organizationKey
        }, {

            "leaveTypeTitle": "Casual Leave",
            "instanceOrganizationKey": organizationKey
        }, {

            "leaveTypeTitle": "Special Leave",
            "instanceOrganizationKey": organizationKey
        }, {

            "leaveTypeTitle": "Maternity Leave",
            "instanceOrganizationKey": organizationKey
        }, {

            "leaveTypeTitle": "Education Leave",
            "instanceOrganizationKey": organizationKey
        }]

        appBaseOrganizationLogic.leaveTypes(leaveTypesObject).then(function(response) {


        });
    };



});