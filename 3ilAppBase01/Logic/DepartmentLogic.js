/*=======================================================================
 All rights reserved to Thrill Innovative Labs.
 THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
 OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
 LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
 FITNESS FOR A PARTICULAR PURPOSE.
===========================================================================
****************************************************************************
 Name                : 
 Type                : Javascript and JQuery 
 Description         : This file contains business logic methods
 References          :
 Author              : 
 Created Date        : 
****************************************************************************
MODIFICATION LOG
**************************************************************************** 
S.No Ver	Date:	     Modified By:		Description:

****************************************************************************  
Code Review LOG
**************************************************************************** 
S.No      Ver        Date                Code Review By            Observations

****************************************************************************
*/

var app = angular.module('ThrillAppBase.appBaseDepartmentLogic', ['ThrillFrameworkLibrary.DataService'
    //, 'ThrillAppBase.AppBaseQueries'
    , 'ThrillAppBase.config'
    , 'ThrillCnnWebClient.appConfig'
    , 'ThrillFrameworkLibrary.appLogger'
    , 'ThrillOrganization.departmentLogic'
    ]);
/*Create Business Logic Factory Method */

app.factory('appBaseDepartmentLogic'
    , function ($http
        , dataService
       // , AppBaseQueries
        , config
        , appConfig
        , appLogger
        , contactLogic
        , orgconfig
        , departmentLogic
    ) {

        return {

            addDepartment: function (departmentObj, organizationReferencekey) {
                appLogger.log('key '+organizationReferencekey+'  obj'+JSON.stringify(departmentObj))
                return departmentLogic.addDepartment(departmentObj, organizationReferencekey).then(function (response) {
                    return response;
                    appLogger.log(JSON.stringify(response));
                })
            },

            updateDepartment: function (departmentObj, organizationReferencekey, departmentReferenceKey) {
                return departmentLogic.updateDepartment(departmentObj, organizationReferencekey, departmentReferenceKey).then(function (response) {
                    return response;
                });
            },

            getDepartment: function (organizationReferencekey, departmentReferenceKey) {

                return departmentLogic.getDepartmentById(organizationReferencekey, departmentReferenceKey).then(function (response) {
                    return response;
                })
            },

            getDepartmentList: function (organizationReferencekey) {
                return departmentLogic.getAllDepartmentDetails(organizationReferencekey).then(function (response) {
                    return response;
                })
            },
            
            getDepartmentListByRootOrganization: function (rootOrganizationReferencekey) {
                return departmentLogic.getDepartmentsByRootOrganization(rootOrganizationReferencekey).then(function (response) {
                    return response;
                })
            },
            
            deleteDepartment :function(organizationKey,departmentKey){
            return departmentLogic.deleteDepartment(organizationKey,departmentKey).then(function(response){
                return response;
            })
        }

        };
    });