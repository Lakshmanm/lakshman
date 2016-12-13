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

	 var app  = angular.module('ThrillStudentLeaves.webSetup', [
			 , 'ngCordova'
			 , 'ThrillStudentLeaves.setupQueries'
			 , 'ThrillStudentLeaves.config'
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
			 $location.path('/studentLeaveRequestReceivedByList'); // Route to the desired path if IS_LOCAL_BD_EXISTS value exists
		 }

// Create Database Tables if any error in promises detected appSetupDeleteTables function is executed to rollback the setup 

		 function appSetupCreateTables() {
var promiseCreateStudentLeaveRequests = createTable(queries.StudentLeaveRequests);
var promiseCreateStudentLeaveReasons = createTable(queries.StudentLeaveReasons);
var promiseCreateStudentLeaveRequestModes = createTable(queries.StudentLeaveRequestModes);
var promiseCreateStudentLeaveRequestReceivedBies = createTable(queries.StudentLeaveRequestReceivedBies);

		 $q.all([
promiseCreateStudentLeaveRequests,promiseCreateStudentLeaveReasons,promiseCreateStudentLeaveRequestModes,promiseCreateStudentLeaveRequestReceivedBies
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
				 $location.path('/studentLeaveRequestReceivedByList');

		}, function (err) {
				 $scope.app = "Error Creating Database...";
				 appSetupDeleteTables()
		 });
	 }

// Roll back functionality to deleted the initialized database tables 

		 function appSetupDeleteTables() {
var promiseDeleteStudentLeaveRequests = deleteTableData(queries.delStudentLeaveRequests);
var promiseDeleteStudentLeaveReasons = deleteTableData(queries.delStudentLeaveReasons);
var promiseDeleteStudentLeaveRequestModes = deleteTableData(queries.delStudentLeaveRequestModes);
var promiseDeleteStudentLeaveRequestReceivedBies = deleteTableData(queries.delStudentLeaveRequestReceivedBies);

		 $q.all([
promiseDeleteStudentLeaveRequests,promiseDeleteStudentLeaveReasons,promiseDeleteStudentLeaveRequestModes,promiseDeleteStudentLeaveRequestReceivedBies
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
