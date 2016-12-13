var app = angular.module('ThrillAppBase.StudentListLogic', ['ngCordova', 'ThrillFrameworkLibrary.DataService', 'ThrillAppBase.config', 'ThrillCnnWebClient.appConfig', 'ThrillFrameworkLibrary.appLogger', 'security.registrationLogic', 'ThrillCNN.CreateCalendarLogic', 'ThrillContact.contactLogic', 'ThrillAppBase.thrillAppBasePersonLogic', 'ThrillPerson.personWorkExperienceLogic', 'ThrillAppBase.thrillAppBasePersonLogic'])
    .factory('ThrillAppBaseStudentListLogic', function($http,
        dataService,
        config,
        appConfig,
        appLogger, registrationLogic, createCalendarLogic, contactLogic, thrillAppBasePersonLogic, personWorkExperienceLogic, ThrillAppBasechildLogic, personBasicInfoLogic, $localStorage) {
        return {

            getAllStudents: function(InstituteKey, AcademicYearKey, BoardKey, GroupKey, CourseKey, GenderID) {

                if (appConfig.APP_MODE == 'offline') {
                    var query = boardQueries.getBoardByBoardKey + "'" + entityKey + "'";
                    return dataService.executeQuery(query, config.OFFLINE_DBNAME).then(function(response) {
                        var boardList = [];
                        for (var i = 0; i < response.rows.length; i++) {
                            var tempEntityBoard = {
                                boardkey: response.rows.item(i).boardKey,
                                boardorganizationkey: response.rows.item(i).boardOrganizationKey,
                                instanceorganizationkey: response.rows.item(i).instanceOrganizationKey,
                            };
                            boardList.push(tempEntityBoard);
                        } // end of for loop
                        return boardList;
                    });
                } else {
                    console.log(config.API_URL + 'Student/Student/institute/' + InstituteKey + '/academicyear/' + AcademicYearKey + '/board/' + BoardKey + '/group/' + GroupKey + '/course/' + CourseKey + '/gender/' + GenderID);
                    return dataService.callAPI(config.API_URL + 'Student/Student/institute/' + InstituteKey + '/academicyear/' + AcademicYearKey + '/board/' + BoardKey + '/group/' + GroupKey + '/course/' + CourseKey + '/gender/' + GenderID, [], 'GET').then(function(response) {
                        return response.data;
                    });
                }
            }, // end of get method
            deletestudent: function(entityKey) {
                return dataService.delete('StudentKey="' + entityKey + '"', '`student.students`', config.OFFLINE_DBNAME, config.API_URL + 'Student/Student/' + entityKey).then(function(response) {
                    return response;
                });
            },

            //Enrollment

            getAllStudentsEnrollment: function(institutekey) {

                if (appConfig.APP_MODE == 'offline') {
                    var query = boardQueries.getBoardByBoardKey + "'" + entityKey + "'";
                    return dataService.executeQuery(query, config.OFFLINE_DBNAME).then(function(response) {
                        var boardList = [];
                        for (var i = 0; i < response.rows.length; i++) {
                            var tempEntityBoard = {
                                boardkey: response.rows.item(i).boardKey,
                                boardorganizationkey: response.rows.item(i).boardOrganizationKey,
                                instanceorganizationkey: response.rows.item(i).instanceOrganizationKey,
                            };
                            boardList.push(tempEntityBoard);
                        } // end of for loop
                        return boardList;
                    });
                } else {

                    return dataService.callAPI(config.API_URL + 'Student/EnrolledStudents/' + institutekey, [], 'GET').then(function(response) {
                        return response.data;
                    });
                }
            },

            getAllFeeStudents: function(OrganizationKey) {

                if (appConfig.APP_MODE == 'offline') {
                    var query = boardQueries.getBoardByBoardKey + "'" + entityKey + "'";
                    return dataService.executeQuery(query, config.OFFLINE_DBNAME).then(function(response) {
                        var boardList = [];
                        for (var i = 0; i < response.rows.length; i++) {
                            var tempEntityBoard = {
                                boardkey: response.rows.item(i).boardKey,
                                boardorganizationkey: response.rows.item(i).boardOrganizationKey,
                                instanceorganizationkey: response.rows.item(i).instanceOrganizationKey,
                            };
                            boardList.push(tempEntityBoard);
                        } // end of for loop
                        return boardList;
                    });
                } else {

                    return dataService.callAPI(config.API_URL + 'Student/Student/Fee/' + OrganizationKey, [], 'GET').then(function(response) {
                        return response.data;
                    });
                }
            }

        };

    });
/* Registration logic  end */