/*===========================================================================
 All rights reserved to Nunet Cube Software Solutions.
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

var app = angular.module('ThrillArchSample.setupQueries', [])
    /*Create The queries Constant
    Use this queries to any modules
    */

app.constant('queries', {

    Employees: "CREATE TABLE IF NOT EXISTS Employees(EmployeeId INTEGER PRIMARY KEY,FirstName,LastName,DOB,GenderId,Photo,LanguageId,BloodGroupId,Address,IsActive,IsDeleted,IsSync,ServerId,CreatedByUserId,CreatedDateTime,LastUpdatedByUserId,LastUpdatedDateTime)",
    DelEmployees: "DROP TABLE Employees",

    Experiences: "CREATE TABLE IF NOT EXISTS Experiences(ExperienceId INTEGER PRIMARY KEY,EmployeeId,CompanyName,URL,StartDate,EndDate,Designation,IsActive,IsDeleted,IsSync,ServerId,CreatedByUserId,CreatedDateTime,LastUpdatedByUserId,LastUpdatedDateTime)",
    DelExperiences: "DROP TABLE Experiences",

    Genders: "CREATE TABLE IF NOT EXISTS Genders(GenderId INTEGER PRIMARY KEY,GenderName,Description,IsActive,IsDeleted,IsSync,ServerId,CreatedByUserId,CreatedDateTime,LastUpdatedByUserId,LastUpdatedDateTime)",
    INGenders: "INSERT INTO Genders(GenderName,Description) VALUES('Male','Male'),('Female','Female')",
    DelGenders: "DROP TABLE Genders",

    Languages: "CREATE Table IF NOT EXISTS  Languages(LanguageId INTEGER PRIMARY KEY,LanguageName,Description,IsActive,IsDeleted,IsSync,ServerId,CreatedByUserId,CreatedDateTime,LastUpdatedByUserId,LastUpdatedDateTime)",
    INLanguages: "INSERT INTO Languages(LanguageName,Description) VALUES('English','English'),('Hindi','Hindi'),('Telugu','Telugu')",
    DelLanguages: "DROP TABLE Languages",

    BloodGroups: "CREATE TABLE IF NOT EXISTS BloodGroups (BloodGroupId INTEGER PRIMARY KEY,BloodGroupName,Description,IsActive,IsDeleted,IsSync,ServerId,CreatedByUserId,CreatedDateTime,LastUpdatedByUserId,LastUpdatedDateTime)",
    INBloogGroups: "INSERT INTO BloodGroups(BloodGroupName,Description) VALUES('O+','O+'),( 'O-', 'O-'),( 'A+', 'A+'),('A-', 'A-'),('B+', 'B+'),('B-', 'B-'),('AB+', 'AB+'),( 'AB-', 'AB-')",
    DelBloodGroups: "DROP TABLE BloodGroups",




});