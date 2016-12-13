/*=======================================================================
 All rights reserved to Thrill Innovative Labs.
 THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
 OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
 LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
 FITNESS FOR A PARTICULAR PURPOSE.
===========================================================================
****************************************************************************
 Name                : personQueries
 Type                : Javascript and JQuery 
 Description         : This file contains all offline database queries
 References          :
 Author              : Rajaji
 Created Date        : 31-Mar-2016 
****************************************************************************
MODIFICATION LOG
**************************************************************************** 
Ver	Date	     Modified By			Description
****************************************************************************  
Code Review LOG
**************************************************************************** 
Ver        Date                Code Review By            Observations
****************************************************************************
*/

var app = angular.module('ThrillPerson.personQueries', [])
    /*Create Business Logic Factory Method */

.constant('personQueries', {

    // Basic Info queries
    personBasicInfoById: 'SELECT a.referenceKey ,a.firstName, a.middleName, a.lastName, a.dateOfBirth, a.placeOfBirth,c.geoLocation,c.locationId,a.genderId, a.identificationMarks, a.bloodGroupId, a.folderKey, a.n3DMSFileKey FROM `person.persons` as a JOIN `person.locations` as c ON c.locationId=a.placeOfBirth WHERE a.referenceKey = ',
    persons: 'SELECT a.referenceKey,a.firstName,a.middleName,a.lastName,a.dateOfBirth,a.placeOfBirth as locationId ,c.geoLocation as placeOfBirth,a.genderId,a.bloodGroupId,b.bloodGroupName,a.identificationMarks,a.folderKey,a.n3DMSFileKey FROM `person.persons` a,`masterdata.bloodGroups` b,`person.locations` c WHERE a.bloodGroupId=b.bloodGroupId and a.placeOfBirth=c.LocationId',
    bloodGroups: 'SELECT bloodGroupId, bloodGroupName from `masterdata.bloodGroups`',

    demographicById: 'SELECT referenceKey,height,weight,bmi,temperature,hemoglobin,inspectionDate,personReferenceKey,photoPath,n3DMSFileKey FROM `person.demographics` WHERE referenceKey=',
    demographics: 'SELECT referenceKey,height,weight,bmi,temperature,hemoglobin,inspectionDate,personReferenceKey,photoPath,n3DMSFileKey FROM `person.demographics` WHERE personReferenceKey =',

    relationTypes: "SELECT relationTypeId,relationTypeName FROM `masterdata.relationTypes`",
    relatives: "SELECT a.referenceKey,a.relationTypeId,b.relationTypeName,c.firstName,a.personReferenceKey,a.relativePersonId,a.isGaurdian  FROM `person.relatives` a,`masterdata.relationTypes` b,`person.persons` c WHERE a.relationTypeId=b.relationTypeId  and a.relativePersonId=c.personId  and a.personReferenceKey =",
    relativeById: "SELECT a.referenceKey,a.relationTypeId,b.relationTypeName,a.personReferenceKey,c.firstName,c.referenceKey as relativePersonReferenceKey,a.relativePersonId,a.isGaurdian  FROM `person.relatives` a,`masterdata.relationTypes` b,`person.persons` c WHERE a.relationTypeId=b.relationTypeId and a.relativePersonId=c.personId  and  a.referenceKey=",

    bankNames: "SELECT bankNameId,bankName from `masterdata.bankNames`",
    banks: "SELECT a.referenceKey,a.bankTitle,a.locationId,b.geoLocation,a.branchName,a.accountNumber,a.iFSCCode,a.bankNameId,c.bankName,a.personReferenceKey from `person.banks` a, `person.locations` b,`masterdata.bankNames` c where  a.locationId=b.locationId and a.bankNameId=c.bankNameId  and a.personReferenceKey=",
    bankById: "SELECT a.referenceKey,a.bankTitle,a.locationId,b.geoLocation,a.branchName,a.accountNumber,a.iFSCCode,a.bankNameId,c.bankName,a.personReferenceKey from `person.banks` a,  `person.locations`  b,`masterdata.bankNames` c where  a.locationId=b.locationId and a.bankNameId=c.bankNameId and  a.referenceKey=",

    qualifications: 'SELECT qualificationId,qualificationName from `masterdata.qualifications`',
    languages: 'SELECT languageId,languageName from `masterdata.languages`',
    personEducationById: 'SELECT a.referenceKey,a.educationName,a.startDate,a.endDate,a.instituteName,a.instituteCode,a.locationId,b.geoLocation,a.personReferenceKey,a.qualificationId,c.qualificationName,a.marksObtained,a.instituteMedium,a.yearOfPassing,a.gradeObtained FROM `person.educations` a, `person.locations` b, `masterdata.qualifications` c  WHERE a.locationId=b.locationId and a.qualificationId=c.qualificationId and a.referenceKey=',
    personEducationList: 'SELECT referenceKey,educationName,startDate,endDate,instituteName,instituteCode,instituteMedium,marksObtained,gradeObtained,personReferenceKey,locationId,yearOfPassing,qualificationId, isActive,isSync,serverID, createdByUserID, createdDateTime, lastUpdatedByUserID, lastUpdateTime from `person.educations` where personReferenceKey=',

    identites: 'SELECT a.referenceKey,a.identityTypeId,b.identityTypeName,a.identityNumber,a.n3DMSFileKey,a.personReferenceKey FROM `person.identities` a, `masterdata.identityTypes` b WHERE a.identityTypeId=b.identityTypeId and a.personReferenceKey=',
    identityById: 'SELECT a.referenceKey,a.identityTypeId,b.identityTypeName,a.identityNumber,a.n3DMSFileKey,a.personReferenceKey FROM `person.identities` a, `masterdata.identityTypes` b WHERE a.identityTypeId=b.identityTypeId and a.referenceKey=',
    identityTypes: 'SELECT identityTypeId,identityTypeName from `masterdata.identityTypes`',

    visaTypes: "SELECT visaTypeId,visaTypeName FROM `masterdata.visaTypes`",
    countries: 'SELECT countryId,countryName FROM `masterdata.countries`',
    visas: "SELECT a.referenceKey,a.personReferenceKey,a.countryId,b.countryName,a.visaTypeId,c.visaTypeName,a.startDate,a.endDate,a.n3DMSFileKey FROM `person.visas` a,`masterdata.countries` b ,`masterdata.visaTypes` c  WHERE a.countryId=b.countryId and a.visaTypeId=c.visatYpeId and a.personReferenceKey=",
    visaById: "SELECT a.referenceKey,a.personReferenceKey,a.countryId,b.countryName,a.visaTypeId,c.visaTypeName,a.startDate,a.endDate,a.n3DMSFileKey FROM `person.visas` a,`masterdata.countries` b ,`masterdata.visaTypes` c  WHERE a.countryId=b.countryId and a.visaTypeId=c.visatYpeId and a.referenceKey=",

    workExperience: 'SELECT a.referenceKey,a.workExperienceName,a.startDate,a.endDate,a.organizationName,a.occupationId,b.occupationName,a.designationId,c.designationName,a.locationId,d.geoLocation,a.personReferenceKey,a.totalYears,a.teachingExperience,a.otherExperience FROM `person.workExperience` a, `masterdata.occupations` b,`masterdata.designations` c,`person.locations` d WHERE a.occupationId=b.occupationId and a.designationId=c.designationId and a.locationId=d.locationId and  a.personReferenceKey=',

    workExperienceById: 'SELECT a.referenceKey,a.workExperienceName,a.startDate,a.endDate,a.organizationName,a.occupationId,b.occupationName,a.designationId,c.designationName,a.locationId,d.geoLocation,a.personReferenceKey,a.totalYears,a.teachingExperience,a.otherExperience FROM `person.workExperience` a, `masterdata.occupations` b,`masterdata.designations` c,`person.locations` d WHERE a.occupationId=b.occupationId and a.designationId=c.designationId and a.locationId=d.locationId and a.referenceKey=',
    occupations: 'SELECT occupationId,occupationName from `masterdata.occupations`',
    designations: 'SELECT designationId,designationName from `masterdata.designations`',

    nationalities: 'SELECT nationalityId,nationalityName from `masterdata.nationalities`',
    socialGroups: 'SELECT socialGroupId,socialGroupName from `masterdata.socialGroups`',
    religionTypes: 'SELECT  religionTypeId,religionTypeName from `masterdata.religionTypes`',
    religionList: 'SELECT a.referenceKey, a.personReferenceKey, a.nationalityId, b.nationalityName, a.socialGroupId, c.socialGroupName, a.religionTypeId, d.religionTypeName  FROM `person.religions`a,`masterdata.nationalities`b, `masterdata.socialGroups`c, `masterdata.religionTypes`d  WHERE a.nationalityId = b.nationalityId and a.socialGroupId = c.socialGroupId and a.religionTypeId = d.religionTypeId and a.personReferenceKey=',
    religionListById: 'SELECT a.referenceKey, a.personReferenceKey, a.nationalityId, b.nationalityName, a.socialGroupId, c.socialGroupName, a.religionTypeId, d.religionTypeName  FROM `person.religions`a,`masterdata.nationalities`b, `masterdata.socialGroups`c, `masterdata.religionTypes`d  WHERE a.nationalityId = b.nationalityId and a.socialGroupId = c.socialGroupId and a.religionTypeId = d.religionTypeId and a.referenceKey=',


    hobbyTypes: 'SELECT hobbyTypeId,hobbyTypeName from `masterdata.hobbyTypes`',
    proficiencies: 'SELECT proficiencyId,proficiencyName from `masterdata.proficiencies`',
    hobbyList: 'SELECT a.referenceKey,b.hobbyTypeName,a.personReferenceKey,a.hobbyName,a.details,a.proficiencyId,c.proficiencyName from `person.hobbies`a,`masterdata.hobbyTypes`b ,`masterdata.proficiencies` c WHERE a.hobbyTypeId = b.hobbyTypeId and a.proficiencyId=c.proficiencyId and  a.personReferenceKey=',
    hobbyListById: 'SELECT a.referenceKey, a.personReferenceKey, a.hobbyTypeId, b.hobbyTypeName, a.proficiencyId,  a.hobbyName,a.details  FROM `person.hobbies`a, `masterdata.hobbyTypes`b  WHERE a.hobbyTypeId = b.hobbyTypeId and a.referenceKey=',

    Awards: 'SELECT a.referenceKey,a.awardedDate,a.awardName,a.description,a.awardedOrganization,a.locationId,l.geoLocation,a.personReferenceKey FROM `person.awards` a LEFT JOIN `person.locations` l ON a.locationId = l.locationId WHERE a.personReferenceKey= ',
    AwardDetailsByID: 'SELECT a.referenceKey,a.awardedDate,a.awardName,a.description,a.awardedOrganization,a.locationId,l.geoLocation,a.personReferenceKey FROM `person.awards` a LEFT JOIN `person.locations` l ON a.locationId = l.locationId WHERE a.referenceKey = ',


    sportaward: 'SELECT a.awardId, a.referenceKey,a.awardName FROM `person.awards` a WHERE a.personReferenceKey= ',
    sportawards: 'SELECT sa.referenceKey,sa.personReferenceKey,a.awardName,sa.cirricularActivityName,sa.gameDetails FROM `person.sportAwards` sa left join `person.awards` a on sa.awardId = a.awardId   WHERE sa.personReferenceKey=',
    sportawardsById: 'SELECT sa.referenceKey,sa.personReferenceKey,sa.awardId,sa.cirricularActivityName,sa.gameDetails FROM `person.sportAwards` sa left join `person.awards` a on sa.awardId= a.awardId WHERE  sa.referenceKey =',

    curricularActivityType: 'SELECT cirricularActivityTypeID,cirricularActivityTypeName FROM `masterdata.cirricularActivityTypes`',
    sportType: 'SELECT sportTypeId,sportTypeName FROM `masterdata.sportTypes`',
    proficiencies: 'SELECT proficiencyId,proficiencyName FROM `masterdata.proficiencies`',
    highestLevelPlayType: 'SELECT highestLevelPlayId,highestLevelPlayName FROM `masterdata.highestLevelPlays`',
    sports: 'SELECT s.referenceKey, s.sportName, s.sportTypeID, st.sportTypeName,s.proficiencyId,p.proficiencyName,s.highestLevelPlayId, h.highestLevelPlayName,s.`cirricularActivityTypeId`,s.personReferenceKey,ca.cirricularActivityTypeName FROM `person.sports` s left join `masterdata.sportTypes` st on s.sportTypeID = st.sportTypeID left join `masterdata.highestLevelPlays` h on s.highestLevelPlayId = h.highestLevelPlayId left join `masterdata.cirricularActivityTypes` ca on s.CirricularActivityTypeID = ca.CirricularActivityTypeID   left join `masterdata.proficiencies` p on s.proficiencyId = p.proficiencyId WHERE s.personReferenceKey= ',
    sportsById: 'SELECT s.referenceKey, s.sportName, s.sportTypeID, st.sportTypeName,s.proficiencyId,p.proficiencyName,s.highestLevelPlayId, h.highestLevelPlayName,s.`cirricularActivityTypeId`,s.personReferenceKey,ca.cirricularActivityTypeName FROM `person.sports` s left join `masterdata.sportTypes` st on s.sportTypeID = st.sportTypeID left join `masterdata.highestLevelPlays` h on s.highestLevelPlayId = h.highestLevelPlayId left join `masterdata.cirricularActivityTypes` ca on s.CirricularActivityTypeID = ca.CirricularActivityTypeID  left join `masterdata.proficiencies` p on s.proficiencyId = p.proficiencyId WHERE s.referenceKey= ',

    insuranceTypes: 'SELECT insuranceTypeId,insuranceTypeName from `masterdata.insuranceTypes` ',
    insuranceList: 'SELECT referenceKey,InsuranceName,InsuranceNumber,InsuranceTypeId,StartDate,EndDate,InsuranceCompany,CoverageDetails,NomineePersonId,personReferenceKey,IsDeleted from `person.insurance` where IsDeleted =0 and personReferenceKey=',
    insuranceById: 'SELECT i.referenceKey, i.InsuranceName, i.InsuranceNumber, i.InsuranceTypeId, it.InsuranceTypeName, i.StartDate, i.EndDate, i.InsuranceCompany, i.CoverageDetails, i.NomineePersonId, i.personReferenceKey, p.firstName,p.referenceKey as nomineeReferenceKey FROM `person.insurance` i LEFT JOIN `person.persons` p on i.NomineePersonId= p.personId LEFT JOIN `masterdata.insuranceTypes` it ON i.InsuranceTypeId = it.InsuranceTypeId  WHERE  i.IsDeleted = 0 and i.referenceKey=',

    diseaseTypes: 'SELECT diseaseTypeId,diseaseTypeName from `masterdata.diseaseTypes`',
    diseaseList: 'SELECT d.referenceKey, d.diseaseTypeId, d.details,d.identifiedDate,d.isHospitalized, d.hospitalName, d.medicalRecordsPath, d.curedDate,d.isLifeThreatDisease, d.remarks, dt.diseaseTypeName FROM `person.disease` d LEFT JOIN `masterdata.diseaseTypes` dt on d.DiseaseTypeId = dt.DiseaseTypeId WHERE d.IsDeleted = 0 and d.personReferenceKey=',
    diseaseListById: 'SELECT d.`referenceKey`,d.`personReferenceKey`, d.`diseaseTypeId`, d.`details`,d.`identifiedDate`,d.`isHospitalized`, d.`hospitalName`, d.`medicalRecordsPath`, d.`curedDate`,d.`isLifeThreatDisease`, d.`remarks`, dt.diseaseTypeName FROM `person.disease` d LEFT JOIN `masterdata.diseaseTypes` dt on d.DiseaseTypeId = dt.DiseaseTypeId  WHERE  d.IsDeleted = 0 and d.referenceKey= ',

    LanguageTypes: 'SELECT LanguageId,LanguageName from `masterdata.languageTypes`',
    LanguageDetails: 'SELECT lp.referenceKey, l.LanguageId,l.LanguageName,lp.CanRead,lp.CanWrite,lp.CanSpeak FROM `person.languageProficiencies` lp left join `masterdata.languageTypes` l on lp.LanguageId = l.LanguageId WHERE lp.IsDeleted = 0 and lp.personReferenceKey= ',

    langprofListById: 'SELECT lp.referenceKey,lp.personReferenceKey, l.LanguageId,l.LanguageName,lp.CanRead,lp.CanWrite,lp.CanSpeak FROM `person.languageProficiencies` lp left join `masterdata.languageTypes` l on lp.LanguageId = l.LanguageId WHERE  lp.IsDeleted = 0 and lp.referenceKey = ',

    LivingPlaceTypes: 'SELECT livingPLaceTypeId,livingPLaceTypeName from `masterdata.livingPlaceTypes`',
    livingplacesList: 'SELECT lp.referenceKey,lp.personReferenceKey,lp.LivingPlaceName,lp.StartDate,lp.EndDate,lt.livingPLaceTypeId,lt.livingPLaceTypeName FROM `person.livingPlace` lp, `masterdata.livingPlaceTypes` lt  WHERE lt.livingPLaceTypeId=lp.livingPLaceTypeId and lp.IsDeleted=0 and lp.personReferenceKey=',
    livingPlaceById: 'SELECT lp.referenceKey,lp.personReferenceKey,lp.LivingPlaceName,lp.StartDate,lp.EndDate,lt.livingPLaceTypeId,lt.livingPLaceTypeName,l.locationId,l.geoLocation FROM  `person.livingPlace` lp, `masterdata.livingPlaceTypes` lt, `person.locations` l WHERE lt.livingPLaceTypeId=lp.livingPLaceTypeId and lp.locationId=l.locationId and lp.referenceKey=',

    MaritalStatusTypes: 'SELECT MaritalStatusTypeID,MaritalStatusTypeName from `masterdata.maritalStatusTypes`',
    MaritalStatusList: 'SELECT ms.referenceKey,ms.MaritalStatusName,ms.StartDate,ms.EndDate,mt.MaritalStatusTypeID,mt.MaritalStatusTypeName from `person.maritalStatus` ms,`masterdata.maritalStatusTypes` mt WHERE ms.MaritalStatusTypeID=mt.MaritalStatusTypeID and ms.personReferenceKey= ',
    maritalStatusById: 'SELECT ms.referenceKey,ms.MaritalStatusName,ms.StartDate,ms.EndDate,mt.MaritalStatusTypeID,mt.MaritalStatusTypeName from `person.maritalStatus` ms,`masterdata.maritalStatusTypes` mt WHERE ms.MaritalStatusTypeID=mt.MaritalStatusTypeID and ms.referenceKey= ',

    MedicineTypes: 'SELECT MedicineTypeID,MedicineTypeName from `masterdata.medicineTypes`',
    VaccinationTypes: 'SELECT VaccinationTypeID,VaccinationTypeName from `masterdata.vaccinationTypes`',

    VaccinationList: 'SELECT v.referenceKey,v.VaccinationName,mt.MedicineTypeId,mt.MedicineTypeName,vt.VaccinationTypeId,vt.VaccinationTypeName,v.InspectionDate,v.Remarks,v.personReferenceKey from `person.vaccinations` v,`masterdata.medicineTypes` mt, `masterdata.vaccinationTypes` vt WHERE v.MedicineTypeId=mt.MedicineTypeId and v.VaccinationTypeId=vt.VaccinationTypeId and v.personReferenceKey=',
    vaccinationById: 'SELECT v.referenceKey,v.VaccinationName,mt.MedicineTypeId,mt.MedicineTypeName,vt.VaccinationTypeId,vt.VaccinationTypeName,v.InspectionDate,v.Remarks,v.personReferenceKey from `person.vaccinations` v,`masterdata.medicineTypes` mt, `masterdata.vaccinationTypes` vt WHERE v.MedicineTypeId=mt.MedicineTypeId and v.VaccinationTypeId=vt.VaccinationTypeId and v.referenceKey=',

    getPersonsByIds: function (personReferenceKeys) {
        return 'SELECT firstName,referenceKey,isDeleted FROM `person.persons` WHERE referenceKey  in(' + personReferenceKeys + ') and IsDeleted=0';

    }


});