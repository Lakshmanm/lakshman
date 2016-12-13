/*//=============================================================================
// All rights reserved to Thrill Innovative Labs.
// THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
// OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
// LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
// FITNESS FOR A PARTICULAR PURPOSE.
//=============================================================================
//*****************************************************************************
//* Name		    	: ElectiveGroup.Logic.js 
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
var app = angular.module('ThrillAcademic.academicYearLogic', ['ThrillFrameworkLibrary.DataService'

    , 'ThrillAcademic.config', 'ThrillCnnWebClient.appConfig', 'ThrillFrameworkLibrary.appLogger'
]).factory('academicYearLogic', function($http, dataService, config, appConfig, appLogger) {
    return {
        addAcademicYear: function(entityAcademicYear) {
            return dataService.insert(entityAcademicYear, '`Academic.academicyears`', config.OFFLINE_DBNAME, config.API_URL + 'Academic/AcademicYears').then(function(response) {
                return response;
            });
        },
        getAllYears: function(organizationKey) {
            return dataService.callAPI(config.API_URL + 'Academic/Organization/' + organizationKey + '/AcademicYear', [], 'GET').then(function(response) {
                return response.data;
            });
        }, // end of get method

        getAllAcademicYears: function(organizationKey) {
            return dataService.callAPI(config.API_URL + 'Academic/Organizations/' + organizationKey + '/AcademicYears', [], 'GET').then(function(response) {
                return response.data;
            });
        }, // end of get method
        getAllYearsByInstituteKey: function(instituteKey) {
            return dataService.callAPI(config.API_URL + 'Academic/Institute/' + instituteKey + '/AcademicYears', [], 'GET').then(function(response) {
                return response.data;
            });
        }, // end of get method
        getYearByYearKey: function(yearKey) {
            return dataService.callAPI(config.API_URL + 'Academic/AcademicYears/' + yearKey, [], 'GET').then(function(response) {
                return response.data;
            });
        }, // end of get method*/
        updateYear: function(entityAcademicYear, entityKey) {
            return dataService.update(entityAcademicYear, 'AcademicYearKey="' + entityKey + '"', '`Academic.academicyears`', config.OFFLINE_DBNAME, config.API_URL + 'Academic/AcademicYears/' + entityKey).then(function(response) {
                return response;
            });
        },
        deleteYear: function(entityKey) {
            return dataService.delete('AcademicYearKey="' + entityKey + '"', '`Academic.academicyears`', config.OFFLINE_DBNAME, config.API_URL + 'Academic/AcademicYears/' + entityKey).then(function(response) {
                return response;
            });
        },
    } // end of factory
}); // end of module