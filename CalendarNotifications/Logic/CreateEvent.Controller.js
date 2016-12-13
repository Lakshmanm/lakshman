/*===========================================================================
 All rights reserved to Nunet Cube Software Solutions.
 THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
 OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
 LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
 FITNESS FOR A PARTICULAR PURPOSE.
============================================================================
****************************************************************************
 Name		    	: CreateEvent.Controller
 Type		    	: Angular Js  
 Description		: Define State provider and configure all controllers and templates with routers
 References		    : https://angularjs.org/
 Author	    		: Thriveni Yalavarthi.
 Created Date       : 08-04-2016.
****************************************************************************                          
MODIFICATION LOG
**************************************************************************** 
Ver	Date	     Modified By			Description
1.	06-04-2016	 Thriveni Yalavarthi	Define controller logic for create event 
****************************************************************************                            
Code Review LOG
**************************************************************************** 
S.No      Ver        Date                Code Review By            Observations
1         1.0       17-April-2016         Sri Venkatesh.T           Remove "var currentFileName = "CreateEvent";" code which is not requried.
2         1.0       17-April-2016         Sri Venkatesh.T           Remove "months: data.labels.month," which is duplicated in bindLabels.
3         1.0       17-April-2016         Sri Venkatesh.T           In getPersonsEmails function persondetails was not declared properly with  "var" 
****************************************************************************
*/


var currentFileName = "CreateEvent";
var app = angular.module('ThrillCNN.CreateEvent', ['ThrillCNN.CreateEventLogic',
    'ThrillCnnWebClient.appConfig',
    'ThrillFrameworkLibrary.appLogger',
    'ThrillFrameworkLibrary.Network','angular.circular.datetimepicker']);
