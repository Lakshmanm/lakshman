/*//=============================================================================
// All rights reserved to Thrill Innovative Labs.
// THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
// OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
// LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
// FITNESS FOR A PARTICULAR PURPOSE.
//=============================================================================
//*****************************************************************************
//* Name		    	: ContactContactItem.Query.js 
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

	 var app = angular.module('ThrillContact.contactContactItemQueries', [])

.constant('contactContactItemQueries', {
	getContactItems: function (contactKey) {
		return 'SELECT ci.contactitemkey,ci.contactiteminfo,ci.contacttypekey,ci.contactkey, ct.contacttypetitle,ci.isPrimary FROM `contact.contactitems` ci, `contact.contacts` c, `contact.contacttypes`ct WHERE  ci.contactKey=c.contactKey and ct.contacttypekey=ci.contacttypekey AND ci.contactKey = ' + "'" + contactKey + "'";
},
		 //getContactContactItemByContactKey : " SELECT contactItemKey,contactItemInfo,contactTypeKey FROM `Contact.contactItems`  WHERE contactKey = ",
		 getContactItemByContactItemKey: function (contactItemKey) {
		return 'SELECT contactitemkey,contactiteminfo,ci.contacttypekey,contactkey,ct.contacttypetitle,ci.isPrimary  FROM `contact.contactitems` ci join `contact.contacttypes` ct on  ct.contacttypekey=ci.contacttypekey WHERE ci.contactitemKey = ' + "'" + contactItemKey + "'";
},

		// getContactContactItemByContactItemKey : " SELECT contactItemKey,contactItemInfo,contactTypeKey FROM `Contact.contactItems`  WHERE contactItemKey = ",
		 contactTypeDetails:"SELECT contactTypeKey,contactTypeTitle FROM `Contact.contactTypes` WHERE isDeleted=0"
});

