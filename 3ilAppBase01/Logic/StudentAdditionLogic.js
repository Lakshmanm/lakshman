var app = angular.module('ThrillAppBase.StudentAdditionLogic', ['ngCordova', 'ThrillFrameworkLibrary.DataService', 'ThrillAppBase.config', 'ThrillCnnWebClient.appConfig', 'ThrillFrameworkLibrary.appLogger', 'security.registrationLogic', 'ThrillCNN.CreateCalendarLogic', 'ThrillContact.contactLogic', 'ThrillAppBase.thrillAppBasePersonLogic', 'ThrillPerson.personWorkExperienceLogic', 'ThrillAppBase.thrillAppBasePersonLogic'])
    .factory('ThrillAppBaseStudentLogic', function($http,
        dataService,
        config,
        appConfig,
        appLogger, registrationLogic, createCalendarLogic, contactLogic, thrillAppBasePersonLogic, personWorkExperienceLogic, ThrillAppBasechildLogic, personBasicInfoLogic, $localStorage) {
        return {

            getstudentType: function() {

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
                    return dataService.callAPI(config.API_URL + 'Student/StudentTypes', [], 'GET').then(function(response) {
                        return response.data;
                    });
                }
            }, // end of get method
 getElectiveSubjectByInstituteKey: function(electiveGroupKey, instituteKey) {
     return dataService.callAPI(config.API_URL + 'Academic/ElectiveGroup/'+electiveGroupKey+  '/Subject/'+instituteKey, [], 'GET').then(function(response) {
console.log(response);
                return response.data;
            });
        },
            getElectiveByKey: function(studentElectiveKey) {
     return dataService.callAPI(config.API_URL + 'Student/ElectivesInfo/'+studentElectiveKey, [], 'GET').then(function(response) {
console.log(response);
                return response.data;
            });
        },
            deleteElective:function(studentElectiveKey,studentElectiveInfoKey)
            {
          return dataService.delete('StudentElectiveInfoKey="' + studentElectiveInfoKey + '"', '`student.electiveInfo`', config.OFFLINE_DBNAME, config.API_URL+ 'Student/ElectiveInfo/'+studentElectiveInfoKey).then(function (response) {
				 return response;
			 });          
                
            },
            
            addElectives:function()
            {
                
             return dataService.insert({}, '`student.electives`', config.OFFLINE_DBNAME, config.API_URL + 'Student/Electives').then(function (response) {
                 return response.data;
                     
             });     
                
            },
            addElectiveInfo:function(electiveObject)
            {
           return dataService.insert(electiveObject, '`student.electivesInfo`', config.OFFLINE_DBNAME, config.API_URL + 'Student/ElectivesInfo').then(function (response) {
                     return response;
             });     
                
            },
            
            ModesofEducation: function() {

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
                    return dataService.callAPI(config.API_URL + 'Student/EducationModes', [], 'GET').then(function(response) {
                        return response.data;
                    });
                }
            }, // end of get metho

            getNationalityTypes: function() {


                if (appConfig.APP_MODE == 'offline') {
                    var query = personQueries.NationalityTypes;
                    return dataService.executeQuery(query, personconfig.OFFLINE_DBNAME).then(function(response) {
                        var NationalityTypesList = [];

                        for (var i = 0; i < response.rows.length; i++) {
                            var nationalityTypeObj = {
                                nationalityId: response.rows.item(i).NationalityID,
                                nationalityName: response.rows.item(i).NationalityName



                            };
                            NationalityTypesList.push(nationalityTypeObj);

                        }


                        return NationalityTypesList;
                    });
                } else {
                    return dataService.callAPI(config.API_URL + 'Person/nationalities', [], 'GET').then(function(response) {
                        return response.data;
                    });

                }
            },

            getBloodTypes: function() {

                if (appConfig.APP_MODE == 'offline') {
                    var query = personQueries.BloodGroupTypes;
                    return dataService.executeQuery(query, personconfig.OFFLINE_DBNAME).then(function(response) {
                        var BloodGroupTypesList = [];

                        for (var i = 0; i < response.rows.length; i++) {
                            var bloodGroupTypeObj = {
                                bloodGroupID: response.rows.item(i).BloodGroupID,
                                bloodGroupName: response.rows.item(i).BloodGroupName

                            };
                            BloodGroupTypesList.push(bloodGroupTypeObj);

                        }


                        return BloodGroupTypesList;
                    });
                } else {
                    return dataService.callAPI(config.API_URL + 'Person/bloodgroups', [], 'GET').then(function(response) {
                        return response.data;
                    });

                }
            },


            getCasteTypes: function() {

                if (appConfig.APP_MODE == 'offline') {
                    var query = personQueries.casteTypes;
                    return dataService.executeQuery(query, personconfig.OFFLINE_DBNAME).then(function(response) {
                        var CasteTypesList = [];

                        for (var i = 0; i < response.rows.length; i++) {
                            var casteTypeObj = {
                                socialgroupId: response.rows.item(i).socialgroupID,
                                socialGroupName: response.rows.item(i).socialGroupName

                            };
                            CasteTypesList.push(casteTypeObj);

                        }


                        return CasteTypesList;
                    });
                } else {
                    return dataService.callAPI(config.API_URL + 'Person/socialgroups', [], 'GET').then(function(response) {
                        return response.data;
                    });

                }
            },

            getLanguagesTypes: function() {

                if (appConfig.APP_MODE == 'offline') {
                    var query = personQueries.casteTypes;
                    return dataService.executeQuery(query, personconfig.OFFLINE_DBNAME).then(function(response) {
                        var LanguageList = [];

                        for (var i = 0; i < response.rows.length; i++) {
                            var languageObj = {
                                languageId: response.rows.item(i).LanguageID,
                                languageName: response.rows.item(i).LanguageName

                            };
                            LanguageList.push(languageObj);

                        }


                        return LanguageList;
                    });
                } else {
                    return dataService.callAPI(config.API_URL + 'Person/languages', [], 'GET').then(function(response) {
                        return response.data;
                    });

                }
            },

            addStudent: function(StudentObj) {
                var profilePic = StudentObj.profilePic;
                delete StudentObj.profilePic;
                //personBasicInfoObj.dateOfBirth = new Date(personBasicInfoObj.dateOfBirth);
                // console.log(personBasicInfoObj);
                return dataService.insert(StudentObj, '`student.Student`', config.OFFLINE_DBNAME, config.API_URL + 'Student/Student').then(function(response) {

                    var StudentKey = response.data.StudentKey;

                    StudentObj.profilePic = profilePic;
                    if (StudentObj.profilePic != null && StudentObj.profilePic != undefined) {
                        // create folder
                        var folderObj = {
                            FolderName: StudentKey,
                            EntityKey: StudentKey,
                            EntityType: "Student"
                        };

                        /*var folderKey = subOrganizationObj.basicInfo.folderKey;
                        var fileKey = subOrganizationObj.basicInfo.n3DMSFileKey;*/

                        dataService.insert(folderObj, '`3ilAppBase01.dms`', config.OFFLINE_DBNAME, config.API_URL + 'dms/folders').then(function(response) {
                            //console.log('folder response ' + JSON.stringify(response));
                            if (response.data[0][0].FolderKey != undefined) {
                                folderKey = response.data[0][0].FolderKey;
                                console.log(folderKey);
                            }

                            var postFileObj = {};

                            postFileObj.fileBase64Data = 'data:' + StudentObj.profilePic.filetype + ';base64,' + StudentObj.profilePic.base64;
                            postFileObj.fileName = StudentObj.profilePic.filename;
                            postFileObj.fileSize = StudentObj.profilePic.filesize;
                            postFileObj.fileType = StudentObj.profilePic.filetype;


                            dataService.insert(postFileObj, '`3ilAppBase01.dms`', config.OFFLINE_DBNAME, config.API_URL + 'dms/folders/' + folderKey + '/files').then(function(response) {
                                //appLogger.log('file response ' + JSON.stringify(response));
                                fileKey = response.data[0][0].Filekey;
                                console.log(fileKey);

                                StudentObj.FolderKey = folderKey
                                StudentObj.n3DMSFileKey = fileKey
                                delete StudentObj.profilePic;
                                return dataService.update(StudentObj, 'StudentKey=' + "'" + StudentKey + "'", '`student.Student`', config.OFFLINE_DBNAME, config.API_URL + 'Student/Student/' + StudentKey).then(function(response) {

                                });

                            });


                        });


                    }
                    return response;
                });
            },

            updateStudent: function(StudentObj, StudentKey) {

                if (StudentObj.profilePic != null && StudentObj.profilePic != undefined) {
                    // create folder
                    var folderObj = {
                        FolderName: StudentKey,
                        EntityKey: StudentKey,
                        EntityType: "Student"
                    };

                    var folderKey = StudentObj.FolderKey;

                    var fileKey = StudentObj.n3DMSFileKey;

                    return dataService.insert(folderObj, '`3ilAppBase01.dms`', config.OFFLINE_DBNAME, config.API_URL + 'dms/folders').then(function(response) {
                        //appLogger.log('folder response ' + JSON.stringify(response));
                        if (response.data[0][0].FolderKey != undefined) {
                            folderKey = response.data[0][0].FolderKey;
                        }

                        var postFileObj = {};

                        postFileObj.fileBase64Data = 'data:' + StudentObj.profilePic.filetype + ';base64,' + StudentObj.profilePic.base64;
                        postFileObj.fileName = StudentObj.profilePic.filename;
                        postFileObj.fileSize = StudentObj.profilePic.filesize;
                        postFileObj.fileType = StudentObj.profilePic.filetype;


                        return dataService.insert(postFileObj, '`3ilAppBase01.dms`', config.OFFLINE_DBNAME, config.API_URL + 'dms/folders/' + folderKey + '/files').then(function(response) {
                            //appLogger.log('file response ' + JSON.stringify(response));
                            fileKey = response.data[0][0].Filekey;

                            StudentObj.FolderKey = folderKey
                            StudentObj.n3DMSFileKey = fileKey
                            delete StudentObj.profilePic;
                            return dataService.update(StudentObj, 'StudentKey=' + "'" + StudentKey + "'", '`student.Student`', config.OFFLINE_DBNAME, config.API_URL + 'Student/Student/' + StudentKey).then(function(response) {
                                console.log(response);
                                return response;
                            });

                        });


                    });


                } else {

                    return dataService.update(StudentObj, 'StudentKey=' + "'" + StudentKey + "'", '`student.Student`', config.OFFLINE_DBNAME, config.API_URL + 'Student/Student/' + StudentKey).then(function(response) {
                        console.log(response);
                        return response;
                    });
                }


                /* return dataService.update(StudentObj, 'StudentKey=' + "'" + StudentKey + "'", '`student.Student`', config.OFFLINE_DBNAME, config.API_URL + 'Student/Student/' + StudentKey).then(function (response) {
                                 console.log(response);
                                   return response;
                                  });*/
            },

            getStudentByStudentKey: function(StudentKey) {

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
                    return dataService.callAPI(config.API_URL + 'Student/Students/' + StudentKey, [], 'GET').then(function(response) {
                        return response.data;
                    });
                }
            },
            getStudentforFee: function(StudentKey) {

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
                    return dataService.callAPI(config.API_URL + 'Student/Fee/' + StudentKey, [], 'GET').then(function(response) {
                        return response.data;
                    });
                }
            },
            getStudentenrollmentNumber: function(StudentKey) {

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
                    return dataService.callAPI(config.API_URL + 'Student/Students/all/enrollmentNumber/' + StudentKey, [], 'GET').then(function(response) {
                        return response.data;
                    });
                }
            },

            getdetailsByEnrollmentNumber: function(enrollmentNumber, instituteKey) {

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
                    return dataService.callAPI(config.API_URL + 'Student/Enrollment/' + enrollmentNumber + '/' + instituteKey + '/Student', [], 'GET').then(function(response) {
                        return response.data;
                    });
                }
            },
            getProfilePicture: function(folderKey, fileKey) {
                return dataService.callAPI(config.API_URL + 'dms/folders/' + folderKey + '/files/' + fileKey, [], 'GET').then(function(response) {

                    return response.data[0][0];
                });
            },

            //Enrollment


            getStudentEnrollmentByStudentKey: function(StudentKey) {

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
                    return dataService.callAPI(config.API_URL + 'Student/StudentsEntrollment/' + StudentKey, [], 'GET').then(function(response) {
                        return response.data;
                    });
                }
            }




        };

    });
/* Registration logic  end */