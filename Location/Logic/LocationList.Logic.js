/*=======================================================================
 All rights reserved to  Thrill Innovative Labs.
 THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
 OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
 LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
 FITNESS FOR A PARTICULAR PURPOSE.
===========================================================================
****************************************************************************
 Name                : LocationList.Logic.js 
 Type                : Javascript and JQuery 
 Description         : This file contains business logic methods
 References          :
 Author              : Satya kalyani Lanka
 Created Date        : 07-Apr-2016
****************************************************************************
MODIFICATION LOG
**************************************************************************** 
Ver	Date	     Modified By			Description
1   14-04-2016    Satya kalyani Lanka               modifications are done based on observations
****************************************************************************  
Code Review LOG
**************************************************************************** 
S.No      Ver        Date                Code Review By            Observations
1        1.0       13-April-2016         Sri Venkatesh.T           Never used "appLogger" module in this file.If not required remove it
2         1.0       13-April-2016         Sri Venkatesh.T          Rename "OrgList" name to a meaning full name.
3         1.0       13-April-2016         Sri Venkatesh.T          Indentation of Dependency injection align as per suggested in the mail.
****************************************************************************
*/

var app = angular.module('ThrillLocation.locationListLogic'
                        , ['ThrillFrameworkLibrary.DataService'
                        , 'ThrillLocation.locationQueries'
                        , 'ThrillLocation.config'
                        ,'ThrillCnnWebClient.appConfig'])
    /*create Business Logic Factory Method */
    .factory('locationListLogic'
             , function($http
                    , dataService
                    , locationQueries
                    , locationconfig
                    , appConfig) {

        /* Get location details from  external source(localDb or web). */
        return {
            getLocationInfoDetails: function() {

                var query = locationQueries.locations;

                if (appConfig.APP_MODE == 'offline') {
                    
                    return dataService.executeQuery(query, locationconfig.OFFLINE_DBNAME).then(function(response) {
                        console.log(response);
                        var locationList = [];

                        for (var i = 0; i < response.rows.length; i++) {
                            var locationInfoObj = {
                                LocationID: response.rows.item(i).LocationID
                                , District: response.rows.item(i).District
                                , geoLocation: response.rows.item(i).GeoLocation
                                , Country: response.rows.item(i).Country
                                , locationKey: response.rows.item(i).LocationKey

                            };
                            locationList.push(locationInfoObj);

                        }

                        return locationList;
                    });
                } else {

                    return dataService.callAPI(locationconfig.API_URL + '/locations', [], 'GET').then(function(response) {

                        return response.data;
                    });

                }


            },
            removeLocation: function(locationReferenceKey) {

                return dataService.delete('locationKey=' +"'"+locationReferenceKey+"'" , '`location.locations`', locationconfig.OFFLINE_DBNAME, locationconfig.API_URL + 'locations/' + locationReferenceKey).then(function(response) {

                    return response.data;
                });
            }
        };
    });