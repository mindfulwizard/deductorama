var app = angular.module('deductorama', []);
var counter;
var columnCounter;

app.controller('MainCtrl', function ($scope, CircleFactory, ColumnFactory) {
	$scope.guesses = [];
	$scope.colorsArr = [];
	//$scope.rows = [1,1,1,1];
	$scope.rows = [1,2,3,4];
	$scope.columns = [1];


	$scope.colorCycler = function($index) {
			var availableColors = ['red', 'orange', 'yellow', 'green', 'blue', 'purple'];
			counter = counter || 0;
			if(counter === availableColors.length) {
				counter = 0;
			}
			$scope.colorsArr[$index] = availableColors[counter];
			counter++;
			console.log("colorsArr is", $scope.colorsArr);
		};
	

	$scope.makeGuess = function(colorsArr) {
		$scope.guesses.push(colorsArr);
	};


	$scope.showNextColumn = function() {
		columnCounter = columnCounter || 2;
		console.log(columnCounter);
		$scope.columns.push(columnCounter);
		columnCounter++;
	}
});



app.factory('CircleFactory', function() {
	return {
		colorChooser: function() {	
			$scope.colorsArr.push();
			console.log('also working')	
		}
	}
});


app.factory('ColumnFactory', function() {
	return {
		showNextColumn: function() {
			console.log('angular working');
			$scope.columns.push(1)
		}
	}
});


// <div ng-repeat="guess in guesses">...</div>

// <div>
//   [[ insert interface for making a single guess ]]
//   [[ this div will basically call push on $scope guesses]]
// </div>


//on click, push something into columns array




