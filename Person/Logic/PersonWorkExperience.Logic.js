/*=======================================================================
 All rights reserved to Thrill Innovative Labs.
 THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
 OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
 LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
 FITNESS FOR A PARTICULAR PURPOSE.
===========================================================================
****************************************************************************
 Name                : personWorkExperience.Logic.js
 Type                : Angular js
 Description         : This file contains business logic methods
 References          :
 Author              : Sreelakshmi ch
 Created Date        : 14-Apr-2016
****************************************************************************
MODIFICATION LOG
**************************************************************************** 
S.No.   Ver	       Date	         Modified By			Description
1       1.0        29-04-2016    Satya Kalyani Lanka    referenceKey concept implemented
****************************************************************************  
Code Review LOG
**************************************************************************** 
Sno# Ver        Date                Code Review By            Observations
****************************************************************************
*/

var app = angular.module('ThrillPerson.personWorkExperienceLogic', ['ThrillFrameworkLibrary.DataService'
                                                                
    , 'ThrillPerson.personQueries'
                                                                
    , 'ThrillPerson.Config'
                                                                
    , 'ThrillCnnWebClient.appConfig'
                                                                
    , 'ThrillFrameworkLibrary.appLogger'])

//Create Business Logic Factory Method for personWorkExperienceLogic


