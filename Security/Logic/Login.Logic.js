/*=======================================================================
  All rights reserved to Thrill Innovations Lab.
 THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
 OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
 LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
 FITNESS FOR A PARTICULAR PURPOSE.
===========================================================================
****************************************************************************
 Name		    	 : Login
 Type		    	 : Javascript and JQuery 
 Description		 : This file contains logic methods
 References		     :
 Author	    		 : Rahul Buddha
 Created Date        : 15-April-2016
****************************************************************************
MODIFICATION LOG
**************************************************************************** 
Ver	Date	     Modified By 		Description
07-Apr-2016      Rahul               Logic for login               
****************************************************************************  
Code Review LOG
**************************************************************************** 
S.No      Ver        Date                Code Review By            Observations
                    13-Apr-2016             Rahul                  Server to client establishment
1         1.0       14-April-2016         Sri Venkatesh.T          Write comments for function   "getCredentials" and for creadentials object why some properties are camel cased and pascal cased.It must be Pascal casing.          
****************************************************************************
*/
var app = angular.module('security.loginLogic', ['ThrillFrameworkLibrary.DataService'
                                                 , 'security.config'
                                                 , 'ThrillCnnWebClient.appConfig'
                                                 , 'ThrillFrameworkLibrary.appLogger']).factory('loginLogic', function ($http, dataService, securityconfig, appConfig, appLogger) {
    return {
        //Logic to the user details based on Login Details
        getCredentials: function (credentials) {
            return dataService.callAPI(securityconfig.API_URL + 'Security/userCredentials/' + credentials.EmailID + "/" + credentials.password, [], 'GET').then(function (response) {
                return response.data;
            });
        },
          getroleLogindetails: function (ReferenceKey) {
            return dataService.callAPI(securityconfig.API_URL + 'Security/roleDetails/login/' + ReferenceKey, [], 'GET').then(function (response) {
                return response.data;
            });
        }
        , encodeData: function (obj, plainText) {
            return dataService.insert(obj, 'User', 'trainee6', securityconfig.API_URL + 'Security/encode/' + plainText).then(function (response) {
                //  alert(response.data);
                return response;
            });
        }
        , decodeData: function (obj, cipherText) {
            return dataService.insert(obj, 'User', 'trainee6', securityconfig.API_URL + 'Security/decodeData/' + cipherText).then(function (response) {
                return response;
            });
        }
    }
});