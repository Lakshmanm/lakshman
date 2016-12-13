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

var app = angular.module('ThrillPerson.personCurricularActivityLogic', ['ThrillFrameworkLibrary.DataService'
                                                                
    , 'ThrillPerson.personQueries'
                                                                
    , 'ThrillPerson.Config'
                                                                
    , 'ThrillCnnWebClient.appConfig'
                                                                
    , 'ThrillFrameworkLibrary.appLogger'])

//Create Business Logic Factory Method for personWorkExperienceLogic


.factory('personCurricularActivityLogic', function ($http
    , dataService
    , personQueries
    , personconfig, appConfig
    , appLogger) {


    return {

 //to get relationtypes
        getActivityTypes: function () {
            
                return dataService.callAPI(personconfig.API_URL + 'cirricularactivitytypes', [], 'GET').then(function (response) {
                    return response.data;
                });
        

        },
          getProficiency: function () {
            
                return dataService.callAPI(personconfig.API_URL + 'proficiencies', [], 'GET').then(function (response) {
                    return response.data;
                });
        

        },
         getHighestLevelPlays: function () {
            
                return dataService.callAPI(personconfig.API_URL + 'highestlevelplays', [], 'GET').then(function (response) {
                    return response.data;
                });
        

        },
      getActivities: function (activityId) {
            
                return dataService.callAPI(personconfig.API_URL + 'sporttypesbyid/'+activityId, [], 'GET').then(function (response) {
                    return response.data;
                });
        

        },  



    }
});