var app = angular.module('Aarush.Addition', ['ThrillAppBase.childAdditionLogic', 'ThrillContact.contactLogic', 'ThrillLocation.addressLogic', , 'ThrillPerson.personMaritalStatusLogic', , 'ThrillPerson.personIdentityLogic', , 'ThrillContact.contactContactItemLogic', 'ThrillAppBase.thrillAppBasePersonLogic', ]);
app.controller('ChildRegisterController', function ($scope, $filter, $localStorage, ChildrenService, $stateParams, ThrillAppBasechildLogic, personBasicInfoLogic, contactLogic, $state, addressLogic, PersonMaritalStatusLogic, personIdentityLogic, contactContactItemLogic, thrillAppBasePersonLogic,SweetAlert) {
    var childrens = ChildrenService.getChildrens();
    $scope.child = {
        image: '3ilAppBase01/Web/assets/images/profile.jpg'
    };
     $scope.maxdate = new Date();
    getContactTypes();
    $scope.image_source = "3ilAppBase01/Web/assets/images/default-user.png";
      var primarymobilecontactkey;   
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

    var countries = function () {

        addressLogic.getCountries().then(function (response) {
            $scope.countryList = response;
        }, function (err) {

            console.error('ERR', err);

        });

    };
    /*Method for calling States*/
    var states = function (countryID) {

        addressLogic.getStates(countryID).then(function (response) {

            $scope.stateList = response;
           // alert($scope.stateList);
        }, function (err) {

            console.error('ERR', err);

        });

    };
    /*Method for calling Districts*/
    var districts = function (stateID) {
       
        addressLogic.getDistricts(stateID).then(function (response) {
            $scope.districtList = response;
        }, function (err) {

            console.error('ERR', err);

        });

    };
    /*Method for calling Mandals*/
    var mandals = function (districtID) {
        addressLogic.getMandals(districtID).then(function (response) {
            $scope.mandalList = response;
        }, function (err) {

            console.error('ERR', err);

        });

    };
    /*Method for calling Villages*/
    var villages = function (mandalID) {

        addressLogic.getVillages(mandalID).then(function (response) {

            $scope.villageList = response;
        }, function (err) {
            console.error('ERR', err);
        });
    };

    $scope.getStates = function (countryID) {
        states(countryID);

    };
    $scope.getDistricts = function (stateID) {
       
        if ($scope.child.address.stateId != "" && $scope.child.address.stateId != undefined)
{
   $scope.statemsg=''; 
}
else
    {
$scope.statemsg = 'Please Select states';
}
        districts(stateID);

    };
    $scope.getMandals = function (districtID) {
         if ($scope.child.address.districtId != "" && $scope.child.address.districtId != undefined)
{
   $scope.districtmsg=''; 
}
else
    {
$scope.districtmsg = 'Please Select district';
}
        mandals(districtID);

    };
    $scope.getVillages = function (mandalID) {
      
 if ($scope.child.address.mandalId != "" && $scope.child.address.mandalId != undefined)
{
     
   $scope.mandalmsg=''; 
}
else
    {
          
$scope.mandalmsg = 'Please Select mandal';
}
        villages(mandalID);

    };
        $scope.getvillagename = function () {
      
 if ($scope.child.address.villageId != "" && $scope.child.address.villageId != undefined)
{
      
   $scope.villagemsg=''; 
}
else
    {
         
$scope.villagemsg = 'Please Select village';
}
        villages(mandalID);

    };
    
    
    countries();

// For showing error messages
    
    
    $scope.martialStatusclick = function () {
if ($scope.child.mStatus != "" && $scope.child.mStatus != undefined)
{
   $scope.msg=''; 
}
else
    {
$scope.msg = 'Please Select MartialStatus';
}
    }
    
        $scope.countriesClick = function () {
if ($scope.child.address.countryId != "" && $scope.child.address.countryId != undefined)
{
   $scope.countrymsg=''; 
}
else
    {
$scope.countrymsg = 'Please Select Country';
}
    }
    
    
         var listArray=[];   
    
    // For Contacts
    $scope.addContactItem = function () {
        

        
 var new_arr = $.grep($scope.contactTypes, function (e) { return e.contactTypeKey == $scope.child.contact.contactTypeKey; });
        
       
     
         var contactObj = {
                    "contactTypeTitle":new_arr[0].contactTypeTitle,
                    "contactKey":listArray.length+1,
                    "contactTypeKey": $scope.child.contact.contactTypeKey,
                    "contactItemInfo": $scope.child.contact.contactItemInfo
                }
                  
              
        listArray.push(contactObj);
        
        
        
          
          $scope.contactList=listArray;
        $scope.child.contact.contactItemInfo="";
        $scope.child.contact.contactTypeKey="";
     /*        SweetAlert.swal({
                    title: "Contacts",
                    text: "Added successfully",
                    type: "success",
                    confirmButtonColor: "#007AFF"
                }, function() {
                    //$state.go('app.stafflist');
                });
        */
//        var contactKey = $scope.child.contactKey;
//          alert();
//        if (contactKey == undefined || contactKey == null) {
//
//            contactLogic.addContact({}).then(function (response) {
//                contactKey = response.data.contactKey;
//                $scope.child.contactKey = contactKey;
//
//              
//              /*  contactContactItemLogic.addContactContactItem(contactObj, contactKey).then(function (response) {
//                    getContactItems(contactKey);
//                    console.log('contact item Save reponse ' + JSON.stringify(response));
//
//                })*/
//            })
//
//
//        } else {
//
//            $scope.child.contactKey = contactKey;
//            var contactObj = {
//                "contactKey": $scope.child.contactKey,
//                "contactTypeKey": $scope.child.contact.contactTypeKey,
//                "contactItemInfo": $scope.child.contact.contactItemInfo
//            }
//            contactContactItemLogic.addContactContactItem(contactObj, contactKey).then(function (response) {
//                console.log('contact item Saved without logo reponse ' + JSON.stringify(response));
//                getContactItems(contactKey)
//            })
//
//        }

    }

    $scope.deleteContact = function (contactKey, contactItemKey) {
        
             SweetAlert.swal({
                title: "Are you sure?",
                text: "Your want to delete this contact",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Yes, delete it!",
                cancelButtonText: "No, cancel!",
                closeOnConfirm: false,
                closeOnCancel: false
            }, function(isConfirm) {
                if (isConfirm) {
                    SweetAlert.swal({
                        title: "Deleted!",
                        text: "Your contact has been deleted.",
                        type: "success",
                        confirmButtonColor: "#007AFF"
                    }, function() {
                       $scope.contactList = $scope.contactList.filter(function(el){ return el.contactKey != contactKey; });
            listArray=$scope.contactList;
           contactContactItemLogic.deleteContactContactItem(contactKey, contactItemKey).then(function () {  
               
//alert("DEletede")
           })
          
                    });
                } else {
                    SweetAlert.swal({
                        title: "Cancelled",
                        text: "Your contact is safe :)",
                        type: "error",
                        confirmButtonColor: "#007AFF"
                    });
                }
            });
        
       
       /* if (confirm('Are you sure you want to delete this contact record')) {
            
            
              
         
        }*/
       
       
    
    }


    function getContactTypes() {
        contactContactItemLogic.getContactTypes().then(function (response) {
            console.log(JSON.stringify(response));

            $scope.contactTypes = response;
        })
    }

var addresskey;
    $scope.StaffAdd = false;
    $scope.Staffupdate = false;
    if ($stateParams.childId == undefined) {
        $scope.Staffupdate = true;
        $scope.profilePic = true;

    } else {
        $scope.StaffAdd = true;
        $scope.profilePic = true;
    
        personBasicInfoLogic.getPersonBasicInfoById($stateParams.childId).then(function (responsepersondetails) {
                    PersonMaritalStatusLogic.getMaritalStatusList($stateParams.childId).then(function (Martialstatusresponse) {
//alert('mstatus');
            // alert(JSON.stringify(Martialstatusresponse[0].referenceKey));
                $scope.child.mStatus = '' + Martialstatusresponse[0].maritalStatusTypeId + '';
                $scope.child.maritalStatusReferenceKey = Martialstatusresponse[0].referenceKey;
                console.log(JSON.stringify(Martialstatusresponse));

            })
           //alert(JSON.stringify(responsepersondetails));
             //alert(JSON.stringify(responsepersondetails.contact));
           var primarymobilecontactkey;
            $scope.child = {};
            $scope.child.referenceKey = responsepersondetails.referenceKey;
            
            $scope.child.firstName = responsepersondetails.firstName;
            
            if(responsepersondetails.middleName == 'undefined')
                {
                    $scope.child.middleName = null;
                }
            else
                {
                   $scope.child.middleName = responsepersondetails.middleName;
                    }
             if(responsepersondetails.AadharNumber=='undefined')
                {
                    $scope.child.aadharNumber = null;
                }
            else
                {
             $scope.child.aadharNumber=responsepersondetails.AadharNumber;
                    }
             if(responsepersondetails.lastName=='undefined')
                {
                    $scope.child.lastName = null;
                }
            else
                {
            $scope.child.lastName = responsepersondetails.lastName;
                    }
         $scope.child.mainContactkey = responsepersondetails.Contactkey;
            $scope.child.dateOfBirth = new Date(responsepersondetails.dateOfBirth);
           // alert(JSON.stringify(responsepersondetails));
           $scope.child.primarymobileNumber =  responsepersondetails.contact[0].contactItemInfo; 
            $scope.child.gender = responsepersondetails.genderId;
           //alert(JSON.stringify(responsepersondetails.Adressdata[0].countryId));
           // var entity=responsepersondetails.Adressdata[0].streetDetails;
            // $scope.child.address.streetDetails = entity;
               if (responsepersondetails.Adressdata[0] != undefined)
                    $scope.child.address = {};
                if(responsepersondetails.Adressdata[0].countryId != undefined)
                    {
                        //addressresponse[0]
                states(responsepersondetails.Adressdata[0].countryId);
                districts(responsepersondetails.Adressdata[0].stateId);
                mandals(responsepersondetails.Adressdata[0].districtId);
                villages(responsepersondetails.Adressdata[0].mandalId);
              }
          
            /* if(responsepersondetails.Adressdata[0].entityDetails == 'undefined')
                 {
                    
                     $scope.child.address[0].entityDetails=null;
                 }
                 
            if(responsepersondetails.Adressdata[0].pincode == 'undefined')
                 {
                   
                     $scope.child.address[0].pincode=null;
                 }
            */
            $scope.child.address=responsepersondetails.Adressdata[0];
                // alert(JSON.stringify(responsepersondetails.Adressdata[0].addressKey));
            
          addresskey=responsepersondetails.Adressdata[0].addressKey;
        
          
            
            console.log(JSON.stringify(responsepersondetails.contact));
           
            var contactItems =[];
                 angular.forEach(responsepersondetails.contact, function (contactItem, i) {
                     
                // alert(JSON.stringify(responsepersondetails.contact));
              if(contactItem.contactTypeKey == 'afe56000-48e3-11e6-984a-9d49055c7bf9')  // mobile  
              {
                   if(contactItem.isPrimary =="1")
                   {
                      // alert(JSON.stringify(contactItem));
                        $scope.child.mobilecontactItemKey=contactItem.contactItemKey;
                      $scope.child.primarymobileNumber = contactItem.contactItemInfo;
                        //alert(primarymobilecontactkey);
                  }
                  else {
                      
                      contactItems.push(contactItem);
                  }
              }
                     else 
                     {
                      
                      contactItems.push(contactItem);
                  }
                     
                     

            });
            
            
           // alert("Raja"+JSON.stringify(contactItems));
             listArray=contactItems;
           
            $scope.contactList = contactItems;
        //alert(JSON.stringify(responsepersondetails.DMS));
               if(responsepersondetails.DMS.length > 0)
			{
            // alert(JSON.stringify(responsepersondetails.DMS[0][0].FileBin));
            $scope.image_source=responsepersondetails.DMS[0][0].FileBin;
			}
            
           // alert(JSON.stringify( $scope.child.address));
                /*$scope.child.address = addressresponse[0]
                 $scope.child.address = {};
            states(addressresponse[0].countryId);
                districts(addressresponse[0].stateId);
                mandals(addressresponse[0].districtId);
                villages(addressresponse[0].mandalId);*/
             
            /*get profile picture*/
/*
            if (responsepersondetails.n3DMSFileKey != undefined && responsepersondetails.n3DMSFileKey != '') {
                $scope.image_source = "3ilAppBase01/Web/assets/images/loadingGif.gif"
                var foderKey = responsepersondetails.folderKey;
                var fileKey = responsepersondetails.n3DMSFileKey;
                ThrillAppBasechildLogic.getChildProfilePicture(foderKey, fileKey).then(function (pictureResponse) {
                    var base64Image = pictureResponse.FileBin;
                    $scope.image_source = base64Image;

                })
            }*/
        

    /*        personIdentityLogic.getPersonIdentity($stateParams.childId).then(function (response) {
                console.log(JSON.stringify(response));

                $scope.child.aadharNumber = response[0].identityNumber;
                $scope.child.identityReferenceKey = response[0].referenceKey;


            }, function (err) {

            });*/

/*

           addressLogic.getAddressesByEntityKey($stateParams.childId).then(function (addressresponse) {
             //  alert('asdere');
     // alert(JSON.stringify(addressresponse[0]));
                console.log(JSON.stringify(addressresponse[0]));
                if (addressresponse[0] != undefined)
                    $scope.child.address = {};
                if(addressresponse[0].countryId!= undefined)
                    {
                states(addressresponse[0].countryId);
                districts(addressresponse[0].stateId);
                mandals(addressresponse[0].districtId);
                villages(addressresponse[0].mandalId);
                    }
                $scope.child.address = addressresponse[0]
                    
            });*/

      /*      thrillAppBasePersonLogic.getOrgRoleDetailsByPersonKey(responsepersondetails.referenceKey).then(function (response) {

                if (response[0].contactKey != undefined && response[0].contactKey != "")

                    $scope.child.contactKey = response[0].contactKey;
                getContactItems(response[0].contactKey)
                console.log(JSON.stringify(response));
                thrillAppBasePersonLogic.getchildPrimaryContactDetails(response[0].contactKey).then(function (response) {
                  
                    $scope.child.MNumber = response[0].PrimaryMobileNumber;


                });


            });*/


            /* contactLogic.getContactsByEntityKeys($stateParams.childId).then(function (response) {
                 alert(JSON.stringify(response));
                angular.forEach(response, function (contact) {
          
                    if (contact.contactSubTypeId == 2) //mobile   
                    {
                        $scope.child.MNumber = contact.contactInfo;
                        $scope.child.MNumberreferenceKey = contact.referenceKey
                    }
                    else if (contact.contactSubTypeId == 3) //email
                    {
                        $scope.child.Email = contact.contactInfo;
                        $scope.child.EmailreferenceKey = contact.referenceKey
                    }
                    else if (contact.contactSubTypeId == 4) //FAx
                    {
                        $scope.child.Fax = contact.contactInfo;
                        $scope.child.FaxreferenceKey = contact.referenceKey
                    }
                })
            });*/
            //$scope.person.placeOfBirth = response.placeOfBirth;
            // $scope.child.genderId = response.genderId;
            //$scope.person.bloodGroupId = response.bloodGroupId;
            // $scope.person.identificationMarks = response.identificationMarks;
            // $scope.location = {};
            // $scope.location.locationId = response.locationId;
            // $scope.location.geoLocation = response.geoLocation;
            //$scope.child.=responsepersondetails;
        });
        $scope.profilePic = true;
    }


    // For Contacts
    function primaryMobileNumber() {

        var contactKey = $scope.child.contactKey;

        if (contactKey == undefined || contactKey == null) {


            contactLogic.addContact({}).then(function (response) {
                contactKey = response.data.contactKey;
                $scope.child.contactKey = contactKey;

                var primarymobileContactItemObj = {
                    "contactItemInfo": $scope.child.MNumber,
                    "contactKey": $scope.child.contactKey,
                    "contactTypeKey": "afe56000-48e3-11e6-984a-9d49055c7bf9"
                }
                contactContactItemLogic.addContactContactItem(primarymobileContactItemObj, contactKey).then(function (contactItemResponse) {
                   
                    getContactItems(contactKey);
                    appLogger.log('email contact resp ' + JSON.stringify(contactItemResponse))
                })



            })


        } else {

            $scope.child.contactKey = contactKey;
            var primarymobileContactItemObj = {
                "contactItemInfo": $scope.child.MNumber,
                "contactKey": $scope.child.contactKey,
                "contactTypeKey": "afe56000-48e3-11e6-984a-9d49055c7bf9"
            }
            contactContactItemLogic.addContactContactItem(primarymobileContactItemObj, contactKey).then(function (contactItemResponse) {
                getContactItems(contactKey);
                appLogger.log('email contact resp ' + JSON.stringify(contactItemResponse))
            })

        }

    }


    $scope.Savebasicinfo = function () {
        //$scope.Staff.AddressID=421;
        delete $scope.child.image;
        delete $scope.child.image;
       // delete $scope.child.MobileNumber;
        $scope.child.contactdetails= $scope.contactList;
         
       // alert(primarymobilecontactkey);
        // $scope.child.mobilecontactItemKey=primarymobilecontactkey;
       // alert($scope.child.mobilecontactItemKey);
      //  alert($scope.child.contactdetails);
       // alert(JSON.stringify( $scope.child.contactdetails));
        if ($stateParams.childId == undefined) {
            
           // primaryMobileNumber();
            ThrillAppBasechildLogic.addChild($scope.child).then(function (response) {
               
                 SweetAlert.swal({
                    title: "Child",
                    text: "Saved successfully",
                    type: "success",
                    confirmButtonColor: "#007AFF"
                }, function() {
                    $state.go('app.childrens');
                });
                
                
            });
        } else {
             /*alert(JSON.stringify($scope.tempcontact));
            if ($scope.tempcontact != undefined) {

                $scope.tempcontact.contactiteminfo = $scope.child.MNumber;
                alert(JSON.stringify($scope.tempcontact.contactiteminfo));
                console.log(JSON.stringify($scope.tempcontact));
                */
             
          


            /*        var contactObj = {
                    "contactKey": $scope.tempcontact.contactkey,
                    "contactTypeKey": $scope.tempcontact.contacttypekey,
                    "contactItemInfo":  $scope.child.MNumber
                }

                contactContactItemLogic.addContactContactItem(contactObj, $scope.tempcontact.contactkey).then(function (response) {
                    // getContactItems(contactKey);
                    console.log('contact item Save reponse ' + JSON.stringify(response));

                });*/
                /*contactContactItemLogic.updateContactContactItem($scope.tempcontact,$scope.tempcontact.contactkey,$scope.tempcontact.contactitemkey).then(function(response){
             ;  
            })
            }*/

            ThrillAppBasechildLogic.updateChild($scope.child).then(function (response) {
                 $scope.child.address.addressKey=addresskey;
                console.log(JSON.stringify(response));
                SweetAlert.swal({
                    title: "child",
                    text: "Updated successfully",
                    type: "success",
                    confirmButtonColor: "#007AFF"
                }, function() {
                    $state.go('app.childrens');
                });
                //alert(JSON.stringify($scope.child));
               // $state.go('app.childrens');
            });
        }
        /*
                ThrillAppBaseStaffLogic.postUser($scope.Staff).then(function (response) {

                    var userID = response.data.insertId;
                    var ReferenceKey = response.data.referenceKey;

                    sendMail(userID);


                });*/
    };

    if ($localStorage.Role == 'Admin') {
        $scope.viewMode = false;
        $scope.saveMode = true;
    } else if ($localStorage.Role == 'Doctor') {
        $scope.viewMode = true;
        $scope.saveMode = false;
    } else if ($localStorage.Role == 'Clerk') {
        $scope.viewMode = false;
        $scope.saveMode = true;
    } else if ($localStorage.Role == 'LabTechnician') {
        $scope.viewMode = true;
        $scope.saveMode = false;
    } else if ($localStorage.Role == 'Pharmacist') {
        $scope.viewMode = true;
        $scope.saveMode = false;
    }

    function getContactItems(contactKey) {
      
        contactLogic.getAllContacts(contactKey).then(function (response) {

            $scope.contactList = response;
               
            var contactArr = [];
            
            
            
           angular.forEach($scope.contactList, function (contact, i) {   
               
              // alert($scope.contactList)
                 listArray.push($scope.contactList)
                 
              });
            
            
            
            
           /// alert(JSON.stringify(listArray))
               
               
//         var contactObj = {
//                    "contactKey": $scope.child.contactKey,
//                    "contactTypeKey": $scope.child.contact.contactTypeKey,
//                    "contactItemInfo": $scope.child.contact.contactItemInfo
//                }
         
         

/*            angular.forEach($scope.contactList, function (contact, i) {
                console.log(contact.contactiteminfo + "==" + $scope.child.MNumber)
                
                if (contact.contactiteminfo == $scope.child.MNumber) {
                  
                    $scope.tempcontact = contact;

                } else {

                    contactArr.push(contact)
                }
                
                if(i==($scope.contactList.length-1))
                     alert(JSON.stringify($scope.contactArr));
                    $scope.contactList = contactArr;

            });*/
            
          

            

            // $scope.contactList = response;

        }, function (err) {
            console.log(err);
        })
    }

});