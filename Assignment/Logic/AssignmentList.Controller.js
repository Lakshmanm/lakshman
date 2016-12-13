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

var app = angular.module('ThrillAssignment.assignmentList', ['ThrillAssignment.assignmentLogic', 'ThrillInstitute.instituteBatchLogic', 'ngCordova', 'ngStorage', 'ThrillInstitute.instituteLogic', 'ThrillFrameworkLibrary.geo', 'ThrillFrameworkLibrary.Network', 'ThrillCnnWebClient.appConfig', 'ThrillFrameworkLibrary.appLogger', 'ThrillAppBase.StaffListLogic', 'ThrillInstitute.instituteSubjectLogic', 'ThrillInstitute.instituteCoursLogic', 'ThrillInstitute.instituteGroupLogic'

    ])
    /*Setup group Controller */
app.controller('assignmentListController', function($scope, $location, instituteCoursLogic, instituteLogic, instituteGroupLogic, instituteBatchLogic, instituteSubjectLogic, $http, groupLogic, $state, $stateParams, $localStorage, ThrillAppBaseStaffListLogic, assignmentLogic, SweetAlert, appConfig, appLogger) {

    getLabels(appConfig.CULTURE_NAME);
    getMessages(appConfig.CULTURE_NAME);

    /*get labels with selected language*/
    function getLabels(cultureName) {
        var currentFileName = "NewAssignment";

        $http.get("Assignment/Languages/" + currentFileName + "." + cultureName + ".json").then(function(response) {
            bindLabels(response.data);

        });
    }

    function getMessages(cultureName) {
        var alertMessageName = "AlertMessages";

        $http.get("Assignment/Languages/" + alertMessageName + "." + cultureName + ".json").then(function(response) {
            $scope.alertMessageLabels = response.data.messages;
        });
    }

    /*bind labels with selected language */
    function bindLabels(data) {

        $scope.labelsAssignment = data.labels;

    };

    $scope.getNew = function() {

        $state.go('app.assignment');

    };

    var AssignmentBranchKey;
    var subOrgKey;
    $scope.getBranchKey = function(instituteKey, subOrganizationKey) {

        AssignmentBranchKey = instituteKey;
        subOrgKey = subOrganizationKey;

        $scope.getSubjectList(AssignmentBranchKey);

    }

    /*$scope.getInstitute = function() {
        instituteLogic.getAllInstitutes($localStorage.organizationKey).then(function(response) {
            $scope.instituteList = response;
        })
    }
    $scope.getInstitute();*/
     $scope.getInstitute = function() {
        instituteLogic.getAllInstitutes($localStorage.organizationKey).then(function(response) {
            //alert(JSON.stringify(response))
            $scope.instituteList = response;
            $scope.entityAssignment={};


            if($localStorage.RoleID==2 || $localStorage.RoleID==3)

{
            angular.forEach(response,function(resp)
            {
                if(resp.InstituteKey==$localStorage.LoginInstituteKey)
                {

                    $scope.entityAssignment.branchKey=resp;
 $scope.getBranchKey($scope.entityAssignment.branchKey.InstituteKey,
                     $scope.entityAssignment.branchKey.SubOrganizationKey) 
                }
            })
            $scope.assignmentInstitute=true;
}
            else
                {
                    
                 $scope.assignmentInstitute=false;   
                }

        })
    }
    $scope.getInstitute();


    $scope.getAssignment = function() {
        $state.go('app.assignmentDetail');

    };


    function twoDigits(d) {
        if (0 <= d && d < 10) return "0" + d.toString();
        if (-10 < d && d < 0) return "-0" + (-1 * d).toString();
        return d.toString();
    }
    /*
     * …and then create the method to output the date string as desired.
     * Some people hate using prototypes this way, but if you are going
     * to apply this to more than one Date object, having it as a prototype
     * makes sense.
     */
    Date.prototype.toMysqlFormat = function() {
        return this.getFullYear() + "-" + twoDigits(1 + this.getMonth()) + "-" + twoDigits(this.getDate());
    };





    $scope.date = new Date().toMysqlFormat();


    $scope.assignmentStatus = function() {
        assignmentLogic.getAssignmentStatus().then(function(response) {
            $scope.statusList = response;


        }, function(err) {
            appLogger.error('ERR', err);
        });

    };
    $scope.assignmentStatus();
    
/*
    
    if($localStorage.RoleID==2  )
        {
            
    $scope.SearchAssignmentStaff = function() {
        
        var entityAssignmentStaff;
        var arrayStaff=[];
        arrayStaff.push($localStorage.LoginStaffKey);
        
        if ($scope.entityAssignmentStaff == undefined) {

            $scope.searchMessage = "Please fill any of the above  fields.";

        } else  {
            $scope.searchMessage = "";
            entityAssignmentStaff = {
                staffKeys:arrayStaff,
                assignmentStatusKey: $scope.entityAssignmentStaff.assignmentStatusKey,
                startDate: $scope.entityAssignmentStaff.startDate,
                endDate: $scope.entityAssignmentStaff.endDate,
                assignmentName: $scope.entityAssignmentStaff.assignmentName,
                instanceOrganizationKey: $localStorage.subOrganizationKey,
                branchKey: AssignmentBranchKey
            };
        }

        assignmentLogic.getAllStaffAssignmentsByStaffKey(entityAssignmentStaff).then(function(response) {
            
 
            

            $scope.assignmentStaff = response;



        },function (err)           
           {
        
       $scope.assignmentStaff="";
        })
        arrayStaff = [];



    };
            
        }
else
    {
*/

    $scope.SearchAssignmentStaff = function() {
        var day= 60 * 60 * 24 * 1000;
        if($scope.entityAssignmentStaff.startDate!= undefined)
            {
              var sd =  new Date($scope.entityAssignmentStaff.startDate);
                
                var year = sd.getFullYear();
                var month= sd.getMonth()+1;
                var date = sd.getDate();
              var d1= year+'-'+month+'-'+date;
               
      
            }
        if($scope.entityAssignmentStaff.endDate!= undefined)
            {
        var ed = new Date($scope.entityAssignmentStaff.endDate);
                 var year = ed.getFullYear();
                var month= ed.getMonth()+1;
                var date = ed.getDate();
              var d2= year+'-'+month+'-'+date;
                
            }
        var entityAssignmentStaff;
        if ($scope.entityAssignmentStaff == undefined && arrayStaff.length == 0) {

            $scope.searchMessage = "Please fill any of the above  fields.";

        } else if ($scope.entityAssignmentStaff == undefined) {


            $scope.searchMessage = "";
            entityAssignmentStaff = {
                staffKeys: arrayStaff,
                instanceOrganizationKey: $localStorage.subOrganizationKey,
                branchKey: AssignmentBranchKey
            };
        } else if (arrayStaff.length == 0) {
            $scope.searchMessage = "";
            entityAssignmentStaff = {
                assignmentStatusKey: $scope.entityAssignmentStaff.assignmentStatusKey,
                startDate:d1,
                endDate: d2,
                assignmentName: $scope.entityAssignmentStaff.assignmentName,
                instanceOrganizationKey: $localStorage.subOrganizationKey,
                branchKey: AssignmentBranchKey
            };
        }

        assignmentLogic.getAllStaffAssignments(entityAssignmentStaff).then(function(response) {
            
 
            

            $scope.assignmentStaff = response;



        },function (err)           
           {
        
       $scope.assignmentStaff="";
        })
        arrayStaff = [];



    };

    $scope.sortColumn = "AssignmentName";
    $scope.sortColumn = "TopicKey";
    $scope.sortColumn = "StartDate";
    $scope.sortColumn = "EndDate";
    $scope.sortColumn = "AssignmentStatusName";
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


    $scope.SearchAssignmentStudent = function() {
       var day= 60 * 60 * 24 * 1000;
        if($scope.entityAssignment.startDate!= undefined)
            {
        var sd = new Date($scope.entityAssignment.startDate);
                
               var year = sd.getFullYear();
                var month= sd.getMonth()+1;
                var date = sd.getDate();
              var d1= year+'-'+month+'-'+date;
               
            }
        if($scope.entityAssignment.endDate!= undefined)
            {
            var ed = new Date($scope.entityAssignment.endDate);
                   var year = ed.getFullYear();
                var month= ed.getMonth()+1;
                var date = ed.getDate();
              var d2= year+'-'+month+'-'+date;
               
                
            }
        
        var entityAssignmentStudent;
        entityAssignmentStudent = {
                assignmentStatusKey: $scope.entityAssignment.assignmentStatusKey,
                startDate: d1,
                endDate: d2,
                assignmentName: $scope.entityAssignment.assignmentName,
                instanceOrganizationKey: $localStorage.subOrganizationKey,
                branchKey: AssignmentBranchKey
            };
        
     /*   $scope.entityAssignment.InstanceOrgKey = $localStorage.subOrganizationKey;

        $scope.entityAssignment.branchKey = AssignmentBranchKey;
*/

        assignmentLogic.getAllStudentAssignments(entityAssignmentStudent).then(function(response) {


            $scope.assignmentStudent = response;



        },function(err)
          {
          $scope.assignmentStudent="";    
            
        })

    };
    $scope.sortColumn = "AssignmentName";

    $scope.sortColumn = "StartDate";
    $scope.sortColumn = "EndDate";
    $scope.sortColumn = "AssignmentStatusName";
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




    $scope.getList = function(assignmentKey, branchKey, assignment) {
        $localStorage.assignment = assignmentKey;
        $localStorage.branch = branchKey;
        $localStorage.assignmentObj = assignment;
        $state.go('app.assignmentView');

        if (assignment.IsAssignedToStaff != undefined && assignment.IsAssignedToStaff == 1) {

            assignmentLogic.getStaffAssignmentByAssignmentKey(assignmentKey, branchKey).then(function(response) {



                if (response[0].IsAssignedToStaff == 1) {
                    $scope.staffView = true;
                    $scope.studentView = false;

                } else
                if (response[0].IsAssignedtoStudent == 1) {
                    $scope.staffView = false;
                    $scope.studentView = true;

                }

                $scope.entityAssignment = {};


                $scope.entityAssignment = response;
                $scope.entityAssignment.assignmentKey = response[0].AssignmentKey;
                $scope.entityAssignment.assignmentName = response[0].AssignmentName;
                $scope.entityAssignment.branchKey = response[0].BranchKey;
                $scope.entityAssignment.assignmentTypeKey = response[0].AssignmentTypeKey;

                $scope.entityAssignment.startDate = new Date(response[0].StartDate);
                $scope.entityAssignment.endDate = new Date(response[0].EndDate);
                $scope.entityAssignment.priorityKey = response[0].Priority;
                $scope.entityAssignment.topicTitle = response[0].TopicKey;
                $scope.entityAssignment.description = response[0].Description;


            })


        } else if (assignment.IsAssignedtoStudent != undefined && assignment.IsAssignedtoStudent == 1) {



            assignmentLogic.getAssignmentByAssignmentKey(assignmentKey, branchKey).then(function(response) {


                if (response[0].IsAssignedtoStudent == 1) {
                    $scope.staffView = false;
                    $scope.studentView = true;

                } else if (response[0].IsAssignedToStaff == 1) {
                    $scope.staffView = true;
                    $scope.studentView = false;

                }


                $scope.entityAssignment = {};

                AssignmentBranchKey = response[0].BranchKey;
                $scope.entityAssignment = response;
                $scope.entityAssignment.assignmentKey = response[0].AssignmentKey;
                $scope.entityAssignment.branchKey = response[0].BranchKey;

                $scope.entityAssignment.assignmentName = response[0].AssignmentName;
                $scope.entityAssignment.assignmentTypeKey = response[0].AssignmentTypeKey;

                $scope.entityAssignment.startDate = new Date(response[0].StartDate);
                $scope.entityAssignment.endDate = new Date(response[0].EndDate);
                $scope.entityAssignment.priorityKey = response[0].Priority;
                $scope.entityAssignment.topicTitle = response[0].TopicKey;
                $scope.entityAssignment.description = response[0].Description;
                $scope.entityAssignment.groupKey = response[0].GroupKey;
                $scope.getGroup(AssignmentBranchKey)
                $scope.getCourse(response[0].GroupKey);
                $scope.entityAssignment.courseKey = response[0].CourseKey;
                $scope.getBatch(response[0].CourseKey);
                $scope.getSubject(response[0].CourseKey);
                $scope.entityAssignment.batchKey = response[0].BatchKey;

                $scope.entityAssignment.subjectKey = response[0].SubjectKey;


            })
        }

    }


    if ($location.path() == '/app/assignmentView') {
        $scope.getList($localStorage.assignment, $localStorage.branch, $localStorage.assignmentObj);
    }



    $scope.getFile = function(folderKey, fileKey) {

        assignmentLogic.getFile(fileKey, folderKey).then(function(response) {





            var a = document.createElement("a");
            a.download = response[0].FileName;
            a.href = response[0].FileBin;
            a.click();



        }, function(err) {
            appLogger.error('ERR', err);
        });


    };


    var t = 0;
    var s = 0;
    var r = 0;
    var k = 0;
    var m = 0;
    var a = 0;

    var getTaskList = function() {

        assignmentLogic.getTaskByAdmin($localStorage.ReferenceKey, $localStorage.LoginStaffKey).then(function(response) {

         
             var array = [];
            $scope.task = {};
            
            $scope.task.toStaff = response[2].mytasks;
            $scope.task.inProgress = response[4].mytasks;
            $scope.task.notYetStarted = response[5].mytasks;
            $scope.task.completed =  response[3].mytasks;
            $scope.task.myTasks =  response[0].mytasks;
            $scope.task.assignedByMe =  response[1].mytasks;
            array.push($scope.task);



            $scope.taskCollection = array;

           /*
            
*/
           // $scope.task.assignedByMe = response.length;
           /* for (var i = 0; i < response.length; i++) {
                
                if(response[i].IsAssignedToStaff==1)
                    {
                if(response[i].staffKey==$localStorage.LoginStaffKey )
                    {
                        
                    m = m + 1;    
                        
                    }
                    }
                if(response[i].AssignedBy==$localStorage.ReferenceKey)
                    
                    {   
                        a=a+1;           
             if (response[i].IsAssignedToStaff == 1) {
                    k = k + 1;
                }
                    }*/


               


               /* if (response[i].assignmentStatusName == "In-Progress") {

                    s = s + 1;
                } else if (response[i].assignmentStatusName == "Not Yet Started") {
                    t = t + 1;

                } else if (response[i].assignmentStatusName == "Completed")

                {
                    r = r + 1;

                }
            }

            
*/
        }, function(err) {
            appLogger.error('ERR', err);

        });
    };
    getTaskList();

    var getAssignmentStaffList = function(subOrgKey) {

        ThrillAppBaseStaffListLogic.getAllStaffByDaily(subOrgKey).then(function(response) {
            $scope.assignmentStaffCollection = response;



        })


    };



    var arrayStaff = [];

    $scope.getStaffKeys = function(staffKey, check) {
        //  alert(JSON.stringify(staffKey));


        if (check == true) {
            arrayStaff.push(staffKey);
        } else {
            arrayStaff.pop(staffKey);

        }

        //    alert(JSON.stringify(arrayStaff));


    };



    $scope.getDetails = function(entityAssignment) {

        if (entityAssignment.staff == "student") {
            $scope.student = true;
            $scope.studentTable = true;
            $scope.staff = false;

        } else if (entityAssignment.staff == "staff") {
            $scope.staff = true;
            $scope.student = false;
            $scope.studentTable = false;
            getAssignmentStaffList(subOrgKey);

        }

    };


    $scope.getGroup = function(AssignmentBranchKey) {
        instituteGroupLogic.getGroupByInstituteKey(AssignmentBranchKey).then(function(response) {
            $scope.groupList = response;

        }, function(err) {
            appLogger.error('ERR', err);
        });

    };
    $scope.getGroup();

    $scope.getCourse = function(groupKey) {
        instituteCoursLogic.getCourseByInstituteGroupKey(groupKey, AssignmentBranchKey).then(function(response) {
            $scope.courseList = response;

        }, function(err) {
            appLogger.error('ERR', err);
        });


    };


    $scope.getBatch = function(courseKey) {
        InstituteCourseKey = courseKey;


        instituteBatchLogic.getBatchByInstituteCourseKey(courseKey, AssignmentBranchKey).then(function(response) {
            $scope.batchList = response;


            $scope.getSubject(courseKey);

        }, function(err) {
            appLogger.error('ERR', err);
        });

    };

    $scope.getSubject = function(instituteCourseKey) {
        assignmentLogic.getSubject(instituteCourseKey, AssignmentBranchKey).then(function(response) {
            $scope.subjectList = response;


        }, function(err) {
            appLogger.error('ERR', err);
        });

    };

    $scope.getSubjectList = function(AssignmentBranchKey) {
        instituteSubjectLogic.getSubjectByInstituteKey(AssignmentBranchKey).then(function(response) {
            $scope.subjectStaffList = response;



        })


    }


    $scope.assignmentTypes = function() {
        assignmentLogic.getAssignmentTypes().then(function(response) {
            $scope.assignmentCollections = response;


        }, function(err) {
            appLogger.error('ERR', err);
        });

    };
    $scope.assignmentTypes();

    $scope.priorityList = [{
        "priorityKey": "60c9ce60-45b9-11e6-85c9-5d6f089a4175",
        "priorityStatus": "High"
    }, {
        "priorityKey": "90c9ce60-45b9-11e6-85c9-5d6f555a4185",
        "priorityStatus": "Low"
    }, {
        "priorityKey": "50c9ce60-45b9-11e6-85c9-5d6f089a4175",
        "priorityStatus": "Medium"
    }];


    $scope.editStudentAssignment = function(assignmentKey, branchKey) {


        $state.go('app.editStudentAssignment/:assignmentKey/:branchKey', {
            assignmentKey: assignmentKey,
            branchKey: branchKey
        });
    }
    $scope.editStaffAssignment = function(assignmentKey, branchKey) {

        $state.go('app.editStaffAssignment/:assignmentKey/:branchKey', {
            assignmentKey: assignmentKey,
            branchKey: branchKey
        });
    }


}); // End of App Controller