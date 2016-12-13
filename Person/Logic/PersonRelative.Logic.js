/*=======================================================================
 All rights reserved to Thrill Innovative Labs.
 THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
 OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
 LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
 FITNESS FOR A PARTICULAR PURPOSE.
===========================================================================
****************************************************************************
 Name                : PersonRelative.Logic.js
 Type                : Angular js
 Description         : This file contains business logic methods
 References          :
 Author              : Sreelakshmi ch
 Created Date        : 07-Apr-2016
****************************************************************************
MODIFICATION LOG
**************************************************************************** 
Ver	Date	     Modified By			Description
****************************************************************************  
Code Review LOG
**************************************************************************** 
sno# Ver        Date                Code Review By            Observations
****************************************************************************
*/

var app = angular.module('ThrillPerson.personRelativeLogic', ['ThrillFrameworkLibrary.DataService'

    , 'ThrillPerson.personQueries'

    , 'ThrillPerson.Config'

    , 'ThrillCnnWebClient.appConfig'

    , 'ThrillFrameworkLibrary.appLogger'
])

//Create Business Logic Factory Method for personRelative


.factory('personRelativeLogic', function($http, dataService, personQueries, personconfig, appConfig, appLogger) {


    return {

        //CRUD Operations for PersonRelative 

        //Logic for to get relationtypes
        getRelationTypes: function() {
            if (appConfig.APP_MODE == 'offline') {
                var query = personQueries.relationTypes;

                return dataService.executeQuery(query, personconfig.OFFLINE_DBNAME).then(function(response) {
                    var relationTypes = [];
                    for (var i = 0; i < response.rows.length; i++) {

                        var relationTypeObj = {
                            relationTypeId: response.rows.item(i).relationTypeId,
                            relationTypeName: response.rows.item(i).relationTypeName
                        };

                        relationTypes.push(relationTypeObj);

                    }


                    return relationTypes;
                });
            } else {

                return dataService.callAPI(personconfig.API_URL + 'relationTypes', [], 'GET').then(function(response) {
                    return response.data;
                });
            }

        },




        //Logic for adding personRelative by personReferenceKey
        addRelativePerson: function(personBasicInfoObj) {
           // alert(JSON.stringify(personBasicInfoObj));
            return dataService.insert(personBasicInfoObj, '`person.persons`', personconfig.OFFLINE_DBNAME, personconfig.API_URL + 'studentPersons').then(function(response) {
                console.log(response);
                return response;
            });
        },

        //Logic for update personRelative by personReferenceKey
        updateRelativePerson: function(personBasicInfoObj, relativePersonReferenceKey) {


            //appLogger.log(relativePersonReferenceKey);


            return dataService.update(personBasicInfoObj, 'referenceKey=' + "'" + relativePersonReferenceKey + "'", '`person.persons`', personconfig.OFFLINE_DBNAME, personconfig.API_URL + 'studentPersons/' + relativePersonReferenceKey).then(function(response) {
                return response;
            });
        },

        //Logic for adding Personrelative by relativeReferenceKey
        addRelative: function(relativeObj, personReferenceKey) {
            return dataService.insert(relativeObj, '`person.relatives`', personconfig.OFFLINE_DBNAME, personconfig.API_URL + 'persons/' + personReferenceKey + '/relatives').then(function(response) {
                return response.data;
            });

        }, //Logic for update personRelative by relativeReferenceKey
        updateRelative: function(relativeObj, relativeReferenceKey, personReferenceKey) {
            console.log('update relative ' + JSON.stringify(relativeObj) + '  url ' + personconfig.API_URL + 'persons/' + personReferenceKey + '/relatives/' + relativeReferenceKey)

            return dataService.update(relativeObj, 'referenceKey=' + "'" + relativeReferenceKey + "'", '`person.relatives`', personconfig.OFFLINE_DBNAME, personconfig.API_URL + 'persons/' + personReferenceKey + '/relatives/' + relativeReferenceKey).then(function(response) {
               // alert(response.data);
                return response.data;
            });

        },


        //Logic for retrieving person using relativeReferenceKeyRelative details by  relativeReferenceKey
        getRelativeById: function(relativeReferenceKey, personReferenceKey) {

            if (appConfig.APP_MODE == 'offline') {

                var query = personQueries.relativeById + "'" + relativeReferenceKey + "'";

                return dataService.executeQuery(query, personconfig.OFFLINE_DBNAME).then(function(response) {

                    console.log(response);
                    var relativeObj = {};

                    if (response.rows.length == 1) {
                        relativeObj = {
                            referenceKey: response.rows.item(0).referenceKey,
                            relationTypeId: response.rows.item(0).relationTypeId,
                            personReferenceKey: response.rows.item(0).personReferenceKey,
                            relativePersonId: response.rows.item(0).relativePersonId,
                            isGaurdian: response.rows.item(0).isGaurdian,
                            relativeTypeName: response.rows.item(0).relativeTypeName,
                            relativeName: response.rows.item(0).firstName,
                            relativePersonReferenceKey: response.rows.item(0).relativePersonReferenceKey
                        };
                    }

                    return relativeObj;
                });
            } else {
                return dataService.callAPI(personconfig.API_URL + 'persons/' + personReferenceKey + '/relatives/' + relativeReferenceKey, [], 'GET').then(function(response) {
                    return response.data[0];
                });
            }
        },




        //Logic for retrieving personRelative details by  personReferenceKey
        getRelatives: function(personReferenceKey) {

            if (appConfig.APP_MODE == 'offline') {
                var query = personQueries.relatives + "'" + personReferenceKey + "'";

                return dataService.executeQuery(query, personconfig.OFFLINE_DBNAME).then(function(response) {

                    var relativeList = [];
                    for (var i = 0; i < response.rows.length; i++) {
                        var relativeListObj = {
                            referenceKey: response.rows.item(i).referenceKey,
                            relationTypeId: response.rows.item(i).relationTypeId,
                            relationTypeName: response.rows.item(i).relationTypeName,
                            relativeName: response.rows.item(i).firstName,
                            personReferenceKey: response.rows.item(i).personReferenceKey,
                            relativePersonId: response.rows.item(i).relativePersonId,
                            isGaurdian: response.rows.item(i).isGaurdian

                        };
                        relativeList.push(relativeListObj);

                    }

                    return relativeList;
                });
            } else {
                console.log(personconfig.API_URL + 'persons/' + personReferenceKey + '/relatives');
                return dataService.callAPI(personconfig.API_URL + 'persons/' + personReferenceKey + '/relatives', [], 'GET').then(function(response) {
                    return response.data;
                });

            }


        },


        //Logic for deleting personRelative using relativeReferenceKey
        deleteRelative: function(relativeReferenceKey, personReferenceKey) {
            return dataService.delete('ReferenceKey=' + "'" + relativeReferenceKey + "'", '`person.relatives`', personconfig.OFFLINE_DBNAME, personconfig.API_URL + 'persons/' + personReferenceKey + '/relatives/' + relativeReferenceKey).then(function(response) {
                return response;
            });
        },



    }
});