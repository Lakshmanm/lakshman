/*=======================================================================
 All rights reserved to Thrill Innovative Labs.
 THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
 OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
 LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
 FITNESS FOR A PARTICULAR PURPOSE.
===========================================================================
****************************************************************************
 Name                : personInsurance.Logic.js
 Type                : Angular js
 Description         : This file contains business logic methods
 References          :
 Author              : Durga Prasad
 Created Date        : 19-Apr-2016
****************************************************************************
MODIFICATION LOG
**************************************************************************** 
S.No.   Ver	       Date	         Modified By			Description
1       1.0        29-04-2016    Satya Kalyani Lanka    referenceKey concept implemented
****************************************************************************  
Code Review LOG
**************************************************************************** 
Sno# Ver        Date                Code Review By            Observations
****************************************************************************
*/

var app = angular.module('ThrillPerson.personInsuranceLogic', ['ThrillFrameworkLibrary.DataService'
                                                                
    , 'ThrillPerson.personQueries'
                                                                
    , 'ThrillPerson.Config'
     ,'ThrillAppBase.config'                                                             
                                                                
    , 'ThrillCnnWebClient.appConfig'
                                                                
    , 'ThrillFrameworkLibrary.appLogger'])

//Create Business Logic Factory Method for personWorkExperienceLogic


