/*//=============================================================================
// All rights reserved to Thrill Innovative Labs.
// THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
// OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
// LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
// FITNESS FOR A PARTICULAR PURPOSE.
//=============================================================================
//*****************************************************************************
//* Name                : Grade.Controller.js 
//* Type                : Angular JS File
//* Description         :
//* References          :
//* Author              :
//* Created Date        : 
//*****************************************************************************
//*                             MODIFICATION LOG
//*****************************************************************************
//*  S.No  Ver       Date            Modified By            Description

//*****************************************************************************
//*                             Code Review LOG
//*****************************************************************************

//*****************************************************************************
*/

var app = angular.module('ThrillAcademic.grade', ['ThrillAcademic.gradeLogic'
             , 'ngCordova'
             , 'ngStorage'
             , 'ThrillFrameworkLibrary.geo'
             , 'ThrillFrameworkLibrary.Network'
             , 'ThrillCnnWebClient.appConfig'
             , 'ThrillFrameworkLibrary.appLogger'
])
/*Setup grade Controller */
app.controller('GradeController', function ($scope, $http, gradeLogic, $state, $localStorage, $stateParams, appConfig, appLogger, SweetAlert) {
    getLabels(appConfig.CULTURE_NAME);
    getMessages(appConfig.CULTURE_NAME);

    /*get labels with selected language*/
    function getLabels(cultureName) {
        var currentFileName = "Grade";
        console.log("Academic/Languages/" + currentFileName + "." + cultureName + ".json");
        $http.get("Academic/Languages/" + currentFileName + "." + cultureName + ".json").then(function (response) {

            bindLabels(response.data);

        });
    }

    function getMessages(cultureName) {
        var alertMessageName = "AlertMessages";

        $http.get("Academic/Languages/" + alertMessageName + "." + cultureName + ".json").then(function (response) {
            $scope.alertMessageLabels = response.data.messages;
        });
    }

    /*bind labels with selected language */
    function bindLabels(data) {

 var labels = {
         percentageFrom: data.labels.percentageFrom,
         percentageTo: data.labels.percentageTo,
         grade: data.labels.grade,
          edit: data.labels.edit,
         Delete: data.labels.Delete,
         update:data.labels.update,
         submit:data.labels.submit     
     };
        $scope.labelsGrade = data.labels;

    };
    $scope.save = true;
    $scope.update = false;

    var entitykey = DrawCaptcha();
    var gradeEntityKey;

    /*Perform the CRUD (Create, Read, Update & Delete) operations of grade*/
    /*Method for calling  add grade */
    $scope.addGrade = function () {
        if (appConfig.APP_MODE == 'offline') {
            $scope.entityGrade.gradeKey = entitykey;
        }

        $scope.entityGrade.createdAppKey = "3il_App_Key​";
        $scope.entityGrade.createdUserKey = "3il_User_Key";
        $scope.entityGrade.instanceOrganizationKey = $localStorage.organizationKey;
      
        gradeLogic.addGrade($scope.entityGrade).then(function (response) {
            $scope.entityGrade = {};
            refresh();
            $scope.save = true;
            $scope.update = false;
            //$scope.gradeForm.$setPristine();
            $scope.gradeForm.$setPristine();
          $scope.gradeForm.$setUntouched();
            SweetAlert.swal({
                title: "Grade",
                text: "Saved successfully",
                type: "success",
                confirmButtonColor: "#007AFF"
            });//appLogger.alert($scope.alertMessageLabels.gradeSaved);

        }, function (err) {
            appLogger.error('ERR', err);
        });
    };

  

    /*Method for calling  update grade*/
    $scope.updateGrade = function () {
        gradeLogic.updateGrade($scope.entityGrade, $scope.entityGrade.gradeKey).then(function (response) {
            $scope.entityGrade = {};
            refresh();
            $scope.save = true;
            $scope.update = false;
            $scope.gradeForm.$setPristine();
          $scope.gradeForm.$setUntouched();

            SweetAlert.swal({
                title: "Grade",
                text: "Updated successfully",
                type: "success",
                confirmButtonColor: "#007AFF"
            });

            //appLogger.alert($scope.alertMessageLabels.gradeUpdated);

        }, function (err) {
            appLogger.error('ERR', err);
        });
    };

   //  $scope.organizationList = [{ "instanceorganizationtitle": "org 1", "instanceorganizationkey": "0829a334-5e27-11e6-9186-41e6368e6666" }, { "instanceorganizationtitle": "org 2", "instanceorganizationkey": "0829a334-5e27-33e6-4444-41e6368e2437" }, { "instanceorganizationtitle": "org 3", "instanceorganizationkey": "0829a334-5e27-33e6-9186-41e6368e9999" }];

    // $scope.gradeCollections = [{ "gradetitle": "org 1", "gradeorganizationkey": "0829a334-5e27-11e6-9186-41e6368e6666" }, { "gradetitle": "org 2", "gradeorganizationkey": "0829a334-5e27-33e6-4444-41e6368e2437" }, { "gradetitle": "org 3", "gradeorganizationkey": "0829a334-5e27-33e6-9186-41e6368e9999" }];

    /*Method for  retrieving  grade details*/
    $scope.editGrade = function (gradeKey) {
         $scope.save = false;
        $scope.update = true;

  gradeLogic.getGradeaaByGradeKey(gradeKey).then(function (response) {
               $scope.entityGrade = {};
            $scope.entityGrade.gradeKey = response[0].GradeKey;
            $scope.entityGrade.percentageFrom = response[0].PercentageFrom;
            $scope.entityGrade.percentageTo = response[0].PercentageTo;
               $scope.entityGrade.gradePoints = response[0].GradePoints;
            $scope.entityGrade.instanceOrganizationKey = response[0].instanceOrganizationKey;
        }, function (err) {
            appLogger.error('ERR', err);
        });
    }


    var refresh = function () {

        gradeLogic.getAllGrade($localStorage.organizationKey).then(function (response) {

            $scope.gradeCollection = response;
            $scope.sortColumn = "";
            $scope.reverseSort = false;
            $scope.sortData = function (column) {
                $scope.reverseSort = ($scope.sortColumn == column) ?
                    !$scope.reverseSort : false;
                $scope.sortColumn = column;
            }
            $scope.getSortClass = function (column) {
                if ($scope.sortColumn == column) {
                    return $scope.reverseSort ? 'arrow-down' : 'arrow-up';
                }
                return '';
            }, function (err) {
                appLogger.error('ERR', err);
            };
        });
    }
    refresh();


    /*Method for calling  deleting   grade*/
    $scope.deleteGrade = function (gradeEntityKey) {
         SweetAlert.swal({
            title: "Are you sure?"
            , text: "Your want to delete this grade"
            , type: "warning"
            , showCancelButton: true
            , confirmButtonColor: "#DD6B55"
            , confirmButtonText: "Yes, delete it!"
            , cancelButtonText: "No, cancel!"
            , closeOnConfirm: false
            , closeOnCancel: false
        }, function (isConfirm) {
            if (isConfirm) {
               gradeLogic.deleteGrade(gradeEntityKey).then(function (response) {
                //appLogger.alert($scope.alertMessageLabels.gradeDeleted);
                $scope.entityGrade = {};
                $scope.save = true;
                $scope.update = false;
                $scope.gradeForm.$setPristine();
                $scope.gradeForm.$setUntouched();
                    SweetAlert.swal({
                        title: "Grade"
                        , text: "Deleted successfully"
                        , type: "success"
                        , confirmButtonColor: "#007AFF"
                    });
                    refresh();
                }, function (err) {
                    appLogger.error('ERR', err);
                });
            }
            else {
                SweetAlert.swal({
                    title: "Cancelled"
                    , text: "Your grade is safe :)"
                    , type: "error"
                    , confirmButtonColor: "#007AFF"
                });
            }
        });
        
        
        
        
        
    };
    
    $scope.getVal=function(val)
    {
        
       if(val < 1 || val >100 || val > 100.01){
$scope.message=true;

}
        else
            {
           $scope.message=false;     
                
            }
        
    }
  /*  var val = document.getElementById('input-Default').value;
    alert(val);
*/

    // var acc = document.getElementsByClassName("accordion");
    // var i;

    // for (i = 0; i < acc.length; i++) {
    //     acc[i].onclick = function(){
    //         this.classList.toggle("active");
    //         this.nextElementSibling.classList.toggle("show");
    //     }
    // }

}); // End of App Controller

