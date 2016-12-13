/*=======================================================================
 All rights reserved to Thrill Innovative Labs.
 THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
 OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
 LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
 FITNESS FOR A PARTICULAR PURPOSE.
===========================================================================
****************************************************************************
 Name		    	 : SubOrganizationTypeController.js
 Type		    	 : Javascript and JQuery 
 Description		 : This file contains controller methods
 References		     :
 Author	    		 : 
 Created Date        : 
****************************************************************************
MODIFICATION LOG
**************************************************************************** 
S.No  Ver	Date	        Modified By		Description
  
****************************************************************************  
Code Review LOG
**************************************************************************** 
S.No      Ver        Date                Code Review By            Observations
 
****************************************************************************
*/

var app = angular.module('ThrillOrganization.SubOrganizationTypeList', ['ThrillOrganization.SubOrganizationTypeListLogic', 'ngCordova', 'ThrillFrameworkLibrary.geo', 'ThrillFrameworkLibrary.Network', 'ThrillCnnWebClient.appConfig', 'ThrillFrameworkLibrary.appLogger']);
/*Setup Registration Controller */
app.controller('SubOrganizationTypeListController', function($scope, $http, subOrganizationTypeListLogic, $state, $stateParams, $localStorage, appConfig, appLogger) {

    $scope.$on('$ionicView.enter', function() {
        $localStorage.organizationKey = "organizationKey";

        function getMessages(cultureName) {
            var alertMessageName = "AlertMessages";
            $http.get("Organization/Languages/" + alertMessageName + "." + cultureName + ".json").then(function(response) {
                $scope.alertMessageLabels = response.data.messages;
            });
        }

        var subOrganizationTypes = function() {
            subOrganizationTypeListLogic.getSubOrganizationTypesByOrganizationId($localStorage.organizationKey).then(function(response) {
                $scope.subOrganizationTypeList = response;
            }, function(err) {
                console.error('ERR', err);
            });
        };
        subOrganizationTypes();

        $scope.deleteSubOrganization = function(SubOrganizationTypeKey) {
            var del = confirm("Are you sure you want to Delete ?");
            if (del == true) {
                subOrganizationTypeListLogic.removeSubOrganizationType(SubOrganizationTypeKey).then(function(response) {
                    alert("Deleted Successfully");
                    subOrganizationTypes();
                }, function(err) {

                    console.error('ERR', err);
                });
            }
        };
    });
});