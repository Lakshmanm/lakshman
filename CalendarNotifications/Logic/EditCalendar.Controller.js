/*===========================================================================
 All rights reserved to Nunet Cube Software Solutions.
 THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
 OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
 LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
 FITNESS FOR A PARTICULAR PURPOSE.
============================================================================
****************************************************************************
 Name               : EditCalendar.Controller
 Type               : Angular Js  
 Description        : containing attributes/properties and functions of edit calendar
 References         : https://angularjs.org/
 Author             : Thriveni Yalavarthi.
 Created Date       : 10-04-2016.
****************************************************************************                          
MODIFICATION LOG
**************************************************************************** 
Ver Date         Modified By            Description
1.  10-04-2016   Thriveni Yalavarthi    Define the controller logic of edit calendar
2.  12-04-2016   Jagadeesh Adigarlla    Assigned localstorage value editcalendarID to 
                                        claendarID variable.
3.  15-04-2016   Thriveni Yalavarthi    Added toaster functionality        
4.  15-04-2016   Jagadeesh Adigarlla    Changed the calendar color selection                                
****************************************************************************                            
Code Review LOG
**************************************************************************** 
S.No      Ver        Date                Code Review By            Observations
1         1.0       17-April-2016         Sri Venkatesh.T           Remove "var currentFileName = "EditCalendar";" code which is not requried.
****************************************************************************
*/

var currentFileName = "EditCalendar";

var app = angular.module('ThrillCNN.EditCalendar', ['ThrillCNN.EditCalendarLogic',
    'ThrillCnnWebClient.appConfig',
    'ThrillFrameworkLibrary.appLogger'
]);


/*Setup employee Controller */
app.controller('EditCalendarController',
    function ($scope,
        editCalendarLogic,
        $state,
        $http,
        appConfig,
        appLogger,
        toaster,
        $localStorage) {
    
    // var loggedInUserId ='4ab860e0-3d0f-11e6-ae15-2f49c3e902be';
        var loggedInUserId = $localStorage.loggedInUserID; //logged In user Id from localStorage
        //appLogger.log("LoggedIn User ID" + loggedInUserId);

        var userCalendarColor = null; //Used to save user calendar picked color

        var calendarId = $localStorage.editCalendarID; //User Calendar

        var backgroundcolorcal = ""; //used for display background color

        /* Method for calendar color check box click */
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

                } else {
                    // blank the hidden input
                    $('input#colour').val('');
                }
            });
            //auto populate emailid's

        });

        /* Displaying Toast Messages */
        $scope.showSuccessAlert = false;
        $scope.showErrorAlert = false;
        $scope.switchBool = function (value) {
            $scope[value] = !$scope[value];
        };


        getLabels(appConfig.CULTURE_NAME);
        getMessages(appConfig.CULTURE_NAME);
    
        getCalendarInfo(calendarId);

        /*get labels with selected language*/
        function getLabels(cultureName) {

            var currentFileName = "EditCalendar";
            $http.get("CalendarNotifications/Languages/" + currentFileName + "." + cultureName + ".json").then(function (response) {
                bindLabels(response.data);
                //appLogger.log("" + JSON.stringify(response.data));
            });
        }
        /*bind labels with selected language */
        function bindLabels(data) {
            var lables = {
                CalenderName: data.labels.CalenderName,
                CalenderColor: data.labels.CalenderColor,
                Description: data.labels.Description,
                Update: data.labels.Update,
                Cancel: data.labels.Cancel
            };

            $scope.editCalendarLables = lables;
            //appLogger.log("" + JSON.stringify($scope.editCalendarLables));

        }
    
     /*get alert labels*/
     function getMessages(cultureName) {
        var alertMessageName = "AlertMessages";

        $http.get("CalendarNotifications/Languages/" + alertMessageName + "." + cultureName + ".json").then(function (response) {
            $scope.alertMessageLabels = response.data.messages;
        });
    }

        /*Method for cancel new task creation */
        $scope.cancel = function () {
            delete $localStorage.editCalendarID;
            $state.go('app.appointments');

        };

        $scope.editCalendar = {};
        /* Method for retrieving calendar info */
        function getCalendarInfo(calendarId) {
            appLogger.log("calendar Id is:" + calendarId)
            editCalendarLogic.getCalendarInfoByCalId(calendarId).then(function (response) {
                //appLogger.log("Calendar Info" + JSON.stringify(response))

                $scope.editCalendar = {};
                $scope.editCalendar.calenderName = response[0].PersonCalendarName;
                $scope.editCalendar.calendarColor = response[0].CalendarColor;
                $scope.editCalendar.description = response[0].Description;

                //$scope.editCalendar.calshareemails = response[0].SharingEmails;
                userCalendarColor = response[0].CalendarColor;

                backgroundcolorcal = covertRgbToHex($scope.editCalendar.calendarColor);
                $('#' + backgroundcolorcal + '').html('&#9989;');

            }, function (err) {
                console.error('ERR', err);
            });

        }

        // $(document).ready(function () {
        //     if (backgroundcolorcal != null) {
        //         $('#' + backgroundcolorcal + '').html('&#9989;');
        //     }
        // });

        /* Method used to convert Rgb format color to HexDecimal color code */
        function covertRgbToHex(color) {
            //console.log("in rgb2hex" + color);
            var rgb = color;
            //$localStorage.CalendarColor;
            // console.log(rgb);
            rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
            var calColorCode = (rgb && rgb.length === 4) ? "" +
                ("0" + parseInt(rgb[1], 10).toString(16)).slice(-2) +
                ("0" + parseInt(rgb[2], 10).toString(16)).slice(-2) +
                ("0" + parseInt(rgb[3], 10).toString(16)).slice(-2) : '';
            //console.log('calColorCode is:'+calColorCode);
            $scope.eventsColor = calColorCode;
            return calColorCode;
        }


        /* Method for update calendar */
        $scope.updateCalendar = function (editCalendarInfo) {

            var updateCalendarInfo = {};
            updateCalendarInfo.PersonCalendarName = editCalendarInfo.calenderName;
            updateCalendarInfo.Description = editCalendarInfo.description;
            updateCalendarInfo.CalendarColor = userCalendarColor;
            updateCalendarInfo.SharingEmails = 1;
            updateCalendarInfo.LastUpdatedByUserID = loggedInUserId;
            updateCalendarInfo.PersonCalendarID = calendarId;



            editCalendarLogic.updateCalendar(updateCalendarInfo).then(function (response) {

                appLogger.log("" + JSON.stringify(response));
                if (response.status == 200) {
                    delete $localStorage.editCalendarID;
                    //appLogger.alert('Calendar updated successfully');
                    toaster.pop('success', $scope.alertMessageLabels.CalenderUpdate , '', 5000, '');
                    $state.go('app.appointments');

                } else {
                    delete $localStorage.editCalendarID;
                    //appLogger.alert('Calendar updated unSuccessfully');
                    toaster.pop('error', $scope.alertMessageLabels.CalenderUpdateUnsucess, '', 5000, '');
                    $state.go('app.appointments');
                }
            }, function (err) {

                delete $localStorage.editCalendarID;
                //appLogger.alert('Calendar updated unSuccessfully');
                toaster.pop('error', $scope.alertMessageLabels.CalenderUpdateUnsucess, '', 5000, '');
                $state.go('app.appointments')

                console.error('ERR', err);
            });
        };

    });