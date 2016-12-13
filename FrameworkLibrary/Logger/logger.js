/*===========================================================================
 All rights reserved to Nunet Cube Software Solutions.
 THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
 OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
 LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
 FITNESS FOR A PARTICULAR PURPOSE.
============================================================================
****************************************************************************
 Name                : logger
 Type                : Javascript and JQuery 
 Description         : This file contains exception handler method which caughts
                       uncaught errors
 References          :
 Author              : Kali
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
/* AngularJS module for exception handler use to find uncaught errors */
var app = angular.module('exceptionHandler.services', [])
    .constant('httpErrors', {
        0: 'The server is unreachable.'
        , 404: 'The requested data or service could not be found.'
        , 500: 'Unknown errors occurred at the server.'
    })
    //Create factory Method to find errors.
    .factory('$exceptionHandler', function ($injector) {

        return function (exception, cause) {
            //console.log("NunetLogger" + exception, cause);
            //console.log(exception, cause);
            var $rootScope = $injector.get("$rootScope");
            $rootScope.errors = $rootScope.errors || [];
            $rootScope.errors.push(exception.message);
            //console.log($rootScope.errors);
        }
    });



/*Use following url to post above errors
Url : http://192.168.100.41:2828/Service/PostError
Request :
 Json String Format:
{
    "errorCode":"200",
    "errorDescription":"This Is Sample Error",
    "appName":"OK"
}*/