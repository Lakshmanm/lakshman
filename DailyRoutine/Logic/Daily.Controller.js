/*//=============================================================================
// All rights reserved to Thrill Innovative Labs.
// THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
// OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
// LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
// FITNESS FOR A PARTICULAR PURPOSE.
//=============================================================================
//*****************************************************************************
//* Name		    	: Board.Controller.js 
//* Type		    	: Angular JS File
//* Description		    :
//* References		    :
//* Author	    		:
//* Created Date        : 
//*****************************************************************************
//*                             MODIFICATION LOG
//*****************************************************************************
//*  S.No  Ver	     Date	         Modified By			Description

//*****************************************************************************
//*                             Code Review LOG
//*****************************************************************************

//*****************************************************************************
*/

var app = angular.module('ThrillDailyRoutine.dailyRoutine', ['ThrillDailyRoutine.daily', 'ngCordova', 'ngStorage', 'ThrillFrameworkLibrary.geo', 'ThrillFrameworkLibrary.Network', 'ThrillCnnWebClient.appConfig', 'ThrillFrameworkLibrary.appLogger', 'ThrillInstitute.instituteBoardLogic', 'ThrillInstitute.instituteGroupLogic', 'ThrillAcademic.coursLogic', 'ThrillInstitute.instituteCoursLogic', 'ThrillAcademic.academicYearLogic', 'ThrillInstitute.instituteBatchLogic', 'ThrillInstitute.instituteLogic', 'ThrillInstitute.instituteSubjectLogic', 'ThrillAppBase.StaffListLogic'

    ])
    /*Setup board Controller */
