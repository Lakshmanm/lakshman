/*===========================================================================
 All rights reserved to Nunet Cube Software Solutions.
 THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
 OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
 LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
 FITNESS FOR A PARTICULAR PURPOSE.
============================================================================
****************************************************************************
 Name		    	: CreateTask.Controller
Type                : Angular Js  
 Description        : containing attributes/properties and functions of create task
 References         : https://angularjs.org/
 Author             : Thriveni Yalavarthi.
 Created Date       : 06-04-2016.
****************************************************************************                          
MODIFICATION LOG
**************************************************************************** 
Ver	Date	     Modified By			Description
1.  07-04-2016   Thriveni Yalavarthi    Define the controller logic of create task
2.  15-04-2016   Thriveni Yalavarthi    Added toaster functionality
****************************************************************************                            
Code Review LOG
**************************************************************************** 
S.No      Ver        Date                Code Review By            Observations
1         1.0       17-April-2016         Sri Venkatesh.T           Remove "var currentFileName = "CreateTask";" code which is not requried.
****************************************************************************
*/


var currentFileName = "CreateTask";
var app = angular.module('ThrillCNN.CreateTask', ['ThrillCNN.CreateTaskLogic', 'ThrillCnnWebClient.appConfig', 'ThrillFrameworkLibrary.appLogger']);
/*Setup employee Controller */
app.controller('CreateTaskController',
    function ($scope,
        $filter,
        $state,
        $http,
        appConfig,
        appLogger,
        $localStorage,
        toaster,
        createTaskLogic) {
        //appLogger.log("createTaskController");
    
      //var loggedInUserId ='4ab860e0-3d0f-11e6-ae15-2f49c3e902be';

        var loggedInUserId = $localStorage.loggedInUserID;
        //appLogger.log("LoggedIn User ID" + loggedInUserId);


        /* Displaying Toast Messages */
        $scope.showSuccessAlert = false;
        $scope.showErrorAlert = false;
        $scope.switchBool = function (value) {
            $scope[value] = !$scope[value];
        };


        getLabels(appConfig.CULTURE_NAME);
    getMessages(appConfig.CULTURE_NAME);

        getUserCanlendars(loggedInUserId);
        getEventTaskStatus();
        getEventPriority();

        /*get labels with selected language*/
        function getLabels(cultureName) {

            var currentFileName = "CreateTask";
            $http.get("CalendarNotifications/Languages/" + currentFileName + "." + cultureName + ".json").then(function (response) {
                bindLabels(response.data);
                //appLogger.log("" + JSON.stringify(response.data));
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
                Save: data.labels.Save,
                Cancel: data.labels.Cancel
            };

            $scope.createTaskLables = lables;
            //appLogger.log("" + JSON.stringify($scope.createTaskLables));

        }

        /*Method for cancel new task creation */
        $scope.cancel = function () {
            $state.go('app.appointments');

        };

        /*Method for get user calendars creation */
        function getUserCanlendars(userId) {
            createTaskLogic.getUserCalendars(userId).then(function (response) {
            appLogger.log("userCalendars" + JSON.stringify(response));
                $scope.userCalenders = response;

            }, function (err) {
                console.error('ERR', err);


            });
        }



      
     /*get alert labels*/
     function getMessages(cultureName) {
        var alertMessageName = "AlertMessages";

        $http.get("CalendarNotifications/Languages/" + alertMessageName + "." + cultureName + ".json").then(function (response) {
            $scope.alertMessageLabels = response.data.messages;
        });
    }
    

        /*Method for get user event tasks creation */
        function getEventTaskStatus() {
            createTaskLogic.getEventTaskStatus().then(function (response) {
                $scope.eventStatus = response;
                appLogger.log("userEventTaskStatus" + JSON.stringify($scope.eventPriority));
            }, function (err) {
                console.error('ERR', err);


            });
        }

        /*Method for get event priority levels creation */
        function getEventPriority() {
            createTaskLogic.getEventPriority().then(function (response) {
                $scope.eventPriority = response;
                appLogger.log("userEventPriority" + JSON.stringify($scope.eventStatus));
            }, function (err) {
                console.error('ERR', err);


            });
        }


 $scope.displaydates = function () {

if($scope.createTask.fulldayEvent==true) 
    { $scope.fulldayeventfalse=false; }
 else 
  {  $scope.fulldayeventfalse=true;}


 }


        $scope.createTask = {};
        /*Method for create new task */
        $scope.createNewTask = function () {

           var createNewTaskInfo = {};

        if($scope.createTask.fulldayEvent==true) {

        var createTaskStartDateTime = $filter('date')($scope.createTask.DateTime, "yyyy-MM-dd HH:mm:ss").split(' '); //$scope.createTask.startDateTime.split(' ');
        var createTaskEndDateTime = $filter('date')($scope.createTask.DateTime, "yyyy-MM-dd HH:mm:ss").split(' '); //$scope.createTask.endDateTime.split(' ');
        createNewTaskInfo.FromTime = '00:00:00';
        createNewTaskInfo.ToTime = '23:59:00';

        }

         else {

            if ($scope.createTask.startDateTime > $scope.createTask.endDateTime) {
            appLogger.alert("Event start date is not greater than Event end date")
            } else if (new Date($scope.createTask.startDateTime) < new Date()) {
            appLogger.alert("Start date is not less than current date")
            } else if (new Date($scope.createTask.endDateTime) < new Date()) {
            appLogger.alert("End date is not less than current date")
            } 
            else {
            var createTaskStartDateTime = $filter('date')($scope.createTask.startDateTime, "yyyy-MM-dd HH:mm:ss").split(' '); //$scope.createTask.startDateTime.split(' ');
            var createTaskEndDateTime = $filter('date')($scope.createTask.endDateTime, "yyyy-MM-dd HH:mm:ss").split(' '); //$scope.createTask.endDateTime.split(' ');
            createNewTaskInfo.FromTime = createTaskStartDateTime[1];
            createNewTaskInfo.ToTime = createTaskEndDateTime[1];
            }
         }

             
               
                createNewTaskInfo.PersonCalendarID = $scope.userCalenders[0].PersonCalendarID;
                createNewTaskInfo.EventName = $scope.createTask.title;
                createNewTaskInfo.Description = $scope.createTask.description;
                createNewTaskInfo.FromDate = createTaskStartDateTime[0];
                createNewTaskInfo.ToDate = createTaskEndDateTime[0];
               
                createNewTaskInfo.CreatedByUserID = loggedInUserId;
                createNewTaskInfo.EventPriorityID = $scope.eventPriority[0].EventPriorityID;
                createNewTaskInfo.EventStatusID = $scope.eventStatus[0].EventStatusID;

                

                createTaskLogic.createTask(createNewTaskInfo).then(function (response) {
                   

                    if (response.status == 200) {
                        //appLogger.alert("Task Created successfully");
                        toaster.pop('success',$scope.alertMessageLabels.TaskSave, '', 5000, '');
                        $state.go('app.calendar')
                    } else {
                        //appLogger.alert("Task Created unSuccessfully");
                        toaster.pop('error', $scope.alertMessageLabels.TaskUnSave, '', 5000, '');
                        $state.go('app.calendar')
                    }
                }, function (err) {
                    //appLogger.error('ERR', err);
                    toaster.pop('error', $scope.alertMessageLabels.TaskUnSave, '', 5000, '');
                    $state.go('app.calendar');
                });
            
        };
    });