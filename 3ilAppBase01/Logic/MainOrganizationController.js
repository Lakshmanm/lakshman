'use strict';
var app = angular.module('Aarush.MainOrganization', ['ThrillAppBase.appBaseOrganizationLogic', 'ThrillContact.contactLogic','Mcampuz.profilesettngLogic','ThrillAppBase.config', 'ThrillLocation.addressLogic', 'ThrillContact.contactContactItemLogic', 'ThrillFrameworkLibrary.DataService']);
app.controller('Aarush.MainOrganization', function ($scope, $filter, TempDataService, $rootScope, $state, $localStorage, $q, appBaseOrganizationLogic,profilesettngLogic, addressLogic, contactLogic, contactContactItemLogic, toaster, SweetAlert, config, dataService) {
    // $localStorage.organizationKey = '99070670-3f8a-11e6-a8bf-d3284448083d';
    //var orgReferenceKey = '99070670-3f8a-11e6-a8bf-d3284448083d';
    // $scope.obj = new Flow();
    
    $scope.showGeo=false;
$scope.hideLabel=true;
$scope.showLabel=false;
    var orgReferenceKey = $localStorage.organizationKey;
   $scope.format=$localStorage.DateTimeFormat;
  
   
   // $scope.minDate = new Date(2016, 1, 1);
    var d = new Date(); 
    $scope.maxDate = d.getFullYear();
    //$localStorage.addressMode = "general";
    //alert(orgReferenceKey);
    if ($localStorage.addressMode == "government") {
        $scope.isGovtAddressMode = true
    }
    else {
        $scope.isGovtAddressMode = false
    }
    $scope.organization = {
        basicInfo: {}
        , address: {}
    };
    
     //recognition types
    function getRecognitionTypes() {
        appBaseOrganizationLogic.getRecognitionTypes().then(function (response) {
            //alert(JSON.stringify(response));
            $scope.recognitionList = response;
        }, function (err) {
            console.error('ERR', err);
        });
    };
    getRecognitionTypes();
    $scope.profilePic = "3ilAppBase01/Web/assets/images/organization3.png";
    $scope.fileChange = function () {
        // alert('file change event');
        $scope.profilePic = URL.createObjectURL(event.target.files[0]);
        $scope.$apply();
    }
    getOrganization(orgReferenceKey);
    geoGeoLocation(null, null);
    $scope.updateOrganization = function () {
        if ($scope.organization.basicInfo.organizationDetails == "") $scope.organization.basicInfo.organizationDetails = null;
        var contactKey = $scope.organization.basicInfo.contactKey;
        //alert("ContactKey"+contactKey);
        var contactBasicObj = {};
        var promiseArray = [];
        var contactObj1 = {
            "contactKey": $scope.organization.basicInfo.contactKey
            , "contactTypeKey": 'afe56000-48e3-11e6-984a-9d49055c7bf9'
            , "contactItemInfo": $scope.organization.contact.Mobile
            , "contactItemKey": $scope.organization.contact.MobileKey
        }
        var contactObj2 = {
            "contactKey": $scope.organization.basicInfo.contactKey
            , "contactTypeKey": '78278210-48e3-11e6-8585-316a593298b4'
            , "contactItemInfo": $scope.organization.contact.EmailId
            , "contactItemKey": $scope.organization.contact.EmailKey
        }
        promiseArray.push(addContactDetails(contactObj1, contactKey));
        promiseArray.push(addContactDetails(contactObj2, contactKey));
        // alert(JSON.stringify(contactObj1));
        //alert(JSON.stringify(contactObj2));
        $q.all(promiseArray).then(function (result) {
            // alert(JSON.stringify(result));
        });
      //   alert(JSON.stringify($scope.organization.basicInfo.addressKey));
        var addresskey = $scope.organization.basicInfo.addressKey;
        var addressObj = {};
        addressObj.geoLocation = $scope.organization.address.streetDetails;
        addressObj.countryId = $scope.organization.address.countryId;
        addressObj.stateId = $scope.organization.address.stateId;
        addressObj.cityId = $scope.organization.address.cityId;
        addressObj.pinCode = $scope.organization.address.pincode;
        addressObj.longitude = $scope.organization.address.longitude;
        addressObj.latitude = $scope.organization.address.latitude;
        //console.log("address " + JSON.stringify(addressObj));
        if (addresskey == undefined || addresskey == null) {
            addressLogic.addAddress(addressObj);
        }
        else {
            addressLogic.updateAddress(addressObj, addresskey);
        }
        var folderKey = $scope.organization.basicInfo.folderKey;
        appBaseOrganizationLogic.updateAppBaseOrganization($scope.organization, orgReferenceKey).then(function (response) {
            SweetAlert.swal({
                title: "Organization"
                , text: "Updated successfully"
                , type: "success"
                , confirmButtonColor: "#007AFF"
            }, function () {
                getOrganization(orgReferenceKey);
                getContactItems($scope.organization.basicInfo.contactKey);
                getAddress($scope.organization.basicInfo.addressKey);
            });
            // sweet.show('Organization', 'updated successfully', 'success');
            //toaster.pop('success', 'organization', 'organization updated successfully');
            //alert('organization updated successfully');
        });
    }

    function addContactDetails(contactObj, contactKey) {
        var deferred = $q.defer();
        //alert("Update contact");
        contactContactItemLogic.updateContactItem(contactObj).then(function (response) {
            deferred.resolve(response);
        });
        return deferred.promise;
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


    
    $scope.updateAddress = function () {
        //alert("update address");
        var addresskey = $scope.organization.basicInfo.addressKey;
        var addressObj = {};
        if ($scope.organization.address.pincode == '') {
            $scope.organization.address.pincode = null;
        }
        if ($scope.organization.address.streetDetails == '') {
            $scope.organization.address.streetDetails = null;
        }
        addressObj.geoLocation = $scope.organization.address.streetDetails;
        addressObj.countryId = $scope.organization.address.countryId;
        addressObj.stateId = $scope.organization.address.stateId;
        addressObj.cityId = $scope.organization.address.cityId;
        addressObj.pinCode = $scope.organization.address.pincode;
        addressObj.longitude = $scope.organization.address.longitude;
        addressObj.latitude = $scope.organization.address.latitude;
        //console.log("address " + JSON.stringify(addressObj));
        if (addressKey == undefined || addressKey == null) {
            addressLogic.addAddress(addressObj);
        }
        else {
            addressLogic.updateAddress(addressObj, addresskey);
        }
    }
    $scope.addContactItem = function () {
        var contactKey = $scope.organization.basicInfo.contactKey;
        var contactBasicObj = {};
        if (contactKey == undefined || contactKey == null) {
            contactLogic.addContact({}).then(function (response) {
                contactKey = response.data.contactKey;
                $scope.organization.basicInfo.contactKey = contactKey;
                var contactObj1 = {
                    "contactKey": contactKey
                    , "contactTypeKey": 'afe56000-48e3-11e6-984a-9d49055c7bf9'
                    , "contactItemInfo": $scope.organization.contact.Mobile
                }
                var contactObj2 = {
                    "contactKey": contactKey
                    , "contactTypeKey": '78278210-48e3-11e6-8585-316a593298b4'
                    , "contactItemInfo": $scope.organization.contact.EmailId
                }
                contactContactItemLogic.addContactItem(contactObj1).then(function (response) {
                    // alert("contact1 added" + JSON.strigify(response));
                    //console.log('contact item Save reponse ' + JSON.stringify(response));
                    contactContactItemLogic.addContactItem(contactObj2).then(function (response) {
                        //  alert("contact2 added" + JSON.strigify(response));
                        //console.log('contact item Save reponse ' + JSON.stringify(response));
                    });
                });
            });
        }
        else {
            var contactObj1 = {
                "contactKey": $scope.organization.basicInfo.contactKey
                , "contactTypeKey": 'afe56000-48e3-11e6-984a-9d49055c7bf9'
                , "contactItemInfo": $scope.organization.contact.Mobile
                , "contactItemKey": $scope.organization.contact.MobileKey
            }
            var contactObj2 = {
                "contactKey": $scope.organization.basicInfo.contactKey
                , "contactTypeKey": '78278210-48e3-11e6-8585-316a593298b4'
                , "contactItemInfo": $scope.organization.contact.EmailId
                , "contactItemKey": $scope.organization.contact.EmailKey
            }
            contactContactItemLogic.updateContactItem(contactObj1).then(function (response) {
                //console.log('contact item Save reponse ' + JSON.stringify(response));
                contactContactItemLogic.updateContactItem(contactObj2).then(function (response) {
                    //console.log('contact item Save reponse ' + JSON.stringify(response));
                });
            });
        }
        $scope.organization.contact = {};
        $scope.validation = {};
        $scope.OrgContactForm.$setPristine();
        getContactItems(contactKey);
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
    }

    function getOrganization(orgReferenceKey) {
        appBaseOrganizationLogic.getAppBaseOrganization(orgReferenceKey).then(function (response) {
            $scope.organization.basicInfo = response.basicInfo;
            // if (response.basicInfo.contactKey != undefined && response.basicInfo.contactKey != "") {
            getContactItems(response.basicInfo.contactKey);
            getAddress(response.basicInfo.addressKey);
            //  }
            if (response.basicInfo.n3DMSFileKey != null && response.basicInfo.n3DMSFileKey != undefined) {
                //$scope.profilePic = "3ilAppBase01/Web/assets/images/loading.gif";
                var folderKey = response.basicInfo.folderKey;
                var fileKey = response.basicInfo.n3DMSFileKey;
                appBaseOrganizationLogic.getOrganizationProfilePicture(folderKey, fileKey).then(function (pictureResponse) {
                    $scope.profilePic = pictureResponse.FileBin
                })
            }
        })
    }

    function getContactTypes(contactKey) {
        contactContactItemLogic.getAllContactItems().then(function (response) {
            $scope.contactTypes = response;
        })
    }

    function getContactItems(contactKey) {
        contactLogic.getAllContacts(contactKey).then(function (response) {
            // alert(JSON.stringify(response));
            $scope.organization.contact = {};
            $scope.organization.contact.Mobile = response[1].contactItemInfo;
            $scope.organization.contact.EmailId = response[0].contactItemInfo;
            $scope.organization.contact.MobileKey = response[1].contactItemKey;
            $scope.organization.contact.EmailKey = response[0].contactItemKey;
        }, function (err) {
            console.log(err);
        })
    }
    //geo location code start
    function geoGeoLocation(longitude, latitude) {
        $scope.organization.address.latitude = latitude;
        $scope.organization.address.longitude = longitude;
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
        $scope.organization.address.latitude = event.latLng.lat();
        $scope.organization.address.longitude = event.latLng.lng();
        $scope.locationPointer = [event.latLng.lat(), event.latLng.lng()];
    };
    $scope.cordinatesRefresh = function (long, lat) {
        $scope.locationPointer = [lat, long];
        $scope.mapCenter = lat + "," + long;
    };
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
    /*Method for calling Cities*/
    var cities = function (stateID) {
        addressLogic.getCities(stateID).then(function (response) {
            $scope.citiesList = response;
        }, function (err) {
            console.error('ERR', err);
        });
    };
    
    
      //initialization
                    $scope.organization.address.countryId=4;
                    $scope.organization.address.stateId=1;
                    $scope.organization.address.cityId=271;
                    states($scope.organization.address.countryId)
                    cities($scope.organization.address.stateId)
    
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

    function getAddress(addressKey) {
        addressLogic.getAddressInfoById(addressKey).then(function (response) {
            if (response[0] != undefined) {
                if (response[0].countryId != null) {
                    $scope.organization.address = {};
                    states(response[0].countryId);
                    if ($localStorage.addressMode == "government") {
                        districts(response[0].stateId);
                        mandals(response[0].districtId);
                        villages(response[0].mandalId);
                    }
                    else {
                        cities(response[0].stateId);
                    }
                    $scope.organization.address = response[0];
                }
                else {
                    $scope.organization.address.countryId = 4;
                    $scope.organization.address.stateId = 1;
                    $scope.organization.address.cityId = 271;
                    states($scope.organization.address.countryId)
                    cities($scope.organization.address.stateId)
                }
                geoGeoLocation(response[0].longitude, response[0].latitude);
            }
        })
    }
});