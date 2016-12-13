/*===========================================================================
 All rights reserved to  Thrill Innovative Labs.
 THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
 OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
 LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
 FITNESS FOR A PARTICULAR PURPOSE.
============================================================================
****************************************************************************
 Name         :  FirstTimeSetup.Mobile.js
 Type         : Javascript and JQuery 
 Description  :
 References   :
 Author       :  Satya Kalyani Lanka
 Created Date :  07-Apr-2016
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


var app = angular.module('ThrillLocation.setup'
                            , ['ngCordova'
                            , 'ngStorage'
                            , 'ThrillLocation.setupQueries'
                            , 'ThrillLocation.config'
                            , 'ThrillFrameworkLibrary.appLogger'])

//First time Set up Controller
app.controller('AppSetupMobCtrl'
               , function ($scope
                        , $location
                        , queries
                        , $q
                        , $localStorage
                        , $rootScope
                        , $state
                        , locationconfig
                        , $cordovaSQLite
                        , appLogger) {

    $scope.app = "loading...";
    document.addEventListener('deviceready', onDeviceReady, false);

    console.log('mobile calling');
    
    function onDeviceReady() {

        //Databse initialization to a global variable db
console.log(locationconfig.OFFLINE_DBNAME);
         db = $cordovaSQLite.openDB(locationconfig.OFFLINE_DBNAME);

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
             $state.go('address');  // Route to the desired path if IS_LOCAL_BD_EXISTS value exists
        }
    }

    /***
     Create Database Tables if any error in promises detected appSetupDeleteTables 
     function is executed to rollback the setup
     ***/

    function appSetupCreateTables() {

        var promiseCreateLocations = createLocationTable(queries.Location);
        var promiseCreateAddress = createLocationTable(queries.Address);
        var promiseCreateCountries = createLocationTable(queries.Countries);
        var promiseCreateStates = createLocationTable(queries.States);
        var promiseCreateDistricts = createLocationTable(queries.Districts);
        var promiseCreateMandals = createLocationTable(queries.Mandals);
         var promiseCreateVillages = createLocationTable(queries.Villages);

        $q.all([promiseCreateLocations,
        promiseCreateCountries,
        promiseCreateStates,
        promiseCreateDistricts,
        promiseCreateMandals,
        promiseCreateVillages   
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

        $q.all([promiseInsertCountries,
        promiseInsertStates,
        promiseInsertDistricts,
        promiseInsertMandals,
        promiseInsertVillages
        ]).then(function (res) {

            $scope.app = "First Time Setup Done...";
            $localStorage.INITIAL_SETUP_CHECK = 1;
            //$state.go('app.Location');     // Route to the desired path after First time setup

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

        var promiseDeleteLocations = deleteLocationTableData(queries.DeleteLocation);
          var promiseDeleteAddresses = deleteLocationTableData(queries.DeleteAddress);
        var promiseDeleteCountries = deleteLocationTableData(queries.DeleteCountries);
        var promiseDeleteStates = deleteLocationTableData(queries.DeleteStates);
        var promiseDeleteDistricts = deleteLocationTableData(queries.DeleteDistricts);
        var promiseDeleteMandals = deleteLocationTableData(queries.DeleteMandals);
        var promiseDeleteVillages = deleteLocationTableData(queries.DeleteVillages);

        $q.all([promiseDeleteLocations,
        promiseDeleteCountries,
        promiseDeleteStates,
        promiseDeleteDistricts,
        promiseDeleteMandals,
        promiseDeleteVillages
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
    function insertLocationTableData(query) {

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

    function deleteLocationTableData(query) {

        var deferred = $q.defer();
        $cordovaSQLite.execute(db, query, []).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    }
    

});