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

	 var ThrillAcademic = angular.module('ThrillAcademic', ['ui.router',
        /* 'ngAnimate',
         'ui.bootstrap',*/
		 'ThrillAcademic.board',
		 'ThrillAcademic.boardList',
		/* 'ThrillAcademic.group',
		 'ThrillAcademic.groupList',
		 'ThrillAcademic.cours',
		 'ThrillAcademic.coursList',
		 'ThrillAcademic.term',
		 'ThrillAcademic.termList',
		 'ThrillAcademic.electiveGroup',
		 'ThrillAcademic.electiveGroupList',
		 'ThrillAcademic.subject',
		 'ThrillAcademic.subjectList',
		  */
		 'ThrillAcademic.examinationType',

		 'ThrillAcademic.examinationTypeList',

		 'ThrillAcademic.examination',

		 'ThrillAcademic.examinationList',

		 'ThrillAcademic.subjectMarksRange',

		 'ThrillAcademic.subjectMarksRangeList',

		 'ThrillAcademic.subjectComponent',

		 'ThrillAcademic.subjectComponentList',
		
		 'ThrillAcademic.examScheduleList',
		 'ThrillAcademic.examSchedule',
         'ThrillFrameworkLibrary.appLogger',
          'ThrillAcademic.grade',
           'ThrillAcademic.academicYear',                                                 
                                                            
         'ThrillAcademic.webSetup'
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


	ThrillAcademic.config(['$stateProvider', '$urlRouterProvider'
		     , function ($stateProvider, $urlRouterProvider) {

		         $stateProvider
				 .state('BoardList', { 
					 url: '/BoardList'
					 , templateUrl: 'Academic/Web/Views/BoardList.html'
					 , controller: 'BoardListController'
				 })
				 .state('newBoard', { 
					 url: '/newBoard'
					 , templateUrl: 'Academic/Web/Views/NewBoard.html'
					 , controller: 'BoardController'
				 })
				 .state('editBoard/:boardKey', { 
					 url: '/editBoard/:boardKey'
					 , templateUrl: 'Academic/Web/Views/EditBoard.html'
					 , controller: 'BoardController'
				 })
				 .state('GroupList', { 
					 url: '/GroupList'
					 , templateUrl: 'Academic/Web/Views/GroupList.html'
					 , controller: 'GroupListController'
				 })
				 .state('newGroup', { 
					 url: '/newGroup'
					 , templateUrl: 'Academic/Web/Views/NewGroup.html'
					 , controller: 'GroupController'
				 })
				 .state('editGroup/:groupKey', { 
					 url: '/editGroup/:groupKey'
					 , templateUrl: 'Academic/Web/Views/EditGroup.html'
					 , controller: 'GroupController'
				 })
				 .state('CoursList', { 
					 url: '/CoursList'
					 , templateUrl: 'Academic/Web/Views/CoursList.html'
					 , controller: 'CoursListController'
				 })
				 .state('newCours', { 
					 url: '/newCours'
					 , templateUrl: 'Academic/Web/Views/NewCours.html'
					 , controller: 'CoursController'
				 })
				 .state('editCours/:coursKey', { 
					 url: '/editCours/:coursKey'
					 , templateUrl: 'Academic/Web/Views/EditCours.html'
					 , controller: 'CoursController'
				 })
				 .state('TermList', { 
					 url: '/TermList'
					 , templateUrl: 'Academic/Web/Views/TermList.html'
					 , controller: 'TermListController'
				 })
				 .state('newTerm', { 
					 url: '/newTerm'
					 , templateUrl: 'Academic/Web/Views/NewTerm.html'
					 , controller: 'TermController'
				 })
				 .state('editTerm/:termKey', { 
					 url: '/editTerm/:termKey'
					 , templateUrl: 'Academic/Web/Views/EditTerm.html'
					 , controller: 'TermController'
				 })
				 .state('ElectiveGroupList', { 
					 url: '/ElectiveGroupList'
					 , templateUrl: 'Academic/Web/Views/ElectiveGroupList.html'
					 , controller: 'ElectiveGroupListController'
				 })
				 .state('newElectiveGroup', { 
					 url: '/newElectiveGroup'
					 , templateUrl: 'Academic/Web/Views/NewElectiveGroup.html'
					 , controller: 'ElectiveGroupController'
				 })
				 .state('editElectiveGroup/:electiveGroupKey', { 
					 url: '/editElectiveGroup/:electiveGroupKey'
					 , templateUrl: 'Academic/Web/Views/EditElectiveGroup.html'
					 , controller: 'ElectiveGroupController'
				 })
				 .state('SubjectList', { 
					 url: '/SubjectList'
					 , templateUrl: 'Academic/Web/Views/SubjectList.html'
					 , controller: 'SubjectListController'
				 })
				 .state('newSubject', { 
					 url: '/newSubject'
					 , templateUrl: 'Academic/Web/Views/NewSubject.html'
					 , controller: 'SubjectController'
				 })
				 .state('editSubject/:subjectKey', { 
					 url: '/editSubject/:subjectKey'
					 , templateUrl: 'Academic/Web/Views/EditSubject.html'
					 , controller: 'SubjectController'
				 })
				 .state('ExaminationTypeList', { 
					 url: '/ExaminationTypeList'
					 , templateUrl: 'Academic/Web/Views/ExaminationTypeList.html'
					 , controller: 'ExaminationTypeListController'
				 })
				 .state('newExaminationType', { 
					 url: '/newExaminationType'
					 , templateUrl: 'Academic/Web/Views/NewExaminationType.html'
					 , controller: 'ExaminationTypeController'
				 })
				 .state('editExaminationType/:examinationTypeKey', { 
					 url: '/editExaminationType/:examinationTypeKey'
					 , templateUrl: 'Academic/Web/Views/NewExaminationType.html'
					 , controller: 'ExaminationTypeController'
				 })
				 .state('ExaminationList', { 
					 url: '/ExaminationList'
					 , templateUrl: 'Academic/Web/Views/ExaminationList.html'
					 , controller: 'ExaminationListController'
				 })
				 .state('newExamination', { 
					 url: '/newExamination'
					 , templateUrl: 'Academic/Web/Views/NewExamination.html'
					 , controller: 'ExaminationController'
				 })
				 .state('editExamination/:examinationKey', { 
					 url: '/editExamination/:examinationKey'
					 , templateUrl: 'Academic/Web/Views/NewExamination.html'
					 , controller: 'ExaminationController'
				 })
				 .state('SubjectMarksRangeList', { 
					 url: '/SubjectMarksRangeList'
					 , templateUrl: 'Academic/Web/Views/SubjectMarksRangeList.html'
					 , controller: 'SubjectMarksRangeListController'
				 })
				 .state('newSubjectMarksRange', { 
					 url: '/newSubjectMarksRange'
					 , templateUrl: 'Academic/Web/Views/NewSubjectMarksRange.html'
					 , controller: 'SubjectMarksRangeController'
				 })
				 .state('editSubjectMarksRange/:subjectMarksRangeKey', { 
					 url: '/editSubjectMarksRange/:subjectMarksRangeKey'
					 , templateUrl: 'Academic/Web/Views/NewSubjectMarksRange.html'
					 , controller: 'SubjectMarksRangeController'
				 })
				 .state('SubjectComponentList', { 
					 url: '/SubjectComponentList'
					 , templateUrl: 'Academic/Web/Views/SubjectComponentList.html'
					 , controller: 'SubjectComponentListController'
				 })
				 .state('newSubjectComponent', { 
					 url: '/newSubjectComponent'
					 , templateUrl: 'Academic/Web/Views/NewSubjectComponent.html'
					 , controller: 'SubjectComponentController'
				 })
				 .state('editSubjectComponent/:subjectComponentKey', { 
					 url: '/editSubjectComponent/:subjectComponentKey'
					 , templateUrl: 'Academic/Web/Views/NewSubjectComponent.html'
					 , controller: 'SubjectComponentController'
				 })
				 .state('ExamScheduleList', { 
					 url: '/ExamScheduleList'
					 , templateUrl: 'Academic/Web/Views/ExamScheduleList.html'
					 , controller: 'ExamScheduleListController'
				 })
				 .state('newExamSchedule', { 
					 url: '/newExamSchedule'
					 , templateUrl: 'Academic/Web/Views/NewExamSchedule.html'
					 , controller: 'ExamScheduleController'
				 })
				 .state('editExamSchedule/:examScheduleKey', { 
					 url: '/editExamSchedule/:examScheduleKey'
					 , templateUrl: 'Academic/Web/Views/NewExamSchedule.html'
					 , controller: 'ExamScheduleController'
				 })
                 
          .state('newAacademicYear', {
                url: '/newAacademicYear',
                templateUrl: 'Academic/Web/Views/NewAcademicYear.html',
                controller: 'AcademicYearController'
            })

 .state('editAacademicYear/:yearKey', { 
					 url: '/editAacademicYear/:yearKey'
					 ,    templateUrl: 'Academic/Web/Views/NewAcademicYear.html'
					 , controller: 'AcademicYearController'
				 })       
                 
                 

 .state('app.Grades', {
                url: '/Grades',
                templateUrl: 'Academic/Web/Views/Grades.html',
                controller: 'GradeController'
            })

 .state('editGrade/:gradeKey', { 
					 url: '/editGrade/:gradeKey'
					 , templateUrl: 'Academic/Web/Views/Grades.html'
					 , controller: 'GradeController'
				 })


				 .state('appSetup', { 
					 url: '/appSetup'
					 , templateUrl: 'Academic/FirstTimeSetup/FirstTimeSetup.html'
					 , controller: 'AppSetupWebCtrl'
				 })
		 $urlRouterProvider.otherwise('/appSetup');
	 }]);
