var app = angular.module('deductorama', []);
var counter;


app.controller('MainCtrl', function ($scope) {
	$scope.submissions = 3;
	$scope.rows = [0,1,2,3];
	$scope.guesses = [];
	$scope.colorsObj = {0: null, 1:null, 2:null, 3:null};
	$scope.answersObj = {0: null, 1:null, 2:null, 3:null};
	$scope.pegsArr = [];
	$scope.currentPegs = [];
	$scope.gameOver = false;
	$scope.loser = false;

	$scope.colorCycler = function($index, obj) {
		var availableColors = ['red', 'orange', 'yellow', 'green', 'blue', 'purple'];

		//start colorCycler from red if clicking on new circle
		if(!obj[$index]) {
			counter = 0;
		}

		//cycle through colors when hitting end of availableColors array
		counter = counter || 0;
		if(counter === availableColors.length) {
			counter = 0;
		}

		//push colors into colorsObj to be rendered in working column
		obj[$index] = availableColors[counter];
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

		$scope.checkAnswer(colorsObj);

		$scope.submissions--;

		if($scope.submissions === 0) {
			$scope.gameOver = true;
			$scope.revealAnswer();
		};
	};

	$scope.revealAnswer = function() {
		for(var key in $scope.colorsObj) {
			$scope.colorsObj[key] = $scope.answersObj[key];
		}
		$scope.loser = true;
	}

	$scope.checkAnswer = function(colorsObj) {
		var rightSpot = 0;
		var rightColor = 0;

		//compare colorsObj to answersObj
		//deep equals of colorsObj with answersObj
		if(JSON.stringify(colorsObj) === JSON.stringify($scope.answersObj)) {
		 	$scope.winner = true;
		 	return;
		};

		//figure out how many rightColor & rightSpot
		 //turn colorsObj and answersObj into arrays
		var colorsArr = [];
		for(var key in colorsObj) {
   			colorsArr.push(colorsObj[key]);
		};

		var answersArr = [];
		for(var key in $scope.answersObj) {
   			answersArr.push($scope.answersObj[key]);
		};

		colorsArr.forEach(function(e, i) {
    		if(e === answersArr[i]) {
        		colorsArr.splice(i,1, undefined);
        		answersArr.splice(i,1, null);
        		rightSpot++;
   			 }		
		});

		answersArr.forEach(function(e, i) {
    		if(colorsArr.indexOf(e) > -1) {
    			answersArr.splice(i,1, null);
    			colorsArr.splice((colorsArr.indexOf(e)),1, undefined);
       			rightColor++;
    		}		
		});

		$scope.sendHints(rightColor, rightSpot);

		//push colorsObj into guesses to be rendered by previous columns
		$scope.guesses.push(colorsObj);
		$scope.pegsArr.push($scope.currentPegs);
		//reset colorsObj and pegsArr to be used in working column
		$scope.colorsObj = {0: null, 1:null, 2:null, 3:null};
		$scope.currentPegs = [];
	};

	$scope.sendHints = function(rightColor, rightSpot) {
		//push correct amount of black/gray/white pegs to pegsArr to be rendered
		for(var a = 0; a < rightColor; a++) {
			$scope.currentPegs.push('gray');
		};

		for(var b = 0; b < rightSpot; b++) {
			$scope.currentPegs.push('black');
		};	

		var totallyWrong = 4 - (rightColor+rightSpot);

		for(var c = 0; c < totallyWrong; c++) {
			$scope.currentPegs.push('white');
		};
	};

	$scope.setPattern = function(){
		//set answer by calling colorCycler randNum times on each circle
		$scope.rows.forEach(function(e) {
			var randomNum = Math.floor((Math.random() * 6) + 1);
			for(var x = randomNum; x <= 6; x++) {
				$scope.colorCycler(e, $scope.answersObj);
			}
		});
		//console.log("answer", $scope.answersObj);
	}();

});




