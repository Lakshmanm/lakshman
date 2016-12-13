/*=======================================================================
 All rights reserved to Thrill Innovative Labs.
 THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
 OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
 LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
 FITNESS FOR A PARTICULAR PURPOSE.
===========================================================================
****************************************************************************
 Name		    	 : EmployeeList.Controller
 Type		    	 : Javascript and JQuery 
 Description		 : This file contains person list controller methods
 References		     :
 Author	    		 : Phaneendra Vaddiparthy
 Created Date        : 06-04-2016
****************************************************************************
MODIFICATION LOG
**************************************************************************** 
Ver	Date	     Modified By			Description
****************************************************************************  
Code Review LOG
**************************************************************************** 
Ver        Date                Code Review By            Observations
****************************************************************************
*/

var app = angular.module('ThrillPerson.personList', 
                         ['ThrillPerson.personListLogic',
                          'ngCordova',
                          'ThrillCnnWebClient.appConfig', 
                          'ThrillFrameworkLibrary.appLogger', 
                          'ThrillFrameworkLibrary.Network', 
                          'ThrillFrameworkLibrary.appLogger'])
    //Set Up Employee List Controller 
app.controller('PersonListController', function (personListLogic
    , $scope
    , $http
    , appConfig
    , appLogger
    , appLogger) {


    $scope.$watch('online', function (newStatus) {});


    if (appConfig.APP_TYPE == 'mobile') {
        $scope.$on('$ionicView.enter', function () {
            refresh();
        })
    } else {
        refresh();
    }




    // Method to refresh PersonList details
    function refresh() {
        getPersonList();
        getLabels(appConfig.CULTURE_NAME);

    };
    
function getMessages(cultureName) {
        var alertMessageName = "AlertMessages";

        $http.get("Person/Languages/" + alertMessageName + "." + cultureName + ".json").then(function (response) {
            $scope.alertMessageLabels = response.data.messages;
        });
    }



    //get labels with selected language
    function getLabels(cultureName) {
        var currentFileName = "PersonList";

        $http.get("Person/Languages/PersonList." + cultureName + ".json").then(function (response) {

            bindLabels(response.data);

        }, function (err) {
            appLogger.log(err);


        });
    }
    //bind labels with selected language 
    function bindLabels(data) {

        $scope.labels = data.labels;
    };
    //Method for getting PersonList
    function getPersonList() {

        personListLogic.getpersonListDetails().then(function (response) {
            appLogger.log(response);
            $scope.personList = response;

        }, function (err) {
            appLogger.log(err);
            appLogger.error('ERR' + err);

        });


    }

    // Method to delete PersonList details
    $scope.deletePerson = function (personReferenceKey) {

        appLogger.alert(personReferenceKey);
        personListLogic.deletePerson(personReferenceKey).then(function (response) {
             appLogger.alert($scope.alertMessageLabels.personDeleted);
            getPersonList();

        }, function (err) {
            appLogger.log(err);
            appLogger.error('ERR' + err);
        });
    }
});