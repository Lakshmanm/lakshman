/*===========================================================================
 All rights reserved to Nunet Cube Software Solutions.
 THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
 OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
 LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
 FITNESS FOR A PARTICULAR PURPOSE.
============================================================================
****************************************************************************
 Name               : EditTask.Controller
 Type               : Angular Js  
 Description        : containing attributes/properties and functions of EditTask
 References         : https://angularjs.org/
 Author             : Thriveni Yalavarthi.
 Created Date       : 11-04-2016.
****************************************************************************                          
MODIFICATION LOG
**************************************************************************** 
Ver Date         Modified By            Description
1.  11-04-2016   Thriveni Yalavarthi    Define the controller logic of edit task
2.  12-04-2016   Jagadeesh Adigarlla    Assigned localstorage values to userCalendarId and userEventId
3.  15-04-2016   Thriveni Yalavarthi    Added toaster functionality
****************************************************************************                            
Code Review LOG
**************************************************************************** 
S.No      Ver        Date                Code Review By            Observations
1         1.0       17-April-2016         Sri Venkatesh.T           Remove "var currentFileName = "EditTask";" code which is not requried.
2         1.0       17-April-2016         Sri Venkatesh.T           Remove "months: data.labels.month," which is duplicated in bindLabels.
3         1.0       17-April-2016         Sri Venkatesh.T           In getPersonsEmails function persondetails & attendieobj was not declared properly with  "var" 
****************************************************************************
*/


var currentFileName = "EditTask";




var app = angular.module('ThrillCNN.EditTask', ['ThrillCNN.EditTaskLogic',
    'ThrillFrameworkLibrary.geo',
    'ThrillFrameworkLibrary.Network',
    'ThrillCnnWebClient.appConfig',
    'ThrillFrameworkLibrary.appLogger',
    'angular.circular.datetimepicker'
])


