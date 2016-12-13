/*===========================================================================
 All rights reserved to Nunet Cube Software Solutions.
 THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
 OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
 LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
 FITNESS FOR A PARTICULAR PURPOSE.
============================================================================
****************************************************************************
 Name                : Camera
 Type                : Javascript and JQuery 
 Description         : This file contains plugin methods for mobile camera
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

var module = angular.module('ThrillFrameworkLibrary.camera', []);
if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    /*setup camera controller*/
    module.factory('cameraService', function ($q, $cordovaCamera) {
        var fac = {};

        return {
            getPicture: function (options) {
                var q = $q.defer();
                $cordovaCamera.getPicture(options).then(function (imageData) {
                    q.resolve(imageData);
                }, function (err) {
                    q.reject(err);
                });
                return q.promise;
            }
        }
    });
}