/*=======================================================================
 All rights reserved to Thrill Innovations Lab .
 THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
 OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
 LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
 FITNESS FOR A PARTICULAR PURPOSE.
===========================================================================
****************************************************************************
 Name                : Storage 
 Type                : Javascript and JQuery 
 Description         : This file contains controller methods
 References          :
 Author              :  Mythreyee.Pingala
 Created Date        :  12-April-2016
****************************************************************************
MODIFICATION LOG
**************************************************************************** 
Ver Date         Modified By            Description

****************************************************************************  
Code Review LOG
**************************************************************************** 
S.No      Ver        Date                Code Review By            Observations
1         1.0       14-April-2016         Sri Venkatesh.T          Why this file is required ? 
                                                                   This is deviation as per the architecture.If not deviation 
****************************************************************************
*/
// This is created to store the data captured in  basic  info view to move to address view
var app = angular.module('security.appStorage', [])
    .factory('appStorage', function () {
        var userObj = {};

        return {
            insertData: function (profileObj) {
                userObj = profileObj;
                return "StaffProfileSuccessFullyInserted";
            },
            getData: function () {
                return userObj;
            }
        };

    });