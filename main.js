import { knightMoves } from "./engine/knight.js";

const board = document.getElementById("board");

let start = null;
let end = null;

for (let y = 7; y >= 0; y--) {
	for (let x = 0; x < 8; x++) {
		const tile = document.createElement("div");
		tile.className = "tile";
		tile.dataset.pos = [x, y];

		tile.onclick = () => handleClick(x, y, tile);
		board.appendChild(tile);
	}
}

function handleClick(x, y, tile) {
	if (!start) {
		start = [x, y];
		tile.classList.add("start");
		return;
	}

	if (!end) {
		end = [x, y];
		tile.classList.add("end");
		drawPath();
	}
}

function drawPath() {
	const path = knightMoves(start, end);

	path.forEach(([px, py]) => {
		const index = (7 - py) * 8 + px;
		board.children[index].classList.add("path");
	});
}
