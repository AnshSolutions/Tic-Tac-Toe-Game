import PLAYER_O from "../assets/images/player-o.png";
import PLAYER_X from "../assets/images/player-x.png";
import { checkWinner } from "../util/checkWinner";

const possibleMoves = (tiles) => {
	// filter the tiles that are not null
	return tiles
		.map((tile, index) => (tile === null ? index : null))
		.filter((index) => index !== null);
};

export const generateAIEasy = (tiles) => {
	const emptyTiles = possibleMoves(tiles);

	// return a random index of the not null tiles
	return emptyTiles[Math.floor(Math.random() * emptyTiles.length)];
};

export const generateAIHard = (tiles) => {
	const emptyTiles = possibleMoves(tiles);

	// check if any next move is a winning move
	for (const player of [PLAYER_O, PLAYER_X]) {
		// for each player, test it against every empty tile and check if it is a winning move.
		// if any winning move, player or AI, the AI will want to play in that tile
		for (const index of emptyTiles) {
			const boardCopy = [...tiles];
			boardCopy[index] = player;
			if (checkWinner(boardCopy, () => {})) return index;
		}
	}

	// check for open corner
	let openCorners = [];
	for (let index of emptyTiles) {
		if ([0, 2, 6, 8].includes(index)) {
			openCorners.push(index);
		}
	}
	if (openCorners.length > 0) {
		let index = openCorners[Math.floor(Math.random() * openCorners.length)];
		return index;
	}

	// check for open center
	for (let index of emptyTiles) {
		if ([4].includes(index)) {
			return index;
		}
	}

	// check for open edges
	let openEdges = [];
	for (let index of emptyTiles) {
		if ([1, 3, 5, 7].includes(index)) {
			openEdges.push(index);
		}
	}
	if (openEdges.length > 0) {
		let index = openEdges[Math.floor(Math.random() * openEdges.length)];
		return index;
	}
};
