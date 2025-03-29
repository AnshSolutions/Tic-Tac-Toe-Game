import React from "react";

function GameStats({ gameStats }) {
	return (
		<div className="stats">
			<div className="scores">
				<p>You: {gameStats.player}</p>
				<p>Draw: {gameStats.tie}</p>
				<p>AI: {gameStats.computer}</p>
			</div>
			<p>Games Played: {gameStats.gamesPlayed}</p>
		</div>
	);
}

export default GameStats;
