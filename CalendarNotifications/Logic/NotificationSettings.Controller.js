/*===========================================================================
 All rights reserved to Nunet Cube Software Solutions.
 THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
 OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
 LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
 FITNESS FOR A PARTICULAR PURPOSE.
============================================================================
****************************************************************************
 Name		    	: NotificationSettings.Controller
Type                : Angular Js  
 Description        : containing attributes/properties and functions of notification settings
 References         : https://angularjs.org/
 Author             : Thriveni Yalavarthi.
 Created Date       : 10-Apr-2016.
****************************************************************************                          
MODIFICATION LOG
**************************************************************************** 
Ver	Date	     Modified By			Description
1.  10-04-2016   Thriveni Yalavarthi    Define controller logic for user notification settings
2.  15-04-2016   Thriveni Yalavarthi    Added toaster functionality 
****************************************************************************                            
Code Review LOG
**************************************************************************** 
S.No      Ver        Date                Code Review By            Observations
1         1.0       17-April-2016         Sri Venkatesh.T           Remove "var currentFileName = "NotificationSettings";" code which is not requried.
1         1.0       17-April-2016         Sri Venkatesh.T           userNotificationSettingInfo was declared by never used.if not required remove it .
****************************************************************************
*/


var currentFileName = "NotificationSettings";

var app = angular.module('ThrillCNN.NotificationSettings', ['ThrillCNN.NotificationSettingsLogic',
    'ThrillFrameworkLibrary.geo',
    'ThrillFrameworkLibrary.Network',
    'ThrillCnnWebClient.appConfig',
    'ThrillFrameworkLibrary.appLogger'
])

