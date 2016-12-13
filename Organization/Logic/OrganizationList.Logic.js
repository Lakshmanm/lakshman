/*=======================================================================
 All rights reserved to Thrill Innovative Labs.
 THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
 OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
 LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
 FITNESS FOR A PARTICULAR PURPOSE.
===========================================================================
****************************************************************************
 Name                : OrganizationList.Logic 
 Type                : Javascript and JQuery 
 Description         : This file contains business logic methods
 References          :
 Author              : Naveena
 Created Date        : 07-Apr-2016
****************************************************************************
MODIFICATION LOG
**************************************************************************** 
S.No Ver	Date:	     Modified By:		Description:
1     1.0     14-04-2016    Kalyani             dependency structure changed
****************************************************************************  
Code Review LOG
**************************************************************************** 
S.No      Ver        Date                Code Review By            Observations
1         1.0       13-April-2016         Sri Venkatesh.T           "appLogger" module dependency injection which is never used,remove if not required
2         1.0       13-April-2016         Sri Venkatesh.T           write function  params a meaningful name don't use shartcut name ex: orgid for  removeOrganization
****************************************************************************
*/

var app = angular.module('ThrillOrganization.OrganizationListLogic', ['ThrillFrameworkLibrary.DataService'

        , 'ThrillOrganization.OrganizationQueries'

        , 'ThrillOrganization.config'

        , 'ThrillCnnWebClient.appConfig'

        , 'ThrillFrameworkLibrary.appLogger'
    ])
    /*create Business Logic Factory Method */
    .factory('OrganizationListLogic', function($http, dataService, OrganizationQueries, orgconfig, appConfig, appLogger) {

        /* Get contact details from  external source(localDb or web). */
        return {
            getOrganizationDetails: function() {

                var query = OrganizationQueries.organizationBasicInfoDetails;
                if (appConfig.APP_MODE == 'offline') {
                    return dataService.executeQuery(query, orgconfig.OFFLINE_DBNAME).then(function(response) {
                        var organizationList = [];
                        for (var i = 0; i < response.rows.length; i++) {
                            var organizationBasicInfoObj = {

                                referenceKey: response.rows.item(i).ReferenceKey,
                                organizationName: response.rows.item(i).OrganizationName,
                                ParentOrganizationID: response.rows.item(i).ParentOrganizationID,
                                OrganizationLevelID: response.rows.item(i).OrganizationLevelID,
                                organizationLevelName: response.rows.item(i).OrganizationLevelName,

                            };
                            organizationList.push(organizationBasicInfoObj);

                        }

                        return organizationList;
                    });
                } else {

                    return dataService.callAPI(orgconfig.API_URL + 'organizations', [], 'GET').then(function(response) {

                        return response.data;
                    });

                }


            },
            removeOrganization: function(organizationReferenceKey) {

                return dataService.delete('ReferenceKey=' + "'" + organizationReferenceKey + "'", '`organization.Organizations`', orgconfig.OFFLINE_DBNAME, orgconfig.API_URL + 'Organizations/' + organizationReferenceKey).then(function(response) {
                    return response.data;
                });
            }
        };
    });