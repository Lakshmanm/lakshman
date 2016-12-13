var app = angular.module('ThrillAppBase.childFamilyDetailslogic', ['ngCordova', 'ThrillFrameworkLibrary.DataService'
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
                                                        , 'ThrillPerson.personRelativeLogic'

    ])

.factory('ThrillAppBasechildFamilyDetails', function ($http,
    dataService,
    config,
    appConfig,
    appLogger, registrationLogic, createCalendarLogic, contactLogic, thrillAppBasePersonLogic, personWorkExperienceLogic, personBasicInfoLogic, $localStorage, personRelativeLogic) {


    return {

        addFamily: function (userObj) { //postUser function call
            // alert(JSON.stringify(userObj))
            var persondetails = {};
             var parentReferenceKey
            
            var  MobileNumber=userObj.number;
            persondetails.firstName = userObj.firstName;
            persondetails.lastName = "-";
            
            var Referencekey = userObj.personReferencekKey;
            return personRelativeLogic.addRelativePerson(persondetails).then(function (personresponse) {
              parentReferenceKey=personresponse.data.referenceKey;
                var relationTypeId;
                relationTypeId = userObj.relationTypeId;
                var relativePersonId = null;
                relativePersonId = personresponse.data.insertId;

                var personRelative = {};

                personRelative.relativePersonId = relativePersonId;
                personRelative.personReferenceKey = Referencekey;
                personRelative.relationTypeId = relationTypeId;




              //  alert(JSON.stringify(personRelative));

                personRelativeLogic.addRelative(personRelative, Referencekey).then(function (response) {
                  //  alert('details entered');
                    //appLogger.alert($scope.alertMessageLabels.relativeSaved);

                    //getRelativesList(personReferenceKey);

                }, function (err) {

                    appLogger.error('ERR', err);

                });
                //addRelative(relativePersonId);
                
                
                   var Contacts = [
                                {"entityReferenceKey":parentReferenceKey,"contactSubTypeId":2,
                                 "contactInfo":MobileNumber,
                                 "entityTypeId" :1},
                              /*  {"entityReferenceKey" :Referencekey,"contactSubTypeId":1,
                                 "contactInfo":userObj.Email,"entityTypeId" :3
                                 },
                                {"entityReferenceKey" :Referencekey,
                                 "contactSubTypeId":3,"contactInfo":userObj.Fax,"entityTypeId" :4
                                 }*/
                            ]
                           // alert(JSON.stringify(Contacts));
                           angular.forEach(Contacts, function (contactObj, index) {
                      // contactObj.entityTypeId = 2;
                      // contactObj.entityReferenceKey = organizationKey;
                       contactLogic.addContact(contactObj).then(function (response) {
                             //alert(MobileNumber);
                           //console.log(response);
                       });
                   })

            }, function (err) {
                appLogger.error('ERR' + err);
            });

            //  return aa;

        },

        updateFamily: function (userObj, referenceKey) { //postUser function call
            // alert(JSON.stringify(userObj))


            var relativePersonObj = {
                "firstName": userObj.firstName,
                "lastName": userObj.lastName
            }
            
         
            
            

            return personRelativeLogic.updateRelativePerson(relativePersonObj, userObj.relativePersonReferenceKey, userObj.childKey).then(function (response) {

                
                
                var relativeObj = {
                    "relationTypeId": userObj.relationTypeId,
                    "referenceKey": referenceKey
                };
                
                 //  alert(JSON.stringify(relativeObj));
                // alert(JSON.stringify(userObj.childKey));
               // alert(JSON.stringify(userObj.referenceKey));

                return personRelativeLogic.updateRelative(relativeObj, userObj.referenceKey,userObj.childKey).then(function (response) {
                  //alert('calling');
                                      var Contacts = [
                        {
                            "entityReferenceKey": userObj.relativePersonReferenceKey,
                            "contactSubTypeId": 2,
                            "contactInfo": userObj.number,
                            "entityTypeId": 1,
                            "referenceKey":userObj.numberferenceKey
                        }/*,
                        {
                            "entityReferenceKey": personReferenceKey,
                            "contactSubTypeId": 3,
                            "contactInfo": userObj.Email,
                            "entityTypeId": 1,
                            "referenceKey":userObj.EmailreferenceKey
                        },
                        {
                            "entityReferenceKey": Referencekey,
                            "contactSubTypeId": 4,
                            "contactInfo": userObj.Fax,
                            "entityTypeId": 1
                        }*/
                            ]
                              console.log(JSON.stringify(Contacts));
                 angular.forEach(Contacts, function (Contacts, index) {
                        console.log('update contact call' +JSON.stringify(Contacts))
                        return  contactLogic.updateContact(Contacts, Contacts.referenceKey).then(function (response) {
                            console.log('update contact response' + JSON.stringify(response));
                        });
                    });


                }, function (err) {
                    appLogger.error('ERR' + err);
                });

            }, function (err) {
                appLogger.error('ERR' + err);
            });






            //  return aa;

        },
        
         deleteRelative: function (relativekey, personKey) {
            return personRelativeLogic.deleteRelative(relativekey, personKey).then(function (response) {

                return response;

            });
        },

        

        GetRelativesById: function (relativekey, personKey) {
            return personRelativeLogic.getRelativeById(relativekey, personKey).then(function (response) {

                return response;

            });
        },








    };

});

/* Registration logic  end */