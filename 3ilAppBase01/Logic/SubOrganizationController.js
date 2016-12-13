'use strict';
var app = angular.module('ThrillAppBase.subOrganization', ['ThrillAppBase.appBaseSubOrganizationLogic', 'ThrillLocation.addressLogic', 'ThrillOrganization.organizationLogic', 'ThrillContact.contactLogic', 'ThrillContact.contactContactItemLogic', 'ThrillOrganization.SubOrganizationTypeListLogic']);
app.controller('SubOrganizationController', function ($scope, $localStorage, $filter, TempDataService, $rootScope, $state, $stateParams, appBaseSubOrganizationLogic, addressLogic, organizationLogic, contactLogic, contactContactItemLogic, SubOrganizationTypeListLogic, NgMap, toaster, SweetAlert) {
    // var subOrganizationKey = '195b6750-41dc-11e6-a3fa-41c5891757ca'
    //  $localStorage.organizationId = 2;
    //  $localStorage.organizationKey = '99070670-3f8a-11e6-a8bf-d3284448083d'
    // $localStorage.addressMode = "general";
    // alert(orgReferenceKey);
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
                contactSubTypeId: 3
                , contactInfo: ''
            }]*/
    };

     $scope.parent=true;  
    $scope.getBranchParent=function(orgLevelId)
    {
      if(orgLevelId==1)
          {
          $scope.parent=false;      
          }
        else
            {
        $scope.parent=true;               
            }
        
    }
    

    if ($stateParams.subOrganizationKey != undefined) {
        $scope.buttonText = "Update";
        getSubOrganization($stateParams.subOrganizationKey);
    }
    getContactTypes();
    getBranchTypes();
    // geoGeoLocation(83.671875, 19.145168196205297);
    geoGeoLocation(null, null);


