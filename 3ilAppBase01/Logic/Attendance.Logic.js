var app = angular.module('ThrillAppBase.attendanceLogic', ['ngCordova', 'ThrillFrameworkLibrary.DataService'
                                                        , 'ThrillAppBase.config'
                                                        , 'ThrillCnnWebClient.appConfig'
                                                        , 'ThrillFrameworkLibrary.appLogger'
                                                         , 'security.registrationLogic'
                                                        , 'ThrillCNN.CreateCalendarLogic'
                                                        , 'ThrillContact.contactLogic'
                                                        , 'ThrillAppBase.thrillAppBasePersonLogic'
                                                        , 'ThrillPerson.personWorkExperienceLogic'
                                                        , 'ThrillAppBase.thrillAppBasePersonLogic'
    ])
    .factory('attendanceLogic', function ($http,
        dataService,
        config,
        appConfig,
        appLogger, registrationLogic, createCalendarLogic, contactLogic, thrillAppBasePersonLogic, personWorkExperienceLogic, ThrillAppBasechildLogic, personBasicInfoLogic, $localStorage) {
        return {


// getBtachByCourseKey: function (entityKey) {

//                 if (appConfig.APP_MODE == 'offline') {
//                           var query = coursQueries.getBtachByCourseKey + "'" + entityKey + "'";
//                     return dataService.executeQuery(query, config.OFFLINE_DBNAME).then(function (response) {
//                         var coursList = [];
//                         for (var i = 0; i < response.rows.length; i++) {
//                             var tempEntityCours = {
//                                 coursekey: response.rows.item(i).coursKey,
//                                 coursetitle: response.rows.item(i).courseTitle,
//                                 groupkey: response.rows.item(i).groupKey,
//                                 instanceorganizationkey: response.rows.item(i).instanceOrganizationKey,
//                             };
//                             coursList.push(tempEntityCours);
//                         } // end of for loop
//                         return coursList;
//                     });
//                 } else {
//       return dataService.callAPI(config.API_URL + 'Mcampuz/InstituteBatchs/' + entityKey, [], 'GET').then(function (response) {
                               
//                         return response.data;
//                     });
//                 }
//             },

     addStudentattendance: function (entityStudentAttendance) {
                 return dataService.insert(entityStudentAttendance, '`attendance.attendances`', config.OFFLINE_DBNAME, config.API_URL + 'Attendance/Attendances').then(function (response) {
                     return response;
             });
     },


 getsessionByInstituteKey: function (entityKey) {
    return dataService.callAPI(config.API_URL + 'Attendance/SessionTypes/'+entityKey, [], 'GET').then(function (response) {
                   return response.data;
                        });
               
        },


     getAllBoards: function (entityKey) {
       return dataService.callAPI(config.API_URL + 'Mcampuz/InstituteBoards/'+entityKey, [], 'GET').then(function (response) {
                   return response.data;
                        });
               
        },

  getAttendanceGenearlSettings: function (entityKey,personReferenceKey) {
             return dataService.callAPI(config.API_URL + 'Person/generalSettings/' + entityKey + '/' + personReferenceKey, [], 'GET').then(function (response) {
                   return response.data;
                        });
               
        },



   getGroupByBoardKey: function (entityKey,instituteKey) {
     
  return dataService.callAPI(config.API_URL + 'Mcampuz/InstituteGroupByBoard/' + entityKey + '/' + instituteKey, [], 'GET').then(function (response) {          
               return response.data;
             
                        });
             
        },

     getCoursByGroupKey: function (entityKey,instituteKey) {
       
          
    return dataService.callAPI(config.API_URL + 'Mcampuz/InstituteCourseByGroup/' + entityKey + '/' + instituteKey, [], 'GET').then(function (response) {                   return response.data;
                     return response.data;
                        });
            
        },


       getBatchByPeriod: function (entityKey,instituteKey) {
            
            
                
     return dataService.callAPI(config.API_URL + 'DailyRoutine/Periodslots/' + entityKey + '/' + instituteKey, [], 'GET').then(function (response) {                   return response.data;
      
           return response.data;
                        });
              
        },

 getStudentList: function (instituteKey,batchKey){
         
             return dataService.callAPI( config.API_URL + 'Assignment/Student/Institute/'+instituteKey+'/Batch/'+batchKey,[],'GET').then(function (response) {
                     return response.data;
             });        
                 
                 
             },


  getStudentListByInstituteKey: function (instituteKey,periodSlotKey,sessionKey,attendanceDate,courseKey,batchKey){

    var newDate = attendanceDate.getFullYear()+'-'+(attendanceDate.getMonth()+1)+'-'+attendanceDate.getDate();

 if(sessionKey==null || sessionKey==undefined || sessionKey==''){

    sessionKey="-";
}
 if(periodSlotKey==null ||  periodSlotKey==undefined ||  periodSlotKey=='')
{
    periodSlotKey="-";

}
//alert(config.API_URL + 'Attendance/Attendances/'+instituteKey+'/'+periodSlotKey+'/'+sessionKey+'/'+newDate+'/'+courseKey+'/'+batchKey);
return dataService.callAPI( config.API_URL + 'Attendance/Attendances/'+instituteKey+'/'+periodSlotKey+'/'+sessionKey+'/'+newDate+'/'+courseKey+'/'+batchKey,[],'GET').then(function (response) {
        
                     return response.data;
             });        


 /*if(periodSlotKey==null ||  periodSlotKey==undefined ||  periodSlotKey==''){

        periodSlotKey="-";
return dataService.callAPI( config.API_URL + 'Attendance/Attendances/'+instituteKey+'/'+periodSlotKey+'/'+sessionKey+'/'+newDate+'/'+courseKey+'/'+batchKey,[],'GET').then(function (response) {
        
                     return response.data;
             });        
}*/

             },



          getBtachByCourseKey: function (entityKey,instituteKey) {
            
             if (appConfig.APP_MODE == 'offline') {
                 var query = boardQueries.getAllBoards;
                 return dataService.executeQuery(query, config.OFFLINE_DBNAME).then(function (response) {
                 var boardList = [];
                 for (var i = 0; i < response.rows.length; i++) {
                     var tempEntityElectiveGroup = {
                        
                     };
                         boardList.push(board);
                 } // end of for loop
                 return boardList;
                });
            } else {
                
     return dataService.callAPI(config.API_URL + 'Mcampuz/InstituteBatch/' + entityKey + '/' + instituteKey, [], 'GET').then(function (response) {                   return response.data;
        
           return response.data;
                        });
                }
        },



 getProfilePicture: function(folderKey, fileKey) {
            return dataService.callAPI(config.API_URL + 'dms/folders/' + folderKey + '/files/' + fileKey, [], 'GET').then(function(response) {

                return response.data[0][0];
            });
        }




 
        };

    });
/* Registration logic  end */