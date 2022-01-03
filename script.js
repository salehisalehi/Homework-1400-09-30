let queens = [];
const board = document.getElementById("board");
const pieces = document.getElementById("pieces");

function InitBoard() {
	let patterneven = " <div class='esquare'></div>";
	let patternodd = " <div class='osquare'></div>";

	for (i = 0; i < 4; i++) {
		board.innerHTML += patterneven.repeat(8);
		board.innerHTML += patternodd.repeat(8);
	}
}

function delay(delayInms) {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(2);
		}, delayInms);
	});
}

function PrintBoard() {
	pieces.innerHTML = "";

	for (let x = 0; x < 8; x++) {
		for (let y = 0; y < 8; y++) {
			if (queens.some((e) => e.x == x && e.y == y)) {
				pieces.innerHTML +=
					' <div class="piece"><img src="queen.png" alt="وزیر" /></div>';
			} else {
				pieces.innerHTML += " <div class='piece'></div>";
			}
		}
	}
}

function ResetBoard() {
	queens = [];
}

function IsInBoard(x, y) {
	if (queens.some((e) => e.x == x && e.y == y)) {
		return true;
	} else {
		return false;
	}
}

function ValidatePiece(x, y) {
	let tx, ty;

	for (let bx = 0; bx < 8; bx++) {
		if (IsInBoard(bx, y)) {
			return false;
		}
	}

	for (let by = 0; by < 8; by++) {
		if (IsInBoard(x, by)) {
			return false;
		}
	}

	tx = x;
	ty = y;

	while (tx != 7 && ty != 7) {
		tx++;
		ty++;

		if (IsInBoard(tx, ty)) {
			return false;
		}
	}

	tx = x;
	ty = y;

	while (tx != 0 && ty != 0) {
		tx--;
		ty--;

		if (IsInBoard(tx, ty)) {
			return false;
		}
	}

	tx = x;
	ty = y;

	while (tx != 7 && ty != 0) {
		tx++;
		ty--;

		if (IsInBoard(tx, ty)) {
			return false;
		}
	}

	tx = x;
	ty = y;

	while (tx != 0 && ty != 7) {
		tx--;
		ty++;

		if (IsInBoard(tx, ty)) {
			return false;
		}
	}

	return true;
}

async function Start() {
	for (let px = 0; px < 8; px++) {
		if (queens.length == 8) {
			break;
		}

		for (let py = 0; py < 8; py++) {
			if (queens.length == 8) {
				break;
			}

			ResetBoard();
			queens.push({ x: px, y: py });

			for (let x = 0; x < 8; x++) {
				for (let y = 0; y < 8; y++) {
					if (ValidatePiece(x, y)) {
						queens.push({ x: x, y: y });

						await delay(70);
						PrintBoard();
					}
				}
			}
		}
	}
}

function Clear() {
	queens = [];
	PrintBoard();
}

InitBoard();
