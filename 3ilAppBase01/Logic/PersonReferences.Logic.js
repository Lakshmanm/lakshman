var app = angular.module('ThrillMcampuz.personReferencesLogic', ['ngCordova', 'ThrillFrameworkLibrary.DataService'
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
    .factory('personReferencesLogic', function ($http,
        dataService,
        config,
        appConfig,
        appLogger, registrationLogic, createCalendarLogic, contactLogic, thrillAppBasePersonLogic, personWorkExperienceLogic, ThrillAppBasechildLogic, personBasicInfoLogic, $localStorage) {
        return {


         OccupationTypes:function()
            {
            
             return dataService.callAPI(config.API_URL + 'Person/occupations', [], 'GET').then(function (response) {
                    return response.data;
                });

            },
            
            addReferences:function(reference,personReferenceKey)
            {
            
             return dataService.insert(reference, '`person.references`', config.OFFLINE_DBNAME, config.API_URL + 'Person/'+personReferenceKey+'/Reference').then(function(response) {
                    return response;
                });
        },
            
            getReferences:function(staffKey)
            {
            
             return dataService.callAPI(config.API_URL + 'Person/reference/'+staffKey, [], 'GET').then(function (response) {
                    return response.data;
                });
 
        },
              getReferencesByReferenceKey:function(referenceKey)
            {
            
             return dataService.callAPI(config.API_URL + 'Person/referencesKey/'+referenceKey, [], 'GET').then(function (response) {
                    return response.data;
                });
 
        },
            updateReference:function(referenceObject,referenceKey)
            {
           return dataService.update(referenceObject, 'referenceKey=' + referenceKey, '`person.references`', config.OFFLINE_DBNAME, config.API_URL + 'Person/references/' + referenceKey).then(function (response) {
                return response;
            });        
                
                
            },
            
            deleteRelative:function(referenceKey,personReferenceKey)
            {
            return dataService.delete('referenceKey="' + referenceKey + '"', '`person.references`', config.OFFLINE_DBNAME, config.API_URL + 'Person/references/'+referenceKey).then(function (response) {
				 return response;
			 }); 
            }
            
            
        }

    });
/* Registration logic  end */