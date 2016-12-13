/*=======================================================================
  All rights reserved to Thrill Innovations Lab.
 THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
 OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
 LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
 FITNESS FOR A PARTICULAR PURPOSE.
===========================================================================
****************************************************************************
 Name                :Verify Mail
 Type                : Javascript and JQuery 
 Description         : This file contains logic methods
 References          :
 Author              :  Mythreyee.Pingala
 Created Date        :  12-Apl-2016
****************************************************************************
MODIFICATION LOG
**************************************************************************** 
Ver Date         Modified By            Description
****************************************************************************  
Code Review LOG
**************************************************************************** 
S.No      Ver        Date                Code Review By            Observations
1         1.0       14-April-2016         Sri Venkatesh.T          securityQueries,appConfig and appLogger are never used remove if not required
2         1.0       14-April-2016         Sri Venkatesh.T          function params must be camel cased and having a meaningful name.declaring a function param as "obj" doen't have a readability.
3         1.0       14-April-2016         Sri Venkatesh.T          function comments are not so clear     
****************************************************************************
*/

var app = angular.module('security.verifyMailLogic', ['ThrillFrameworkLibrary.DataService'
      
        , 'security.config'
        , 'ThrillCnnWebClient.appConfig'
        , 'ThrillFrameworkLibrary.appLogger'
    ])
    .factory('verifyMailLogic', function ($http,
        dataService,
        securityconfig,
        appConfig,
        appLogger) {
        return {
            verifyEmail: function (emailId) {
                return dataService.callAPI(securityconfig.API_URL + 'Security/tokens/' + emailId, [], 'GET').then(function (response) {
                    return response.data;
                });
            },
            userUpdate: function (userObj, key) {
                return dataService.update(userObj, 'ReferenceKey=' + key, 'Security', securityconfig.OFFLINE_DBNAME, securityconfig.API_URL + 'Security/emailStatus/' + key).then(function (response) {

                    return response;
                });

            }
        };
    });