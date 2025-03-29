import React, { useEffect, useState } from "react";
import { checkWinner, isBoardFull } from "../util/checkWinner";
import { generateAIEasy, generateAIHard } from "../util/computerAI";
import { GameState } from "../util/gameState";
import { bestMove } from "../util/minimax";
import Board from "./Board";
import GameOver from "./GameOver";
import GameStats from "./GameStats";

const PLAYER_X = "X";
const PLAYER_O = "O";

function Game() {
	const [board, setBoard] = useState(Array(9).fill(null));
	const [playerTurn, setPlayerTurn] = useState(true);
	const [startingPlayer, setStartingPlayer] = useState(playerTurn);
	const [winnerStrikeClass, setWinnerStrikeClass] = useState("");
	const [gameState, setGameState] = useState(GameState.inGame);
	const [gameStats, setGameStats] = useState({
		player: 0,
		computer: 0,
		tie: 0,
		gamesPlayed: 0,
	});

	const makeMove = (index) => {
		const newBoard = [...board];
		newBoard[index] = playerTurn ? PLAYER_X : PLAYER_O;
		setBoard(newBoard);
		setPlayerTurn(!playerTurn);
	};

	const updateStats = (updatedGameState) => {
		setGameStats((prevStats) => {
			let newStats = { ...prevStats, gamesPlayed: prevStats.gamesPlayed + 1 };

			if (updatedGameState === GameState.playerWin) {
				newStats.player = prevStats.player + 1;
			} else if (updatedGameState === GameState.computerWin) {
				newStats.computer = prevStats.computer + 1;
			} else if (updatedGameState === GameState.tie) {
				newStats.tie = prevStats.tie + 1;
			}

			newStats.gamesPlayed = prevStats.gamesPlayed + 1;

			return newStats;
		});
	};

	useEffect(() => {
		const winner = checkWinner(board, setWinnerStrikeClass);
		let updatedGameState = gameState;

		if (winner) {
			updatedGameState =
				winner === PLAYER_X
					? GameState.playerWin
					: winner === PLAYER_O
					? GameState.computerWin
					: GameState.tie;
			setGameState(updatedGameState);
			updateStats(updatedGameState);
			return;
		}
		if (isBoardFull(board)) {
			setGameState(GameState.tie);
			updateStats(GameState.tie);
			return;
		}
		if (!playerTurn) {
			// const computerMove = generateAIHard(board);
			const computerMove = bestMove(board);
			makeMove(computerMove);
		}
	}, [board]);

	const handleTileClick = (index) => {
		if (gameState !== GameState.inGame || !playerTurn) return; // return if game state is not in game
		if (board[index] !== null) return; // return if tile is not null

		makeMove(index);
	};

	const handleNewGame = () => {
		setBoard(Array(9).fill(null));
		setPlayerTurn(!startingPlayer);
		setStartingPlayer(!startingPlayer);
		setGameState(GameState.inGame);
		setWinnerStrikeClass(null);
	};

	return (
		<div className="game">
			<h1>Tic-Tac-Toe</h1>
			<GameStats gameStats={gameStats} />
			<Board
				board={board}
				onTileClick={handleTileClick}
				strikeClass={winnerStrikeClass}
			/>
			<GameOver gameState={gameState} handleNewGame={handleNewGame} />
		</div>
	);
}

export default Game;
