/*===========================================================================
 All rights reserved to Thrill Innovative Labs.
 THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
 OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
 LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
 FITNESS FOR A PARTICULAR PURPOSE.
============================================================================
****************************************************************************
 Name            :  FirstTimeSetupQueries.js
 Type            : Javascript and JQuery 
 Description     :
 References      :
 Author          :  Kalyani
 Created Date    :  07-04-2016
****************************************************************************                          
MODIFICATION LOG
**************************************************************************** 
S.no  Ver Date        Modified By       Description
1         13-04-2016  Kalyani
****************************************************************************                            
Code Review LOG
**************************************************************************** 
Ver        Date                Code Review By            Observations
****************************************************************************
*/
/* create the databasequeries module 
  also include Dependency Modules

*/

var app = angular.module('ThrillOrganization.setupQueries', []);
    /*Create The queries Constant
    Use this queries to any modules
    */

app.constant('queries', {

    Organizations: "CREATE TABLE IF NOT EXISTS `organization.organizations`(OrganizationID INTEGER PRIMARY KEY,ReferenceKey,OrganizationName,ParentOrganizationID,OrganizationLevelID,OrganizationDetails,OrganizationCode,EstablishedOn,OrganizationTypeKey,SubOrganizationTypeKey,IsActive,IsDeleted,IsSync,ServerId,CreatedByUserId,CreatedDateTime,LastUpdatedByUserId,LastUpdatedDateTime)",
    DeleteOrganizations: "DROP TABLE `organization.organizations`",

    OrganizationLevels: "CREATE TABLE IF NOT EXISTS `organization.organizationLevels`(OrganizationLevelID INTEGER PRIMARY KEY,OrganizationLevelName,IsActive,IsDeleted,IsSync,ServerId,CreatedByUserId,CreatedDateTime,LastUpdatedByUserId,LastUpdatedDateTime)",
    InsertOrganizationLevels: "INSERT INTO `organization.organizationLevels`(OrganizationLevelID,OrganizationLevelName) VALUES(1,'Branch Office'),(2,'Regional Office'),(3,'Circle Office'),(4,'Head Office')",
    DeleteOrganizationLevels: "DROP TABLE `organization.organizationLevels`",
    
    
    OrganizationTypes: "CREATE TABLE IF NOT EXISTS `organization.organizationTypes`(OrganizationTypeID INTEGER PRIMARY KEY,OrganizationTypeKey,OrganizationTypeTitle,IsActive,IsDeleted,IsSync,ServerId,CreatedByUserId,CreatedDateTime,LastUpdatedByUserId,LastUpdatedDateTime)",
    InsertOrganizationTypes: "INSERT INTO `organization.organizationTypes`(OrganizationTypeID,OrganizationTypeKey,OrganizationTypeTitle)  VALUES(1,'992edf7a-44f2-11e6-beb8-9e71128cae77','Private'),(2,'a1cc845c-44f2-11e6-beb8-9e71128cae77','Government')",
    DeleteOrganizationTypes: "DROP TABLE `organization.organizationTypes`",
    
    SubOrganizationTypes: "CREATE TABLE IF NOT EXISTS `organization.subOrganizationTypes`(SubOrganizationTypeID INTEGER PRIMARY KEY,SubOrganizationTypeKey,SubOrganizationTypeTitle,IsActive,IsDeleted,IsSync,ServerId,CreatedByUserId,CreatedDateTime,LastUpdatedByUserId,LastUpdatedDateTime)",
    InsertSubOrganizationTypes: "INSERT INTO `organization.suborganizationTypes`(SubOrganizationTypeID,SubOrganizationTypeKey,SubOrganizationTypeTitle)  VALUES(1,'e0494fef-e452-49f4-b45e-8655f040b366','SubOrg type 1'),(2,'2b53b371-1ab1-44fb-85d3-90100561cad0','sub org type 2')",
    DeleteSubOrganizationTypes: "DROP TABLE `organization.subOrganizationTypes`",
    
    Registrations: "CREATE TABLE IF NOT EXISTS `organization.registrations`(RegistrationID INTEGER PRIMARY KEY,OrganizationID,ReferenceKey,OrganizationReferenceKey,RegistrationTypeID,ValidFrom,ValidTo,RegistrationDetails,IsActive,IsDeleted,IsSync,ServerId,CreatedByUserId,CreatedDateTime,LastUpdatedByUserId,LastUpdatedDateTime)",
    DeleteRegistrations: "DROP TABLE `organization.registrations`",

    RegistrationTypes: "CREATE TABLE IF NOT EXISTS `organization.registrationTypes`(RegistrationTypeID INTEGER PRIMARY KEY,RegistrationTypeName,IsActive,IsDeleted,IsSync,ServerId,CreatedByUserId,CreatedDateTime,LastUpdatedByUserId,LastUpdatedDateTime)",
    InsertRegistrationTypes: "INSERT INTO `organization.registrationTypes`(RegistrationTypeID,RegistrationTypeName) VALUES(1,'Quarterly'),(2,'HalfYearly'),(3,'Yearly')",
    DeleteRegistrationTypes: "DROP TABLE `organization.registrationTypes`",
   
    Departments: "CREATE TABLE IF NOT EXISTS `organization.departments`(DepartmentID INTEGER PRIMARY KEY,DepartmentName,ParentDepartmentID,ReferenceKey,OrganizationReferenceKey,OrganizationID,IsActive,IsDeleted,IsSync,ServerId,CreatedByUserId,CreatedDateTime,LastUpdatedByUserId,LastUpdatedDateTime)",
    DeleteDepartments: "DROP TABLE `organization.departments`",

    CertificationBodies:"CREATE TABLE IF NOT EXISTS `organization.certificationBodies`(CertificationBodyID INTEGER PRIMARY KEY,CertificationBodyName,CertificationBodyTypeID,IsActive,IsDeleted,IsSync,ServerId,CreatedByUserId,CreatedDateTime,LastUpdatedByUserId,LastUpdatedDateTime)",
    InsertCertificationBodies:"INSERT INTO `organization.certificationBodies`(CertificationBodyID,CertificationBodyName,CertificationBodyTypeID) VALUES(1,'ISO Certified Department',1),(2,'SocialWalfare Organization',1),(3,'CMMI Certified organization',2)",
    DeleteCertificationBodies:"DROP TABLE `organization.certificationBodies`",
    
    CertificationBodyTypes:"CREATE TABLE IF NOT EXISTS `organization.certificationBodyTypes`(CertificationBodyTypeID INTEGER PRIMARY KEY,CertificationBodyTypeName,IsActive,IsDeleted,IsSync,ServerId,CreatedByUserId,CreatedDateTime,LastUpdatedByUserId,LastUpdatedDateTime)",
    InsertCertificationBodyTypes:"INSERT INTO `organization.certificationBodyTypes`(CertificationBodyTypeID,CertificationBodyTypeName) VALUES(1,'ISO'),(2,'CMMI')",
    DeleteCertificationBodyTypes:"DROP TABLE `organization.certificationBodyTypes`",
    
    Certifications:"CREATE TABLE IF NOT EXISTS `organization.certifications`(CertificationID INTEGER PRIMARY KEY,CertificationName,CertificationBodyID,ReferenceKey,OrganizationReferenceKey,OrganizationID,ValidFrom,ValidTo,IsActive,IsDeleted,IsSync,ServerId,CreatedByUserId,CreatedDateTime,LastUpdatedByUserId,LastUpdatedDateTime)",
    DeleteCertifications:"DROP TABLE `organization.certifications`",
});