/*=======================================================================
  All rights reserved to Thrill Innovations Lab.
 THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
 OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
 LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
 FITNESS FOR A PARTICULAR PURPOSE.
===========================================================================
****************************************************************************
 Name                : Login
 Type                : Javascript and JQuery 
 Description         : This file contains controller methods
 References          :
 Author              :  Rahul Buddha
 Created Date        :  15-April-2016
****************************************************************************
MODIFICATION LOG
**************************************************************************** 
Ver Date         Modified By            Description

****************************************************************************  
Code Review LOG
**************************************************************************** 
S.No      Ver        Date                Code Review By            Observations
1         1.0       14-April-2016         Sri Venkatesh.T           Remove "var currentFileName = "SecurityLogin";" code which is not requried.
2         1.0       14-April-2016         Sri Venkatesh.T           Rename "$scope.Login" function with "$scope.login" function name should be camel casing
3         1.0       14-April-2016         Sri Venkatesh.T           In page header please mention full name of the author.
****************************************************************************
*/
var app = angular.module('security.loginController', ['security.loginLogic'
    , 'ngCordova'
    , 'ThrillFrameworkLibrary.geo'
    , 'ThrillFrameworkLibrary.Network'
    , 'ThrillAppBase.thrillAppBasePersonLogic'
    , 'ThrillOrganization.organizationLogic'
    , 'ThrillCnnWebClient.appConfig'
    , 'ThrillFrameworkLibrary.appLogger'
     , 'Mcampuz.profilesettngLogic'
    , 'ngStorage'
]);
app.controller('LoginController', function ($scope, $http, $state, $stateParams, appConfig, appLogger, thrillAppBasePersonLogic, profilesettngLogic, organizationLogic, loginLogic, $location, $window, $localStorage, $q) {
    getLabels(appConfig.CULTURE_NAME);
    getCoockieValues();

    function getLabels(cultureName) {
        var currentFileName = "SecurityLogin";
        $http.get("Security/Languages/" + currentFileName + "." + cultureName + ".json").then(function (response) {
            bindLabels(response.data);
        });
    }
 //$scope.showMessage=false;
    function getCoockieValues() {
        $scope.Text = {};
        var testObj = {};
        var username = getCookie("username");
        var password = getCookie("Password");
        var active = getCookie("isActive");
        var decodedUser = "";
        var decodePwd = "";
        var decodeActive = "";
        var nRoleID;
        // if (document.cookie.username != null) {
        loginLogic.decodeData(testObj, username).then(function (resp) {
            decodedUser = resp.data;
            loginLogic.decodeData(testObj, password).then(function (resp) {
                decodePwd = resp.data;
                loginLogic.decodeData(testObj, active).then(function (resp) {
                    decodeActive = resp.data;
                    if (decodeActive == "true") {
                        $scope.Text.EmailID = decodedUser;
                        $scope.Text.password = decodePwd;
                        $scope.Text.IsActive = true;
                    }
                    else {
                        deleteCookie("username");
                        deleteCookie("Password");
                        deleteCookie("isActive");
                    }
                });
            });
        });
    }

    function deleteCookie(c_name) {
        document.cookie = encodeURIComponent(c_name) + "=deleted; expires=" + new Date(0).toUTCString();
    }

    function clearCookie(name, domain, path) {
        var domain = domain || document.domain;
        var path = path || "/";
        document.cookie = name + "=; expires=" + +new Date + "; domain=" + domain + "; path=" + path;
    };
    /*bind labels with selected language */
    function bindLabels(data) {
        var labels = {
            SignIn: data.labels.SignIn
            , LoginHeader: data.labels.LoginHeader
            , EmailId: data.labels.EmailId
            , Password: data.labels.Password
            , Login: data.labels.Login
            , ForgotPassword: data.labels.ForgotPassword
            , DoNotHaveAnAccount: data.labels.DoNotHaveAnAccount
            , CreateAccount: data.labels.CreateAccount
        };
        $scope.securityLogin = labels;
    }
    $localStorage.appkey = $stateParams.appkey;
    $scope.msg = false;
    $scope.web = function () {
        $location.url('/weblogin');
    };
    $scope.mobile = function () {
        $location.url('/mobilelogin');
    };
    $scope.login = function () {
        $scope.loading = true;
        authenticate();
        $scope.loading = false;
    };





    /* To get cridentials in the login Page */
    var authenticate = function () {
        loginLogic.getCredentials($scope.Text).then(function (response) {
            if (response[0] != null) {
                $localStorage.ReferenceKey = (response[0].ReferenceKey);
                $localStorage.loggedInUserID = (response[0].ReferenceKey);
                $localStorage.Name = response[0].FirstName;
                $localStorage.RoleID=response[0].RoleID;
               // $loddddcalStorage.Token = response[0].Token;
                nRoleID= response[0].RoleID;
                if (response[0].IsMobileVerified == 1 || response[0].IsEmailVerified == 1) {
                    profilesettngLogic.getAllProfileSettings($localStorage.loggedInUserID).then(function (resp) {
                        if (resp[0] != null) {
                            $localStorage.RegionTitle = resp[0].RegionTitle;
                            $localStorage.TimeZoneTitle = resp[0].TimeZoneTitle;
                            $localStorage.TimeFormatTitle = resp[0].TimeFormatTitle;
                            $localStorage.DateFormatTitle = resp[0].DateFormatTitle;
                            $localStorage.LanguageName = resp[0].LanguageName;
                            $localStorage.HeightTitle = resp[0].HeightTitle;
                            $localStorage.WeightTitle = resp[0].WeightTitle;
                            $localStorage.TemperatureTitle = resp[0].TemperatureTitle;
                            $localStorage.CurrencyKey = resp[0].CurrencyTitle;
                            $localStorage.ProfileSettingKey = resp[0].ProfileSettingKey;
                        }

                                  if(nRoleID==1)
                                 {
                        thrillAppBasePersonLogic.getOrgRoleDetailsByPersonKey(response[0].ReferenceKey).then(function (response) {
                            //alert(JSON.stringify(response));
                            $localStorage.roleId = response[0].RoleId;
                            $localStorage.organizationKey = response[0].OrganizationKey;
                            $localStorage.organizationId = response[0].OrganizationID;
                            $localStorage.Role = response[0].RoleName;
                            /* $scope.Staff.Role =$localStorage.roleId;
                             */
                            organizationLogic.getOrganizationInfoById(response[0].OrganizationKey).then(function (response) {
                                console.log(JSON.stringify(response));
                                if (response.isActive.data[0] == 1) {
                                    $http({
                                        method: 'GET'
                                        , url: 'Security/Logic/session.php'
                                    }).success(function (data) {
                                        $localStorage.contents = data;
                                        //alert($localStorage.contents);
                                    });
                                    if ($scope.Text.IsActive == true) {
                                        checkCookieUsername();
                                        checkCookiePassword();
                                        checkCookieCheck();
                                    }
                                    else if ($scope.Text.IsActive == false) {
                                        deleteCookie("username");
                                        deleteCookie("Password");
                                        deleteCookie("isActive");
                                    }
                                    $state.go('app.dashboard');
                                }
                                else {
                                    $state.go('error');
                                }
                            }); //alert(JSON.stringify($scope.Staff));
                            //$scope.person.placeOfBirth = response.placeOfBirth;
                        });
                    }
                    else{

                      loginLogic.getroleLogindetails($localStorage.ReferenceKey).then(function (response) {
                          
                            $localStorage.organizationKey=response[0].InstanceOrganizationKey;
                            $localStorage.LoginPersonReferencekey=response[0].PersonReferencekey;
                            $localStorage.LoginInstituteKey=response[0].InstituteKey;
                            $localStorage.LoginStaffKey=response[0].StaffKey;                                            
                            
                        $state.go('app.dashboard');
                  });
                        
                    }

                    });
                    ///]


                }
                else {
                    $scope.msg = true;
                    $scope.Text = "";
                }
            }
            else {
                $scope.msg = true;
                $scope.Text = "";
            }
        });
    };

    function setCookie(cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toGMTString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }

    function getCookie(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    function checkCookiePassword() {
        var testObj = {};
        var user = getCookie("Password");
        if (user != "") {
            //user = decode($scope.Text.password);
            loginLogic.decodeData(testObj, $scope.Text.password).then(function (resp) {
                user = resp.data;
            });
        }
        else {
            //user = encode($scope.Text.password);
            loginLogic.encodeData(testObj, $scope.Text.password).then(function (resp) {
                user = resp.data;
                if (user != "" && user != null) {
                    setCookie("Password", user, 2);
                }
            });
        }
        // checkCookieCheck();
    }

    function checkCookieUsername() {
        var testObj = {};
        var user = getCookie("username");
        if (user != "") {
            //user = decode($scope.Text.EmailID);
            loginLogic.decodeData(testObj, $scope.Text.EmailID).then(function (resp) {
                user = resp.data;
            });
        }
        else {
            //user = encode($scope.Text.EmailID);
            loginLogic.encodeData(testObj, $scope.Text.EmailID).then(function (resp) {
                user = resp.data;
                if (user != "" && user != null) {
                    setCookie("username", user, 2);
                }
            });
        }
        // checkCookiePassword();
    }

    function checkCookieCheck() {
        var testObj = {};
        var user = getCookie("isActive");
        if (user != "") {
            // user = decode($scope.Text.IsActive);
            loginLogic.decodeData(testObj, $scope.Text.IsActive).then(function (resp) {
                user = resp.data;
            });
        }
        else {
            //user = encode($scope.Text.IsActive);
            loginLogic.encodeData(testObj, $scope.Text.IsActive).then(function (resp) {
                user = resp.data;
                if (user != "" && user != null) {
                    setCookie("isActive", user, 2);
                }
            });
        }
    }
    //    function encode(param) {
    //        var testObj = {};
    //        loginLogic.encodeData(testObj, param).then(function (resp) {
    //            return resp.data;
    //        });
    //    }
    //    function decode(param) {
    //        var testObj = {};
    //        loginLogic.decodeData(testObj, param).then(function (resp) {
    //            return resp.data;
    //        });
    //    }
});