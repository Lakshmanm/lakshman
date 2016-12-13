/*//=============================================================================
// All rights reserved to Thrill Innovative Labs.
// THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
// OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
// LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
// FITNESS FOR A PARTICULAR PURPOSE.
//=============================================================================
//*****************************************************************************
//* Name		    	: FirstTimeSetup.Queries.js 
//* Type		    	: Angular JS File
//* Description		    :
//* References		    :
//* Author	    		:
//* Created Date        : 
//*****************************************************************************
//*                             MODIFICATION LOG
//*****************************************************************************
//*  S.No  Ver	     Date	         Modified By			Description

//*****************************************************************************
//*                             Code Review LOG
//*****************************************************************************

//*****************************************************************************
*/

	 var app  = angular.module('ThrillContact.setupQueries', [])

	 app.constant('queries', {

			 //TO-DO , Complete the Create Query
			 Contacts: "CREATE TABLE IF NOT EXISTS  `Contact.contacts` (contactKey,isDeleted,isActive,createdUserKey,createdDateTime,createdAppKey,lastUpdatedUserKey,lastUpdatedDateTime,lastUpdatedAppKey)",
			 InsertContact: "INSERT INTO `Contact.contacts`(contactKey) VALUES('d58d7570-42aa-11e6-9b6c-31ac8e099c89')",
			 DeleteContacts: "DROP TABLE  `Contact.contacts`",

			 //TO-DO , Complete the Create Query
			 ContactItems: "CREATE TABLE IF NOT EXISTS  `Contact.contactItems` (contactItemKey,contactItemInfo,contactTypeKey,contactKey,isPrimary,isDeleted,isActive,createdUserKey,createdDateTime,createdAppKey,lastUpdatedUserKey,lastUpdatedDateTime,lastUpdatedAppKey)",
			 DeleteContactItems: "DROP TABLE  `Contact.contactItems`",

			 //TO-DO , Complete the Create Query
			 ContactTypes: "CREATE TABLE IF NOT EXISTS  `Contact.contactTypes` (contactTypeKey,contactTypeTitle,isDeleted,isActive,createdUserKey,createdDateTime,createdAppKey,lastUpdatedUserKey,lastUpdatedDateTime,lastUpdatedAppKey)",
			 DeleteContactTypes: "DROP TABLE  `Contact.contactTypes`"
	 });
