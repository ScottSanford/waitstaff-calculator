angular.module("myApp",[
		'ngMessages', 
		'ngRoute'
	])

	.config(function($routeProvider){
		$routeProvider
			.when('/', {
				templateUrl : '../views/home.html'
			})
			.when('/new_meal', {
				templateUrl : '../views/new_meal.html', 
				controller : 'NewMealCtrl', 
				resolve : {
					resetCharges : function(myEarningsService) {

					}
				}
			})
			.when('/my_earnings', {
				templateUrl: '../views/my_earnings.html', 
				controller: 'MyEarningsCtrl'
			})
			.otherwise({
				redirectTo: '/'
			})
	})

	.controller("NewMealCtrl", function($scope, newMealService, myEarningsService){

		$scope.charges = newMealService;

		$scope.cancelForm = function() {
			$scope.baseMealPrice = ''; 
			$scope.taxRate = '';
			$scope.tipPercentage = '';
		}

		$scope.addMeal = function() {
			if ($scope.formDetails.$valid) {
				newMealService.computeTotals($scope.baseMealPrice, $scope.taxRate, $scope.tipPercentage);
				myEarningsService.add(newMealService.tip);
			}
		}
       
	})

    .controller("MyEarningsCtrl", function($scope, newMealService, myEarningsService) {

    	$scope.myearnings = myEarningsService;	

    	$scope.resetAll = function() {
    		myEarningsService.resetEarnings();
    		newMealService.resetCharges();
    	}


    })	








