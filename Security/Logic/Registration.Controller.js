/*=======================================================================
 All rights reserved to Thrill Innovations Lab.
 THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
 OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
 LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
 FITNESS FOR A PARTICULAR PURPOSE.
===========================================================================
****************************************************************************
 Name                : Registration
 Type                : Javascript and JQuery 
 Description         : This file contains controller methods
 References          :
 Author              :  Mythreyee.Pingala
 Created Date        :  11-Apl-2016
****************************************************************************
MODIFICATION LOG
**************************************************************************** 
Ver Date         Modified By            Description
11-Apl-2016      Mythreyee              Added Logic For The CRUD Operations(completeLogic)
12-Apr-2016      Rahul                  Established Serve to Client calls 
13-Apr-2016      Tulasi Ballada         Added Code Comments
****************************************************************************  
Code Review LOG
**************************************************************************** 
S.No      Ver        Date                Code Review By            Observations
1         1.0       14-April-2016         Sri Venkatesh.T           AddressID and UserID must be in camel casing.
2         1.0       14-April-2016         Sri Venkatesh.T           captcha() function was not implemented any where in this controller
3         1.0       14-April-2016         Sri Venkatesh.T           var s = $scope.Regs.CountryID;var d = $scope.Regs.StateID; etc., write a meaningful name for the variable
4        1.0       14-April-2016         Sri Venkatesh.T           Implemeneted verify function but never used if not requried remove
5        1.0       14-April-2016         Sri Venkatesh.T           sendEmail function implemented but when as in chaining then function response was either having a return or callback funtion.
6        1.0       14-April-2016         Sri Venkatesh.T           None of the error chaning function is having logger for logging the error. 
****************************************************************************
*/

var app = angular.module('security.registrationController', ['security.registrationLogic', 
    'ngCordova',
        'ThrillFrameworkLibrary.geo', 
        'ThrillFrameworkLibrary.Network', 
        'ThrillCnnWebClient.appConfig',
         'security.appStorage',
         'ThrillFrameworkLibrary.appLogger']);
