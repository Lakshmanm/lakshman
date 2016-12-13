/*===========================================================================
 All rights reserved to Thrill Innovative Labs.
 THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
 OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
 LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
 FITNESS FOR A PARTICULAR PURPOSE.
============================================================================
****************************************************************************
 Name            :  Jagadeesh A
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
/* create the databasequeries module 
  also include Dependency Modules

*/

var app = angular.module('ThrillPerson.setupQueries', [])
    /*Create The queries Constant
    Use this queries to any modules
    */
    /*offline db set up quiries */
app.constant('queries', {

    Persons: "CREATE TABLE IF NOT EXISTS `person.persons`(personId INTEGER PRIMARY KEY,referenceKey,firstName, middleName, lastName, dateOfBirth, placeOfBirth, genderId, identificationMarks, bloodGroupId, folderKey, n3DMSFileKey, isActive,isDeleted,isSync,serverId, createdByUserId, createdDateTime, lastUpdatedByUserId, lastUpdateTime)",
    DeletePersons: "DROP TABLE Persons",

    BloodGroups: "CREATE TABLE IF NOT EXISTS `masterdata.bloodGroups`(bloodGroupId INTEGER PRIMARY KEY, bloodGroupName,  isActive,isDeleted,isSync,serverId, createdByUserId, createdDateTime, lastUpdatedByUserId, lastUpdateTime)",
    InsertBloogGroups: "INSERT INTO `masterdata.bloodGroups`(bloodGroupId,bloodGroupName) VALUES(1,'O+')",
    DeleteBloodGroups: "DROP TABLE `masterdata.bloodGroups`",

    Genders: "CREATE TABLE IF NOT EXISTS `masterdata.genders`(genderId INTEGER PRIMARY KEY,title,isActive,isDeleted,isSync,serverId, createdByUserId, createdDateTime, lastUpdatedByUserID, lastUpdateTime)",
    InsertGenders: "INSERT INTO `masterdata.genders`(genderId,title) VALUES(1,'Male')",
    DeleteGenders: "DROP TABLE `masterdata.genders`",

    Demographics: "CREATE TABLE IF NOT EXISTS `person.demographics`(referenceKey,personReferenceKey,height,weight,bmi,temperature,hemoglobin,inspectionDate,photoPath,n3DMSFileKey,isActive,isDeleted,isSync,serverId, createdByUserId, createdDateTime, lastUpdatedByUserID, lastUpdateTime)",
    DeleteDemographics: "DROP TABLE `person.demographics`",

    Relatives: "CREATE Table IF NOT EXISTS  `person.relatives`(referenceKey,personReferenceKey,relationTypeId, isGaurdian, relativePersonId,isActive,isDeleted,isSync,serverId, createdByUserId, createdDateTime, lastUpdatedByUserId, lastUpdateTime)",
    DeleteRelatives: "DROP TABLE `person.relatives`",


    RelationTypes: "CREATE Table IF NOT EXISTS `masterdata.relationTypes`(relationTypeId INTEGER PRIMARY KEY, relationTypeName, isActive,isDeleted,isSync,serverId, createdByUserId, createdDateTime, lastUpdatedByUserId, lastUpdateTime)",
    InsertRelationTypes: "INSERT INTO `masterdata.relationTypes`(relationTypeId,relationTypeName) VALUES(1,'Father')",
   DeleteRelationTypes: "DROP TABLE `masterdata.relationTypes`",

    Location: "CREATE Table IF NOT EXISTS  `person.locations`(locationId INTEGER PRIMARY KEY,geoLocation, latitude, longitude, countryId, stateId, districtId, mandalId, villageId,isActive,isDeleted,isSync,serverId, createdByUserId, createdDateTime, lastUpdatedByUserId, lastUpdateTime)",
    DeleteLocation: "DROP TABLE `person.locations`",

    Educations: "CREATE Table IF NOT EXISTS  `person.educations`(referenceKey,personReferenceKey, educationName,startDate,endDate,instituteName,instituteCode,instituteMedium,marksObtained,gradeObtained,locationId,yearOfPassing,qualificationId, isActive,isSync,serverID, createdByUserID, createdDateTime, lastUpdatedByUserID, lastUpdateTime)",
    DeleteEducations: "DROP TABLE `person.educations`",

    Qualifications: "CREATE TABLE IF NOT EXISTS `masterdata.qualifications`(qualificationId INTEGER PRIMARY KEY,qualificationName,isActive,isDeleted,isSync,serverID, createdByUserID, createdDateTime, lastUpdatedByUserID, lastUpdateTime)",
    InsertQualifications: "INSERT INTO `masterdata.qualifications`(qualificationId,qualificationName) VALUES(1,'B.TECH')",
   DeleteQualifications: "DROP TABLE `masterdata.qualifications`",

    Languages: "CREATE TABLE IF NOT EXISTS `masterdata.languages`(languageId INTEGER PRIMARY KEY,languageName,isActive,isDeleted,isSync,serverID, createdByUserID, createdDateTime, lastUpdatedByUserID, lastUpdateTime)",
    InsertLanguages: "INSERT INTO `masterdata.languages`(languageId,languageName) VALUES(1,'Telugu')",
    DeleteLanguages: "DROP TABLE `masterdata.languages`",

    BankNames: "CREATE TABLE IF NOT EXISTS `masterdata.bankNames`(bankNameId INTEGER PRIMARY KEY,bankName,isActive,isDeleted,isSync,serverID, createdByUserID, createdDateTime, lastUpdatedByUserID, lastUpdateTime)",
    InsertBankNames: "INSERT INTO `masterdata.bankNames`(bankNameId,bankName) VALUES(1,'SBI')",
   DeleteBankNames: "DROP TABLE `masterdata.bankNames`",


    Banks: "CREATE TABLE IF NOT EXISTS `person.banks`(referenceKey,personReferenceKey,bankTitle,branchName,accountNumber,iFSCCode,bankNameId,locationId,isActive,isDeleted,isSync,serverID,createdByUserID, createdDateTime, lastUpdatedByUserID, lastUpdateTime)",
    DeleteBanks: "DROP TABLE `person.banks`",

    Identities: "CREATE TABLE IF NOT EXISTS `person.identities`(referenceKey,personReferenceKey,identityTypeId,identityNumber,n3DMSFileKey,isActive,isDeleted,isSync,serverId, createdByUserId, createdDateTime, lastUpdatedByUserID, lastUpdateTime)",
    DeleteIdentities: "DROP TABLE `person.identities`",

    IdentityTypes: "CREATE TABLE IF NOT EXISTS `masterdata.identityTypes`(identityTypeId INTEGER PRIMARY KEY,identityTypeName,isActive,isDeleted,isSync,serverId, createdByUserId, createdDateTime, lastUpdatedByUserId, lastUpdateTime)",
    InsertIdentityTypes: "INSERT INTO `masterdata.identityTypes`(identityTypeId,identityTypeName) VALUES(1,'pancard')",
    DeleteIdentityTypes: "DROP TABLE `masterdata.identityTypes`",

    Visas: "CREATE Table IF NOT EXISTS `person.visas`(referenceKey,personReferenceKey,countryId,visaTypeId,startDate,endDate,n3DMSFileKey,isActive,isDeleted,isSync,serverId, createdByUserId, createdDateTime, lastUpdatedByUserId, lastUpdateTime)",
    DeleteIdentityTypes: "DROP TABLE `person.visas`",

    VisaTypes: "CREATE TABLE IF NOT EXISTS `masterdata.visaTypes`(visaTypeId INTEGER PRIMARY KEY,visaTypeName,isActive,isDeleted,isSync,serverID, createdByUserID, createdDateTime, lastUpdatedByUserID, lastUpdateTime)",
    InsertVisaTypes: "INSERT INTO `masterdata.visaTypes`(visaTypeId,visaTypeName) VALUES(1,'India')",
   DeleteVisaTypes: "DROP TABLE `masterdata.visaTypes`",

    Countries: "CREATE TABLE IF NOT EXISTS `masterdata.countries`(countryId INTEGER PRIMARY KEY,countryName,isActive,isDeleted,isSync,serverID, createdByUserID, createdDateTime, lastUpdatedByUserID, lastUpdateTime)",
    InsertCountries: "INSERT INTO `masterdata.countries`(countryId,countryName) VALUES(1,'India')",
    DeleteCountries: "DROP TABLE `masterdata.countries`",

    WorkExperience: "CREATE Table IF NOT EXISTS  `person.workExperience`(referenceKey,personReferenceKey,workExperienceName,startDate,endDate,organizationName,occupationId,designationId,locationId,totalYears,teachingExperience,otherExperience,isActive,isDeleted,isSync,serverId,createdByUserId,createdDateTime,lastUpdatedByUserId,lastUpdateTime)",
    DeleteWorkExperience: "DROP TABLE `person.workExperience`",


    DesignationTypes: "CREATE Table IF NOT EXISTS  `masterdata.designations`(designationId INTEGER PRIMARY KEY,designationName,isActive,isDeleted,isSync,serverId, createdByUserId, createdDateTime, lastUpdatedByUserId, lastUpdateTime)",
    InsertDesignationTypes: "INSERT INTO `masterdata.designations`(designationId,designationName) VALUES(1,'Jr.Consutant IT')",
    DeleteDesignationTypes: "DROP TABLE `masterdata.designations`",

    OccupationTypes: "CREATE Table IF NOT EXISTS  `masterdata.occupations`(occupationId INTEGER PRIMARY KEY, occupationName, isActive,isDeleted,isSync,serverId, createdByUserId, createdDateTime, lastUpdatedByUserId, lastUpdateTime)",
    InsertOccupationTypes: "INSERT INTO `masterdata.occupations`(occupationId,occupationName) VALUES(1,'Employee')",
    DeleteOccupationTypes: "DROP TABLE `masterdata.occupations`",

    Religions: "CREATE Table IF NOT EXISTS  `person.religions`(referenceKey,personReferenceKey,nationalityId,socialGroupId,religionTypeId, isActive,isSync,serverID, createdByUserID, createdDateTime, lastUpdatedByUserID, lastUpdateTime)",
   DeleteReligions: "DROP TABLE `person.religions`",

    Nationalities: "CREATE TABLE IF NOT EXISTS `masterdata.nationalities`(nationalityId INTEGER PRIMARY KEY,nationalityName,isActive,isDeleted,isSync,serverID, createdByUserID, createdDateTime, lastUpdatedByUserID, lastUpdateTime)",
    InsertNationalities: "INSERT INTO `masterdata.nationalities`(nationalityId,nationalityName) VALUES(1,'Indian')",
   DeleteNationalities: "DROP TABLE `masterdata.nationalities`",


    SocialGroups: "CREATE TABLE IF NOT EXISTS `masterdata.socialGroups`(socialGroupId INTEGER PRIMARY KEY,socialGroupName,isActive,isDeleted,isSync,serverID, createdByUserID, createdDateTime, lastUpdatedByUserID, lastUpdateTime)",
    InsertSocialGroups: "INSERT INTO `masterdata.socialGroups`(socialGroupId,socialGroupName) VALUES(1,'OC')",
    DeleteSocialGroups: "DROP TABLE `masterdata.socialGroups`",

    ReligionTypes: "CREATE TABLE IF NOT EXISTS `masterdata.religionTypes`(religionTypeId INTEGER PRIMARY KEY,religionTypeName,isActive,isDeleted,isSync,serverID, createdByUserID, createdDateTime, lastUpdatedByUserID, lastUpdateTime)",
    InsertReligionTypes: "INSERT INTO `masterdata.religionTypes`(religionTypeId,religionTypeName) VALUES(1,'Hindu')",

   DeleteReligionTypes: "DROP TABLE `masterdata.religionTypes`",


    Hobbies: "CREATE Table IF NOT EXISTS `person.hobbies`(referenceKey,personReferenceKey,proficiencyId,hobbyTypeId,hobbyName,details, isActive,isSync,serverID, createdByUserID, createdDateTime, lastUpdatedByUserID, lastUpdateTime)",
    DeleteHobbies: "DROP TABLE `person.hobbies`",

    HobbyTypes: "CREATE Table IF NOT EXISTS `masterdata.hobbyTypes` (hobbyTypeId INTEGER PRIMARY KEY,hobbyTypeName,isActive,isSync,serverID, createdByUserID, createdDateTime, lastUpdatedByUserID, lastUpdateTime)",
    InsertHobbyTypes: "INSERT INTO `masterdata.hobbyTypes`(hobbyTypeId,hobbyTypeName) VALUES(1,'Dancing')",

   DeleteHobbyTypes: "DROP TABLE `masterdata.hobbyTypes`",
   



    Awards: "CREATE Table IF NOT EXISTS  `person.awards`(awardId INTEGER PRIMARY KEY,referenceKey,personReferenceKey,awardName,awardedDate,description,awardedOrganization,locationId,isActive,isDeleted,isSync,serverId,createdByUserId,createdDateTime,lastUpdatedByUserId,lastUpdateTime)",
    DeleteAwards: "DROP TABLE `person.awards`",


    SportAwards: "CREATE Table IF NOT EXISTS  `person.sportAwards`(referenceKey,personReferenceKey,awardId,awardName,cirricularActivityName,gameDetails,isActive,isDeleted,isSync,serverId, createdByUserId,createdDateTime,lastUpdatedByUserId, lastUpdateTime)",
     DeleteSportAwards: "DROP TABLE  `person.sportAwards`",

   
   CirricularActivityTypes: "CREATE TABLE IF NOT EXISTS `masterdata.cirricularActivityTypes`(cirricularActivityTypeID INTEGER PRIMARY KEY,cirricularActivityTypeName,isActive,isDeleted,isSync,serverID, createdByUserID, createdDateTime, lastUpdatedByUserID, lastUpdateTime)",
    InsertCirricularActivityTypes: "INSERT INTO `masterdata.cirricularActivityTypes`(cirricularActivityTypeID,cirricularActivityTypeName) VALUES(1,'DANCE')",
    DeleteCirricularActivityTypes: "DROP TABLE `masterdata.cirricularActivityTypes`",

    SportTypes: "CREATE TABLE IF NOT EXISTS `masterdata.sportTypes`(sportTypeId INTEGER PRIMARY KEY,sportTypeName,isActive,isDeleted,isSync,serverID, createdByUserID, createdDateTime, lastUpdatedByUserID, lastUpdateTime)",
    InsertSportTypes: "INSERT INTO `masterdata.sportTypes`(sportTypeId,sportTypeName) VALUES(1,'INDOOR')",
    DeleteSportTypes: "DROP TABLE `masterdata.sportTypes`",

    HighestLevelPlays: "CREATE TABLE IF NOT EXISTS `masterdata.highestLevelPlays`(highestLevelPlayId INTEGER PRIMARY KEY,highestLevelPlayName,isActive,isDeleted,isSync,serverID, createdByUserID, createdDateTime, lastUpdatedByUserID, lastUpdateTime)",
    InsertHighestLevelPlays: "INSERT INTO `masterdata.highestLevelPlays`(highestLevelPlayId,highestLevelPlayName) VALUES(1,'SCHOOLLEVEL')",
    DeleteHighestLevelPlays: "DROP TABLE `masterdata.highestLevelPlays`",


    Proficiencies: "CREATE TABLE IF NOT EXISTS `masterdata.proficiencies`(proficiencyId INTEGER PRIMARY KEY,proficiencyName,isActive,isDeleted,isSync,serverID, createdByUserID, createdDateTime, lastUpdatedByUserID, lastUpdateTime)",
    InsertProficiencies: "INSERT INTO `masterdata.proficiencies`(proficiencyId,proficiencyName) VALUES(1,'INTERMEDIATE')",
    DeleteProficiencies: "DROP TABLE `masterdata.proficiencies`",
   
     
    Sports: "CREATE Table IF NOT EXISTS  `person.sports`(referenceKey,personReferenceKey,sportName,sportTypeID,proficiencyId,highestLevelPlayId,cirricularActivityTypeId,isActive,isDeleted,isSync,serverId,createdByUserId,createdDateTime,lastUpdatedByUserId,lastUpdateTime)",
    DeleteSports: "DROP TABLE `person.sports`",

    InsuranceTypes: "CREATE Table IF NOT EXISTS `masterdata.insuranceTypes` (insuranceTypeId INTEGER PRIMARY KEY,insuranceTypeName,isActive,isSync,serverID, createdByUserID, createdDateTime, lastUpdatedByUserID, lastUpdateTime)",
    InsertInsuranceTypes: "INSERT INTO `masterdata.insuranceTypes` (insuranceTypeId,insuranceTypeName) VALUES(1,'LIFE TIME')",
   DeleteInsuranceTypes: "DROP TABLE `masterdata.insuranceTypes` ",


    Insurance:"CREATE Table IF NOT EXISTS `person.insurance` (referenceKey,personReferenceKey,InsuranceName,InsuranceNumber,InsuranceTypeId,StartDate,EndDate,InsuranceCompany,CoverageDetails,NomineePersonId,IsDeleted,IsActive,IsSync,ServerID, CreatedByUserID, CreatedDateTime, LastUpdatedByUserID, LastUpdateTime)",
    DeleteInsurance: "DROP TABLE `person.insurance`",

     DiseaseTypes: "CREATE Table IF NOT EXISTS `masterdata.diseaseTypes` (diseaseTypeId INTEGER PRIMARY KEY,diseaseTypeName,isActive,isSync,serverID, createdByUserID, createdDateTime, lastUpdatedByUserID, lastUpdateTime)",
    InsertDiseaseTypes: "INSERT INTO `masterdata.diseaseTypes`(diseaseTypeId,diseaseTypeName) VALUES(1,'MALARIA')",
    DeleteDiseaseTypes: "DROP TABLE `masterdata.diseaseTypes`",

    Disease:"CREATE Table IF NOT EXISTS `person.disease` (referenceKey,personReferenceKey,diseaseTypeId,Details,IdentifiedDate,IsHospitalized,HospitalName,MedicalRecordsPath,CuredDate,IsLifeThreatDisease,Remarks,N3DMSFileKey,IsDeleted,IsActive,IsSync,ServerID, CreatedByUserID, CreatedDateTime, LastUpdatedByUserID, LastUpdateTime)",
    DeleteDisease: "DROP TABLE `person.disease`",


    LanguageProficiencies:"CREATE Table IF NOT EXISTS `person.languageProficiencies`(referenceKey,personReferenceKey,LanguageId,CanRead,CanWrite,CanSpeak,IsDeleted,isActive,isSync,serverID, createdByUserID, createdDateTime, lastUpdatedByUserID, lastUpdateTime)",
   DeleteLanguageProficiency:"DROP TABLE `person.languageProficiencies`",


    LanguageTypes:"CREATE Table IF NOT EXISTS `masterdata.languageTypes` (LanguageId INTEGER PRIMARY KEY,LanguageName,isActive,isSync,serverID, createdByUserID, createdDateTime, lastUpdatedByUserID, lastUpdateTime)",
    InsertLanguageTypes: "INSERT INTO `masterdata.languageTypes`(LanguageId,LanguageName) VALUES(1,'English')",
   DeleteLanguageTypes: "DROP TABLE `masterdata.languageTypes`",

   LivingPlaceTypes:"CREATE Table IF NOT EXISTS `masterdata.livingPlaceTypes`(livingPLaceTypeId INTEGER PRIMARY KEY,livingPLaceTypeName,isActive,isSync,serverID, createdByUserID, createdDateTime, lastUpdatedByUserID, lastUpdateTime)",
  InsertLivingPlaceTypes:"INSERT INTO `masterdata.livingPlaceTypes`(livingPLaceTypeId,livingPLaceTypeName) VALUES (1,'Permenent')",
   DeleteLivingPlaceTypes:"DROP TABLE `masterdata.livingPlaceTypes`",

   LivingPlace:"CREATE Table IF NOT EXISTS `person.livingPlace`(referenceKey,personReferenceKey,LivingPlaceName,livingPLaceTypeId,StartDate,EndDate,locationId,IsDeleted,isActive,isSync,serverID, createdByUserID, createdDateTime, lastUpdatedByUserID, lastUpdateTime)",
   DeleteLivingPlace:"DROP TABLE `person.livingPlace`",


   MaritalStatusTypes:"CREATE Table IF NOT EXISTS `masterdata.maritalStatusTypes`(MaritalStatusTypeID INTEGER PRIMARY KEY,MaritalStatusTypeName,isActive,isSync,serverID, createdByUserID, createdDateTime, lastUpdatedByUserID, lastUpdateTime)",
   InsertMaritalStatusTypes:"INSERT INTO `masterdata.maritalStatusTypes`(MaritalStatusTypeID,MaritalStatusTypeName) VALUES (1,'Unmarried')",
    DeleteMaritalStatusTypes: "DROP TABLE `masterdata.maritalStatusTypes`",

   MaritalStatus:"CREATE Table IF NOT EXISTS `person.maritalStatus`(referenceKey,personReferenceKey,MaritalStatusName,MaritalStatusTypeID,StartDate,EndDate,IsDeleted,isActive,isSync,serverID, createdByUserID, createdDateTime, lastUpdatedByUserID, lastUpdateTime)",
    DeleteMaritalStatus: "DROP TABLE `person.maritalStatus`",

     MedicineTypes:"CREATE Table IF NOT EXISTS `masterdata.medicineTypes`(MedicineTypeID INTEGER PRIMARY KEY,MedicineTypeName,isActive,isSync,serverID, createdByUserID, createdDateTime, lastUpdatedByUserID, lastUpdateTime)",
   InsertMedicineTypes:"INSERT INTO `masterdata.medicineTypes`(MedicineTypeID,MedicineTypeName) VALUES (1,'Tika')",
    DeleteMedicineTypes: "DROP TABLE `masterdata.medicineTypes`",

     VaccinationTypes:"CREATE Table IF NOT EXISTS `masterdata.vaccinationTypes`(VaccinationTypeID INTEGER PRIMARY KEY,VaccinationTypeName,isActive,isSync,serverID, createdByUserID, createdDateTime, lastUpdatedByUserID, lastUpdateTime)",
    InsertVaccinationTypes:"INSERT INTO `masterdata.vaccinationTypes`(VaccinationTypeID,VaccinationTypeName) VALUES (1,'ActiveVaccine')",
    DeleteVaccinationTypes: "DROP TABLE `masterdata.vaccinationTypes`",


   Vaccinations:"CREATE Table IF NOT EXISTS `person.vaccinations`(referenceKey,personReferenceKey,VaccinationName,MedicineTypeId,VaccinationTypeId,InspectionDate,Remarks,IsDeleted,isActive,isSync,serverID, createdByUserID, createdDateTime, lastUpdatedByUserID, lastUpdateTime)",
    DeleteVaccinations: "DROP TABLE `person.vaccinations`"


});