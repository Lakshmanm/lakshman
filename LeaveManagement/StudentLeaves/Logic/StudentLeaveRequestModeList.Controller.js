/*//=============================================================================
// All rights reserved to Thrill Innovative Labs.
// THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
// OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
// LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
// FITNESS FOR A PARTICULAR PURPOSE.
//=============================================================================
//*****************************************************************************
//* Name		    	: StudentLeaveRequestModeList.Controller.js 
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

	 var app  = angular.module('ThrillStudentLeaves.studentLeaveRequestModeList', ['ThrillStudentLeaves.studentLeaveRequestModeLogic'
			 , 'ThrillStudentLeaves.masterDataLogic'
			 , 'ngCordova'
			 , 'ThrillFrameworkLibrary.geo'
			 , 'ThrillFrameworkLibrary.Network'
			 , 'ThrillStudentLeavesWebClient.appConfig'
			 , 'ThrillFrameworkLibrary.appLogger'
	])
    /*Setup studentLeaveRequestMode Controller */
	 app.controller('StudentLeaveRequestModeListController', function ($scope, $http, studentLeaveRequestModeLogic, masterDataLogic, appConfig, appLogger) {
		 getLabels(appConfig.CULTURE_NAME);
		 getMessages(appConfig.CULTURE_NAME);

/*get labels with selected language*/
    function getLabels(cultureName) {
        var currentFileName = "StudentLeaveRequestModeList";
        $http.get("StudentLeaveRequestMode/Languages/" + currentFileName + "." + cultureName + ".json").then(function (response) {
            bindLabels(response.data);

        });
    }

    function getMessages(cultureName) {
        var alertMessageName = "AlertMessages";

        $http.get("StudentLeaveRequestMode/Languages/" + alertMessageName + "." + cultureName + ".json").then(function (response) {
            $scope.alertMessageLabels = response.data.messages;
        });
    }

    /*bind labels with selected language */
	 function bindLabels(data) {
		 var labels = {
		 studentLeaveRequestModeTitle: data.labels.studentLeaveRequestModeTitle,
		 edit: data.labels.edit,
		 delete: data.labels.delete,
		 studentLeaveRequestModeList: data.labels.studentLeaveRequestModeList,
		 studentLeaveRequestModeHeading: data.labels.studentLeaveRequestModeHeading
	 };

	 $scope.labelsStudentLeaveRequestMode = labels;

};
		 var refresh = function () {
			 studentLeaveRequestModeLogic.getAllStudentLeaveRequestModes().then(function (response) {
				 $scope.studentLeaveRequestModeCollection = response;
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


	 /*Method for calling  deleting   StudentLeaveRequestMode*/
	 $scope.deleteStudentLeaveRequestMode = function (studentLeaveRequestModeEntityKey) {
		 studentLeaveRequestModeLogic.deleteStudentLeaveRequestMode(studentLeaveRequestModeEntityKey).then(function (response) {
			 appLogger.alert($scope.alertMessageLabels.studentLeaveRequestModeDeleted);
		 refresh();
			 }, function (err) {
				 appLogger.error('ERR', err);
			 });
		 };

}); // End of App Controller

