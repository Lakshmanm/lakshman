/*=======================================================================
  All rights reserved to Thrill Innovations Lab.
 THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
 OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
 LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
 FITNESS FOR A PARTICULAR PURPOSE.
===========================================================================
****************************************************************************
 Name                : Forgot Password.Controller
 Type                : Javascript and JQuery 
 Description         : This file contains controller methods
 References          :
 Author              :  Mythreyee.Pingala
 Created Date        :  12-April-2016
****************************************************************************
MODIFICATION LOG
**************************************************************************** 
Ver Date         Modified By            Description

****************************************************************************  
Code Review LOG
**************************************************************************** 
S.No      Ver        Date                Code Review By            Observations
1         1.0       14-April-2016         Sri Venkatesh.T           Remove "var currentFileName = "SecurityForgotPassword";" code which is not requried.
2         1.0       14-April-2016         Sri Venkatesh.T           appLogger is not used but injected remove if not required.
3         1.0       14-April-2016         Sri Venkatesh.T           Remove all commented code if not required if not please mention on top it with //TODO : (comments).
4         1.0       14-April-2016         Sri Venkatesh.T           "RegisteredEmail" is duplicated in the bindLabels function. 
5         1.0       14-April-2016         Sri Venkatesh.T           In page header please mention full name of the author.
****************************************************************************
*/
var app = angular.module('security.forgotPasswordController', [
    'security.forgotPasswordLogic'
                                        , 'ngCordova'
                                        , 'ThrillFrameworkLibrary.geo'
                                        , 'ThrillFrameworkLibrary.Network'
                                        , 'ThrillCnnWebClient.appConfig'
                                        , 'ThrillFrameworkLibrary.appLogger'])
