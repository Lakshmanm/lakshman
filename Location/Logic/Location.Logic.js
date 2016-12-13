/*=======================================================================
 All rights reserved to  Thrill Innovative Labs.
 THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
 OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
 LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
 FITNESS FOR A PARTICULAR PURPOSE.
===========================================================================
****************************************************************************
 Name                : Location.Logic.js
 Type                : Javascript and JQuery 
 Description         : This file contains business logic methods
 References          :
 Author              : Satya Kalyani Lanka
 Created Date        : 07-Apr-2016
****************************************************************************
MODIFICATION LOG
**************************************************************************** 
S.No  Ver	Date	             Modified By			Description
 1         14-04-2016           Satya Kalyani Lanka    appLogger Removed
****************************************************************************  
Code Review LOG
**************************************************************************** 
S.No      Ver        Date                Code Review By            Observations
1        1.0       13-April-2016         Sri Venkatesh.T           Never used "appLogger" module in this file.If not required remove it
2         1.0       13-April-2016         Sri Venkatesh.T           None of the err callback function is logging is using appLogger which is injected in the controller
****************************************************************************
*/
var app = angular.module('ThrillLocation.locationLogic', ['ThrillFrameworkLibrary.DataService', 'ThrillLocation.locationQueries', 'ThrillLocation.config', 'ThrillCnnWebClient.appConfig'])
    /*Create Business Logic Factory Method */

