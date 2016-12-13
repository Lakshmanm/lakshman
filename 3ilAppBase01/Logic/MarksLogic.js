var app = angular.module('ThrillAppBase.marksLogic', ['ngCordova', 'ThrillFrameworkLibrary.DataService'
                                                        , 'ThrillAppBase.config'
                                                        , 'ThrillCnnWebClient.appConfig'
                                                        , 'ThrillFrameworkLibrary.appLogger'
                                                         , 'security.registrationLogic'
                                                        , 'ThrillCNN.CreateCalendarLogic'
                                                        , 'ThrillContact.contactLogic'
                                                        , 'ThrillAppBase.thrillAppBasePersonLogic'
                                                        , 'ThrillPerson.personWorkExperienceLogic'
                                                         , 'ThrillAppBase.thrillAppBasePersonLogic'
    ])
    .factory('marksLogic', function ($http,
        dataService,
        config,
        appConfig,
        appLogger, registrationLogic, createCalendarLogic, contactLogic, thrillAppBasePersonLogic, personWorkExperienceLogic, ThrillAppBasechildLogic, personBasicInfoLogic, $localStorage) {
        return {



 
        };

    });
/* Registration logic  end */