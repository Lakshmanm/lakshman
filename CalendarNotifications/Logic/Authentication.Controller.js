/*===========================================================================
 All rights reserved to Nunet Cube Software Solutions.
 THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
 OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
 LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
 FITNESS FOR A PARTICULAR PURPOSE.
============================================================================
****************************************************************************
 Name		    	: Authentication.Controller
 Type		    	: Angular Js  
 Description		: containing attributes/properties and functions of Authentication
 References		    : https://angularjs.org/
 Author	    		: Thriveni Yalavarthi.
 Created Date       : 07-04-2016.
****************************************************************************                          
MODIFICATION LOG
**************************************************************************** 
Ver	Date	     Modified By			Description
1	06-04-2016	Thriveni Yalavarthi		Define Controller logic for logic of Calendar and Notification Component. 
2.  15-04-2016   Thriveni Yalavarthi    Added toaster functionality 

****************************************************************************                            
Code Review LOG
**************************************************************************** 
S.No      Ver        Date                Code Review By            Observations
1         1.0       17-April-2016         Sri Venkatesh.T           No Issues 
****************************************************************************
*/


//var currentFileName = "Authentication";
//console.log(123)
var app = angular.module('ThrillCNN.Authentication', ['ThrillCNN.AuthenticationLogic',
    'ngCordova',
 //'ThrillFrameworkLibrary.geo',
   'ThrillFrameworkLibrary.Network',
  'ThrillCnnWebClient.appConfig',
 'ThrillFrameworkLibrary.appLogger'
                                                     ]);

/*Setup employee Controller */
app.controller('AuthenticationController',
    function(authenticationLogic,
        $scope,
        $state,
        $http,
        appConfig,
        appLogger,
        toaster,
        $localStorage) {
        $("#header-login").hide();

        getLabels(appConfig.CULTURE_NAME);
        getMessages(appConfig.CULTURE_NAME);
        

        /*get labels with selected language*/
        function getLabels(cultureName) {

            var currentFileName = "Authentication";
            $http.get("CalendarNotifications/Languages/" + currentFileName + "." + cultureName + ".json").then(function(response) {
                bindLabels(response.data);
                authendicate();
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

                WelcomeNote: data.labels.WelcomeNote,
                Login: data.labels.Login,
                ForgotPassword: data.labels.ForgotPassword,
                Submit: data.labels.Submit,
                BackToLogin: data.labels.BackToLogin

            };

            $scope.loginLables = lables;
            // appLogger.log("" + JSON.stringify($scope.loginLables));

        }
        
    
        function authendicate() {
           /* $localStorage.loggedInUserID = "fd39e9c1-17fb-11e6-93e4-c36a27ac43e5";
            $state.go("DashBoard", {}, {
                        reload: true
                    });*/
          
            var  personReferenceKey = document.cookie.split('=')[1];
            authenticationLogic.getPersonData(personReferenceKey).then(function(response) {
                
                appLogger.log("success:"+response);
                //alert(response.data.PersonID);
                if (response.data.PersonID != 0) {
                    $localStorage.userLoginInfo = personReferenceKey;
                    //$localStorage.loggedInUserID = response.data[0].personId;
                    $localStorage.loggedInUserID =personReferenceKey;
                    //$localStorage.loggedInUserID = "fd39e9c1-17fb-11e6-93e4-c36a27ac43e5";
                    
                    toaster.pop('success', $scope.alertMessageLabels.loginSuccess, '', 5000, '');
                    $state.go("app.appointments", {}, {
                        reload: true
                    });

                } else {
                    $scope.error = "Email Id and Password Missmatch";
                    alert(response.data.PersonID);
                    toaster.pop('error', $scope.alertMessageLabels.loginUnSuccess, '', 5000, '');
                }

            },
                function(err) {

                    appLogger.error('ERR', err);
                
                    toaster.pop('error', $scope.alertMessageLabels.loginUnSuccess, '', 5000, '');

                });

        }
        
        $scope.user = {};
        /*Method for calling Bl authentication(login) method of user */
        $scope.login = function() {
           /* $localStorage.loggedInUserID = "fd39e9c1-17fb-11e6-93e4-c36a27ac43e5";
            $state.go("DashBoard", {}, {
                        reload: true
                    });*/
            
            authenticationLogic.userLogin($scope.user).then(function(response) {
                

                if (response.data.PersonID != 0) {
                    $localStorage.userLoginInfo = $scope.user;
                    //$localStorage.loggedInUserID = response.data.PersonID;
                    //$localStorage.loggedInUserID = "3692e300-110a-11e6-8bb8-85044c6bc2b2";
                   // $localStorage.loggedInUserID = "fd39e9c1-17fb-11e6-93e4-c36a27ac43e5";
                    
                    toaster.pop('success', "login successfull", '', 5000, '');
                    $state.go("app.appointments", {}, {
                        reload: true
                    });

                } else {
                    $scope.error = "Email Id and Password Missmatch";
                    toaster.pop('error', "user login Unsuccessfull", '', 5000, '');
                }

            },
                function(err) {

                    appLogger.error('ERR', err);
                    toaster.pop('error', "user login Unsuccessfull", '', 5000, '');

                });

        };

        /* Method for calling Bl Authentication(forgot password) method of user */
        $scope.forgotPasswordEmail = function() {

          //  console.log($scope.user.forgotPasswordEmail)

            if ($scope.user.forgotPasswordEmail != undefined && $scope.user.forgotPasswordEmail != '') {



                authenticationLogic.userForgotPassword($scope.user.forgotPasswordEmail).then(function(response) {

                    appLogger.log("Forgot Password Response is:::" + JSON.stringify(response))

                    if (response.data.message == "success") {
                        $scope.Message = "Username and Password Sent to your EmailID ";
                    } else {
                        $scope.Message = "Invalid Username ";
                    }

                },
                    function(err) {

                        appLogger.error('ERR', err);

                    });
            }

        };


        /* Forgot Password Method that hide login part and show ForgotPassword part */
        $scope.forgotPassword = function() {

            document.getElementById('login').style.display = 'none';
            document.getElementById('forgot').style.display = 'block';
        };

        /* After sending email with username and password to corresponding emailid show login page */
        $scope.goToLogin = function() {

            document.getElementById('login').style.display = 'block';
            document.getElementById('forgot').style.display = 'none';
        };


    });