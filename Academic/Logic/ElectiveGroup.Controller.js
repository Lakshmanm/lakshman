/*//=============================================================================
// All rights reserved to Thrill Innovative Labs.
// THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
// OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
// LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
// FITNESS FOR A PARTICULAR PURPOSE.
//=============================================================================
//*****************************************************************************
//* Name		    	: ElectiveGroup.Controller.js 
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

var app = angular.module('ThrillAcademic.electiveGroup', ['ThrillAcademic.electiveGroupLogic'
			 , 'ThrillAcademic.termLogic'
			 , 'ngCordova'
	, 'ThrillAcademic.boardLogic'
	, 'ThrillAcademic.groupLogic'
	, 'ThrillAcademic.coursLogic'

			 , 'ThrillFrameworkLibrary.geo'
			 , 'ThrillFrameworkLibrary.Network'
			 , 'ThrillCnnWebClient.appConfig'
			 , 'ThrillFrameworkLibrary.appLogger'
])
/*Setup electiveGroup Controller */
app.controller('ElectiveGroupController', function ($scope, $http, termLogic, boardLogic, groupLogic, coursLogic, electiveGroupLogic, $state, $stateParams, $localStorage,SweetAlert, appConfig, appLogger) {
	getLabels(appConfig.CULTURE_NAME);
	getMessages(appConfig.CULTURE_NAME);

	/*get labels with selected language*/
    function getLabels(cultureName) {
        var currentFileName = "ElectiveGroup";
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
		/*var labels = {
		electiveGroupTitle: data.labels.electiveGroupTitle,
		minimumSubjects: data.labels.minimumSubjects,
		maximumSubjects: data.labels.maximumSubjects,
		submit: data.labels.submit,
		electiveGroupHeading: data.labels.electiveGroupHeading
	};*/

		$scope.labelsElectiveGroup = data.labels;

	};
	$scope.save = true;
	$scope.update = false;

	var entitykey = DrawCaptcha();
	var electiveGroupEntityKey;

    /*Perform the CRUD (Create, Read, Update & Delete) operations of ElectiveGroup*/
	/*Method for calling  add ElectiveGroup */
	$scope.addElectiveGroup = function () {
		if (appConfig.APP_MODE == 'offline') {
			$scope.entityElectiveGroup.electiveGroupKey = entitykey;
		}
		$scope.entityElectiveGroup.createdAppKey = "3il_App_Key​";
		$scope.entityElectiveGroup.createdUserKey = "3il_User_Key";
		$scope.entityElectiveGroup.instanceOrganizationKey = $localStorage.organizationKey;
		delete $scope.entityElectiveGroup.boardKey;
		delete $scope.entityElectiveGroup.groupKey;
		delete $scope.entityElectiveGroup.courseKey;
		electiveGroupLogic.addElectiveGroup($scope.entityElectiveGroup).then(function (response) {

			//appLogger.alert($scope.alertMessageLabels.electiveGroupSaved);
			$scope.entityElectiveGroup = {};
			refresh();
            $scope.save = true;
	        $scope.update = false;

			$scope.electiveGroupForm.$setPristine();
			$scope.electiveGroupForm.$setUntouched();
			SweetAlert.swal({
                title: "Elective Group",
                text: "Saved successfully",
                type: "success",
                confirmButtonColor: "#007AFF"
            });
	

			 }, function (err) {
		appLogger.error('ERR', err);
			 });
		 };


/*  function getTerm() {
	   termLogic.getAllTerms().then(function (response) {
	  $scope.termList=response;	
   }, function (err) {
	   appLogger.error('ERR', err);
	   
   });
}
   getTerm();*/


function getAllBoards() {
	boardLogic.getAllBoards($localStorage.organizationKey).then(function (response) {
		$scope.boardList = response;
	})
}
getAllBoards();

$scope.getBoardGroups = function (boardKey) {
	groupLogic.getBoardGroups(boardKey).then(function (response) {
		$scope.groupList = response;
	})
}

$scope.getGroupCourse = function (groupKey) {
	coursLogic.getCoursByGroupKey(groupKey).then(function (response) {
		$scope.courseList = response;
	})
}

$scope.getCourseTerm = function (courseKey) {
	termLogic.getTermByCourseKey(courseKey).then(function (response) {
		$scope.termList = response;
	})
}

/*Method for calling  update ElectiveGroup*/
$scope.updateElectiveGroup = function () {
	delete $scope.entityElectiveGroup.boardKey;
	delete $scope.entityElectiveGroup.groupKey;
	delete $scope.entityElectiveGroup.courseKey;
	electiveGroupLogic.updateElectiveGroup
		($scope.entityElectiveGroup, $scope.entityElectiveGroup.electiveGroupKey).then(function (response) {
			//appLogger.alert($scope.alertMessageLabels.electiveGroupUpdated);
			$scope.entityElectiveGroup = {};
			refresh();
            $scope.save = true;
			$scope.update = false;

            $scope.electiveGroupForm.$setPristine();
			$scope.electiveGroupForm.$setUntouched();
			SweetAlert.swal({
                title: "Elective Group",
                text: "Updated successfully",
                type: "success",
                confirmButtonColor: "#007AFF"
            });

		}, function (err) {
			appLogger.error('ERR', err);
		});
};

/*Method for  retrieving  ElectiveGroup details*/

$scope.editElectiveGroup = function (electiveGroupKey) {
	$scope.save = false;
	$scope.update = true;
	electiveGroupLogic.getElectiveGroupByElectiveGroupKey(electiveGroupKey).then(function (response) {

		$scope.entityElectiveGroup = {};
		$scope.entityElectiveGroup.electiveGroupKey = response[0].electiveGroupKey;
		$scope.entityElectiveGroup.electiveGroupTitle = response[0].electiveGroupTitle;
		$scope.entityElectiveGroup.boardKey = response[0].boardKey;
		$scope.getBoardGroups(response[0].boardKey);
		$scope.entityElectiveGroup.groupKey = response[0].groupKey;
		$scope.getGroupCourse(response[0].groupKey);
		$scope.entityElectiveGroup.courseKey = response[0].courseKey;
		$scope.getCourseTerm(response[0].courseKey);
		$scope.entityElectiveGroup.termKey = response[0].termKey;

		$scope.entityElectiveGroup.instanceOrganizationKey = response[0].instanceOrganizationKey;
		$scope.entityElectiveGroup.minimumSubjects = response[0].minimumSubjects;
		$scope.entityElectiveGroup.maximumSubjects = response[0].maximumSubjects;
	}, function (err) {
		appLogger.error('ERR', err);
	});
}

var refresh = function () {
			 electiveGroupLogic.getAllElectiveGroups($localStorage.organizationKey).then(function (response) {
		$scope.electiveGroupCollection = response;
		console.log(response);

		$scope.sortColumn = "";
		$scope.reverseSort = false;
		$scope.sortData = function (column) {
			$scope.reverseSort = ($scope.sortColumn == column) ?
				!$scope.reverseSort : false;
			$scope.sortColumn = column;
		}
		$scope.getSortClass = function (column) {
			if ($scope.sortColumn == column) {
				return $scope.reverseSort ? 'arrow-down' : 'arrow-up';
			}
			return '';
		}, function (err) {
			appLogger.error('ERR', err);
		};
	});
}
refresh();


/*Method for calling  deleting   ElectiveGroup*/
$scope.deleteElectiveGroup = function (electiveGroupEntityKey) {
SweetAlert.swal({
            title: "Are you sure?"
            , text: "Your want to delete this elective group"
            , type: "warning"
            , showCancelButton: true
            , confirmButtonColor: "#DD6B55"
            , confirmButtonText: "Yes, delete it!"
            , cancelButtonText: "No, cancel!"
            , closeOnConfirm: false
            , closeOnCancel: false
        }, function (isConfirm) {
            if (isConfirm) {
                electiveGroupLogic.deleteElectiveGroup(electiveGroupEntityKey).then(function (response) {
			//appLogger.alert($scope.alertMessageLabels.electiveGroupDeleted);
			$scope.entityElectiveGroup = {};
			$scope.save = true;
			$scope.update = false;
			$scope.electiveGroupForm.$setPristine();
			$scope.electiveGroupForm.$setUntouched();
				
                    SweetAlert.swal({
                        title: "Elective Group"
                        , text: "Deleted successfully"
                        , type: "success"
                        , confirmButtonColor: "#007AFF"
                    });
                    refresh();
                }, function (err) {
                    appLogger.error('ERR', err);
                });
            }
            else {
                SweetAlert.swal({
                    title: "Cancelled"
                    , text: "Your elective group is safe :)"
                    , type: "error"
                    , confirmButtonColor: "#007AFF"
                });
            }
        });
    
    
    
    
	
};


}); // End of App Controller

