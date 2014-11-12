var cprbApp = angular.module('cprbApp',[]);

cprbApp.controller('AddCaseCtrl', [ '$q', '$scope', '$log', 'database',
	function($q, $scope, $log, database) {
		var ctrl = this;

		ctrl.getCaseSuccess = function(data) {
			console.log('getCase success!');
			console.log(data);
			if ((!data.CaseId) || (data.CaseId === 0)) {
				$scope.newCase = true;
				$scope.caseLoading = false;
				return;
			}
			$scope.caseUpdate = true;
			$scope.caseInvestigators = data.Investigators;
			$scope.caseAllegations = data.Allegations;
			$scope.issuedDate = new Date(data.IssuedDate);
			$scope.summaryText = data.Summary;
			$scope.caseLoading = false;
		}

		$scope.onCaseChange = function() {
			console.log('updated!');
			if (!$scope.caseNumber) {
				console.log('true!');
				$scope.caseLoading = false;
				$scope.newCase = false;
				$scope.caseUpdate = false;
				return;
			}
			ctrl.initVars();
			$scope.caseLoading = true;
			database.getCase($scope.caseNumber).then(ctrl.getCaseSuccess,ctrl.initFail);
		}

		ctrl.initSuccess = function(data) {
			console.log('success!');
			$scope.allegations = data[0];
			$scope.investigators = data[1];
			$scope.recommendations = data[2];
			$scope.rationales = data[3];
			console.log($scope.recommendations);
		};

		ctrl.initFail = function(error) {
			$scope.caseLoading = false;
			$log.error('An error has occurred.');
			$log.debug(error);
		};

		ctrl.initVars = function() {
			$scope.caseUpdate = false;
			$scope.newCase = false;
			$scope.caseInvestigators = [];
			$scope.caseAllegations = [];
			$scope.caseSummary = '';
		}

		// Get all the variables
		ctrl.initVars();
		$q.all([database.getAllegations(), database.getInvestigators(),
			    database.getRecommendations(), database.getRationales()]).then(ctrl.initSuccess, ctrl.initFail);
	}]);

