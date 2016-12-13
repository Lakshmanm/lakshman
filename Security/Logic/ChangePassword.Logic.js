/*=======================================================================
 All rights reserved to Thrill Innovations Lab.
 THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
 OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
 LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
 FITNESS FOR A PARTICULAR PURPOSE.
===========================================================================
****************************************************************************
 Name                : ChangePassword
 Type                : Javascript and JQuery 
 Description         : This file contains logic methods
 References          :
 Author              :  Rahul Buddha
 Created Date        :  13-April-2016
****************************************************************************
MODIFICATION LOG
**************************************************************************** 
Ver Date         Modified By            Description
13-Apr-2016      Tulasi Ballada         Added Logic For The CRUD Operations(completeLogic)
****************************************************************************  
Code Review LOG
**************************************************************************** 
S.No      Ver        Date                Code Review By            Observations
1         1.0       14-April-2016         Sri Venkatesh.T           appConfig, appLogger,securityQueries are not used but injected remove if not required.
2         1.0       14-April-2016         Sri Venkatesh.T           write comments for all the functions in this file
3         1.0       14-April-2016         Sri Venkatesh.T           Give meaningful name for the function parameters with camel casing.And remove all empty lines just accomidate ample of line space to look code with indentation.
4         1.0       14-April-2016         Sri Venkatesh.T           In page header please mention full name of the author. 
****************************************************************************
*/

var app = angular.module('security.changePasswordLogic', [
    'ThrillFrameworkLibrary.DataService',
                                                          'security.config',
                                                          'ThrillCnnWebClient.appConfig',
                                                          'ThrillFrameworkLibrary.appLogger'

                                                          ])
    .factory('changePasswordLogic', function ($http,
        dataService,
        securityconfig,
        appConfig,
        appLogger) {
        return {
            //Logic to update Password by Userid
            updatePassword: function (userObj, userId) {
                return dataService.update(userObj, 'ID=' + userId, 'User', 'Security', securityconfig.API_URL + 'Security/Password/' + userId).then(function (response) {
                    return response;
                });
            },
            //Logic to get Password based on userId
            getPassword: function (userId) {
                return dataService.callAPI(securityconfig.API_URL + 'Security/passwords/' + userId, [], 'GET').then(function (response) {
                    return response;
                });
            }

        };

    });