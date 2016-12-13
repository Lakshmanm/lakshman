/*===========================================================================
 All rights reserved to Thrill Innovative Labs.
 THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
 OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
 LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
 FITNESS FOR A PARTICULAR PURPOSE.
============================================================================
****************************************************************************
 Name               : FirstTimeSetUp.js
 Type               : Javascript and JQuery 
 Description        :
 References         :
 Author             :  Kalyani
Created Date        :  12-04-2016
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
/* create the databasequeries module 
  also include Dependency Modules

*/


var app = angular.module('ThrillOrganization.setup', ['ngCordova', 'ngStorage', 'ThrillOrganization.setupQueries', 'ThrillOrganization.config', 'ThrillFrameworkLibrary.appLogger'])

//First time Set up Controller
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
            // $state.go('app.OrgList');  // Route to the desired path if IS_LOCAL_BD_EXISTS value exists
        }
    }

    /***
     Create Database Tables if any error in promises detected appSetupDeleteTables 
     function is executed to rollback the setup
     ***/

    function appSetupCreateTables() {

       var promiceCreateOrganizations = createOrganizationTable(queries.Organizations);
        var promiceCreateOrganizationLevels = createOrganizationTable(queries.OrganizationLevels)
       

        $q.all([promiceCreateOrganizations,
        promiceCreateOrganizationLevels
       
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

        var promiceInsertOrganizationLevels = insertOrganizationTableData(queries.INOrganizationLevels);

        $q.all([promiceInsertOrganizationLevels
       
        ]).then(function (res) {

            $scope.app = "First Time Setup Done...";
            $localStorage.INITIAL_SETUP_CHECK = 1;
            //$state.go('app.OrgList');     // Route to the desired path after First time setup

        }, function (err) {
            appLogger.error(err);
            $scope.app = "Error Creating Database...";
            appSetupDeleteTables()

        });

    }

    /***
      Roll back functionality to deleted the initialized database tables
       ***/

    function appSetupDeleteTables() {

       var promiceDeleteOrganizations = deleteOrganizationTableData(queries.DelOrganizations);
        var promiceDeleteOrganizationLevels = deleteOrganizationTableData(queries.DelOrganizationLevels);
       

        $q.all([promiceDeleteOrganizations,
        promiceDeleteOrganizationLevels
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

    function createOrganizationTable(query) {

        var deferred = $q.defer();
        $cordovaSQLite.execute(db, query, []).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    }

    /***
     
     Insert data to created database tables 
      ***/
    function insertOrganizationTableData(query) {

        var deferred = $q.defer();
        $cordovaSQLite.execute(db, query, []).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    }

    /***
     
     Delete database tables in rollback functionality
      ***/

    function deleteOrganizationTableData(query) {

        var deferred = $q.defer();
        $cordovaSQLite.execute(db, query, []).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    }

});