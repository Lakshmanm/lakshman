'use strict';
/**
 * Config for the router
 */
var DrawCaptcha = function () {
    var d = new Date().getTime();
    if (window.performance && typeof window.performance.now === "function") {
        d += performance.now(); //use high-precision timer if available
    }
    var uuid = 'xxxxxxxx-xxxx-xxxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    //referencekey=uuid;
    //return uuid;
    return '12344'
}
DrawCaptcha();

 var correctDate = function(idate)
{

   var d1 = new Date(idate.getTime() + 1 * 86400000);

  return d1;

}




app.directive('newAacademicYear', function () {
    return {
        templateUrl: 'Academic/Web/Views/NewAcademicYear.html'
        , controller: 'AcademicYearController'
    }
})
app.directive("teamMember", function () {
    return {
        templateUrl: "3ilAppBase01/Web/assets/views/NewTeamMember.html"
        , controller: 'TeamTeamMemberController'
    , }
});
app.directive('board', function () {
    return {
        templateUrl: 'Academic/Web/Views/NewBoard.html'
        , controller: 'BoardController'
    }
});
app.directive('course', function () {
    return {
        templateUrl: 'Academic/Web/Views/NewCours.html'
        , controller: 'CoursController'
    }
});
app.directive('electiveGroup', function () {
    return {
        templateUrl: 'Academic/Web/Views/NewElectiveGroup.html'
        , controller: 'ElectiveGroupController'
    }
});
app.directive('examinationType', function () {
    return {
        templateUrl: 'Academic/Web/Views/NewExaminationType.html'
        , controller: 'ExaminationTypeController'
    }
});
app.directive('subject', function () {
    return {
        templateUrl: 'Academic/Web/Views/NewSubject.html'
        , controller: 'SubjectController'
    }
});
app.directive('examination', function () {
    return {
        templateUrl: 'Academic/Web/Views/NewExamination.html'
        , controller: 'ExaminationController'
    }
});
app.directive('examSchedule', function () {
    return {
        templateUrl: 'Academic/Web/Views/NewExamSchedule.html'
        , controller: 'ExamScheduleController'
    }
});
app.directive('group', function () {
    return {
        templateUrl: 'Academic/Web/Views/NewGroup.html'
        , controller: 'GroupController'
    }
});
app.directive('subjectComponent', function () {
    return {
        templateUrl: 'Academic/Web/Views/NewSubjectComponent.html'
        , controller: 'SubjectComponentController'
    }
});
app.directive('subjectMarksRange', function () {
    return {
        templateUrl: 'Academic/Web/Views/NewSubjectMarksRange.html'
        , controller: 'SubjectMarksRangeController'
    }
});
app.directive('term', function () {
    return {
        templateUrl: 'Academic/Web/Views/NewTerm.html'
        , controller: 'TermController'
    }
});
app.directive('grade', function () {
    return {
        templateUrl: 'Academic/Web/Views/Grades.html'
        , controller: 'GradeController'
    }
});
app.directive('test', function () {
    return {
        templateUrl: "3ilAppBase01/Web/assets/views/StudentAddition.html"
        , controller: "Aarush.StudentAddition"
    }
});
app.directive('education', function () {
    return {
        templateUrl: "3ilAppBase01/Web/assets/views/PastEducation.html"
        , controller: "Aarush.personEducation"
    }
});
app.directive('family', function () {
    return {
        templateUrl: "3ilAppBase01/Web/assets/views/PersonRelative.html"
        , controller: "Aarush.personRelative"
    }
});
app.directive('bank', function () {
    return {
        templateUrl: "3ilAppBase01/Web/assets/views/PersonBank.html"
        , controller: "Aarush.personBank"
    }
});
app.directive('award', function () {
    return {
        templateUrl: "3ilAppBase01/Web/assets/views/PersonAward.html"
        , controller: "Aarush.personAward"
    }
});
app.directive('address', function () {
    return {
        templateUrl: "3ilAppBase01/Web/assets/views/Address.html"
        , controller: "Aarush.address"
    , }
});
app.directive('health', function () {
    return {
        templateUrl: "3ilAppBase01/Web/assets/views/healthInfo.html"
        , controller: "PersonDemographicsController"
    , }
});
app.directive('insurance', function () {
    return {
        templateUrl: "3ilAppBase01/Web/assets/views/PersonInsurance.html", //controller:'StudentController',
        controller: "PersonInsuranceController"
    , }
});
app.directive('demographics', function () {
    return {
        templateUrl: "3ilAppBase01/Web/assets/views/PersonDemographics.html", //controller:'StudentController',
        controller: "PersonDemographicsController"
    , }
});
app.directive('vaccination', function () {
    return {
        templateUrl: "3ilAppBase01/Web/assets/views/PersonVaccination.html", //controller:'StudentController',
        controller: "PersonVaccinationController"
    , }
});
app.directive('activity', function () {
    return {
        templateUrl: "3ilAppBase01/Web/assets/views/PersonCurricularActivities.html", //controller:'StudentController',
        controller: "ThrillMcampuz.personCurricularActivity"
    , }
});
app.directive('reference', function () {
    return {
        templateUrl: "3ilAppBase01/Web/assets/views/PersonReferences.html", //controller:'StudentController',
        controller: 'ThrillMcampuz.personReferences'
    , }
});
app.directive('elocker', function () {
    return {
        templateUrl: "3ilAppBase01/Web/assets/views/ELocker.html", //controller:'StudentController',
        controller: 'ThrillMcampuz.personElocker'
    , }
});
app.directive('notes', function () {
    return {
        templateUrl: "3ilAppBase01/Web/assets/views/PersonNotes.html", //controller:'StudentController',
        controller: 'ThrillMcampuz.personNotes'
    , }
});
app.directive('blank', function () {
    return {
        templateUrl: "3ilAppBase01/Web/assets/views/Blank.html", //controller:'StudentController',
        controller: "PersonVaccinationController"
    , }
});
app.directive('diseases', function () {
    return {
        templateUrl: "3ilAppBase01/Web/assets/views/PersonDisease.html", //controller:'StudentController',
        controller: "PersonDiseaseController"
    , }
});
app.directive('basic', function () {
    return {
        templateUrl: "3ilAppBase01/Web/assets/views/StaffAddition.html"
        , controller: "Aarush.StaffAddition"
    }
});

app.directive('ebasic', function () {
    return {
        templateUrl: '3ilAppBase01/Web/assets/views/EnrollmentBasicInfo.html'
        , controller: 'Aarush.StudentEnrollment'
    }
});

app.directive('enumber', function () {
    return {
        templateUrl: '3ilAppBase01/Web/assets/views/EnrollmentNumber.html'
        , controller: 'Aarush.entrollmentNumber'
    }
});

 app.directive('start', function() {
    return {
      templateUrl: "3ilAppBase01/Web/assets/views/Start.html",
           controller: "Aarush.StudentEnrollment"
  }
});

 app.directive('complete', function() {
    return {
     templateUrl: "3ilAppBase01/Web/assets/views/Complete.html",
     controller: "Aarush.StudentEnrollment",  
    }
 });


