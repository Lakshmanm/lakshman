/*===========================================================================
 All rights reserved to Nunet Cube Software Solutions.
 THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
 OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
 LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
 FITNESS FOR A PARTICULAR PURPOSE.
============================================================================
****************************************************************************
 Name		    	: app.js
 Type		    	: Javascript and JQuery 
 Description	    :
 References		    :
 Author	    		: Tulasi Ballada
 Created Date        : 07-04-2016
****************************************************************************                          
MODIFICATION LOG
**************************************************************************** 
Ver	Date	     Modified By			Description
****************************************************************************                            
Code Review LOG
**************************************************************************** 
S.No      Ver        Date                Code Review By            Observations

2         1.0       14-April-2016         Sri Venkatesh.T           In page header please mention full name of the author.

1         1.0       14-April-2016         Sri Venkatesh.T           No Issues

****************************************************************************
*/
/* create the Root module and name it security also include Dependency Modules */
var security = angular.module('security', ['ui.router'
                                           , 'security.userRoleController'
                                           , 'security.rolesController'
                                           , 'security.userController'
                                           , 'security.loginController'
                                           , 'security.registrationController'
                                           , 'security.changePasswordController'
                                           , 'security.emailController'
                                           , 'security.verifyMailController'
                                           , 'security.forgotPasswordController'
                                           , 'security.adminController'
                                           , 'ThrillFrameworkLibrary.appLogger'
                                           , 'security.appStorage'




]);

/* configure Application routes use route provider
stateProvider-- makes it easy to wire together controllers, view templates, and the current URL location in the browser */

security.config(['$stateProvider'



                 , '$urlRouterProvider'

    ,
    function ($stateProvider, $urlRouterProvider) {


        console.log("stateProvider");
        $stateProvider
            .state('roles', {
                url: '/roles',
                templateUrl: 'Security/Web/Views/Roles.html',
                controller: 'RolesController'

            })
            .state('user', {
                url: '/user',
                templateUrl: 'Security/Web/Views/User.html',
                controller: 'UserController'

            })

        .state('userRole', {
            url: '/userRole',
            templateUrl: 'Security/Web/Views/UserRole.html',
            controller: 'UserRoleController'

        })

        .state('login', {
                url: '/login',
                templateUrl: 'Security/Web/Views/Login.html',
                controller: 'LoginController'

            })
            .state('emaillogin', {
                url: '/emaillogin/:ID',
                templateUrl: 'Security/Web/Views/Login.html',
                controller: 'VerifyMailController'

            })

        .state('basicInfo', {
            url: '/basicInfo',
            templateUrl: 'Security/Web/Views/BasicInfo.html',
            controller: 'RegistrationController'

        })

        .state('address', {
            url: '/address',
            templateUrl: 'Security/Web/Views/Address.html',
            controller: 'RegistrationController'

        })

        .state('changePassword', {

            url: '/changePassword/:ID',
            templateUrl: 'Security/Web/Views/ChangePassword.html',
            controller: 'ChangePasswordController'



        })

        .state('email', {
                url: '/email',
                controller: 'EmailController'

            })
            .state('emailSuccess', {
                url: '/emailSuccess',
                templateUrl: 'Security/Web/Views/EmailSuccess.html',
                controller: 'ForgotPasswordController'

            })

        .state('registrationSuccess', {
                url: '/registrationSuccess',
                templateUrl: 'Security/Web/Views/RegistrationSuccess.html',
                controller: 'RegistrationController'

            })
            .state('verifyMail', {
                url: '/verifyMail',
                controller: 'VerifyMailController'

            })

        .state('admin', {
            url: '/admin',
            templateUrl: 'Security/Web/Views/Admin.html',
            controller: 'AdminController'

        })

        .state('forgotPassword', {
            url: '/forgotPassword',
            templateUrl: 'Security/Web/Views/ForgotPassword.html',
            controller: 'ForgotPasswordController'
        })

        .state('newPassword', {
            url: '/newPassword/:ID',
            templateUrl: 'Security/Web/Views/NewPassword.html',
            controller: 'ForgotPasswordController'
        })

        .state('emailforgotPassword', {
            url: '/emailforgotPassword/:ID',
            templateUrl: 'Security/Web/Views/NewPassword.html',
            controller: 'EmailController'
        })

        .state('dashboard', {


            url: '/dashboard/:ID',
            templateUrl: 'Security/Web/Views/Dashboard.html',
            controller: 'ChangePasswordController'




        });
        /* Define Root Page of the Application */
        $urlRouterProvider.otherwise('/login');
    }
]);