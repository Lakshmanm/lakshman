/*===========================================================================
 All rights reserved to Thrill Innovative Labs.
 THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
 OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
 LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
 FITNESS FOR A PARTICULAR PURPOSE.
============================================================================
****************************************************************************
 Name		    	: app.js
 Type		    	: Javascript and JQuery 
 Description		:
 References		    :
 Author	    		: Naveena Lingam
 Created Date       : 06-04-2016
****************************************************************************                          
MODIFICATION LOG
**************************************************************************** 
Ver	  Date	               Modified By			    Description
1.    11-04-2016           Satya Kalyani Lanka      Define Organization
2.    11-04-2016           Kiranmai Labhala         Define Registration
3.    11-04-2016           Naveena Lingam           Define Contact 
4.    12-04-2016           Naveena Lingam           Define Location
5.    13-04-2016           Kiranmai Labhala         Define Department
6.    13-04-2016           Naveena Lingam           Define Certification
****************************************************************************                            
Code Review LOG
**************************************************************************** 
S.No      Ver        Date                Code Review By            Observations
1         1.0       14-April-2016         Sri Venkatesh.T          Owner of this file mentioned as Subrahmanyam but he is not into organization component >
2         1.0       14-April-2016         Sri Venkatesh.T          Remove commented code if not required
****************************************************************************
*/
/* create the Root module and name it ThrillOrganization also include Dependency Modules */

var ThrillOrganization = angular.module('ThrillOrganization', ['ui.router'
    , 'ThrillOrganization.OrganizationList'
    ,'ThrillOrganization.organization'
    , 'ThrillFrameworkLibrary.appLogger'
    , 'ThrillOrganization.webSetup'
    
    , 'ThrillOrganization.Registration'
    
    , 'ThrillOrganization.Department'
    , 'ThrillOrganization.certification'

]);



ThrillOrganization.directive("orgContact", function() {
    return {
        templateUrl: "Organization/Web/Views/Contacts.html",
        controller: 'ContactController',

    };

});
ThrillOrganization.directive("orgRegistration", function() {
    return {
        templateUrl: "Organization/Web/Views/NewRegistration.html",
        controller: 'RegistrationController',

    };

});

ThrillOrganization.directive("orgLocation", function() {
    return {
        templateUrl: "Organization/Web/Views/Location.html",
        controller: 'LocationController',

    };

});

ThrillOrganization.directive("orgDepartment", function() {
    return {
        templateUrl: "Organization/Web/Views/Department.html",
        controller: 'DepartmentController',

    };

});
ThrillOrganization.directive("orgCertification", function() {
    return {
        templateUrl: "Organization/Web/Views/Certification.html",
        controller: 'CertificationController',

    };

});
/* configure Application routes use route provider
stateProvider-- makes it easy to wire together controllers, view templates, and the current URL location in the browser */

ThrillOrganization.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    console.log("stateProvider");

    $stateProvider
        .state('orglist', {
            url: '/orglist',
            templateUrl: 'Organization/Web/Views/OrganizationList.html',
            controller: 'OrganizationListController'
        })
        .state('newOrg', {
            url: '/newOrg',
            templateUrl: 'Organization/Web/Views/NewOrganization.html',
            controller: 'OrganizationController'
        })
        .state('editOrg/:organizationReferencekey', {
            url: '/editOrg/:organizationReferencekey',
            templateUrl: 'Organization/Web/Views/EditOrganization.html',
            controller: 'OrganizationController'
        })
        .state('appSetup', {
            url: '/appSetup',
            templateUrl: 'Organization/FirstTimeSetup/FirstTimeSetup.html',
            controller: 'AppSetupWebCtrl'
        })
        .state('editContact/:contactid', {
            url: '/editContact/:contactid',
            templateUrl: 'Organization/Web/Views/Contacts.html',
            controller: 'ContactController'
        });


    /* Define Root Page of the Application */
    $urlRouterProvider.otherwise('/appSetup');
}]);

/* configure Application routes use route provider
routeProvider-- makes it easy to wire together controllers, view templates, and the current URL location in the browser */


/*
ThrillOrganization.config(['$cryptoProvider',
  function ($cryptoProvider) {
        $cryptoProvider.setCryptographyKey('ABCD123');
}]);*/

function generateUUID() {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c=='x' ? r : (r&0x3|0x8)).toString(16);
    });
    return uuid;
};