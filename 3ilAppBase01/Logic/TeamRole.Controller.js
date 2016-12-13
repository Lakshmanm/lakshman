/*//=============================================================================
// All rights reserved to Thrill Innovative Labs.
// THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
// OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
// LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
// FITNESS FOR A PARTICULAR PURPOSE.
//=============================================================================
//*****************************************************************************
//* Name		    	: TeamRole.Controller.js 
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

	 var app  = angular.module('ThrillAppBase.teamRole', ['ThrillAppBase.teamRoleLogic'
			 , 'ngCordova'
			 , 'ThrillFrameworkLibrary.geo'
			 , 'ThrillFrameworkLibrary.Network'
			 , 'ThrillCnnWebClient.appConfig'
			 , 'ThrillFrameworkLibrary.appLogger'
	])
    /*Setup teamRole Controller */
	 app.controller('TeamRoleController', function ($scope, $http,$localStorage, teamRoleLogic,  $state, $stateParams, appConfig, appLogger,SweetAlert) {
         
		 getLabels(appConfig.CULTURE_NAME);
		 getMessages(appConfig.CULTURE_NAME);

/*get labels with selected language*/
    function getLabels(cultureName) {
        var currentFileName = "TeamRole";
        $http.get("3ilAppBase01/Languages/" + currentFileName + "." + cultureName + ".json").then(function (response) {
            
            bindLabels(response.data);

        });
    }

    function getMessages(cultureName) {
        var alertMessageName = "AlertMessages";

        $http.get("3ilAppBase01/Languages/" + alertMessageName + "." + cultureName + ".json").then(function (response) {
            $scope.alertMessageLabels = response.data.messages;
        });
    }

    /*bind labels with selected language */
	 function bindLabels(data) {
			 $scope.labelsTeamRole = data.lables;
      

};

	 var entitykey = DrawCaptcha();
	 var teamRoleEntityKey;

    /*Perform the CRUD (Create, Read, Update & Delete) operations of TeamRole*/
      /*Method for calling  add TeamRole */
	 $scope.addTeamRole = function () {
		 if (appConfig.APP_MODE == 'offline') {
			 $scope.entityTeamRole.teamRoleKey = entitykey;
		 }
         //alert(JSON.stringify($scope.entityTeamRole));
         $scope.entityTeamRole.organizationKey=$localStorage.organizationKey;
		 teamRoleLogic.addTeamRole($scope.entityTeamRole).then(function (response) {
                SweetAlert.swal({
                    title: "TeamRole",
                    text: "Saved successfully",
                    type: "success",
                    confirmButtonColor: "#007AFF"
                }, function() {
                   $state.go('app.teamRoleList');
                });
			// appLogger.alert($scope.alertMessageLabels.teamRoleSaved);
			 
			 }, function (err) {
				 appLogger.error('ERR', err);
			 });
		 };

	 /*Method for calling  update TeamRole*/
	 $scope.updateTeamRole = function () {
		 teamRoleLogic.updateTeamRole($scope.entityTeamRole, $stateParams.teamRoleKey).then(function (response) {
			// appLogger.alert($scope.alertMessageLabels.teamRoleUpdated);
                 SweetAlert.swal({
                    title: "TeamRole",
                    text: "Updated successfully",
                    type: "success",
                    confirmButtonColor: "#007AFF"
                }, function() {
                   $state.go('app.teamRoleList');
                });
              $state.go('app.teamRoleList');
			 }, function (err) {
				 appLogger.error('ERR', err);
			 });
		 };

/*Method for  retrieving  TeamRole details*/
	 if ($stateParams.teamRoleKey) {
		 teamRoleLogic.getTeamRoleByTeamRoleKey($stateParams.teamRoleKey).then(function (response) {
            console.log(response);
			 $scope.entityTeamRole = response[0];
			 $scope.entityTeamRole.teamRoleKey = response[0].teamrolekey;
			 $scope.entityTeamRole.teamRoleTitle = response[0].teamroletitle;
              $scope.entityTeamRole.organizationKey = response[0].organizationkey;
		 }, function (err) {
			 appLogger.error('ERR', err);
		 });
	 }

}); // End of App Controller

