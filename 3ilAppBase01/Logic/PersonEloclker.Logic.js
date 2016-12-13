var app = angular.module('ThrillMcampuz.personElockerLogic', ['ngCordova', 'ThrillFrameworkLibrary.DataService'
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
    .factory('personElockerLogic', function ($http,
        dataService,
        config,
        appConfig,
        appLogger, registrationLogic, createCalendarLogic, contactLogic, thrillAppBasePersonLogic, personWorkExperienceLogic, ThrillAppBasechildLogic, personBasicInfoLogic, $localStorage) {
        return {

         getDocumentTypes:function()
            {
            
             return dataService.callAPI(config.API_URL + 'Person/identitytypes', [], 'GET').then(function (response) {
                    return response.data;
                });

            },
            
            
              getFileDetails : function(fileKey) 
             {
                 var folderKey="sadasd432423434";
           return dataService.callAPI(config.API_URL + 'dms/folders/' +folderKey+ '/files/'+fileKey, [], 'GET').then(function (resp) {
               
        console.log(resp);
               return resp.data[0];
          
                
            }); 
                      
            },
            
            addElocker:function(elockerObject,personReferenceKey)
            {
              
                    var folderObj = {
                        FolderName: personReferenceKey
                        , EntityKey: personReferenceKey
                        , EntityType: "Organization"
                    };
                var folderKey;
                var fileKey;
                 //  var folderKey = organizationObj.basicInfo.folderKey;
                 //   var fileKey = organizationObj.basicInfo.n3DMSFileKey;
  return dataService.insert(folderObj, '`3ilAppBase01.dms`', config.OFFLINE_DBNAME, config.API_URL + 'dms/folders').then(function (response) {
                       
           appLogger.log('folder response ' + JSON.stringify(response));
                        if (response.data[0][0].FolderKey != undefined) {
                            folderKey = response.data[0][0].FolderKey;
                        }
                        var postFileObj = {};
                        postFileObj.fileBase64Data = 'data:' + elockerObject.documents.filetype + ';base64,' + elockerObject.documents.base64;
                        postFileObj.fileName = elockerObject.documents.filename;
                        postFileObj.fileSize = elockerObject.documents.filesize;
                        postFileObj.fileType = elockerObject.documents.filetype;
 return dataService.insert(postFileObj, '`3ilAppBase01.dms`', config.OFFLINE_DBNAME, config.API_URL + 'dms/folders/' + folderKey + '/files').then(function (response) {
                            appLogger.log('file response ' + JSON.stringify(response));
                            fileKey = response.data[0][0].Filekey;
                           elockerObject.folder = folderKey;
                            elockerObject.n3DMSFileKey = fileKey;
                            delete elockerObject.documents;
  return dataService.insert(elockerObject, '`person.identities`', config.OFFLINE_DBNAME, config.API_URL + 'Person/'+personReferenceKey+'/identities').then(function(response) {
                    return response;
                });
                          
                         
                        });
                    });
                
                
                
            },
            
            getAllDocument:function(personReferenceKey)
            {
            
             return dataService.callAPI(config.API_URL + 'Person/persons/'+personReferenceKey+'/identities', [], 'GET').then(function (response) {
                    return response.data;
                });

            },
            
            getDocument:function(referenceKey,personReferenceKey)
            {
            
             return dataService.callAPI(config.API_URL + 'Person/persons/'+personReferenceKey+'/identities/'+referenceKey, [], 'GET').then(function (response) {
                    return response.data;
                });

            },
          updateElocker:function(elockerObject,referenceKey,personReferenceKey)
            {
               var folderObj = {
                        FolderName: referenceKey
                        , EntityKey: referenceKey
                        , EntityType: "Organization"
                    };
                var folderKey;
                var fileKey;
                 //  var folderKey = organizationObj.basicInfo.folderKey;
                 //   var fileKey = organizationObj.basicInfo.n3DMSFileKey;
  return dataService.insert(folderObj, '`3ilAppBase01.dms`', config.OFFLINE_DBNAME, config.API_URL + 'dms/folders').then(function (response) {
                       
           appLogger.log('folder response ' + JSON.stringify(response));
                        if (response.data[0][0].FolderKey != undefined) {
                            folderKey = response.data[0][0].FolderKey;
                        }
                        var postFileObj = {};
                        postFileObj.fileBase64Data = 'data:' + elockerObject.documents.filetype + ';base64,' + elockerObject.documents.base64;
                        postFileObj.fileName = elockerObject.documents.filename;
                        postFileObj.fileSize = elockerObject.documents.filesize;
                        postFileObj.fileType = elockerObject.documents.filetype;
 return dataService.insert(postFileObj, '`3ilAppBase01.dms`', config.OFFLINE_DBNAME, config.API_URL + 'dms/folders/' + folderKey + '/files').then(function (response) {
                            appLogger.log('file response ' + JSON.stringify(response));
                            fileKey = response.data[0][0].Filekey;
                           elockerObject.folder = folderKey;
                            elockerObject.n3DMSFileKey = fileKey;
                            delete elockerObject.documents;
            
     return dataService.update(elockerObject, 'ReferenceKey="' + referenceKey + '"', '`person.identities`', config.OFFLINE_DBNAME, config.API_URL + 'Person/persons/'+personReferenceKey+'/identities/'+referenceKey).then(function(response) {
                    return response;
                });
                          
                         
                        });
                    });    
                
         
        },
        deleteReferences: function(referenceKey,personReferenceKey)
            {
            return dataService.delete('referenceKey="' + referenceKey + '"', '`person.identities`', config.OFFLINE_DBNAME, config.API_URL + 'Person/persons/'+personReferenceKey+'/identities/'+referenceKey).then(function (response) {
				 return response;
			 }); 
            }
            

        }
    });
/* Registration logic  end */