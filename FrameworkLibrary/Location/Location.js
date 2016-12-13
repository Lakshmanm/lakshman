/*===========================================================================
 All rights reserved to Nunet Cube Software Solutions.
 THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
 OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
 LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
 FITNESS FOR A PARTICULAR PURPOSE.
============================================================================
****************************************************************************
 Name                : Location
 Type                : Javascript and JQuery 
 Description         : This file contains method for finding geo location
 References          :
 Author              : Murali
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


var module = angular.module('ThrillFrameworkLibrary.Location', []);
var module = angular.module('ThrillFrameworkLibrary.Location', []);
if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    module.factory('Locationservice', function ($q, $cordovaGeolocation) {
        return {
            getLocation: function (options) {
                var q = $q.defer();
                //console.log("1234"+options+$cordovaGeolocation);
                $cordovaGeolocation
                    .getCurrentPosition(options)
                    .then(function (position) {
                        //console.log(position);
                        q.resolve(position);
                    }, function (err) {
                        // error
                        q.reject(err);
                    });
                return q.promise;
            }
        }
    });

}