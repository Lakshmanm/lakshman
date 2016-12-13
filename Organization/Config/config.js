/*=======================================================================
 All rights reserved to Thrill Innovative Labs.
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
 Author              : Satya Kalyani
 Created Date        : 07-April-2016
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

var app = angular.module('ThrillOrganization.config', [])

.constant('orgconfig', {


    OFFLINE_DBNAME: 'Organization',
    API_URL: 'http://182.18.164.29:3434/V1/Organization/'

});