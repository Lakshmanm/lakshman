var app = angular.module('ThrillAppBase.childListLogic', ['ngCordova', 'ThrillFrameworkLibrary.DataService'
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

    ])
    .factory('ThrillAppBasechildListLogic', function ($http,
        dataService,
        config,
        appConfig,
        appLogger, registrationLogic, createCalendarLogic, contactLogic, thrillAppBasePersonLogic, personWorkExperienceLogic, personBasicInfoLogic,personListLogic) {
        return {

            // Logic for registration process  
            getChildList: function () { //postUser function call
alert();
                    thrillAppBasePersonLogic.getPersonReferencekeys(organizationKey, roleId).then(function (response) {
                           console.log(response);
                       });      




            }
        };

    });
/* Registration logic  end */