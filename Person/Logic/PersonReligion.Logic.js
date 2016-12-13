/*//=======================================================================
 All rights reserved to Thrill Innovative Labs.
 THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
 OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
 LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
 FITNESS FOR A PARTICULAR PURPOSE.
===========================================================================
****************************************************************************
 Name                : PersonReligion.Logic.js
 Type                : Angular js
 Description         : This file contains business logic methods
 References          :
 Author              : Phani
 Created Date        : 13-Apr-2016
****************************************************************************
MODIFICATION LOG
**************************************************************************** 
Ver	Date	     Modified By			Description
****************************************************************************  
Code Review LOG
**************************************************************************** 
Ver        Date                Code Review By            Observations
****************************************************************************
//*/

var app = angular.module('ThrillPerson.personReligionLogic', ['ThrillFrameworkLibrary.DataService'
                                                              
        , 'ThrillPerson.personQueries'
                                                              
        , 'ThrillPerson.Config'
                                                              
        , 'ThrillCnnWebClient.appConfig'
                                                              
        , 'ThrillFrameworkLibrary.appLogger'
                                                              ])
    //Create Business Logic Factory Method //

.factory('personReligionLogic', function ($http
    , dataService
    , personQueries
    , personconfig
    , appConfig
    , appLogger) {


    return {
        //CRUD Operations for Education Details//




        //Method for adding religion details//


        addReligion: function (religionObj, personReferenceKey) {
            // appLogger.log(personReferenceKey);
            // appLogger.log(  'persons/'+personReferenceKey+'/religions');
            return dataService.insert(religionObj, '`person.religions`', personconfig.OFFLINE_DBNAME, personconfig.API_URL + 'persons/' + personReferenceKey + '/religions').then(function (response) {
                return response;
            });

        },

        //Method for updating religion details//
        updateReligion: function (religionObj, personReferenceKey, religionReferenceKey) {

            return dataService.update(religionObj, 'referenceKey=' + "'" + religionReferenceKey + "'", '`person.religions`', personconfig.OFFLINE_DBNAME, personconfig.API_URL + 'persons/' + personReferenceKey + '/religions/' + religionReferenceKey).then(function (response) {
                return response;
            });

        },

        //Method for retrieving religion types//
        getReligionTypes: function () {


            var query = personQueries.religionTypes;

            if (appConfig.APP_MODE == 'offline') {
                return dataService.executeQuery(query, personconfig.OFFLINE_DBNAME).then(function (response) {
                    var religionTypeList = [];

                    for (var i = 0; i < response.rows.length; i++) {
                        var religionTypeObj = {


                            religionTypeId: response.rows.item(i).religionTypeId
                            , religionTypeName: response.rows.item(i).religionTypeName


                        };
                        religionTypeList.push(religionTypeObj);

                    }

                    return religionTypeList;
                });
            } else {
                return dataService.callAPI(personconfig.API_URL + 'religionTypes', [], 'GET').then(function (response) {

                    return response.data;
                });

            }


        },




        //Method get all religion details//

        getReligionList: function (personReferenceKey) {

            var query = personQueries.religionList + "'" + personReferenceKey + "'";


            if (appConfig.APP_MODE == 'offline') {


                return dataService.executeQuery(query, personconfig.OFFLINE_DBNAME).then(function (response) {

                    var religionList = [];

                    for (var i = 0; i < response.rows.length; i++) {



                        var religionListObj = {


                            referenceKey: response.rows.item(i).referenceKey,

                            religionTypeName: response.rows.item(i).religionTypeName,

                            nationalityName: response.rows.item(i).nationalityName
                            , socialGroupName: response.rows.item(i).socialGroupName,



                        };
                        religionList.push(religionListObj);

                    }

                    return religionList;
                });
            } else {
                return dataService.callAPI(personconfig.API_URL + 'persons/' + personReferenceKey + '/religions', [], 'GET').then(function (response) {
                    return response.data;
                });

            }


        },

        //Method get all Nationality list details//


        getNationalityList: function () {

            var query = personQueries.nationalities;

            if (appConfig.APP_MODE == 'offline') {
                return dataService.executeQuery(query, personconfig.OFFLINE_DBNAME).then(function (response) {
                    var nationalitiesList = [];

                    for (var i = 0; i < response.rows.length; i++) {
                        var nationalitiesObj = {


                            nationalityId: response.rows.item(i).nationalityId
                            , nationalityName: response.rows.item(i).nationalityName


                        };
                        nationalitiesList.push(nationalitiesObj);

                    }

                    return nationalitiesList;
                });
            } else {
                return dataService.callAPI(personconfig.API_URL + 'nationalities', [], 'GET').then(function (response) {
                    return response.data;
                });

            }


        },

        //Method for getting social group  details//


        getSocialGroup: function () {

            var query = personQueries.socialGroups;

            if (appConfig.APP_MODE == 'offline') {
                return dataService.executeQuery(query, personconfig.OFFLINE_DBNAME).then(function (response) {
                    var socialGroupList = [];

                    for (var i = 0; i < response.rows.length; i++) {
                        var socialGroupObj = {


                            socialGroupId: response.rows.item(i).socialGroupId
                            , socialGroupName: response.rows.item(i).socialGroupName


                        };
                        socialGroupList.push(socialGroupObj);

                    }

                    return socialGroupList;
                });
            } else {
                return dataService.callAPI(personconfig.API_URL + 'socialGroups', [], 'GET').then(function (response) {
                    return response.data;
                });

            }


        },

        //Method for deleting Religion details by religionReferenceKey//

        deleteReligion: function (personReferenceKey, religionReferenceKey) {
            return dataService.delete('referenceKey=' + "'" + religionReferenceKey + "'", '`person.religions`', personconfig.OFFLINE_DBNAME, personconfig.API_URL + 'religion/religion/' + religionReferenceKey).then(function (response) {
                return response;
            });
        },

        //Method for getting religion details by religionReferenceKey//


        getReligionById: function (personReferenceKey, religionReferenceKey) {

            var query = personQueries.religionListById + "'" + religionReferenceKey + "'";
            if (appConfig.APP_MODE == 'offline') {
                return dataService.executeQuery(query, personconfig.OFFLINE_DBNAME).then(function (response) {

                    var religionList = [];

                    for (var i = 0; i < response.rows.length; i++) {

                        var religionListObj = {


                            referenceKey: response.rows.item(i).referenceKey,

                            religionTypeId: response.rows.item(i).religionTypeId,

                            nationalityId: response.rows.item(i).nationalityId
                            , socialGroupId: response.rows.item(i).socialGroupId,



                        };
                        religionList.push(religionListObj);

                    }


                    return religionList;
                });
            } else {
                return dataService.callAPI(personconfig.API_URL + 'persons/' + personReferenceKey + '/religions/' + religionReferenceKey, [], 'GET').then(function (response) {

                    return response.data;
                });

            }


        },


    }

});