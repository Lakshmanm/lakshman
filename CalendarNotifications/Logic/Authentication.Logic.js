/*=======================================================================
 All rights reserved to Nunet Cube Software Solutions.
 THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
 OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
 LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
 FITNESS FOR A PARTICULAR PURPOSE.
===========================================================================
****************************************************************************
 Name                : Authentication.Logic
 Type                : Angular Js  
 Description         : Define user authentication bussiness logic
 References          : https://angularjs.org/
 Author              : Thriveni Yalavarthi
 Created Date        : 07-Apr-2016
****************************************************************************
MODIFICATION LOG
**************************************************************************** 
Ver	Date	     Modified By			Description
1.  06-04-2016   Thriveni Yalavarthi    Define user authentication bussiness logic
2.  12-04-2016   Jagadeesh Adigarlla    Changed API calls 
****************************************************************************  
Code Review LOG
**************************************************************************** 

S.No      Ver        Date                Code Review By            Observations
1         1.0       17-April-2016         Sri Venkatesh.T          Write comments for userForgotPassword: function (userForgotPasswordEmail)  
****************************************************************************
*/

angular.module('ThrillCNN.AuthenticationLogic',
                        ['ThrillFrameworkLibrary.DataService', 
                        'ThrillCNN.CNNQueries', 
                         'ThrillCNN.config', 
                       'ThrillCnnWebClient.appConfig', 
                        'ThrillFrameworkLibrary.appLogger'
                        
                        ]
                        )
    /*Create Business Logic Factory Method */

.factory('authenticationLogic', 
    function ($http, 
        dataService, 
        CNNQueries, 
        cnnconfig, 
        appConfig, 
        appLogger) {


    return {
        /*Login and Forgot password Operations for User */
        userLogin: function (userLoginInfoObj) {
            appLogger.log("userLoginInfo in Logic" + JSON.stringify(userLoginInfoObj));

            return dataService.insert(userLoginInfoObj, '', cnnconfig.OFFLINE_DBNAME, cnnconfig.API_URL + '/login').then(function (response) {
                appLogger.log("userLoginInfo in Response" + JSON.stringify(response));
                return response;
            });



        },
        getPersonData: function (personReferenceKey) {
            
            var getPersonUrl='http://Localhost:2424/V1/person/persons/'+personReferenceKey;
            var signupobj={};
            signupobj.referenceKey=personReferenceKey;
            
            
            return dataService.insert(signupobj, '', cnnconfig.OFFLINE_DBNAME, cnnconfig.API_URL + '/signUp').then(function (response) {
                appLogger.log("userLoginInfo in Response" + JSON.stringify(response));
                return response;
            });
            /*return dataService.callAPI(getPersonUrl, [], 'GET').then(function (response) {
                appLogger.log("Response" + JSON.stringify(response));
                    var signupobj={};
                    //signupobj.FirstName=response.data[0].firstName;
                    //signupobj.LastName=response.data[0].lastName;
                    //signupobj.middleName=response.data[0].middleName;
                    signupobj.referenceKey=response.data[0].referenceKey;
                    return dataService.insert(signupobj, '', cnnconfig.OFFLINE_DBNAME, cnnconfig.API_URL + '/signUp').then(function (response1) {
                        appLogger.log("userLoginInfo in Response" + JSON.stringify(response1));
                        return response;
                    });
                
                
                return response;
            });*/



        },
        userForgotPassword: function (userForgotPasswordEmail) {
            //appLogger.log("userForgotPasswordEmail in Logic" + JSON.stringify(userForgotPasswordEmail));

            return dataService.callAPI(cnnconfig.API_URL + '/forgotPasswordSendEmail/' + userForgotPasswordEmail, [], 'GET').then(function (response) {
                return response;
            });


        }


        
    };
});