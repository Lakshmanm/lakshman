/*=======================================================================
 All rights reserved to Thrill Innovative Labs.
 THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
 OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
 LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
 FITNESS FOR A PARTICULAR PURPOSE.
===========================================================================
****************************************************************************
 Name                : personBasicInfoLogic
 Type                : Angular js
 Description         : This file contains business logic methods
 References          :
 Author              : Satyanarayana
 Created Date        : 07-Apr-2016
****************************************************************************
MODIFICATION LOG
**************************************************************************** 
Ver	Date	     Modified By			Description
****************************************************************************  
Code Review LOG
**************************************************************************** 
S.No    Ver    Date           Code Review By   Observations
1.      1.0    14-Apr-2016    Ch.Rajaji        Arrange dependency modules line by line in the factory declaration.

****************************************************************************
*/

var app = angular.module('ThrillPerson.personBasicInfoLogic', ['ThrillFrameworkLibrary.DataService'
                                                           
        , 'ThrillPerson.personQueries'
                                                           
        , 'ThrillPerson.Config'
                                                           
        , 'ThrillCnnWebClient.appConfig', 'ThrillFrameworkLibrary.appLogger'])
    //Create Business Logic Factory Method 

.factory('personBasicInfoLogic', function ($http
    , dataService
    , personQueries
    , personconfig
    , appConfig
    , appLogger) {


    return {
        //CRUD Operations for person Details

        //Method for adding location
        addLocation: function (locationObj, personReferenceKey) {
            return dataService.insert(locationObj, '`person.locations`', personconfig.OFFLINE_DBNAME, personconfig.API_URL +  '/locations').then(function (response) {
                return response;
            });

        },

        //Method for updating location
        updateLocation: function (locationObj, personReferenceKey, locationId) {
            return dataService.update(locationObj, 'locationId=' + locationId, '`person.locations`', personconfig.OFFLINE_DBNAME, personconfig.API_URL + '/locations/' + locationId).then(function (response) {
                return response;
            });

        },

        //Method for adding person
        addPerson: function (personBasicInfoObj){
        console.log(personBasicInfoObj);
          personBasicInfoObj.dateOfBirth = new Date(personBasicInfoObj.dateOfBirth);
           // console.log(personBasicInfoObj);
            return dataService.insert(personBasicInfoObj, '`person.persons`', personconfig.OFFLINE_DBNAME, personconfig.API_URL + 'persons').then(function (response) {
                return response;
            });
        },
  addStudentPerson: function (personStudentObj){
        
          //personBasicInfoObj.dateOfBirth = new Date(personBasicInfoObj.dateOfBirth);
           // console.log(personBasicInfoObj);
            return dataService.insert(personStudentObj, '`person.persons`', personconfig.OFFLINE_DBNAME, personconfig.API_URL + 'studentPersons').then(function (response) {
                return response;
            });
        },

 updateStudentPerson: function (personBasicInfoObj, personReferenceKey) {
            return dataService.update(personBasicInfoObj, 'ReferenceKey=' + "'" + personReferenceKey + "'", '`person.persons`', personconfig.OFFLINE_DBNAME, personconfig.API_URL + 'studentPersons/' + personReferenceKey).then(function (response) {
                return response;
            });
        },


        //Method for updating person by person Id
        updatePerson: function (personBasicInfoObj, personReferenceKey) {
            return dataService.update(personBasicInfoObj, 'referenceKey=' + "'" + personReferenceKey + "'", '`person.persons`', personconfig.OFFLINE_DBNAME, personconfig.API_URL + 'persons/' + personReferenceKey).then(function (response) {
                return response;
            });
        },

        //Method for get blood groups
        getBloodGroups: function () {

            if (appConfig.APP_MODE == 'offline') {
                var query = personQueries.bloodGroups;

                return dataService.executeQuery(query, personconfig.OFFLINE_DBNAME).then(function (response) {
                    var bloodGroups = [];
                    for (var i = 0; i < response.rows.length; i++) {
                        var bloodGroupObj = {
                            bloodGroupId: response.rows.item(i).bloodGroupId
                            , bloodGroupName: response.rows.item(i).bloodGroupName
                        };
                        bloodGroups.push(bloodGroupObj);

                    }
                    return bloodGroups;
                });
            } else {

                return dataService.callAPI(personconfig.API_URL + 'bloodGroups', [], 'GET').then(function (response) {
                    return response.data;
                });
            }

        },

addStaffPerson: function (staffObj){
     return dataService.insert(staffObj, '`person.persons`', personconfig.OFFLINE_DBNAME, personconfig.API_URL + 'staffPersons').then(function (response) {
               // alert(JSON.stringify(response));
                return response;
            });
        },


  // updateStaffPerson: function (personBasicInfoObj, personReferenceKey) {

  //      return dataService.update(personBasicInfoObj, 'personReferenceKey=' + "'" + personReferenceKey + "'",  '`person.persons`', personconfig.OFFLINE_DBNAME, personconfig.API_URL + 'staffPersons/' + personReferenceKey).then(function (response) {

  //      return response;
  //           });
  //       },

  updateStaffPerson: function (locationObj, personReferenceKey) {
            return dataService.update(locationObj, 'personReferenceKey=' + personReferenceKey, '`person.persons`', personconfig.OFFLINE_DBNAME, personconfig.API_URL + 'staffPersons/' + personReferenceKey).then(function (response) {
                return response;
            });

        },

        //Method for get genders
        getGenders: function () {
            return [{
                genderId: 1
                , title: 'Male'
            }, {
                genderId: 2
                , title: 'Female'
            }];
        },

        //Method for retrieving person details by person Id
        getPersonBasicInfoById: function (personReferenceKey) {

            if (appConfig.APP_MODE == 'offline') {

                var query = personQueries.personBasicInfoById + "'" + personReferenceKey + "'";
                return dataService.executeQuery(query, personconfig.OFFLINE_DBNAME).then(function (response) {
                    var personObj = {};

                    if (response.rows.length == 1) {
                        personObj = {
                            referenceKey: response.rows.item(0).referenceKey
                            , firstName: response.rows.item(0).firstName
                            , middleName: response.rows.item(0).middleName
                            , lastName: response.rows.item(0).lastName
                            , dateOfBirth: new Date(response.rows.item(0).dateOfBirth)
                            , genderId: response.rows.item(0).genderId
                            , placeOfBirth: response.rows.item(0).placeOfBirth
                            , identificationMarks: response.rows.item(0).identificationMarks
                            , bloodGroupId: response.rows.item(0).bloodGroupId
                            , folderKey: response.rows.item(0).folderKey
                            , n3DMSFileKey: response.rows.item(0).n3DMSFileKey
                            , locationId: response.rows.item(0).locationId
                            , geoLocation: response.rows.item(0).geoLocation
                        };
                    }

                    return personObj;
                });
            } else {
                appLogger.log(personconfig.API_URL + 'persons/' + personReferenceKey);

                return dataService.callAPI(personconfig.API_URL + 'persons/' + personReferenceKey, [], 'GET').then(function (response) {

                    appLogger.log("res" + JSON.stringify(response));
                    response.data[0].dateOfBirth = new Date(response.data[0].dateOfBirth);
                    return response.data[0];
                });
            }
        }
        , /////////////person details by using multiple person Keys
        getPersonsByIds: function (personReferenceKeys) {

            if (appConfig.APP_MODE == 'offline') {

                var query = personQueries.getPersonsByIds(personReferenceKeys);
                return dataService.executeQuery(query, personconfig.OFFLINE_DBNAME).then(function (response) {
                    appLogger.log(response);
                    var personObj = {};

                    if (response.rows.length == 1) {
                        personObj = {
                            referenceKey: response.rows.item(0).referenceKey
                            , firstName: response.rows.item(0).firstName,

                        };
                    }

                    return personObj;
                });
            } else {

                 appLogger.log('ids url '+personconfig.API_URL + 'persons/Ids/' + personReferenceKeys); 
                return dataService.callAPI(personconfig.API_URL + 'persons/Ids/' + personReferenceKeys, [], 'GET').then(function (response) {
                  //  response.data[0].dateOfBirth = new Date(response.data[0].dateOfBirth);
                    return response.data;
                });
            }
        }
        , /*** Document managements system methods ***/

        //Method for creating a folder
        createFolder: function (stringFolderName) {
            var folderObj = {
                folderName: stringFolderName
            };
            return $http.post(personconfig.DMS_URL + '/folders', folderObj).then(function (response) {
                return response;
            })
        },

        //Method for uploading a file
        uploadFile: function (fileObj, folderKey) {
            var postFileObj = {};

            postFileObj.Filebase64data = 'data:' + fileObj.filetype + ';base64,' + fileObj.base64;
            postFileObj.Filename = fileObj.filename;
            postFileObj.Filesize = fileObj.filesize;
            postFileObj.Filetype = fileObj.filetype;
            postFileObj.Folderkey = folderKey;
            var returnData = $http.post(personconfig.DMS_URL + '/file', postFileObj).success(function (res) {
                //alert(JSON.stringify(res));

                return res;
            });

            return returnData;
        },

        //Method for download a file
        downloadFile: function (fileKey) {
            // alert('download called')
            $http.get(serviceURL_DMS + '/download/' + fileKey).success(function (res) {
                //alert(JSON.stringify(res));

                var fileName = res.data[0][0].FileName;
                var base64data = res.data[0][0].FileBin;
                //FileDownloadGlobalFunction(Filename, base64data);
                var element = document.createElement('a');
                element.setAttribute('href', base64data);
                element.setAttribute('download', fileName);

                element.style.display = 'none';
                document.body.appendChild(element);

                element.click();
                document.body.removeChild(element);
            });


            var test = $http.get('data.json').success(function (res) {
                return res;
            });
            return test;
        }


    }
});