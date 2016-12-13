/*//=============================================================================
// All rights reserved to Thrill Innovative Labs.
// THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
// OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
// LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
// FITNESS FOR A PARTICULAR PURPOSE.
//=============================================================================
//*****************************************************************************
//* Name		    	: Group.Controller.js 
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

var app = angular.module('ThrillDailyRoutine.assign', ['ThrillDailyRoutine.assignLogic', 'ThrillInstitute.instituteBatchLogic', 'ngCordova', 'ngStorage', 'ThrillFrameworkLibrary.geo', 'ThrillFrameworkLibrary.Network', 'ThrillCnnWebClient.appConfig', 'ThrillInstitute.instituteLogic', 'ThrillFrameworkLibrary.appLogger', 'ThrillAppBase.StaffListLogic'])
    /*Setup group Controller */
app.controller('assignController', function($scope, instituteBatchLogic, $http, groupLogic, $state, $stateParams, $localStorage, instituteLogic, ThrillAppBaseStaffListLogic, assignLogic, SweetAlert, appConfig, appLogger) {

    var subOrgKey;

    var updateArray = [];
    $scope.saveClassTeacher = function(classTeacher, entityBatch) {

        var array = [];
        for (var i = 0; i < classTeacher.length; i++) {

            if (classTeacher[i].StaffKey != null)

            {

                var object = {
                    InstituteBatchKey: classTeacher[i].InstituteBatchKey,
                    StaffKey: classTeacher[i].StaffKey,
                    InstituteCourseKey: classTeacher[i].InstituteCourseKey,
                    ClassTeacherKey: classTeacher[i].ClassTeacherKey,
                    InstituteKey: entityBatch.InstituteKey.InstituteKey

                };
                array.push(object);

            }





        }


        assignLogic.addClassTeacher(array).then(function(response) {


            SweetAlert.swal({
                title: "Class Teacher",
                text: "Saved successfully",
                type: "success",
                confirmButtonColor: "#007AFF"
            });



        }, function(err) {
            appLogger.error('ERR', err);
        });

    }

    /*$scope.getInstitute = function() {
        instituteLogic.getAllInstitutes($localStorage.organizationKey).then(function(response) {
             alert(JSON.stringify(response))
            $scope.instituteList = response;

                 angular.forEach(response,function(resp)
            {
                if(resp.InstituteKey==$localStorage.LoginInstituteKey)
                {

                    $scope.entityBatch.InstituteKey=resp;

                }
            })

            

        })
    }
    $scope.getInstitute();*/

  $scope.getInstitute = function() {
        instituteLogic.getAllInstitutes($localStorage.organizationKey).then(function(response) {
            //alert(JSON.stringify(response))
            $scope.instituteList = response;
            $scope.entityBatch={};

            
            if($localStorage.RoleID==2 || $localStorage.RoleID==3)

{
    $scope.assignclass=true;
            angular.forEach(response,function(resp)
            {
                //alert(JSON.stringify(resp));
                if(resp.InstituteKey==$localStorage.LoginInstituteKey)
                {

                    $scope.entityBatch.InstituteKey=resp;
                 
                    $scope.getclassTable($scope.entityBatch.InstituteKey.InstituteKey,$scope.entityBatch.InstituteKey.ParentOrganizationKey); 


                }
            })
}
            else
                {
               $scope.assignclass=false;     
                }

        })
    }
    $scope.getInstitute();

    $scope.getclassTable = function(instituteKey, subOrganizationKey) {

        $scope.getStaff(subOrganizationKey,instituteKey);
        assignLogic.getClassTeacherByInstituteKey(instituteKey).then(function(response) {
                $scope.classTeacherList = response;

            },
            function(err) {
                appLogger.error('ERR', err);
            });

    }
    $scope.sortColumn = "CourseTitle";
    $scope.sortColumn = "BatchName";
    $scope.sortColumn = "";
    $scope.reverseSort = false;


    $scope.sortData = function(column) {
        $scope.reverseSort = ($scope.sortColumn == column) ?
            !$scope.reverseSort : false;
        $scope.sortColumn = column;

        $scope.getSortClass = function(column) {


            if ($scope.sortColumn == column) {
                return $scope.reverseSort ? 'arrow-down' : 'arrow-up';
            }

            return '';
        }
    }

    $scope.getStaff = function(subOrgKey,instituteKey) {

        ThrillAppBaseStaffListLogic.getAllStaffByDaily(subOrgKey).then(function(response) {
            var array=[];
             angular.forEach(response,function(resp)
            {
                //
                if(resp.instituteKey==instituteKey)
                {
             array.push(resp);
            
         
                }
             })
          //   
             if(array.length!="")
                 {
                    alert(JSON.stringify(array));
               $scope.teacherList = array;      
                 }
            else
                {
               $scope.teacherList = response;         
                }
            
            

        });

        }



    /*get labels with selected language*/









}); // End of App Controller