/*Setup employee Controller */
app.controller('EditTaskController',
    function($scope,
        editTaskLogic,
        $state,
        $http,
        appConfig,
        appLogger,
        toaster,
        $filter,
        $localStorage) {

        /* Displying Toaster messages */
        $scope.showSuccessAlert = false;
        $scope.showErrorAlert = false;
        $scope.switchBool = function(value) {
            $scope[value] = !$scope[value];
        };


     var loggedInUserId = $localStorage.loggedInUserID; //used to hold logged in userId


        var userCalendarId = $localStorage.editTaskCalendarID;; //holds to user selected calendarId

        var userTaskId = $localStorage.editTaskID; //holds to user selected taskId


         
        getLabels(appConfig.CULTURE_NAME);

        getUserCanlendars(loggedInUserId);
        getEventTaskStatus();
        getEventPriority();

        getTaskInfoByTaskIdCalId(userTaskId, userCalendarId);


     
        /*get labels with selected language*/
        function getLabels(cultureName) {

            var currentFileName = "EditTask";
            $http.get("CalendarNotifications/Languages/" + currentFileName + "." + cultureName + ".json").then(function(response) {
                bindLabels(response.data);
                //appLogger.log("" + JSON.  stringify(response.data));
            });
        }
        /*bind labels with selected language */
        function bindLabels(data) {
            var lables = {
                TaskTitle: data.labels.TaskTitle,
                TaskDescription: data.labels.TaskDescription,
                StartDateTime: data.labels.StartDateTime,
                EndDateTime: data.labels.EndDateTime,
                Calender: data.labels.Calender,
                Status: data.labels.Status,
                Priority: data.labels.Priority,
                Update: data.labels.Update,
                Cancel: data.labels.Cancel
            };

            $scope.editTaskLables = lables;
            //appLogger.log("" + JSON.stringify($scope.editTaskLables));

        }

        /*Method for cancel new task creation */
        $scope.cancel = function() {
            delete $localStorage.editTaskCalendarID;
            delete $localStorage.editTaskID;
            $state.go('app.calendar', {}, {
                reload: true
            });

        };

        /*Method for get user calendars creation */
        function getUserCanlendars(userId) {
            editTaskLogic.getUserCalendars(userId).then(function(response) {
                //appLogger.log("userCalendars" + JSON.stringify(response));
                $scope.userCalenders = response;
            }, function(err) {
                console.error('ERR', err);


            });
        }

        /*Method for get user event tasks creation */
        function getEventTaskStatus() {
            editTaskLogic.getEventTaskStatus().then(function(response) {
                $scope.eventStatus = response;
                //appLogger.log("userEventTaskStatus" + JSON.stringify($scope.eventPriority));
            }, function(err) {
                console.error('ERR', err);


            });
        }

        /*Method for get event priority levels creation */
        function getEventPriority() {
            editTaskLogic.getEventPriority().then(function(response) {
                $scope.eventPriority = response;
                //appLogger.log("userEventPriority" + JSON.stringify($scope.eventStatus));
            }, function(err) {
                console.error('ERR', err);
            });
        }

        /*Method for cancel edit task creation */
        $scope.cancel = function() {
            $state.go('app.calendar');

        };

        $scope.editTask = {};

        /*Method to retrieve Taskinfo of user by userId and calendarId */
        function getTaskInfoByTaskIdCalId(userTaskId, userCalendarId) {


            editTaskLogic.getTaskInfoByTaskIdCalId(userTaskId, userCalendarId).then(function(response) {
               
                
                if (response != undefined && response != null && response != '') {



                    var userTackInfo = response[0][0];
                  

                    /* Coverting task start date and end date to format 'yyyy/mm/dd hh:mm:ss' */
                    var startDate = userTackInfo.FromDate;
                    var endDate = userTackInfo.ToDate;


                    var fromTime = userTackInfo.FromTime.slice(0, 19);
                    var toTime = userTackInfo.ToTime.slice(0, 19);




                    var editTaskStartTimeDate = userTackInfo.FromDate + " " + fromTime;
                    var editTaskEndTimeDate = userTackInfo.ToDate + " " + toTime;

                    $scope.editTask = {};


                      if(startDate==endDate && fromTime=='00:00:00' && toTime=="23:59:00")  {
                        $scope.editTask.fulldayEvent=true;
                        } else { 
                        $scope.editTask.fulldayEvent=false;

                        }

                    $scope.editTask.title = userTackInfo.EventName;
                    $scope.editTask.description = userTackInfo.EventDescription;
                    $scope.editTask.startDateTime = editTaskStartTimeDate;
                    $scope.editTask.endDateTime = editTaskEndTimeDate;
                    $scope.editTask.DateTime = editTaskStartTimeDate;
                    $scope.editTask.userCalenderId = userTackInfo.PersonCalendarID;
                    $scope.editTask.taskStatusId = userTackInfo.EventStatusID;
                    $scope.editTask.taskPriorityId = userTackInfo.EventPriorityID;
                    $scope.editTask.EventID = userTackInfo.EventID;
                    $scope.editTask.EventRecurrenceID = userTackInfo.EventRecurrenceID;

                }

            }, function(err) {
                console.error('ERR', err);
            });
        }


        /* Method for update userTask */
        $scope.updateTask = function() {


          var updateTaskInfo = {};



if($scope.editTask.fulldayEvent==true) {

var updateTaskStartDateTime = $filter('date')($scope.editTask.DateTime, "yyyy-MM-dd HH:mm:ss").split(' '); //$scope.createTask.startDateTime.split(' ');
var updateTaskEndDateTime = $filter('date')($scope.editTask.DateTime, "yyyy-MM-dd HH:mm:ss").split(' '); //$scope.createTask.endDateTime.split(' ');
updateTaskInfo.FromTime = '00:00:00';
updateTaskInfo.ToTime = '23:59:00';

}
 else {

    if ($scope.editTask.startDateTime > $scope.editTask.endDateTime) {
    appLogger.alert("Event start date is not greater than Event end date")
    } else if (new Date($scope.editTask.startDateTime) < new Date()) {
    appLogger.alert("Start date is not less than current date")
    } else if (new Date($scope.editTask.endDateTime) < new Date()) {
    appLogger.alert("End date is not less than current date")
    } else {

    var updateTaskStartDateTime = $filter('date')($scope.editTask.startDateTime, "yyyy-MM-dd HH:mm:ss").split(' '); //$scope.createTask.startDateTime.split(' ');
    var updateTaskEndDateTime = $filter('date')($scope.editTask.endDateTime, "yyyy-MM-dd HH:mm:ss").split(' '); //$scope.createTask.endDateTime.split(' ');
    updateTaskInfo.FromTime = updateTaskStartDateTime[1];
    updateTaskInfo.ToTime = updateTaskEndDateTime[1];

    }

     
     }        


                updateTaskInfo.PersonCalendarID = $scope.editTask.userCalenderId;
                updateTaskInfo.EventName = $scope.editTask.title;
                updateTaskInfo.EventDescription = $scope.editTask.description;
                updateTaskInfo.FromDate = updateTaskStartDateTime[0];
                updateTaskInfo.ToDate = updateTaskEndDateTime[0];
               
                updateTaskInfo.CreatedByUserID = loggedInUserId;
                updateTaskInfo.EventPriorityID = $scope.editTask.taskPriorityId;
                updateTaskInfo.EventStatusID = $scope.editTask.taskStatusId;
                updateTaskInfo.EventID = $scope.editTask.EventID;
                updateTaskInfo.EventRecurrenceID = $scope.editTask.EventRecurrenceID;
                updateTaskInfo.LastUpdatedByUserID = loggedInUserId;

               // console.log("Edit Task Info" + JSON.stringify(updateTaskInfo));

                editTaskLogic.updateTask(updateTaskInfo).then(function(response) {
                   // console.log(response.data.message);
                    if (response.status == 200) {
                        delete $localStorage.editTaskCalendarID;
                        delete $localStorage.editTaskID;
                        //appLogger.alert('Task updated successfully');
                        toaster.pop('success', "Event updated successfully", '', 5000, '');
                        $state.go('app.calendar', {}, {
                            reload: true
                        });
                    } else {
                        delete $localStorage.editTaskCalendarID;
                        delete $localStorage.editTaskID;
                        //appLogger.alert('Task updated unSuccessfully');
                        toaster.pop('error', "Event updated unsuccessfully", '', 5000, '');
                        $state.go('app.calendar', {}, {
                            reload: true
                        });
                    }
                }, function(err) {
                    delete $localStorage.editTaskCalendarID;
                    delete $localStorage.editTaskID;
                    //appLogger.alert('Task updated unSuccessfully');
                    toaster.pop('error', "Event updated unsuccessfully", '', 5000, '');
                    $state.go('app.calendar', {}, {
                        reload: true
                    });

                    console.error('ERR', err);
                });
            

        };






    });