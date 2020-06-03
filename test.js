//==================//
// 		Part 1	 	//
//==================//

var userBalance = 0;

// Gets called whenever the money finished tweening to the bottom.
function addFromCatch(value)
{
	/*
	for 2 seconds: we need an interval running 100 times every 20ms.
	in each run: we will update the balance by value/100, so after 2 seconds
	the value will be added to userBalance.
	*/
	var balanceIncrement = value / 100;
	var updateInterval = setInterval(() => {
		userBalance += balanceIncrement;
		value -= balanceIncrement;
		
		if (value <= 0) {
			// stop the interval
			clearInterval(updateInterval);
		}
	}, /*run every */ 20 /* ms */);
}

// Gets called every frame. 
// Time elapsed since the last update is passed into the function(milliseconds)
function onUpdate({delta})
{
	updateBalance(userBalance);
}

// You have access to a function updateBalance which 
// takes in a string and sets the ui to that value
// updateBalance("1");




//==================//
// 		Part 2	 	//
//==================//

//wiining logic
const winningRules = {
	// Symbols			3 in a row			4 in a row			5 in a row
	// 1						5								10							20
	1: { 						3: 5, 					4: 10, 					5: 20 },
	// 2						10							25							50
	2: { 						3: 10, 					4: 25, 					5: 50 },
	// 3						25							50							100
	3: { 						3: 25, 					4: 50, 					5: 100 },
};

//winning lines examples as given, can add more examples if needed
const winningLines = {
	ex1: { pattern: [[2,0],[1,1],[0,2],[1,3],[2,4]], winRule: winningRules },// /\
	ex2: { pattern: [[0,0],[0,1],[0,2],[0,3],[0,4]], winRule: winningRules },// --
	ex3: { pattern: [[1,0],[1,1],[1,2],[1,3],[1,4]], winRule: winningRules },// --
	ex4: { pattern: [[2,0],[2,1],[2,2],[2,3],[2,4]], winRule: winningRules },// --
	ex5: { pattern: [[0,0],[1,1],[2,2],[1,3],[0,4]], winRule: winningRules } // \/
};


//check winning lines for different numbers
function checkWinningLinesFor(input, num) 
{
	var all = {};
	Object.keys(winningLines).forEach(key => {
    var winLine = winningLines[key];
	  var conseq = 0;
	  var counts = [];

    winLine.pattern.forEach(idx => {
      if (input[idx[0]][idx[1]] == num) {
        conseq++;
      } else {
        counts.push(conseq);
        conseq = 0;
      }
    });

    if (conseq != 0)
      counts.push(conseq);

    all[key] = counts.filter(n => n);
	});
	return all;
}

//check wunning lines for each given number and returning total scores
function checkWinningLines(input) 
{
  var filter = (counts) => {
    Object.keys(counts).forEach(ex => {
      counts[ex] = counts[ex].filter(count => count >= 3);
      if (counts[ex].length < 1)
        delete counts[ex];
    });
    return counts;
  };

  var counts = {
    1: filter(checkWinningLinesFor(input, 1)), 
    2: filter(checkWinningLinesFor(input, 2)),
    3: filter(checkWinningLinesFor(input, 3))
  };

  var totalScore = 0, winningLinesCount = 0;
  Object.keys(counts).forEach(symbol => {
    var count = counts[symbol];
    Object.keys(count).forEach(ex => {
      var score = winningLines[ex].winRule[symbol][count[ex]];

      totalScore += score;
      if (score)
        winningLinesCount++;
    });
  });

  return {
    score: totalScore, 
    lines: winningLinesCount
  };
}

// examples input
var array = [
	[1,0,0,0,1],
	[0,1,0,1,0],
	[0,0,1,0,0]
];
//Output: '1 winning line, scoring 20 points.'


var array2 = [
	[2,4,2,4,3],
	[1,1,1,4,1],
	[3,3,3,4,2]
];
//Output: '2 winning lines, scoring a total 30 points.'

function processSlots(input)
{
  var finalScore = checkWinningLines(input);
  //console.log(score["lines"]);
	console.log("Output: " + finalScore["lines"] + " winning lines, scoring a total of " + finalScore["score"] + " points");
};

processSlots(array)
