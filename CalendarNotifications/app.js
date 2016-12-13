/*===========================================================================
 All rights reserved to Nunet Cube Software Solutions.
 THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
 OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
 LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
 FITNESS FOR A PARTICULAR PURPOSE.
============================================================================
****************************************************************************
 Name               : app.js
 Type               : Angular Js
 Description        : Define state provider- it changes the application views based on state of the application and not just the route URL
 References         : https://angularjs.org/
 Author             : Murali Dadi.
 Created Date       : 06-04-2016
****************************************************************************                          
MODIFICATION LOG
**************************************************************************** 
Ver Date         Modified By            Description
1.  12-04-2014   Murali Dadi            Modified routing path names.
2.  14-04-2014   Jagadeesh Adigarlla   added state params to route path of eventResponse router.
****************************************************************************                            
Code Review LOG
**************************************************************************** 
S.No      Ver        Date                Code Review By            Observations
1         1.0       17-April-2016         Sri Venkatesh.T          Remove commented code if not required.
****************************************************************************
*/




/* create the Root module and name it N3ArchSample also include Dependency Modules */
var ThrillCNN = angular.module('ThrillCNN', ['ui.router',
                                     'ngStorage',
                                     'ThrillCNN.Authentication',
                                     'ThrillCNN.DashBoard',
                                     'ThrillCNN.CNUserProfile',
                                     'ThrillCNN.NotificationSettings',
                                     'ThrillCNN.CreateCalendar',
                                     'ThrillCNN.EditCalendar',
                                     'ThrillCNN.CreateEvent',
                                     'ThrillCNN.EditEvent',
                                     'ThrillCNN.CreateTask',
                                     'ThrillCNN.EditTask',
                                     'ThrillCNN.EventResponse',
                                     'ThrillFrameworkLibrary.appLogger',
                                     'angularjs-datetime-picker',
                                     'toaster']);

/* create the Root module and name it N3ArchSample also include Dependency Modules */

// n3CNN.run(['$rootScope', '$location',  '$http',
//     function ($rootScope, $location,  $http,$localStorage) {

   
//          $localStorage.loggedInUserID
//         // keep user logged in after page refresh
//         // $rootScope.globals = $cookieStore.get('globals') || {};
//         var urlpatheditdar = $location.path().split('/');
//               $rootScope.shareme =urlpatheditdar[1];
     
//         // if ($rootScope.globals.currentUser) {
          
//         //     $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; 
//         // }

//         $rootScope.$on('$locationChangeStart', function (event, next, current) {

//             $localStorage.loggedInUserID
      

//             if($rootScope.shareme == "EventResponse")
//               {
//                // console.log("hi");


//               }
//               else{
             
//                         if ($location.path() !== '/authentication' && !$localStorage.loggedInUserID ) {
//                               $location.path('/authentication');
//                            }
//                 }
//         });
//     }]);

/* configure Application routes use state provider
stateProvider-- makes it easy to wire together controllers, view templates, and the current URL location in the browser */

ThrillCNN.config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
        $stateProvider

         .state('authentication', {
                url: '/authentication',
                //templateUrl: 'CalendarNotifications/Web/Views/Authentication.html',
                controller: 'AuthenticationController'
        })
         .state('DashBoard', {
                url: '/DashBoard',
                templateUrl: 'CalendarNotifications/Web/Views/DashBoard.html',
                controller: 'DashBoardController'
        })

        .state('CNUserProfile', {
            url: '/CNUserProfile',
            templateUrl: 'CalendarNotifications/Web/Views/CNUserProfile.html',
            controller: 'CNUserProfileController'
        })

        .state('NotificationSettings', {
            url: '/NotificationSettings',
            templateUrl: 'CalendarNotifications/Web/Views/NotificationSettings.html',
            controller: 'NotificationSettingsController'
        })

        .state('CreateCalendar', {
            url: '/CreateCalendar',
            templateUrl: 'CalendarNotifications/Web/Views/CreateCalendar.html',
            controller: 'CreateCalendarController'
        })

        .state('EditCalendar', {
            url: '/EditCalendar',
            templateUrl: 'CalendarNotifications/Web/Views/EditCalendar.html',
            controller: 'EditCalendarController'
        })

        .state('CreateEvent', {
            url: '/CreateEvent',
            templateUrl: 'CalendarNotifications/Web/Views/CreateEvent.html',
            controller: 'CreateEventController'
        })

        .state('EditEvent', {
            url: '/EditEvent',
            templateUrl: 'CalendarNotifications/Web/Views/EditEvent.html',
            controller: 'EditEventController'
        })

        .state('CreateTask', {
            url: '/CreateTask',
            templateUrl: 'CalendarNotifications/Web/Views/CreateTask.html',
            controller: 'CreateTaskController'
        })

        .state('EditTask', {
            url: '/EditTask',
            templateUrl: 'CalendarNotifications/Web/Views/EditTask.html',
            controller: 'EditTaskController'
        })

        .state('EventResponse', {
            url: '/EventResponse/{id1:[0-9]+}/{id2:[0-9]+}/{id3:[0-9]+}',
            templateUrl: 'CalendarNotifications/Web/Views/EventResponse.html',
            controller: 'EventResponseController'
        });



        /* Define Root Page of the Application */
        $urlRouterProvider.otherwise('authentication');
    }
]);
