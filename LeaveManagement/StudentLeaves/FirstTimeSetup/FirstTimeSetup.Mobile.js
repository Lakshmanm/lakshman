/*//=============================================================================
// All rights reserved to Thrill Innovative Labs.
// THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
// OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
// LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
// FITNESS FOR A PARTICULAR PURPOSE.
//=============================================================================
//*****************************************************************************
//* Name		    	: FirstTimeSetup.Mobile.js 
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

	 var app  = angular.module('ThrillStudentLeaves.setup', [
			 , 'ngCordova'
			 , 'ThrillStudentLeaves.setupQueries'
			 , 'ThrillStudentLeaves.config'
			 , 'ThrillFrameworkLibrary.appLogger'
	])

app.controller('AppSetupMobCtrl', function ($scope, $location, queries, $q, $localStorage, $rootScope, $state, config, $cordovaSQLite, appLogger) {

    $scope.app = "loading...";
    document.addEventListener('deviceready', onDeviceReady, false);

    function onDeviceReady() {

        //Databse initialization to a global variable db

        db = $cordovaSQLite.openDB(config.OFFLINE_DBNAME);

        /**
        Check for the local storage value of IS_LOCAL_BD_EXISTS exists or no
        if value exist the routes to desire path
        if value is not set First timesetup functionality will be executed
        **/

        var IS_LOCAL_DB_EXISTS = $localStorage.INITIAL_SETUP_CHECK;

        if (IS_LOCAL_DB_EXISTS == "" || IS_LOCAL_DB_EXISTS == undefined || IS_LOCAL_DB_EXISTS == 0) {
            $scope.app = "First Time Setup Initializing...";
            appSetupCreateTables();
        } else {
            $scope.app = "DB Exists...";
            appLogger.info('DB Exists...');
            
        }
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

/***Create table functionality to create all the database tables  ***/

    function createTable(query) {

        var deferred = $q.defer();
        $cordovaSQLite.execute(db, query, []).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    }

    /***   Insert data to created database tables    ***/
    function insertTableData(query) {

        var deferred = $q.defer();
        $cordovaSQLite.execute(db, query, []).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    }

    /*** Delete database tables in rollback functionality  ***/

    function deleteTableData(query) {

        var deferred = $q.defer();
        $cordovaSQLite.execute(db, query, []).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    }

});
