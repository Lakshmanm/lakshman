/*=======================================================================
 All rights reserved to Thrill Innovative Labs.
 THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
 OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
 LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
 FITNESS FOR A PARTICULAR PURPOSE.
===========================================================================
****************************************************************************
 Name                : PersonDisease.Logic.js
 Type                : Angular js
 Description         : This file contains business logic methods
 References          :
 Author              : Durga Prasad B
 Created Date        : 22-Apr-2016
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

var app = angular.module('ThrillPerson.personDiseaseLogic', ['ThrillFrameworkLibrary.DataService'
                                                                
    , 'ThrillPerson.personQueries'
                                                                
    , 'ThrillPerson.Config'
                                                                
    , 'ThrillCnnWebClient.appConfig'
                                                                
    , 'ThrillFrameworkLibrary.appLogger'])

//Create Business Logic Factory Method for personWorkExperienceLogic


.factory('personDiseaseLogic', function ($http
    , dataService
    , personQueries
    , personconfig, appConfig
    , appLogger) {


    return {


        //Method for adding disease
        addDisease: function (diseaseObj, personReferenceKey) {


            return dataService.insert(diseaseObj, '`person.disease`', personconfig.OFFLINE_DBNAME, personconfig.API_URL + 'persons/' + personReferenceKey + '/diseases').then(function (response) {
                return response;
            });
        },


        // Logic to udpate disease
        updateDisease: function (diseaseObj, personReferenceKey, diseaseReferencekey) {
            console.log( personconfig.API_URL + 'persons/' + personReferenceKey + '/diseases/' + diseaseReferencekey);
            return dataService.update(diseaseObj, 'referenceKey=' + "'" + diseaseReferencekey + "'", '`person.disease`', personconfig.OFFLINE_DBNAME, personconfig.API_URL + 'persons/' + personReferenceKey + '/diseases/' + diseaseReferencekey).then(function (response) {
                return response;
            });

        },

        //Logic for deleting disease using diseaseId
        deleteDisease: function (personReferenceKey, diseaseReferencekey) {
            return dataService.delete('referenceKey=' + "'" + diseaseReferencekey + "'", '`person.disease`', personconfig.OFFLINE_DBNAME, personconfig.API_URL + 'persons/' + personReferenceKey + '/diseases/' + diseaseReferencekey).then(function (response) {
                return response;
            });
        },

        //Logic to get all disease types
        getAllDiseaseTypes: function () {


            if (appConfig.APP_MODE == 'offline') {
                var query = personQueries.diseaseTypes;

                return dataService.executeQuery(query, personconfig.OFFLINE_DBNAME).then(function (response) {
                    var diseaseTypes = [];

                    for (var i = 0; i < response.rows.length; i++) {


                        var diseaseTypesObj = {
                            diseaseTypeId: response.rows.item(i).diseaseTypeId
                            , diseaseTypeName: response.rows.item(i).diseaseTypeName
                        };
                        diseaseTypes.push(diseaseTypesObj);

                    }

                    return diseaseTypes;
                });
            } else {
                return dataService.callAPI(personconfig.API_URL + 'diseaseTypes', [], 'GET').then(function (response) {
                    return response.data;
                });
            }
        },


        //Logic to get Insurancelist 

        getPersonDiseaseList: function (personReferenceKey) {

            if (appConfig.APP_MODE == 'offline') {
                var query = personQueries.diseaseList + "'" + personReferenceKey + "'";


                return dataService.executeQuery(query, personconfig.OFFLINE_DBNAME).then(function (response) {
                    var diseaseList = [];


                    for (var i = 0; i < response.rows.length; i++) {
                        var diseaseListObj = {
                            referenceKey: response.rows.item(i).referenceKey
                            , diseaseTypeId: response.rows.item(i).diseaseTypeId
                            , Details: response.rows.item(i).Details
                            , IdentifiedDate: response.rows.item(i).IdentifiedDate
                            , isHospitalized: response.rows.item(i).IsHospitalized
                            , curedDate: response.rows.item(i).CuredDate
                            , diseaseTypeName: response.rows.item(i).diseaseTypeName
                            , hospitalName: response.rows.item(i).HospitalName


                        };
                        diseaseList.push(diseaseListObj);

                    }

                    return diseaseList;
                });
            } else {

                return dataService.callAPI(personconfig.API_URL + 'persons/' + personReferenceKey + '/diseases', [], 'GET').then(function (response) {

                    return response.data;
                })

            }
        },

        //logic to get diseaseListById

        getDiseaseDetailsByID: function (personReferenceKey, diseaseReferencekey) {

            if (appConfig.APP_MODE == 'offline') {

                var query = personQueries.diseaseListById + "'" + diseaseReferencekey + "'";

                return dataService.executeQuery(query, personconfig.OFFLINE_DBNAME).then(function (response) {
                    var diseaseObj = {};
                    var diseasemain = [];
                    for (var i = 0; i < response.rows.length; i++) {
                        diseaseObj = {
                            referenceKey: response.rows.item(i).referenceKey
                            , personReferenceKey: response.rows.item(i).personReferenceKey
                            , diseaseTypeId: response.rows.item(i).diseaseTypeId
                            , hospitalName: response.rows.item(i).HospitalName
                            , details: response.rows.item(i).Details
                            , remarks: response.rows.item(i).Remarks
                            , identifiedDate: response.rows.item(i).IdentifiedDate
                            , curedDate: response.rows.item(i).CuredDate
                            , diseaseID: response.rows.item(i).diseaseID
                            , isHospitalized: response.rows.item(i).IsHospitalized
                            , isLifeThreatDisease: response.rows.item(i).IsLifeThreatDisease,




                        };

                        diseasemain.push(diseaseObj);

                    }
                    return diseasemain;
                });

            } else {

                return dataService.callAPI(personconfig.API_URL + 'persons/' + personReferenceKey + '/diseases/' + diseaseReferencekey, [], 'GET').then(function (response) {
                    return response.data;
                })
            }


        },


    }
});