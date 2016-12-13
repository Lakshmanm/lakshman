/*//=============================================================================
// All rights reserved to Thrill Innovative Labs.
// THIS CODE AND INFORMATION IS PROVIDED 'AS IS' WITHOUT WARRANTY
// OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
// LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR
// FITNESS FOR A PARTICULAR PURPOSE.
//=============================================================================
//*****************************************************************************
//* Name		    	: Institute.Logic.js 
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

	 var app  = angular.module('ThrillInstitute.instituteLogic', ['ThrillFrameworkLibrary.DataService'
			 , 'ThrillInstitute.instituteQueries'
			 , 'ThrillInstitute.config'
			 , 'ThrillCnnWebClient.appConfig'
			 , 'ThrillFrameworkLibrary.appLogger'
	])
	 .factory('instituteLogic', function ($http,
		 dataService,
		 boardQueries,
		 config,
		 appConfig,
		 appLogger) {

		 return {

		getInstituteTypes:function()
{
 return dataService.callAPI(config.API_URL + 'Mcampuz/institutetypes', [], 'GET').then(function(response) {

                console.log(JSON.stringify(response.data));
                return response.data;
            });

},

getRecognitionTypes:function()
{
 return dataService.callAPI(config.API_URL + 'Mcampuz/instituterecognitions', [], 'GET').then(function(response) {

                console.log(JSON.stringify(response.data));
                return response.data;
            });

},


 addInstitute: function (entityInstitute) {
			 	
				 return dataService.insert(entityInstitute, '`institute.Institutes`', config.OFFLINE_DBNAME, config.API_URL + 'Mcampuz/Institutes').then(function (response) {
					 return response;
			 });
	 },	
             
             getInstitute:function(instituteKey)
             {   
            return dataService.callAPI(config.API_URL + 'Mcampuz/Institute/'+instituteKey, [], 'GET').then(function(response) {

                console.log(JSON.stringify(response));
                return response.data[0];
            });

                 
             },
updateInstitute:function(entityInstitute,instituteKey)
             {
              return dataService.update(entityInstitute, 'InstituteKey="' + instituteKey + '"',  '`institute.Institutes`', config.OFFLINE_DBNAME, config.API_URL + 'Mcampuz/Institute/' + instituteKey).then(function (response) {
				 return response;
			 });    
                 
                 
             },


	 getAllInstitutes:function(organizationKey){
//console.log(config.API_URL + 'Mcampuz/Institutes');
 return dataService.callAPI(config.API_URL + 'Mcampuz/Institutes/'+organizationKey, [], 'GET').then(function(response) {

                console.log(JSON.stringify(response));
                return response.data;
            });


	 }, 


	 	 getAllInstitutesByBranch:function(organizationKey){
//console.log(config.API_URL + 'Mcampuz/Institutes');
 return dataService.callAPI(config.API_URL + 'Mcampuz/Institutes/Branch/'+organizationKey, [], 'GET').then(function(response) {

                console.log(JSON.stringify(response));
                return response.data;
            });


	 }, 
        
             
             removeInstitute:function(instituteKey)
             {
               return dataService.delete('InstituteKey="' + instituteKey + '"', '`institute.Institutes`', config.OFFLINE_DBNAME, config.API_URL+ 'Mcampuz/Institute/'+instituteKey).then(function (response) {
				 return response;
			 });   
                 
                 
             }

	} // end of factory
}); // end of module

