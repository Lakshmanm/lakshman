/*=======================================================================
 All rights reserved to Thrill Innovative Labs.
 THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
 OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
 LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
 FITNESS FOR A PARTICULAR PURPOSE.
===========================================================================
****************************************************************************
 Name                : PersonDemographic.Logic.js
 Type                : Angular js
 Description         : This file contains business logic methods
 References          :
 Author              : Satyanarayana T
 Created Date        : 12-Apr-2016
****************************************************************************
MODIFICATION LOG
**************************************************************************** 
Ver	Date	     Modified By			Description
****************************************************************************  
Code Review LOG
**************************************************************************** 
S.No    Ver    Date           Code Review By   Observations
1.      1.0    14-Apr-2016    Ch.Rajaji        Arrange dependency modules line by line in the factory declaration.

****************************************************************************
*/

var app = angular.module('ThrillPerson.personDemographicsLogic', ['ThrillFrameworkLibrary.DataService'
                                                              
        , 'ThrillPerson.personQueries'
                                                              
        , 'ThrillPerson.Config'
        ,'ThrillAppBase.config'                                                      
        , 'ThrillCnnWebClient.appConfig', 'ThrillFrameworkLibrary.appLogger'])
    //Create Business Logic Factory Method 


.factory('personDemographicsLogic', function ($http
    , dataService
    , personQueries
    , personconfig
    ,config
    , appConfig
    , appLogger) {

    return {
        //CRUD Operations for Person Demographics

          //Method for adding Demographic
        addDemographic: function (personDemographicObj, personReferenceKey) {
            
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
                        postFileObj.fileBase64Data = 'data:' + personDemographicObj.documents.filetype + ';base64,' + personDemographicObj.documents.base64;
                        postFileObj.fileName = personDemographicObj.documents.filename;
                        postFileObj.fileSize = personDemographicObj.documents.filesize;
                        postFileObj.fileType = personDemographicObj.documents.filetype;
 return dataService.insert(postFileObj, '`3ilAppBase01.dms`', config.OFFLINE_DBNAME, config.API_URL + 'dms/folders/' + folderKey + '/files').then(function (response) {
                            appLogger.log('file response ' + JSON.stringify(response));
                            fileKey = response.data[0][0].Filekey;
                          
                            personDemographicObj.n3DMSFileKey = fileKey;
                            delete personDemographicObj.documents;
   return dataService.insert(personDemographicObj, '`person.demographics`', personconfig.OFFLINE_DBNAME, personconfig.API_URL + 'persons/' + personReferenceKey + '/demographics').then(function (response) {
                return response;
            });
                          
                         
                        });
                    });
            
            
           
        },

 //Method for updating Demographic
        updateDemographic: function (personDemographicObj, personReferenceKey, demographicReferenceKey) {
            
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
                        postFileObj.fileBase64Data = 'data:' + personDemographicObj.documents.filetype + ';base64,' + personDemographicObj.documents.base64;
                        postFileObj.fileName = personDemographicObj.documents.filename;
                        postFileObj.fileSize = personDemographicObj.documents.filesize;
                        postFileObj.fileType = personDemographicObj.documents.filetype;
 return dataService.insert(postFileObj, '`3ilAppBase01.dms`', config.OFFLINE_DBNAME, config.API_URL + 'dms/folders/' + folderKey + '/files').then(function (response) {
                            appLogger.log('file response ' + JSON.stringify(response));
                            fileKey = response.data[0][0].Filekey;
                          
                            personDemographicObj.n3DMSFileKey = fileKey;
                            delete personDemographicObj.documents;
   return dataService.update(personDemographicObj, 'referenceKey=' + "'" + demographicReferenceKey + "'", '`person.demographics`', personconfig.OFFLINE_DBNAME, personconfig.API_URL + 'persons/' + personReferenceKey + '/demographics/' + demographicReferenceKey).then(function (response) {
                return response;
            });
                          
                         
                        });
                    });
            

           
        },

        //Method for deleting Demographic
        deleteDemographic: function (personReferenceKey, demographicReferenceKey) {
            return dataService.delete('referenceKey=' + "'" + demographicReferenceKey + "'", '`person.demographics`', personconfig.OFFLINE_DBNAME, personconfig.API_URL + 'persons/' + personReferenceKey + '/demographics/' + demographicReferenceKey).then(function (response) {
                return response;
            });
        },

        //Method for retrieving Demographic details by Demographic ID
        getDemographicById: function (personReferenceKey, demographicReferenceKey) {

            if (appConfig.APP_MODE == 'offline') {

                var query = personQueries.demographicById + "'" + demographicReferenceKey + "'";

                return dataService.executeQuery(query, personconfig.OFFLINE_DBNAME).then(function (response) {

                    var demographicObj = {};
                    if (response.rows.length == 1) {
                        demographicObj = {
                            referenceKey: response.rows.item(0).referenceKey
                            , height: response.rows.item(0).height
                            , weight: response.rows.item(0).weight
                            , bmi: response.rows.item(0).bmi
                            , inspectionDate: new Date(response.rows.item(0).inspectionDate)
                            , temperature: response.rows.item(0).temperature
                            , hemoglobin: response.rows.item(0).hemoglobin
                            , personReferenceKey: response.rows.item(0).personReferenceKey
                            , photoPath: response.rows.item(0).photoPath
                            , n3DMSFileKey: response.rows.item(0).n3DMSFileKey
                        };
                    }

                    return demographicObj;
                });
            } else {

                return dataService.callAPI(personconfig.API_URL + 'persons/' + personReferenceKey + '/demographics/' + demographicReferenceKey, [], 'GET').then(function (response) {
                    response.data[0].inspectionDate = new Date(response.data[0].inspectionDate);
                    return response.data;
                });
            }

        },

        //Method for retrieving Demographics list by Person ID
        getDemographics: function (personReferenceKey) {
            if (appConfig.APP_MODE == 'offline') {
                var query = personQueries.demographics + "'" + personReferenceKey + "'";
                return dataService.executeQuery(query, personconfig.OFFLINE_DBNAME).then(function (response) {
                    var demographicList = [];
                    for (var i = 0; i < response.rows.length; i++) {
                        var demographicObj = {
                            referenceKey: response.rows.item(i).referenceKey
                            , height: response.rows.item(i).height
                            , weight: response.rows.item(i).weight
                            , bmi: response.rows.item(i).bmi
                            , temperature: response.rows.item(i).temperature
                            , hemoglobin: response.rows.item(i).hemoglobin
                            , inspectionDate: new Date(response.rows.item(i).inspectionDate)
                            , personReferenceKey: response.rows.item(i).personReferenceKey
                            , photoPath: response.rows.item(i).photoPath
                            , n3DMSFileKey: response.rows.item(i).n3DMSFileKey

                        };
                        demographicList.push(demographicObj);

                    }

                    return demographicList;
                });
            } else {

                return dataService.callAPI(personconfig.API_URL + 'persons/' + personReferenceKey + '/demographics', [], 'GET').then(function (response) {
                    return response.data;
                });
            }

        }
    }
});