import React from "react";
import NEW_GAME from "../assets/images/new-game.png";
import { GameState, checkGameState } from "../util/gameState";

function GameOver({ gameState, handleNewGame }) {
	const visibility = gameState === GameState.inGame ? "hidden" : "visible";
	return (
		<div className={`game-over-container ${visibility}`}>
			<p>{checkGameState(gameState)}</p>
			<div className="new-game">
				<img src={NEW_GAME} onClick={handleNewGame} />
			</div>
		</div>
	);
}

export default GameOver;
