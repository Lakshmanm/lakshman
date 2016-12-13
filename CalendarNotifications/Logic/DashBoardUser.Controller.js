/*===========================================================================
 All rights reserved to Nunet Cube Software Solutions.
 THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
 OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
 LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
 FITNESS FOR A PARTICULAR PURPOSE.
============================================================================
****************************************************************************
 Name               : DashBoardUser.Controller
 Type               : Angular Js  
 Description        : containing attributes/properties and functions of DashBoard
 References         : https://angularjs.org/
 Author             : Murali Dadi.
 Created Date       : 06-04-2016.
****************************************************************************                          
MODIFICATION LOG
**************************************************************************** 
Ver Date         Modified By            Description
1.  12-04-2016   Jagadeesh Adigarlla    Defined controller code for Dashboard.Controller
2.  15-04-2016   Thriveni Yalavarthi    Added toaster functionality
****************************************************************************                            
Code Review LOG
**************************************************************************** 
S.No      Ver        Date                Code Review By            Observations
1         1.0       17-April-2016         Sri Venkatesh.T           $scope.deleteevent function  is not camel cased and also var deletecal = {} is not camel cased and give a meaningful name
2         1.0       17-April-2016         Sri Venkatesh.T           For $scope.editCalender give param a meaningfull name.
3         1.0       17-April-2016         Sri Venkatesh.T           Write comments for all the functions.          
4         1.0       17-April-2016         Sri Venkatesh.T           "eventClick" function else case was not implemented.
                                                                    As per coding standards for every if case there must be else case.
                                                         
 
****************************************************************************
*/




var app = angular.module('ThrillCNN.DashBoardUser', ['ThrillCnnWebClient.appConfig',
    'ThrillFrameworkLibrary.appLogger',
    'ngCordova',
    'ThrillFrameworkLibrary.geo',
    'ThrillFrameworkLibrary.Network',
    'ThrillCNN.DashBoardLogic'
    ,'ThrillAppBase.thrillAppBasePersonLogic' ,
    'angular.circular.datetimepicker'
]);

