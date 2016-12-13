var app = angular.module('app', ['Aarush']);


app.factory('TempDataService', function () {
    var factory = {};

    var organizations = [{

        name: "Prabha Care Clinic"
        , Description: "OPHospital"
        , Office: "main"
        , Phone: "9848022338"
        , Fax: "040-4445"
        , Email: "gunakar@gmail.com"
        , Mobile: "9848022338"
        , Address: "RkBeachdown"
        , City: "vskp"
        , District: "ap"
        , State: "ap"
        , ZipCode: "9089"
        , Longitude: "3242"
        , Lattitude: "344324"
        , id: 1
        , isAsctive: false},

      {
        name: "Child Care Clinic",
        Description: "OPHospital",
        Office: "main",
        Phone: "9848022338",
        Fax: "040-4445",
        Email: "gunakar@gmail.com",
        Mobile:"9848022338",
        Address: "RkBeachdown",
        City: "vskp",
        District: "ap",
        State: "ap",
        ZipCode: "9089",
        Longitude: "3242",
        Lattitude: "344324",
        id: 1,
        isAsctive: false

    }];
    var suborganization = [{
        Branchname: "Surya Clinic"
        , Description: "Leading Pediatric Clinic"
        , contacts: [{
                "id": 1
                , "contactType": "Emial"
                , "contact": "Email@gmail.com"
    }
            , {
                "id": 2
                , "contactType": "Fax"
                , "contact": "040-123"
    }
            , {
                "id": 3
                , "contactType": "Emial"
                , "contact": "0000"
    }]
        , Email: "SuryaClinic@gmail.com"
        ,Mobile:"9848022338"
        , Address: "RkBeachdown"
        , City: "VSKP"
        , CityName: "VSKP"
        , District: "Visakhapatnam"
        , State: "AP"
        , ZipCode: "9089"
        , Longitude: "3242"
        , id: 1
        , Lattitude: "344324"

						},{
        Branchname: "Chil care Clinic"
        , Description: "Leading Pediatric Clinic"
        , contacts: [{
                "id": 1
                , "contactType": "Emial"
                , "contact": "Email@gmail.com"
    }
            , {
                "id": 2
                , "contactType": "Fax"
                , "contact": "040-123"
    }
            , {
                "id": 3
                , "contactType": "Emial"
                , "contact": "0000"
    }]
        , Email: "ChilCare@gmail.com"
        ,Mobile:"9848022338"
        , Address: "RkBeachdown"
        , City: "VSKP"
        , CityName: "VSKP"
        , District: "Visakhapatnam"
        , State: "AP"
        , ZipCode: "9089"
        , Longitude: "3242"
        , id: 1
        , Lattitude: "344324"

						}];
    var mainorganization = {
        ClinicName: "ChildCare Clinic"
        , Description: "Leading Pediatric Clinic"
        , contacts: [{
                "id": 1
                , "contactType": "Emial"
                , "contact": "sdfdfsdsf"
    }
            , {
                "id": 2
                , "contactType": "Fax"
                , "contact": "sdfdfsdsf"
    }
            , {
                "id": 3
                , "contactType": "Emial"
                , "contact": "sdfdfsdsf"
    }]
        , Mobile: "9848022338"
        , AdminFirstName: "Mahesh"
        , AdminLastName: "GORA"
        , AdminMiddleName: "kumar"
        , Fax: "040-4445"
        , Email: "Mahesh@gmail.com"
        , Address: "Madhurawada"
        , City: "vskp"
        , District: "Vskp"
        , State: "ap"
        , ZipCode: "530048"
        , Longitude: "3242"
        , Lattitude: "344324"
    };

    var orgStaff = [{
        "Firstname": "Mahesh"
        , "Middlename": "Alivara"
        , "Lastname": "M"
        , "DOB": "2016-06-15T18:30:00.000Z"
        , "Age": "12"
        , staffId: 1
        , "Role": "Doctor"
        , "Specialization": "Pediatrician"
        , "Qualification": "MBBS"
        , "RegistrationId": "123"
        , "Department": "Pediatric"
        , "BranchBelongsto": "Suryaclinic"
        , "Experience": "12"
        , Mobile: "9848022338"
        , contacts: [{
            "id": 1
            , "contactType": "Emial"
            , "contact": "Mahesh@ccpc.com"
        }, {
            "id": 2
            , "contactType": "Fax"
            , "contact": "040-1111111111"
        }]
        , "LoginId": "Mahesh@ccpc.com"
        , "Password": "1234"
        , "ConfirmPassword": "1234"
    }, {
        "Firstname": "Sruthi"
        , "Middlename": "Mehar"
        , "Lastname": "M"
        , "DOB": "2016-06-14T18:30:00.000Z"
        , "Age": "23"
        , "Role": "Doctor"
        , "Specialization": "Neonatologist"
        , "Qualification": "MBBS"
        , "RegistrationId": "12"
        , "Department": "Pediatric"
        , "BranchBelongsto": "ChildCareClinic"
        , "Experience": "12"
        , contacts: [{
            "id": 1
            , "contactType": "Emial"
            , "contact": "Sruthi@ccpc.com"
        }, {
            "id": 2
            , "contactType": "Fax"
            , "contact": "90000000909"
        }]
        , "LoginId": "Sruthi@ccpc.com"
        , "Password": "1234"
        , "ConfirmPassword": "1234"
    }];

   

    factory.registerOrgBasic = function (orgBasicObject) {
        orgBasicObject.id = organizations.length + 1;
        organizations.push(orgBasicObject);
        localStorage.setItem("test", organizations);
        var test2 = localStorage.getItem("test");
        //alert();
        //  alert(test2);
    }


    factory.OrgBasic = function (OrgBasicObject) {
        mainorganization.id = mainorganization.length + 1;
        mainorganization.push(OrgBasicObject);


    }
    factory.getMainOrgs = function () {

        return mainorganization;
        alert(mainorganizationorganization);
    }

    factory.setMainOrgs = function (Object) {
        mainorganization = Object;
        ///return mainorganization;
        // alert(mainorganizationorganization);
    }
    factory.SubOrgBasic = function (SubOrgBasicObject) {
        console.log(SubOrgBasicObject);
        SubOrgBasicObject.id = suborganization.length + 1;
        suborganization.push(SubOrgBasicObject);


    }
    factory.getSubOrgs = function () {
        return suborganization;
    }

    factory.setSubOrgs = function (array) {
        suborganization = array;
    }

    factory.getOrgs = function () {
        return organizations;
    }


    factory.Stafflist = function (orgStaffObject) {
        orgStaffObject.id = orgStaff.length + 1;
        orgStaff.push(orgStaffObject);


    }
    factory.getStaffOrgs = function () {

        return orgStaff;
        //alert(mainorganizationorganization);
    }
    factory.setStaffOrgs = function (array) {
        orgStaff = array;
    }


    return factory;
});



