/*//=============================================================================
// All rights reserved to Thrill Innovative Labs.
// THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
// OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
// LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
// FITNESS FOR A PARTICULAR PURPOSE.
//=============================================================================
//*****************************************************************************
//* Name		    	: StudentLeaveRequest.Logic.js 
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

var app = angular.module('Mcampuz.profilesettngLogic', ['ThrillFrameworkLibrary.DataService',
        'Mcampuz.settingQueries', , 'ThrillAppBase.config',
        'ThrillCnnWebClient.appConfig', , 'ThrillFrameworkLibrary.appLogger'
    ])
    .factory('profilesettngLogic', function($http,
        dataService,
        config,
        settingQueries,
        appConfig,
        appLogger) {

        return {

            getAllRegions: function() {

                if (appConfig.APP_MODE == 'offline') {
                    var query = studentLeaveRequestQueries.getAllStudentLeaveRequests;
                    return dataService.executeQuery(query, config.OFFLINE_DBNAME).then(function(response) {
                        var studentLeaveRequestList = [];
                        for (var i = 0; i < response.rows.length; i++) {
                            var tempEntityStudentLeaveRequest = {
                                studentLeaveRequestKey: response.rows.item(i).studentLeaveRequestKey,
                                personKey: response.rows.item(i).personKey,
                                studentKey: response.rows.item(i).studentKey,
                                startDateTime: response.rows.item(i).startDateTime,
                                endDateTime: response.rows.item(i).endDateTime,
                                noOfDays: response.rows.item(i).noOfDays,
                                reasonForLeaveKey: response.rows.item(i).reasonForLeaveKey,
                                requestModeKey: response.rows.item(i).requestModeKey,
                                requestReceviedByKey: response.rows.item(i).requestReceviedByKey,
                                remarks: response.rows.item(i).remarks,
                                Status: response.rows.item(i).Status,
                                instanceOrganizationKey: response.rows.item(i).instanceOrganizationKey,
                            };
                            studentLeaveRequestList.push(tempEntityStudentLeaveRequest);
                        } // end of for loop
                        return studentLeaveRequestList;
                    });
                } else {
                    return dataService.callAPI(config.API_URL + 'Mcampuz/regions', [], 'GET').then(function(response) {
                        return response.data;
                    });
                }
            },
            getAlltimeZones: function() {

                if (appConfig.APP_MODE == 'offline') {
                    var query = studentLeaveRequestQueries.getAllStudentLeaveRequests;
                    return dataService.executeQuery(query, config.OFFLINE_DBNAME).then(function(response) {
                        var studentLeaveRequestList = [];
                        for (var i = 0; i < response.rows.length; i++) {
                            var tempEntityStudentLeaveRequest = {
                                studentLeaveRequestKey: response.rows.item(i).studentLeaveRequestKey,
                                personKey: response.rows.item(i).personKey,
                                studentKey: response.rows.item(i).studentKey,
                                startDateTime: response.rows.item(i).startDateTime,
                                endDateTime: response.rows.item(i).endDateTime,
                                noOfDays: response.rows.item(i).noOfDays,
                                reasonForLeaveKey: response.rows.item(i).reasonForLeaveKey,
                                requestModeKey: response.rows.item(i).requestModeKey,
                                requestReceviedByKey: response.rows.item(i).requestReceviedByKey,
                                remarks: response.rows.item(i).remarks,
                                Status: response.rows.item(i).Status,
                                instanceOrganizationKey: response.rows.item(i).instanceOrganizationKey,
                            };
                            studentLeaveRequestList.push(tempEntityStudentLeaveRequest);
                        } // end of for loop
                        return studentLeaveRequestList;
                    });
                } else {
                    return dataService.callAPI(config.API_URL + 'Mcampuz/timeZones', [], 'GET').then(function(response) {
                        return response.data;
                    });
                }
            },

            getAlltimeFormats: function() {

                if (appConfig.APP_MODE == 'offline') {
                    var query = studentLeaveRequestQueries.getAllStudentLeaveRequests;
                    return dataService.executeQuery(query, config.OFFLINE_DBNAME).then(function(response) {
                        var studentLeaveRequestList = [];
                        for (var i = 0; i < response.rows.length; i++) {
                            var tempEntityStudentLeaveRequest = {
                                studentLeaveRequestKey: response.rows.item(i).studentLeaveRequestKey,
                                personKey: response.rows.item(i).personKey,
                                studentKey: response.rows.item(i).studentKey,
                                startDateTime: response.rows.item(i).startDateTime,
                                endDateTime: response.rows.item(i).endDateTime,
                                noOfDays: response.rows.item(i).noOfDays,
                                reasonForLeaveKey: response.rows.item(i).reasonForLeaveKey,
                                requestModeKey: response.rows.item(i).requestModeKey,
                                requestReceviedByKey: response.rows.item(i).requestReceviedByKey,
                                remarks: response.rows.item(i).remarks,
                                Status: response.rows.item(i).Status,
                                instanceOrganizationKey: response.rows.item(i).instanceOrganizationKey,
                            };
                            studentLeaveRequestList.push(tempEntityStudentLeaveRequest);
                        } // end of for loop
                        return studentLeaveRequestList;
                    });
                } else {
                    return dataService.callAPI(config.API_URL + 'Mcampuz/timeFormats', [], 'GET').then(function(response) {
                        return response.data;
                    });
                }
            },

            getAlldateFormats: function() {

                if (appConfig.APP_MODE == 'offline') {
                    var query = studentLeaveRequestQueries.getAllStudentLeaveRequests;
                    return dataService.executeQuery(query, config.OFFLINE_DBNAME).then(function(response) {
                        var studentLeaveRequestList = [];
                        for (var i = 0; i < response.rows.length; i++) {
                            var tempEntityStudentLeaveRequest = {
                                studentLeaveRequestKey: response.rows.item(i).studentLeaveRequestKey,
                                personKey: response.rows.item(i).personKey,
                                studentKey: response.rows.item(i).studentKey,
                                startDateTime: response.rows.item(i).startDateTime,
                                endDateTime: response.rows.item(i).endDateTime,
                                noOfDays: response.rows.item(i).noOfDays,
                                reasonForLeaveKey: response.rows.item(i).reasonForLeaveKey,
                                requestModeKey: response.rows.item(i).requestModeKey,
                                requestReceviedByKey: response.rows.item(i).requestReceviedByKey,
                                remarks: response.rows.item(i).remarks,
                                Status: response.rows.item(i).Status,
                                instanceOrganizationKey: response.rows.item(i).instanceOrganizationKey,
                            };
                            studentLeaveRequestList.push(tempEntityStudentLeaveRequest);
                        } // end of for loop
                        return studentLeaveRequestList;
                    });
                } else {
                    return dataService.callAPI(config.API_URL + 'Mcampuz/dateFormats', [], 'GET').then(function(response) {
                        return response.data;
                    });
                }
            },
            getAlllanguages: function() {

                if (appConfig.APP_MODE == 'offline') {
                    var query = studentLeaveRequestQueries.getAllStudentLeaveRequests;
                    return dataService.executeQuery(query, config.OFFLINE_DBNAME).then(function(response) {
                        var studentLeaveRequestList = [];
                        for (var i = 0; i < response.rows.length; i++) {
                            var tempEntityStudentLeaveRequest = {
                                studentLeaveRequestKey: response.rows.item(i).studentLeaveRequestKey,
                                personKey: response.rows.item(i).personKey,
                                studentKey: response.rows.item(i).studentKey,
                                startDateTime: response.rows.item(i).startDateTime,
                                endDateTime: response.rows.item(i).endDateTime,
                                noOfDays: response.rows.item(i).noOfDays,
                                reasonForLeaveKey: response.rows.item(i).reasonForLeaveKey,
                                requestModeKey: response.rows.item(i).requestModeKey,
                                requestReceviedByKey: response.rows.item(i).requestReceviedByKey,
                                remarks: response.rows.item(i).remarks,
                                Status: response.rows.item(i).Status,
                                instanceOrganizationKey: response.rows.item(i).instanceOrganizationKey,
                            };
                            studentLeaveRequestList.push(tempEntityStudentLeaveRequest);
                        } // end of for loop
                        return studentLeaveRequestList;
                    });
                } else {
                    return dataService.callAPI(config.API_URL + 'Mcampuz/languages', [], 'GET').then(function(response) {
                        return response.data;
                    });
                }
            },
            getAllheights: function() {

                if (appConfig.APP_MODE == 'offline') {
                    var query = studentLeaveRequestQueries.getAllStudentLeaveRequests;
                    return dataService.executeQuery(query, config.OFFLINE_DBNAME).then(function(response) {
                        var studentLeaveRequestList = [];
                        for (var i = 0; i < response.rows.length; i++) {
                            var tempEntityStudentLeaveRequest = {
                                studentLeaveRequestKey: response.rows.item(i).studentLeaveRequestKey,
                                personKey: response.rows.item(i).personKey,
                                studentKey: response.rows.item(i).studentKey,
                                startDateTime: response.rows.item(i).startDateTime,
                                endDateTime: response.rows.item(i).endDateTime,
                                noOfDays: response.rows.item(i).noOfDays,
                                reasonForLeaveKey: response.rows.item(i).reasonForLeaveKey,
                                requestModeKey: response.rows.item(i).requestModeKey,
                                requestReceviedByKey: response.rows.item(i).requestReceviedByKey,
                                remarks: response.rows.item(i).remarks,
                                Status: response.rows.item(i).Status,
                                instanceOrganizationKey: response.rows.item(i).instanceOrganizationKey,
                            };
                            studentLeaveRequestList.push(tempEntityStudentLeaveRequest);
                        } // end of for loop
                        return studentLeaveRequestList;
                    });
                } else {
                    return dataService.callAPI(config.API_URL + 'Mcampuz/heights', [], 'GET').then(function(response) {
                        return response.data;
                    });
                }
            },
            getAllweights: function() {

                if (appConfig.APP_MODE == 'offline') {
                    var query = studentLeaveRequestQueries.getAllStudentLeaveRequests;
                    return dataService.executeQuery(query, config.OFFLINE_DBNAME).then(function(response) {
                        var studentLeaveRequestList = [];
                        for (var i = 0; i < response.rows.length; i++) {
                            var tempEntityStudentLeaveRequest = {
                                studentLeaveRequestKey: response.rows.item(i).studentLeaveRequestKey,
                                personKey: response.rows.item(i).personKey,
                                studentKey: response.rows.item(i).studentKey,
                                startDateTime: response.rows.item(i).startDateTime,
                                endDateTime: response.rows.item(i).endDateTime,
                                noOfDays: response.rows.item(i).noOfDays,
                                reasonForLeaveKey: response.rows.item(i).reasonForLeaveKey,
                                requestModeKey: response.rows.item(i).requestModeKey,
                                requestReceviedByKey: response.rows.item(i).requestReceviedByKey,
                                remarks: response.rows.item(i).remarks,
                                Status: response.rows.item(i).Status,
                                instanceOrganizationKey: response.rows.item(i).instanceOrganizationKey,
                            };
                            studentLeaveRequestList.push(tempEntityStudentLeaveRequest);
                        } // end of for loop
                        return studentLeaveRequestList;
                    });
                } else {
                    return dataService.callAPI(config.API_URL + 'Mcampuz/weights', [], 'GET').then(function(response) {
                        return response.data;
                    });
                }
            },
            getAlltemperatures: function() {

                if (appConfig.APP_MODE == 'offline') {
                    var query = studentLeaveRequestQueries.getAllStudentLeaveRequests;
                    return dataService.executeQuery(query, config.OFFLINE_DBNAME).then(function(response) {
                        var studentLeaveRequestList = [];
                        for (var i = 0; i < response.rows.length; i++) {
                            var tempEntityStudentLeaveRequest = {
                                studentLeaveRequestKey: response.rows.item(i).studentLeaveRequestKey,
                                personKey: response.rows.item(i).personKey,
                                studentKey: response.rows.item(i).studentKey,
                                startDateTime: response.rows.item(i).startDateTime,
                                endDateTime: response.rows.item(i).endDateTime,
                                noOfDays: response.rows.item(i).noOfDays,
                                reasonForLeaveKey: response.rows.item(i).reasonForLeaveKey,
                                requestModeKey: response.rows.item(i).requestModeKey,
                                requestReceviedByKey: response.rows.item(i).requestReceviedByKey,
                                remarks: response.rows.item(i).remarks,
                                Status: response.rows.item(i).Status,
                                instanceOrganizationKey: response.rows.item(i).instanceOrganizationKey,
                            };
                            studentLeaveRequestList.push(tempEntityStudentLeaveRequest);
                        } // end of for loop
                        return studentLeaveRequestList;
                    });
                } else {
                    return dataService.callAPI(config.API_URL + 'Mcampuz/temperatures', [], 'GET').then(function(response) {
                        return response.data;
                    });
                }
            },
            getAllcurrencies: function() {

                if (appConfig.APP_MODE == 'offline') {
                    var query = studentLeaveRequestQueries.getAllStudentLeaveRequests;
                    return dataService.executeQuery(query, config.OFFLINE_DBNAME).then(function(response) {
                        var studentLeaveRequestList = [];
                        for (var i = 0; i < response.rows.length; i++) {
                            var tempEntityStudentLeaveRequest = {
                                studentLeaveRequestKey: response.rows.item(i).studentLeaveRequestKey,
                                personKey: response.rows.item(i).personKey,
                                studentKey: response.rows.item(i).studentKey,
                                startDateTime: response.rows.item(i).startDateTime,
                                endDateTime: response.rows.item(i).endDateTime,
                                noOfDays: response.rows.item(i).noOfDays,
                                reasonForLeaveKey: response.rows.item(i).reasonForLeaveKey,
                                requestModeKey: response.rows.item(i).requestModeKey,
                                requestReceviedByKey: response.rows.item(i).requestReceviedByKey,
                                remarks: response.rows.item(i).remarks,
                                Status: response.rows.item(i).Status,
                                instanceOrganizationKey: response.rows.item(i).instanceOrganizationKey,
                            };
                            studentLeaveRequestList.push(tempEntityStudentLeaveRequest);
                        } // end of for loop
                        return studentLeaveRequestList;
                    });
                } else {
                    return dataService.callAPI(config.API_URL + 'Mcampuz/currencies', [], 'GET').then(function(response) {
                        return response.data;
                    });
                }
            },
            getAllProfileSettings: function(userKey) {

                if (appConfig.APP_MODE == 'offline') {
                    var query = studentLeaveRequestQueries.getAllStudentLeaveRequests;
                    return dataService.executeQuery(query, config.OFFLINE_DBNAME).then(function(response) {
                        var studentLeaveRequestList = [];
                        for (var i = 0; i < response.rows.length; i++) {
                            var tempEntityStudentLeaveRequest = {
                                studentLeaveRequestKey: response.rows.item(i).studentLeaveRequestKey,
                                personKey: response.rows.item(i).personKey,
                                studentKey: response.rows.item(i).studentKey,
                                startDateTime: response.rows.item(i).startDateTime,
                                endDateTime: response.rows.item(i).endDateTime,
                                noOfDays: response.rows.item(i).noOfDays,
                                reasonForLeaveKey: response.rows.item(i).reasonForLeaveKey,
                                requestModeKey: response.rows.item(i).requestModeKey,
                                requestReceviedByKey: response.rows.item(i).requestReceviedByKey,
                                remarks: response.rows.item(i).remarks,
                                Status: response.rows.item(i).Status,
                                instanceOrganizationKey: response.rows.item(i).instanceOrganizationKey,
                            };
                            studentLeaveRequestList.push(tempEntityStudentLeaveRequest);
                        } // end of for loop
                        return studentLeaveRequestList;
                    });
                } else {
                    return dataService.callAPI(config.API_URL + 'Mcampuz/psettings/' + userKey, [], 'GET').then(function(response) {
                        return response.data;
                    });
                }
            },
            addProfileSetting: function(entitysettings) {
                return dataService.insert(entitysettings, '`person.profilesetting`', config.OFFLINE_DBNAME, config.API_URL + 'Mcampuz/psettings').then(function(response) {
                    return response;
                });
            },

            updateProfileSettingt: function(entitysettings, entityKey) {
                return dataService.update(entitysettings, 'ProfileSettingKey="' + entityKey + '"', '`person.profilesetting`', config.OFFLINE_DBNAME, config.API_URL + 'Mcampuz/psettings/' + entityKey).then(function(response) {
                    return response;
                });
            },


        } // end of factory
    }); // end of module