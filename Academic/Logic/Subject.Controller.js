/*//=============================================================================
// All rights reserved to Thrill Innovative Labs.
// THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
// OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
// LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
// FITNESS FOR A PARTICULAR PURPOSE.
//=============================================================================
//*****************************************************************************
//* Name		    	: Subject.Controller.js 
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
var app = angular.module('ThrillAcademic.subject', ['ThrillAcademic.subjectLogic'

        , 'ThrillAcademic.termLogic'

        , 'ThrillAcademic.electiveGroupLogic'

        , 'ngCordova'

        , 'ThrillFrameworkLibrary.geo'

        , 'ThrillFrameworkLibrary.Network'

        , 'ThrillCnnWebClient.appConfig'

        , 'ThrillFrameworkLibrary.appLogger'

        , 'ThrillAcademic.boardLogic'

        , 'ThrillAcademic.groupLogic'

        , 'ThrillAcademic.coursLogic'
        ,'ThrillAcademic.subjectMarksRangeLogic'  
        , 'ThrillAcademic.termLogic'
    ])
    /*Setup subject Controller */
app.controller('SubjectController', function($scope,$q, $http, boardLogic, groupLogic, coursLogic, subjectLogic, termLogic, electiveGroupLogic, $localStorage,subjectMarksRangeLogic, SweetAlert, $state, $stateParams, appConfig, appLogger) {
    getLabels(appConfig.CULTURE_NAME);
    getMessages(appConfig.CULTURE_NAME);
    /*get labels with selected language*/
    function getLabels(cultureName) {
        var currentFileName = "Subject";
        $http.get("Academic/Languages/" + currentFileName + "." + cultureName + ".json").then(function(response) {
            bindLabels(response.data);
        });
    }

    function getMessages(cultureName) {
        var alertMessageName = "AlertMessages";
        $http.get("Academic/Languages/" + alertMessageName + "." + cultureName + ".json").then(function(response) {
            $scope.alertMessageLabels = response.data.messages;
        });
    }
 $scope.entitySubject={};
 $scope.entityExam={};
    var examinationTypeId;
 $scope.ExamcCollection={};
$scope.ExaminationLevel = [{ "Title": "Organization Level", "Id": "1" }, { "Title": "Institute Level", "Id": "2" }]
    /*bind labels with selected language */
    function bindLabels(data) {
        $scope.labelsSubject = data.labels;
    };
    $scope.save = true;
    $scope.update = false;
    $scope.showExamTypeGrid=false;
    var entitykey = DrawCaptcha();
    var subjectEntityKey;
    var   ExamTypeKey ;
     var academicYearKey;
 var SubjectForKey;
    var subjectKeyEdit;
    $scope.getElective = function(value) {
        if (value == true) {
            $scope.electiveGroupTitle = true;
        } else {
            $scope.electiveGroupTitle = false;
        }
    };
    $scope.organizationList = [{
        "instanceorganizationtitle": "org 1",
        "instanceorganizationkey": "0829a334-5e27-11e6-9186-41e6368e6666"
    }, {
        "instanceorganizationtitle": "org 2",
        "instanceorganizationkey": "0829a334-5e27-33e6-4444-41e6368e2437"
    }, {
        "instanceorganizationtitle": "org 3",
        "instanceorganizationkey": "0829a334-5e27-33e6-9186-41e6368e9999"
    }];
    /*Perform the CRUD (Create, Read, Update & Delete) operations of Subject*/
    /*Method for calling  add Subject */
    function getAllBoards() {
        boardLogic.getAllBoards($localStorage.organizationKey).then(function(response) {
            $scope.boardList = response;
        })
    }
    getAllBoards();
    $scope.getBoardGroups = function(boardKey) {
        groupLogic.getBoardGroups(boardKey).then(function(response) {
            $scope.groupList = response;
        })
    }
    $scope.getCoursByGroupKey = function(groupKey) {
        coursLogic.getCoursByGroupKey(groupKey).then(function(response) {
            $scope.courseList = response;
        })
    }
    $scope.getTermByCourseKey = function(courseKey) {
        termLogic.getTermByCourseKey(courseKey).then(function(response) {
            $scope.termList = response;
        })
    }
    $scope.getElectiveGroupByTermKey = function(termKey) {
        electiveGroupLogic.getElectiveGroupByTermKey(termKey).then(function(response) {
            $scope.electiveGroup = response;
        })
    }


  function getAllExaminationTitleWithExaminationType() {
        subjectLogic.getAllBoards($localStorage.organizationKey).then(function(response) {
            $scope.boardList = response;
        })
    }
    getAllBoards();



   var getAcademicYear = function() {
        subjectLogic.getAllSAcademicYear($localStorage.organizationKey).then(function(response) {
 
      academicYearKey = response[0].AcademicYearKey;  

        });
    }
    getAcademicYear();

//Method to add subject and Marks 
    $scope.addSubject = function() {
           if (appConfig.APP_MODE == 'offline') {
            $scope.entitySubject.subjectKey = entitykey;
        }
        $scope.entitySubject.ExaminationTypeId= $scope.entityExam.ExaminationTypeId
        $scope.entitySubject.createdAppKey = "3il_App_Key";
        $scope.entitySubject.createdUserKey = "3il_User_Key";
        $scope.entitySubject.instanceOrganizationKey = $localStorage.organizationKey;
        $scope.entitySubject.isElective = ($scope.entitySubject.isElective == true ? 1 : 0);
        delete $scope.entitySubject.boardKey;
        delete $scope.entitySubject.groupKey;
        delete $scope.entitySubject.courseKey;
    
        subjectLogic.addSubject($scope.entitySubject).then(function(response) {
               
            
            $scope.entitySubject = {};
          SubjectForKey=response.data.subjectKey;
     $scope.ExamcCollection.InstanceOrganizationKey=$localStorage.organizationKey;
        $scope.ExamcCollection.academicYearKey=academicYearKey;
        var newarray = [];
    for (var i = 0; i < $scope.ExamcCollection.length; i++)
        {
            $scope.ExamcCollection[i].InstanceOrganizationKey=$localStorage.organizationKey;
            $scope.ExamcCollection[i].academicYearKey=academicYearKey;
         $scope.ExamcCollection[i].subjectKey=SubjectForKey;
            delete $scope.ExamcCollection[i].ExaminationTypeTitle
             delete $scope.ExamcCollection[i].$$hashKey

            if($scope.ExamcCollection[i].maxMarks!=undefined)
            newarray.push(PostExam($scope.ExamcCollection[i]));

           if(i==$scope.ExamcCollection.length-1)
           {
            $q.all(newarray).then(function(response){
           $scope.subjectForm.$setPristine();
   $scope.subjectForm.$setUntouched();
              SweetAlert.swal({
                title: "Subject & Marks ",
                text: "Saved successfully",
                type: "success",
                confirmButtonColor: "#007AFF"
            });
               refresh();
  $scope.showExamTypeGrid=false;
            },function(err){

            })
           }
         }
            
            
       });
    };

    function PostExam(obj)
{
    var deffered = $q.defer()
    subjectLogic.addExamLevel(obj).then(function(response) {
    deffered.resolve(response)
    },function(err){
        deffered.reject(err);
    })
    return deffered.promise;

}

//method to get All exam Types for that with level Id
   $scope.getAllExamintionTypes = function(val) {
     //$scope.showExamTypeGrid=true;
    
     /*  subjectLogic.getExamMarksBySubjectKey(subjectKeyEdit).then(function(response1) {*/


    

    // alert(JSON.stringify(response1))
     subjectLogic.getAttendanceGenearlSettings(val,$localStorage.organizationKey).then(function(response2) {
      
     
      subjectLogic.getExamMarksBySubjectKey(subjectKeyEdit).then(function(response1) {
    
         
     
          if(response1.length== undefined)
              {
             $scope.ExamcCollection= response2 ;      
                  
              }
          else 
              {
           if(val!=response1[0].ExaminationTypeId){       
         
           $scope.ExamcCollection= response2 ;   
               
           }
                        
          else if(val==response1[0].ExaminationTypeId )
              {
                            for(var i=0;i<response2.length;i++)
      {
        for(var j=0;j<response1.length;j++)
        {

            if(response2[i].ExaminationTypeKey==response1[i].ExaminationTypeKey)
            {

                response2[i].passMarks=response1[i].passMarks;
                response2[i].maxMarks=response1[i].maxMarks;
                response2[i].subjectMarksRangeKey=response1[i].subjectMarksRangeKey;
                response2[i].subjectKey=response1[i].subjectKey;
            }

        }
      } 
                  
         $scope.ExamcCollection= response2 ;            
              }
                  
                  
              }
    
          
          
             
        
                 

      });
     /* for(var i=0;i<response2.length;i++)
      {
        for(var j=0;j<response1.length;j++)
        {

            if(response2[i].ExaminationTypeKey==response1[i].ExaminationTypeKey)
            {

                response2[i].passMarks=response1[i].passMarks;
                response2[i].maxMarks=response1[i].maxMarks;
                response2[i].subjectMarksRangeKey=response1[i].subjectMarksRangeKey;
                response2[i].subjectKey=response1[i].subjectKey;
            }

        }
      }
     
      $scope.ExamcCollection= response2*/
       $scope.showExamTypeGrid=true;

    //  alert(JSON.stringify(response2));

     });
//console.log(response);

           /*   });*/
       
       

       
       
       
       
    }



  $scope.addNewExamLevel = function() {
        $scope.test = false;
        DailyID = DailyID + 1;
        if (DailyID >= 1) {
            $scope.test = true;
        }


        $scope.dailyList.push({
            'DailyID': DailyID,

            'PeriodSlotName': "",
            'startTimeHours': "",
            'startTimeMins': "",
            'endTimeHours': "",
            'endTimeMins': "",
            'remove': ""

        });
    };


    function getTerm() {
        termLogic.getAllTerms().then(function(response) {
            $scope.termList = response;
        }, function(err) {
            appLogger.error('ERR', err);
        });
    }
    getTerm();

    function getelectiveGroups() {
        electiveGroupLogic.getAllElectiveGroups().then(function(response) {
            $scope.electiveGroup = response;
        }, function(err) {
            appLogger.error('ERR', err);
        });
    }
    getelectiveGroups();
    /*Method for calling  update Subject*/
    $scope.updateSubject = function() {
        delete $scope.entitySubject.boardKey;
        delete $scope.entitySubject.groupKey;
        delete $scope.entitySubject.courseKey;
        delete $scope.entitySubject.boardTitle;
        delete $scope.entitySubject.groupTitle;
        delete $scope.entitySubject.courseTitle;
        delete $scope.entitySubject.termTitle;
        $scope.entitySubject.ExaminationTypeId= $scope.entityExam.ExaminationTypeId;
        $scope.entitySubject.isElective = ($scope.entitySubject.isElective == true ? 1 : 0);
        subjectLogic.updateSubject($scope.entitySubject, $scope.entitySubject.subjectKey).then(function(response) {
 
         console.log($scope.ExamcCollection);
   
        var newarray = [];
    for (var i = 0; i < $scope.ExamcCollection.length; i++)
        {
          
   
            delete $scope.ExamcCollection[i].ExaminationTypeTitle
             delete $scope.ExamcCollection[i].$$hashKey

            if($scope.ExamcCollection[i].maxMarks!=undefined)
            newarray.push(updateExam($scope.ExamcCollection[i]));

           if(i==$scope.ExamcCollection.length-1)
           {
            $q.all(newarray).then(function(response){
                
            $scope.save = true;
            $scope.update = false;
             $scope.entitySubject={};
                $scope.entityExam={};
          $scope.subjectForm.$setPristine();
          $scope.subjectForm.$setUntouched();
                
              SweetAlert.swal({
                title: "Subject & Marks ",
                text: "Updated successfully",
                type: "success",
                confirmButtonColor: "#007AFF"
            });
               refresh();
                
  $scope.showExamTypeGrid=false;
                
            },function(err){

            })
           }
         }


 
            /*$scope.entitySubject = {};
            $scope.subjectForm.$setPristine();
            $scope.subjectForm.$setUntouched();
            $scope.save = true;
            $scope.update = false;
            SweetAlert.swal({
                title: "Subject",
                text: "Updated successfully",
                type: "success",
                confirmButtonColor: "#007AFF"
            });*/
            refresh();
        }, function(err) {
            appLogger.error('ERR', err);
        });
    };


    function updateExam(obj)
{
    //alert(JSON.stringify(obj));
    var deffered = $q.defer()
    subjectMarksRangeLogic.updateSubjectMarksRange(obj,obj.subjectMarksRangeKey).then(function(response) {
    deffered.resolve(response)
    },function(err){
        deffered.reject(err);
    })
    return deffered.promise;

}





    /*Method for  retrieving  Subject details*/
    $scope.editSubject = function(subjectKey) {
        subjectKeyEdit=subjectKey;
        $scope.save = false;
        $scope.update = true;
        subjectLogic.getSubjectBySubjectKey(subjectKey).then(function(response) {

            console.log(subjectKey)

        console.log(JSON.stringify(response))
          //  appLogger.log('date ctrl ' + JSON.stringify(response))
            $scope.getBoardGroups(response[0].boardKey);
            $scope.getCoursByGroupKey(response[0].groupKey);
            $scope.getTermByCourseKey(response[0].courseKey);
            $scope.getElectiveGroupByTermKey(response[0].termKey);
            $scope.entitySubject = {};
              $scope.entityExam={};
            $scope.entitySubject.boardKey = response[0].boardKey;
            $scope.entitySubject.boardTitle = response[0].boardTitle;
            $scope.entitySubject.groupKey = response[0].groupKey;
            $scope.entitySubject.groupTitle = response[0].groupTitle;
            $scope.entitySubject.courseKey = response[0].courseKey;
            $scope.entitySubject.courseTitle = response[0].courseTitle;
            $scope.entitySubject.subjectKey = response[0].subjectKey;
            $scope.entitySubject.subjectTitle = response[0].subjectTitle;
            $scope.entitySubject.termKey = response[0].termKey;
            $scope.entitySubject.termTitle = response[0].termTitle;
            $scope.entitySubject.instanceOrganizationKey = response[0].instanceOrganizationKey;
            $scope.entitySubject.isElective = response[0].isElective;
            $scope.entitySubject.electiveGroupKey = response[0].electiveGroupKey;
            $scope.entityExam.ExaminationTypeId=response[0].examinationTypeId;
            examinationTypeId=response[0].examinationTypeId;
            //$scope.getAllExamintionTypes($scope.entityExam.ExaminationTypeId);

            $scope.entitySubject.minimumTeachingHours = parseInt(response[0].minimumTeachingHours);
            if (response[0].isElective == 1 || response[0].isElective == true) {
                $scope.entitySubject.isElective = true;
                $scope.electiveGroupTitle = true;
            } else {
                $scope.entitySubject.isElective = false;
                $scope.electiveGroupTitle = false;
            }
subjectLogic.getExamMarksBySubjectKey(subjectKey).then(function(response1) {


    

  //   console.log(JSON.stringify(response1))
     subjectLogic.getAttendanceGenearlSettings(examinationTypeId,$localStorage.organizationKey).then(function(response2) {
      
     // console.log(JSON.stringify(response2))
    // alert(response1.length)
   //  alert(response2.length)
      for(var i=0;i<response2.length;i++)
      {
        for(var j=0;j<response1.length;j++)
        {
           
            if(response1[j].ExaminationTypeKey)
                {
                    

            if(response2[i].ExaminationTypeKey==response1[j].ExaminationTypeKey)
            {

                response2[i].passMarks=response1[i].passMarks;
                response2[i].maxMarks=response1[i].maxMarks;
                response2[i].subjectMarksRangeKey=response1[i].subjectMarksRangeKey;
                response2[i].subjectKey=response1[i].subjectKey;
            }
                    
                }

        }
      }
      $scope.showExamTypeGrid=true;
      $scope.ExamcCollection= response2

    //  alert(JSON.stringify(response2));

     })
//console.log(response);

              });

        }, function(err) {
            appLogger.error('ERR', err);
        });
    }
    var refresh = function() {
        subjectLogic.getAllSubjects($localStorage.organizationKey).then(function(response) {
           // alert(JSON.stringify(response));
           // console.log(response);
            $scope.subjectCollection = response;
            $scope.sortColumn = "";
            $scope.reverseSort = false;
            $scope.sortData = function(column) {
                $scope.reverseSort = ($scope.sortColumn == column) ? !$scope.reverseSort : false;
                $scope.sortColumn = column;
            }
            $scope.getSortClass = function(column) {
                    if ($scope.sortColumn == column) {
                        return $scope.reverseSort ? 'arrow-down' : 'arrow-up';
                    }
                    return '';
                },
                function(err) {
                    appLogger.error('ERR', err);
                };
        });
    }
    refresh();

$scope.entityExam.Id={};




    /*Method for calling  deleting   Subject*/
    $scope.deleteSubject = function(subjectEntityKey) {
        SweetAlert.swal({
            title: "Are you sure?",
            text: "Your want to delete this subject",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, cancel!",
            closeOnConfirm: false,
            closeOnCancel: false
        }, function(isConfirm) {
            if (isConfirm) {
                subjectLogic.deleteSubject(subjectEntityKey).then(function(response) {
                    // appLogger.alert($scope.alertMessageLabels.subjectDeleted);
                    $scope.entitySubject = {};
                    $scope.subjectForm.$setPristine();
                    $scope.subjectForm.$setUntouched();
                    $scope.save = true;
                    $scope.update = false;
                    SweetAlert.swal({
                        title: "Subject",
                        text: "Deleted successfully",
                        type: "success",
                        confirmButtonColor: "#007AFF"
                    });
                    refresh();
                }, function(err) {
                    appLogger.error('ERR', err);
                });
            } else {
                SweetAlert.swal({
                    title: "Cancelled",
                    text: "Your subject is safe :)",
                    type: "error",
                    confirmButtonColor: "#007AFF"
                });
            }
        });
    };
}); // End of App Controller