var app = angular.module('ThrillAppBase.StaffAdditionLogic', ['ngCordova', 'ThrillFrameworkLibrary.DataService'
                                                        , 'ThrillAppBase.config'
                                                        , 'ThrillCnnWebClient.appConfig'
                                                        , 'ThrillFrameworkLibrary.appLogger'
                                                         , 'security.registrationLogic'
                                                        , 'ThrillCNN.CreateCalendarLogic'
                                                        , 'ThrillContact.contactLogic'
                                                        , 'ThrillAppBase.thrillAppBasePersonLogic'
                                                        , 'ThrillPerson.personWorkExperienceLogic'
                                                         , 'ThrillAppBase.thrillAppBasePersonLogic'
    ])
    .factory('ThrillAppBaseStaffLogic', function ($http,
        dataService,
        config,
        appConfig,
        appLogger, registrationLogic, createCalendarLogic, contactLogic, thrillAppBasePersonLogic, personWorkExperienceLogic, ThrillAppBasechildLogic, personBasicInfoLogic, $localStorage) {
        return {
addNewStaff: function (StaffObj){
var profilePic=StaffObj.ProfilePic;
delete StaffObj.ProfilePic;
   return dataService.insert(StaffObj, '`staff.staffs`', config.OFFLINE_DBNAME, config.API_URL + 'Staff/Staff').then(function (response) {
        var staffKey=response.data.StaffKey;              
          
StaffObj.ProfilePic=profilePic;




                if (StaffObj.ProfilePic != null && StaffObj.ProfilePic != undefined) {
                    // create folder
                    var folderObj = {
                        FolderName:staffKey,
                        EntityKey: staffKey,
                        EntityType: "staff"
                    };

var folderKey;
var fileKey;


                   /* var folderKey =  StaffObj.ProfilePic.folderKey;
                    var fileKey =  StaffObj.ProfilePic.n3DMSFileKey;*/

                    dataService.insert(folderObj, '`3ilAppBase01.dms`', config.OFFLINE_DBNAME, config.API_URL + 'dms/folders').then(function(response) {
                        appLogger.log('folder response ' + JSON.stringify(response));
                        if (response.data[0][0].FolderKey != undefined) {
                            folderKey = response.data[0][0].FolderKey;
                        }

                        var postFileObj = {};

                        postFileObj.fileBase64Data = 'data:' + StaffObj.ProfilePic.filetype + ';base64,' + StaffObj.ProfilePic.base64;
                        postFileObj.fileName = StaffObj.ProfilePic.filename;
                        postFileObj.fileSize =StaffObj.ProfilePic.filesize;
                        postFileObj.fileType = StaffObj.ProfilePic.filetype;


                        dataService.insert(postFileObj, '`3ilAppBase01.dms`', config.OFFLINE_DBNAME, config.API_URL + 'dms/folders/' + folderKey + '/files').then(function(response) {
                            appLogger.log('file response ' + JSON.stringify(response));
                            fileKey = response.data[0][0].Filekey;

                            StaffObj.folderKey = folderKey
                           StaffObj.n3DMSFileKey = fileKey


delete StaffObj.ProfilePic;
                         //   return organizationLogic.updateOrganization(subOrganizationObj.basicInfo, subOrganizationKey).then(function(response) {
 return dataService.update(StaffObj, 'StaffKey=' + "'" + staffKey + "'",'`staff.staffs`', config.OFFLINE_DBNAME, config.API_URL + 'Staff/Staff/' + staffKey).then(function (response) {
                           
                            });

                        });


                    });


                }

                    return response;


            });
        },
            
    
       getInterviewdByTypesStaff: function(organizationKey,staffKey)
            {
        return dataService.callAPI(config.API_URL + 'Staff/StaffsInterview/' + organizationKey + '/' +staffKey , [], 'GET').then(function (response) {
                  //alert(JSON.stringify(response));
                     console.log(response);
                     return response.data;

                        });         
                
            },
   
            
            getStaffProfilePicture: function(folderKey, fileKey) {
            return dataService.callAPI(config.API_URL + 'dms/folders/' + folderKey + '/files/' + fileKey, [], 'GET').then(function(response) {
console.log(response);
                return response.data[0][0];
            });
        },
            
getStaffProfilePicture: function(folderKey, fileKey) {
            return dataService.callAPI(config.API_URL + 'dms/folders/' + folderKey + '/files/' + fileKey, [], 'GET').then(function(response) {
console.log(response);
                return response.data[0][0];
            });
        },
UpdateStaff: function (StaffObj,staffKey){
    var profilePic=StaffObj.ProfilePic;
delete StaffObj.ProfilePic;
 return dataService.update(StaffObj, 'StaffKey=' + "'" + staffKey + "'",'`staff.staffs`', config.OFFLINE_DBNAME, config.API_URL + 'Staff/Staff/' + staffKey).then(function (response) {


StaffObj.ProfilePic=profilePic;




                if (StaffObj.ProfilePic != null && StaffObj.ProfilePic != undefined) {
                    // create folder
                    var folderObj = {
                        FolderName:staffKey,
                        EntityKey: staffKey,
                        EntityType: "staff"
                    };

var folderKey;
var fileKey;


                   /* var folderKey =  StaffObj.ProfilePic.folderKey;
                    var fileKey =  StaffObj.ProfilePic.n3DMSFileKey;*/

                    dataService.insert(folderObj, '`3ilAppBase01.dms`', config.OFFLINE_DBNAME, config.API_URL + 'dms/folders').then(function(response) {
                        appLogger.log('folder response ' + JSON.stringify(response));
                        if (response.data[0][0].FolderKey != undefined) {
                            folderKey = response.data[0][0].FolderKey;
                        }

                        var postFileObj = {};

                        postFileObj.fileBase64Data = 'data:' + StaffObj.ProfilePic.filetype + ';base64,' + StaffObj.ProfilePic.base64;
                        postFileObj.fileName = StaffObj.ProfilePic.filename;
                        postFileObj.fileSize =StaffObj.ProfilePic.filesize;
                        postFileObj.fileType = StaffObj.ProfilePic.filetype;


                        dataService.insert(postFileObj, '`3ilAppBase01.dms`', config.OFFLINE_DBNAME, config.API_URL + 'dms/folders/' + folderKey + '/files').then(function(response) {
                            appLogger.log('file response ' + JSON.stringify(response));
                            fileKey = response.data[0][0].Filekey;

                            StaffObj.folderKey = folderKey
                           StaffObj.n3DMSFileKey = fileKey


delete StaffObj.ProfilePic;
                         //   return organizationLogic.updateOrganization(subOrganizationObj.basicInfo, subOrganizationKey).then(function(response) {
 return dataService.update(StaffObj, 'StaffKey=' + "'" + staffKey + "'",'`staff.staffs`', config.OFFLINE_DBNAME, config.API_URL + 'Staff/Staff/' + staffKey).then(function (response) {
                           
                            });

                        });


                    });


                }
    return response;
            });
        },

 // UpdateStaff: function (StaffObj, StaffKey) {

 //    if (StudentObj.profilePic != null && StudentObj.profilePic != undefined) {
 //                    // create folder
 //                    var folderObj = {
 //                        FolderName: StaffKey,
 //                        EntityKey: StaffKey,
 //                        EntityType: "Staff"
 //                    };

 //                    var folderKey = StudentObj.FolderKey;
 //                    var fileKey = StudentObj.n3DMSFileKey;

 //                    dataService.insert(folderObj, '`3ilAppBase01.dms`', config.OFFLINE_DBNAME, config.API_URL + 'dms/folders').then(function(response) {
 //                        //appLogger.log('folder response ' + JSON.stringify(response));
 //                        if (response.data[0][0].FolderKey != undefined) {
 //                            folderKey = response.data[0][0].FolderKey;
 //                        }

 //                        var postFileObj = {};

 //                        postFileObj.fileBase64Data = 'data:' + StudentObj.profilePic.filetype + ';base64,' + StudentObj.profilePic.base64;
 //                        postFileObj.fileName = StudentObj.profilePic.filename;
 //                        postFileObj.fileSize = StudentObj.profilePic.filesize;
 //                        postFileObj.fileType = StudentObj.profilePic.filetype;


 //                        dataService.insert(postFileObj, '`3ilAppBase01.dms`', config.OFFLINE_DBNAME, config.API_URL + 'dms/folders/' + folderKey + '/files').then(function(response) {
 //                            //appLogger.log('file response ' + JSON.stringify(response));
 //                            fileKey = response.data[0][0].Filekey;

 //                            StaffObj.FolderKey = folderKey
 //                            StaffObj.n3DMSFileKey = fileKey
 //                         delete StaffObj.profilePic;
 //                       return dataService.update(StudentObj, 'StudentKey=' + "'" + StudentKey + "'", '`student.Student`', config.OFFLINE_DBNAME, config.API_URL + 'Student/Student/' + StudentKey).then(function (response) {
 //                           console.log(response);
 //                             return response;
 //                            });

 //                        });


 //                    });


 //                }

           
 //          /* return dataService.update(StudentObj, 'StudentKey=' + "'" + StudentKey + "'", '`student.Student`', config.OFFLINE_DBNAME, config.API_URL + 'Student/Student/' + StudentKey).then(function (response) {
 //                           console.log(response);
 //                             return response;
 //                            });*/
 //        },




























 getStaffByStaffKey: function (entityKey) {
 if (appConfig.APP_MODE == 'offline') {
                   var query = staffQueries.getStaffByStaffKey + "'" + entityKey + "'";
                 return dataService.executeQuery(query, config.OFFLINE_DBNAME).then(function (response) {
                 var groupList = [];
                 for (var i = 0; i < response.rows.length; i++) {
                     var tempEntityStaff = {
                         staffkey: response.rows.item(i).staffkey,
                         stafftitle: response.rows.item(i).staffTitle,
                     
                         Instanceorganizationkey: response.rows.item(i).instanceOrganizationKey,
                     };
                         staffList.push(tempEntityStaff);
                 } // end of for loop
                 return groupList;
                });
            } else {
                 return dataService.callAPI(config.API_URL + 'Staff/Staff/' + entityKey, [], 'GET').then(function (response) {
                  
                     return response.data;
                        });
                }
        }, // e

            // Logic for registration process  
            addStaff: function (userObj,dmsobj) { //postUser function call
       
                var Referencekey;
                return registrationLogic.postUser(userObj).then(function (resp1) {
                     console.log(JSON.stringify(resp1));
                    var userId = resp1.data.insertId;
                    Referencekey = resp1.data.referenceKey;
                    //alert(Referencekey);
                     var Contacts = [
                        {
                            "entityReferenceKey": Referencekey,
                            "contactSubTypeId": 2,
                            "contactInfo": userObj.MobileNumber,
                            "entityTypeId": 1
                            },
                        {
                            "entityReferenceKey": Referencekey,
                            "contactSubTypeId": 3,
                            "contactInfo": userObj.Email,
                            "entityTypeId": 1
                                 }
                            ,
                                                            {"entityReferenceKey" :Referencekey,
                                                             "contactSubTypeId":3,"contactInfo":userObj.Fax,"entityTypeId" :4
                                                             }
                            ]

                    angular.forEach(Contacts, function (contactObj, index) {

                        contactLogic.addContact(contactObj).then(function (response) {
                            console.log(response);


                        });
                    })

                    var thrillappperson = {};
                    thrillappperson.organizationKey = $localStorage.organizationKey;
                    thrillappperson.personKey = Referencekey;
                   // thrillappperson.roleId = userObj.Role;
                    thrillappperson.designationKey = userObj.Designation;
                    // thrillappperson.specializationKey = userObj.Specialization;
                    // thrillappperson.branchkey = userObj.branch;
                      thrillappperson.contactKey = userObj.contactKey;
                   
                    console.log(JSON.stringify(thrillappperson));

                    thrillAppBasePersonLogic.addThrillPersonDetails(thrillappperson).then(function (response) {
                        /* alert(response);*/
                        console.log(response);
                    });
                     
                 //if (dmsobj != undefined && dmsobj != null) {
                      //alert(dmsobj);
                    // create folder
                    var folderObject = {
                        FolderName: Referencekey,
                        EntityKey: Referencekey,
                        EntityType: 'Person'
                    };
                    var foldeKey;
                     
                    dataService.insert(folderObject, '`3ilAppBase01.dms`', config.OFFLINE_DBNAME, config.API_URL + 'dms/folders').then(function (folderResponse) {
                        
                        folderKey = folderResponse.data[0][0].FolderKey;
                        
                        // create file
                        var file = dmsobj.file;
                        var fileObj = {};
                        fileObj.fileBase64Data = 'data:' + file.filetype + ';base64,' + file.base64;
                        fileObj.fileName = file.filename;
                        fileObj.fileSize = file.filesize;
                        fileObj.fileType = file.filetype;
                       
                        console.log(config.API_URL + 'dms/folders/' + folderKey + '/files');

                        dataService.insert(fileObj, '`3ilAppBase01.dms`', config.OFFLINE_DBNAME, config.API_URL + 'dms/folders/' + folderKey + '/files').then(function (fileResponse) {

                            var fileKey = fileResponse.data[0][0].Filekey

                            var personUpdateObj = {
                                "firstName": userObj.FirstName,
                                "lastName": userObj.LastName,
                                "folderKey": foldeKey,
                                "DMSFileKey": fileKey
                            }
                                 //  alert(JSON.stringify(personUpdateObj));
                            console.log(JSON.stringify(personUpdateObj))
                            personBasicInfoLogic.updatePerson(personUpdateObj, Referencekey).then(function (personUpdateResponse) {

                                console.log('person update response ' + JSON.stringify(personUpdateResponse))
                            })

                        })
                        
                         })
//}
                   // else
                      //  {
                        //    alert('here');
                       // }

                        // For Experience
                        /*var workexperience = {};
                                             workexperience.Experience = userObj.Experience;
                                            console.log(workexperience);
                                             personWorkExperienceLogic.addPersonExperience(workexperience, Referencekey).then(function (response) {
                                                // alert('success');
                                    

                                }, function (err) {

                                    appLogger.error('ERR' + err);

                                });*/


                        // thrillAppBasePersonLogic.addThrillPersonDetails
                        registrationLogic.sendToken(userId).then(function (resp2) {
                            // console.log(JSON.stringify(resp2));
                            var Regs = {};

                            Regs.token = resp2.data.Token;
                            Regs.UserID = userId;

                            Regs.PrimaryEmailAddress = userObj.PrimaryEmailAddress;
                            registrationLogic.postEmail(Regs).then(function (resp3) {
                                //console.log(JSON.stringify(resp3));





                                var personInfo = {};
                                // personInfo = {"referenceKey":Referencekey};
                                personInfo.referenceKey = Referencekey;





                                createCalendarLogic.personinsertion(personInfo).then(function (response) {

                                  


                                    var newCalendarInfo = {};

                                    newCalendarInfo.PersonCalendarName = "My Calendar";
                                    newCalendarInfo.PersonID = Referencekey;
                                    newCalendarInfo.OrganizationReferenceKey = $localStorage.organizationKey;
                                    newCalendarInfo.Description = "My Calendar";
                                    newCalendarInfo.CalendarColor = null;
                                    newCalendarInfo.SharingEmails = 1;
                                    newCalendarInfo.RoleID = 1;
                                    newCalendarInfo.CreatedByUserID = userId;


                                    createCalendarLogic.createCalendar(newCalendarInfo).then(function (response2) {

                                        // console.log(JSON.stringify(response));

                                    });


                                });


                            });






                            // contactLogic.addContact(Contacts).then(function (response) {
                            //   alert('contacts inserted');
                            //console.log(JSON.stringify(response));

                            //  });



                        })
                   




                });





            },


            getNationalityTypes: function () {

             
                if (appConfig.APP_MODE == 'offline') {
                       var query = personQueries.NationalityTypes;
                    return dataService.executeQuery(query, personconfig.OFFLINE_DBNAME).then(function (response) {
                        var NationalityTypesList = [];

                        for (var i = 0; i < response.rows.length; i++) {
                            var nationalityTypeObj = {
                                nationalityId: response.rows.item(i).NationalityID
                                , nationalityName: response.rows.item(i).NationalityName



                            };
                            NationalityTypesList.push(nationalityTypeObj);

                        }


                        return NationalityTypesList;
                    });
                } else {
                      return dataService.callAPI(config.API_URL + 'Person/nationalities', [], 'GET').then(function (response) {
                        return response.data;
                    });

                }
            },

  getBloodTypes: function () {
            
                if (appConfig.APP_MODE == 'offline') {
                       var query = personQueries.BloodGroupTypes;
                    return dataService.executeQuery(query, personconfig.OFFLINE_DBNAME).then(function (response) {
                        var BloodGroupTypesList = [];

                        for (var i = 0; i < response.rows.length; i++) {
                            var bloodGroupTypeObj = {
                                    bloodGroupID: response.rows.item(i).BloodGroupID
                                , bloodGroupName: response.rows.item(i).BloodGroupName

                            };
                            BloodGroupTypesList.push(bloodGroupTypeObj);

                        }


                        return BloodGroupTypesList;
                    });
                } else {
                      return dataService.callAPI(config.API_URL + 'Person/bloodgroups', [], 'GET').then(function (response) {
                        return response.data;
                    });

                }
            },


getCasteTypes: function () {
            
                if (appConfig.APP_MODE == 'offline') {
                       var query = personQueries.casteTypes;
                    return dataService.executeQuery(query, personconfig.OFFLINE_DBNAME).then(function (response) {
                        var CasteTypesList = [];

                        for (var i = 0; i < response.rows.length; i++) {
                            var casteTypeObj = {
                                    socialgroupId: response.rows.item(i).socialgroupID
                                ,   socialGroupName: response.rows.item(i).socialGroupName

                            };
                            CasteTypesList.push(casteTypeObj);

                        }


                        return CasteTypesList;
                    });
                } else {
                      return dataService.callAPI(config.API_URL + 'Person/socialgroups', [], 'GET').then(function (response) {
                        return response.data;
                    });

                }
            },

getLanguagesTypes: function () {
            
                if (appConfig.APP_MODE == 'offline') {
                       var query = personQueries.casteTypes;
                    return dataService.executeQuery(query, personconfig.OFFLINE_DBNAME).then(function (response) {
                        var LanguageList = [];

                        for (var i = 0; i < response.rows.length; i++) {
                            var languageObj = {
                                    languageId: response.rows.item(i).LanguageID
                                ,   languageName: response.rows.item(i).LanguageName

                            };
                            LanguageList.push(languageObj);

                        }


                        return LanguageList;
                    });
                } else {
                      return dataService.callAPI(config.API_URL + 'Person/languages', [], 'GET').then(function (response) {
                        return response.data;
                    });

                }
            },



getEmployeeCategoryTypes: function () {
            
                if (appConfig.APP_MODE == 'offline') {
                       var query = staffQueries.employeeCategoryTypes;
                    return dataService.executeQuery(query, personconfig.OFFLINE_DBNAME).then(function (response) {
                        var EmployeeCategoryList = [];

                        for (var i = 0; i < response.rows.length; i++) {
                            var employeeCategoryObj = {
                                        employeeCategoryId: response.rows.item(i).EmployeeCategoryId
                                ,   employeeCategoryName: response.rows.item(i).EmployeeCategoryName,

                            };
                            EmployeeCategoryList.push(employeeCategoryObj);

                        }
                        return EmployeeCategoryList;
                    });
                } else {
                      return dataService.callAPI(config.API_URL + 'Staff/employeeCategories', [], 'GET').then(function (response) {
             
                        return response.data;
                    });

                }
            },



getEmployementTypes: function () {
            
                if (appConfig.APP_MODE == 'offline') {
                       var query = staffQueries.employementTypes;
                    return dataService.executeQuery(query, personconfig.OFFLINE_DBNAME).then(function (response) {
                        var EmployementTypesList = [];

                        for (var i = 0; i < response.rows.length; i++) {
                            var employementTypesObj = {
                                        employmentTypeId: response.rows.item(i).EmploymentTypeId,
                            employmentTypeName: response.rows.item(i).EmploymentTypeName,

                            };
                            EmployementTypesList.push(employementTypesObj);

                        }
                        return EmployementTypesList;
                    });
                } else {
                      return dataService.callAPI(config.API_URL + 'Staff/employmentTypes', [], 'GET').then(function (response) {
                          return response.data;
                    });

                }
            },



getDesignationTypes: function () {
            
                if (appConfig.APP_MODE == 'offline') {
                       var query = staffQueries.designationTypes;
                    return dataService.executeQuery(query, personconfig.OFFLINE_DBNAME).then(function (response) {
                        var DesignationTypesList = [];

                        for (var i = 0; i < response.rows.length; i++) {
                            var TypesObj = {
                                        employmentTypeId: response.rows.item(i).EmploymentTypeId,
                            employmentTypeName: response.rows.item(i).EmploymentTypeName,

                            };
                            DesignationTypesList.push(TypesObj);

                        }
                        return DesignationTypesList;
                    });
                } else {
                      return dataService.callAPI(config.API_URL + 'Person/designations', [], 'GET').then(function (response) {
                      
                          return response.data;
                    });

                }
            },





     getAllDepartments: function (organizationKey) {
     
           
             if (appConfig.APP_MODE == 'offline') {
                  var query = boardQueries.getAllDepartments;
                 return dataService.executeQuery(query, config.OFFLINE_DBNAME).then(function (response) {
                 var departmentsList = [];
                 for (var i = 0; i < response.rows.length; i++) {
                     var departments = {
                     
                         referenceKey: response.rows.item(i).ReferenceKey,
                            departmentName: response.rows.item(i).DepartmentName,
                     };
                         departmentsList.push(departments);
                 } // end of for loop
                 return departmentsList;

                });
            } else {
                                 
                return dataService.callAPI(config.API_URL + 'Organization/organizations/'+organizationKey+'/departments', [], 'GET').then(function (response) {
                
                    console.log(response);
                     return response.data;

                        });
                }
        } ,

     getSeconadryDepartmentTypes: function (organizationKey) {
              if (appConfig.APP_MODE == 'offline') {
                  var query = boardQueries.getAllDepartments;
                 return dataService.executeQuery(query, config.OFFLINE_DBNAME).then(function (response) {
                 var departmentsList = [];
                 for (var i = 0; i < response.rows.length; i++) {
                     var departments = {
                     
                         referenceKey: response.rows.item(i).ReferenceKey,
                            departmentName: response.rows.item(i).DepartmentName,
                     };
                         departmentsList.push(departments);
                 } // end of for loop
                 return departmentsList;

                });
            } else {
                                 
                return dataService.callAPI(config.API_URL + 'Organization/organizations/'+organizationKey+'/departments', [], 'GET').then(function (response) {
                     console.log(response);
                     return response.data;

                        });
                }
        } ,



  getInterviewdByTypes: function (organizationKey) {
              if (appConfig.APP_MODE == 'offline') {
                  var query = boardQueries.getAllDepartments;
                 return dataService.executeQuery(query, config.OFFLINE_DBNAME).then(function (response) {
                 var departmentsList = [];
                 for (var i = 0; i < response.rows.length; i++) {
                     var departments = {
                     
                         referenceKey: response.rows.item(i).ReferenceKey,
                            departmentName: response.rows.item(i).DepartmentName,
                     };
                         departmentsList.push(departments);
                 } // end of for loop
                 return departmentsList;

                });
            } else {
                                 
                return dataService.callAPI(config.API_URL + 'Staff/Staffs/' + organizationKey, [], 'GET').then(function (response) {
                  //alert(JSON.stringify(response));
                     console.log(response);
                     return response.data;

                        });
                }
        } ,





            getStaffProfilePicture: function (folderKey, fileKey) {
              
                console.log(config.OFFLINE_DBNAME, config.API_URL + 'Dms/folders/' + folderKey + '/files/' + fileKey);
                return dataService.callAPI(config.API_URL + 'Dms/folders/' + folderKey + '/files/' + fileKey, [], 'GET').then(function (response) {
                 return response.data[0][0];
                });
            },



            addspecializations: function () {

                return dataService.callAPI(config.OFFLINE_DBNAME, config.API_URL + 'Dms/folders/' + folderKey + '/files/' + fileKey, [], 'GET').then(function (response) {
                    return response.data[0][0];
                });
            },



//             updateStaff: function (userObj,dmsobj) {
//                 //postUser function call
               
               
//                 var persondetails = {
                    
//                 };
//                 //alert(JSON.stringify(userObj));
//                 persondetails.firstName = userObj.FirstName;
//                 persondetails.middleName = userObj.MiddleName;
//                 persondetails.lastName = userObj.LastName;
//                 persondetails.dateOfBirth = userObj.DateOfBirth;
//                 persondetails.gender = userObj.gender;
//                 personReferenceKey = userObj.referenceKey;
//                 var mobileno = userObj.MobileNumber;
//                 console.log(JSON.stringify(persondetails));
//                 // alert(JSON.stringify(mobileno));
//                 //persondetails.personKey = "f06b36a0-3f5f-11e6-b8c3-e5f7dfeb539f";
//                 // thrillappperson.PersonKey =Referencekey;
//                 //persondetails.roleId =userObj.Role ;
//                 return personBasicInfoLogic.updatePerson(persondetails, personReferenceKey).then(function (response) {
//        /*             var Contacts = [
//                         {
//                             "entityReferenceKey": personReferenceKey,
//                             "contactSubTypeId": 2,
//                             "contactInfo": mobileno,
//                             "entityTypeId": 1,
//                             "referenceKey": userObj.MobileNumberreferenceKey
//                         },
//                         {
//                             "entityReferenceKey": personReferenceKey,
//                             "contactSubTypeId": 3,
//                             "contactInfo": userObj.Email,
//                             "entityTypeId": 1,
//                             "referenceKey": userObj.EmailreferenceKey
//                         }
//                         ,
//                                                 {
//                                                     "entityReferenceKey": Referencekey,
//                                                     "contactSubTypeId": 4,
//                                                     "contactInfo": userObj.Fax,
//                                                     "entityTypeId": 1
//                                                 }
//                             ]
//                     angular.forEach(Contacts, function (Contacts, index) {
//                         console.log('update contact call' + JSON.stringify(Contacts))
//                         contactLogic.updateContact(Contacts, Contacts.referenceKey).then(function (response) {
//                             console.log('update contact response' + JSON.stringify(response));
//                         });
//                     });
// */

//                     var thrillappperson = {};

//                     // thrillappperson.organizationKey = "f06b36a0-3f5f-11e6-b8c3-e5f7dfeb539f";
//                     thrillappperson.organizationKey = $localStorage.organizationKey;
//                     // thrillappperson.personKey = Referencekey;
//                     // thrillappperson.PersonKey =Referencekey;
//                     thrillappperson.roleId = userObj.Role;
//                     thrillappperson.designationKey = userObj.Designation;
//                     thrillappperson.specializationKey = userObj.Specialization;
//                     thrillappperson.branchkey = userObj.branch;
//                     thrillappperson.contactKey = userObj.contactKey;
//                     // thrillappperson.PersonID = resp1.data.refernecKey;
//                     /*  alert(JSON.stringify(thrillappperson));*/

//                     thrillAppBasePersonLogic.updatePersondetailsbydesignation(personReferenceKey, thrillappperson).then(function (response) {
//                         /*  alert(response);*/
//                         console.log(response);
//                     });

//                     // appLogger.alert('personUpdated');

//                     if (dmsobj != undefined && dmsobj!= null) {
//                         /*alert('image uploaded');*/
//                         var folderObject = {
//                             FolderName: personReferenceKey,
//                             EntityKey: personReferenceKey,
//                             EntityType: 'Person'
//                         };

//                         dataService.insert(folderObject, '3ilAppBase01.dms', config.OFFLINE_DBNAME, config.API_URL + 'dms/folders').then(function (folderResponse) {
//                             var foldeKey = folderResponse.data[0][0].FolderKey;

//                             // create file
//                             var file = dmsobj.file;
//                             var fileObj = {};
//                             fileObj.fileBase64Data = 'data:' + file.filetype + ';base64,' + file.base64;
//                             fileObj.fileName = file.filename;
//                             fileObj.fileSize = file.filesize;
//                             fileObj.fileType = file.filetype;
  
//                             dataService.insert(fileObj, '3ilAppBase01.dms', config.OFFLINE_DBNAME, config.API_URL + 'dms/folders/' + foldeKey + '/files').then(function (fileResponse) {
//                                 var fileKey = fileResponse.data[0][0].Filekey

//                                 var personUpdateObj = {
//                                     "firstName": userObj.FirstName,
//                                     "lastName": userObj.LastName,
//                                     "folderKey": foldeKey,
//                                     "DMSFileKey": fileKey
//                                 }

//                                 personBasicInfoLogic.updatePerson(personUpdateObj, personReferenceKey).then(function (personUpdateResponse) {
//                                     console.log('person update response ' + JSON.stringify(personUpdateResponse))
//                                 })

//                             })

//                         });
//                     } else {
//                         //alert('image not uploaded');
//                     }


//                     //  getPerson(personReferenceKey);
//                 }, function (err) {
//                     appLogger.error('ERR', err);
//                 });

//                 //  updatePerson

//             },


            //This is to add token to the email being send
            sendToken: function (userId) { //sendToken function call
                console.log('calling service');
                return dataService.callAPI(config.API_URL + 'Security/Token/' + userId, [], "GET").then(function (response) {
                    //  alert(JSON.stringify(response));
                    //  alert(JSON.stringify(response));

                    return response;
                });

            },

            // This is to postEmail to the registered User
            postEmail: function (userObj) { //postEmail function call
                // alert(JSON.stringify(userObj));
                return dataService.insert(userObj, 'User', 'trainee6', config.API_URL + 'Security/registeredEmail').then(function (response) {

                    return response;
                });

            },







        };

    });
/* Registration logic  end */