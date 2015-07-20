var app = angular.module('deductorama', []);
var counter;

app.controller('MainCtrl', function ($scope, CircleFactory, ColumnFactory) {
	$scope.guesses = [];
	$scope.colorsArr = [];


	$scope.colorCycler = function() {
			var availableColors = ['red', 'orange', 'yellow', 'green', 'blue', 'purple'];
			counter = counter || 0;
			if(counter === availableColors.length) {
				counter = 0;
			}
			$scope.colorsArr[0] = availableColors[counter];
			counter++;
			console.log($scope.colorsArr);
		};
	

	$scope.makeGuess = function(colorsArr) {
		$scope.guesses.push(colorsArr);
	};


	$scope.showNextColumn = ColumnFactory.showNextColumn;
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
		}
	}
});


// <div ng-repeat="guess in guesses">...</div>

// <div>
//   [[ insert interface for making a single guess ]]
//   [[ this div will basically call push on $scope guesses]]
// </div>





