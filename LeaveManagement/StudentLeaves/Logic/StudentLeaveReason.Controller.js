/*//=============================================================================
// All rights reserved to Thrill Innovative Labs.
// THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
// OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
// LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
// FITNESS FOR A PARTICULAR PURPOSE.
//=============================================================================
//*****************************************************************************
//* Name		    	: StudentLeaveReason.Controller.js 
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

	 var app  = angular.module('ThrillStudentLeaves.studentLeaveReason', ['ThrillStudentLeaves.studentLeaveReasonLogic'
			 , 'ThrillStudentLeaves.masterDataLogic'
			 , 'ngCordova'
			 , 'ThrillFrameworkLibrary.geo'
			 , 'ThrillFrameworkLibrary.Network'
			 , 'ThrillStudentLeavesWebClient.appConfig'
			 , 'ThrillFrameworkLibrary.appLogger'
	])
    /*Setup studentLeaveReason Controller */
	 app.controller('StudentLeaveReasonController', function ($scope, $http, studentLeaveReasonLogic, masterDataLogic, $state, $stateParams, appConfig, appLogger) {
		 getLabels(appConfig.CULTURE_NAME);
		 getMessages(appConfig.CULTURE_NAME);

/*get labels with selected language*/
    function getLabels(cultureName) {
        var currentFileName = "StudentLeaveReason";
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
		 submit: data.labels.submit,
		 studentLeaveReasonHeading: data.labels.studentLeaveReasonHeading
	 };

	 $scope.labelsStudentLeaveReason = labels;

};

	 var entitykey = DrawCaptcha();
	 var studentLeaveReasonEntityKey;

    /*Perform the CRUD (Create, Read, Update & Delete) operations of StudentLeaveReason*/
      /*Method for calling  add StudentLeaveReason */
	 $scope.addStudentLeaveReason = function () {
		 if (appConfig.APP_MODE == 'offline') {
			 $scope.entityStudentLeaveReason.studentLeaveReasonKey = entitykey;
		 }
		 studentLeaveReasonLogic.addStudentLeaveReason($scope.entityStudentLeaveReason).then(function (response) {
			 appLogger.alert($scope.alertMessageLabels.studentLeaveReasonSaved);
			 $state.go('StudentLeaveReasonList');
			 }, function (err) {
				 appLogger.error('ERR', err);
			 });
		 };

	 /*Method for calling  update StudentLeaveReason*/
	 $scope.updateStudentLeaveReason = function () {
		 studentLeaveReasonLogic.updateStudentLeaveReason($scope.entitystudentLeaveReason, $stateParams.referenceKey).then(function (response) {
			 appLogger.alert($scope.alertMessageLabels.studentLeaveReasonUpdated);
			 }, function (err) {
				 appLogger.error('ERR', err);
			 });
		 };

/*Method for  retrieving  StudentLeaveReason details*/
	 if ($stateParams.entityKey) {
		 studentLeaveReasonLogic.getStudentLeaveReasonByStudentLeaveReasonKey($stateParams.entityKey).then(function (response) {
			 $scope.entityStudentLeaveReason = response[0];
			 $scope.entityStudentLeaveReason.studentLeaveReasonKey = response[0].studentLeaveReasonKey;
			 $scope.entityStudentLeaveReason.studentLeaveReasonTitle = response[0].studentLeaveReasonTitle;
			 $scope.entityStudentLeaveReason.instanceOrganizationKey = response[0].instanceOrganizationKey;
		 }, function (err) {
			 appLogger.error('ERR', err);
		 });
	 }

}); // End of App Controller

