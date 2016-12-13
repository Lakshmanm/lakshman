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

var app = angular.module('ThrillOrganization.registrationLogic', ['ThrillFrameworkLibrary.DataService', 'ThrillOrganization.OrganizationQueries', 'ThrillOrganization.config', 'ThrillCnnWebClient.appConfig', 'ThrillFrameworkLibrary.appLogger'])
    /*Create Business Logic Factory Method */

.factory('registrationLogic'
    , function ($http
        , dataService
        , OrganizationQueries
        , config
        , appConfig
        , appLogger) {


    return {
        /*CRUD Operations for Contact Details*/

        /*Method for adding registration details*/
        addRegistration: function (regBasicInfoObj,organizationReferenceKey) {
            return dataService.insert(regBasicInfoObj, '`organization.registrations`', config.OFFLINE_DBNAME, config.API_URL + 'organizations/'+organizationReferenceKey+'/registrations').then(function (response) {

                return response;
            });

        },

        /*Method for updating registration details*/
        updateRegistration: function (regBasicInfoObj, organizationReferenceKey,registrationReferenceKey) {

            return dataService.update(regBasicInfoObj, 'ReferenceKey=' +"'"+registrationReferenceKey+"'" , '`organization.registrations`', config.OFFLINE_DBNAME, config.API_URL + 'organizations/'+organizationReferenceKey+'/registrations/' + registrationReferenceKey).then(function (response) {

                return response;
            });

        },

        /*get all Registration type details--drop down*/
        getRegistrationTypes: function (regtypeid) {

            var query = OrganizationQueries.registrationTypeDetails;
            if (appConfig.APP_MODE == 'offline') {
                return dataService.executeQuery(query, config.OFFLINE_DBNAME).then(function (response) {
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
                return dataService.callAPI(config.API_URL + 'RegistrationTypes', [], 'GET').then(function (response) {


                    return response.data;
                });

            }


        },
        /*get all  contact details by contact Id*/
        getRegistrationBasicInfoById: function (organizationReferenceKey,registrationReferenceKey) {

            var query = OrganizationQueries.registrationBasicInfoById + "'"+registrationReferenceKey+"'";
            if (appConfig.APP_MODE == 'offline') {
                return dataService.executeQuery(query, config.OFFLINE_DBNAME).then(function (response) {
                    var regList = [];
                       var regBasicInfoObj = {
                           registrationID: response.rows.item(0).RegistrationID,
                            registrationTypeID: response.rows.item(0).RegistrationTypeID,
                            validFrom: response.rows.item(0).ValidFrom,
                            validTo: response.rows.item(0).ValidTo,
                            registrationDetails: response.rows.item(0).RegistrationDetails,
                           referenceKey: response.rows.item(0).ReferenceKey,
                        };
                        regList.push(regBasicInfoObj);

                   

                    return regList[0];
                });
            } else {
                return dataService.callAPI(config.API_URL + 'organizations/'+organizationReferenceKey+'/registrations/' + registrationReferenceKey, [], 'GET').then(function (response) {


                    response.data.ValidFrom = new Date(response.data.ValidFrom);
                    response.data.ValidTo = new Date(response.data.ValidTo);

                    return response.data[0];
                });

            }


        },
        /*get all registration details*/
        getRegistrationBasicInfoDetails: function (organizationReferenceKey) {

            var query = OrganizationQueries.registrationBasicInfoDetails;

            if (appConfig.APP_MODE == 'offline') {
                return dataService.executeQuery(query, config.OFFLINE_DBNAME).then(function (response) {

                    var registerList = [];

                    for (var i = 0; i < response.rows.length; i++) {


                        var registerBasicInfoObj = {

                            RegistrationID: response.rows.item(i).RegistrationID,
                            referenceKey:response.rows.item(i).ReferenceKey,
                            registrationTypeID: response.rows.item(i).RegistrationTypeID,
                            registrationTypeName: response.rows.item(i).RegistrationTypeName,
                            validFrom: new Date(response.rows.item(i).ValidFrom).toLocaleDateString().replace('-', '/').split('T')[0].replace('-', '/'),
                           validTo: new Date(response.rows.item(i).ValidTo).toLocaleDateString().replace('-', '/').split('T')[0].replace('-', '/'),
                            registrationDetails: response.rows.item(i).RegistrationDetails

                        };

                        registerList.push(registerBasicInfoObj);

                    }

                    return registerList;
                });
            } else {
                return dataService.callAPI(config.API_URL + 'organizations/'+organizationReferenceKey+'/registrations', [], 'GET').then(function (response) {


                    return response.data;
                });

            }


        },

        /*delete registration details by registration id*/
        deleteRegistration: function (organizationReferenceKey,registrationReferenceKey) {

            return dataService.delete('ReferenceKey=' + "'"+registrationReferenceKey+"'", '`organization.registrations`', 'Organization', config.API_URL + '/organizations/'+organizationReferenceKey+'/registrations/'+registrationReferenceKey).then(function (response) {
console.log( config.API_URL + 'Registration/Registrations/' + registrationReferenceKey);

alert(JSON.stringify(response));
                return response;
            });
        }
    };
});