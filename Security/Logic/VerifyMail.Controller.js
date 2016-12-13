/*=======================================================================
  All rights reserved to Thrill Innovations Lab.
 THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
 OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
 LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
 FITNESS FOR A PARTICULAR PURPOSE.
===========================================================================
****************************************************************************
 Name                : Verify Mail 
 Type                : Javascript and JQuery 
 Description         : This file contains controller methods
 References          :
 Author              :  Mythreyee.Pingala
 Created Date        :  12-Apl-2016
****************************************************************************
MODIFICATION LOG
**************************************************************************** 
Ver Date         Modified By            Description
12-Apl-2016      Mythreyee              Added Logic 
****************************************************************************  
Code Review LOG
**************************************************************************** 
S.No      Ver        Date                Code Review By            Observations
1         1.0       14-April-2016         Sri Venkatesh.T           Remove "var testVal = "Security/VerifyEmail/" + $stateParams.ID;" code which is not requried.
****************************************************************************
*/


var app = angular.module('security.verifyMailController', ['security.verifyMailLogic', 'ngCordova', 'ThrillFrameworkLibrary.geo', 'ThrillFrameworkLibrary.Network', 'ThrillCnnWebClient.appConfig', 'ThrillFrameworkLibrary.appLogger']);
app.controller('VerifyMailController', function($scope,
    $http,
    $state,
    $stateParams,
    appConfig,
    verifyMailLogic,
    registrationLogic,
    appLogger,
    $location) {

    getLabels(appConfig.CULTURE_NAME);

    function getLabels(cultureName) {
        var currentFileName = "SecurityLogin";
        $http.get("Security/Languages/" + currentFileName + "." + cultureName + ".json").then(function(response) {
            bindLabels(response.data);

        });
    }
    
    
    /*bind labels with selected language */
    function bindLabels(data) {

        var labels = {
            SignIn: data.labels.SignIn,
            LoginHeader: data.labels.LoginHeader,
            EmailId: data.labels.EmailId,
            Password: data.labels.Password,
            Login: data.labels.Login,
            ForgotPassword: data.labels.ForgotPassword,
            DoNotHaveAnAccount: data.labels.DoNotHaveAnAccount,
            CreateAccount: data.labels.CreateAccount

        };
        $scope.securityLogin = labels;
    }
    // logic to verify mail using token 
   
   
    verifyMailLogic.verifyEmail($stateParams.ID).then(function(response) {
       

        console.log(response);

        var referenceKey = response[0].ReferenceKey;
        var primaryEmail = response[0].PrimaryEmailAddress;

        verifyMailLogic.userUpdate(response[0], response[0].ReferenceKey).then(function(response) {
            console.log(response);
            var postData = {};
            postData.ContactSubTypeID = 3;
            postData.ContactInfo = primaryEmail;
            postData.EntityTypeID = 1;
            postData.EntityReferenceKey = referenceKey
                /* registrationLogic.postContact(postData).then(function (response) {*/

            $state.go('signin');
            /*});*/
        });

    });

});