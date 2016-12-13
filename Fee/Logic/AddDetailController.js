'use strict';
var app = angular.module('mcampuz.AddDetailController', [
    'ThrillAppBase.StudentListLogic',
    'ThrillAcademic.academicYearLogic',
    'ThrillAppBase.StudentAdditionLogic',
    'mcampuz.AddDetailLogic',
    'ThrillAppBase.thrillAppBasePersonLogic',
    'ThrillCnnWebClient.appConfig',
    'ThrillPerson.personBasicInfoLogic',
    'ThrillPerson.personListLogic',
    'ThrillAcademic.academicYearLogic',
    'mcampuz.ServiceCategoryLogic'
]);
app.controller('AddDetailController', function($scope, $filter,
    $log,
    TempDataService,
    $rootScope,
    $state,
    academicYearLogic,
    $localStorage,
    thrillAppBasePersonLogic,
    personBasicInfoLogic,
    personListLogic,
    ServiceCategoryLogic,
    ThrillAppBaseStudentLogic,
    ThrillAppBaseStudentListLogic,
    AddDetailLogic,
    $window,
    $http,
    $stateParams,
    $location,
    appConfig,
    $q,
    SweetAlert) {

    getLabels(appConfig.CULTURE_NAME);

    function getLabels(cultureName) {


        var currentFileName = "Board";
        console.log("Fee/Languages/" + currentFileName + "." + cultureName + ".json");
        $http.get("Fee/Languages/" + currentFileName + "." + cultureName + ".json").then(function(response) {

            bindLabels(response.data);

        });
    }

    function bindLabels(data) {


        $scope.labelsFee = data.labels;

    };

    //$state.go($state.current, {}, {reload: true});
    //$state.reload();
    /*$scope.addStudent= function () {

    $state.go('app.studentadd');
    };*/

    var OrganizationKey = "";
    var ServiceCollection = [];
    var orderDetails = [];
    $scope.ServiceCollection = {};
    var Responsetotal = 0;
    var OrganizationKey = "d0a4cb70-58b3-11e6-92e8-2bb75054daa9";

    var InstituteKey;
    InstituteKey =$localStorage.LoginInstituteKey;
    $scope.FeeDetail = {};
    var totalTaxAmount = 0;
    var totalAmount = 0;
    var finalFee = 0;
    var studentObject;
    var AcademicYeadId;
    var todaydate;
    var serviceID;
    var ResponseTax=0;
    var ResponseOrderId;
    todaydate = new Date();
    $scope.hide = false;
    $scope.PayFee = {};
    $scope.studentDetails = function() {

        ThrillAppBaseStudentLogic.getStudentforFee($stateParams.StudentKey).then(function(response) {
            console.log(JSON.stringify(response));
            $scope.PayFee.Name = (response[0].FirstName + " " + response[0].LastName);
            $scope.PayFee.AdmissionNumber = response[0].AdmissionNumber;
            //$scope.PayFee.Course = response[0].CourseTitle;
           // $scope.PayFee.Batch = response[0].BatchName;


            studentObject = {
                "StudentId": response[0].StudentKey,
                "BatchId": response[0].InstituteBatchKey,
                "CourseId": response[0].InstituteCourseKey,
                "GroupID": response[0].InstituteGroupKey,
                "BoardID": response[0].InstituteBoardKey
            };



        });
    }

    $scope.studentDetails()


    $scope.getCategoryList = function() {
        ServiceCategoryLogic.getcategoryList(InstituteKey).then(function(response) {
            //console.log(JSON.stringify(response));
            $scope.CategoryCollection = response;
        });
    }
    $scope.getCategoryList();

    $scope.getAcademicYear = function() {
        academicYearLogic.getAllYearsByInstituteKey(InstituteKey).then(function(response) {
            console.log(JSON.stringify(response));
            AcademicYeadId = response[0].AcademicYearKey;
            console.log(AcademicYeadId);
        });
    }
    $scope.getAcademicYear();


    var modal = document.getElementById('myModal');

    // Get the button that opens the modal
    var btn = document.getElementById("myBtn");

    var button = document.getElementsByClassName("btnclose")[0];

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks the button, open the modal
    btn.onclick = function() {
        modal.style.display = "block";
    }

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
    }

    button.onclick = function() {
            modal.style.display = "none";
        }
        // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    $scope.goStructure = function() {

        $state.go('app.flexibleStructure/:StudentKey/:type', { StudentKey: $stateParams.StudentKey, type: 'custom' });

    };


    $scope.getName = function() {

        var categoryKey = $scope.FeeDetail.ServiceTypeID;
        //console.log(categoryKey);
        AddDetailLogic.getName(categoryKey).then(function(response) {
            console.log(JSON.stringify(response));
            serviceID = response[0].ServiceID;
            console.log(serviceID);
            $scope.NameCollection = response;
        });
    }
    $scope.getName();

    $scope.getType = function() {
        console.log($scope.FeeDetail.ServiceName);
        var serviceName = $scope.FeeDetail.ServiceName;
        var categoryKey = $scope.FeeDetail.ServiceTypeID;

        AddDetailLogic.getType(serviceName, categoryKey).then(function(response) {
            //console.log(JSON.stringify(response));
            $scope.TypeCollection = response;
        });
    }
    $scope.getType();



    $scope.getMOU = function() {

        var serviceName = $scope.FeeDetail.ServiceName;
        var categoryKey = $scope.FeeDetail.ServiceTypeID;
        var serviceType = $scope.FeeDetail.ServiceType;


        AddDetailLogic.getMouAndAmount(serviceName, categoryKey, serviceType).then(function(response) {
            console.log(JSON.stringify(response));
            $scope.FeeDetail.ServiceTypeName = response[0].ServiceTypeName;
            $scope.FeeDetail.UnitMesurementName = response[0].UnitMesurementName;
            $scope.FeeDetail.MOUCost = response[0].Price;
            $scope.FeeDetail.Tax = response[0].TaxValue;
            console.log($scope.FeeDetail.Tax);




        });
    }

    $scope.totalCost = function(val) {


        var Quantity = parseInt(val);
        var Cost = parseInt($scope.FeeDetail.MOUCost);

        var totalAmount = Cost * Quantity;
        $scope.FeeDetail.UnitPrice = totalAmount;

        var taxValue = ($scope.FeeDetail.Tax) * parseInt($scope.FeeDetail.UnitPrice) / 100;
        /* console.log($scope.FeeDetail.Tax);
         console.log(parseInt($scope.FeeDetail.Amount));*/
        console.log(taxValue);
      //  alert(taxValue);

        $scope.FeeDetail.TaxTotalAmount = taxValue;

    };

    //alert(studentObject);

    $scope.AddDetails = function() {
        //alert(JSON.stringify($scope.FeeDetail));
        //alert(totalAmount);
        totalTaxAmount = totalTaxAmount + $scope.FeeDetail.TaxTotalAmount;
       // alert(totalTaxAmount);
        totalAmount = totalAmount + $scope.FeeDetail.UnitPrice;
        console.log(totalAmount);
        $scope.FeeDetail.FinalAmount = totalAmount + Responsetotal;
      // alert(ResponseTax);
        if (ResponseTax == undefined) {
            ResponseTax = 0;
        }
        $scope.FeeDetail.TaxTotalAmountt = totalTaxAmount + ResponseTax;
       // alert($scope.FeeDetail.TaxTotalAmountt);
        console.log($scope.FeeDetail.TaxTotalAmount);
        $scope.FeeDetail.FinalFee = $scope.FeeDetail.FinalAmount + $scope.FeeDetail.TaxTotalAmountt;
        $rootScope.TotalAmount = $scope.FeeDetail.FinalFee;
        $scope.FeeDetail.OrderDetailID = 0;
        $scope.FeeDetail.ItemId = serviceID;



        console.log($scope.FeeDetail.FinalAmount);
        // studentObject.AcademicYeadId = AcademicYeadId;
        studentObject.OrderValue = $scope.FeeDetail.FinalAmount;
        studentObject.OrderDate = todaydate;
        studentObject.OrderID = ResponseOrderId;

        console.log($scope.FeeDetail);
        $scope.feeList.push($scope.FeeDetail)

        $scope.FeeDetail = {};
        // $scope.courseForm.$setPristine();
        // $scope.courseForm.$setUntouched();
        /* console.log(ServiceCollection);
         $scope.ServiceCollection=ServiceCollection;*/

    };

    $scope.feedetail = function() {
        //alert($scope.feeList);
        $scope.feeList = ServiceCollection;
        /*alert(ServiceCollection.Tax);
        console.log(LastTaxValue);*/
    };
    $scope.feedetail();
    $scope.goMainPage = function() {

        $state.go('app.feeDetails');

    };

    $scope.StudentFee = function(deatils) {
//deatils.TaxTotalAmount=

        var finalObject = { "StudentDetails": studentObject, "FeeDetails": deatils }
            //var newObjet = {"StudentDetails":array[1],"FeeDetails":[array[0]] }
        console.log(studentObject.OrderID);
     //   alert(JSON.stringify(finalObject));
        console.log(JSON.stringify(finalObject));
        AddDetailLogic.addFee(finalObject).then(function(response) {
            SweetAlert.swal({
                title: "Student Fee",
                text: "Added successfully",
                type: "success",
                confirmButtonColor: "#007AFF"
            });
            $state.go('app.feeDetails');
        });



    };

    function promiseStudents(orderID) {
        var deffered = $q.defer()

        AddDetailLogic.getorderDetails(orderID).then(function(response) {
            console.log(JSON.stringify(response));
            deffered.resolve(response);
            //orderDetails.push(JSON.stringify(response));
            //orderDetails.push(response);
            ///console.log(orderDetails);
            //$scope.feeList=response;

        }, function(err) {
            console.log(err);
            deffered.reject(err);
        });


        return deffered.promise
    }
    $scope.getStudentFee = function() {

        AddDetailLogic.getorderID($stateParams.StudentKey).then(function(response) {
            console.log(response);
            console.log(response.length);
            if (response.length == undefined) {
                console.log(1234);
                ResponseOrderId = 0;
                console.log(ResponseOrderId);
            } else {
                ResponseOrderId = response[0].OrderID;
            }
            if (response.length != undefined) {
                AddDetailLogic.getorderDetails(ResponseOrderId).then(function(response) {
                    console.log(JSON.stringify(response));
                    var NewCollection = [];
                    console.log(response.length);
                    if (response.length == undefined) {
                        ResponseTax = 0;
                    } else {
                        angular.forEach(response,function(resp){
                            console.log(resp.TaxAmount);

                            ResponseTax =ResponseTax+ resp.TaxAmount;

                        })
                        console.log(ResponseTax);

                        //ResponseTax = response[response.length - 1].TaxAmount;
                    }


                    for (var i = 0; i < response.length; i++) {
                        var Obj = {
                            "ServiceTypeName": response[i].ServiceCategoryName,
                            "UnitMesurementName": response[i].MeasurementOfUnits,
                            "UnitPrice": response[i].Amount,
                            "ServiceName": response[i].ServiceName,
                            "MOUCost": response[i].MOUCost,
                            "Quantity": response[i].Quantity,
                            "OrderDetailID": response[i].OrderDetailId

                        }

                        Responsetotal += response[i].Amount;
                        NewCollection.push(Obj);
                        if (i == response.length - 1) {
                            console.log(Responsetotal);
                            $scope.ResponseFinalAmount = Responsetotal;
                            $scope.ResponseTaxTotalAmount = ResponseTax;
                            $scope.ResponseFinalFee = $scope.ResponseFinalAmount + $scope.ResponseTaxTotalAmount;
                            $rootScope.TotalAmount = $scope.ResponseFinalFee;
                            $scope.feeList = NewCollection;

                        }
                    }
                }, function(err) {
                    console.log(err);

                });

            }


        });

    }




    $scope.getStudentFee();

});