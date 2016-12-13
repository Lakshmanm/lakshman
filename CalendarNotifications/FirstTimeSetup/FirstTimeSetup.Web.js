/*===========================================================================
 All rights reserved to Nunet Cube Software Solutions.
 THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
 OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
 LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
 FITNESS FOR A PARTICULAR PURPOSE.
============================================================================
****************************************************************************
 Name            :  Jagadeesh A
 Type            : Javascript and JQuery 
 Description     :
 References      :
 Author          :  Jagadeesh A
 Created Date    :  31-03-2016
****************************************************************************                          
MODIFICATION LOG
**************************************************************************** 
Ver Date       Modified By      Description
****************************************************************************                            
Code Review LOG
**************************************************************************** 
Ver        Date                Code Review By            Observations
****************************************************************************
*/
/* create the fistime setup controller for Web
  also include Dependency Modules

*/


var app = angular.module('ThrillArchSample.webSetup', ['ngCordova', 'ngStorage', 'ThrillArchSample.setupQueries', 'ThrillArchSample.config', 'ThrillFrameworkLibrary.appLogger'])


//Set Up Employee Controller 
app.controller('AppSetupWebCtrl', function ($scope, $location, queries, $q, $localStorage, $rootScope, config, appLogger) {
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
        $location.path('/empList'); // Route to the desired path if IS_LOCAL_BD_EXISTS value exists
    }


    /***
      Create Database Tables if any error in promises detected appSetupDeleteTables 
      function is executed to rollback the setup
      ***/

    function appSetupCreateTables() {

        var promiceCreateEmployees = createEmployeeTable(queries.Employees);
        var promiceCreateExperiences = createEmployeeTable(queries.Experiences);
        var promiceCreateBloodGroups = createEmployeeTable(queries.BloodGroups);
        var promiceCreateGenders = createEmployeeTable(queries.Genders);
        var promiceCreateLanguages = createEmployeeTable(queries.Languages);

        $q.all([promiceCreateEmployees

            
            , promiceCreateExperiences

            
            , promiceCreateBloodGroups

            
            , promiceCreateGenders

            
            , promiceCreateLanguages
        ]).then(function (res) {

            $scope.app = "Tables Created...";
            appSetupInsertDatetoTables();
        }, function (err) {

            appSetupDeleteTables()
        });

    }

    /***
        Insert Data Database Tables if any error in promises detected appSetupDeleteTables 
        function is executed to rollback the setup
        ***/

    function appSetupInsertDatetoTables() {

        var promiceInsertBloodGroups = insertEmployeeTableData(queries.INBloogGroups);
        var promiceInsertGenders = insertEmployeeTableData(queries.INGenders);
        var promiceInsertLanguages = insertEmployeeTableData(queries.INLanguages);

        $q.all([promiceInsertBloodGroups

            
            , promiceInsertGenders

            
            , promiceInsertLanguages
        ]).then(function (res) {

            $scope.app = "First Time Setup Done...";
            $localStorage.INITIAL_SETUP_CHECK = 1;
            $location.path('/empList');

        }, function (err) {

            $scope.app = "Error Creating Database...";
            appSetupDeleteTables()

        });

    }

    /***
      Roll back functionality to deleted the initialized database tables
       ***/

    function appSetupDeleteTables() {

        var promiceDeleteEmployees = deleteEmployeeTableData(queries.DelEmployees);
        var promiceDeleteExperiences = deleteEmployeeTableData(queries.DelExperiences);
        var promiceDeleteBloodGroups = deleteEmployeeTableData(queries.DelBloodGroups);
        var promiceDeleteGenders = deleteEmployeeTableData(queries.DelGenders);
        var promiceDeleteLanguages = deleteEmployeeTableData(queries.DelLanguages);

        $q.all([promiceDeleteEmployees

            
            , promiceDeleteExperiences

            
            , promiceDeleteBloodGroups

            
            , promiceDeleteGenders

            
            , promiceDeleteLanguages
        ]).then(function (res) {

            $scope.app = "Deleted All Tables...";
            appLogger.warn('Deleted All Tables...');
            //appSetupCreateTables()

        }, function (err) {


            appLogger.error('Appsetup installation failed');
        });

    }

    /***
      
      Create table functionality to create all the database tables 
       ***/
    function createEmployeeTable(query) {

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

    function insertEmployeeTableData(query) {

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

    function deleteEmployeeTableData(query) {

        var deferred = $q.defer();
        WebSqlDb(query, []).then(function (res) {

            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);

        });
        return deferred.promise;
    }

});