function startGame() {
	//start over completely without refreshing 
	for (var i = 1; i <= 9; i = i + 1){
		clearBox(i);
	}

	document.turn = "X";
	//create math random at the end cause X always start first 
	if (Math.random() < 0.5) {
		document.turn = "O";
	}
	document.winner = null; 
	setMessage(document.turn + " gets to start.");
}
	
function setMessage(msg) {
// a function to provide message given by setMessage
document.getElementById("message").innerText = msg;
}

function nextMove(square){
	//check to see if there is/isnt a winner 
	if (document.winner != null) {
		setMessage(document.winner + " already won the game.");
	//the one below start first 
	} else if (square.innerText == "") {
	square.innerText = document.turn;
	switchTurn();
	} else {
		setMessage("Sorry, but that square is already used.");
	}
}

function switchTurn() {
	    // comes second 
	if (checkforWinner(document.turn)) {
		setMessage("Congratulations, " + document.turn + "! You win!");
		// comes third 
		document.winner = document.turn; 
		// the X,O,X comes first, then only comes the one on top 
	} else if (document.turn == "X") {
		document.turn = "O";
		setMessage("It's " + document.turn + "'s turn.");
	} else {
		document.turn = "X";
		setMessage("It's " + document.turn + "'s turn.");
	}
}

function checkforWinner(move) {
	var result = false;
	if (checkRow(1,2,3,move) || 
		checkRow(4,5,6,move) ||
		checkRow(7,8,9,move) ||
		checkRow(1,4,7,move) ||
		checkRow(2,5,8,move) ||
		checkRow(3,6,9,move) ||
		checkRow(1,5,9,move) ||
		checkRow(3,5,7,move)) {

		result = true;
		}
	  return result;
	} 

function checkRow(a,b,c,move) {
	var result = false;
	if (getBox(a) == move && getBox(b) == move && getBox(c) == move) {
		result = true;
	}
	return result; 
}

function getBox(number) {
	// getBox give me a box based on a number 
	// it will get an element id 
	//will retrieve a box from the screen  
	return document.getElementById("s" + number).innerText;
}

function clearBox(number) {
//give new function so we dont have to refresh the buttons everytime
//we start a new game  
	document.getElementById("s" + number).innerText = "";
}