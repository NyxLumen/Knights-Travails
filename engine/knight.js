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

export function knightSteps(start, end) {
	const queue = [start];
	const visited = new Set([start.toString()]);
	const parents = {};

	const steps = [];

	while (queue.length) {
		const node = queue.shift();
		steps.push({ node });

		if (node[0] === end[0] && node[1] === end[1]) break;

		for (const n of getNeighbors(node)) {
			const key = n.toString();
			if (!visited.has(key)) {
				visited.add(key);
				parents[key] = node;
				queue.push(n);
			}
		}
	}

	const path = [];
	let cur = end;
	while (cur) {
		path.push(cur);
		cur = parents[cur.toString()];
	}

	return { steps, path: path.reverse() };
}
