/*=======================================================================
 All rights reserved to Thrill Innovative Labs.
 THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
 OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
 LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
 FITNESS FOR A PARTICULAR PURPOSE.
===========================================================================
****************************************************************************
 Name                : 
 Type                : Javascript and JQuery 
 Description         : This file contains business logic methods
 References          :
 Author              : 
 Created Date        : 
****************************************************************************
MODIFICATION LOG
**************************************************************************** 
S.No Ver	Date:	     Modified By:		Description:

****************************************************************************  
Code Review LOG
**************************************************************************** 
S.No      Ver        Date                Code Review By            Observations

****************************************************************************
*/

var app = angular.module('ThrillAppBase.personSettingsLogic', ['ThrillFrameworkLibrary.DataService'
    //, 'ThrillAppBase.AppBaseQueries'
    , 'ThrillAppBase.config'
    , 'ThrillCnnWebClient.appConfig'
    , 'ThrillFrameworkLibrary.appLogger'
    , 'ThrillOrganization.departmentLogic'
                                                               
    ]);
/*Create Business Logic Factory Method */

app.factory('personSettingsLogic'
    , function ($http
        , dataService
       // , AppBaseQueries
        , config
        , appConfig
        , appLogger
        , contactLogic
        , orgconfig
        , departmentLogic
    ) {

        return {
            
                  getStaffProfilePicture: function(folderKey, fileKey) {
            return dataService.callAPI(config.API_URL + 'dms/folders/' + folderKey + '/files/' + fileKey, [], 'GET').then(function(response) {

                return response.data[0][0];
            });
        },
            
getPersonDetails:function(personReferenceKey)
            {
         return dataService.callAPI(config.API_URL + 'Person/persons/'+personReferenceKey, [], 'GET').then(function (response) {
                return response.data;
            });        
            },
            
            getUserDetails: function (personKey) {
            return dataService.callAPI(config.API_URL + 'Security/personKey/'+personKey, [], 'GET').then(function (response) {
                return response.data;
            });
        },
                  getStaffDetails: function (staffKey) {
            return dataService.callAPI(config.API_URL + 'Staff/Staff/'+staffKey, [], 'GET').then(function (response) {
                return response.data;
            });
        },
           getOrganizationDetails: function (organizationReferenceKey) {
            return dataService.callAPI(config.API_URL + 'Organization/organizations/'+organizationReferenceKey, [], 'GET').then(function (response) {
                return response.data;
            });
        },
               updatePerson: function(personObj, personKey) {

                   var userObject={
                    MobileNumber:personObj.MobileNumber
                };  
                 
             return dataService.update( userObject, 'ReferenceKey=' + "'" + personKey + "'", '`security.users`', config.OFFLINE_DBNAME, config.API_URL + 'Security/persons/' + personKey).then(function(response) {
                 
               return response;  
                 
             }).then(function (response)
                    {
               if (personObj.ProfilePic != null || personObj.ProfilePic != undefined) {
                     
                    if(personObj.FolderKey=="NULL" || personObj.FolderKey==undefined)
                        {
                
                    var folderObj = {
                        FolderName: personKey,
                        EntityKey: personKey,
                        EntityType: "Person"
                    };
                    var folderKey ;
                    var fileKey;
                    return dataService.insert(folderObj, '`3ilAppBase01.dms`', config.OFFLINE_DBNAME, config.API_URL + 'dms/folders').then(function(response) {
                        if (response.data[0][0].FolderKey != undefined) {
                            folderKey = response.data[0][0].FolderKey;
                        }

                        var postFileObj = {};

                        postFileObj.fileBase64Data = 'data:' + personObj.ProfilePic.filetype + ';base64,' + personObj.ProfilePic.base64;
                        postFileObj.fileName = personObj.ProfilePic.filename;
                        postFileObj.fileSize = personObj.ProfilePic.filesize;
                        postFileObj.fileType = personObj.ProfilePic.filetype;


                        return dataService.insert(postFileObj, '`3ilAppBase01.dms`', config.OFFLINE_DBNAME, config.API_URL + 'dms/folders/' + folderKey + '/files').then(function(response) {
                            //appLogger.log('file response ' + JSON.stringify(response));
                            fileKey = response.data[0][0].Filekey;

                            personObj.FolderKey = folderKey
                            personObj.DMSFileKey = fileKey
                            delete personObj.ProfilePic;
                            delete personObj.MobileNumber; 
                            console.log(personObj);
                            return dataService.update(personObj, 'ReferenceKey=' + "'" + personKey + "'", '`person.persons`', config.OFFLINE_DBNAME, config.API_URL + 'Person/personsprofile/' + personKey).then(function(response) {
                              
                                return response;
                               
                            });

                        });


                    });
 }
                   else
                        {
                            
                         var postFileObj = {};
                        var fileKey;
                        postFileObj.fileBase64Data = 'data:' + personObj.ProfilePic.filetype + ';base64,' + personObj.ProfilePic.base64;
                        postFileObj.fileName = personObj.ProfilePic.filename;
                        postFileObj.fileSize = personObj.ProfilePic.filesize;
                        postFileObj.fileType = personObj.ProfilePic.filetype;
                                              
                           var folderKey=personObj.FolderKey;
                          
                      
                        return dataService.insert(postFileObj, '`3ilAppBase01.dms`', config.OFFLINE_DBNAME, config.API_URL + 'dms/folders/' + folderKey + '/files').then(function(response) {
                            appLogger.log('file response ' + JSON.stringify(response));
                            fileKey = response.data[0][0].Filekey;

                            personObj.FolderKey = folderKey
                            personObj.DMSFileKey = fileKey
                            delete personObj.ProfilePic;
                            delete personObj.MobileNumber; 
                            console.log(personObj);
                            return dataService.update(personObj, 'ReferenceKey=' + "'" + personKey + "'", '`person.persons`', config.OFFLINE_DBNAME, config.API_URL + 'Person/personsprofile/' + personKey).then(function(response) {
                              
                               return response;
                               
                            });

                        });
      
                            
                        }

                }     
                 
                 
             });
  

               
            },
            
            
            
            

        };
    });