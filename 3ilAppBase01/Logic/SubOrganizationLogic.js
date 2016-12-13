/*=======================================================================
 All rights reserved to Thrill Innovative Labs.
 THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
 OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
 LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
 FITNESS FOR A PARTICULAR PURPOSE.
===========================================================================
****************************************************************************
 Name                : Organization.Logic.js
 Type                : Javascript and JQuery 
 Description         : This file contains business logic methods
 References          :
 Author              : kalyani
 Created Date        : 11-Apr-2016
****************************************************************************
MODIFICATION LOG
**************************************************************************** 
S.No Ver	Date:	     Modified By:		Description:
1          12-04-2016    Kiranmai            dependency structure changed
****************************************************************************  
Code Review LOG
**************************************************************************** 
S.No      Ver        Date                Code Review By            Observations
1         1.0       13-April-2016         Sri Venkatesh.T           write function  params a meaningful name don't use shartcut name ex: orgid for  updateOrganization
****************************************************************************
*/

var app = angular.module('ThrillAppBase.appBaseSubOrganizationLogic', ['ThrillFrameworkLibrary.DataService'
    //, 'ThrillAppBase.AppBaseQueries'
    , 'ThrillAppBase.config', 'ThrillCnnWebClient.appConfig', 'ThrillFrameworkLibrary.appLogger', 'ThrillOrganization.organizationLogic', 'ThrillContact.contactLogic', 'ThrillLocation.addressLogic', 'ThrillOrganization.config'
]);
/*Create Business Logic Factory Method */

