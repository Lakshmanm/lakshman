/*=======================================================================
 All rights reserved to  Thrill Innovative Labs.
 THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
 OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
 LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
 FITNESS FOR A PARTICULAR PURPOSE.
===========================================================================
****************************************************************************
 Name		    	 : address.Controller.js
 Type		    	 : Javascript and JQuery 
 Description		 : This file contains controller methods
 References		     :
 Author	    		 : 
 Created Date        : 
****************************************************************************
MODIFICATION LOG
**************************************************************************** 
Ver	Date	     Modified By			Description

****************************************************************************  
Code Review LOG
**************************************************************************** 
**************************************************************************** 
S.No      Ver        Date                Code Review By            Observations

****************************************************************************
*/
var app = angular.module('Aarush.StudentEnrollmentAddress', ['ThrillLocation.addressLogic', 'ngCordova'

        , 'ThrillFrameworkLibrary.geo'

        , 'ThrillFrameworkLibrary.Network'

        , 'ThrillCnnWebClient.appConfig'

        , 'ThrillFrameworkLibrary.appLogger', 'ThrillLocation.addressListLogic'
    ])
    /*Setup address Controller */
app.controller('Aarush.StudentEnrollmentAddress', function ($scope, $http, addressLogic, $state, $stateParams, $localStorage, appConfig, appLogger, addressListLogic, SweetAlert) {
    var personReferenceKey;
    personReferenceKey = $localStorage.EnrpersonKey;
    var addressReferenceKey = $stateParams.addressReferenceKey;
    //  var referenceKey = generateUUID();
    getLabels(appConfig.CULTURE_NAME);
    getMessages(appConfig.CULTURE_NAME);
    $localStorage.userKey = "3il_User_Key";
    $localStorage.appKey = "3il_App_Key";
    $scope.addressInfo = {};
    $scope.save = true;
    $scope.update = false;
    /*get labels with selected language*/
    function getLabels(cultureName) {
        var currentFileName = "Address";
        $http.get("Location/Languages/" + currentFileName + "." + cultureName + ".json").then(function (response) {
            bindLabels(response.data);
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
            Country: data.labels.Country
            , District: data.labels.District
            , State: data.labels.State
            , Mandal: data.labels.Mandal
            , Village: data.labels.Village
            , City: data.labels.City
            , LocationName: data.labels.Location
            , Submit: data.labels.Submit
            , AddressTitle: data.labels.AddressInfo
            , EntityDetails: data.labels.EntityDetails
            , StreetDetails: data.labels.StreetDetails
            , Pincode: data.labels.Pincode
        };
        $scope.addressInfoLables = lables;
    }
    /*Perform the CRUD (Create, Read, Update & Delete) operations of address*/
    /*Method for calling address  adding method*/
    $scope.addAddress = function () {
        // $scope.addressInfo.entityReferenceKey="47a58f10-313c-11e6-8b2c-194bbecf75c7";
        if ($scope.addressInfo.addressKey != undefined && $scope.addressInfo.addressKey != null) {
            delete $scope.addressInfo.addressKey;
            $scope.addressInfo.longitude = "67.6212";
            $scope.addressInfo.latitude = "54.2123";
            $scope.addressInfo.lastUpdatedUserKey = $localStorage.userKey;
            $scope.addressInfo.lastUpdatedAppKey = $localStorage.appKey;
            $scope.addressInfo.lastUpdatedDateTime = new Date();
            addressLogic.updateAddress($scope.addressInfo, addressReferenceKey).then(function (response) {
               // alert("update");
               // appLogger.alert($scope.alertMessageLabels.addressUpdated);
                $state.go('addressList');
            }, function (err) {
                console.error('ERR', err);
            });
        }
        else {
            if (appConfig.APP_MODE == 'offline') {
                $scope.addressInfo.addressKey = referenceKey;
            }
            $scope.addressInfo.createdUserKey = $localStorage.userKey;
            $scope.addressInfo.createdAppKey = $localStorage.appKey;
            $scope.addressInfo.createdDateTime = new Date();
            $scope.addressInfo.PersonReferenceKey = personReferenceKey;
            addressLogic.addAddress($scope.addressInfo).then(function (response) {
                $scope.addressInfo.countryId = 4;
                $scope.addressInfo.stateId = 1;
                $scope.addressInfo.districtId = 3;
                states($scope.addressInfo.countryId)
                districts($scope.addressInfo.stateId)
                mandals($scope.addressInfo.districtId);
                $scope.AddressForm.$setPristine();
                $scope.AddressForm.$setUntouched();
                SweetAlert.swal({
                    title: "Address"
                    , text: "Saved successfully"
                    , type: "success"
                    , confirmButtonColor: "#007AFF"
                });
                //  $state.go('addressList');
                $scope.addressInfo = "";
                addressList();
            }, function (err) {
                console.error('ERR', err);
            });
        }
    };
    /*Method for calling Countries*/
    var countries = function () {
        addressLogic.getCountries().then(function (response) {
            $scope.countryList = response;
        }, function (err) {
            console.error('ERR', err);
        });
    };
    /*Method for calling States*/
    var states = function (countryID) {
        addressLogic.getStates(countryID).then(function (response) {
            $scope.stateList = response;
        }, function (err) {
            console.error('ERR', err);
        });
    };
    /*Method for calling Districts*/
    var districts = function (stateID) {
        addressLogic.getDistricts(stateID).then(function (response) {
            $scope.districtList = response;
        }, function (err) {
            console.error('ERR', err);
        });
    };
    /*Method for calling Mandals*/
    var mandals = function (districtID) {
        addressLogic.getMandals(districtID).then(function (response) {
            $scope.mandalList = response;
        }, function (err) {
            console.error('ERR', err);
        });
    };
    /*Method for calling Villages*/
    var villages = function (mandalID) {
        addressLogic.getVillages(mandalID).then(function (response) {
            $scope.villageList = response;
        }, function (err) {
            console.error('ERR', err);
        });
    };
    /*    Method for calling Cities*/
    var cities = function (stateID) {
        addressLogic.getCities(stateID).then(function (response) {
            $scope.citiesList = response;
        }, function (err) {
            console.error('ERR', err);
        });
    };
    //initialization
    $scope.addressInfo.countryId = 4;
    $scope.addressInfo.stateId = 1;
    $scope.addressInfo.districtId = 3;
    states($scope.addressInfo.countryId)
    districts($scope.addressInfo.stateId)
    mandals($scope.addressInfo.districtId);
    $scope.getStates = function (countryID) {
        states(countryID);
    };
    $scope.getDistricts = function (stateID) {
        districts(stateID);
    };
    $scope.getMandals = function (districtID) {
        mandals(districtID);
    };
    $scope.getVillages = function (mandalID) {
        villages(mandalID);
    };
    $scope.getCities = function (stateID) {
        cities(stateID);
    };
    countries();
    /*Method for calling Bl retrieving method of address deatails*/
    // if (addressReferenceKey) {
    //     addressLogic.getAddressInfoById(addressReferenceKey).then(function (response) {
    //         states(response[0].countryId);
    //         districts(response[0].stateId);
    //         mandals(response[0].districtId);
    //         villages(response[0].mandalId);
    //         cities(response[0].stateId);
    //         $scope.addressInfo = response[0];
    //         $scope.addressInfo.pincode = parseInt(response[0].pincode);
    //           $scope.addressInfo.referenceKey = response[0].referenceKey;
    //           $scope.addressInfo.countryId = response[0].countryId;
    //           $scope.addressInfo.stateId = response[0].stateId;
    //           $scope.addressInfo.districtId = response[0].districtId;
    //           $scope.addressInfo.mandalId = response[0].mandalId;
    //           $scope.addressInfo.villageId = response[0].villageId;
    //           $scope.addressInfo.geoLocation = response[0].geoLocation;
    //           $scope.addressInfo.latitude = response[0].latitude;
    //           $scope.addressInfo.longitude = response[0].longitude,
    //           $scope.addressInfo.pincode = response[0].pincode;
    //     }, function (err) {
    //         console.error('ERR', err);
    //     });
    // }
    //  initialize();
    //  google.maps.event.addDomListener(window, 'load', initialize);
    // function initialize() {
    //     var autocomplete = new google.maps.places.Autocomplete(document.getElementById('txtAutocomplete2'));
    //     google.maps.event.addListener(autocomplete, 'place_changed', function () {
    //         $scope.addressInfo.geoLocation = document.getElementById('txtAutocomplete2').value;
    //         $scope.$apply();
    //         // Get the place details from the autocomplete object.
    //         var place = autocomplete.getPlace();
    //         /* appLogger.log(place.formatted_address);
    //          appLogger.log(place.geometry.address.lat());
    //          appLogger.log(place.geometry.address.lng());*/
    //         $scope.addressInfo.geoLocation = place.formatted_address;
    //         $scope.addressInfo.latitude = place.geometry.address.lat();
    //         $scope.addressInfo.longitude = place.geometry.address.lng();
    //         $scope.$apply();
    //     });
    // }
    $scope.editAddress = function (addressKey) {
        $scope.save = false;
        $scope.update = true;
        addressLogic.getAddressInfoById(addressKey).then(function (response) {
            console.log(response);
            if (response[0].countryId != null) {
                states(response[0].countryId);
                districts(response[0].stateId);
                mandals(response[0].districtId);
                villages(response[0].mandalId);
                cities(response[0].stateId);
                $scope.addressInfo = {};
                $scope.addressInfo.referenceKey = response[0].referenceKey;
                $scope.addressInfo.countryId = response[0].countryId;
                $scope.addressInfo.stateId = response[0].stateId;
                $scope.addressInfo.cityId = response[0].cityId;
                $scope.addressInfo.districtId = response[0].districtId;
                $scope.addressInfo.mandalId = response[0].mandalId;
                $scope.addressInfo.villageId = response[0].villageId;
            }
            else {
                $scope.addressInfo.countryId = 4;
                $scope.addressInfo.stateId = 1;
                $scope.addressInfo.districtId = 3;
                states($scope.addressInfo.countryId)
                districts($scope.addressInfo.stateId)
            }
            $scope.addressInfo.geoLocation = response[0].geoLocation;
            $scope.addressInfo.latitude = response[0].latitude;
            $scope.addressInfo.longitude = response[0].longitude
                , $scope.addressInfo.addressKey = response[0].addressKey;
            $scope.addressInfo.entityDetails = response[0].entityDetails;
            $scope.addressInfo.streetDetails = response[0].streetDetails;
            $scope.addressInfo.Pincode = response[0].pincode;
        }, function (err) {
            appLogger.error('ERR', err);
        });
    }
    $scope.updateAddress = function () {
        addressLogic.updateAddress($scope.addressInfo, $scope.addressInfo.addressKey).then(function (response) {
            console.log(JSON.stringify(response));
            SweetAlert.swal({
                title: "Address"
                , text: "Updated successfully"
                , type: "success"
                , confirmButtonColor: "#007AFF"
            });
            $scope.addressInfo = {};
            addressList();
            $scope.save = true;
            $scope.update = false;
        }, function (err) {
            appLogger.error('ERR', err);
        });
    };
    var addressList = function () {
        $scope.addressDetails = [];
        addressListLogic.getAddressBypersonrefKey(personReferenceKey).then(function (response) {
            console.log(JSON.stringify(response));
            $scope.addressDetails = response;
        }, function (err) {
            console.error('ERR', err);
        });
    };
    $scope.removeAddress = function (addressReferenceKey) {
        SweetAlert.swal({
            title: "Are you sure?"
            , text: "You want to Delete?"
            , type: "warning"
            , showCancelButton: true
            , confirmButtonColor: "#DD6B55"
            , confirmButtonText: "Yes, delete it!"
            , cancelButtonText: "No, cancel!"
            , closeOnConfirm: false
            , closeOnCancel: false
        }, function (isConfirm) {
            if (isConfirm) {
                addressListLogic.removeAddress(addressReferenceKey).then(function (response) {
                    addressList();
                    SweetAlert.swal({
                        title: "Address"
                        , text: "Deleted successfully"
                        , type: "success"
                        , confirmButtonColor: "#007AFF"
                    });
                });
            }
            else {
                SweetAlert.swal({
                    title: "Cancelled"
                    , text: "Address is safe :)"
                    , type: "error"
                    , confirmButtonColor: "#007AFF"
                });
            }
        });
    };
    addressList();
});