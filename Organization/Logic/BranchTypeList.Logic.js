/*=======================================================================
 All rights reserved to Thrill Innovative Labs.
 THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
 OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
 LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
 FITNESS FOR A PARTICULAR PURPOSE.
===========================================================================
****************************************************************************
 Name                : Registration.Logic.js
 Type                : Javascript and JQuery 
 Description         : This file contains business logic methods
 References          :
 Author              : Kiranmai Labhala
 Created Date        : 12-April-2016
****************************************************************************
MODIFICATION LOG
**************************************************************************** 
S.No Ver	Date:	         Modified By		   Description
1     1.0    13-April-2016   Kiranmai Labhala      Define offline get all registrationType details , get all registration details                                            and get registration by registration id.
2     1.0    22-04-2016      Satya Kalyani Lanka   Reference keys are added 
****************************************************************************  
Code Review LOG
**************************************************************************** 
S.No      Ver        Date                Code Review By            Observations
1         1.0       14-April-2016         Sri Venkatesh.T           write function  params a meaningful name don't use shartcut name ex: orgid for  getRegistrationBasicInfoDetails and also write comments for all fucntions in this file
****************************************************************************
*/

var app = angular.module('ThrillOrganization.BranchTypeListLogic', ['ThrillFrameworkLibrary.DataService', 'ThrillOrganization.OrganizationQueries', 'ThrillOrganization.config', 'ThrillCnnWebClient.appConfig', 'ThrillFrameworkLibrary.appLogger'])
    /*Create Business Logic Factory Method */

.factory('BranchTypeListLogic'
    , function ($http
        , dataService
        , OrganizationQueries
        , orgconfig
        , appConfig
        , appLogger) {


    return {
        /*CRUD Operations for Contact Details*/

        /*Method for adding registration details*/
        
        /*get all Registration type details--drop down*/
        BranchCollection: function (organizationKey) {

            var query = OrganizationQueries.registrationTypeDetails;
            if (appConfig.APP_MODE == 'offline') {
                return dataService.executeQuery(query, orgconfig.OFFLINE_DBNAME).then(function (response) {
                    var RegistrationTypeList = [];

                    for (var i = 0; i < response.rows.length; i++) {
                        var registrationTypeObj = {
                            registrationTypeID: response.rows.item(i).RegistrationTypeID,
                            registrationTypeName: response.rows.item(i).RegistrationTypeName

                        };
                        RegistrationTypeList.push(registrationTypeObj);

                    }


                    return RegistrationTypeList;
                });
            } else {

                //'organizations/'+organizationKey+'/branchTypes'
return dataService.callAPI(orgconfig.API_URL + 'organizations/'+organizationKey+'/branchTypes', [], 'GET').then(function (response) {

                //return dataService.callAPI(orgconfig.API_URL + 'BranchTypes', [], 'GET').then(function (response) {


                    return response.data;
                });

            }


        },
        /*get all  contact details by contact Id*/
      
        /*get all registration details*/
       
        /*delete registration details by registration id*/
removeBranchType: function (SubOrganizationTypeKey) {
                 return dataService.delete('SubOrganizationTypeKey="' + SubOrganizationTypeKey + '"', 'organization.organizations', orgconfig.OFFLINE_DBNAME, orgconfig.API_URL + 'BranchTypes/' + SubOrganizationTypeKey).then(function (response) {
                 return response;
             });
     }




   /*     removeBranchType: function (SubOrganizationTypeKey) {
            alert(SubOrganizationTypeKey);
console.log(SubOrganizationTypeKey+'   url '+orgconfig.API_URL + 'BranchTypes/' + SubOrganizationTypeKey)
            return dataService.delete('SubOrganizationTypeKey=' + "'"+SubOrganizationTypeKey+"'", 'Registrations', orgconfig.API_URL + 'BranchTypes/' + SubOrganizationTypeKey).then(function (response) {

                return response;
            });
        }*/
    };
});