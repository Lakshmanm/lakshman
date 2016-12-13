/*//=============================================================================
// All rights reserved to Thrill Innovative Labs.
// THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
// OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
// LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
// FITNESS FOR A PARTICULAR PURPOSE.
//=============================================================================
//*****************************************************************************
//* Name		    	: SubjectMarksRangeList.Controller.js 
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

	 var app  = angular.module('ThrillAcademic.subjectMarksRangeList', ['ThrillAcademic.subjectMarksRangeLogic'
			
			 , 'ngCordova'
			 , 'ThrillFrameworkLibrary.geo'
			 , 'ThrillFrameworkLibrary.Network'
			 , 'ThrillCnnWebClient.appConfig'
			 , 'ThrillFrameworkLibrary.appLogger'
	])
    /*Setup subjectMarksRange Controller */
	 app.controller('SubjectMarksRangeListController', function ($scope, $http, subjectMarksRangeLogic,  appConfig, appLogger) {
		 getLabels(appConfig.CULTURE_NAME);
		 getMessages(appConfig.CULTURE_NAME);

/*get labels with selected language*/
    function getLabels(cultureName) {
        var currentFileName = "SubjectMarksRange";
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
		 minimumSubjects: data.labels.minimumSubjects,
		 maximumSubjects: data.labels.maximumSubjects,
		 edit: data.labels.edit,
		 delete: data.labels.delete,
		 subjectMarksRangeList: data.labels.subjectMarksRangeList,
		 subjectMarksRangeHeading: data.labels.subjectMarksRangeHeading
	 };

	 $scope.labelsSubjectMarksRange = labels;

};
		 var refresh = function () {
			 subjectMarksRangeLogic.getAllSubjectMarksRanges().then(function (response) {
				 $scope.subjectMarksRangeCollection = response;
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


	 /*Method for calling  deleting   SubjectMarksRange*/
	 $scope.deleteSubjectMarksRange = function (subjectMarksRangeEntityKey) {
	 	var del = confirm("Are you sure you want to Delete ?");
	 	if(del==true)
	 	{
		 subjectMarksRangeLogic.deleteSubjectMarksRange(subjectMarksRangeEntityKey).then(function (response) {
			alert("Deleted Successfully")
		 refresh();
			 }, function (err) {
				 appLogger.error('ERR', err);
			 });
		 }
		 };

}); // End of App Controller

