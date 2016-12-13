/*=======================================================================
 All rights reserved to Thrill Innovations Lab.
 THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
 OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
 LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
 FITNESS FOR A PARTICULAR PURPOSE.
===========================================================================
****************************************************************************
 Name                : Email 
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
1         1.0       14-April-2016         Sri Venkatesh.T           Remove "var currentFileName = "SecurityEmailSuccess";" code which is not requried.
2         1.0       14-April-2016         Sri Venkatesh.T           appConfig, appLogger,securityQueries are not used but injected remove if not required.
3         1.0       14-April-2016         Sri Venkatesh.T           write comments for all the functions in this file
4         1.0       14-April-2016         Sri Venkatesh.T           Give meaningful name for the function parameters with camel casing.And remove all empty lines just accomidate ample of line space to look code with indentation.
5         1.0       14-April-2016         Sri Venkatesh.T           In page header please mention full name of the author.
****************************************************************************
*/

var app = angular.module('security.emailController', ['security.emailLogic',
                                                      'ngCordova',
                                                      'ThrillFrameworkLibrary.geo',
                                                      'ThrillFrameworkLibrary.Network',
                                                      'ThrillCnnWebClient.appConfig',
                                                      'ThrillFrameworkLibrary.appLogger'])
app.controller('EmailController', function ($scope,
    $http,
    $state,
    $stateParams,
    appConfig,
    appLogger,
    emailLogic,
    $location) {

// Function call fo verify email Id based on token 
    var verifyEmailtoken = function () {
        emailLogic.verifyEmail($stateParams.ID).then(function (response) {

      
    
          
            $state.go('app.emailforgotPassword/:ID',{ID:response[0].ReferenceKey});
        });
    }

    verifyEmailtoken();


});