app.factory('appBaseSubOrganizationLogic', function($http, dataService
    // , AppBaseQueries


    , config, appConfig, appLogger, organizationLogic, contactLogic, orgconfig, addressLogic
) {

    return {
        
        getRecognitionTypes:function()
{
 return dataService.callAPI(config.API_URL + 'Mcampuz/instituterecognitions', [], 'GET').then(function(response) {

               
                return response.data;
            });

},


        addSubOrganization: function(subOrganizationObj) {

            var subOrganizationBasicInfo = subOrganizationObj.basicInfo;

            return organizationLogic.addOrganization(subOrganizationBasicInfo).then(function(response) {

                var subOrganizationKey = response.data.organizationKey;
                /*
                                subOrganizationObj.address.entityReferenceKey = subOrganizationKey;
                                subOrganizationObj.address.entityTypeId = 2;
                                subOrganizationObj.address.geoLocation = "NA";*/
                addressLogic.addAddress(subOrganizationObj.address).then(function(response) {
                    appLogger.log('add address response' + JSON.stringify(response))
                    subOrganizationObj.basicInfo.addresskey = response.data.referenceKey
                    return organizationLogic.updateOrganization(subOrganizationObj.basicInfo, subOrganizationKey).then(function(response) {});
                })


                if (subOrganizationObj.profilePic != null && subOrganizationObj.profilePic != undefined) {
                    // create folder
                    var folderObj = {
                        FolderName: subOrganizationKey,
                        EntityKey: subOrganizationKey,
                        EntityType: "Organization"
                    };

                    var folderKey = subOrganizationObj.basicInfo.folderKey;
                    var fileKey = subOrganizationObj.basicInfo.n3DMSFileKey;

                    dataService.insert(folderObj, '`3ilAppBase01.dms`', config.OFFLINE_DBNAME, config.API_URL + 'dms/folders').then(function(response) {
                        appLogger.log('folder response ' + JSON.stringify(response));
                        if (response.data[0][0].FolderKey != undefined) {
                            folderKey = response.data[0][0].FolderKey;
                        }

                        var postFileObj = {};

                        postFileObj.fileBase64Data = 'data:' + subOrganizationObj.profilePic.filetype + ';base64,' + subOrganizationObj.profilePic.base64;
                        postFileObj.fileName = subOrganizationObj.profilePic.filename;
                        postFileObj.fileSize = subOrganizationObj.profilePic.filesize;
                        postFileObj.fileType = subOrganizationObj.profilePic.filetype;


                        dataService.insert(postFileObj, '`3ilAppBase01.dms`', config.OFFLINE_DBNAME, config.API_URL + 'dms/folders/' + folderKey + '/files').then(function(response) {
                            appLogger.log('file response ' + JSON.stringify(response));
                            fileKey = response.data[0][0].Filekey;

                            subOrganizationObj.basicInfo.folderKey = folderKey
                            subOrganizationObj.basicInfo.n3DMSFileKey = fileKey

                            return organizationLogic.updateOrganization(subOrganizationObj.basicInfo, subOrganizationKey).then(function(response) {

                            });

                        });


                    });


                }

                return response;
            }, function(err) {
                console.error('ERR', err);
            });

        },

        updateSubOrganization: function(subOrganizationObj, subOrganizationKey) {


            if (subOrganizationObj.address.addressKey == undefined) {
                addressLogic.addAddress(subOrganizationObj.address).then(function(response) {
                    appLogger.log('add address response' + JSON.stringify(response))
                    subOrganizationObj.basicInfo.addresskey = response.data.referenceKey
                    organizationLogic.updateOrganization(subOrganizationObj.basicInfo, subOrganizationKey).then(function(response) {});

                })
            } else {
                addressLogic.updateAddress(subOrganizationObj.address, subOrganizationObj.address.addressKey).then(function(response) {
                    appLogger.log('update address response' + JSON.stringify(response))
                })

            }




            return organizationLogic.updateOrganization(subOrganizationObj.basicInfo, subOrganizationKey).then(function(response) {
                console.log('update org response' + JSON.stringify(response));

                if (subOrganizationObj.profilePic != null && subOrganizationObj.profilePic != undefined) {
                    // create folder
                    var folderObj = {
                        FolderName: subOrganizationKey,
                        EntityKey: subOrganizationKey,
                        EntityType: "Organization"
                    };

                    var folderKey = subOrganizationObj.basicInfo.folderKey;
                    var fileKey = subOrganizationObj.basicInfo.n3DMSFileKey;

                    dataService.insert(folderObj, '`3ilAppBase01.dms`', config.OFFLINE_DBNAME, config.API_URL + 'dms/folders').then(function(response) {
                        appLogger.log('folder response ' + JSON.stringify(response));
                        if (response.data[0][0].FolderKey != undefined) {
                            folderKey = response.data[0][0].FolderKey;
                        }

                        var postFileObj = {};

                        postFileObj.fileBase64Data = 'data:' + subOrganizationObj.profilePic.filetype + ';base64,' + subOrganizationObj.profilePic.base64;
                        postFileObj.fileName = subOrganizationObj.profilePic.filename;
                        postFileObj.fileSize = subOrganizationObj.profilePic.filesize;
                        postFileObj.fileType = subOrganizationObj.profilePic.filetype;


                        dataService.insert(postFileObj, '`3ilAppBase01.dms`', config.OFFLINE_DBNAME, config.API_URL + 'dms/folders/' + folderKey + '/files').then(function(response) {
                            appLogger.log('file response ' + JSON.stringify(response));
                            fileKey = response.data[0][0].Filekey;

                            subOrganizationObj.basicInfo.folderKey = folderKey
                            subOrganizationObj.basicInfo.n3DMSFileKey = fileKey

                            return organizationLogic.updateOrganization(subOrganizationObj.basicInfo, subOrganizationKey).then(function(response) {

                            });

                        });


                    });


                }
                return response;
            });
        },

        getSubOrganization: function(subOrganizationKey) {
            var organization = {};
            return organizationLogic.getOrganizationInfoById(subOrganizationKey).then(function(response) {
                console.log('get org by key ' + subOrganizationKey + JSON.stringify(response));
                organization.basicInfo = response;

                var orgKey = response.referenceKey;
                /*
                                return contactLogic.getContactsByEntityKeys(orgKey).then(function (response) {
                                    console.log('get contacts' + JSON.stringify(response))
                                    organization.contacts = response;

                                    return organization;
                                })*/
                return organization;
            })
        },

        getSubOrganizationsList: function(parentOrganizationKey) {
            return dataService.callAPI(orgconfig.API_URL + 'organizations/' + parentOrganizationKey + '/subOrgs', [], 'GET').then(function(response) {

                console.log(JSON.stringify(response.data));
                return response.data;
            });
        },

        getSubOrganizationProfilePicture: function(folderKey, fileKey) {
            return dataService.callAPI(config.API_URL + 'dms/folders/' + folderKey + '/files/' + fileKey, [], 'GET').then(function(response) {

                return response.data[0][0];
            });
        }

    };
});