.factory('locationLogic', function($http, dataService, locationQueries, locationconfig, appConfig) {


    return {
        /*CRUD Operations for Location*/

        /*Method for adding Location details*/
        addLocation: function(locationInfoObj) {

            return dataService.insert(locationInfoObj, '`location.locations`', locationconfig.OFFLINE_DBNAME, locationconfig.API_URL + 'locations').then(function(response) {
                return response;
            });

        },

        /*Method for updating Location details*/
        updateLocation: function(locationInfoObj, locationReferenceKey) {
            console.log(locationInfoObj);
            console.log(locationReferenceKey);
            return dataService.update(locationInfoObj, 'LocationKey=' + "'" + locationReferenceKey + "'",
                '`location.locations`', locationconfig.OFFLINE_DBNAME, locationconfig.API_URL + 'locations/' + locationReferenceKey).then(function(response) {
                return response;
            });

        },

        /*Method for retrieving Location details by using LocationID*/
        getLocationInfoById: function(locationReferenceKey) {

            var query = locationQueries.locationInfoById + "'" + locationReferenceKey + "'";
            if (appConfig.APP_MODE == 'offline') {
                return dataService.executeQuery(query, locationconfig.OFFLINE_DBNAME).then(function(response) {
                    var locationList = [];

                    for (var i = 0; i < response.rows.length; i++) {
                        var locationObj = {
                            locationKey: response.rows.item(i).LocationKey,
                            districtId: response.rows.item(i).DistrictID,
                            countryId: response.rows.item(i).CountryID,
                            stateId: response.rows.item(i).StateID,
                            mandalId: response.rows.item(i).MandalID,
                            villageId: response.rows.item(i).VillageID,
                            geoLocation: response.rows.item(i).GeoLocation,
                            latitude: response.rows.item(i).Latitude,
                            longitude: response.rows.item(i).Longitude


                        };
                        locationList.push(locationObj);

                    }


                    return locationList;
                });
            } else {
                return dataService.callAPI(locationconfig.API_URL + 'locations/' + locationReferenceKey, [], 'GET').then(function(response) {

                    return response.data;
                });

            }


        },
        getLocationByLocationID: function(locationId) {


            if (appConfig.APP_MODE == 'offline') {
                var query = locationQueries.locationInfoById + "'" + locationReferenceKey + "'";
                return dataService.executeQuery(query, locationconfig.OFFLINE_DBNAME).then(function(response) {
                    var locationList = [];

                    for (var i = 0; i < response.rows.length; i++) {
                        var locationObj = {
                            locationKey: response.rows.item(i).LocationKey,
                            districtId: response.rows.item(i).DistrictID,
                            countryId: response.rows.item(i).CountryID,
                            stateId: response.rows.item(i).StateID,
                            mandalId: response.rows.item(i).MandalID,
                            villageId: response.rows.item(i).VillageID,
                            geoLocation: response.rows.item(i).GeoLocation,
                            latitude: response.rows.item(i).Latitude,
                            longitude: response.rows.item(i).Longitude


                        };
                        locationList.push(locationObj);

                    }


                    return locationList;
                });
            } else {
                return dataService.callAPI(locationconfig.API_URL + 'locations/all/' + locationId, [], 'GET').then(function(response) {

                    return response.data;
                });

            }


        },
        /*Method for retrieving Countries*/
        getMasterData: function() {

            var query = locationQueries.countries;

            if (appConfig.APP_MODE == 'offline') {

                return dataService.executeQuery(query, locationconfig.OFFLINE_DBNAME).then(function(response) {

                    var countryList = [];

                    for (var i = 0; i < response.rows.length; i++) {
                        var countryObj = {
                            countryId: response.rows.item(i).CountryID,
                            countryName: response.rows.item(i).CountryName
                        };
                        countryList.push(countryObj);

                    }


                    return countryList;
                });
            } else {
                return dataService.callAPI(locationconfig.API_URL + 'countries', [], 'GET').then(function(response) {

                    return response.data;
                });

            }


        },
        /*Method for retrieving States*/
        getStates: function(countryID) {

            var query = locationQueries.states + countryID;
            if (appConfig.APP_MODE == 'offline') {
                return dataService.executeQuery(query, locationconfig.OFFLINE_DBNAME).then(function(response) {


                    var sateList = [];

                    for (var i = 0; i < response.rows.length; i++) {
                        var stateObj = {
                            stateId: response.rows.item(i).StateID,
                            stateName: response.rows.item(i).StateName

                        };
                        sateList.push(stateObj);

                    }


                    return sateList;
                });
            } else {
                return dataService.callAPI(locationconfig.API_URL + 'countries/' + countryID + '/states', [], 'GET').then(function(response) {

                    return response.data;
                });

            }


        },
        /*Method for retrieving Districts*/
        getDistricts: function(stateID) {

            var query = locationQueries.districts + stateID;
            if (appConfig.APP_MODE == 'offline') {
                return dataService.executeQuery(query, locationconfig.OFFLINE_DBNAME).then(function(response) {

                    //return response.data;
                    var districtList = [];

                    for (var i = 0; i < response.rows.length; i++) {
                        var districtObj = {
                            districtId: response.rows.item(i).DistrictID,
                            districtName: response.rows.item(i).DistrictName

                        };
                        districtList.push(districtObj);

                    }


                    return districtList;
                });
            } else {
                return dataService.callAPI(locationconfig.API_URL + 'states/' + stateID + '/districts', [], 'GET').then(function(response) {

                    return response.data;
                });

            }


        },
        /*Method for retrieving Mandals*/
        getMandals: function(districtID) {

            var query = locationQueries.mandals + districtID;
            if (appConfig.APP_MODE == 'offline') {
                return dataService.executeQuery(query, locationconfig.OFFLINE_DBNAME).then(function(response) {

                    //return response.data;
                    var mandalList = [];

                    for (var i = 0; i < response.rows.length; i++) {
                        var mandalObj = {
                            mandalId: response.rows.item(i).MandalID,
                            mandalName: response.rows.item(i).MandalName

                        };
                        mandalList.push(mandalObj);

                    }


                    return mandalList;
                });
            } else {
                return dataService.callAPI(locationconfig.API_URL + 'districts/' + districtID + '/mandals', [], 'GET').then(function(response) {

                    return response.data;
                });

            }


        },
        /*Method for retrieving Villages*/
        getVillages: function(mandalID) {

            var query = locationQueries.villages + mandalID;
            if (appConfig.APP_MODE == 'offline') {
                return dataService.executeQuery(query, locationconfig.OFFLINE_DBNAME).then(function(response) {


                    var villageList = [];

                    for (var i = 0; i < response.rows.length; i++) {
                        var villageObj = {
                            villageId: response.rows.item(i).VillageID,
                            villageName: response.rows.item(i).VillageName

                        };
                        villageList.push(villageObj);

                    }


                    return villageList;
                });
            } else {
                return dataService.callAPI(locationconfig.API_URL + 'mandals/' + mandalID + '/villages', [], 'GET').then(function(response) {

                    return response.data;
                });

            }


        }
    };
});