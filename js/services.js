cprbApp.service('database', ['$http', 
	function($http) {
		var url = 'http://localhost:55286';
		return {
			getAllegations: function() {
				return $http.get(url + '/v1/Allegations').then(
					function(result) {
						return result.data;
					},
					function (error) {
						return error;
					});
			},
			getInvestigators: function() {
				return $http.get(url + '/v1/Investigators').then(
					function(result) {
						return result.data;
					},
					function (error) {
						return error;
					});
			},
			getRecommendations: function() {
				return $http.get(url + '/v1/Recommendations').then(
					function (result) {
						return result.data;
					},
					function (error) {
						return error;
					});
			},
			getRationales: function() {
				return $http.get(url + '/v1/Rationales').then(
					function (result) {
						return result.data;
					},
					function (error) {
						return error;
					});
			},
			getCase: function(caseNumber) {
				return $http.get(url + '/v1/Case/' + caseNumber).then(
					function (result) {
						return result.data;
					},
					function (error) {
						return error;
					});
			}
		}
	}]);

