/*=======================================================================
 All rights reserved to Thrill Innovative Labs.
 THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
 OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
 LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
 FITNESS FOR A PARTICULAR PURPOSE.
===========================================================================
****************************************************************************
 Name                : SubOrganization.Logic.js
 Type                : Javascript and JQuery 
 Description         : This file contains business logic methods
 References          :
 Author              : 
 Created Date        : 
****************************************************************************
MODIFICATION LOG
**************************************************************************** 
S.No Ver	Date:	         Modified By		   Description
 
****************************************************************************  
Code Review LOG
**************************************************************************** 
S.No      Ver        Date                Code Review By            Observations

****************************************************************************
*/

var app = angular.module('ThrillOrganization.SubOrganizationTypeListLogic', ['ThrillFrameworkLibrary.DataService',
        'ThrillOrganization.OrganizationQueries',
        'ThrillOrganization.config',
        'ThrillCnnWebClient.appConfig',
        'ThrillFrameworkLibrary.appLogger'
    ])
    /*Create Business Logic Factory Method */

.factory('SubOrganizationTypeListLogic', function($http, dataService, OrganizationQueries, orgconfig, appConfig, appLogger) {


    return {

        getAllSubOrganizationTypes: function() {

            if (appConfig.APP_MODE == 'offline') {
                var query = OrganizationQueries.getAllSubOrganizationTypes();
                return dataService.executeQuery(query, orgconfig.OFFLINE_DBNAME).then(function(response) {
                    var subOrganizationTypeList = [];
                    var subOrganizationTypeObj = {
                        subOrganizationTypeId: response.rows.item(0).SubOrganizationTypeID,
                        subOrganizationTypeKey: response.rows.item(0).SubOrganizationTypeKey,
                        subOrganizationTypeTitle: response.rows.item(0).SubOrganizationTypeTitle
                    };
                    subOrganizationTypeList.push(subOrganizationTypeObj);
                    return subOrganizationTypeList[0];
                });
            } else {
                return dataService.callAPI(orgconfig.API_URL + 'subOrganizationTypes', [], 'GET').then(function(response) {
                    return response.data[0];
                });
            }
        },

        getSubOrganizationTypesByOrganizationId: function(organizationKey) {

            if (appConfig.APP_MODE == 'offline') {
                var query = OrganizationQueries.getSubOrganizationTypesByOrganizationId(organizationKey);
                return dataService.executeQuery(query, orgconfig.OFFLINE_DBNAME).then(function(response) {
                    var subOrganizationTypeList = [];
                    var subOrganizationTypeObj = {
                        subOrganizationTypeId: response.rows.item(0).SubOrganizationTypeID,
                        subOrganizationTypeKey: response.rows.item(0).SubOrganizationTypeKey,
                        subOrganizationTypeTitle: response.rows.item(0).SubOrganizationTypeTitle
                    };
                    subOrganizationTypeList.push(subOrganizationTypeObj);
                    return subOrganizationTypeList;
                });
            } else {
                return dataService.callAPI(orgconfig.API_URL + 'organizations/' + organizationKey + '/subOrganizationTypes', [], 'GET').then(function(response) {
                    return response.data;
                });
            }
        },


        /*delete subOrganizationType details by subOrganizationType id*/
        removeSubOrganizationType: function(subOrganizationTypeKey) {
            return dataService.delete('SubOrganizationTypeKey="' + subOrganizationTypeKey + '"', 'organization.organizations', orgconfig.OFFLINE_DBNAME, orgconfig.API_URL + 'subOrganizationTypes/' + subOrganizationTypeKey).then(function(response) {
                return response;
            });
        }

    };
});