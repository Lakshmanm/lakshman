/*//=============================================================================
// All rights reserved to Thrill Innovative Labs.
// THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
// OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
// LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
// FITNESS FOR A PARTICULAR PURPOSE.
//=============================================================================
//*****************************************************************************
//* Name		    	: SubjectComponentList.Controller.js 
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

	 var app  = angular.module('ThrillAcademic.subjectComponentList', ['ThrillAcademic.subjectComponentLogic'
			 //, 'ThrillAcademic.masterDataLogic'
			 , 'ngCordova'
			 , 'ThrillFrameworkLibrary.geo'
			 , 'ThrillFrameworkLibrary.Network'
			 , 'ThrillCnnWebClient.appConfig'
			 , 'ThrillFrameworkLibrary.appLogger'
	])
    /*Setup subjectComponent Controller */
	 app.controller('SubjectComponentListController', function ($scope, $http, subjectComponentLogic,  appConfig, appLogger) {
		 getLabels(appConfig.CULTURE_NAME);
		 getMessages(appConfig.CULTURE_NAME);

/*get labels with selected language*/
    function getLabels(cultureName) {
        var currentFileName = "SubjectComponent";
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
		 var labels = {
		 subjectComponentTitle: data.labels.subjectComponentTitle,
		 minimumSubjects: data.labels.minimumSubjects,
		 maximumSubjects: data.labels.maximumSubjects,
		 edit: data.labels.edit,
		 delete: data.labels.delete,
		 subjectComponentList: data.labels.subjectComponentList,
		 subjectComponentHeading: data.labels.subjectComponentHeading
	 };

	 $scope.labelsSubjectComponent = labels;

};
		 var refresh = function () {
			 subjectComponentLogic.getAllSubjectComponents().then(function (response) {
			 	//console.log(JSON.stringify(response));
				 $scope.subjectComponentCollection = response;
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


	 /*Method for calling  deleting   SubjectComponent*/
	 $scope.deleteSubjectComponent = function (subjectComponentEntityKey) {
	 	var del = confirm("Are you sure you want to Delete ?");
	 	if(del==true)
	 	{
		 subjectComponentLogic.deleteSubjectComponent(subjectComponentEntityKey).then(function (response) {
			 alert("Deleted Successfully");
		 refresh();
			 }, function (err) {
				 appLogger.error('ERR', err);
			 });
		}
		 };

}); // End of App Controller

