/*//=============================================================================
// All rights reserved to Thrill Innovative Labs.
// THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
// OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
// LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
// FITNESS FOR A PARTICULAR PURPOSE.
//=============================================================================
//*****************************************************************************
//* Name		    	: Cours.Logic.js 
//* Type		    	: Angular JS File
//* Description		    :
//* References		    :
//* Author	    		:
//* Created Date        : 
//*****************************************************************************
//*                             MODIFICATION LOG
//*****************************************************************************
//*  S.No  Ver	     Date	         Modified By			Description

//*****************************************************************************
//*                             Code Review LOG
//*****************************************************************************

//*****************************************************************************
*/

var app = angular.module('mcampuz.ServicesLogic', ['ThrillFrameworkLibrary.DataService', 'ThrillAcademic.coursQueries', 'ThrillAcademic.config', 'ThrillCnnWebClient.appConfig', 'ThrillFrameworkLibrary.appLogger'])
    .factory('ServicesLogic', function($http,
        dataService,
        coursQueries,
        config,
        appConfig,
        appLogger) {

        return {

            addService: function(entityService) {
                return dataService.insert(entityService, '` feemanagement.services`', config.OFFLINE_DBNAME, config.API_URL + 'Fee/service').then(function(response) {
                    return response;
                });
            },

            updateService: function(entityService, entityKey) {
                return dataService.update(entityService, 'ServiceKey="' + entityKey + '"', '` feemanagement.services`', config.OFFLINE_DBNAME, config.API_URL + 'Fee/service/' + entityKey).then(function(response) {
                    return response;
                });
            },


            deleteService: function(entityKey) {
                return dataService.delete('ServiceKey="' + entityKey + '"', '` feemanagement.services`', config.OFFLINE_DBNAME, config.API_URL + 'Fee/service/' + entityKey).then(function(response) {
                    return response;
                });
            },


            serviceByServiceKey: function(entityKey) {

                if (appConfig.APP_MODE == 'offline') {
                    var query = coursQueries.getCoursByCoursKey + "'" + entityKey + "'";
                    return dataService.executeQuery(query, config.OFFLINE_DBNAME).then(function(response) {
                        var coursList = [];
                        for (var i = 0; i < response.rows.length; i++) {
                            var tempEntityCours = {
                                coursekey: response.rows.item(i).coursKey,
                                coursetitle: response.rows.item(i).courseTitle,
                                groupkey: response.rows.item(i).groupKey,
                                instanceorganizationkey: response.rows.item(i).instanceOrganizationKey,
                            };
                            coursList.push(tempEntityCours);
                        } // end of for loop
                        return coursList;
                    });
                } else {
                    return dataService.callAPI(config.API_URL + 'Fee/service/' + entityKey, [], 'GET').then(function(response) {
                        return response.data;
                    });
                }
            }, // end of get method
            taxByServiceId: function(Id) {

                if (appConfig.APP_MODE == 'offline') {
                    var query = coursQueries.getCoursByCoursKey + "'" + entityKey + "'";
                    return dataService.executeQuery(query, config.OFFLINE_DBNAME).then(function(response) {
                        var coursList = [];
                        for (var i = 0; i < response.rows.length; i++) {
                            var tempEntityCours = {
                                coursekey: response.rows.item(i).coursKey,
                                coursetitle: response.rows.item(i).courseTitle,
                                groupkey: response.rows.item(i).groupKey,
                                instanceorganizationkey: response.rows.item(i).instanceOrganizationKey,
                            };
                            coursList.push(tempEntityCours);
                        } // end of for loop
                        return coursList;
                    });
                } else {
                    return dataService.callAPI(config.API_URL + 'Fee/service/' + Id + '/servicetaxmapper', [], 'GET').then(function(response) {
                        return response.data;
                    });
                }
            },

            unitList: function() {

                if (appConfig.APP_MODE == 'offline') {
                    var query = coursQueries.getAllCourses;
                    return dataService.executeQuery(query, config.OFFLINE_DBNAME).then(function(response) {
                        var coursList = [];
                        for (var i = 0; i < response.rows.length; i++) {
                            var tempEntityCours = {
                                coursekey: response.rows.item(i).coursKey,
                                coursetitle: response.rows.item(i).courseTitle,
                                groupkey: response.rows.item(i).groupKey,
                                instanceorganizationkey: response.rows.item(i).instanceOrganizationKey,
                            };
                            coursList.push(tempEntityCours);
                        } // end of for loop
                        return coursList;
                    });
                } else {
                    return dataService.callAPI(config.API_URL + 'Fee/unitmeasure', [], 'GET').then(function(response) {
                        return response.data;
                    });
                }
            }, // end of get method


            getserviceList: function(entityKey) {

                    if (appConfig.APP_MODE == 'offline') {
                        var query = coursQueries.getCoursByGroupKey + "'" + entityKey + "'";
                        return dataService.executeQuery(query, config.OFFLINE_DBNAME).then(function(response) {
                            var coursList = [];
                            for (var i = 0; i < response.rows.length; i++) {
                                var tempEntityCours = {
                                    coursekey: response.rows.item(i).coursKey,
                                    coursetitle: response.rows.item(i).courseTitle,
                                    groupkey: response.rows.item(i).groupKey,
                                    instanceorganizationkey: response.rows.item(i).instanceOrganizationKey,
                                };
                                coursList.push(tempEntityCours);
                            } // end of for loop
                            return coursList;
                        });
                    } else {
                        return dataService.callAPI(config.API_URL + 'Fee/institute/' + entityKey + '/service', [], 'GET').then(function(response) {
                            return response.data;
                        });
                    }
                } // end of get method


        } // end of factory
    }); // end of module