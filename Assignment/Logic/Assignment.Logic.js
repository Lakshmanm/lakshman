/*//=============================================================================
// All rights reserved to Thrill Innovative Labs.
// THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
// OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
// LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
// FITNESS FOR A PARTICULAR PURPOSE.
//=============================================================================
//*****************************************************************************
//* Name		    	: Institute.Logic.js 
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

var app = angular.module('ThrillAssignment.assignmentLogic', ['ThrillFrameworkLibrary.DataService'

        , 'ThrillAssignment.config', 'ThrillCnnWebClient.appConfig', 'ThrillFrameworkLibrary.appLogger'
    ])
    .factory('assignmentLogic', function($http,
        dataService,
        boardQueries,
        config,
        appConfig,
        appLogger) {

        return {

            addAssignmentStudent: function(assignment) {


                return dataService.insert(assignment, '`assignment.assignments`', config.OFFLINE_DBNAME, config.API_URL + 'Assignment/Assignments').then(function(response) {

                    return response;
                });
            },


            addAssignmentStaff: function(assignmentStaff) {


                return dataService.insert(assignmentStaff, '`assignment.assignments`', config.OFFLINE_DBNAME, config.API_URL + 'Assignment/Assignments').then(function(response) {

                    return response;
                });
            },

            getAllStaffAssignments: function(entityAssignmentStaff) {



                return dataService.insert(entityAssignmentStaff, '`assignment.assignments`', config.OFFLINE_DBNAME, config.API_URL + 'Assignment/staff').then(function(response) {
   
      return response.data;       
     
                   
                });



            },
            getAllStaffAssignmentsByStaffKey:function(entityAssignmentStaff) {



                return dataService.insert(entityAssignmentStaff, '`assignment.assignments`', config.OFFLINE_DBNAME, config.API_URL + 'Assignment/AssignmentStaffs').then(function(response) {
   
      return response.data;       
     
                   
                });



            },

            getAllStudentAssignments: function(entityAssignment) {
                return dataService.insert(entityAssignment, '`assignment.assignments`', config.OFFLINE_DBNAME, config.API_URL + 'Assignment/Student').then(function(response) {


                    return response.data;
                });



            },

            getAssignmentByAssignmentKey: function(assignmentKey, branchKey) {
                return dataService.callAPI(config.API_URL + 'Assignment/Assignments/' + assignmentKey + '/' + branchKey, [], 'GET').then(function(response) {

                    console.log(response);
                    return response.data;
                });

            },
            getStaffAssignmentByAssignmentKey: function(assignmentKey, branchKey) {
                return dataService.callAPI(config.API_URL + 'Assignment/StaffAssignment/' + assignmentKey + '/' + branchKey, [], 'GET').then(function(response) {

                    console.log(response);
                    return response.data;
                });

            },




            getBranches: function(organizationKey) {

                return dataService.callAPI(config.API_URL + 'Assignment/Branches/' + organizationKey, [], 'GET').then(function(response) {

                    return response.data;
                });


            },
            getTaskByAdmin: function(assignedByKey,staffKey) {

                return dataService.callAPI(config.API_URL + 'Assignment/Admin/' + assignedByKey + '/' + staffKey, [], 'GET').then(function(response) {

                    return response.data;
                });


            },

            getSubject: function(courseKey, instituteKey) {
                return dataService.callAPI(config.API_URL + 'Mcampuz/InstituteSubject/' + courseKey + '/InstituteKey/' + instituteKey, [], 'GET').then(function(response) {

                    return response.data;
                });

            },




            getDepartments: function(organizationKey) {

                return dataService.callAPI(config.API_URL + 'Organization/Organizations/' + organizationKey + '/departments', [], 'GET').then(function(response) {

                    return response.data;
                });


            },
            getAssignmentTypes: function() {
                return dataService.callAPI(config.API_URL + 'Assignment/AssignmentTypes', [], 'GET').then(function(response) {

                    return response.data;
                });


            },


            getAssignmentStatus: function() {
                return dataService.callAPI(config.API_URL + 'Assignment/AssignmentStatus', [], 'GET').then(function(response) {

                    return response.data;
                });


            },

            getStudentList: function(instituteKey, batchKey) {
                return dataService.callAPI(config.API_URL + 'Assignment/Student/Institute/' + instituteKey + '/Batch/' + batchKey, [], 'GET').then(function(response) {

                    return response.data;
                });


            },
            getFile: function(fileKey, folderKey) {
                return dataService.callAPI(config.API_URL + 'dms/folders/' + folderKey + '/files/' + fileKey, [], 'GET').then(function(resp) {

                    console.log(resp);
                    return resp.data[0];


                });

            }
             , deleteFile: function (fileKey, folderKey) {

            return dataService.delete('fileKey="' + fileKey + '"', '`dms.files`', config.OFFLINE_DBNAME, config.API_URL + 'dms/folders/' + folderKey + '/files/' + fileKey).then(function (response) {
            
                return response;
            });
            },

            updateAssignmentStaff: function(entityAssignmentStaff, assignmentKey) {
                return dataService.update(entityAssignmentStaff, 'AssignmentKey="' + assignmentKey + '"', '`assignment.assignments`', config.OFFLINE_DBNAME, config.API_URL + 'Assignment/Assignments/' + assignmentKey).then(function(response) {
                    return response;
                });

            },
            updateAssignmentStudent: function(entityAssignmentStudent, assignmentKey) {
                return dataService.update(entityAssignmentStudent, 'AssignmentKey="' + assignmentKey + '"', '`assignment.assignments`', config.OFFLINE_DBNAME, config.API_URL + 'Assignment/Assignments/' + assignmentKey).then(function(response) {
                    return response;
                });

            },


        } // end of factory
    }); // end of module