/*//=============================================================================
// All rights reserved to Thrill Innovative Labs.
// THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
// OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
// LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
// FITNESS FOR A PARTICULAR PURPOSE.
//=============================================================================
//*****************************************************************************
//* Name		    	: ContactContactItem.Logic.js 
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
var app = angular.module('ThrillContact.contactContactItemLogic', ['ThrillFrameworkLibrary.DataService'
        , 'ThrillContact.contactContactItemQueries'
        , 'ThrillContact.config'
        , 'ThrillCnnWebClient.appConfig'
        , 'ThrillFrameworkLibrary.appLogger'
	]).factory('contactContactItemLogic', function ($http, dataService, contactContactItemQueries, contactconfig, appConfig, appLogger) {
    return {
        addContactContactItem: function (contactItemObject, contactKey) {
            if (appConfig.APP_MODE == 'offline') {
                if (contactItemObject.hasOwnProperty('isPrimary')) {
                    if (contactItemObject.isPrimary == 1) {
                        var updateObj = {
                            "isPrimary": 0
                        }
                        var whereCondition = "contactKey = '" + contactKey + "' and contactTypeKey = '" + contactItemObject.contactTypeKey + "'";
                        // updating existing IsPrimary ='0' then insert
                        return dataService.update(updateObj, whereCondition, '`Contact.contactItems`', contactconfig.OFFLINE_DBNAME, ' ').then(function (response) {
                            return dataService.insert(contactItemObject, '`Contact.contactItems`', contactconfig.OFFLINE_DBNAME, ' ').then(function (response) {
                                return response;
                            });
                        });
                    }
                    else {
                        return dataService.insert(contactItemObject, '`Contact.contactItems`', contactconfig.OFFLINE_DBNAME, ' ').then(function (response) {
                            return response;
                        });
                    }
                }
                else {
                    return dataService.insert(contactItemObject, '`Contact.contactItems`', contactconfig.OFFLINE_DBNAME, ' ').then(function (response) {
                        return response;
                    });
                }
            }
            else {
                appLogger.log('contactItem url :' + contactconfig.API_URL + 'Contacts/' + contactKey + '/ContactItems' + '  obj ' + JSON.stringify(contactItemObject));
                return dataService.insert(contactItemObject, '`Contact.contactItems`', contactconfig.OFFLINE_DBNAME, contactconfig.API_URL + 'Contacts/' + contactKey + '/ContactItems').then(function (response) {
                    appLogger.log('contact response  ' + JSON.stringify(response))
                    return response;
                });
            }
        }
        , updateContactContactItem: function (contactItemObject, contactKey, contactItemKey) {
            if (appConfig.APP_MODE == 'offline') {
                if (contactItemObject.hasOwnProperty('isPrimary')) {
                    if (contactItemObject.isPrimary == 1) {
                        var updateObj = {
                            "isPrimary": 0
                        }
                        var whereConditionForIsPrimary = "contactKey = '" + contactKey + "' and contactTypeKey = '" + contactItemObject.contactTypeKey + "'";
                        // updating existing IsPrimary ='0' then update
                        return dataService.update(updateObj, whereConditionForIsPrimary, '`Contact.contactItems`', contactconfig.OFFLINE_DBNAME, ' ').then(function (response) {
                            return dataService.update(contactItemObject, 'contactItemKey="' + contactItemKey + '"', '`Contact.contactItems`', contactconfig.OFFLINE_DBNAME, ' ').then(function (response) {
                                return response;
                            });
                        });
                    }
                    else {
                        return dataService.update(contactItemObject, 'contactItemKey="' + contactItemKey + '"', '`Contact.contactItems`', contactconfig.OFFLINE_DBNAME, ' ').then(function (response) {
                            return response;
                        });
                    }
                }
                else {
                    return dataService.update(contactItemObject, 'contactItemKey="' + contactItemKey + '"', '`Contact.contactItems`', contactconfig.OFFLINE_DBNAME, contactconfig.API_URL + 'contacts/' + contactKey + '/contactItems/' + contactItemKey).then(function (response) {
                        return response;
                    });
                }
            }
            else {
                return dataService.update(contactItemObject, 'contactItemKey="' + contactItemKey + '"', '`Contact.contactItems`', contactconfig.OFFLINE_DBNAME, contactconfig.API_URL + 'contacts/' + contactKey + '/contactItems/' + contactItemKey).then(function (response) {
                    return response;
                });
            }
        }
        , updateContactItem: function (contactItemObject) {
            return dataService.update(contactItemObject, 'ContactKey=' + "'" + contactItemObject.contactKey + "'", '`contact.contactItems`', contactconfig.OFFLINE_DBNAME, contactconfig.API_URL + 'ContactItems/' + contactItemObject.contactKey).then(function (response) {
                return response;
            });
        }
        , addContactItem: function (contactItemObject) {
            return dataService.update(contactItemObject, '`Contact.contactItems`', contactconfig.OFFLINE_DBNAME, contactconfig.API_URL + 'ContactItems').then(function (response) {
                return response;
            });
        }
        , /*get all contact type details--drop down*/
        getContactTypes: function () {
            var query = contactContactItemQueries.contactTypeDetails;
            //console.log(query);
            if (appConfig.APP_MODE == 'offline') {
                return dataService.executeQuery(query, contactconfig.OFFLINE_DBNAME).then(function (response) {
                    //	console.log(response.rows.item(0));
                    var ContactTypeList = [];
                    for (var i = 0; i < response.rows.length; i++) {
                        var contactTypeObj = {
                            contactTypeKey: response.rows.item(i).contactTypeKey
                            , contactTypeTitle: response.rows.item(i).contactTypeTitle
                        , };
                        ContactTypeList.push(contactTypeObj);
                    }
                    return ContactTypeList;
                });
            }
            else {
                return dataService.callAPI(contactconfig.API_URL + 'ContactTypes', [], 'GET').then(function (response) {
                    return response.data;
                });
            }
        }
        , getAllContactItems: function (contactKey) {
            var query = contactContactItemQueries.getContactItems(contactKey);
            // console.log(query);
            if (appConfig.APP_MODE == 'offline') {
                //alert("offline")
                return dataService.executeQuery(query, contactconfig.OFFLINE_DBNAME).then(function (response) {
                    var contactList = [];
                    for (var i = 0; i < response.rows.length; i++) {
                        //console.log(response.rows.item(i));
                        var contactBasicInfoObj = {
                            contactItemInfo: response.rows.item(i).contactItemInfo
                            , contactItemKey: response.rows.item(i).contactItemKey
                            , contactTypeKey: response.rows.item(i).contactTypeKey
                            , contactKey: response.rows.item(i).contactKey
                            , contactTypeTitle: response.rows.item(i).contactTypeTitle
                            , isPrimary: response.rows.item(i).isPrimary
                        };
                        contactList.push(contactBasicInfoObj);
                    }
                    return contactList;
                });
            }
            else {
                return dataService.callAPI(contactconfig.API_URL + 'Contacts/' + contactKey + '/ContactItems', [], 'GET').then(function (response) {
                    return response.data;
                });
            }
        }
        , getContactItemByContactItemKey: function (contactKey, entityKey) {
            var query = contactContactItemQueries.getContactItemByContactItemKey(entityKey);
            if (appConfig.APP_MODE == 'offline') {
                return dataService.executeQuery(query, contactconfig.OFFLINE_DBNAME).then(function (response) {
                    var contactItemList = [];
                    for (var i = 0; i < response.rows.length; i++) {
                        var tempEntityContactItem = {
                            contactItemKey: response.rows.item(i).contactItemKey
                            , contactItemInfo: response.rows.item(i).contactItemInfo
                            , contactTypeKey: response.rows.item(i).contactTypeKey
                            , contactKey: response.rows.item(i).contactKey
                            , isPrimary: response.rows.item(i).isPrimary
                        };
                        //console.log(tempEntityContactItem);
                        contactItemList.push(tempEntityContactItem);
                        // alert(JSON.stringify(contactItemList));
                    }
                    //console.log(contactItemList);
                    return contactItemList;
                });
            }
            else {
                return dataService.callAPI(contactconfig.API_URL + 'Contacts/' + contactKey + '/contactItems/' + entityKey, [], 'GET').then(function (response) {
                    //console.log(contactconfig.API_URL + 'Contacts/' + contactKey + '/contactItems/'+ entityKey)
                    return response.data;
                });
            }
        }
        , deleteContactContactItem: function (contactKey, entityKey) {
            return dataService.delete('contactItemKey = "' + entityKey + '"', '`Contact.contactItems`', contactconfig.OFFLINE_DBNAME, contactconfig.API_URL + 'contacts/' + contactKey + '/contactItems/' + entityKey).then(function (response) {
                return response;
            });
        }
    }
});