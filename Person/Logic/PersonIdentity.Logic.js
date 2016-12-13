/*=======================================================================
 All rights reserved to Thrill Innovative Labs.
 THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
 OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
 LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
 FITNESS FOR A PARTICULAR PURPOSE.
===========================================================================
****************************************************************************
 Name                : PersonIdentity.Logic.js
 Type                : Angular js
 Description         : This file contains business logic methods
 References          :
 Author              : Sreelakshmi ch
 Created Date        : 12-Apr-2016
****************************************************************************
MODIFICATION LOG
**************************************************************************** 
Ver	Date	     Modified By			Description
****************************************************************************  
Code Review LOG
**************************************************************************** 
Ver        Date                Code Review By            Observations
****************************************************************************
*/

var app = angular.module('ThrillPerson.personIdentityLogic', ['ThrillFrameworkLibrary.DataService'
                         ,'ThrillPerson.personQueries'
                         , 'ThrillPerson.Config'
                         , 'ThrillCnnWebClient.appConfig'
                         , 'ThrillFrameworkLibrary.appLogger'
])

//Create Business Logic Factory Method for personIdentity 


.factory('personIdentityLogic', function ($http
        , dataService
        , personQueries
        , personconfig
        , appConfig
        , appLogger)

    {


        return {

            //Logic  to getIdentityTypes 

            getIdentityTypes: function () {
                if (appConfig.APP_MODE == 'offline') {
                    var query = personQueries.identityTypes;
                    return dataService.executeQuery(query, personconfig.OFFLINE_DBNAME).then(function (response) {
                        var IdentityTypes = [];
                        for (var i = 0; i < response.rows.length; i++) {
                            var identityTypesObj = {
                                IdentityTypeID: response.rows.item(i).identityTypeId
                                , IdentityTypeName: response.rows.item(i).identityTypeName
                            };
                            IdentityTypes.push(identityTypesObj);

                        }
                        return IdentityTypes;
                    });
                } else {
                    return dataService.callAPI(personconfig.API_URL + 'identityTypes', [], 'GET').then(function (response) {
                        return response.data;
                    });
                }

            },

            //Logic for adding personIdentity
            addPersonIdentity: function (personIdentityObj, personReferenceKey) {
                return dataService.insert(personIdentityObj, '`person.identities`', personconfig.OFFLINE_DBNAME, personconfig.API_URL + 'persons/' + personReferenceKey + '/identities').then(function (response) {
                    return response;
                });
            },

            //Logic for retrieving personIdentity details by identityId 
            getPersonidentityById: function (personReferenceKey, identityReferenceKey) {
                if (appConfig.APP_MODE == 'offline') {
                    var query = personQueries.identityById + "'" + identityReferenceKey + "'";

                    return dataService.executeQuery(query, personconfig.OFFLINE_DBNAME).then(function (response) {
                        var identityObj = {};
                        if (response.rows.length == 1) {

                            identityObj = {
                                referenceKey: response.rows.item(0).referenceKey
                                , identityTypeId: response.rows.item(0).identityTypeId
                                , identityTypeName: response.rows.item(0).identityTypeName
                                , identityNumber: response.rows.item(0).identityNumber
                                , n3DMSFileKey: response.rows.item(0).n3DMSFileKey
                                , personReferenceKey: response.rows.item(0).personReferenceKey
                            };
                        }
                        return identityObj;
                    });
                } else {
                    return dataService.callAPI(personconfig.API_URL + 'persons/' + personReferenceKey + '/identities/' + identityReferenceKey, [], 'GET').then(function (response) {
                        return response.data[0];
                    });
                }

            }
            , //Logic for retrieving personIdentity list by Person ID
            getPersonIdentity: function (personReferenceKey) {
                if (appConfig.APP_MODE == 'offline') {
                    var query = personQueries.identites + "'" + personReferenceKey + "'";
                    return dataService.executeQuery(query, personconfig.OFFLINE_DBNAME).then(function (response) {
                        var personIdentityList = [];
                        for (var i = 0; i < response.rows.length; i++) {

                            var PersonIdentityObj = {
                                referenceKey: response.rows.item(i).referenceKey
                                , identityTypeId: response.rows.item(i).identityTypeId
                                , identityTypeName: response.rows.item(i).identityTypeName
                                , identityNumber: response.rows.item(i).identityNumber
                                , n3DMSFileKey: response.rows.item(i).n3DMSFileKey
                                , personReferenceKey: response.rows.item(i).personReferenceKey


                            };
                            personIdentityList.push(PersonIdentityObj);

                        }



                        return personIdentityList;
                    });
                } else {

                    return dataService.callAPI(personconfig.API_URL + 'persons/' + personReferenceKey + '/identities', [], 'GET').then(function (response) {
                        return response.data;
                    });
                }

            },

            //Logic for deleting personIdentity by identityId
            deletePersonIdentity: function (personReferenceKey, identityReferenceKey) {
                return dataService.delete('referencekey=' + "'" + identityReferenceKey + "'", '`person.identities`', personconfig.OFFLINE_DBNAME, personconfig.API_URL + 'persons/' + personReferenceKey + '/identities/' + identityReferenceKey).then(function (response) {
                    return response;
                });
            },

            //Logic  for updating personIdentity by identityId
            updatePersonidentity: function (personIdentityObj, personReferenceKey, identityReferenceKey) {
                return dataService.update(personIdentityObj, 'referencekey=' + "'" + identityReferenceKey + "'", '`person.identities`', personconfig.OFFLINE_DBNAME, personconfig.API_URL + 'persons/' + personReferenceKey + '/identities/' + identityReferenceKey).then(function (response) {
                    return response;
                });
            },


        }
    });