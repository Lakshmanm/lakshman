/*=======================================================================
 All rights reserved to Thrill Innovative Labs.
 THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
 OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
 LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
 FITNESS FOR A PARTICULAR PURPOSE.
===========================================================================
****************************************************************************
 Name                : 
 Type                : Javascript and JQuery 
 Description         : This file contains business logic methods
 References          :
 Author              : 
 Created Date        : 
****************************************************************************
MODIFICATION LOG
**************************************************************************** 
S.No Ver	Date:	     Modified By:		Description:

****************************************************************************  
Code Review LOG
**************************************************************************** 
S.No      Ver        Date                Code Review By            Observations

****************************************************************************
*/

var app = angular.module('ThrillAppBase.generalSettingsLogic', ['ThrillFrameworkLibrary.DataService'
    //, 'ThrillAppBase.AppBaseQueries'
    , 'ThrillAppBase.config'
    , 'ThrillCnnWebClient.appConfig'
    , 'ThrillFrameworkLibrary.appLogger'
    , 'ThrillOrganization.departmentLogic'
                                                               
    ]);
/*Create Business Logic Factory Method */

app.factory('generalSettingsLogic'
    , function ($http
        , dataService
       // , AppBaseQueries
        , config
        , appConfig
        , appLogger
        , contactLogic
        , orgconfig
        , departmentLogic
    ) {

        return {

   
             
  addSettings: function(generalObject) {
                return dataService.insert(generalObject, '`person.generalsettings`', config.OFFLINE_DBNAME, config.API_URL + 'Person/persons/generalsettings').then(function(response) {
                    return response;
                });
            },

           getAllGeneralSettings: function (personReferenceKey) {

            return dataService.callAPI(config.API_URL + 'Person/general/'+personReferenceKey, [], 'GET').then(function (response) {
            
                return response.data;
            });
        },
      updateGeneralSetting: function(entitysettings, entityKey) {
                return dataService.update(entitysettings, 'GeneralSettingsKey="' + entityKey + '"', '`person.generalsettings`', config.OFFLINE_DBNAME, config.API_URL + 'Person/persons/generalsettings/' + entityKey).then(function(response) {
                    return response;
                });
            },




           getOrganizationDetails: function (organizationReferenceKey) {
            return dataService.callAPI(config.API_URL + 'Organization/organizations/'+organizationReferenceKey, [], 'GET').then(function (response) {
                return response.data;
            });
        }
     

        };
    });