/*//=============================================================================
// All rights reserved to Thrill Innovative Labs.
// THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
// OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
// LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
// FITNESS FOR A PARTICULAR PURPOSE.
//=============================================================================
//*****************************************************************************
//* Name		    	: StudentLeaveRequestMode.Controller.js 
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

	 var app  = angular.module('ThrillStudentLeaves.studentLeaveRequestMode', ['ThrillStudentLeaves.studentLeaveRequestModeLogic'
			 , 'ThrillStudentLeaves.masterDataLogic'
			 , 'ngCordova'
			 , 'ThrillFrameworkLibrary.geo'
			 , 'ThrillFrameworkLibrary.Network'
			 , 'ThrillStudentLeavesWebClient.appConfig'
			 , 'ThrillFrameworkLibrary.appLogger'
	])
    /*Setup studentLeaveRequestMode Controller */
	 app.controller('StudentLeaveRequestModeController', function ($scope, $http, studentLeaveRequestModeLogic, masterDataLogic, $state, $stateParams, appConfig, appLogger) {
		 getLabels(appConfig.CULTURE_NAME);
		 getMessages(appConfig.CULTURE_NAME);

/*get labels with selected language*/
    function getLabels(cultureName) {
        var currentFileName = "StudentLeaveRequestMode";
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
		 submit: data.labels.submit,
		 studentLeaveRequestModeHeading: data.labels.studentLeaveRequestModeHeading
	 };

	 $scope.labelsStudentLeaveRequestMode = labels;

};

	 var entitykey = DrawCaptcha();
	 var studentLeaveRequestModeEntityKey;

    /*Perform the CRUD (Create, Read, Update & Delete) operations of StudentLeaveRequestMode*/
      /*Method for calling  add StudentLeaveRequestMode */
	 $scope.addStudentLeaveRequestMode = function () {
		 if (appConfig.APP_MODE == 'offline') {
			 $scope.entityStudentLeaveRequestMode.studentLeaveRequestModeKey = entitykey;
		 }
		 studentLeaveRequestModeLogic.addStudentLeaveRequestMode($scope.entityStudentLeaveRequestMode).then(function (response) {
			 appLogger.alert($scope.alertMessageLabels.studentLeaveRequestModeSaved);
			 $state.go('StudentLeaveRequestModeList');
			 }, function (err) {
				 appLogger.error('ERR', err);
			 });
		 };

	 /*Method for calling  update StudentLeaveRequestMode*/
	 $scope.updateStudentLeaveRequestMode = function () {
		 studentLeaveRequestModeLogic.updateStudentLeaveRequestMode($scope.entitystudentLeaveRequestMode, $stateParams.referenceKey).then(function (response) {
			 appLogger.alert($scope.alertMessageLabels.studentLeaveRequestModeUpdated);
			 }, function (err) {
				 appLogger.error('ERR', err);
			 });
		 };

/*Method for  retrieving  StudentLeaveRequestMode details*/
	 if ($stateParams.entityKey) {
		 studentLeaveRequestModeLogic.getStudentLeaveRequestModeByStudentLeaveRequestModeKey($stateParams.entityKey).then(function (response) {
			 $scope.entityStudentLeaveRequestMode = response[0];
			 $scope.entityStudentLeaveRequestMode.studentLeaveRequestModeKey = response[0].studentLeaveRequestModeKey;
			 $scope.entityStudentLeaveRequestMode.studentLeaveRequestModeTitle = response[0].studentLeaveRequestModeTitle;
			 $scope.entityStudentLeaveRequestMode.instanceOrganizationKey = response[0].instanceOrganizationKey;
		 }, function (err) {
			 appLogger.error('ERR', err);
		 });
	 }

}); // End of App Controller

