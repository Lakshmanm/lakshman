/*=======================================================================
 All rights reserved to Nunet Cube Software Solutions.
 THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
 OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
 LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
 FITNESS FOR A PARTICULAR PURPOSE.
===========================================================================
****************************************************************************
 Name                : config
 Type                : Javascript and JQuery 
 Description         : This file contains component level configuration info
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

var app = angular.module('ThrillCNN.config', [])

.constant('cnnconfig', {

    OFFLINE_DBNAME: 'Employee',

    API_URL: 'http://182.18.164.29:3434/V1/CalendarNotifications',

    SECURITY_API_URL: 'http://182.18.164.29:3434/V1/security',


    CONTACT_API_URL: 'http://182.18.164.29:3434/V1/contact'


});