.factory('personWorkExperienceLogic', function ($http
    , dataService
    , personQueries
    , personconfig, appConfig
    , appLogger) {


    return {
        //CRUD Operations for personWorkExperience Details


        //Logic for get DesignationTypes
        getDesignationTypes: function () {
            if (appConfig.APP_MODE == 'offline') {
                var query = personQueries.designations;
                return dataService.executeQuery(query, personconfig.OFFLINE_DBNAME).then(function (response) {
                    var designationTypes = [];
                    for (var i = 0; i < response.rows.length; i++) {
                        var designationTypesObj = {
                            designationId: response.rows.item(i).designationId
                            , designationName: response.rows.item(i).designationName
                        };
                        designationTypes.push(designationTypesObj);
                    }
                    return designationTypes;
                });
            } else {

                return dataService.callAPI(personconfig.API_URL + 'designations', [], 'GET').then(function (response) {
                  
                    return response.data;
                });
            }
        }, //Logic for get  getOccupationTypes
        getOccupationTypes: function () {
            if (appConfig.APP_MODE == 'offline') {
                var query = personQueries.occupations;
                return dataService.executeQuery(query, personconfig.OFFLINE_DBNAME).then(function (response) {
                    var occupationTypes = [];
                    for (var i = 0; i < response.rows.length; i++) {
                        var occupationTypesObj = {
                            occupationId: response.rows.item(i).occupationId
                            , occupationName: response.rows.item(i).occupationName
                        };
                        occupationTypes.push(occupationTypesObj);
                    };
                    return occupationTypes;
                });
            } else {
                return dataService.callAPI(personconfig.API_URL + 'occupations', [], 'GET').then(function (response) {
                    return response.data;
                });
            }

        },

        //Logic for adding personWorkExperience

        addLocation: function (locationObj, personReferenceKey) {
            return dataService.insert(locationObj, '`person.locations`', personconfig.OFFLINE_DBNAME, personconfig.API_URL + 'persons/' + personReferenceKey + '/locations').then(function (response) {
                return response;
            });

        },

        //Logic for adding personWorkExperience
        addPersonExperience: function (expObj, personReferenceKey) {
            return dataService.insert(expObj, '`person.workExperience`', personconfig.OFFLINE_DBNAME, personconfig.API_URL + 'persons/' + personReferenceKey + '/workexperiences').then(function (response) {
                return response;
            });

        }, //Logic for updating personWorkExperience
        updateLocation: function (locationObj, personReferenceKey, locationId) {
            return dataService.update(locationObj, 'locationId=' + locationId, '`person.locations`', personconfig.OFFLINE_DBNAME, personconfig.API_URL + 'persons/locations/' + locationId).then(function (response) {
                return response;
            });

        }, //Logic for update personWorkExperience by workExperienceId
        updateWorkExperience: function (expObj, personReferenceKey, workExperiencereferenceKey) {
            return dataService.update(expObj, 'referenceKey=' + "'" + workExperiencereferenceKey + "'", '`person.workExperience`', personconfig.OFFLINE_DBNAME, personconfig.API_URL + 'persons/' + personReferenceKey + '/workexperiences/' + workExperiencereferenceKey).then(function (response) {
                return response;
            });

        },


        //Logic  for deleting personWorkExperience by workExperienceId
        deleteWorkExperience: function (personReferenceKey, workExperiencereferenceKey) {
            return dataService.delete('referenceKey=' + "'" + workExperiencereferenceKey + "'", '`person.workExperience`', personconfig.OFFLINE_DBNAME, personconfig.API_URL + 'persons/' + personReferenceKey + '/workexperiences/' + workExperiencereferenceKey).then(function (response) {
                return response;
            });
        },



        //Logic for retrieving personWorkExperience details by  personReferenceKey


        getWorkExperienceList: function (personReferenceKey) {
            if (appConfig.APP_MODE == 'offline') {
                var query = personQueries.workExperience + "'" + personReferenceKey + "'";


                return dataService.executeQuery(query, personconfig.OFFLINE_DBNAME).then(function (response) {

                    var workExperienceList = [];

                    for (var i = 0; i < response.rows.length; i++) {

                        var workExperienceListObj = {
                            referenceKey: response.rows.item(i).referenceKey
                            , workExperienceName: response.rows.item(i).workExperienceName,

                            startDate: new Date(response.rows.item(i).startDate)
                            , endDate: new Date(response.rows.item(i).endDate)
                            , organizationName: response.rows.item(i).organizationName
                            , occupationName: response.rows.item(i).occupationName
                            , designationName: response.rows.item(i).designationName
                            , locationId: response.rows.item(i).locationId
                            , personId: response.rows.item(i).personId
                            , totalYears: response.rows.item(i).totalYears
                            , teachingExperience: response.rows.item(i).teachingExperience
                            , otherExperience: response.rows.item(i).otherExperience,

                        };
                        workExperienceList.push(workExperienceListObj);

                    }



                    return workExperienceList;
                });
            } else {

                return dataService.callAPI(personconfig.API_URL + 'persons/' + personReferenceKey + '/workexperiences', [], 'GET').then(function (response) {
                    return response.data;
                });
            }

        },

        //Logic for retrieving personWorkExperience details by  workExperienceId


        getWorkExperienceById: function (personReferenceKey, workExperiencereferenceKey) {

            if (appConfig.APP_MODE == 'offline') {
                var query = personQueries.workExperienceById + "'" + workExperiencereferenceKey + "'";
                return dataService.executeQuery(query, personconfig.OFFLINE_DBNAME).then(function (response) {

                    var workExperienceByIdObj = {};
                    if (response.rows.length == 1) {
                        workExperienceByIdObj = {
                            referenceKey: response.rows.item(0).referenceKey
                            , workExperienceName: response.rows.item(0).workExperienceName
                            , startDate: new Date(response.rows.item(0).startDate)
                            , endDate: new Date(response.rows.item(0).endDate)
                            , organizationName: response.rows.item(0).organizationName
                            , occupationName: response.rows.item(0).occupationName
                            , occupationId: response.rows.item(0).occupationId
                            , designationName: response.rows.item(0).designationName
                            , designationId: response.rows.item(0).designationId
                            , locationId: response.rows.item(0).locationId
                            , geoLocation: response.rows.item(0).geoLocation
                            , personReferenceKey: response.rows.item(0).personReferenceKey
                            , totalYears: response.rows.item(0).totalYears
                            , teachingExperience: response.rows.item(0).teachingExperience
                            , otherExperience: response.rows.item(0).otherExperience,


                        };
                    }
                    return workExperienceByIdObj;
                });
            } else {

                return dataService.callAPI(personconfig.API_URL + 'persons/' + personReferenceKey + '/workexperiences/' + workExperiencereferenceKey, [], 'GET').then(function (response) {
                    return response.data[0];
                });
            }

        },


    }
});