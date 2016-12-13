/*===========================================================================
 All rights reserved to Thrill Innovative Labs.
 THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
 OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
 LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
 FITNESS FOR A PARTICULAR PURPOSE.
============================================================================
****************************************************************************
 Name            :  Satyanarayana T
 Type            : Javascript and JQuery 
 Description     :
 References      :
 Author          :  Jagadeesh A
 Created Date    :  31-03-2016
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
/* create the fistime setup controller for Web
  also include Dependency Modules

*/


var app = angular.module('ThrillPerson.webSetup', ['ngCordova', 'ngStorage', 'ThrillPerson.setupQueries', 'ThrillPerson.Config', 'ThrillFrameworkLibrary.appLogger'])


//Set Up Employee Controller 
app.controller('AppSetupWebCtrl', function ($scope, $location, queries, $q, $localStorage, $rootScope, config, appLogger) {
    $scope.app = "loading...";

    
    function WebSqlDb(query, params) {
        //initiate asynchronous call use &q.defer
        var deferred = $q.defer();
        //Create Database instance
        //Open TestdB DataBase 
        var db = openDatabase(config.OFFLINE_DBNAME, '1.0', '', 20 * 1024 * 1024);

        //Prepare Query for Create table
        //Execute Sqlite Query  using tx Command
        db.transaction(function (tx) {

            //Prepare Query (CRUDE OPERATIONS)
            //Execute Sqlite Query  using tx Command
            tx.executeSql(query, params, function (tx, results) {

                deferred.resolve(results);
                // asynchronous process with result
                // this callback will be called asynchronously
                // when the response is available

            }, function (tx, e) {

                deferred.reject();
                //asynchronous process with error
                // called asynchronously if an error occurs
                // or data base returns response with an error status.
            });

        });

        //return results (or exceptions) when they are done processing
        return deferred.promise;
    }

    /**
       Check for the local storage value of IS_LOCAL_BD_EXISTS exists or no
       if value exist the routes to desire path
       if value is not set First timesetup functionality will be executed
       **/

    var IS_LOCAL_DB_EXISTS = $localStorage.INITIAL_SETUP_CHECK;
    if (IS_LOCAL_DB_EXISTS == "" || IS_LOCAL_DB_EXISTS == undefined || IS_LOCAL_DB_EXISTS == 0) {
        $scope.app = "First Time Setup Initializing...";
        appLogger.log("First Time Setup Initializing...");
        appSetupCreateTables();
    } else {
        $scope.app = "DB Exists...";
        appLogger.warn('DB Exists...');
        appLogger.log("DB Exists...");
        $location.path('/persons'); // Route to the desired path if IS_LOCAL_BD_EXISTS value exists
    }


    /***
      Create Database Tables if any error in promises detected appSetupDeleteTables 
      function is executed to rollback the setup
      ***/

    function appSetupCreateTables() {

        var promiseCreatePersons = createTable(queries.Persons);
        var promiseCreateBloodGroups = createTable(queries.BloodGroups);
        var promiseCreateGenders = createTable(queries.Genders);
        var promiseCreateDemographics = createTable(queries.Demographics);

        var promiseCreateRelatives = createTable(queries.Relatives);
        var promiseCreateRelationTypes = createTable(queries.RelationTypes);
        var promiseCreateLocation = createTable(queries.Location);

        var promiseCreateEducation = createTable(queries.Educations);
        var promiseCreateQualifications = createTable(queries.Qualifications);
        var promiseCreateLanguages = createTable(queries.Languages);

        var promiseCreateBankNames = createTable(queries.BankNames);
        var promiseCreateBanks = createTable(queries.Banks);

        var promiseCreateIdentities = createTable(queries.Identities);
        var promiseCreateIdentityTypes = createTable(queries.IdentityTypes);

        var promiseCreateVisas = createTable(queries.Visas);
        var promiseCreateVisaTypes = createTable(queries.VisaTypes);
        var promiseCreateCountries = createTable(queries.Countries);

        var promiseCreateWorkExperience = createTable(queries.WorkExperience);
        var promiseCreateDesignationTypes = createTable(queries.DesignationTypes);
        var promiseCreateOccupationTypes = createTable(queries.OccupationTypes);

        var promiseCreateHobbies = createTable(queries.Hobbies);
        var promiseCreateHobbyTypes = createTable(queries.HobbyTypes);

        var promiseCreateReligions = createTable(queries.Religions);
        var promiseCreateNationalities = createTable(queries.Nationalities);
        var promiseCreateSocialGroups = createTable(queries.SocialGroups);
        var promiseCreateReligionTypes = createTable(queries.ReligionTypes);



        var promiseCreateAwards = createTable(queries.Awards);
        var promiseCreateSportAwards = createTable(queries.SportAwards);

        var promiseCreateCirricularActivityTypes = createTable(queries.CirricularActivityTypes);
        var promiseCreateHighestLevelPlays = createTable(queries.HighestLevelPlays);
        var promiseCreateSportTypes = createTable(queries.SportTypes);
        var promiseCreateProficiencies = createTable(queries.Proficiencies);

        var promiseCreateSports = createTable(queries.Sports);

        var promiseCreateInsuranceTypes = createTable(queries.InsuranceTypes);
        var promiseCreateInsurance = createTable(queries.Insurance);
        var promiseCreateDiseaseTypes = createTable(queries.DiseaseTypes);
        var promiseCreateDisease = createTable(queries.Disease);


        var promiseCreateLanguageTypes = createTable(queries.LanguageTypes);
        var promiseCreateLanguageProficiencies = createTable(queries.LanguageProficiencies);
        var promiseCreateLivingPlaceTypes = createTable(queries.LivingPlaceTypes);
        var promiseCreateLivingPlace = createTable(queries.LivingPlace)
        var promiseCreateMaritalStatusTypes = createTable(queries.MaritalStatusTypes);
        var promiseCreateMaritalStatus = createTable(queries.MaritalStatus);
        var promiseCreateMedicineTypes = createTable(queries.MedicineTypes);
        var promiseCreateVaccinationTypes = createTable(queries.VaccinationTypes);
        var promiseCreateVaccinations = createTable(queries.Vaccinations)



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
            
            , promiseCreateLanguageTypes
            
            , promiseCreateLanguageProficiencies
            
            , promiseCreateLivingPlaceTypes
            
            , promiseCreateLivingPlace
            
            , promiseCreateMaritalStatusTypes
            
            , promiseCreateMaritalStatus
            
            , promiseCreateMedicineTypes
            
            , promiseCreateVaccinationTypes
            
            , promiseCreateVaccinations
            
            , promiseCreateInsuranceTypes
            
            , promiseCreateInsurance
            
            , promiseCreateDiseaseTypes
            
            , promiseCreateDisease


        ]).then(function (res) {

            $scope.app = "Tables Created...";
            appSetupInsertDataToTables();
        }, function (err) {

            appSetupDeleteTables()
        });

    }

    /***
        Insert Data Database Tables if any error in promises detected appSetupDeleteTables 
        function is executed to rollback the setup
        ***/

    function appSetupInsertDataToTables() {

        var promiseInsertBloodGroups = insertDataIntoTable(queries.InsertBloogGroups);
        var promiseInsertGenders = insertDataIntoTable(queries.InsertGenders);
        var promiseInsertRelationTypes = insertDataIntoTable(queries.InsertRelationTypes);
        var promiseInsertBankNames = insertDataIntoTable(queries.InsertBankNames);
        var promiseInsertQualifications = insertDataIntoTable(queries.InsertQualifications);
        var promiseInsertLanguages = insertDataIntoTable(queries.InsertLanguages);
        var promiseInsertIdentityTypes = insertDataIntoTable(queries.InsertIdentityTypes);
        var promiseInsertVisaTypes = insertDataIntoTable(queries.InsertVisaTypes);
        var promiseInsertInsertCountries = insertDataIntoTable(queries.InsertCountries);
        var promiseInsertDesignationTypes = insertDataIntoTable(queries.InsertDesignationTypes);
        var promiseInsertOccupationTypes = insertDataIntoTable(queries.InsertOccupationTypes);
        var promiseInsertNationalities = insertDataIntoTable(queries.InsertNationalities);
        var promiseInsertSocialGroups = insertDataIntoTable(queries.InsertSocialGroups);
        var promiseInsertReligionTypes = insertDataIntoTable(queries.InsertReligionTypes);
        var promiseInsertHobbyTypes = insertDataIntoTable(queries.InsertHobbyTypes);
        var promiseInsertInsuranceTypes = insertDataIntoTable(queries.InsertInsuranceTypes);
        var promiseInsertLanguageTypes = insertDataIntoTable(queries.InsertLanguageTypes);
        var promiseInsertLivingPlaceTypes = insertDataIntoTable(queries.InsertLivingPlaceTypes);
        var promiseInsertMaritalStatusTypes = insertDataIntoTable(queries.InsertMaritalStatusTypes)
        var promiseInsertMedicineTypes = insertDataIntoTable(queries.InsertMedicineTypes);
        var promiseInsertVaccinationTypes = insertDataIntoTable(queries.InsertVaccinationTypes)
        var promiseInsertCirricularActivityTypes = insertDataIntoTable(queries.InsertCirricularActivityTypes);
        var promiseInsertSportTypes = insertDataIntoTable(queries.InsertSportTypes);
        var promiseInsertHighestLevelPlays = insertDataIntoTable(queries.InsertHighestLevelPlays);
        var promiseInsertProficiencies = insertDataIntoTable(queries.InsertProficiencies);
        var promiseInsertDiseaseTypes = insertDataIntoTable(queries.InsertDiseaseTypes);



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
            
            , promiseInsertInsuranceTypes
            
            , promiseInsertLanguageTypes
            
            , promiseInsertLivingPlaceTypes
            
            , promiseInsertMaritalStatusTypes
            
            , promiseInsertMedicineTypes
            
            , promiseInsertVaccinationTypes
            
            , promiseInsertCirricularActivityTypes
            
            , promiseInsertSportTypes
            
            , promiseInsertHighestLevelPlays
            
            , promiseInsertProficiencies
            
            , promiseInsertDiseaseTypes



        ]).then(function (res) {

            $scope.app = "First Time Setup Done...";
            $localStorage.INITIAL_SETUP_CHECK = 1;
            $location.path('/persons');

        }, function (err) {

            $scope.app = "Error Creating Database...";
            appSetupDeleteTables()

        });

    }

    /***
      Roll back functionality to deleted the initialized database tables
       ***/

    function appSetupDeleteTables() {

        var promiseDeletePersons = deleteTableData(queries.DeletePersons);
        var promiseDeleteBloodGroups = deleteTableData(queries.DeleteBloodGroups);
        var promiseDeleteGenders = deleteTableData(queries.DeleteGenders);
        var promiseDeleteDemographics = deleteTableData(queries.DeleteDemographics);

        var promiseDeleteRelatives = deleteTableData(queries.DeleteRelatives);
        var promiseDeleteRelationTypes = deleteTableData(queries.DeleteRelationTypes);
        var promiseDeleteLocation = deleteTableData(queries.DeleteLocation);
        var promiseDeleteBankNames = deleteTableData(queries.DeleteBankNames);
        var promiseDeleteBanks = deleteTableData(queries.DeleteBanks);

        var promiseDeleteIdentities = deleteTableData(queries.DeleteIdentities);
        var promiseDeleteIdentityTypes = deleteTableData(queries.DeleteIdentityTypes);

        var promiseDeleteVisaTypes = deleteTableData(queries.VisaTypes);
        var promiseDeleteCountries = deleteTableData(queries.Countries);
        var promiseDeleteVisas = deleteTableData(queries.Visas);

        var promiseDeleteWorkExperience = deleteTableData(queries.DeleteWorkExperience);
        var promiseDeleteDesignationTypes = deleteTableData(queries.DeleteDesignationTypes);
        var promiseDeleteOccupationTypes = deleteTableData(queries.DeleteOccupationTypes);

        var promiseDeleteEducations = deleteTableData(queries.DeleteEducations);
        var promiseDeleteQualifications = deleteTableData(queries.DeleteQualifications);
        var promiseDeleteLanguages = deleteTableData(queries.DeleteLanguages);

        var promiseDeleteReligions = deleteTableData(queries.DeleteReligions);
        var promiseDeleteNationalities = deleteTableData(queries.DeleteNationalities);
        var promiseDeleteSocialGroups = deleteTableData(queries.DeleteSocialGroups);

        var promiseDeleteReligionTypes = deleteTableData(queries.DeleteReligionTypes);
        var promiseDeleteHobbies = deleteTableData(queries.DeleteHobbies);
        var promiseDeleteHobbyTypes = deleteTableData(queries.DeleteHobbyTypes);


        var promiseDeleteLanguageTypes = deleteTableData(queries.DeleteLanguageTypes);
        var promiseDeleteLanguageProficiencies = deleteTableData(queries.DeleteLanguageProficiencies);
        var promiseDeleteLivingPlaceTypes = deleteTableData(queries.DeleteLivingPlaceTypes);
        var promiseDeleteLivingPlace = deleteTableData(queries.DeleteLivingPlace);
        var promiseDeleteMaritalStatusTypes = deleteTableData(queries.DeleteMaritalStatusTypes);
        var promiseDeleteMaritalStatus = deleteTableData(queries.DeleteMaritalStatus);
        var promiseDeleteMedicineTypes = deleteTableData(queries.DeleteMedicineTypes);
        var promiseDeleteVaccinationTypes = deleteTableData(queries.DeleteVaccinationTypes);
        var promiseDeleteVaccinations = deleteTableData(queries.DeleteVaccinations)

        var promiseDeleteHighestLevelPlays = deleteTableData(queries.DeleteHighestLevelPlays);
        var promiseDeleteSportTypes = deleteTableData(queries.DeleteSportTypes);
        var promiseDeleteCirricularActivityTypes = deleteTableData(queries.DeleteCirricularActivityTypes);
        var promiseDeleteProficiencies = deleteTableData(queries.DeleteProficiencies);
        var promiseDeleteSports = deleteTableData(queries.DeleteSports);

        var promiseDeleteinsuranceTypes = deleteTableData(queries.DeleteInsuranceTypes);
        var promiseDeleteinsurance = deleteTableData(queries.DeleteInsurance);
        var promiseDeleteDiseaseTypes = deleteTableData(queries.DeleteDiseaseTypes);
        var promiseDeleteDisease = deleteTableData(queries.DeleteDisease);




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
            
            , promiseDeleteDiseaseTypes
            
            , promiseDeleteDisease


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
    function createTable(query) {

        var deferred = $q.defer();

        WebSqlDb(query, []).then(function (res) {

            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);

        });
        return deferred.promise;
    }

    /***
      Insert data to created database tables 
      ***/

    function insertDataIntoTable(query) {

        var deferred = $q.defer();
        WebSqlDb(query, []).then(function (res) {

            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);

        });
        return deferred.promise;
    }

    /***
      
    Delete database tables in rollback functionality
     ***/

    function deleteTableData(query) {

        var deferred = $q.defer();
        WebSqlDb(query, []).then(function (res) {

            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);

        });
        return deferred.promise;
    }

});