/*//=============================================================================
// All rights reserved to Thrill Innovative Labs.
// THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
// OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
// LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
// FITNESS FOR A PARTICULAR PURPOSE.
//=============================================================================
//*****************************************************************************
//* Name		    	: Contact.Query.js 
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

	 var app = angular.module('ThrillContact.contactQueries', [])

.constant('contactQueries', {

	getAllContacts: function () {
		return 'SELECT contactkey FROM `contact.contacts` ';
},

	 getContactByContactKey: function (contactKey) {
		return 'SELECT contactItemKey, contactItemInfo, contactTypeKey, contactKey,isPrimary FROM `contact.contactitems` WHERE isDeleted!=1 AND contactKey =' + "'" + contactKey + "'";
},
		 // getAllContacts : " SELECT contactKey FROM `Contact.contacts` ",
		 // getContactByContactKey : " SELECT contactKey FROM `Contact.contacts`  WHERE contactKey = "

});

