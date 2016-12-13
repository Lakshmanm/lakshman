/*=======================================================================
 All rights reserved to Thrill Innovative Labs.
 THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
 OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
 LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
 FITNESS FOR A PARTICULAR PURPOSE.
===========================================================================
****************************************************************************
 Name                : personsportAward.Logic.js
 Type                : Angular js
 Description         : This file contains business logic methods
 References          :
 Author              : Sreelakshmi ch
 Created Date        : 20-Apr-2016
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

var app = angular.module('ThrillPerson.personSportAwardLogic', ['ThrillFrameworkLibrary.DataService'
                                                                
    , 'ThrillPerson.personQueries'
                                                                
    , 'ThrillPerson.Config'
                                                                
    , 'ThrillCnnWebClient.appConfig'
                                                                
    , 'ThrillFrameworkLibrary.appLogger'])

//Create Business Logic Factory Method for personSportAwardLogic


.factory('personSportAwardLogic', function ($http
    , dataService
    , personQueries
    , personconfig, appConfig
    , appLogger) {


    return {
        //CRUD Operations for personSportAward Details

        //Logic for to get getSportAwardTypes dropdown
        getSportAwardTypes: function (personReferenceKey) {
            if (appConfig.APP_MODE == 'offline') {
                var query = personQueries.sportaward + "'" + personReferenceKey + "'";

                return dataService.executeQuery(query, personconfig.OFFLINE_DBNAME).then(function (response) {
                    var sportaward = [];
                    for (var i = 0; i < response.rows.length; i++) {

                        var sportAwardTypeObj = {
                            awardId: response.rows.item(i).awardId
                            , awardName: response.rows.item(i).awardName
                        };

                        sportaward.push(sportAwardTypeObj);

                    }


                    return sportaward;
                });
            } else {

                return dataService.callAPI(personconfig.API_URL + 'persons/' + personReferenceKey + '/awards', [], 'GET').then(function (response) {
                    return response.data;
                });
            }

        },

        //Logic for adding personSportAward
        addSportAward: function (personReferenceKeyentityObj, personReferenceKey) {

            return dataService.insert(personReferenceKeyentityObj, '`person.sportAwards`', personconfig.OFFLINE_DBNAME, personconfig.API_URL + 'persons/' + personReferenceKey + '/sportAwards').then(function (response) {
                return response;
            });
        },

        //Logic for retrieving personSportAward details by sportReferenceKey 
        getSportAwardById: function (personReferenceKey, sportReferenceKey) {

            if (appConfig.APP_MODE == 'offline') {



                var query = personQueries.sportawardsById + "'" + sportReferenceKey + "'";


                return dataService.executeQuery(query, personconfig.OFFLINE_DBNAME).then(function (response) {


                    var identityObj = {};

                    if (response.rows.length == 1) {
                        identityObj = {
                            referenceKey: response.rows.item(0).referenceKey
                            , awardId: response.rows.item(0).awardId
                            , cirricularActivityName: response.rows.item(0).cirricularActivityName
                            , gameDetails: response.rows.item(0).gameDetails
                            , personReferenceKey: response.rows.item(0).personReferenceKey


                        };
                    }



                    return identityObj;
                });
            } else {

                return dataService.callAPI(personconfig.API_URL + 'persons/' + personReferenceKey + '/sportAwards/' + sportReferenceKey, [], 'GET').then(function (response) {
                    return response.data[0];
                });
            }

        },


        //Logic for retrieving personSportAward list by Person ID
        getSportAward: function (personReferenceKey) {
            if (appConfig.APP_MODE == 'offline') {
                var query = personQueries.sportawards + "'" + personReferenceKey + "'";


                return dataService.executeQuery(query, personconfig.OFFLINE_DBNAME).then(function (response) {

                    var personReferenceKeyentityList = [];

                    for (var i = 0; i < response.rows.length; i++) {

                        var personReferenceKeyentityObj = {
                            referenceKey: response.rows.item(i).referenceKey
                            , personReferenceKey: response.rows.item(i).personReferenceKey
                            , awardId: response.rows.item(i).awardReferenceKey
                            , awardName: response.rows.item(i).awardName
                            , cirricularActivityName: response.rows.item(i).cirricularActivityName
                            , gameDetails: response.rows.item(i).gameDetails,




                        };
                        personReferenceKeyentityList.push(personReferenceKeyentityObj);

                    }



                    return personReferenceKeyentityList;
                });
            } else {

                return dataService.callAPI(personconfig.API_URL + 'persons/' + personReferenceKey + '/sportAwards', [], 'GET').then(function (response) {
                    return response.data;
                });
            }

        },

        //Logic for deleting personSportAward by sportReferenceKey
        deleteSportAward: function (sportReferenceKey, personReferenceKey) {
            return dataService.delete('referenceKey=' + "'" + sportReferenceKey + "'", '`person.sportAwards`', personconfig.OFFLINE_DBNAME, personconfig.API_URL + 'persons/' + personReferenceKey + '/sportAwards/' + sportReferenceKey).then(function (response) {
                return response;
            });
        },

        //Logic  for updating personSportAward by sportReferenceKey
        updateSportAward: function (personReferenceKeyentityObj, personReferenceKey, sportReferenceKey) {

            return dataService.update(personReferenceKeyentityObj, 'referenceKey=' + "'" + sportReferenceKey + "'", '`person.sportAwards`', personconfig.OFFLINE_DBNAME, personconfig.API_URL + 'persons/' + personReferenceKey + '/sportAwards/' + sportReferenceKey).then(function (response) {
                return response;
            });
        },



    }
});