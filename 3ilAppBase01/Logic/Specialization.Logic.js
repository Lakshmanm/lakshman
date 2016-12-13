/*//=============================================================================
// All rights reserved to Thrill Innovative Labs.
// THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
// OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
// LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
// FITNESS FOR A PARTICULAR PURPOSE.
//=============================================================================
//*****************************************************************************
//* Name		    	: Specialization.Logic.js 
//* Type		    	: Angular JS File
//* Description		    :
//* References		    :
//* Author	    		:
//* Created Date        : 
//*****************************************************************************
//*                             MODIFICATION LOG
//*****************************************************************************
//*  S.No  Ver	     Date	         Modified By			Description

//*****************************************************************************
//*                             Code Review LOG
//*****************************************************************************

//*****************************************************************************
*/

var app = angular.module('ThrillAppBase.specializationLogic', ['ThrillFrameworkLibrary.DataService'
			 
        , 'ThrillAppBase.specializationQueries'
			 
        , 'ThrillAppBase.config'
			 
        , 'ThrillCnnWebClient.appConfig'
			 
        , 'ThrillFrameworkLibrary.appLogger'
	])
    .factory('specializationLogic', function ($http
        , dataService
        , specializationQueries
        , config
        , appConfig
        , appLogger) {

        return {

            addSpecialization: function (entitySpecialization) {

                return dataService.insert(entitySpecialization, '`OrgExt.specializations`', config.OFFLINE_DBNAME, config.API_URL + 'ThrillAppBase/specializations').then(function (response) {
                    return response;
                });
            },

            updateSpecialization: function (entitySpecialization, entityKey) {
                if (entitySpecialization.organizationKey == "") {
                    entitySpecialization.organizationKey = null;
                }
                return dataService.update(entitySpecialization, 'specializationKey="' + entityKey + '"', '`OrgExt.specializations`', config.OFFLINE_DBNAME, config.API_URL + 'ThrillAppBase/specializations/' + entityKey).then(function (response) {
                    return response;
                });
            },


            deleteSpecialization: function (entityKey) {
                return dataService.delete('specializationKey="' + entityKey + '"', '`OrgExt.specializations`', config.OFFLINE_DBNAME, config.API_URL + 'ThrillAppBase/specializations/' + entityKey).then(function (response) {
                    return response;
                });
            },


            getSpecializationBySpecializationKey: function (specializationKey) {
                var query = specializationQueries.getSpecializationBySpecializationKey + "'" + specializationKey + "'";
                if (appConfig.APP_MODE == 'offline') {
                    return dataService.executeQuery(query, config.OFFLINE_DBNAME).then(function (response) {
                        var specializationList = [];
                        for (var i = 0; i < response.rows.length; i++) {
                            var tempEntitySpecialization = {
                                specializationKey: response.rows.item(i).specializationKey
                                , organizationKey: response.rows.item(i).organizationKey
                                , specializationTitle: response.rows.item(i).specializationTitle
                                , specializationDetails: response.rows.item(i).specializationDetails
                            , };
                            specializationList.push(tempEntitySpecialization);
                        } // end of for loop
                        return specializationList;
                    });
                } else {
                    return dataService.callAPI(config.API_URL + 'ThrillAppBase/specializations/' + specializationKey, [], 'GET').then(function (response) {
                        return response.data;
                    });
                }
            }, // end of get method


            getAllSpecializations: function () {
                var query = specializationQueries.getAllSpecializations;
                if (appConfig.APP_MODE == 'offline') {
                    return dataService.executeQuery(query, config.OFFLINE_DBNAME).then(function (response) {
                        var specializationList = [];
                        for (var i = 0; i < response.rows.length; i++) {
                            var tempEntitySpecialization = {
                                specializationKey: response.rows.item(i).specializationKey
                                , organizationKey: response.rows.item(i).organizationKey
                                , specializationTitle: response.rows.item(i).specializationTitle
                                , specializationDetails: response.rows.item(i).specializationDetails
                            , };
                            specializationList.push(tempEntitySpecialization);
                        } // end of for loop
                        return specializationList;
                    });
                } else {
                    return dataService.callAPI(config.API_URL + 'ThrillAppBase/specializations', [], 'GET').then(function (response) {
                        return response.data;
                    });
                }
            },

                getOrganizationSpecializations: function (organizationKey) {
                var query = specializationQueries.getAllSpecializations;
                if (appConfig.APP_MODE == 'offline') {
                    return dataService.executeQuery(query, config.OFFLINE_DBNAME).then(function (response) {
                        var specializationList = [];
                        for (var i = 0; i < response.rows.length; i++) {
                            var tempEntitySpecialization = {
                                specializationKey: response.rows.item(i).specializationKey
                                , organizationKey: response.rows.item(i).organizationKey
                                , specializationTitle: response.rows.item(i).specializationTitle
                                , specializationDetails: response.rows.item(i).specializationDetails
                            , };
                            specializationList.push(tempEntitySpecialization);
                        } // end of for loop
                        return specializationList;
                    });
                } else {
                    return dataService.callAPI(config.API_URL + 'ThrillAppBase/organizations/'+organizationKey+'/specializations', [], 'GET').then(function (response) {
                        return response.data;
                    });
                }
            }

            // end of get method


        } // end of factory
    }); // end of module