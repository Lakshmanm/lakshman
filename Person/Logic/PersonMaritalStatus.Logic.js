/*=======================================================================
 All rights reserved to Thrill Innovative Labs.
 THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
 OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
 LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
 FITNESS FOR A PARTICULAR PURPOSE.
===========================================================================
****************************************************************************
 Name                : Person Marital Status.Logic.js
 Type                : Angular js
 Description         : This file contains business logic methods
 References          :
 Author              : Kiranmai L
 Created Date        : 19-Apr-2016
****************************************************************************
MODIFICATION LOG
**************************************************************************** 
S.No.  Ver          Date         Modified By    Description
1.     1.0          21-04-2016   Kiranmai      Define offline BL
2.     1.0          29-04-2019   Kiranmai    Define ReferenceKey and changing Service API calls        
****************************************************************************  
Code Review LOG
**************************************************************************** 
S.No    Ver    Date           Code Review By   Observations

****************************************************************************
*/

var app = angular.module('ThrillPerson.personMaritalStatusLogic', ['ThrillFrameworkLibrary.DataService'

        
        , 'ThrillPerson.personQueries'

        
        , 'ThrillPerson.Config'

        
        , 'ThrillCnnWebClient.appConfig'

        
        , 'ThrillFrameworkLibrary.appLogger'])
    //Create Business Logic Factory Method 


.factory('PersonMaritalStatusLogic'
    , function ($http
        , dataService
        , personQueries
        , personconfig
        , appConfig
        , appLogger) {

        return {
            //CRUD Operations for Person Marital Status

            //Method for adding Marital Status
            addMaritalStatus: function (personmaritalObj, personReferenceKey) {
                return dataService.insert(personmaritalObj, '`person.maritalStatus`', personconfig.OFFLINE_DBNAME, personconfig.API_URL + 'persons/' + personReferenceKey + '/maritalstatus ').then(function (response) {
                    return response;
                });
            },

            //Method for updating Marital Status
            updateMaritalStatus: function (personmaritalupdateObj, personReferenceKey, maritalStatusReferenceKey) {
                return dataService.update(personmaritalupdateObj, 'referenceKey=' + "'" + maritalStatusReferenceKey + "'", '`person.maritalStatus`', personconfig.OFFLINE_DBNAME, personconfig.API_URL + 'persons/' + personReferenceKey + '/maritalstatus/' + maritalStatusReferenceKey).then(function (response) {
                    return response;
                });
            },

            //Method for deleting Marital Status
            deleteMaritalStatusById: function (personReferenceKey, maritalStatusReferenceKey) {
                return dataService.delete('referenceKey=' + "'" + maritalStatusReferenceKey + "'", '`person.maritalStatus`', personconfig.OFFLINE_DBNAME, personconfig.API_URL + 'persons/' + personReferenceKey + '/maritalstatus/' + maritalStatusReferenceKey).then(function (response) {
                    return response;
                });
            },



            /*get all Marital Status Type list--drop down*/



            getMaritalStatusTypes: function () {

                var query = personQueries.MaritalStatusTypes;
                if (appConfig.APP_MODE == 'offline') {
                    return dataService.executeQuery(query, personconfig.OFFLINE_DBNAME).then(function (response) {
                        var MaritalStatusTypesList = [];

                        for (var i = 0; i < response.rows.length; i++) {
                            var maritalTypeObj = {
                                maritalStatusTypeId: response.rows.item(i).MaritalStatusTypeID
                                , maritalStatusTypeName: response.rows.item(i).MaritalStatusTypeName



                            };
                            MaritalStatusTypesList.push(maritalTypeObj);

                        }


                        return MaritalStatusTypesList;
                    });
                } else {
                    return dataService.callAPI(personconfig.API_URL + 'maritalStatusTypes', [], 'GET').then(function (response) {

                        return response.data;
                    });

                }


            },


            //Method for retrieving Marital Status List by person Reference Key
            getMaritalStatusList: function (personReferenceKey) {
                if (appConfig.APP_MODE == 'offline') {
                    var query = personQueries.MaritalStatusList + "'" + personReferenceKey + "'";
                    return dataService.executeQuery(query, personconfig.OFFLINE_DBNAME).then(function (response) {

                        var maritalList = [];
                        for (var i = 0; i < response.rows.length; i++) {
                            var maritalObj = {
                                referenceKey: response.rows.item(i).referenceKey
                                , maritalStatusTypeId: response.rows.item(i).MaritalStatusTypeID
                                , maritalStatusName: response.rows.item(i).MaritalStatusName
                                , maritalStatusTypeName: response.rows.item(i).MaritalStatusTypeName
                                , startDate: new Date(response.rows.item(i).StartDate)
                                , endDate: new Date(response.rows.item(i).EndDate)

                            };

                            maritalList.push(maritalObj);

                        }

                        return maritalList;
                    });
                } else {

                    return dataService.callAPI(personconfig.API_URL + 'persons/' + personReferenceKey + '/maritalstatus', [], 'GET').then(function (response) {
                        return response.data;
                    });
                }

            },

            //Method for retrieving Marital Status details by maritalStatusReferenceKey
            getMaritalStatusById: function (personReferenceKey, maritalStatusReferenceKey) {
                if (appConfig.APP_MODE == 'offline') {

                    var query = personQueries.maritalStatusById + "'" + maritalStatusReferenceKey + "'";
                    return dataService.executeQuery(query, personconfig.OFFLINE_DBNAME).then(function (response) {
                        var maritalObj = {};
                        if (response.rows.length == 1) {
                            maritalObj = {
                                referenceKey: response.rows.item(0).referenceKey
                                , personReferenceKey: response.rows.item(0).personReferenceKey
                                , maritalStatusName: response.rows.item(0).MaritalStatusName
                                , maritalStatusTypeId: response.rows.item(0).MaritalStatusTypeID
                                , startDate: new Date(response.rows.item(0).StartDate)
                                , endDate: new Date(response.rows.item(0).EndDate)

                            };
                        }

                        return maritalObj;
                    });
                } else {

                    return dataService.callAPI(personconfig.API_URL + 'persons/' + personReferenceKey + '/maritalstatus/' + maritalStatusReferenceKey, [], 'GET').then(function (response) {




                        return response.data[0];
                    });
                }

            },




        }
    });