/*//=============================================================================
// All rights reserved to Thrill Innovative Labs.
// THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
// OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
// LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
// FITNESS FOR A PARTICULAR PURPOSE.
//=============================================================================
//*****************************************************************************
//* Name		    	: ExaminationTypeList.Controller.js 
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

	 var app  = angular.module('ThrillAcademic.examinationTypeList', ['ThrillAcademic.examinationTypeLogic'
			
			 , 'ngCordova'
			 , 'ThrillFrameworkLibrary.geo'
			 , 'ThrillFrameworkLibrary.Network'
			 , 'ThrillCnnWebClient.appConfig'
			 , 'ThrillFrameworkLibrary.appLogger'
	])
    /*Setup examinationType Controller */
	 app.controller('ExaminationTypeListController', function ($scope, $http, examinationTypeLogic, appConfig, appLogger) {
		 getLabels(appConfig.CULTURE_NAME);
		 getMessages(appConfig.CULTURE_NAME);

/*get labels with selected language*/
    function getLabels(cultureName) {
        var currentFileName = "ExaminationType";
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
		 var labels = {
		 examinationTypeTitle: data.labels.examinationTypeTitle,
		 edit: data.labels.edit,
		 delete: data.labels.delete,
		 examinationTypeList: data.labels.examinationTypeList,
		 examinationTypeHeading: data.labels.examinationTypeHeading
	 };

	 $scope.labelsExaminationType = labels;

};
		 var refresh = function () {
			 examinationTypeLogic.getAllExaminationTypes().then(function (response) {
			 	//console.log(JSON.stringify(response));
				 $scope.examinationTypeCollection = response;
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


	 /*Method for calling  deleting   ExaminationType*/
	 $scope.deleteExaminationType = function (examinationTypeEntityKey) {
	 	var del = confirm("Are you sure you want to Delete ?");
	 	if(del==true)
	 	{
		 examinationTypeLogic.deleteExaminationType(examinationTypeEntityKey).then(function (response) {
			alert("Deleted Successfully");
		 refresh();
			 }, function (err) {
				 appLogger.error('ERR', err);
			 });
		}
		 };

}); // End of App Controller

