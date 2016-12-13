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

var app = angular.module('ThrillAppBase.OrganizationListLogic', ['ThrillFrameworkLibrary.DataService'
    //, 'ThrillAppBase.AppBaseQueries'
    , 'ThrillAppBase.config', 'ThrillCnnWebClient.appConfig'
    /*, 'ThrillFrameworkLibrary.appLogger' 
    , 'ThrillOrganization.organizationLogic'
    , 'ThrillContact.contactLogic',
    'ThrillOrganization.config','ThrillOrganization.OrganizationListLogic'*/
]);
/*Create Business Logic Factory Method */

app.factory('appOrganizationListLogic', function($http, dataService
    // , AppBaseQueries
    , config, appConfig, appLogger, organizationLogic, contactLogic, orgconfig, OrganizationListLogic
) {

    return {

        /* addSubOrganization: function (subOrganizationObj) {

             var subOrganizationBasicInfo = subOrganizationObj.basicInfo;

             return organizationLogic.addOrganization(subOrganizationBasicInfo).then(function (response) {
                     var subOrganizationKey = response.data.organizationKey;
                     angular.forEach(subOrganizationObj.contacts, function (contactObj, index) {
                         contactObj.entityTypeId = 2;
                         contactObj.entityReferenceKey = subOrganizationKey;
                         contactLogic.addContact(contactObj).then(function (response) {
                             console.log(response);
                         });
                     });
                 return response;
             }
             , function (err) {
                     console.error('ERR', err);
                 });
                 
         },*/

        /* updateSubOrganization: function (subOrganizationObj, subOrganizationKey) {
                return organizationLogic.updateOrganization(subOrganizationObj.basicInfo, subOrganizationKey).then(function (response) {
                    console.log('update org response' + JSON.stringify(response));
                     
                    angular.forEach(subOrganizationObj.contacts, function (contactObj, index) {
                        console.log('update contact call' +JSON.stringify(contactObj))
                        contactLogic.updateContact(contactObj, contactObj.referenceKey).then(function (response) {
                            console.log('update contact response' + JSON.stringify(response));
                        });
                    });
                    
                    return response;
                });
            },
*/
        /* getSubOrganization: function (subOrganizationKey) {
             var organization = {};
             return organizationLogic.getOrganizationInfoById(subOrganizationKey).then(function (response) {
                 console.log('get org by key ' + subOrganizationKey + JSON.stringify(response));
                 organization.basicInfo = response;

                 var orgKey = response.referenceKey;

                 return contactLogic.getContactsByEntityKeys(orgKey).then(function (response) {
                     console.log('get contacts' + JSON.stringify(response))
                     organization.contacts = response;

                     return organization;
                 })

             })
         },*/

        getOrganizationList: function() {

            return dataService.callAPI(config.API_URL + 'organizations', [], 'GET').then(function(response) {

                console.log(JSON.stringify(response));
                return response;
            });
        }

    };
});