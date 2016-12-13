/*===========================================================================
 All rights reserved to  Thrill Innovative Labs.
 THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
 OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
 LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
 FITNESS FOR A PARTICULAR PURPOSE.
============================================================================
****************************************************************************
 Name            : FirstTimeSetup.Queries.js
 Type            : Javascript and JQuery 
 Description     :
 References      :
 Author          :  Satya kalyani Lanka
 Created Date    :  07-Apr-2016
****************************************************************************                          
MODIFICATION LOG
**************************************************************************** 
Ver Date         Modified By           Description
1  14-04-2016    Satya Kalyani Lanka   Method names changed
****************************************************************************                            
Code Review LOG
**************************************************************************** 
Ver        Date                Code Review By            Observations
****************************************************************************
*/
/* create the databasequeries module 
  also include Dependency Modules

*/

var app = angular.module('ThrillLocation.setupQueries', [])
    /*Create The queries Constant
    Use this queries to any modules
    */

app.constant('queries', {

    Location: "CREATE TABLE IF NOT EXISTS 'location.locations'(LocationID INTEGER PRIMARY KEY,LocationKey,EntityType,GeoLocation,Latitude,Longitude,CountryID,StateID,DistrictID,MandalID,VillageID,IsActive,IsDeleted,IsSync,ServerId,CreatedUserKey,CreatedDateTime,CreatedAppKey,LastUpdatedUserKey,LastUpdatedDateTime,LastUpdatedAppKey)",
//    DeleteLocation: "DROP TABLE 'location.locations'",
    
    Address: "CREATE TABLE IF NOT EXISTS 'location.addresses'(AddressID INTEGER PRIMARY KEY,EntityDetails,StreetDetails,Pincode,AddressKey,GeoLocation,Latitude,Longitude,CountryID,StateID,DistrictID,MandalID,VillageID,CityID,IsActive,IsDeleted,IsSync,ServerId,CreatedUserKey,CreatedDateTime,CreatedAppKey,LastUpdatedUserKey,LastUpdatedDateTime,LastUpdatedAppKey)",
//    DeleteAddress: "DROP TABLCityIDE 'location.locations'",

    Countries: "CREATE TABLE IF NOT EXISTS 'masterdata.countries'(CountryID INTEGER PRIMARY KEY,CountryName,IsActive,IsDeleted,IsSync,ServerId,CreatedByUserId,CreatedDateTime,LastUpdatedByUserId,LastUpdatedDateTime)",
    InsertCounties: "INSERT INTO 'masterdata.countries' (CountryID,CountryName) VALUES(1, 'America'),(2, 'Bangladesh'),(3, 'China'),(4, 'India'),(5, 'Srilanka')",
 //   DeleteCountries: "DROP TABLE 'masterdata.countries'",

    States: "CREATE TABLE IF NOT EXISTS 'masterdata.states'(StateID INTEGER PRIMARY KEY,StateName,CountryID,IsActive,IsDeleted,IsSync,ServerId,CreatedByUserId,CreatedDateTime,LastUpdatedByUserId,LastUpdatedDateTime)",
    InsertStates: "INSERT INTO 'masterdata.states'(StateID,StateName,CountryID) VALUES(1, 'Andhra Pradesh', 4),(2, 'Arunachal Pradesh', 4),(3, 'Assam', 4),(4, 'Bihar', 4)",
 //   DeleteStates: "DROP TABLE 'masterdata.states'",
    
    Districts: "CREATE TABLE IF NOT EXISTS 'masterdata.districts'(DistrictID INTEGER PRIMARY KEY,DistrictName,StateID,IsActive,IsDeleted,IsSync,ServerId,CreatedByUserId,CreatedDateTime,LastUpdatedByUserId,LastUpdatedDateTime)",
    InsertDistricts: "INSERT INTO 'masterdata.districts'(DistrictID,DistrictName,StateID) VALUES(1, 'Srikakulam', 1),(2, 'Vizianagaram', 1),(3, 'Visakhapatnam', 1),(4, 'East Godavari', 1)",
 //   DeleteDistricts: "DROP TABLE 'masterdata.districts'",
    
    Mandals: "CREATE TABLE IF NOT EXISTS 'masterdata.mandals'(MandalID INTEGER PRIMARY KEY,MandalName,DistrictID,IsActive,IsDeleted,IsSync,ServerId,CreatedByUserId,CreatedDateTime,LastUpdatedByUserId,LastUpdatedDateTime)",
    InsertMandals: "INSERT INTO 'masterdata.mandals'(MandalID,MandalName,DistrictID) VALUES(1, 'Veeraaghattam', 1),(2, 'Vangara', 1),(3, 'R.Amadalavalasa', 1),(4, 'Rajam', 1),(5, 'G.Sigadam', 1),(6, 'Laveru', 1),(7, 'Ranasthalam', 1),(8, 'Visakhapatnam', 3)",
 //   DeleteMandals: "DROP TABLE 'masterdata.mandals'",
    
     Villages: "CREATE TABLE IF NOT EXISTS 'masterdata.villages'(VillageID INTEGER PRIMARY KEY,VillageName,MandalID,DistrictID,IsActive,IsDeleted,IsSync,ServerId,CreatedByUserId,CreatedDateTime,LastUpdatedByUserId,LastUpdatedDateTime)",
     InsertVillages: "INSERT INTO 'masterdata.villages'(VillageID,VillageName,MandalID,DistrictID) VALUES(1, 'Kadakella', 1, 1),(2, 'Kambara', 1, 1),(3, 'Dasumantha Puram', 1,1),(4, 'Narsipuram', 1, 1),(5, 'Chinagora', 1, 1),(6, 'Pedduru', 1, 1),(7, 'Chalivendri', 1, 1),(8, 'J. Gopalapuram', 1,1),(9, 'Buruga', 1, 1),(10, 'Nadukuru', 1, 1),(11, 'Vikrampuram', 1, 1),(12, 'Nadimikella', 1, 1),(13, 'Modatikella(Ui)', 1, 1),(14, 'Srihari Puram(Ui)', 1, 1),(15, 'Chittipudivalasa', 1, 1),(16, 'Kimmi', 1, 1),(17, 'Kothugumada', 1, 1),(18, 'Veeraghattam', 1, 1),(19, 'Kumbidichapuram', 1, 1),(20, 'Mokasharajapuram', 1, 1),(21, 'Kathulakaviti', 1, 0),(22, 'Hussain Puram', 1, 1),(23, 'Visakhapatnam', 8, 3)",
 //    DeleteVillages: "DROP TABLE 'masterdata.villages'",
     Cities: "CREATE TABLE IF NOT EXISTS 'masterdata.cities'(CityID INTEGER PRIMARY KEY,CityName,StateID,DistrictID,MandalID,VillageID,IsActive,IsDeleted,IsSync,ServerId,CreatedByUserId,CreatedDateTime,LastUpdatedByUserId,LastUpdatedDateTime)",
     InsertCities: "INSERT INTO 'masterdata.cities'(CityID,CityName,StateID,DistrictID,MandalID,VillageID) VALUES(1,'Visakhapatnam', 1, 3,8,1)",
  //   DeleteVillages: "DROP TABLE 'masterdata.cities'",

   



});