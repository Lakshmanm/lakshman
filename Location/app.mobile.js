/*===========================================================================
 All rights reserved to  Thrill Innovative Labs.
 THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
 OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
 LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
 FITNESS FOR A PARTICULAR PURPOSE.
============================================================================
****************************************************************************
 Name		    	: app.js
 Type		    	: Javascript and JQuery 
 Description		    :
 References		    :
 Author	    		: Kalyani
 Created Date       : 06-Apr-2016
****************************************************************************                          
MODIFICATION LOG
**************************************************************************** 
Ver	Date	     Modified By			Description
****************************************************************************                            
Code Review LOG
**************************************************************************** 
S.No      Ver        Date                Code Review By            Observations
1        1.0       13-April-2016         Sri Venkatesh.T           Remove the commented code if not required
****************************************************************************
*/
/* create the Root module and name it ThrillLocation also include Dependency Modules */
var ThrillLocation = angular.module('ThrillLocation', ['ionic'
    ,  'ionic-material',                                                   
    ,'ngCordova'
    ,'ngStorage'
    , 'ThrillLocation.location'
    , 'ThrillLocation.locationList'                                                  
    , 'ThrillLocation.address'
    , 'ThrillLocation.addressList'
    , 'ThrillFrameworkLibrary.appLogger'
    , 'ThrillLocation.setup']);


/* configure Application routes use route provider
stateProvider-- makes it easy to wire together controllers, view templates, and the current URL location in the browser */

ThrillLocation.config(['$stateProvider', '$urlRouterProvider'

    
    , function ($stateProvider, $urlRouterProvider) {
        $stateProvider
        .state('address', {
                url: '/address'
                , templateUrl: 'Location/Mobile/Views/Address.html'
                , controller: 'AddressController'
            })
            .state('addressList', {
                url: '/addressList'
                , templateUrl: 'Location/Mobile/Views/AddressList.html'
                , controller: 'AddressListController'
            })
            .state('address/:addressReferenceKey', {
                url: '/address/:addressReferenceKey'
                , templateUrl: 'Location/Mobile/Views/Address.html'
                , controller: 'AddressController'
            })
            .state('location', {
                url: '/location'
                , templateUrl: 'Location/Mobile/Views/Location.html'
                , controller: 'LocationController'
            })
            .state('locList', {
                url: '/locList'
                , templateUrl: 'Location/Mobile/Views/LocationList.html'
                , controller: 'locationListController'
            })
            .state('location/:locationReferenceKey', {
                url: '/location/:locationReferenceKey'
                , templateUrl: 'Location/Mobile/Views/Location.html'
                , controller: 'LocationController'
            })
            
            .state('appSetup', {
                url: '/appSetup'
                , templateUrl: 'Location/FirstTimeSetup/FirstTimeSetup.html'
                , controller: 'AppSetupMobCtrl'
            });

        /* Define Root Page of the Application */
        $urlRouterProvider.otherwise('/appSetup');
    }]);

function generateUUID() {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });

    return uuid;
};