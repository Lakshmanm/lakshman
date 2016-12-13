/*===========================================================================
 All rights reserved to  Thrill Innovative Labs.
 THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
 OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
 LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
 FITNESS FOR A PARTICULAR PURPOSE.
============================================================================
****************************************************************************
 Name            : FirstTimeSetup.Web.js
 Type            : Javascript and JQuery 
 Description     :
 References      :
 Author          :  Satya kalyani Lanka
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


var app = angular.module('ThrillLocation.webSetup'
                        , ['ngCordova'
                        , 'ngStorage'
                        , 'ThrillLocation.setupQueries'
                        , 'ThrillLocation.config'
                        , 'ThrillFrameworkLibrary.appLogger'])


//Set Up Location Controller 
app.controller('AppSetupWebCtrl'
               , function ($scope
                          , $location
                          , queries
                          , $q
                          , $localStorage
                          , $rootScope
                          , locationconfig
                          , appLogger) {
    appLogger.log('AppSetupWebCtrl');
    $scope.app = "loading...";

    function WebSqlDb(query, params) {
        //initiate asynchronous call use &q.defer
        var deferred = $q.defer();
        //Create Database instance
        //Open TestdB DataBase 
        var db = openDatabase(locationconfig.OFFLINE_DBNAME, '1.0', '', 20 * 1024 * 1024);

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
    
    //appLogger.alert($localStorage.INITIAL_SETUP_CHECK);
    
    if (IS_LOCAL_DB_EXISTS == "" || IS_LOCAL_DB_EXISTS == undefined || IS_LOCAL_DB_EXISTS == 0) {
        $scope.app = "First Time Setup Initializing...";
        appLogger.log("First Time Setup Initializing...");
        appSetupCreateTables();
    } else {
        $scope.app = "DB Exists...";
        appLogger.warn('DB Exists...');
        appLogger.log("DB Exists...");
        $location.path('/location'); // Route to the desired path if IS_LOCAL_BD_EXISTS value exists
    }


    /***
      Create Database Tables if any error in promises detected appSetupDeleteTables 
      function is executed to rollback the setup
      ***/

    function appSetupCreateTables() {

        var promiseCreateLocation = createLocationTable(queries.Location);
        var promiseCreateAddress = createAddressTable(queries.Address);
        var promiseCreateCountries = createLocationTable(queries.Countries);
        var promiseCreateStates = createLocationTable(queries.States);
        var promiseCreateDistricts = createLocationTable(queries.Districts);
        var promiseCreateMandals = createLocationTable(queries.Mandals);
        var promiseCreateVillages = createLocationTable(queries.Villages);
        var promiseCreateCities = createLocationTable(queries.Cities);

        $q.all([promiseCreateLocation
                , promiseCreateCountries
                , promiseCreateStates
                , promiseCreateDistricts
                , promiseCreateMandals
                , promiseCreateVillages
                , promiseCreateCities
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

        var promiseInsertCountries = insertLocationTableData(queries.InsertCounties);
        var promiseInsertStates = insertLocationTableData(queries.InsertStates);
        var promiseInsertDistricts = insertLocationTableData(queries.InsertDistricts);
        var promiseInsertMandals = insertLocationTableData(queries.InsertMandals);
        var promiseInsertVillages = insertLocationTableData(queries.InsertVillages);
        var promiseInsertCities = insertLocationTableData(queries.InsertCities);

        $q.all([promiseInsertCountries
                , promiseInsertStates
                , promiseInsertDistricts
                , promiseInsertMandals
                , promiseInsertVillages
                , promiseInsertCities
        ]).then(function (res) {

            $scope.app = "First Time Setup Done...";
            $localStorage.INITIAL_SETUP_CHECK = 1;
            $location.path('/location');

        }, function (err) {

            $scope.app = "Error Creating Database...";
            appSetupDeleteTables()

        });

    }

    /***
      Roll back functionality to deleted the initialized database tables
       ***/

    function appSetupDeleteTables() {

        var promiseDeleteLocations = deleteLocationTableData(queries.DeleteLocation);
        var promiseDeleteAddresses = deleteAddressTableData(queries.DeleteAddress);
        var promiseDeleteCountries = deleteLocationTableData(queries.DeleteCountries);
        var promiseDeleteStates = deleteLocationTableData(queries.DeleteStates);
        var promiseDeleteDistricts = deleteLocationTableData(queries.DeleteDistricts);
        var promiseDeleteMandals = deleteLocationTableData(queries.DeleteMandals);
        var promiseDeleteVillages = deleteLocationTableData(queries.DeleteVillages);
        var promiseDeleteCities = deleteLocationTableData(queries.DeleteCities);

        $q.all([promiseDeleteLocations
                , promiseDeleteCountries
                , promiseDeleteStates
                , promiseDeleteDistricts
                , promiseDeleteMandals
                , promiseDeleteVillages
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
    function createLocationTable(query) {

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

    function insertLocationTableData(query) {

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

    function deleteLocationTableData(query) {

        var deferred = $q.defer();
        WebSqlDb(query, []).then(function (res) {

            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);

        });
        return deferred.promise;
    }
    
    /***
      
      Create table functionality to create all the database tables 
       ***/
    function createAddressTable(query) {

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

    function insertAddressTableData(query) {

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

    function deleteAddressTableData(query) {

        var deferred = $q.defer();
        WebSqlDb(query, []).then(function (res) {

            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);

        });
        return deferred.promise;
    }


});