app.controller('ForgotPasswordController', function ($scope, $http, $state, $stateParams, appConfig, appLogger, $localStorage, forgotPasswordLogic, $location) {
    getLabels(appConfig.CULTURE_NAME);

    function getLabels(cultureName) {
        var currentFileName = "SecurityForgotPassword";
        $http.get("Security/Languages/" + currentFileName + "." + cultureName + ".json").then(function (response) {
            bindLabels(response.data);
        });
    }
    /*bind labels with selected language */
    function bindLabels(data) {
        var labels = {
            ForgotPassword: data.labels.ForgotPassword
            , Email: data.labels.Email
            , Mobile: data.labels.Mobile
            , Access: data.labels.Access
            , Verify: data.labels.Verify
            , Submit: data.labels.Submit
            , RegisteredEmail: data.labels.RegisteredEmail
            , EmailDoesnotExist: data.labels.EmailDoesnotExist
            , IncorrectAnswer: data.labels.IncorrectAnswer
            , RecoverPassword: data.labels.RecoverPassword
            , ReSendOTP: data.labels.ReSendOTP
            , SendOTP: data.labels.SendOTP
            , MobileNumberDoesnotExist: data.labels.MobileNumberDoesnotExist
        };
        $scope.securityForgotPassword = labels;
    };
    $scope.number = false;
    $scope.mail = function () {
        $scope.email = true;
        $scope.mobil = false;
        $scope.verif = false;
        $scope.ques = false;
        $scope.answer = false;
        $scope.message = false;
        $scope.errorMessage = false;
        $scope.Register = ""
        $scope.mMessage = false;
    }
    $scope.mobile = function () {
        $scope.mobil = true;
        $scope.email = false;
        $scope.ques = false;
        $scope.answer = false;
        $scope.message = false;
        $scope.errorMessage = false;
        $scope.eMessage = false;
        $scope.emailSuccess = false;
        $scope.mMessage = false;
        $scope.Register = ""
    }
    $scope.question = function () {
        $scope.ques = true;
        $scope.mobil = false;
        $scope.email = false;
        $scope.verif = false;
        $scope.answer = false;
        $scope.Register = "";
        $scope.mMessage = false;
        $scope.eMessage = false;
        $scope.emailSuccess = false;
        $scope.message = false;
    }
    $scope.answerr = function () {
        $scope.ques = false;
        $scope.mobil = false;
        $scope.email = false;
        $scope.verif = false;
        $scope.answer = true;
    }
    $scope.clear = function () {
        $scope.Register = "";
    };
    //forgot password through email 
    $scope.eMessage = false;
    $scope.sMessage = false;
    var sendEmail = function (token) {
        $scope.sMessage = true;
        $scope.Register.token = token;
        forgotPasswordLogic.sendEmail($scope.Register).then(function (response) {
            $scope.sMessage = false;
            $scope.emailSuccess = true;
        })
    }
    var sendToken = function (userId) {
        forgotPasswordLogic.sendEmailToken(userId).then(function (response) {
            sendEmail(response);
        });
    }
    $scope.emailVerify = function () {
            if ($scope.Register.PrimaryEmailAddress != undefined) {
                $scope.eMessage = false;
                forgotPasswordLogic.getUserEmail($scope.Register.PrimaryEmailAddress).then(function (response) {
                    if (response.length == undefined) {
                        $scope.eMessage = true;
                    }
                    else {
                        sendToken(response[0].UserID);
                    }
                })
            }
        }
        //end of forgot password through email
        //start of forgot password through mobile
    var UserID;
    var ReferenceKey;
    $scope.mMessage = false;
    $scope.reotp = false;
    $scope.otp = true;

    function generateOtp() {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (var i = 0; i < 5; i++) text += possible.charAt(Math.floor(Math.random() * possible.length));
        return text;
    }
    var saveOTP = function (obj) {
        forgotPasswordLogic.postOtp(obj).then(function (response) {})
    }
    var sendSMS = function (number, otp, id) {
        $scope.Register.otp = otp;
        $scope.Register.MobileNumber = number;
        $scope.Register.UserID = id;
        saveOTP($scope.Register);
        forgotPasswordLogic.sendSms($scope.Register).then(function (response) {})
    }
    $scope.reSend = function () {
        sendSMS($scope.Register.MobileNumber, generateOtp(), UserID);
    }
    $scope.mobileVerify = function () {
        if ($scope.Register.MobileNumber != undefined) {
            $scope.mMessage = false;
            $scope.reotp = true;
            $scope.otp = false;
            forgotPasswordLogic.getMobileNumber($scope.Register.MobileNumber).then(function (response) {
                if (response.length == undefined) {
                    $scope.mMessage = true;
                    $scope.verif = false;
                    $scope.reotp = false;
                    $scope.otp = true;
                }
                else {
                    $scope.verif = true;
                    ReferenceKey = response[0].ReferenceKey;
                    UserID = response[0].UserID;
                    sendSMS($scope.Register.MobileNumber, generateOtp(), response[0].UserID);
                }
            })
        }
    }
    $scope.confirmOtp = function () {
        forgotPasswordLogic.getOTP(UserID, $scope.Register.totp).then(function (response) {
            if (response.length != undefined) {
                $state.go('loginnewPassword/:ID', {
                    ID: ReferenceKey
                });
            }
            else {
                $scope.number = true;
            }
        })
    };
    //end of forgot password through mobile
    //forgot password through questionaire
    var questions, userDetails;
    $scope.message = false;
    $scope.errorMessage = false;
    var getquestions = function () {
        forgotPasswordLogic.getAllquestions().then(function (response) {
            $scope.questions = response;
        });
    }
    getquestions();
    var getAnswer = function (id) {
        forgotPasswordLogic.getAnswer(id).then(function (response) {
            questions = response;
            $scope.Register.questions = questions[0].QuestionaireId;
        })
    }
    $scope.submit = function () {
        if ($scope.Register.PrimaryEmailAddress != undefined) {
            $scope.answer = true;
            $scope.ques = false;
            forgotPasswordLogic.getUserMail($scope.Register.PrimaryEmailAddress).then(function (response) {
                userDetails = response;
                if (userDetails.length == undefined) {
                    $scope.message = true;
                    $scope.answer = false;
                }
                else {
                    getAnswer(userDetails[0].PersonQuestionaireID);
                }
            })
        }
    }
    $scope.questionVerify = function () {
            if (questions[0].QuestionaireId == $scope.Register.questions && questions[0].HintAnswer == $scope.Register.answer) {
                $location.path('/newPassword/' + userDetails[0].ReferenceKey);
            }
            else {
                $scope.errorMessage = true;
            }
        }
        //end of forgot password through quetionaire
        //updating password after changing
    $scope.changesubmit = function () {
        forgotPasswordLogic.changePassword($stateParams.ID, $scope.pass).then(function (response) {
            console.log(response);
            $state.go('app.dashboard');
        })
    }
});