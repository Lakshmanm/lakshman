/*=======================================================================
 All rights reserved to Thrill Innovative Labs.
 THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
 OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
 LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
 FITNESS FOR A PARTICULAR PURPOSE.
===========================================================================
****************************************************************************
 Name                : Person vaccination.Logic.js
 Type                : Angular js
 Description         : This file contains business logic methods
 References          :
 Author              : Kiranmai L
 Created Date        : 19-Apr-2016
****************************************************************************
MODIFICATION LOG
**************************************************************************** 
S.No.   Ver	    Date	     Modified By		Description
1.      1.0     21-04-2016   Kiranmai L         Define offline BL 
2.      1.0     29-04-2016    Kiranmai L       Define ReferenceKeys and changing service API calls  
****************************************************************************  
Code Review LOG
**************************************************************************** 

****************************************************************************
*/

var app = angular.module('ThrillPerson.personVaccinationLogic', ['ThrillFrameworkLibrary.DataService'

        
        , 'ThrillPerson.personQueries'

        
        , 'ThrillPerson.Config'

        
        , 'ThrillCnnWebClient.appConfig', 'ThrillFrameworkLibrary.appLogger'])
    //Create Business Logic Factory Method 


.factory('PersonVaccinationLogic'
    , function ($http
        , dataService
        , personQueries
        , personconfig
        , appConfig
        , appLogger) {

        return {
            //CRUD Operations for Person Vaccinations

            //Method for adding Vaccination
            addVaccination: function (personvaccinObj, personReferenceKey) {
                return dataService.insert(personvaccinObj, '`person.vaccinations`', personconfig.OFFLINE_DBNAME, personconfig.API_URL + 'persons/' + personReferenceKey + '/vaccinations ').then(function (response) {
                    return response;
                });
            },

            //Method for updating Vaccination
            updateVaccination: function (personvaccinObj, personReferenceKey, vaccinationReferenceKey) {
                return dataService.update(personvaccinObj, 'referenceKey=' + "'" + vaccinationReferenceKey + "'", '`person.vaccinations`', personconfig.OFFLINE_DBNAME, personconfig.API_URL + 'persons/' + personReferenceKey + '/vaccinations/' + vaccinationReferenceKey).then(function (response) {
                    return response;
                });
            },

            //Method for deleting Vaccination
            deleteVaccinationById: function (personReferenceKey, vaccinationReferenceKey) {
                return dataService.delete('referenceKey=' + "'" + vaccinationReferenceKey + "'", '`person.vaccinations`', personconfig.OFFLINE_DBNAME, personconfig.API_URL + 'persons/' + personReferenceKey + '/vaccinations/' + vaccinationReferenceKey).then(function (response) {
                    return response;
                });
            },



            /*get all Medicine Types --drop down*/



            getMedicineTypes: function (medicineid) {

                var query = personQueries.MedicineTypes;
                if (appConfig.APP_MODE == 'offline') {
                    return dataService.executeQuery(query, personconfig.OFFLINE_DBNAME).then(function (response) {
                        var MedicineTypesList = [];

                        for (var i = 0; i < response.rows.length; i++) {
                            var medicineTypeObj = {
                                medicineTypeId: response.rows.item(i).MedicineTypeID
                                , medicineTypeName: response.rows.item(i).MedicineTypeName

                            };
                            MedicineTypesList.push(medicineTypeObj);

                        }


                        return MedicineTypesList;
                    });
                } else {
                    return dataService.callAPI(personconfig.API_URL + 'medicineTypes', [], 'GET').then(function (response) {

                        return response.data;
                    });

                }


            },

            /*get all Vaccination Types --drop down*/



            getVaccinationTypes: function (vaccinid) {

                var query = personQueries.VaccinationTypes;
                if (appConfig.APP_MODE == 'offline') {
                    return dataService.executeQuery(query, personconfig.OFFLINE_DBNAME).then(function (response) {
                        var VaccinationTypesList = [];

                        for (var i = 0; i < response.rows.length; i++) {
                            var vaccinationTypeObj = {
                                vaccinationTypeId: response.rows.item(i).VaccinationTypeID
                                , vaccinationTypeName: response.rows.item(i).VaccinationTypeName

                            };
                            VaccinationTypesList.push(vaccinationTypeObj);

                        }


                        return VaccinationTypesList;
                    });
                } else {
                    return dataService.callAPI(personconfig.API_URL + 'vaccinationTypes', [], 'GET').then(function (response) {

                        return response.data;
                    });

                }


            },



            //Method for retrieving vaccinations list by Person ID
            getVaccinationList: function (personReferenceKey) {
                if (appConfig.APP_MODE == 'offline') {
                    var query = personQueries.VaccinationList + "'" + personReferenceKey + "'";
                    return dataService.executeQuery(query, personconfig.OFFLINE_DBNAME).then(function (response) {

                        var vaccinList = [];
                        for (var i = 0; i < response.rows.length; i++) {
                            var vaccinObj = {
                                referenceKey: response.rows.item(i).referenceKey
                                , vaccinationName: response.rows.item(i).VaccinationName
                                , medicineTypeId: response.rows.item(i).MedicineTypeId
                                , medicineTypeName: response.rows.item(i).MedicineTypeName
                                , vaccinationTypeId: response.rows.item(i).VaccinationTypeId
                                , vaccinationTypeName: response.rows.item(i).VaccinationTypeName
                                , inspectionDate: new Date(response.rows.item(i).InspectionDate)
                                , personReferenceKey: response.rows.item(i).personReferenceKey
                            };

                            vaccinList.push(vaccinObj);

                        }

                        return vaccinList;
                    });
                } else {

                    return dataService.callAPI(personconfig.API_URL + 'persons/' + personReferenceKey + '/vaccinations', [], 'GET').then(function (response) {
                        return response.data;
                    });
                }

            },

            //Method for retrieving Vaccinations details by vaccinationReferenceKey
            getVaccinationById: function (personReferenceKey, vaccinationReferenceKey) {
                if (appConfig.APP_MODE == 'offline') {

                    var query = personQueries.vaccinationById + "'" + vaccinationReferenceKey + "'";

                    return dataService.executeQuery(query, personconfig.OFFLINE_DBNAME).then(function (response) {

                        var vaccinObj = {};
                        if (response.rows.length == 1) {
                            vaccinObj = {
                                referenceKey: response.rows.item(0).referenceKey
                                , personReferenceKey: response.rows.item(0).personReferenceKey
                                , vaccinationName: response.rows.item(0).VaccinationName
                                , remarks: response.rows.item(0).Remarks
                                , medicineTypeId: response.rows.item(0).MedicineTypeID, //medicineTypeName:response.rows.item(i).MedicineTypeName,
                                vaccinationTypeId: response.rows.item(0).VaccinationTypeID, //vaccinationTypeName:response.rows.item(i).VaccinationTypeName,
                                inspectionDate: new Date(response.rows.item(0).InspectionDate)

                            };
                        }

                        return vaccinObj;
                    });
                } else {

                    return dataService.callAPI(personconfig.API_URL + 'persons/' + personReferenceKey + '/vaccinations/' + vaccinationReferenceKey, [], 'GET').then(function (response) {




                        return response.data[0];
                    });
                }

            },





        }
    });