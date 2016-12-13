/*//=============================================================================
// All rights reserved to Thrill Innovative Labs.
// THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
// OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
// LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
// FITNESS FOR A PARTICULAR PURPOSE.
//=============================================================================
//*****************************************************************************
//* Name		    	: ContactContactItem.Controller.js 
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

var app = angular.module('ThrillContact.contactContactItem', ['ThrillContact.contactContactItemLogic'
 	 // , 'ThrillContact.masterDataLogic'		 
        , 'ngCordova'	 
        , 'ThrillFrameworkLibrary.geo'	 
        , 'ThrillFrameworkLibrary.Network'	 
        , 'ThrillCnnWebClient.appConfig'	 
        , 'ThrillFrameworkLibrary.appLogger'
	])
    /*Setup contactContactItem Controller */
app.controller('ContactContactItemController', function ($scope, $http
    , contactContactItemLogic, $state, $stateParams, appConfig, appLogger, $location,$localStorage) {
		
		
	  $localStorage.userKey = "3il_User_Key";
        $localStorage.appKey = "3il_App_Key";
		
    getLabels(appConfig.CULTURE_NAME);
    getMessages(appConfig.CULTURE_NAME);
    var contactKey = 'd58d7570-42aa-11e6-9b6c-31ac8e099c89';
    var contactItemKey = $stateParams.contactItemKey;
   $scope.entityContactItem={};

    /*get labels with selected language*/
    function getLabels(cultureName) {
        var currentFileName = "Contact";
        $http.get("Contact/Languages/" + currentFileName + "." + cultureName + ".json").then(function (response) {

            bindLabels(response.data);

        });
    }

    function getMessages(cultureName) {
        var alertMessageName = "AlertMessages";

        $http.get("Contact/Languages/" + alertMessageName + "." + cultureName + ".json").then(function (response) {
            $scope.alertMessageLabels = response.data.messages;
        });
    }

    /*bind labels with selected language */
    function bindLabels(data) {

        $scope.labelsContactItem = data.labels;

    };

    if (appConfig.APP_MODE == 'offline') {
        var contactItemKey = DrawCaptcha();
    }
    var contactItemEntityKey;

    /*Perform the CRUD (Create, Read, Update & Delete) operations of contact ContactItem*/
    /*Method for calling  add contact ContactItem */
    $scope.addContactItem = function () {
        if (appConfig.APP_MODE == 'offline') {
            $scope.entityContactItem.contactItemKey = contactItemKey;
        }
        $scope.entityContactItem.contactKey = 'd58d7570-42aa-11e6-9b6c-31ac8e099c89';
        
         $scope.entityContactItem.isDeleted=0;
		 $scope.entityContactItem.isActive=1;
		 $scope.entityContactItem.createdUserKey = $localStorage.userKey;
         $scope.entityContactItem.createdAppKey = $localStorage.appKey;
         $scope.entityContactItem.createdDateTime = new Date();
        
        //	 console.log($scope.entityContactItem);
        contactContactItemLogic.addContactContactItem($scope.entityContactItem, $scope.entityContactItem.contactKey).then(function (response) {
            //refresh();
            appLogger.alert($scope.alertMessageLabels.contactSaved);
            $scope.entityContactItem={};
            $state.go('contactContactItemList');
            
        }, function (err) {
            appLogger.error('ERR', err);
        });
    };

    /*Method for calling  update Contact ContactItem*/
    $scope.updateContactContactItem = function () {
        // var contactItemKey = $scope.entityContactContactItem.contactItemKey;
        // var contactKey = $stateParams.contactkey;
          $scope.entityContactItem.lastUpdatedUserKey = $localStorage.userKey;
          $scope.entityContactItem.lastUpdatedAppKey = $localStorage.appKey;
          $scope.entityContactItem.lastUpdatedDateTime = new Date();
          
        contactContactItemLogic.updateContactContactItem($scope.entityContactItem, contactKey, $stateParams.contactItemKey).then(function (response) {

            appLogger.alert($scope.alertMessageLabels.contactUpdated);
             $scope.entityContactItem={};
            $state.go('contactContactItemList')
            $scope.entityContactItem = ""
        }, function (err) {
            appLogger.error('ERR', err);
        });
    };

    /*Method for  retrieving  contact ContactItem details*/

    /*Method for  contact type-- Drop Down*/
    var contactType = function () {
        contactContactItemLogic.getContactTypes().then(function (response) {
            $scope.contactTypeList = response;
        }, function (err) {

            appLogger.error(err.message);

        });

    };

    contactType();

    /*Method for  retrieving  ContactType details*/
    if ($stateParams.contactItemKey) {

        contactContactItemLogic.getContactItemByContactItemKey(contactKey, $stateParams.contactItemKey).then(function (response) {

            $scope.entityContactItem = response[0];

            $scope.entityContactItem.contactItemKey = response[0].contactItemKey;
            $scope.entityContactItem.contactItemInfo = response[0].contactItemInfo;
            $scope.entityContactItem.contactTypeKey = response[0].contactTypeKey;

        }, function (err) {
            appLogger.error('ERR', err);
        });
    }



}); // End of App Controller