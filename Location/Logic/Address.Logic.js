/*=======================================================================
 All rights reserved to  Thrill Innovative Labs.
 THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
 OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
 LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
 FITNESS FOR A PARTICULAR PURPOSE.
===========================================================================
****************************************************************************
 Name                : address.Logic.js
 Type                : Javascript and JQuery 
 Description         : This file contains business logic methods
 References          :
 Author	      		 : Satyanarayana Tippani
 Created Date        : 07-July-2016
****************************************************************************
MODIFICATION LOG
**************************************************************************** 
S.No  Ver	Date	             Modified By			Description

****************************************************************************  
Code Review LOG
**************************************************************************** 
S.No      Ver        Date                Code Review By            Observations

****************************************************************************
*/
var app = angular.module('ThrillLocation.addressLogic', ['ThrillFrameworkLibrary.DataService'

        , 'ThrillLocation.locationQueries'

        , 'ThrillLocation.config'

        , 'ThrillCnnWebClient.appConfig'
    ])
    /*Create Business Logic Factory Method */

.factory('addressLogic', function($http, dataService, locationQueries, locationconfig, appConfig) {


    return {
        /*CRUD Operations for address*/

        /*Method for adding address details*/
        addAddress: function(addressInfoObj) {

            return dataService.insert(addressInfoObj, '`location.addresses`', locationconfig.OFFLINE_DBNAME, locationconfig.API_URL + 'addresses').then(function(response) {
                return response;
            });

        },

        /*Method for updating address details*/
        updateAddress: function(addressInfoObj, addressRefrenceKey) {
           
            console.log(addressRefrenceKey);
            return dataService.update(addressInfoObj, 'AddressKey=' + "'" + addressRefrenceKey + "'", '`location.addresses`', locationconfig.OFFLINE_DBNAME, locationconfig.API_URL + 'addresses/' + addressRefrenceKey).then(function(response) {
                return response;
            });

        },

        /*Method for retrieving address details by using addressID*/
        getAddressInfoById: function(addressRefrenceKey) {

            var query = locationQueries.addressByReferenceKey(addressRefrenceKey);
            if (appConfig.APP_MODE == 'offline') {
                return dataService.executeQuery(query, locationconfig.OFFLINE_DBNAME).then(function(response) {
                    var addressList = [];

                    for (var i = 0; i < response.rows.length; i++) {
                        var addressObj = {
                            addressKey: response.rows.item(i).AddressKey,
                            districtId: response.rows.item(i).DistrictID,
                            countryId: response.rows.item(i).CountryID,
                            stateId: response.rows.item(i).StateID,
                            /*  cityId: response.rows.item(i).CityID,*/
                            mandalId: response.rows.item(i).MandalID,
                            villageId: response.rows.item(i).VillageID,
                            geoLocation: response.rows.item(i).GeoLocation,
                            latitude: response.rows.item(i).Latitude,
                            longitude: response.rows.item(i).Longitude,
                            entityDetails: response.rows.item(i).EntityDetails,
                            streetDetails: response.rows.item(i).StreetDetails,
                            pincode: response.rows.item(i).Pincode

                        };
                        addressList.push(addressObj);

                    }


                    return addressList;
                });
            } else {
                return dataService.callAPI(locationconfig.API_URL + 'addresses/' + addressRefrenceKey, [], 'GET').then(function(response) {

                    return response.data;
                });

            }


        },

        /*Method for retrieving address details by using addressID*/
        getAddressesByEntityKey: function(entityKey) {

            var query = locationQueries.addressesByEntityKey(entityKey);
            if (appConfig.APP_MODE == 'offline') {
                return dataService.executeQuery(query, locationconfig.OFFLINE_DBNAME).then(function(response) {
                    var addressList = [];

                    for (var i = 0; i < response.rows.length; i++) {
                        var addressObj = {
                            referenceKey: response.rows.item(i).ReferenceKey,
                            districtId: response.rows.item(i).DistrictID,
                            countryId: response.rows.item(i).CountryID,
                            stateId: response.rows.item(i).StateID,
                            /*  cityId: response.rows.item(i).CityID,*/
                            mandalId: response.rows.item(i).MandalID,
                            villageId: response.rows.item(i).VillageID,
                            geoLocation: response.rows.item(i).GeoLocation,
                            latitude: response.rows.item(i).Latitude,
                            longitude: response.rows.item(i).Longitude,
                            entityDetails: response.rows.item(i).EntityDetails,
                            streetDetails: response.rows.item(i).StreetDetails,
                            pincode: response.rows.item(i).Pincode

                        };
                        addressList.push(addressObj);

                    }


                    return addressList;
                });
            } else {
                return dataService.callAPI(locationconfig.API_URL + 'addresses/entities/' + entityKey, [], 'GET').then(function(response) {

                    return response.data;
                });

            }


        },

        /*Method for retrieving Entity Types*/
        getEntityTypes: function() {

            var query = locationQueries.entityTypes;

            if (appConfig.APP_MODE == 'offline') {

                return dataService.executeQuery(query, locationconfig.OFFLINE_DBNAME).then(function(response) {

                    var entityList = [];

                    for (var i = 0; i < response.rows.length; i++) {
                        var entityObj = {
                            entityTypeId: response.rows.item(i).EntityTypeId,
                            entityTypeName: response.rows.item(i).EntityTypeName
                        };
                        entityList.push(entityObj);

                    }


                    return entityList;
                });
            } else {
                return dataService.callAPI(locationconfig.API_URL + 'countries', [], 'GET').then(function(response) {

                    return response.data;
                });

            }


        },

        /*Method for retrieving Countries*/
        getCountries: function() {

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

        /*  Method for retrieving Cities*/
        getCities: function(stateID) {

            var query = locationQueries.cities + stateID;
            if (appConfig.APP_MODE == 'offline') {
                return dataService.executeQuery(query, locationconfig.OFFLINE_DBNAME).then(function(response) {


                    var cityList = [];

                    for (var i = 0; i < response.rows.length; i++) {
                        var cityObj = {
                            cityId: response.rows.item(i).CityID,
                            cityName: response.rows.item(i).CityName

                        };
                        cityList.push(cityObj);

                    }


                    return cityList;
                });
            } else {
                return dataService.callAPI(locationconfig.API_URL + 'states/' + stateID + '/cities', [], 'GET').then(function(response) {

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