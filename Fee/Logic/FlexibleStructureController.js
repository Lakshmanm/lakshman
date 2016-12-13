'use strict';
var app = angular.module('mcampuz.FlexibleStructureController', [
    'mcampuz.FlexibleStructureLogic',
    'ThrillAppBase.StudentListLogic',
    'mcampuz.InstallmentPlansLogic',
    'mcampuz.AddDetailLogic',
    'ThrillAcademic.academicYearLogic',
    'ThrillAppBase.thrillAppBasePersonLogic',
    'ThrillAppBase.StudentAdditionLogic',
    'ThrillPerson.personBasicInfoLogic',
    'ThrillInstitute.instituteLogic',
    'ThrillPerson.personListLogic'
]);
app.controller('FlexibleStructureController', function($scope, $filter,
    $log,
    TempDataService,
    $rootScope,
    $state,
    AddDetailLogic,
    academicYearLogic,
    $localStorage,
    InstallmentPlansLogic,
    thrillAppBasePersonLogic,
    FlexibleStructureLogic,
    ThrillAppBaseStudentLogic,
    personBasicInfoLogic,
    instituteLogic,
    personListLogic,
    ThrillAppBaseStudentListLogic,
    $window,
    $location,

    $stateParams,

    $q,
    SweetAlert) {





    //$state.go($state.current, {}, {reload: true});
    //$state.reload();
    /*$scope.addStudent= function () {

    $state.go('app.studentadd');
    };*/
    $scope.getdis = false;
    var datepaid;
    var amountpaid;
    var receipt;
    var paybtn;
    var OrderID;
    getOrderId();
    var OrganizationKey = "";
    var installmentsNumber = "";
    var installmentAmount = "";
    var daysGap = "";
    var installmentPlanId = "";
    $scope.direct = false;
    $scope.indirect = true;
    var AcademicYeadId = "";
    var calculateObj = {};
    var date = new Date();
    var firstdate = new Date().toISOString().slice(0, 10);
    var StudentKey;

    $scope.grid = false;
    var OrganizationKey = "d0a4cb70-58b3-11e6-92e8-2bb75054daa9";

    var InstituteKey;

    InstituteKey = $localStorage.LoginInstituteKey;
    $scope.calculate = {};

    $scope.calculate.TotalAmount = $rootScope.TotalAmount;
    $scope.calculateDue = function() {
          if($scope.calculate.InitalPayment==""|| $scope.calculate.InitalPayment==undefined )
          {
            $scope.calculate.InitalPayment=0;
          }
        var TotalAmount = $scope.calculate.TotalAmount;
        var discount = $scope.calculate.Discount;
        var initialPayment = $scope.calculate.InitalPayment;
        var firstReduction = parseInt($scope.calculate.Discount) + parseInt($scope.calculate.InitalPayment);
        console.log(firstReduction);
        console.log(TotalAmount);
        console.log(discount);
        console.log(initialPayment);
        var dueAmount = $scope.calculate.TotalAmount - firstReduction;

        $scope.calculate.DueAmount = dueAmount;
    };

    if ($stateParams.type == "default") {
        $scope.savebtn = false;

        $scope.calbtn = false;
        $scope.getdis = true;
        $scope.indirect = false;
        $scope.direct = true;
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
      

            getAmountDetails(OrderID);
            //alert("hii")
        });
        $scope.gobackView = function() {
            $state.go('app.feeDetails');
        }
    } else {

        AddDetailLogic.getorderID($stateParams.StudentKey).then(function(response) {
            //alert(JSON.stringify(response));
            OrderID = response[0].OrderID;
            // alert(OrderID);
            $scope.gridDirectDisplay = function(OrderID) {

                getAmountDetails(OrderID);
                FlexibleStructureLogic.getInstallments(OrderID).then(function(response) {
                    console.log(JSON.stringify(response));
                    //alert(response.length==0 ||response.length==undefined)
                    if (response.length == 0 || response.length == undefined) {
                        //alert();
                        $scope.savebtn = false;
                        $scope.indirect = true;
                        $scope.direct = false;
                        $scope.calbtn = true;
                        $scope.getdis = false;
                        $scope.grid = false;
                        $scope.backbtn = false
                    } else {
                        $scope.indirect = false;
                        $scope.direct = true;
                        $scope.getdis = true;
                        $scope.calbtn = false;
                        $scope.savebtn = false;
                        $scope.grid = true;
                        $scope.backbtn = true;

                    }

                });
            }
            $scope.gridDirectDisplay(OrderID);
        });

        //$scope.gridDirectDisplay();
        $scope.gobackView = function() {
            $state.go('app.addDetails/:StudentKey', {
                StudentKey: $stateParams.StudentKey
            });
        }

    }



    $scope.getInstallments = function() {
        InstallmentPlansLogic.getplanList(InstituteKey).then(function(response) {
            console.log(JSON.stringify(response));

            $scope.PlanCollection = response;
        });
    };
    $scope.getInstallments();

    $scope.getAcademicYear = function() {
        academicYearLogic.getAllYearsByInstituteKey(InstituteKey).then(function(response) {
            console.log(JSON.stringify(response));
            AcademicYeadId = response[0].AcademicYearKey;
            console.log(AcademicYeadId);
        });
    }
    $scope.getAcademicYear();

    $scope.getInstallmentsNumber = function(entityPlan) {
        installmentsNumber = entityPlan.Tenure;
        installmentPlanId = entityPlan.InstallmentPlanID;
        daysGap = entityPlan.InstallmentGap;

        //installmentAmount=$scope.calculate.DueAmount/parseInt(installmentsNumber);
        installmentAmount = $filter('number')($scope.calculate.DueAmount / parseInt(installmentsNumber), 2)
        console.log(installmentAmount);
        console.log(entityPlan);
        var currentdate = new Date();
        var newdate = currentdate.getDate();
        console.log(newdate);
    };
    ////////////////////////
    function getdate(days) {
        //var tt = document.getElementById('txtDate').value;

        // var date = new Date();
        var newdate = new Date();

        newdate.setDate(newdate.getDate() + days);

        var dd = newdate.getDate();
        var mm = newdate.getMonth() + 1;
        var y = newdate.getFullYear();

        var someFormattedDate = y + '/' + mm + '/' + dd;


        return someFormattedDate;
        //document.getElementById('follow_Date').value = someFormattedDate;
    }

    function dateConversion() {
        var newdate = new Date()
        var dd = newdate.getDate();
        var mm = newdate.getMonth() + 1;
        var y = newdate.getFullYear();

        var someFormattedDate = y + '/' + mm + '/' + dd;
        return someFormattedDate;
    }

    $scope.personalDetails = []

    $scope.numberOfRows;

    $scope.requestedMaxDate = new Date();
    $scope.saveInstallments = function() {
        var calculateObj = {
            "OrderId": OrderID,
            "InstallmentPlanId": installmentPlanId,
            "TotalAmount": $scope.calculate.TotalAmount,
            "IntialPayment": $scope.calculate.InitalPayment,
            "Discount": $scope.calculate.Discount,
            "InstallmentStartDate": firstdate,
            "AcademicYear": AcademicYeadId,
            "UserId": $stateParams.StudentKey
        };
        console.log(calculateObj);


        FlexibleStructureLogic.addInstallment(calculateObj).then(function(response) {
            $scope.gridDirectDisplay();

            SweetAlert.swal({
                title: "Felexible Structure ",
                text: "Saved successfully",
                type: "success",
                confirmButtonColor: "#007AFF"
            });
            $window.location.reload();

        });
    }

    $scope.personalDetail = {};

    $scope.gridDisplay = function() {

        $scope.grid = true;


        $scope.savebtn = true;
        $scope.backbtn = true;


        $scope.personalDetails = []
            //alert(installm.entsNumber);
        var id = 0;

        for (var i = 0; i < installmentsNumber; i++) {
            if (i == 0) {

                date = dateConversion();
            } else {
                date = getdate(daysGap);
            }

            $scope.personalDetails.push({
                'id': id + 1,
                'dueDate': date,
                'Amount': installmentAmount,

                'paiddate': datepaid,
                'paidAmount': amountpaid,
                'datepaid': true,
                'amountpaid': true
            })


        }


    }



    $scope.gridDirectDisplay = function() {
        //alert(123);

        FlexibleStructureLogic.getInstallments(OrderID).then(function(response) {
            console.log(JSON.stringify(response));
            console.log(response.length);
            //alert(response.length!=0&&response.length!=undefined);
            /*if(response.length!=0&&response.length!=undefined)

             { 
               $scope.calbtn=false;*/
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
                    //'dueDate': response[i].DueDate,
                    'Amount': response[i].DueAmount,
                    'paiddate': (response[i].PaidDate != null) ? (new Date(response[i].PaidDate)) : response[i].PaidDate,
                    'InstallmentID': response[i].InstallmentID,
                    'paidAmount': response[i].PaidAmount,
                    'datepaid': datepaid,
                    'amountpaid': amountpaid,
                    'receipt': receipt,
                    'paybtn': paybtn,
                    'pamount': true,
                    'pdate': true




                })

                if (i == response.length - 1)
                    $scope.$apply()

            }
            /*}
            else{
              alert("hi");
              $scope.calbtn=true;
            }*/
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

    function getOrderId() {
        AddDetailLogic.getorderID($stateParams.StudentKey).then(function(response) {

            OrderID = response[0].OrderID;
            $scope.gridDirectDisplay();
            console.log(OrderID);
        });
    }

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

            var paymentObject = {
                "OrderId": OrderID,
                "InstallmentId": details.InstallmentID,
                "Amount": details.paidAmount,
                "paidDate": details.paiddate,
                "AcademicYear": AcademicYeadId,
                "UserId": $stateParams.StudentKey
            };
            console.log(paymentObject);
            FlexibleStructureLogic.payFee(paymentObject).then(function(response) {
                SweetAlert.swal({
                    title: "Fee ",
                    text: "Paid successfully",
                    type: "success",
                    confirmButtonColor: "#007AFF"
                });
                $state.go('app.PayFee/:StudentKey/:type', {
                    StudentKey: $stateParams.StudentKey,
                    type: 'custom'
                });

            });

 }



        }
        // $scope.payMoney = function(details) {
        //     //alert("hi")
        //     console.log(details);
        //     var paymentObject = {
        //         "OrderId": OrderID,
        //         "InstallmentId": details.InstallmentID,
        //         "Amount": details.paidAmount,
        //         "paidDate": details.paiddate,
        //         "AcademicYear": AcademicYeadId,
        //         "UserId": $stateParams.StudentKey
        //     };
        //     console.log(paymentObject);

    //     $localStorage.PaymentddObject = paymentObject;


    // }

    // $scope.check = {};
    // $scope.checkamount = function() {

    //     console.log($localStorage.PaymentddObject.Amount);
    //     console.log($scope.check.amount);

    //     //alert($localStorage.PaymentddObject.Amount==$scope.check.amount); 
    //     if ($localStorage.PaymentddObject.Amount == $scope.check.amount)

    //     {
    //         FlexibleStructureLogic.payFee($localStorage.PaymentddObject).then(function(response) {
    //             alert("Saved");
    //             $localStorage.PaymentddObject = {};
    //             $scope.check = {};
    //             $state.go('app.PayFee/:StudentKey/:type', { StudentKey: $stateParams.StudentKey, type: 'custom' });
    //         });
    //     } else {
    //         $scope.paying = " Paid Amount did not match";
    //     }
    // };

    $scope.Receipt = function(id) {

        //alert(id);
        $localStorage.InstallmentId = id;
        $state.go('app.Receipt/:StudentKey', {
            StudentKey: $stateParams.StudentKey
        });
        getStudentDetails();
    };

    getReceiptDetails($localStorage.InstallmentId);
    /*$scope.receipt = function(details){

    };*/


    /*   $scope.addNew = function(personalDetail){

          id=id+1;
           $scope.personalDetails.push({ 
               'id':id,
               'name': "", 
               'dob': "",
               'gender': "",
               'dept': "",
           });
       };*/

    /*      $scope.remove = function(){
              var newDataList=[];
              $scope.selectedAll = false;
              angular.forEach($scope.personalDetails, function(selected){
                  if(!selected.selected){
                      newDataList.push(selected);
                  }
              }); 
              $scope.personalDetails = newDataList;
          };*/

    $scope.checkAll = function() {
        if (!$scope.selectedAll) {
            $scope.selectedAll = true;
        } else {
            $scope.selectedAll = false;
        }
        angular.forEach($scope.personalDetails, function(personalDetail) {
            personalDetail.selected = $scope.selectedAll;
        });
    };

    $scope.showElements = function(id) {
        var showid = 'more' + id;
        if ($('#' + showid).css('display') == "none") {

            $('#' + showid).show();
        } else {

            $('#' + showid).hide();
        }

    };
    $scope.PayFee = {};

    function getStudentDetails() {
        ThrillAppBaseStudentLogic.getStudentforFee($stateParams.StudentKey).then(function(response) {
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
    };

    getStudentDetails();

    function getAmountDetails(OrderID) {
    //   alert(OrderID)
        FlexibleStructureLogic.AmountDetails(OrderID).then(function(response) {
            // console.log(response);
            $scope.calculate.TotalAmount = response[0].OrderValue;
            $scope.calculate.Discount = response[0].Discount;
            $scope.calculate.InitalPayment = response[0].InitialPayment;
            $scope.calculate.DueAmount = (response[0].OrderValue - (response[0].Discount + response[0].InitialPayment));
            $scope.calculate.InstallmentPlanName = response[0].InstallmentPlanName;
        });
    }
    $scope.details = {};

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

    /*
    $scope.deleteStudent = function (EntityKey) {
            var del = confirm("Are you sure you want to Delete ?");
            if (del == true) {
                ThrillAppBaseStudentListLogic.deletestudent(EntityKey).then(function (response) {
                    //appLogger.alert($scope.alertMessageLabels.boardDeleted);
                   
                    
                  $scope.getAllStudents();


                    SweetAlert.swal({
                    title: "Student",
                    text: "Deleted successfully",
                    type: "success",
                    confirmButtonColor: "#007AFF"
                });
                });
            }
        };
    */
});