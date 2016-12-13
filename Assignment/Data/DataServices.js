/*=======================================================================
 All rights reserved to Nunet Cube Software Solutions.
 THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
 OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
 LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
 FITNESS FOR A PARTICULAR PURPOSE.
===========================================================================
****************************************************************************
 Name		    	 : DataServices
 Type		    	 : Javascript and JQuery 
 Description		 : This file contains common methods for database operation
                       and API calls
 References		     :
 Author	    		 : Rajaji
 Created Date        : 31-Mar-2016
****************************************************************************
MODIFICATION LOG
**************************************************************************** 
Ver	Date	     Modified By			Description
****************************************************************************  
Code Review LOG
**************************************************************************** 
Ver        Date                Code Review By            Observations
****************************************************************************
*/

var app = angular.module('n3FrameworkLibrary.DataService', ['n3FrameworkLibrary.appConfig'])
    //Checking Platforms(Mobile or web) 
var responseObj = [];
/* Create Global Url to use api service */
var staticUrl = 'Localhost:2425';

app.factory('dataService', function ($cordovaSQLite, $q, $http, commonService, appConfig) {

    var responseObj = []; //Create Responce Object Instance    
    return {
        /*insert data method adding data */

        insert: function (JSONObject, className, dbName, APIName) {

            if ((appConfig.APP_TYPE == "mobile") && (appConfig.APP_MODE == "offline")) {
                db = $cordovaSQLite.openDB(dbName);
                return $cordovaSQLite.execute(db, getInsertQuery(JSONObject, className, 'sqlite'), getParamValues(JSONObject, 'sqlite')).then(function (res) {

                    responseObj = res;
                    return responseObj;

                })

            } else if ((appConfig.APP_TYPE == "web") && (appConfig.APP_MODE == "offline")) {
                return commonService.executeWebSql(dbName, getInsertQuery(JSONObject, className, 'websql'), getParamValues(JSONObject, 'websql'));

            } else if ((appConfig.APP_MODE == "online")) {
                return $http.post(APIName, JSON.stringify(JSONObject)).then(function (response) {
                    responseObj = response;
                    return responseObj;
                });
            }

        },
        /*update data method updating data*/
        update: function (JSONObject, whereCondition, className, dbName, APIName) {
            if ((appConfig.APP_TYPE == "mobile") && (appConfig.APP_MODE == "offline")) {
                db = $cordovaSQLite.openDB(dbName);
                return $cordovaSQLite.execute(db, getUpdateQuery(JSONObject, className, 'sqlite', whereCondition), getParamValues(JSONObject, 'sqlite')).then(function (res) {

                    responseObj = res;
                    return responseObj;

                })

            } else if ((appConfig.APP_TYPE == "web") && (appConfig.APP_MODE == "offline")) {

                return commonService.executeWebSql(dbName, getUpdateQuery(JSONObject, className, 'websql', whereCondition), getParamValues(JSONObject, 'websql'));


            } else if ((appConfig.APP_MODE == "online")) {


                return $http.put(APIName, JSON.stringify(JSONObject)).then(function (response) {

                    responseObj = response;
                    return responseObj;
                });
            }

        },
        /*delete data method deleting data*/
        delete: function (whereCondition, className, dbName, APIName) {
            /*Create Database instance */

            if ((appConfig.APP_TYPE == "mobile") && (appConfig.APP_MODE == "offline")) {
                db = $cordovaSQLite.openDB(dbName);
                /*Prepare Query for Create table */

                return $cordovaSQLite.execute(db, getDeleteQuery(className, 'sqlite', whereCondition), []).then(function (res) {
                    responseObj = res;
                    return responseObj;

                })

            } else if ((appConfig.APP_TYPE == "web") && (appConfig.APP_MODE == "offline")) {

                return commonService.executeWebSql(dbName, getDeleteQuery(className, 'websql', whereCondition), []);


            } else if ((appConfig.APP_MODE == "online")) {
                //console.log(staticUrl + APIName);
                return $http.delete(APIName, []).then(function (response) {
                    responseObj = response;
                    //console.log(responseObj);
                    return responseObj;
                });
            }

        },
        /*Get data method retrieving data offline*/
        executeQuery: function (query, dbName) {
            /*Create Database instance */
            //console.log('executeQuery');
            if ((appConfig.APP_TYPE == "mobile") && (appConfig.APP_MODE == "offline")) {
                db = $cordovaSQLite.openDB(dbName);
                /*Prepare Query for Create table */
                //console.log('DB Query' + query);
                return $cordovaSQLite.execute(db, query, []).then(function (res) {

                    responseObj = res;
                    return responseObj;

                })

            } else if ((appConfig.APP_TYPE == "web") && (appConfig.APP_MODE == "offline")) {

                return commonService.executeWebSql(dbName, query, []);

            }

        },
        /*Get data method retrieving data offline*/
        callAPI: function (APIName, JSONObject, methodType) {
            //console.log(staticUrl + APIName);
            return $http.get(APIName, JSONObject).then(function (response) {
                responseObj = response;
                return responseObj;
            });

        }

    }
});
/*Common method for creating database in offline*/
app.factory('commonService', function ($cordovaSQLite, $q, $http) {

    var responseObj = []; //Create Responce Object Instance    
    return {


        executeWebSql: function (dbName, query, params) {

            var deferred = $q.defer();

            /*Create Database instance */

            var db = openDatabase(dbName, '1.0', dbName, 20 * 1024 * 1024);
            /* Prepare Query for Create tables */

            db.transaction(function (tx) {

                tx.executeSql(query, params, function (tx, results) {

                    deferred.resolve(results);
                    /* asynchronous process with result this callback will be called asynchronously when the response is available */
                }, function (tx, e) {
                    //console.log(e);
                    deferred.reject();
                    /*asynchronous process with error called asynchronously if an error occurs or data base returns response with an error status. */
                });
            });
            /* return results (or exceptions) when they are done processing */
            return deferred.promise;

        }


    }
});
/*Method for preparing the insert query*/
function getInsertQuery(jsonData, tableName, dbType) {
    var columns = "";
    var values = "";
    var query = "";
    for (key in jsonData) {
        columns += key + ',';
        if (dbType == 'sqlite' || dbType == 'websql') {
            values += '?,';
        } else {

            if (isNaN(jsonData[key]) == true) {

                values += "" + jsonData[key] + "" + ',';
            } else {
                values += jsonData[key] + ',';
            }
        }
    }

    query = "insert into " + tableName + " (" + columns.substring(0, columns.length - 1) + ") values(" + values.slice(0, -1) + ")";

    return query;
}
/*Method for preparing the update query*/
function getUpdateQuery(jsonData, tableName, dbType, whereCondition) {

    var columns = "";
    var values = "";
    var query = "";
    console.log("web sql update " + JSON.stringify(jsonData));
    for (key in jsonData) {
        columns += key + ',';
        if (dbType == 'sqlite' || dbType == 'websql') {
            values += key + '=' + '?,';
        } else {

            if (isNaN(jsonData[key]) == true) {
                values += key + '=' + "" + jsonData[key] + "" + ',';
            } else {
                values += key + '=' + jsonData[key] + ',';
            }
        }

        if (key != 'DOB' && key != 'EndDate' && key != 'StartDate') {

        } //
    }

    query = "update " + tableName + " set " + values.slice(0, -1) + ((whereCondition == '') ? '' : ' WHERE  ' + whereCondition);

    return query;
}
/*Method for preparing the delete query*/
function getDeleteQuery(tableName, dbType, whereCondition) {

    var query = "";

    query = "DELETE FROM " + tableName + ((whereCondition == '') ? '' : ' WHERE  ' + whereCondition);

    return query;
}
/*Method for preparing the parameters array from input JSON object*/
function getParamValues(jsonData, dbType) {

    var columns = "";
    var values = "";
    var query = "";
    var params = [];

    for (key in jsonData) {


        if (isNaN(jsonData[key]) == true) {
            params.push("" + jsonData[key] + "");
            //values += "'" + jsonData[key] + "'" + ',';
        } else {
            params.push(jsonData[key]);
        }

    }

    return params;
}