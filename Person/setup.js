/*=======================================================================
 All rights reserved to Thrill Innovative Labs.
 THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
 OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
 LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
 FITNESS FOR A PARTICULAR PURPOSE.
===========================================================================
****************************************************************************
 Name                :  
 Type                : Javascript and JQuery 
 Description         :
 References          :
 Author              :  
 Created Date        :  
****************************************************************************
MODIFICATION LOG
**************************************************************************** 
Ver Date         Modified By            Description
****************************************************************************  
Code Review LOG
**************************************************************************** 
Ver        Date                Code Review By            Observations
****************************************************************************
*/
angular.module('ThrillPerson.deviceInfo', ["ng.deviceDetector"])
    .controller('myCtrl', function (deviceDetector, $location, $http) {
        var vm = this;
        vm.data = deviceDetector;

        $http.get("common/appconfig.json").then(function (response) {

            var browserVersion = response.data[0].browser_version;
            var os = response.data[0].os;
            var osVersion = response.data[0].os_version;
            if (deviceDetector.browser_version >= browserVersion) {

                //alert('Success Browser Version: ' + browserVersion + ' OS: ' + os);
                $location.path('/employee');

            } else {

                alert('Lowervertion Browser Version: ' + browserVersion + ' OS: ' + os);
            }
        })

        //vm.allData = JSON.stringify(vm.data, null, 2);
    })