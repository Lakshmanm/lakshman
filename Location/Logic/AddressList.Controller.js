/*=======================================================================
 All rights reserved to  Thrill Innovative Labs.
 THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
 OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
 LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
 FITNESS FOR A PARTICULAR PURPOSE.
===========================================================================
****************************************************************************
 Name                : addressList.Controller.js
 Type                : Javascript and JQuery 
 Description         : This file contains controller methods
 References          :
 Author	    		 : 
 Created Date        :
****************************************************************************
MODIFICATION LOG
**************************************************************************** 
Ver Date          Modified By           Description

****************************************************************************  
Code Review LOG
**************************************************************************** 
S.No      Ver        Date                Code Review By            Observations

****************************************************************************
*/

var app = angular.module('ThrillLocation.addressList', ['ThrillLocation.addressListLogic', 'ngCordova', 'ThrillFrameworkLibrary.geo', 'ThrillFrameworkLibrary.Network', 'ThrillCnnWebClient.appConfig', 'ThrillFrameworkLibrary.appLogger'])
    /*Setup location Controller */
    .controller('AddressListController', function ($scope, $http, addressListLogic, $state, $stateParams, appConfig, appLogger) {


        $scope.$on('$ionicView.enter', function () {

            var addressReferenceKey = $stateParams.addressReferenceKey;
            getLabels(appConfig.CULTURE_NAME);
            getMessages(appConfig.CULTURE_NAME);

            /*get labels with selected language*/
            function getLabels(cultureName) {

                var currentFileName = "AddressList";
                $http.get("Location/Languages/" + currentFileName + "." + cultureName + ".json").then(function (response) {

                    bindLabels(response.data);

                }, function (err) {

                    console.error(err);
                });
            }

            function getMessages(cultureName) {
                var alertMessageName = "AlertMessages";

                $http.get("Location/Languages/" + alertMessageName + "." + cultureName + ".json").then(function (response) {
                    $scope.alertMessageLabels = response.data.messages;
                });
            }

            /*bind labels with selected language */
            function bindLabels(data) {
                var lables = {

                    AddressList: data.labels.AddressList
                    , District: data.labels.District
                    , Country: data.labels.Country
                    , Location: data.labels.Location
                    , Delete: data.labels.Delete
                    , Edit: data.labels.Edit
                    , EntityDetails: data.labels.EntityDetails
                    , StreetDetails: data.labels.StreetDetails
                    , Pincode: data.labels.Pincode

                };

                $scope.lables = lables;


            }

            /*retriving all the location details*/
            var addressList = function () {
                $scope.addressDetails = [];
                addressListLogic.getAddressInfoDetails().then(function (response) {

                    $scope.addressDetails = response;
                }, function (err) {

                    console.error('ERR', err);

                });
            };

            /*removing location details based on locationID*/

            $scope.removeAddress = function (addressReferenceKey) {
                addressListLogic.removeAddress(addressReferenceKey).then(function (response) {
                    appLogger.alert($scope.alertMessageLabels.addressDeleted);
                    addressList();
                }, function (err) {

                    console.error('ERR', err);
                });

            };
            addressList();

        });

    });