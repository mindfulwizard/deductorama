var app = angular.module('deductorama', []);
var counter;

app.controller('MainCtrl', function ($scope) {
	$scope.submissions = 12;
	$scope.rows = [0,1,2,3];
	$scope.guesses = [];
	$scope.answersArray = [null, null, null, null];
	$scope.colorsArray = [null, null, null, null];
	$scope.pegsArr = [];
	$scope.currentPegs = [];
	$scope.loser = false;
	$scope.winner = false;
	$scope.gameOver = false;

	$scope.colorCycler = function($index, array) {
		var availableColors = ['red', 'orange', 'yellow', 'green', 'blue', 'purple'];
		//start colorCycler from red if clicking on new circle
		if(!array[$index]) {
			console.log('start with red')
			counter = 0;
		}

		//cycle through colors when hitting end of availableColors array
		counter = counter || 0;
		if(counter === availableColors.length) {
			counter = 0;
		}

		//push colors into colorsArray to be rendered in working column
		array[$index] = availableColors[counter];
		counter++;
	};


	$scope.verify = function(array) {
		//check if game is over
		if($scope.winner || $scope.loser) {
			return;
		}

		//make sure all circles are colored
		if(_.includes(array, null)) {
			$scope.notAllFilledOut = true;
			return;
		}

		if($scope.submissions === 0) {
			$scope.loser = true;
			return;
		};

		$scope.notAllFilledOut = false;
		$scope.submissions--;
		$scope.checkAnswer(array);
	};


	$scope.checkAnswer = function(array) {
		//compare colorsObj to answersObj
		if(_.isEqual(array, $scope.answersArray)) {
		 	$scope.winner = true;
		 	$scope.gameOver = true;
		 	return;
		};

		var rightSpot = 0;
		var rightColor = 0;
		//figure out how many rightColor & rightSpot
		 //turn colorsObj and answersObj into arrays
		// var colorsArr = [];
		// for(var key in colorsObj) {
  //  			colorsArr.push(colorsObj[key]);
		// };

		// var answersArr = [];
		// for(var key in $scope.answersObj) {
  //  			answersArr.push($scope.answersObj[key]);
		// };

		var tempColors = _.clone($scope.colorsArray);
		var tempAnswers = _.clone($scope.answersArray);


		_.forEach(tempColors, function(element, index) {
			if(element === tempAnswers[index]) {
				tempColors.splice(index, 1);
				tempAnswers.splice(index, 1);
				rightSpot++;
			}
		});
		console.log('rightSpot', rightSpot)
		console.log(tempColors, tempAnswers)


		// colorsArr.forEach(function(e, i) {
  //   		if(e === answersArr[i]) {
  //       		colorsArr.splice(i,1, undefined);
  //       		answersArr.splice(i,1, null);
  //       		rightSpot++;
  //  			 }		
		// });

		_.forEach(tempColors, function(element, index) {
			if(_.indexOf(tempAnswers, element) > -1) {
				tempColors.splice(index, 1);
				tempAnswers.splice(_.indexOf(tempAnswers, element), 1);
				rightColor++;
			}

    		// if(tempColors.indexOf(e) > -1) {
    		// 	answersArr.splice(i,1, null);
    		// 	colorsArr.splice((colorsArr.indexOf(e)),1, undefined);
      //  			rightColor++;
    		// }


		});

		console.log('rightColor', rightColor)
		console.log(tempColors, tempAnswers)

		sendHints(rightColor, rightSpot);

		//push colorsObj into guesses to be rendered by previous columns
		$scope.guesses.push(array);
		$scope.pegsArr.push($scope.currentPegs);
		//reset colorsObj and pegsArr to be used in working column
		$scope.colorsObj = {0: null, 1:null, 2:null, 3:null};
		$scope.currentPegs = [];
	};

	function sendHints(rightColor, rightSpot) {
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

	$scope.revealAnswer = function() {
		for(var key in $scope.colorsObj) {
			$scope.colorsObj[key] = $scope.answersObj[key];
		}
		$scope.loser = true;
	}

	$scope.setPattern = function(){
		//set answer by calling colorCycler randNum times on each circle
		$scope.rows.forEach(function(e) {
			var randomNum = Math.floor((Math.random() * 6) + 1);
			for(var x = randomNum; x <= 6; x++) {
				$scope.colorCycler(e, $scope.answersArray);
			}
		});
		console.log('answer:', $scope.answersArray);
	}();

});




