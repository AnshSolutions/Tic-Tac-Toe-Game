import { checkWinner } from "./checkWinner";

const scores = {
	X: -1,
	O: 1,
	tie: 0,
};

export function bestMove(board) {
	// AI turn
	let bestScore = -Infinity;
	let moveIndex;
	for (let i = 0; i < board.length; i++) {
		// is spot available
		if (board[i] === null) {
			const boardCopy = [...board];
			boardCopy[i] = "O"; // AI
			let score = minimax(boardCopy, 0, false);
			if (score > bestScore) {
				bestScore = score;
				moveIndex = i;
			}
		}
	}
	return moveIndex;
}

function getBestScore(board, depth, isMax, player) {
	let bestScore = isMax ? -Infinity : Infinity;
	for (let i = 0; i < board.length; i++) {
		// is spot available
		if (board[i] === null) {
			const boardCopy = [...board];
			boardCopy[i] = player;
			let score = minimax(boardCopy, depth + 1, !isMax);
			bestScore = isMax
				? Math.max(score, bestScore)
				: Math.min(score, bestScore);
		}
	}
	return bestScore;
}

function minimax(board, depth, isMax) {
	let result = checkWinner(board, () => {});
	if (result) {
		return scores[result];
	}

	if (isMax) {
		return getBestScore(board, depth, isMax, "O");
	} else {
		return getBestScore(board, depth, isMax, "X");
	}
}
