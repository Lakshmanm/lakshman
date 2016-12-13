/*=======================================================================
 All rights reserved to Thrill Innovative Labs.
 THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
 OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
 LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
 FITNESS FOR A PARTICULAR PURPOSE.
===========================================================================
****************************************************************************
 Name		    	 : certificationController.js
 Type		    	 : Javascript and JQuery 
 Description		 : This file contains controller methods
 References		     :
 Author	    		 : Naveena Lingam
 Created Date        : 13-April-2016
****************************************************************************
MODIFICATION LOG
**************************************************************************** 
S.No  Ver     Date           Modified By              Description
1     1.0     12-04-2016     Satya kalyani Lanka       dependency structure changed
2     1.0     14-04-2016     Naveena                   currentFileName variable name is removed 
3.    1.0     14-04-2016     Kiranmai Labhala          Define date picker validations 
****************************************************************************  
Code Review LOG
**************************************************************************** 
S.No      Ver        Date                Code Review By            Observations
1         1.0       13-April-2016         Sri Venkatesh.T           Remove "var currentFileName = "Contact";" code which is not requried.
2         1.0       13-April-2016         Sri Venkatesh.T           Remove EditContactID if not required ,declared but never used.
****************************************************************************
*/

var app = angular.module('ThrillOrganization.Certification', ['ThrillOrganization.CertificationLogic',
    'ngCordova', 'ThrillFrameworkLibrary.geo', 'ThrillFrameworkLibrary.Network', 'ThrillCnnWebClient.appConfig', 'ThrillFrameworkLibrary.appLogger'
]);
/*Setup contact Controller */
app.controller('CertificationController', function($scope, $http, certificationLogic, $state, $stateParams, appConfig, appLogger, $localStorage) {

    $localStorage.userKey = "3il_User_Key";
    $localStorage.appKey = "3il_App_Key";

    var organizationReferenceKey = $stateParams.organizationReferencekey;
    var referenceKey = generateUUID();
    getLabels(appConfig.CULTURE_NAME);
    getMessages(appConfig.CULTURE_NAME);
    getCertificationTypes();
    getCertificationDetails(organizationReferenceKey);

    function getMessages(cultureName) {
        var alertMessageName = "AlertMessages";
        $http.get("Organization/Languages/" + alertMessageName + "." + cultureName + ".json").then(function(response) {
            $scope.alertMessageLabels = response.data.messages;
        });
    }
    /*get labels with selected language*/
    function getLabels(cultureName) {
        $scope.orgCertificationInfo = {};
        var currentFileName = "Certification";
        $http.get("Organization/Languages/" + currentFileName + "." + cultureName + ".json").then(function(response) {
            bindLabels(response.data);
        });
    }
    /*bind labels with selected language */
    function bindLabels(data) {
        var labels = {
            OrganizationCertification: data.labels.OrganizationCertification,
            CertificationName: data.labels.CertificationName,
            CertificationType: data.labels.CertificationType,
            ValidFrom: data.labels.ValidFrom,
            ValidTo: data.labels.ValidTo,
            Submit: data.labels.Submit,
            Edit: data.labels.Edit,
            Delete: data.labels.Delete
        };
        $scope.orgCertification = labels;
    }
    /*get certification types*/
    function getCertificationTypes() {
        certificationLogic.getCertificationTypes().then(function(response) {
            $scope.certLists = response;
        }, function(err) {
            console.error('ERR', err);
        });
    }

    /* getting certification list */
    function getCertificationDetails(organizationReferenceKey) {
        certificationLogic.getCertificationListDetails(organizationReferenceKey).then(function(response) {

            $scope.certifications = response;
            generateUUID();
        }, function(err) {
            console.error('ERR', err);
        });
    }

    /*Method for calling Bl adding method*/
    $scope.addCertification = function() {
        if ($scope.orgCertificationInfo.ReferenceKey != undefined && $scope.orgCertificationInfo.ReferenceKey != null) {
            updateCertification($scope.orgCertificationInfo.ReferenceKey)
        } else {
            addCertification();
        }
    };

    function addCertification() {
        if (appConfig.APP_MODE == 'offline') {
            $scope.orgCertificationInfo.ReferenceKey = referenceKey;
        }
        $scope.orgCertificationInfo.organizationReferenceKey = organizationReferenceKey
        $scope.orgCertificationInfo.isDeleted = 0;
        $scope.orgCertificationInfo.isActive = 1;
        $scope.orgCertificationInfo.createdUserKey = $localStorage.userKey;
        $scope.orgCertificationInfo.createdAppKey = $localStorage.appKey;
        $scope.orgCertificationInfo.createdDateTime = new Date();

        certificationLogic.addCertificationDetails($scope.orgCertificationInfo, organizationReferenceKey).then(function(response) {
            appLogger.alert($scope.alertMessageLabels.certificationSaved);
            $scope.orgCertificationInfo = "";
            $scope.orgCertificationInfo = {};
            $scope.certificationform.$setPristine();
            $scope.certificationform.$setUntouched();
            getCertificationDetails(organizationReferenceKey);
        }, function(err) {

            console.error('ERR', err);
        });
    }

    function updateCertification(certificationReferenceKey) {

        $scope.orgCertificationInfo.lastUpdatedUserKey = $localStorage.userKey;
        $scope.orgCertificationInfo.lastUpdatedAppKey = $localStorage.appKey;
        $scope.orgCertificationInfo.lastUpdatedDateTime = new Date();
        appLogger.log(JSON.stringify($scope.orgCertificationInfo));
        certificationLogic.updateCertification($scope.orgCertificationInfo, organizationReferenceKey, certificationReferenceKey).then(function(response) {
            appLogger.alert($scope.alertMessageLabels.certificationUpdated);
            $scope.orgCertificationInfo = "";
            $scope.orgCertificationInfo = {};
            $scope.certificationform.$setPristine();
            $scope.certificationform.$setUntouched();
            getCertificationDetails(organizationReferenceKey);
        }, function(err) {
            console.error('ERR', err);
        });
    }
    /* get Certification details By CertificationID*/
    $scope.editCertification = function(certificationReferenceKey) {
        certificationLogic.getCertificationById(organizationReferenceKey, certificationReferenceKey).then(function(response) {

            $scope.orgCertificationInfo = response;
            $scope.orgCertificationInfo.ReferenceKey = response.referenceKey;
            //$scope.orgCertificationInfo.CertificationID = response.CertificationID;
            $scope.orgCertificationInfo.certificationBodyID = response.certificationBodyID;
            $scope.orgCertificationInfo.validFrom = new Date(response.validFrom);
            $scope.orgCertificationInfo.validTo = new Date(response.validTo);
            $scope.orgCertificationInfo.certificationName = response.certificationName;

        }, function(err) {
            console.error('ERR', err);


        });
    };


    /* Delete Contact details By CertificationID*/
    $scope.deleteCertification = function(certificationReferenceKey) {
        certificationLogic.deleteCertification(organizationReferenceKey, certificationReferenceKey).then(function(response) {
            appLogger.alert($scope.alertMessageLabels.certificationDeleted);
            getCertificationDetails(organizationReferenceKey);

        }, function(err) {
            console.error('ERR', err);

        });
    };

});