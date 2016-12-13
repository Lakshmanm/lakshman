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

var app = angular.module('ThrillPerson.Config', [])

.constant('personconfig', {


    OFFLINE_DBNAME: 'Person',
    //API_URL: 'http://192.168.100.178:8899/V1/person/'
    API_URL: 'http://182.18.164.29:3434/V1/Person/'

    //DMS_URL: 'http://192.168.100.3:9095/V1/dms/'
    //API_URL: 'http://192.168.100.200:8899/V1/person/'




});