const MOVES = [
	[2, 1],
	[2, -1],
	[-2, 1],
	[-2, -1],
	[1, 2],
	[1, -2],
	[-1, 2],
	[-1, -2],
];

function inBounds(x, y) {
	return x >= 0 && x < 8 && y >= 0 && y < 8;
}

function getNeighbors([x, y]) {
	return MOVES.map(([dx, dy]) => [x + dx, y + dy]).filter(([nx, ny]) =>
		inBounds(nx, ny)
	);
}

export function knightMoves(start, end) {
	const queue = [[start]];
	const visited = new Set([start.toString()]);

	while (queue.length) {
		const path = queue.shift();
		const node = path[path.length - 1];

		if (node[0] === end[0] && node[1] === end[1]) {
			return path;
		}

		for (const next of getNeighbors(node)) {
			const key = next.toString();
			if (!visited.has(key)) {
				visited.add(key);
				queue.push([...path, next]);
			}
		}
	}
}