/* Registration  Start */
app.controller('RegistrationController', function ($scope, $http, $state, $stateParams, appConfig, appStorage, appLogger, $location, registrationLogic, $localStorage, $window

) {
    getLabels(appConfig.CULTURE_NAME);

    function getLabels(cultureName) {
        var currentFileName = "SecurityRegistration";
        $http.get("Security/Languages/" + currentFileName + "." + cultureName + ".json").then(function (response) {
            bindLabels(response.data);

        });
    }
    /*bind labels with selected language */
    function bindLabels(data) {

        var labels = {
            SignUp: data.labels.SignUp,
            BasicInfo: data.labels.BasicInfo,
            Address: data.labels.Address,
            FirstName: data.labels.FirstName,
            MiddleName: data.labels.MiddleName,
            LastName: data.labels.LastName,
            Gender: data.labels.Gender,
            Female: data.labels.Female,
            Male: data.labels.Male,
            DateOfBirth: data.labels.DateOfBirth,
            MobileNumber: data.labels.MobileNumber,
            PrimaryEmailAddress: data.labels.PrimaryEmailAddress,
            SecondaryEmailAddress: data.labels.SecondaryEmailAddress,
            Captcha: data.labels.Captcha,
            SaveContinue: data.labels.SaveContinue,
            Username: data.labels.Username,
            CheckAvailability: data.labels.CheckAvailability,
            Password: data.labels.Password,
            ReEnterPassword: data.labels.ReEnterPassword,
            DoorNo: data.labels.DoorNo,
            Addressline1: data.labels.Addressline1,
            Addressline2: data.labels.Addressline2,
            CountryID: data.labels.CountryID,
            StateID: data.labels.StateID,
            DistrictID: data.labels.DistrictID,
            MandalID: data.labels.MandalID,
            VillageID: data.labels.VillageID,
            ZipCode: data.labels.ZipCode,
            QuestionaireId: data.labels.QuestionaireId,
            HintAnswer: data.labels.HintAnswer,
            Submit: data.labels.Submit,
            Success: data.labels.Success,
            RegistrationSuccessful: data.labels.RegistrationSuccessful,
            Message: data.labels.Message,
            Ok: data.labels.Ok

        };
        $scope.securityBasicInfo = labels;
    }
    // logic for restricting future dates
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!

    var yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    today = yyyy + '-' + mm + '-' + dd;


    $scope.maxdate = today;
    $scope.Regs = "";
    $scope.message = false;
    $scope.errorMsg = false;
    $scope.Mmessage = false;

    var question;
    var addressID;
    var userID;
    // logic for checking availability for usernames
    $scope.checkusers = function () {

        registrationLogic.getUsername($scope.Regs.Username).then(function (response) {
            if (response.length != undefined) {
                $scope.message = true;
            } else {
                $scope.message = false;
                //captcha();
            }

        });
    };

    //okAction function call
    $scope.okAction = function () {
        $location.url('/weblogin');
    };
    //postperson function call
    $scope.postperson = function () {

        $scope.errorMsg = false;
        $scope.Mmessage = false;


        registrationLogic.getEmail($scope.Regs.PrimaryEmailAddress,$scope.Regs.MobileNumber).then(function (response) {
            //alert(JSON.stringify(response));

            if (response.length == undefined) {
              
                        registrationLogic.postCaptcha($scope.Regs).then(function (response) {

                            if (response.data == "right") {

                                appStorage.insertData($scope.Regs);

                                $location.url("/address");

                            } else {
                                $scope.message = true;
                                $scope.refresh();
                                $scope.Regs.captchaa = "";

                            }

                        })

               

            } else {
                $scope.errorMsg = true;
                $scope.refresh();
                $scope.Regs.PrimaryEmailAddress = "";
                 $scope.Regs.MobileNumber="";
                $scope.Regs.captchaa = "";
            }


        })



    };

    //Posting  Registered user
    $scope.postaddress = function () {


        $scope.Regs.FirstName = appStorage.getData().FirstName;
        $scope.Regs.MiddleName = appStorage.getData().MiddleName;
        $scope.Regs.LastName = appStorage.getData().LastName;
        $scope.Regs.Gender = appStorage.getData().Gender;
        $scope.Regs.DateOfBirth = appStorage.getData().DateOfBirth;
        $scope.Regs.MobileNumber = appStorage.getData().MobileNumber;
        $scope.Regs.PrimaryEmailAddress = appStorage.getData().PrimaryEmailAddress;
        $scope.Regs.SecondaryEmailAddress = appStorage.getData().SecondaryEmailAddress;
var questionpost={"QuestionaireId":$scope.Regs.QuestionaireId,
                          "HintAnswer":$scope.Regs.HintAnswer

                        };
        registrationLogic.postQuestionnaire(questionpost).then(function (response) {
            question = response.data.insertId;

            //alert(question);
            $scope.Regs.question = question;

         var addresspost={"DoorNo":$scope.Regs.DoorNo,
                             "Addressline1":$scope.Regs.Addressline1,
                             "Addressline2":$scope.Regs.Addressline2,
                             "CountryID":$scope.Regs.CountryID,
                              "StateID":$scope.Regs.StateID,
                              "DistrictID":$scope.Regs.DistrictID,
                              "MandalID":$scope.Regs.MandalID,
                              "VillageID":$scope.Regs.VillageID,
                              "ZipCode":$scope.Regs.Pincode

           };

            registrationLogic.postAddress(addresspost).then(function (response) {
             addressID = response.data.insertId;
                $scope.Regs.AddressID = addressID;
                //alert(addressID);
        
                registrationLogic.postUser($scope.Regs).then(function (response) {



                    userID = response.data.insertId;
                    ReferenceKey = response.data.referenceKey;

                    $scope.Regs.UserID = userID;
                    //registrationLogic.postPerson($scope.Regs).then(function (response) {
                        
                       // sendMail(userID);
                        
                        /*var postData = {};
                        postData.ContactSubTypeID = 3;
                        postData.ContactInfo = $scope.Regs.PrimaryEmailAddress;
                        postData.EntityTypeID = 1;
                        postData.EntityReferenceKey = ReferenceKey*/
                        
                       // registrationLogic.postContact(postData).then(function (response) {
                            if ($localStorage.appkey != "" && $localStorage.appkey != undefined) {
                                var mainInfo = $http.get('Security/Json/document.json').success(function (resp) {

                                    /*if ($localStorage.appkey == resp.AppDetails.AppKey) {
                                        $window.location.href = resp.AppDetails.Redirecturl + ReferenceKey;
                                    } else {
    
                                        $location.path('/dashboard/' + response[0].UserID);
    
                                    }*/
                                    $location.path('registrationSuccess');
                                    /*var appKey = $localStorage.appkey;
                                    var passporturl="http://passport.traffix.in:3110/#/login/";
                                    if(appKey!='')
                                        {
                                            $window.location.href = passporturl + appKey;   
                                        
                                        }
                                    else
                                        {
                                            $location.path('registrationSuccess');
                                        }*/


                                    /*switch (appKey) {
                                    case "123456dmsKey":
                                        $window.location.href = resp.AppDetails[0].Redirecturl + ReferenceKey;
                                        break;
                                    case "123457orgKey":
                                        $window.location.href = resp.AppDetails[1].Redirecturl + ReferenceKey;
                                        break;
                                    case "123458calKey":
                                        $window.location.href = resp.AppDetails[2].Redirecturl + ReferenceKey;
                                        break;
                                    case "123459perKey":
                                        $window.location.href = resp.AppDetails[3].Redirecturl + ReferenceKey;
                                        break;
                                    case "123460surKey":
                                        $window.location.href = resp.AppDetails[4].Redirecturl + ReferenceKey;
                                        break;
    
                                    default:
                                        $location.path('/dashboard/user/' + response[0].UserID);
                                        break;
                                    }*/


                                });

                            } else {


                                $location.path('registrationSuccess');
                            }
                       // });

                   
                });

            });


        })




    };
    //getcountry function
    var getcountry = function () {
        registrationLogic.getCountry().then(function (response) {
            $scope.countrys = response;

        });

    };
    getcountry(); //Initial getcountry function call


    //get state Function
    $scope.state = function () {

        var countryId = $scope.Regs.CountryID;
        if (countryId != undefined) {
            registrationLogic.getState(countryId).then(function (response) {
                $scope.states = response;
                $scope.Regs.StateID = 0;
                $scope.districts = {};
                $scope.mandals = {};
                $scope.villages = {};

            });
        } else {
            $scope.states = {};
            $scope.districts = {};
            $scope.mandals = {};
            $scope.villages = {};
        }

    };
    //get district Function
    $scope.district = function () {
        var stateId = $scope.Regs.StateID;

        if (stateId != undefined) {
            registrationLogic.getDistrict(stateId).then(function (response) {
                $scope.districts = response;
                $scope.Regs.DistrictID = 0;
                $scope.mandals = {};
                $scope.villages = {};
            });
        } else {
            $scope.districts = {};
            $scope.mandals = {};
            $scope.villages = {};
        }

    };
    //get mandal Function
    $scope.mandal = function () {

        var districtId = $scope.Regs.DistrictID;
        if (districtId != undefined) {

            registrationLogic.getMandal(districtId).then(function (response) {
                $scope.mandals = response;
                $scope.Regs.MandalID = 0;
                $scope.villages = {};
            });
        } else {
            $scope.mandals = {};
            $scope.villages = {};
        }
    };

    //get village Function
    $scope.village = function () {

        var mandalId = $scope.Regs.MandalID;
        if (mandalId != undefined) {
            registrationLogic.getVillage(mandalId).then(function (response) {
                $scope.villages = response;
            });
        } else {
            $scope.villages = "";
        }
    };

    //getquestions function

    var getquestions = function () {
        registrationLogic.getQuestionnaire().then(function (response) {
            $scope.questions = response;
        });

    }
    getquestions(); //Initial getquestions function call

    // get Captcha
    //$scope.img = "http://192.168.100.41:3110/V1/Security/Captcha";
    $scope.img = "http://localhost:2425/V1/Security/Captcha";
    $scope.name = "";
    var verify = function () {
        registrationLogic.postCaptcha($scope.Regs).then(function (response) {});

    };

    $scope.refresh = function () {
       //$scope.img = 'http://192.168.100.41:3110/V1/Security/Captcha?_=' + (new Date().getTime());
       $scope.img = 'http://localhost:2425/V1/Security/Captcha?_=' + (new Date().getTime());
    };

    //sendEmail function call
    var sendEmail = function (token, id) {
        $scope.Regs.token = token;
        $scope.Regs.UserID = id;
        registrationLogic.postEmail($scope.Regs).then(function (response) {})

    };


    //sendMail function call
    var sendMail = function (UserID) {
        registrationLogic.sendToken(UserID).then(function (response) {

            sendEmail(response.data.Token, UserID);

        });
    };
});
/* Registration  end */