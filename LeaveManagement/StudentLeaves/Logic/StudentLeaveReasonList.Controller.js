/*//=============================================================================
// All rights reserved to Thrill Innovative Labs.
// THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
// OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
// LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
// FITNESS FOR A PARTICULAR PURPOSE.
//=============================================================================
//*****************************************************************************
//* Name		    	: StudentLeaveReasonList.Controller.js 
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

	 var app  = angular.module('ThrillStudentLeaves.studentLeaveReasonList', ['ThrillStudentLeaves.studentLeaveReasonLogic'
			 , 'ThrillStudentLeaves.masterDataLogic'
			 , 'ngCordova'
			 , 'ThrillFrameworkLibrary.geo'
			 , 'ThrillFrameworkLibrary.Network'
			 , 'ThrillStudentLeavesWebClient.appConfig'
			 , 'ThrillFrameworkLibrary.appLogger'
	])
    /*Setup studentLeaveReason Controller */
	 app.controller('StudentLeaveReasonListController', function ($scope, $http, studentLeaveReasonLogic, masterDataLogic, appConfig, appLogger) {
		 getLabels(appConfig.CULTURE_NAME);
		 getMessages(appConfig.CULTURE_NAME);

/*get labels with selected language*/
    function getLabels(cultureName) {
        var currentFileName = "StudentLeaveReasonList";
        $http.get("StudentLeaveReason/Languages/" + currentFileName + "." + cultureName + ".json").then(function (response) {
            bindLabels(response.data);

        });
    }

         

         
    function getMessages(cultureName) {
        var alertMessageName = "AlertMessages";

        $http.get("StudentLeaveReason/Languages/" + alertMessageName + "." + cultureName + ".json").then(function (response) {
            $scope.alertMessageLabels = response.data.messages;
        });
    }

    /*bind labels with selected language */
	 function bindLabels(data) {
		 var labels = {
		 studentLeaveReasonTitle: data.labels.studentLeaveReasonTitle,
		 edit: data.labels.edit,
		 delete: data.labels.delete,
		 studentLeaveReasonList: data.labels.studentLeaveReasonList,
		 studentLeaveReasonHeading: data.labels.studentLeaveReasonHeading
	 };

	 $scope.labelsStudentLeaveReason = labels;

};
		 var refresh = function () {
			 studentLeaveReasonLogic.getAllStudentLeaveReasons().then(function (response) {
				 $scope.studentLeaveReasonCollection = response;
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


	 /*Method for calling  deleting   StudentLeaveReason*/
	 $scope.deleteStudentLeaveReason = function (studentLeaveReasonEntityKey) {
		 studentLeaveReasonLogic.deleteStudentLeaveReason(studentLeaveReasonEntityKey).then(function (response) {
			 appLogger.alert($scope.alertMessageLabels.studentLeaveReasonDeleted);
		 refresh();
			 }, function (err) {
				 appLogger.error('ERR', err);
			 });
		 };

}); // End of App Controller

