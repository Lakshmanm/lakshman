	 var app = angular.module('ThrillAcademic.gradeQueries', [])

.constant('gradeQueries', {
		 getAllGrade : " SELECT PercentageFrom,GradeKey,PercentageTo,GradePoints,instanceOrganizationKey FROM `Academic.grades` ",
		 getGradeByGradeKey : " SELECT PercentageFrom,GradeKey,PercentageTo,GradePoints,instanceOrganizationKey FROM `Academic.grades`  WHERE gradeKey = ",
});

