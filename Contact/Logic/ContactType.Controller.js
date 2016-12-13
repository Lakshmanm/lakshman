/*//=============================================================================
// All rights reserved to Thrill Innovative Labs.
// THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
// OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
// LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
// FITNESS FOR A PARTICULAR PURPOSE.
//=============================================================================
//*****************************************************************************
//* Name		    	: ContactType.Controller.js 
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

	 var app  = angular.module('ThrillContact.contactType', ['ThrillContact.contactTypeLogic'
			// , 'ThrillContact.masterDataLogic'
			 , 'ngCordova'
			 , 'ThrillFrameworkLibrary.geo'
			 , 'ThrillFrameworkLibrary.Network'
			 , 'ThrillCnnWebClient.appConfig'
			 , 'ThrillFrameworkLibrary.appLogger'
	])
    /*Setup contactType Controller */
	 app.controller('ContactTypeController', function ($scope
	 	, $http
	 	, contactTypeLogic
	 	,  $state
	 	, $stateParams
		 ,$localStorage
	 	, appConfig
	 	, appLogger) {
	 	

		 getLabels(appConfig.CULTURE_NAME);
		 getMessages(appConfig.CULTURE_NAME);
 
         $scope.entityContactType={};
		  $localStorage.userKey = "3il_User_Key";
        $localStorage.appKey = "3il_App_Key";
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
		 
	 $scope.labelsContactType = data.labels;

};

	 var contactTypeKey = DrawCaptcha();
	 var contactTypeEntityKey;

    /*Perform the CRUD (Create, Read, Update & Delete) operations of ContactType*/
      /*Method for calling  add ContactType */
	 $scope.addContactType = function () {
	 	
		 if (appConfig.APP_MODE == 'offline') {
		 	
			 $scope.entityContactType.contactTypeKey = contactTypeKey;
		 }
		 
		 $scope.entityContactType.isDeleted=0;
		 $scope.entityContactType.isActive=1;
		 $scope.entityContactType.createdUserKey = $localStorage.userKey;
         $scope.entityContactType.createdAppKey = $localStorage.appKey;
         $scope.entityContactType.createdDateTime = new Date();
		
		 contactTypeLogic.addContactType($scope.entityContactType).then(function (response) {
			 appLogger.alert($scope.alertMessageLabels.contactSaved);
			 $scope.entityContactType={};
			 $state.go('ContactTypeList');
			 }, function (err) {
				 appLogger.error('ERR', err);
			 });
		 };

	 /*Method for calling  update ContactType*/
	 $scope.updateContactType = function () {
		 
		  $scope.entityContactType.lastUpdatedUserKey = $localStorage.userKey;
          $scope.entityContactType.lastUpdatedAppKey = $localStorage.appKey;
          $scope.entityContactType.lastUpdatedDateTime = new Date();
	 	
		 contactTypeLogic.updateContactType($scope.entityContactType, $stateParams.contactTypeKey).then(function (response) {
			 
			 appLogger.alert($scope.alertMessageLabels.contactUpdated);
			 $scope.entityContactType={};
			 $state.go('ContactTypeList');
			 
			 }, function (err) {
				 appLogger.error('ERR', err);
			 });
		 };

/*Method for  retrieving  ContactType details*/
	 if ($stateParams.contactTypeKey) {
	 
		 contactTypeLogic.getContactTypeByContactTypeKey($stateParams.contactTypeKey).then(function (response) {
			 $scope.entityContactType = response[0];
			 $scope.entityContactType.contactTypeKey = response[0].contactTypeKey;
			 $scope.entityContactType.contactTypeTitle = response[0].contactTypeTitle;
		 }, function (err) {
			 appLogger.error('ERR', err);
		 });
	 }

}); // End of App Controller

