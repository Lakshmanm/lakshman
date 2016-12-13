/*===========================================================================
 All rights reserved to Nunet Cube Software Solutions.
 THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
 OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
 LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
 FITNESS FOR A PARTICULAR PURPOSE.
============================================================================
****************************************************************************
 Name		    	: CNUserProfile.Controller
 Type               : Angular Js  
 Description        : containing attributes/properties and functions of UserProfile
 References         : https://angularjs.org/
 Author             : Thriveni Ylavarthi.
 Created Date       : 06-04-2016.
****************************************************************************                          
MODIFICATION LOG
**************************************************************************** 
Ver	Date	     Modified By			Description
1.	06-04-2016	 Thriveni Yalavarthi	Define controller logic for user profile 
2.  15-04-2016   Thriveni Yalavarthi    Added toaster functionality 
****************************************************************************                            
Code Review LOG
**************************************************************************** 
S.No      Ver        Date                Code Review By            Observations
1         1.0       17-April-2016         Sri Venkatesh.T           Remove "var currentFileName = "CNUserProfile";" code which is not requried.
****************************************************************************
*/


var currentFileName = "CNUserProfile";

var app = angular.module('ThrillCNN.CNUserProfile', ['ThrillCNN.CNUserProfileLogic',
                        'ThrillCnnWebClient.appConfig',
                        'ThrillFrameworkLibrary.appLogger',
                        'ThrillFrameworkLibrary.Network']);


/*Setup employee Controller */
app.controller('CNUserProfileController', 
    function ($scope, 
        $state, 
        $http, 
        profileLogic, 
        appConfig, 
        appLogger,
        toaster, 
        $localStorage) {
    var loggedInUserID = $localStorage.loggedInUserID;



    getLabels(appConfig.CULTURE_NAME);
    getMessages(appConfig.CULTURE_NAME);
    getUserProfileInfo();
    getMasterData();

    /*get labels with selected language*/
    function getLabels(cultureName) {

        var currentFileName = "CNUserProfile";
        $http.get("CalendarNotifications/Languages/" + currentFileName + "." + cultureName + ".json").then(function (response) {

            bindLabels(response.data);

        });
    }
    
    
     /*get alert labels*/
     function getMessages(cultureName) {
        var alertMessageName = "AlertMessages";

        $http.get("CalendarNotifications/Languages/" + alertMessageName + "." + cultureName + ".json").then(function (response) {
            $scope.alertMessageLabels = response.data.messages;
        });
    }
    
    /*bind labels with selected language */
    function bindLabels(data) {
        var lables = {
            FirstName: data.labels.FirstName,
            LastName: data.labels.LastName,
            DateOfBirth: data.labels.DateOfBirth,
            Gender: data.labels.Gender,
            Male: data.labels.Male,
            Female: data.labels.Female,
            Phone: data.labels.Phone,
            BloodGroup: data.labels.BloodGroup,
            Email: data.labels.Email,
            NewPassword: data.labels.NewPassword,
            ConfirmPassword: data.labels.ConfirmPassword,
            ProfileSettings: data.labels.ProfileSettings,
            Submit: data.labels.Submit,
            Cancel: data.labels.Cancel

        };

        $scope.profileLables = lables;
        //appLogger.log("profileLabels" + JSON.stringify($scope.profileLables))

    }

$scope.userProfile = {};
    /*Method for retrieving user profile details by user Id*/
    function getUserProfileInfo() {

        profileLogic.getUserProfileInfoById(loggedInUserID).then(function (response) {
            appLogger.log("user profile info " + JSON.stringify(response[0]));
            $scope.userProfile = {};
            $scope.userProfile.firstName = response[0].firstName;
            $scope.userProfile.lastName = response[0].lastName;
            $scope.userProfile.dateOfBirth = new Date(response[0].dateOfBirth);
            $scope.userProfile.gender = response[0].genderId;
            //$scope.userProfile.phone = response[0].ContactInfo;
            $scope.userProfile.bloodGroup = response[0].bloodGroupId;
            //$scope.userProfile.email = response[0].EmailID;
            //$scope.userProfile.oldpassword = response[0].Password;
        }, function (err) {
            console.error('ERR', err);


        });


    }

    /* Method for retrieving gender and bloodgroup master data */
    function getMasterData() {
        profileLogic.getMasterData().then(function (response) {
          //  console.log("Blood Group details"+JSON.stringify(response[0]));
            $scope.gender = response[0];
            $scope.bloodGroup = response[1];

            appLogger.log("" + JSON.stringify(response[1]));

        }, function (err) {
            console.error('ERR', err);


        });

    }

    /*Method for calling Bl updating user profile method*/
    $scope.userProfileUpdate = function (userProfileInfoObj) {

        if ($scope.userProfile.newPassword != $scope.userProfile.confirmPassword) {
            $scope.messageerror = " New Password and Confirm Password Mismatch";

        } else {
            if ($scope.userProfile.newPassword) {
                $scope.userProfile.oldpassword = $scope.userProfile.newPassword;
            }

            $scope.messageerror = "";
            $scope.userProfile.personID = loggedInUserID;

            //appLogger.log("Profile Update Data" + JSON.stringify(userProfileInfoObj));

            profileLogic.updateUserProfile(userProfileInfoObj).then(function (response) {

                console.log("profile update response" + JSON.stringify(response))

                if(response.data.message == "success"){
                    toaster.pop('success', "user profile details updated successfully", '', 5000, '');
                
                    $state.go('app.appointments');
                }else{
                    toaster.pop('error', "user profile details updated unsuccessfully", '', 5000, '');
                
                    $state.go('app.appointments');
                }
                

            }, function (err) {

                console.error('ERR', err);
                toaster.pop('error', "user profile details updated unsuccessfully", '', 5000, '');
                $state.go('app.appointments');
            });


        }

    };


    $scope.cancel = function () {
        $state.go('app.appointments');
    };

});