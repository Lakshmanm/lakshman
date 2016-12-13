/*===========================================================================
 All rights reserved to Nunet Cube Software Solutions.
 THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
 OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
 LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
 FITNESS FOR A PARTICULAR PURPOSE.
============================================================================
****************************************************************************
 Name		    	: CreateCalendar.Controller
 Type               : Angular Js  
 Description        : containing attributes/properties and functions of create calendar
 References         : https://angularjs.org/
 Author             : Thriveni Yalavarthi.
 Created Date       : 06-04-2016.
****************************************************************************                          
MODIFICATION LOG
**************************************************************************** 
Ver	Date	     Modified By			Description
1.	07-04-2016	 Thriveni Yalavarthi	Define controller logic for create calendar
2.  15-04-2016   Thriveni Yalavarthi    Added toaster functionality 
****************************************************************************                            
Code Review LOG
**************************************************************************** 
S.No      Ver        Date                Code Review By            Observations
1         1.0       17-April-2016         Sri Venkatesh.T           Remove "var currentFileName = "CreateCalendar";" code which is not requried.
****************************************************************************
*/


var currentFileName = "CreateCalendar";

var app = angular.module('ThrillCNN.CreateCalendar', 
                        ['ThrillCNN.CreateCalendarLogic', 
                        'ThrillCnnWebClient.appConfig', 
                        'ThrillFrameworkLibrary.appLogger']
                        );

    /*Setup employee Controller */
app.controller('CreateCalendarController', 
    function ($scope, 
        $state, 
        $http, 
        appConfig, 
        appLogger, 
        $localStorage,
        toaster, 
        createCalendarLogic) {


  var loggedInUserId = $localStorage.loggedInUserID; //logged In user Id from localStorage
    
   //var loggedInUserId ='4ab860e0-3d0f-11e6-ae15-2f49c3e902be';
    //appLogger.log("LoggedIn User ID" + loggedInUserId);
    var userCalendarColor = null; //Used to save user calendar picked color

    /* Displaying Toast Messages */
    $scope.showSuccessAlert = false;
    $scope.showErrorAlert = false;
    $scope.switchBool = function (value) {
        $scope[value] = !$scope[value];
    };

    getLabels(appConfig.CULTURE_NAME);
    getMessages(appConfig.CULTURE_NAME);
    /*get labels with selected language*/
    function getLabels(cultureName) {

        var currentFileName = "CreateCalendar";
        $http.get("CalendarNotifications/Languages/" + currentFileName + "." + cultureName + ".json").then(function (response) {
            bindLabels(response.data);
            //appLogger.log("Calendar" + JSON.stringify(response.data));
        });
    }
    /*bind labels with selected language */
    function bindLabels(data) {
        var lables = {
            CalenderName: data.labels.CalenderName,
            CalenderColor: data.labels.CalenderColor,
            Description: data.labels.Description,
            Save: data.labels.Save,
            Cancel: data.labels.Cancel
        };

        $scope.createCalendarLables = lables;
        //appLogger.log("" + JSON.stringify($scope.createCalendarLables));

    };

    
      function getMessages(cultureName) {
        var alertMessageName = "AlertMessages";

        $http.get("CalendarNotifications/Languages/" + alertMessageName + "." + cultureName + ".json").then(function (response) {
            $scope.alertMessageLabels = response.data.messages;
        });
    }
    /*Method for cancel new task creation */
    $scope.cancel = function () {
        $state.go('app.appointments');

    }

    /* Method used to check calendar color */
    $(document).ready(function () {
        $('.cal_color_box').click(function (event) {
            // wrap the target element with jquery for convenience
            var $this = $(this);
            // toggle selected class, remove from other colour divs
            $this.toggleClass('selected').html('').siblings().removeClass('selected').html('');
            // add tick if selecting the colour
            if ($this.hasClass('selected')) {
                $this.html('&#9989;');
                // get the background colour
                var colour = $this.css('backgroundColor');
                userCalendarColor = $this.css('backgroundColor');
                // Set the value of the hidden form input
                // $('input#colour').val(colour);
                // display it (just an example of 'doing something')
                //('#selected-colour').html(colour);
            } else {
                // blank the hidden input
                $('input#colour').val('');
            };
        });

        //auto populate emailid's

    });

$scope.newCalendar={};
    /* Method for create a new calendar */
    $scope.newCalender = function () {

        var newCalendarInfo = {};

        newCalendarInfo.PersonCalendarName = $scope.newCalendar.calendername;
        newCalendarInfo.PersonID = loggedInUserId;
        newCalendarInfo.Description = $scope.newCalendar.description;
        newCalendarInfo.CalendarColor = userCalendarColor;
        newCalendarInfo.SharingEmails = 1;
        newCalendarInfo.CreatedByUserID = loggedInUserId;

        createCalendarLogic.createCalendar(newCalendarInfo).then(function (response) {           
           
            if (response.status == 200) {
                toaster.pop('success', $scope.alertMessageLabels.CalenderSave, '', 5000, '');
                $state.go('app.appointments')
            } else {
                toaster.pop('error', $scope.alertMessageLabels.CalenderUnSave, '', 5000, '');
                $state.go('app.appointments')
            }
        }, function (err) {
            console.error('ERR', err);
            toaster.pop('error',  $scope.alertMessageLabels.CalenderUnSave, '', 5000, '');
            $state.go('app.appointments')

        });


    }


});