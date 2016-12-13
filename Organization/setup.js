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
S.No      Ver        Date                Code Review By            Observations
1         1.0       14-April-2016         Sri Venkatesh.T          Owner of this file mentioned as Subrahmanyam but he is not into organization component >
1         1.0       14-April-2016         Sri Venkatesh.T          osVersion varibale is never used remove it if not required.
1         1.0       14-April-2016         Sri Venkatesh.T          module was named as ThrillArchSample ,give a meaningful name.
1         1.0       14-April-2016         Sri Venkatesh.T           $location.path('/employee'); still it is redirecting to employee module remove it if not requried.
1         1.0       14-April-2016         Sri Venkatesh.T           Place page header in the index.html
****************************************************************************

*/
angular.module('ThrillArchSample.deviceInfo', ["ng.deviceDetector"])
    .controller('myCtrl', function(deviceDetector, $location, $http) {
        var vm = this;
        vm.data = deviceDetector;

        $http.get("common/appconfig.json").then(function(response) {

            var browserVersion = response.data[0].browser_version;
            var os = response.data[0].os;
            var osVersion = response.data[0].os_version;
            if (deviceDetector.browser_version >= browserVersion) {

                //alert('Success Browser Version: ' + browserVersion + ' OS: ' + os);
                $location.path('/employee');

            } else {

                alert('Lowervertion Browser Version: ' + browserVersion + ' OS: ' + os);
            }
        });

        //vm.allData = JSON.stringify(vm.data, null, 2);
    });