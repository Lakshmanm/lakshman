/*//=============================================================================
// All rights reserved to Thrill Innovative Labs.
// THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
// OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
// LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
// FITNESS FOR A PARTICULAR PURPOSE.
//=============================================================================
//*****************************************************************************
//* Name		    	: ExamSchedule.Controller.js 
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
var app = angular.module('ThrillAcademic.examSchedule', ['ThrillAcademic.examScheduleLogic'
        // , 'ThrillAcademic.masterDataLogic'

        , 'ngCordova'

        , 'ThrillAcademic.boardLogic'

        , 'ThrillAcademic.groupLogic'

        , 'ThrillAcademic.coursLogic'

        , 'ThrillAcademic.subjectLogic'

        , 'ThrillAcademic.examinationTypeLogic'

        , 'ThrillAcademic.examinationLogic'

        , 'ThrillAcademic.termLogic'

        , 'ThrillFrameworkLibrary.geo'

        , 'ThrillFrameworkLibrary.Network'

        , 'ThrillCnnWebClient.appConfig'

        , 'ThrillFrameworkLibrary.appLogger'
    ])
    /*Setup examSchedule Controller */
app.controller('ExamScheduleController', function($scope, $http, SweetAlert, examScheduleLogic, examinationTypeLogic, examinationLogic, termLogic, groupLogic, coursLogic, $state, subjectLogic, boardLogic, $localStorage, $stateParams, appConfig, appLogger) {
    getLabels(appConfig.CULTURE_NAME);
    getMessages(appConfig.CULTURE_NAME);
    /*get labels with selected language*/
    function getLabels(cultureName) {
        var currentFileName = "ExamSchedule";
        console.log("Academic/Languages/" + currentFileName + "." + cultureName + ".json");
        $http.get("Academic/Languages/" + currentFileName + "." + cultureName + ".json").then(function(response) {
            bindLabels(response.data);
        });
    }

    function getMessages(cultureName) {
        var alertMessageName = "ExamSchedule";
        $http.get("Academic/Languages/" + alertMessageName + "." + cultureName + ".json").then(function(response) {
            $scope.alertMessageLabels = response.data.messages;
        });
    }
    /*bind labels with selected language */
    function bindLabels(data) {
        $scope.labelsExamSchedule = data.labels;
    };
    var entitykey = DrawCaptcha();
    var examScheduleEntityKey;
    /*Perform the CRUD (Create, Read, Update & Delete) operations of ExamSchedule*/
    /*Method for calling  add ExamSchedule */
    $scope.save = true;
    $scope.update = false;
    $scope.dateConversion = function(dateToBeConverted) {
        return new Date(dateToBeConverted);
    }

 $scope.startHoursList = [{ "Title": "1", "Id": 1 ,"startHoursKey":"asfgdh-ggfh3-jhkds32-sdffs"}, { "Title": "2", "Id": 2,"startHoursKey":"dfshg2-d123-32-sdfh23-sdss" },{ "Title": "3", "Id": 3 ,"startHoursKey":"3333fr-ggfh3-jhkds32-sdffs"},{ "Title": "4", "Id": 4 ,"startHoursKey":"83judh-ggfh3-jhkds32-sdffs"},{ "Title": "5", "Id": 5 ,"startHoursKey":"83judh-fgfgf-jhkds32-sdffs"},{ "Title": "6", "Id": 6 ,"startHoursKey":"zxczudh-gzxc3-jhkds32-sdffs"},{ "Title": "7", "Id": 7 ,"startHoursKey":"zXxZ-ggfh3-jhkds32-sdffs"},{ "Title": "8", "Id": 8 ,"startHoursKey":"83judh-zxczc-jhkds32-sdffs"},{ "Title": "9", "Id": 9 ,"startHoursKey":"zxcudh-ggfh3-jhkds32-sdffs"},{ "Title": "10", "Id": 10,"startHoursKey":"czxcdh-ggfh3-jhkds32-sdffs"},{ "Title": "11", "Id": 11 ,"startHoursKey":"fsdfsdf-ggfh3-jhkds32-sdffs"},{ "Title": "12", "Id": 12 ,"startHoursKey":"3443-343-343-3433"},{ "Title": "13", "Id": 13 ,"startHoursKey":"3ffdf-werw-343-3433"},{ "Title": "14", "Id": 14 ,"startHoursKey":"werwwe-fgf-343-3433"},{ "Title": "15", "Id": 15 ,"startHoursKey":"sdfs-sdfds-343-3433"},{ "Title": "16", "Id": 16 ,"startHoursKey":"ZxZ-ZX3-343-3433"},{ "Title": "17", "Id": 17 ,"startHoursKey":"sdfsdf-sdfs-343-3433"},{ "Title": "18", "Id": 18 ,"startHoursKey":"zczxds-343-343-3433"},{ "Title": "19", "Id": 19 ,"startHoursKey":"zczxc-3asda-343-3433"},{ "Title": "20", "Id": 20 ,"startHoursKey":"3sdfdsf3-3fgf3-343-3433"},{ "Title": "21", "Id": 21 ,"startHoursKey":"xvcxv3-bvvv-343-3433"},{ "Title": "22", "Id": 22 ,"startHoursKey":"vnghjgh3-bvvv-343-3433"},{ "Title": "23", "Id": 23 ,"startHoursKey":"vcxv3-bvvv-343-3433"},{ "Title": "24", "Id": 24 ,"startHoursKey":"xcvx3-bvvv-cbcvb-3433"}]

 $scope.endHoursList = [{ "Title": "1", "Id": 1 ,"endHourssKey":"hgjghjhdh-ggfh3-jhkds32-sdffs"}, { "Title": "2", "Id": 2,"endHourssKey":"dfghgfhfgh2-d123-32-sdfh23-sdss" },{ "Title": "3", "Id": 3 ,"endHourssKey":"hgjghjhgr-ggfh3-jhkds32-sdffs"},{ "Title": "4", "Id": 4 ,"endHourssKey":"ghfghfg-ggfh3-jhkds32-sdffs"},{ "Title": "5", "Id": 5 ,"endHourssKey":"gfhghjhgjh-fgfgf-jhkds32-sdffs"},{ "Title": "6", "Id": 6 ,"endHourssKey":"fhfghf-gzxc3-jhkds32-sdffs"},{ "Title": "7", "Id": 7 ,"endHourssKey":"zfghfh-ggfh3-jhkds32-sdffs"},{ "Title": "8", "Id": 8 ,"endHourssKey":"gjgjhgj-zxczc-jhkds32-sdffs"},{ "Title": "9", "Id": 9 ,"endHourssKey":"fghfghfg-ggfh3-jhkds32-sdffs"},{ "Title": "10", "Id": 10,"endHourssKey":"gdfgd-ggfh3-jhkds32-sdffs"},{ "Title": "11", "Id": 11 ,"endHourssKey":"dfgdfg-ggfh3-jhkds32-sdffs"},{ "Title": "12", "Id": 12 ,"endHourssKey":"fhgfghf-343-343-3433"},{ "Title": "13", "Id": 13 ,"endHourssKey":"3ffdf-werw-343-3433"},{ "Title": "14", "Id": 14 ,"endHourssKey":"dgfhgfhgfhgfhgh-fgf-343-3433"},{ "Title": "15", "Id": 15 ,"endHourssKey":"dfgdfgdf-sdfds-343-3433"},{ "Title": "16", "Id": 16 ,"endHourssKey":"dfgdfgdg-ZX3-343-3433"},{ "Title": "17", "Id": 17 ,"endHourssKey":"fgdgfd-sdfs-343-3433"},{ "Title": "18", "Id": 18 ,"endHourssKey":"fdgdgdg-343-343-3433"},{ "Title": "19", "Id": 19 ,"endHourssKey":"fdsfdsf-3asda-343-3433"},{ "Title": "20", "Id": 20 ,"endHourssKey":"sfsdfdsf-3fgf3-343-3433"},{ "Title": "21", "Id": 21 ,"endHourssKey":"sdfsfd-bvvv-343-3433"},{ "Title": "22", "Id": 22 ,"endHourssKey":"fsdfsdf-bvvv-343-3433"},{ "Title": "23", "Id": 23 ,"endHourssKey":"hjkhkhk-bvvv-343-3433"},{ "Title": "24", "Id": 24 ,"endHourssKey":"fsfdsf-bvvv-cbcvb-3433"}]
 $scope.endMinutesist = [{ "Title": "1", "Id": 1 ,"endMinutesKey":"gdfgh-ggfh3-jhkds32-sdffs"}, { "Title": "2", "Id": 2,"endMinutesKey":"hjkhjk-d123-32-sdfh23-sdss" },{ "Title": "3", "Id": 3 ,"endMinutesKey":"ghfhgr-ggfh3-jhkds32-sdffs"},{ "Title": "4", "Id": 4 ,"endMinutesKey":"hghjhgj-ggfh3-jhkds32-sdffs"},{ "Title": "5", "Id": 5 ,"endMinutesKey":"dfgdfg-fgfgf-jhkds32-sdffs"},{ "Title": "6", "Id": 6 ,"endMinutesKey":"fghfghgf-gzxc3-jhkds32-sdffs"},{ "Title": "7", "Id": 7 ,"endMinutesKey":"zXxZ-dfgdgd-jhkds32-sdffs"},{ "Title": "8", "Id": 8 ,"endMinutesKey":"gfhfhfh-zxczc-jhkds32-sdffs"},{ "Title": "9", "Id": 9 ,"endMinutesKey":"ghfhfh-ggfh3-jhkds32-sdffs"},{ "Title": "10", "Id": 10,"endMinutesKey":"fghfhf-ggfh3-jhkds32-sdffs"},{ "Title": "11", "Id": 11 ,"endMinutesKey":"fhgffhdf-ggfh3-jhkds32-sdffs"},{ "Title": "12", "Id": 12 ,"endMinutesKey":"fghfhfhkk-343-343-3433"},{ "Title": "13", "Id": 13 ,"endMinutesKey":"hjghjj-werw-343-3433"},{ "Title": "14", "Id": 14 ,"endMinutesKey":"ghjghjgh-fgf-343-3433"},{ "Title": "15", "Id": 15 ,"endMinutesKey":"s767s-sdfds-343-3433"},{ "Title": "16", "Id": 16 ,"endMinutesKey":"6786hjghj-ZX3-343-3433"},{ "Title": "17", "Id": 17 ,"endMinutesKey":"s65757-sdfs-343-3433"},{ "Title": "18", "Id": 18 ,"endMinutesKey":"gjhj65-343-343-3433"},{ "Title": "19", "Id": 19 ,"endMinutesKey":"rtyr456c-3asda-343-3433"},{ "Title": "20", "Id": 20 ,"endMinutesKey":"345646f3-3fgf3-343-3433"},{ "Title": "21", "Id": 21 ,"endMinutesKey":"yutut3-bvvv-343-3433"},{ "Title": "22", "Id": 22 ,"endMinutesKey":"etr5453-bvvv-343-3433"},{ "Title": "23", "Id": 23 ,"endMinutesKey":"rtyr-bvvv-343-3433"},{ "Title": "24", "Id": 24 ,"endMinutesKey":"sfdsdf-bvvv-cbcvb-3433"},{ "Title": "25", "Id": 25 ,"endMinutesKey":"shjhjghj-bvvv-cbcvb-3433"},{ "Title": "26", "Id": 26 ,"endMinutesKey":"dfg-jfh-cbcvb-3433"},{ "Title": "27", "Id": 27 ,"endMinutesKey":"zcvbcb-fhgfh-cbcvb-3433"},{ "Title": "28", "Id": 28 ,"endMinutesKey":"fghfhgf-dgfgfd-cbctuytvb-3433"},{ "Title": "29", "Id": 29 ,"endMinutesKey":"shjhjghj-bvvv-hhjhgjhgjjgh-3433"},{ "Title": "30", "Id": 30 ,"endMinutesKey":"dfgdfgdfg-bvvv-dfgd-3433"},{ "Title": "31", "Id": 31 ,"endMinutesKey":"nvnncbncvb-dfgdg-dfgd-3433"},{ "Title": "32", "Id": 32 ,"endMinutesKey":"dgdfgnbmn-nm,n-cbcvb-3433"},{ "Title": "33", "Id": 33 ,"endMinutesKey":"lkjjkh-bvvv-t564-3433"},{ "Title": "34", "Id": 34 ,"endMinutesKey":"kljltyuty-fsdf-cbcvb-3433"},{ "Title": "35", "Id": 35 ,"endMinutesKey":"ghjghj-rt454-cbcvb-3433"},{ "Title": "36", "Id": 36 ,"endMinutesKey":"n-hjkhjkh-bvvv-cbcvb-3433"},{ "Title": "37", "Id": 37 ,"endMinutesKey":"shjhjghj-bvvv-cbcvb-hhggdgf"},{ "Title": "38", "Id": 38 ,"endMinutesKey":"hfghrytrytryr-bvvv-cbcvb-3433"},{ "Title": "39", "Id": 39 ,"endMinutesKey":"shjhjghj-hkyiutuytutyur-cbcvb-3433"},{ "Title": "40", "Id": 40 ,"endMinutesKey":"grttertert-bvvv-cbcvb-3433"},{ "Title": "41", "Id": 41 ,"endMinutesKey":"hrtyrtytry-bvvv-rtyrtyr-3433"},{ "Title": "42", "Id": 42 ,"endMinutesKey":"shjhjghj-fghrytryr-cbcvb-3433"},{ "Title": "25", "Id": 43 ,"endMinutesKey":"hjghbjghjjt-bvvv-yuut-3433"},{ "Title": "44", "Id": 44 ,"endMinutesKey":"shjhjghj-fghfhryyt-cbcvb-3433"},{ "Title": "45", "Id": 45 ,"endMinutesKey":"shjhjghj-bvvv-rtytryrrtyr-3433"},{ "Title": "46", "Id": 46 ,"endMinutesKey":"fdghfghf-gfhfgh-cbcvb-3433"},{ "Title": "47", "Id": 47 ,"endMinutesKey":"hjghjhgjhg-bvvv-cbcvb-ghjg"},{ "Title": "48", "Id": 48 ,"endMinutesKey":"ghjgjtyuty-bvvv-cbcvb-vbnvbn"},{ "Title": "49", "Id": 49 ,"endMinutesKey":"fghfgh-fghfhgf-cbcvb-sdffs"},{ "Title": "50", "Id": 50 ,"endMinutesKey":"lppipoi-bvvv-cbcvb-3433"},{ "Title": "51", "Id": 51 ,"endMinutesKey":"5645646-bvvv-cbcvb-3433"},{ "Title": "52", "Id": 52 ,"endMinutesKey":"5465464343-bvvv-cbcvb-3433"},{ "Title": "53", "Id": 53 ,"endMinutesKey":"tryry54646-bvvv-cbcvb-3433"},{ "Title": "54", "Id": 54 ,"endMinutesKey":"dfgdg-464564-cbcvb-3433"},{ "Title": "55", "Id": 55 ,"endMinutesKey":"jkljyu57576-bvvv-cbcvb-3433"},{ "Title": "56", "Id": 56 ,"endMinutesKey":"3454353-gfhfhf-cbcvb-3433"},{ "Title": "57", "Id": 57 ,"endMinutesKey":"r4564654646546-bvvv-cbcvb-3433"},{ "Title": "58", "Id": 58 ,"endMinutesKey":"shjhjghj-fgdgd34534-cbcvb-3433"},{ "Title": "59", "Id": 59 ,"endMinutesKey":"43245354cvbvcb-vnfghgf-cbcvb-3433"},{ "Title": "60", "Id": 60 ,"endMinutesKey":"4234cvbcvb-dgfgdfgdf-cbcvb-3433"}]
 $scope.startMinutesList = [{ "Title": "1", "Id": 1 ,"startMinutesKey":"67868-ggfh3-jhkds32-sdffs"},         { "Title": "2", "Id": 2,"startMinutesKey":"07889-d123-32-sdfh23-sdss" },
                            { "Title": "3", "Id": 3 ,"startMinutesKey":"hjkhkh-ggfh3-jhkds32-sdffs"},
                            { "Title": "4", "Id": 4 ,"startMinutesKey":"uyihjjg-ggfh3-jhkds32-sdffs"},
                            { "Title": "5", "Id": 5 ,"startMinutesKey":"hfhfg-fgfgf-jhkds32-sdffs"},
                            { "Title": "6", "Id": 6 ,"startMinutesKey":"ttrytr-gzxc3-jhkds32-sdffs"},
                            { "Title": "7", "Id": 7 ,"startMinutesKey":"tyryry-ggfh3-jhkds32-sdffs"},
                            { "Title": "8", "Id": 8 ,"startMinutesKey":"tyrytry-zxczc-jhkds32-sdffs"},
                            { "Title": "9", "Id": 9 ,"startMinutesKey":"xcvxcvcxv-ggfh3-jhkds32-sdffs"},
                            { "Title": "10", "Id": 10,"startMinutesKey":"tr34534-ggfh3-jhkds32-sdffs"},
                            { "Title": "11", "Id": 11 ,"startMinutesKey":"xcvxcvcxzv-ggfh3-jhkds32-sdffs"},
                            { "Title": "12", "Id": 12 ,"startMinutesKey":"5435343-343-343-3433"},
                            { "Title": "13", "Id": 13 ,"startMinutesKey":"fdgdfg434-werw-343-3433"},
                            { "Title": "14", "Id": 14 ,"startMinutesKey":"ghf54645-fgf-343-3433"},
                            { "Title": "15", "Id": 15 ,"startMinutesKey":"fdgd453-sdfds-343-3433"},
                            { "Title": "16", "Id": 16 ,"startMinutesKey":"cvbcrete-ZX3-343-3433"},
                            { "Title": "17", "Id": 17 ,"startMinutesKey":"cgfdghere-sdfs-343-3433"},
                            { "Title": "18", "Id": 18 ,"startMinutesKey":"dfgdtre-343-343-3433"},
                            { "Title": "19", "Id": 19 ,"startMinutesKey":"xfdsfdsfds-3asda-343-3433"},
                            { "Title": "20", "Id": 20 ,"startMinutesKey":"vxcvxvdf-3fgf3-343-3433"},
                            { "Title": "21", "Id": 21 ,"startMinutesKey":"fdgdfgfdg-bvvv-343-3433"},
                            { "Title": "22", "Id": 22 ,"startMinutesKey":"dgfdg-bvvv-343-3433"},
                            { "Title": "23", "Id": 23 ,"startMinutesKey":"fghfgh-bvvv-343-3433"},
                            { "Title": "24", "Id": 24 ,"startMinutesKey":"jhgjfghg-bvvv-cbcvb-3433"},
                            { "Title": "25", "Id": 25 ,"startMinutesKey":"setrtertehjhjghj-bvvv-cbcvb-3433"},
                            { "Title": "26", "Id": 26 ,"startMinutesKey":"dfg-jfheter345452432-cbcvb-3433"},
                            { "Title": "27", "Id": 27 ,"startMinutesKey":"zcvbcb-fhgfh-cbcvbfht3543534-3433"},
                            { "Title": "28", "Id": 28 ,"startMinutesKey":"fghfhgf-dgfgfd-cbctuytvb-343asdsert5333"},
                            { "Title": "29", "Id": 29 ,"startMinutesKey":"shjhjghj-bvvv-hhjhgjhgjjgh-34dasq3242432433"},
                             {"Title": "30", "Id": 30 ,"startMinutesKey":"dfgdfgdfg-bvvv-dfgdae2342435465d-3433"},
                             { "Title": "31", "Id": 31 ,"startMinutesKey":"nvnncbncvb-dfgdg-dsrw4322434dfgd-3433"},
                             { "Title": "32", "Id": 32 ,"startMinutesKey":"dgdfgnbmn-nm,n-cbcvb-3sdfsre53242433"},{ "Title": "33", "Id": 33 ,"startMinutesKey":"lkjjkhdsfsdrw542423-bvvv-t564-3433"},{ "Title": "34", "Id": 34 ,"startMinutesKey":"kljltyuty-fsdf-sdfsdfwerr2342cbcvb-3433"},{ "Title": "35", "Id": 35 ,"startMinutesKey":"ghjghj-rt454eter53453tert-cbcvb-3433"},{ "Title": "36", "Id": 36 ,"startMinutesKey":"n-hjkhjkh-bvvv-cbcvb-etetert5353453433"},{ "Title": "37", "Id": 37 ,"startMinutesKey":"shjhjghj-bvvv-cbcvert34534534b-hhggdgf"},{ "Title": "38", "Id": 38 ,"startMinutesKey":"hfghrytrytryr-bvvv-cbcverteterterb-3433"},{ "Title": "39", "Id": 39 ,"startMinutesKey":"shjhjghj-hkyiutuytutyur-cbcvb-ert3453453433"},{ "Title": "40", "Id": 40 ,"startMinutesKey":"grttertert-bvvv-cbcvfsf343543b-3433"},{ "Title": "41", "Id": 41 ,"startMinutesKey":"hrtyrtytry-bvvv-rtyrtyr-3sdfsfsdfsfsf433"},{ "Title": "42", "Id": 42 ,"startMinutesKey":"shjhjghj-fghrytryr-cbcvb-343sfrwrw432423"},{ "Title": "25", "Id": 43 ,"startMinutesKey":"hjghbjghjjt-bvvv-yuwrr23423423ut-3433"},{ "Title": "44", "Id": 44 ,"startMinutesKey":"shjhjghj-fghfhryyt-cbcvb-3df434244342433"},{ "Title": "45", "Id": 45 ,"endMinutesKey":"shjhjghj-bvvv-rtyrwrw23423442tryrrtyr-3433"},{ "Title": "46", "Id": 46 ,"startMinutesKey":"fdghfghf-gfhfgh-cbcvb-34rwr432423433"},{ "Title": "47", "Id": 47 ,"startMinutesKey":"hjghjhgjhg-bvvv-cbcvb-ghjdfgdgetrw4322g"},{ "Title": "48", "Id": 48 ,"endMinutesKey":"ghjgjtyuty-bvvv-cbcvb-vbnvwerwerbn"},{ "Title": "49", "Id": 49 ,"startMinutesKey":"fghfgh-fghwerwrfhgf-cbcvbewrerwe234234-sdffs"},{ "Title": "50", "Id": 50 ,"startMinutesKey":"lppipoi-bwerwer23423vvv-cbcvb-3433"},{ "Title": "51", "Id": 51 ,"startMinutesKey":"56456dfgdfgdg46-bvvv-cbcvb-3433"},{ "Title": "52", "Id": 52 ,"endMinutesKey":"5465464343-bvvv-cbcvb-3swer42343543433"},{ "Title": "53", "Id": 53 ,"endMinutesKey":"tryry54646-bvvv-cbcvb-34sretwtertee33"},{ "Title": "54", "Id": 54 ,"endMinutesKey":"dfgdg-464564-cbcvb-343etrert3"},{ "Title": "55", "Id": 55 ,"endMinutesKey":"jkljyu57576-bvvv-cbcvb-3423424233"},{ "Title": "56", "Id": 56 ,"startMinutesKey":"3454353-gfhfhf-cbcv4324423b-3433"},{ "Title": "57", "Id": 57 ,"startMinutesKey":"r4564654646546-bvvv-cbcvb-3433048844"},{ "Title": "58", "Id": 58 ,"endMinutesKey":"shjhjghj-fgdgd34534dghdkfjgh-3433"},{ "Title": "59", "Id": 59 ,"startMinutesKey":"43245354cvbvcb-vnfghgf-cbcvb-hjgfdfgdtyui99"},{ "Title": "60", "Id": 60 ,"startMinutesKey":"4234cvbcvb-jhdfgdjfhgjd-cbcvb-3433"}]




    function getAllBoards() {
        boardLogic.getAllBoards($localStorage.organizationKey).then(function(response) {
            $scope.boardList = response;
        })
    }
    getAllBoards();
    $scope.getBoardGroups = function(boardKey) {
        groupLogic.getBoardGroups(boardKey).then(function(response) {
            $scope.groupList = response;
        })
    }
    $scope.getGroupCourse = function(groupKey) {
        coursLogic.getCoursByGroupKey(groupKey).then(function(response) {
            $scope.courseList = response;
        })
    }
    $scope.getCourseTerm = function(courseKey) {
        termLogic.getTermByCourseKey(courseKey).then(function(response) {
            $scope.termList = response;
        })
    }
    $scope.getTermSubject = function(termKey) {
        subjectLogic.getSubjectByTermKey(termKey).then(function(response) {
            $scope.subjectList = response;
        })
    }

    function getExaminations() {
        examinationTypeLogic.getAllExaminationTypes($localStorage.organizationKey).then(function(response) {
            $scope.examinationTypeList = response;
        });
    }
    getExaminations();
    $scope.getExaminationTypeExamination = function(examinationTypeKey) {
            examinationLogic.getExaminationByExaminationTypeKey(examinationTypeKey).then(function(response) {
                $scope.examinationList = response;
            });
        }
        /*
            $scope.getSubject = function () {
                subjectLogic.getAllSubjects().then(function (response) {

                    $scope.subjectCollection = response;
                });
            }*/
    $scope.getTerm = function() {
        termLogic.getAllTerms().then(function(response) {
            $scope.termCollection = response;
        });
    }
    $scope.Organizations = [{
        "Title": "Organization 1",
        "Id": "1"
    }, {
        "Title": "Organization 2",
        "Id": "2"
    }, {
        "Title": "Organization 3",
        "Id": "3"
    }]
    $scope.addExamSchedule = function() {

        delete $scope.entityExamSchedule.boardKey;
        delete $scope.entityExamSchedule.groupKey;
        delete $scope.entityExamSchedule.courseKey;
        delete $scope.entityExamSchedule.examinationTypeKey;
        delete $scope.entityExamSchedule.startMinutesKey;
        delete $scope.entityExamSchedule.endHourssKey;
        delete $scope.entityExamSchedule.endMinutesKey;
        delete $scope.entityExamSchedule.startHoursKey;

        $scope.entityExamSchedule.CreatedUserKey = "new-User-My3";
        $scope.entityExamSchedule.CreatedAppKey = "new-App-mCampuZ";
        $scope.entityExamSchedule.instanceOrganizationKey = $localStorage.organizationKey;
        if (appConfig.APP_MODE == 'offline') {
            $scope.entityExamSchedule.examScheduleKey = entitykey;
        }
        examScheduleLogic.addExamSchedule($scope.entityExamSchedule).then(function(response) {
         
            $scope.entityExamSchedule = {};
            $scope.save = true;
            $scope.update = false;
            $scope.examScheduleForm.$setPristine();
            $scope.examScheduleForm.$setUntouched();

            SweetAlert.swal({
                title: "Exam Schedule",
                text: "Saved successfully",
                type: "success",
                confirmButtonColor: "#007AFF"
            });
            refresh();
        }, function(err) {
            appLogger.error('ERR', err);
        });
    };
    /*Method for calling  update ExamSchedule*/
    $scope.updateExamSchedule = function() {
        delete $scope.entityExamSchedule.boardKey;
        delete $scope.entityExamSchedule.groupKey;
        delete $scope.entityExamSchedule.courseKey;
        delete $scope.entityExamSchedule.examinationTypeKey;
    delete $scope.entityExamSchedule.startMinutesKey;
        delete $scope.entityExamSchedule.endHourssKey;
        delete $scope.entityExamSchedule.endMinutesKey;
        delete $scope.entityExamSchedule.startHoursKey;

        $scope.entityExamSchedule.LastUpdatedUserKey = "new-User-My3";
        $scope.entityExamSchedule.LastUpdatedAppKey = "new-App-mCampuZ";
        examScheduleLogic.updateExamSchedule($scope.entityExamSchedule, $scope.entityExamSchedule.examScheduleKey).then(function(response) {
            $scope.entityExamSchedule = {};
            $scope.save = true;
            $scope.update = false;
            $scope.examScheduleForm.$setPristine();
            $scope.examScheduleForm.$setUntouched();
            SweetAlert.swal({
                title: "Exam Schedule",
                text: "Updated successfully",
                type: "success",
                confirmButtonColor: "#007AFF"
            });
            refresh();
        }, function(err) {
            appLogger.error('ERR', err);
        });
    };
    /*Method for  retrieving  ExamSchedule details*/
    $scope.editExamSchedule = function(examScheduleKey) {
        examScheduleLogic.getExamScheduleByExamScheduleKey(examScheduleKey).then(function(response) {
          
            $scope.save = false;
            $scope.update = true;
            appLogger.log('exe schedule ' + JSON.stringify(response));
            $scope.getBoardGroups(response[0].boardKey);
            $scope.getGroupCourse(response[0].groupKey);
            $scope.getCourseTerm(response[0].courseKey);
            $scope.getTermSubject(response[0].termKey);
            $scope.getExaminationTypeExamination(response[0].examinationTypeKey);
    
            //$scope.entityExamSchedule = response[0];
            $scope.entityExamSchedule = {};
            $scope.entityExamSchedule.boardKey = response[0].boardKey;
            $scope.entityExamSchedule.groupKey = response[0].groupKey;
            $scope.entityExamSchedule.courseKey = response[0].courseKey;
            $scope.entityExamSchedule.examScheduleKey = response[0].examScheduleKey;

 $scope.entityExamSchedule.StartMinutes = response[0].StartMinutes;
            $scope.entityExamSchedule.EndHours = response[0].EndHours;
            $scope.entityExamSchedule.EndMinutes = response[0].EndMinutes;
            $scope.entityExamSchedule.StartHours = response[0].StartHours;

            $scope.entityExamSchedule.subjectKey = response[0].subjectKey;
            $scope.entityExamSchedule.examinationKey = response[0].examinationKey;
            $scope.entityExamSchedule.examinationTypeKey = response[0].examinationTypeKey;
            $scope.entityExamSchedule.examinationDate = new Date(response[0].examinationDate);
            $scope.entityExamSchedule.startDate = new Date(response[0].startDate);
            $scope.entityExamSchedule.endDate = new Date(response[0].endDate);
            $scope.entityExamSchedule.termKey = response[0].termKey;
            $scope.entityExamSchedule.instanceOrganizationKey = response[0].instanceOrganizationKey;
        }, function(err) {
            appLogger.error('ERR', err);
        });
    }
    var refresh = function() {
        examScheduleLogic.getAllExamSchedules($localStorage.organizationKey).then(function(response) {
            $scope.examScheduleCollection = response;
            $scope.sortColumn = "";
            $scope.reverseSort = false;
            $scope.sortData = function(column) {
                $scope.reverseSort = ($scope.sortColumn == column) ? !$scope.reverseSort : false;
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
    refresh();
    /*Method for calling  deleting   ExamSchedule*/
    $scope.deleteExamSchedule = function(examScheduleEntityKey) {
        SweetAlert.swal({
            title: "Are you sure?",
            text: "Your want to delete this examination schedule",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, cancel!",
            closeOnConfirm: false,
            closeOnCancel: false
        }, function(isConfirm) {
            if (isConfirm) {
                examScheduleLogic.deleteExamSchedule(examScheduleEntityKey).then(function(response) {
                    $scope.entityExamSchedule = {};
                    $scope.save = true;
                    $scope.update = false;
                    $scope.examScheduleForm.$setPristine();
                    $scope.examScheduleForm.$setUntouched();
                    SweetAlert.swal({
                        title: "Examination Schedule",
                        text: "Deleted successfully",
                        type: "success",
                        confirmButtonColor: "#007AFF"
                    });
                    refresh();
                }, function(err) {
                    appLogger.error('ERR', err);
                });
            } else {
                SweetAlert.swal({
                    title: "Cancelled",
                    text: "Your examination schedule is safe :)",
                    type: "error",
                    confirmButtonColor: "#007AFF"
                });
            }
        });
    };
}); // End of App Controller