app.directive('instituteNew', function () {
    return {
        templateUrl: 'Institute/Web/Views/NewInstitute.html'
        , controller: 'instituteController'
    }
});
app.directive('instituteBoard', function () {
    return {
        templateUrl: 'Institute/Web/Views/NewInstituteBoard.html'
        , controller: 'instituteBoardController'
    }
});
app.directive('instituteCourse', function () {
    return {
        templateUrl: 'Institute/Web/Views/NewInstituteCourse.html'
        , controller: 'instituteCoursController'
    }
});
app.directive('instituteGroup', function () {
    return {
        templateUrl: 'Institute/Web/Views/NewInstituteGroup.html'
        , controller: 'instituteGroupController'
    }
});
app.directive('instituteElectiveGroup', function () {
    return {
        templateUrl: 'Institute/Web/Views/NewInstituteElectiveGroup.html'
        , controller: 'instituteElectiveGroupController'
    }
});
app.directive('instituteTerm', function () {
    return {
        templateUrl: 'Institute/Web/Views/NewInstituteTerm.html'
        , controller: 'instituteTermController'
    }
});
app.directive('instituteExaminationType', function () {
    return {
        templateUrl: 'Institute/Web/Views/NewInstituteExaminationType.html'
        , controller: 'instituteExaminationTypeController'
    }
});
app.directive('instituteExamination', function () {
    return {
        templateUrl: 'Institute/Web/Views/NewInstituteExamination.html'
        , controller: 'instituteExaminationController'
    }
});
app.directive('instituteSubject', function () {
    return {
        templateUrl: 'Institute/Web/Views/NewInstituteSubject.html'
        , controller: 'instituteSubjectController'
    }
});
app.directive('instituteLeave', function () {
    return {
        templateUrl: 'Institute/Web/Views/NewLeaveType.html'
        , controller: 'leaveTypeController'
    }
});
app.directive('installments', function () {
    return {
        templateUrl: 'Fee/Web/Views/InstallmentPlans.html'
        , controller: 'InstallmentPlans'
    }
});
app.directive('serviceCategory', function () {
    return {
        templateUrl: 'Fee/Web/Views/ServiceCategory.html'
        , controller: 'ServiceCategory'
    }
});
app.directive('services', function () {
    return {
        templateUrl: 'Fee/Web/Views/Services.html'
        , controller: 'ServicesController'
    }
});
app.directive('experiance', function () {
    return {
        templateUrl: "3ilAppBase01/Web/assets/views/Experience.html"
        , controller: "Aarush.experience"
    , }
});
// app.directive('start', function() {
//     return {
//      templateUrl: "3ilAppBase01/Web/assets/views/Start.html",
//             controller: "mcampuz.start",
//     }
// });
// app.directive('enrollmentBasic', function() {
//     return {
//      templateUrl: "3ilAppBase01/Web/assets/views/EnrollmentBasicInfo.html",
//             controller: "Aarush.StudentEnrollment",
//     }
// });
// app.directive('complete', function() {
//     return {
//      templateUrl: "3ilAppBase01/Web/assets/views/Complete.html",
//      controller: "Aarush.entrollmentNumber",  
//     }
// });
app.directive('daily', function () {
    return {
        templateUrl: 'DailyRoutine/Web/Views/Daily.html'
        , controller: 'dailyRoutineController'
    , }
});
app.directive('assign', function () {
    return {
        templateUrl: 'DailyRoutine/Web/Views/AssignClassTeacher.html'
        , controller: 'assignController'
    }
});
// app.directive('enrollmentNumber', function() {
//     return {
//      templateUrl: "3ilAppBase01/Web/assets/views/EnrollmentNumber.html",
//          controller: "Aarush.entrollmentNumber",  
//     }
// });
app.directive('instituteBatch', function () {
    return {
        templateUrl: 'Institute/Web/Views/NewInstituteBatch.html'
        , controller: 'instituteBatchController'
    }
})
app.directive('tax', function () {
    return {
        templateUrl: 'Fee/Web/Views/Tax.html'
        , controller: 'TaxController'
    }
});
app.directive('studentNew', function () {
    return {
        templateUrl: '3ilAppBase01/Web/assets/views/Attendance.html'
        , controller: 'mcampuz.attendance'
    }
});
app.directive('staffNew', function () {
    return {
        templateUrl: '3ilAppBase01/Web/assets/views/StaffAttendance.html'
        , controller: 'mcampuz.staffattendance'
    }
});
app.config(['$stateProvider', '$urlRouterProvider', '$controllerProvider', '$compileProvider', '$filterProvider', '$provide', '$ocLazyLoadProvider', 'JS_REQUIRES'

    
    , function ($stateProvider, $urlRouterProvider, $controllerProvider, $compileProvider, $filterProvider, $provide, $ocLazyLoadProvider, jsRequires, $route) {
        app.controller = $controllerProvider.register;
        app.directive = $compileProvider.directive;
        app.filter = $filterProvider.register;
        app.factory = $provide.factory;
        app.service = $provide.service;
        app.constant = $provide.constant;
        app.value = $provide.value;
        // LAZY MODULES
        $ocLazyLoadProvider.config({
            debug: false
            , events: true
            , modules: jsRequires.modules
        });
        // APPLICATION ROUTES
        // -----------------------------------
        // For any unmatched url, redirect to /app/dashboard
        $urlRouterProvider.otherwise("/NewOrg");
        // $urlRouterProvider.otherwise("/signin");
        //
        // Set up the states
        $stateProvider.state('app', {
                url: "/app"
                , templateUrl: "3ilAppBase01/Web/assets/views/app.html", //resolve: loadSequence('chartjs', 'chart.js', 'chatCtrl'),
                abstract: true
            }).state('app.medication', {
                url: "/app/medication"
                , templateUrl: "3ilAppBase01/Web/assets/views/MedicationList.html"
                    //resolve: loadSequence('ngTable', 'ChildController')
                    //resolve: loadSequence('flow', 'userCtrl')
            }).state('app.investigation', {
                url: "/app/investigation"
                , templateUrl: "3ilAppBase01/Web/assets/views/InvestigationList.html"
                    //resolve: loadSequence('ngTable', 'ChildController')
                    //resolve: loadSequence('flow', 'userCtrl')
            }).state('app.childrens', {
                url: "/app/childrens"
                , templateUrl: "3ilAppBase01/Web/assets/views/PatientDetails.html"
                , controller: "ChildrenListController"
                    //resolve: loadSequence('ngTable', 'ChildController')
                    //resolve: loadSequence('flow', 'userCtrl')
            })
            //            .state('app.appointments', {
            //                url: "/app/appointments"
            //                , templateUrl: "3ilAppBase01/Web/assets/views/Appointments.html"
            //                , controller: "AppointmentController"
            //                , ncyBreadcrumb: {
            //                    label: 'Appointments'
            //                }
            //                , resolve: loadSequence('mwl.calendar', 'AppointmentController')
            //                    //resolve: loadSequence('ngTable', 'ChildController')
            //                    //resolve: loadSequence('flow', 'userCtrl')
            //            })
            .state('app.appointments', {
                url: "/appointments"
                , templateUrl: "CalendarNotifications/Web/Views/DashBoardUser.html"
                , controller: "DashBoardControllerUser"
                    //resolve: loadSequence('ngTable', 'ChildController')
                    //resolve: loadSequence('flow', 'userCtrl')
            }).state('app.calendar', {
                url: "/calendar"
                , templateUrl: "CalendarNotifications/Web/Views/DashBoard.html"
                , controller: "DashBoardController"
                    //resolve: loadSequence('ngTable', 'ChildController')
                    //resolve: loadSequence('flow', 'userCtrl')
            }).state('app.experience', {
                url: '/experience'
                , templateUrl: "3ilAppBase01/Web/assets/views/Experience.html"
                , controller: "Aarush.experience"
                , ncyBreadcrumb: {
                    label: 'Experience'
                }
            }).state('app.CNUserProfile', {
                url: '/CNUserProfile'
                , templateUrl: 'CalendarNotifications/Web/Views/CNUserProfile.html'
                , controller: 'CNUserProfileController'
            }).state('app.NotificationSettings', {
                url: '/NotificationSettings'
                , templateUrl: 'CalendarNotifications/Web/Views/NotificationSettings.html'
                , title: 'Notification Settings'
                , ncyBreadcrumb: {
                    label: 'Notification Settings'
                }
                , resolve: loadSequence('ckeditor-plugin', 'ckeditor')
                , controller: 'NotificationSettingsController'
            }).state('app.CreateCalendar', {
                url: '/app/CreateCalendar'
                , templateUrl: 'CalendarNotifications/Web/Views/CreateCalendar.html'
                , controller: 'CreateCalendarController'
            }).state('app.EditCalendar', {
                url: '/EditCalendar'
                , templateUrl: 'CalendarNotifications/Web/Views/EditCalendar.html'
                , controller: 'EditCalendarController'
            }).state('app.createappointment', {
                url: '/app/createappointment'
                , templateUrl: 'CalendarNotifications/Web/Views/CreateEvent.html'
                , controller: 'CreateEventController'
            }).state('app.editappointment', {
                url: '/editappointment'
                , templateUrl: 'CalendarNotifications/Web/Views/EditEvent.html'
                , controller: 'EditEventController'
            }).state('app.createevent', {
                url: '/createevent'
                , templateUrl: 'CalendarNotifications/Web/Views/CreateTask.html'
                , controller: 'CreateTaskController'
            }).state('app.editevent', {
                url: '/editevent'
                , templateUrl: 'CalendarNotifications/Web/Views/EditTask.html'
                , controller: 'EditTaskController'
            }).state('app.EventResponse', {
                url: '/EventResponse/{id1:[0-9]+}/{id2:[0-9]+}/{id3:[0-9]+}'
                , templateUrl: 'CalendarNotifications/Web/Views/EventResponse.html'
                , controller: 'EventResponseController'
            }).state('app.child', {
                url: "/app/child"
                , templateUrl: "3ilAppBase01/Web/assets/views/Child.html"
                , controller: "ChildController"
                    //resolve: loadSequence('ngTable', 'ChildController')
                    //resolve: loadSequence('flow', 'userCtrl')
            }).state('app.childpersondetails', {
                url: "/childpersondetails"
                , templateUrl: "3ilAppBase01/Web/assets/views/childPerson.html"
                , controller: "childPersonController"
                    //resolve: loadSequence('ngTable', 'ChildController')
                    //resolve: loadSequence('flow', 'userCtrl')
            })
        .state('app.personSettings', {
                url: "/personsettings"
                , templateUrl: "3ilAppBase01/Web/assets/views/PersonSettings.html"
                , controller: "personSettingsController"
                , ncyBreadcrumb: {
                               label: 'Account Settings'
                           }
                  
            })
 .state('app.generalSettings', {
                url: "/generalSettings"
                , templateUrl: "3ilAppBase01/Web/assets/views/GeneralSettings.html"
                , controller: "generalSettingsController"
                , ncyBreadcrumb: {
                               label: 'General Settings'
                           }
                  
            })


            /*state('app.staffadd', {
                           url: '/staffadd'
                           , templateUrl: "3ilAppBase01/Web/assets/views/StaffAddition.html"
                           , controller: "Aarush.StaffAddition"
                           , ncyBreadcrumb: {
                               label: 'Satff'
                           }
                       })
                       .*/
            //Assignment--->
            .state('app.assignmentList', {
                url: '/AssignmentList',
                templateUrl: 'Assignment/Web/Views/AssignmentList.html',
                controller: 'assignmentListController',
                ncyBreadcrumb: {
                               label: 'Assignment List'
                           }
            }).state('app.assignment', {
                url: '/newAssignment'
                , templateUrl: 'Assignment/Web/Views/NewAssignment.html'
                , controller: 'assignmentController'
            }).state('app.editStudentAssignment/:assignmentKey/:branchKey', {
                url: '/editStudentAssignment/:assignmentKey/:branchKey'
                , templateUrl: 'Assignment/Web/Views/EditStudentAssignment.html'
                , controller: 'assignmentController'
            }).state('app.editStaffAssignment/:assignmentKey/:branchKey', {
                url: '/editStaffAssignment/:assignmentKey/:branchKey'
                , templateUrl: 'Assignment/Web/Views/EditStaffAssignment.html'
                , controller: 'assignmentController'
            }).state('app.assignmentView', {
                url: '/assignmentView'
                , templateUrl: 'Assignment/Web/Views/AssignmentView.html'
                , controller: 'assignmentListController'
            })
            //Daily Routine-->
            .state('app.daily', {
                url: '/Daily',
                templateUrl: 'DailyRoutine/Web/Views/Daily.html',
                controller: 'dailyRoutineController',
                ncyBreadcrumb: {
                    label: 'Daily Routine'
                }
            }).state('app.newDaily', {
                url: '/NewDaily'
                , templateUrl: 'DailyRoutine/Web/Views/NewDaily.html'
                , controller: 'newDailyRoutineController'
            }).state('app.assign', {
                url: '/Assign'
                , templateUrl: 'DailyRoutine/Web/Views/AssignClassTeacher.html'
                , controller: 'assignController'
            }).state('app.child/:childId', {
                url: "/app/child/:childId"
                , templateUrl: "3ilAppBase01/Web/assets/views/Child.html"
                , controller: "ChildController"
                    //resolve: loadSequence('ngTable', 'ChildController')
                    //resolve: loadSequence('flow', 'userCtrl')
            }).state('organizationList', {
                url: '/organizationList'
                , templateUrl: "3ilAppBase01/Web/assets/views/OrganizationList.html"
                , controller: "ThrillAppBase.OrganizationRegister"
                , ncyBreadcrumb: {
                    label: 'Organization'
                }
            }).state('app.DesignationList', {
                url: '/DesignationList'
                , templateUrl: '3ilAppBase01/Web/assets/views/DesignationList.html'
                , controller: 'DesignationListController'
            }).state('app.newDesignation', {
                url: '/newDesignation'
                , templateUrl: '3ilAppBase01/Web/assets/views/NewDesignation.html'
                , controller: 'DesignationController'
                , ncyBreadcrumb: {
                    label: 'New Designation'
                }
            }).state('app.editDesignation/:designationKey', {
                url: '/editDesignation/:designationKey'
                , templateUrl: '3ilAppBase01/Web/assets/views/EditDesignation.html'
                , controller: 'DesignationController'
                , ncyBreadcrumb: {
                    label: 'Edit Designation'
                }
            }).state('EditOrganization/:ReferenceKey', {
                url: '/EditOrganization/:ReferenceKey'
                , templateUrl: '3ilAppBase01/Web/assets/views/EditOrganization.html'
                , controller: 'ThrillAppBase.EditOrg'
                , ncyBreadcrumb: {
                    label: 'Organization Activation'
                }
            }).state('app.SpecializationList', {
                url: '/SpecializationList'
                , templateUrl: '3ilAppBase01/Web/assets/views/SpecializationList.html'
                , controller: 'SpecializationListController'
            }).state('app.newSpecialization', {
                url: '/newSpecialization'
                , templateUrl: '3ilAppBase01/Web/assets/views/NewSpecialization.html'
                , controller: 'SpecializationController'
                , ncyBreadcrumb: {
                    label: 'New Specialization'
                }
            }).state('app.branchType', {
                url: '/branchType'
                , templateUrl: '3ilAppBase01/Web/assets/views/BranchType.html'
                , controller: 'BranchTypeController'
            }).state('app.editBranchType/:branchTypeKey', {
                url: '/editBranchType/:branchTypeKey'
                , templateUrl: '3ilAppBase01/Web/assets/views/BranchType.html'
                , controller: 'BranchTypeController'
            }).state('app.branchTypeList', {
                url: '/branchTypeList'
                , templateUrl: '3ilAppBase01/Web/assets/views/BranchTypetList.html'
                , controller: 'BranchTypeListController'
            }).state('app.editSpecialization/:specializationKey', {
                url: '/editSpecialization/:specializationKey'
                , templateUrl: '3ilAppBase01/Web/assets/views/EditSpecialization.html'
                , controller: 'SpecializationController'
                , ncyBreadcrumb: {
                    label: 'Edit Specialization'
                }
            }).state('NewOrg', {
                url: '/NewOrg'
                , templateUrl: "3ilAppBase01/Web/assets/views/OrganizationRegistration.html"
                , controller: "OrganizationController"
                    /*, ncyBreadcrumb: {
                        label: 'Organization'
                    }*/
            }).state('app.Organization', {
                url: "/Organization"
                , templateUrl: "3ilAppBase01/Web/assets/views/Organization.html", // resolve: loadSequence('d3', 'ui.knob', 'countTo', 'dashboardCtrl'),
                title: 'Organization'
                , ncyBreadcrumb: {
                    label: 'Organization'
                }
            }).state('app.subOrganization', {
                url: '/subOrganization'
                , templateUrl: "3ilAppBase01/Web/assets/views/subOrganization.html"
                , controller: "SubOrganizationController"
                , ncyBreadcrumb: {
                    label: 'New Branch'
                }
            }).state('app.subOrganization/:subOrganizationKey', {
                url: '/subOrganization/:subOrganizationKey'
                , templateUrl: "3ilAppBase01/Web/assets/views/subOrganization.html"
                , controller: "SubOrganizationController"
                , ncyBreadcrumb: {
                    label: 'Edit Branch'
                }
            }).state('app.SubOrganizationlist', {
                url: '/SubOrganizationlist'
                , controller: "SubOrganizationListController"
                , templateUrl: "3ilAppBase01/Web/assets/views/SubOrganizationlist.html"
                , ncyBreadcrumb: {
                    label: 'Branches'
                }
            }).state('app.department/branch/:branchKey/:departmentKey', {
                url: '/department/branch/:branchKey/:departmentKey'
                , templateUrl: "3ilAppBase01/Web/assets/views/Department.html"
                , controller: "DepartmentController"
                , ncyBreadcrumb: {
                    label: 'Edit Department'
                }
            }).state('app.departmentList', {
                url: '/departmentList'
                , templateUrl: "3ilAppBase01/Web/assets/views/DepartmentList.html"
                , controller: "DepartmentListController"
                , ncyBreadcrumb: {
                    label: 'Departments'
                }
            }).state('app.teamList', {
                url: '/teamList'
                , templateUrl: "3ilAppBase01/Web/assets/views/TeamList.html"
                , controller: "TeamListController"
                , ncyBreadcrumb: {
                    label: 'Team'
                }
            }).state('app.newAacademicYear', {
                url: '/newAacademicYear'
                , templateUrl: 'Academic/Web/Views/NewAcademicYear.html'
                , controller: 'AcademicYearController'
            }).state('app.editAacademicYear/:yearKey', {
                url: '/editAacademicYear/:yearKey'
                , templateUrl: 'Academic/Web/Views/NewAcademicYear.html'
                , controller: 'AcademicYearController'
            }).state('app.newTeam', {
                url: '/newTeam'
                , templateUrl: '3ilAppBase01/Web/assets/views/NewTeam.html'
                , controller: 'TeamController'
            }).state('app.editTeam/:teamKey', {
                url: '/editTeam/:teamKey'
                , templateUrl: '3ilAppBase01/Web/assets/views/EditTeam.html'
                , controller: 'TeamController'
            }).state('app.teamRoleList', {
                url: '/teamRoleList'
                , templateUrl: "3ilAppBase01/Web/assets/views/TeamRoleList.html"
                , controller: "TeamRoleListController"
            , }).state('app.newTeamRole', {
                url: '/newTeamRole'
                , templateUrl: '3ilAppBase01/Web/assets/views/NewTeamRole.html'
                , controller: 'TeamRoleController'
            }).state('app.editTeamRole/:teamRoleKey', {
                url: '/editTeamRole/:teamRoleKey'
                , templateUrl: '3ilAppBase01/Web/assets/views/EditTeamRole.html'
                , controller: 'TeamRoleController'
            }).state('app.Calendarsettings', {
                url: '/Calendarsettings'
                , templateUrl: "3ilAppBase01/Web/assets/views/Calender.html"
                , controller: "Aarush.CalenderSetting"
            }).state('app.Clinicalpreferences', {
                url: '/Clinicalpreferences'
                , templateUrl: "3ilAppBase01/Web/assets/views/clinicalPrefences.html"
                , controller: "Aarush.clinicalPreferenceController"
                , ncyBreadcrumb: {
                    label: 'Clinical Preferences'
                }
            }).state('app.communication', {
                url: '/communication'
                , templateUrl: "3ilAppBase01/Web/assets/views/Communication.html"
                , controller: "Aarush.Communication"
            }).state('newPassword/:ID', {
                url: '/newPassword/:ID'
                , templateUrl: "3ilAppBase01/Web/assets/views/NewPassword.html"
                , controller: "ForgotPasswordController"
            })
            .state('app.changePassword', {
                url: '/changePassword',
                templateUrl: "3ilAppBase01/Web/assets/views/ChangePassword.html",
                controller: "ChangePasswordController",
                 ncyBreadcrumb: {
                    label: 'Change Password'
                }
            })

               .state('app.RolePassword/:Referencekey', {
                url: '/RolePassword/:Referencekey',
                templateUrl: "3ilAppBase01/Web/assets/views/RolePassword.html",
                controller: "RolePasswordController",
                 ncyBreadcrumb: {
                    label: 'Change Password'
                }
            })

            /*  .state('organizationRegistration/person', {
                  url: '/organizationRegistration'
                  , templateUrl: "3ilAppBase01/Web/assets/views/login_registration.html"
                  
              })*/
            .state('app.stafflist', {
                url: '/stafflist'
                , templateUrl: "3ilAppBase01/Web/assets/views/StaffList.html"
                , controller: "Aarush.Stafflist"
                , ncyBreadcrumb: {
                    label: 'StaffList'
                }
            }).state('app.Aarushhome', {
                url: '/Aarushhome'
                , templateUrl: "3ilAppBase01/Web/assets/views/AarushHomepage.html"
                , controller: "Aarush.Homepage"
            }).state('app.HelpDeskconfirmtion', {
                url: '/HelpDeskconfirmtion'
                , templateUrl: "3ilAppBase01/Web/assets/views/HelpDeskconfirmtion.html"
                , controller: "Aarush.HelpDeskconfirmtion"
                , ncyBreadcrumb: {
                    label: 'Helpdesk Organization List'
                }
            }).
        state('app.staffadd', {
                url: '/staffadd'
                , templateUrl: "3ilAppBase01/Web/assets/views/StaffAddition.html"
                , controller: "StaffController"
                , ncyBreadcrumb: {
                    label: 'Satff'
                }
            }).state('app.instituteBatch', {
                url: '/app/instituteBatch'
                , templateUrl: 'Institute/Web/Views/NewInstituteBatch.html'
                , controller: 'instituteBatchController'
            }).state('app.editInstituteBatch/:batchKey', {
                url: '/app/editInstituteBatch/:batchKey'
                , templateUrl: 'Institute/Web/Views/NewInstituteBatch.html'
                , controller: 'instituteBatchController'
            })
            //'app.student/StudentKey/:StudentKey/PersonKey/:PersonKey'
            .state('app.staff/StaffKey/:StaffKey/PersonKey/:PersonKey', {
                url: '/staff/StaffKey/:StaffKey/PersonKey/:PersonKey'
                , templateUrl: "3ilAppBase01/Web/assets/views/Staff.html"
                , controller: "StaffController"
                , ncyBreadcrumb: {
                    label: 'Edit Staff'
                }
            }).state('app.marks', {
                url: '/marks'
                , templateUrl: "3ilAppBase01/Web/assets/views/Marks.html"
                , controller: "mcampuz.marks"
                , ncyBreadcrumb: {
                    label: 'Marks'
                }
            }).state('app.AttendanceDetails', {
                url: '/StudAttendance', //   templateUrl: '3ilAppBase01/Web/assets/views/Staff.html'
                templateUrl: "3ilAppBase01/Web/assets/views/Attendanceaccordion.html",
                controller: 'StudentController',
                 ncyBreadcrumb: {
                    label: 'Attendance'
                }
            }).state('app.attendance', {
                url: '/attendance'
                , templateUrl: "3ilAppBase01/Web/assets/views/Attendance.html"
                , controller: "mcampuz.attendance"
                , ncyBreadcrumb: {
                    label: 'attendance'
                }
            }).state('app.attendanceStaff', {
                url: '/attendanceStaff'
                , templateUrl: "3ilAppBase01/Web/assets/views/StaffAttendance.html", //controller:'StudentController',
                controller: "mcampuz.staffattendance"
                , ncyBreadcrumb: {
                    label: 'Staff'
                }
            }).state('Confirmation', {
                url: '/Confirmation'
                , templateUrl: "3ilAppBase01/Web/assets/views/Confirmation.html"
            , }).state('error', {
                url: '/error'
                , templateUrl: "3ilAppBase01/Web/assets/views/Error.html"
            , }).state('app.EmailConfirmed', {
                url: '/EmailConfirmed'
                , templateUrl: "3ilAppBase01/Web/assets/views/EmailConfirmed.html"
            , }).state('app.singleGeoLocation', {
                url: '/singleGeoLocation'
                , templateUrl: "3ilAppBase01/Web/assets/views/SingleGeoLocation.html"
            , }).state('app.HelpDeskHome', {
                url: '/HelpDeskHome'
                , templateUrl: "3ilAppBase01/Web/assets/views/HelpDeskHome.html"
                , controller: "Aarush.HelpDeskHomeController"
                , ncyBreadcrumb: {
                    label: 'HelpDesk'
                }
            }).state('app.pages.organizationProfile', {
                url: '/organizationProfile'
                , templateUrl: "3ilAppBase01/Web/assets/views/pages_blank_page.html"
                , ncyBreadcrumb: {
                    label: 'Starter Page'
                }
            }).state('app.dashboard', {
                url: "/dashboard"
                , templateUrl: "3ilAppBase01/Web/assets/views/dashboard.html", // resolve: loadSequence('d3', 'ui.knob', 'countTo', 'dashboardCtrl'),
                controller: "DashboardController"
                , title: 'Dashboard'
                , ncyBreadcrumb: {
                    label: 'Dashboard'
                }
            })
            /*academic*/
            .state('app.BoardList', {
                url: '/BoardList',
                templateUrl: 'Academic/Web/Views/BoardList.html',
                 ncyBreadcrumb: {
                    label: 'Academics'
                }
                    // controller: 'BoardController'
            }).state('app.newBoard', {
                url: '/newBoard'
                , templateUrl: 'Academic/Web/Views/NewBoard.html'
                , controller: 'BoardController'
            }).state('app.editBoard/:boardKey', {
                url: '/editBoard/:boardKey'
                , templateUrl: 'Academic/Web/Views/NewBoard.html'
                , controller: 'BoardController'
            }).state('app.GroupList', {
                url: '/GroupList'
                , templateUrl: 'Academic/Web/Views/GroupList.html'
                , controller: 'GroupListController'
            }).state('app.newGroup', {
                url: '/newGroup'
                , templateUrl: 'Academic/Web/Views/NewGroup.html'
                , controller: 'GroupController'
            }).state('app.editGroup/:groupKey', {
                url: '/editGroup/:groupKey'
                , templateUrl: 'Academic/Web/Views/NewGroup.html'
                , controller: 'GroupController'
            }).state('app.CoursList', {
                url: '/CoursList'
                , templateUrl: 'Academic/Web/Views/CoursList.html'
                , controller: 'CoursListController'
            }).state('app.newCours', {
                url: '/newCours'
                , templateUrl: 'Academic/Web/Views/NewCours.html'
                , controller: 'CoursController'
            }).state('app.editCours/:coursKey', {
                url: '/editCours/:coursKey'
                , templateUrl: 'Academic/Web/Views/NewCours.html'
                , controller: 'CoursController'
            }).state('app.TermList', {
                url: '/TermList'
                , templateUrl: 'Academic/Web/Views/TermList.html'
                , controller: 'TermListController'
            }).state('app.Grades', {
                url: '/Grades'
                , templateUrl: 'Academic/Web/Views/Grades.html'
                , controller: 'GradeController'
            }).state('app.newTerm', {
                url: '/newTerm'
                , templateUrl: 'Academic/Web/Views/NewTerm.html'
                , controller: 'TermController'
            }).state('app.editTerm/:termKey', {
                url: '/editTerm/:termKey'
                , templateUrl: 'Academic/Web/Views/NewTerm.html'
                , controller: 'TermController'
            }).state('app.ElectiveGroupList', {
                url: '/ElectiveGroupList'
                , templateUrl: 'Academic/Web/Views/ElectiveGroupList.html'
                , controller: 'ElectiveGroupListController'
            }).state('app.newElectiveGroup', {
                url: '/newElectiveGroup'
                , templateUrl: 'Academic/Web/Views/NewElectiveGroup.html'
                , controller: 'ElectiveGroupController'
            }).state('app.editElectiveGroup/:electiveGroupKey', {
                url: '/editElectiveGroup/:electiveGroupKey'
                , templateUrl: 'Academic/Web/Views/NewElectiveGroup.html'
                , controller: 'ElectiveGroupController'
            }).state('app.SubjectList', {
                url: '/SubjectList'
                , templateUrl: 'Academic/Web/Views/SubjectList.html'
                , controller: 'SubjectListController'
            }).state('app.newSubject', {
                url: '/newSubject'
                , templateUrl: 'Academic/Web/Views/NewSubject.html'
                , controller: 'SubjectController'
            }).state('app.editSubject/:subjectKey', {
                url: '/editSubject/:subjectKey'
                , templateUrl: 'Academic/Web/Views/NewSubject.html'
                , controller: 'SubjectController'
            }).state('app.ExaminationTypeList', {
                url: '/ExaminationTypeList'
                , templateUrl: 'Academic/Web/Views/ExaminationTypeList.html'
                , controller: 'ExaminationTypeListController'
            }).state('app.newExaminationType', {
                url: '/newExaminationType'
                , templateUrl: 'Academic/Web/Views/NewExaminationType.html'
                , controller: 'ExaminationTypeController'
            }).state('app.editExaminationType/:examinationTypeKey', {
                url: '/editExaminationType/:examinationTypeKey'
                , templateUrl: 'Academic/Web/Views/NewExaminationType.html'
                , controller: 'ExaminationTypeController'
            }).state('app.ExaminationList', {
                url: '/ExaminationList'
                , templateUrl: 'Academic/Web/Views/ExaminationList.html'
                , controller: 'ExaminationListController'
            }).state('app.newExamination', {
                url: '/newExamination'
                , templateUrl: 'Academic/Web/Views/NewExamination.html'
                , controller: 'ExaminationController'
            }).state('app.editExamination/:examinationKey', {
                url: '/editExamination/:examinationKey'
                , templateUrl: 'Academic/Web/Views/NewExamination.html'
                , controller: 'ExaminationController'
            }).state('app.SubjectMarksRangeList', {
                url: '/SubjectMarksRangeList'
                , templateUrl: 'Academic/Web/Views/SubjectMarksRangeList.html'
                , controller: 'SubjectMarksRangeListController'
            }).state('app.newSubjectMarksRange', {
                url: '/newSubjectMarksRange'
                , templateUrl: 'Academic/Web/Views/NewSubjectMarksRange.html'
                , controller: 'SubjectMarksRangeController'
            }).state('app.editSubjectMarksRange/:subjectMarksRangeKey', {
                url: '/editSubjectMarksRange/:subjectMarksRangeKey'
                , templateUrl: 'Academic/Web/Views/NewSubjectMarksRange.html'
                , controller: 'SubjectMarksRangeController'
            }).state('app.SubjectComponentList', {
                url: '/SubjectComponentList'
                , templateUrl: 'Academic/Web/Views/SubjectComponentList.html'
                , controller: 'SubjectComponentListController'
            }).state('app.newSubjectComponent', {
                url: '/newSubjectComponent'
                , templateUrl: 'Academic/Web/Views/NewSubjectComponent.html'
                , controller: 'SubjectComponentController'
            }).state('app.editSubjectComponent/:subjectComponentKey', {
                url: '/editSubjectComponent/:subjectComponentKey'
                , templateUrl: 'Academic/Web/Views/NewSubjectComponent.html'
                , controller: 'SubjectComponentController'
            }).state('app.ExamScheduleList', {
                url: '/ExamScheduleList'
                , templateUrl: 'Academic/Web/Views/ExamScheduleList.html'
                , controller: 'ExamScheduleListController'
            }).state('app.newExamSchedule', {
                url: '/newExamSchedule'
                , templateUrl: 'Academic/Web/Views/NewExamSchedule.html'
                , controller: 'ExamScheduleController'
            }).state('app.editExamSchedule/:examScheduleKey', {
                url: '/editExamSchedule/:examScheduleKey'
                , templateUrl: 'Academic/Web/Views/NewExamSchedule.html'
                , controller: 'ExamScheduleController'
            })

            　.state('app.studentlist', {
                url: '/studentlist'
                , templateUrl: "3ilAppBase01/Web/assets/views/Studentlist.html"
                , controller: "Aarush.Studentlist"
                , ncyBreadcrumb: {
                    label: 'Studentlist'
                }
            })

  　.state('app.roles', {
                url: '/roles'
                , templateUrl: "3ilAppBase01/Web/assets/views/Roles.html"
                , controller: "RolesController"
                , ncyBreadcrumb: {
                    label: 'roles'
                }
            })


            //Student Enrollment 
            .state('app.enrollment', {
                url: '/enrollment'
                , templateUrl: "3ilAppBase01/Web/assets/views/Enrollment.html", //controller:'StudentController',
                controller: "Aarush.StudentAddition"
                , ncyBreadcrumb: {
                    label: 'Student'
                }
            }).state('app.enrolmentBasicInfo', {
                url: '/enrolmentBasicInfo'
                , templateUrl: "3ilAppBase01/Web/assets/views/EnrollmentBasicInfo.html", //controller:'StudentController',
                controller: "Aarush.StudentEnrollment"
                , ncyBreadcrumb: {
                    label: 'Student'
                }
            }).state('app.enrollmentlist', {
                url: '/enrollmentlist'
                , templateUrl: "3ilAppBase01/Web/assets/views/Enrollmentlist.html"
                , controller: "Aarush.StudentEnrollmentList"
                , ncyBreadcrumb: {
                    label: 'EnrollmentList'
                }
            })　　.state('app.start', {
                url: '/start'
                , templateUrl: "3ilAppBase01/Web/assets/views/Enrollment.html"
                , controller: "Aarush.StudentEnrollment"
                , ncyBreadcrumb: {
                    label: 'Start'
                }
            }).state('app.guardian', {
                url: '/guardian'
                , templateUrl: "3ilAppBase01/Web/assets/views/EnrollmentPersonRelative.html"
                , controller: "Aarush.StudentEnrollmentPersonRelative"
                , ncyBreadcrumb: {
                    label: 'family'
                }
            }).state('app.enrollmentNumber/EnrollmentKey/:EnrollmentKey/PersonKey/:PersonKey', {
                url: '/enrollmentNumber/EnrollmentKey/:EnrollmentKey/PersonKey/:PersonKey'
                , templateUrl: "3ilAppBase01/Web/assets/views/Enrollment.html"
                , controller: "Aarush.entrollmentNumber"
                , ncyBreadcrumb: {
                    label: 'EnrollmentNumber'
                }
            }).state('app.entrollmentaddress', {
                url: '/entrollmentaddress'
                , templateUrl: "3ilAppBase01/Web/assets/views/EnrollmentAddress.html"
                , controller: "Aarush.StudentEnrollmentAddress"
                , ncyBreadcrumb: {
                    label: 'address'
                }
            }).state('app.enrolmentEducation', {
                url: '/enrolmentEducation'
                , templateUrl: "3ilAppBase01/Web/assets/views/EnrollmentPastEducation.html"
                , controller: "Aarush.StudentEnrollmentPastEducation"
                , ncyBreadcrumb: {
                    label: 'education'
                }
            }).state('app.complete', {
                url: '/complete'
                , templateUrl: "3ilAppBase01/Web/assets/views/Complete.html"
                , controller: "Aarush.StudentEnrollment"
                , ncyBreadcrumb: {
                    label: 'complete'
                }
            }).state('app.editenrolmentBasicInfo/EnrollmentKey/:EnrollmentKey/PersonKey/:PersonKey', {
                url: '/editenrolmentBasicInfo/EnrollmentKey/:EnrollmentKey/PersonKey/:PersonKey'
                , templateUrl: "3ilAppBase01/Web/assets/views/Enrollment.html"
                , controller: "Aarush.StudentEnrollment"
            , })
            //Student enrollment End
            .state('app.studentadd', {
                url: '/studentadd'
                , templateUrl: "3ilAppBase01/Web/assets/views/Student.html"
                , controller: 'StudentController', //controller: "Aarush.StudentAddition",
                ncyBreadcrumb: {
                    label: 'Student'
                }
            }).state('app.student/StudentKey/:StudentKey/PersonKey/:PersonKey', {
                url: "/student/StudentKey/:StudentKey/PersonKey/:PersonKey"
                , templateUrl: "3ilAppBase01/Web/assets/views/Student.html"
                , controller: 'StudentController', //controller: "Aarush.StudentAddition",
                ncyBreadcrumb: {
                    label: 'Edit Student'
                }
            }).state('app.studenteducation', {
                url: '/studenteducation'
                , templateUrl: "3ilAppBase01/Web/assets/views/PastEducation.html"
                , controller: "Aarush.personEducation"
                , ncyBreadcrumb: {
                    label: 'education'
                }
            }).state('app.studenteducation/:StudentKey', {
                url: "/studenteducation/:StudentKey"
                , templateUrl: "3ilAppBase01/Web/assets/views/PastEducation.html"
                , controller: "Aarush.personEducation"
                , ncyBreadcrumb: {
                    label: 'education'
                }
            }).state('app.studentfamily', {
                url: '/studentfamily'
                , templateUrl: "3ilAppBase01/Web/assets/views/PersonRelative.html"
                , controller: "Aarush.personRelative"
                , ncyBreadcrumb: {
                    label: 'family'
                }
            }).state('app.studentfamily/:StudentKey', {
                url: "/studentfamily/:StudentKey"
                , templateUrl: "3ilAppBase01/Web/assets/views/PersonRelative.html"
                , controller: "Aarush.personRelative"
                , ncyBreadcrumb: {
                    label: 'family'
                }
            }).state('app.studentBank', {
                url: '/studentBank'
                , templateUrl: "3ilAppBase01/Web/assets/views/PersonBank.html"
                , controller: "Aarush.personRelative"
                , ncyBreadcrumb: {
                    label: 'family'
                }
            }).state('app.studentBank/:StudentKey', {
                url: "/studentBank/:StudentKey"
                , templateUrl: "3ilAppBase01/Web/assets/views/PersonBank.html"
                , controller: "Aarush.personRelative"
                , ncyBreadcrumb: {
                    label: 'family'
                }
            }).state('app.studentAward', {
                url: '/studentAward'
                , templateUrl: "3ilAppBase01/Web/assets/views/PersonAward.html"
                , controller: "Aarush.personAward"
                , ncyBreadcrumb: {
                    label: 'award'
                }
            }).state('app.studentAward/:StudentKey', {
                url: "/studentAward/:StudentKey"
                , templateUrl: "3ilAppBase01/Web/assets/views/PersonAward.html"
                , controller: "Aarush.personAward"
                , ncyBreadcrumb: {
                    label: 'award'
                }
            }).state('app.address', {
                url: '/address'
                , templateUrl: "3ilAppBase01/Web/assets/views/Address.html"
                , controller: "Aarush.address"
                , ncyBreadcrumb: {
                    label: 'Awards'
                }
            }).state('app.demographics', {
                url: '/demographics'
                , templateUrl: "3ilAppBase01/Web/assets/views/PersonDemographics.html", //controller:'StudentController',
                controller: "PersonDemographicsController"
                , ncyBreadcrumb: {
                    label: 'Student'
                }
            }).state('app.updateMarksSubjectWise', {
                url: '/updateMarksSubjectWise'
                , templateUrl: "3ilAppBase01/Web/assets/views/UpdateMarksSubjectWise.html"
                , controller: "SubjectWiseController"
                , ncyBreadcrumb: {
                    label: 'Marks'
                }
            }).state('app.vaccination', {
                url: '/vaccination'
                , templateUrl: "3ilAppBase01/Web/assets/views/PersonVaccination.html", //controller:'StudentController',
                controller: "PersonVaccinationController"
                , ncyBreadcrumb: {
                    label: 'Student'
                }
        }).
            state('app.activity', {
                url: '/activity'
                , templateUrl: "3ilAppBase01/Web/assets/views/PersonCurricularActivities.html", //controller:'StudentController',
                controller: "ThrillMcampuz.personCurricularActivity"
                , ncyBreadcrumb: {
                    label: 'Student'
                }
            }).state('app.diseases', {
                url: '/diseases'
                , templateUrl: "3ilAppBase01/Web/assets/views/PersonDisease.html", //controller:'StudentController',
                controller: "PersonDiseaseController"
                , ncyBreadcrumb: {
                    label: 'Student'
                }
            }).state('app.insurance', {
                url: '/insurance'
                , templateUrl: "3ilAppBase01/Web/assets/views/PersonInsurance.html", //controller:'StudentController',
                controller: "PersonInsuranceController"
                , ncyBreadcrumb: {
                    label: 'Student'
                }
            }).state('app.healthInfo', {
                url: '/healthInfo'
                , templateUrl: "3ilAppBase01/Web/assets/views/healthInfo.html", //controller:'StudentController',
                controller: "PersonDemographicsController"
                , ncyBreadcrumb: {
                    label: 'Student'
                }
            }).state('app.Staff', {
                url: '/Staff', //   templateUrl: '3ilAppBase01/Web/assets/views/Staff.html'
                templateUrl: "3ilAppBase01/Web/assets/views/Staff.html",
                controller: 'StaffController',
                ncyBreadcrumb: {
                    label: 'Staff'
                }
            }).state('app.feeStructure', {
                url: '/feeStructure'
                , templateUrl: "Fee/Web/views/Fee.html"
                , controller: 'feeController', //controller: "Aarush.StudentAddition",
                ncyBreadcrumb: {
                    label: 'Fee Structure'
                }
            }).state('app.feeDetails', {
                url: '/feeDetails'
                , templateUrl: "Fee/Web/views/FeeDetails.html"
                , controller: "feeDetailController"
                , ncyBreadcrumb: {
                    label: 'Fee Details'
                }
            }).state('app.addDetails/:StudentKey', {
                url: '/addDetails/:StudentKey'
                , templateUrl: "Fee/Web/views/AddDetail.html"
                , controller: "AddDetailController"
                , ncyBreadcrumb: {
                    label: 'fee'
                }
            }).state('app.flexibleStructure/:StudentKey/:type', {
                url: '/flexibleStructure/:StudentKey/:type'
                , templateUrl: "Fee/Web/views/FlexibleStructure.html"
                , controller: "FlexibleStructureController"
                , ncyBreadcrumb: {
                    label: 'fee'
                }
            }).state('app.PayFee/:StudentKey/:type', {
                url: '/PayFee/:StudentKey/:type'
                , templateUrl: "Fee/Web/views/PayFee.html"
                , controller: "PayFeeController"
                , ncyBreadcrumb: {
                    label: 'fee'
                }
            }).state('app.Receipt/:StudentKey', {
                url: '/Receipt/:StudentKey'
                , templateUrl: "Fee/Web/views/Receipt.html"
                , controller: "PayFeeController"
                , ncyBreadcrumb: {
                    label: 'fee'
                }
            })　

        // LeaveManagement


        /*// StudentLeaves

        .state('app.leaveForm', {
            url: '/leaveForm',
            templateUrl: "LeaveManagement/StudentLeaves/Web/views/NewStudentLeaveRequest.html",
            controller: "StudentLeaveRequestController",
            ncyBreadcrumb: {
                label: 'Studentleave'
            }
        }).state('app.leavesList', {
            url: '/leavesList',
            templateUrl: "LeaveManagement/StudentLeaves/Web/views/StudentLeaveRequestList.html",
            controller: "StudentLeaveRequestListController",
            ncyBreadcrumb: {
                label: 'Studentleave'
            }
        })

        // StaffLeaves

        .state('app.applyLeave', {
                url: '/applyLeave',
                templateUrl: 'LeaveManagement/StaffLeaves/Web/Views/ApplyLeave.html',
                controller: 'applyLeaveController',
                ncyBreadcrumb: {
                label: 'Staff Leave'
            }
=======*/
            // LeaveManagement
            // StudentLeaves
            .state('app.leaveForm', {
                url: '/leaveForm'
                , templateUrl: "LeaveManagement/StudentLeaves/Web/views/NewStudentLeaveRequest.html"
                , controller: "StudentLeaveRequestController"
                , ncyBreadcrumb: {
                    label: 'Studentleave'
                }
            }).state('app.leavesList', {
                url: '/leavesList'
                , templateUrl: "LeaveManagement/StudentLeaves/Web/views/StudentLeaveRequestList.html"
                , controller: "StudentLeaveRequestListController"
                , ncyBreadcrumb: {
                    label: 'Studentleave'
                }

            })
            // StaffLeaves
            .state('app.applyLeave', {
                url: '/applyLeave'
                , templateUrl: 'LeaveManagement/StaffLeaves/Web/Views/ApplyLeave.html'
                , controller: 'applyLeaveController',
                 ncyBreadcrumb: {
                label: 'Staff Leave'
            }
            }).state('app.leaveRequest', {
                url: '/leaveRequest'
                , templateUrl: 'LeaveManagement/StaffLeaves/Web/Views/MyLeaveRequest.html'
                , controller: 'leaveRequestController'
            }).state('app.leaveViewRequest/:leaverequestkey', {
                url: '/leaveViewRequest/:leaverequestkey'
                , templateUrl: 'LeaveManagement/StaffLeaves/Web/Views/LeaveRequestView.html'
                , controller: 'leaveRequestController'
            }).state('app.leaveRequestAddDocuments/:leaverequestkey', {
                url: '/leaveRequestAddDocuments/:leaverequestkey'
                , templateUrl: 'LeaveManagement/StaffLeaves/Web/Views/LeaveRequestView.html'
                , controller: 'leaveRequestController'
            }).state('app.subordinateLeaveRequest', {
                url: '/subordinateLeaveRequest'
                , templateUrl: 'LeaveManagement/StaffLeaves/Web/Views/MySubordinateLeaveRequest.html'
                , controller: 'subordinateLeaveController'
            }).state('app.subordinateLeaveRequest/:personKey', {
                url: '/subordinateLeaveRequest/:personKey'
                , templateUrl: 'LeaveManagement/StaffLeaves/Web/Views/MySubordinateLeaveRequest.html'
                , controller: 'subordinateEmailLeaveController'
            }).state('app.subordinateLeaveRequestView/:leaverequestkey', {
                url: '/subordinateLeaveRequestView/:leaverequestkey'
                , templateUrl: 'LeaveManagement/StaffLeaves/Web/Views/SubordinateLeaveRequestView.html'
                , controller: 'subordinateLeaveController'
            }).state('app.subordinateLeaveRequestViewOnly/:leaverequestkey', {
                url: '/subordinateLeaveRequestViewOnly/:leaverequestkey'
                , templateUrl: 'LeaveManagement/StaffLeaves/Web/Views/SubordinateLeaveViewOnly.html'
                , controller: 'subordinateLeaveController'
            })
        .state('app.leaveSettings', {
                url: '/leaveSettings'
                , templateUrl: 'LeaveManagement/StaffLeaves/Web/Views/Settings.html'
                , controller: 'leaveSettingsController'
            , ncyBreadcrumb: {
                    label: 'Settings'
                }
            })
            /*Settings - ProfileSettings*/
            .state('app.psettings', {
                url: '/psettings'
                , templateUrl: "3ilAppBase01/Web/assets/views/ProfileSettings.html"
                , controller: "ProfileSettingsController"
                , ncyBreadcrumb: {
                    label: 'ProfileSettings'
                }
            })
            /*Academic*/
            /*
                .state('app.Organization', {
                    url: "/Organization"
                    , templateUrl: "3ilAppBase01/Web/assets/views/Organization.html", // resolve: loadSequence('d3', 'ui.knob', 'countTo', 'dashboardCtrl'),
                    title: 'Dashboard'
                    , ncyBreadcrumb: {
                        label: 'Dashboard'
                    }
                })*/
            .state('login', {
                url: '/login'
                , templateUrl: "3ilAppBase01/Web/assets/views/login_login.html"
                    //template: '<div ui-view class="fade-in-right-big smooth"></div>'
                    
                , abstract: true
            }).state('signin', {
                url: '/signin'
                , templateUrl: "3ilAppBase01/Web/assets/views/login_login.html"
            }).state('emailsignin/:ID', {
                url: '/emailsignin/:ID'
                , templateUrl: "3ilAppBase01/Web/assets/views/login_login.html"
                , controller: "VerifyMailController"
            }).state('forgotpassword', {
                url: '/forgotpassword'
                , templateUrl: "3ilAppBase01/Web/assets/views/login_forgot.html"
                , controller: "ForgotPasswordController"
            }).state('emailforgotPassword/:ID', {
                url: '/emailforgotPassword/:ID'
                , templateUrl: "3ilAppBase01/Web/assets/views/NewPassword.html"
                , controller: "EmailController"
            }).state('login.registration', {
                url: '/registration'
                , templateUrl: "3ilAppBase01/Web/assets/views/login_registration.html"
            }).state('test', {
                url: '/test'
                , templateUrl: "3ilAppBase01/Web/assets/views/test.html"
            })
            /* .state('app.SubOrganizationlist', {
                 url: '/SubOrganizationlist'
                 , controller: "Aarush.SubOrganizationList",

                 templateUrl: "3ilAppBase01/Web/assets/views/SubOrganizationlist.html"
                 , ncyBreadcrumb: {
                     label: 'Branches List'
                 }

             })*/
            //institute 
            .state('app.institute', {
                url: '/institute',
                templateUrl: 'Institute/Web/Views/Institute.html',
                controller: 'InstituteNewController',
                ncyBreadcrumb: {
                label: 'New Institute'
            }
            }).state('app.editInstitute/:instituteKey', {
                url: '/editInstitute/:instituteKey',
                templateUrl: 'Institute/Web/Views/Institute.html',
                controller: 'InstituteNewController',
                ncyBreadcrumb: {
                label: 'Edit Institute'
            }

            }).state('app.instituteList', {
                url: '/instituteList',
                templateUrl: 'Institute/Web/Views/InstituteList.html',
                controller: 'instituteListController',
                ncyBreadcrumb: {
                     label: 'Institutes'
                 }
            }).state('app.newInstitute', {
                url: '/newInstitute'
                , templateUrl: 'Institute/Web/Views/NewInstitute.html'
                , controller: 'instituteController'
            })
            /*   .state('app.editInstitute/:instituteKey', { 
                   url: '/editInstitute/:instituteKey'
                   , templateUrl: 'Institute/Web/Views/NewInstitute.html'
                   , controller: 'instituteController'
               })*/
            .state('newInstituteBoard', {
                url: '/newInstituteBoard'
                , templateUrl: 'Institute/Web/Views/NewInstituteBoard.html'
                , controller: 'instituteBoardController'
            }).state('editInstituteBoard/:instituteKey', {
                url: '/editInstituteBoard/:instituteKey'
                , templateUrl: 'Institute/Web/Views/NewInstituteBoard.html'
                , controller: 'instituteBoardController'
            }).state('newInstituteCourse', {
                url: '/newInstituteCourse'
                , templateUrl: 'Institute/Web/Views/NewInstituteCourse.html'
                , controller: 'instituteCoursController'
            }).state('editInstituteCourse/:instituteKey', {
                url: '/editInstituteCourse/:instituteKey'
                , templateUrl: 'Institute/Web/Views/NewInstituteCourse.html'
                , controller: 'instituteCoursController'
            }).state('newInstituteGroup', {
                url: '/newInstituteGroup'
                , templateUrl: 'Institute/Web/Views/NewInstituteGroup.html'
                , controller: 'instituteGroupController'
            }).state('editInstituteGroup/:instituteKey', {
                url: '/editInstituteGroup/:instituteKey'
                , templateUrl: 'Institute/Web/Views/NewInstituteGroup.html'
                , controller: 'instituteGroupController'
            }).state('newInstituteElectiveGroup', {
                url: '/newInstituteElectiveGroup'
                , templateUrl: 'Institute/Web/Views/NewInstituteElectiveGroup.html'
                , controller: 'instituteElectiveGroupController'
            }).state('editInstituteElectiveGroup/:instituteKey', {
                url: '/editInstituteElectiveGroup/:instituteKey'
                , templateUrl: 'Institute/Web/Views/NewInstituteElectiveGroup.html'
                , controller: 'instituteElectiveGroupController'
            }).state('newInstituteTerm', {
                url: '/newInstituteTerm'
                , templateUrl: 'Institute/Web/Views/NewInstituteTerm.html'
                , controller: 'instituteTermController'
            }).state('editInstituteTerm/:instituteKey', {
                url: '/editInstituteTerm/:instituteKey'
                , templateUrl: 'Institute/Web/Views/NewInstituteTerm.html'
                , controller: 'instituteTermController'
            }).state('newInstituteExaminationType', {
                url: '/newInstituteExaminationType'
                , templateUrl: 'Institute/Web/Views/NewInstituteExaminationType.html'
                , controller: 'instituteExaminationTypeController'
            }).state('editInstituteExaminationType/:instituteKey', {
                url: '/editInstituteExaminationType/:instituteKey'
                , templateUrl: 'Institute/Web/Views/NewInstituteExaminationType.html'
                , controller: 'instituteExaminationTypeController'
            }).state('newInstituteExamination', {
                url: '/newInstituteExamination'
                , templateUrl: 'Institute/Web/Views/NewInstituteExamination.html'
                , controller: 'instituteExaminationController'
            }).state('editInstituteExamination/:instituteKey', {
                url: '/editInstituteExamination/:instituteKey'
                , templateUrl: 'Institute/Web/Views/NewInstituteExamination.html'
                , controller: 'instituteExaminationController'
            }).state('newInstituteSubject', {
                url: '/newInstituteSubject'
                , templateUrl: 'Institute/Web/Views/NewInstituteSubject.html'
                , controller: 'instituteSubjectController'
            }).state('editInstituteSubject/:instituteKey', {
                url: '/editInstituteSubject/:instituteKey'
                , templateUrl: 'Institute/Web/Views/NewInstituteSubject.html'
                , controller: 'instituteSubjectController'
            }).state('newInstituteLeave', {
                url: '/newInstituteLeave'
                , templateUrl: 'Institute/Web/Views/NewLeaveType.html'
                , controller: 'leaveTypeController'
            }).state('editInstituteLeave/:instituteKey', {
                url: '/editInstituteLeave/:instituteKey'
                , templateUrl: 'Institute/Web/Views/NewLeaveType.html'
                , controller: 'leaveTypeController'
            })
            //end
            // Generates a resolve object previously configured in constant.JS_REQUIRES (config.constant.js)
        function loadSequence() {
            var _args = arguments;
            return {
                deps: ['$ocLazyLoad', '$q'
                    , function ($ocLL, $q) {
                        var promise = $q.when(1);
                        for (var i = 0, len = _args.length; i < len; i++) {
                            promise = promiseThen(_args[i]);
                        }
                        return promise;

                        function promiseThen(_arg) {
                            if (typeof _arg == 'function') return promise.then(_arg);
                            else return promise.then(function () {
                                var nowLoad = requiredData(_arg);
                                if (!nowLoad) return $.error('Route resolve: Bad resource name [' + _arg + ']');
                                return $ocLL.load(nowLoad);
                            });
                        }

                        function requiredData(name) {
                            if (jsRequires.modules)
                                for (var m in jsRequires.modules)
                                    if (jsRequires.modules[m].name && jsRequires.modules[m].name === name) return jsRequires.modules[m];
                            return jsRequires.scripts && jsRequires.scripts[name];
                        }
                    }
                ]
            };
        }
        app.directive('childRegister', function () {
            return {
                templateUrl: "3ilAppBase01/Web/assets/views/ChildRegister.html"
                , controller: "ChildRegisterController"
            };
        });
        app.directive('childAddress', function () {
            return {
                templateUrl: "3ilAppBase01/Web/assets/views/ChildAddress.html"
            };
        });
        app.directive('childFamilyDetails', function () {
            return {
                templateUrl: "3ilAppBase01/Web/assets/views/ChildFamilyDetails.html", //resolve: loadSequence('ngTable', 'ChildFamilyDetailsController')
                controller: "ChildFamilyDetailsController"
            };
        });
        app.directive('childAllergyHistory', function () {
            return {
                templateUrl: "3ilAppBase01/Web/assets/views/Allergies.html", //resolve: loadSequence('ngTable', 'ChildFamilyDetailsController')
                controller: "childAllergyHistoryController"
            };
        });
        app.directive('childSurgicalHistory', function () {
            return {
                templateUrl: "3ilAppBase01/Web/assets/views/SurgicalHistory.html", //resolve: loadSequence('ngTable', 'ChildFamilyDetailsController')
                controller: "childSurgicalHistoryController"
            };
        });
        app.directive('childMedicationHistory', function () {
            return {
                templateUrl: "3ilAppBase01/Web/assets/views/Medications.html"
            };
        });
        app.directive('childHealthHistory', function () {
            return {
                templateUrl: "3ilAppBase01/Web/assets/views/HealthConditions.html"
            };
        });
        app.directive('childImmunizationAndVaccinationHistory', function () {
            return {
                templateUrl: "3ilAppBase01/Web/assets/views/ImmunizationAndVaccination.html"
            };
        });
        app.directive('childFamilyHistory', function () {
            return {
                templateUrl: "3ilAppBase01/Web/assets/views/FamilyHistory.html"
                , controller: "childFamilyHistoryController"
            };
        });
        app.directive('childRecommendations', function () {
            return {
                templateUrl: "3ilAppBase01/Web/assets/views/Recommendations.html"
                , controller: "recommendationsController"
            };
        });
        app.directive('childScreeningMedication', function () {
            return {
                templateUrl: "3ilAppBase01/Web/assets/views/MedicationsScreening.html"
                , controller: "medicationsController"
            };
        });
        app.directive('childScreeningDiagnosis', function () {
            return {
                templateUrl: "3ilAppBase01/Web/assets/views/Diagnosis.html"
                , controller: "diagnosisController"
            };
        });
        app.directive('childScreeningInvestigation', function () {
            return {
                templateUrl: "3ilAppBase01/Web/assets/views/Investigations.html"
                , controller: "investigationController"
            };
        });
        app.directive('childScreeningImmunization', function () {
            return {
                templateUrl: "3ilAppBase01/Web/assets/views/ImmunizationVaccinationScreening.html"
                , controller: "vaccinationController"
            };
        });
        app.directive('symptoms', function () {
            return {
                templateUrl: "3ilAppBase01/Web/assets/views/Symptoms.html", //resolve: loadSequence('ngTable', 'ChildFamilyDetailsController')
                controller: "SymptomsController"
            };
        });
        app.directive('vitals', function () {
            return {
                templateUrl: "3ilAppBase01/Web/assets/views/Vitals.html", //resolve: loadSequence('ngTable', 'ChildFamilyDetailsController')
                controller: "VitalsController"
            };
        });
        app.directive('screeningHistory', function () {
            return {
                templateUrl: "3ilAppBase01/Web/assets/views/ScreeningHistory.html", //resolve: loadSequence('ngTable', 'ChildFamilyDetailsController')
            };
        });
        app.directive('singleGeoLocation', function () {
            return {
                templateUrl: "3ilAppBase01/Web/assets/views/SingleGeoLocation.html"
                    //, controller: "ChildRegisterController"
            };
        });
    }
]);