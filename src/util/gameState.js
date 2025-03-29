export const GameState = {
	inGame: 0,
	playerWin: 1,
	computerWin: 2,
	tie: 3,
};

export const checkGameState = (gameState) => {
	switch (gameState) {
		case GameState.inGame:
			return "";
		case GameState.playerWin:
			return "You Win!";
		case GameState.computerWin:
			return "You Lost!";
		case GameState.tie:
			return "It's a tie!";
		default:
			return "";
	}
};