.factory('personInsuranceLogic', function ($http
    , dataService
    , personQueries
    ,config
    , personconfig, appConfig
    , appLogger) {


    return {

        //CRUD Operations for personInsurance Details

        //Method for adding insurance
        addInsurance: function (insuranceObj, personReferenceKey) {
            
      var folderObj = {
                        FolderName: personReferenceKey
                        , EntityKey: personReferenceKey
                        , EntityType: "Organization"
                    };
                var folderKey;
                var fileKey;
                 //  var folderKey = organizationObj.basicInfo.folderKey;
                 //   var fileKey = organizationObj.basicInfo.n3DMSFileKey;
  return dataService.insert(folderObj, '`3ilAppBase01.dms`', config.OFFLINE_DBNAME, config.API_URL + 'dms/folders').then(function (response) {
                       
           appLogger.log('folder response ' + JSON.stringify(response));
                        if (response.data[0][0].FolderKey != undefined) {
                            folderKey = response.data[0][0].FolderKey;
                        }
                        var postFileObj = {};
                        postFileObj.fileBase64Data = 'data:' + insuranceObj.documents.filetype + ';base64,' + insuranceObj.documents.base64;
                        postFileObj.fileName = insuranceObj.documents.filename;
                        postFileObj.fileSize = insuranceObj.documents.filesize;
                        postFileObj.fileType = insuranceObj.documents.filetype;
 return dataService.insert(postFileObj, '`3ilAppBase01.dms`', config.OFFLINE_DBNAME, config.API_URL + 'dms/folders/' + folderKey + '/files').then(function (response) {
                            appLogger.log('file response ' + JSON.stringify(response));
                            fileKey = response.data[0][0].Filekey;
                          
                            insuranceObj.n3DMSFileKey = fileKey;
                            delete insuranceObj.documents;
  return dataService.insert(insuranceObj, '`person.insurance`', personconfig.OFFLINE_DBNAME, personconfig.API_URL + 'persons/' + personReferenceKey + '/insurances').then(function (response) {
                return response;
            });        
                         
                        });
                    });
            
                   
            

           
        },







        //Logic to get Insurance types
        getInsuranceTypes: function () {


            if (appConfig.APP_MODE == 'offline') {
                var query = personQueries.insuranceTypes;

                return dataService.executeQuery(query, personconfig.OFFLINE_DBNAME).then(function (response) {
                    var insuranceTypes = [];
                    for (var i = 0; i < response.rows.length; i++) {


                        var insuranceTypesObj = {
                            insuranceTypeId: response.rows.item(i).insuranceTypeId
                            , insuranceTypeName: response.rows.item(i).insuranceTypeName
                        };
                        insuranceTypes.push(insuranceTypesObj);

                    }

                    return insuranceTypes;
                });
            } else {
                return dataService.callAPI(personconfig.API_URL + 'insuranceTypes', [], 'GET').then(function (response) {
                    return response.data;
                });
            }
        },

        //Logic to get nomineeid
        getNomineeId: function (nomineeObj) {
            appLogger.log(JSON.stringify(nomineeObj))
            return dataService.insert(nomineeObj, '`person.persons`', personconfig.OFFLINE_DBNAME, personconfig.API_URL + 'studentPersons').then(function (response) {
                return response;
            });

        },


        //Logic to update Insurancenominee


        updateNominee: function (nomineeObj, personReferenceKey) {
            console.log(nomineeObj);
            console.log('referenceKey=' + "'" + personReferenceKey + "'");
            return dataService.update(nomineeObj, 'referenceKey=' + "'" + personReferenceKey + "'", '`person.persons`', personconfig.OFFLINE_DBNAME, personconfig.API_URL + 'persons/' + personReferenceKey).then(function (response) {
                return response;
            });




        },

        // Logic to udpate Insurance
        updateInsurance: function (insuranceObj, personReferencekey, insuranceReferenceKey) {
  var folderObj = {
                        FolderName: personReferencekey
                        , EntityKey: personReferencekey
                        , EntityType: "Organization"
                    };
                var folderKey;
                var fileKey;
                 //  var folderKey = organizationObj.basicInfo.folderKey;
                 //   var fileKey = organizationObj.basicInfo.n3DMSFileKey;
  return dataService.insert(folderObj, '`3ilAppBase01.dms`', config.OFFLINE_DBNAME, config.API_URL + 'dms/folders').then(function (response) {
                       
           appLogger.log('folder response ' + JSON.stringify(response));
                        if (response.data[0][0].FolderKey != undefined) {
                            folderKey = response.data[0][0].FolderKey;
                        }
                        var postFileObj = {};
                        postFileObj.fileBase64Data = 'data:' + insuranceObj.documents.filetype + ';base64,' + insuranceObj.documents.base64;
                        postFileObj.fileName = insuranceObj.documents.filename;
                        postFileObj.fileSize = insuranceObj.documents.filesize;
                        postFileObj.fileType = insuranceObj.documents.filetype;
 return dataService.insert(postFileObj, '`3ilAppBase01.dms`', config.OFFLINE_DBNAME, config.API_URL + 'dms/folders/' + folderKey + '/files').then(function (response) {
                            appLogger.log('file response ' + JSON.stringify(response));
                            fileKey = response.data[0][0].Filekey;
                          
                            insuranceObj.n3DMSFileKey = fileKey;
                            delete insuranceObj.documents;
   
            return dataService.update(insuranceObj, 'referenceKey=' + "'" + insuranceReferenceKey + "'", '`person.insurance`', personconfig.OFFLINE_DBNAME, personconfig.API_URL + 'persons/' + personReferencekey + '/insurances/' + insuranceReferenceKey).then(function (response) {
                return response;
            });
                          
                         
                        });
                    });
            



        },



        //Logic to get Insurancelist 

        getInsuranceList: function (personReferenceKey) {

            if (appConfig.APP_MODE == 'offline') {
                var query = personQueries.insuranceList + "'" + personReferenceKey + "'";

                return dataService.executeQuery(query, personconfig.OFFLINE_DBNAME).then(function (response) {
                    var insuranceList = [];

                    for (var i = 0; i < response.rows.length; i++) {
                        var insuranceListObj = {
                            referenceKey: response.rows.item(i).referenceKey
                            , InsuranceName: response.rows.item(i).InsuranceName
                            , InsuranceNumber: response.rows.item(i).InsuranceNumber
                            , InsuranceTypeId: response.rows.item(i).InsuranceTypeId
                            , StartDate: response.rows.item(i).StartDate
                            , EndDate: response.rows.item(i).EndDate
                            , InsuranceCompany: response.rows.item(i).InsuranceCompany
                            , CoverageDetails: response.rows.item(i).CoverageDetails
                            , personId: response.rows.item(i).personId
                            , nomineePersonId: response.rows.item(i).nomineePersonId
                            , isDeleted: response.rows.item(i).isDeleted

                        };
                        insuranceList.push(insuranceListObj);

                    }

                    return insuranceList;
                });
            } else {

                return dataService.callAPI(personconfig.API_URL + 'persons/' + personReferenceKey + '/insurances', [], 'GET').then(function (response) {
                    return response.data;
                })

            }



        }, //logic to get insuraceListById

        getInsuranceListByID: function (personReferenceKey, insuranceReferenceKey) {

            if (appConfig.APP_MODE == 'offline') {

                var query = personQueries.insuranceById + "'" + insuranceReferenceKey + "'";

                return dataService.executeQuery(query, personconfig.OFFLINE_DBNAME).then(function (response) {
                    console.log(response);

                    var insuranceObj = {};
                    var insurancemain = [];
                    for (var i = 0; i < response.rows.length; i++) {

                        insuranceObj = {
                            referenceKey: response.rows.item(i).referenceKey
                            , personReferenceKey: response.rows.item(i).personReferenceKey
                            , InsuranceName: response.rows.item(i).InsuranceName
                            , InsuranceNumber: response.rows.item(i).InsuranceNumber
                            , InsuranceTypeId: response.rows.item(i).InsuranceTypeId
                            , nomineePersonId: response.rows.item(i).NomineePersonId
                            , nomineeReferenceKey: response.rows.item(i).nomineeReferenceKey
                            , StartDate: response.rows.item(i).StartDate
                            , EndDate: response.rows.item(i).EndDate
                            , CoverageDetails: response.rows.item(i).CoverageDetails
                            , InsuranceCompany: response.rows.item(i).InsuranceCompany
                            , FirstName: response.rows.item(i).firstName


                        };

                        insurancemain.push(insuranceObj);

                    }


                    return insurancemain;



                });

            } else {
                appLogger.log(personconfig.API_URL + 'persons/' + personReferenceKey + '/insurances/' + insuranceReferenceKey);
                return dataService.callAPI(personconfig.API_URL + 'persons/' + personReferenceKey + '/insurances/' + insuranceReferenceKey, [], 'GET').then(function (response) {
                    return response.data;
                })
            }


        },


        //Logic for deleting insurance using insuranceid
        deleteInsurance: function (personReferenceKey, insuranceReferenceKey) {
            return dataService.delete('referenceKey=' + "'" + insuranceReferenceKey + "'", '`person.insurance`', personconfig.OFFLINE_DBNAME, personconfig.API_URL + 'persons/' + personReferenceKey + '/insurances/' + insuranceReferenceKey).then(function (response) {
                return response;
            });
        },



    }
});