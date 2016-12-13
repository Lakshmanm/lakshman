/*=======================================================================
 All rights reserved to Thrill Innovative Labs.
 THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
 OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
 LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
 FITNESS FOR A PARTICULAR PURPOSE.
===========================================================================
****************************************************************************
 Name                : OrganizationQueries
 Type                : Javascript and JQuery 
 Description         : This file contains all offline database queries
 References          :
 Author              : Naveena.L
 Created Date        : 07-Apr-2016 
****************************************************************************
MODIFICATION LOG
**************************************************************************** 
S.No Ver    Date:        Modified By:       Description:
1     1.0     14-04-2016    Naveena         Change in Organization and Certification   
****************************************************************************  
Code Review LOG
**************************************************************************** 
S.No      Ver        Date                Code Review By            Observations
1        1.0       14-April-2016         Sri Venkatesh.T           Rename file name to Organization.Queries.js as per standards.
2        1.0       14-April-2016         Sri Venkatesh.T           Query namings are relavent but naking pattern was not in proper for somee queries wrote getAllLocation but where as for other queries wrote somethign like countries,states etc.,modify as per the standards
****************************************************************************
*/
var app = angular.module('ThrillOrganization.OrganizationQueries', [])
    /*Create Business Logic Factory Method */

.constant('OrganizationQueries', {

    organizationBasicInfoDetails: "SELECT o.OrganizationID,o.OrganizationName,o.ParentOrganizationID,o.OrganizationLevelID,o.ReferenceKey,ol.OrganizationLevelName as OrganizationLevelName FROM `organization.organizations` o JOIN `organization.organizationLevels` ol on o.OrganizationLevelID=ol.OrganizationLevelID",
    organizationInfoById: "select OrganizationName,OrganizationLevelID,OrganizationDetails,ParentOrganizationID,OrganizationID,OrganizationCode,EstablishedOn,OrganizationTypeKey,SubOrganizationTypeKey,ContactKey,AddressKey from `organization.organizations` WHERE ReferenceKey=",
    organizationNames: "select OrganizationID,OrganizationName from `organization.organizations`",
    registrationBasicInfoById: "SELECT r.RegistrationID,rt.RegistrationTypeID,r.ValidFrom,r.ValidTo,r.ReferenceKey,r.RegistrationDetails FROM `organization.registrations` r join `organization.registrationTypes` rt on r.RegistrationTypeID=rt.RegistrationTypeID where ReferenceKey= ",
    registrationBasicInfoDetails: "SELECT r.RegistrationID,rt.RegistrationTypeID,rt.RegistrationTypeName,r.ReferenceKey, r.ValidFrom, r.ValidTo, r.RegistrationDetails from `organization.registrations` r join  `organization.registrationTypes` rt on r.RegistrationTypeID=rt.RegistrationTypeID",
    registrationTypeDetails: "SELECT RegistrationTypeID,RegistrationTypeName FROM  `organization.registrationTypes`",

    departmentInfoDetails: "SELECT d.departmentID, d.departmentName, dsj.departmentName as parentDepartmentName,d.referenceKey,d.organizationReferenceKey,org.organizationName FROM `organization.Departments` d left join `organization.organizations` as org on org.referenceKey = d.organizationReferenceKey Left join `organization.departments` dsj on dsj.DepartmentID = d.ParentDepartmentID ",
    getDepartmentsByRootOrganization: function(rootOrganizationKey) {
        return 'SELECT d.departmentID, d.departmentName, dsj.departmentName as parentDepartmentName,d.referenceKey,d.organizationReferenceKey,org.organizationName FROM `organization.Departments` d left join `organization.organizations` as org on org.referenceKey = d.organizationReferenceKey Left join `organization.departments` dsj on dsj.DepartmentID = d.ParentDepartmentID  WHERE d.RootOrganizationKey = ' + "'" + rootOrganizationKey + "'";
    },
    departmentInfoById: "SELECT DepartmentID,DepartmentName,ParentDepartmentID,ReferenceKey FROM `organization.departments` WHERE ReferenceKey=",
    getAllCertifications: "SELECT c.CertificationID,c.CertificationName,cbt.CertificationBodyTypeName,c.ValidFrom,c.ValidTo,c.ReferenceKey from `organization.certifications` c left join `organization.certificationBodyTypes` cb on c.CertificationBodyID = cb.CertificationBodyTypeID left join `organization.certificationbodytypes` cbt on cb.CertificationBodyTypeID = cbt.CertificationBodyTypeID ",
    getCertificationByID: " SELECT CertificationID,CertificationName,CertificationBodyID,ReferenceKey,ValidFrom,ValidTo from `organization.certifications`  WHERE ReferenceKey = ",
    getCertificateTypes: "SELECT CertificationBodyTypeID, CertificationBodyTypeName from `organization.certificationBodyTypes`",
    getOrganizationLevels: "SELECT OrganizationLevelID, OrganizationLevelName from `organization.organizationLevels`",
    getOrganizationTypes: "SELECT OrganizationTypeID, OrganizationTypeKey,OrganizationTypeTitle from `organization.organizationTypes`",
    getSubOrganizationTypes: "SELECT SubOrganizationTypeID, SubOrganizationTypeKey,SubOrganizationTypeTitle from `organization.suborganizationTypes`",
    getAllSubOrganizationTypes: "select subOrganizationTypeId,subOrganizationTypeKey,subOrganizationTypeTitle,isActive from `organization.suborganizationtypes` where IsDeleted!=1",
    getSubOrganizationTypeById: function(subOrganizationTypeKey) {
        return 'select subOrganizationTypeId,organizationKey,subOrganizationTypeTitle,isActive FROM `organization.suborganizationtypes` WHERE subOrganizationTypeKey =' + "'" + subOrganizationTypeKey + "'";
    },
    getSubOrganizationTypesByOrganizationId: function(organizationKey) {
        return 'select subOrganizationTypeId,subOrganizationTypeKey,subOrganizationTypeTitle,IsActive  FROM `organization.suborganizationtypes` WHERE OrganizationKey =' + "'" + organizationKey + "' and IsDeleted!=1";
    }

});