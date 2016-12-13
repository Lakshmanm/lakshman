/*=======================================================================
 All rights reserved to Thrill Innovative Labs.
 THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
 OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
 LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
 FITNESS FOR A PARTICULAR PURPOSE.
===========================================================================
****************************************************************************
 Name                : Organization.Logic.js
 Type                : Javascript and JQuery 
 Description         : This file contains business logic methods
 References          :
 Author              : kalyani
 Created Date        : 11-Apr-2016
****************************************************************************
MODIFICATION LOG
**************************************************************************** 
S.No Ver	Date:	     Modified By:		Description:
1          12-04-2016    Kiranmai            dependency structure changed
****************************************************************************  
Code Review LOG
**************************************************************************** 
S.No      Ver        Date                Code Review By            Observations
1         1.0       13-April-2016         Sri Venkatesh.T           write function  params a meaningful name don't use shartcut name ex: orgid for  updateOrganization

****************************************************************************
*/

var app = angular.module('ThrillOrganization.organizationLogic', ['ThrillFrameworkLibrary.DataService', 'ThrillOrganization.OrganizationQueries', 'ThrillOrganization.config',
    'ThrillCnnWebClient.appConfig',


    , 'ThrillFrameworkLibrary.appLogger'
]);
/*Create Business Logic Factory Method */

app.factory('organizationLogic', function($http, dataService, OrganizationQueries, orgconfig, appConfig, appLogger) {


    return {
        /*CRUD Operations for Organization*/
        getOrgLevelList: function(val) {

                var query = OrganizationQueries.getOrganizationLevels;
                if (appConfig.APP_MODE == 'offline') {
                    return dataService.executeQuery(query, orgconfig.OFFLINE_DBNAME).then(function(response) {
                        var OrgLevelList = [];

                        for (var i = 0; i < response.rows.length; i++) {
                            var OrgLevelObj = {
                                organizationLevelID: response.rows.item(i).OrganizationLevelID,
                                organizationLevelName: response.rows.item(i).OrganizationLevelName

                            };
                            OrgLevelList.push(OrgLevelObj);

                        }


                        return OrgLevelList;
                    });
                } else {
                    //console.log(JSON.stringify())
                    return dataService.callAPI(orgconfig.API_URL + 'OrganizationLevels', [], 'GET').then(function(response) {

                        return response.data;
                    });

                }

            }
            /*Method for adding Organization details*/
            ,

        getOrganizationTypes: function(val) {

            var query = OrganizationQueries.getOrganizationTypes;
            if (appConfig.APP_MODE == 'offline') {
                return dataService.executeQuery(query, orgconfig.OFFLINE_DBNAME).then(function(response) {
                    var OrgTypeList = [];

                    for (var i = 0; i < response.rows.length; i++) {
                        var orgTypeObj = {
                            organizationTypeId: response.rows.item(i).OrganizationTypeID,
                            organizationTypeKey: response.rows.item(i).OrganizationTypeKey,
                            organizationTypeTitle: response.rows.item(i).OrganizationTypeTitle
                        };
                        OrgTypeList.push(orgTypeObj);

                    }


                    return OrgTypeList;
                });
            } else {
                //console.log(JSON.stringify())
                return dataService.callAPI(orgconfig.API_URL + 'OrganizationTypes', [], 'GET').then(function(response) {
                    return response.data;
                });

            }
        },

        getSubOrganizationTypes: function(val) {

            var query = OrganizationQueries.getAllSubOrganizationTypes;
            if (appConfig.APP_MODE == 'offline') {
                return dataService.executeQuery(query, orgconfig.OFFLINE_DBNAME).then(function(response) {
                    var subOrgTypes = [];

                    for (var i = 0; i < response.rows.length; i++) {
                        var subOrgTypeObj = {
                            subOrganizationTypeId: response.rows.item(i).SubOrganizationTypeID,
                            subOrganizationTypeKey: response.rows.item(i).SubOrganizationTypeKey,
                            subOrganizationTypeTitle: response.rows.item(i).SubOrganizationTypeTitle

                        };
                        subOrgTypes.push(subOrgTypeObj);

                    }


                    return subOrgTypes;
                });
            } else {
                //console.log(JSON.stringify())
                return dataService.callAPI(orgconfig.API_URL + 'subOrganizationTypes', [], 'GET').then(function(response) {

                    return response.data;
                });

            }
        },

        addOrganization: function(organizationInfoObj) {

            return dataService.insert(organizationInfoObj, '`organization.organizations`', orgconfig.OFFLINE_DBNAME, orgconfig.API_URL + 'organizations').then(function(response) {
                return response;
            });

        },

        /*Method for updating Organization details*/
        updateOrganization: function(organizationInfoObj, organizationReferencekey) {

            return dataService.update(organizationInfoObj, 'referencekey=' + "'" + organizationReferencekey + "'", '`organization.organizations`', orgconfig.OFFLINE_DBNAME, orgconfig.API_URL + 'organizations/' + organizationReferencekey).then(function(response) {
                return response;
            });

        },

        /*Method for retrieving Organization details based on OrganizationID*/
        getOrganizationInfoById: function(organizationReferencekey) {

            var query = OrganizationQueries.organizationInfoById + "'" + organizationReferencekey + "'";
            if (appConfig.APP_MODE == 'offline') {
                return dataService.executeQuery(query, orgconfig.OFFLINE_DBNAME).then(function(response) {

                    var orgList = [];

                    var orgInfoObj = {
                        organizationID: response.rows.item(0).OrganizationID,
                        organizationName: response.rows.item(0).OrganizationName,
                        organizationCode: response.rows.item(0).OrganizationCode,
                        parentOrganizationID: response.rows.item(0).ParentOrganizationID,
                        organizationLevelID: response.rows.item(0).OrganizationLevelID,
                        organizationDetails: response.rows.item(0).OrganizationDetails,
                        establishedOn: response.rows.item(0).EstablishedOn,
                        organizationTypeKey: response.rows.item(0).OrganizationTypeKey,
                        subOrganizationTypeKey: response.rows.item(0).SubOrganizationTypeKey
                    };
                    orgList.push(orgInfoObj);

                    return orgList[0];
                });
            } else {

                return dataService.callAPI(orgconfig.API_URL + 'organizations/' + organizationReferencekey, [], 'GET').then(function(response) {

                    return response.data[0];
                });
            }
        },
        /*Method for retrieving all Organization details */
        getOrganizations: function() {

            var query = OrganizationQueries.organizationNames;
            if (appConfig.APP_MODE == 'offline') {
                return dataService.executeQuery(query, orgconfig.OFFLINE_DBNAME).then(function(response) {
                    var parentOrgList = [];

                    for (var i = 0; i < response.rows.length; i++) {
                        var parentOrgListObj = {
                            organizationID: response.rows.item(i).OrganizationID,
                            organizationName: response.rows.item(i).OrganizationName


                        };
                        parentOrgList.push(parentOrgListObj);

                    }


                    return parentOrgList;
                });
            } else {
                return dataService.callAPI(orgconfig.API_URL + 'SubOrganizations', [], 'GET').then(function(response) {
                    return response.data;
                });

            }


        },

        getOrganizationsByRootOrganization: function(rootOrganizationKey) {

            return dataService.callAPI(orgconfig.API_URL + 'rootOrganizations/' + rootOrganizationKey + '/organizations', [], 'GET').then(function(response) {
                return response.data;
            });
        }
    };
});