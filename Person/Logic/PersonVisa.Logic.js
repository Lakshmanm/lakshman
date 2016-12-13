/*=======================================================================
 All rights reserved to Thrill Innovative Labs.
 THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
 OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
 LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
 FITNESS FOR A PARTICULAR PURPOSE.
===========================================================================
****************************************************************************
 Name                : personBasicInfoLogic
 Type                : Angular js
 Description         : This file contains business logic methods
 References          :
 Author              : Satyanarayana
 Created Date        : 07-Apr-2016
****************************************************************************
MODIFICATION LOG
**************************************************************************** 
Ver	Date	     Modified By			Description
****************************************************************************  
Code Review LOG
**************************************************************************** 
S.No    Ver    Date           Code Review By   Observations
1.      1.0    14-Apr-2016    Ch.Rajaji        Arrange dependency modules line by line in the factory declaration.
2.      1.0    14-Apr-2016    Ch.Rajaji        API names should be in camelCase
****************************************************************************
*/

var app = angular.module('ThrillPerson.personVisaLogic', ['ThrillFrameworkLibrary.DataService'
                                                           
        , 'ThrillPerson.personQueries'
                                                           
        , 'ThrillPerson.Config'
                                                           
        , 'ThrillCnnWebClient.appConfig', 'ThrillFrameworkLibrary.appLogger'])
    //Create Business Logic Factory Method 

.factory('personVisaLogic', function ($http
    , dataService
    , personQueries
    , personconfig
    , appConfig
    , appLogger) {


    return {
        // CRUD Operations for person Details

        //Method for get blood groups
        getVisaTypes: function () {

            if (appConfig.APP_MODE == 'offline') {
                var query = personQueries.visaTypes;

                return dataService.executeQuery(query, personconfig.OFFLINE_DBNAME).then(function (response) {
                    var visaTypes = [];
                    for (var i = 0; i < response.rows.length; i++) {
                        var visaTypeObj = {
                            visaTypeId: response.rows.item(i).visaTypeId
                            , visaTypeName: response.rows.item(i).visaTypeName
                        };
                        visaTypes.push(visaTypeObj);

                    }
                    return visaTypes;
                });
            } else {

                return dataService.callAPI(personconfig.API_URL + 'visaTypes', [], 'GET').then(function (response) {

                    return response.data;
                });
            }

        },




        //Method for  getCountries
        getCountries: function () {

            if (appConfig.APP_MODE == 'offline') {
                var query = personQueries.countries;

                return dataService.executeQuery(query, personconfig.OFFLINE_DBNAME).then(function (response) {
                    var countries = [];
                    for (var i = 0; i < response.rows.length; i++) {
                        var countryObj = {
                            countryId: response.rows.item(i).countryId
                            , countryName: response.rows.item(i).countryName
                        };
                        countries.push(countryObj);
                    }
                    return countries;
                });
            } else {


                return dataService.callAPI(personconfig.API_URL + 'countries', [], 'GET').then(function (response) {
                    return response.data;
                });
            }
        },

        // get visa list by person ID
        getVisaList: function (personReferenceKey) {
            if (appConfig.APP_MODE == 'offline') {
                var query = personQueries.visas + "'" + personReferenceKey + "'";


                return dataService.executeQuery(query, personconfig.OFFLINE_DBNAME).then(function (response) {

                    var visas = [];
                    for (var i = 0; i < response.rows.length; i++) {
                        var visaObj = {
                            referenceKey: response.rows.item(i).referenceKey
                            , personReferenceKey: response.rows.item(i).personReferenceKey
                            , countryId: response.rows.item(i).countryId
                            , countryName: response.rows.item(i).countryName
                            , visaTypeId: response.rows.item(i).visaTypeId
                            , visaTypeName: response.rows.item(i).visaTypeName
                            , startDate: new Date(response.rows.item(i).startDate)
                            , endDate: new Date(response.rows.item(i).endDate)
                            , n3DMSFileKey: response.rows.item(i).n3DMSFileKey
                        };
                        visas.push(visaObj);
                    }


                    return visas;
                });
            } else {

                return dataService.callAPI(personconfig.API_URL + 'persons/' + personReferenceKey + '/visas', [], 'GET').then(function (response) {
                    return response.data;
                });
            }
        },

        //Method for retrieving visa details by visa ID
        getVisaById: function (personReferenceKey, visaReferenceKey) {
            if (appConfig.APP_MODE == 'offline') {
                var query = personQueries.visaById + "'" + visaReferenceKey + "'";

                return dataService.executeQuery(query, personconfig.OFFLINE_DBNAME).then(function (response) {
                    var visaObj = {};
                    if (response.rows.length == 1) {
                        visaObj = {
                            referenceKey: response.rows.item(0).referenceKey
                            , personReferenceKey: response.rows.item(0).personReferenceKey
                            , countryId: response.rows.item(0).countryId
                            , countryName: response.rows.item(0).countryName
                            , visaTypeId: response.rows.item(0).visaTypeId
                            , visaTypeName: response.rows.item(0).visaTypeName
                            , startDate: response.rows.item(0).startDate
                            , endDate: response.rows.item(0).endDate
                            , n3DMSFileKey: response.rows.item(0).n3DMSFileKey
                        };
                    }


                    return visaObj;
                });
            } else {

                return dataService.callAPI(personconfig.API_URL + 'persons/' + personReferenceKey + '/visas/' + visaReferenceKey, [], 'GET').then(function (response) {
                    //appLogger.log(JSON.stringify(response));
                    return response.data[0];
                });
            }

        },

        //Method for adding visa
        addVisa: function (personVisaObj, personReferenceKey) {
            // appLogger.log(JSON.stringify(personVisaObj));
            // appLogger.log(JSON.stringify(personconfig.API_URL));
            return dataService.insert(personVisaObj, '`person.visas`', personconfig.OFFLINE_DBNAME, personconfig.API_URL + 'persons/' + personReferenceKey + '/visas').then(function (response) {
                return response;
            });
        },

        //Method for updating visa
        updateVisa: function (personVisaObj, personReferenceKey, visaReferenceKey) {
            return dataService.update(personVisaObj, 'referenceKey=' + "'" + visaReferenceKey + "'", '`person.visas`', personconfig.OFFLINE_DBNAME, personconfig.API_URL + 'persons/' + personReferenceKey + '/visas/' + visaReferenceKey).then(function (response) {
                return response;
            });
        },


        //Method for deleting visa
        deleteVisa: function (personReferenceKey, visaReferenceKey) {

            return dataService.delete('referenceKey=' + "'" + visaReferenceKey + "'", '`person.visas`', personconfig.OFFLINE_DBNAME, personconfig.API_URL + 'visa/visa/' + visaReferenceKey).then(function (response) {
                return response;
            });
        }




    }
});