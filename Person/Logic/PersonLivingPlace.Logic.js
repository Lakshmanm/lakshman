/*=======================================================================
 All rights reserved to Thrill Innovative Labs.
 THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
 OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
 LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
 FITNESS FOR A PARTICULAR PURPOSE.
===========================================================================
****************************************************************************
 Name                : PersonLivingPlace.Logic.js
 Type                : Angular js
 Description         : This file contains business logic methods
 References          :
 Author              : Kiranmai L
 Created Date        : 18-Apr-2016
****************************************************************************
MODIFICATION LOG
**************************************************************************** 
S.No.   Ver        Date          Modified By            Description
1.      1.0        19-04-2016    Kiranmai L             Define Offline BL 
2       1.0        29-04-2016    Satya Kalyani Lanka    referenceKey concept implemented
****************************************************************************  
Code Review LOG
**************************************************************************** 
S.No    Ver    Date           Code Review By   Observations

****************************************************************************
*/

var app = angular.module('ThrillPerson.personLivingPlaceLogic', ['ThrillFrameworkLibrary.DataService'


        , 'ThrillPerson.personQueries'


        , 'ThrillPerson.Config'


        , 'ThrillCnnWebClient.appConfig', 'ThrillFrameworkLibrary.appLogger'
    ])
    //Create Business Logic Factory Method 


.factory('PersonLivingPlaceLogic', function($http, dataService, personQueries, personconfig, appConfig, appLogger) {

    return {
        //CRUD Operations for Person Living Place


        //Logic for adding Location

        addLocation: function(locationObj, personReferenceKey) {
            return dataService.insert(locationObj, '`person.locations`', personconfig.OFFLINE_DBNAME, personconfig.API_URL + 'persons/' + personReferenceKey + '/locations').then(function(response) {
                return response;
            });

        },

        //Logic for updating Location
        updateLocation: function(locationObj, personReferenceKey, locationId) {
            return dataService.update(locationObj, 'locationId=' + locationId, 'person.locations', personconfig.OFFLINE_DBNAME, personconfig.API_URL + 'persons/' + personReferenceKey + '/locations/' + locationId).then(function(response) {
                return response;
            });

        }, //Method for adding Person Living Places
        addLivingPlaces: function(personlivingObj, personReferenceKey) {
            return dataService.insert(personlivingObj, '`person.livingPlace`', personconfig.OFFLINE_DBNAME, personconfig.API_URL + 'persons/' + personReferenceKey + '/livingplaces').then(function(response) {
                return response;
            });
        },


        //Method for updating Person Living Places
        updateLivingPlaces: function(personlivingObj, personReferenceKey, livingReferenceKey) {
            appLogger.log(personconfig.API_URL + 'persons/' + personReferenceKey + '/livingplaces/' + livingReferenceKey);
            return dataService.update(personlivingObj, 'referenceKey=' + "'" + livingReferenceKey + "'", '`person.livingPlace`', personconfig.OFFLINE_DBNAME, personconfig.API_URL + 'persons/' + personReferenceKey + '/livingplaces/' + livingReferenceKey).then(function(response) {
                return response;
            });
        },

        //Method for deleting Person Living Places
        deleteLivingPlaces: function(personReferenceKey, livingReferenceKey) {
            return dataService.delete('referenceKey=' + "'" + livingReferenceKey + "'", '`person.livingPlace`', personconfig.OFFLINE_DBNAME, personconfig.API_URL + 'persons/' + personReferenceKey + '/livingplaces/' + livingReferenceKey).then(function(response) {
                return response;
            });
        },


        /*get all Living Places Types --drop down*/



        getLivingPlaceTypes: function() {

            var query = personQueries.LivingPlaceTypes;
            if (appConfig.APP_MODE == 'offline') {
                return dataService.executeQuery(query, personconfig.OFFLINE_DBNAME).then(function(response) {
                    var LivingPlaceTypesList = [];

                    for (var i = 0; i < response.rows.length; i++) {
                        var livingPlaceTypeObj = {
                            livingPLaceTypeId: response.rows.item(i).livingPLaceTypeId,
                            livingPLaceTypeName: response.rows.item(i).livingPLaceTypeName

                        };
                        LivingPlaceTypesList.push(livingPlaceTypeObj);

                    }


                    return LivingPlaceTypesList;
                });
            } else {
                return dataService.callAPI(personconfig.API_URL + 'livingPlaceTypes', [], 'GET').then(function(response) {

                    return response.data;
                });

            }


        },

        //Method get all person living palces details//

        getAllLivingPlaces: function(personReferenceKey) {
            var query = personQueries.livingplacesList + "'" + personReferenceKey + "'";
            if (appConfig.APP_MODE == 'offline') {


                return dataService.executeQuery(query, personconfig.OFFLINE_DBNAME).then(function(response) {

                    var livingplacesList = [];

                    for (var i = 0; i < response.rows.length; i++) {
                        var livingListObj = {

                            referenceKey: response.rows.item(i).referenceKey,
                            LivingPlaceName: response.rows.item(i).LivingPlaceName,
                            livingPLaceTypeId: response.rows.item(i).LivingPlaceTypeId,
                            LivingPlaceTypeName: response.rows.item(i).livingPLaceTypeName,
                            personReferenceKey: response.rows.item(i).personReferenceKey, //locationId: response.rows.item(i).locationId,
                            StartDate: new Date(response.rows.item(i).StartDate),
                            EndDate: new Date(response.rows.item(i).EndDate)
                        };
                        livingplacesList.push(livingListObj);
                    }

                    return livingplacesList;
                });
            } else {
                return dataService.callAPI(personconfig.API_URL + 'persons/' + personReferenceKey + '/livingplaces', [], 'GET').then(function(response) {
                    return response.data;
                });

            }


        },

        //Logic for retrieving person Living place details by  LivingPlaceId


        getLivingPlacesById: function(personReferenceKey, livingReferenceKey) {

            if (appConfig.APP_MODE == 'offline') {



                var query = personQueries.livingPlaceById + "'" + livingReferenceKey + "'";


                return dataService.executeQuery(query, personconfig.OFFLINE_DBNAME).then(function(response) {


                    var livingPlaceByIdObj = {};

                    if (response.rows.length == 1) {
                        livingPlaceByIdObj = {


                            referenceKey: response.rows.item(0).referenceKey,
                            LivingPlaceName: response.rows.item(0).LivingPlaceName,
                            StartDate: new Date(response.rows.item(0).StartDate),
                            EndDate: new Date(response.rows.item(0).EndDate),
                            LivingPlaceTypeId: response.rows.item(0).livingPLaceTypeId, //LivingPlaceTypeName:response.rows.item(0).LivingPlaceTypeName,
                            locationId: response.rows.item(0).locationId,
                            geoLocation: response.rows.item(0).geoLocation,
                            personReferenceKey: response.rows.item(0).personReferenceKey

                        };
                    }



                    return livingPlaceByIdObj;
                });
            } else {

                return dataService.callAPI(personconfig.API_URL + 'persons/' + personReferenceKey + '/livingplaces/' + livingReferenceKey, [], 'GET').then(function(response) {
                    response.data.StartDate = new Date(response.data.StartDate);
                    response.data.EndDate = new Date(response.data.EndDate);


                    return response.data[0];
                });
            }

        },



    }
});