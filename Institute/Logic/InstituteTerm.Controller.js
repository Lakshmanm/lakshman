/*//=============================================================================
// All rights reserved to Thrill Innovative Labs.
// THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
// OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
// LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
// FITNESS FOR A PARTICULAR PURPOSE.
//=============================================================================
//*****************************************************************************
//* Name		    	: Term.Controller.js 
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
var app = angular.module('ThrillInstitute.instituteTerm', ['ThrillAcademic.termLogic'

       , 'ThrillInstitute.instituteTermLogic'

        , 'ThrillAcademic.coursLogic'



        , 'ngCordova'



        , 'ThrillFrameworkLibrary.geo'



        , 'ThrillFrameworkLibrary.Network'



        , 'ThrillCnnWebClient.appConfig'



        , 'ThrillFrameworkLibrary.appLogger'



        , 'ThrillAcademic.boardLogic'

         , 'naif.base64'

        , 'ThrillAcademic.groupLogic'
    ])
app.config(['$compileProvider'
   , function ($compileProvider) {
        $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|tel|file|data):/);
}]);
/*Setup term Controller */
app.controller('instituteTermController', function ($scope, $http, instituteTermLogic, $q, groupLogic, boardLogic, SweetAlert, coursLogic, $localStorage, termLogic, $state, $stateParams, appConfig, appLogger) {
    getLabels(appConfig.CULTURE_NAME);
    getMessages(appConfig.CULTURE_NAME);
    /*get labels with selected language*/
    function getLabels(cultureName) {
        var currentFileName = "Term";
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

if($localStorage.RoleID==2)
    {
        
        $scope.savebtn=false;
    }
    else{
         $scope.savebtn=true;
           
    }
    


    
    $scope.saveTerm = function (entityTerm) {
        var object = {};
        var termKey = [];
        for (var i = 0; i < entityTerm.length; i++) {
            if (entityTerm[i].termCheck == true) {
                termKey.push(entityTerm[i].termKey);
                object = {
                    termKey: termKey
                    , instituteKey: $localStorage.instituteKey
                }
            }
            if (i == (entityTerm.length) - 1) {
                instituteTermLogic.addInstituteTerm(object).then(function (response) {
                    SweetAlert.swal({
                        title: "Term"
                        , text: "Assigned successfully"
                        , type: "success"
                        , confirmButtonColor: "#007AFF"
                    });
                }, function (err) {
                    appLogger.error('ERR', err);
                });
            }
        }
    }
    var mainresp = {};
    var secondresp = {};
    // method for boardLogic
    function getTerm() {
        termLogic.getAllTerms($localStorage.organizationKey).then(function (response) {
            var array = [];
            for (var i = 0; i < response.length; i++) {
                var object = {
                    startDate: response[i].startDate
                    , endDate: response[i].endDate
                    , folderKey: response[i].folderKey
                    , termKey: response[i].termKey
                    , termTitle: response[i].termTitle
                    , termCheck: false
                }
                array.push(object);
                if (i == (response.length) - 1) {
                    mainresp = {
                        data: array
                    }
                }
            }
            if ($stateParams.instituteKey != undefined) {
                instituteTermLogic.getTermByInstituteKey($stateParams.instituteKey).then(function (resp) {
                    var sarray = [];
                    for (var i = 0; i < resp.length; i++) {
                        var object = {
                            startDate: resp[i].StartDate
                            , endDate: resp[i].EndDate
                            , folderKey: resp[i].FolderKey
                            , termKey: resp[i].TermKey
                            , termTitle: resp[i].TermTitle
                            , termCheck: true
                        }
                        sarray.push(object);
                        if (i == (resp.length) - 1) {
                            secondresp = {
                                data: sarray
                            }
                        }
                    }

                    function merge(secondresp, mainresp) {
                        if (!secondresp.data) return {
                            data: mainresp.data
                        };
                        if (!mainresp.data) return {
                            data: secondresp.data
                        };
                        var final = {
                            data: secondresp.data
                        };
                        // merge
                        for (var i = 0; i < mainresp.data.length; i++) {
                            var item = mainresp.data[i];
                            insert(item, final);
                        }
                        return final;
                    }

                    function insert(item, obj) {
                        var data = obj.data;
                        var insertIndex = data.length;
                        for (var i = 0; i < data.length; i++) {
                            if (item.termKey == data[i].termKey) {
                                // ignore duplicates
                                insertIndex = -1;
                                break;
                            }
                        }
                        if (insertIndex == data.length) {
                            data.push(item);
                        }
                        else if (insertIndex != -1) {
                            data.splice(insertIndex, 0, item);
                        }
                    }
                    var final = merge(secondresp, mainresp);
                    $scope.termCollection = final.data;
                })
            }
            else {
                $scope.termCollection = response;
            }
        }, function (err) {
            appLogger.error('ERR', err);
        });
    }
    getTerm();
    var fileKey = {};
    $scope.dms = {};
    var FolderKey;
    $scope.save = true;
    $scope.update = false;
    var entitykey = DrawCaptcha();
    var termEntityKey;

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
    $scope.getCoursByGroupKey = function (groupKey) {
        coursLogic.getCoursByGroupKey(groupKey).then(function (response) {
            $scope.courseList = response;
        })
    }
    $scope.addTerm = function () {
        if (appConfig.APP_MODE == 'offline') {
            $scope.entityTerm.termKey = entitykey;
        }
        $scope.entityTerm.createdAppKey = "3il_App_Key";
        $scope.entityTerm.createdUserKey = "3il_User_Key";
        $scope.entityTerm.instanceOrganizationKey = $localStorage.organizationKey;
        delete $scope.entityTerm.boardKey;
        delete $scope.entityTerm.groupKey;
        var folderDetails = {
            "FolderName": $scope.entityTerm.termTitle
            , "EntityKey": entitykey
            , "EntityType": 'Organization'
        };
        termLogic.postDocumentsFolder(folderDetails).then(function (response) {
            console.log(JSON.stringify(response));
            var FolderKey = response[0].FolderKey;
            //console.log($scope.dms.documents);
            var redefinedObject = redefineObject($scope.dms.documents);
            $q.all(promiseGeneration(redefinedObject, FolderKey)).then(function (response) {
                alert("saved")
                $scope.entityTerm.FolderKey = FolderKey;
                termLogic.addTerm($scope.entityTerm).then(function (response) {
                    //appLogger.alert($scope.alertMessageLabels.coursSaved);
                    $scope.entityTerm = {};
                    $scope.termForm.$setPristine();
                    $scope.termForm.$setUntouched();
                    $scope.save = true;
                    $scope.update = false;
                    SweetAlert.swal({
                        title: "Term"
                        , text: "Assigned successfully"
                        , type: "success"
                        , confirmButtonColor: "#007AFF"
                    });
                    refresh();
                });
            }, function (err) {
                appLogger.error('ERR', err);
            });
        }, function (error) {
            console.log(error);
        });
    };

    function redefineObject(file) {
        var imageArray = [];
        for (var i in file) {
            var obj;
            obj = {
                fileName: file[i].filename
                , fileType: file[i].filetype
                , fileType: file[i].filetype
                , fileSize: file[i].filesize
                , fileBase64Data: file[i].base64
            }
            imageArray.push(obj);
            if (i == (file.length - 1).toString()) {
                //console.log(JSON.stringify(imageArray));
                return imageArray
            }
        }
    }

    function promiseGeneration(imageObject, FolderKey) {
        var promises = [];
        for (var i in imageObject) {
            promises.push(postFiles(imageObject[i], FolderKey));
            if (i == (imageObject.length - 1).toString()) return promises
        }
    }
    ///function to post file 
    function postFiles(fileObj, FolderKey) {
        var deferred = $q.defer();
        termLogic.postDocuments(fileObj, FolderKey).then(function (response) {
            console.log(response);
            deferred.resolve(response);
        }, function (error) {
            deferred.resolve(error);
        })
        return deferred.promise
    }
    /*Method for calling  update Term*/
    $scope.updateTerm = function () {
        delete $scope.entityTerm.boardKey;
        delete $scope.entityTerm.groupKey;
        var FolderKey = $scope.entityTerm.FolderKey;
        var redefinedObject = redefineObject($scope.dms.documents);
        $q.all(promiseGeneration(redefinedObject, FolderKey)).then(function (response) {
            alert("saved");
            termLogic.updateTerm($scope.entityTerm, $scope.entityTerm.termKey).then(function (response) {
                $scope.entityTerm = {};
                $scope.termForm.$setPristine();
                $scope.termForm.$setUntouched();
                $scope.save = true;
                $scope.update = false;
                SweetAlert.swal({
                    title: "Term"
                    , text: "Updated successfully"
                    , type: "success"
                    , confirmButtonColor: "#007AFF"
                });
                refresh();
            }, function (err) {
                appLogger.error('ERR', err);
            });
        }, function (err) {
            appLogger.error('ERR', err);
        });
    };
    $scope.organizationList = [{
        "instanceorganizationtitle": "org 1"
        , "instanceorganizationkey": "0829a334-5e27-11e6-9186-41e6368e6666"
    }, {
        "instanceorganizationtitle": "org 2"
        , "instanceorganizationkey": "0829a334-5e27-33e6-4444-41e6368e2437"
    }, {
        "instanceorganizationtitle": "org 3"
        , "instanceorganizationkey": "0829a334-5e27-33e6-9186-41e6368e9999"
    }];

    function getCourse() {
        coursLogic.getAllCourses().then(function (response) {
            $scope.courseList = response;
        }, function (err) {
            appLogger.error('ERR', err);
        });
    }
    getCourse();
    /*Method for  retrieving  Term details*/
    $scope.editTerm = function (termKey) {
        $scope.save = false;
        $scope.update = true;
        termLogic.getTermByTermKey(termKey).then(function (response) {
            $scope.entityTerm = {};
            $scope.entityTerm.boardKey = response[0].boardKey;
            $scope.getBoardGroups(response[0].boardKey);
            $scope.entityTerm.termKey = response[0].termKey;
            $scope.entityTerm.termTitle = response[0].termTitle;
            // $scope.entityTerm.courseTitle = response[0].coursetitle;
            $scope.entityTerm.groupKey = response[0].groupKey;
            $scope.getCoursByGroupKey(response[0].groupKey);
            $scope.entityTerm.courseKey = response[0].courseKey;
            $scope.entityTerm.instanceOrganizationKey = response[0].instanceorganizationkey;
            $scope.entityTerm.startDate = new Date(response[0].startDate);
            $scope.entityTerm.endDate = new Date(response[0].endDate);
            $scope.entityTerm.folderKey = response[0].folderKey;
            termLogic.getAllFileKeysbyFolderKey(response[0].folderKey).then(function (response) {
                console.log(response);
                $scope.fileDetails = response;
                //$scope.images = response;
                termLogic.getAllFilesDataByfileKey($scope.entityTerm.folderKey, response[0].FileKey).then(function (response) {
                    // console.log(response);
                    var a = document.createElement("a");
                    a.download = response[0].FileName;
                    //  a.href = response[0].FileBin;
                    // a.click();
                }, function (err) {
                    appLogger.error('ERR', err);
                });
            }, function (err) {
                appLogger.error('ERR', err);
            });
        }, function (err) {
            appLogger.error('ERR', err);
        });
    }
    $scope.getFile = function (fileKey) {
        var folderKey = $scope.entityTerm.folderKey;
        termLogic.getFile(fileKey, folderKey).then(function (response) {
            //console.log(response[0].FileBin);
            var a = document.createElement("a");
            a.download = response[0].FileName;
            a.href = response[0].FileBin;
            console.log(a.href);
            a.click();
        }, function (err) {
            appLogger.error('ERR', err);
        });
    }
    $scope.deleteFile = function (FileKey) {
        var folderKey = $scope.entityTerm.folderKey;
        termLogic.deleteFile(FileKey, folderKey).then(function (response) {
            alert('Deleted');
            // getFilesInfo(folderKey); 
            //getFolderInfo(folderKey);
        }, function (err) {
            appLogger.error('ERR', err);
        });
    };
    /*var refresh = function() {
        termLogic.getAllTerms($localStorage.organizationKey).then(function(response) {
            $scope.termCollection = response;
            $scope.sortColumn = "";
            $scope.reverseSort = false;
            $scope.sortData = function(column) {
                $scope.reverseSort = ($scope.sortColumn == column) ?
                    !$scope.reverseSort : false;
                $scope.sortColumn = column;
            }
            $scope.getSortClass = function(column) {
                    if ($scope.sortColumn == column) {
                        return $scope.reverseSort ? 'arrow-down' : 'arrow-up';
                    }
                    return '';
                },
                function(err) {
                    appLogger.error('ERR', err);
                };
        });
    }
    refresh();*/
    /*Method for calling  deleting   Term*/
    $scope.deleteTerm = function (termEntityKey) {
        var del = confirm("Are you sure you want to Delete ?");
        if (del == true) {
            termLogic.deleteTerm(termEntityKey).then(function (response) {
                $scope.entityTerm = {};
                $scope.termForm.$setPristine();
                $scope.termForm.$setUntouched();
                $scope.save = true;
                $scope.update = false;
                SweetAlert.swal({
                    title: "Term"
                    , text: "Deleted successfully"
                    , type: "success"
                    , confirmButtonColor: "#007AFF"
                });
                refresh();
            }, function (err) {
                appLogger.error('ERR', err);
            });
        }
    };
}); // End of App Controller