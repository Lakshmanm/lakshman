/*//=============================================================================
// All rights reserved to Thrill Innovative Labs.
// THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
// OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
// LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
// FITNESS FOR A PARTICULAR PURPOSE.
//=============================================================================
//*****************************************************************************
//* Name		    	: ElectiveGroupList.Controller.js 
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

	 var app  = angular.module('ThrillAcademic.electiveGroupList', ['ThrillAcademic.electiveGroupLogic'
			
			 , 'ngCordova'
			 , 'ThrillFrameworkLibrary.geo'
			 , 'ThrillFrameworkLibrary.Network'
			 , 'ThrillCnnWebClient.appConfig'
			 , 'ThrillFrameworkLibrary.appLogger'
	])
    /*Setup electiveGroup Controller */
	 app.controller('ElectiveGroupListController', function ($scope, $http, electiveGroupLogic, appConfig, appLogger) {
		 getLabels(appConfig.CULTURE_NAME);
		 getMessages(appConfig.CULTURE_NAME);

/*get labels with selected language*/
    function getLabels(cultureName) {
        var currentFileName = "ElectiveGroupList";
        $http.get("Academic/Languages/" + currentFileName + "." + cultureName + ".json").then(function (response) {
            bindLabels(response.data);

        });
    }

    function getMessages(cultureName) {
        var alertMessageName = "AlertMessages";

        $http.get("Academic/Languages/" + alertMessageName + "." + cultureName + ".json").then(function (response) {
            $scope.alertMessageLabels = response.data.messages;
        });
    }

    /*bind labels with selected language */
	 function bindLabels(data) {
		/* var labels = {
		 electiveGroupTitle: data.labels.electiveGroupTitle,
		 minimumSubjects: data.labels.minimumSubjects,
		 maximumSubjects: data.labels.maximumSubjects,
		 edit: data.labels.edit,
		 delete: data.labels.delete,
		 electiveGroupList: data.labels.electiveGroupList,
		 electiveGroupHeading: data.labels.electiveGroupHeading
	 };*/

	 $scope.labelsElectiveGroupList = data.labels;

};
		 var refresh = function () {
			 electiveGroupLogic.getAllElectiveGroups().then(function (response) {
				 $scope.electiveGroupCollection = response;
				 console.log(response);
				
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


	 /*Method for calling  deleting   ElectiveGroup*/
	 $scope.deleteElectiveGroup = function (electiveGroupEntityKey) {
         
            var del = confirm("Are you sure you want to Delete ?");
     if(del==true)
     {
		 electiveGroupLogic.deleteElectiveGroup(electiveGroupEntityKey).then(function (response) {
			 appLogger.alert($scope.alertMessageLabels.electiveGroupDeleted);
		 refresh();
			 }, function (err) {
				 appLogger.error('ERR', err);
			 });
      }
		 };

}); // End of App Controller