app.controller('dailyRoutineController', function(dailyRoutineLogic, instituteBatchLogic, academicYearLogic, ThrillAppBaseStaffListLogic, instituteGroupLogic, instituteLogic, instituteSubjectLogic, instituteCoursLogic, instituteBoardLogic, $scope, $http, $state, $stateParams, $localStorage, SweetAlert, appConfig, appLogger) {

    var tableBatchKey;
    var periodSlotKey;
    var weekDayId;
    var oldStaffKey;
    $scope.staff=false;
    getLabels(appConfig.CULTURE_NAME);
    getMessages(appConfig.CULTURE_NAME);

    /*get labels with selected language*/
    function getLabels(cultureName) {


        var currentFileName = "Daily";

        $http.get("DailyRoutine/Languages/" + currentFileName + "." + cultureName + ".json").then(function(response) {

            bindLabels(response.data);

        });
    }

 if($localStorage.RoleID==2 )
{

    $scope.assign=false;
    $scope.daily=true;
}
else{
    $scope.assign=true;
    $scope.daily=false;
}
    

    function getMessages(cultureName) {
        var alertMessageName = "AlertMessages";

        $http.get("DailyRoutine/Languages/" + alertMessageName + "." + cultureName + ".json").then(function(response) {
            $scope.alertMessageLabels = response.data.messages;
        });
    }

    /*  bind labels with selected language */
    function bindLabels(data) {


        $scope.labelsDaily = data.labels;


    };

    $scope.getKey = function(instituteKey, orgKey) {

        $localStorage.subOrganizationKey = orgKey;

        $localStorage.dailyRoutineInstituteKey = instituteKey;
        getYear($localStorage.organizationKey);
        getAllBoards($localStorage.dailyRoutineInstituteKey);
        $scope.getStaff($localStorage.subOrganizationKey,$localStorage.dailyRoutineInstituteKey);
         $scope.getSubject($localStorage.dailyRoutineInstituteKey);
    }



    function getAllBoards(dailyRoutineInstituteKey) {
        instituteBoardLogic.getBoardByInstituteKey(dailyRoutineInstituteKey).then(function(response) {
            $scope.boardList = response;
        })
    }

if($localStorage.RoleID==2 || $localStorage.RoleID==3)
   {
       $scope.StudentAdd={};
     
       $scope.StudentAdd.InstituteKey=$localStorage.LoginInstituteKey;
        //$scope.getBoards();
         $scope.details=true;
       $scope.dailyInstitute=true;
       
   }
  else{
      $scope.details=false;
       $scope.dailyInstitute=false; 
  }


    $scope.getBoardGroups = function(instituteBoardKey) {
        instituteGroupLogic.getGroupByInstituteBoardKey($localStorage.dailyRoutineInstituteKey, instituteBoardKey).then(function(response) {
            $scope.groupList = response;
        })
    }

    $scope.getCoursByGroupKey = function(groupKey) {
        instituteCoursLogic.getCourseByInstituteGroupKey(groupKey, $localStorage.dailyRoutineInstituteKey).then(function(response) {
            $scope.courseList = response;
        })
    }

    var getYear = function() {

        academicYearLogic.getAllYears($localStorage.organizationKey).then(function(response) {

            $scope.yearList = response;


        }, function(err) {
            appLogger.error('ERR', err);
        });
    }
    getYear();

    $scope.getBatchCourseKey = function(courseKey) {

        instituteBatchLogic.getBatchByInstituteCourseKey(courseKey, $localStorage.dailyRoutineInstituteKey).then(function(response) {

            $scope.batchList = response;


        }, function(err) {
            appLogger.error('ERR', err);
        });
    }

    $scope.getBatchCourseKey();

    $scope.addNew = function() {
        $state.go('app.newDaily');

    }

    /*$scope.removeg=function()
    {

        alert("dadsad");
    }
    */





    $scope.getTableKey = function(batchKey) {
        tableBatchKey = batchKey;
         
        dailyRoutineLogic.getPeriodSlotByBatchKey(batchKey).then(function(response) {


            $scope.periodList = response;
            /* for (var i = 0; i < response.length; i++) {
                 if (response[i].WeekDayId1 == 1) {
                     $scope.one = true;
                 }
                 if (response[i].WeekDayId2 == 2) {
                     $scope.two = true;
                 }
                 if (response[i].WeekDayId3 == 3) {
                     $scope.three = true;
                 }
                 if (response[i].WeekDayId4 == 4) {
                     $scope.four = true;
                 }
                 if (response[i].WeekDayId5 == 5) {
                     $scope.five = true;
                 }
                 if (response[i].WeekDayId6 == 6) {
                     $scope.six = true;
                 }

             }*/

            if (response.length == undefined) {

                $scope.periodList = [];

                $scope.message = "No Data Availabale";
            }



        }, function(err) {
            appLogger.error('ERR', err);
        });

    }

    $scope.getSubject = function(dailyRoutineInstituteKey) {
        instituteSubjectLogic.getSubjectByInstituteKey(dailyRoutineInstituteKey).then(function(response) {
            $scope.subjectList = response;
        })
    }
  //  $scope.getSubject();



    $scope.getInstitute = function() {
        instituteLogic.getAllInstitutes($localStorage.organizationKey).then(function(response) {
            //alert(JSON.stringify(response))
            $scope.instituteList = response;
            $scope.entityBatch={};


            if($localStorage.RoleID==2 || $localStorage.RoleID==3)

{
            angular.forEach(response,function(resp)
            {
                if(resp.InstituteKey==$localStorage.LoginInstituteKey)
                {

                    $scope.entityBatch.InstituteKey=resp;
 $scope.getKey($scope.entityBatch.InstituteKey.InstituteKey, $scope.entityBatch.InstituteKey.ParentOrganizationKey);
                }
            })
}

        })
    }
    $scope.getInstitute();


    $scope.getStaff = function(subOrganizationKey,instituteKey) {
        ThrillAppBaseStaffListLogic.getAllStaffByDaily(subOrganizationKey,instituteKey).then(function(response) {
            
             var arrayStaff=[];
             angular.forEach(response,function(resp)
            {
                //
                if(resp.instituteKey==instituteKey)
                {
             arrayStaff.push(resp);
            
         
                }
             })
          //   
             if(arrayStaff.length!="")
                 {
                    
                $scope.staffList = arrayStaff;      
                 }
            else
                {
                $scope.staffList = response;         
                }
            
           

        })

    }



    $scope.getId = function() {
        
        var str = event.target.id;
        weekDayId = str.split(":")[0];



        periodSlotKey = str.split(":")[1];
        
        var batchKey=str.split(":")[2];
 
        dailyRoutineLogic.getPeriodSlotByPeriodSlotKey(periodSlotKey,weekDayId,batchKey).then(function(response) {

            $scope.entityTeacher = {};

            $scope.entityTeacher.subjectKey = response[0].SubjectKey;
            $scope.entityTeacher.StaffKey = response[0].StaffKey;
            oldStaffKey=response[0].StaffKey;
            $scope.entityTeacher.dailyRoutineKey = response[0].DailyRoutineKey;
            $scope.entityTeacher.weekDayId = response[0].WeekDayId;
            $scope.entityTeacher.periodSlotKey = response[0].PeriodSlotKey;
            $scope.entityTeacher.batchKey = response[0].BatchKey;




        }, function(err) {
            appLogger.error('ERR', err);
        });




    }


    var array = [];
    //

    $scope.addClassTeacher = function(entityTeacher, entityDaily) {

        if (entityTeacher.periodSlotKey == undefined) {
            entityTeacher.weekDayId = weekDayId;
            entityTeacher.periodSlotKey = periodSlotKey;
            entityTeacher.batchKey = entityDaily;
            entityTeacher.staffKey = entityTeacher.StaffKey;
            entityTeacher.SubjectKey = entityTeacher.subjectKey;
            delete entityTeacher.subjectKey;
            delete entityTeacher.StaffKey;
            dailyRoutineLogic.addSubjectTeacher(entityTeacher).then(function(response) {


                SweetAlert.swal({
                    title: "Subject Teacher",
                    text: "Saved successfully",
                    type: "success",
                    confirmButtonColor: "#007AFF"
                });


                $scope.getTableKey(tableBatchKey);

            }, function(err) {
                appLogger.error('ERR', err);
            });

        } else {

            dailyRoutineLogic.updateSubjectTeacher(entityTeacher).then(function(response) {


                SweetAlert.swal({
                    title: "Subject Teacher",
                    text: "Updated successfully",
                    type: "success",
                    confirmButtonColor: "#007AFF"
                });

  $scope.getTableKey(tableBatchKey);

            }, function(err) {
                appLogger.error('ERR', err);
            });


        }


    };
 /* $scope.$watch('entityTeacher.StaffKey', function (newValue, oldValue, scope) {
   //alert(newValue);
  
      oldStaffKey = oldValue;
});*/
$scope.getStaffPeriodList=function()
{
  
  dailyRoutineLogic.getStaffPeriodList(periodSlotKey,weekDayId,$scope.entityTeacher.StaffKey).then(function(response) {
      
   
      
       if (response.length != undefined && oldStaffKey!=$scope.entityTeacher.StaffKey  ) {
           SweetAlert.swal({
                    title: "Cancelled",
                    text: "The staff is already assigned for another batch for this period",
                    type: "error",
                    confirmButtonColor: "#007AFF"
                });


   $scope.staff=true;
            } 
      else
          {
          
           $scope.staff=false;    
          }


        }, function(err) {
            appLogger.error('ERR', err);
        });
    
}


}); // End of App Controller