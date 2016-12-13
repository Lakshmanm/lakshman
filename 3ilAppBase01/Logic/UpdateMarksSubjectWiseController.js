/*=======================================================================
 All rights reserved to Thrill Innovative Labs.
 THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
 OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
 LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
 FITNESS FOR A PARTICULAR PURPOSE.
===========================================================================
****************************************************************************
 Name		    	 : PersonDemographics.Controller.js
 Type		    	 : Angular js 
 Description		 : This file contains controller methods
 References		     :
 Author	    		 : Satyanarayana T
 Created Date        : 12-Apr-2016
****************************************************************************
MODIFICATION LOG
**************************************************************************** 
Ver	Date	     Modified By			Description
****************************************************************************  
Code Review LOG
**************************************************************************** 
S.No    Ver    Date           Code Review By   Observations
1.      1.0    14-Apr-2016    Ch.Rajaji        Remove "currentFileName" variable and use its value directly in the "getLabels" method.
2.      1.0    14-Apr-2016    Ch.Rajaji        Use appLogger inplace of console
****************************************************************************
*/

var app = angular.module('mCampuz.SubjectWise', ['ThrillPerson.SubjectWiseLogic'




        
        , 'ngCordova', 'ThrillFrameworkLibrary.geo', 'ThrillFrameworkLibrary.Network'




        
        , 'ThrillCnnWebClient.appConfig'




        
        , 'ThrillFrameworkLibrary.appLogger'
])
    /*Setup Person Controller */
app.controller('SubjectWiseController', function (
    $scope, $http, personDemographicsLogic, $state, $stateParams, appConfig, appLogger,SweetAlert) {


 






});