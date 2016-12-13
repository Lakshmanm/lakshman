/*//=============================================================================
// All rights reserved to Thrill Innovative Labs.
// THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
// OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
// LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
// FITNESS FOR A PARTICULAR PURPOSE.
//=============================================================================
//*****************************************************************************
//* Name		    	: Institute.Logic.js 
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

var app = angular.module('ThrillDailyRoutine.daily', ['ThrillFrameworkLibrary.DataService', 'ThrillDailyRoutine.config', 'ThrillCnnWebClient.appConfig', 'ThrillFrameworkLibrary.appLogger'])
    .factory('dailyRoutineLogic', function($http,
        dataService,
        boardQueries,
        config,
        appConfig,
        appLogger) {

        return {

            addPeriodSlot: function(entityPeriod) {


                return dataService.insert(entityPeriod, '`dailyroutine.periodslots`', config.OFFLINE_DBNAME, config.API_URL + 'DailyRoutine/Periodslots').then(function(response) {

                    return response;
                });
            },


            getPeriodSlot: function(courseKey) {

                return dataService.callAPI(config.API_URL + 'DailyRoutine/Periodslots/' + courseKey, [], 'GET').then(function(response) {

                    return response.data;
                });
            },
            getPeriodSlotByBatchKey: function(batchKey) {

                return dataService.callAPI(config.API_URL + 'DailyRoutine/DailyRoutines/' + batchKey, [], 'GET').then(function(response) {

                    return response.data;
                });
            },

            getPeriodSlotByPeriodSlotKey: function(periodSlotKey, weekDayId,batchKey) {

                return dataService.callAPI(config.API_URL + 'DailyRoutine/DailyRoutineKey/' + periodSlotKey + '/' + weekDayId + '/' + batchKey, [], 'GET').then(function(response) {

                    return response.data;
                });
            },

getStaffPeriodList:function(periodSlotKey, weekDayId,staffKey)
            {
                return dataService.callAPI(config.API_URL + 'DailyRoutine/StaffDailyRoutineKey/' + periodSlotKey + '/' + weekDayId + '/' + staffKey  , [], 'GET').then(function(response) {

                    return response.data;
                });  
            },


            addSubjectTeacher: function(entityTeacher) {



                return dataService.insert(entityTeacher, '`dailyroutine.dailyroutines`', config.OFFLINE_DBNAME, config.API_URL + 'DailyRoutine/DailyRoutines').then(function(response) {

                    return response;
                });
            },

            updateSubjectTeacher: function(entityTeacher) {


                var dailyRoutineKey = entityTeacher.dailyRoutineKey;

                return dataService.update(entityTeacher, 'dailyRoutineKey="' + dailyRoutineKey + '"', '`dailyroutine.dailyroutines`', config.OFFLINE_DBNAME, config.API_URL + 'DailyRoutine/DailyRoutine/' + dailyRoutineKey).then(function(response) {

                    return response;
                });
            },





            deletePeriodSlot: function(periodSlotKey) {
                return dataService.delete('PeriodSlotKey="' + periodSlotKey + '"', '`dailyroutine.periodslots`', config.OFFLINE_DBNAME, config.API_URL + 'DailyRoutine/Periodslot/' + periodSlotKey).then(function(response) {
                    return response;
                });
            },


            getDailyRoutine: function(dailyRoutineKey) {

                return dataService.callAPI(config.API_URL + 'DailyRoutine /DailyRoutine/' + dailyRoutineKey, [], 'GET').then(function(response) {

                    return response.data;
                });
            },



        }
        // end of factory
    }); // end of module