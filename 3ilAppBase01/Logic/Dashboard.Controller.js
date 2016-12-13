var app = angular.module('ThrillAppBase.Dashboard', ['chart.js','Mcampuz.RolesLogic']);
app.config(['ChartJsProvider', (function (ChartJsProvider) {
    ChartJsProvider.setOptions({
        colors: ['#803690', '#00ADF9', '#DCDCDC', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360']
    });
})]);
app.controller('DashboardController', function ($scope, $localStorage,RolesLogic,thrillAppBasePersonLogic, appBaseOrganizationLogic,$location,$rootScope, $state) {
    if ($localStorage.ReferenceKey == null || $localStorage.ReferenceKey == undefined) {
        $state.go('signin');
    }
    //age weight bar graph
    $scope.labels = ["10-Jun", "10-Jul", "10-Aug", "10-Sep", "10-Oct", "10-Nov", "10-Dec"];
    $scope.series = ['Acutal Weight', 'Expected Weight'];
    $scope.data = [
    [10, 11, 12, 14, 16, 15, 19]
    , [11, 11, 13, 14, 18, 19, 20]
  ];
    $scope.onClick = function (points, evt) {
        console.log(points, evt);
    };
    $scope.datasetOverride = [{
        yAxisID: 'y-axis-1'
    }, {
        yAxisID: 'y-axis-2'
    }];
    $scope.options = {
        scales: {
            yAxes: [
                {
                    id: 'y-axis-1'
                    , type: 'linear'
                    , display: true
                    , position: 'left'
        }
                , {
                    id: 'y-axis-2'
                    , type: 'linear'
                    , display: true
                    , position: 'right'
        }
      ]
        }
    };
    //age height graph
    $scope.labelsHeight = ["10-Jun", "10-Jul", "10-Aug", "10-Sep", "10-Oct", "10-Nov", "10-Dec"];
    $scope.seriesHeight = ['Acutal Height', 'Expected Height'];
    $scope.dataHeight = [
    [15, 17, 19, 21, 23, 25, 27]
    , [16, 17, 20, 23, 25, 26, 28]
  ];
    //age MUAC graph
    $scope.labelsMUAC = ["10-Jun", "10-Jul", "10-Aug", "10-Sep", "10-Oct", "10-Nov", "10-Dec"];
    $scope.seriesHeightMUAC = ['Acutal Value', 'Expected Value'];
    $scope.dataMUAC = [
    [5, 5, 7, 10, 11, 11, 13]
    , [8, 8, 10, 10, 13, 13, 15]
  ];
    //age head circumference
    $scope.labelsHead = ["10-Jun", "10-Jul", "10-Aug", "10-Sep", "10-Oct", "10-Nov", "10-Dec"];
    $scope.seriesHead = ['Acutal Value', 'Expected Value'];
    $scope.dataHead = [
    [12, 12, 13, 14, 16, 18, 20]
    , [15, 15, 18, 18, 19, 20, 22]
  ];






});