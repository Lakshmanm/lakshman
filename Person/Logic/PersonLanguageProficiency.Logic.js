    /*=======================================================================
         All rights reserved to Thrill Innovative Labs.
         THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
         OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
         LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
         FITNESS FOR A PARTICULAR PURPOSE.
        ===========================================================================
        ****************************************************************************
         Name                : personLanguageProficiency.Logic.js
         Type                : Angular js
         Description         : This file contains business logic methods
         References          :
         Author              : Kiranmai L
         Created Date        : 18-Apr-2016
        ****************************************************************************
        MODIFICATION LOG
        **************************************************************************** 
        S.No Ver	Date	     Modified By		Description
        1.    1.0   19-04-2016   Kiranmai L         Define offline Logics
        2.    1.0   28-04-2016   Kiranmai L         Define PersonReferenceKey & LanguageProficiencyReferenceKey
                                                    Changing Service API's
        ****************************************************************************  
        Code Review LOG
        **************************************************************************** 
        S.No    Ver    Date           Code Review By   Observations

        ****************************************************************************
        */

    var app = angular.module('ThrillPerson.personLanguageProficiencyLogic', [
    'ThrillFrameworkLibrary.DataService'
    
            , 'ThrillPerson.personQueries'
    
            , 'ThrillPerson.Config'
    
            , 'ThrillCnnWebClient.appConfig'
    
            , 'ThrillFrameworkLibrary.appLogger'])
        /*Create Business Logic Factory Method */


    .factory('personLanguageProficiencyLogic', function ($http
        , dataService
        , personQueries
        , personconfig
        , appConfig
        , appLogger) {


        return {
            //CRUD Operations for Person Language proficiency

            //Method for adding Language proficiency
            addLanguage: function (personlangObj, personReferenceKey) {
                return dataService.insert(personlangObj, '`person.languageProficiencies`', personconfig.OFFLINE_DBNAME, personconfig.API_URL + 'persons/' + personReferenceKey + '/languageproficiencies ').then(function (response) {
                    return response;
                });
            },

            //Method for updating Language proficiency
            updateLanguage: function (personlangObj, personReferenceKey, languageProficiencyReferenceKey) {
                return dataService.update(personlangObj, 'referenceKey=' + "'" + languageProficiencyReferenceKey + "'", '`person.languageProficiencies`', personconfig.OFFLINE_DBNAME, personconfig.API_URL + '/persons/' + personReferenceKey + '/languageproficiencies/' + languageProficiencyReferenceKey).then(function (response) {
                    return response;
                });
            },

            //Method for deleting Language proficiency
            deleteLangProf: function (personReferenceKey, languageProficiencyReferenceKey) {
                return dataService.delete('referenceKey=' + "'" + languageProficiencyReferenceKey + "'", '`person.languageProficiencies`', personconfig.OFFLINE_DBNAME, personconfig.API_URL + '/persons/' + personReferenceKey + '/languageproficiencies/' + languageProficiencyReferenceKey).then(function (response) {
                    return response;
                });
            },


            /*get all Language Type list--drop down*/



            getLanguageTypes: function () {

                var query = personQueries.LanguageTypes;
                if (appConfig.APP_MODE == 'offline') {
                    return dataService.executeQuery(query, personconfig.OFFLINE_DBNAME).then(function (response) {
                        var LanguageTypesList = [];

                        for (var i = 0; i < response.rows.length; i++) {
                            var langTypeObj = {
                                languageId: response.rows.item(i).LanguageId
                                , languageName: response.rows.item(i).LanguageName



                            };
                            LanguageTypesList.push(langTypeObj);

                        }


                        return LanguageTypesList;
                    });
                } else {
                    return dataService.callAPI(personconfig.API_URL + 'languages', [], 'GET').then(function (response) {

                        return response.data;
                    });

                }


            },

            //Method for retrieving language proficiency list by Person ID
            getLangProfList: function (personReferenceKey) {
                if (appConfig.APP_MODE == 'offline') {
                    var query = personQueries.LanguageDetails + "'" + personReferenceKey + "'";
                    return dataService.executeQuery(query, personconfig.OFFLINE_DBNAME).then(function (response) {

                        var langList = [];
                        for (var i = 0; i < response.rows.length; i++) {

                            var langObj = {
                                referenceKey: response.rows.item(i).referenceKey
                                , languageId: response.rows.item(i).LanguageId
                                , LanguageName: response.rows.item(i).LanguageName
                                , CanRead: response.rows.item(i).CanRead
                                , CanWrite: response.rows.item(i).CanWrite
                                , CanSpeak: response.rows.item(i).CanSpeak

                            };

                            langList.push(langObj);

                        }

                        return langList;
                    });
                } else {

                    return dataService.callAPI(personconfig.API_URL + 'persons/' + personReferenceKey + '/languageproficiencies', [], 'GET').then(function (response) {
                        return response.data;
                    });
                }

            },

            //Method for retrieving Language proficiency details by language proficiencyId
            getLangProfById: function (personReferenceKey, languageProficiencyReferenceKey) {
                if (appConfig.APP_MODE == 'offline') {

                    var query = personQueries.langprofListById + "'" + languageProficiencyReferenceKey + "'";


                    return dataService.executeQuery(query, personconfig.OFFLINE_DBNAME).then(function (response) {
                        var langObj = {};
                      
                            langObj = {
                                referencekey: response.rows.item(0).referenceKey
                                , personReferenceKey: response.rows.item(0).personReferenceKey
                                , languageId: response.rows.item(0).LanguageId, // LanguageName:response.rows.item(0).LanguageName,
                                canRead: response.rows.item(0).CanRead
                                , canWrite: response.rows.item(0).CanWrite
                                , canSpeak: response.rows.item(0).CanSpeak

                            };
                        
                        console.log(langObj);
                        return langObj;
                    });
                } else {

                    return dataService.callAPI(personconfig.API_URL + 'persons/' + personReferenceKey + '/languageproficiencies/' + languageProficiencyReferenceKey, [], 'GET').then(function (response) {
                        return response.data[0];
                    });
                }

            },





        }
    });