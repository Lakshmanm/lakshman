/*=======================================================================
 All rights reserved to Nunet Cube Software Solutions.
 THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
 OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
 LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
 FITNESS FOR A PARTICULAR PURPOSE.
===========================================================================
****************************************************************************
 Name                : confid
 Type                : Javascript and JQuery 
 Description         : This file contains application level configuration info
 References          :
 Author              : Rajaji
 Created Date        : 31-Mar-2016
****************************************************************************
MODIFICATION LOG
**************************************************************************** 
Ver	Date	     Modified By			Description
****************************************************************************  
Code Review LOG
**************************************************************************** 
Ver        Date                Code Review By            Observations
****************************************************************************
*/

var app = angular.module('ThrillFrameworkLibrary.appConfig', [])

.constant('appConfig', {

    APP_MODE: 'online',
    APP_TYPE: 'web',
    CULTURE_NAME: 'en_US',
    SHOW_DEBUG_MSG: true,
    SHOW_ALERT: true
}).value('configval', {


    name: 'ajajir'


});