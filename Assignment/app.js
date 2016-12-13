/*//=============================================================================
// All rights reserved to Thrill Innovative Labs.
// THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
// OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
// LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
// FITNESS FOR A PARTICULAR PURPOSE.
//=============================================================================
//*****************************************************************************
//* Name		    	: app.js 
//* Type		    	: Angular JS File
//* Description		    :
//* References		    :
//* Author	    		:
//* Created Date        : 
//*****************************************************************************
//*                             MODIFICATION LOG
//*****************************************************************************
//*  S.No  Ver	     Date	         Modified By			Description

//*****************************************************************************
//*                             Code Review LOG
//*****************************************************************************

//*****************************************************************************
*/

	 var ThrillAssignment = angular.module('ThrillAssignment', ['ui.router',
               'ThrillAssignment.assignment',                                                           
               'ThrillFrameworkLibrary.appLogger',   
               'ThrillAssignment.webSetup'
]);


var   DrawCaptcha=function()
    {
          var d = new Date().getTime();
    if(window.performance && typeof window.performance.now === "function"){
        d += performance.now(); //use high-precision timer if available
    }
    var uuid = 'xxxxxxxx-xxxx-xxxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c=='x' ? r : (r&0x3|0x8)).toString(16);
    });
    referencekey=uuid;
    return uuid;
    } 

DrawCaptcha();


	ThrillAssignment.config(['$stateProvider', '$urlRouterProvider'
		     , function ($stateProvider, $urlRouterProvider) {

                  .state('app.assignment', {
            url: '/Assignment',
            templateUrl: 'Assignment/Web/Views/NewAssignment.html',
                 controller: 'assignmentController'
        })
				
		
				 .state('appSetup', { 
					 url: '/appSetup'
					 , templateUrl: 'Assignment/FirstTimeSetup/FirstTimeSetup.html'
					 , controller: 'AppSetupWebCtrl'
				 })
		 $urlRouterProvider.otherwise('/appSetup');
	 }]);
