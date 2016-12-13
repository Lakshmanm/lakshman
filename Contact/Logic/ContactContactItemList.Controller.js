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

	 var app  = angular.module('ThrillContact.contactContactItemList', ['ThrillContact.contactContactItemLogic'
			// , 'ThrillContact.masterDataLogic'
			 , 'ngCordova'
			 , 'ThrillFrameworkLibrary.geo'
			 , 'ThrillFrameworkLibrary.Network'
			 , 'ThrillCnnWebClient.appConfig'
			 , 'ThrillFrameworkLibrary.appLogger'
	])
    /*Setup contactContactItem Controller */
	 app.controller('ContactContactItemListController', function ($scope, $http, 
	 	contactContactItemLogic,  $state, $stateParams, appConfig, appLogger,$location) {
             
              $scope.$on('$ionicView.enter', function () {	 
	 	
	 	
		 getLabels(appConfig.CULTURE_NAME);
		 getMessages(appConfig.CULTURE_NAME);
		 var contactKey='d58d7570-42aa-11e6-9b6c-31ac8e099c89';
		 var contactItemKey=$stateParams.contactItemKey;
		

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

	 if (appConfig.APP_MODE == 'offline')
		{
			 var contactItemKey = DrawCaptcha();
		}
	 var contactItemEntityKey;

    /*Perform the CRUD (Create, Read, Update & Delete) operations of contact ContactItem*/
      /*Method for calling  add contact ContactItem */
	

	
/*Method for  retrieving  contact ContactItem details*/

 /*Method for  contact type-- Drop Down*/
    var contactType = function() {
        contactContactItemLogic.getContactTypes().then(function(response) {
            $scope.contactTypeList = response;
        }, function(err) {

            appLogger.error(err.message);

        });

    };

    contactType();

    /*Method for contact items*/
    var getAllContactItems = function (contactKey) {
       
        contactContactItemLogic.getAllContactItems(contactKey).then(function (response) {
        	//alert(JSON.stringify(response))
        	
            $scope.contactItems = response;
			
        }, function (err) {

            appLogger.error(err.message);

        });

    };
    getAllContactItems(contactKey);



	 /*Method for calling  deleting  contact ContactItem*/
	 $scope.deleteContactItem = function (contactItemKey) {
		 contactContactItemLogic.deleteContactContactItem(contactKey , contactItemKey).then(function (response) {
			 appLogger.alert($scope.alertMessageLabels.contactDeleted);
		 getAllContactItems(contactKey);
			 }, function (err) {
				 appLogger.error('ERR', err);
			 });
		 };
              });

}); // End of App Controller

