/*//=============================================================================
// All rights reserved to Thrill Innovative Labs.
// THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
// OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
// LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
// FITNESS FOR A PARTICULAR PURPOSE.
//=============================================================================
//*****************************************************************************
//* Name		    	: Group.Controller.js 
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

var app = angular.module('ThrillLeave.SubordinateEmailLeave', ['ngCordova', 'ngStorage', 'ThrillFrameworkLibrary.geo', 'ThrillFrameworkLibrary.Network', 'ThrillCnnWebClient.appConfig', 'ThrillFrameworkLibrary.appLogger', 'ThrillLeave.applyLeaveLogic', 'ThrillLeave.leaveRequestLogic', 'ThrillLeave.subordinateLeaveLogic'])
    /*Setup group Controller */
app.controller('subordinateEmailLeaveController', function($scope, $http, $state, $q, $stateParams, $localStorage, applyLeaveLogic, leaveRequestLogic, subordinateLeaveLogic, SweetAlert, appConfig, appLogger, $location) {


    getLabels(appConfig.CULTURE_NAME);
    getMessages(appConfig.CULTURE_NAME);


    /*get labels with selected language*/
    function getLabels(cultureName) {
        var currentFileName = "SubordinateRequest";
        $http.get("LeaveManagement/StaffLeaves/Languages/" + currentFileName + "." + cultureName + ".json").then(function(response) {
            bindLabels(response.data);

        });
    }

    function getMessages(cultureName) {
        var alertMessageName = "AlertMessages";

        $http.get("LeaveManagement/StaffLeaves/Languages/" + alertMessageName + "." + cultureName + ".json").then(function(response) {
            $scope.alertMessageLabels = response.data.messages;
        });
    }

    /*bind labels with selected language */
    function bindLabels(data) {


        $scope.labelsLeave = data.labels;

    };
    
   
    function getSubordinateLeaveRequestList() {

       
        var status = [1, 5];
        subordinateLeaveLogic.getSubordinateLeaveRequest($stateParams.personKey, status).then(function(response) {

            $scope.leaveRequestList = response;
        }, function(err) {

            console.error('ERR', err);

        });


    };



    $scope.sortColumn = "requestDate";
    $scope.sortColumn = "from";
    $scope.sortColumn = "to";
    $scope.sortColumn = "noOfDays";
    $scope.sortColumn = "requester";
    $scope.sortColumn = "status";
    $scope.sortColumn = "";
    $scope.reverseSort = false;


    $scope.sortData = function(column) {
        $scope.reverseSort = ($scope.sortColumn == column) ?
            !$scope.reverseSort : false;
        $scope.sortColumn = column;

        $scope.getSortClass = function(column) {


            if ($scope.sortColumn == column) {
                return $scope.reverseSort ? 'arrow-down' : 'arrow-up';
            }

            return '';
        }
    }

    getSubordinateLeaveRequestList();


    $scope.getRequest = function() {
      //  var ReferenceKey = "60abd750-91ed-11e6-a366-cdc9edb202ff";
        // $localStorage.ReferenceKey
        var status = [1, 2, 3, 4, 5, 6, 7, 8];
        subordinateLeaveLogic.getSubordinateLeaveRequest( $localStorage.ReferenceKey, status).then(function(response) {

            $scope.leaveRequestList = response;
        }, function(err) {

            console.error('ERR', err);

        });


    }
    


}); // End of App Controller