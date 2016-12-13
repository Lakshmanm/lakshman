/*//=============================================================================
// All rights reserved to Thrill Innovative Labs.
// THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
// OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
// LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
// FITNESS FOR A PARTICULAR PURPOSE.
//=============================================================================
//*****************************************************************************
//* Name		    	: Contact.Controller.js 
//* Type		    	: Angular JS File
//* Description		    :
//* References		    :
//* Author	    		:
//* Created Date        : 
//*****************************************************************************
//*                             MODIFICATION LOG
//*****************************************************************************
//*  S.No  Ver	     Date	         Modified By			Description

//*****************************************************************************
//*                             Code Review LOG
//*****************************************************************************

//*****************************************************************************
*/

var app = angular.module('ThrillContact.contact', ['ThrillContact.contactLogic', 'ngCordova', 'ThrillFrameworkLibrary.geo', 'ThrillFrameworkLibrary.Network', 'ThrillCnnWebClient.appConfig', 'ThrillFrameworkLibrary.appLogger'])
    /*Setup contact Controller */
app.controller('ContactController', function($scope, $http, contactLogic, $state, $stateParams, appConfig, appLogger) {

    getLabels(appConfig.CULTURE_NAME);
    getMessages(appConfig.CULTURE_NAME);
    $scope.entityContact = {};

    /*get labels with selected language*/
    function getLabels(cultureName) {
        var currentFileName = "Contact";
        $http.get("Contact/Languages/" + currentFileName + "." + cultureName + ".json").then(function(response) {

            bindLabels(response.data);

        });
    }

    function getMessages(cultureName) {
        var alertMessageName = "AlertMessages";

        $http.get("Contact/Languages/" + alertMessageName + "." + cultureName + ".json").then(function(response) {
            $scope.alertMessageLabels = response.data.messages;
        });
    }

    /*bind labels with selected language */
    function bindLabels(data) {

        $scope.labelsContact = data.labels;

    };

    var entitykey = DrawCaptcha();
    var contactEntityKey;

    /*Perform the CRUD (Create, Read, Update & Delete) operations of Contact*/
    /*Method for calling  add Contact */
    $scope.addContact = function() {
        if (appConfig.APP_MODE == 'offline') {
            $scope.entityContact.contactKey = entitykey;
        }
        $scope.entityContact.isDeleted = 0;
        $scope.entityContact.isActive = 1;
        $scope.entityContact.createdUserKey = $localStorage.userKey;
        $scope.entityContact.createdAppKey = $localStorage.appKey;
        $scope.entityContact.createdDateTime = new Date();

        contactLogic.addContact($scope.entityContact).then(function(response) {
            appLogger.alert($scope.alertMessageLabels.contactSaved);
            $state.go('ContactList');
        }, function(err) {
            appLogger.error('ERR', err);
        });
    };

    /*Method for calling  update Contact*/
    $scope.updateContact = function() {
        $scope.entitycontact.lastUpdatedUserKey = $localStorage.userKey;
        $scope.entitycontact.lastUpdatedAppKey = $localStorage.appKey;
        $scope.entitycontact.lastUpdatedDateTime = new Date();

        contactLogic.updateContact($scope.entitycontact, $stateParams.referenceKey).then(function(response) {
            appLogger.alert($scope.alertMessageLabels.contactUpdated);
        }, function(err) {
            appLogger.error('ERR', err);
        });
    };

    /*Method for  retrieving  Contact details*/
    if ($stateParams.entityKey) {
        contactLogic.getContactByContactKey($stateParams.entityKey).then(function(response) {
            $scope.entityContact = response[0];
            $scope.entityContact.contactKey = response[0].contactKey;
        }, function(err) {
            appLogger.error('ERR', err);
        });
    }

}); // End of App Controller