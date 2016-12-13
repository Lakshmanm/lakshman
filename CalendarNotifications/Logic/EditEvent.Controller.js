/*===========================================================================
 All rights reserved to Nunet Cube Software Solutions.
 THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
 OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
 LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
 FITNESS FOR A PARTICULAR PURPOSE.
============================================================================
****************************************************************************
 Name               : EditEvent.Controller
 Type               : Angular Js  
 Description        : Define State provider and configure all controllers and templates with routers
 References         :
 Author             : Thriveni Yalavarthi.
 Created Date       : 11-04-2016.
****************************************************************************                          
MODIFICATION LOG
**************************************************************************** 
Ver Date         Modified By            Description
1.  06-04-2016   Thriveni Yalavarthi    Define controller logic for edit event 
2.  12-04-2016   Jagadeesh Adigarlla    Assigned localstorage values to userCalendarId and userEventId
3.  15-04-2016   Thriveni Yalavarthi    Added toaster functionality
****************************************************************************                            
Code Review LOG
**************************************************************************** 
S.No      Ver        Date                Code Review By            Observations
1         1.0       17-April-2016         Sri Venkatesh.T           Remove "var currentFileName = "EditEvent";" code which is not requried.
2         1.0       17-April-2016         Sri Venkatesh.T           Remove "months: data.labels.month," which is duplicated in bindLabels.
3         1.0       17-April-2016         Sri Venkatesh.T           In getPersonsEmails function persondetails & attendieobj was not declared properly with  "var" 
****************************************************************************
*/
var currentFileName = "EditEvent";
var app = angular.module('ThrillCNN.EditEvent', ['ThrillCNN.EditEventLogic',
'ThrillFrameworkLibrary.DataService',
 'ThrillCNN.config',                                            
    'ThrillCnnWebClient.appConfig',
    'ThrillFrameworkLibrary.appLogger',
    'ThrillFrameworkLibrary.Network','angular.circular.datetimepicker'
]);
/*Setup employee Controller */
app.controller('EditEventController',
    function($scope,
               cnnconfig,
               dataService,
        editEventLogic,
        $state,
        $http,
        appConfig,
        appLogger,
        $localStorage,
        $filter,
        toaster) {

        var loggedInUserId = $localStorage.loggedInUserID; //logged in userId
    
        var userCalendarId = $localStorage.editEventCalendarID; //used to hold user selected calendarId         
        var userEventId = $localStorage.editEventID; //used to hold the selected eventId

      
        getEventRecurrenceTypes();
        getUserCanlendars(loggedInUserId);
        getEventReminder();
        getEventReminderTypes();
        getPersonsEmails();
       // getLoggedInUserInfo(loggedInUserId);
        getEventInfoByEventIdCalId(userEventId, userCalendarId);



        /* Displaying Toast Messages */
        $scope.showSuccessAlert = false;
        $scope.showErrorAlert = false;
        $scope.switchBool = function(value) {
            $scope[value] = !$scope[value];
        };

        getLabels(appConfig.CULTURE_NAME);
    
        getMessages(appConfig.CULTURE_NAME);
        /*get labels with selected language*/
        function getLabels(cultureName) {

            var currentFileName = "EditEvent";
            $http.get("CalendarNotifications/Languages/" + currentFileName + "." + cultureName + ".json").then(function(response) {
                bindLabels(response.data);
                // appLogger.log("" + JSON.stringify(response.data));
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
                Update: data.labels.Update,
                Cancel: data.labels.Cancel,
            };

            $scope.editEventLables = lables;
            //appLogger.log("" + JSON.stringify($scope.editEventLables));

        }


        /* Method for retrieving recurrent pattern types */
        function getEventRecurrenceTypes() {
            editEventLogic.getEventRecurencePatternTypes().then(function(response) {
                //appLogger.log("recurrence Types" + JSON.stringify(response));
                $scope.eventRecurrenceTypes = response;
            }, function(err) {
                appLogger.error('ERR', err);
            });
        }


        /* Method for retrieving calendar by user id */
        function getUserCanlendars() {
            editEventLogic.getUserCalendars(loggedInUserId).then(function(response) {
                //appLogger.log("calendars" + JSON.stringify(response));
                $scope.userCalenders = response;
            }, function(err) {
                appLogger.error('ERR', err);
            });
        }

        /* Method for retrieving event Reminders (time) */
        function getEventReminder() {
            editEventLogic.getEventReminder().then(function(response) {
                //appLogger.log("reminders" + JSON.stringify(response));
                $scope.eventReminders = response;
            }, function(err) {
                appLogger.error('ERR', err);
            });
        }

        /* Method for retrieving Event Reminder Types */
        function getEventReminderTypes() {
            editEventLogic.getEventReminderTypes().then(function(response) {
                //appLogger.log("reminder types" + JSON.stringify(response));
                $scope.eventReminderTypes = response.data;
            }, function(err) {
                appLogger.error('ERR', err);
            });
        }

        /* Method for retrieving personsEmails */
        function getPersonsEmails() {
            editEventLogic.getPersonsEmails().then(function(response) {
                $scope.persondetails = response.data;
               // $("#demo-input-local").tokenInput($scope.persondetails);
               // alert("persons emails" + JSON.stringify($scope.persondetails));
            }, function(err) {
                appLogger.error('ERR', err);
            });
        }


        /* Method for get loggedIn user info by userId */
        function getLoggedInUserInfo(userId) {
            editEventLogic.getLoggedInUserInfo(userId).then(function(response) {
                //appLogger.log("logged in user id" + JSON.stringify(response));
                $scope.userFirstName = response[0].FirstName;
                $scope.userLastName = response[0].LastName;
                $scope.userEmailId = response[0].EmailID;
            }, function(err) {
                appLogger.error('ERR', err);
            });
        }
        $scope.editEvent = {};

        /*Method to retrieve Eventinfo of user by userId and calendarId */
        function getEventInfoByEventIdCalId(userEventId, userCalendarId) {

            editEventLogic.getEventInfoByEventIdCalId(userEventId, userCalendarId).then(function(response) {
                var userEventInfo = response[0];
              

                if (userEventInfo != undefined && userEventInfo != null && userEventInfo != '') {



                    if (response[0][0].Attendees != null) {
                        var attendid = response[0][0].Attendees;
                        var str_arrayid = attendid.split(',');
                      
                        var attendiesString = [];

                        var strPostString="";
                        for (var att = 0; att < str_arrayid.length; att++) {
                            strPostString=strPostString+"'"+str_arrayid[att]+"',";
                            

                        }
                        if(strPostString!="")
                            {
                                strPostString=strPostString.slice(0,-1);
                            }
                        var data={};
                         data.ReferenceKeylist=strPostString; 
                        dataService.callAPI(cnnconfig.CONTACT_API_URL + '/contactsinfo', JSON.stringify(data), 'POST').then(function (resp) {
                            
                          
                            attendiesString.push(resp.data.data);
                        
                        $("#demo-input-local").tokenInput($scope.persondetails, {
                            prePopulate: resp.data.data
                        });

                            
                        }, function (err) {

                        console.error('ERR', err);

                    });
                        
//                        attendieobj = {
//                                id: str_arrayid[att],
//                                name: str_arrayemail[att]
//                            };
//                            console.log(attendieobj);
//                            attendiesString.push(attendieobj);
                        

                    } else {
                      $("#demo-input-local").tokenInput($scope.persondetails);

                    }


                    var startDate = response[0][0].FromDate;
                    var startd = startDate.split('T');
                    var endDate = response[0][0].ToDate;
                    var endd = endDate.split('T');

                    var fromtime = response[0][0].FromTime.slice(0, 19);
                    //var frommyTime = fromtime.split('T');
                    var totime = response[0][0].ToTime.slice(0, 19);
                    //var tomyTime = totime.split('T');

                    var eventStartDateTime = response[0][0].FromDate + " " + fromtime;
                    var eventEndDateTime = response[0][0].ToDate + " " + totime;
                    
                    appLogger.log("startTime is:" + eventStartDateTime)
                    appLogger.log("endTime is:" + eventEndDateTime)


                    $scope.editEvent.eventTitle = response[0][0].EventName;
                    $scope.editEvent.startDate = eventStartDateTime;
                    $scope.editEvent.endDate = eventEndDateTime;
                    $scope.editEvent.reminder = response[0][0].ReminderID;
                    $scope.editEvent.remindertype = response[0][0].ReminderTypeID;
                    $scope.editEvent.calenderid = response[0][0].PersonCalendarID;
                    $scope.editEvent.location = response[0][0].Location;
                    $scope.editEvent.attendents = response[0][0].Attendees;
                    $scope.editEvent.description = response[0][0].EventDescription;
                    $scope.editEvent.EventID = response[0][0].EventID;
                    $scope.editEvent.EventRecurrenceID = response[0][0].EventRecurrenceID;

                    $scope.editEvent.recurrencePattern = response[0][0].EventRecurrenceTypeID;

                    if (response[0][0].DailyEveryXDays != null || response[0][0].DailyEveryXDays != "") {

                        $scope.editEvent.repeateveryXdays = 1;

                    } else {

                        $scope.editEvent.repeateveryXdays = "";
                    }

                    if (response[0][0].EventRecurrenceTypeID) {
                        var id = response[0][0].EventRecurrenceTypeID;

                        if (id == 1) {
                            $scope.daily = true;
                            $scope.weekly = false;
                            $scope.monthly = false;

                        } else if (id == 2) {

                            $scope.daily = false;
                            $scope.weekly = false;
                            $scope.monthly = true;

                        } else if (id == 3) {
                            $scope.daily = false;
                            $scope.weekly = true;
                            $scope.monthly = false;

                        } else {
                            $scope.daily = false;
                            $scope.weekly = false;
                            $scope.monthly = false;

                        }
                    }



                    $scope.editEvent.DailyEveryXDays = response[0][0].DailyEveryXDays;
                    $scope.editEvent.DailyEveryWeekday = response[0][0].DailyEveryWeekday;
                    $scope.editEvent.WeeklyEveryXWeeks = response[0][0].WeeklyEveryXWeeks;
                    if (response[0][0].WeeklyMonday == true) {
                        $scope.editEvent.WeeklyMonday = 1;
                    } else {
                        $scope.editEvent.WeeklyMonday = null;
                    }
                    if (response[0][0].WeeklyTuesday == true) {
                        $scope.editEvent.WeeklyTuesday = 1;
                    } else {
                        $scope.editEvent.WeeklyTuesday = null;
                    }
                    if (response[0][0].WeeklyWednesday == true) {
                        $scope.editEvent.WeeklyWednesday = 1;
                    } else {
                        $scope.editEvent.WeeklyWednesday = null;
                    }
                    if (response[0][0].WeeklyThursday == true) {
                        $scope.editEvent.WeeklyThursday = 1;
                    } else {
                        $scope.editEvent.WeeklyThursday = null;
                    }
                    if (response[0][0].WeeklyFriday == true) {
                        $scope.editEvent.WeeklyFriday = 1;
                    } else {
                        $scope.editEvent.WeeklyFriday = null;
                    }
                    if (response[0][0].WeeklySaturday == true) {
                        $scope.editEvent.WeeklySaturday = 1;
                    } else {
                        $scope.editEvent.WeeklySaturday = null;
                    }
                    if (response[0][0].WeeklySunday == true) {
                        $scope.editEvent.WeeklySunday = 1;
                    } else {
                        $scope.editEvent.WeeklySunday = null;
                    }


                    if (response[0][0].DayX != null) {
                        // console.log(response[0].DayX);
                        $scope.editEvent.dayXOfEveryXMonth = 1;
                        $scope.editEvent.EveryX1Months = response[0][0].EveryXMonths;
                    } else {
                        $scope.editEvent.dayXOfEveryXMonth = null;
                        $scope.editEvent.EveryX1Months = null;
                    }
                    $scope.editEvent.DayX = response[0][0].DayX;


                    if (response[0][0].First == 1) {
                        $scope.editEvent.monthfirst = "First";
                        $scope.editEvent.theXXOfEveryXMonth = 1;
                    } else if (response[0][0].Second == 1) {
                        $scope.editEvent.monthfirst = "First";
                        $scope.editEvent.theXXOfEveryXMonth = 1;

                    } else if (response[0][0].Third == 1) {
                        $scope.editEvent.monthfirst = "First";
                        $scope.editEvent.theXXOfEveryXMonth = 1;

                    } else if (response[0][0].Fourth == 1) {
                        $scope.editEvent.monthfirst = "First";
                        $scope.editEvent.theXXOfEveryXMonth = 1;

                    } else if (response[0][0].Last == 1) {
                        $scope.editEvent.monthfirst = "First";
                        $scope.editEvent.theXXOfEveryXMonth = 1;

                    } else {
                        $scope.editEvent.monthfirst = null;
                        $scope.editEvent.theXXOfEveryXMonth = 0;

                    }

                    if (response[0][0].MonthlySunday == 1) {
                        $scope.editEvent.monthlySunday = "MonthlySunday";
                        $scope.editEvent.EveryX2Months = response[0][0].EveryXMonths;
                    } else if (response[0][0].MonthlyMonday == 1) {
                        $scope.editEvent.monthlySunday = "MonthlyMonday";
                        $scope.editEvent.EveryX2Months = response[0][0].EveryXMonths;
                    } else if (response[0][0].MonthlyTuesday == 1) {
                        $scope.editEvent.monthlySunday = "MonthlyTuesday";
                        $scope.editEvent.EveryX2Months = response[0][0].EveryXMonths;
                    } else if (response[0][0].MonthlyWednesday == 1) {
                        $scope.editEvent.monthlySunday = "MonthlyWednesday";
                        $scope.editEvent.EveryX2Months = response[0][0].EveryXMonths;
                    } else if (response[0][0].MonthlyThursday == 1) {
                        $scope.editEvent.monthlySunday = "MonthlyThursday";
                        $scope.editEvent.EveryX2Months = response[0][0].EveryXMonths;
                    } else if (response[0][0].MonthlyFriday == 1) {
                        $scope.editEvent.monthlySunday = "MonthlyFriday";
                        $scope.editEvent.EveryX2Months = response[0][0].EveryXMonths;
                    } else if (response[0][0].MonthlySaturday == 1) {
                        $scope.editEvent.monthlySunday = "MonthlySaturday";
                        $scope.editEvent.EveryX2Months = response[0][0].EveryXMonths;

                    } else {
                        $scope.editEvent.monthlySunday = null;
                        $scope.editEvent.EveryX2Months = response[0][0].EveryXMonths;
                    }

                }
            }, function(err) {
                console.error('ERR', err);
            });

        }


        /*Method for cancel edit event creation */
        $scope.cancel = function() {
            delete $localStorage.editEventID;
            delete $localStorage.editEventCalendarID;

            $state.go('app.appointments', {}, {
                reload: true
            });

        };

        /*Method for cancel update event */
        $scope.updateEvent = function() {


            if ($scope.editEvent.startDate > $scope.editEvent.endDate) {
                appLogger.alert("Event start date is not greater than Event end date")
            } else if (new Date($scope.editEvent.startDate) < new Date()) {
                appLogger.alert("Start date is not less than current date")
            } else if (new Date($scope.editEvent.endDate) < new Date()) {
                appLogger.editEvent("End date is not less than current date")
            } else {

                var updateEventData = {};




               var splitstartDateTime = $filter('date')($scope.editEvent.startDate, "yyyy-MM-dd HH:mm:ss").split(' '); //$scope.createTask.startDateTime.split(' ');
               var splitendDateTime = $filter('date')($scope.editEvent.endDate, "yyyy-MM-dd HH:mm:ss").split(' '); //$scope.createTask.endDateTime.split(' ');

                appLogger.log("" + splitstartDateTime);
                appLogger.log("" + splitendDateTime);

                updateEventData.EventID = $scope.editEvent.EventID;
                updateEventData.EventRecurrenceID = $scope.editEvent.EventRecurrenceID;
                updateEventData.LastUpdatedByUserID = loggedInUserId;
                updateEventData.PersonCalendarID = $scope.editEvent.calenderid;
                updateEventData.EventName = $scope.editEvent.eventTitle;
                updateEventData.FromDate = splitstartDateTime[0];
                updateEventData.ToDate = $scope.editEvent.endDate;
                updateEventData.FromTime = splitstartDateTime[1];
                updateEventData.ToTime = splitendDateTime[1];


                var takenValue = $("#demo-input-local").tokenInput("get");
                var attendiesString = "";


                takenValue.forEach(function(resultObj) {

                    attendiesString = resultObj.name + "," + attendiesString;
                });



                updateEventData.Attendeesemails = attendiesString;


                updateEventData.Attendeesids = $("#demo-input-local").val();

                if ($scope.editEvent.recurrencePattern == "" || $scope.editEvent.recurrencePattern == undefined || $scope.editEvent.recurrencePattern == null) {
                    updateEventData.EventRecurrenceTypeID = 0;


                } else {

                    updateEventData.EventRecurrenceTypeID = $scope.editEvent.recurrencePattern;

                }



                updateEventData.CreatedByUserID = loggedInUserId;
                if ($scope.editEvent.reminder == "" || $scope.editEvent.reminder == "undefined") {
                    updateEventData.ReminderID = null;
                } else {
                    updateEventData.ReminderID = $scope.editEvent.reminder;
                }

                if ($scope.editEvent.remindertype == "" || $scope.editEvent.remindertype == "undefined") {
                    updateEventData.ReminderTypeID = null;
                } else {
                    updateEventData.ReminderTypeID = $scope.editEvent.remindertype;
                }

                updateEventData.EventDescription = $scope.editEvent.description;
                updateEventData.Attendees = $("#demo-input-local").val();
                if (updateEventData.Attendees == "" || updateEventData.Attendees == "undefined") {
                    updateEventData.sendical = false;
                } else {
                    updateEventData.sendical = $scope.editEvent.sendical;
                }
                updateEventData.Location = $scope.editEvent.location;

                updateEventData.sendicalstartdate = $scope.editEvent.startDate;
                updateEventData.sendicalenddate = $scope.editEvent.endDate;
                updateEventData.sendicalownername = $scope.userFirstName + " " + $scope.userLastName;
                updateEventData.sendicalowneremailid = $scope.userEmailId;







                if ($scope.editEvent.recurrencePattern != '' || $scope.editEvent.recurrencePattern != undefined) {
                    if ($scope.editEvent.recurrencePattern == 1) {
                        updateEventData.Daily = 1;
                        if ($scope.editEvent.repeateveryXdays == 1) {
                            updateEventData.DailyEveryXDays = $scope.editEvent.DailyEveryXDays;
                            updateEventData.DailyEveryWeekday = null;

                        } else {
                            updateEventData.DailyEveryXDays = null;

                        }

                        if ($scope.editEvent.DailyEveryWeekday == 1) {
                            updateEventData.DailyEveryWeekday = $scope.editEvent.DailyEveryWeekday;
                            updateEventData.DailyEveryXDays = null
                        } else {

                            updateEventData.DailyEveryWeekday = null;
                        }
                        //other

                        updateEventData.Monthly = null;
                        updateEventData.DayX = null;
                        updateEventData.EveryXMonths = null;

                        updateEventData.First = null;
                        updateEventData.Second = null;
                        updateEventData.Third = null;
                        updateEventData.Fourth = null;
                        updateEventData.Last = null;
                        updateEventData.MonthlySunday = null;
                        updateEventData.MonthlyMonday = null;
                        updateEventData.MonthlyTuesday = null;
                        updateEventData.MonthlyWednesday = null;
                        updateEventData.MonthlyThursday = null;
                        updateEventData.MonthlyFriday = null;
                        updateEventData.MonthlySaturday = null;
                        updateEventData.Weekly = null;
                        updateEventData.WeeklyEveryXWeeks = null;
                        updateEventData.WeeklySunday = null;
                        updateEventData.WeeklyMonday = null;
                        updateEventData.WeeklyTuesday = null;
                        updateEventData.WeeklyWednesday = null;
                        updateEventData.WeeklyThursday = null;
                        updateEventData.WeeklyFriday = null;
                        updateEventData.WeeklySaturday = null;


                        //other 
                    } else if ($scope.editEvent.recurrencePattern == 2) {
                        updateEventData.Monthly = 1;


                        if ($scope.editEvent.dayXOfEveryXMonth == 1) {

                            updateEventData.DayX = $scope.editEvent.DayX;
                            updateEventData.EveryXMonths = $scope.editEvent.EveryX1Months;
                            updateEventData.EveryX2Months = null;


                        } else {

                            updateEventData.DayX = null;
                            updateEventData.EveryXMonths = null;
                        }


                        if ($scope.editEvent.theXXOfEveryXMonth == 1) {

                            updateEventData.DayX = null;
                            updateEventData.EveryX1Months = null;

                            if ($scope.editEvent.EveryX2Months != "" || $scope.editEvent.EveryX2Months != "undefined") {
                                updateEventData.EveryXMonths = $scope.event.EveryX2Months;
                            } else {
                                updateEventData.EveryXMonths = null;
                            }

                            if ($scope.editEvent.monthfirst != "") {
                                if ($scope.editEvent.monthfirst == "First") {
                                    updateEventData.First = 1;
                                    updateEventData.Second = null;
                                    updateEventData.Third = null;
                                    updateEventData.Fourth = null;
                                    updateEventData.Last = null;

                                } else if ($scope.editEvent.monthfirst == "Second") {
                                    updateEventData.First = null;
                                    updateEventData.Second = 1;
                                    updateEventData.Third = null;
                                    updateEventData.Fourth = null;
                                    updateEventData.Last = null;


                                } else if ($scope.editEvent.monthfirst == "Third") {
                                    updateEventData.First = null;
                                    updateEventData.Second = null;
                                    updateEventData.Third = 1;
                                    updateEventData.Fourth = null;
                                    updateEventData.Last = null;


                                } else if ($scope.editEvent.monthfirst == "Fourth") {
                                    updateEventData.First = null;
                                    updateEventData.Second = null;
                                    updateEventData.Third = null;
                                    updateEventData.Fourth = 1;
                                    updateEventData.Last = null;


                                } else if ($scope.editEvent.monthfirst == "Last") {

                                    updateEventData.First = null;
                                    updateEventData.Second = null;
                                    updateEventData.Third = null;
                                    updateEventData.Fourth = null;
                                    updateEventData.Last = 1;
                                } else {
                                    updateEventData.First = null;
                                    updateEventData.Second = null;
                                    updateEventData.Third = null;
                                    updateEventData.Fourth = null;
                                    updateEventData.Last = null;
                                }

                            }

                            if ($scope.editEvent.monthlySunday != "") {
                                if ($scope.editEvent.monthlySunday == "MonthlySunday") {
                                    updateEventData.MonthlySunday = 1;
                                    updateEventData.MonthlyMonday = null;
                                    updateEventData.MonthlyTuesday = null;
                                    updateEventData.MonthlyWednesday = null;
                                    updateEventData.MonthlyThursday = null;
                                    updateEventData.MonthlyFriday = null;
                                    updateEventData.MonthlySaturday = null;

                                } else if ($scope.editEvent.monthlySunday == "MonthlyMonday") {
                                    updateEventData.MonthlySunday = null;
                                    updateEventData.MonthlyMonday = 1;
                                    updateEventData.MonthlyTuesday = null;
                                    updateEventData.MonthlyWednesday = null;
                                    updateEventData.MonthlyThursday = null;
                                    updateEventData.MonthlyFriday = null;
                                    updateEventData.MonthlySaturday = null;

                                } else if ($scope.editEvent.monthlySunday == "MonthlyTuesday") {

                                    updateEventData.MonthlySunday = null;
                                    updateEventData.MonthlyMonday = null;
                                    updateEventData.MonthlyTuesday = 1;
                                    updateEventData.MonthlyWednesday = null;
                                    updateEventData.MonthlyThursday = null;
                                    updateEventData.MonthlyFriday = null;
                                    updateEventData.MonthlySaturday = null;


                                } else if ($scope.editEvent.monthlySunday == "MonthlyWednesday") {

                                    updateEventData.MonthlySunday = null;
                                    updateEventData.MonthlyMonday = null;
                                    updateEventData.MonthlyTuesday = null;
                                    updateEventData.MonthlyWednesday = 1;
                                    updateEventData.MonthlyThursday = null;
                                    updateEventData.MonthlyFriday = null;
                                    updateEventData.MonthlySaturday = null;

                                } else if ($scope.editEvent.monthlySunday == "MonthlyThursday") {
                                    updateEventData.MonthlySunday = null;
                                    updateEventData.MonthlyMonday = null;
                                    updateEventData.MonthlyTuesday = null;
                                    updateEventData.MonthlyWednesday = null;
                                    updateEventData.MonthlyThursday = 1;
                                    updateEventData.MonthlyFriday = null;
                                    updateEventData.MonthlySaturday = null;

                                } else if ($scope.editEvent.monthlySunday == "MonthlyFriday") {

                                    updateEventData.MonthlySunday = null;
                                    updateEventData.MonthlyMonday = null;
                                    updateEventData.MonthlyTuesday = null;
                                    updateEventData.MonthlyWednesday = null;
                                    updateEventData.MonthlyThursday = null;
                                    updateEventData.MonthlyFriday = 1;
                                    updateEventData.MonthlySaturday = null;
                                } else if ($scope.editEvent.monthlySunday == "MonthlySaturday") {

                                    updateEventData.MonthlySunday = null;
                                    updateEventData.MonthlyMonday = null;
                                    updateEventData.MonthlyTuesday = null;
                                    updateEventData.MonthlyWednesday = null;
                                    updateEventData.MonthlyThursday = null;
                                    updateEventData.MonthlyFriday = null;
                                    updateEventData.MonthlySaturday = 1;
                                } else {

                                    updateEventData.MonthlySunday = null;
                                    updateEventData.MonthlyMonday = null;
                                    updateEventData.MonthlyTuesday = null;
                                    updateEventData.MonthlyWednesday = null;
                                    updateEventData.MonthlyThursday = null;
                                    updateEventData.MonthlyFriday = null;
                                    updateEventData.MonthlySaturday = null;

                                }

                            }

                        } else {

                            updateEventData.First = null;
                            updateEventData.Second = null;
                            updateEventData.Third = null;
                            updateEventData.Fourth = null;
                            updateEventData.Last = null;
                            updateEventData.MonthlySunday = null;
                            updateEventData.MonthlyMonday = null;
                            updateEventData.MonthlyTuesday = null;
                            updateEventData.MonthlyWednesday = null;
                            updateEventData.MonthlyThursday = null;
                            updateEventData.MonthlyFriday = null;
                            updateEventData.MonthlySaturday = null;



                        }
                        //other


                        updateEventData.Daily = null;
                        updateEventData.DailyEveryXDays = null;
                        updateEventData.DailyEveryWeekday = null;
                        updateEventData.Weekly = null;
                        updateEventData.WeeklyEveryXWeeks = null;
                        updateEventData.WeeklySunday = null;
                        updateEventData.WeeklyMonday = null;
                        updateEventData.WeeklyTuesday = null;
                        updateEventData.WeeklyWednesday = null;
                        updateEventData.WeeklyThursday = null;
                        updateEventData.WeeklyFriday = null;
                        updateEventData.WeeklySaturday = null;

                        //other



                    } else if ($scope.editEvent.recurrencePattern == 3) {

                        updateEventData.Weekly = 1;




                        if ($scope.editEvent.WeeklyEveryXWeeks == "" || $scope.editEvent.WeeklyEveryXWeeks == "undefined") {
                            updateEventData.WeeklyEveryXWeeks = null;

                        } else {
                            updateEventData.WeeklyEveryXWeeks = $scope.editEvent.WeeklyEveryXWeeks;

                        }

                        if ($scope.editEvent.WeeklySunday == "" || $scope.editEvent.WeeklySunday == "undefined") {
                            updateEventData.WeeklySunday = null;

                        } else {
                            updateEventData.WeeklySunday = $scope.editEvent.WeeklySunday;

                        }

                        if ($scope.editEvent.WeeklyMonday == "" || $scope.editEvent.WeeklyMonday == "undefined") {
                            updateEventData.WeeklyMonday = null;

                        } else {
                            updateEventData.WeeklyMonday = $scope.editEvent.WeeklyMonday;

                        }

                        if ($scope.editEvent.WeeklyTuesday == "" || $scope.editEvent.WeeklyTuesday == "undefined") {
                            updateEventData.WeeklyTuesday = null;

                        } else {
                            updateEventData.WeeklyTuesday = $scope.editEvent.WeeklyTuesday;

                        }

                        if ($scope.editEvent.WeeklyWednesday == "" || $scope.editEvent.WeeklyWednesday == "undefined") {
                            updateEventData.WeeklyWednesday = null;

                        } else {
                            updateEventData.WeeklyWednesday = $scope.editEvent.WeeklyWednesday;

                        }
                        if ($scope.editEvent.WeeklyThursday == "" || $scope.editEvent.WeeklyThursday == "undefined") {
                            updateEventData.WeeklyThursday = null;

                        } else {
                            updateEventData.WeeklyThursday = $scope.editEvent.WeeklyThursday;

                        }
                        if ($scope.editEvent.WeeklyFriday == "" || $scope.editEvent.WeeklyFriday == "undefined") {
                            updateEventData.WeeklyFriday = null;

                        } else {
                            updateEventData.WeeklyFriday = $scope.editEvent.WeeklyFriday;

                        }
                        if ($scope.editEvent.WeeklySaturday == "" || $scope.editEvent.WeeklySaturday == "undefined") {
                            updateEventData.WeeklySaturday = null;

                        } else {
                            updateEventData.WeeklySaturday = $scope.editEvent.WeeklySaturday;

                        }



                        //other

                        updateEventData.Daily = null;
                        updateEventData.DailyEveryXDays = null;
                        updateEventData.DailyEveryWeekday = null;
                        updateEventData.Monthly = null;
                        updateEventData.DayX = null;
                        updateEventData.EveryXMonths = null;

                        updateEventData.First = null;
                        updateEventData.Second = null;
                        updateEventData.Third = null;
                        updateEventData.Fourth = null;
                        updateEventData.Last = null;
                        updateEventData.MonthlySunday = null;
                        updateEventData.MonthlyMonday = null;
                        updateEventData.MonthlyTuesday = null;
                        updateEventData.MonthlyWednesday = null;
                        updateEventData.MonthlyThursday = null;
                        updateEventData.MonthlyFriday = null;
                        updateEventData.MonthlySaturday = null;

                        //other





                    } else {
                        //other 
                        updateEventData.Daily = null;
                        updateEventData.DailyEveryXDays = null;
                        updateEventData.DailyEveryWeekday = null;
                        updateEventData.Monthly = null;
                        updateEventData.DayX = null;
                        updateEventData.EveryXMonths = null;
                        updateEventData.First = null;
                        updateEventData.Second = null;
                        updateEventData.Third = null;
                        updateEventData.Fourth = null;
                        updateEventData.Last = null;
                        updateEventData.MonthlySunday = null;
                        updateEventData.MonthlyMonday = null;
                        updateEventData.MonthlyTuesday = null;
                        updateEventData.MonthlyWednesday = null;
                        updateEventData.MonthlyThursday = null;
                        updateEventData.MonthlyFriday = null;
                        updateEventData.MonthlySaturday = null;
                        updateEventData.Weekly = null;
                        updateEventData.WeeklyEveryXWeeks = null;
                        updateEventData.WeeklySunday = null;
                        updateEventData.WeeklyMonday = null;
                        updateEventData.WeeklyTuesday = null;
                        updateEventData.WeeklyWednesday = null;
                        updateEventData.WeeklyThursday = null;
                        updateEventData.WeeklyFriday = null;
                        updateEventData.WeeklySaturday = null;

                        //other
                    }




                }


              

                editEventLogic.updateEvent(updateEventData).then(function(response) {
                    //appLogger.log("response in update event" + response.data.message);
                    if (response.status == 200) {
                        delete $localStorage.editEventID;
                        delete $localStorage.editEventCalendarID;
                        //appLogger.alert('event updated successfully');
                        toaster.pop('success', 'Appointment updated successfully', '', 5000, '');
                        $state.go('app.appointments');
                    } else {
                        delete $localStorage.editEventID;
                        delete $localStorage.editEventCalendarID;
                        //appLogger.alert('event updated unSuccessfully');
                        toaster.pop('error', 'Appointment updated successfully' , '', 5000, '');
                        $state.go('app.appointments');
                    }
                }, function(err) {
                    delete $localStorage.editEventID;
                    delete $localStorage.editEventCalendarID;
                    //appLogger.alert('event updated unSuccessfully');
                    toaster.pop('error', 'Appointment updated successfully', '', 5000, '');
                    $state.go('app.appointments')
                    console.error('ERR', err);
                });

            }

        };


        $scope.reccurence = function(id) {

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

        };

    });