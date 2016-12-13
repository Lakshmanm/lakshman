/*//=============================================================================
// All rights reserved to Thrill Innovative Labs.
// THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
// OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
// LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
// FITNESS FOR A PARTICULAR PURPOSE.
//=============================================================================
//*****************************************************************************
//* Name		    	: FirstTimeSetup.web.js 
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

	 var app  = angular.module('ThrillAcademic.webSetup', [
			 , 'ngCordova'
			 , 'ThrillAcademic.setupQueries'
			 , 'ThrillAcademic.config'
			 , 'ThrillFrameworkLibrary.appLogger',
			 , 'ngStorage'
	])

app.controller('AppSetupWebCtrl', function ($scope,
 $location, 
 queries, 
 $q,
 $localStorage,
 $rootScope, 
 config,
 appLogger) {
 
 $scope.app = "loading...";

    function WebSqlDb(query, params) {
        //initiate asynchronous call use &q.defer
        var deferred = $q.defer();
        //Create Database instance
        //Open TestdB DataBase 
        var db = openDatabase(config.OFFLINE_DBNAME, '1.0', '', 20 * 1024 * 1024);

        //Prepare Query for Create table
        //Execute Sqlite Query  using tx Command
        db.transaction(function (tx) {

            //Prepare Query (CRUDE OPERATIONS)
            //Execute Sqlite Query  using tx Command
            tx.executeSql(query, params, function (tx, results) {

                deferred.resolve(results);
                // asynchronous process with result
                // this callback will be called asynchronously
                // when the response is available

            }, function (tx, e) {

                deferred.reject();
                //asynchronous process with error
                // called asynchronously if an error occurs
                // or data base returns response with an error status.
            });

        });

        //return results (or exceptions) when they are done processing
        return deferred.promise;
    }

    /**
       Check for the local storage value of IS_LOCAL_BD_EXISTS exists or no
       if value exist the routes to desire path
       if value is not set First timesetup functionality will be executed
       **/

    var IS_LOCAL_DB_EXISTS = $localStorage.INITIAL_SETUP_CHECK;
    if (IS_LOCAL_DB_EXISTS == "" || IS_LOCAL_DB_EXISTS == undefined || IS_LOCAL_DB_EXISTS == 0) {
        $scope.app = "First Time Setup Initializing...";
        appLogger.log("First Time Setup Initializing...");
        appSetupCreateTables();
    } else {
        $scope.app = "DB Exists...";
        appLogger.warn('DB Exists...');
        appLogger.log("DB Exists...");
			 $location.path('/examScheduleList'); // Route to the desired path if IS_LOCAL_BD_EXISTS value exists
		 }

// Create Database Tables if any error in promises detected appSetupDeleteTables function is executed to rollback the setup 

		 function appSetupCreateTables() {
var promiseCreateBoards = createTable(queries.Boards);
var promiseCreateGroups = createTable(queries.Groups);
var promiseCreateCourses = createTable(queries.Courses);
var promiseCreateTerms = createTable(queries.Terms);
var promiseCreateElectiveGroups = createTable(queries.ElectiveGroups);
var promiseCreateSubjects = createTable(queries.Subjects);
var promiseCreateExaminationTypes = createTable(queries.ExaminationTypes);
var promiseCreateExaminations = createTable(queries.Examinations);
var promiseCreateSubjectMarksRanges = createTable(queries.SubjectMarksRanges);
var promiseCreateSubjectComponents = createTable(queries.SubjectComponents);
var promiseCreateExamSchedules = createTable(queries.ExamSchedules);

		 $q.all([
promiseCreateBoards,promiseCreateGroups,promiseCreateCourses,promiseCreateTerms,promiseCreateElectiveGroups,promiseCreateSubjects,promiseCreateExaminationTypes,promiseCreateExaminations,promiseCreateSubjectMarksRanges,promiseCreateSubjectComponents,promiseCreateExamSchedules
		 ]).then(function (res) {
				 $scope.app = "Tables Created...";
				 appSetupInsertDataToTables();
		}, function (err) {
				 appSetupDeleteTables()
		 });
	 }


// Insert Data Database Tables if any error in promises detected appSetupDeleteTables function is executed to rollback the setup 

		 function appSetupInsertDataToTables() {
// TODO : Include the query names if any master tables needs data 

		 $q.all([
// TODO : Include the query names if any master tables needs data 
		 ]).then(function (res) {
				 $scope.app = "First Time Setup Done...";
				 $localStorage.INITIAL_SETUP_CHECK = 1;
				 $location.path('/examScheduleList');

		}, function (err) {
				 $scope.app = "Error Creating Database...";
				 appSetupDeleteTables()
		 });
	 }

// Roll back functionality to deleted the initialized database tables 

		 function appSetupDeleteTables() {
var promiseDeleteBoards = deleteTableData(queries.delBoards);
var promiseDeleteGroups = deleteTableData(queries.delGroups);
var promiseDeleteCourses = deleteTableData(queries.delCourses);
var promiseDeleteTerms = deleteTableData(queries.delTerms);
var promiseDeleteElectiveGroups = deleteTableData(queries.delElectiveGroups);
var promiseDeleteSubjects = deleteTableData(queries.delSubjects);
var promiseDeleteExaminationTypes = deleteTableData(queries.delExaminationTypes);
var promiseDeleteExaminations = deleteTableData(queries.delExaminations);
var promiseDeleteSubjectMarksRanges = deleteTableData(queries.delSubjectMarksRanges);
var promiseDeleteSubjectComponents = deleteTableData(queries.delSubjectComponents);
var promiseDeleteExamSchedules = deleteTableData(queries.delExamSchedules);

		 $q.all([
promiseDeleteBoards,promiseDeleteGroups,promiseDeleteCourses,promiseDeleteTerms,promiseDeleteElectiveGroups,promiseDeleteSubjects,promiseDeleteExaminationTypes,promiseDeleteExaminations,promiseDeleteSubjectMarksRanges,promiseDeleteSubjectComponents,promiseDeleteExamSchedules
		 ]).then(function (res) {
				 $scope.app = "Deleted All Tables...";
				 appLogger.warn('Deleted All Tables...');

		}, function (err) {
				 appLogger.error('Appsetup installation failed');
		 });
	 }

// Create table functionality to create all the database tables 
       
    function createTable(query) {

        var deferred = $q.defer();

        WebSqlDb(query, []).then(function (res) {

            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);

        });
        return deferred.promise;
    }

    /***
      Insert data to created database tables 
      ***/

    function insertDataIntoTable(query) {

        var deferred = $q.defer();
        WebSqlDb(query, []).then(function (res) {

            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);

        });
        return deferred.promise;
    }

    /***
      
    Delete database tables in rollback functionality
     ***/

    function deleteTableData(query) {

        var deferred = $q.defer();
        WebSqlDb(query, []).then(function (res) {

            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);

        });
        return deferred.promise;
    }

});
