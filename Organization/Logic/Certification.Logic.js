/*=======================================================================
 All rights reserved to Thrill Innovative Labs.
 THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
 OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
 LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
 FITNESS FOR A PARTICULAR PURPOSE.
===========================================================================
****************************************************************************
 Name                : Certification.Logic 
 Type                : Javascript and JQuery 
 Description         : This file contains business logic methods
 References          :
 Author              : Naveena.Lingam
 Created Date        : 13-Apr-2016
****************************************************************************
MODIFICATION LOG
**************************************************************************** 
S.No  Ver	   Date 	         Modified By 			Description
1      1.0     13-Apr-2016       satya kalyani lanka    dependency structure changed
1      1.0     14-Apr-2016       Naveena Lingam         Change in Certification Type drop down
****************************************************************************  
Code Review LOG
**************************************************************************** 
S.No      Ver        Date                Code Review By            Observations
1         1.0       13-April-2016         Sri Venkatesh.T           "appLogger" module dependency injection which is never usedremove if not required
2         1.0       13-April-2016         Sri Venkatesh.T           function parameters must be in camel casing ex:   $scope.editCertification = function(CertificationID) in this parameter should be function(certificationID)
3         1.0       13-April-2016         Sri Venkatesh.T           Give meaningfull name for function parameters function (cetificationObj,val) is not readable. And also code comments are not there.
****************************************************************************
*/

var app = angular.module('ThrillOrganization.CertificationLogic', ['ThrillFrameworkLibrary.DataService',
        'ThrillOrganization.OrganizationQueries',
        'ThrillOrganization.config',
        'ThrillCnnWebClient.appConfig',
        'ThrillFrameworkLibrary.appLogger'
    ])
    /*create Business Logic Factory Method */
    .factory('certificationLogic',
        function($http,
            dataService,
            OrganizationQueries,
            orgconfig,
            appConfig,
            appLogger) {

            /* Get certification details from  external source(localDb or web). */
            return {

                getCertificationTypes: function(certificationTypeId) {

                    var query = OrganizationQueries.getCertificateTypes;
                    if (appConfig.APP_MODE == 'offline') {
                        return dataService.executeQuery(query, orgconfig.OFFLINE_DBNAME).then(function(response) {
                            var certBodyTypeList = [];

                            for (var i = 0; i < response.rows.length; i++) {
                                var certBodyObj = {
                                    certificationBodyTypeID: response.rows.item(i).CertificationBodyTypeID,
                                    certificationBodyTypeName: response.rows.item(i).CertificationBodyTypeName

                                };
                                certBodyTypeList.push(certBodyObj);

                            }


                            return certBodyTypeList;
                        });
                    } else {

                        return dataService.callAPI(orgconfig.API_URL + '/certificationbodytypes', [], 'GET').then(function(response) {

                            return response.data;
                        });

                    }


                },
                getCertificationListDetails: function(organizationReferenceKey) {


                    if (appConfig.APP_MODE == 'offline') {
                        var query = OrganizationQueries.getAllCertifications;
                        console.log(query);

                        return dataService.executeQuery(query, orgconfig.OFFLINE_DBNAME).then(function(response) {
                            console.log('satya');
                            var organizationList = [];

                            for (var i = 0; i < response.rows.length; i++) {
                                appLogger.log("res");
                                appLogger.log(response.rows.item(i));
                                var organizationBasicInfoObj = {

                                    certificationBodyTypeName: response.rows.item(i).CertificationBodyTypeName,
                                    certificationName: response.rows.item(i).CertificationName,
                                    validFrom: new Date(response.rows.item(i).ValidFrom).toLocaleDateString().replace('-', '/').split('T')[0].replace('-', '/'),
                                    validTo: new Date(response.rows.item(i).ValidTo).toLocaleDateString().replace('-', '/').split('T')[0].replace('-', '/'),
                                    certificationID: response.rows.item(i).CertificationID,
                                    referenceKey: response.rows.item(i).ReferenceKey,

                                };
                                organizationList.push(organizationBasicInfoObj);

                            }
                            console.log(organizationList);
                            return organizationList;
                        });
                    } else {


                        return dataService.callAPI(orgconfig.API_URL + 'organizations/' + organizationReferenceKey + '/certifications', [], 'GET').then(function(response) {


                            return response.data;
                        });

                    }


                },
                /*adding certification details*/
                addCertificationDetails: function(certificationObj, organizationReferenceKey) {


                    return dataService.insert(certificationObj, '`organization.certifications`', orgconfig.OFFLINE_DBNAME, orgconfig.API_URL + 'organizations/' + organizationReferenceKey + '/certifications').then(function(response) {
                        return response;
                    });

                },

                /* getting certification details by ID */
                getCertificationById: function(organizationReferenceKey, certificationReferenceKey) {

                    var query = OrganizationQueries.getCertificationByID + "'" + certificationReferenceKey + "'";
                    if (appConfig.APP_MODE == 'offline') {
                        return dataService.executeQuery(query, orgconfig.OFFLINE_DBNAME).then(function(response) {
                            var certificationList = [];


                            var cerBasicInfoObj = {
                                certificationBodyID: response.rows.item(0).CertificationBodyID,
                                certificationName: response.rows.item(0).CertificationName,
                                validFrom: new Date(response.rows.item(0).ValidFrom),
                                validTo: new Date(response.rows.item(0).ValidTo),
                                certificationID: response.rows.item(0).CertificationID,
                                referenceKey: response.rows.item(0).ReferenceKey,

                            };
                            certificationList.push(cerBasicInfoObj);



                            return certificationList[0];
                        });
                    } else {

                        return dataService.callAPI(orgconfig.API_URL + 'organizations/' + organizationReferenceKey + '/certifications/' + certificationReferenceKey, [], 'GET').then(function(response) {

                            response.data.ValidFrom = new Date(response.data.ValidFrom);
                            response.data.ValidFrom = new Date(response.data.ValidTo);

                            return response.data[0];
                        });

                    }


                },
                //  UPDATE CERTFIFICATION dDetails 
                updateCertification: function(certificationObj, organizationReferenceKey, certificationReferenceKey) {


                    return dataService.update(certificationObj, 'ReferenceKey=' + "'" + certificationReferenceKey + "'", '`organization.certifications`', orgconfig.OFFLINE_DBNAME, orgconfig.API_URL + 'organizations/' + organizationReferenceKey + '/certifications/' + certificationReferenceKey).then(function(response) {
                        return response;
                    });

                },

                //remove certification 
                deleteCertification: function(organizationReferenceKey, certificationReferenceKey) {


                        return dataService.delete('ReferenceKey=' + "'" + certificationReferenceKey + "'", '`organization.certifications`', orgconfig.OFFLINE_DBNAME, orgconfig.API_URL + 'organizations/' + organizationReferenceKey + '/certifications/' + certificationReferenceKey).then(function(response) {


                            return response.data;
                        });
                    }
                    // 
            };
        });