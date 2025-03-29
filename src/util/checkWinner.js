export const checkWinner = (board, setStrikeClass) => {
	if (board[0] && board[0] === board[1] && board[0] === board[2]) {
		setStrikeClass("strike-row-1");
		return board[0];
	} else if (board[3] && board[3] === board[4] && board[3] === board[5]) {
		setStrikeClass("strike-row-2");
		return board[3];
	} else if (board[6] && board[6] === board[7] && board[6] === board[8]) {
		setStrikeClass("strike-row-3");
		return board[6];
	} else if (board[0] && board[0] === board[3] && board[0] === board[6]) {
		setStrikeClass("strike-column-1");
		return board[0];
	} else if (board[1] && board[1] === board[4] && board[1] === board[7]) {
		setStrikeClass("strike-column-2");
		return board[1];
	} else if (board[2] && board[2] === board[5] && board[2] === board[8]) {
		setStrikeClass("strike-column-3");
		return board[2];
	} else if (board[0] && board[0] === board[4] && board[0] === board[8]) {
		setStrikeClass("strike-diagonal-1");
		return board[0];
	} else if (board[2] && board[2] === board[4] && board[2] === board[6]) {
		setStrikeClass("strike-diagonal-2");
		return board[2];
	}
	if (isBoardFull(board)) return "tie";
	return false;
};

export function isBoardFull(board) {
	return board.every((tile) => tile !== null);
}
