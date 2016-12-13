var app = angular.module('ThrillMcampuz.personNotesLogic', ['ngCordova', 'ThrillFrameworkLibrary.DataService'
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
    .factory('personNotesLogic', function ($http,
        dataService,
        config,
        appConfig,
        appLogger, registrationLogic, createCalendarLogic, contactLogic, thrillAppBasePersonLogic, personWorkExperienceLogic, ThrillAppBasechildLogic, personBasicInfoLogic, $localStorage) {
        return {

       addNotes:function(notesObject)
            {
            
             return dataService.insert(notesObject, '`person.notes`', config.OFFLINE_DBNAME, config.API_URL + 'Person/notes').then(function(response) {
                    return response;
                });
        },
            
         getAllNotes:function(personReferenceKey)
            {   
             return dataService.callAPI(config.API_URL + 'Person/notes/'+personReferenceKey, [], 'GET').then(function (response) {
                    return response.data;
                });
            },
        
        getNotesByReferenceKey:function(referenceKey)
        {
          return dataService.callAPI(config.API_URL + 'Person/note/'+referenceKey, [], 'GET').then(function (response) {
                    return response.data;
                });
            },
            
            updateNotes:function(notesObject,referenceKey)
            {
           return dataService.update(notesObject, 'referenceKey=' + referenceKey, '`person.notes`', config.OFFLINE_DBNAME, config.API_URL + 'Person/notes/' + referenceKey).then(function (response) {
                return response;
            });        
                
            },
            deleteNotes:function(referenceKey)
            {
           return dataService.delete('referenceKey="' + referenceKey + '"', '`person.notes`', config.OFFLINE_DBNAME, config.API_URL + 'Person/notes/'+referenceKey).then(function (response) {
				 return response;
			 });       
                
            }
            
        }
    });
/* Registration logic  end */