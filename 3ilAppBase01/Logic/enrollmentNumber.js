/*=======================================================================
 All rights reserved to  Thrill Innovative Labs.
 THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
 OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
 LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
 FITNESS FOR A PARTICULAR PURPOSE.
===========================================================================
****************************************************************************
 Name                : address.Controller.js
 Type                : Javascript and JQuery 
 Description         : This file contains controller methods
 References          :
 Author              : 
 Created Date        : 
****************************************************************************
MODIFICATION LOG
**************************************************************************** 
Ver Date         Modified By            Description

****************************************************************************  
Code Review LOG
**************************************************************************** 
**************************************************************************** 
S.No      Ver        Date                Code Review By            Observations

****************************************************************************
*/

var app = angular.module('Aarush.entrollmentNumber', ['ThrillLocation.addressLogic'

        , 'ngCordova'

        , 'ThrillFrameworkLibrary.geo'

        , 'ThrillFrameworkLibrary.Network'

        , 'ThrillCnnWebClient.appConfig'

        , 'ThrillFrameworkLibrary.appLogger',
        'ThrillAppBase.StudentAdditionLogic',
        'ThrillLocation.addressListLogic'
    ])
    /*Setup address Controller */
app.controller('Aarush.entrollmentNumber', function($scope, $http, addressLogic, $state, $stateParams, $localStorage, appConfig, appLogger, addressListLogic, ThrillAppBaseStudentLogic, SweetAlert) {

    $scope.Student = {};
    $scope.give = true;
    $scope.hide = false;

    // $scope.EnrollmentDigit={};
    //    var digit =Math.floor((Math.random() * 10000000000000000) + 1);

    // $scope.EnrollmentDigit=digit;
    //alert($stateParams.EnrollmentKey);
    var personReferenceKey;
    if ($stateParams.EnrollmentKey) {

     
        ThrillAppBaseStudentLogic.getStudentenrollmentNumber($stateParams.EnrollmentKey).then(function(response) {
            // alert(JSON.stringify(response));
            console.log(JSON.stringify(response));
            $scope.EnrollmentNumber = response[0].EnrolmentNumber;
        });
   }

    $scope.complete = function() {
        $scope.give = false;
        $scope.hide = true;
    };


});