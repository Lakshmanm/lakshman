var app = angular.module('ThrillAppBase.childAdditionLogic', ['ngCordova', 'ThrillFrameworkLibrary.DataService'
                                                        , 'ThrillAppBase.config'
                                                        , 'ThrillCnnWebClient.appConfig'
                                                        , 'ThrillFrameworkLibrary.appLogger'
                                                         , 'security.registrationLogic'
                                                        , 'ThrillPerson.personBasicInfoLogic'
                                                        , 'security.registrationLogic'
                                                        , 'ThrillCNN.CreateCalendarLogic'
                                                        , 'ThrillContact.contactLogic'
                                                        , 'ThrillAppBase.thrillAppBasePersonLogic'
                                                        , 'ThrillPerson.personWorkExperienceLogic'
                                                        , 'ThrillLocation.addressLogic'
                                                              , 'ThrillPerson.personMaritalStatusLogic'
                                                              , 'ThrillPerson.personIdentityLogic'
                                                              ,'ThrillContact.contactContactItemLogic'

    ]).factory('ThrillAppBasechildLogic', function ($http, dataService, config, appConfig, appLogger, registrationLogic, createCalendarLogic, contactLogic, thrillAppBasePersonLogic, personWorkExperienceLogic, personBasicInfoLogic, $localStorage, addressLogic, PersonMaritalStatusLogic, personIdentityLogic,contactContactItemLogic) {
    return {
        // Logic for registration process  
        addChild: function (userObj) { //postUser function call
             // alert(JSON.stringify(userObj));
            var Referencekey;
            console.log(JSON.stringify(userObj));
            var mobileno = userObj.MNumber;
            var persondetails = {};
           /* //alert(JSON.stringify(userObj));
            persondetails.firstName = userObj.firstName;
            persondetails.lastName = userObj.lastName;
            persondetails.middleName = userObj.middleName;
            persondetails.dateOfBirth = userObj.dateOfBirth;
            persondetails.GenderID = userObj.gender;*/
            //persondetails.personKey = "f06b36a0-3f5f-11e6-b8c3-e5f7dfeb539f";
            // thrillappperson.PersonKey =Referencekey;
            //persondetails.roleId =userObj.Role ;
            return personBasicInfoLogic.addPerson(userObj).then(function (resp1) {
                // console.log(JSON.stringify(resp1));
                var userId = resp1.data.insertId;
                Referencekey = resp1.data.referenceKey;
               // alert(resp1.data.referenceKey)
 /*               console.log('person refrnceKey ' + Referencekey);
                // create folder
                var folderObject = {
                    FolderName: Referencekey,
                    EntityKey: Referencekey,
                    EntityType: 'Person'
                };
                   dataService.insert(folderObject, '`3ilAppBase01.dms`', config.OFFLINE_DBNAME, config.API_URL + 'dms/folders').then(function (folderResponse) {
                    var folderKey = folderResponse.data[0][0].FolderKey;

                    // create file
                    var file = userObj.file;
                    var fileObj = {};
                    fileObj.fileBase64Data = 'data:' + file.filetype + ';base64,' + file.base64;
                    fileObj.fileName = file.filename;
                    fileObj.fileSize = file.filesize;
                    fileObj.fileType = file.filetype;

                      dataService.insert(fileObj, '`3ilAppBase01.dms`', config.OFFLINE_DBNAME, config.API_URL + 'dms/folders/' + folderKey + '/files').then(function (fileResponse) {
                        var fileKey = fileResponse.data[0][0].Filekey

                        var personUpdateObj = {
                            "firstName": userObj.firstName,
                            "lastName": userObj.lastName,
                            "folderKey": folderKey,
                            "n3DMSFileKey": fileKey
                        }

                        personBasicInfoLogic.updatePerson(personUpdateObj, Referencekey).then(function (personUpdateResponse) {
                            console.log('person update response ' + JSON.stringify(personUpdateResponse))
                        })

                    })

                });
*/

    /*            var childpersons = {
                    "primaryMobileNumber": userObj.MNumber,
                    "Email": userObj.Email,
                    "firstName": userObj.firstName,
                    "middleName": userObj.middleName,
                    "lastName": userObj.lastName,
                    "gender": userObj.gender,
                    "dateOfBirth": userObj.dateOfBirth,
                    "PersonReferenceKey": Referencekey,
                    "ContactReferencekey" : userObj.contactKey,
                    "IsDeleted": 0
                    

                }
                console.log(JSON.stringify(childpersons));
                thrillAppBasePersonLogic.addChildPersonDetails(childpersons).then(function (response) {
                   // alert(response);
                    console.log(response);
                });*/


               
                //var subOrganizationKey = response.data.organizationKey;
                // var childObj={};
          /*      userObj.address.entityReferenceKey = Referencekey;
                userObj.address.entityTypeId = 2;
                userObj.address.geoLocation="NA";
                addressLogic.addAddress(userObj.address).then(function (response) {
                    appLogger.log('add address response' + JSON.stringify(response))
                })
*/
              var martialstatus = {
                    "personReferenceKey": Referencekey,
                    "maritalStatusTypeId": userObj.mStatus,
                    "PersonId": null,
                    "IsDeleted": 0

                }


             //   alert(JSON.stringify(martialstatus));
                PersonMaritalStatusLogic.addMaritalStatus(martialstatus, Referencekey).then(function (response) {
                   // alert('here')
                    appLogger.log('add Martial status response' + JSON.stringify(response))
                })
   /*
                var identityDetails = {
                    "identityTypeId": 1,
                    "identityNumber": userObj.aadharNumber,
                    "personReferenceKey": Referencekey
                }

                console.log(JSON.stringify(identityDetails));
                personIdentityLogic.addPersonIdentity(identityDetails, Referencekey).then(function (response) {
                    alert('Identity')

                }, function (err) {

                    appLogger.error('ERR' + err);

                });
*/
/*
                //alert(JSON.stringify(mobileno));
                var Contacts = [
                    {
                        "entityReferenceKey": Referencekey,
                        "contactSubTypeId": 2,
                        "contactInfo": mobileno,
                        "entityTypeId": 1
                        }
                    , {
                        "entityReferenceKey": Referencekey,
                        "contactSubTypeId": 3,
                        "contactInfo": userObj.Email,
                        "entityTypeId": 1
                        }
                    /*,
                                            {
                                                "entityReferenceKey": Referencekey,
                                                "contactSubTypeId": 4,
                                                "contactInfo": userObj.Fax,
                                                "entityTypeId": 1
                                            }
                            ]
                angular.forEach(Contacts, function (contactObj, index) {
                    contactLogic.addContact(contactObj).then(function (response) {
                        //console.log(response);
                    });
                    */
                    var thrillappperson = {};
                    //thrillappperson.organizationKey = "f06b36a0-3f5f-11e6-b8c3-e5f7dfeb539f";
                    thrillappperson.organizationKey = $localStorage.organizationKey
                    thrillappperson.personKey = Referencekey;
                    thrillappperson.roleId = 3;
                    thrillappperson.contactKey = userObj.contactKey;
                    console.log(JSON.stringify(thrillappperson));
                    thrillAppBasePersonLogic.addThrillPersonDetails(thrillappperson).then(function (response) {
                        console.log(response);
                    });
               // })





            });


            //FOR  Martrial Status

            //alert(JSON.stringify(userObj));
            /*
                 return dataService.insert(userObj, 'admin', '', config.API_URL + 'Security/resgisteredUser').then(function (response) {
                     return response;
                 });*/
        },

        updateChild: function (userObj) { //postUser function call

          /*  var persondetails = {};
            persondetails.firstName = userObj.firstName;
            persondetails.lastName = userObj.lastName;
            persondetails.middleName = userObj.middleName;
            persondetails.dateOfBirth = userObj.dateOfBirth;
            persondetails.GenderID = userObj.gender;
         
            var mobileno = userObj.MNumber;*/
            //persondetails.personKey = "f06b36a0-3f5f-11e6-b8c3-e5f7dfeb539f";
            // thrillappperson.PersonKey =Referencekey;
            //persondetails.roleId =userObj.Role ;
            
            
            
               var personReferenceKey = userObj.referenceKey;
            return personBasicInfoLogic.updatePerson(userObj, personReferenceKey).then(function (response) {
                // contacts saving

            // alert(response);
                
                 var martialstatus = {
                    "personReferenceKey": personReferenceKey,
                    "maritalStatusTypeId": userObj.mStatus,
                    "PersonId": null,
                    "IsDeleted": 0

                }
              //  alert(JSON.stringify(martialstatus));
                PersonMaritalStatusLogic.updateMaritalStatus(martialstatus, personReferenceKey, userObj.maritalStatusReferenceKey).then(function (response) {


                }, function (err) {
                    appLogger.error('ERR', err);
                });

               /* var Contacts = [
                    {
                        "entityReferenceKey": personReferenceKey,
                        "contactSubTypeId": 2,
                        "contactInfo": mobileno,
                        "entityTypeId": 1,
                        "referenceKey": userObj.MNumberreferenceKey
                        }
                    , {
                        "entityReferenceKey": personReferenceKey,
                        "contactSubTypeId": 3,
                        "contactInfo": userObj.Email,
                        "entityTypeId": 1,
                        "referenceKey": userObj.EmailreferenceKey
                        }*/
                    /*,
                                            {
                                                "entityReferenceKey": Referencekey,
                                                "contactSubTypeId": 4,
                                                "contactInfo": userObj.Fax,
                                                "entityTypeId": 1
                                            }
                            ]*/
               /* angular.forEach(Contacts, function (Contacts, index) {
                    console.log('update contact call' + JSON.stringify(Contacts))

                    console.log(Contacts.referenceKey);
                    if (Contacts.referenceKey == undefined || Contacts.referenceKey == "") {
                        contactLogic.addContact(Contacts).then(function (response) {
                            console.log('added contact response' + JSON.stringify(response));
                        })
                    } else {
                        contactLogic.updateContact(Contacts, Contacts.referenceKey).then(function (response) {
                            console.log('update contact response' + JSON.stringify(response));
                        });
                    }
                });*/
                
                  // For MArtial Status
               


/*

                // For Update App specific child table
                var childpersonsObj = {
                    "primaryMobileNumber": userObj.MNumber,
                    "Email": userObj.Email,
                    "firstName": userObj.firstName,
                    "middleName": userObj.middleName,
                    "lastName": userObj.lastName,
                    "gender": userObj.gender,
                    "dateOfBirth": userObj.dateOfBirth,
                    "PersonReferenceKey": personReferenceKey,
                    
                    "IsDeleted": 0

                }
                console.log(JSON.stringify(childpersonsObj));
                thrillAppBasePersonLogic.updateChildPersondetails(personReferenceKey, childpersonsObj).then(function (response) {

                }, function (err) {
                    appLogger.error('ERR', err);
                });
*/


               
                /* angular.forEach(Contacts, function (Contacts, index) {
                     console.log('update contact call' + JSON.stringify(Contacts))
                     contactLogic.updateContact(Contacts, Contacts.referenceKey).then(function (response) {
                         console.log('update contact response' + JSON.stringify(response));
                     });
                 });*/

                // For aadharNumber update

          /*      var identityDetails = {
                    "identityTypeId": 1,
                    "identityNumber": userObj.aadharNumber,
                    "personReferenceKey": personReferenceKey
                }
                personIdentityLogic.updatePersonidentity(identityDetails, personReferenceKey, userObj.identityReferenceKey).then(function (response) {


                }, function (err) {
                    appLogger.error('ERR' + err);
                });
*/

                // FOR Address

         /*       if (userObj.address.referenceKey == undefined) {
                    userObj.address.entityReferenceKey = personReferenceKey;
                    userObj.address.entityTypeId = 2;
                    addressLogic.addAddress(userObj.address).then(function (response) {
                        appLogger.log('add address response' + JSON.stringify(response))
                    })
                } else {
                    addressLogic.updateAddress(userObj.address, userObj.address.referenceKey).then(function (response) {
                        appLogger.log('update address response' + JSON.stringify(response))
                    })
                }
*/
                // alert(JSON.stringify(userObj.file.base64));
/*                if (userObj.file != undefined && userObj.file != null) {

                    var folderObject = {
                        FolderName: personReferenceKey,
                        EntityKey: personReferenceKey,
                        EntityType: 'Person'
                    };
                    dataService.insert(folderObject, '', '', 'http://Localhost:2424/V1/Dms/folders').then(function (folderResponse) {
                        var folderKey = folderResponse.data[0][0].FolderKey;

                        // create file
                        var file = userObj.file;
                        var fileObj = {};
                        fileObj.fileBase64Data = 'data:' + file.filetype + ';base64,' + file.base64;
                        fileObj.fileName = file.filename;
                        fileObj.fileSize = file.filesize;
                        fileObj.fileType = file.filetype;

                        dataService.insert(fileObj, '', '', 'http://Localhost:2424/V1/Dms/folders/' + folderKey + '/files').then(function (fileResponse) {
                            var fileKey = fileResponse.data[0][0].Filekey

                            var personUpdateObj = {
                                "firstName": userObj.firstName,
                                "lastName": userObj.lastName,
                                "folderKey": folderKey,
                                "n3DMSFileKey": fileKey
                            }

                            personBasicInfoLogic.updatePerson(personUpdateObj, personReferenceKey).then(function (personUpdateResponse) {
                                console.log('person update response ' + JSON.stringify(personUpdateResponse))
                            })

                        })

                    });
                } else {
                    /*    alert('image not uploaded');
                }*/

                //  getPerson(personReferenceKey);
            }, function (err) {
                appLogger.error('ERR', err);
            });
            //  updatePerson


        },

        getChildProfilePicture: function (folderKey, fileKey) {

            return dataService.callAPI('http://Localhost:2424/V1/Dms/folders/' + folderKey + '/files/' + fileKey, [], 'GET').then(function (response) {
                return response.data[0][0];
            });
        }

        ,
    };
});
/* Registration logic  end */