/*//=============================================================================
// All rights reserved to Thrill Innovative Labs.
// THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
// OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
// LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
// FITNESS FOR A PARTICULAR PURPOSE.
//=============================================================================
//*****************************************************************************
//* Name		    	: StudentLeaveRequest.Controller.js 
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

var app = angular.module('Mcampuz.ProfileSettingsController', ['Mcampuz.profilesettngLogic'])
    /*Setup studentLeaveRequest Controller */
app.controller('ProfileSettingsController', function($scope,
    $http,
    $state,
    $stateParams,
    $q,
    profilesettngLogic,
    $localStorage,
    SweetAlert,
    appLogger) {
    var Institutekey;
    $scope.settings = {};
    $scope.getRegions = function() {

        profilesettngLogic.getAllRegions().then(function(response) {
            //console.log(JSON.stringify(response));
            $scope.regionCollection = response;
        });
    }
    $scope.getRegions();

    $scope.gettimeZones = function() {

        profilesettngLogic.getAlltimeZones().then(function(response) {
            //console.log(JSON.stringify(response));
            $scope.timeZonesCollection = response;
        });
    }
    $scope.gettimeZones();

    $scope.gettimeFormats = function() {

        profilesettngLogic.getAlltimeFormats().then(function(response) {
            //console.log(JSON.stringify(response));
            $scope.timeFormatsCollection = response;
        });
    }
    $scope.gettimeFormats();

    $scope.getdateFormats = function() {

        profilesettngLogic.getAlldateFormats().then(function(response) {
            // console.log(JSON.stringify(response));
            $scope.dateFormatsCollection = response;
        });
    }
    $scope.getdateFormats();
/*get all languages*/
    $scope.getlanguages = function() {

        profilesettngLogic.getAlllanguages().then(function(response) {
            //console.log(JSON.stringify(response));
            //$scope.languagesCollection = response;
var newarray=[];
             angular.forEach(response,function(resp)
            {
                //alert(JSON.stringify(resp));
                if(resp.LanguageID==19)
                {

           newarray.push(resp);
                    $scope.languagesCollection=newarray;
                 
                    //$scope.getclassTable($scope.entityBatch.InstituteKey.InstituteKey,$scope.entityBatch.InstituteKey.ParentOrganizationKey); 


                }
            })

        });
    }
    $scope.getlanguages();

    $scope.getheights = function() {

        profilesettngLogic.getAllheights().then(function(response) {
            //console.log(JSON.stringify(response));
            $scope.heightsCollection = response;
        });
    }
    $scope.getheights();
    $scope.getweights = function() {

        profilesettngLogic.getAllweights().then(function(response) {
            // console.log(JSON.stringify(response));
            $scope.weightsCollection = response;
        });
    }
    $scope.getweights();
    $scope.gettemperatures = function() {

        profilesettngLogic.getAlltemperatures().then(function(response) {
            //console.log(JSON.stringify(response));
            $scope.temperaturesCollection = response;
        });
    }
    $scope.gettemperatures();

    $scope.getcurrencies = function() {

        profilesettngLogic.getAllcurrencies().then(function(response) {
            //console.log(JSON.stringify(response));
            $scope.currenciesCollection = response;
        });
    }
    $scope.getcurrencies();

    $scope.saveSettings = function() {
        $scope.settings.personKey=$localStorage.ReferenceKey;

        profilesettngLogic.addProfileSetting($scope.settings).then(function(response) {
            SweetAlert.swal({
                title: "Profile Settings",
                text: "Saved Successfully",
                type: "success",
                confirmButtonColor: "#007AFF"
            });
            pageLoad();
        });
    }
/*Update progile Settings*/
    $scope.updateSettings = function() {

        profilesettngLogic.updateProfileSettingt($scope.settings, $scope.settings.ProfileSettingKey).then(function(response) {
            SweetAlert.swal({
                title: "Profile Settings",
                text: "Updated Successfully",
                type: "success",
                confirmButtonColor: "#007AFF"
            });
            pageLoad();
        });
    }
    if ($localStorage.loggedInUserID != null || $localStorage.loggedInUserID != undefined) {
        pageLoad();

    }



    function pageLoad() {
        profilesettngLogic.getAllProfileSettings($localStorage.loggedInUserID).then(function(response) {
            if (response.length != undefined) {
                $scope.shoUpdate = true;
                $scope.shoSave = false;
                $scope.settings.RegionKey = response[0].RegionKey;
                $scope.settings.TimeZoneKey = response[0].TimeZoneKey;
                $scope.settings.TimeFormatKey = response[0].TimeFormatKey;
                $scope.settings.DateFormatKey = response[0].DateFormatKey;
                $scope.settings.LanguageID = response[0].LanguageID;
                $scope.settings.HeightKey = response[0].HeightKey;
                $scope.settings.WeightKey = response[0].WeightKey;
                $scope.settings.TemperatureKey = response[0].TemperatureKey;
                $scope.settings.CurrencyKey = response[0].CurrencyKey;
                $scope.settings.ProfileSettingKey = response[0].ProfileSettingKey;
                $localStorage.RegionTitle = response[0].RegionTitle;
                $localStorage.TimeZoneTitle = response[0].TimeZoneTitle;
                $localStorage.TimeFormatTitle = response[0].TimeFormatTitle;
                $localStorage.DateFormatTitle = response[0].DateFormatTitle;
                $localStorage.LanguageName = response[0].LanguageName;
                $localStorage.HeightTitle = response[0].HeightTitle;
                $localStorage.WeightTitle = response[0].WeightTitle;
                $localStorage.TemperatureTitle = response[0].TemperatureTitle;
                $localStorage.CurrencyKey = response[0].CurrencyTitle;
                $localStorage.ProfileSettingKey = response[0].ProfileSettingKey;
                
                console.log(response[0]);
            } else {
                $scope.shoUpdate = false;
                $scope.shoSave = true;
            }
        });
    }

}); // End of App Controller