app.run(['$rootScope', '$state', '$stateParams'
, function ($rootScope, $state, $stateParams) {

        // Attach Fastclick for eliminating the 300ms delay between a physical tap and the firing of a click event on mobile browsers
        FastClick.attach(document.body);

        // Set some reference to access them from any scope
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;

        // GLOBAL APP SCOPE
        // set below basic information
        $rootScope.app = {
            name: 'Packet', // name of your project
            author: 'ClipTheme', // author's name or company name
            description: 'Angular Bootstrap Admin Template', // brief description
            version: '1.0', // current version
            year: ((new Date()).getFullYear()), // automatic current year (for copyright information)
            isMobile: (function () { // true if the browser is a mobile device
                var check = false;
                if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                    check = true;
                };
                return check;
            })()
            , defaultLayout: {
                isNavbarFixed: true, //true if you want to initialize the template with fixed header
                isSidebarFixed: true, // true if you want to initialize the template with fixed sidebar
                isSidebarClosed: false, // true if you want to initialize the template with closed sidebar
                isFooterFixed: false, // true if you want to initialize the template with fixed footer
                isBoxedPage: false, // true if you want to initialize the template with boxed layout
                theme: 'lyt2-theme-1', // indicate the theme chosen for your project
                logo: '3ilAppBase01/Web/assets/images/logo.png', // relative path of the project logo
                logoCollapsed: '3ilAppBase01/Web/assets/images/logo-collapsed.png' // relative path of the collapsed logo
            }
            , layout: ''
        };
        $rootScope.app.layout = angular.copy($rootScope.app.defaultLayout);
        $rootScope.user = {
            name: 'Peter'
            , job: 'ng-Dev'
            , picture: 'app/img/user/02.jpg'
        };
}]);
// translate config
app.config(['$translateProvider'
, function ($translateProvider) {

        // prefix and suffix information  is required to specify a pattern
        // You can simply use the static-files loader with this pattern:
        $translateProvider.useStaticFilesLoader({
            prefix: '3ilAppBase01/Web/assets/i18n/'
            , suffix: '.json'
        });

        // Since you've now registered more then one translation table, angular-translate has to know which one to use.
        // This is where preferredLanguage(langKey) comes in.
        $translateProvider.preferredLanguage('en');

        // Store the language in the local storage
        $translateProvider.useLocalStorage();

        // Enable sanitize
        $translateProvider.useSanitizeValueStrategy('sanitize');

}]);
// Angular-Loading-Bar
// configuration
app.config(['cfpLoadingBarProvider'
, function (cfpLoadingBarProvider) {
        cfpLoadingBarProvider.includeBar = true;
        cfpLoadingBarProvider.includeSpinner = false;

}]);
// Angular-breadcrumb
// configuration
app.config(function ($breadcrumbProvider) {
    $breadcrumbProvider.setOptions({
        template: '<ul class="breadcrumb"><li><a ui-sref="app.dashboard"><i class="fa fa-home margin-right-5 text-large text-dark"></i>Home</a></li><li ng-repeat="step in steps">{{step.ncyBreadcrumbLabel}}</li></ul>'
    });
});
// ng-storage
//set a prefix to avoid overwriting any local storage variables
app.config(['$localStorageProvider'
    , function ($localStorageProvider) {
        $localStorageProvider.setKeyPrefix('PacketLtr2');
    }]);
