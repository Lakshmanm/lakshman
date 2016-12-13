/*//=============================================================================
// All rights reserved to Thrill Innovative Labs.
// THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
// OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
// LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
// FITNESS FOR A PARTICULAR PURPOSE.
//=============================================================================
//*****************************************************************************
//* Name		    	: Term.Logic.js 
//* Type		    	: Angular JS File
//* Description		    :
//* References		    :
//* Author	    		:
//* Created Date        : 
//*****************************************************************************
//*                             MODIFICATION LOG
//*****************************************************************************
//*  S.No  Ver	     Date	         Modified By			Description

//*****************************************************************************
//*                             Code Review LOG
//*****************************************************************************

//*****************************************************************************
*/
var app = angular.module('ThrillAcademic.termLogic', ['ThrillFrameworkLibrary.DataService'
			 , 'ThrillAcademic.termQueries'
			 , 'ThrillAcademic.config'
			 , 'ThrillCnnWebClient.appConfig'
			 , 'ThrillFrameworkLibrary.appLogger'
	]).factory('termLogic', function ($http, dataService, termQueries, config, appConfig, appLogger) {
    return {
        addTerm: function (entityTerm) {
            return dataService.insert(entityTerm, '`Academic.terms`', config.OFFLINE_DBNAME, config.API_URL + 'Academic/Terms').then(function (response) {
                return response;
            });
        }
        , updateTerm: function (entityTerm, entityKey) {
            return dataService.update(entityTerm, 'termKey="' + entityKey + '"', '`Academic.terms`', config.OFFLINE_DBNAME, config.API_URL + 'Academic/terms/' + entityKey).then(function (response) {
                return response;
            });
        }
        , deleteTerm: function (entityKey) {
            return dataService.delete('termKey="' + entityKey + '"', '`Academic.terms`', config.OFFLINE_DBNAME, config.API_URL + 'Academic/terms/' + entityKey).then(function (response) {
                return response;
            });
        }
        , getTermByTermKey: function (entityKey) {
            var query = termQueries.getTermByTermKey + "'" + entityKey + "'";
            if (appConfig.APP_MODE == 'offline') {
                return dataService.executeQuery(query, config.OFFLINE_DBNAME).then(function (response) {
                    var termList = [];
                    for (var i = 0; i < response.rows.length; i++) {
                        var tempEntityTerm = {
                            termkey: response.rows.item(i).termKey
                            , termtitle: response.rows.item(i).termTitle
                            , coursekey: response.rows.item(i).courseKey
                            , instanceorganizationkey: response.rows.item(i).instanceOrganizationKey
                            , startdate: response.rows.item(i).startDate
                            , enddate: response.rows.item(i).endDate
                            , folderkey: response.rows.item(i).folderKey
                        , };
                        termList.push(tempEntityTerm);
                    } // end of for loop
                    return termList;
                });
            }
            else {
                return dataService.callAPI(config.API_URL + 'Academic/Terms/' + entityKey, [], 'GET').then(function (response) {
                    return response.data;
                });
            }
        }, // end of get method
        getTermByCourseKey: function (courseKey) {
            var query = termQueries.getTermByCourseKey + "'" + courseKey + "'";
            if (appConfig.APP_MODE == 'offline') {
                return dataService.executeQuery(query, config.OFFLINE_DBNAME).then(function (response) {
                    var termList = [];
                    for (var i = 0; i < response.rows.length; i++) {
                        var tempEntityTerm = {
                            termKey: response.rows.item(i).termKey
                            , termTitle: response.rows.item(i).termTitle
                            , termKey: response.rows.item(i).termKey
                            , instanceOrganizationKey: response.rows.item(i).instanceOrganizationKey
                        , };
                        termList.push(tempEntityTerm);
                    } // end of for loop
                    return termList;
                });
            }
            else {
                return dataService.callAPI(config.API_URL + 'Academic/Course/' + courseKey + '/Terms', [], 'GET').then(function (response) {
                    //alert(JSON.stringify(response));
                    return response.data;
                });
            }
        }
        , getAllTerms: function (organizationKey) {
            var query = termQueries.getAllTerms;
            if (appConfig.APP_MODE == 'offline') {
                return dataService.executeQuery(query, config.OFFLINE_DBNAME).then(function (response) {
                    var termList = [];
                    for (var i = 0; i < response.rows.length; i++) {
                        var tempEntityTerm = {
                            termkey: response.rows.item(i).termKey
                            , termtitle: response.rows.item(i).termTitle
                            , coursekey: response.rows.item(i).courseKey
                            , instanceorganizationkey: response.rows.item(i).instanceOrganizationKey
                            , startdate: new Date(response.rows.item(i).startDate)
                            , enddate: new Date(response.rows.item(i).endDate)
                            , folderkey: response.rows.item(i).folderKey
                        , };
                        termList.push(tempEntityTerm);
                    } // end of for loop
                    return termList;
                });
            }
            else {
                return dataService.callAPI(config.API_URL + 'Academic/Organization/' + organizationKey + '/Terms', [], 'GET').then(function (response) {
                    return response.data;
                });
            }
        }, // end of get method
        /*DMS*/
        postDocumentsFolder: function (fileObj) {
            return dataService.insert(fileObj, 'Dms', config.OFFLINE_DBNAME, config.API_URL + 'Dms/folders').then(function (response) {
                return response.data[0];
            });
        }
        , postDocuments: function (fileObj, folderkey) {
            //alert(JSON.stringify(fileObj));
            var postFileObj = {};
            postFileObj.fileBase64Data = 'data:' + fileObj.fileType + ';base64,' + fileObj.fileBase64Data;
            postFileObj.fileName = fileObj.fileName;
            postFileObj.fileSize = fileObj.fileSize;
            postFileObj.fileType = fileObj.fileType;
            return dataService.insert(postFileObj, 'Dms', config.OFFLINE_DBNAME, config.API_URL + 'Dms/folders/' + folderkey + '/files').then(function (response) {
                return response;
            });
        }
        , getFile: function (fileKey, folderKey) {
            console.log(config.API_URL + 'Dms/folders/' + folderKey + '/files/' + fileKey);
            return dataService.callAPI(config.API_URL + 'Dms/folders/' + folderKey + '/files/' + fileKey, [], 'GET').then(function (resp) {
                console.log(resp);
                return resp.data[0];
            });
        }, //method to get all files using folderkey
        getAllFileKeysbyFolderKey: function (folderKey) {
            return dataService.callAPI(config.API_URL + 'Dms/folders/' + folderKey + '/files', [], 'GET').then(function (response) {
                return response.data.data;
            });
        }, //method to get all filesdata using folderkey
        getAllFilesDataByfileKey: function (folderKey, fileKey) {
            return dataService.callAPI(config.API_URL + 'Dms/folders/' + folderKey + '/files/' + fileKey, [], 'GET').then(function (response) {
                return response.data;
            });
        }
        , deleteFile: function (fileKey, folderKey) {

            return dataService.delete('fileKey="' + fileKey + '"', '`dms.files`', config.OFFLINE_DBNAME, config.API_URL + 'dms/folders/' + folderKey + '/files/' + fileKey).then(function (response) {
            
                return response;
            });
        }
        , deleteFileDetails: function (fileKey) {
                //  alert("entered");
                return dataService.delete('fileKey="' + fileKey + '"', '`dms.files`', config.OFFLINE_DBNAME, config.API_URL + 'dms/files/file/' + fileKey).then(function (response) {
                    // alert(JSON.stringify(response));
                    return response;
                });
            } // end of factory
    }
}); // end of module