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

	 var ThrillInstitute = angular.module('ThrillInstitute', ['ui.router',
        'ThrillInstitute.institute',
         'ThrillInstitute.instituteBoard',  
            'ThrillInstitute.instituteCours',  
              'ThrillInstitute.instituteGroup',
            'ThrillInstitute.instituteElectiveGroup',
              'ThrillInstitute.instituteExaminationType',
              'ThrillInstitute.instituteExamination', 
             'ThrillInstitute.instituteSubject',                                                 
          'ThrillInstitute.instituteTerm',                                                    
       'ThrillInstitute.instituteList',
           'ThrillInstitute.instituteBatch'  ,                                                 
      'ThrillFrameworkLibrary.appLogger',   
         'ThrillInstitute.webSetup'
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


	ThrillInstitute.config(['$stateProvider', '$urlRouterProvider'
		     , function ($stateProvider, $urlRouterProvider) {

		         $stateProvider
		          .state('instituteList', { 
					 url: '/instituteList'
					 , templateUrl: 'Institute/Web/Views/InstituteList.html'
					 , controller: 'instituteListController'
				 })
				
				 .state('newInstitute', { 
					 url: '/newInstitute'
					 , templateUrl: 'Institute/Web/Views/NewInstitute.html'
					 , controller: 'instituteController'
				 })
                 
               .state('institute', { 
					 url: '/institute'
					 , templateUrl: 'Institute/Web/Views/Institute.html'
					
				 })
                 .state('editInstitute/:instituteKey', { 
					 url: '/editInstitute/:instituteKey'
					 , templateUrl: 'Institute/Web/Views/Institute.html'
					
				 })
                 
                   .state('instituteBatch', { 
					 url: '/instituteBatch'
					 , templateUrl: 'Institute/Web/Views/NewInstituteBatch.html'
					, controller: 'instituteBatchController'
				 })
                 .state('editInstituteBatch/:batchKey', { 
					 url: '/editInstituteBatch/:batchKey'
					 , templateUrl: 'Institute/Web/Views/NewInstituteBatch.html'
					, controller: 'instituteBatchController'
				 })
                 
               /*  .state('editInstitute/:instituteKey', { 
					 url: '/editInstitute/:instituteKey'
					 , templateUrl: 'Institute/Web/Views/NewInstitute.html'
					 , controller: 'instituteController'
				 })*/
                 
                  .state('newInstituteBoard', { 
					 url: '/newInstituteBoard'
					 , templateUrl: 'Institute/Web/Views/NewInstituteBoard.html'
					 , controller: 'instituteBoardController'
				 })
                 
                 .state('editInstituteBoard/:instituteKey', { 
					 url: '/editInstituteBoard/:instituteKey'
					 , templateUrl: 'Institute/Web/Views/NewInstituteBoard.html'
					 , controller: 'instituteBoardController'
				 })
                 
                  .state('newInstituteGroup', { 
					 url: '/newInstituteGroup'
					 , templateUrl: 'Institute/Web/Views/NewInstituteGroup.html'
					 , controller: 'instituteGroupController'
				 })
                 .state('editInstituteGroup/:instituteKey', { 
					 url: '/editInstituteGroup/:instituteKey'
					 , templateUrl: 'Institute/Web/Views/NewInstituteGroup.html'
					 , controller: 'instituteGroupController'
				 })
                 
                    .state('newInstituteElectiveGroup', { 
					 url: '/newInstituteElectiveGroup'
					 , templateUrl: 'Institute/Web/Views/NewInstituteElectiveGroup.html'
					 , controller: 'instituteElectiveGroupController'
				 })
                   .state('editInstituteElectiveGroup/:instituteKey', { 
					 url: '/editInstituteElectiveGroup/:instituteKey'
					 , templateUrl: 'Institute/Web/Views/NewInstituteElectiveGroup.html'
					 , controller: 'instituteElectiveGroupController'
				 })
				
				.state('newInstituteCourse', { 
					 url: '/newInstituteCourse'
					 , templateUrl: 'Institute/Web/Views/NewInstituteCourse.html'
					 , controller: 'instituteCoursController'
				 })
                 
                 .state('editInstituteCourse/:instituteKey', { 
					 url: '/editInstituteCourse/:instituteKey'
					 , templateUrl: 'Institute/Web/Views/NewInstituteCourse.html'
					 , controller: 'instituteCoursController'
				 })
                 
                 .state('newInstituteExaminationType', { 
					 url: '/newInstituteExaminationType'
					 , templateUrl: 'Institute/Web/Views/NewInstituteExaminationType.html'
					 , controller: 'instituteExaminationTypeController'
				 })
                 
                 .state('editInstituteExaminationType/:instituteKey', { 
					 url: '/editInstituteExaminationType/:instituteKey'
					 , templateUrl: 'Institute/Web/Views/NewInstituteExaminationType.html'
					 , controller: 'instituteExaminationTypeController'
				 })
                   .state('newInstituteExamination', { 
					 url: '/newInstituteExamination'
					 , templateUrl: 'Institute/Web/Views/NewInstituteExamination.html'
					 , controller: 'instituteExaminationController'
				 })
                 
                 .state('editInstituteExamination/:instituteKey', { 
					 url: '/editInstituteExamination/:instituteKey'
					 , templateUrl: 'Institute/Web/Views/NewInstituteExamination.html'
					 , controller: 'instituteExaminationController'
				 })
				.state('newInstituteTerm', { 
					 url: '/newInstituteTerm'
					 , templateUrl: 'Institute/Web/Views/NewInstituteTerm.html'
					 , controller: 'instituteTermController'
				 })
                 
                 .state('editInstituteTerm/:instituteKey', { 
					 url: '/editInstituteTerm/:instituteKey'
					 , templateUrl: 'Institute/Web/Views/NewInstituteTerm.html'
					 , controller: 'instituteTermController'
				 })
                 
                 .state('newInstituteSubject', { 
					 url: '/newInstituteSubject'
					 , templateUrl: 'Institute/Web/Views/NewInstituteSubject.html'
					 , controller: 'instituteSubjectController'
				 })
                 
                 .state('editInstituteSubject/:instituteKey', { 
					 url: '/editInstituteSubject/:instituteKey'
					 , templateUrl: 'Institute/Web/Views/NewInstituteSubject.html'
					 , controller: 'instituteSubjectController'
				 })
				 .state('appSetup', { 
					 url: '/appSetup'
					 , templateUrl: 'Institute/FirstTimeSetup/FirstTimeSetup.html'
					 , controller: 'AppSetupWebCtrl'
				 })
		 $urlRouterProvider.otherwise('/appSetup');
	 }]);
