/*//=============================================================================
// All rights reserved to Thrill Innovative Labs.
// THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
// OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
// LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
// FITNESS FOR A PARTICULAR PURPOSE.
//=============================================================================
//*****************************************************************************
//* Name		    	: ContactList.Controller.js 
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

	 var app  = angular.module('ThrillContact.contactList', ['ThrillContact.contactLogic'
			// , 'ThrillContact.masterDataLogic'
			 , 'ngCordova'
			 , 'ThrillFrameworkLibrary.geo'
			 , 'ThrillFrameworkLibrary.Network'
			 , 'ThrillCnnWebClient.appConfig'
			 , 'ThrillFrameworkLibrary.appLogger'
	])
    /*Setup contact Controller */
	 app.controller('ContactListController', function ($scope
	 	, $http
	 	, contactLogic
	 	, $state
	 	, $stateParams
	 	,  appConfig
	 	, appLogger) {
			 
			  $scope.$on('$ionicView.enter', function () {	 
	 	
	 	var contactKey='d58d7570-42aa-11e6-9b6c-31ac8e099c89';


		 getLabels(appConfig.CULTURE_NAME);
		 getMessages(appConfig.CULTURE_NAME);

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
		
	 $scope.labelsContactList = data.labels;

};
		 var refresh = function () {
			 contactLogic.getAllContacts(contactKey).then(function (response) {
			 	
				 $scope.contactDetails = response;
				 $scope.sortColumn = "contactkey";
				 $scope.sortColumn = "";
				 $scope.reverseSort = false;
		 $scope.sortData = function (column) {
			 $scope.reverseSort = ($scope.sortColumn == column) ?
				 !$scope.reverseSort : false;
			 $scope.sortColumn = column;
}
			 $scope.getSortClass = function (column) {
				 if ($scope.sortColumn == column) {
					 return $scope.reverseSort ? 'arrow-down' : 'arrow-up';
				 }
			 return '';
		 }, function (err) {
			 appLogger.error('ERR', err);
			 };
		 });
	 }
		 refresh();


	 /*Method for calling  deleting   Contact*/
	 $scope.deleteContact = function (contactKey) {
		 contactLogic.deleteContact(contactKey).then(function (response) {
		 	
			 appLogger.alert($scope.alertMessageLabels.contactDeleted);
		 refresh();
			 }, function (err) {
				 appLogger.error('ERR', err);
			 });
		 };
			  })

}); // End of App Controller

