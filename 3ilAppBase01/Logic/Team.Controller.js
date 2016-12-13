/*//=============================================================================
// All rights reserved to Thrill Innovative Labs.
// THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
// OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
// LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
// FITNESS FOR A PARTICULAR PURPOSE.
//=============================================================================
//*****************************************************************************
//* Name		    	: Team.Controller.js 
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

var app = angular.module('ThrillAppBase.team', ['ThrillAppBase.teamLogic'
			 , 'ngCordova'
             , 'ThrillPerson.personBasicInfoLogic'
             , 'ThrillAppBase.teamTeamMemberLogic'
             , 'ThrillAppBase.teamRoleLogic'
             , 'ThrillAppBase.thrillAppBasePersonLogic'
			 , 'ThrillFrameworkLibrary.geo'
			 , 'ThrillFrameworkLibrary.Network'
			 , 'ThrillCnnWebClient.appConfig'
			 , 'ThrillFrameworkLibrary.appLogger'
	])
    /*Setup team Controller */
app.controller('TeamController', function ($scope,
    $http,
    thrillAppBasePersonLogic,
    teamRoleLogic,
    teamTeamMemberLogic,
    $localStorage,
    personBasicInfoLogic,
    teamLogic,
    $state,
    $stateParams,
    appConfig,
    appLogger,SweetAlert) {

    getLabels(appConfig.CULTURE_NAME);
    getMessages(appConfig.CULTURE_NAME);
    getBranches($localStorage.organizationKey);
    getRoles();
    // getStaffList($localStorage.organizationKey);

    /*get labels with selected language*/
    function getLabels(cultureName) {
        var currentFileName = "Team";
        $http.get("3ilAppBase01/Languages/" + currentFileName + "." + cultureName + ".json").then(function (response) {
            bindLabels(response.data);

        });
    }
    $scope.image_source = "3ilAppBase01/Web/assets/images/default-user.png";

    /*to upload image*/
    $scope.setFile = function (element) {

        $scope.currentFile = element.files[0];
        var reader = new FileReader();
        reader.onload = function (event) {
                $scope.image_source = event.target.result
                $scope.$apply()
            }
            // when the file is read it triggers the onload event above.
        reader.readAsDataURL(element.files[0]);
    }


    function getMessages(cultureName) {
        var alertMessageName = "AlertMessages";

        $http.get("3ilAppBase01/Languages/" + alertMessageName + "." + cultureName + ".json").then(function (response) {
            $scope.alertMessageLabels = response.data.messages;
        });
    }

    function getBranches(organizationKey) {
        thrillAppBasePersonLogic.getBranchesByRootOrganization(organizationKey).then(function (response) {

            $scope.allBranches = response;
            console.log($scope.allBranches);


        }, function (err) {

            console.error('ERR', err);

        });

    };

    function getRoles() {
        teamRoleLogic.getAllTeamRoles().then(function (response) {

            $scope.roles = response;
            console.log($scope.roles);


        }, function (err) {

            console.error('ERR', err);

        });

    };

    function getStaffList(organizationKey) {

        thrillAppBasePersonLogic.getStaff(organizationKey).then(function (response) {

            var i;
            var personArray = [];
            for (i = 0; i < response.length; i++) {
                var personKey = response[i].personKey;

                personBasicInfoLogic.getPersonBasicInfoById(personKey).then(function (personresponse) {

                    var personObject = {
                        personname: personresponse.firstName + personresponse.lastName,
                        personkey: personresponse.referenceKey
                    }


                    personArray.push(personObject)
                    if (i == response.length) {

                        $scope.persons = personArray;

                    }




                    /* console.log(response.data[0].middleName);
                     console.log(response.data[0].lastName);*/

                })



            }




            //alert(JSON.stringify($scope.childerenlist));

        });


    }
    /*bind labels with selected language */
    function bindLabels(data) {
        /* var labels = {
		 teamTitle: data.labels.teamTitle,
		 teamDescription: data.labels.teamDescription,
              teamLogoKey:data.labels.teamLogoKey,
        teamDocFolderKey:data.labels.teamDocFolderKey,
        AssociatedOrganizationKey:data.labels.associatedOrganizationKey,
        RootOrganizationKey:data.labels.rootOrganizationKey,
		 submit: data.labels.submit,
             update: data.labels.update,
		 teamHeading: data.labels.teamHeading
	 };*/

        $scope.labelsTeam = data.labels;

    };

    var entitykey = DrawCaptcha();
    var teamEntityKey;





    /*Perform the CRUD (Create, Read, Update & Delete) operations of Team*/
    /*Method for calling  add Team */
    $scope.addTeam = function () {
        if (appConfig.APP_MODE == 'offline') {
            $scope.entityTeam.teamKey = entitykey;
        }

        $scope.entityTeam.RootOrganizationKey = $localStorage.organizationKey;

        teamLogic.addTeam($scope.entityTeam).then(function (response) {
         SweetAlert.swal({
                    title: "Team",
                    text: "Added successfully",
                    type: "success",
                    confirmButtonColor: "#007AFF"
                }, function() {
                    $state.go('app.teamList');
                });
        

           
        }, function (err) {
            appLogger.error('ERR', err);
        });
    };

    /*Method for calling  update Team*/
    $scope.updateTeam = function () {

        $scope.entityTeam.RootOrganizationKey = $localStorage.organizationKey;
       // appLogger.alert(JSON.stringify($scope.entityTeam));
        teamLogic.updateTeam($scope.entityTeam, $stateParams.teamKey).then(function (response) {
              SweetAlert.swal({
                    title: "Team",
                    text: "Updated successfully",
                    type: "success",
                    confirmButtonColor: "#007AFF"
                }, function() {
                    $state.go('app.teamList');
                });
            
           
        }, function (err) {
            appLogger.error('ERR', err);
        });
    };
    $localStorage.teamKey = $stateParams.teamKey;
    /*Method for  retrieving  Team details*/
    if ($stateParams.teamKey) {

        teamLogic.getTeamByTeamKey($stateParams.teamKey).then(function (response) {
                console.log(response);
                $scope.entityTeam = {};

                $scope.entityTeam.teamKey = response[0].teamkey;
                $scope.entityTeam.teamTitle = response[0].teamtitle;



                if (response[0].teamlogokey != null && response[0].teamlogokey != undefined) {
                    $scope.profilePic = "3ilAppBase01/Web/assets/images/loading.gif";

                    var folderKey = response[0].teamdocfolderkey;
                    var fileKey = response[0].teamlogokey;
                    teamLogic.getProfilePicture(folderKey, fileKey).then(function (pictureResponse) {

                        $scope.profilePic = pictureResponse.FileBin
                    })
                }
                /*$scope.entityTeam.teamLogoKey = response[0].teamlogokey;
                $scope.entityTeam.teamDocFolderKey = response[0].teamdocfolderkey;*/
                $scope.entityTeam.teamDescription = response[0].teamdescription;
                $scope.entityTeam.AssociatedOrganizationKey = response[0].associatedorganizationkey;
                $scope.entityTeam.RootOrganizationKey = response[0].rootorganizationkey;
            }

            ,
            function (err) {
                appLogger.error('ERR', err);
            });
    }




    ///image upload///
    $scope.profilePic = "3ilAppBase01/Web/assets/images/organization3.png";
    $scope.fileChange = function () {
        // alert('file change event');
        $scope.profilePic = URL.createObjectURL(event.target.files[0]);
        $scope.$apply();
    }









}); // End of App Controller