/*=======================================================================
 All rights reserved to Thrill Innovative Labs.
 THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
 OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
 LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
 FITNESS FOR A PARTICULAR PURPOSE.
===========================================================================
****************************************************************************
 Name		    	 : OrganizationList.Controller
 Type		    	 : Javascript and JQuery 
 Description		 : This file contains controller methods
 References		     :
 Author	    		 : Naveena
 Created Date        : 07-April-2016
****************************************************************************
MODIFICATION LOG
**************************************************************************** 
S.No Ver	Date:	     Modified By:		Description:
1     1.0     12-04-2016     Satya kalyani Lanka        dependency structure changed
2.    1.0      14-04-2016   naveena       currentFileName variable name is removed 
****************************************************************************  
Code Review LOG
**************************************************************************** 
S.No      Ver        Date                Code Review By            Observations
1         1.0       13-April-2016         Sri Venkatesh.T           Remove "var currentFileName = "OrganizationList";" code which is not requried.
2         1.0       13-April-2016         Sri Venkatesh.T           Rename "deleteOrg" function to a meaningful name don't use shortnames for functions or function params 
****************************************************************************
*/

var app = angular.module('ThrillOrganization.OrganizationList', ['ThrillOrganization.OrganizationListLogic',
        'ngCordova', 'ThrillFrameworkLibrary.geo',
        'ThrillFrameworkLibrary.Network',
        'ThrillCnnWebClient.appConfig',
        'ThrillFrameworkLibrary.appLogger'                                                  
                                                                 
                                                                 
    ]);
/*Setup Organization List Controller */
app.controller('OrganizationListController'
    , function ($scope
        , $http
        , OrganizationListLogic
        , $state
        , $stateParams
        , appConfig
        
        , appLogger) {

$scope.$on('$ionicView.enter', function () {
  
    getLabels(appConfig.CULTURE_NAME);
    getMessages(appConfig.CULTURE_NAME);
    appLogger.warn('OrganizationListController');

    /*get labels with selected language*/
    function getLabels(cultureName) {

        var currentFileName = "OrganizationList";
        $http.get("Organization/Languages/" + currentFileName + "." + cultureName + ".json").then(function (response) {
            bindLabels(response.data);

        });
    }
    function getMessages(cultureName) {
        var alertMessageName = "AlertMessages";

        $http.get("Organization/Languages/" + alertMessageName + "." + cultureName + ".json").then(function (response) {
            $scope.alertMessageLabels = response.data.messages;
        });
    }
    /*bind labels with selected language */
    function bindLabels(data) {


        var lables = {

            Title: data.labels.Title,
            Submit: data.labels.Submit,
            OrganizationBasicInfo: data.labels.OrganizationList,
            OrganizationLevel: data.labels.OrganizationLevel
        };

        $scope.labels = lables;


    }


    /*Method for binding grid*/

    var organizationDetails = function () {

        OrganizationListLogic.getOrganizationDetails().then(function (response) {
            $scope.organizationDetails = response;

        }, function (err) {

            console.error('ERR', err);

        });

    };
    organizationDetails();
    /*Method for delete organization from table*/
    $scope.deleteOrg = function (orgid) {
        OrganizationListLogic.removeOrganization(orgid).then(function (response) {
            appLogger.alert($scope.alertMessageLabels.organizationDeleted);
            organizationDetails();
        }, function (err) {

            console.error('ERR', err);
        });

    };
    organizationDetails();
})
       
});