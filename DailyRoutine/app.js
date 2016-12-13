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

	 var ThrillDailyRoutine = angular.module('ThrillDailyRoutine', ['ui.router',
       'ThrillDailyRoutine.dailyRoutine',
         'ThrillDailyRoutine.assign',                                                           
        'ThrillDailyRoutine.newDailyRoutine', 
      'ThrillFrameworkLibrary.appLogger',   
         'ThrillDailyRoutine.webSetup'
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


	ThrillDailyRoutine.config(['$stateProvider', '$urlRouterProvider'
		     , function ($stateProvider, $urlRouterProvider) {

		         $stateProvider
                 .state('app.dailyRoutine', {
            url: '/DailyRoutine',
            templateUrl: 'DailyRoutine/Web/Views/DailyRoutine.html'
               
        })

         .state('app.daily', {
            url: '/Daily',
            templateUrl: 'DailyRoutine/Web/Views/Daily.html',
                 controller: 'dailyRoutineController'
        })
          .state('app.newDaily', {
            url: '/NewDaily',
            templateUrl: 'DailyRoutine/Web/Views/NewDaily.html',
                 controller: 'newDailyRoutineController'
        })
                  .state('app.assign', {
            url: '/Assign',
            templateUrl: 'DailyRoutine/Web/Views/AssignClassTeacher.html',
                 controller: 'assignController'
        })
				
		
				 .state('appSetup', { 
					 url: '/appSetup'
					 , templateUrl: 'DailyRoutine/FirstTimeSetup/FirstTimeSetup.html'
					 , controller: 'AppSetupWebCtrl'
				 })
		 $urlRouterProvider.otherwise('/appSetup');
	 }]);