//filter to convert html to plain text
app.filter('htmlToPlaintext', function () {
    return function (text) {
        return String(text).replace(/<[^>]+>/gm, '');
    };
});
//Custom UI Bootstrap Calendar Popup Template
app.run(["$templateCache", function ($templateCache) {
    $templateCache.put("uib/template/datepicker/popup.html"
        , "<div>\n" +
        "  <ul class=\"uib-datepicker-popup clip-datepicker dropdown-menu\" dropdown-nested ng-if=\"isOpen\" ng-style=\"{top: position.top+'px', left: position.left+'px'}\" ng-keydown=\"keydown($event)\" ng-click=\"$event.stopPropagation()\">\n" +
        "    <li ng-transclude></li>\n" +
        "    <li ng-if=\"showButtonBar\" class=\"uib-button-bar\">\n" +
        "    <span class=\"btn-group pull-left\">\n" +
        "      <button type=\"button\" class=\"btn btn-sm btn-primary btn-o uib-datepicker-current\" ng-click=\"select('today')\" ng-disabled=\"isDisabled('today')\">{{ getText('current') }}</button>\n" +
        "      <button type=\"button\" class=\"btn btn-sm btn-primary btn-o uib-clear\" ng-click=\"select(null)\">{{ getText('clear') }}</button>\n" +
        "    </span>\n" +
        "      <button type=\"button\" class=\"btn btn-sm btn-primary pull-right uib-close\" ng-click=\"close()\">{{ getText('close') }}</button>\n" +
        "    </li>\n" +
        "  </ul>\n" +
        "</div>\n" +
        "");
    $templateCache.put("uib/template/datepicker/year.html"
        , "<table class=\"uib-yearpicker\" role=\"grid\" aria-labelledby=\"{{::uniqueId}}-title\" aria-activedescendant=\"{{activeDateId}}\">\n" +
        "  <thead>\n" +
        "    <tr>\n" +
        "      <th><button type=\"button\" class=\"btn btn-default btn-sm pull-left uib-left\" ng-click=\"move(-1)\" tabindex=\"-1\"><i class=\"glyphicon glyphicon-chevron-left\"></i></button></th>\n" +
        "      <th colspan=\"{{::columns - 2}}\"><button id=\"{{::uniqueId}}-title\" role=\"heading\" aria-live=\"assertive\" aria-atomic=\"true\" type=\"button\" class=\"btn btn-default btn-sm uib-title\" ng-click=\"toggleMode()\" ng-disabled=\"datepickerMode === maxMode\" tabindex=\"-1\"><strong>{{title}}</strong></button></th>\n" +
        "      <th><button type=\"button\" class=\"btn btn-default btn-sm pull-right uib-right\" ng-click=\"move(1)\" tabindex=\"-1\"><i class=\"glyphicon glyphicon-chevron-right\"></i></button></th>\n" +
        "    </tr>\n" +
        "  </thead>\n" +
        "  <tbody>\n" +
        "    <tr class=\"uib-years\" ng-repeat=\"row in rows track by $index\">\n" +
        "      <td ng-repeat=\"dt in row\" class=\"uib-year text-center\" role=\"gridcell\"\n" +
        "        id=\"{{::dt.uid}}\"\n" +
        "        ng-class=\"::dt.customClass\">\n" +
        "        <button type=\"button\" class=\"btn btn-default\"\n" +
        "          uib-is-class=\"\n" +
        "            'btn-current' for selectedDt,\n" +
        "            'active' for activeDt\n" +
        "            on dt\"\n" +
        "          ng-click=\"select(dt.date)\"\n" +
        "          ng-disabled=\"::dt.disabled\"\n" +
        "          tabindex=\"-1\"><span ng-class=\"::{'text-info': dt.current}\">{{::dt.label}}</span></button>\n" +
        "      </td>\n" +
        "    </tr>\n" +
        "  </tbody>\n" +
        "</table>\n" +
        "");
    $templateCache.put("uib/template/datepicker/month.html"
        , "<table class=\"uib-monthpicker\" role=\"grid\" aria-labelledby=\"{{::uniqueId}}-title\" aria-activedescendant=\"{{activeDateId}}\">\n" +
        "  <thead>\n" +
        "    <tr>\n" +
        "      <th><button type=\"button\" class=\"btn btn-default btn-sm pull-left uib-left\" ng-click=\"move(-1)\" tabindex=\"-1\"><i class=\"glyphicon glyphicon-chevron-left\"></i></button></th>\n" +
        "      <th><button id=\"{{::uniqueId}}-title\" role=\"heading\" aria-live=\"assertive\" aria-atomic=\"true\" type=\"button\" class=\"btn btn-default btn-sm uib-title\" ng-click=\"toggleMode()\" ng-disabled=\"datepickerMode === maxMode\" tabindex=\"-1\"><strong>{{title}}</strong></button></th>\n" +
        "      <th><button type=\"button\" class=\"btn btn-default btn-sm pull-right uib-right\" ng-click=\"move(1)\" tabindex=\"-1\"><i class=\"glyphicon glyphicon-chevron-right\"></i></button></th>\n" +
        "    </tr>\n" +
        "  </thead>\n" +
        "  <tbody>\n" +
        "    <tr class=\"uib-months\" ng-repeat=\"row in rows track by $index\">\n" +
        "      <td ng-repeat=\"dt in row\" class=\"uib-month text-center\" role=\"gridcell\"\n" +
        "        id=\"{{::dt.uid}}\"\n" +
        "        ng-class=\"::dt.customClass\">\n" +
        "        <button type=\"button\" class=\"btn btn-default\"\n" +
        "          uib-is-class=\"\n" +
        "            'btn-current' for selectedDt,\n" +
        "            'active' for activeDt\n" +
        "            on dt\"\n" +
        "          ng-click=\"select(dt.date)\"\n" +
        "          ng-disabled=\"::dt.disabled\"\n" +
        "          tabindex=\"-1\"><span ng-class=\"::{'text-info': dt.current}\">{{::dt.label}}</span></button>\n" +
        "      </td>\n" +
        "    </tr>\n" +
        "  </tbody>\n" +
        "</table>\n" +
        "");
}]);


