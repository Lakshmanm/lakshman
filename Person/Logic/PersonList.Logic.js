/*=======================================================================
 All rights reserved to Thrill Innovative Labs.
 THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
 OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
 LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
 FITNESS FOR A PARTICULAR PURPOSE.
===========================================================================
****************************************************************************
 Name                : personList.Logic 
 Type                : Javascript and JQuery 
 Description         : This file contains business logic methods
 References          :
 Author              : Phani
 Created Date        : 06-Apr-2016
****************************************************************************
MODIFICATION LOG
**************************************************************************** 
Ver	Date	     Modified By			Description
****************************************************************************  
Code Review LOG
**************************************************************************** 
Ver        Date                Code Review By            Observations
****************************************************************************
*/

var app = angular.module('ThrillPerson.personListLogic', [
    'ThrillFrameworkLibrary.DataService'
    , 'ThrillPerson.personQueries'
    , 'ThrillPerson.Config'
    , 'ThrillCnnWebClient.appConfig'
    , 'ThrillFrameworkLibrary.appLogger'])

.factory('personListLogic', function ($http
    , dataService
    , personQueries
    , personconfig
    , appConfig
    , appLogger) {

    //Get person details from  external source(localDb or web). 
    return {
        getpersonListDetails: function () {

            if (appConfig.APP_MODE == 'offline') {
                var query = personQueries.persons;
                return dataService.executeQuery(query, personconfig.OFFLINE_DBNAME).then(function (response) {
                    appLogger.log(response);
                    var personList = [];

                    for (var i = 0; i < response.rows.length; i++) {
                        var personListObj = {
                            referenceKey: response.rows.item(i).referenceKey
                            , firstName: response.rows.item(i).firstName
                            , lastName: response.rows.item(i).lastName
                            , dateOfBirth: new Date(response.rows.item(i).dateOfBirth)
                            , genderId: response.rows.item(i).genderId
                            , placeOfBirth: response.rows.item(i).placeOfBirth
                            , bloodGroupName: response.rows.item(i).bloodGroupName
                            , identificationMarks: response.rows.item(i).identificationMarks
                            , bloodGroupId: response.rows.item(i).bloodGroupId
                            , folderKey: response.rows.item(i).folderKey
                            , n3DMSFileKey: response.rows.item(i).n3DMSFileKey

                        };
                        personList.push(personListObj);

                    }

                    return personList;
                });
            } else {
                return dataService.callAPI(personconfig.API_URL + 'persons', [], 'GET').then(function (response) {
                    return response.data;
                });

            }


        }
        , //Method for deleting Person
        deletePerson: function (personReferenceKey) {
            return dataService.delete('personReferenceKey=' + personReferenceKey, 'person.persons', personconfig.OFFLINE_DBNAME, personconfig.API_URL + 'persons/' + personReferenceKey).then(function (response) {
                return response;
            });
        }
    , }
});