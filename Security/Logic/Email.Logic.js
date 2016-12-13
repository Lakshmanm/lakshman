/*=======================================================================
 All rights reserved to Thrill Innovations Lab.
 THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
 OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
 LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
 FITNESS FOR A PARTICULAR PURPOSE.
===========================================================================
****************************************************************************
 Name                : Email
 Type                : Javascript and JQuery 
 Description         : This file contains logic methods
 References          :
 Author              : Mythreyee.Pingala
 Created Date        :  12-Apl-2016
****************************************************************************
MODIFICATION LOG
**************************************************************************** 
Ver Date         Modified By            Description
12-Apl-2016      Mythreyee              Added Logic  
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


var app = angular.module('security.emailLogic', ['ThrillFrameworkLibrary.DataService',
                                                    'security.config',
                                                    'ThrillCnnWebClient.appConfig',
                                                    'ThrillFrameworkLibrary.appLogger'
    ])
    .factory('emailLogic', function ($http,
        dataService,
        securityconfig,
        appConfig,
        appLogger
    ) {


        return {

            //Logic to verfy based on token
            verifyEmail: function (emailVal) {

                return dataService.callAPI(securityconfig.API_URL + 'Security/tokens/' + emailVal, [], 'GET').then(function (response) {

                    return response.data;
                });

            }

        };

    });