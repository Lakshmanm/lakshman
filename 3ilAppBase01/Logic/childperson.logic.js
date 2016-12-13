var app = angular.module('ThrillAppBase.childPersonLogic', ['ngCordova', 'ThrillFrameworkLibrary.DataService'
                                                        , 'ThrillAppBase.config'
                                                        , 'ThrillCnnWebClient.appConfig'
                                                        , 'ThrillFrameworkLibrary.appLogger'
                                                         , 'security.registrationLogic'
                                                        , 'ThrillPerson.personBasicInfoLogic'
                                                        , 'security.registrationLogic'
                                                        , 'ThrillCNN.CreateCalendarLogic'
                                                        , 'ThrillContact.contactLogic'
                                                        , 'ThrillAppBase.thrillAppBasePersonLogic'
                                                        , 'ThrillPerson.personWorkExperienceLogic'
                                                        , 'ThrillLocation.addressLogic'
                                                              , 'ThrillPerson.personMaritalStatusLogic'
                                                              , 'ThrillPerson.personIdentityLogic'
                                                              ,'ThrillContact.contactContactItemLogic'

    ]).factory('ThrillAppBasechildLogic', function ($http, dataService, config, appConfig, appLogger, registrationLogic, createCalendarLogic, contactLogic, thrillAppBasePersonLogic, personWorkExperienceLogic, personBasicInfoLogic, $localStorage, addressLogic, PersonMaritalStatusLogic, personIdentityLogic,contactContactItemLogic) {
    return {
    };
});
/* Registration logic  end */