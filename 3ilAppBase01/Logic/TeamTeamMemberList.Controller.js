/*//=============================================================================
// All rights reserved to Thrill Innovative Labs.
// THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
// OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
// LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
// FITNESS FOR A PARTICULAR PURPOSE.
//=============================================================================
//*****************************************************************************
//* Name		    	: TeamTeamMember.Controller.js 
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

	 var app  = angular.module('ThrillTeam.teamTeamMemberList', ['ThrillTeam.teamTeamMemberLogic'
			 , 'ngCordova'
			 , 'ThrillFrameworkLibrary.geo'
			 , 'ThrillFrameworkLibrary.Network'
			 , 'ThrillTeamWebClient.appConfig'
			 , 'ThrillFrameworkLibrary.appLogger'
	])
    /*Setup teamTeamMember Controller */
	 app.controller('TeamTeamMemberListController', function ($scope, $http, teamTeamMemberLogic,  $state, $stateParams, appConfig, appLogger) {
		 getLabels(appConfig.CULTURE_NAME);
		 getMessages(appConfig.CULTURE_NAME);
        // $scope.teamKey='0d45300a-119c-17dd-9d22-80bb085f84ed';

/*get labels with selected language*/
    function getLabels(cultureName) {
        var currentFileName = "TeamTeamMemberList";
        $http.get("Team/Languages/" + currentFileName + "." + cultureName + ".json").then(function (response) {
          
            bindLabels(response.data);

        });
    }

    function getMessages(cultureName) {
        var alertMessageName = "AlertMessages";

        $http.get("Team/Languages/" + alertMessageName + "." + cultureName + ".json").then(function (response) {
            $scope.alertMessageLabels = response.data.messages;
        });
    }

    /*bind labels with selected language */
	 function bindLabels(data) {
		/* var labels = {
		 StartDate: data.labels.startDate,
		 EndDate: data.labels.endDate,
         submit: data.labels.submit,
		 delete: data.labels.delete,
		 teamMemberHeading: data.labels.teamMemberHeading
	 };*/

	 $scope.labelsTeamMemberList = data.labels;

};
        

	 var refresh = function () {
			 teamTeamMemberLogic.getTeamTeamMemberByTeamKey($scope.teamKey).then(function (response) {
				 $scope.collectionTeamMember = response;
               console.log(response);
				
                 
                  $scope.sortColumn = "teamtitle ";
                  $scope.sortColumn = "personkey";
                  $scope.sortColumn = "teamroletitle ";
                  $scope.sortColumn = "startdate";
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


	 /*Method for calling  deleting   Team*/
	 $scope.deleteTeamMember = function (teamEntityKey) {
         var del = confirm("Do you want to Delete Team Member ?");
                if(del==true)
                {
		 teamTeamMemberLogic.deleteTeamTeamMember(teamEntityKey).then(function (response) {
 appLogger.alert($scope.alertMessageLabels.teamDeleted);
		 refresh();
			 }, function (err) {
				 appLogger.error('ERR', err);
			 });
                }
		 };
    
	

}); // End of App Controller

