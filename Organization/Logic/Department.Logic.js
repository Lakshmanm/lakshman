/*=======================================================================
 All rights reserved to Thrill Innovative Labs.
 THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
 OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
 LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
 FITNESS FOR A PARTICULAR PURPOSE.
===========================================================================
****************************************************************************
 Name                : Department.Logic.js
 Type                : Javascript and JQuery 
 Description         : This file contains business logic methods
 References          :
 Author              : Kiranmai L
 Created Date        : 13-April-2016
****************************************************************************
MODIFICATION LOG
**************************************************************************** 
S.No Ver	Date:	     Modified By:		Description:
****************************************************************************  
Code Review LOG
**************************************************************************** 
S.No      Ver        Date                Code Review By            Observations
1         1.0       13-April-2016         Sri Venkatesh.T           "appLogger" module dependency injection which is never usedremove if not required
2         1.0       13-April-2016         Sri Venkatesh.T           write meaningful name for function parameters(deleteDepartment) ,it has to be departmentID and also params having shortcut names like deptid,name then with full meaningfulname
****************************************************************************
*/

var app = angular.module('ThrillOrganization.departmentLogic', ['ThrillFrameworkLibrary.DataService'
    , 'ThrillOrganization.OrganizationQueries'
    , 'ThrillOrganization.config'
    , 'ThrillCnnWebClient.appConfig'
    , 'ThrillFrameworkLibrary.appLogger']);
/*Create Business Logic Factory Method */

app.factory('departmentLogic'
    , function ($http
        , dataService
        , OrganizationQueries
        , orgconfig
        , appConfig
        , appLogger) {


    return {
        /*CRUD Operations for Contact Details*/

        /*Method for adding department details*/
        addDepartment: function (deptInfoObj,organizationReferencekey) {
            return dataService.insert(deptInfoObj, '`organization.departments`', orgconfig.OFFLINE_DBNAME, orgconfig.API_URL + 'organizations/'+organizationReferencekey+'/departments').then(function (response) {

                return response;
            });

        },

        /*Method for updating department details*/
        updateDepartment: function (deptInfoObj, organizationReferencekey,departmentReferenceKey) {
            return dataService.update(deptInfoObj, 'ReferenceKey='+"'"+departmentReferenceKey+"'" ,'`organization.departments`',orgconfig.OFFLINE_DBNAME, orgconfig.API_URL + 'organizations/'+organizationReferencekey+'/departments/' + departmentReferenceKey).then(function (response) {

                return response;
            });

        },

        /*get all  department details by department Id*/
        getDepartmentById: function (organizationReferencekey,departmentReferenceKey) {

            var query = OrganizationQueries.departmentInfoById +"'"+departmentReferenceKey+"'" ;
            console.log(query);
            if (appConfig.APP_MODE == 'offline') {

               
                return dataService.executeQuery(query, orgconfig.OFFLINE_DBNAME).then(function (response) {
                    var deptList = [];
                      
                        var deptInfoObj = {
                            departmentID: response.rows.item(0).DepartmentID,
                            departmentName: response.rows.item(0).DepartmentName,
                            referenceKey:response.rows.item(0).ReferenceKey,
                            parentDepartmentID:response.rows.item(0).ParentDepartmentID,

                              
                        };
                        deptList.push(deptInfoObj);


  


                    return deptList[0];

                });
            } else {
                return dataService.callAPI(orgconfig.API_URL + 'organizations/'+organizationReferencekey+'/departments/' + departmentReferenceKey, [], 'GET').then(function (response) {


                    return response.data[0];
                });

            }


        },
        /*Method for getting all departments in table grid view*/
        getAllDepartmentDetails: function (organizationReferencekey) {

            var query = OrganizationQueries.departmentInfoDetails;
            if (appConfig.APP_MODE == 'offline') {
                return dataService.executeQuery(query, orgconfig.OFFLINE_DBNAME).then(function (response) {
                    
                    var departmentList = [];

                    for (var i = 0; i < response.rows.length; i++) {


                        var departmentInfoObj = {

                            departmentID: response.rows.item(i).DepartmentID,
                            departmentName: response.rows.item(i).DepartmentName,
                            referenceKey:response.rows.item(i).ReferenceKey,
                            parentDepartmentName:response.rows.item(i).parentDepartmentName



                        };

                        departmentList.push(departmentInfoObj);

                    }

                   
                    return departmentList;
                });
            } else {
                return dataService.callAPI(orgconfig.API_URL + 'organizations/'+organizationReferencekey+'/departments', [], 'GET').then(function (response) {
                    return response.data;
                });
            }
        },

         getDepartmentsByRootOrganization: function (rootOrganizationkey) {

            var query = OrganizationQueries.getDepartmentsByRootOrganization(rootOrganizationkey);
            if (appConfig.APP_MODE == 'offline') {
                return dataService.executeQuery(query, orgconfig.OFFLINE_DBNAME).then(function (response) {
                    
                    var departmentList = [];

                    for (var i = 0; i < response.rows.length; i++) {

                        var departmentInfoObj = {
                            departmentID: response.rows.item(i).DepartmentID,
                            departmentName: response.rows.item(i).DepartmentName,
                            referenceKey:response.rows.item(i).ReferenceKey,
                            parentDepartmentName:response.rows.item(i).parentDepartmentName
                        };

                        departmentList.push(departmentInfoObj);

                    }

                   
                    return departmentList;
                });
            } else {
                return dataService.callAPI(orgconfig.API_URL + 'rootOrganizations/'+rootOrganizationkey+'/departments', [], 'GET').then(function (response) {
                    return response.data;
                });
            }
        },


        deleteDepartment: function (organizationReferencekey,departmentReferenceKey) {

            return dataService.delete('Referencekey='+"'"+departmentReferenceKey+"'" , '`organization.departments`', 'Organization', orgconfig.API_URL + 'organizations/'+organizationReferencekey+'/departments/' + departmentReferenceKey).then(function (response) {

                return response;
            });
        }
    };
});