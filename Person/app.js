/*===========================================================================
 All rights reserved to Thrill Innovative Labs.
 THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
 OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
 LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
 FITNESS FOR A PARTICULAR PURPOSE.
============================================================================
****************************************************************************
 Name		    	: app
 Type		    	: Javascript and JQuery 
 Description		:
 References		    :
 Author	    		: Satyanarayana,Phani,Sreeliakshmi
 Created Date       : 07-Apr-2016
****************************************************************************                          
MODIFICATION LOG
**************************************************************************** 
Ver	Date	     Modified By			Description
****************************************************************************                            
Code Review LOG
**************************************************************************** 
Ver        Date                Code Review By            Observations
****************************************************************************
*/
/* create the Root module and name it ThrillPerson also include Dependency Modules */
var ThrillPerson = angular.module('ThrillPerson', ['ui.router'
                                           , 'naif.base64'
                                           , 'ThrillPerson.personBasicInfo'
                                           , 'ThrillPerson.personRelative'
                                           , 'ThrillPerson.personBank'
                                           , 'ThrillPerson.personDemographics'
                                           , 'ThrillPerson.personEducation'
                                           , 'ThrillPerson.personList'
                                           , 'ThrillPerson.personIdentity'
                                           , 'ThrillPerson.personVisa'
                                           , 'ThrillPerson.personWorkExperience'
                                           , 'ThrillPerson.personReligion'
                                           , 'ThrillPerson.personHobby'
                                           , 'ThrillFrameworkLibrary.appLogger'
                                           , 'ThrillPerson.webSetup'
                                           , 'ThrillPerson.personAward'
                                           , 'ThrillPerson.personSport'
                                           , 'ThrillPerson.personSportAward'
                                           , 'ThrillPerson.personLanguageProficiency'
                                           , 'ThrillPerson.personLivingPlace'
                                           , 'ThrillPerson.personMaritalStatus'
                                           , 'ThrillPerson.personVaccination'
                                           , 'ThrillPerson.personInsurance'
                                           , 'ThrillPerson.personDisease'

]);



ThrillPerson.directive('personBasicInfo', function () {
    return {
        templateUrl: 'Person/Web/Views/PersonBasicInfo.html',
        controller: 'PersonBasicInfoController'

    }

});

ThrillPerson.directive('personRelative', function () {
    return {
        templateUrl: 'Person/Web/Views/PersonRelative.html',
        controller: 'PersonRelativeController'

    }

});

ThrillPerson.directive('personList', function () {
    return {
        templateUrl: 'Person/Web/Views/PersonList.html',
        controller: 'PersonListController'

    }

});

ThrillPerson.directive('personDemographics', function () {
    return {
        templateUrl: 'Person/Web/Views/PersonDemographics.html',
        controller: 'PersonDemographicsController'
    }

});

ThrillPerson.directive('personEducation', function () {
    return {
        templateUrl: 'Person/Web/Views/PersonEducation.html',
        controller: 'PersonEducationController'

    }

});

ThrillPerson.directive('personBank', function () {
    return {
        templateUrl: 'Person/Web/Views/PersonBank.html',
        controller: 'PersonBankController'

    }

});

ThrillPerson.directive('personVisa', function () {
    return {
        templateUrl: 'Person/Web/Views/PersonVisa.html',
        controller: 'PersonVisaController'

    }

});


ThrillPerson.directive('personIdentity', function () {
    return {
        templateUrl: 'Person/Web/Views/PersonIdentity.html',
        controller: 'PersonIdentityController'

    }

});


ThrillPerson.directive('personWorkExperience', function () {
    return {
        templateUrl: 'Person/Web/Views/PersonWorkExperience.html',
        controller: 'PersonWorkExperienceController'

    }

});

ThrillPerson.directive('personReligion', function () {
    return {
        templateUrl: 'Person/Web/Views/PersonReligion.html',
        controller: 'PersonReligionController'

    }

});


