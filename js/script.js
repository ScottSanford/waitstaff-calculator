angular.module("myApp",[
		'ngMessages'
	])

	.constant('VERSION', 3)
	.run(function(VERSION, $rootScope){
		$rootScope = VERSION;
	})

	.controller("waitstaffCtrl", function($scope){
		
		var init = function () {			
				$scope.charges = {
					subtotal : 0,
					tip : 0,
					total : 0,
				};

				$scope.earnings =  {
					tipTotal : 0,
					mealCount : 0,
					avgTip : 0,
				};
		}
		
		init();

		$scope.computeTotals = function() {
			// Customer Charges
			$scope.charges.subtotal = ($scope.baseMealPrice * (1 + $scope.taxRate/100));
			$scope.charges.tip = $scope.charges.subtotal * $scope.tipPercentage/100;
			$scope.charges.total = $scope.charges.subtotal + $scope.charges.tip;

			// My Earnings Info
			$scope.earnings.tipTotal += $scope.charges.tip;
			$scope.earnings.mealCount++;
		};


		$scope.watchNewVariables = function() {

			$scope.$watch('computeTotals', function(){

				if ($scope.earnings.mealCount != 0) {

					$scope.earnings.avgTip = $scope.earnings.tipTotal / $scope.earnings.mealCount;

				} 

			});
		
		};

		


		$scope.resetMealDetails = function() {
			$scope.mealDetails.$setPristine()
			$scope.baseMealPrice = '';
			$scope.taxRate = '';
			$scope.tipPercentage = '';
		};

		$scope.resetCharges = function() {
			$scope.charges.baseMealPrice = 0;
			$scope.charges.taxRate = 0;
			$scope.charges.tipPercentage = 0;
		};



		$scope.resetAll = function() {
			$scope.resetMealDetails();
			init();	
		};


		$scope.submitMealDetails = function() {
			if ($scope.mealDetails.$valid) {

				$scope.computeTotals();
				$scope.watchNewVariables();
			}
		}

	});

	