/*Setup employee Controller */
app.controller('NotificationSettingsController',
    function($scope,
        $state,
        $http,
        notificationLogic,
        appConfig,
        appLogger,
        toaster,
        $localStorage) {

        var userNotificationSettingsInfo = [];
     var loggedInUserID ='4ab860e0-3d0f-11e6-ae15-2f49c3e902be';
       // var loggedInUserID = $localStorage.loggedInUserID;
        var userNotificationSettingInfo = [];

          $scope.showTemplateFieldset=false;
          $scope.showTemplateFields=true;
          $scope.showfromEmail=false;
          $scope.showfromMobile=false;
          
        
        getLabels(appConfig.CULTURE_NAME);
        getNotificationMasterData();
        checkUserNotificationSettingsByUserId(loggedInUserID);
        getUserNotificationSettingsInfoById(loggedInUserID);
        getNotificationTemplates();
        getNotificationTemplateUsers();
        getNotificationTypes();

        getNotificationTemplateDetails();

  
        /*get labels with selected language*/
        function getLabels(cultureName) {

            var currentFileName = "NotificationSettings";
            $http.get("CalendarNotifications/Languages/" + currentFileName + "." + cultureName + ".json").then(function(response) {
                bindLabels(response.data);

            });
        }
        /*bind labels with selected language */
        function bindLabels(data) {
            var lables = {

                NotificationSettings: data.labels.NotificationSettings,
                Header: data.labels.Header,
                Sms: data.labels.Sms,
                Email: data.labels.Email,
                Save: data.labels.Save,
                Cancel: data.labels.Cancel

            };

            $scope.notificationLables = lables;
        }



        /* method for getting types of notification settings master data */
        function getNotificationMasterData() {
            notificationLogic.getMasterData().then(function(response) {
                $scope.notification = response.data;
                appLogger.log("" + JSON.stringify($scope.notification))

            }, function(err) {
                console.error('ERR', err);


            });

        }

        /* */
        function checkUserNotificationSettingsByUserId(loggedInuserId) {
            notificationLogic.checkNotificationSettings(loggedInuserId).then(function(response) {
                //appLogger.log("Notification check up data" + JSON.stringify(response));
            }, function(err) {
                console.error('ERR', err);
            });
        }

        /* Method for retrieving user notification settings info by userId*/
        function getUserNotificationSettingsInfoById(loggedInUserID) {

            notificationLogic.getUserNotificationSettingsById(loggedInUserID).then(function(response) {

               // console.log("Notification UserNotificationSettingsInfoById" + JSON.stringify(response.data))
                var userNotificationSettingInfoResponse = response.data;

                for (var i = 0; i < userNotificationSettingInfoResponse.length; i++) {
                    var personNotificationSettings = {};
                    personNotificationSettings.EventNotificationID = userNotificationSettingInfoResponse[i].EventNotificationID;
                    personNotificationSettings.NotificationActionName = userNotificationSettingInfoResponse[i].NotificationActionName;
                    personNotificationSettings.NotificationActionID = userNotificationSettingInfoResponse[i].NotificationActionID;
                    personNotificationSettings.NotificationTypeID = userNotificationSettingInfoResponse[i].NotificationTypeID;
                    personNotificationSettings.NotificationTypeName = userNotificationSettingInfoResponse[i].NotificationTypeName;
                    personNotificationSettings.Description = userNotificationSettingInfoResponse[i].DESCRIPTION;

                    if (userNotificationSettingInfoResponse[i].NotificationTypeID == 1) {
                        personNotificationSettings.emailchecked = true;
                        personNotificationSettings.smsschecked = true;
                    } else if (userNotificationSettingInfoResponse[i].NotificationTypeID == 2) {
                        personNotificationSettings.emailchecked = true;
                        personNotificationSettings.smsschecked = false;

                    } else if (userNotificationSettingInfoResponse[i].NotificationTypeID == 3) {
                        personNotificationSettings.emailchecked = false;
                        personNotificationSettings.smsschecked = true;

                    } else {
                        personNotificationSettings.emailchecked = false;
                        personNotificationSettings.smsschecked = false;

                    }


                    userNotificationSettingInfo.push(personNotificationSettings);

                    //console.log("sdf" + JSON.stringify(userNotificationSettingInfo))

                    $scope.notificationdata = userNotificationSettingInfo;


                }
                //console.log("Notification Data is" + JSON.stringify($scope.notificationdata));

            }, function(err) {
                console.error('ERR', err);


            });
        }


        /* Method For Updating User Notification Settings */
        $scope.userNotificationSettingsUpdate = function(userNotificationSettingsObj) {

            var updateUserNotificationSettings = {};

            for (var i = 0; i < userNotificationSettingsObj.length; i++) {

                updateUserNotificationSettings["EventNotificationID" + i] = userNotificationSettingsObj[i].EventNotificationID;



                if (userNotificationSettingsObj[i].emailchecked == true && userNotificationSettingsObj[i].smsschecked == true) {
                    updateUserNotificationSettings["NotificationTypeID" + i] = 1;
                } else if (userNotificationSettingsObj[i].emailchecked == true && userNotificationSettingsObj[i].smsschecked == false) {
                    updateUserNotificationSettings["NotificationTypeID" + i] = 2;
                } else if (userNotificationSettingsObj[i].emailchecked == false && userNotificationSettingsObj[i].smsschecked == true) {
                    updateUserNotificationSettings["NotificationTypeID" + i] = 3;
                } else {
                    updateUserNotificationSettings["NotificationTypeID" + i] = 4;
                }
            }

            updateUserNotificationSettings.personID = loggedInUserID;

            notificationLogic.updateUserNotificationSettings(updateUserNotificationSettings).then(function(response) {
                appLogger.log("" + response.status);
                if (response.status == 200) {
                    //appLogger.alert('User NotificationSettings details updated successfully');
                    toaster.pop('success', "user notification settings updated successfully", '', 5000, '');
                    $state.go('app.appointments');
                } else {
                    toaster.pop('error', "user notification settings updated unSuccessfully", '', 5000, '');
                    $state.go('app.appointments');
                }


            }, function(err) {

                console.error('ERR', err);
                toaster.pop('error', "user notification settings updated unSuccessfully", '', 5000, '');
                $state.go('app.appointments');
            });


        };

        /* Method for cancel the user notification settings updation */
        $scope.cancel = function() {
            $state.go('app.appointments');
        };



        //Addition

         /* method for getting template types of notification settings master data */
        function getNotificationTemplates() {
            notificationLogic.notificationTemplates().then(function(response) {
                $scope.notificationTemplates = response.data;
                

            }, function(err) {
                console.error('ERR', err);


            });

        }


   /* method for getting template User types of notification settings master data */
        function getNotificationTemplateUsers() {
            notificationLogic.notificationTemplateUsers().then(function(response) {
                $scope.notificationTemplateUsers = response.data;
               
            }, function(err) {
                console.error('ERR', err);


            });

        }

/* method for getting notification types of notification settings master data */
        function getNotificationTypes() {
            notificationLogic.notificationTypes().then(function(response) {
                $scope.notificationTypes = response.data;
               
            }, function(err) {
                console.error('ERR', err);


            });

        }

/* method for getting notification types of notification settings master data */
        function getNotificationTemplateDetails() {
            notificationLogic.notificationTemplateDetails().then(function(response) {
                $scope.notificationTemplateDetails = response.data;
               
            }, function(err) {
                console.error('ERR', err);


            });

        }


 // Editor options.
    $scope.options = {
        language: 'en',
        allowedContent: true,
        entities: false
    };

    // Called when the editor is completely ready.
    $scope.onReady = function () {
        // ...
    };



    $scope.cancel = function () {
        
         $scope.showTemplateFieldset=false;
         $scope.showTemplateFields=true; 
          $scope.showfromEmail=false;
          $scope.showfromMobile=false;
    };

      $scope.reset = function () {

        $scope.title=$scope.PreviousTitle;
        $scope.heading=$scope.PreviousHeading;
        $scope.fromEmail=$scope.PreviousFromEmail;
        $scope.fromMobile=$scope.PreviousFromMobile;
       CKEDITOR.instances['content'].setData($scope.PreviousContent);
    };


 $scope.update = function () {

     $scope.templateDetails ={};
     $scope.templateDetails.TemplateDetailsId=$scope.TemplateDetailsId;
     $scope.templateDetails.Title=$scope.title;
     $scope.templateDetails.TemplateHeading=$scope.heading;
     $scope.templateDetails.TemplateContent=CKEDITOR.instances['content'].getData();
     $scope.templateDetails.FromEmail=$scope.fromEmail;
     $scope.templateDetails.FromMobile=$scope.fromMobile;


     


    // alert(JSON.stringify($scope.templateDetails));


     notificationLogic.updateNotificationTemplate($scope.templateDetails).then(function(response) {
              
                if (response.status == 200) {
                    getNotificationTemplateDetails();
                  
                    toaster.pop('success', "Notification template updated successfully", '', 5000, '');
                   
                } else {
                    toaster.pop('error', "Notification template updated unsuccessfully", '', 5000, '');
                  
                }


            }, function(err) {

                console.error('ERR', err);
                toaster.pop('error', "Notification template updated unsuccessfully", '', 5000, '');
               
            });




      
       
    };


 $scope.change = function() {
          

          
        if($scope.notificationTemplatedetails.notificationType!="" && $scope.notificationTemplatedetails.notificationType!=undefined && $scope.notificationTemplatedetails.notificationTemplateUser!="" && $scope.notificationTemplatedetails.notificationTemplateUser!=undefined && $scope.notificationTemplatedetails.notificationTemplate!="" && $scope.notificationTemplatedetails.notificationTemplate!=undefined) 

        {

        $scope.showTemplateFieldset=true;
        $scope.showTemplateFields=true;

        if($scope.notificationTemplatedetails.notificationType=='NT-EMAIL-01')
        {
        $scope.showfromEmail=true;
        $scope.showfromMobile=false;
        }else {
        $scope.showfromEmail=false;
        $scope.showfromMobile=true;
        }


        
   

        var templateFieldsetTitle = $.grep($scope.notificationTemplates, function (e) { return e.TemplateReferenceKey == $scope.notificationTemplatedetails.notificationTemplate; });

        $scope.templateFieldsetTitle=templateFieldsetTitle[0].TemplateName;

        var result = $.grep($scope.notificationTemplateDetails, function (e) { return e.TemplateReferenceKey == $scope.notificationTemplatedetails.notificationTemplate && e.UserTypeReferenceKey == $scope.notificationTemplatedetails.notificationTemplateUser && e.TypeReferenceKey == $scope.notificationTemplatedetails.notificationType; });

         
           $scope.title=result[0].Title;
           $scope.PreviousTitle=result[0].Title;
           $scope.heading=result[0].TemplateHeading;
           $scope.PreviousHeading=result[0].TemplateHeading;
           $scope.fromEmail=result[0].FromEmail;
           $scope.PreviousFromEmail=result[0].FromEmail;
           $scope.fromMobile=result[0].FromMobile;
           $scope.PreviousFromMobile=result[0].FromMobile;
           $scope.OginalContent=result[0].TemplateMasterContent;
           $scope.PreviousContent=result[0].TemplateContent;
           CKEDITOR.instances['content'].setData(result[0].TemplateContent);
           $scope.TemplateDetailsId=result[0].TemplateDetailsId;


        }
        else {

        $scope.showTemplateFieldset=false;
         $scope.showTemplateFields=true;
        }


        };


    });