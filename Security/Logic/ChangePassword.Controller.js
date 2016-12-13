/*=======================================================================
 All rights reserved to Thrill Innovations Lab.
 THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
 OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
 LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
 FITNESS FOR A PARTICULAR PURPOSE.
===========================================================================
****************************************************************************
 Name                : ChangePassword 
 Type                : Javascript and JQuery 
 Description         : This file contains controller methods
 References          :
 Author              : Rahul Buddha
 Created Date        :  13-April-2016
****************************************************************************
MODIFICATION LOG

**************************************************************************** 
Ver Date         Modified By            Description
****************************************************************************  
Code Review LOG
**************************************************************************** 
S.No      Ver        Date                Code Review By            Observations
1         1.0       14-April-2016         Sri Venkatesh.T           Remove "var currentFileName = "SecurityChangePassword";" code which is not requried.
2         1.0       14-April-2016         Sri Venkatesh.T           logger and $location controllers are not injected to but those are used in this module.
3         1.0       14-April-2016         Sri Venkatesh.T           for updatePassword function rename the "id" to menaingful name 
****************************************************************************
*/


var app = angular.module('security.changePasswordController', ['security.changePasswordLogic', 'ngCordova', 'ThrillFrameworkLibrary.geo', 'ThrillFrameworkLibrary.Network', 'ThrillCnnWebClient.appConfig', 'ThrillFrameworkLibrary.appLogger'

])
app.controller('ChangePasswordController', function($scope,
    $http,
    $state,
    $stateParams,
    appConfig,
    config,
    dataService,
    changePasswordLogic,
    registrationLogic,
    $location,
    $localStorage,
    $window,
    SweetAlert
) {

    if ($localStorage.contents == "" || $localStorage.contents == undefined) { $state.go('login.signin'); }

    window.onbeforeunload = function(event) {

        $window.localStorage.clear();

    }


    getLabels(appConfig.CULTURE_NAME);

    function getLabels(cultureName) {
        var currentFileName = "SecurityChangePassword";
        $http.get("Security/Languages/" + currentFileName + "." + cultureName + ".json").then(function(response) {
            bindLabels(response.data);

        });
    }
    /*bind labels with selected language */
    function bindLabels(data) {
        var labels = {
            changePassword: data.labels.ChangePassword,
            enterCurrentPassword: data.labels.EnterCurrentPassword,
            password: data.labels.Password,
            reEnterPassword: data.labels.ReEnterPassword,
            submit: data.labels.Submit
        };
        $scope.securityChangePassword = labels;
    }

    $scope.msg = false;
    /*update Password function call  */
    var updatePassword = function(key) {

        changePasswordLogic.updatePassword($scope.password, key).then(function(response) {

            SweetAlert.swal({
                title: "Done",
                text: "Your password has been changed successfully",
                type: "success",
                confirmButtonColor: "#007AFF"
            }, function() {
                $state.go('signin');
            });




        })

    };


    //Ouath Redirection Code////

    if ($localStorage.appkey != undefined) {

        return dataService.callAPI(config.API_URL + 'Security/users/' + $stateParams.personkey, [], 'GET').then(function(response) {
            var emailid = response.data[0].PrimaryEmailAddress;
            // alert(emailid);
            if (emailid == undefined || emailid == 'email') {
                $location.path('/updateemail/' + $stateParams.personkey);
            } else {
                return dataService.callAPI(config.CONTACT_API_URL + '/contactsinfo/' + $stateParams.personkey, [], 'GET').then(function(responsecontact) {
                    if (responsecontact.data.length > 0) {

                        redirectapp();
                    } else {
                        var postData = {};
                        postData.ContactSubTypeID = 3;
                        postData.ContactInfo = emailid;
                        postData.EntityTypeID = 1;
                        postData.EntityReferenceKey = $stateParams.personkey;

                        registrationLogic.postContact(postData).then(function(response) {
                            redirectapp();
                        });
                    }

                });



            }


        });






    }
    ///////////////////////////////
    function redirectapp() {
        var mainInfo = $http.get('Security/Json/document.json').success(function(resp) {

            var appKey = $localStorage.appkey;
            switch (appKey) {
                case "123456dmsKey":
                    $window.location.href = resp.AppDetails[0].Redirecturl + $stateParams.personkey;
                    break;
                case "123457orgKey":
                    $window.location.href = resp.AppDetails[1].Redirecturl + $stateParams.personkey;
                    break;
                case "123458calKey":
                    $window.location.href = resp.AppDetails[2].Redirecturl + $stateParams.personkey;
                    break;
                case "123459perKey":
                    $window.location.href = resp.AppDetails[3].Redirecturl + $stateParams.personkey;
                    break;
                case "123460surKey":
                    $window.location.href = resp.AppDetails[4].Redirecturl + $stateParams.personkey;
                    break;

                default:
                    $location.path('/dashboard/user/' + response[0].UserID);
                    break;
            }

        });
    }

    $scope.changePasswordAction = function() {

        $location.path('/changePassword/' + $stateParams.ID);
    }


    $scope.passwordSubmit = function() {

        changePasswordLogic.getPassword($localStorage.ReferenceKey).then(function(response) {

            if ($scope.password.current == response.data) {
                updatePassword($localStorage.ReferenceKey);
            } else {

                SweetAlert.swal({
                    title: "InValid",
                    text: "Your Current Password is incorrect",
                    type: "error",
                    confirmButtonColor: "#007AFF"
                });

                // $scope.msg = true;
                $scope.password = "";

            }
        })
    };


});