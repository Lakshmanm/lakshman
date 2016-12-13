/*=======================================================================
  All rights reserved to Thrill Innovations Lab.
 THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
 OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
 LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
 FITNESS FOR A PARTICULAR PURPOSE.
===========================================================================
****************************************************************************
 Name                : User
 Type                : Javascript and JQuery 
 Description         : This file contains controller methods
 References          :
 Author              :  Mythreyee
 Created Date        :  07-Apr-2016
****************************************************************************
MODIFICATION LOG
**************************************************************************** 
Ver	Date	     Modified By			Description
07-Apr-2016      Mythreyee              Added Logic For The CRUD Operations(completeController)
12-Apr-2016      Rahul                  Server to Client calls and communication establishment and issues
13-Apr-2016      Tulasi Ballada         Added Code Comments

****************************************************************************  
Code Review LOG
**************************************************************************** 
S.No      Ver        Date                Code Review By            Observations
1         1.0       14-April-2016         Sri Venkatesh.T           Remove "var currentFileName = "SecurityUser";" code which is not requried.
2         1.0       14-April-2016         Sri Venkatesh.T           Write all function names with camel casing
3         1.0       14-April-2016         Sri Venkatesh.T           function names should be camel casing ,for sendMail function param was argumented as UserID which is Pascal Casing
4         1.0       14-April-2016         Sri Venkatesh.T           None of the error chaning function is having logger for logging the error.
5         1.0       14-April-2016         Sri Venkatesh.T           $scope.Mmessage = false;$scope.Emessage = false; name this scope properties with a menaingful name
6         1.0       14-April-2016         Sri Venkatesh.T           logger module was used in this comtroller but in dependency injection it was never defined.
7         1.0       14-April-2016         Sri Venkatesh.T           Check this line of statement is wrong " 
                                                                    if (role.isActive == 1) {var checked = true;} 
                                                                    else {var checked = false;}
                                                                    $scope.Roles.isActive = checked;".
                                                                    Checked value initialization may be out of scope and checked was declared twice in single conditional statement which is wrong.
****************************************************************************
*/

var app = angular.module('security.userController', ['security.userLogic'
                                                        , 'ngCordova'
                                                        , 'ThrillFrameworkLibrary.geo'
                                                        , 'ThrillFrameworkLibrary.Network'
                                                        , 'ThrillCnnWebClient.appConfig'
                                                        , 'ThrillFrameworkLibrary.appLogger'
]);

// User Controller Start
app.controller('UserController', function ($scope,
    $http,
    $state,
    $stateParams,
    appConfig,
    appLogger,
    userLogic,
    $window) {

    getLabels(appConfig.CULTURE_NAME);
     getMessages(appConfig.CULTURE_NAME);
function getMessages(cultureName) {
        var alertMessageName = "AlertMessages";

        $http.get("Security/Languages/" + alertMessageName + "." + cultureName + ".json").then(function (response) {
           
            $scope.alertMessageLabels = response.data.messages;
        });
    }
    function getLabels(cultureName) {
        var currentFileName = "SecurityUser";
        $http.get("Security/Languages/" + currentFileName + "." + cultureName + ".json").then(function (response) {
            bindLabels(response.data);
        });
    }
    /*bind labels with selected language */
    function bindLabels(data) {
        var labels = {
            User: data.labels.User,
            UserName: data.labels.UserName,
            Password: data.labels.Password,
            FirstName: data.labels.FirstName,
            LastName: data.labels.LastName,
            EmailId: data.labels.EmailId,
            MobileNumber: data.labels.MobileNumber,
            IsActive: data.labels.IsActive,
            Save: data.labels.Save,
            Update: data.labels.Update,
            Edit: data.labels.Edit
        };
        $scope.securityUser = labels;
    }

    //Scope Dafault Values
    $scope.save = true;
    $scope.update = false;
    $scope.Mmessage = false;
    $scope.Emessage = false;

    //This is for restricting duplicates and incase without duplicates it saves the data
    $scope.UsersSave = function () {
        $scope.Mmessage = false;
        $scope.Emessage = false;
        $scope.postUser();
        userLogic.getEmail($scope.User.PrimaryEmailAddress).then(function (response) {
                if (response.length == undefined) {

                    userLogic.getMobile($scope.User.MobileNumber).then(function (response) {

                            if (response.length == undefined)
                                $scope.postUser();
                            else
                                $scope.Mmessage = true;

                        },function (error) {
                            console.log(error)

                        })


                } else
                    $scope.Emessage = true;

            },function (error) {
                console.log(error)

            });

    };

    //save user 
    $scope.postUser = function () {

        userLogic.addUser($scope.User).then(function (response) {
            $scope.User = "";
            appLogger.alert($scope.alertMessageLabels.Saved);
         
            getUsers();
        }, function (err) {
            logger.error('ERR', err);

        });
    };

    // this function is for getting list of users
    var getUsers = function () {
        userLogic.getUser().then(function (response) {
            $scope.users = response;

        }, function (err) {
            logger.error('ERR', err);

        });

    };

    getUsers(); // Initial Call getUsers function

    //this is to upadte user
    var putUsersByID = function (id) {

        userLogic.updateuser($scope.User, id).then(function (response) {
            $scope.User = "";
             appLogger.alert($scope.alertMessageLabels.Updated);
            //alert("User Updated Succesfully");
            getUsers();

        }, function (err) {

            logger.error('ERR', err);
        });
    };

    //This function is for editing user
    $scope.edituser = function (user) {

        $scope.save = false;
        $scope.update = true;
        $scope.User = {};
        $scope.User.UserID = user.UserID;
        $scope.User.Username = user.Username;
        $scope.User.Password = user.Password;
        $scope.User.FirstName = user.FirstName;
        $scope.User.LastName = user.LastName;
        $scope.User.PrimaryEmailAddress = user.PrimaryEmailAddress;
        $scope.User.MobileNumber = user.MobileNumber;
        $scope.User.isActive = (user.isActive == 1 ? true : false);
        $('html, body').animate({ // Scroll top click on edit
            scrollTop: 0
        }, 'slow');

    };

    //update user function call
    $scope.updateUsers = function () {
        putUsersByID($scope.User.UserID);

    };

});
// User Controller End