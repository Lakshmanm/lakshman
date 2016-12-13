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

var app = angular.module('ThrillAssignment.assignment', ['ThrillAssignment.assignmentLogic', 'ThrillInstitute.instituteBatchLogic', 'ThrillInstitute.instituteGroupLogic', 'ThrillInstitute.instituteCoursLogic', 'ThrillInstitute.instituteSubjectLogic', 'ThrillAcademic.termLogic', 'ThrillInstitute.instituteLogic', 'ngCordova', 'ngStorage', 'ThrillFrameworkLibrary.geo', 'ThrillFrameworkLibrary.Network', 'ThrillCnnWebClient.appConfig', 'ThrillFrameworkLibrary.appLogger', 'ThrillAppBase.StaffListLogic'])
    /*Setup group Controller */
app.controller('assignmentController', function($scope, termLogic, $location, $q, instituteBatchLogic, instituteGroupLogic, instituteLogic, instituteCoursLogic, instituteSubjectLogic, $http, $state, $stateParams, $localStorage, ThrillAppBaseStaffListLogic, assignmentLogic, SweetAlert, appConfig, appLogger) {


    getLabels(appConfig.CULTURE_NAME);
    getMessages(appConfig.CULTURE_NAME);
    $scope.dms={}

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

    var AssignmentBranchKey;
    var subOrgKey;
    var parentOrgKey;
    
    
    
   /* if($localStorage.RoleID==2)
        {
            $scope.staff=true;
        }*/
    
    
       $scope.getInstitute = function() {
        instituteLogic.getAllInstitutes($localStorage.organizationKey).then(function(response) {
            //alert(JSON.stringify(response))
            $scope.instituteList = response;
          //  alert(JSON.stringify(response));
            $scope.entityAssignment={};


            if($localStorage.RoleID==2 || $localStorage.RoleID==3)

{
            angular.forEach(response,function(resp)
            {

                if(resp.InstituteKey==$localStorage.LoginInstituteKey)
                {

                    $scope.entityAssignment.branchKey=resp;
           $scope.getBranchKey(resp.InstituteKey,resp.SubOrganizationKey,resp.ParentOrganizationKey); 
                }
            })
            $scope.newInstitute=true;
}
            else
                {
                    
                 $scope.newInstitute=false;   
                }

        })
    }
    $scope.getInstitute();
    
    $scope.getBranchKey = function(instituteKey, subOrganizationKey, parentOrganizationKey) {

        AssignmentBranchKey = instituteKey;
        subOrgKey = subOrganizationKey;
        parentOrgKey = parentOrganizationKey;
        $scope.getGroup(AssignmentBranchKey);
    }



    $scope.cancelAssignment = function() {

        $state.go('app.assignmentList');
    };






    $scope.addAssignmentStudent = function(entityAssignment, dms) {

        var assignmentStudent = [];
        var d1 = new Date(entityAssignment.startDate.getTime() + 1 * 86400000);
        var d2 = new Date(entityAssignment.endDate.getTime() + 1 * 86400000);

        var folderDetails = {
            "FolderName": $scope.entityAssignment.assignmentName,
            "EntityKey": AssignmentBranchKey,
            "EntityType": 'Organization'


        };
        termLogic.postDocumentsFolder(folderDetails).then(function(response) {

            var FolderKey = response[0].FolderKey;

            var redefinedObject = redefineObject($scope.dms.documents);
            $q.all(promiseGeneration(redefinedObject, FolderKey)).then(function(response) {


                $scope.entityAssignment.n3DMSFileKey = response[0].data[0][0].Filekey;
                $scope.entityAssignment.folderKey = FolderKey;
                for (var i = 0; i < studentArray.length; i++) {

                    var entityStudent = {};
                    
                    

                    entityStudent.studentKey = studentArray[i];
                    
                    entityStudent.isAssignedToStaff = null;
                    entityStudent.branchKey = AssignmentBranchKey;
                    entityStudent.instanceOrganizationKey = $localStorage.subOrganizationKey;
                    entityStudent.isAssignedtoStudent = 1;
                    entityStudent.assignmentName = entityAssignment.assignmentName;

                    entityStudent.assignedBy = $localStorage.ReferenceKey;
                    if(entityAssignment.topicTitle ==undefined)
                      {  
                          entityStudent.topicKey="undefined";      
                      }
                   else
                     {
                     entityStudent.topicKey = entityAssignment.topicTitle;                
                          }
  if(entityAssignment.priorityKey==undefined)
    {  
   entityStudent.priorityKey ="undefined";      
    } 
      else
         {
    entityStudent.priorityKey = entityAssignment.priorityKey;                        
                }
    
            if(entityAssignment.description==undefined)
                {
          entityStudent.description="undefined";        
                }
            else
                {
           entityStudent.description = entityAssignment.description;          
                }
                     if(entityAssignment.subjectKey==undefined)
                {
         entityStudent.subjectKey="undefined";        
                }
            else
                {
            entityStudent.subjectKey = entityAssignment.subjectKey;         
                }
                    
                    entityStudent.assignmentStatusKey = entityAssignment.assignmentStatusKey;
                    entityStudent.assignmentTypeKey = entityAssignment.assignmentTypeKey;
                   
                    entityStudent.n3DMSFileKey = entityAssignment.n3DMSFileKey;
                    entityStudent.folderKey = entityAssignment.folderKey;
                    entityStudent.batchKey = entityAssignment.batchKey;
                    entityStudent.groupKey = entityAssignment.groupKey;
                    entityStudent.courseKey = entityAssignment.courseKey;
                   

                   
                    entityStudent.endDate = d2;
                    entityStudent.startDate = d1;



                    assignmentStudent.push(entityStudent);
                }



                assignmentLogic.addAssignmentStudent(assignmentStudent).then(function(response) {


                    SweetAlert.swal({
                        title: "Assignment",
                        text: "Saved successfully",
                        type: "success",
                        confirmButtonColor: "#007AFF"
                    });

                    $state.go('app.assignmentList');

                });

            }, function(err) {
                appLogger.error('ERR', err);
            });
        }, function(error) {
            console.log(error);
        });
    };


    $scope.getDetails = function(entityAssignment, branchKey) {



        if (entityAssignment.staff == "staff" && branchKey.InstituteKey != undefined) {

            $scope.staff = true;
            $scope.student = false;
            //   $scope.getStaff(parentOrgKey);
        } else if (entityAssignment.staff == "student" && branchKey.InstituteKey != undefined) {

            $scope.student = true;
            $scope.staff = false;
        }


    };





    if ($location.path() == '/app/editStudentAssignment/' + $stateParams.assignmentKey + '/' + $stateParams.branchKey) {

        assignmentLogic.getAssignmentByAssignmentKey($stateParams.assignmentKey, $stateParams.branchKey).then(function(response) {

            // alert(JSON.stringify(response))
            

            $scope.entityAssignment = {};
            $scope.filename = {};

            AssignmentBranchKey = response[0].BranchKey;
            subOrgKey = response[0].InstanceOrganizationKey;
            $scope.entityAssignment = response[0];
            $scope.entityAssignment.assignmentKey = response[0].AssignmentKey;
            $scope.entityAssignment.branchKey = response[0].BranchKey;

            $scope.entityAssignment.assignmentName = response[0].AssignmentName;
            $scope.entityAssignment.assignmentTypeKey = response[0].AssignmentTypeKey;
            $scope.filename = response[0].FileName;
            $scope.entityAssignment.startDate = new Date(response[0].StartDate);
            $scope.entityAssignment.endDate = new Date(response[0].EndDate);
            $scope.entityAssignment.priorityKey = response[0].Priority;
            $scope.entityAssignment.topicTitle = response[0].TopicKey;
            $scope.entityAssignment.description = response[0].Description;
            $scope.entityAssignment.groupKey = response[0].GroupKey;
            $scope.getGroup(AssignmentBranchKey);
            $scope.getCourse(response[0].GroupKey);
            $scope.entityAssignment.courseKey = response[0].CourseKey;
            $scope.getBatch(response[0].CourseKey);
            $scope.getSubject(response[0].CourseKey);
            $scope.entityAssignment.batchKey = response[0].BatchKey;
            getStudent(response[0].BatchKey);
            $scope.entityAssignment.subjectKey = response[0].SubjectKey;
            $scope.entityAssignment.assignmentStatusKey = response[0].AssignmentStatusKey;
             $scope.getFile(response[0].FileName,response[0].N3DMSFileKey);  
            /*$scope.fileDetails={}
            $scope.fileDetails.FileKey=response[0].N3DMSFileKey;
            $scope.fileDetails.FileName=response[0].FileName;
            $scope.fileDetails.FolderKey=response[0].FolderKey;
            if($scope.fileDetails.FileKey)
            {
              $scope.deleteFileIcon=true;
            }
            else
            {
                $scope.deleteFileIcon=false;
            }*/

        }, function(err) {
            appLogger.error('ERR', err);
        });



    } else if ($location.path() == '/app/editStaffAssignment/' + $stateParams.assignmentKey + '/' + $stateParams.branchKey) {
        assignmentLogic.getStaffAssignmentByAssignmentKey($stateParams.assignmentKey, $stateParams.branchKey).then(function(response) {

            $scope.entityAssignmentStaff = {};
            $scope.filename = {};

            AssignmentBranchKey = response[0].BranchKey;
            subOrgKey = response[0].InstanceOrganizationKey;
            $scope.entityAssignmentStaff = response[0];
            $scope.filename = response[0].FileName;
            $scope.entityAssignmentStaff.assignmentKey = response[0].AssignmentKey;
            $scope.entityAssignmentStaff.branchKey = response[0].BranchKey;
            $scope.entityAssignmentStaff.departmentKey = response[0].DepartmentKey;
            getStaff(response[0].DepartmentKey,AssignmentBranchKey);
            $scope.entityAssignmentStaff.assignmentName = response[0].AssignmentName;
            $scope.entityAssignmentStaff.assignmentTypeKey = response[0].AssignmentTypeKey;
            $scope.entityAssignmentStaff.startDate = new Date(response[0].StartDate);  
             $scope.entityAssignmentStaff.endDate = new Date(response[0].EndDate); 
             $scope.entityAssignmentStaff.priorityKey = response[0].Priority; 
             $scope.entityAssignmentStaff.topicTitle = response[0].TopicKey;  
            $scope.entityAssignmentStaff.description = response[0].Description;
            $scope.entityAssignmentStaff.assignmentStatusKey = response[0].AssignmentStatusKey;
           /* $scope.fileDetails={}
            $scope.fileDetails.FileKey=response[0].N3DMSFileKey;
            $scope.fileDetails.FileName=response[0].FileName;
            $scope.fileDetails.FolderKey=response[0].FolderKey;
            if($scope.fileDetails.FileKey)
            {
              $scope.deleteFileIcon=true;
            }
            else
            {
                $scope.deleteFileIcon=false;
            }
           */


            $scope.getFile(response[0].FileName,response[0].N3DMSFileKey)



        }, function(err) {
            appLogger.error('ERR', err);
        });


    }


    $scope.requestedMinDate = new Date();


    $scope.addAssignmentStaff = function(entityAssignmentStaff, dms) {



        var d1 = new Date(entityAssignmentStaff.startDate.getTime() + 1 * 86400000);;
        var d2 = new Date(entityAssignmentStaff.endDate.getTime() + 1 * 86400000);

        var assignment = [];




        var folderDetails = {
            "FolderName": $scope.entityAssignmentStaff.assignmentName,
            "EntityKey": AssignmentBranchKey,
            "EntityType": 'Organization'


        };


        termLogic.postDocumentsFolder(folderDetails).then(function(response) {

            var FolderKey = response[0].FolderKey;

            var redefinedObject = redefineObject($scope.dms.documents);
            $q.all(promiseGeneration(redefinedObject, FolderKey)).then(function(response) {


                entityAssignmentStaff.n3DMSFileKey = response[0].data[0][0].Filekey;
                entityAssignmentStaff.folderKey = FolderKey;



                for (var i in staffArray) {
                    var entityStaff = {};
                    entityStaff.staffKey = staffArray[i];
                    
                    entityStaff.n3DMSFileKey = entityAssignmentStaff.n3DMSFileKey;
                    entityStaff.folderKey = entityAssignmentStaff.folderKey;
                    entityStaff.isAssignedToStaff = 1;
                    entityStaff.isAssignedtoStudent = null;
                    entityStaff.branchKey = AssignmentBranchKey;
                    entityStaff.instanceOrganizationKey = parentOrgKey;
                    entityStaff.assignedBy = $localStorage.ReferenceKey;
                    if(entityAssignmentStaff.topicTitle==undefined)
                      {  
                         entityStaff.topicKey="undefined";      
                      }
                   else
                     {
                     entityStaff.topicKey = entityAssignmentStaff.topicTitle;                
                          }
  if(entityAssignmentStaff.priorityKey==undefined)
    {  
  entityStaff.priorityKey="undefined";      
    } 
      else
         {
    entityStaff.priorityKey = entityAssignmentStaff.priorityKey;                         
                }
    
            if(entityAssignmentStaff.description==undefined)
                {
          entityStaff.description="undefined";        
                }
            else
                {
          entityStaff.description = entityAssignmentStaff.description;          
                }
               
                   entityStaff.startDate = d1;   
                    entityStaff.endDate = d2;  
                    
                    entityStaff.assignmentStatusKey = entityAssignmentStaff.assignmentStatusKey;
                    entityStaff.assignmentTypeKey = entityAssignmentStaff.assignmentTypeKey;
                   
                    entityStaff.departmentKey = entityAssignmentStaff.departmentKey;
                    
                   
                   
                    entityStaff.subjectKey = entityAssignmentStaff.subjectKey;
                    entityStaff.assignmentName = entityAssignmentStaff.assignmentName;

                    assignment.push(entityStaff);
                }



                assignmentLogic.addAssignmentStaff(assignment).then(function(response) {


                    SweetAlert.swal({
                        title: "Assignment",
                        text: "Saved successfully",
                        type: "success",
                        confirmButtonColor: "#007AFF"
                    });

                    $state.go('app.assignmentList');

                });

            }, function(err) {
                appLogger.error('ERR', err);
            });
        }, function(error) {
            console.log(error);
        });


    };


    function redefineObject(file) {

        var imageArray = [];
        for (var i in file) {
            var obj;

            obj = {
                fileName: file[i].filename,
                fileType: file[i].filetype,
                fileType: file[i].filetype,
                fileSize: file[i].filesize,
                fileBase64Data: file[i].base64
            }

            imageArray.push(obj);
            if (i == (file.length - 1).toString()) {
                //console.log(JSON.stringify(imageArray));
                return imageArray
            }



        }

    }



    function promiseGeneration(imageObject, FolderKey) {
        var promises = [];
        for (var i in imageObject) {
            promises.push(postFiles(imageObject[i], FolderKey));
            if (i == (imageObject.length - 1).toString())
                return promises

        }


    }


    ///function to post file 



    function postFiles(fileObj, FolderKey) {

        var deferred = $q.defer();

        termLogic.postDocuments(fileObj, FolderKey).then(function(response) {



            deferred.resolve(response);


        }, function(error) {
            deferred.resolve(error);

        })



        return deferred.promise


    }




    var staffArray = [];

    $scope.getStaffKey = function(staffKey) {
        staffArray.push(staffKey);


    }





    $scope.getStudentList = function(batchKey) {



        assignmentLogic.getStudentList(AssignmentBranchKey, batchKey).then(function(response) {
            $scope.studentList = response;



        }, function(err) {
            appLogger.error('ERR', err);
        });


    };

    var studentArray = [];

    $scope.getStudentKey = function(studentKey) {
        // alert(JSON.stringify(studentKey));
        studentArray.push(studentKey);

    };


/*

    $scope.getInstitute = function() {
        instituteLogic.getAllInstitutes($localStorage.organizationKey).then(function(response) {
            $scope.instituteList = response;
        })
    }
    $scope.getInstitute();
*/
    
  


    $scope.getDepartments = function() {

        assignmentLogic.getDepartments($localStorage.organizationKey).then(function(response) {
            $scope.departmentList = response;


        }, function(err) {
            appLogger.error('ERR', err);
        });
    };
    $scope.getDepartments();

    $scope.assignmentTypes = function() {
        assignmentLogic.getAssignmentTypes().then(function(response) {
            $scope.assignmentCollections = response;


        }, function(err) {
            appLogger.error('ERR', err);
        });

    };
    $scope.assignmentTypes();

    $scope.assignmentStatus = function() {
        assignmentLogic.getAssignmentStatus().then(function(response) {
            $scope.statusList = response;


        }, function(err) {
            appLogger.error('ERR', err);
        });

    };
    $scope.assignmentStatus();


    $scope.getGroup = function(AssignmentBranchKey) {


        instituteGroupLogic.getGroupByInstituteKey(AssignmentBranchKey).then(function(response) {
            $scope.groupList = response;

        }, function(err) {
            appLogger.error('ERR', err);
        });

    };


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

    $scope.getStaff = function(parentOrgKey, departmentKey,instituteKey) {
        ThrillAppBaseStaffListLogic.getAllStaffByDepartment(parentOrgKey, departmentKey).then(function(response) {
            
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
                 //   alert(JSON.stringify(array));
               $scope.teacherList = array;      
                 }
            else
                {
               $scope.teacherList = response;         
                }
   //  $scope.teacherList = response;

        })

    };



    $scope.getSubject = function(instituteCourseKey) {
        assignmentLogic.getSubject(instituteCourseKey, AssignmentBranchKey).then(function(response) {
            $scope.subjectList = response;


        }, function(err) {
            appLogger.error('ERR', err);
        });

    };


    var mainresp = {};
    var secondresp = {};
    // method for boardLogic
    function getStaff(departmentKey,instituteKey) {


        ThrillAppBaseStaffListLogic.getAllStaffByDepartment(subOrgKey, departmentKey).then(function(response) {
            
            console.log(response);
            
              var depArray=[];
             angular.forEach(response,function(resp)
            {
                //
                if(resp.instituteKey==instituteKey)
                {
             depArray.push(resp);
            
         
                }
             })
          //   
             if(depArray.length!="")
                 {
                     
                 
                 
            
            
            var array = [];
            for (var i = 0; i < depArray.length; i++) {
                var object = {
                    StaffKey: depArray[i].StaffKey,
                    FirstName: depArray[i].FirstName,
                    MiddleName: depArray[i].MiddleName,
                    PersonKey: depArray[i].PersonKey,
                    staff: false
                }
                array.push(object);
                if (i == (depArray.length) - 1) {


                    mainresp = {
                        data: array
                    }


                }

            }

}
            else
                {
                 
            var array = [];
            for (var i = 0; i < response.length; i++) {
                var object = {
                    StaffKey: response[i].StaffKey,
                    FirstName: response[i].FirstName,
                    MiddleName: response[i].MiddleName,
                    PersonKey: response[i].PersonKey,
                    staff: false
                }
                array.push(object);
                if (i == (response.length) - 1) {


                    mainresp = {
                        data: array
                    }


                }

            }     
                    
                }


            if ($stateParams.assignmentKey != undefined) {

                assignmentLogic.getStaffAssignmentByAssignmentKey($stateParams.assignmentKey, $stateParams.branchKey).then(function(resp) {


                    var sarray = [];
                    for (var i = 0; i < resp.length; i++) {
                        var object = {
                            StaffKey: resp[i].StaffKey,
                            FirstName: resp[i].Firstname,
                            MiddleName: resp[i].Middlename,

                            staff: true
                        }
                        sarray.push(object);
                        if (i == (resp.length) - 1) {

                            secondresp = {
                                data: sarray
                            }

                        }

                    }


                    function merge(secondresp, mainresp) {




                        if (!secondresp.data) return {
                            data: mainresp.data
                        };
                        if (!mainresp.data) return {
                            data: secondresp.data
                        };
                        var final = {
                            data: secondresp.data
                        };
                        // merge
                        for (var i = 0; i < mainresp.data.length; i++) {
                            var item = mainresp.data[i];
                            insert(item, final);
                        }
                        return final;
                    }


                    function insert(item, obj) {
                        var data = obj.data;
                        var insertIndex = data.length;
                        for (var i = 0; i < data.length; i++) {
                            if (item.StaffKey == data[i].StaffKey) {
                                // ignore duplicates
                                insertIndex = -1;
                                break;
                            }
                        }
                        if (insertIndex == data.length) {
                            data.push(item);
                        } else if (insertIndex != -1) {
                            data.splice(insertIndex, 0, item);
                        }
                    }

                    var final = merge(secondresp, mainresp);




                    $scope.teacherEditList = final.data;


                })
            } else {

                $scope.teacherEditList = response;

            }


        }, function(err) {
            appLogger.error('ERR', err);
        });

    }

    var update = [];

    $scope.updateAssignmentStaff = function(updateStaff,staff,dms) {

        if (!angular.equals(dms, {})) {

            var folderDetails = {
                "FolderName": updateStaff.assignmentName,
                "EntityKey": AssignmentBranchKey,
                "EntityType": 'Organization'


            };


            termLogic.postDocumentsFolder(folderDetails).then(function(response) {

                var FolderKey = response[0].FolderKey;
                var redefinedObject = redefineObject($scope.dms.documents);
                $q.all(promiseGeneration(redefinedObject, FolderKey)).then(function(response) {
                    updateStaff.N3DMSFileKey = response[0].data[0][0].Filekey;
                    updateStaff.FolderKey = FolderKey;

                  //  alert(JSON.stringify(updateStaff))
                    $scope.updateStaff(updateStaff, staff)

                })

            })
        } else {
            $scope.updateStaff(updateStaff, staff);
        }
    };



    $scope.updateStaff = function(updateStaff, staff) {



        var update = [];
        var Keys = [];
        for (var i in staff) {

            if (staff[i].staff == true) {
                Keys.push(staff[i].StaffKey);
            }

        }

         var d1 = new Date(updateStaff.startDate.getTime() + 1 * 86400000);
        var d2 = new Date(updateStaff.endDate.getTime() + 1 * 86400000);

        
        for (var i in Keys) {
            var entityUpdateStaff = {};

            entityUpdateStaff.staffKey = Keys[i];
            entityUpdateStaff.isAssignedToStaff = 1;
            entityUpdateStaff.isAssignedtoStudent = null;
            entityUpdateStaff.assignmentKey = updateStaff.AssignmentKey;
            entityUpdateStaff.assignedBy = $localStorage.ReferenceKey;
            entityUpdateStaff.branchKey = updateStaff.BranchKey;
            entityUpdateStaff.n3DMSFileKey = updateStaff.N3DMSFileKey;
            entityUpdateStaff.folderKey = updateStaff.FolderKey;
            entityUpdateStaff.instanceOrganizationKey = updateStaff.InstanceOrganizationKey;
            entityUpdateStaff.topicKey = updateStaff.topicTitle;
            entityUpdateStaff.assignmentStatusKey = updateStaff.assignmentStatusKey;
            entityUpdateStaff.assignmentTypeKey = updateStaff.assignmentTypeKey;
            entityUpdateStaff.priorityKey = updateStaff.priorityKey;
            entityUpdateStaff.departmentKey = updateStaff.departmentKey;
            entityUpdateStaff.description = updateStaff.description;
            entityUpdateStaff.endDate = d2;
            entityUpdateStaff.startDate =d1;

            entityUpdateStaff.assignmentName = updateStaff.assignmentName;

            update.push(entityUpdateStaff);
        }


        assignmentLogic.updateAssignmentStaff(update, updateStaff.AssignmentKey).then(function(response) {

             //   alert(JSON.stringify(response))

            SweetAlert.swal({
                title: "Staff Assignment",
                text: "Updated successfully",
                type: "success",
                confirmButtonColor: "#007AFF"
            });
            $state.go('app.assignmentList');

            //appLogger.alert($scope.alertMessageLabels.boardUpdated);

        }, function(err) {
            appLogger.error('ERR', err);
        });



    }


     $scope.deleteFile = function (FileKey) {
      
        var folderKey = $scope.fileDetails.FolderKey

       // alert(FileKey)
      //  alert(folderKey)
        assignmentLogic.deleteFile(FileKey, folderKey).then(function (response) {
             $scope.deleteFileIcon=false;
             SweetAlert.swal({
                        title: "File"
                        , text: "Deleted successfully"
                        , type: "success"
                        , confirmButtonColor: "#007AFF"
                    });
              
        }, function (err) {
            appLogger.error('ERR', err);
        });
    };


     $scope.getFile = function (fileKey) {
        var folderKey = $scope.fileDetails.FolderKey;
        termLogic.getFile(fileKey, folderKey).then(function (response) {
            //console.log(response[0].FileBin);
            var a = document.createElement("a");
            a.download = response[0].FileName;
            a.href = response[0].FileBin;
            console.log(a.href);
            a.click();
        }, function (err) {
            appLogger.error('ERR', err);
        });
    }



    var main = {};
    var second = {};
    // method for boardLogic
    function getStudent(batchKey) {
        assignmentLogic.getStudentList(AssignmentBranchKey, batchKey).then(function(response) {

            var array = [];
            for (var i = 0; i < response.length; i++) {
                var object = {
                    StudentKey: response[i].StudentKey,
                    FirstName: response[i].FirstName,
                    LastName: response[i].LastName,
                    PersonKey: response[i].PersonKey,
                    student: false
                }
                array.push(object);
                if (i == (response.length) - 1) {
                    main = {
                        data: array
                    }
                }

            }




            if ($stateParams.assignmentKey != undefined) {

                assignmentLogic.getAssignmentByAssignmentKey($stateParams.assignmentKey, $stateParams.branchKey).then(function(resp) {




                    var sarray = [];
                    for (var i = 0; i < resp.length; i++) {
                        var object = {
                            StudentKey: resp[i].StudentKey,
                            FirstName: resp[i].Firstname,
                            LastName: resp[i].Lastname,
                            student: true
                        }
                        sarray.push(object);
                        if (i == (resp.length) - 1) {

                            second = {
                                data: sarray
                            }

                        }

                    }







                    function merge(second, main) {


                        if (!second.data) return {
                            data: main.data
                        };
                        if (!main.data) return {
                            data: second.data
                        };
                        var final = {
                            data: second.data
                        };
                        // merge
                        for (var i = 0; i < main.data.length; i++) {
                            var item = main.data[i];
                            insert(item, final);
                        }
                        return final;
                    }


                    function insert(item, obj) {
                        var data = obj.data;
                        var insertIndex = data.length;
                        for (var i = 0; i < data.length; i++) {
                            if (item.StudentKey == data[i].StudentKey) {
                                // ignore duplicates
                                insertIndex = -1;
                                break;
                            }
                        }
                        if (insertIndex == data.length) {
                            data.push(item);
                        } else if (insertIndex != -1) {
                            data.splice(insertIndex, 0, item);
                        }
                    }

                    var final = merge(second, main);






                    $scope.studentEditList = final.data;


                })
            } else {

                $scope.studentEditList = response;

            }


        }, function(err) {
            appLogger.error('ERR', err);
        });

    }


    $scope.updateAssignmentStudent = function(updateAssignment, dms, student) {
        // alert(dms)

        if (!angular.equals(dms, {})) {

            var folderDetails = {
                "FolderName": updateAssignment.assignmentName,
                "EntityKey": AssignmentBranchKey,
                "EntityType": 'Organization'


            };


            termLogic.postDocumentsFolder(folderDetails).then(function(response) {

                var FolderKey = response[0].FolderKey;
                var redefinedObject = redefineObject($scope.dms.documents);
                $q.all(promiseGeneration(redefinedObject, FolderKey)).then(function(response) {
                    updateAssignment.N3DMSFileKey = response[0].data[0][0].Filekey;
                    updateAssignment.FolderKey = FolderKey;
                    $scope.updateStudent(updateAssignment, student)

                })

            })
        } else {

            $scope.updateStudent(updateAssignment, student);
        }

    };


    $scope.updateStudent = function(updateAssignment, student) {



        var Keys = [];
        for (var i in student) {
            if (student[i].student == true) {
                Keys.push(student[i].StudentKey);
            }
        }
        
        
 var d1 = new Date(updateAssignment.startDate.getTime() + 1 * 86400000);
        var d2 = new Date(updateAssignment.endDate.getTime() + 1 * 86400000);

        var updateStudent = [];
        for (var i in Keys) {

            var entityStudent = {};

            entityStudent.studentKey = Keys[i];
            entityStudent.topicKey = updateAssignment.topicTitle;
            entityStudent.isAssignedToStaff = null;

            entityStudent.isAssignedtoStudent = 1;
            entityStudent.assignmentName = updateAssignment.assignmentName;
            entityStudent.assignmentKey = updateAssignment.assignmentKey;
            entityStudent.assignedBy = $localStorage.ReferenceKey;
            entityStudent.assignmentStatusKey = updateAssignment.assignmentStatusKey;
            entityStudent.assignmentTypeKey = updateAssignment.assignmentTypeKey;
            entityStudent.priorityKey = updateAssignment.priorityKey;
            entityStudent.n3DMSFileKey = updateAssignment.N3DMSFileKey;
            entityStudent.folderKey = updateAssignment.FolderKey;
            entityStudent.branchKey = updateAssignment.BranchKey;
            entityStudent.instanceOrganizationKey = updateAssignment.InstanceOrganizationKey;
            entityStudent.batchKey = updateAssignment.batchKey;
            entityStudent.groupKey = updateAssignment.groupKey;
            entityStudent.courseKey = updateAssignment.courseKey;
            entityStudent.subjectKey = updateAssignment.subjectKey;
            entityStudent.description = updateAssignment.description;
            entityStudent.endDate = d2;
            entityStudent.startDate = d1;



            updateStudent.push(entityStudent);
        }



        assignmentLogic.updateAssignmentStudent(updateStudent, updateAssignment.assignmentKey).then(function(response) {



            SweetAlert.swal({
                title: "Student Assignment",
                text: "Updated successfully",
                type: "success",
                confirmButtonColor: "#007AFF"
            });
            $state.go('app.assignmentList');
            //appLogger.alert($scope.alertMessageLabels.boardUpdated);

        }, function(err) {
            appLogger.error('ERR', err);
        });

    }


    $scope.getName = function(dms) {



        $scope.filename = dms[0].filename;

    }

    $scope.priorityList = [{
        "priorityKey": "60c9ce60-45b9-11e6-85c9-5d6f089a4175",
        "priorityStatus": "High"
    }, {
        "priorityKey": "90c9ce60-45b9-11e6-85c9-5d6f555a4185",
        "priorityStatus": "Low"
    }, {
        "priorityKey": "50c9ce60-45b9-11e6-85c9-5d6f089a4175",
        "priorityStatus": "Medium"
    }]

}); // End of App Controller