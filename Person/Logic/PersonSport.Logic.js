/*=======================================================================
 All rights reserved to Thrill Innovative Labs.
 THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
 OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
 LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
 FITNESS FOR A PARTICULAR PURPOSE.
===========================================================================
****************************************************************************
 Name                : personSport.Logic.js
 Type                : Angular js
 Description         : This file contains business logic methods
 References          :
 Author              : Sreelakshmi ch
 Created Date        : 21-Apr-2016
****************************************************************************
MODIFICATION LOG
**************************************************************************** 
Sno Ver	 Date	     Modified By   Description
1.  1.0  29-04-2019  Kiranmai      Define ReferenceKeys and changing Service API Calls
****************************************************************************  
Code Review LOG
**************************************************************************** 
Sno# Ver        Date                Code Review By            Observations
****************************************************************************
*/

var app = angular.module('ThrillPerson.personSportLogic', ['ThrillFrameworkLibrary.DataService'
                                                                
    , 'ThrillPerson.personQueries'
                                                                
    , 'ThrillPerson.Config'
                                                                
    , 'ThrillCnnWebClient.appConfig'
                                                                
    , 'ThrillFrameworkLibrary.appLogger'])

//Create Business Logic Factory Method for personSportLogic


.factory('personSportLogic', function ($http
    , dataService
    , personQueries
    , personconfig, appConfig
    , appLogger) {


    return {
        //CRUD Operations for personSport Details

        //Logic to get getCurricularActivityTypes

        getCurricularActivityTypes: function () {
            if (appConfig.APP_MODE == 'offline') {
                var query = personQueries.curricularActivityType;

                return dataService.executeQuery(query, personconfig.OFFLINE_DBNAME).then(function (response) {
                    var sports = [];
                    for (var i = 0; i < response.rows.length; i++) {

                        var sportObj = {
                            cirricularActivityTypeID: response.rows.item(i).cirricularActivityTypeID
                            , cirricularActivityTypeName: response.rows.item(i).cirricularActivityTypeName
                        };

                        sports.push(sportObj);

                    }


                    return sports;
                });
            } else {

                return dataService.callAPI(personconfig.API_URL + 'cirricularActivityTypes', [], 'GET').then(function (response) {
                    return response.data;
                });
            }

        }, //Logic to  getSportTypes

        getSportTypes: function () {
            if (appConfig.APP_MODE == 'offline') {
                var query = personQueries.sportType;

                return dataService.executeQuery(query, personconfig.OFFLINE_DBNAME).then(function (response) {
                    var sporttype = [];
                    for (var i = 0; i < response.rows.length; i++) {

                        var sportTypes = {
                            sportTypeId: response.rows.item(i).sportTypeId
                            , sportTypeName: response.rows.item(i).sportTypeName
                        };

                        sporttype.push(sportTypes);

                    }


                    return sporttype;
                });
            } else {

                return dataService.callAPI(personconfig.API_URL + 'sportTypes', [], 'GET').then(function (response) {
                    return response.data;
                });
            }

        },

        //Logic to  getHighestLevelPlayTypes

        getHighestLevelPlayTypes: function () {
            if (appConfig.APP_MODE == 'offline') {
                var query = personQueries.highestLevelPlayType;

                return dataService.executeQuery(query, personconfig.OFFLINE_DBNAME).then(function (response) {
                    var sportplay = [];
                    for (var i = 0; i < response.rows.length; i++) {

                        var sportPlayTypeObj = {
                            highestLevelPlayId: response.rows.item(i).highestLevelPlayId
                            , highestLevelPlayName: response.rows.item(i).highestLevelPlayName
                        };

                        sportplay.push(sportPlayTypeObj);

                    }


                    return sportplay;
                });
            } else {

                return dataService.callAPI(personconfig.API_URL + 'highestLevelPlays', [], 'GET').then(function (response) {
                    return response.data;
                });
            }

        },


        //Logic to  getProficiencyTypes

        getProficiencyTypes: function () {
            if (appConfig.APP_MODE == 'offline') {
                var query = personQueries.proficiencies;

                return dataService.executeQuery(query, personconfig.OFFLINE_DBNAME).then(function (response) {
                    var sportProficiencyTypes = [];
                    for (var i = 0; i < response.rows.length; i++) {

                        var sportProficiencyTypesObj = {
                            proficiencyId: response.rows.item(i).proficiencyId
                            , proficiencyName: response.rows.item(i).proficiencyName
                        };

                        sportProficiencyTypes.push(sportProficiencyTypesObj);

                    }


                    return sportProficiencyTypes;
                });
            } else {

                return dataService.callAPI(personconfig.API_URL + 'proficiencies', [], 'GET').then(function (response) {
                    return response.data;
                });
            }

        },






        //Logic for adding addSports
        addSports: function (personSportObj, personReferenceKey) {

            return dataService.insert(personSportObj, '`person.sports`', personconfig.OFFLINE_DBNAME, personconfig.API_URL + 'persons/' + personReferenceKey + '/sports').then(function (response) {
                return response;
            });
        },

        //Logic for retrieving getSportById details by sportAwardId 
        getSportById: function (personReferenceKey, sportReferenceKey) {

            if (appConfig.APP_MODE == 'offline') {



                var query = personQueries.sportsById + "'" + sportReferenceKey + "'";


                return dataService.executeQuery(query, personconfig.OFFLINE_DBNAME).then(function (response) {



                    var SportByIdObj = {};

                    if (response.rows.length == 1) {
                        SportByIdObj = {

                            referenceKey: response.rows.item(0).referenceKey
                            , sportName: response.rows.item(0).sportName
                            , sportTypeID: response.rows.item(0).sportTypeID
                            , highestLevelPlayId: response.rows.item(0).highestLevelPlayId
                            , proficiencyId: response.rows.item(0).proficiencyId
                            , cirricularActivityTypeId: response.rows.item(0).cirricularActivityTypeId
                            , personReferenceKey: response.rows.item(0).personReferenceKey

                        };
                    }



                    return SportByIdObj;
                });
            } else {

                return dataService.callAPI(personconfig.API_URL + 'persons/' + personReferenceKey + '/sports/' + sportReferenceKey, [], 'GET').then(function (response) {
                    return response.data[0];
                });
            }

        },


        //Logic for retrieving getSports list by Person ID
        getSports: function (personReferenceKey) {
            if (appConfig.APP_MODE == 'offline') {
                var query = personQueries.sports + "'" + personReferenceKey + "'";


                return dataService.executeQuery(query, personconfig.OFFLINE_DBNAME).then(function (response) {
                    var personSportsList = [];

                    for (var i = 0; i < response.rows.length; i++) {

                        var PersonSportsListObj = {
                            referenceKey: response.rows.item(i).referenceKey
                            , sportName: response.rows.item(i).sportName
                            , sportTypeID: response.rows.item(i).sportTypeID
                            , sportTypeName: response.rows.item(i).sportTypeName
                            , highestLevelPlayId: response.rows.item(i).highestLevelPlayId
                            , highestLevelPlayName: response.rows.item(i).highestLevelPlayName
                            , cirricularActivityTypeId: response.rows.item(i).cirricularActivityTypeId
                            , cirricularActivityTypeName: response.rows.item(i).cirricularActivityTypeName,

                            personReferenceKey: response.rows.item(i).personReferenceKey

                        };
                        personSportsList.push(PersonSportsListObj);

                    }



                    return personSportsList;
                });
            } else {

                return dataService.callAPI(personconfig.API_URL + 'persons/' + personReferenceKey + '/sports/', [], 'GET').then(function (response) {
                    return response.data;
                });
            }

        },

        //Logic for deleting deleteSport by sportReferenceKey
        deleteSport: function (personReferenceKey, sportReferenceKey) {
            return dataService.delete('referenceKey=' + "'" + sportReferenceKey + "'", '`person.sports`', personconfig.OFFLINE_DBNAME, personconfig.API_URL + 'persons/' + personReferenceKey + '/sports/' + sportReferenceKey).then(function (response) {
                return response;
            });
        },

        //Logic  for updating deleteSport by sportReferenceKey
        updateSport: function (personsportObj, personReferenceKey, sportReferenceKey) {
            return dataService.update(personsportObj, 'referenceKey=' + "'" + sportReferenceKey + "'", '`person.sports`', personconfig.OFFLINE_DBNAME, personconfig.API_URL + 'persons/' + personReferenceKey + '/sports/' + sportReferenceKey).then(function (response) {
                return response;
            });
        },




    }
});