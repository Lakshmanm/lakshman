/*=======================================================================
 All rights reserved to Thrill Innovative Labs.
 THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
 OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
 LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
 FITNESS FOR A PARTICULAR PURPOSE.
===========================================================================
****************************************************************************
 Name                : personAward.Logic.js
 Type                : Angular js
 Description         : This file contains business logic methods
 References          :
 Author              : Sreelakshmi ch
 Created Date        : 18-Apr-2016
****************************************************************************
MODIFICATION LOG
**************************************************************************** 
Ver	Date	     Modified By			Description
****************************************************************************  
Code Review LOG
**************************************************************************** 
Sno# Ver        Date                Code Review By            Observations
****************************************************************************
*/

var app = angular.module('ThrillPerson.personAwardLogic', ['ThrillFrameworkLibrary.DataService'
                                                                , 'ThrillPerson.personQueries'
                                                                , 'ThrillPerson.Config'
                                                                , 'ThrillCnnWebClient.appConfig'
                                                                , 'ThrillFrameworkLibrary.appLogger'])

//Create Business Logic Factory Method for personAwardLogic


.factory('personAwardLogic', function ($http
  
    , dataService
    , personQueries
    , personconfig, appConfig
    , appLogger) {


    return {
        //CRUD Operations for personAwardLogic Details





        //Logic for adding personAward

        addLocation: function (locationObj, personReferenceKey) {
            return dataService.insert(locationObj, '`person.locations`', personconfig.OFFLINE_DBNAME, personconfig.API_URL + 'persons/' + personReferenceKey + '/locations').then(function (response) {
                return response;
            });

        },

        //Logic for adding personAward
        addPersonAward: function (expObj, personReferenceKey) {
            return dataService.insert(expObj, '`person.awards`', personconfig.OFFLINE_DBNAME, personconfig.API_URL + 'persons/' + personReferenceKey + '/awards').then(function (response) {
                return response;
            });

        }
        , //Logic for updating personAward
        updateLocation: function (locationObj, personReferenceKey, locationId) {
            return dataService.update(locationObj, 'locationId=' + locationId, '`person.locations`', personconfig.OFFLINE_DBNAME, personconfig.API_URL + 'persons/' + personReferenceKey + '/locations/' + locationId).then(function (response) {
                return response;
            });

        }
        , //Logic for update personAward by awardReferenceKey
        updatePersonAward: function (expObj, personReferenceKey, awardReferenceKey) {
            return dataService.update(expObj, 'referenceKey=' + "'" + awardReferenceKey + "'", '`person.awards`', personconfig.OFFLINE_DBNAME, personconfig.API_URL + 'persons/' + personReferenceKey + '/awards/' + awardReferenceKey).then(function (response) {
                return response;
            });

        },


        //Logic  for deleting personAward by awardReferenceKey
        deletePersonAward: function (personReferenceKey, awardReferenceKey) {
            return dataService.delete('referenceKey=' + "'" + awardReferenceKey + "'", '`person.awards`', personconfig.OFFLINE_DBNAME, personconfig.API_URL + 'persons/' + personReferenceKey + '/awards/' + awardReferenceKey).then(function (response) {

                return response;
            });
        },



        //Logic for retrieving personAward details by  personReferenceKey


        getAwardList: function (personReferenceKey) {
            if (appConfig.APP_MODE == 'offline') {
                var query = personQueries.Awards + "'" + personReferenceKey + "'";
                return dataService.executeQuery(query, personconfig.OFFLINE_DBNAME).then(function (response) {
                    var awardList = [];

                    for (var i = 0; i < response.rows.length; i++) {

                        var awardListObj = {
                            referenceKey: response.rows.item(i).referenceKey
                            , awardName: response.rows.item(i).awardName
                            , awardedDate: new Date(response.rows.item(i).awardedDate)
                            , description: response.rows.item(i).description
                            , awardedOrganization: response.rows.item(i).awardedOrganization
                            , //LocationID: response.rows.item(i).LocationID,

                            personReferenceKey: response.rows.item(i).personReferenceKey

                        };
                        awardList.push(awardListObj);

                    }

                    return awardList;
                });
            } else {

                return dataService.callAPI(personconfig.API_URL + 'persons/' + personReferenceKey + '/awards', [], 'GET').then(function (response) {
                    return response.data;
                });
            }

        },

        //Logic for retrieving personAward details by  awardReferenceKey


        getAwardListById: function (personReferenceKey, awardReferenceKey) {

            if (appConfig.APP_MODE == 'offline') {

                var query = personQueries.AwardDetailsByID + "'" + awardReferenceKey + "'";

                return dataService.executeQuery(query, personconfig.OFFLINE_DBNAME).then(function (response) {

                    var awardByIdObj = {};

                    if (response.rows.length == 1) {
                        awardByIdObj = {


                            referenceKey: response.rows.item(0).referenceKey
                            , awardName: response.rows.item(0).awardName
                            , awardedDate: new Date(response.rows.item(0).awardedDate),

                            description: response.rows.item(0).description
                            , awardedOrganization: response.rows.item(0).awardedOrganization,

                            locationId: response.rows.item(0).locationId
                            , geoLocation: response.rows.item(0).geoLocation
                            , personReferenceKey: response.rows.item(0).personReferenceKey,


                        };
                    }



                    return awardByIdObj;
                });
            } else {


                return dataService.callAPI(personconfig.API_URL + 'persons/' + personReferenceKey + '/awards/' + awardReferenceKey, [], 'GET').then(function (response) {
                    return response.data[0];
                });
            }

        },



    }
});