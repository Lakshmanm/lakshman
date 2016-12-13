var app = angular.module('ThrillAppBase.StaffListLogic', ['ngCordova', 'ThrillFrameworkLibrary.DataService', 'ThrillAppBase.config', 'ThrillCnnWebClient.appConfig', 'ThrillFrameworkLibrary.appLogger', 'security.registrationLogic', 'ThrillCNN.CreateCalendarLogic', 'ThrillContact.contactLogic', 'ThrillAppBase.thrillAppBasePersonLogic', 'ThrillPerson.personWorkExperienceLogic', 'ThrillAppBase.thrillAppBasePersonLogic'])
    .factory('ThrillAppBaseStaffListLogic', function($http,
        dataService,
        config,
        appConfig,
        appLogger, registrationLogic, createCalendarLogic, contactLogic, thrillAppBasePersonLogic, personWorkExperienceLogic, ThrillAppBasechildLogic, personBasicInfoLogic, $localStorage) {
        return {

            getAllStaff: function(organization) {

              var  EmployeeCategoryKey=organization.EmployeeCategoryKey;
              var EmploymentTypeKey=organization.EmploymentTypeKey;
              var OrganizationKey=organization.OrganizationKey;
              var SuborganizationKey=organization.SuborganizationKey;
var designationId=organization.designationId;
var statusTypeId=organization.maritalStatusTypeId;
var departmentKey=organization.referenceKey;

                if (appConfig.APP_MODE == 'offline') {
                    var query = boardQueries.getStaffByStaffKey + "'" + entityKey + "'";
                    return dataService.executeQuery(query, config.OFFLINE_DBNAME).then(function(response) {
                        var staffList = [];
                        for (var i = 0; i < response.rows.length; i++) {
                            var tempEntityStaff = {
                                staffkey: response.rows.item(i).staffKey,

                                instanceorganizationkey: response.rows.item(i).instanceOrganizationKey,
                            };
                            staffList.push(tempEntityStaff);
                        } // end of for loop
                        return staffList;
                    });
                } else {
                    return dataService.callAPI(config.API_URL + 'Staff/Staffs/' + OrganizationKey + '/' +SuborganizationKey +'/'+EmployeeCategoryKey+'/'+EmploymentTypeKey+'/'+designationId+'/'+statusTypeId+'/'+ departmentKey , [], 'GET').then(function(response) {
                        // alert(JSON.stringify(response));
                        return response.data;
                    });
                }
            },
            getAllStaffByDaily: function(instituteKey) {

                if (appConfig.APP_MODE == 'offline') {
                    var query = boardQueries.getStaffByStaffKey + "'" + instituteKey + "'";
                    return dataService.executeQuery(query, config.OFFLINE_DBNAME).then(function(response) {
                        var staffList = [];
                        for (var i = 0; i < response.rows.length; i++) {
                            var tempEntityStaff = {
                                staffkey: response.rows.item(i).staffKey,

                                instanceorganizationkey: response.rows.item(i).instanceOrganizationKey,
                            };
                            staffList.push(tempEntityStaff);
                        } // end of for loop
                        return staffList;
                    });
                } else {
                    return dataService.callAPI(config.API_URL + 'Staff/Staffs/daily/' + instituteKey, [], 'GET').then(function(response) {
                        // alert(JSON.stringify(response));
                        return response.data;
                    });
                }
            },
            // end of get method
            getAllStaffByDepartment: function(parentOrganizationKey, departmentKey) {


                return dataService.callAPI(config.API_URL + 'Staff/Staffs/OrganizationKey/' + parentOrganizationKey + '/department/' + departmentKey, [], 'GET').then(function(response) {
                    // alert(JSON.stringify(response));
                    return response.data;
                });

            },

            deletestaff: function(entityKey) {
                return dataService.delete('StaffKey="' + entityKey + '"', '`staff.staffs`', config.OFFLINE_DBNAME, config.API_URL + 'Staff/Staff/' + entityKey).then(function(response) {
                    return response;
                });
            },

        };

    });
/* Registration logic  end */