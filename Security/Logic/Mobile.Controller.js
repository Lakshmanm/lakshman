/*=======================================================================
  All rights reserved to Thrill Innovations Lab.
 THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
 OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
 LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
 FITNESS FOR A PARTICULAR PURPOSE.
===========================================================================
****************************************************************************
 Name                : ChangePassword 
 Type                : Javascript and JQuery 
 Description         : This file contains controller methods
 References          :
 Author              :  Mythreyee.Pingala
 Created Date        :  18-April-2016
****************************************************************************
MODIFICATION LOG

**************************************************************************** 
Ver Date         Modified By            Description

****************************************************************************  
Code Review LOG
**************************************************************************** 

****************************************************************************
*/


var app = angular.module('security.mobileController', ['security.mobileLogic'
                                                               , 'ngCordova'
                                                               , 'ThrillFrameworkLibrary.geo'
                                                               , 'ThrillFrameworkLibrary.Network'
                                                               , 'ThrillCnnWebClient.appConfig'
                                                               ,'security.appStorage',
                                                               , 'ThrillFrameworkLibrary.appLogger'])
app.controller('mobileController', function ($scope,
    $http,
    $state,
    $stateParams,
    appConfig,
    mobileLogic,
    appStorage,
    $location) {
    getLabels(appConfig.CULTURE_NAME);

    function getLabels(cultureName) {
        var currentFileName = "SecurityMobile";
        $http.get("Security/Languages/" + currentFileName + "." + cultureName + ".json").then(function (response) {
            bindLabels(response.data);

        });
    }
    /*bind labels with selected language */
    function bindLabels(data) {
        var labels = {
            changePassword: data.labels.ChangePassword,
            enterCurrentPassword: data.labels.EnterCurrentPassword,
            password: data.labels.Password,
            reEnterPassword: data.labels.ReEnterPassword,
            submit: data.labels.Submit
        };
        $scope.SecurityMobile = labels;
    }



  
$scope.number = false;
    $scope.send = true;
    $scope.resend = false;
    $scope.mobile = false;
    $scope.showOtp = false;
     $scope.message = false;
     $scope.show = false;
    $scope.sec = {};
    //To access Admin cridentials From Login

     mobileLogic.getUserByID($stateParams.ID).then(function (response) {
        $scope.username = response[0].Username;
        $scope.email = response[0].PrimaryEmailAddress;
        $scope.number = response[0].MobileNumber;
        if($scope.email == "admin@nunet3.com")
            $scope.show = true;
        else
            $scope.show = false;



    })


    $scope.admin = function()
    {

        $location.path('/admin');
    }
    //To redirect to mobilelogin page
$scope.ok = function()
{


    $location.path('/mobilelogin');
}

    //method for storing number in database
    var saveNumber = function() {
        appStorage.insertData($scope.sec.number);
     mobileLogic.postNumber($scope.sec).then(function (response) {
            
            appStorage.insertData(response[0].UserID);
            saveOTP();
        })
        .error(function(response){
            console.log(response);

        })

        

    }
    //method for storing OTP in database
    var saveOTP = function(){
      /*  alert(userProfile.getData())*/
         $scope.sec.UserID = appStorage.getData();


        mobileLogic.postOtp($scope.sec).then(function (response) {
           /* alert(JSON.stringify(response));*/
        })
        .error(function(response){
          console.log(response);
        })
    }

    //method for sending OTP to mobile phone

    
    $scope.sendOTP = function() {
         $scope.errorMsg = false;

       mobileLogic.getUserMobile($scope.sec.number).then(function (response) {
             if(response.length == 0)
            {

        $scope.resend = true;
        $scope.send = false;


        $scope.showOtp = true;
        $scope.sec.otp = generateOtp();
        //sendOTPMsg();

        mobileLogic.sendSms($scope.sec).then(function (response) {
           
            saveNumber();

        })
        .error(function(response){
            console.log(response);
        })
        console.log($scope.sec.otp);
        }
    else

    {
          
       mobileLogic.getUserMobileStatus($scope.sec.number).then(function (response) {
            if(response.length==0)
                $scope.errorMsg = true;
            else{


            appStorage.insertData(response[0].UserID);

            $scope.resend = true;
            $scope.send = false;


        $scope.showOtp = true;
        $scope.sec.otp = generateOtp();
        console.log($scope.sec.otp);
        //sendOTPMsg();

         
     mobileLogic.sendSms($scope.sec).then(function (response) {
            saveOTP();
           

        })
        .error(function(response){
            console.log(response);
        })
            
        }


        })

    }



        })


            
            
    };
    //method for resending OTP
    $scope.reSendOTP = function() {
        $scope.sec.otp = generateOtp();
      
          mobileLogic.sendSms( $scope.sec).then(function (response) {
            /*alert(JSON.stringify(response));*/

        })
        .error(function(response){
            console.log(response);
        })
    
    };
    //method for verifying OTP
    $scope.verifyOTP = function() {

        UserID: appStorage.getData(),
        OTP: $scope.OTP 
mobileLogic.getOtp(UserID,OTP).then(function (response) {

    
  
    if(response.length!=0)
    {
      
        $location.path('/signUp');


    }
    else
    {
        $scope.number= true;
    }


})
.error(function(response){

    console.log(response);

})



    };
    //method for generating OTP 
    function generateOtp() {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (var i = 0; i < 5; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    }





     var saveForm = function(id){
    mobileLogic.updateUserByMobile(id,$scope.User).then(function (response) {

        
        //alert(JSON.stringify(response));
        $location.path('/successmob');
    })
    .error(function(response){
        console.log(response);
    })



    };





   $scope.Save = function(){

   mobileLogic.getUserEmail($scope.User.EmailID).then(function (response) {

        if(response.length==0)
        saveForm(userProfile.getData());
    else
        $scope.message = true;


    })

    
    

   };


 $scope.changePassword = function(){
    $location.path('/changepass/'+$stateParams.ID);
 }




});