ThrillPerson.directive('personHobby', function () {
    return {
        templateUrl: 'Person/Web/Views/PersonHobby.html',
        controller: 'PersonHobbyController'

    }

});
ThrillPerson.directive('personLanguageproficiency', function () {
    return {
        templateUrl: 'Person/Web/Views/PersonLanguageProficiency.html',
        controller: 'PersonLanguageProficiencyController'


    }

});
ThrillPerson.directive('personLivingplace', function () {
    return {
        templateUrl: 'Person/Web/Views/PersonLivingPlace.html',
        controller: 'PersonLivingPlaceController'

    }

});
ThrillPerson.directive('personMaritalstatus', function () {
    return {
        templateUrl: 'Person/Web/Views/PersonMaritalStatus.html',
        controller: 'PersonMaritalStatusController'

    }

});
ThrillPerson.directive('personVaccination', function () {
    return {
        templateUrl: 'Person/Web/Views/PersonVaccination.html',
        controller: 'PersonVaccinationController'

    }

});
ThrillPerson.directive('personAward', function () {
    return {
        templateUrl: 'Person/Web/Views/PersonAward.html',
        controller: 'PersonAwardController'

    }

});
ThrillPerson.directive('personSport', function () {
    return {
        templateUrl: 'Person/Web/Views/PersonSport.html',
        controller: 'PersonSportController'

    }

});

ThrillPerson.directive('personSportAward', function () {
    return {
        templateUrl: 'Person/Web/Views/PersonSportAward.html',
        controller: 'PersonSportAwardController'

    }

});
ThrillPerson.directive('personInsurance', function () {
    return {
        templateUrl: 'Person/Web/Views/PersonInsurance.html',
        controller: 'PersonInsuranceController'

    }

});
ThrillPerson.directive('personDisease', function () {
    return {
        templateUrl: 'Person/Web/Views/PersonDisease.html',
        controller: 'PersonDiseaseController'

    }

});


ThrillPerson.directive('confirmationNeeded', function () {
    return {
        priority: 1,
        terminal: true,
        link: function (scope, element, attr) {
            var msg = attr.confirmationNeeded || "Are you sure?";
            var clickAction = attr.ngClick;
            element.bind('click', function () {
                if (window.confirm(msg)) {
                    scope.$eval(clickAction)
                }
            });
        }
    };
});

/* configure Application routes use route provider
stateProvider-- makes it easy to wire together controllers, view templates, and the current URL location in the browser */

ThrillPerson.config(['$stateProvider', '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {
       $stateProvider
            .state('addPerson', {
                url: '/addPerson',
                templateUrl: 'Person/Web/Views/AddPerson.html'
                    //controller: 'EmployeeListController'
            })
            .state('editPerson', {
                url: '/editPerson',
                templateUrl: 'Person/Web/Views/EditPerson.html'
                    //controller: 'EmployeeListController'
            })
            .state('editPerson/:personReferenceKey', {
                url: '/editPerson/:personReferenceKey',
                templateUrl: 'Person/Web/Views/EditPerson.html'
                    //controller: 'EmployeeListController'
            })
            .state('persons', {
                url: '/persons',
                templateUrl: 'Person/Web/Views/Persons.html'
                    //controller: 'EmployeeListController'
            })
            .state('appSetup', {
                url: '/appSetup',
                templateUrl: 'Person/FirstTimeSetup/FirstTimeSetup.html',
                controller: 'AppSetupWebCtrl'
            });

        /* Define Root Page of the Application */
        $urlRouterProvider.otherwise('/appSetup');
      }]);

function generateUUID() {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c=='x' ? r : (r&0x3|0x8)).toString(16);
    });
    referenceKey=uuid;
    return uuid;
};

/* configure Application routes use route provider
routeProvider-- makes it easy to wire together controllers, view templates, and the current URL location in the browser */

/*n3Person.Config(['$routeProvider'    
    , function ($routeProvider) {
        console.log("routeProvider");
        $routeProvider

            .when('/empList', {
                templateUrl: 'Employee/Web/Views/EmployeeList.html'
                , controller: 'EmployeeListController'
            })
            .when('/editEmp', {
                templateUrl: 'Employee/Web/Views/EditEmployee.html'
                , controller: 'EmployeeController'
            })
            .when('/editEmp/:empid', {
                templateUrl: 'Employee/Web/Views/EditEmployee.html'
                , controller: 'EmployeeController'
            })
            .when('/newEmp', {
                templateUrl: 'Employee/Web/Views/NewEmployee.html'
                , controller: 'EmployeeController'
            })

        .otherwise({
           
            redirectTo: '/empList'
        });
      }]);*/
/*
n3Person.Config(['$cryptoProvider',
  function ($cryptoProvider) {
        $cryptoProvider.setCryptographyKey('ABCD123');
}]);*/