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

var app = angular.module('ThrillStudentLeaves.studentLeaveRequestLogic', ['ThrillFrameworkLibrary.DataService', 'ThrillStudentLeaves.studentLeaveRequestQueries', 'ThrillStudentLeaves.config', 'ThrillCnnWebClient.appConfig', , 'ThrillFrameworkLibrary.appLogger'])
    .factory('studentLeaveRequestLogic', function($http,
        dataService,
        studentLeaveRequestQueries,
        config,
        appConfig,
        appLogger) {

        return {

            getAllStudents: function(InstituteKey, AcademicYearKey, BoardKey, GroupKey, CourseKey, batchkey) {

                if (appConfig.APP_MODE == 'offline') {
                    var query = boardQueries.getBoardByBoardKey + "'" + entityKey + "'";
                    return dataService.executeQuery(query, config.OFFLINE_DBNAME).then(function(response) {
                        var boardList = [];
                        for (var i = 0; i < response.rows.length; i++) {
                            var tempEntityBoard = {
                                boardkey: response.rows.item(i).boardKey,
                                boardorganizationkey: response.rows.item(i).boardOrganizationKey,
                                instanceorganizationkey: response.rows.item(i).instanceOrganizationKey,
                            };
                            boardList.push(tempEntityBoard);
                        } // end of for loop
                        return boardList;
                    });
                } else {

                    return dataService.callAPI(config.API_URL + 'StudentLeaves/Student/institute/' + InstituteKey + '/academicyear/' + AcademicYearKey + '/board/' + BoardKey + '/group/' + GroupKey + '/course/' + CourseKey + '/batch/' + batchkey, [], 'GET').then(function(response) {
                        return response.data;
                    });
                }
            },


            getAllleaveRequests: function(BoardKey, GroupKey, CourseKey, batchkey, studentNumber) {

                if (appConfig.APP_MODE == 'offline') {
                    var query = boardQueries.getBoardByBoardKey + "'" + entityKey + "'";
                    return dataService.executeQuery(query, config.OFFLINE_DBNAME).then(function(response) {
                        var boardList = [];
                        for (var i = 0; i < response.rows.length; i++) {
                            var tempEntityBoard = {
                                boardkey: response.rows.item(i).boardKey,
                                boardorganizationkey: response.rows.item(i).boardOrganizationKey,
                                instanceorganizationkey: response.rows.item(i).instanceOrganizationKey,
                            };
                            boardList.push(tempEntityBoard);
                        } // end of for loop
                        return boardList;
                    });
                } else {

                    return dataService.callAPI(config.API_URL + 'StudentLeaves/StudentLeaveRequests/board/' + BoardKey + '/group/' + GroupKey + '/course/' + CourseKey + '/batch/' + batchkey + '/studentNumber/' + studentNumber, [], 'GET').then(function(response) {
                        return response.data;
                    });
                }
            },
            addStudentLeaveRequest: function(entityStudentLeaveRequest) {
                return dataService.insert(entityStudentLeaveRequest, '`StudentLeaves.studentLeaveRequests`', config.OFFLINE_DBNAME, config.API_URL + 'StudentLeaves/studentLeaveRequests').then(function(response) {
                    return response;
                });
            },

            updateStudentLeaveRequest: function(entityStudentLeaveRequest, entityKey) {
                return dataService.update(entityStudentLeaveRequest, 'studentLeaveRequestKey="' + entityKey + '"', '`StudentLeaves.studentLeaveRequests`', config.OFFLINE_DBNAME, config.API_URL + 'StudentLeaves/studentLeaveRequests/' + entityKey).then(function(response) {
                    return response;
                });
            },


            deleteStudentLeaveRequest: function(entityKey) {
                return dataService.delete('studentLeaveRequestKey="' + entityKey + '"', '`StudentLeaves.studentLeaveRequests`', config.OFFLINE_DBNAME, config.API_URL + 'StudentLeaves/studentLeaveRequests/' + entityKey).then(function(response) {
                    return response;
                });
            },


            getStudentLeaveRequestByStudentLeaveRequestKey: function(entityKey) {
                var query = studentLeaveRequestQueries.getStudentLeaveRequestByStudentLeaveRequestKey + "'" + entityKey + "'";
                if (appConfig.APP_MODE == 'offline') {
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
                    return dataService.callAPI(config.API_URL + 'StudentLeaves/studentLeaveRequests/' + entityKey, [], 'GET').then(function(response) {
                        return response.data;
                    });
                }
            }, // end of get method


            getAllStudentLeaveRequests: function() {
                    var query = studentLeaveRequestQueries.getAllStudentLeaveRequests;
                    if (appConfig.APP_MODE == 'offline') {
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
                        return dataService.callAPI(config.API_URL + 'StudentLeaves/studentLeaveRequests', [], 'GET').then(function(response) {
                            return response.data;
                        });
                    }
                } // end of get method


        } // end of factory
    }); // end of module