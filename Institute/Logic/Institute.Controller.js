/*//=============================================================================
// All rights reserved to Thrill Innovative Labs.
// THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
// OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
// LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
// FITNESS FOR A PARTICULAR PURPOSE.
//=============================================================================
//*****************************************************************************
//* Name		    	: Institute.Controller.js 
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
var app = angular.module('ThrillInstitute.institute', ['ThrillInstitute.instituteLogic'
			, 'ThrillAppBase.appBaseSubOrganizationLogic'
			, 'ThrillLocation.addressLogic'
             , 'ThrillOrganization.organizationLogic'
             , 'ThrillContact.contactLogic'
             , 'ThrillContact.contactContactItemLogic'
             , 'ThrillOrganization.SubOrganizationTypeListLogic'
			 , 'ngCordova'
			 , 'ThrillFrameworkLibrary.geo'
			 , 'ThrillFrameworkLibrary.Network'
			 , 'ThrillCnnWebClient.appConfig'
			 , 'ThrillFrameworkLibrary.appLogger'
              , 'ngStorage'
	])
    /*Setup term Controller */
app.controller('instituteController', function ($scope, $http, $localStorage, instituteLogic, appBaseSubOrganizationLogic, addressLogic, organizationLogic, contactLogic, contactContactItemLogic, SubOrganizationTypeListLogic, $state, $stateParams, appConfig, appLogger, NgMap, toaster, SweetAlert, $filter) {
    getLabels(appConfig.CULTURE_NAME);
    getMessages(appConfig.CULTURE_NAME);
    /*get labels with selected language*/
    function getLabels(cultureName) {
        var currentFileName = "Institute";
        $http.get("Academic/Languages/" + currentFileName + "." + cultureName + ".json").then(function (response) {
            bindLabels(response.data);
        });
    }

    function getMessages(cultureName) {
        var alertMessageName = "AlertMessages";
        $http.get("Academic/Languages/" + alertMessageName + "." + cultureName + ".json").then(function (response) {
            $scope.alertMessageLabels = response.data.messages;
        });
    }
    /*bind labels with selected language */
    function bindLabels(data) {
        /* var labels = {
		 termTitle: data.labels.termTitle,
		 startDate: data.labels.startDate,
		 endDate: data.labels.endDate,
		 submit: data.labels.submit,
		 termHeading: data.labels.termHeading
	 };*/
        $scope.labelsTerm = data.labels;
    };

$scope.showGeo=false;
$scope.hideLabel=true;
$scope.showLabel=false;
    function getInstituteTypes() {
        instituteLogic.getInstituteTypes().then(function (response) {
            //alert(JSON.stringify(response));
            $scope.instituteList = response;
        }, function (err) {
            console.error('ERR', err);
        });
    };
    getInstituteTypes();

    function getBranches() {
        organizationLogic.getOrganizationsByRootOrganization($localStorage.organizationKey).then(function (response) {
            $scope.subOrganizationList = response;
        }, function (err) {
            console.error('ERR', err);
        });
    };
    getBranches();
    //recognition types
    function getRecognitionTypes() {
        instituteLogic.getRecognitionTypes().then(function (response) {
            //alert(JSON.stringify(response));
            $scope.recognitionList = response;
        }, function (err) {
            console.error('ERR', err);
        });
    };
    getRecognitionTypes();
    if ($localStorage.addressMode == "government") {
        $scope.isGovtAddressMode = true
    }
    else {
        $scope.isGovtAddressMode = false
    }
    $scope.buttonText = "Save";
    $scope.profilePic = "3ilAppBase01/Web/assets/images/organization3.png";
    $scope.fileChange = function () {
        // alert('file change event');
        $scope.profilePic = URL.createObjectURL(event.target.files[0]);
        $scope.$apply();
    }


 $scope.OpenGeodiv = function () {
$scope.showGeo=true;
$scope.hideLabel=false;
$scope.showLabel=true;
 }

 $scope.hideGeodiv = function () {
    if ($scope.showGeo=false){

        $scope.hideLabel=false;
$scope.showLabel=true;
    }
    else
    {
$scope.hideLabel=true;
$scope.showLabel=false;
    }

 }



    $scope.subOrganization = {
        basicInfo: {
            rootOrganizationKey: $localStorage.organizationKey
                // parentOrganizationId: $localStorage.organizationId
        }
        , address: {}
        /*
        , contacts: [{
                contactSubTypeId: 2
                , contactInfo: ''
            }
            
            , {
                contactSubTypeId: 


                , contactInfo: ''
            }]*/
    };
    if ($stateParams.instituteKey != undefined) {
        $scope.buttonText = "Update";
        getSubOrganization($stateParams.instituteKey);
    }
    getContactTypes();
    getBranchTypes();
    // geoGeoLocation(83.671875, 19.145168196205297);
    geoGeoLocation(null, null);
    //geoGeoLocation(null, null);
    $scope.addSubOrganization = function () {
        if ($scope.subOrganization.basicInfo.organizationDetails == "") $scope.subOrganization.basicInfo.organizationDetails = null;
        if ($stateParams.instituteKey == undefined) {
            $scope.subOrganization.basicInfo.organizationLevelID = 5;
            appBaseSubOrganizationLogic.addSubOrganization($scope.subOrganization).then(function (response) {
                console.log(JSON.stringify(response));
                $scope.institute.instanceOrganizationKey = $localStorage.organizationKey;
                $scope.institute.subOrganizationKey = response.data.organizationKey;
                if ($scope.institute.ParentOrganizationKey == "" || $scope.institute.ParentOrganizationKey == null) {
                    $scope.institute.ParentOrganizationKey = $localStorage.organizationKey;
                }
                instituteLogic.addInstitute($scope.institute).then(function (response) {
                    console.log(response.data.referenceKey);
                    $localStorage.instituteKey = response.data.referenceKey;
                    SweetAlert.swal({
                        title: "Institute"
                        , text: "Saved successfully"
                        , type: "success"
                        , confirmButtonColor: "#007AFF"
                    }, function () {
                        $state.go('app.instituteList');
                    });
                    //toaster.pop('success', 'Branch', 'Branch saved successfully');
                    // alert('Branch saved successfully');
                });
            }, function (err) {
                alert('falied to save');
                console.log(err);
            })
        }
        else {
            appBaseSubOrganizationLogic.updateSubOrganization($scope.subOrganization, $scope.institute.subOrganizationKey).then(function (response) {
                instituteLogic.updateInstitute($scope.institute, $stateParams.instituteKey).then(function (response) {
                    console.log(response);
                    //alert('Branch updated successfully');
                    //toaster.pop('success', 'Branch', 'Branch updated successfully');
                    SweetAlert.swal({
                        title: "Institute"
                        , text: "Updated successfully"
                        , type: "success"
                        , confirmButtonColor: "#007AFF"
                    }, function () {
                        $state.go('app.instituteList');
                    });
                })
            })
        }
    }
    $scope.addContactItem = function () {
        var contactKey = $scope.subOrganization.basicInfo.contactKey;
        if (contactKey == undefined || contactKey == null) {
            contactLogic.addContact({}).then(function (response) {
                contactKey = response.data.contactKey;
                $scope.subOrganization.basicInfo.contactKey = contactKey;
                var contactObj = {
                    "contactKey": $scope.subOrganization.basicInfo.contactKey
                    , "contactTypeKey": $scope.subOrganization.contact.contactTypeKey
                    , "contactItemInfo": $scope.subOrganization.contact.contactItemInfo
                }
                contactContactItemLogic.addContactContactItem(contactObj, contactKey).then(function (response) {
                    $scope.subOrganization.contact = {};
                    $scope.validation = {};
                    $scope.subOrgContactForm.$setPristine();
                    getContactItems(contactKey);
                    console.log('contact item Save reponse ' + JSON.stringify(response));
                })
            })
        }
        else {
            var contactObj = {
                "contactKey": $scope.subOrganization.basicInfo.contactKey
                , "contactTypeKey": $scope.subOrganization.contact.contactTypeKey
                , "contactItemInfo": $scope.subOrganization.contact.contactItemInfo
            }
            contactContactItemLogic.addContactContactItem(contactObj, contactKey).then(function (response) {
                $scope.subOrganization.contact = {};
                $scope.validation = {};
                $scope.subOrgContactForm.$setPristine();
                console.log('contact item Saved without logo reponse ' + JSON.stringify(response));
                getContactItems(contactKey)
            })
        }
    }
    $scope.contactTypeChange = function (typeKey) {
        $scope.validation = {};
        angular.forEach($scope.contactTypes, function (type, index) {
            if (type.contactTypeKey == typeKey) {
                var typeText = type.contactTypeTitle;
                var contactType = typeText.split(' ').join('').toLowerCase()
                if (contactType == "mobile") {
                    $scope.validation.contactTypePattern = /^[1-9]{1}[0-9]{9}$/;
                    $scope.validation.placeHolder = "XXXXXXXXXX"
                }
                else if (contactType == "email") {
                    $scope.validation.contactTypePattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
                    $scope.validation.placeHolder = "example@mail.com"
                }
                else if (contactType == "landline") {
                    $scope.validation.contactTypePattern = /^[0-9]\d{2,5}-\d{6,8}$/;
                    $scope.validation.placeHolder = "ex. 0891-123456"
                }
            
                else if(contactType == "fax"){
                    $scope.validation.contactTypePattern = /^[0-9]\d{2,5}-\d{6,8}$/;
                    $scope.validation.placeHolder = "ex. 0891-123456"
                }
            }
            /* do something for all key: value pairs */
        });
    }
    $scope.deleteContact = function (contactKey, contactItemKey) {
        SweetAlert.swal({
            title: "Are you sure?"
            , text: "Your want to delete this contact"
            , type: "warning"
            , showCancelButton: true
            , confirmButtonColor: "#DD6B55"
            , confirmButtonText: "Yes, delete it!"
            , cancelButtonText: "No, cancel!"
            , closeOnConfirm: false
            , closeOnCancel: false
        }, function (isConfirm) {
            if (isConfirm) {
                SweetAlert.swal({
                    title: "Deleted!"
                    , text: "Your contact has been deleted."
                    , type: "success"
                    , confirmButtonColor: "#007AFF"
                }, function () {
                    contactContactItemLogic.deleteContactContactItem(contactKey, contactItemKey).then(function () {
                        getContactItems(contactKey);
                    })
                });
            }
            else {
                SweetAlert.swal({
                    title: "Cancelled"
                    , text: "Your contact is safe :)"
                    , type: "error"
                    , confirmButtonColor: "#007AFF"
                });
            }
        });
        /*   if (confirm('Are you sure you want to delete this contact record')) {
               contactContactItemLogic.deleteContactContactItem(contactKey, contactItemKey).then(function() {
                   getContactItems(contactKey);
               })
           }*/
    }
    $scope.cancel = function () {
        $state.go('app.institute');
    }

  if($localStorage.RoleID==2)
    {
        $scope.details=true;
        $scope.Organizationupdate=true;
    }
    else{
         $scope.Organizationupdate=false;
           $scope.details=false;
    }



    function getSubOrganization(instituteKey) {
        $localStorage.instituteKey = $stateParams.instituteKey;
        instituteLogic.getInstitute(instituteKey).then(function (response) {
            // console.log(response.InstituteDiseCode);
            $scope.subOrganization.basicInfo.organizationName = response.OrganizationName;
            $scope.subOrganization.basicInfo.organizationDetails = response.OrganizationDetails;
            $scope.subOrganization.basicInfo.organizationLevelID = response.OrganizationLevelID;
            $scope.subOrganization.basicInfo.parentOrganizationID = response.ParentOrganizationID;
            $scope.subOrganization.basicInfo.contactKey = response.ContactKey;
            $scope.institute = {};
            $scope.institute.instituteDISECode = response.InstituteDiseCode;
            $scope.institute.typeOfInstitute = response.TypeOfInstitute;
            $scope.institute.recognitionType = response.RecognitionType;
            $scope.institute.websiteUrl = response.WebsiteUrl;
            $scope.institute.subOrganizationKey = response.SubOrganizationKey;
            $scope.institute.instanceOrganizationKey = response.InstanceOrganizationKey;
            $scope.institute.ParentOrganizationKey = response.ParentOrganizationKey;
            // $scope.subOrganization.basicInfo = response;
            if (response.ContactKey != undefined && response.ContactKey != "") getContactItems(response.ContactKey)
            if (response.AddressKey != undefined && response.AddressKey != "") getAddress(response.AddressKey)
            if (response.N3DMSFileKey != null && response.N3DMSFileKey != undefined) {
                $scope.profilePic = "Institute/Web/assets/images/loading.gif";
                var folderKey = response.FolderKey;
                var fileKey = response.N3DMSFileKey;
                appBaseSubOrganizationLogic.getSubOrganizationProfilePicture(folderKey, fileKey).then(function (pictureResponse) {
                    $scope.profilePic = pictureResponse.FileBin
                })
            }
            /*
                angular.forEach(response.contacts, function (contact) {

                if (contact.contactSubTypeId == 2) //mobile   
                {
                    $scope.subOrganization.contacts[0].contactInfo = parseInt(contact.contactInfo);
                    $scope.subOrganization.contacts[0].referenceKey = contact.referenceKey
                } else if (contact.contactSubTypeId == 3) //email
                {
                    $scope.subOrganization.contacts[1].contactInfo = contact.contactInfo;
                    $scope.subOrganization.contacts[1].referenceKey = contact.referenceKey
                }
            })*/
        })
    }
    organizationLogic.getOrgLevelList().then(function (response) {
        $scope.orgLevelLists = response;
    }, function (err) {
        console.error('ERR', err);
    });
    organizationLogic.getOrganizationsByRootOrganization($localStorage.organizationKey).then(function (response) {
        $scope.parentsOrganizations = response;
    }, function (err) {
        console.error('ERR', err);
    });

    function getBranchTypes() {
        SubOrganizationTypeListLogic.getSubOrganizationTypesByOrganizationId($localStorage.organizationKey).then(function (response) {
            //alert(JSON.stringify(response));
            $scope.branchTypeList = response;
        }, function (err) {
            console.error('ERR', err);
        });
    };

    function getContactTypes() {
        contactContactItemLogic.getContactTypes().then(function (response) {
            console.log(JSON.stringify(response));
            $scope.contactTypes = response;
        })
    }

    function getContactItems(contactKey) {
        contactLogic.getAllContacts(contactKey).then(function (response) {
            console.log(JSON.stringify(response))
            $scope.contactList = response;
        }, function (err) {
            console.log(err);
        })
    }
    //geo location code start
    function geoGeoLocation(longitude, latitude) {
        $scope.subOrganization.address.latitude = latitude;
        $scope.subOrganization.address.longitude = longitude;
        $scope.latlng = [latitude, longitude];
        if ((longitude == null || longitude == "" || longitude == undefined) && (latitude == null || latitude == "" || latitude == undefined)) {
            $scope.locationPointer = [89.99989983053331, -133.41796875];
            $scope.mapCenter = "19,83";
            $scope.mapZoom = 3;
        }
        else {
            $scope.locationPointer = [latitude, longitude];
            $scope.mapCenter = latitude + "," + longitude;
            $scope.mapZoom = 5;
        }
    }
    $scope.getpos = function (event) {
        $scope.subOrganization.address.latitude = event.latLng.lat();
        $scope.subOrganization.address.longitude = event.latLng.lng();
        $scope.locationPointer = [event.latLng.lat(), event.latLng.lng()];
    };
    $scope.cordinatesRefresh = function (long, lat) {
        $scope.locationPointer = [lat, long];
        $scope.mapCenter = lat + "," + long;
    };
    //geo location code end
    var countries = function () {
        addressLogic.getCountries().then(function (response) {
            $scope.countryList = response;
            console.log("alert" + response);
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
    /*Method for calling Cities*/
    var cities = function (stateID) {
        addressLogic.getCities(stateID).then(function (response) {
            $scope.citiesList = response;
        }, function (err) {
            console.error('ERR', err);
        });
    };
    //initialization
    $scope.subOrganization.address.countryId = 4;
    $scope.subOrganization.address.stateId = 1;
    $scope.subOrganization.address.cityId = 271;
    states($scope.subOrganization.address.countryId)
    cities($scope.subOrganization.address.stateId)
    $scope.getStates = function (countryID) {
        states(countryID);
    };
    $scope.getCheckAddressMode = function (stateID) {
        if ($localStorage.addressMode == "government") {
            districts(stateID);
        }
        else {
            cities(stateID);
        }
    }
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
    /*get address*/
    function getAddress(addressKey) {
        if ($stateParams.instituteKey != undefined) {
            addressLogic.getAddressInfoById(addressKey).then(function (response) {
                if (response[0] != undefined) {
                    if (response[0].countryId != null) {
                        $scope.subOrganization.address = {};
                        states(response[0].countryId);
                        if ($localStorage.addressMode == "government") {
                            districts(response[0].stateId);
                            mandals(response[0].districtId);
                            villages(response[0].mandalId);
                        }
                        else {
                            cities(response[0].stateId);
                        }
                        $scope.subOrganization.address = response[0]
                    }
                    else {
                        $scope.subOrganization.address.countryId = 4;
                        $scope.subOrganization.address.stateId = 1;
                        $scope.subOrganization.address.cityId = 271;
                        states($scope.subOrganization.address.countryId)
                        cities($scope.subOrganization.address.stateId)
                    }
                    geoGeoLocation(response[0].longitude, response[0].latitude);
                }
            })
        }
    }
    $scope.savebtn = false;
    $scope.Updatebtn = false;
    //alert(JSON.stringify($localStorage.tempBranch));
    if ($localStorage.tempBranch == "" || $localStorage.tempBranch == null || $localStorage.tempBranch == undefined || $localStorage.tempBranch == 'undefined') {
        // angular.copy($localStorage.tempBranch, $scope.Branches);
        $scope.Updatebtn = true;
        //$scope.Updatebtn="false";
    }
    else {
        //  alert('here1');
        $scope.Branches = $localStorage.tempBranch;
        // alert(234);
        //alert(JSON.stringify($scope.Branches));
        $scope.savebtn = true;
        //$scope.savebtn="false";
    }
    $scope.edit = function (object) {
        $scope.Suborg = object;
        $rootScope.Suborg = object;
        //alert(JSON.stringify( $rootScope.org))
    };
    $scope.Savesuborganization = function (object) {
        console.log(object);
        //$scope.greeting = 'Hello ' + $scope.username + '!';
        TempDataService.SubOrgBasic(object);
        $state.go('app.SubOrganizationlist');
    };
    $scope.Updatesuborganization = function (object) {
        console.log(object);
        //$scope.greeting = 'Hello ' + $scope.username + '!';
        var array = TempDataService.getSubOrgs();
        angular.forEach(array, function (object, index) {
            if (array[index].id == object.id) {
                array[index] = object;
            }
            if (index == array.length - 1) TempDataService.setSubOrgs(array);
        });
        $state.go('app.SubOrganizationlist');
    };
    if ($localStorage.Role == 'Admin') {
        $scope.adminMenu = true;
        if ($localStorage.tempBranch == "" || $localStorage.tempBranch == null || $localStorage.tempBranch == undefined || $localStorage.tempBranch == 'undefined') {
            $scope.Suborgupdate = true;
        }
        else {
            $scope.Suborgsave = true;
        }
    }
    else if ($localStorage.Role == 'Doctor') {
        $scope.doctorMenu = true;
        $scope.Suborgsave = true;
        $scope.Suborgupdate = true;
    }
    else if ($localStorage.Role == 'Clerk') {
        $scope.clerkMenu = true;
        $scope.Suborgsave = true;
        $scope.Suborgupdate = true;
    }
    else if ($localStorage.Role == 'Pharmacist') {
        $scope.pharmacistMenu = true;
        $scope.Suborgsave = true;
        $scope.Suborgupdate = true;
    }
    else if ($localStorage.Role == 'LabTechnician') {
        $scope.labTechnicianMenu = true;
        $scope.Suborgsave = true;
        $scope.Suborgupdate = true;
    }
    if ($scope.Branches == '' || $scope.Branches == undefined) {
        $scope.Subcontacts = [];
        // alert($scope.Staffcontacts.length);
    }
    else {
        $scope.Subcontacts = TempDataService.getStaffOrgs()[0].contacts;
    }
    $scope.Redirecthome = function () {
        $state.go('app.HelpDeskHome');
    };
    if ($scope.Subcontacts.length == 0) {
        var contact = {
            contactType: ""
            , contact: ""
            , id: 1
        }
        $scope.Subcontacts.push(contact);
    }
    // alert(JSON.stringify(TempDataService.getSubOrgs()[0].contacts));
    //$scope.Subcontacts=TempDataService.getSubOrgs()[0].contacts;
    // alert(JSON.stringify($scope.Subcontacts));
    $scope.addContact = function () {
        var contacts = [{
                contactType: ""
                , contact: ""
                , id: $scope.Subcontacts[$scope.Subcontacts.length - 1].id + 1
            }]
            // $scope.hideVisible=true;
        $scope.Subcontacts.push(contacts);
    }
    $scope.removeContacts = function (obj) {
        //  alert(obj);
        if (obj != -1) {
            $scope.Subcontacts.splice(obj, 1);
        }
    };
    $scope.Getmap = function (object) {
        // alert('here');
        google.maps.event.addDomListener(window, 'load', initialize);
    };
    $scope.Suborg = {
        image: 'Institute/Web/assets/images/avatar1.png3'
    , };
    $scope.removeImage = function () {
        $scope.noImage = true;
    };
    if ($scope.Suborg.image == '') {
        $scope.noImage = true;
    }
}); // End of App Controller