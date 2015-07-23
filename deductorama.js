var app = angular.module('deductorama', []);
var counter;

app.controller('MainCtrl', function ($scope) {
	$scope.guesses = [];
	$scope.colorsObj = {0: null, 1:null, 2:null, 3:null};
	$scope.rows = [1,2,3,4];

	$scope.setPattern

	$scope.colorCycler = function($index) {
			var availableColors = ['red', 'orange', 'yellow', 'green', 'blue', 'purple'];

			//start colorCycler from red if clicking on new circle
			if(!$scope.colorsObj[$index]) {
				counter = 0;
			}

			//cycle through colors when hitting end of availableColors array
			counter = counter || 0;
			if(counter === availableColors.length) {
				counter = 0;
			}

			//push colors into colorsObj to be rendered in working column
			$scope.colorsObj[$index] = availableColors[counter];
			counter++;
		};

	$scope.makeGuess = function(colorsObj) {
		//make sure all circles are colored
		for(var key in colorsObj) {
			if(!colorsObj[key]) {
		 		$scope.notAllFilledOut = true;
				return;
			}	
		}
		$scope.notAllFilledOut = false;

		//push colorsObj into guesses to be rendered by previous columns
		$scope.guesses.push(colorsObj);
		//reset colorsObj to be used in working column
		$scope.colorsObj = {0: null, 1:null, 2:null, 3:null};
	};

});




