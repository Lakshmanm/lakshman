var app = angular.module('Mcampuz.RolesLogic', ['ngCordova', 'ThrillFrameworkLibrary.DataService'
                                                        , 'ThrillAppBase.config'
                                                        , 'ThrillCnnWebClient.appConfig'
                                                        , 'ThrillFrameworkLibrary.appLogger'
                                                        
    ]).factory('RolesLogic', function ($http, dataService, config, appConfig, appLogger, $localStorage) {
    return {
       getstaffs: function (personkey) {
            return dataService.callAPI(config.API_URL + 'Staff/Staffs/roles/' + personkey , [], 'GET').then(function (response) {
                return response.data;
            });
        },
          updateuser: function (ReferenceKey, obj) {

                return dataService.update(obj, 'ReferenceKey=' + ReferenceKey, 'Security', 'Security', config.API_URL + 'Security/User/Role/Person/' + ReferenceKey).then(function (response) {
                    return response;
                });

            },

              assignmail: function(obj) { //postEmail function call

                return dataService.insert(obj, 'User',config.OFFLINE_DBNAME, config.API_URL + 'Security/roleassigining').then(function(response) {

                    return response;
                });

            },


         getStaffDetails: function (email) {
            return dataService.callAPI(config.API_URL + 'Staff/Staffsdetails/email/' + email , [], 'GET').then(function (response) {
                return response.data;
            });
        },
          

  getroleslistbyorg: function (OrgKey) {
            return dataService.callAPI(config.API_URL + 'Staff/roles/list/organizationKey/' + OrgKey , [], 'GET').then(function (response) {
                return response.data;
            });
        },
          

 getrolesbyRoleKEy: function (roleId) {
            return dataService.callAPI(config.API_URL + 'Staff/roles/edit/role/' + roleId , [], 'GET').then(function (response) {
                return response.data;
            });
        },
          

 roleduplicate: function (roleId,institutekey) {
            return dataService.callAPI(config.API_URL + 'Security/check/role/duplicate/' + roleId+'/institute/'+institutekey, [], 'GET').then(function (response) {
                return response.data;
            });
        },

 duplicateCheck: function (roleId,personKey,institutekey,orgkey) {
            return dataService.callAPI(config.API_URL + 'Security/roleduplicate/check/role/' + roleId+'/person/'+personKey+'/institute/'+institutekey+'/orgKey/'+orgkey , [], 'GET').then(function (response) {
                return response.data;
            });
        },
   ///Using in ffdashboard Controller 
 multipleRolesget: function (personKey,orgkey) {
            return dataService.callAPI(config.API_URL + 'Security/multiple/role/person/' + personKey+'/orgkey/'+orgkey , [], 'GET').then(function (response) {
                return response.data;
            });
        },

               assigsms: function (sms) {

                return dataService.insert(sms, 'Security', config.OFFLINE_DBNAME, config.API_URL + 'Security/roleassignsms').then(function (response) {
                    return response;
                });

            },

             verification: function (ReferenceKey) {

                return dataService.update({}, 'ReferenceKey=' + ReferenceKey, 'Security', 'Security', config.API_URL + 'Security/assign/Role/verification/' + ReferenceKey).then(function (response) {
                    return response;
                });

            },
              addlogindetails: function (object) {
            return dataService.insert(object, '`security.loginDetails`', config.OFFLINE_DBNAME, config.API_URL + 'Security/addlogindetials/roles').then(function (response) {
                return response;
            });
        }

               ,  updatelogindetails: function (ReferenceKey,roleobject) {

                return dataService.update(roleobject, 'ReferenceKey=' + ReferenceKey, 'Security', 'Security', config.API_URL + 'Security/update/LoginDetails/' + ReferenceKey).then(function (response) {
                    return response;
                });

            },


        /* 
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
        }*/
    };
});
/* Registration logic  end */