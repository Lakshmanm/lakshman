/*//=============================================================================
// All rights reserved to Thrill Innovative Labs.
// THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
// OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
// LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
// FITNESS FOR A PARTICULAR PURPOSE.
//=============================================================================
//*****************************************************************************
//* Name		    	: StudentLeaveRequestReceivedBy.Controller.js 
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

	 var app  = angular.module('ThrillStudentLeaves.studentLeaveRequestReceivedBy', ['ThrillStudentLeaves.studentLeaveRequestReceivedByLogic'
			 , 'ThrillStudentLeaves.masterDataLogic'
			 , 'ngCordova'
			 , 'ThrillFrameworkLibrary.geo'
			 , 'ThrillFrameworkLibrary.Network'
			 , 'ThrillStudentLeavesWebClient.appConfig'
			 , 'ThrillFrameworkLibrary.appLogger'
	])
    /*Setup studentLeaveRequestReceivedBy Controller */
	 app.controller('StudentLeaveRequestReceivedByController', function ($scope, $http, studentLeaveRequestReceivedByLogic, masterDataLogic, $state, $stateParams, appConfig, appLogger) {
		 getLabels(appConfig.CULTURE_NAME);
		 getMessages(appConfig.CULTURE_NAME);

/*get labels with selected language*/
    function getLabels(cultureName) {
        var currentFileName = "StudentLeaveRequestReceivedBy";
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
		 submit: data.labels.submit,
		 studentLeaveRequestReceivedByHeading: data.labels.studentLeaveRequestReceivedByHeading
	 };

	 $scope.labelsStudentLeaveRequestReceivedBy = labels;

};

	 var entitykey = DrawCaptcha();
	 var studentLeaveRequestReceivedByEntityKey;

    /*Perform the CRUD (Create, Read, Update & Delete) operations of StudentLeaveRequestReceivedBy*/
      /*Method for calling  add StudentLeaveRequestReceivedBy */
	 $scope.addStudentLeaveRequestReceivedBy = function () {
		 if (appConfig.APP_MODE == 'offline') {
			 $scope.entityStudentLeaveRequestReceivedBy.studentLeaveRequestReceivedByKey = entitykey;
		 }
		 studentLeaveRequestReceivedByLogic.addStudentLeaveRequestReceivedBy($scope.entityStudentLeaveRequestReceivedBy).then(function (response) {
			 appLogger.alert($scope.alertMessageLabels.studentLeaveRequestReceivedBySaved);
			 $state.go('StudentLeaveRequestReceivedByList');
			 }, function (err) {
				 appLogger.error('ERR', err);
			 });
		 };

	 /*Method for calling  update StudentLeaveRequestReceivedBy*/
	 $scope.updateStudentLeaveRequestReceivedBy = function () {
		 studentLeaveRequestReceivedByLogic.updateStudentLeaveRequestReceivedBy($scope.entitystudentLeaveRequestReceivedBy, $stateParams.referenceKey).then(function (response) {
			 appLogger.alert($scope.alertMessageLabels.studentLeaveRequestReceivedByUpdated);
			 }, function (err) {
				 appLogger.error('ERR', err);
			 });
		 };

/*Method for  retrieving  StudentLeaveRequestReceivedBy details*/
	 if ($stateParams.entityKey) {
		 studentLeaveRequestReceivedByLogic.getStudentLeaveRequestReceivedByByStudentLeaveRequestReceivedByKey($stateParams.entityKey).then(function (response) {
			 $scope.entityStudentLeaveRequestReceivedBy = response[0];
			 $scope.entityStudentLeaveRequestReceivedBy.studentLeaveRequestReceivedByKey = response[0].studentLeaveRequestReceivedByKey;
			 $scope.entityStudentLeaveRequestReceivedBy.studentLeaveRequestReceivedByTitle = response[0].studentLeaveRequestReceivedByTitle;
			 $scope.entityStudentLeaveRequestReceivedBy.instanceOrganizationKey = response[0].instanceOrganizationKey;
		 }, function (err) {
			 appLogger.error('ERR', err);
		 });
	 }

}); // End of App Controller

