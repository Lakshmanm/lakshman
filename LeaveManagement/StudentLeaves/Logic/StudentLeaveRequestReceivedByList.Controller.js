/*//=============================================================================
// All rights reserved to Thrill Innovative Labs.
// THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
// OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
// LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
// FITNESS FOR A PARTICULAR PURPOSE.
//=============================================================================
//*****************************************************************************
//* Name		    	: StudentLeaveRequestReceivedByList.Controller.js 
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

	 var app  = angular.module('ThrillStudentLeaves.studentLeaveRequestReceivedByList', ['ThrillStudentLeaves.studentLeaveRequestReceivedByLogic'
			 , 'ThrillStudentLeaves.masterDataLogic'
			 , 'ngCordova'
			 , 'ThrillFrameworkLibrary.geo'
			 , 'ThrillFrameworkLibrary.Network'
			 , 'ThrillStudentLeavesWebClient.appConfig'
			 , 'ThrillFrameworkLibrary.appLogger'
	])
    /*Setup studentLeaveRequestReceivedBy Controller */
	 app.controller('StudentLeaveRequestReceivedByListController', function ($scope, $http, studentLeaveRequestReceivedByLogic, masterDataLogic, appConfig, appLogger) {
		 getLabels(appConfig.CULTURE_NAME);
		 getMessages(appConfig.CULTURE_NAME);

/*get labels with selected language*/
    function getLabels(cultureName) {
        var currentFileName = "StudentLeaveRequestReceivedByList";
        $http.get("StudentLeaveRequestReceivedBy/Languages/" + currentFileName + "." + cultureName + ".json").then(function (response) {
            bindLabels(response.data);

        });
    }

    function getMessages(cultureName) {
        var alertMessageName = "AlertMessages";

        $http.get("StudentLeaveRequestReceivedBy/Languages/" + alertMessageName + "." + cultureName + ".json").then(function (response) {
            $scope.alertMessageLabels = response.data.messages;
        });
    }

    /*bind labels with selected language */
	 function bindLabels(data) {
		 var labels = {
		 studentLeaveRequestReceivedByTitle: data.labels.studentLeaveRequestReceivedByTitle,
		 edit: data.labels.edit,
		 delete: data.labels.delete,
		 studentLeaveRequestReceivedByList: data.labels.studentLeaveRequestReceivedByList,
		 studentLeaveRequestReceivedByHeading: data.labels.studentLeaveRequestReceivedByHeading
	 };

	 $scope.labelsStudentLeaveRequestReceivedBy = labels;

};
		 var refresh = function () {
			 studentLeaveRequestReceivedByLogic.getAllStudentLeaveRequestReceivedBies().then(function (response) {
				 $scope.studentLeaveRequestReceivedByCollection = response;
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


	 /*Method for calling  deleting   StudentLeaveRequestReceivedBy*/
	 $scope.deleteStudentLeaveRequestReceivedBy = function (studentLeaveRequestReceivedByEntityKey) {
		 studentLeaveRequestReceivedByLogic.deleteStudentLeaveRequestReceivedBy(studentLeaveRequestReceivedByEntityKey).then(function (response) {
			 appLogger.alert($scope.alertMessageLabels.studentLeaveRequestReceivedByDeleted);
		 refresh();
			 }, function (err) {
				 appLogger.error('ERR', err);
			 });
		 };

}); // End of App Controller