/*Setup employee Controller */
app.controller('CreateEventController',
    function ($scope,
        createEventLogic,
        $state,
        $http,
        appConfig,
        appLogger,
        $localStorage,
        toaster,
        $filter) {



        var loggedInUserId = $localStorage.DoctorUserID;

      /* Displaying Toast Messages */
        $scope.showSuccessAlert = false;
        $scope.showErrorAlert = false;
        $scope.switchBool = function (value) {
            $scope[value] = !$scope[value];
        };


        getLabels(appConfig.CULTURE_NAME);
        getMessages(appConfig.CULTURE_NAME);
        getEventRecurrenceTypes();
        getUserCanlendars(loggedInUserId);
        getEventReminder();
        getEventReminderTypes();
        getPersonsEmails();
        //getLoggedInUserInfo(loggedInUserId);

        /*get labels with selected language*/
        function getLabels(cultureName) {

            var currentFileName = "CreateEvent";
            $http.get("CalendarNotifications/Languages/" + currentFileName + "." + cultureName + ".json").then(function (response) {
                bindLabels(response.data);
                //appLogger.log("" + JSON.stringify(response.data));
            });
        }
     /*get alert labels*/
     function getMessages(cultureName) {
        var alertMessageName = "AlertMessages";

        $http.get("CalendarNotifications/Languages/" + alertMessageName + "." + cultureName + ".json").then(function (response) {
            $scope.alertMessageLabels = response.data.messages;
        });
    }
    

        /*bind labels with selected language */
        function bindLabels(data) {
            var lables = {
                EventTitle: data.labels.EventTitle,
                StartDateTime: data.labels.StartDateTime,
                EndDateTime: data.labels.EndDateTime,
                Reminder: data.labels.Reminder,
                ReminderType: data.labels.ReminderType,
                Calender: data.labels.Calender,
                RecurrencePattern: data.labels.RecurrencePattern,
                RecurrencePattern1: data.labels.RecurrencePattern1,
                RepeatsEvery: data.labels.RepeatsEvery,
                days: data.labels.days,
                Oneveryweekday: data.labels.Oneveryweekday,
                RecurrencePattern2: data.labels.RecurrencePattern2,
                Weeks: data.labels.Week,
                Monday: data.labels.Monday,
                Tuesday: data.labels.Tuesday,
                Wednesday: data.labels.Wednesday,
                Thursday: data.labels.Thursday,
                Friday: data.labels.Friday,
                Saturday: data.labels.Saturday,
                Sunday: data.labels.Sunday,
                RecurrencePattern3: data.labels.RecurrencePattern3,
                Day: data.labels.FirstName,
                ofevery: data.labels.FirstName,
                months: data.labels.month,
                months: data.labels.months,
                The: data.labels.The,
                Daily: data.labels.Daily,
                Weekly: data.labels.Weekly,
                Monthly: data.labels.Monthly,
                Location: data.labels.Location,
                Attendee: data.labels.Attendee,
                Description: data.labels.Description,
                SendiCalender: data.labels.SendiCalender,
                Save: data.labels.Save,
                Cancel: data.labels.Cancel,
            };

            $scope.createEventLables = lables;
            //appLogger.log("" + JSON.stringify($scope.createEventLables));

        };

        /* Method for retrieving recurrent pattern types */
        function getEventRecurrenceTypes() {
            createEventLogic.getEventRecurencePatternTypes().then(function (response) {
                //appLogger.log("recurrence Types" + JSON.stringify(response));
                $scope.eventRecurrenceTypes = response;
            }, function (err) {
                appLogger.error('ERR', err);
            });
        }


        /* Method for retrieving calendar by user id */
        function getUserCanlendars(loggedInUserId) {
            createEventLogic.getUserCalendars(loggedInUserId).then(function (response) {
                appLogger.log("calendars" + JSON.stringify(response));
                $scope.userCalenders = response;
            }, function (err) {
                appLogger.error('ERR', err);
            });
        }

        /* Method for retrieving event Reminders (time) */
        function getEventReminder() {
            createEventLogic.getEventReminder().then(function (response) {
                //appLogger.log("reminders" + JSON.stringify(response));
                $scope.eventReminders = response;
            }, function (err) {
                appLogger.error('ERR', err);
            });
        }

        /* Method for retrieving Event Reminder Types */
        function getEventReminderTypes() {
            createEventLogic.getEventReminderTypes().then(function (response) {
                //appLogger.log("reminder types" + JSON.stringify(response));
                $scope.eventReminderTypes = response;
            }, function (err) {
                appLogger.error('ERR', err);
            });
        }

        /* Method for retrieving personsEmails */
        function getPersonsEmails() {
            createEventLogic.getPersonsEmails().then(function (response) {   

           
                persondetails = response.data;
                
//                var userdata=[];
                
            



//               $.each( persondetails, function( key, value ) {
 

//   userdata.push(value.name);
// }); 
                
                $("#demo-input-local").tokenInput(persondetails);




  //alert(JSON.stringify(userdata));
// $( "#demo-input-local" ).autocomplete({
//                source: userdata
//             });


            appLogger.log("persons emails" + JSON.stringify(persondetails));
            }, function (err) {
                appLogger.error('ERR', err);
            });
        }


        /* Method for get loggedIn user info by userId */
        function getLoggedInUserInfo(userId) {
            createEventLogic.getLoggedInUserInfo(userId).then(function (response) {
                //appLogger.log("logged in user id" + JSON.stringify(response));
                $scope.userFirstName = response[0].FirstName;
                $scope.userLastName = response[0].LastName;
                $scope.userEmailId = response[0].EmailID;
            }, function (err) {
                appLogger.error('ERR', err);
            });
        }


        /* Method for showing recurrence pattern based on user selction for weekly,daily and monthly */
        $scope.reccurence = function (id) {

            if (id == 1) {
                $scope.daily = true;
                $scope.weekly = false;
                $scope.monthly = false;

            } else if (id == 2) {

                $scope.daily = false;
                $scope.weekly = true;
                $scope.monthly = false;

            } else if (id == 3) {
                $scope.daily = false;
                $scope.weekly = false;
                $scope.monthly = true;

            } else {
                $scope.daily = false;
                $scope.weekly = false;
                $scope.monthly = false;

            }

        }


        /*Method for cancel new event creation */
        $scope.cancel = function () {
            $state.go('app.appointments');

        }
        $scope.event = {};
    

        /* Method for create New Event */
        $scope.createEvent = function () {

   

          if ($scope.event.startDate > $scope.event.endDate) {
              alert("Event start date is not greater than Event end date")
            } else if (new Date($scope.event.startDate) < new Date()) {
               alert("Start date is not less than current date")
            } else if (new Date($scope.event.endDate) < new Date()) {
              alert("End date is not less than current date")
            } else {

                



                var createEventData = {}; //Holds new event data
                var splitstartDateTime = $filter('date')($scope.event.startDate, 'yyyy-MM-dd HH:mm:ss').split(' ');//$scope.event.startDate.split(' ');
                var splitendDateTime = $filter('date')($scope.event.endDate, 'yyyy-MM-dd HH:mm:ss').split(' ');//$scope.event.endDate.split(' ');

       

                createEventData.PersonCalendarID = $scope.event.calenderId;
                createEventData.EventName = $scope.event.eventTitle;
                createEventData.FromDate = splitstartDateTime[0];
                createEventData.ToDate = splitendDateTime[0];
                createEventData.FromTime = splitstartDateTime[1];
                createEventData.ToTime = splitendDateTime[1];
                createEventData.CreatedByUserID = $localStorage.loggedInUserID;
                createEventData.EventDescription = $scope.event.description;
                createEventData.Location = $scope.event.location;


                if ($scope.event.recurrencePattern == "" || $scope.event.recurrencePattern == undefined || $scope.event.recurrencePattern == null) {
                    createEventData.EventRecurrenceTypeID = 0;


                } else {

                    createEventData.EventRecurrenceTypeID = $scope.event.recurrencePattern;

                }
                if ($scope.event.reminder == "" || $scope.event.reminder == "undefined") {
                    createEventData.ReminderID = null;
                } else {
                    createEventData.ReminderID = $scope.event.reminder;
                }

                if ($scope.event.reminderType == "" || $scope.event.reminderType == "undefined") {
                    createEventData.ReminderTypeID = null;
                } else {
                    createEventData.ReminderTypeID = $scope.event.reminderType;
                }

                

                var takenValue = $("#demo-input-local").tokenInput("get");
                var attendiesString = "";

                takenValue.forEach(function (resultObj) {
                    //appLogger.log(resultObj);
                    attendiesString = resultObj.name + "," + attendiesString;
                });

                createEventData.Attendeesemails = attendiesString;

                createEventData.Attendeesids = $("#demo-input-local").val();

                if (createEventData.Attendees == "" || createEventData.Attendees == "undefined") {
                    createEventData.sendical = false;
                } else {
                    createEventData.sendical = $scope.event.sendICal;
                }

                createEventData.sendicalstartdate = $scope.event.startDate;
                createEventData.sendicalenddate = $scope.event.endDate;
                createEventData.sendicalownername = $scope.userFirstName + " " + $scope.userLastName;
                createEventData.sendicalowneremailid = $scope.userEmailId;

                if ($scope.event.recurrencePattern != '' || $scope.event.recurrencePattern != undefined) {
                    if ($scope.event.recurrencePattern == 1) {
                        createEventData.Daily = 1;
                        if ($scope.event.repeateveryXdays == 1) {
                            createEventData.DailyEveryXDays = $scope.event.DailyEveryXDays;
                            createEventData.DailyEveryWeekday = null;

                        } else {
                            createEventData.DailyEveryXDays = null;

                        }

                        if ($scope.event.DailyEveryWeekday == 1) {
                            createEventData.DailyEveryWeekday = $scope.event.DailyEveryWeekday;
                            createEventData.DailyEveryXDays = null
                        } else {

                            createEventData.DailyEveryWeekday = null;
                        }
                        //other

                        createEventData.Monthly = null;
                        createEventData.DayX = null;
                        createEventData.EveryXMonths = null;

                        createEventData.First = null;
                        createEventData.Second = null;
                        createEventData.Third = null;
                        createEventData.Fourth = null;
                        createEventData.Last = null;
                        createEventData.MonthlySunday = null;
                        createEventData.MonthlyMonday = null;
                        createEventData.MonthlyTuesday = null;
                        createEventData.MonthlyWednesday = null;
                        createEventData.MonthlyThursday = null;
                        createEventData.MonthlyFriday = null;
                        createEventData.MonthlySaturday = null;

                        createEventData.Weekly = null;
                        createEventData.WeeklyEveryXWeeks = null;
                        createEventData.WeeklySunday = null;
                        createEventData.WeeklyMonday = null;
                        createEventData.WeeklyTuesday = null;
                        createEventData.WeeklyWednesday = null;
                        createEventData.WeeklyThursday = null;
                        createEventData.WeeklyFriday = null;
                        createEventData.WeeklySaturday = null;


                        //other 
                    } else if ($scope.event.recurrencePattern == 2) {
                        createEventData.Monthly = 1;

                        /* This is for user select input to repeats event recurrence for every n days of every n months */
                       if ($scope.event.dayXOfEveryXMonth == 1) {
                            createEventData.DayX = $scope.event.DayX;
                            createEventData.EveryXMonths = $scope.event.EveryX1Months;
                            createEventData.EveryX2Months = null;
                        } else {
                            createEventData.DayX = null;
                            createEventData.EveryXMonths = null;
                        }


                        if ($scope.event.theXXOfEveryXMonth == 1) {

                            createEventData.DayX = null;
                            createEventData.EveryX1Months = null;

                            if ($scope.event.EveryX2Months != "" || $scope.event.EveryX2Months != "undefined") {
                                createEventData.EveryXMonths = $scope.event.EveryX2Months;
                            } else {
                                createEventData.EveryXMonths = null;
                            }

                            if ($scope.event.monthfirst != "") {
                                if ($scope.event.monthfirst == "First") {
                                    createEventData.First = 1;
                                    createEventData.Second = null;
                                    createEventData.Third = null;
                                    createEventData.Fourth = null;
                                    createEventData.Last = null;

                                } else if ($scope.event.monthfirst == "Second") {
                                    createEventData.First = null;
                                    createEventData.Second = 1;
                                    createEventData.Third = null;
                                    createEventData.Fourth = null;
                                    createEventData.Last = null;


                                } else if ($scope.event.monthfirst == "Third") {
                                    createEventData.First = null;
                                    createEventData.Second = null;
                                    createEventData.Third = 1;
                                    createEventData.Fourth = null;
                                    createEventData.Last = null;


                                } else if ($scope.event.monthfirst == "Fourth") {
                                    createEventData.First = null;
                                    createEventData.Second = null;
                                    createEventData.Third = null;
                                    createEventData.Fourth = 1;
                                    createEventData.Last = null;


                                } else if ($scope.event.monthfirst == "Last") {

                                    createEventData.First = null;
                                    createEventData.Second = null;
                                    createEventData.Third = null;
                                    createEventData.Fourth = null;
                                    createEventData.Last = 1;
                                } else {
                                    createEventData.First = null;
                                    createEventData.Second = null;
                                    createEventData.Third = null;
                                    createEventData.Fourth = null;
                                    createEventData.Last = null;
                                }

                            }

                            if ($scope.event.monthlySunday != "") {
                                if ($scope.event.monthlySunday == "MonthlySunday") {
                                    createEventData.MonthlySunday = 1;
                                    createEventData.MonthlyMonday = null;
                                    createEventData.MonthlyTuesday = null;
                                    createEventData.MonthlyWednesday = null;
                                    createEventData.MonthlyThursday = null;
                                    createEventData.MonthlyFriday = null;
                                    createEventData.MonthlySaturday = null;

                                } else if ($scope.event.monthlySunday == "MonthlyMonday") {
                                    createEventData.MonthlySunday = null;
                                    createEventData.MonthlyMonday = 1;
                                    createEventData.MonthlyTuesday = null;
                                    createEventData.MonthlyWednesday = null;
                                    createEventData.MonthlyThursday = null;
                                    createEventData.MonthlyFriday = null;
                                    createEventData.MonthlySaturday = null;

                                } else if ($scope.event.monthlySunday == "MonthlyTuesday") {

                                    createEventData.MonthlySunday = null;
                                    createEventData.MonthlyMonday = null;
                                    createEventData.MonthlyTuesday = 1;
                                    createEventData.MonthlyWednesday = null;
                                    createEventData.MonthlyThursday = null;
                                    createEventData.MonthlyFriday = null;
                                    createEventData.MonthlySaturday = null;


                                } else if ($scope.event.monthlySunday == "MonthlyWednesday") {

                                    createEventData.MonthlySunday = null;
                                    createEventData.MonthlyMonday = null;
                                    createEventData.MonthlyTuesday = null;
                                    createEventData.MonthlyWednesday = 1;
                                    createEventData.MonthlyThursday = null;
                                    createEventData.MonthlyFriday = null;
                                    createEventData.MonthlySaturday = null;

                                } else if ($scope.event.monthlySunday == "MonthlyThursday") {
                                    createEventData.MonthlySunday = null;
                                    createEventData.MonthlyMonday = null;
                                    createEventData.MonthlyTuesday = null;
                                    createEventData.MonthlyWednesday = null;
                                    createEventData.MonthlyThursday = 1;
                                    createEventData.MonthlyFriday = null;
                                    createEventData.MonthlySaturday = null;

                                } else if ($scope.event.monthlySunday == "MonthlyFriday") {

                                    createEventData.MonthlySunday = null;
                                    createEventData.MonthlyMonday = null;
                                    createEventData.MonthlyTuesday = null;
                                    createEventData.MonthlyWednesday = null;
                                    createEventData.MonthlyThursday = null;
                                    createEventData.MonthlyFriday = 1;
                                    createEventData.MonthlySaturday = null;
                                } else if ($scope.event.monthlySunday == "MonthlySaturday") {

                                    createEventData.MonthlySunday = null;
                                    createEventData.MonthlyMonday = null;
                                    createEventData.MonthlyTuesday = null;
                                    createEventData.MonthlyWednesday = null;
                                    createEventData.MonthlyThursday = null;
                                    createEventData.MonthlyFriday = null;
                                    createEventData.MonthlySaturday = 1;
                                } else {

                                    createEventData.MonthlySunday = null;
                                    createEventData.MonthlyMonday = null;
                                    createEventData.MonthlyTuesday = null;
                                    createEventData.MonthlyWednesday = null;
                                    createEventData.MonthlyThursday = null;
                                    createEventData.MonthlyFriday = null;
                                    createEventData.MonthlySaturday = null;

                                }

                            }

                        } else {

                            createEventData.First = null;
                            createEventData.Second = null;
                            createEventData.Third = null;
                            createEventData.Fourth = null;
                            createEventData.Last = null;
                            createEventData.MonthlySunday = null;
                            createEventData.MonthlyMonday = null;
                            createEventData.MonthlyTuesday = null;
                            createEventData.MonthlyWednesday = null;
                            createEventData.MonthlyThursday = null;
                            createEventData.MonthlyFriday = null;
                            createEventData.MonthlySaturday = null;



                        }
                        //other


                        createEventData.Daily = null;
                        createEventData.DailyEveryXDays = null;
                        createEventData.DailyEveryWeekday = null;

                        createEventData.Weekly = null;
                        createEventData.WeeklyEveryXWeeks = null;
                        createEventData.WeeklySunday = null;
                        createEventData.WeeklyMonday = null;
                        createEventData.WeeklyTuesday = null;
                        createEventData.WeeklyWednesday = null;
                        createEventData.WeeklyThursday = null;
                        createEventData.WeeklyFriday = null;
                        createEventData.WeeklySaturday = null;

                        //other


                    } //2
                    else if ($scope.event.recurrencePattern == 3) {

                        createEventData.Weekly = 1;

                        if ($scope.event.WeeklyEveryXWeeks == "" || $scope.event.WeeklyEveryXWeeks == "undefined") {
                            createEventData.WeeklyEveryXWeeks = null;

                        } else {
                            createEventData.WeeklyEveryXWeeks = $scope.event.WeeklyEveryXWeeks;

                        }

                        if ($scope.event.WeeklySunday == "" || $scope.event.WeeklySunday == "undefined") {
                            createEventData.WeeklySunday = null;

                        } else {
                            createEventData.WeeklySunday = $scope.event.WeeklySunday;

                        }

                        if ($scope.event.WeeklyMonday == "" || $scope.event.WeeklyMonday == "undefined") {
                            createEventData.WeeklyMonday = null;

                        } else {
                            createEventData.WeeklyMonday = $scope.event.WeeklyMonday;

                        }

                        if ($scope.event.WeeklyTuesday == "" || $scope.event.WeeklyTuesday == "undefined") {
                            createEventData.WeeklyTuesday = null;

                        } else {
                            createEventData.WeeklyTuesday = $scope.event.WeeklyTuesday;

                        }

                        if ($scope.event.WeeklyWednesday == "" || $scope.event.WeeklyWednesday == "undefined") {
                            createEventData.WeeklyWednesday = null;

                        } else {
                            createEventData.WeeklyWednesday = $scope.event.WeeklyWednesday;

                        }
                        if ($scope.event.WeeklyThursday == "" || $scope.event.WeeklyThursday == "undefined") {
                            createEventData.WeeklyThursday = null;

                        } else {
                            createEventData.WeeklyThursday = $scope.event.WeeklyThursday;

                        }
                        if ($scope.event.WeeklyFriday == "" || $scope.event.WeeklyFriday == "undefined") {
                            createEventData.WeeklyFriday = null;

                        } else {
                            createEventData.WeeklyFriday = $scope.event.WeeklyFriday;

                        }
                        if ($scope.event.WeeklySaturday == "" || $scope.event.WeeklySaturday == "undefined") {
                            createEventData.WeeklySaturday = null;

                        } else {
                            createEventData.WeeklySaturday = $scope.event.WeeklySaturday;

                        }



                        //other

                        createEventData.Daily = null;
                        createEventData.DailyEveryXDays = null;
                        createEventData.DailyEveryWeekday = null;
                        createEventData.Monthly = null;
                        createEventData.DayX = null;
                        createEventData.EveryXMonths = null;

                        createEventData.First = null;
                        createEventData.Second = null;
                        createEventData.Third = null;
                        createEventData.Fourth = null;
                        createEventData.Last = null;
                        createEventData.MonthlySunday = null;
                        createEventData.MonthlyMonday = null;
                        createEventData.MonthlyTuesday = null;
                        createEventData.MonthlyWednesday = null;
                        createEventData.MonthlyThursday = null;
                        createEventData.MonthlyFriday = null;
                        createEventData.MonthlySaturday = null;

                        //other





                    } else {
                        //other 
                        createEventData.Daily = null;
                        createEventData.DailyEveryXDays = null;
                        createEventData.DailyEveryWeekday = null;

                        createEventData.Monthly = null;
                        createEventData.DayX = null;
                        createEventData.EveryXMonths = null;
                        createEventData.First = null;
                        createEventData.Second = null;
                        createEventData.Third = null;
                        createEventData.Fourth = null;
                        createEventData.Last = null;
                        createEventData.MonthlySunday = null;
                        createEventData.MonthlyMonday = null;
                        createEventData.MonthlyTuesday = null;
                        createEventData.MonthlyWednesday = null;
                        createEventData.MonthlyThursday = null;
                        createEventData.MonthlyFriday = null;
                        createEventData.MonthlySaturday = null;

                        createEventData.Weekly = null;
                        createEventData.WeeklyEveryXWeeks = null;
                        createEventData.WeeklySunday = null;
                        createEventData.WeeklyMonday = null;
                        createEventData.WeeklyTuesday = null;
                        createEventData.WeeklyWednesday = null;
                        createEventData.WeeklyThursday = null;
                        createEventData.WeeklyFriday = null;
                        createEventData.WeeklySaturday = null;

                        //other
                    }

                } //if
//                createEventData.Attendeesemails="thriveni.yalavarthi@nunet3.com";
//                createEventData.Attendeesids="aa3ef820-1dad-11e6-9a49-bd173e2c8de7";

                


           createEventLogic.createNewEvent(createEventData).then(function (response) {
                   appLogger.log("createEvent Response" + JSON.stringify(response));

                    if (response.status == 200) {
                        //appLogger.alert("Event Created successfully");
                        toaster.pop('success', $scope.alertMessageLabels.EventSave, '', 5000, '');
                        $state.go('app.appointments')
                    } else {
                        //appLogger.alert("Event Created unSuccessfully");
                        toaster.pop('error', $scope.alertMessageLabels.EventUnSave , '', 5000, '');
                        $state.go('app.appointments')
                    }
                }, function (err) {
                    appLogger.error('ERR', err);
                    toaster.pop('error',$scope.alertMessageLabels.EventUnSave , '', 5000, '');
                    $state.go('app.appointments')
                }); 
                
                
                //console.log("createEvent Object is:::"+JSON.stringify(createEventData));
            }
        }

    });