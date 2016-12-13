/*//=============================================================================
// All rights reserved to Thrill Innovative Labs.
// THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
// OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
// LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
// FITNESS FOR A PARTICULAR PURPOSE.
//=============================================================================
//*****************************************************************************
//* Name		    	: TeamList.Controller.js 
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

var app = angular.module('ThrillAppBase.teamList', ['ThrillAppBase.teamLogic'
			 , 'ngCordova'
			 , 'ThrillFrameworkLibrary.geo'
			 , 'ThrillFrameworkLibrary.Network'
			 , 'ThrillCnnWebClient.appConfig'
			 , 'ThrillFrameworkLibrary.appLogger'
	])
    /*Setup team Controller */
app.controller('TeamListController', function ($scope, $http, teamLogic, appConfig, appLogger, $localStorage,SweetAlert) {
    getLabels(appConfig.CULTURE_NAME);
    getMessages(appConfig.CULTURE_NAME);

    /*get labels with selected language*/
    function getLabels(cultureName) {
        var currentFileName = "TeamList";
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
            teamTitle: data.labels.teamTitle,
            teamDescription: data.labels.teamDescription,
            edit: data.labels.edit,
            delete: data.labels.delete,
            teamList: data.labels.teamList,
            teamHeading: data.labels.teamHeading
        };

        $scope.labelsTeam = labels;

    };
   
    var refresh = function () {
         //alert(JSON.stringify($localStorage.organizationKey));
        teamLogic.getTeamsByRootOrgKey($localStorage.organizationKey).then(function (response) {
            //alert(JSON.stringify(response));
            $scope.teamCollection = response;

            $scope.sortColumn = "teamtitle";

            $scope.sortColumn = " ";
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
                },
                function (err) {
                    appLogger.error('ERR', err);
                };
        });
    }
    refresh();


    /*Method for calling  deleting   Team*/
    $scope.deleteTeam = function (teamEntityKey) 
    {
                                SweetAlert.swal({
                title: "Are you sure?",
                text: "Your want to delete this Team",
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
                        text: "Your Team  has been deleted.",
                        type: "success",
                        confirmButtonColor: "#007AFF"
                    }, function() {
             teamLogic.deleteTeam(teamEntityKey).then(function (response) {
              ///  appLogger.alert($scope.alertMessageLabels.teamDeleted);
                
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
    
  /*      var del = confirm("Do you want to Delete Team ?");
        if (del == true) {
            teamLogic.deleteTeam(teamEntityKey).then(function (response) {
              ///  appLogger.alert($scope.alertMessageLabels.teamDeleted);
                
                refresh();
            }, function (err) {
                appLogger.error('ERR', err);
            });
        }*/
    };

}); // End of App Controller