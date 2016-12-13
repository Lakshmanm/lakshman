/*===========================================================================
 All rights reserved to Thrill Innovative Labs.
 THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
 OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
 LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
 FITNESS FOR A PARTICULAR PURPOSE.
============================================================================
****************************************************************************
 Name         :  FirstTimeSetUp
 Type         : Javascript and JQuery 
 Description    :
 References       :
 Author         :  Sunitha
 Created Date       :  31-03-2016
****************************************************************************                          
MODIFICATION LOG
**************************************************************************** 
Ver Date       Modified By      Description
****************************************************************************                            
Code Review LOG
**************************************************************************** 
Ver        Date                Code Review By            Observations
****************************************************************************
*/
/* create the databasequeries module 
  also include Dependency Modules

*/


var app = angular.module('ThrillPerson.mobileSetup', ['ngCordova', 'ngStorage', 'ThrillPerson.setupQueries', 'ThrillPerson.Config', 'ThrillFrameworkLibrary.appLogger'])

//First time Set up Controller
app.controller('AppSetupMobCtrl', function ($scope, $location, queries, $q, $localStorage, $rootScope, $state, config, $cordovaSQLite, appLogger) {


    $scope.app = "loading...";
    document.addEventListener('deviceready', onDeviceReady, false);

    function onDeviceReady() {

        //Databse initialization to a global variable db

        db = $cordovaSQLite.openDB(config.OFFLINE_DBNAME);

        /**
        Check for the local storage value of IS_LOCAL_BD_EXISTS exists or no
        if value exist the routes to desire path
        if value is not set First timesetup functionality will be executed
        **/

        var IS_LOCAL_DB_EXISTS = $localStorage.INITIAL_SETUP_CHECK;

        if (IS_LOCAL_DB_EXISTS == "" || IS_LOCAL_DB_EXISTS == undefined || IS_LOCAL_DB_EXISTS == 0) {
            $scope.app = "First Time Setup Initializing...";
            appSetupCreateTables();
        } else {
            $scope.app = "DB Exists...";
            appLogger.info('DB Exists...');
            $state.go('persons');
            // $state.go('app.EmployeeList');  // Route to the desired path if IS_LOCAL_BD_EXISTS value exists
        }
    }

    /***
     Create Database Tables if any error in promises detected appSetupDeleteTables 
     function is executed to rollback the setup
     ***/

    function appSetupCreateTables() {

        var promiseCreatePersons = createPersonsTable(queries.Persons);
        var promiseCreateBloodGroups = createPersonsTable(queries.BloodGroups);
        var promiseCreateGenders = createPersonsTable(queries.Genders);
        var promiseCreateDemographics = createPersonsTable(queries.Demographics);

        var promiseCreateRelatives = createPersonsTable(queries.Relatives);
        var promiseCreateRelationTypes = createPersonsTable(queries.RelationTypes);
        var promiseCreateLocation = createPersonsTable(queries.Location);

        var promiseCreateEducation = createPersonsTable(queries.Educations);
        var promiseCreateQualifications = createPersonsTable(queries.Qualifications);
        var promiseCreateLanguages = createPersonsTable(queries.Languages);

        var promiseCreateBankNames = createPersonsTable(queries.BankNames);
        var promiseCreateBanks = createPersonsTable(queries.Banks);

        var promiseCreateIdentities = createPersonsTable(queries.Identities);
        var promiseCreateIdentityTypes = createPersonsTable(queries.IdentityTypes);

        var promiseCreateVisas = createPersonsTable(queries.Visas);
        var promiseCreateVisaTypes = createPersonsTable(queries.VisaTypes);
        var promiseCreateCountries = createPersonsTable(queries.Countries);

        var promiseCreateWorkExperience = createPersonsTable(queries.WorkExperience);
        var promiseCreateDesignationTypes = createPersonsTable(queries.DesignationTypes);
        var promiseCreateOccupationTypes = createPersonsTable(queries.OccupationTypes);

        var promiseCreateHobbies = createPersonsTable(queries.Hobbies);
        var promiseCreateHobbyTypes = createPersonsTable(queries.HobbyTypes);

        var promiseCreateReligions = createPersonsTable(queries.Religions);
        var promiseCreateNationalities = createPersonsTable(queries.Nationalities);
        var promiseCreateSocialGroups = createPersonsTable(queries.SocialGroups);
        var promiseCreateReligionTypes = createPersonsTable(queries.ReligionTypes);


        var promiseCreateAwards = createPersonsTable(queries.Awards);
        var promiseCreateSportAwards = createPersonsTable(queries.SportAwards);

        var promiseCreateCirricularActivityTypes = createPersonsTable(queries.CirricularActivityTypes);
        var promiseCreateHighestLevelPlays = createPersonsTable(queries.HighestLevelPlays);
        var promiseCreateSportTypes = createPersonsTable(queries.SportTypes);
        var promiseCreateProficiencies = createPersonsTable(queries.Proficiencies);

        var promiseCreateSports = createPersonsTable(queries.Sports);
        var promiseCreateInsuranceTypes = createPersonsTable(queries.InsuranceTypes);
        var promiseCreateInsurance = createPersonsTable(queries.Insurance);

        var promiseCreateLanguageTypes = createPersonsTable(queries.LanguageTypes);
        var promiseCreateLanguageProficiencies = createPersonsTable(queries.LanguageProficiencies);
        var promiseCreateLivingPlaceTypes = createPersonsTable(queries.LivingPlaceTypes);
        var promiseCreateLivingPlace = createPersonsTable(queries.LivingPlace)
        var promiseCreateMaritalStatusTypes = createPersonsTable(queries.MaritalStatusTypes);
        var promiseCreateMaritalStatus = createPersonsTable(queries.MaritalStatus);
        var promiseCreateMedicineTypes = createPersonsTable(queries.MedicineTypes);
        var promiseCreateVaccinationTypes = createPersonsTable(queries.VaccinationTypes);
        var promiseCreateVaccinations = createPersonsTable(queries.Vaccinations)

        $q.all([promiseCreatePersons
            
            , promiseCreateBloodGroups
            
            , promiseCreateGenders
            
            , promiseCreateDemographics
            
            , promiseCreateRelatives
            
            , promiseCreateRelationTypes
            
            , promiseCreateLocation
            
            , promiseCreateEducation
            
            , promiseCreateQualifications
            
            , promiseCreateLanguages
            
            , promiseCreateBankNames
            
            , promiseCreateBanks
            
            , promiseCreateIdentities
            
            , promiseCreateIdentityTypes
            
            , promiseCreateVisas
            
            , promiseCreateVisaTypes
            
            , promiseCreateCountries
            
            , promiseCreateWorkExperience
            
            , promiseCreateDesignationTypes
            
            , promiseCreateOccupationTypes
            
            , promiseCreateReligions
            
            , promiseCreateNationalities
            
            , promiseCreateSocialGroups
            
            , promiseCreateReligionTypes
            
            , promiseCreateHobbies
            
            , promiseCreateHobbyTypes
            
            , promiseCreateAwards
            
            , promiseCreateSportAwards
            
            , promiseCreateCirricularActivityTypes
            
            , promiseCreateHighestLevelPlays
            
            , promiseCreateSportTypes
            
            , promiseCreateProficiencies
            
            , promiseCreateInsuranceTypes
            
            , promiseCreateInsurance
            
            , promiseCreateLanguageTypes
            
            , promiseCreateLanguageProficiencies
            
            , promiseCreateLivingPlaceTypes
            
            , promiseCreateLivingPlace
            
            , promiseCreateMaritalStatusTypes
            
            , promiseCreateMaritalStatus
            
            , promiseCreateMedicineTypes
            
            , promiseCreateVaccinationTypes
            
            , promiseCreateVaccinations
        ]).then(function (res) {

            $scope.app = "Tables Created...";
            appSetupInsertDatetoTables();

        }, function (err) {

            appSetupDeleteTables()

        });


    }

    /***
       Insert Data Database Tables if any error in promises detected appSetupDeleteTables 
       function is executed to rollback the setup
       ***/
    function appSetupInsertDatetoTables() {

        var promiseInsertBloodGroups = insertPersonsTableData(queries.InsertBloogGroups);
        var promiseInsertGenders = insertPersonsTableData(queries.InsertGenders);
        var promiseInsertRelationTypes = insertPersonsTableData(queries.InsertRelationTypes);
        var promiseInsertBankNames = insertPersonsTableData(queries.InsertBankNames);
        var promiseInsertQualifications = insertPersonsTableData(queries.InsertQualifications);
        var promiseInsertLanguages = insertPersonsTableData(queries.InsertLanguages);
        var promiseInsertIdentityTypes = insertPersonsTableData(queries.InsertIdentityTypes);
        var promiseInsertVisaTypes = insertPersonsTableData(queries.InsertVisaTypes);
        var promiseInsertInsertCountries = insertPersonsTableData(queries.InsertCountries);
        var promiseInsertDesignationTypes = insertPersonsTableData(queries.InsertDesignationTypes);
        var promiseInsertOccupationTypes = insertPersonsTableData(queries.InsertOccupationTypes);
        var promiseInsertNationalities = insertPersonsTableData(queries.InsertNationalities);
        var promiseInsertSocialGroups = insertPersonsTableData(queries.InsertSocialGroups);
        var promiseInsertReligionTypes = insertPersonsTableData(queries.InsertReligionTypes);
        var promiseInsertHobbyTypes = insertPersonsTableData(queries.InsertHobbyTypes);
        var promiseInsertInsuranceTypes = insertPersonsTableData(queries.InsertInsuranceTypes);
        var promiseInsertLanguageTypes = insertPersonsTableData(queries.InsertLanguageTypes);
        var promiseInsertLivingPlaceTypes = insertPersonsTableData(queries.InsertLivingPlaceTypes);
        var promiseInsertMaritalStatusTypes = insertPersonsTableData(queries.InsertMaritalStatusTypes)
        var promiseInsertMedicineTypes = insertPersonsTableData(queries.InsertMedicineTypes);
        var promiseInsertVaccinationTypes = insertPersonsTableData(queries.InsertVaccinationTypes)
        var promiseInsertCirricularActivityTypes = insertPersonsTableData(queries.InsertCirricularActivityTypes);
        var promiseInsertSportTypes = insertPersonsTableData(queries.InsertSportTypes);
        var promiseInsertHighestLevelPlays = insertPersonsTableData(queries.InsertHighestLevelPlays);
        var promiseInsertProficiencies = insertPersonsTableData(queries.InsertProficiencies);


        $q.all([promiseInsertBloodGroups
            
            , promiseInsertGenders
            
            , promiseInsertRelationTypes
            
            , promiseInsertBankNames
            
            , promiseInsertQualifications
            
            , promiseInsertLanguages
            
            , promiseInsertIdentityTypes
            
            , promiseInsertVisaTypes
            
            , promiseInsertInsertCountries
            
            , promiseInsertDesignationTypes
            
            , promiseInsertOccupationTypes
            
            , promiseInsertNationalities
            
            , promiseInsertSocialGroups
            
            , promiseInsertReligionTypes
            
            , promiseInsertHobbyTypes
            
            , promiseInsertLanguageTypes
            
            , promiseInsertLivingPlaceTypes
            
            , promiseInsertMaritalStatusTypes
            
            , promiseInsertMedicineTypes
            
            , promiseInsertVaccinationTypes
            
            , promiseInsertCirricularActivityTypes
            
            , promiseInsertSportTypes
            
            , promiseInsertHighestLevelPlays
            
            , promiseInsertProficiencies
            
            , promiseInsertInsuranceTypes


        ]).then(function (res) {

            $scope.app = "First Time Setup Done...";
            $localStorage.INITIAL_SETUP_CHECK = 1;
            $state.go('persons');
            //$state.go('app.EmployeeList');     // Route to the desired path after First time setup

        }, function (err) {
            appLogger.error(err);
            $scope.app = "Error Creating Database...";
            appSetupDeleteTables()

        });

    }

    /***
      Roll back functionality to deleted the initialized database tables
       ***/

    function appSetupDeleteTables() {

        var promiseDeletePersons = deletePersonsTableData(queries.DeletePersons);
        var promiseDeleteBloodGroups = deletePersonsTableData(queries.DeleteBloodGroups);
        var promiseDeleteGenders = deletePersonsTableData(queries.DeleteGenders);
        var promiseDeleteDemographics = deletePersonsTableData(queries.DeleteDemographics);

        var promiseDeleteRelatives = deletePersonsTableData(queries.DeleteRelatives);
        var promiseDeleteRelationTypes = deletePersonsTableData(queries.DeleteRelationTypes);
        var promiseDeleteLocation = deletePersonsTableData(queries.DeleteLocation);
        var promiseDeleteBankNames = deletePersonsTableData(queries.DeleteBankNames);
        var promiseDeleteBanks = deletePersonsTableData(queries.DeleteBanks);

        var promiseDeleteIdentities = deletePersonsTableData(queries.DeleteIdentities);
        var promiseDeleteIdentityTypes = deletePersonsTableData(queries.DeleteIdentityTypes);

        var promiseDeleteVisaTypes = deletePersonsTableData(queries.VisaTypes);
        var promiseDeleteCountries = deletePersonsTableData(queries.Countries);
        var promiseDeleteVisas = deletePersonsTableData(queries.Visas);

        var promiseDeleteWorkExperience = deletePersonsTableData(queries.DeleteWorkExperience);
        var promiseDeleteDesignationTypes = deletePersonsTableData(queries.DeleteDesignationTypes);
        var promiseDeleteOccupationTypes = deletePersonsTableData(queries.DeleteOccupationTypes);

        var promiseDeleteEducations = deletePersonsTableData(queries.DeleteEducations);
        var promiseDeleteQualifications = deletePersonsTableData(queries.DeleteQualifications);
        var promiseDeleteLanguages = deletePersonsTableData(queries.DeleteLanguages);

        var promiseDeleteReligions = deletePersonsTableData(queries.DeleteReligions);
        var promiseDeleteNationalities = deletePersonsTableData(queries.DeleteNationalities);
        var promiseDeleteSocialGroups = deletePersonsTableData(queries.DeleteSocialGroups);

        var promiseDeleteReligionTypes = deletePersonsTableData(queries.DeleteReligionTypes);
        var promiseDeleteHobbies = deletePersonsTableData(queries.DeleteHobbies);
        var promiseDeleteHobbyTypes = deletePersonsTableData(queries.DeleteHobbyTypes);

        var promiseDeleteLanguageTypes = deletePersonsTableData(queries.DeleteLanguageTypes);
        var promiseDeleteLanguageProficiencies = deletePersonsTableData(queries.DeleteLanguageProficiencies);
        var promiseDeleteLivingPlaceTypes = deletePersonsTableData(queries.DeleteLivingPlaceTypes);
        var promiseDeleteLivingPlace = deletePersonsTableData(queries.DeleteLivingPlace);
        var promiseDeleteMaritalStatusTypes = deletePersonsTableData(queries.DeleteMaritalStatusTypes);
        var promiseDeleteMaritalStatus = deletePersonsTableData(queries.DeleteMaritalStatus);
        var promiseDeleteMedicineTypes = deletePersonsTableData(queries.DeleteMedicineTypes);
        var promiseDeleteVaccinationTypes = deletePersonsTableData(queries.DeleteVaccinationTypes);
        var promiseDeleteVaccinations = deletePersonsTableData(queries.DeleteVaccinations)

        var promiseDeleteHighestLevelPlays = deletePersonsTableData(queries.DeleteHighestLevelPlays);
        var promiseDeleteSportTypes = deletePersonsTableData(queries.DeleteSportTypes);
        var promiseDeleteCirricularActivityTypes = deletePersonsTableData(queries.DeleteCirricularActivityTypes);
        var promiseDeleteProficiencies = deletePersonsTableData(queries.DeleteProficiencies);
        var promiseDeleteSports = deletePersonsTableData(queries.DeleteSports);

        var promiseDeleteinsuranceTypes = deletePersonsTableData(queries.DeleteInsuranceTypes);
        var promiseDeleteinsurance = deletePersonsTableData(queries.DeleteInsurance);


        $q.all([promiseDeletePersons
            
            , promiseDeleteBloodGroups
            
            , promiseDeleteGenders
            
            , promiseDeleteDemographics
            
            , promiseDeleteRelatives
            
            , promiseDeleteRelationTypes
            
            , promiseDeleteLocation
            
            , promiseDeleteBankNames
            
            , promiseDeleteBanks
            
            , promiseDeleteIdentities
            
            , promiseDeleteIdentityTypes
            
            , promiseDeleteVisaTypes
            
            , promiseDeleteCountries
            
            , promiseDeleteVisas
            
            , promiseDeleteWorkExperience
            
            , promiseDeleteDesignationTypes
            
            , promiseDeleteOccupationTypes
            
            , promiseDeleteEducations
            
            , promiseDeleteQualifications
            
            , promiseDeleteLanguages
            
            , promiseDeleteReligions
            
            , promiseDeleteNationalities
            
            , promiseDeleteSocialGroups
            
            , promiseDeleteReligionTypes
            
            , promiseDeleteHobbies
            
            , promiseDeleteHobbyTypes
            
            , promiseDeleteLanguageTypes
            
            , promiseDeleteLanguageProficiencies
            
            , promiseDeleteLivingPlaceTypes
            
            , promiseDeleteLivingPlace
            
            , promiseDeleteMaritalStatusTypes
            
            , promiseDeleteMaritalStatus
            
            , promiseDeleteVaccinationTypes
            
            , promiseDeleteVaccinations
            
            , promiseDeleteAwards
            
            , promiseDeleteSportAwards
            
            , promiseDeleteHighestLevelPlays
            
            , promiseDeleteSportTypes
            
            , promiseDeleteCirricularActivityTypes
            
            , promiseDeleteSports
            
            , promiseDeleteProficiencies
            
            , promiseDeleteinsuranceTypes
            
            , promiseDeleteinsurance
        ]).then(function (res) {

            $scope.app = "Deleted All Tables...";
            appLogger.warn('Deleted All Tables...');
            //appSetupCreateTables()

        }, function (err) {


            appLogger.error('Appsetup installation failed');

        });


    }


    /***
      
    Create table functionality to create all the database tables 
     ***/

    function createPersonsTable(query) {

        var deferred = $q.defer();
        $cordovaSQLite.execute(db, query, []).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    }

    /***
     
     Insert data to created database tables 
      ***/
    function insertPersonsTableData(query) {

        var deferred = $q.defer();
        $cordovaSQLite.execute(db, query, []).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    }

    /***
     
     Delete database tables in rollback functionality
      ***/

    function deletePersonsTableData(query) {

        var deferred = $q.defer();
        $cordovaSQLite.execute(db, query, []).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    }

});