$scope.showGeo=false;
$scope.hideLabel=true;
$scope.showLabel=false;

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
 
     //recognition types
    function getRecognitionTypes() {
        appBaseSubOrganizationLogic.getRecognitionTypes().then(function (response) {
            //alert(JSON.stringify(response));
            $scope.recognitionList = response;
        }, function (err) {
            console.error('ERR', err);
        });
    };
    getRecognitionTypes();

    //geoGeoLocation(null, null);
    $scope.addSubOrganization = function () {
        if ($scope.subOrganization.basicInfo.organizationDetails == "") $scope.subOrganization.basicInfo.organizationDetails = null;
        if ($scope.subOrganization.basicInfo.websiteUrl == "")
            $scope.subOrganization.basicInfo.websiteUrl = null;
        if ($scope.subOrganization.basicInfo.parentOrganizationID == "") $scope.subOrganization.basicInfo.parentOrganizationID == null
        if ($stateParams.subOrganizationKey == undefined) {
            appBaseSubOrganizationLogic.addSubOrganization($scope.subOrganization).then(function (response) {
                console.log(JSON.stringify(response));
                SweetAlert.swal({
                    title: "Branch"
                    , text: "Saved successfully"
                    , type: "success"
                    , confirmButtonColor: "#007AFF"
                }, function () {
                    $state.go('app.SubOrganizationlist');
                });
                //toaster.pop('success', 'Branch', 'Branch saved successfully');
                // alert('Branch saved successfully');
            }, function (err) {
                alert('falied to save');
                console.log(err);
            })
        }
        else {
            appBaseSubOrganizationLogic.updateSubOrganization($scope.subOrganization, $stateParams.subOrganizationKey).then(function (response) {
                console.log(response);
                //alert('Branch updated successfully');
                //toaster.pop('success', 'Branch', 'Branch updated successfully');
                SweetAlert.swal({
                    title: "Branch"
                    , text: "Updated successfully"
                    , type: "success"
                    , confirmButtonColor: "#007AFF"
                }, function () {
                    $state.go('app.SubOrganizationlist');
                });
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
                    $scope.validation.contactTypePattern = /^[0-9]\d{2,5}-\d{7}$/;
                    $scope.validation.placeHolder = "ex. 0891-123456"
                }
               
                else if(contactType == "fax"){
                     $scope.validation.contactTypePattern = /^[0-9]\d{2,5}-\d{7}$/;
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
        $state.go('app.SubOrganizationlist');
    }

    function getSubOrganization(subOrganizationKey) {
        appBaseSubOrganizationLogic.getSubOrganization(subOrganizationKey).then(function (response) {
            //$scope.subOrganization.basicInfo.organizationName = response.basicInfo.organizationName;
            $scope.subOrganization.basicInfo = response.basicInfo;
            if (response.basicInfo.contactKey != undefined && response.basicInfo.contactKey != "") getContactItems(response.basicInfo.contactKey)
            if (response.basicInfo.addressKey != undefined && response.basicInfo.addressKey != "") getAddress(response.basicInfo.addressKey)
            $scope.getBranchParent(response.basicInfo.organizationLevelID);
            if (response.basicInfo.n3DMSFileKey != null && response.basicInfo.n3DMSFileKey != undefined) {
                $scope.profilePic = "3ilAppBase01/Web/assets/images/loading.gif";
                var folderKey = response.basicInfo.folderKey;
                var fileKey = response.basicInfo.n3DMSFileKey;
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
                    $scope.subOrganization.address.countryId=4;
                    $scope.subOrganization.address.stateId=1;
                    $scope.subOrganization.address.cityId=271;
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
        if ($stateParams.subOrganizationKey != undefined) {
            addressLogic.getAddressInfoById(addressKey).then(function (response) {
                if (response[0] != undefined) {

                      if(response[0].countryId!=null){

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
                else
                {
                    $scope.subOrganization.address.countryId=4;
                    $scope.subOrganization.address.stateId=1;
                    $scope.subOrganization.address.cityId=271;
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
        image: '3ilAppBase01/Web/assets/images/avatar-1-xl.jpg'
    , };
    $scope.removeImage = function () {
        $scope.noImage = true;
    };
    if ($scope.Suborg.image == '') {
        $scope.noImage = true;
    }
    /* var data = [{
         "id": 1,
         "lm": 138661285100,
         "ln": "Smith",
         "fn": "John",
         "dc": "CEO",
         "em": "j.smith@company.com",
         "ph": "617-321-4567",
         "ac": true,
         "dl": false
     }, {
         "id": 2,
         "lm": 138661285200,
         "ln": "Taylor",
         "fn": "Lisa",
         "dc": "VP of Marketing",
         "em": "l.taylor@company.com",
         "ph": "617-522-5588",
         "ac": true,
         "dl": false
     }, {
         "id": 3,
         "lm": 138661285300,
         "ln": "Jones",
         "fn": "James",
         "dc": "VP of Sales",
         "em": "j.jones@company.com",
         "ph": "617-589-9977",
         "ac": true,
         "dl": false
     }, {
         "id": 4,
         "lm": 138661285400,
         "ln": "Wong",
         "fn": "Paul",
         "dc": "VP of Engineering",
         "em": "p.wong@company.com",
         "ph": "617-245-9785",
         "ac": true,
         "dl": false
     }, {
         "id": 5,
         "lm": 138661285500,
         "ln": "King",
         "fn": "Alice",
         "dc": "Architect",
         "em": "a.king@company.com",
         "ph": "617-244-1177",
         "ac": true,
         "dl": false
     }, {
         "id": 6,
         "lm": 138661285600,
         "ln": "Brown",
         "fn": "Jan",
         "dc": "Software Engineer",
         "em": "j.brown@company.com",
         "ph": "617-568-9863",
         "ac": true,
         "dl": false
     }, {
         "id": 7,
         "lm": 138661285700,
         "ln": "Garcia",
         "fn": "Ami",
         "dc": "Software Engineer",
         "em": "a.garcia@company.com",
         "ph": "617-327-9966",
         "ac": true,
         "dl": false
     }, {
         "id": 8,
         "lm": 138661285800,
         "ln": "Green",
         "fn": "Jack",
         "dc": "Software Engineer",
         "em": "j.green@company.com",
         "ph": "617-565-9966",
         "ac": true,
         "dl": false
     }, {
         "id": 9,
         "lm": 138661285900,
         "ln": "Liesen",
         "fn": "Abraham",
         "dc": "Plumber",
         "em": "a.liesen@company.com",
         "ph": "617-523-4468",
         "ac": true,
         "dl": false
     }, {
         "id": 10,
         "lm": 138661286000,
         "ln": "Bower",
         "fn": "Angela",
         "dc": "Product Manager",
         "em": "a.bower@company.com",
         "ph": "617-877-3434",
         "ac": true,
         "dl": false
     }, {
         "id": 11,
         "lm": 138661286100,
         "ln": "Davidoff",
         "fn": "Fjodor",
         "dc": "Database Admin",
         "em": "f.davidoff@company.com",
         "ph": "617-446-9999",
         "ac": true,
         "dl": false
     }, {
         "id": 12,
         "lm": 138661286200,
         "ln": "Vitrovic",
         "fn": "Biljana",
         "dc": "Director of Communications",
         "em": "b.vitrovic@company.com",
         "ph": "617-111-1111",
         "ac": true,
         "dl": false
     }, {
         "id": 13,
         "lm": 138661286300,
         "ln": "Valet",
         "fn": "Guillaume",
         "dc": "Software Engineer",
         "em": "g.valet@company.com",
         "ph": "617-565-4412",
         "ac": true,
         "dl": false
     }, {
         "id": 14,
         "lm": 138661286400,
         "ln": "Tran",
         "fn": "Min",
         "dc": "Gui Designer",
         "em": "m.tran@company.com",
         "ph": "617-866-2554",
         "ac": true,
         "dl": false
     }];
     $scope.tableParams = new ngTableParams({
         page: 1,
         count: 10
     }, {
         total: data.length,
         getData: function ($defer, params) {
             var orderedData = params.sorting() ? $filter('orderBy')(data, params.orderBy()) : data;
             $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
         }
     });

     $scope.editId = -1;

     $scope.setEditId = function (pid) {
         $scope.editId = pid;
     };*/
});