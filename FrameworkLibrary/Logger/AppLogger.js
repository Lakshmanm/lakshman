/*===========================================================================
 All rights reserved to Nunet Cube Software Solutions.
 THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
 OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
 LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
 FITNESS FOR A PARTICULAR PURPOSE.
============================================================================
****************************************************************************
 Name                : AppLogger
 Type                : Javascript and JQuery 
 Description         : This file contains configurable console log methods
 References          :
 Author              : Rajaji
 Created Date        : 31-Mar-2016 
****************************************************************************                          
MODIFICATION LOG
**************************************************************************** 
Ver Date         Modified By            Description
****************************************************************************                            
Code Review LOG
**************************************************************************** 
Ver        Date                Code Review By            Observations
****************************************************************************
*/
/*  

*/
/* AngularJS module for configurable logs and alerts */
var app = angular.module('ThrillFrameworkLibrary.appLogger', ['ThrillFrameworkLibrary.appConfig'])
    .factory('appLogger', function (appConfig, $log) {

        return {
            log: function (message) {
                $log.log(message);
            },

            warn: function (message) {
                if (appConfig.SHOW_DEBUG_MSG) {
                    $log.warn(message);
                }
            }
            , info: function (message) {
                if (appConfig.SHOW_DEBUG_MSG) {
                    $log.info(message);
                }
            }
            , error: function (message) {
                if (appConfig.SHOW_DEBUG_MSG) {
                    $log.error(message);
                }
            }
            , debug: function (message) {
                if (appConfig.SHOW_DEBUG_MSG) {
                    $log.debug('Start Debug :\n' + message + '\nEnd Debug');
                }
            }
            , alert: function (message) {
                if (appConfig.SHOW_ALERT) {
                    alert(message);
                }
            }
        }
    });