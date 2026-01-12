import { knightSteps } from "./engine/knight.js";

const board = document.getElementById("board");
const hint = document.getElementById("hint");
let knightPiece = null;

let start = null;
let end = null;
let isAnimating = false;

createBoard();
createKnightPiece();

function createBoard() {
	board.innerHTML = "";
	createKnightPiece();

	for (let y = 7; y >= 0; y--) {
		for (let x = 0; x < 8; x++) {
			const tile = document.createElement("div");
			tile.classList.add("tile");
			if ((x + y) % 2 === 0) tile.classList.add("dark");

			tile.dataset.x = x;
			tile.dataset.y = y;
			tile.onclick = () => handleClick(x, y);
			board.appendChild(tile);
		}
	}
}

function createKnightPiece() {
	knightPiece = document.createElement("div");
	knightPiece.id = "knight-piece";
	knightPiece.style.display = "none";
	board.appendChild(knightPiece);
}

function movePieceTo(x, y) {
	knightPiece.style.display = "block";
	knightPiece.style.top = `${(7 - y) * 12.5}%`;
	knightPiece.style.left = `${x * 12.5}%`;
}

function handleClick(x, y) {
	if (isAnimating) return;

	if (start && end) {
		resetGame();
	}

	if (!start) {
		start = [x, y];
		mark(x, y, "start");

		knightPiece.style.transition = "none";
		movePieceTo(x, y);
		knightPiece.offsetHeight;
		knightPiece.style.transition = "";

		hint.innerHTML =
			"Start set. <span style='color:#e84118'>Choose Target.</span>";
		return;
	}

	if (!end) {
		if (x === start[0] && y === start[1]) return;
		end = [x, y];
		mark(x, y, "end");
		runSearch();
	}
}

function runSearch() {
	isAnimating = true;
	hint.textContent = "Calculating Path...";

	const { path, steps } = knightSteps(start, end);

	let i = 0;
	const searchInterval = setInterval(() => {
		if (i >= steps.length) {
			clearInterval(searchInterval);
			animateJourney(path);
			return;
		}
		const [sx, sy] = steps[i].node;
		if (!isStartOrEnd(sx, sy)) mark(sx, sy, "visited");
		i++;
	}, 20);
}

async function animateJourney(path) {
	hint.textContent = "Hopping...";

	for (let i = 0; i < path.length; i++) {
		const [x, y] = path[i];

		movePieceTo(x, y);

		if (!isStartOrEnd(x, y)) mark(x, y, "path");

		await new Promise((r) => setTimeout(r, 450));
	}
	setTimeout(() => board.classList.add("locked"), path.length * 50);
	isAnimating = false;
	hint.textContent = "Goal Reached! Click anywhere to reset.";
}

function mark(x, y, cls) {
	const idx = (7 - y) * 8 + x;
	board.children[idx + 1].classList.add(cls);
}

function isStartOrEnd(x, y) {
	return (
		(x === start[0] && y === start[1]) || (x === endPos(0) && y === endPos(1))
	);
}

function endPos(idx) {
	return end ? end[idx] : -1;
}

function resetGame() {
	const tiles = document.querySelectorAll(".tile");
	tiles.forEach((t) => t.classList.remove("start", "end", "path", "visited"));
	board.classList.remove("locked");
	start = null;
	end = null;
	knightPiece.style.display = "none";
	hint.textContent = "Select Start Position";
}
