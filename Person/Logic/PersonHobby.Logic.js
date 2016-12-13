/*//=======================================================================
 All rights reserved to Thrill Innovative Labs.
 THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
 OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
 LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
 FITNESS FOR A PARTICULAR PURPOSE.
===========================================================================
****************************************************************************
 Name                : PersonHobby.Logic.js
 Type                : Angular js
 Description         : This file contains business logic methods
 References          :
 Author              : Phani
 Created Date        : 14-Apr-2016
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

var app = angular.module('ThrillPerson.personHobbyLogic', ['ThrillFrameworkLibrary.DataService'
                                                      
        , 'ThrillPerson.personQueries'
                                                      
        , 'ThrillPerson.Config'
                                                      
        , 'ThrillCnnWebClient.appConfig'
                                                      
        , 'ThrillFrameworkLibrary.appLogger'])
    //Create Business Logic Factory Method 

.factory('personHobbyLogic', function ($http
    , dataService
    , personQueries
    , personconfig
    , appConfig
    , appLogger) {


    return {
        //CRUD Operations for Hobby Details

        //Method for adding Hobby details


        addHobby: function (hobbyObj, personReferenceKey) {
            return dataService.insert(hobbyObj, '`person.hobbies`', personconfig.OFFLINE_DBNAME, personconfig.API_URL + 'persons/' + personReferenceKey + '/hobbies').then(function (response) {
                return response;
            });

        }, //Method for updating Hobby details
        updateHobby: function (hobbyObj, personReferenceKey, hobbyReferenceKey) {
            return dataService.update(hobbyObj, 'referenceKey=' + "'" + hobbyReferenceKey + "'", '`person.hobbies`', personconfig.OFFLINE_DBNAME, personconfig.API_URL + 'persons/' + personReferenceKey + '/hobbies/' + hobbyReferenceKey).then(function (response) {
                return response;
            });

        },

        //Method for retrieving Hobby types
        getHobbyTypeList: function () {
            var query = personQueries.hobbyTypes;
            if (appConfig.APP_MODE == 'offline') {
                return dataService.executeQuery(query, personconfig.OFFLINE_DBNAME).then(function (response) {

                    var hobbyTypesList = [];

                    for (var i = 0; i < response.rows.length; i++) {
                        var hobbyTypeObj = {


                            hobbyTypeId: response.rows.item(i).hobbyTypeId
                            , hobbyTypeName: response.rows.item(i).hobbyTypeName


                        };
                        hobbyTypesList.push(hobbyTypeObj);

                    }

                    return hobbyTypesList;
                });
            } else {
                return dataService.callAPI(personconfig.API_URL + 'hobbyTypes', [], 'GET').then(function (response) {

                    return response.data;
                });

            }


        },


        getProficiencyList: function () {
            var query = personQueries.proficiencies;
            if (appConfig.APP_MODE == 'offline') {
                return dataService.executeQuery(query, personconfig.OFFLINE_DBNAME).then(function (response) {
                    var hobbyTypesList = [];

                    for (var i = 0; i < response.rows.length; i++) {
                        var hobbyTypeObj = {


                            proficiencyId: response.rows.item(i).proficiencyId
                            , proficiencyName: response.rows.item(i).proficiencyName


                        };
                        hobbyTypesList.push(hobbyTypeObj);

                    }

                    return hobbyTypesList;
                });
            } else {
                return dataService.callAPI(personconfig.API_URL + 'proficiencies', [], 'GET').then(function (response) {
                    
                    return response.data;
                });

            }


        },

        //To get all Hobby details

        getHobbyList: function (personReferenceKey) {

            var query = personQueries.hobbyList + "'" + personReferenceKey + "'";
            if (appConfig.APP_MODE == 'offline') {

                return dataService.executeQuery(query, personconfig.OFFLINE_DBNAME).then(function (response) {

                    var hobbyList = [];

                    for (var i = 0; i < response.rows.length; i++) {



                        var hobbyListObj = {


                            referenceKey: response.rows.item(i).referenceKey
                            , hobbyName: response.rows.item(i).hobbyName
                            , hobbyTypeName: response.rows.item(i).hobbyTypeName
                            , proficiencyName: response.rows.item(i).proficiencyName
                            , details: response.rows.item(i).details
                            , proficiency: response.rows.item(i).proficiency,



                        };
                        hobbyList.push(hobbyListObj);

                    }

                    return hobbyList;
                });
            } else {
                return dataService.callAPI(personconfig.API_URL + 'persons/' + personReferenceKey + '/hobbies', [], 'GET').then(function (response) {
                    return response.data;
                });

            }


        },



        //Method for deleting Hobby details by hobbyReferenceKey

        deleteHobby: function (personReferenceKey, hobbyReferenceKey) {
            return dataService.delete('referenceKey=' + "'" + hobbyReferenceKey + "'", '`person.hobbies`', personconfig.OFFLINE_DBNAME, personconfig.API_URL + 'persons/' + personReferenceKey + '/hobbies/' + hobbyReferenceKey).then(function (response) {
                return response;
            });
        }, //Method for getting Hobby details by hobbyReferenceKey


        getHobbyById: function (personReferenceKey, hobbyReferenceKey) {

            var query = personQueries.hobbyListById + "'" + hobbyReferenceKey + "'";

            if (appConfig.APP_MODE == 'offline') {
                return dataService.executeQuery(query, personconfig.OFFLINE_DBNAME).then(function (response) {

                    var hobbyList = [];

                    for (var i = 0; i < response.rows.length; i++) {

                        var hobbyListByIdObj = {


                            referenceKey: response.rows.item(i).referenceKey
                            , hobbyName: response.rows.item(i).hobbyName
                            , proficiencyId: response.rows.item(i).proficiencyId
                            , hobbyTypeId: response.rows.item(i).hobbyTypeId
                            , personReferenceKey: response.rows.item(i).personReferenceKey
                            , details: response.rows.item(i).details
                            , proficiency: response.rows.item(i).proficiency,



                        };
                        hobbyList.push(hobbyListByIdObj);

                    }


                    return hobbyList;
                });
            } else {
                return dataService.callAPI(personconfig.API_URL + 'persons/' + personReferenceKey + '/hobbies/' + hobbyReferenceKey, [], 'GET').then(function (response) {

                    return response.data;
                });

            }


        },


    }

});