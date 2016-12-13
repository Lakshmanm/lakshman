/*//=============================================================================
// All rights reserved to Thrill Innovative Labs.
// THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
// OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
// LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
// FITNESS FOR A PARTICULAR PURPOSE.
//=============================================================================
//*****************************************************************************
//* Name		    	: TeamRoleList.Controller.js 
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

	 var app  = angular.module('ThrillAppBase.teamRoleList', ['ThrillAppBase.teamRoleLogic'
			 , 'ngCordova'
			 , 'ThrillFrameworkLibrary.geo'
			 , 'ThrillFrameworkLibrary.Network'
			 , 'ThrillCnnWebClient.appConfig'
			 , 'ThrillFrameworkLibrary.appLogger'
	])
    /*Setup teamRole Controller */
	 app.controller('TeamRoleListController', function ($scope, $http, teamRoleLogic,  appConfig, appLogger,$localStorage,SweetAlert) {
		 getLabels(appConfig.CULTURE_NAME);
		 getMessages(appConfig.CULTURE_NAME);

/*get labels with selected language*/
    function getLabels(cultureName) {
        var currentFileName = "TeamRoleList";
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
		 var labels = {
		 teamRoleTitle: data.labels.teamRoleTitle,
		 edit: data.labels.edit,
		 delete: data.labels.delete,
		 teamRoleList: data.labels.teamRoleList,
		 teamRoleHeading: data.labels.teamRoleHeading
	 };

	 $scope.labelsTeamRoleList = labels;

};
		 var refresh = function () {
			 teamRoleLogic.getTeamRoleByorganizationkey($localStorage.organizationKey).then(function (response) {
                 //alert(JSON.stringify(response));
				 $scope.teamRoleCollection = response;
				 $scope.sortColumn = "teamroletitle";
                 $scope.sortColumn="";
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


	 /*Method for calling  deleting   TeamRole*/
	 $scope.deleteTeamRole = function (teamRoleEntityKey) {
         
                            SweetAlert.swal({
                title: "Are you sure?",
                text: "Your want to delete this TeamRole",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Yes, delete it!",
                cancelButtonText: "No, cancel!",
                closeOnConfirm: false,
                closeOnCancel: false
            }, function(isConfirm) {
                if (isConfirm) {
                    SweetAlert.swal({
                        title: "Deleted!",
                        text: "Your Team Role has been deleted.",
                        type: "success",
                        confirmButtonColor: "#007AFF"
                    }, function() {
        teamRoleLogic.deleteTeamRole(teamRoleEntityKey).then(function (response) {
			 appLogger.alert($scope.alertMessageLabels.teamRoleDeleted);
		 refresh();
			 }, function (err) {
				 appLogger.error('ERR', err);
			 });
                    });
                } else {
                    SweetAlert.swal({
                        title: "Cancelled",
                        text: "Your Team Role is safe :)",
                        type: "error",
                        confirmButtonColor: "#007AFF"
                    });
                }
            });
         
      /*   var del = confirm("Do you want to Delete Team Role ?");
                if(del==true)
                {
		 teamRoleLogic.deleteTeamRole(teamRoleEntityKey).then(function (response) {
			 appLogger.alert($scope.alertMessageLabels.teamRoleDeleted);
		 refresh();
			 }, function (err) {
				 appLogger.error('ERR', err);
			 });
                }*/
		 };

}); // End of App Controller

