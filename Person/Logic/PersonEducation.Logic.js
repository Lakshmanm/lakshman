/*=======================================================================
 All rights reserved to Thrill Innovative Labs.
 THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
 OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
 LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
 FITNESS FOR A PARTICULAR PURPOSE.
===========================================================================
****************************************************************************
 Name                : PersonEducation.Logic.js
 Type                : Angular js
 Description         : This file contains business logic methods
 References          :
 Author              : Phaneendra Vaddiparthy
 Created Date        : 11-Apr-2016
****************************************************************************
MODIFICATION LOG
**************************************************************************** 
Ver	Date	     Modified By			Description
****************************************************************************  
Code Review LOG
**************************************************************************** 
S.No    Ver    Date           Code Review By   Observations
1.      1.0    14-Apr-2016    Ch.Rajaji        API names should be in camelCase
****************************************************************************
*/

var app = angular.module('ThrillPerson.personEducationLogic', ['ThrillFrameworkLibrary.DataService'



        , 'ThrillPerson.personQueries'



        , 'ThrillPerson.Config'



        , 'ThrillCnnWebClient.appConfig'



        , 'ThrillFrameworkLibrary.appLogger'
    ])
    //Create Business Logic Factory Method 

.factory('personEducationLogic', function($http, dataService, personQueries, personconfig, appConfig, appLogger) {


    return {
        //CRUD Operations for Education Details

        //Method for adding education details


        addEducation: function(educationObj, personReferenceKey) {
            // alert(JSON.stringify(educationObj));
            return dataService.insert(educationObj, '`person.educations`', personconfig.OFFLINE_DBNAME, personconfig.API_URL + 'persons/' + personReferenceKey + '/educations').then(function(response) {
                return response;
            });

        },

        //Method for updating education details
        updateEducation: function(educationObj, personReferenceKey, educationReferenceKey) {

            return dataService.update(educationObj, 'referenceKey=' + "'" + educationReferenceKey + "'", '`person.educations`', personconfig.OFFLINE_DBNAME, personconfig.API_URL + 'persons/' + personReferenceKey + '/educations/' + educationReferenceKey).then(function(response) {
                return response;
            });

        },

        //Method for retrieving Qualification details by person Id
        getQualification: function() {

            var query = personQueries.qualifications;
            if (appConfig.APP_MODE == 'offline') {
                return dataService.executeQuery(query, personconfig.OFFLINE_DBNAME).then(function(response) {
                    var qualificationList = [];

                    for (var i = 0; i < response.rows.length; i++) {
                        var qualificationObj = {


                            qualificationId: response.rows.item(i).qualificationId,
                            qualificationName: response.rows.item(i).qualificationName
                        };
                        qualificationList.push(qualificationObj);

                    }


                    return qualificationList;
                });
            } else {
                return dataService.callAPI(personconfig.API_URL + 'qualifications', [], 'GET').then(function(response) {

                    return response.data;
                });

            }


        }, //Method for adding educationlocation details


        addEducationLocation: function(locationObj, personReferenceKey) {
            console.log("loc ref key::" + personReferenceKey);
            return dataService.insert(locationObj, '`person.locations`', personconfig.OFFLINE_DBNAME, personconfig.API_URL + 'persons/' + personReferenceKey + '/locations').then(function(response) {
                return response;
            });
        }, //Method for updating educationlocation details

        updateEducationLocation: function(locationObj, personReferenceKey, locationId) {
            return dataService.update(locationObj, 'locationId=' + locationId, '`person.locations`', personconfig.OFFLINE_DBNAME, personconfig.API_URL + 'persons/locations/' + locationId).then(function(response) {
                return response;
            });

        },

        //method to get all education details

        getEducationList: function(personReferenceKey) {

            var query = personQueries.personEducationList + "'" + personReferenceKey + "'";


            if (appConfig.APP_MODE == 'offline') {


                return dataService.executeQuery(query, personconfig.OFFLINE_DBNAME).then(function(response) {
                    var educationList = [];

                    for (var i = 0; i < response.rows.length; i++) {



                        var educationInfoObj = {

                            educationName: response.rows.item(i).educationName,

                            referenceKey: response.rows.item(i).referenceKey,
                            startDate: response.rows.item(i).startDate,
                            personReferenceKey: response.rows.item(i).personReferenceKey,
                            endDate: response.rows.item(i).endDate,
                            instituteName: response.rows.item(i).instituteName,
                            instituteCode: response.rows.item(i).instituteCode,

                            instituteMedium: response.rows.item(i).instituteMedium,
                            marksObtained: response.rows.item(i).marksObtained,
                            gradeObtained: response.rows.item(i).gradeObtained,

                            yearOfPassing: response.rows.item(i).yearOfPassing,
                            qualificationId: response.rows.item(i).qualificationId,



                        };
                        educationList.push(educationInfoObj);

                    }

                    return educationList;
                });
            } else {
                //appLogger.log('educations/'+personReferenceKey+'/educations')
                return dataService.callAPI(personconfig.API_URL + 'persons/' + personReferenceKey + '/educations', [], 'GET').then(function(response) {
                    return response.data;
                });

            }


        }, //Method for getting language  details


        getLanguage: function() {

            var query = personQueries.languages;

            if (appConfig.APP_MODE == 'offline') {
                return dataService.executeQuery(query, personconfig.OFFLINE_DBNAME).then(function(response) {
                    var languageList = [];

                    for (var i = 0; i < response.rows.length; i++) {
                        var languageObj = {


                            languageId: response.rows.item(i).languageId,
                            languageName: response.rows.item(i).languageName


                        };
                        languageList.push(languageObj);

                    }

                    return languageList;
                });
            } else {
                return dataService.callAPI(personconfig.API_URL + 'languages', [], 'GET').then(function(response) {
                    return response.data;
                });

            }


        }, //Method for deleting education details by educationReferenceKey

        deleteEducation: function(personReferenceKey, educationReferenceKey) {
            return dataService.delete('referenceKey=' + "'" + educationReferenceKey + "'", '`person.educations`', personconfig.OFFLINE_DBNAME, personconfig.API_URL + 'persons/' + personReferenceKey + '/educations/' + educationReferenceKey).then(function(response) {
                return response;
            });
        }, //Method for getting education details by educationReferenceKey


        getEducationById: function(personReferenceKey, educationReferenceKey) {

            var query = personQueries.personEducationById + "'" + educationReferenceKey + "'";
            if (appConfig.APP_MODE == 'offline') {
                return dataService.executeQuery(query, personconfig.OFFLINE_DBNAME).then(function(response) {
                    var educationList = [];

                    for (var i = 0; i < response.rows.length; i++) {
                        var educationInfoObj = {

                            educationName: response.rows.item(i).educationName,

                            referenceKey: response.rows.item(i).referenceKey,
                            startDate: new Date(response.rows.item(i).startDate),
                            personReferenceKey: response.rows.item(i).personReferenceKey,

                            endDate: new Date(response.rows.item(i).endDate),
                            instituteName: response.rows.item(i).instituteName,
                            instituteCode: response.rows.item(i).instituteCode,

                            instituteMedium: response.rows.item(i).instituteMedium,
                            marksObtained: response.rows.item(i).marksObtained,
                            gradeObtained: response.rows.item(i).gradeObtained,

                            yearOfPassing: response.rows.item(i).yearOfPassing,
                            qualificationId: response.rows.item(i).qualificationId,
                            locationId: response.rows.item(0).locationId,
                            geoLocation: response.rows.item(0).geoLocation

                        };
                        educationList.push(educationInfoObj);

                    }


                    return educationList;
                });
            } else {

                return dataService.callAPI(personconfig.API_URL + 'persons/' + personReferenceKey + '/educations/' + educationReferenceKey, [], 'GET').then(function(response) {
                    response.data[0].startDate = new Date(response.data[0].startDate);
                    response.data[0].endDate = new Date(response.data[0].endDate);
                    return response.data;
                });

            }


        },


    }

});