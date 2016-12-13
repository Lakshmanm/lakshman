/*//=============================================================================
// All rights reserved to Thrill Innovative Labs.
// THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
// OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
// LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
// FITNESS FOR A PARTICULAR PURPOSE.
//=============================================================================
//*****************************************************************************
//* Name		    	: Contact.Logic.js 
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

var app = angular.module('ThrillContact.contactLogic', ['ThrillFrameworkLibrary.DataService', 'ThrillContact.contactQueries', 'ThrillContact.config', 'ThrillCnnWebClient.appConfig', 'ThrillFrameworkLibrary.appLogger'])
    .factory('contactLogic', function($http,
        dataService,
        contactQueries,
        contactconfig,
        appConfig,
        appLogger) {

        return {

            addContact: function(entityContact) {
                return dataService.insert(entityContact, '`Contact.contacts`', contactconfig.OFFLINE_DBNAME, contactconfig.API_URL + 'contacts').then(function(response) {
                    return response;
                });
            },

            updateContact: function(entityContact, entityKey) {
                return dataService.update(entityContact, 'contactKey="' + entityKey + '"', '`Contact.contacts`', contactconfig.OFFLINE_DBNAME, contactconfig.API_URL + 'contacts/' + entityKey).then(function(response) {
                    return response;
                });
            },


            deleteContact: function(contactKey) {
                return dataService.delete('contactKey="' + contactKey + '"', '`Contact.contacts`', contactconfig.OFFLINE_DBNAME, contactconfig.API_URL + 'Contacts/' + contactKey).then(function(response) {
                    console.log(contactconfig.API_URL + 'Contacts/' + contactKey)
                    return response;
                });
            },


            getContactByContactKey: function(entityKey) {
                var query = contactQueries.getContactByContactKey + "'" + entityKey + "'";
                if (appConfig.APP_MODE == 'offline') {
                    return dataService.executeQuery(query, contactconfig.OFFLINE_DBNAME).then(function(response) {
                        var contactList = [];
                        for (var i = 0; i < response.rows.length; i++) {

                            var tempEntityContact = {
                                contactKey: response.rows.item(i).contactKey,
                            };
                            contactList.push(tempEntityContact);
                        } // end of for loop
                        return contactList;
                    });
                } else {
                    return dataService.callAPI(contactconfig.API_URL + 'Contact/contacts/' + entityKey, [], 'GET').then(function(response) {
                        return response.data;
                    });
                }
            }, // end of get method


            getAllContacts: function(contactKey) {
                    var query = contactQueries.getAllContacts();

                    if (appConfig.APP_MODE == 'offline') {

                        return dataService.executeQuery(query, contactconfig.OFFLINE_DBNAME).then(function(response) {

                            var contactList = [];
                            for (var i = 0; i < response.rows.length; i++) {

                                var tempEntityContact = {
                                    contactKey: response.rows.item(i).contactKey,
                                };
                                contactList.push(tempEntityContact);
                            } // end of for loop
                            return contactList;
                        });
                    } else {
                        return dataService.callAPI(contactconfig.API_URL + 'Contacts/' + contactKey, [], 'GET').then(function(response) {

                            return response.data;
                        });
                    }
                } // end of get method


        } // end of factory
    }); // end of module