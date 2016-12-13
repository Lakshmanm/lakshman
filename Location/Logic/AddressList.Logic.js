/*=======================================================================
 All rights reserved to  Thrill Innovative Labs.
 THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
 OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
 LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
 FITNESS FOR A PARTICULAR PURPOSE.
===========================================================================
****************************************************************************
 Name                : addressList.Logic.js 
 Type                : Javascript and JQuery 
 Description         : This file contains business logic methods
 References          :
 Author	    		 : Satyanarayana Tippani
 Created Date        : 07-July-2016
****************************************************************************
MODIFICATION LOG
**************************************************************************** 
Ver	Date	     Modified By			Description
****************************************************************************  
Code Review LOG
**************************************************************************** 
S.No      Ver        Date                Code Review By            Observations

****************************************************************************
*/

var app = angular.module('ThrillLocation.addressListLogic', ['ThrillFrameworkLibrary.DataService', 'ThrillLocation.locationQueries', 'ThrillLocation.config', 'ThrillCnnWebClient.appConfig'])
    /*create Business Logic Factory Method */
    .factory('addressListLogic', function($http, dataService, locationQueries, locationconfig, appConfig) {

        /* Get location details from  external source(localDb or web). */
        return {
            getAddressInfoDetails: function() {

                var query = locationQueries.addresses;

                if (appConfig.APP_MODE == 'offline') {

                    return dataService.executeQuery(query, locationconfig.OFFLINE_DBNAME).then(function(response) {
                        console.log(response);
                        var addressList = [];

                        for (var i = 0; i < response.rows.length; i++) {
                            console.log(response.rows.item(i));
                            var addressInfoObj = {
                                addressId: response.rows.item(i).AddressID,
                                district: response.rows.item(i).DistrictName,
                                geoLocation: response.rows.item(i).GeoLocation,
                                country: response.rows.item(i).CountryName,
                                addressKey: response.rows.item(i).AddressKey,
                                entityDetails: response.rows.item(i).EntityDetails,
                                streetDetails: response.rows.item(i).StreetDetails,
                                pincode: response.rows.item(i).Pincode

                            };
                            addressList.push(addressInfoObj);

                        }

                        return addressList;
                    });
                } else {

                    return dataService.callAPI(locationconfig.API_URL + '/addresses', [], 'GET').then(function(response) {

                        return response.data;
                    });

                }


            },

            getAddressBypersonrefKey: function(PersonKey) {



                if (appConfig.APP_MODE == 'offline') {
                    var query = locationQueries.addresses;

                    return dataService.executeQuery(query, locationconfig.OFFLINE_DBNAME).then(function(response) {
                        console.log(response);
                        var addressList = [];

                        for (var i = 0; i < response.rows.length; i++) {
                            console.log(response.rows.item(i));
                            var addressInfoObj = {
                                addressId: response.rows.item(i).AddressID,
                                district: response.rows.item(i).DistrictName,
                                geoLocation: response.rows.item(i).GeoLocation,
                                country: response.rows.item(i).CountryName,
                                addressKey: response.rows.item(i).AddressKey,
                                entityDetails: response.rows.item(i).EntityDetails,
                                streetDetails: response.rows.item(i).StreetDetails,
                                pincode: response.rows.item(i).Pincode

                            };
                            addressList.push(addressInfoObj);

                        }

                        return addressList;
                    });
                } else {

                    return dataService.callAPI(locationconfig.API_URL + 'addresses/all/' + PersonKey, [], 'GET').then(function(response) {

                        return response.data;
                    });

                }


            },
            removeAddress: function(addressReferenceKey) {

                return dataService.delete('addressKey=' + "'" + addressReferenceKey + "'", '`location.addresses`', locationconfig.OFFLINE_DBNAME, locationconfig.API_URL + '/addresses/' + addressReferenceKey).then(function(response) {

                    return response.data;
                });
            }
        };
    });