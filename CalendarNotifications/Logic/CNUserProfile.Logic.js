/*===========================================================================
 All rights reserved to Nunet Cube Software Solutions.
 THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
 OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
 LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
 FITNESS FOR A PARTICULAR PURPOSE.
============================================================================
****************************************************************************
 Name		    	: CNUserProfile.Logic
 Type                : Angular Js  
 Description         : Define CNUserProfile bussiness logic
 References          : https://angularjs.org/
 Author              : Thriveni Yalavarthi.
 Created Date        : 06-Apr-2016
****************************************************************************                          
MODIFICATION LOG
**************************************************************************** 
Ver	Date	     Modified By			Description
1.  06-04-2016   Thriveni Yalavarthi    Define user profile bussiness logic
2.  12-04-2016   Jagadeesh Adigarlla    Changed API calls 
****************************************************************************                            
Code Review LOG
**************************************************************************** 
S.No      Ver        Date                Code Review By            Observations
1         1.0       17-April-2016         Sri Venkatesh.T          Write meaningful name for getUserProfileInfoById function param name.
1         1.0       17-April-2016         Sri Venkatesh.T          promiceA and promiceB variables are not declared for getMasterData anonymous function.
1         1.0       17-April-2016         Sri Venkatesh.T          In most of the function finalDeferred.resolve (getGenderData,getBloodGroupData etc.,) line of statement was written after the return 
                                                                   of response either succcess or failure the line of statemnets will not execute after
                                                                   return statement.Please check it once
                                                                   
****************************************************************************
*/



angular.module('ThrillCNN.CNUserProfileLogic', 
                        ['ThrillFrameworkLibrary.DataService', 
                        'ThrillCNN.config', 
                        'ThrillCnnWebClient.appConfig', 
                        'ThrillFrameworkLibrary.appLogger']
                        )

    /*Create Business Logic Factory Method */
    .factory('profileLogic', 
        function ($http, 
            dataService, 
            cnnconfig, 
            appConfig, 
            appLogger, 
            $q) {


        return {


            /*Method for retrieving employee details by employee Id*/
            getUserProfileInfoById: function (val) {

                              
                var personurl = 'http://localhost/V1/person/persons/' + val;
                /*return dataService.callAPI(cnnconfig.API_URL + '/persons/' + val, [], 'GET').then(function (response) {

                    return response.data;
                });*/
                return dataService.callAPI(personurl, [], 'GET').then(function (response) {

                    return response.data;
                });


            },
            /*Method for updating employee details*/
            updateUserProfile: function (userProfileInfoObj) {

                //appLogger.log("User Profile Info Date::" + JSON.stringify(userProfileInfoObj) + cnnconfig.API_URL + '/profileUpdate');
                return dataService.insert(userProfileInfoObj, '', cnnconfig.OFFLINE_DBNAME, cnnconfig.API_URL + '/profileUpdate').then(function (response) {
                    //appLogger.log("User Update Response" + JSON.stringify(response))
                    return response;
                });

            },
            /* Promice Method to retrieving data from 2 master tables one after other */
            getMasterData: function () {

                promiceA = getGenderData();
                promiceB = getBloodGroupData();

                return $q.all([promiceA, promiceB]).then(function (results) {
                    return results;

                })
            }
        }
        /* Promice Method for retrieving gender master data */
        function getGenderData() {

            var finalDeferred = $q.defer();
            return dataService.callAPI(cnnconfig.API_URL + '/genders', [], 'GET').then(function (response) {

                return response.data;

                finalDeferred.resolve(response);
            }, function (err) {
                finalDeferred.reject(err);
                console.error('ERR', err);

            });

            return maindeferred.promise;

        }

        /* Promice Method for retrieving bloodgroup master data */
        function getBloodGroupData() {

            var finalDeferred = $q.defer();
            return dataService.callAPI(cnnconfig.API_URL + '/bloodGroups', [], 'GET').then(function (response) {

                return response.data;

                finalDeferred.resolve(response);
            }, function (err) {
                finalDeferred.reject(err);
                console.error('ERR', err);

            });

            return maindeferred.promise;

        }
    });