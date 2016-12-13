/*=======================================================================
 All rights reserved to Thrill Innovative Labs.
 THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
 OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
 LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
 FITNESS FOR A PARTICULAR PURPOSE.
===========================================================================
****************************************************************************
 Name                : personBank.Logic.js
 Type                : Angular js
 Description         : This file contains business logic methods
 References          :
 Author              : Satyanarayana T
 Created Date        : 13-Apr-2016
****************************************************************************
MODIFICATION LOG
**************************************************************************** 
S.No.   Ver	       Date	         Modified By			Description
1       1.0        29-04-2016    Satya Kalyani Lanka    referenceKey concept implemented
****************************************************************************  
Code Review LOG
**************************************************************************** 
S.No    Ver    Date           Code Review By   Observations
1.      1.0    14-Apr-2016    Ch.Rajaji        Arrange dependency modules line by line in the module  and factory declaration.

****************************************************************************
*/

var app = angular.module('ThrillPerson.personBankLogic', [
    'ThrillFrameworkLibrary.DataService'
    
        , 'ThrillPerson.personQueries'
    
        , 'ThrillPerson.Config'
    
        , 'ThrillCnnWebClient.appConfig'
    
        , 'ThrillFrameworkLibrary.appLogger'])
    /*Create Business Logic Factory Method */


.factory('personBankLogic', function ($http
    , dataService
    , personQueries
    , personconfig
    , appConfig
    , appLogger) {


    return {
        //CRUD Operations for personBank Details

        //Method for adding location
        addLocation: function (locationObj, personReferenceKey) {
            return dataService.insert(locationObj, '`person.locations`', personconfig.OFFLINE_DBNAME, personconfig.API_URL + 'persons/' + personReferenceKey + '/locations').then(function (response) {
                return response;
            });
        },


        //Method for updating location
        updateLocation: function (locationObj, personReferenceKey, locationId) {
            
            return dataService.update(locationObj, 'locationId=' + locationId, '`person.locations`', personconfig.OFFLINE_DBNAME, personconfig.API_URL + 'persons/locations/' + locationId).then(function (response) {
                return response;
            });

        },

        //Logic for adding relative
        addPersonBank: function (bankObj, personReferenceKey) {
            return dataService.insert(bankObj, '`person.banks`', personconfig.OFFLINE_DBNAME, personconfig.API_URL + 'persons/' + personReferenceKey + '/banks').then(function (response) {
                return response;
            });

        }, //Logic for update personBank by bankId
        updatePersonBank: function (bankObj, personReferenceKey, bankReferenceKey) {
           
            return dataService.update(bankObj, 'referenceKey=' + "'" + bankReferenceKey + "'", '`person.banks`', personconfig.OFFLINE_DBNAME, personconfig.API_URL + 'persons/' + personReferenceKey + '/banks/' + bankReferenceKey).then(function (response) {
                return response;
            });

        },

        //to get relationtypes
        getBankNames: function () {
            if (appConfig.APP_MODE == 'offline') {
                var query = personQueries.bankNames;

                return dataService.executeQuery(query, personconfig.OFFLINE_DBNAME).then(function (response) {
                    var bankNames = [];
                    for (var i = 0; i < response.rows.length; i++) {

                        var bankNameObj = {
                            bankNameId: response.rows.item(i).bankNameId
                            , bankName: response.rows.item(i).bankName
                        };

                        bankNames.push(bankNameObj);
                    }
                    return bankNames;

                });
            } else {

                return dataService.callAPI(personconfig.API_URL + 'banknames', [], 'GET').then(function (response) {
                    return response.data;
                });
            }

        },

        /*Logic for retrieving person details by  bankId*/
        getPersonBankById: function (personReferenceKey, bankReferenceKey) {


            if (appConfig.APP_MODE == 'offline') {

                var query = personQueries.bankById + "'" + bankReferenceKey + "'";
                return dataService.executeQuery(query, personconfig.OFFLINE_DBNAME).then(function (response) {

                    var relativeObj = {};
                    if (response.rows.length == 1) {
                        var bankObj = {

                            referenceKey: response.rows.item(0).referenceKey
                            , personReferenceKey: response.rows.item(0).personReferenceKey
                            , bankTitle: response.rows.item(0).bankTitle
                            , branchName: response.rows.item(0).branchName
                            , accountNumber: response.rows.item(0).accountNumber
                            , iFSCCode: response.rows.item(0).iFSCCode
                            , bankNameId: response.rows.item(0).bankNameId
                            , locationId: response.rows.item(0).locationId
                            , geoLocation: response.rows.item(0).geoLocation


                        };
                    }

                    return bankObj;
                });
            } else {
                appLogger.log(personconfig.API_URL + 'persons/' + personReferenceKey + '/banks/' + bankReferenceKey);
                return dataService.callAPI(personconfig.API_URL + 'persons/' + personReferenceKey + '/banks/' + bankReferenceKey, [], 'GET').then(function (response) {
                    return response.data[0];
                });
            }
        },



        /*Logic for retrieving relative details by  personId*/
        getPersonBanks: function (personReferenceKey) {
            if (appConfig.APP_MODE == 'offline') {
                var query = personQueries.banks + "'" + personReferenceKey + "'";
                return dataService.executeQuery(query, personconfig.OFFLINE_DBNAME).then(function (response) {
                    var bankList = [];
                    for (var i = 0; i < response.rows.length; i++) {
                        var bankObj = {
                            referenceKey: response.rows.item(i).referenceKey
                            , bankTitle: response.rows.item(i).bankTitle
                            , branchName: response.rows.item(i).branchName
                            , accountNumber: response.rows.item(i).accountNumber
                            , iFSCCode: response.rows.item(i).iFSCCode
                            , bankNameId: response.rows.item(i).bankNameId
                            , personId: response.rows.item(i).personId
                            , locationId: response.rows.item(i).locationId
                            , geoLocation: response.rows.item(i).geoLocation
                        };
                        bankList.push(bankObj);
                    }
                    return bankList;
                });
            } else {

                return dataService.callAPI(personconfig.API_URL + 'persons/' + personReferenceKey + '/banks', [], 'GET').then(function (response) {

                    return response.data;
                });
            }
        },


        //Method for deleting personBank
        deletePersonBank: function (personReferenceKey, bankReferenceKey) {
            return dataService.delete('referenceKey=' + "'" + bankReferenceKey + "'", '`person.banks`', personconfig.OFFLINE_DBNAME, personconfig.API_URL + 'persons/' + personReferenceKey + '/banks/' + bankReferenceKey).then(function (response) {
                return response;
            });
        }







    }
});