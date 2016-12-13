var app = angular.module('ThrillAppBase.staffattendanceLogic', ['ngCordova', 'ThrillFrameworkLibrary.DataService'
                                                        , 'ThrillAppBase.config'
                                                        , 'ThrillCnnWebClient.appConfig'
                                                        , 'ThrillFrameworkLibrary.appLogger'
                                                         , 'security.registrationLogic'
                                                        , 'ThrillCNN.CreateCalendarLogic'
                                                        , 'ThrillContact.contactLogic'
                                                        , 'ThrillAppBase.thrillAppBasePersonLogic'
                                                        , 'ThrillPerson.personWorkExperienceLogic'
                                                         , 'ThrillAppBase.thrillAppBasePersonLogic'
    ]).factory('staffattendanceLogic', function ($http, dataService, config, appConfig, appLogger, registrationLogic, createCalendarLogic, contactLogic, thrillAppBasePersonLogic, personWorkExperienceLogic, ThrillAppBasechildLogic, personBasicInfoLogic, $localStorage) {
    return {
        getAllDepartments: function (organizationKey) {
            return dataService.callAPI(config.API_URL + 'Organization/organizations/' + organizationKey + '/departments', [], 'GET').then(function (response) {
                return response.data;
            });
        }
        , getAllPeriods: function (instituteKey) {
            return dataService.callAPI(config.API_URL + 'Attendance/PeriodTypes/' + instituteKey, [], 'GET').then(function (response) {
             
                return response.data;
            });
        }
        , //   getStaffListByInstituteKey: function (instituteKey,periodSlotKey,sessionKey,attendanceDate,WorkingLocationKey){
        //     var newDate = attendanceDate.getFullYear()+'-'+(attendanceDate.getMonth()+1)+'-'+attendanceDate.getDate();
        //  if(sessionKey==null || sessionKey==undefined || sessionKey==''){
        //     sessionKey="-";
        // return dataService.callAPI( config.API_URL + 'Attendance/Attendances/Staff/'+instituteKey+'/'+periodSlotKey+'/'+sessionKey+'/'+newDate+'/'+WorkingLocationKey+'/StaffList',[],'GET').then(function (response) {
        //         console.log(JSON.stringify(response));
        //                      return response.data;
        //              });        
        // }
        //       },
        getStaffListByInstituteKey: function (instituteKey, periodSlotKey, sessionKey, attendanceDate, WorkingLocationKey) {
            var newDate = attendanceDate.getFullYear() + '-' + (attendanceDate.getMonth() + 1) + '-' + attendanceDate.getDate();
            if (sessionKey == null || sessionKey == undefined || sessionKey == '') {
                sessionKey = "-";
            }
            else if (periodSlotKey == null || periodSlotKey == undefined || periodSlotKey == '') {
                periodSlotKey = "-";
            }
            return dataService.callAPI(config.API_URL + 'Attendance/Attendances/Staff/' + instituteKey + '/' + periodSlotKey + '/' + sessionKey + '/' + newDate + '/' + WorkingLocationKey + '/StaffList', [], 'GET').then(function (response) {
                return response.data;
            });
        }
        , addStaffattendance: function (entityStaffAttendance) {
            return dataService.insert(entityStaffAttendance, '`attendance.staffattendances`', config.OFFLINE_DBNAME, config.API_URL + 'Attendance/Attendances/Staff').then(function (response) {
                return response;
            });
        }
        , getAllStaffByDepartment: function (entityKey, organizationKey) {
            return dataService.callAPI(config.API_URL + 'Staff/StaffsByDepartment/' + entityKey + '/' + organizationKey, [], 'GET').then(function (response) {
                return response.data;
            });
        }
    };
});
/* Registration logic  end */