app.factory('ChildrenService', function () {

    var childrens = [{
            childId: 1
            , firstName: 'Kamal'
            , middleName: ''
            , lastName: ''
            , contactNo: 9647822447
            , dateOfBirth: '2015-02-02'
            , age: '2 Years 2 Months'
            , gender: 'male'
            , cityOrTown: 'vizag'
            , religion: 'Chrisitian'
            , nationality: 'Indian'
            , aadhaarNumber: '265385634363'
            , contacts: [
                {
                    contactTypeId: 1
                    , contactType: 'email'
                    , contact: 'ravi@gmail.com'
    }
                , {
                    contactTypeId: 2
                    , contactType: 'landLine'
                    , contact: '0891255880'
    }
  , ]
            , image: '3ilAppBase01/Web/assets/images/child1.jpg'
            , addressLine1: ''
            , addressLine2: ''
            , districtId: 1
            , district: 'AP'
            , stateId: 1
            , state: 'Indian'
            , pinCode: '530012'
            , familyDetails: [
                {
                    familyDetailsId: 1
                    , firstName: 'Kumar'
                    , middleName: ''
                    , lastName: 'attili'
                    , contact: '9346543123'
                    , relationTypeId: 1
                    , relationType: 'Father'
    }
                , {
                    familyDetailsId: 2
                    , firstName: 'rachel'
                    , middleName: ''
                    , lastName: 'attili'
                    , contact: '9832965234'
                    , relationTypeId: 2
                    , relation: 'Mother'
    }
  ]
            , familyHistory: [

                {
                    conditionTypeId: 2
                    , conditionType: 'Cancer'
                    , relationSideTypeId: 2
                    , relationSideType: 'Father Side'
                    , comments: ''
    }
  ]
            , surgicalHistory: [

                {
                    surgeryTypeId: 2
                    , surgeryType: 'Shoulder Surgery'
                    , comments: ''
                    , file: ''
                    , dateOfSurgery: '2015-03-05'
    }
  ]
            , allergies: [
                {
                    allergyTypeId: 1
                    , allergyType: 'Skin Allegrgy'
                    , fromType: 'Days'
                    , fromCount: '20'
                    , comments: ''
    },

     ]
            , immunizationVaccinationHistory: [
                {
                    immunizationTypeId: 1
                    , immunizationType: 'Hep B'
                    , ageOfChild: '1'
                    , dosage: '10'
                    , dosageUnit: 'ml'
                    , dueDate: '2016-10-01'
                    , givenOn: '2015-05-05'
                    , givenBy: 'Dr.Radhika'
                    , batchNumber: '2345623453'
    }
                , {
                    immunizationTypeId: 2
                    , immunizationType: 'OPV'
                    , ageOfChild: '1'
                    , dosage: '10'
                    , dosageUnit: 'ml'
                    , dueDate: '2016-11-02'
                    , givenOn: '2015-07-06'
                    , givenBy: 'Dr.Naveena'
                    , batchNumber: '4789562135'
    }
  ]
            , screenings: [
                {
                    screeningId: 1
                    , vitals: {
                        height: {
                            value1: '70 cms'
                            , value2: '0'
                        }
                        , weight: {
                            value1: '9 kgs'
                            , value2: '0'
                        }
                        , mUAC: {
                            value1: '30cms'
                            , value2: '0'
                        }
                        , headCircumferrence: {
                            value1: '50.35cms'
                            , value2: '0'
                        }
                        , temperature: {
                            value1: '99 f'
                            , value2: ''
                        }
                        , hemoglobin: {
                            value1: '8.4 gm/dL'
                            , value2: ''
                        }
                    }
                    , immunizationVaccination: [
                        {
                            immunizationVaccinationId: 1
                            , immunizationTypeId: 1
                            , immunizationType: 'Hep B'
                            , dose: '2'
                            , ageOfChild: '2'
                            , dosage: '10'
                            , dosageUnit: 'ml'
                            , dueDate: ''
                            , givenOn: '2016-10-06'
                            , givenBy: 'Dr.Radha'
                            , batchNumber: '1232345632'
        }
                        , {
                            immunizationVaccinationId: 2
                            , immunizationTypeId: 2
                            , immunizationType: 'OPV'
                            , dose: '2'
                            , ageOfChild: '2'
                            , dosage: '10'
                            , dosageUnit: 'ml'
                            , dueDate: ''
                            , givenOn: '2016-11-08'
                            , givenBy: 'Dr.Naveen'
                            , batchNumber: '1475467890'
        }
      ]
                    , symptoms: [
                        {
                            symptonId: 1
                            , sympton: 'frequent fever'
                            , comments: ''
        }
                        , {
                            symptonId: 2
                            , sympton: 'pain in abdomen'
                            , comments: ''
        }
      ]
                    , investigations: [
                        {
                            investigationId: 1
                            , condition: ''
                            , typeOfSampleId: 1
                            , typeOfSample: 'Blood'
                            , initiatedOn: '2016-01-06'
                            , file: ''
        }
                        , {
                            investigationId: 2
                            , condition: ''
                            , typeOfSampleId: 2
                            , typeOfSample: 'Urine'
                            , initiatedOn: '2016-09-06'
                            , file: ''
        }
      ]
                    , diagnosis: [
                        {
                            diagnosisId: 1
                            , healthCondition: 'Malaria'
        }
                        , {
                            diagnosisId: 2
                            , healthCondition: ''
        }
      ]
                    , medications: [
                        {
                            medicationId: 1
                            , drugTypeId: 1
                            , drugType: 'Tablets'
                            , drugName: 'Pracetmol'
                            , dosage: '500'
                            , dosageUnit: 'mg'
                            , duration: '2'
                            , durationType: 'Days'
                            , frequency: [
                                {
                                    morning: true
                                    , afternoon: false
                                    , evening: false
                                    , night: false
            }
          ]
                            , quantity: 2
                            , instructions: ''
        }
                        , {
                            medicationId: 2
                            , drugTypeId: 2
                            , drugType: 'Syrup'
                            , drugName: 'DeCold'
                            , dosage: '500'
                            , dosageUnit: 'ml'
                            , duration: '2'
                            , durationType: 'Days'
                            , frequency: [
                                {
                                    morning: true
                                    , afternoon: false
                                    , evening: false
                                    , night: false
            }
          ]
                            , quantity: 2
                            , instructions: ''
        }
      ]
                    , recommendations: [
                        {
                            recommandId: 1
                            , recommandForId: 1
                            , recommandFor: 'Dr.Ridhima'
                            , comments: ''
        }
      ]
                    , isfollowUp: true
                    , followUpAfterId: 1
                    , followUpAfter: '1Day'
                    , isRefer: true
                    , referTo: ''
    }
                , {
                    screeningId: 2
                    , vitals: {
                        height: {
                            value1: '60 cms'
                            , value2: ''
                        }
                        , weight: {
                            value1: '14 Kgs'
                            , value2: ''
                        }
                        , mUAC: {
                            value1: ''
                            , value2: ''
                        }
                        , headCircumferrence: {
                            value1: '51 cms'
                            , value2: ''
                        }
                        , temperature: {
                            value1: '95 f'
                            , value2: ''
                        }
                        , hemoglobin: {
                            value1: '8 gm/dL'
                            , value2: ''
                        }
                    }
                    , immunizationVaccination: [
                        {
                            immunizationVaccinationId: 1
                            , immunizationTypeId: 1
                            , immunizationType: 'Hep A'
                            , dose: '2'
                            , ageOfChild: '2'
                            , dosage: '10'
                            , dosageUnit: 'ml'
                            , dueDate: '2016-05-05'
                            , givenOn: '2016-03-03'
                            , givenBy: 'Dr.Janaki'
                            , batchNumber: '1234512345'
        }
                        , {
                            immunizationVaccinationId: 2
                            , immunizationTypeId: 2
                            , immunizationType: 'OPV 1'
                            , dose: '2'
                            , ageOfChild: '2'
                            , dosage: '10'
                            , dosageUnit: 'ml'
                            , dueDate: '2016-06-06'
                            , givenOn: '2016-05-05'
                            , givenBy: 'Dr.Janaki'
                            , batchNumber: '6678877899'
        }
      ]
                    , symptoms: [
                        {
                            symptonId: 1
                            , sympton: 'frequent cold'
                            , comments: ''
        }
      ]
                    , investigations: [
                        {
                            investigationId: 1
                            , condition: ''
                            , typeOfSampleId: 1
                            , typeOfSample: 'Blood'
                            , initiatedOn: '2016-23-06'
                            , file: ''
        }


      ]
                    , diagnosis: [
                        {
                            diagnosisId: 1
                            , healthCondition: 'Vitamin C Deficiency'
        }
      ]
                    , medications: [
                        {
                            medicationId: 1
                            , drugTypeId: 1
                            , drugType: 'Syrup'
                            , drugName: 'Iron Gold'
                            , dosage: '500'
                            , dosageUnit: 'mg'
                            , duration: '2'
                            , durationType: 'Days'
                            , frequency: [
                                {
                                    morning: true
                                    , afternoon: false
                                    , evening: false
                                    , night: false
            }
          ]
                            , quantity: 2
                            , instructions: ''
        }

      ]
                    , recommendations: [
                        {
                            recommandId: 1
                            , recommandForId: 1
                            , recommandFor: ''
                            , comments: ''
        }
      ]
                    , isfollowUp: true
                    , followUpAfterId: 1
                    , followUpAfter: '1Day'
                    , isRefer: true
                    , referTo: ''
    }
  ]
}
        , {
            childId: 2
            , firstName: 'Maheshwari'
            , middleName: ''
            , lastName: ''
            , contactNo: 9618492447
            , dateOfBirth: '2015-01-01'
            , age: '1 Years 3 Months'
            , gender: 'female'
            , cityOrTown: 'vizag'
            , religion: 'Hindu'
            , nationality: 'Indian'
            , aadhaarNumber: '265385644663'
            , contacts: [
                {
                    contactTypeId: 1
                    , contactType: 'email'
                    , contact: 'swaroop@gmail.com'
    }
  ]
            , image: '3ilAppBase01/Web/assets/images/child2.jpg'
            , addressLine1: ''
            , addressLine2: ''
            , districtId: 1
            , district: 'AP'
            , stateId: 1
            , state: 'Indian'
            , pinCode: '530026'
            , familyDetails: [
                {
                    familyDetailsId: 1
                    , firstName: 'prasanth'
                    , middleName: ''
                    , lastName: 'kotti'
                    , contact: '9876543210'
                    , relationTypeId: 1
                    , relationType: 'Father'
    }
        
                , {
                    familyDetailsId: 2
                    , firstName: 'sravani'
                    , middleName: ''
                    , lastName: 'kotti'
                    , contact: '9885965782'
                    , relationTypeId: 2
                    , relation: 'Mother'
    }
  ]
            , familyHistory: [
                {
                    conditionTypeId: 1
                    , conditionType: 'Cancer'
                    , relationSideTypeId: 1
                    , relationSideType: 'Father Side'
                    , comments: ''
    }
        
                , {
                    conditionTypeId: 2
                    , conditionType: 'BloodPressure'
                    , relationSideTypeId: 2
                    , relationSideType: 'Mother Side'
                    , comments: ''
    }
  ]
            , surgicalHistory: [
                {
                    surgeryTypeId: 1
                    , surgeryType: 'Knee Surgery'
                    , comments: ''
                    , file: ''
                    , dateOfSurgery: ''
    }
        
                , {
                    surgeryTypeId: 2
                    , surgeryType: 'Shoulder Surgery'
                    , comments: ''
                    , file: ''
                    , dateOfSurgery: ''
    }
  ]
            , allergies: [
                {
                    allergyTypeId: 1
                    , allergyType: 'Skin Allegrgy'
                    , fromType: 'Days'
                    , fromCount: '20'
                    , comments: ''
    }
    
        , 
                , {
                    allergyTypeId: 2
                    , allergyType: 'Dust Allergey'
                    , fromType: 'Months'
                    , fromCount: '2'
                    , comments: ''
    }
  ]
            , immunizationVaccinationHistory: [
                {
                    immunizationTypeId: 1
                    , immunizationType: 'Hep B'
                    , ageOfChild: ''
                    , dosage: ''
                    , dosageUnit: ''
                    , dueDate: ''
                    , givenOn: ''
                    , givenBy: ''
                    , batchNumber: ''
    }
        
                , {
                    immunizationTypeId: 2
                    , immunizationType: 'OPV'
                    , ageOfChild: ''
                    , dosage: ''
                    , dosageUnit: ''
                    , dueDate: ''
                    , givenOn: ''
                    , givenBy: ''
                    , batchNumber: ''
    }
  ]
            , screenings: [
                {
                    screeningId: 1
                    , vitals: {
                        height: {
                            value1: ''
                            , value2: ''
                        }
                        , weight: {
                            value1: ''
                            , value2: ''
                        }
                        , mUAC: {
                            value1: ''
                            , value2: ''
                        }
                        , headCircumferrence: {
                            value1: ''
                            , value2: ''
                        }
                        , temperature: {
                            value1: ''
                            , value2: ''
                        }
                        , hemoglobin: {
                            value1: ''
                            , value2: ''
                        }
                    }
                    , immunizationVaccination: [
                        {
                            immunizationVaccinationId: 1
                            , immunizationTypeId: 1
                            , immunizationType: 'Hep B'
                            , dose: '1'
                            , ageOfChild: ''
                            , dosage: ''
                            , dosageUnit: ''
                            , dueDate: ''
                            , givenOn: ''
                            , givenBy: ''
                            , batchNumber: ''
        }
                
                        , {
                            immunizationVaccinationId: 2
                            , immunizationTypeId: 2
                            , immunizationType: 'OPV'
                            , dose: '1'
                            , ageOfChild: ''
                            , dosage: ''
                            , dosageUnit: ''
                            , dueDate: ''
                            , givenOn: ''
                            , givenBy: ''
                            , batchNumber: ''
        }
      ]
                    , symptoms: [
                        {
                            symptonId: 1
                            , sympton: 'itching of eyes'
                            , comments: ''
        }
                
                        , {
                            symptonId: 2
                            , sympton: 'itching of eyes 2'
                            , comments: ''
        }
      ]
                    , investigations: [
                        {
                            investigationId: 1
                            , condition: ''
                            , typeOfSampleId: 1
                            , typeOfSample: 'Blood'
                            , initiatedOn: '2016-23-06'
                            , file: ''
        }
                
                        , {
                            investigationId: 2
                            , condition: ''
                            , typeOfSampleId: 1
                            , typeOfSample: 'Blood'
                            , initiatedOn: '2016-23-06'
                            , file: ''
        }
      ]
                    , diagnosis: [
                        {
                            diagnosisId: 1
                            , healthCondition: ''
        }
                
                        , {
                            diagnosisId: 2
                            , healthCondition: ''
        }
      ]
                    , medications: [
                        {
                            medicationId: 1
                            , drugTypeId: 1
                            , drugType: 'Tablets'
                            , drugName: 'Pracetmol'
                            , dosage: '500'
                            , dosageUnit: 'mg'
                            , duration: '2'
                            , durationType: 'Days'
                            , frequency: [
                                {
                                    morning: true
                                    , afternoon: false
                                    , evening: false
                                    , night: false
            }
          ]
                            , quantity: 2
                            , instructions: ''
        }
                
                        , {
                            medicationId: 2
                            , drugTypeId: 2
                            , drugType: 'Syrup'
                            , drugName: ''
                            , dosage: '500'
                            , dosageUnit: 'ml'
                            , duration: '2'
                            , durationType: 'Days'
                            , frequency: [
                                {
                                    morning: true
                                    , afternoon: false
                                    , evening: false
                                    , night: false
            }
          ]
                            , quantity: 2
                            , instructions: ''
        }
      ]
                    , recommendations: [
                        {
                            recommandId: 1
                            , recommandForId: 1
                            , recommandFor: ''
                            , comments: ''
        }
      ]
                    , isfollowUp: true
                    , followUpAfterId: 1
                    , followUpAfter: '1Day'
                    , isRefer: true
                    , referTo: ''
    }
        
                , {
                    screeningId: 2
                    , vitals: {
                        height: {
                            value1: ''
                            , value2: ''
                        }
                        , weight: {
                            value1: ''
                            , value2: ''
                        }
                        , mUAC: {
                            value1: ''
                            , value2: ''
                        }
                        , headCircumferrence: {
                            value1: ''
                            , value2: ''
                        }
                        , temperature: {
                            value1: ''
                            , value2: ''
                        }
                        , hemoglobin: {
                            value1: ''
                            , value2: ''
                        }
                    }
                    , immunizationVaccination: [
                        {
                            immunizationVaccinationId: 1
                            , immunizationTypeId: 1
                            , immunizationType: 'Hep B'
                            , dose: '1'
                            , ageOfChild: ''
                            , dosage: ''
                            , dosageUnit: ''
                            , dueDate: ''
                            , givenOn: ''
                            , givenBy: ''
                            , batchNumber: ''
        }
                
                        , {
                            immunizationVaccinationId: 2
                            , immunizationTypeId: 2
                            , immunizationType: 'OPV'
                            , dose: '1'
                            , ageOfChild: ''
                            , dosage: ''
                            , dosageUnit: ''
                            , dueDate: ''
                            , givenOn: ''
                            , givenBy: ''
                            , batchNumber: ''
        }
      ]
                    , symptoms: [
                        {
                            symptonId: 1
                            , sympton: 'itching of eyes'
                            , comments: ''
        }
                
                        , {
                            symptonId: 2
                            , sympton: 'itching of eyes 2'
                            , comments: ''
        }
      ]
                    , investigations: [
                        {
                            investigationId: 1
                            , condition: ''
                            , typeOfSampleId: 1
                            , typeOfSample: 'Blood'
                            , initiatedOn: '2016-23-06'
                            , file: ''
        }
                
                        , {
                            investigationId: 2
                            , condition: ''
                            , typeOfSampleId: 1
                            , typeOfSample: 'Blood'
                            , initiatedOn: '2016-23-06'
                            , file: ''
        }
      ]
                    , diagnosis: [
                        {
                            diagnosisId: 1
                            , healthCondition: ''
        }
                
                        , {
                            diagnosisId: 2
                            , healthCondition: ''
        }
      ]
                    , medications: [
                        {
                            medicationId: 1
                            , drugTypeId: 1
                            , drugType: 'Tablets'
                            , drugName: 'Pracetmol'
                            , dosage: '500'
                            , dosageUnit: 'mg'
                            , duration: '2'
                            , durationType: 'Days'
                            , frequency: [
                                {
                                    morning: true
                                    , afternoon: false
                                    , evening: false
                                    , night: false
            }
          ]
                            , quantity: 2
                            , instructions: ''
        }
                
                        , {
                            medicationId: 2
                            , drugTypeId: 2
                            , drugType: 'Syrup'
                            , drugName: ''
                            , dosage: '500'
                            , dosageUnit: 'ml'
                            , duration: '2'
                            , durationType: 'Days'
                            , frequency: [
                                {
                                    morning: true
                                    , afternoon: false
                                    , evening: false
                                    , night: false
            }
          ]
                            , quantity: 2
                            , instructions: ''
        }
      ]
                    , recommendations: [
                        {
                            recommandId: 1
                            , recommandForId: 1
                            , recommandFor: ''
                            , comments: ''
        }
      ]
                    , isfollowUp: true
                    , followUpAfterId: 1
                    , followUpAfter: '1Day'
                    , isRefer: true
                    , referTo: ''
    }
  ]
}]

    var factory = {};

    factory.getChildrens = function () {
        return childrens;
    }

    return factory;

})