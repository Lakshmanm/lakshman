/*=======================================================================
 All rights reserved to Thrill Innovative Labs.
 THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
 OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
 LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
 FITNESS FOR A PARTICULAR PURPOSE.
===========================================================================
****************************************************************************
 Name                : Organization.Logic.js
 Type                : Javascript and JQuery 
 Description         : This file contains business logic methods
 References          :
 Author              : kalyani
 Created Date        : 11-Apr-2016
****************************************************************************
MODIFICATION LOG
**************************************************************************** 
S.No Ver	Date:	     Modified By:		Description:
1          12-04-2016    Kiranmai            dependency structure changed
****************************************************************************  
Code Review LOG
**************************************************************************** 
S.No      Ver        Date                Code Review By            Observations
1         1.0       13-April-2016         Sri Venkatesh.T           write function  params a meaningful name don't use shartcut name ex: orgid for  updateOrganization
****************************************************************************
*/
var app = angular.module('ThrillAppBase.appBaseOrganizationLogic', ['ThrillFrameworkLibrary.DataService'
    // , 'ThrillAppBase.AppBaseQueries'
    , 'ThrillAppBase.config', 'ThrillCnnWebClient.appConfig', 'ThrillFrameworkLibrary.appLogger', 'ThrillOrganization.organizationLogic', 'ThrillLocation.addressLogic', 'ThrillContact.contactLogic', 'ThrillContact.contactContactItemLogic', 'security.registrationLogic', 'ThrillAppBase.thrillAppBasePersonLogic', 'ThrillLocation.addressLogic', 'ThrillCNN.CreateCalendarLogic'
]);
/*Create Business Logic Factory Method */
app.factory('appBaseOrganizationLogic', function ($http, dataService, $localStorage
    // , AppBaseQueries
    , config, appConfig, appLogger, organizationLogic, contactLogic, registrationLogic, thrillAppBasePersonLogic, createCalendarLogic, addressLogic, contactContactItemLogic) {
    return {
        addAppBaseOrganization: function (organizationObj) {
            // add contact for contactKey  :contact component
            return contactLogic.addContact({}).then(function (response) {




                appLogger.log('add contact response ' + JSON.stringify(response));
                var contactKey = response.data.contactKey;
                organizationObj.basicInfo.organizationLevelId = 1 //Head Office
                organizationObj.basicInfo.isActive = 1
                organizationObj.basicInfo.contactKey = contactKey;
                appLogger.log("add org object :" + JSON.stringify(organizationObj.basicInfo));
                return organizationLogic.addOrganization(organizationObj.basicInfo).then(function (response) {
                    appLogger.log('add org response ' + JSON.stringify(response));
                    $localStorage.registeredOrganizationKey = response.data.organizationKey;
                    var organizationKey = response.data.organizationKey;
                    // add deafult address mode config for organization :3ilAppBase 
                    var organizationConfigObject = {
                        "organizationKey": organizationKey
                        , "configurationKey": "AddressMode"
                        , "configurationValue": "General"
                    }
                    appLogger.log("default address mode obj :" + JSON.stringify(organizationConfigObject));
                   return dataService.insert(organizationConfigObject, '`3ilAppBase01.organizationconfigurations`', config.OFFLINE_DBNAME, config.API_URL + 'thrillAppBase/organizationConfigurations').then(function (response) {
                        appLogger.log('default address mode response ' + JSON.stringify(response));


                           //add email contact item  : contact component
                    var emailContactItemObj = {
                        "contactItemInfo": organizationObj.security.adminEmail
                        , "contactKey": contactKey
                        , "contactTypeKey": "78278210-48e3-11e6-8585-316a593298b4"
                    }
                    appLogger.log("add email contactItem obj :" + JSON.stringify(emailContactItemObj));
                    return contactContactItemLogic.addContactContactItem(emailContactItemObj, contactKey).then(function (contactItemResponse) {
                            appLogger.log('add email contactItem resp ' + JSON.stringify(contactItemResponse))


                              
                        // add mobile contact Item : contact component
                    var mobileContactItemObj = {
                        "contactItemInfo": organizationObj.security.mobileNumber
                        , "contactKey": contactKey
                        , "contactTypeKey": "afe56000-48e3-11e6-984a-9d49055c7bf9"
                    }
                    appLogger.log("add mobile contactItem obj :" + JSON.stringify(mobileContactItemObj));
                   return contactContactItemLogic.addContactContactItem(mobileContactItemObj, contactKey).then(function (contactItemResponse) {
                            appLogger.log('add mobile contactItem resp ' + JSON.stringify(contactItemResponse))

                                // add user :security component
                    var userObj = {
                        Username: ''
                        , Password: organizationObj.security.password
                        , FirstName: organizationObj.security.firstName
                        , LastName: organizationObj.security.lastName
                        , MobileNumber: organizationObj.security.mobileNumber
                        , MiddleName: null
                        , PrimaryEmailAddress: organizationObj.security.adminEmail
                         , question: null
                        , SecondaryEmailAddress: ''
                        , AddressID: null
                        , IsActive: 0
                    }
                    appLogger.log("add user obj :" + JSON.stringify(userObj));
                   return registrationLogic.postUser(userObj).then(function (resp1) {
                        appLogger.log("add user resp :" + JSON.stringify(resp1));
                        var userId = resp1.data.insertId;
                        var personReferenceKey = resp1.data.referenceKey;
                       // alert("person"+personReferenceKey);
                        $localStorage.orgAdminKey=personReferenceKey;

                        // add user in 3ilAppbase transaction table :3ilAppase
                        var thrillappperson = {};
                        thrillappperson.organizationKey = organizationKey;
                        thrillappperson.personKey = personReferenceKey;

                        thrillappperson.contactKey = contactKey;
                        thrillappperson.roleId = 1;
                        appLogger.log(JSON.stringify(thrillappperson));
                       return thrillAppBasePersonLogic.addThrillPersonDetails(thrillappperson).then(function (response) {
                            console.log(response);

                              // send token :security component
                       return registrationLogic.sendToken(userId).then(function (resp2) {
                            appLogger.log("send token resp :" + JSON.stringify(resp2));
                            // send email for authorization :security component
                            var regs = {};
                            regs.token = resp2.data.Token;
                            regs.UserID = userId;
                            regs.PrimaryEmailAddress = userObj.PrimaryEmailAddress;
                            appLogger.log("send email obj :" + JSON.stringify(userObj));
                          return registrationLogic.postEmail(regs).then(function (resp3) {
                                    appLogger.log("send email resp :" + JSON.stringify(resp3));



                                         // add person in calendar : calendar notification component
                            var orgInfo = {};
                            orgInfo.referenceKey = personReferenceKey;
                            appLogger.log("add person in calendar obj :" + JSON.stringify(orgInfo));
                          return createCalendarLogic.personinsertion(orgInfo).then(function (response) {
                                appLogger.log("add person in calendar resp :" + JSON.stringify(response));
                                var newCalendarInfo = {};
                                newCalendarInfo.PersonCalendarName = "Organization Calendar";
                                newCalendarInfo.PersonID = personReferenceKey;
                                newCalendarInfo.OrganizationReferenceKey = organizationKey;
                                newCalendarInfo.Description = "Organization Calendar";
                                newCalendarInfo.SharingEmails = 1;
                                newCalendarInfo.RoleID = 1;
                                newCalendarInfo.CalendarColor = null;
                                newCalendarInfo.CreatedByUserID = userId;
                                appLogger.log("add calender obj :" + JSON.stringify(newCalendarInfo));
                               return  createCalendarLogic.createCalendar(newCalendarInfo).then(function (response2) {
                                    appLogger.log("add calender resp :" + JSON.stringify(response2));


                                    return response2;
                                    //alert("Organization Registration Form Submitted Successfully");
                                });
                            });
                                })
                           
                        });



                        });

                    });



                        })


                        })


                    });
                   
                     
                }, function (err) {
                    console.error('ERR', err);
                });
            });
        }
        , updateAppBaseOrganization: function (organizationObj, organizationKey) {
            return organizationLogic.updateOrganization(organizationObj.basicInfo, organizationKey).then(function (response) {
                //address Update
                if (organizationObj.address.addressKey == undefined) {
                    addressLogic.addAddress(organizationObj.address).then(function (response) {
                        appLogger.log('add address response' + JSON.stringify(response))
                        organizationObj.basicInfo.addresskey = response.data.referenceKey
                        return organizationLogic.updateOrganization(organizationObj.basicInfo, organizationKey).then(function (response) {});
                    })
                }
                else {
                    addressLogic.updateAddress(organizationObj.address, organizationObj.address.addressKey).then(function (response) {
                        appLogger.log('update address response' + JSON.stringify(response))
                    })
                }
                console.log('update org response' + JSON.stringify(response));
                //profile picture update
                if (organizationObj.profilePic != null && organizationObj.profilePic != undefined) {
                    // create folder
                    var folderObj = {
                        FolderName: organizationKey
                        , EntityKey: organizationKey
                        , EntityType: "Organization"
                    };
                    var folderKey = organizationObj.basicInfo.folderKey;
                    var fileKey = organizationObj.basicInfo.n3DMSFileKey;
                    dataService.insert(folderObj, '`3ilAppBase01.dms`', config.OFFLINE_DBNAME, config.API_URL + 'dms/folders').then(function (response) {
                        appLogger.log('folder response ' + JSON.stringify(response));
                        if (response.data[0][0].FolderKey != undefined) {
                            folderKey = response.data[0][0].FolderKey;
                        }
                        var postFileObj = {};
                        postFileObj.fileBase64Data = 'data:' + organizationObj.profilePic.filetype + ';base64,' + organizationObj.profilePic.base64;
                        postFileObj.fileName = organizationObj.profilePic.filename;
                        postFileObj.fileSize = organizationObj.profilePic.filesize;
                        postFileObj.fileType = organizationObj.profilePic.filetype;
                        dataService.insert(postFileObj, '`3ilAppBase01.dms`', config.OFFLINE_DBNAME, config.API_URL + 'dms/folders/' + folderKey + '/files').then(function (response) {
                            appLogger.log('file response ' + JSON.stringify(response));
                            fileKey = response.data[0][0].Filekey;
                            organizationObj.basicInfo.folderKey = folderKey
                            organizationObj.basicInfo.n3DMSFileKey = fileKey
                            return organizationLogic.updateOrganization(organizationObj.basicInfo, organizationKey).then(function (response) {});
                        });
                    });
                }
                return response;
            });
        }
        , getAppBaseOrganization: function (organizationKey) {
            var organization = {
                basicInfo: {}
                , contact: {
                    contactKey: null
                    , contactItems: []
                }
            };
            return organizationLogic.getOrganizationInfoById(organizationKey).then(function (response) {
                console.log('get org by key ' + organizationKey + JSON.stringify(response));
                organization.basicInfo = response;
               /* if (organization.basicInfo.establishedOn != undefined) organization.basicInfo.establishedOn = new Date(response.establishedOn)*/
                return organization;
            })
        }
        , getOrganizationTypes: function () {
            return dataService.callAPI(config.API_URL + 'thrillAppBase/organizationTypes', [], 'GET').then(function (response) {
                return response.data;
            });
        },
        getRecognitionTypes:function()
{
 return dataService.callAPI(config.API_URL + 'Mcampuz/instituterecognitions', [], 'GET').then(function(response) {

              
                return response.data;
            });

}

        
        , getOrganizationProfilePicture: function (folderKey, fileKey) {
            return dataService.callAPI(config.API_URL + 'dms/folders/' + folderKey + '/files/' + fileKey, [], 'GET').then(function (response) {
                return response.data[0][0];
            });
        }
        , addOrganizationConfiguration: function (organizationConfigObject) {
            return dataService.insert(organizationConfigObject, '`3ilAppBase01.organizationconfigurations`', config.OFFLINE_DBNAME, config.API_URL + 'thrillAppBase/organizationConfigurations').then(function (response) {
                return response;
                appLogger.log('app Base organization config response ' + JSON.stringify(response));
            });
        }
        , getOrganizationConfigurations: function (organizationKey) {
            return dataService.callAPI(config.API_URL + 'ThrillAppBase/organizations/' + organizationKey + '/configurations/', [], 'GET').then(function (response) {
                return response.data;
            });
        }
        , addAttendanceStatus: function (attendanceStatus) {
            return dataService.insert(attendanceStatus, '`3ilAppBase01.dms`', config.OFFLINE_DBNAME, config.API_URL + 'Organization/attendanceStatus').then(function (response) {
                return response.data;
            });
        }
        , addDepartment: function (departmentObject) {
            return dataService.insert(departmentObject, '`3ilAppBase01.dms`', config.OFFLINE_DBNAME, config.API_URL + 'Organization/departments').then(function (response) {
                return response.data;
            });
        }
        , addleaveRequestModess: function (leaveRequestObject) {
            return dataService.insert(leaveRequestObject, '`3ilAppBase01.dms`', config.OFFLINE_DBNAME, config.API_URL + 'Organization/leaveRequestModes').then(function (response) {
                return response.data;
            });
        }
        , addLeaveReason: function (leaveReasonObject) {
            return dataService.insert(leaveReasonObject, '`3ilAppBase01.dms`', config.OFFLINE_DBNAME, config.API_URL + 'Organization/leaveReason').then(function (response) {
                return response.data;
            });
        }
        , addLeaveRequestRecieveBy: function (leaveRecieveObject) {
            return dataService.insert(leaveRecieveObject, '`3ilAppBase01.dms`', config.OFFLINE_DBNAME, config.API_URL + 'Organization/leaveRecievers').then(function (response) {
                return response.data;
            });
        }
        , leaveTypes: function (leaveTypeObject) {
            return dataService.insert(leaveTypeObject, '`3ilAppBase01.dms`', config.OFFLINE_DBNAME, config.API_URL + 'Organization/leavetypes').then(function (response) {
                return response.data;
            });
        }
    };
});