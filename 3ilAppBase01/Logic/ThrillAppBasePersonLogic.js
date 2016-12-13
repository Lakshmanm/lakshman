var app = angular.module('ThrillAppBase.thrillAppBasePersonLogic', ['ngCordova', 'ThrillFrameworkLibrary.DataService'
                                                        , 'ThrillAppBase.config'
                                                        , 'ThrillCnnWebClient.appConfig'
                                                        , 'ThrillFrameworkLibrary.appLogger'
    ])
    .factory('thrillAppBasePersonLogic', function ($http,
        dataService,
        config,
        appConfig,
        appLogger, registrationLogic, createCalendarLogic, contactLogic) {
        return {

            // Logic for registration process  
            //Method for adding location
     getModules: function (roleId) {
                //console.log(config.API_URL + 'ThrillAppBase/organizations/' + organizationKey + '/role');
                return dataService.callAPI(config.API_URL + 'Security/Modules/' + roleId, [], 'GET').then(function (response) {
                    return response.data;
                    
                    
                    
                    
                    
                });
            
        },

          getSubModules: function (roleId) {
                //console.log(config.API_URL + 'ThrillAppBase/organizations/' + organizationKey + '/role');
                return dataService.callAPI(config.API_URL + 'Security/SubModules/' + roleId, [], 'GET').then(function (response) {
                    return response.data;
                    
                    
                    
                    
                    
                });
            
        },

    getPagePermissions: function (roleId,pagekey) {
                //console.log(config.API_URL + 'ThrillAppBase/organizations/' + organizationKey + '/role');
                return dataService.callAPI(config.API_URL + 'Security/pagePermissions/'+ roleId+'/pagename/' +pagekey, [], 'GET').then(function (response) {
                    return response.data;
                    
                    
                    
                    
                    
                });
            
        },

            getStaffKey: function (PersonKey) {
                //console.log(config.API_URL + 'ThrillAppBase/organizations/' + organizationKey + '/role');
                return dataService.callAPI(config.API_URL + 'Staff/Staffs/' + PersonKey + '/Staff', [], 'GET').then(function (response) {
                    return response.data;
                    
                    
                    
                    
                    
                });
            
        },


        addThrillPersonDetails: function (personObj, personReferenceKey) {
            return dataService.insert(personObj, '`3ilappbase01.persondetails`', config.OFFLINE_DBNAME, config.API_URL +  'ThrillAppBase/persons').then(function (response) {
                return response;
            });

        },
            
                addChildPersonDetails: function (childPersonObject, personReferenceKey) {
            return dataService.insert(childPersonObject, '`3ilappbase01.child`', config.OFFLINE_DBNAME, config.API_URL +  'ThrillAppBase/childpersons').then(function (response) {
                return response;
            });

        },
            
               
             /*Method for updating Persondetails with designation and specialization*/
            updateChildPersondetails: function(personRefrenceKey,childPersonObject) {
                console.log('update '+JSON.stringify(childPersonObject));
                
                console.log(personRefrenceKey);
                return dataService.update(childPersonObject, 'personRefrenceKey=' +"'"+personRefrenceKey+"'",
                  '', config.OFFLINE_DBNAME, config.API_URL + 'ThrillAppBase/childpersons/' + personRefrenceKey).then(function(response) {
                    return response;
                });

            },

            
                  //Logic for retrieving person using relativeReferenceKeyRelative details by  relativeReferenceKey
        getPersonReferencekeys: function (organizationKey, roleId) {
                
                return dataService.callAPI(config.API_URL + 'ThrillAppBase/organizations/' + organizationKey + '/roles/' + roleId, [], 'GET').then(function (response) {
                    return response.data;
                    
                    
                    
                    
                    
                });
            
        },
            
                       
                  //Logic for retrieving person using relativeReferenceKeyRelative details by  relativeReferenceKey
        getStaff: function (organizationKey) {
                console.log(config.API_URL + 'ThrillAppBase/organizations/' + organizationKey + '/role');
                return dataService.callAPI(config.API_URL + 'ThrillAppBase/organizations/' + organizationKey, [], 'GET').then(function (response) {
                    return response.data;
                    
                    
                    
                    
                    
                });
            
        },
             //Logic for retrieving person using getRolebyReferencekey details by  relativeReferenceKey
             getRolebyReferencekey: function (personReferenceKey) {
                console.log(config.API_URL + 'ThrillAppBase/Role/' + personReferenceKey);
                return dataService.callAPI(config.API_URL + 'ThrillAppBase/Role/' + personReferenceKey , [], 'GET').then(function (response) {
                    return response.data;
                });
            
        },
             getBranchbyBranchkey: function (branchkey) {
                console.log(config.API_URL + 'ThrillAppBase/Branch/' + branchkey);
                return dataService.callAPI(config.API_URL + 'ThrillAppBase/Branch/' + branchkey , [], 'GET').then(function (response) {
                    return response.data;
                });
            
        },
             getBranchesByRootOrganization: function (OrganizationKey) {

                return dataService.callAPI(config.API_URL + 'Organization/rootOrganizations/'+OrganizationKey+'/organizations', [], 'GET').then(function (response) {
                    return response.data;
                });
        },
             getchildPrimaryContactDetails: function (contactkey) {

                return dataService.callAPI(config.API_URL + 'ThrillAppBase/childPrimaryContactDetails/'+contactkey, [], 'GET').then(function (response) {
                    return response.data;
                });
        },
            getOrgRoleDetailsByPersonKey:function (personReferenceKey) {
               
                return dataService.callAPI(config.API_URL + 'ThrillAppBase/orgRoleDetails/' + personReferenceKey , [], 'GET').then(function (response) {
                    return response.data;
                });
            
        },
            
             /*Method for updating Persondetails with designation and specialization*/
            updatePersondetailsbydesignation: function(personRefrenceKey,personInfoObj) {
                console.log('update '+JSON.stringify(personInfoObj));
                
                console.log(personRefrenceKey);
                return dataService.update(personInfoObj, 'personRefrenceKey=' +"'"+personRefrenceKey+"'",
                  '', config.OFFLINE_DBNAME, config.API_URL + 'ThrillAppBase/persondetails/' + personRefrenceKey).then(function(response) {
                    return response;
                });

            },

            
             getAllDesignationByOrganization: function (organizationKey) {
                
                return dataService.callAPI(config.API_URL + 'ThrillAppBase/organizations/' + organizationKey +'/designations' , [], 'GET').then(function (response) {
                    return response.data;
                    
                    
                    
                    
                    
                });
         
        },
             getAllSpecializationByOrganization: function (organizationKey) {
                
                return dataService.callAPI(config.API_URL + 'ThrillAppBase/organizations/' + organizationKey +'/specializations' , [], 'GET').then(function (response) {
                    return response.data;
                    
                    
                    
                    
                    
                });
            
        },
         
            
            



        };

    });
/* Registration logic  end */