/*Setup employee Controller */
app.controller('DashBoardControllerUser', function($scope, $state, $http, appConfig, appLogger, $localStorage, dashBoardLogic, toaster,thrillAppBasePersonLogic) {
    
    
   
    $("#header-login").show();
    
  
    var loggedInUserID = $localStorage.loggedInUserID;
   
   
 $scope.calMenu=$localStorage.calMenu;


///  condition based calander css class'calendar_right'
    if($scope.calMenu==true) {
    $scope.calendarright='';
    }
    else {
    $scope.calendarright='calendar_right';

    }

    /////////////////////////////////////////////////////////



/////////////////////////////////////////////////////////
    getLabels(appConfig.CULTURE_NAME);
    getMessages(appConfig.CULTURE_NAME);

    /*get labels with selected language*/
    function getLabels(cultureName) {
        var currentFileName = "DashBoard";

        $http.get("CalendarNotifications/Languages/" + currentFileName + "." + cultureName + ".json").then(function(response) {

            bindLabels(response.data);


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
            MyCalendar: data.labels.MyCalendar

        };

        $scope.dashBoardLabels = lables;


    }


    $scope.profile = function() {
        $state.go('app.CNUserProfile', {}, {
            reload: true
        });
    };

    $scope.notificationSettings = function() {
        $state.go('app.NotificationSettings', {}, {
            reload: true
        });
    };

    $scope.createTask = function() {
        $state.go('app.CreateTask', {}, {
            reload: true
        });
    };

    $scope.createEvent = function() {

        $state.go('app.CreateEvent', {}, {
            reload: true
        });
    };

    $scope.editTask = function() {
        $state.go('app.EditTask', {}, {
            reload: true
        });
    };

    $scope.editEvent = function() {
        $state.go('app.EditEvent', {}, {
            reload: true
        });
    };

    $scope.createCalendar = function() {
        $state.go('app.CreateCalendar', {}, {
            reload: true
        });
    };

    $scope.editCalendar = function() {
        $state.go('app.EditCalendar', {}, {
            reload: true
        });
    };

    $scope.eventResponse = function() {
        $state.go('app.EventResponse', {}, {
            reload: true
        });
    };

    $scope.logout = function() {
        $state.go('app.authentication', {}, {
            reload: true
        });
    };


var loggedInUserID = $localStorage.loggedInUserID;

    var eventsArray = [];
    var tasksArray = [];
    var pastEventsArray = [];
    var pastTasksArray = [];

    var personCalendarResponse = [];
    var totalCalendars = 0;
    var totalLoops = 0;


$scope.$on('$viewContentLoaded', function() {
   
     $scope.myclickcal(loggedInUserID);
});

   
   
   $scope.myclickcal = function(loggedInUserID,listno) {


    
    $( "#staffmenu li").removeClass( "staffmenulistactive" );
    //$("#listID"+listno).removeClass( "staffmenulistactiveno" );
    $("#listID"+listno).addClass( "staffmenulistactive" );


    

   
    $localStorage.DoctorUserID=loggedInUserID;
  

    dashBoardLogic.getPersonCalendars(loggedInUserID).then(function(response) {

           

            personCalendarResponse = [];
            for (var columnReponse = 0; columnReponse < response.length; columnReponse++) {
                var calObj = [];
                calObj.PersonCalendarID = response[columnReponse].PersonCalendarID;
                calObj.PersonCalendarName = response[columnReponse].PersonCalendarName;
                calObj.DefaultCalendar = response[columnReponse].DefaultCalendar;
                calObj.organizationKey = response[columnReponse].OrganizationReferenceKey;
                if (response[columnReponse].CalendarColor == null || response[columnReponse].CalendarColor == "") {
                    calObj.CalendarColor = "rgb(226,242,254)";

                } else {
                    calObj.CalendarColor = response[columnReponse].CalendarColor;

                }
                calObj.defaultBackgroundColor = calObj.CalendarColor; // if checked is false set as #fff
                calObj.IsChecked = true;
                personCalendarResponse.push(calObj);
            }
            $scope.calenderresponse = personCalendarResponse;
            reloadCal(personCalendarResponse);
        },
        function(err) {

            appLogger.error('ERR', err);

        });



}


    var reloadCal = function(totalResponse) {
        var rescount = totalResponse.length;
        totalCalendars = 0;
        totalLoops = 0;
        for (var i = 0; i < rescount; i++) {
            if (totalResponse[i].IsChecked == true) {
                totalCalendars++;
                eventsFetchArray(totalResponse[i]);
            }
        }
    };


    var eventsFetchArray = function(calendarObj) {
        if (calendarObj.DefaultCalendar == true) {
            dashBoardLogic.getEventsSharedByPerson(loggedInUserID).then(function(response) {

                    var eventsObject = "";
                    for (var iet = 0; iet < response.length; iet++) {
                        var startDate = response[iet].FromDate;
                        var startd = startDate.split('T');
                        var endDate = response[iet].ToDate;
                        var endd = endDate.split('T');
                        var fromtime = response[iet].FromTime;
                        // var frommyTime = fromtime.split('T');
                        var totime = response[iet].ToTime;
                        // var tomyTime = totime.split('T');
                        eventsObject = {
                            title: response[iet].EventName,
                            start: startd[0] + "T" + fromtime,
                            end: endd[0] + "T" + totime,
                            color: calendarObj.CalendarColor,
                            allDayDefault: true,
                            eventtype: 'Event',
                            description: response[iet].EventDescription,
                            editevent: '#/app/editappointment',
                            eventid: response[iet].EventID,
                            calenderid: response[iet].PersonCalendarID,
                            shared: true,
                            editable:true
                        };

                        console.log(eventsObject);
                        eventsArray.push(eventsObject);
                    }
                },
                function(err) {
                    appLogger.error('ERR', err);
                });
        }

        dashBoardLogic.getEventsSharedByPersonCalendar(calendarObj.PersonCalendarID).then(function(response) {
                
                var eventsObject = "";
                for (var iet = 0; iet < response.length; iet++) {
                    var startDate = response[iet].FromDate;
                    var startd = startDate.split('T');
                    var endDate = response[iet].ToDate;
                    var endd = endDate.split('T');
                    var fromtime = response[iet].FromTime;
                    //var frommyTime = fromtime.split('T');
                    var totime = response[iet].ToTime;
                   // var tomyTime = totime.split('T');
                    eventsObject = {
                        title: response[iet].EventName,
                        start: startd[0] + "T" + fromtime,
                        end: endd[0] + "T" + totime,
                        color: response[iet].CalendarColor,
                        allDayDefault: true,
                        eventtype: 'Event',
                        description: response[iet].EventDescription,
                        editevent: '#/app/editappointment',
                        eventid: response[iet].EventID,
                        calenderid: response[iet].PersonCalendarID,
                        shared: false,
                        editable:true
                    };
                    eventsArray.push(eventsObject);
                };
                tasksFetchArray(calendarObj);
           
            },
            function(err) {
                appLogger.error('ERR', err);
                tasksFetchArray(calendarObj);
            });
    };


    var tasksFetchArray = function(calendarObj) {

              dashBoardLogic.getTasksByCalendarID($localStorage.organizationKey).then(function(response) {
            
          
           totalLoops++;
            
            if(response.length !=undefined){


                var tasksobjy = "";
                
                for (var itn = 0; itn <= response.length; itn++) {

                    if (itn == response.length) {
                        if (totalLoops == totalCalendars) {
                          
                            refreshEvents();
                        }

                    } else {
                        var startDate = response[itn].FromDate;
                        var startd = startDate.split('T');
                        var endDate = response[itn].ToDate;
                        var endd = endDate.split('T');
                        var fromtime = response[itn].FromTime;
                        //var frommyTime = fromtime.split('T');
                        var totime = response[itn].ToTime;
                        //var tomyTime = totime.split('T');
                        tasksobjy = {
                            title: response[itn].EventName,
                            start: startd[0] + "T" + fromtime,
                            end: endd[0] + "T" + totime,
                            color:  "#8A0829",
                            allDayDefault: true,
                            eventtype: 'Task',
                            description: response[itn].EventDescription,
                            editevent: '#/app/editevent',
                            eventid: response[itn].EventID,
                            calenderid: response[itn].PersonCalendarID,
                            shared: false,
                            editable:false
                        };
                        tasksArray.push(tasksobjy);

                    }

                }
            }else{
                //tasksArray=[];
                //alert(1)
                
                if (totalLoops == totalCalendars) {
                         // alert(1)
                            refreshEvents();
                        }
            }

            },
            function(err) {

                appLogger.error('ERR', err);
            });


    };



    function refreshEvents() {

        $('#calendar').fullCalendar('removeEventSource', pastTasksArray);
        $('#calendar').fullCalendar('removeEventSource', pastEventsArray);
        $('#calendar').fullCalendar('removeEvents');
        $('#calendar').fullCalendar('addEventSource', eventsArray);
        $('#calendar').fullCalendar('addEventSource', tasksArray);
        $('#calendar').fullCalendar('refetchEvents');

        pastTasksArray = tasksArray;
        pastEventsArray = eventsArray;
        eventsArray = [];
        tasksArray = [];

    };



// Doctors List///////////////////////////////////
getStaffList($localStorage.organizationKey,2);
    
     function getStaffList(organizationKey,roleId) {
        var persondetails=[];
        thrillAppBasePersonLogic.getPersonReferencekeys(organizationKey, roleId).then(function (response) {
             
         
          
            $scope.doctors=response;
            
                       });


    }


///////////////////////////////////////////////////////////////////////////////





    $scope.deleteCalender = function(id) {

        var del = confirm("Are you sure to delete calendar");
        if (del == true) {
            var deletecal = {};
            deletecal.PersonCalendarID = id;
            deletecal.LastUpdatedByUserID = loggedInUserID;
            dashBoardLogic.deleteCalendar(deletecal).then(function(response) {

                    if (response.status == 200) {
                        toaster.pop('success', $scope.alertMessageLabels.CalenderDelete, '', 5000, '');
                        $state.go("app.calendar", {}, {
                            reload: true
                        });
                    } else {
                        toaster.pop('error', $scope.alertMessageLabels.CalenderDeleteunsuccess, '', 5000, '');
                        $state.go("app.calendar", {}, {
                            reload: true
                        });
                    }
                },
                function(err) {
                    appLogger.error('ERR', err);
                    toaster.pop('error', $scope.alertMessageLabels.CalenderDeleteunsuccess, '', 5000, '');
                    $state.go("app.calendar", {}, {
                        reload: true
                    });
                });
        }
    };

    $scope.deleteevent = function() {

        var del = confirm("Are you sure to delete Appointment?");
        if (del == true) {

            var deletecal = {};
            deletecal.EventID = $localStorage.deleteEventID;
            deletecal.LastUpdatedByUserID = loggedInUserID;

            dashBoardLogic.deleteEventTask(deletecal).then(function(response) {
                
                    if (response.status == 200) {
                        delete $localStorage.deleteEventID;
                        toaster.pop('success','Appointment Deleted successfully', '', 5000, '');
                        // $state.go("app.calendar", {}, {
                        //     reload: true
                        // });
                         $('#fullCalModal').hide();
                         
                        reloadCal($scope.calenderresponse);

                    } else {
                        delete $localStorage.deleteEventID;
                        toaster.pop('error','Appointment Deleted successfully', '', 5000, '');
                       
                         $('#fullCalModal').hide();
                         reloadCal($scope.calenderresponse);



                    }
                },
                function(err) {
                    appLogger.error('ERR', err);
                    delete $localStorage.deleteEventID;
                    toaster.pop('error', $scope.alertMessageLabels.TaskDelete, '', 5000, '');
                    $state.go("app.calendar", {}, {
                        reload: true
                    });
                });




        }

    };


    $scope.editCalender = function(id) {
        $localStorage.editCalendarID = id;
        $state.go("app.EditCalendar", {}, {
            reload: true
        });
    };

    $scope.CreateNewCalendar = function() {
        $state.go("app.CreateCalendar", {}, {
            reload: true
        });
    };

    $scope.CreateNewTask = function() {
        $state.go("app.CreateTask", {}, {
            reload: true
        });
    };

    $scope.CreateNewEvent = function() {
        $state.go("app.CreateEvent", {}, {
            reload: true
        });
    };


    $scope.getcalenderevents = function(cal) {

        if (cal.IsChecked) {
            cal.IsChecked = false;
            cal.defaultBackgroundColor = "rgb(255, 255,255)";
        } else {
            cal.IsChecked = true;
            cal.defaultBackgroundColor = cal.CalendarColor;
        }

        reloadCal(personCalendarResponse);

    };

    $(document).ready(function($scope) {

        var getTodayDate = new Date();
        var defaultTodayDate = (getTodayDate.getFullYear() + '-' + (getTodayDate.getMonth() + 1) + '-' + getTodayDate.getDate());

        //full calender  
        $('#calendar').fullCalendar({

            customButtons: {
            EventButton: {
            text: 'Create Appointment',
            click: function() {

                $state.go('app.createappointment', {}, {
                reload: true
                });
            }
            }
            },
            header: {
                left: 'prev,next today',
                center: 'title',
                right: 'EventButton,month,agendaWeek,agendaDay'
            },
            defaultDate: defaultTodayDate,
            editable: true,
            timezone: 'UTC',
            eventLimit: true,
            displayEventTime: false,
            selectable: true,
            eventSources: [eventsArray, tasksArray],
                eventClick: function(event, jsEvent, view) {

                
                var startTimedata = (new Date(event.start)).toUTCString();
                var endTimedata = (new Date(event.end)).toUTCString();
                $scope.testdataValue = "testset";

                if (event.shared == true) {
                    $('.modal-footer').css('display', 'none');
                } else {
                    $('.modal-footer').css('display', 'block');
                }
                if(event.editable==true) {
                $('#modalTitle').html(event.title);
                $('#modalTitle').html(event.title);
                $('#eventDescription').html(event.description);
                $('#eventType').html(event.eventtype);
                $('#startdate').html(startTimedata);
                $('#enddate').html(endTimedata);
                $('#editevent').attr('href', event.editevent);
                $('#fullCalModal').modal();

                 } else {}

                if (event.shared == false) {
                    if (event.eventtype == "Task") {

                        $localStorage.editTaskID = event.eventid;
                        $localStorage.editTaskCalendarID = event.calenderid;
                        $localStorage.deleteEventID = event.eventid;
                        


                    } else if (event.eventtype == "Event") {

                        $localStorage.editEventID = event.eventid;
                        $localStorage.editEventCalendarID = event.calenderid;
                        $localStorage.deleteEventID = event.eventid;
                   

                    } else {}
                }

            },



            loading: function(bool) {
                $('#loading').toggle(bool);
            }


        });

    });



    $scope.mfbMenuState = 'close';
    $scope.changeMfbState = function() {
        if ($scope.mfbMenuState == 'open') {
            $scope.mfbMenuState = 'close';
        } else {
            $scope.mfbMenuState = 'open';
        }
    };
});