'use strict';
var app = angular.module('mcampuz.PayFeeController', [
    'ThrillAppBase.StudentListLogic',
    'ThrillAppBase.thrillAppBasePersonLogic',
    'ThrillInstitute.instituteLogic',
    'mcampuz.InstallmentPlansLogic',
    'ThrillAcademic.academicYearLogic',
    'ThrillPerson.personBasicInfoLogic',
    'mcampuz.AddDetailLogic',
    'mcampuz.FlexibleStructureLogic',
    'ThrillAppBase.StudentAdditionLogic',
    'ThrillPerson.personListLogic'
]);
app.controller('PayFeeController', function($scope, $filter,
    $log,
    TempDataService,
    $rootScope,
    $state,
    $localStorage,
    thrillAppBasePersonLogic,
    InstallmentPlansLogic,
    personBasicInfoLogic,
    FlexibleStructureLogic,
    AddDetailLogic,
    personListLogic,
    academicYearLogic,
    ThrillAppBaseStudentLogic,
    ThrillAppBaseStudentListLogic,
    $window,
    $location,
    $stateParams,
    instituteLogic,
    $q,
    SweetAlert) {





    //$state.go($state.current, {}, {reload: true});
    //$state.reload();
    /*$scope.addStudent= function () {

    $state.go('app.studentadd');
    };*/

    var OrganizationKey = "";
    var OrderID;
    var AcademicYeadId;
    var StudentKey;
    var OrganizationKey = "d0a4cb70-58b3-11e6-92e8-2bb75054daa9";
    if ($stateParams.StudentKey) {
        StudentKey = $stateParams.StudentKey;
    }
    var InstituteKey;
    InstituteKey = $localStorage.LoginInstituteKey;
    $scope.getPlansList = function() {
        InstallmentPlansLogic.getplanList(InstituteKey).then(function(response) {
            //console.log(JSON.stringify(response));
            $scope.PlanCollection = response;
        });
    }
    $scope.getPlansList();


    //$scope.getAcademicYear();
    $scope.addFee = function() {

        $state.go('app.addDetails');
    };

    var datepaid;
    var amountpaid;
    var receipt;
    var paybtn;
    $scope.details = {};
    $scope.PayFee = {};
    $scope.Fee = {};
    if ($stateParams.type == "default") {
     AddDetailLogic.getorderID($stateParams.StudentKey).then(function(response) {
              if(response.length==undefined)
  {

SweetAlert.swal({
                    title: "Flexible Structure"
                    , text: "Please Add Flexible Structure :)"
                    , type: "error"
                    , confirmButtonColor: "#007AFF"
                });
$state.go('app.feeDetails');

  }
  else{
          OrderID = response[0].OrderID;
  }
             });

        $scope.goMainPage = function() {

            $state.go('app.feeDetails');

        };
    } else {
        $scope.goMainPage = function() {
            $state.go('app.flexibleStructure/:StudentKey/:type', { StudentKey: $stateParams.StudentKey, type: 'default' });
        };
    }
    $scope.gridDirectDisplay = function() {
        getStudentDetails(StudentKey);
        getAmountDetails(OrderID);
        FlexibleStructureLogic.getInstallments(OrderID).then(function(response) {
            console.log(response);


            $scope.grid = true;
            $scope.personalDetails = []
                //alert(installmentsNumber);
            var id = 0;

            for (var i = 0; i < response.length; i++) {

                if (response[i].PaymentStatusName == "Paid") {
                    datepaid = true;
                    amountpaid = true;
                    receipt = true;
                    paybtn = false;
                } else {
                    datepaid = false;
                    amountpaid = false;
                    receipt = false;
                    paybtn = true;
                }

                $scope.personalDetails.push({
                    'id': id + 1,
                    'dueDate': ($filter('date')(response[i].DueDate, 'M/d/yyyy')),
                    'Amount': response[i].DueAmount,
                    'paiddate': (response[i].PaidDate != null) ? (new Date(response[i].PaidDate)) : response[i].PaidDate,
                    'InstallmentID': response[i].InstallmentID,
                    'paidAmount': response[i].PaidAmount,
                    'datepaid': datepaid,
                    'amountpaid': amountpaid,
                    'receipt': receipt,
                    'paybtn': paybtn




                })


            }
        });


    }

    var id = 0;
    /* $scope.personalDetails = [
         {
              'id':id,
             'name':'Praveen',
             'dob':'30-04-1984',
             'gender':'M',
             'dept':'Depart',

         }];*/

    $scope.elements = true;

    $scope.getOrderId = function(details) {
        AddDetailLogic.getorderID($stateParams.StudentKey).then(function(response) {

            OrderID = response[0].OrderID;
            $scope.gridDirectDisplay();
            console.log(OrderID);
        });
    }

    $scope.getOrderId();


    $scope.dateValidation=[];
   $scope.amountValidation=[];


   $scope.dateValidationCheck= function(index)
   {

    if($scope.personalDetails[index].paiddate!=null)
    {
        $scope.dateValidation[index]=false
    }

   }


    $scope.numberValidationCheck= function(index)
   {

    if($scope.personalDetails[index].amountpaid!=null)
    {
        $scope.amountValidation[index]=false
    }

   }


    $scope.payMoney = function(details,index) {

      //alert(JSON.stringify(details))

      if(details.paiddate==null)
      $scope.amountValidation[index]=true
      else
     $scope.amountValidation[index]=false


     if(details.paidAmount==null)
     $scope.dateValidation[index]=true
     else
     $scope.dateValidation[index]=false


 //alert(!($scope.amountValidation[index] || $scope.dateValidation[index]))

 if(!($scope.amountValidation[index] || $scope.dateValidation[index]))
 {

        // console.log(details);
        var paymentObject = {
            "OrderId": OrderID,
            "InstallmentId": details.InstallmentID,
            "Amount": details.paidAmount,
            "paidDate": details.paiddate,
            "AcademicYear": AcademicYeadId,
            "UserId": $stateParams.StudentKey
        };
        //console.log(paymentObject);
        FlexibleStructureLogic.payFee(paymentObject).then(function(response) {
            SweetAlert.swal({
                title: "Fee ",
                text: "Paid successfully",
                type: "success",
                confirmButtonColor: "#007AFF"
            });
            $scope.gridDirectDisplay();

        });
    }
    }

    $scope.Receipt = function(id) {
    
        $localStorage.InstallmentId = id;
        $state.go('app.Receipt/:StudentKey', { StudentKey: $stateParams.StudentKey });
        getStudentDetails(StudentKey);
    };

    getReceiptDetails($localStorage.InstallmentId);

    function getStudentDetails(StudentKey) {
        ThrillAppBaseStudentLogic.getStudentforFee(StudentKey).then(function(response) {
            console.log(JSON.stringify(response));
            $scope.PayFee.Name = (response[0].FirstName + " " + response[0].LastName);
            $scope.PayFee.AdmissionNumber = response[0].AdmissionNumber;
            $scope.PayFee.Course = response[0].CourseTitle;
            $scope.PayFee.Batch = response[0].BatchName;

            $scope.PayFee.Date = ($filter('date')(new Date(), 'dd/MM/yyyy'));
            var sInstituteKey = response[0].InstituteKey;
            instituteLogic.getInstitute(sInstituteKey).then(function(response) {
                $scope.PayFee.SchoolName = response.OrganizationName;
                var sAddressKey = response.AddressKey;

            });
        });
    }

    function getAmountDetails(OrderID) {
        FlexibleStructureLogic.AmountDetails(OrderID).then(function(response) {
            console.log(response);
            $scope.Fee.TotalAmount = response[0].OrderValue;
            $scope.Fee.Discount = response[0].Discount;
            $scope.Fee.Intialayment = response[0].InitialPayment;
            $scope.Fee.DueAmount = (response[0].OrderValue - (response[0].Discount + response[0].InitialPayment));
            $scope.Fee.InstallmentPlanName = response[0].InstallmentPlanName;
        });
    }


    function getReceiptDetails(id) {

        FlexibleStructureLogic.getReceiptDetails($localStorage.InstallmentId).then(function(response) {

            console.log(response);
            $scope.details.TotalAmount = response[0][0].TotalAmount;
            $scope.details.PaidAmount = response[0][0].PaidAmount;
            $scope.details.NextDueAmount = response[0][0].NextDueAmount;
            $scope.details.NextDueDate = ($filter('date')(response[0][0].NextDueDate, 'dd/MM/yyyy'));
            $scope.details.Discount = response[0][0].Discount;
            $scope.details.TotalAmountToPay = response[0][0].TotalAmountToPay;
            $scope.details.AdditionalCharges1 = response[0][0].AdditionalCharges1;
            var str = response[0][0].InstallmentNumber;
            $scope.details.ReceptNo = parseInt((str.substr(12, 1))) + 1;

            $scope.details.AdditionalCharges1 = response[0][0].AdditionalCharges1;
            $scope.details.DueDate = ($filter('date')(response[0][0].DueDate, 'dd/MM/yyyy'));



        });
    }

    // function getReceiptDetails(key) {
    //     alert("hi");
    //     ThrillAppBaseStudentLogic.getStudentforFee(key).then(function(response) {
    //         console.log(response);
    //         $scope.studentName = (response[0].FirstName + " " + response[0].LastName);
    //         $scope.studentNumber = response[0].AdmissionNumber;
    //         $scope.coursetitle = response[0].CourseTitle;
    //         $scope.batchTitle = response[0].BatchName;
    //         var InstituteKey = response[0].InstituteKey;
    //     });
    // }

});