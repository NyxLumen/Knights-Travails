import { knightSteps } from "./engine/knight.js";

const board = document.getElementById("board");
const hint = document.getElementById("hint");

let start = null;
let end = null;
let isSearching = false;

for (let y = 7; y >= 0; y--) {
	for (let x = 0; x < 8; x++) {
		const tile = document.createElement("div");
		tile.classList.add("tile");

		if ((x + y) % 2 === 0) {
			tile.classList.add("dark");
		}

		tile.dataset.pos = [x, y];
		tile.onclick = () => handleClick(x, y);
		board.appendChild(tile);
	}
}

function clearBoard() {
	[...board.children].forEach((t) => {
		t.classList.remove("visited", "path", "start", "end");
	});
	start = null;
	end = null;
}

function handleClick(x, y) {
	if (isSearching) return;

	if (start && end) {
		clearBoard();
	}

	if (!start) {
		start = [x, y];
		mark(x, y, "start");
		hint.innerHTML = `Start set at [${x},${y}]. <span style="color:#ff4b7d">Choose Target.</span>`;
		return;
	}

	if (!end) {
		if (x === start[0] && y === start[1]) return;

		end = [x, y];
		mark(x, y, "end");
		hint.textContent = "Calculating Path...";
		runSearch();
	}
}

function mark(x, y, cls) {
	const idx = (7 - y) * 8 + x;
	board.children[idx].classList.add(cls);
}

function runSearch() {
	isSearching = true;
	const { steps, path } = knightSteps(start, end);

	let i = 0;

	const interval = setInterval(() => {
		if (i >= steps.length) {
			clearInterval(interval);
			revealPath(path);
			return;
		}

		const [sx, sy] = steps[i].node;
		const isStart = sx === start[0] && sy === start[1];
		const isEnd = sx === end[0] && sy === end[1];

		if (!isStart && !isEnd) {
			mark(sx, sy, "visited");
		}

		i++;
	}, 40);
}

function revealPath(path) {
	path.forEach(([x, y], i) => {
		setTimeout(() => {
			const isStart = x === start[0] && y === start[1];
			const isEnd = x === end[0] && y === end[1];

			if (!isStart && !isEnd) {
				mark(x, y, "path");
			}

			if (i === path.length - 1) {
				isSearching = false;
				hint.textContent = "Path Found! Click anywhere to reset.";
			}
		}, i * 100);
	});
}
