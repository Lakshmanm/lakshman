/*=======================================================================
 All rights reserved to  Thrill Innovative Labs.
 THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
 OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
 LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
 FITNESS FOR A PARTICULAR PURPOSE.
===========================================================================
****************************************************************************
 Name                : Location.Queries.js
 Type                : Javascript and JQuery 
 Description         : This file contains all offline database queries
 References          :
 Author              : Satya Kalyani Lanka
 Created Date        : 07-Apr-2016 
****************************************************************************
MODIFICATION LOG
**************************************************************************** 
Ver	Date	     Modified By			Description
1   14-04-2016  Satya Kalyani Lanka                File name changed and Query names changed
****************************************************************************  
Code Review LOG
**************************************************************************** 
S.No      Ver        Date                Code Review By            Observations
1        1.0       13-April-2016         Sri Venkatesh.T           Rename file name to Location.Queries.js as per standards.
2        1.0       13-April-2016         Sri Venkatesh.T           Query namings are relavent but naking pattern was not in proper for somee queries wrote getAllLocation but where as for other queries wrote somethign like countries,states etc.,modify as per the standards
****************************************************************************
*/

var app = angular.module('ThrillLocation.locationQueries', [])
    /*Create Business Logic Factory Method */

.constant('locationQueries', {

    //Queries
    locationInfoById: "SELECT LocationKey,DistrictID,CountryID,StateID,MandalID,VillageID,GeoLocation,Latitude,Longitude FROM 'location.locations'  WHERE LocationKey = "
    , countries: "SELECT CountryID,CountryName from 'masterdata.countries'"
    , states: "SELECT StateID,StateName from 'masterdata.states' WHERE CountryID="
    , districts: "SELECT DistrictID,DistrictName from 'masterdata.districts' WHERE StateID="
    , mandals: "SELECT MandalID,MandalName from 'masterdata.mandals' WHERE DistrictID="
    , villages: "SELECT VillageID,VillageName from 'masterdata.villages' WHERE MandalID="
    , locations: "SELECT ln.LocationID,ln.LocationKey, ln.GeoLocation,ln.Latitude,ln.Longitude,cs.CountryName as Country,ss.StateName as State,ds.DistrictName as District,ms.MandalName as Mandal, vs.VillageName as Village FROM 'location.locations' ln join 'masterdata.countries' cs on ln.CountryID = cs.CountryID join 'masterdata.states' ss on ln.stateid = ss.StateID join 'masterdata.districts' ds on ln.DistrictID = ds.DistrictID join 'masterdata.mandals' ms on ln.MandalID = ms.MandalID join  'masterdata.villages' vs on ln.VillageID = vs.VillageID"
    
    , entityTypes: "SELECT entityTypeId, entityTypeName from `location.entitytypes`"
    , addressByReferenceKey: function (referenceKey) {
        return "SELECT addressId, entityDetails, streetDetails,pincode,geoLocation, latitude, longitude, countryId, stateId, districtId, mandalId, villageId, pincode,  addressKey from `location.addresses` Where addressKey = '" + referenceKey + "'";
    }
    , addressesByEntityKey: function (entityKey) {
        return "SELECT addressId, entityDetails, streetDetails,pincode, geoLocation, latitude, longitude, countryId, stateId, districtId, mandalId, villageId, pincode, entityId, entityTypeId, referenceKey, entityReferenceKey from `location.addresses` Where entityReferenceKey = '" + entityKey + "'";
    }
    , addresses: "SELECT ad.addressId, ad.geoLocation,ad.latitude,ad.longitude,ad.pincode,ad.entityDetails,ad.streetDetails,cs.countryName,ss.stateName,ds.districtName,ms.mandalName, vs.villageName,ad.addressKey FROM `location.addresses` ad left join `masterdata.countries` cs on ad.countryId = cs.countryId left join `masterdata.states` ss on ad.stateId = ss.stateId left join `masterdata.districts` ds on ad.districtId = ds.districtId left join `masterdata.mandals` ms on ad.mandalId = ms.mandalId left join `masterdata.villages` vs on ad.villageId = vs.villageId"

});